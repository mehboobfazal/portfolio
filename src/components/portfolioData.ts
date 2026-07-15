import { SkillCategory, CaseStudy, ExperienceItem } from "../types";

export const skillCategories: SkillCategory[] = [
    {
        id: "ai-llm",
        title: "AI Engineering & LLMOps",
        description: "Custom cognitive structures, high-efficiency prompt caching proxies, and custom vector store configurations.",
        skills: [
            { name: "OpenWebUI", level: "Expert", iconName: "Terminal" },
            { name: "LiteLLM", level: "Expert", iconName: "Layers" },
            { name: "vLLM", level: "Advanced", iconName: "Cpu" },
            { name: "Dify", level: "Expert", iconName: "Workflow" },
            { name: "LangChain", level: "Advanced", iconName: "Workflow" },
            { name: "Langsmith", level: "Advanced", iconName: "Workflow" },
            { name: "Langfuse", level: "Advanced", iconName: "Network" },
            { name: "RAG Pipelines", level: "Expert", iconName: "Network" },
            { name: "MilvusDB", level: "Advanced", iconName: "Database" },
            { name: "Azure OpenAI", level: "Expert", iconName: "Shield" },
        ],
    },
    {
        id: "backend-db",
        title: "Backend & Databases",
        description: "High-availability services, complex relational schemas, multi-tenant databases, and enterprise data processing systems.",
        skills: [
            { name: "C# (.NET)", level: "Expert", iconName: "Code2" },
            { name: "SQL Server", level: "Expert", iconName: "Database" },
            { name: "Node.js", level: "Expert", iconName: "Server" },
            { name: "Python 3.x", level: "Advanced", iconName: "Terminal" },
            { name: "PostgreSQL", level: "Expert", iconName: "Database" },
            { name: "MongoDB", level: "Advanced", iconName: "Server" },
            { name: "DynamoDB", level: "Proficient", iconName: "Layers" },
            { name: "Redis", level: "Advanced", iconName: "Database" },
            { name: "Apache Superset", level: "Proficient", iconName: "Database" },
        ],
    },
    {
        id: "frontend",
        title: "Modern Frontend",
        description: "Highly responsive single-page visual ecosystems, optimized data tables, state machines, and modern frameworks.",
        skills: [
            { name: "Next.js", level: "Expert", iconName: "Network" },
            { name: "ReactJS", level: "Expert", iconName: "Cpu" },
            { name: "TypeScript", level: "Expert", iconName: "Code2" },
            { name: "Svelte", level: "Proficient", iconName: "Layers" },
            { name: "Redux", level: "Advanced", iconName: "Activity" },
            { name: "SCSS", level: "Advanced", iconName: "Layers" },
            { name: "jQuery", level: "Expert", iconName: "Code2" },
            { name: "SEO", level: "Advanced", iconName: "Network" },
            { name: "Three.js", level: "Proficient", iconName: "Layers" },
            { name: "Figma", level: "Proficient", iconName: "Activity" },
        ],
    },
    {
        id: "devops-tooling",
        title: "DevOps & Tooling",
        description: "Scalable deployment containers, cloud systems hosting, security auditing pipelines, and test matrices.",
        skills: [
            { name: "Docker", level: "Expert", iconName: "Layers" },
            { name: "AWS Cloud", level: "Advanced", iconName: "Cloud" },
            { name: "Azure Cloud", level: "Expert", iconName: "Shield" },
            { name: "Git / GitHub", level: "Expert", iconName: "GitFork" },
            { name: "Strapi CMS", level: "Advanced", iconName: "Server" },
            { name: "Selenium", level: "Advanced", iconName: "Activity" },
            { name: "Postman", level: "Expert", iconName: "Terminal" },
            { name: "Runpod", level: "Proficient", iconName: "Cloud" },
            { name: "Firebase", level: "Proficient", iconName: "Cloud" },
        ],
    },
];

export const flagshipProjects: CaseStudy[] = [
    {
        id: "systemever",
        title: "SystemEver Suite",
        tag: "Flagship Cloud ERP",
        description: "A massive global Cloud SaaS ERP architecture crafted for mid-to-large scale businesses across South Korea, Indonesia, and the USA. It handles multi-tenant business functions including advanced manufacturing, unified logistics, finance, and visual Business Intelligence (BI).",
        highlights: ["Designed high-performance relational schemas using C# and SQL Server to handle multi-million rows securely", "Engineered clean modular JavaScript interfaces to substitute legacy heavy-data grids, saving up to 60% client memory", "Overlooked critical architecture upgrades across its developmental cycle, standardizing APIs and DB schemas"],
        metrics: [
            { label: "Active Tenant Orgs", value: "2,500+" },
            { label: "DB Load Reduction", value: "45%" },
            { label: "Supported Countries", value: "South Korea, USA, Indonesia" },
        ],
        techStack: ["C# (.NET)", "SQL Server", "JavaScript/jQuery", "Multi-tenant DB", "Business Intelligence"],
        externalUrl: "https://systemever.com",
        architectureType: "erp",
    },
    {
        id: "kb-rag",
        title: "Enterprise AI & Knowledge Base RAG Engine",
        tag: "Internal Core Product",
        description: "An advanced infrastructure solution targeted at incorporating local proprietary intelligence structures securely back into enterprise ERP and BI frameworks without leaking sensitive corporate metadata.",
        highlights: [
            "Customized OpenWebUI structures seamlessly handling distributed cross-organization profiles with distinct RBAC permissions",
            "Engineered a custom multi-llm pipeline using LiteLLM, vLLM, Dify, and targeted Azure OpenAI endpoints to handle fallback load",
            "Configured MilvusDB vector instances to index massive contextual data pools allowing lightning-fast sub-second semantic retrieval",
        ],
        metrics: [
            { label: "Semantic Retrieval", value: "< 280ms" },
            { label: "Operational Cost Reduction", value: "42%" },
            { label: "Document Processing Capacity", value: "1M+ Pages" },
        ],
        techStack: ["OpenWebUI", "LiteLLM", "vLLM", "Dify", "MilvusDB", "Azure OpenAI", "Docker"],
        architectureType: "rag",
    },
];

export const freelanceProjects = [
    {
        title: "Rwizen Platform",
        link: "https://rwizen.com",
        displayLink: "rwizen.com",
        description: "Full lifecycle deployment from the ground up, built natively with Next.js and Headless CMS configurations.",
        highlights: ["Features deep server-side rendering (SSR) for superior SEO metrics and blazing-fast performance", "Backed by Strapi Headless CMS giving custom non-technical personnel edit powers seamlessly", "MongoDB storage networks configured for unstructured logging and highly scalable article indexing"],
        tags: ["Next.js", "Strapi CMS", "MongoDB", "SEO Architecture"],
    },
    {
        title: "3dPaathshala",
        link: "https://3dpaathshala.com",
        displayLink: "3dpaathshala.com",
        description: "Interactive virtual learning platform hosting highly embedded multi-media rendering streams.",
        highlights: ["Integrates highly-complex Unity WebGL embedded environments, smoothly rendering interactive 3D instructional courses", "Automated custom PDF reporting generation matrices translating student actions to performance report packets", "An integrated generative support chat layout guiding active user exploration using secure private contexts"],
        tags: ["Next.js", "Unity WebGL", "Three.js", "Node.js", "Generative Chat"],
    },
];

export const careerTimeline: ExperienceItem[] = [
    {
        id: "xp-lead",
        period: "July 2019 – June 2026",
        role: "Lead Developer",
        company: "K.System Pvt. Ltd. / YoungLimWon Soft Lab",
        location: "Seoul, South Korea",
        description: "Primary software engineering design, architecture scaling plans, complex DB code optimizing, and front-end modernization across SystemEver Cloud ERP frameworks.",
        impacts: [
            "Bridged engineering execution gaps, leading key developers across complex product updates and secure multi-tenant migrations",
            "Pioneered internal RAG search products linking legal and core corporate documentation databases directly into secure workspace tools",
            "Oversaw deployment optimization guidelines for next-gen modular microservices architecture, trimming startup overhead by 30%",
            "Spearheaded performance tuning of core stored procedures and table partitions, supporting 2,500+ global merchant configurations",
            "Authored scalable API modules in .NET, and designed clean replacement frameworks eliminating dependencies on sluggish legacy grids",
            "Mentored and guided software developers, introducing state management protocols and high-efficiency database query audits",
        ],
        techUsed: ["Nodejs", "ReactJs", "Nextjs", "ExpressJs", "Tailwindcss", "C# (.NET)", "SQL Server", "JavaScript", "Docker", "RESTful APIs", "Dify", "Azure OpenAI", "System Architecture Design", "Agile Delivery"],
    },
    {
        id: "xp-dev",
        period: "October 2014 – June 2019",
        role: "Software Developer",
        company: "K.System Pvt. Ltd. / YoungLimWon Soft Lab",
        location: "Seoul, South Korea",
        description: "Development and maintenance of high-volume accounting and resource planning systems matching global corporate structures.",
        impacts: ["Engineered localized transactional modules satisfying tax structures in both Korea and multi-province global setups", "Resolved deep structural query bottlenecks, reducing batch monthly closing times on high-activity client instances by 50%", "Integrated automated testing frameworks enabling rapid regression feedback during rapid iterative release cycles"],
        techUsed: ["C#", "SQL Server", "XML/XSLT", "jQuery", "Reporting Services", "SVN"],
    },
];
