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
  matchScore: number;
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
  jobType: JobType;
  statusHistory: StatusHistory[];
  primaryGroup: GroupClassification;
  alternativeGroups: GroupClassification[];
  matchedParameters: MatchParameter[];
  aiSkillsSummary: string;
  additionalInfo: AdditionalInfo[];
  notes: string;
  manualNotes?: string;
  cvUrl?: string;
  profileImage?: string;
  createdAt: Date;
  warnings?: string[];
  deleted?: boolean;
  deletedAt?: Date;
  
  // New fields
  canTravelEurope?: boolean;
  canTravelIsrael?: boolean;
  livesInEurope?: boolean;
  nativeIsraeli?: boolean;
  speaksEnglish?: boolean;
  remembersPosition?: boolean;
  
  // Tracking fields for indicators
  isNew?: boolean;
  statusChangedAt?: Date;
  newAnswersAt?: Date;
  
  // Bot conversation
  botConversation?: BotConversation;
}