export interface Expense {
  id: string;
  description: string;
  amount: number;
  paidBy: string;
  forWhom: string[];
  date: string;
}

export interface Trip {
  name: string;
  participants: string[];
  expenses: Expense[];
}
