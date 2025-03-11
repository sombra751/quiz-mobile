// types.ts
export interface Choice {
    answer: string;
    isTrue: boolean;
    isOnHalf: boolean;
    isOnCallHelp: boolean;
    probability?: number;
  }
  
  export interface Question {
    id: number;
    question: string;
    difficulty: number;
    choices: Choice[];
  }