export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructorName: string;
  instructorAvatar?: string;
  level: "Beginner" | "Medium" | "Advance";
  price: number;
  category: string;
  lastUpdated: string;
  studentsEnrolled: number;
  lectures: Lecture[];
}

export interface Lecture {
  id: string;
  title: string;
  duration: string;
  completed?: boolean;
}

export const courses: Course[] = [
  {
    id: "1",
    title: "Introduction to Python Programming",
    description: "Learn the basics of Python programming from scratch. This course covers fundamental concepts like variables, loops, functions, and object-oriented programming in Python.",
    thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&q=80",
    instructorName: "Teacher",
    level: "Beginner",
    price: 499,
    category: "Python",
    lastUpdated: "2025-03-21",
    studentsEnrolled: 1250,
    lectures: [
      { id: "1-1", title: "Basics of Python", duration: "15 min" },
      { id: "1-2", title: "Data Types and Variables", duration: "20 min" },
      { id: "1-3", title: "Control Flow and Loops", duration: "25 min" },
      { id: "1-4", title: "Functions and Modules", duration: "30 min" },
      { id: "1-5", title: "File Handling in Python", duration: "20 min" },
    ],
  },
  {
    id: "2",
    title: "Web Development with React.js",
    description: "Master modern web development using React.js. Build interactive user interfaces and single-page applications with the most popular JavaScript library.",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    instructorName: "Teacher",
    level: "Medium",
    price: 999,
    category: "Frontend Development",
    lastUpdated: "2025-04-01",
    studentsEnrolled: 980,
    lectures: [
      { id: "2-1", title: "Introduction to React", duration: "20 min" },
      { id: "2-2", title: "Components and Props", duration: "25 min" },
      { id: "2-3", title: "State and Lifecycle", duration: "30 min" },
      { id: "2-4", title: "Hooks in React", duration: "35 min" },
      { id: "2-5", title: "Building a Complete Project", duration: "45 min" },
    ],
  },
  {
    id: "3",
    title: "Data Science and Machine Learning",
    description: "Learn data analysis and ML techniques. Dive deep into statistical analysis, data visualization, and machine learning algorithms using Python.",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    instructorName: "Teacher",
    level: "Advance",
    price: 1499,
    category: "Data Science",
    lastUpdated: "2025-03-15",
    studentsEnrolled: 756,
    lectures: [
      { id: "3-1", title: "Introduction to Data Science", duration: "20 min" },
      { id: "3-2", title: "Data Analysis with Pandas", duration: "30 min" },
      { id: "3-3", title: "Data Visualization", duration: "25 min" },
      { id: "3-4", title: "Machine Learning Basics", duration: "40 min" },
      { id: "3-5", title: "Building ML Models", duration: "50 min" },
    ],
  },
  {
    id: "4",
    title: "Digital Marketing Fundamentals",
    description: "Master SEO, social media marketing, and Google Ads. Learn to create effective digital marketing strategies for modern businesses.",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    instructorName: "Teacher",
    level: "Beginner",
    price: 800,
    category: "Digital Marketing",
    lastUpdated: "2025-04-05",
    studentsEnrolled: 1100,
    lectures: [
      { id: "4-1", title: "Introduction to Digital Marketing", duration: "15 min" },
      { id: "4-2", title: "SEO Fundamentals", duration: "25 min" },
      { id: "4-3", title: "Social Media Marketing", duration: "30 min" },
      { id: "4-4", title: "Google Ads Basics", duration: "25 min" },
      { id: "4-5", title: "Analytics and Reporting", duration: "20 min" },
    ],
  },
  {
    id: "5",
    title: "MERN Stack Development",
    description: "Build full-stack web applications using MongoDB, Express, React, and Node.js. Complete guide to modern web development.",
    thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80",
    instructorName: "Teacher",
    level: "Advance",
    price: 1299,
    category: "Fullstack Development",
    lastUpdated: "2025-03-28",
    studentsEnrolled: 650,
    lectures: [
      { id: "5-1", title: "Introduction to MERN Stack", duration: "20 min" },
      { id: "5-2", title: "MongoDB Basics", duration: "30 min" },
      { id: "5-3", title: "Express.js Server", duration: "35 min" },
      { id: "5-4", title: "React Frontend", duration: "40 min" },
      { id: "5-5", title: "Node.js APIs", duration: "45 min" },
    ],
  },
  {
    id: "6",
    title: "Docker and Containerization",
    description: "Learn Docker from scratch. Master containerization, Docker Compose, and deployment strategies for modern applications.",
    thumbnail: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&q=80",
    instructorName: "Teacher",
    level: "Medium",
    price: 899,
    category: "Docker",
    lastUpdated: "2025-04-10",
    studentsEnrolled: 420,
    lectures: [
      { id: "6-1", title: "Introduction to Docker", duration: "20 min" },
      { id: "6-2", title: "Docker Images and Containers", duration: "25 min" },
      { id: "6-3", title: "Dockerfile Best Practices", duration: "30 min" },
      { id: "6-4", title: "Docker Compose", duration: "35 min" },
      { id: "6-5", title: "Deployment Strategies", duration: "40 min" },
    ],
  },
];

export const categories = [
  "Next JS",
  "Data Science",
  "Frontend Development",
  "Fullstack Development",
  "MERN Stack Development",
  "Backend Development",
  "JavaScript",
  "Python",
  "Docker",
  "MongoDB",
  "HTML",
];
