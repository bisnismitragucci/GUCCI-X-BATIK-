
export interface NewsItem {
  id: number;
  date: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface HeroSlide {
  id: number;
  imageUrl: string; // Revert to mandatory single string
  title: string;
  subtitle: string;
  cta: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export enum ChatSender {
  USER = 'user',
  BOT = 'bot',
  ERROR = 'error'
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: ChatSender;
  timestamp: number;
  action?: {
    label: string;
    url: string;
  };
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  location: string;
  quote: string;
  imageUrl: string;
  impact: string; // e.g., "Omzet +300%"
}

export interface ExportPillar {
  title: string;
  description: string;
  iconName: string; // We'll map this in the component
}