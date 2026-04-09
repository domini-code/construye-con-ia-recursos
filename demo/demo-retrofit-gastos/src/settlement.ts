import { Trip } from './types';

export interface Balance {
  person: string;
  amount: number;
}

export interface Transfer {
  from: string;
  to: string;
  amount: number;
}

export function calculateBalances(trip: Trip): Balance[] {
  const totals: Record<string, number> = {};
  trip.participants.forEach(p => (totals[p] = 0));

  trip.expenses.forEach(expense => {
    const affected = expense.forWhom.length > 0 ? expense.forWhom : trip.participants;
    const share = expense.amount / affected.length;

    affected.forEach(p => {
      if (p === expense.paidBy) {
        totals[p] += expense.amount - share;
      } else {
        totals[p] -= share;
      }
    });

    if (!affected.includes(expense.paidBy)) {
      totals[expense.paidBy] += expense.amount;
    }
  });

  return Object.entries(totals).map(([person, amount]) => ({ person, amount }));
}

export function calculateSettlement(trip: Trip): Transfer[] {
  const balances = calculateBalances(trip);

  const debtors = balances
    .filter(b => b.amount < -0.01)
    .sort((a, b) => a.amount - b.amount);

  const creditors = balances
    .filter(b => b.amount > 0.01)
    .sort((a, b) => b.amount - a.amount);

  const transfers: Transfer[] = [];
  let i = 0;
  let j = 0;

  while (i < debtors.length && j < creditors.length) {
    const debtor = debtors[i];
    const creditor = creditors[j];
    const amount = Math.min(-debtor.amount, creditor.amount);

    transfers.push({
      from: debtor.person,
      to: creditor.person,
      amount: Math.round(amount * 100) / 100,
    });

    debtor.amount += amount;
    creditor.amount -= amount;

    if (Math.abs(debtor.amount) < 0.01) i++;
    if (Math.abs(creditor.amount) < 0.01) j++;
  }

  return transfers;
}
