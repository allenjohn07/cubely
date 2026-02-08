export type WCAEvent = 
  | "3x3x3" 
  | "2x2x2" 
  | "4x4x4" 
  | "5x5x5" 
  | "OH" 
  | "3BLD" 
  | "Megaminx" 
  | "Pyraminx" 
  | "Skewb" 
  | "Square-1";

export interface Session {
  id: string;
  name: string;
  event: WCAEvent;
  solves: Solve[];
  dateCreated: Date;
}

export interface Solve {
  id: string;
  time: number;
  date: Date;
  penalty?: "none" | "+2";
}

export interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
}
