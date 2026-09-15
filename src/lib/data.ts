export const site = {
  name: "InterMedia Advertising",
  shortName: "InterMedia",
  email: "sales@im.agency",
  phone: "818.719.9977",
  linkedin: "https://www.linkedin.com/company/intermedia-advertising/",
  instagram: "https://www.instagram.com/intermediaadv/",
  facebook: "https://www.facebook.com/InterMediaAdvertising",
  newsletter: "https://intermedia.beehiiv.com/subscribe",
  description:
    "Strategic media buying, measurement, attribution, and analytics across linear TV and streaming. InterMedia is an independent full-service agency.",
};

export const navLinks = [
  { href: "/measurement", label: "Measurement" },
  { href: "/creative", label: "Creative" },
  { href: "/partnerships", label: "Partnerships" },
  { href: "/results", label: "Results" },
  { href: "/about", label: "About us" },
] as const;

export const pathLinks = [
  {
    href: "/new-to-tv",
    number: "01",
    title: "New to TV",
    description: "Build your first measurable TV campaign.",
  },
  {
    href: "/ctv",
    number: "02",
    title: "Expanding into CTV",
    description: "Reach audiences across streaming.",
  },
  {
    href: "/converged-tv",
    number: "03",
    title: "Ready for converged TV",
    description: "Connect linear and streaming in one plan.",
  },
  {
    href: "/contact",
    number: "04",
    title: "Talk to an expert",
    description: "Work through your next step with us.",
  },
] as const;

export const caseStudies = [
  {
    id: "premium",
    featured: true,
    homeOrder: 0,
    category: "PREMIUM CTV PERFORMANCE",
    metric: "+57%",
    unit: "more sales",
    filter: "Media",
    title: "Optimizing premium streaming for sales.",
    body: "Conversion-led optimization generated 57% more sales and reduced cost per sale 39% in five weeks.",
    approach:
      "Premium streaming media was optimized toward actual customer conversions, connecting buying decisions to sales performance.",
    result: "Sales increased 57% while cost per sale decreased 39% over five weeks.",
  },
  {
    id: "targeting",
    featured: true,
    homeOrder: 1,
    category: "HIGH-INTENT AUDIENCES",
    metric: "24%",
    unit: "lower lead cost",
    filter: "Media",
    title: "More efficient acquisition at greater scale.",
    body: "Audience targeting, strategic placements, and tailored creative improved efficiency while investment grew 38%.",
    approach:
      "Audience signals informed media placement and creative decisions, helping focus the campaign on people more likely to respond.",
    result: "Lead cost decreased 24% while media investment increased 38%.",
  },
  {
    id: "attribution",
    featured: true,
    homeOrder: 2,
    category: "MEASURING CTV THE RIGHT WAY",
    metric: "4–8×",
    unit: "more conversions identified",
    filter: "Measurement",
    title: "Seeing the full contribution of CTV.",
    body: "Three layers of attribution uncovered up to 8× more conversions tied to CTV exposure than pixel tracking alone.",
    approach:
      "The analysis combined three attribution layers to identify conversions associated with streaming exposure that pixel-only tracking missed.",
    result:
      "The broader approach identified 4–8× more conversions tied to CTV. This result describes measurement coverage; it does not claim the campaign generated 8× more sales.",
  },
  {
    id: "scale",
    featured: false,
    homeOrder: 3,
    category: "SCALING TV PERFORMANCE",
    metric: "6×",
    unit: "budget growth",
    filter: "Media",
    title: "Scaling a campaign past its growth ceiling.",
    body: "A campaign grew from a $50M ceiling to $300M+, alongside a 24% reduction in CPA and a 17% increase in brand lift.",
    approach:
      "InterMedia connected planning, buying, and campaign optimization to support a larger TV investment while tracking acquisition efficiency.",
    result:
      "The campaign scaled to $300M+ from a $50M growth ceiling. CPA decreased 24% and brand lift increased 17%.",
  },
  {
    id: "intelligence",
    featured: false,
    homeOrder: 4,
    category: "CTV CONTENT INTELLIGENCE",
    metric: "94%",
    unit: "show-level visibility",
    filter: "Measurement",
    title: "Knowing where streaming impressions run.",
    body: "Program-level transparency across approximately 94% of CTV impressions helped inform media optimization.",
    approach:
      "Program-level reporting gave planners a clearer view of the content carrying CTV impressions and provided a signal for optimization.",
    result: "Approximately 94% of CTV impressions had show-level visibility.",
  },
] as const;

export type CaseStudy = (typeof caseStudies)[number];

export const team = [
  { name: "Bob Yallen", role: "President & CEO", photo: "/team/bob-yallen.png" },
  { name: "Kevin Szymanski", role: "Executive Vice President", photo: "/team/kevin-szymanski.png" },
  { name: "Kris Johnson", role: "Senior Vice President, Growth", photo: "/team/kris-johnson.png" },
  { name: "Lindsay Shultz", role: "Senior Vice President, Media Director", photo: "/team/lindsay-shultz.png" },
  { name: "Dan Schlafman", role: "Chief Analytics Officer", photo: "/team/dan-schlafman.png" },
  { name: "David Nyurenberg", role: "SVP, Digital", photo: "/team/david-nyurenberg.png" },
  { name: "Joe Gonzales", role: "Vice President, Creative Director", photo: "/team/joe-gonzales.png" },
  { name: "Guy Sabatano", role: "Vice President, Data & Technology", photo: "/team/guy-sabatano.png" },
  { name: "Jackie Rivera", role: "Vice President, Account Group Director", photo: "/team/jackie-rivera.png" },
  { name: "Stephanie Murphy", role: "Senior Insights Analyst", photo: "/team/stephanie-murphy.png" },
  { name: "Grace Gillespie", role: "Growth & Partnerships Strategist", photo: "/team/grace-gillespie.png" },
  { name: "Rico Peña", role: "Director of Media Operations", photo: "/team/rico-pena.png" },
  { name: "Jennifer Khadavi", role: "Associate Media Director", photo: "/team/jennifer-khadavi.png" },
  { name: "Lorraine Galano", role: "Account Director", photo: "/team/lorraine-galano.png" },
  { name: "Melanie McLean", role: "Account Director", photo: "/team/melanie-mclean.png" },
  { name: "Angela Yadegar", role: "Chief Financial Officer", photo: "/team/angela-yadegar.png" },
  { name: "Joseph Poulose", role: "Chief Operating Officer / Chief Information Officer", photo: "/team/joseph-poulose.png" },
  { name: "Jason Ninness", role: "Head of Production", photo: "/team/jason-ninness.png" },
  { name: "Tim Wright", role: "Vice President, Director of Human Resources", photo: "/team/tim-wright.png" },
  { name: "Hunington Sachs", role: "Vice President, Business & Legal Affairs", photo: "/team/hunington-sachs.png" },
  {
    name: "Christina LaMair",
    role: "Director of Client and Media Performance",
    photo: null,
    placeholder: true,
    note: "Identified from public InterMedia materials. Headshot not available in the gallery or official About page.",
  },
  {
    name: "Derek Shipp",
    role: "Vice President of Media Planning & Brand Integration",
    photo: null,
    placeholder: true,
    note: "Identified from InterMedia’s public appointment announcement. Headshot not available in the gallery or official About page.",
  },
] as const;

export const faqs = [
  {
    title: "What is converged TV?",
    body: "A coordinated approach to planning, buying, and measuring linear television and streaming. A shared audience and performance strategy guides the investment across both.",
  },
  {
    title: "How does TV attribution work?",
    body: "Media exposure and response signals are analyzed against a baseline to estimate the contribution of specific airings and placements. Accutrak® uses multiple methods, including timing, geography, recency, and time decay.",
  },
  {
    title: "How do you measure TV ROI?",
    body: "We connect campaign investment to business outcomes through attribution and broader analysis. The measurement plan depends on your goals, available data, and customer purchase cycle.",
  },
  {
    title: "How much does TV advertising cost?",
    body: "Costs vary with audience, markets, media environments, creative production, and campaign scope. A planning conversation establishes the budget needed for a useful test or ongoing campaign.",
  },
  {
    title: "How do I know when my brand is ready for TV?",
    body: "A defined customer, a clear offer, trackable outcomes, and the operational ability to support demand are useful starting points. We review those factors alongside your acquisition goals.",
  },
  {
    title: "How should a brand test TV before scaling?",
    body: "Establish an objective and baseline, define the test, activate a focused media plan, and evaluate the response. Use those findings to refine the next investment.",
  },
] as const;

export const timeline = [
  { year: "1974", title: "InterMedia is founded", body: "Syd Yallen launches InterMedia with a bold focus on performance-driven media buying, laying the foundation for response-based TV advertising." },
  { year: "1980s", title: "Direct response grows", body: "Television becomes an accountable growth channel for more brands." },
  { year: "1995", title: "Breaking $400M in DRTV billings", body: "InterMedia surpasses $400 million in direct response TV billings, cementing its position as a leader in performance-driven media buying." },
  { year: "2000s", title: "Brand + performance", body: "Direct response principles support a broader roster of national brands." },
  { year: "2010s", title: "A clearer view of media", body: "Proprietary measurement and attribution develop through Accutrak®." },
  { year: "2020", title: "Connected TV joins the lineup", body: "InterMedia expands its offering with CTV integrations, enabling clients to reach audiences across linear and streaming under one performance-driven strategy." },
  { year: "2024", title: "Fifty years", body: "InterMedia celebrates five decades of independent media expertise." },
  { year: "Today", title: "CTV curation & agency evolution", body: "A premium CTV curation product lets brands activate top-tier publisher inventory through their own DSP seats, with greater transparency, control, and efficiency." },
] as const;

export const partners = [
  "Amazon",
  "CAA",
  "Disney",
  "FOX",
  "Hulu",
  "LEARFIELD",
  "Legends",
  "MLB",
  "NBA",
  "NBCU",
  "NCAA",
  "Netflix",
  "NFL",
  "NHL",
  "Oak View Group",
  "Paramount Skydance",
  "TKO",
  "Tubi",
  "Twitch",
  "Warner Bros. Discovery",
] as const;

export const partnershipTypes = [
  { title: "Sponsorships + segments", body: "Branded segments, sponsored features, programming, sports and entertainment sponsorships, and opportunities with category exclusivity." },
  { title: "Custom integrations + content", body: "Talent integrations, host reads, product placement, original content, and custom executions developed around the brand." },
  { title: "Talent + brand ambassadors", body: "Creators, athletes, celebrities, and entertainment personalities selected for brand and audience alignment." },
  { title: "Creative + strategic development", body: "Our internal creative and production teams support partnership ideation, concepts, content, and execution." },
  { title: "Experiential + out-of-home", body: "Live events, fan experiences, sampling, local market activations, digital out-of-home, signage, and venue integrations." },
  { title: "Converged media + amplification", body: "Broadcast, cable, streaming, digital, and social extensions amplify the core partnership across platforms." },
] as const;

export const researchPartners = [
  { name: "YouGov", body: "Audience research, consumer profiling, behaviors, and media consumption." },
  { name: "Comscore", body: "Cross-platform audience measurement and viewing insights." },
  { name: "MediaRadar", body: "Competitive media intelligence, ad spend, and marketplace trends." },
  { name: "iSpot", body: "TV advertising intelligence and campaign insights." },
  { name: "Prescient", body: "Marketing mix modeling and broader business contribution." },
  { name: "Experian Mosaic", body: "Household segmentation to support audience profiling and planning." },
] as const;

export const dashboards = [
  { id: "overview", label: "Overview", file: "/dashboards/dashboard-overview.png", alt: "Accutrak performance overview dashboard" },
  { id: "lift", label: "Response & airings", file: "/dashboards/dashboard-lift.png", alt: "Accutrak response above baseline and television airings" },
  { id: "ctv", label: "CTV performance", file: "/dashboards/dashboard-ctv.png", alt: "Accutrak connected TV performance" },
  { id: "test", label: "Test vs. control", file: "/dashboards/dashboard-test.png", alt: "Accutrak test and control campaign comparison" },
  { id: "analysis", label: "AI analysis", file: "/dashboards/dashboard-analysis.png", alt: "Accutrak decomposition tree for media analysis" },
] as const;

export const creativePhotos = [
  { id: "field-setup", src: "/bts/bts-field-setup-960.webp", title: "Building the shot", caption: "A camera operator and crew arrange lighting and sound on a baseball field.", alt: "Production crew with a camera rig, diffusion screens, and boom microphone on a baseball field" },
  { id: "production-notes", src: "/bts/bts-production-notes-960.webp", title: "Preparing the next take", caption: "A crew member reviews production notes beside the camera equipment.", alt: "Crew member wearing a headset and writing production notes beside a monitor" },
  { id: "night-shoot", src: "/bts/bts-night-shoot-960.webp", title: "Lighting for an evening shoot", caption: "The crew sets a camera position and lights the field as daylight fades.", alt: "Camera operator on a ladder filming a performer on a baseball field at dusk" },
  { id: "playback-review", src: "/bts/bts-playback-review-960.webp", title: "A view from the monitor", caption: "The camera monitor shows the framing during a take on the field.", alt: "Production monitor displaying a performer framed on a baseball field" },
  { id: "filming-stands", src: "/bts/bts-filming-stands-960.webp", title: "Filming in the stands", caption: "Camera and lighting teams work around a group scene in the stadium seats.", alt: "Camera crew filming a group of performers seated in stadium stands" },
  { id: "camera-movement", src: "/bts/bts-camera-movement-960.webp", title: "Camera movement on the field", caption: "A camera operator follows the action with a stabilized camera rig.", alt: "Camera operator following a performer with a baseball bat across the field" },
  { id: "talent-camera", src: "/bts/bts-talent-camera-960.webp", title: "Talent in front of the camera", caption: "A performer delivers a scene while the camera team frames the shot.", alt: "Performer speaking toward a production camera at a baseball stadium" },
  { id: "crew-framing", src: "/bts/bts-crew-framing-960.webp", title: "Framing the shot", caption: "The crew positions a light modifier around the performer before the take.", alt: "Crew positioning a red-framed light modifier beside a performer near the dugout" },
  { id: "location-work", src: "/bts/bts-location-work-960.webp", title: "Working on location", caption: "The production team and performers prepare a scene in an automotive workshop.", alt: "Production crew, performers, lights, and camera equipment inside an automotive workshop" },
  { id: "between-takes", src: "/bts/bts-between-takes-960.webp", title: "Between takes", caption: "A moment with the performers and crew between camera setups.", alt: "Performers and crew gathered around camera equipment during a break between takes" },
  { id: "field-direction", src: "/bts/bts-field-direction-960.webp", title: "Working through the scene", caption: "The camera team and performer work through a setup on the field.", alt: "Camera operator and performer reviewing a scene on the baseball field" },
] as const;

export const creativeServices = [
  { photo: "production-notes", number: "01", title: "Creative strategy", text: "Develop the audience, message, offer, and concept around a clear campaign objective.", detail: "Research · Concepts · Scripts" },
  { photo: "night-shoot", number: "02", title: "Production & post", text: "Bring the concept to screen through casting, location planning, production, editing, and delivery.", detail: "Casting · Production · Editing" },
  { photo: "playback-review", number: "03", title: "Audits & optimization", text: "Review the advertising you already have and identify what to refine, replace, or test.", detail: "Asset reviews · Versioning · Refinement" },
  { photo: "filming-stands", number: "04", title: "Creative testing", text: "Connect creative choices to campaign response, then use the results to guide the next version.", detail: "Testing · Response analysis · Iteration" },
] as const;

export const creativeSteps = [
  { title: "Establish the baseline", body: "Benchmark new creative against the current top performer by network segment." },
  { title: "Test one variable", body: "Isolate a single creative element at a time for cleaner A/B results." },
  { title: "Prove what works", body: "Use historical performance to determine the airings needed to reach 95% confidence." },
  { title: "Optimize in flight", body: "Track performance by channel, daypart, and audience with Accutrak® so the team can act on results." },
  { title: "Scale or iterate", body: "Increase investment in winning creative. Refine and retest other versions." },
] as const;

export const measurementProcess = [
  { title: "Modeling response by minute", body: "Establish baseline response predictions to isolate incremental impact." },
  { title: "Attribution by airing", body: "Evaluate exposure, geography, and recency to determine which placements deserve credit." },
  { title: "Advanced tracking", body: "Combine response signals, geographic precision, and media data to measure complex TV environments." },
  { title: "Time decay analysis", body: "Account for how the contribution of an exposure changes over time." },
] as const;

export const measurementUses = [
  { title: "Performance dashboards", body: "Explore Accutrak® performance data through interactive dashboards built to make insights accessible and actionable." },
  { title: "Custom data feeds", body: "Bring Accutrak® insights directly into your existing reporting and analytics platforms." },
  { title: "Marketing mix modeling + attribution", body: "Connect attribution of individual responses with a broader view of how media contributes to business outcomes." },
  { title: "Audience + competitive analysis", body: "Use consumer profiling, segmentation, competitive intelligence, and brand analysis to guide planning." },
  { title: "Creative fatigue + frequency", body: "Understand changes in creative response and effective frequency to inform what to test and where to adjust." },
] as const;

export const capabilities = {
  media: {
    number: "01",
    label: "LINEAR TV + CTV + ONLINE VIDEO",
    title: "Put your investment where it can perform.",
    description: "Connect audience planning, premium inventory, negotiation, and ongoing optimization in one media strategy.",
    items: ["Integrated linear and streaming planning", "Direct network and publisher relationships", "Campaign optimization informed by response"],
    link: "Explore converged TV",
    href: "/converged-tv",
  },
  measurement: {
    number: "02",
    label: "ATTRIBUTION + ANALYTICS",
    title: "Understand the contribution of your media.",
    description: "Connect media exposure to business outcomes with Accutrak, reporting, and marketing mix modeling.",
    items: ["Response baselines and airing analysis", "Measurement across linear TV and streaming", "Reporting designed to inform investment"],
    link: "Explore measurement",
    href: "/measurement",
  },
  strategy: {
    number: "03",
    label: "AUDIENCE + COMPETITIVE INTELLIGENCE",
    title: "Start with the audience and the business objective.",
    description: "Build your campaign around the people you need to reach, the market you operate in, and the results you want to achieve.",
    items: ["Audience research and viewing behavior", "Competitive media analysis", "An integrated plan for creative and media"],
    link: "Find your starting point",
    href: "/new-to-tv",
  },
  creative: {
    number: "04",
    label: "DEVELOP + AUDIT + IMPROVE",
    title: "Creative informed by performance.",
    description: "Develop new advertising, audit existing work, or improve assets that need to perform better. Our creative team works alongside your media and measurement teams.",
    items: ["Creative strategy and existing asset audits", "Production, editing, and versioning", "Testing and optimization using campaign response"],
    link: "Explore creative",
    href: "/creative",
  },
  partnerships: {
    number: "05",
    label: "NETWORKS + TALENT + INTEGRATIONS",
    title: "Create a relevant place for your brand.",
    description: "Build sponsorships, integrations, and talent relationships that fit your audience and support the wider media plan.",
    items: ["Sports and entertainment partnerships", "Talent selection and brand integrations", "Negotiation, activation, and measurement"],
    link: "Explore partnerships",
    href: "/partnerships",
  },
} as const;

export const measurementSteps = [
  { label: "Media exposure & response", number: "01 / CONNECT", title: "Put media and response on the same timeline.", text: "Align TV airings with response signals to build a view of campaign activity." },
  { label: "Response above the baseline", number: "02 / UNDERSTAND", title: "Evaluate the contribution of TV exposure.", text: "Baseline modeling and attribution help distinguish campaign response from activity that would otherwise be expected." },
  { label: "Findings that inform the next plan", number: "03 / REFINE", title: "Use the findings in your next buying decision.", text: "Review performance by placement, audience, and creative to decide what to refine, test, and scale." },
] as const;

export const pathPages = {
  "new-to-tv": {
    label: "New to TV",
    title: "Give your brand room to grow.",
    description: "When digital acquisition starts to plateau, TV can help you reach new audiences. We build a measured approach to testing, learning, and scaling.",
    heading: "A clear plan for your first TV campaign.",
    copy: "InterMedia brings five decades of TV experience to your next stage of growth. We connect audience research, creative development, media activation, and measurement so your first test produces useful evidence.",
    steps: [
      { title: "Understand your audience", body: "Identify the customers you want to reach, what they watch, and the business outcomes you need to measure." },
      { title: "Build the test", body: "Create the message, choose the media mix, and establish a measurement plan before the first airing." },
      { title: "Learn before scaling", body: "Review response and acquisition efficiency, then refine placements and creative as the evidence develops." },
    ],
    faqs: [
      { title: "How do I know if my brand is ready?", body: "A clear offer, a defined customer, and a reliable way to track response create a useful starting point. We also review your current acquisition economics and ability to support additional demand." },
      { title: "How much should a first test cost?", body: "Test budgets depend on audience, markets, inventory, creative, and measurement needs. We develop the budget around a specific learning objective and discuss the tradeoffs before activation." },
      { title: "How will we measure performance?", body: "We establish the business outcomes and baseline first, then connect media exposure to response through Accutrak® and supporting analysis." },
    ],
  },
  ctv: {
    label: "Expanding into CTV",
    title: "Reach your audience across streaming.",
    description: "Extend your linear TV plan into premium streaming, using audience signals and performance data to guide where you invest.",
    heading: "Expand the reach of your media plan.",
    copy: "CTV gives brands additional ways to reach audiences likely to respond across live sports, entertainment, FAST channels, and premium streaming. We integrate those opportunities with your linear plan and evaluate how the full mix performs.",
    steps: [
      { title: "Map viewing behavior", body: "Connect audience research with where your customers spend time across linear and streaming." },
      { title: "Plan incremental reach", body: "Choose inventory and targeting that expand the audience while managing duplication and frequency." },
      { title: "Measure the contribution", body: "Use unified attribution and insight into each program to evaluate streaming alongside the rest of the media mix." },
    ],
    faqs: [
      { title: "What is CTV?", body: "Connected TV refers to television delivered through devices connected to the internet, including smart TVs and streaming devices. Inventory can include subscription streaming, ad-supported services, and live programming." },
      { title: "How does CTV work with linear TV?", body: "Linear offers broad reach through scheduled programming. CTV adds audience targeting and streaming environments. We plan both together and assess reach, duplication, and business outcomes." },
      { title: "Can we see where the ads ran?", body: "Available reporting varies by publisher and inventory. InterMedia uses content intelligence and partner data to improve visibility and inform optimization." },
    ],
  },
  "converged-tv": {
    label: "Converged TV",
    title: "One strategy for linear TV and streaming.",
    description: "Bring linear and streaming together in one plan built around your audience, with shared measurement and continuous optimization.",
    heading: "A complete view of your TV investment.",
    copy: "We combine audience insights, premium inventory access, performance data, and unified measurement to plan TV holistically. Buying decisions reflect how channels work together and how the campaign supports your business goals.",
    steps: [
      { title: "Profile and plan", body: "Map your audience across content, platforms, and geography to establish a coordinated linear and CTV plan." },
      { title: "Activate across screens", body: "Align buying, creative, and targeting across the media mix, with direct access to premium inventory." },
      { title: "Optimize together", body: "Evaluate channel contribution in a shared measurement system and adjust the plan as performance develops." },
    ],
    faqs: [
      { title: "What is converged TV?", body: "Converged TV is a coordinated approach to planning, buying, and measuring linear television and streaming. Audience and performance data guide decisions across both." },
      { title: "How do you manage duplicated reach?", body: "Audience and data across platforms help us assess overlap and viewing behavior. We use those insights to adjust placements, frequency, and investment." },
      { title: "What does unified measurement include?", body: "Accutrak® connects media exposure to response, while marketing mix modeling, audience analysis, and other methods help assess broader business contribution." },
    ],
  },
} as const;

export const beliefs = [
  "We believe that the future of TV isn’t linear or CTV. It’s both.",
  "We believe that performance and premium aren’t mutually exclusive.",
  "We believe that brands deserve better access, and better economics.",
  "We believe in giving marketers more control, not more confusion.",
] as const;

export const contactInterests = [
  "New to TV",
  "Expanding into CTV",
  "Converged TV",
  "Measurement",
  "Creative",
  "Partnerships",
  "Help choosing an approach",
] as const;
