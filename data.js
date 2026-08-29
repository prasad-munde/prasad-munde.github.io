/**
 * ==========================================================================
 * PRASAD MUNDE - PORTFOLIO CONFIG & CONTENT
 * ==========================================================================
 * 
 * Edit this file anytime you want to:
 *  - Add or edit a project
 *  - Update your experience, skills, or socials
 * 
 * The website will automatically update and render everything for you.
 */

var PORTFOLIO_DATA = {
  // --- Personal Info & Hero ---
  profile: {
    logo: "prsd",
    name: "Prasad Munde",
    tagline: "learning / building / working",
    shortBio: "I love solving problems, building cool things, consuming great ideas, and constantly learning new stuff. Right now, I'm focused on learning and building software around AI and backend systems.",
    aboutBio: [
      "I've been hooked on computers since childhood—it all started with curiosity about how video games were made and how software connects people across the world.",
      "Today, that curiosity has grown into building robust backend architectures, exploring intelligent systems, and tackling problems that keep me happily glued to my screen for hours."
    ],
    extendedBio: "I've been hooked on computers since childhood—it all started with curiosity about how video games were made and how software connects people across the world.\n\nToday, that curiosity has grown into building robust backend architectures, exploring intelligent systems, and tackling problems that keep me happily glued to my screen for hours.",
    location: "Pune / Mumbai, India",
    email: "prasadmunde999@gmail.com",
    phone: "+91 7499529089",
    resumeUrl: "./PrasadMunde__CV.pdf",
    avatarUrl: "prasadphoto.jpg", // Set to your photo path e.g. "./photo.jpg" or leave "" for sleek monogram PM
    socials: {
      github: "https://github.com/prasad-munde",
      linkedin: "https://www.linkedin.com/in/prasadmunde/",
      leetcode: "https://leetcode.com/_prasadmunde_/",
      twitter: "https://x.com/__prsd__",
      instagram: "https://www.instagram.com/_prasadmunde_/"
    }
  },

  // --- Education ---
  education: {
    institution: "Indira College of Engineering and Management",
    degree: "Bachelor of Engineering in Artificial Intelligence & Data Science",
    period: "2023 — 2027",
    cgpa: "8.48 / 10",
    location: "Pune, India"
  },

  // --- Experience ---
  experience: [
    {
      role: "AI Intern",
      company: "Diebold Nixdorf",
      location: "Mumbai, India",
      period: "Jun 2025 — Oct 2025",
      bullets: [
        "Adapted and refactored an open-source system for enterprise use, improving modularity and maintainability.",
        "Designed and developed a modular Retrieval-Augmented Generation (RAG) system supporting multiple LLM backends.",
        "Developed and integrated a MobileNetV2-based UI classification system (90% accuracy) into backend decision workflows.",
        "Fine-tuned language models using PEFT (LoRA), improving domain-specific instruction accuracy by 20–25%."
      ],
      tech: ["RAG", "PEFT / LoRA", "MobileNetV2", "LLMs", "Python", "FastAPI"]
    }
  ],

  // --- Projects ---
  projects: [
    {
      id: "krecon",
      title: "Krecon",
      category: "ai backend",
      period: "2026 — Present",
      description: "An AI-powered creator collaboration platform featuring autonomous multi-agent pipelines for campaign briefing, semantic discovery, and creator ranking.",
      bullets: [
        "Built modular AI agents for campaign briefing, semantic creator discovery, and creator ranking.",
        "Developed RESTful backend services using FastAPI, PostgreSQL, and SQLAlchemy with JWT authentication and bcrypt hashing.",
        "Implemented semantic creator discovery using Sentence Transformers, Milvus, and LangChain, followed by Gemini-based creator ranking with Pydantic structured outputs.",
        "Engineered a LangGraph-based multi-agent workflow and integrated LangSmith for tracing AI pipelines with Docker containerization."
      ],
      tech: ["FastAPI", "PostgreSQL", "Milvus", "LangChain", "Gemini", "Docker", "LangGraph"],
      githubUrl: "https://github.com/prasad-munde/kryco"
    },
    {
      id: "indiragpt",
      title: "IndiraGPT",
      category: "ai backend",
      period: "2025",
      description: "An AI-powered campus help desk chatbot using advanced RAG to accurately answer college queries and index multi-modal data.",
      bullets: [
        "Built an AI-powered help desk chatbot using RAG to answer college-related queries.",
        "Designed a multi-stage crawler to index HTML, PDFs, and image metadata for retrieval.",
        "Optimized chunking and retrieval across 1,500+ chunks, reducing hallucinations by 40% in manual QA."
      ],
      tech: ["FastAPI", "ChromaDB", "LLaMA 3.3", "Sentence Transformers", "RAG"],
      githubUrl: "https://github.com/prasad-munde/InstituteAI"
    },
    {
      id: "urlshortener",
      title: "URL Shortener API",
      category: "backend",
      period: "2026",
      description: "High-performance URL shortening and redirection API with Redis caching, IP rate limiting, and Docker containerization.",
      bullets: [
        "Built a URL shortening API using FastAPI, PostgreSQL, and SQLAlchemy with validation, expiration, and unique short codes.",
        "Implemented Redis caching and rate limiting, reducing redirect latency by approximately 40% and limiting clients to 100 requests/minute; containerized with Docker Compose."
      ],
      tech: ["Python", "FastAPI", "PostgreSQL", "Redis", "SQLAlchemy", "Docker"],
      githubUrl: "https://github.com/prasad-munde/urlshort"
    }
  ],

  // --- Skills ---
  skills: [
    {
      category: "Languages",
      items: ["Python", "Java", "C++", "SQL", "JavaScript"]
    },
    {
      category: "Frameworks & Backend",
      items: ["FastAPI", "Flask", "SQLAlchemy", "REST APIs", "JWT Auth"]
    },
    {
      category: "Databases & Storage",
      items: ["PostgreSQL", "Redis", "Milvus", "ChromaDB", "MongoDB", "MySQL"]
    },
    {
      category: "AI / ML & Agents",
      items: ["LangGraph", "LangChain", "RAG Systems", "PEFT / LoRA", "Sentence Transformers", "TensorFlow", "MCP"]
    },
    {
      category: "Developer Tools & DevOps",
      items: ["Docker", "Docker Compose", "Git & GitHub", "Linux", "AWS S3", "LangSmith"]
    }
  ],

  // --- Certifications ---
  certifications: [
    {
      title: "Oracle Certified Professional: Agentic AI Foundations Associate (1Z0-1157-26)",
      issuer: "Oracle",
      verifyUrl: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=EFB731DC1336F12810FFA6EB67772535A7FB834CFEA18247F6ADF07A59F6B0EC"
    },
    {
      title: "Machine Learning Specialization",
      issuer: "Andrew Ng • Stanford Online / Coursera",
      verifyUrl: "https://www.coursera.org/account/accomplishments/records/1W3RJ1DPTF9G"
    }
  ]
};

// Explicitly assign to window and global
if (typeof window !== 'undefined') {
  window.PORTFOLIO_DATA = PORTFOLIO_DATA;
}
if (typeof global !== 'undefined') {
  global.PORTFOLIO_DATA = PORTFOLIO_DATA;
}
