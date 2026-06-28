// Central data layer for the portfolio experience.
// Organized by chapter to mirror the narrative structure.

export const PROFILE = {
  name: "Sanskar Singh",
  title: "Technology Consultant",
  tagline: "Crafting Intelligent Digital Ecosystems",
  rotatingTaglines: [
    "Crafting Intelligent Digital Ecosystems",
    "Transforming Complexity into Scalable Innovation",
    "Building the Future Through Cloud, Data & AI",
    "Engineering Business Intelligence at Scale",
  ],
  location: "India",
  email: "hello@sanskarsingh.com",
  phone: "+91 98XXXXXX21",
  linkedin: "https://www.linkedin.com/in/sanskarsingh/",
  summary:
    "Certified Microsoft Technology Consultant and Cloud Architect specializing in Microsoft Dynamics 365, Power Platform, Azure, and enterprise data ecosystems. I design and deliver intelligent digital ecosystems that unify cloud infrastructure, business applications, automation, and AI — turning complexity into scalable innovation for global enterprises.",
};

export const STATS = [
  { value: "6+", label: "Years Experience", sub: "Cloud · Enterprise · AI" },
  { value: "40+", label: "Enterprise Projects", sub: "Delivered Globally" },
  { value: "10+", label: "Certifications", sub: "Microsoft · AWS · Atlassian" },
  { value: "5+", label: "Cloud Platforms", sub: "Azure · AWS · M365 · Zoho" },
  { value: "15+", label: "Global Clients", sub: "Enterprise & SMB" },
  { value: "4", label: "Industries", sub: "Tech · Audio · Maps · Edu" },
];

export const SKILL_NODES = [
  // Cloud
  { id: "azure", label: "Azure", category: "Cloud", level: 95, x: 0, y: 0, z: 0, color: "#0078D4",
    desc: "Cloud infrastructure, networking, identity, and compute at scale." },
  { id: "aws", label: "AWS", category: "Cloud", level: 88, x: 1.2, y: 0.4, z: -0.6, color: "#FF9900",
    desc: "EC2, S3, Lambda, ML services, and large-scale migrations." },
  { id: "m365", label: "Microsoft 365", category: "Cloud", level: 96, x: -1.1, y: 0.5, z: -0.4, color: "#D83B01",
    desc: "Tenant design, Exchange, Teams, SharePoint, governance." },
  { id: "zoho", label: "Zoho One", category: "Cloud", level: 92, x: 0.6, y: -0.9, z: 0.4, color: "#E42528",
    desc: "Full-suite CRM, Books, Desk, Creator implementations." },

  // Microsoft
  { id: "d365", label: "Dynamics 365", category: "Microsoft", level: 95, x: -0.4, y: 1.2, z: 0.3, color: "#002050",
    desc: "Sales, Service, CE/CRM customizations and integrations." },
  { id: "pp", label: "Power Platform", category: "Microsoft", level: 94, x: 0.9, y: 1.1, z: 0.2, color: "#742774",
    desc: "Power Apps, Power Automate, Power Pages, Power BI." },
  { id: "pbi", label: "Power BI", category: "Microsoft", level: 92, x: -1.3, y: -0.2, z: 0.5, color: "#F2C811",
    desc: "Dashboards, DAX, data modeling, enterprise reporting." },
  { id: "entra", label: "Entra ID", category: "Microsoft", level: 90, x: 0.3, y: -1.2, z: -0.3, color: "#2D7D9A",
    desc: "Identity, conditional access, hybrid AD, governance." },
  { id: "sp", label: "SharePoint", category: "Microsoft", level: 93, x: -0.9, y: -1.0, z: -0.5, color: "#038387",
    desc: "Intranets, document management, Power Automate flows." },

  // AI & Data
  { id: "ai", label: "AI & ML", category: "AI", level: 86, x: 1.4, y: -0.5, z: 0.6, color: "#6EEBFF",
    desc: "ML workflows, Azure OpenAI, automation with intelligence." },
  { id: "py", label: "Python", category: "AI", level: 85, x: 1.0, y: -0.1, z: -0.9, color: "#FFD43B",
    desc: "Data pipelines, scripting, ML, automation." },
  { id: "da", label: "Data Analytics", category: "AI", level: 90, x: -0.2, y: 0.2, z: 1.1, color: "#00F0FF",
    desc: "ETL, modeling, BI, data-driven decision systems." },
  { id: "ml-aws", label: "AWS ML", category: "AI", level: 80, x: 0.7, y: 0.8, z: -0.9, color: "#FF9900",
    desc: "SageMaker, Rekognition, Comprehend, forecast services." },

  // Automation
  { id: "bpa", label: "Business Automation", category: "Automation", level: 92, x: -0.6, y: -0.7, z: 0.9, color: "#00B8FF",
    desc: "End-to-end workflow automation across business units." },
  { id: "bdr", label: "Backup & DR", category: "Automation", level: 88, x: 1.3, y: 0.7, z: 0.4, color: "#6EEBFF",
    desc: "Veeam, Acronis, Azure Backup, BaaS architectures." },

  // Cybersecurity
  { id: "sec", label: "Cybersecurity", category: "Security", level: 87, x: -1.2, y: 0.8, z: -0.7, color: "#FF3366",
    desc: "Defender, Sentinel, Zero Trust, threat modeling." },

  // DevOps
  { id: "devops", label: "DevOps", category: "DevOps", level: 84, x: 0.0, y: 0.9, z: -0.8, color: "#00F0FF",
    desc: "CI/CD, IaC, GitLab, containerized workloads." },
  { id: "jira", label: "Jira / Atlassian", category: "DevOps", level: 90, x: -0.5, y: -0.3, z: -0.9, color: "#2684FF",
    desc: "Jira, Confluence, Service Management administration." },
  { id: "sf", label: "Scalefusion MDM", category: "DevOps", level: 82, x: 1.1, y: -0.8, z: -0.2, color: "#6EEBFF",
    desc: "Mobile device management, policy, and compliance." },
];

export const EXPERIENCES = [
  {
    id: "consultedge",
    company: "ConsultEdge Global Services",
    role: "Technology Consultant · Cloud & Enterprise Solutions",
    period: "2022 — Present",
    location: "India · Global Clients",
    color: "#00F0FF",
    theme: "Enterprise Innovation Hub",
    tagline: "Architecting the digital core of global enterprises.",
    bullets: [
      "Led Dynamics 365 CE/CRM implementations for enterprise clients including TOSEI, TAHAL, and NEC — end-to-end delivery from discovery to go-live.",
      "Designed and deployed Azure infrastructure, networking, identity (Entra ID), and hybrid cloud architectures for multi-region rollouts.",
      "Built Power Platform solutions — Power Apps, Power Automate, Power Pages — that unified business workflows and reduced manual effort by 60%+.",
      "Delivered Backup-as-a-Service and Disaster Recovery solutions using Veeam, Acronis, and Azure Backup for regulated industries.",
      "Implemented Zoho One full-suite rollouts with deep customization, automation, and analytics.",
      "Conducted cybersecurity hardening: Microsoft Defender, Sentinel, conditional access, Zero Trust frameworks.",
    ],
  },
  {
    id: "beats",
    company: "Beats by Dre",
    role: "Data & Analytics Consultant",
    period: "2021 — 2022",
    location: "Global Brand",
    color: "#FF2D55",
    theme: "Data Analytics Laboratory",
    tagline: "Turning sound into signal through data.",
    bullets: [
      "Built enterprise-grade Power BI dashboards and reports for sales, marketing, and supply chain teams across global markets.",
      "Designed ETL pipelines integrating CRM, ERP, and marketing platforms into a unified analytics warehouse.",
      "Delivered data-driven insights that shaped product launches, regional campaigns, and retail strategy.",
      "Automated reporting workflows, reducing manual reporting time from days to minutes.",
    ],
  },
  {
    id: "here",
    company: "HERE Technologies",
    role: "Technology Specialist",
    period: "2020 — 2021",
    location: "Mapping · Location Platform",
    color: "#48DAD0",
    theme: "Digital Mapping Studio",
    tagline: "Engineering the intelligence of movement.",
    bullets: [
      "Worked on the HERE location platform supporting geospatial services, navigation data, and enterprise APIs.",
      "Built tooling and automation for ingesting, processing, and validating large-scale map and telemetry datasets.",
      "Collaborated with engineering teams to streamline data pipelines and developer experience.",
    ],
  },
  {
    id: "oll",
    company: "Online Live Learning",
    role: "Technology & Operations Lead",
    period: "2018 — 2020",
    location: "EdTech",
    color: "#9D4EDD",
    theme: "Educational Technology Center",
    tagline: "Rebuilding the classroom as a digital experience.",
    bullets: [
      "Led technology operations for a live-learning platform serving thousands of students and educators.",
      "Implemented Microsoft 365, SharePoint, and Teams for collaboration across academic and operations teams.",
      "Built student engagement analytics and reporting systems to improve learning outcomes.",
      "Managed Jira, Confluence, and Atlassian tooling for engineering and operations teams.",
    ],
  },
];

export const PROJECTS = [
  {
    id: "d365-enterprise",
    title: "Dynamics 365 Enterprise Rollouts",
    client: "TOSEI · TAHAL · NEC",
    category: "Microsoft Dynamics",
    color: "#0078D4",
    problem: "Global enterprises operating with fragmented CRM systems, manual sales pipelines, and disconnected service operations across regions.",
    architecture: [
      "Dynamics 365 CE · Sales · Customer Service",
      "Power Platform · Power Apps · Power Automate",
      "Azure AD / Entra ID · Dataverse",
      "Power BI · Custom dashboards",
      "Azure Logic Apps · API Management",
    ],
    solution: "End-to-end D365 implementations: discovery, solution design, customization, integration, data migration, training, and hyper-care.",
    outcome: "Unified 360° customer view, automated workflows, 60%+ reduction in manual effort, faster time-to-insight for sales and service teams.",
  },
  {
    id: "azure-infra",
    title: "Azure Cloud Infrastructure Transformation",
    client: "Multi-region Enterprise",
    category: "Cloud Architecture",
    color: "#00B8FF",
    problem: "Legacy on-premise infrastructure with high costs, limited scalability, and compliance gaps.",
    architecture: [
      "Azure Virtual Networks · Hub-Spoke topology",
      "Azure AD / Entra ID · Conditional Access",
      "Azure Compute · App Services · AKS",
      "Azure Backup · Site Recovery",
      "Defender for Cloud · Sentinel",
    ],
    solution: "Designed and deployed multi-region Azure landing zones, hybrid identity, networking, and security baselines.",
    outcome: "Improved reliability, 40% TCO reduction, hardened security posture, and elastic scale for global workloads.",
  },
  {
    id: "aws-migration",
    title: "AWS Cloud Migration & ML Enablement",
    client: "Enterprise Client",
    category: "AWS · Migration",
    color: "#FF9900",
    problem: "Workloads trapped in legacy data centers with limited disaster recovery and no ML capability.",
    architecture: [
      "AWS EC2 · S3 · RDS · VPC",
      "AWS Migration Hub · DMS",
      "SageMaker · Comprehend · Rekognition",
      "IAM · CloudTrail · GuardDuty",
      "CloudFormation IaC",
    ],
    solution: "Lift-and-shift + refactor migration to AWS, with ML services integrated for analytics and automation.",
    outcome: "Fully migrated production workloads, integrated ML pipelines, real-time analytics, and improved resilience.",
  },
  {
    id: "baas",
    title: "Backup-as-a-Service Platform",
    client: "SMB & Enterprise Clients",
    category: "Resilience · BaaS",
    color: "#6EEBFF",
    problem: "Clients lacked enterprise-grade backup, retention policies, and disaster recovery capabilities.",
    architecture: [
      "Veeam · Acronis",
      "Azure Blob · AWS S3",
      "Azure Backup · Site Recovery",
      "Policy-driven retention",
      "Tenant-aware multi-client platform",
    ],
    solution: "Built a multi-tenant BaaS platform with automated onboarding, retention, and DR orchestration.",
    outcome: "Predictable RTO/RPO, regulatory compliance, recurring managed-service revenue stream.",
  },
  {
    id: "zoho-impl",
    title: "Zoho One Full-Suite Implementations",
    client: "Multiple SMB Clients",
    category: "Zoho · CRM",
    color: "#E42528",
    problem: "Disjointed sales, finance, and support tools with no unified view of the customer.",
    architecture: [
      "Zoho CRM · Books · Desk",
      "Zoho Creator · Custom Apps",
      "Zoho Analytics · Workflows",
      "Zoho Campaigns · Social",
      "Integrations via REST APIs",
    ],
    solution: "Deployed and customized the full Zoho One suite, with bespoke Creator apps and analytics.",
    outcome: "Single source of truth across departments, automation of lead-to-cash, measurable uplift in conversions.",
  },
  {
    id: "power-automate",
    title: "Power Platform Enterprise Automation",
    client: "Cross-industry",
    category: "Power Platform",
    color: "#742774",
    problem: "High-volume repetitive processes across HR, finance, and operations slowing the business.",
    architecture: [
      "Power Apps · Canvas + Model-driven",
      "Power Automate · Cloud + Desktop flows",
      "Dataverse · SharePoint",
      "Power Pages · Approvals portals",
      "Power BI · Operational analytics",
    ],
    solution: "Designed and deployed enterprise-grade Power Platform solutions for approvals, onboarding, and field operations.",
    outcome: "60%+ reduction in manual processing, faster cycle times, audit-ready approval trails.",
  },
];

export const CERTIFICATIONS = [
  { id: "pp-dev", name: "Microsoft Certified: Power Platform Developer Associate", issuer: "Microsoft", color: "#742774", icon: "⚡" },
  { id: "az-ne", name: "Microsoft Certified: Azure Network Engineer Associate", issuer: "Microsoft", color: "#0078D4", icon: "🛰" },
  { id: "az-avd", name: "Microsoft Certified: Azure Virtual Desktop Specialty", issuer: "Microsoft", color: "#00B8FF", icon: "🖥" },
  { id: "aws-ml", name: "AWS Certified: Machine Learning — Associate", issuer: "Amazon Web Services", color: "#FF9900", icon: "🧠" },
  { id: "atl-jira", name: "Atlassian Certified: Jira Administration", issuer: "Atlassian", color: "#2684FF", icon: "🛠" },
  { id: "atl-conf", name: "Atlassian Certified: Confluence Administration", issuer: "Atlassian", color: "#0052CC", icon: "📘" },
  { id: "ms-fund", name: "Microsoft Certified: Fundamentals (Azure / M365)", issuer: "Microsoft", color: "#00F0FF", icon: "🧩" },
  { id: "sc-200", name: "Microsoft Certified: Security Operations Analyst", issuer: "Microsoft", color: "#FF3366", icon: "🛡" },
];

export const NAV_CHAPTERS = [
  { id: "hero", label: "00 · ENTRY", desc: "Neural Command Center" },
  { id: "core", label: "01 · THE CORE", desc: "Professional Summary" },
  { id: "nexus", label: "02 · SKILL NEXUS", desc: "Neural Network of Expertise" },
  { id: "career", label: "03 · CAREER TIMELINE", desc: "Time Tunnel of Experience" },
  { id: "vault", label: "04 · PROJECT VAULT", desc: "Holographic Archive" },
  { id: "certifications", label: "05 · CERTIFICATION WALL", desc: "Hall of Achievements" },
  { id: "architecture", label: "05B · ARCHITECTURE", desc: "Reference Enterprise Topology" },
  { id: "contact", label: "06 · CONTACT HORIZON", desc: "Build the Future Together" },
];
