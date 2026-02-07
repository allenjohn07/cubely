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
