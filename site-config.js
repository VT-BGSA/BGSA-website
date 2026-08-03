/**
 * BGSA WEBSITE — MAIN EDITING FILE
 * =================================
 * Most routine website updates should happen HERE.
 *
 * You usually do NOT need to edit the HTML files.
 *
 * Common updates:
 * - officer names / roles / photos / bios
 * - organization email and social links
 * - homepage wording
 * - merchandise items and prices
 * - public Outlook calendar link
 *
 * EVENTS AND RSVPs ARE NOT ENTERED HERE.
 * Officers manage events in Outlook. For an event that needs registration,
 * add a standalone line to the Outlook event description:
 * RSVP: https://forms.office.com/...
 * The website will automatically create an RSVP button.
 *
 * Photo files should be placed in the assets/ folder.
 * Example: assets/president.jpg
 */
window.BGSA_SITE = {
  organization: {
    shortName: "BGSA",
    name: "Biological Sciences Graduate Student Association",
    affiliation: "at Virginia Tech",
    academicYear: "2026–2027",

    // Leave blank until you have an organization-controlled email.
    email: "",

    // Optional: use a separate treasurer email. If blank, the main BGSA email is used.
    treasurerEmail: "",

    disclaimer:
      "BGSA is a Registered Student Organization at Virginia Tech. It is a student-run organization and is not a department or agent of Virginia Tech."
  },

  homepage: {
    eyebrow: "Biological Sciences Graduate Student Association",
    headline: "Connecting graduate students across Biological Sciences",
    kicker: "at Virginia Tech",
    intro:
      "BGSA is a student-led organization that builds community, supports professional development, advocates for graduate student interests, and creates opportunities for engagement beyond the lab.",

    whoWeAre:
      "The Biological Sciences Graduate Student Association at Virginia Tech brings graduate students together across research areas and labs. We build community, share opportunities, create student-led programming, and help graduate students connect beyond their individual research groups.",

    // Replace this file with a real BGSA group/event photo when available.
    groupPhoto: "assets/group-placeholder.svg",
    groupPhotoAlt: "BGSA graduate students",
    groupPhotoCaption: "Add a BGSA group or event photo here.",

    merchandiseBlurb:
      "See current items and contact the treasurer for availability, payment, and pickup information."
  },

  about: {
    // This summary is based on the purpose stated in the supplied BGSA bylaws.
    mission:
      "BGSA consolidates and coordinates representation of Biology graduate students, supports communication among graduate students, GPSS, the Department of Biological Sciences, and the broader university community, and works to foster a united, cohesive, collaborative, and friendly graduate community."
  },

  links: {
    // Paste full URLs between the quotation marks. Leave blank to hide a link.
    communityChat: "",
    social: "",
    feedbackForm: "",

    // Optional public HTML/browser link created when publishing the Outlook calendar.
    // The private ICS feed belongs in the GitHub repository secret OUTLOOK_ICS_URL.
    publicOutlookCalendar: ""
  },

  calendar: {
    timeZone: "America/New_York"
  },

  focusAreas: [
    {
      icon: "◎",
      title: "Community",
      text: "Connecting graduate students across labs, disciplines, and stages of their programs."
    },
    {
      icon: "↗",
      title: "Professional Growth",
      text: "Creating opportunities for workshops, resources, mentorship, and shared learning."
    },
    {
      icon: "◁",
      title: "Advocacy",
      text: "Providing a student-led space to surface graduate student needs, ideas, and concerns."
    },
    {
      icon: "✦",
      title: "Outreach",
      text: "Connecting Biological Sciences graduate students with service and community opportunities."
    }
  ],

  leadership: {
    currentYear: "2026–2027",

    // To replace a photo:
    // 1. Put the image in assets/ (example: assets/michael-beall.jpg)
    // 2. Change the photo line below to that filename.
    current: [
      {
        role: "President",
        name: "Michael Beall",
        photo: "assets/leader-01.svg",
        affiliation: "",
        bio: "",
        linkText: "",
        linkUrl: ""
      },
      {
        role: "Vice President",
        name: "Benedicta Ottairoegbu",
        photo: "assets/leader-02.svg",
        affiliation: "",
        bio: "",
        linkText: "",
        linkUrl: ""
      },
      {
        role: "Treasurer",
        name: "Daria Smith",
        photo: "assets/leader-03.svg",
        affiliation: "",
        bio: "",
        linkText: "",
        linkUrl: ""
      },
      {
        role: "Secretary",
        name: "Emma White",
        photo: "assets/leader-04.svg",
        affiliation: "",
        bio: "",
        linkText: "",
        linkUrl: ""
      },
   {
        role: "GPSS Senator",
      name: "Sharat Paka",
      photo: "assets/sharat-paka.jpg",
      affiliation: "",
        bio: "My name is Sharat and I am from Virginia; I am currently working towards a PhD in the Scharf lab studying novel factors that play roles in cellular motility. Some of my hobbies outside lab include hiking, working on cars riding motorcycles, photography, and video games! I am excited to help serve you as a member of the BGSA!",
        linkText: "LinkedIn",
        linkUrl: "www.linkedin.com/in/sharatpaka"
    },
    {
        role: "GPSS Senator",
      name: "Sehasree Mohanta",
      photo: "assets/sehasree-mohanta.png",
      affiliation: "",
        bio: "Sehasree Mohanta is a Ph.D. student in the Department of Biological Sciences in the MCB Graduate Program at Virginia Tech, working in Dr. Iulia M. Lazar's laboratory. Her research focuses on cancer-derived extracellular vesicles, proteomics, and biomarker discovery, with a particular interest in cancer biology and mass spectrometry–based approaches. Outside the lab, she enjoys science communication, traveling, and practicing Indian classical dance.",
        linkText: "LinkedIn",
        linkUrl: "https://www.linkedin.com/in/sehasree-mohanta-aaa306202/"
    },
      {
        role: "Professional Development Chair",
        name: "Breanna Wimbush",
        photo: "assets/leader-06.svg",
        affiliation: "",
        bio: "",
        linkText: "",
        linkUrl: ""
      },
      {
        role: "Social Chair",
        name: "Juan-Carlos Mungarary",
        photo: "assets/leader-07.svg",
        affiliation: "",
        bio: "",
        linkText: "",
        linkUrl: ""
      },
      {
        role: "Outreach Chair",
        name: "Jay Margolis",
        photo: "assets/leader-08.svg",
        affiliation: "",
        bio: "",
        linkText: "",
        linkUrl: ""
      },
      {
        role: "Undergraduate Liaison",
        name: "Sophia Smith",
        photo: "assets/leader-09.jpeg",
        affiliation: "",
        bio: "Sophia Smith is a 3rd year Ph.D. student in Dr. Kendra Sewall’s lab, studying the effects of urbanization on the aggression and neuroendocrine profiles of song sparrows. As the Undergraduate Liaison, Sophia is eager to connect undergraduate students with research labs at VT, introducing hands-on opportunities to the next generation of scientists.",
        linkText: "",
        linkUrl: ""
      }
    ],

    previousYear: "2025–2026",
    previous: [
      { role: "President", name: "Beija Gore" },
      { role: "Vice President", name: "Casey McLaughlin" },
      { role: "Treasurer", name: "Benedicta Ottairoegbu" },
      { role: "Secretary", name: "Kikiowo Babatomiwa" },
      { role: "GPSS Delegates #1 & #2", name: "Jacob Sobol & Michael Beall" },
      { role: "Professional Development Co-Chairs", name: "Ellie Timmins & Maria Popescu" },
      { role: "Social Chair", name: "Abdeali Jivaji" },
      { role: "Outreach Chair", name: "Jay Margolis" },
      { role: "Undergraduate Liaison", name: "Eliza Tarimo" }
    ]
  },

  merchandise: {
    intro:
      "Browse current BGSA items, then contact the treasurer to confirm availability, payment, and pickup.",

    // Set visible: false to temporarily hide an item without deleting it.
    items: [
      {
        name: "BGSA T-Shirt",
        price: "Price TBA",
        image: "assets/merch-placeholder.svg",
        alt: "BGSA T-shirt",
        description: "Add shirt color, available sizes, fit, and design information here.",
        visible: true
      }
    ]
  }
};
