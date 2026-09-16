import dotenv from "dotenv";
import mongoose from "mongoose";
import Project from "./models/Project.js";
import Certificate from "./models/Certificate.js";
import Skill from "./models/Skill.js";
import Experience from "./models/Experience.js";

dotenv.config({ path: "./server/.env" });

await mongoose.connect(process.env.MONGO_URI);
console.log("MongoDB connected for seed");

await Project.deleteMany();
await Certificate.deleteMany();
await Skill.deleteMany();
await Experience.deleteMany();

await Project.insertMany([
  {
    title: "Campus Pulse",
    type: "Final Year Project | Flutter Mobile App",
    description: "Full-stack university mobile app built for students and teachers with role-based access control, face recognition attendance, real-time chat, event management, push notifications, and offline caching.",
    stack: ["Flutter", "Dart", "Firebase", "Firestore", "Hive", "Face Recognition", "ML Kit", "Push Notifications"],
    link: "https://github.com/NoshalFatima/Campus_Pulse",
    featured: true
  },
  {
    title: "Rahbar AI Civic Complaint and Legal Assistance System",
    type: "AI Platform | 2026",
    description: "AI-powered civic complaint platform for Pakistani citizens covering all 7 provinces and 100+ cities. It uses RAG over Supreme Court judgments and civic law datasets, LLaMA 3.3, Gemini Vision, YOLO photo verification, PDF report generation, voice input, text-to-speech, complaint tracking, and WhatsApp sharing.",
    stack: ["Python", "RAG", "FAISS", "LangChain", "LLaMA 3.3", "Gemini API", "Groq", "YOLO", "Gradio", "ReportLab", "Whisper STT", "gTTS"],
    link: "https://huggingface.co/spaces/rahbarAI/Rahbar_AI",
    featured: true
  },
  {
    title: "Pakistan Legal Chatbot",
    type: "RAG-powered Legal Q&A System | 2026",
    description: "Standalone bilingual legal chatbot focused on Pakistan Supreme Court case law and citizen rights. Built a TF-IDF based RAG retrieval system over 4000+ legal document chunks with citations, escalation paths, helpline references, Urdu/English/Punjabi/Sindhi support, voice output, and petition drafting.",
    stack: ["Python", "RAG", "FAISS", "TF-IDF", "LLaMA 3.3", "Groq API", "Gradio", "gTTS"],
    link: "https://huggingface.co/spaces/Noshal/PAKISTAN_LEGAL_CHATBOT",
    featured: true
  },
  {
    title: "SparkleHub Skincare E-Commerce Website",
    type: "MERN Stack | 2025",
    description: "Full-stack skincare product e-commerce platform built using the MERN stack. Includes product listings, shopping cart, responsive React UI, REST APIs, MongoDB product management, and user data handling.",
    stack: ["MongoDB", "Express.js", "React.js", "Node.js", "Tailwind CSS"],
    link: "https://github.com/NoshalFatima/SparkleHub-MERN",
    featured: true
  },
  {
    title: "Other Projects",
    type: "Frontend Practice Projects",
    description: "Additional projects include Netflix Clone, Amazon Clone, Quiz App, Rock-Paper-Scissors, and Portfolio Page.",
    stack: ["HTML", "CSS", "JavaScript", "React.js"],
    link: "https://github.com/NoshalFatima",
    featured: false
  }
]);

await Certificate.insertMany([
  {
    name: "Generative AI Application Developer",
    issuer: "NCEAC and HEC Cohort 3 | ULEF USA",
    date: "May 2026",
    imageUrl: "/assets/gen-ai-certificate.jpg",
    certificateUrl: "/assets/gen-ai-certificate.jpg"
  },
  {
    name: "HEC National Skill Competency Test",
    issuer: "Top 20% nationally out of 33,000+ candidates across 190+ universities",
    date: "April 2026",
    imageUrl: "/assets/hec-nsct-certificate.jpeg",
    certificateUrl: "/assets/hec-nsct-certificate.jpeg"
  },
  {
    name: "Google IT Automation with Python",
    issuer: "Google | Coursera",
    date: "2025",
    imageUrl: "/assets/python-certificate.jpeg",
    certificateUrl: "/assets/python-certificate.jpeg"
  },
  {
    name: "React JS Mastery",
    issuer: "Hadi E-Learning System",
    date: "2024",
    imageUrl: "/assets/react-certificate.png",
    certificateUrl: "/assets/react-certificate.png"
  },
  {
    name: "Python Programming Certificate",
    issuer: "SoftSincs",
    date: "2025",
    imageUrl: "/assets/office-certificate.jpeg",
    certificateUrl: "/assets/office-certificate.jpeg"
  }
]);

await Skill.insertMany([
  { name: "Flutter", category: "Mobile Development" },
  { name: "Dart", category: "Mobile Development" },
  { name: "Firebase", category: "Mobile Development" },
  { name: "Firestore", category: "Mobile Development" },
  { name: "Hive", category: "Mobile Development" },
  { name: "Face Recognition", category: "Mobile Development" },
  { name: "ML Kit", category: "Mobile Development" },

  { name: "React.js", category: "Frontend" },
  { name: "HTML5", category: "Frontend" },
  { name: "CSS3", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Figma", category: "Frontend" },

  { name: "PHP", category: "Backend" },
  { name: "Laravel", category: "Backend" },
  { name: "Node.js", category: "Backend" },
  { name: "Express.js", category: "Backend" },
  { name: "REST APIs", category: "Backend" },

  { name: "Python", category: "AI and ML" },
  { name: "RAG", category: "AI and ML" },
  { name: "FAISS", category: "AI and ML" },
  { name: "LangChain", category: "AI and ML" },
  { name: "LLaMA 3.3", category: "AI and ML" },
  { name: "Gemini API", category: "AI and ML" },
  { name: "Groq API", category: "AI and ML" },
  { name: "YOLO", category: "AI and ML" },
  { name: "gTTS", category: "AI and ML" },
  { name: "Whisper STT", category: "AI and ML" },

  { name: "Firebase Firestore", category: "Database" },
  { name: "MongoDB", category: "Database" },
  { name: "MySQL", category: "Database" },

  { name: "Git", category: "Tools" },
  { name: "GitHub", category: "Tools" },
  { name: "Android Studio", category: "Tools" },
  { name: "VS Code", category: "Tools" },
  { name: "Canva", category: "Tools" },
  { name: "Postman", category: "Tools" },

  { name: "JavaScript", category: "Languages" },
  { name: "C++", category: "Languages" },
  { name: "Java", category: "Languages" }
]);

await Experience.insertMany([
  {
    role: "Laravel Developer Intern",
    organization: "DYNSOF, Dynamic Software Solutions, Pasrur",
    period: "Aug 2025 - Oct 2025",
    type: "Work Experience",
    points: [
      "Completed a 2-month internship focused on PHP and Laravel web development.",
      "Built and maintained backend modules using Laravel MVC architecture, including controllers, routes, and Blade views.",
      "Worked on RESTful API development and MySQL database design under senior developer guidance.",
      "Integrated third-party APIs and contributed to ongoing client web application features.",
      "Strengthened practical skills in Git version control, debugging, and agile team workflows."
    ]
  },
  {
    role: "BS Computer Science",
    organization: "University of Punjab, Lahore | GGCP Affiliated",
    period: "2022 - Present",
    type: "Education",
    points: [
      "Final-year BSCS student.",
      "CGPA: 3.44.",
      "Focused on Flutter mobile development, Firebase systems, AI application engineering, and full-stack development.",
      "Final Year Project: Campus Pulse, a university app with face recognition attendance, real-time chat, event management, and Firebase backend."
    ]
  },
  {
    role: "FSc Pre-Engineering",
    organization: "Superior College For Girls, Daska",
    period: "2020 - 2022",
    type: "Education",
    points: [
      "Completed FSc Pre-Engineering.",
      "Grade: A."
    ]
  },
  {
    role: "Matric Science",
    organization: "Community Model Girls High School Padali, Daska",
    period: "2018 - 2020",
    type: "Education",
    points: [
      "Completed Matric in Science.",
      "Grade: A+."
    ]
  }
]);

console.log("Portfolio data inserted successfully");
await mongoose.disconnect();