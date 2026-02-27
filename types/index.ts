export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  content: string;
  image_url: string | null;
  created_at: string;
  updated_at: string | null;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export interface Service {
  title: string;
  description: string;
  icon: string;
}

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  impact: string;
  link?: string;
}

export interface Achievement {
  year: string;
  title: string;
  description: string;
  impact?: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
}

export interface Skill {
  category: string;
  items: string[];
}
