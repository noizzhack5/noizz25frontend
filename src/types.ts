export type Status = 'submitted' | 'bot_interview' | 'ready_for_bot_interview' | 'ready_for_recruit';

export type JobType = 'headquarters_staff' | 'training_instruction' | 'sales' | 'operational_worker';

export interface StatusHistory {
  status: Status | string;
  timestamp: Date;
  note?: string;
}

export interface MatchParameter {
  name: string;
  matched: boolean;
}

export interface GroupClassification {
  groupName: string;
  matchScore: number | null;
}

export interface AdditionalInfo {
  question: string;
  answer: string;
}

export interface BotMessage {
  sender: 'bot' | 'user';
  text: string;
  timestamp: Date;
}

export interface BotConversation {
  messages: BotMessage[];
  startedAt: Date;
  completedAt?: Date;
}

export interface Candidate {
  id: string;
  fullName: string;
  fullNameHebrew?: string;
  email: string;
  phone: string;
  age?: number;
  citizenship?: string;
  campaignSource: string;
  status: Status | string;
  jobType: JobType | null;
  statusHistory: StatusHistory[];
  primaryGroup: GroupClassification;
  alternativeGroups: GroupClassification[];
  matchedParameters: MatchParameter[];
  aiSkillsSummary: string;
  additionalInfo: AdditionalInfo[];
  notes: string;
  manualNotes?: string;
  cvUrl?: string;
  extractedText?: string;
  profileImage?: string;
  createdAt: Date;
  warnings?: string[];
  deleted?: boolean;
  deletedAt?: Date;
  
  // New fields
  canTravelEurope?: boolean | null;
  canTravelIsrael?: boolean | null;
  livesInEurope?: boolean | null;
  nativeIsraeli?: boolean | null;
  speaksEnglish?: boolean | null;
  remembersPosition?: boolean | null;
  
  // Tracking fields for indicators
  isNew?: boolean;
  statusChangedAt?: Date;
  newAnswersAt?: Date;
  
  // Bot conversation
  botConversation?: BotConversation;
  
  // Match score explanation from AI classification
  classExplain?: string;
}