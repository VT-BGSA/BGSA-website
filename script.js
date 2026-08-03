const site = window.BGSA_SITE || {};
const org = site.organization || {};
const calendarSettings = site.calendar || {};
const displayTimeZone = calendarSettings.timeZone || 'America/New_York';

// ----------------------------
// Basic site behavior
// ----------------------------
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav-links');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
  });
}

document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = new Date().getFullYear();
});

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function hasValue(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function getPath(object, path) {
  return path.split('.').reduce((value, key) => (value == null ? undefined : value[key]), object);
}

function bindSimpleContent() {
  document.querySelectorAll('[data-site-text]').forEach((el) => {
    const value = getPath(site, el.dataset.siteText);
    if (value !== undefined && value !== null) el.textContent = value;
  });

  document.querySelectorAll('.brand-mark').forEach((el) => {
    if (org.shortName) el.textContent = org.shortName;
  });
  document.querySelectorAll('.brand-copy strong').forEach((el) => {
    if (org.name) el.textContent = org.name;
  });
  document.querySelectorAll('.brand-copy span').forEach((el) => {
    if (org.affiliation) el.textContent = org.affiliation;
  });

  document.querySelectorAll('[data-org-disclaimer]').forEach((el) => {
    el.textContent = org.disclaimer || '';
  });

  document.querySelectorAll('[data-org-email]').forEach((el) => {
    if (hasValue(org.email)) {
      el.textContent = org.email;
      if (el.tagName === 'A') el.href = `mailto:${org.email}`;
    } else {
      el.textContent = 'Contact information coming soon';
      if (el.tagName === 'A') el.removeAttribute('href');
    }
  });

  document.querySelectorAll('[data-treasurer-email]').forEach((el) => {
    const email = hasValue(org.treasurerEmail) ? org.treasurerEmail : org.email;
    if (hasValue(email)) {
      el.textContent = email;
      if (el.tagName === 'A') el.href = `mailto:${email}`;
    } else {
      el.textContent = 'Contact BGSA for availability';
      if (el.tagName === 'A') el.href = 'connect.html';
    }
  });
}

// ----------------------------
// Homepage sections
// ----------------------------
function renderFocusAreas() {
  const mount = document.querySelector('#focus-areas');
  if (!mount || !Array.isArray(site.focusAreas)) return;
  mount.innerHTML = site.focusAreas.map((item) => `
    <article class="pillar">
      <div class="pillar-icon">${escapeHtml(item.icon || '•')}</div>
      <h3>${escapeHtml(item.title || '')}</h3>
      <p>${escapeHtml(item.text || '')}</p>
    </article>`).join('');
}

function configureHomepagePhoto() {
  const image = document.querySelector('#homepage-group-photo');
  const caption = document.querySelector('#homepage-group-caption');
  if (image && site.homepage) {
    if (hasValue(site.homepage.groupPhoto)) image.src = site.homepage.groupPhoto;
    image.alt = site.homepage.groupPhotoAlt || 'BGSA graduate students';
  }
  if (caption && site.homepage) {
    if (hasValue(site.homepage.groupPhotoCaption)) {
      caption.textContent = site.homepage.groupPhotoCaption;
    } else {
      caption.hidden = true;
    }
  }
}

// ----------------------------
// Leadership
// ----------------------------
function renderLeadership() {
  const currentMount = document.querySelector('#leadership-current');
  const previousMount = document.querySelector('#leadership-previous');
  const leadership = site.leadership || {};

  document.querySelectorAll('[data-current-leadership-year]').forEach((el) => {
    el.textContent = leadership.currentYear || org.academicYear || '';
  });

  document.querySelectorAll('[data-previous-leadership-year]').forEach((el) => {
    el.textContent = leadership.previousYear || '';
  });

  if (currentMount && Array.isArray(leadership.current)) {
    currentMount.innerHTML = leadership.current.map((person) => {
      const affiliation = hasValue(person.affiliation)
        ? `<p class="profile-affiliation">${escapeHtml(person.affiliation)}</p>`
        : '';

      const bio = hasValue(person.bio)
        ? `<p class="profile-note">${escapeHtml(person.bio)}</p>`
        : '';

      const profileLink = hasValue(person.linkUrl)
        ? `<a class="text-link" href="${escapeHtml(person.linkUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(person.linkText || 'Profile')} →</a>`
       : '';

      return `
        <article class="card profile-card">
          <div class="profile-photo">
            <img
              src="${escapeHtml(
                person.photo || 'assets/officer-placeholder.svg'
              )}"
              alt="${escapeHtml(
                person.name || person.role || 'BGSA officer'
              )}"
            >
          </div>

          <div class="profile-body">
            <div class="role">${escapeHtml(person.role || '')}</div>
            <h3>${escapeHtml(person.name || '')}</h3>
            ${affiliation}
            ${bio}
            ${profileLink}
          </div>
        </article>
      `;
    }).join('');
  }

  if (previousMount && Array.isArray(leadership.previous)) {
    previousMount.innerHTML = leadership.previous.map((person) => `
      <div>
        <strong>${escapeHtml(person.role || '')}</strong>
        <span>${escapeHtml(person.name || '')}</span>
      </div>
    `).join('');
  }
}

// ----------------------------
// Merchandise
// ----------------------------
function renderMerchandise() {
  const mount = document.querySelector('#merchandise-grid');
  if (!mount) return;
  const items = ((site.merchandise || {}).items || []).filter((item) => item.visible !== false);
  if (!items.length) {
    mount.innerHTML = `<div class="notice"><strong>No merchandise is currently listed.</strong> Check back later or contact BGSA for current availability.</div>`;
    return;
  }
  mount.innerHTML = items.map((item) => `
    <article class="card merch-card">
      <div class="merch-image"><img src="${escapeHtml(item.image || 'assets/merch-placeholder.svg')}" alt="${escapeHtml(item.alt || item.name || 'BGSA merchandise')}"></div>
      <div class="merch-body">
        <h3>${escapeHtml(item.name || 'BGSA Merchandise')}</h3>
        <div class="price">${escapeHtml(item.price || '')}</div>
        <p>${escapeHtml(item.description || '')}</p>
        <p><a class="text-link" href="connect.html">Contact treasurer →</a></p>
      </div>
    </article>`).join('');
}

// ----------------------------
// Connect page
// ----------------------------
function renderConnectLinks() {
  const mount = document.querySelector('#connect-links');
  if (!mount) return;
  const links = site.links || {};
  const rows = [];

  if (hasValue(org.email)) {
    rows.push(`<div class="contact-row"><strong>Email</strong><a href="mailto:${escapeHtml(org.email)}">${escapeHtml(org.email)}</a></div>`);
  }
  if (hasValue(links.communityChat)) {
    rows.push(`<div class="contact-row"><strong>Community chat</strong><a href="${escapeHtml(links.communityChat)}" target="_blank" rel="noopener">Open community chat →</a></div>`);
  }
  if (hasValue(links.social)) {
    rows.push(`<div class="contact-row"><strong>Social media</strong><a href="${escapeHtml(links.social)}" target="_blank" rel="noopener">Visit BGSA social media →</a></div>`);
  }
  if (hasValue(links.feedbackForm)) {
    rows.push(`<div class="contact-row"><strong>Anonymous feedback</strong><a href="${escapeHtml(links.feedbackForm)}" target="_blank" rel="noopener">Open feedback form →</a></div>`);
  }

  mount.innerHTML = rows.length
    ? rows.join('')
    : `<div class="contact-row"><strong>Contact information</strong>Add BGSA email and community links in <code>site-config.js</code>.</div>`;
}

// ----------------------------
// Outlook calendar display
// ----------------------------
function eventDateParts(event) {
  if (!event?.start) return { month: '', day: '--', time: 'Time TBA', fullDate: '' };
  const allDay = Boolean(event.allDay);
  const date = allDay ? new Date(`${event.start}T12:00:00`) : new Date(event.start);
  if (Number.isNaN(date.getTime())) return { month: '', day: '--', time: 'Time TBA', fullDate: '' };

  const month = new Intl.DateTimeFormat('en-US', { month: 'short', timeZone: displayTimeZone }).format(date).toUpperCase();
  const day = new Intl.DateTimeFormat('en-US', { day: '2-digit', timeZone: displayTimeZone }).format(date);
  const fullDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', timeZone: displayTimeZone
  }).format(date);
  const time = allDay ? 'All day' : new Intl.DateTimeFormat('en-US', {
    hour: 'numeric', minute: '2-digit', timeZone: displayTimeZone
  }).format(date);
  return { month, day, time, fullDate };
}

function renderEventCard(event) {
  const { month, day, time } = eventDateParts(event);
  const title = escapeHtml(event.title || 'BGSA Event');
  const location = escapeHtml(event.location || 'See event details');
  const url = hasValue(event.url) ? escapeHtml(event.url) : 'events.html';
  const target = url === 'events.html' ? '' : ' target="_blank" rel="noopener"';
  const rsvpUrl = hasValue(event.rsvpUrl) ? escapeHtml(event.rsvpUrl) : '';
  return `
    <article class="event-card">
      <div class="event-date"><span class="month">${month}</span><span class="day">${day}</span></div>
      <div class="event-info">
        <h3><a class="event-title-link" href="${url}"${target}>${title}</a></h3>
        <div class="event-meta"><span>◷ ${escapeHtml(time)}</span><span>⌖ ${location}</span></div>
        ${rsvpUrl ? `<div class="event-actions"><a class="button mini orange" href="${rsvpUrl}" target="_blank" rel="noopener">RSVP</a></div>` : ''}
      </div>
    </article>`;
}

function renderAgendaItem(event) {
  const { month, day, time, fullDate } = eventDateParts(event);
  const title = escapeHtml(event.title || 'BGSA Event');
  const location = escapeHtml(event.location || 'Location TBA');
  const description = escapeHtml(event.description || '');
  const url = hasValue(event.url) ? escapeHtml(event.url) : '';
  const rsvpUrl = hasValue(event.rsvpUrl) ? escapeHtml(event.rsvpUrl) : '';
  return `
    <article class="agenda-item">
      <div class="agenda-date" aria-label="${escapeHtml(fullDate)}"><span class="month">${month}</span><span class="day">${day}</span></div>
      <div class="agenda-content">
        <div class="agenda-date-line">${escapeHtml(fullDate)} · ${escapeHtml(time)}</div>
        <h3>${title}</h3><div class="agenda-location">${location}</div>
        ${description ? `<p>${description}</p>` : ''}
        ${(rsvpUrl || url) ? `<div class="agenda-actions">${rsvpUrl ? `<a class="button mini orange" href="${rsvpUrl}" target="_blank" rel="noopener">RSVP</a>` : ''}${url ? `<a class="button mini outline" href="${url}" target="_blank" rel="noopener">Event details</a>` : ''}</div>` : ''}
      </div>
    </article>`;
}

// ----------------------------
// Monthly events calendar
// ----------------------------
let calendarViewYear = null;
let calendarViewMonth = null;
let calendarEvents = [];

function getDatePartsInDisplayTimeZone(date) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: displayTimeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(date);

  const values = Object.fromEntries(
    parts
      .filter((part) => part.type !== 'literal')
      .map((part) => [part.type, part.value])
  );

  return {
    year: Number(values.year),
    month: Number(values.month) - 1,
    day: Number(values.day)
  };
}

function makeDateKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function getEventDateKey(event) {
  if (!event?.start) return '';

  // All-day Outlook events normally use a YYYY-MM-DD date.
  if (event.allDay) {
    return String(event.start).slice(0, 10);
  }

  const date = new Date(event.start);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  const parts = getDatePartsInDisplayTimeZone(date);

  return makeDateKey(
    parts.year,
    parts.month,
    parts.day
  );
}

function renderMonthEvent(event) {
  const { time } = eventDateParts(event);
  const title = escapeHtml(event.title || 'BGSA Event');

  const eventUrl = hasValue(event.url)
    ? escapeHtml(event.url)
    : '#events-agenda';

  const externalAttributes = eventUrl !== '#events-agenda'
    ? ' target="_blank" rel="noopener noreferrer"'
    : '';

  return `
    <a
      class="month-calendar-event"
      href="${eventUrl}"
      ${externalAttributes}
    >
      <span class="month-calendar-event-time">
        ${escapeHtml(time)}
      </span>

      <span class="month-calendar-event-title">
        ${title}
      </span>
    </a>
  `;
}

function renderMonthCalendar() {
  const mount = document.querySelector('#events-calendar');
  const label = document.querySelector('#calendar-month-label');

  if (
    !mount ||
    calendarViewYear === null ||
    calendarViewMonth === null
  ) {
    return;
  }

  const monthName = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric'
  }).format(
    new Date(calendarViewYear, calendarViewMonth, 1)
  );

  if (label) {
    label.textContent = monthName;
  }

  mount.setAttribute(
    'aria-label',
    `${monthName} BGSA events calendar`
  );

  const firstWeekday = new Date(
    calendarViewYear,
    calendarViewMonth,
    1
  ).getDay();

  const daysInMonth = new Date(
    calendarViewYear,
    calendarViewMonth + 1,
    0
  ).getDate();

  const totalCells =
    Math.ceil((firstWeekday + daysInMonth) / 7) * 7;

  const todayParts =
    getDatePartsInDisplayTimeZone(new Date());

  const todayKey = makeDateKey(
    todayParts.year,
    todayParts.month,
    todayParts.day
  );

  const eventsByDay = new Map();

  calendarEvents.forEach((event) => {
    const dateKey = getEventDateKey(event);

    if (!dateKey) return;

    if (!eventsByDay.has(dateKey)) {
      eventsByDay.set(dateKey, []);
    }

    eventsByDay.get(dateKey).push(event);
  });

  // Keep multiple events on the same day in chronological order.
  eventsByDay.forEach((events) => {
    events.sort((first, second) => {
      return new Date(first.start) - new Date(second.start);
    });
  });

  const cells = [];

  for (let cell = 0; cell < totalCells; cell += 1) {
    const day = cell - firstWeekday + 1;

    if (day < 1 || day > daysInMonth) {
      cells.push(`
        <div
          class="month-calendar-day is-empty"
          aria-hidden="true"
        ></div>
      `);

      continue;
    }

    const dateKey = makeDateKey(
      calendarViewYear,
      calendarViewMonth,
      day
    );

    const dayEvents = eventsByDay.get(dateKey) || [];

    // Show up to three event labels in a calendar square.
    const visibleEvents = dayEvents.slice(0, 3);
    const moreCount = dayEvents.length - visibleEvents.length;

    const todayClass =
      dateKey === todayKey ? ' is-today' : '';

    cells.push(`
      <div
        class="month-calendar-day${todayClass}"
        role="gridcell"
      >
        <div class="month-calendar-day-number">
          ${day}
        </div>

        <div class="month-calendar-day-events">
          ${visibleEvents.map(renderMonthEvent).join('')}

          ${
            moreCount > 0
              ? `<a class="month-calendar-more" href="#events-agenda">+${moreCount} more</a>`
              : ''
          }
        </div>
      </div>
    `);
  }

  mount.innerHTML = cells.join('');
}

function moveCalendarMonth(amount) {
  const newMonth = new Date(
    calendarViewYear,
    calendarViewMonth + amount,
    1
  );

  calendarViewYear = newMonth.getFullYear();
  calendarViewMonth = newMonth.getMonth();

  renderMonthCalendar();
}

function initializeEventCalendar(events) {
  calendarEvents = Array.isArray(events)
    ? events
    : [];

  if (
    calendarViewYear === null ||
    calendarViewMonth === null
  ) {
    const today =
      getDatePartsInDisplayTimeZone(new Date());

    calendarViewYear = today.year;
    calendarViewMonth = today.month;
  }

  const previousButton =
    document.querySelector('#calendar-prev');

  const nextButton =
    document.querySelector('#calendar-next');

  const todayButton =
    document.querySelector('#calendar-today');

  if (previousButton) {
    previousButton.onclick = () => {
      moveCalendarMonth(-1);
    };
  }

  if (nextButton) {
    nextButton.onclick = () => {
      moveCalendarMonth(1);
    };
  }

  if (todayButton) {
    todayButton.onclick = () => {
      const today =
        getDatePartsInDisplayTimeZone(new Date());

      calendarViewYear = today.year;
      calendarViewMonth = today.month;

      renderMonthCalendar();
    };
  }

  renderMonthCalendar();
}
function setCalendarStatus(selector, heading, detail) {
  const mount = document.querySelector(selector);
  if (!mount) return;
  if (selector === '#upcoming-events') {
    mount.innerHTML = `<article class="event-card event-card-status"><div class="event-info"><h3>${escapeHtml(heading)}</h3><div class="event-meta"><span>${escapeHtml(detail || '')}</span></div></div></article>`;
  } else {
    mount.innerHTML = `<div class="calendar-placeholder compact-calendar-status"><div><div class="calendar-icon">▣</div><h3>${escapeHtml(heading)}</h3>${detail ? `<p>${escapeHtml(detail)}</p>` : ''}</div></div>`;
  }
}

async function loadCalendarEvents() {
  const upcomingMount =
    document.querySelector('#upcoming-events');

  const agendaMount =
    document.querySelector('#events-agenda');

  const calendarMount =
    document.querySelector('#events-calendar');

  if (
    !upcomingMount &&
    !agendaMount &&
    !calendarMount
  ) {
    return;
  }

  try {
    const response = await fetch(
      `data/events.json?ts=${Date.now()}`,
      {
        cache: 'no-store'
      }
    );

    if (!response.ok) {
      throw new Error(
        `Event data returned ${response.status}`
      );
    }

    const data = await response.json();

    const events = Array.isArray(data.events)
      ? data.events
      : [];

    // Homepage: show only the next three events.
    if (upcomingMount) {
      if (events.length) {
        upcomingMount.innerHTML = events
          .slice(0, 3)
          .map(renderEventCard)
          .join('');
      } else {
        setCalendarStatus(
          '#upcoming-events',
          'No upcoming events posted yet',
          'New BGSA events will appear here automatically after the Outlook calendar is connected.'
        );
      }
    }

    // Events page: show a navigable month calendar.
    if (calendarMount) {
      initializeEventCalendar(events);
    }

    // Events page: show complete event information.
    if (agendaMount) {
      if (events.length) {
        agendaMount.innerHTML = events
          .map(renderAgendaItem)
          .join('');
      } else {
        setCalendarStatus(
          '#events-agenda',
          'No upcoming events posted yet',
          'New events will appear here automatically from the shared BGSA Outlook calendar.'
        );
      }
    }
  } catch (error) {
    console.error(
      'Unable to load BGSA Outlook calendar events:',
      error
    );

    if (upcomingMount) {
      setCalendarStatus(
        '#upcoming-events',
        'Upcoming events are temporarily unavailable',
        'Please check the Events page or BGSA calendar.'
      );
    }

    if (calendarMount) {
      calendarMount.innerHTML = `
        <div class="month-calendar-message">
          The monthly calendar is temporarily unavailable.
        </div>
      `;
    }

    if (agendaMount) {
      setCalendarStatus(
        '#events-agenda',
        'Calendar temporarily unavailable',
        'Please try again shortly.'
      );
    }
  }
}

function configureOutlookCalendarLink() {
  const link = document.querySelector('#outlook-calendar-link');

  if (!link) return;

  const url = (site.links || {}).publicOutlookCalendar;

  if (hasValue(url)) {
    link.href = url.trim();
    link.hidden = false;
  } else {
    link.hidden = true;
    link.removeAttribute('href');
  }
}

bindSimpleContent();
renderFocusAreas();
configureHomepagePhoto();
renderLeadership();
renderMerchandise();
renderConnectLinks();
configureOutlookCalendarLink();
loadCalendarEvents();
