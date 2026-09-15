export type Language = 'en' | 'hi' | 'bn' | 'ta' | 'te' | 'mr';

export type ActiveTab = 
  | 'home'
  | 'portals'
  | 'digilocker'
  | 'aadhaar'
  | 'pan'
  | 'simulator'
  | 'checker'
  | 'faq'
  | 'quiz';

export interface OfficialPortalItem {
  id: string;
  category: 'aadhaar' | 'pan' | 'digilocker' | 'other';
  serviceName: string;
  department: string;
  url: string;
  description: string;
  requirements: string;
  feeInfo: string;
  badgeType: 'Free' | 'OTP Required' | 'Paid Service' | 'Instant' | 'In-Person';
  tags: string[];
}

export interface GuideStep {
  stepNumber: number;
  title: string;
  description: string;
  actionUrl?: string;
  actionUrlText?: string;
  importantNote?: string;
  subSteps?: string[];
  visualType?: 'mobile-app' | 'web-portal' | 'form' | 'security-pin' | 'otp' | 'qr' | 'payment';
  sampleVisualData?: {
    screenTitle?: string;
    fields?: { label: string; placeholder: string; value?: string; type?: string }[];
    badge?: string;
    tips?: string[];
  };
}

export interface ServiceGuide {
  id: string;
  category: 'digilocker' | 'aadhaar' | 'pan';
  title: string;
  summary: string;
  estimatedTime: string;
  officialFee: string;
  prerequisites: string[];
  officialPortal: string;
  officialPortalName: string;
  steps: GuideStep[];
  troubleshootingTips: { issue: string; solution: string }[];
  commonPitfalls: string[];
}

export interface ServiceRequirement {
  id: string;
  serviceCategory: 'digilocker' | 'aadhaar' | 'pan';
  serviceName: string;
  shortDesc: string;
  fee: string;
  processingTime: string;
  officialPortalUrl: string;
  officialPortalLabel: string;
  isOnlineAvailable: boolean;
  requiredDocuments: {
    category: string;
    mandatory: boolean;
    examples: string[];
  }[];
  stepSummary: string[];
  cautionPoints: string[];
}

export interface FaqItem {
  id: string;
  category: 'digilocker' | 'aadhaar' | 'pan' | 'general';
  question: string;
  answer: string;
  tags: string[];
  helpfulCount?: number;
  officialLink?: string;
}

export interface SupportTicket {
  ticketId: string;
  fullName: string;
  mobile: string;
  service: string;
  issueCategory: string;
  description: string;
  status: 'Received' | 'In Review' | 'Resolved';
  timestamp: string;
  autoGuidance: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}
