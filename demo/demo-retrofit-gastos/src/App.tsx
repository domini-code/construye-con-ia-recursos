import { useState, useEffect } from 'react';
import { Trip, Expense } from './types';
import { loadTrip, saveTrip, clearTrip } from './storage';
import { calculateBalances, calculateSettlement } from './settlement';

type View = 'expenses' | 'balances' | 'settle';

export default function App() {
  const [trip, setTrip] = useState<Trip | null>(null);
  const [view, setView] = useState<View>('expenses');

  useEffect(() => {
    const saved = loadTrip();
    setTrip(saved);
  }, []);

  const updateTrip = (updated: Trip) => {
    setTrip(updated);
    saveTrip(updated);
  };

  if (!trip) {
    return <TripSetup onCreate={updateTrip} />;
  }

  return (
    <div>
      <header>
        <h1>✈ {trip.name}</h1>
        <nav>
          {(['expenses', 'balances', 'settle'] as View[]).map(v => (
            <button
              key={v}
              className={view === v ? 'active' : ''}
              onClick={() => setView(v)}
            >
              {{ expenses: 'Gastos', balances: 'Balances', settle: 'Liquidar' }[v]}
            </button>
          ))}
          <button className="danger" onClick={() => { clearTrip(); setTrip(null); }}>
            Nuevo viaje
          </button>
        </nav>
      </header>

      <main>
        {view === 'expenses' && <ExpensesView trip={trip} onUpdate={updateTrip} />}
        {view === 'balances' && <BalancesView trip={trip} />}
        {view === 'settle' && <SettleView trip={trip} />}
      </main>
    </div>
  );
}

function TripSetup({ onCreate }: { onCreate: (trip: Trip) => void }) {
  const [name, setName] = useState('');
  const [participantsRaw, setParticipantsRaw] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const participants = participantsRaw.split(',').map(p => p.trim()).filter(Boolean);
    if (!name.trim() || participants.length < 2) return;
    onCreate({ name: name.trim(), participants, expenses: [] });
  };

  return (
    <div className="setup-screen">
      <form onSubmit={handleSubmit}>
        <h2>Nuevo viaje</h2>
        <p className="setup-subtitle">Registra los gastos del grupo y liquida al final</p>

        <div className="field">
          <label>Nombre del viaje</label>
          <input
            type="text"
            placeholder="Lisboa 2025"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className="field">
          <label>Participantes</label>
          <input
            type="text"
            placeholder="Ana, Luis, Marta"
            value={participantsRaw}
            onChange={e => setParticipantsRaw(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">Crear viaje →</button>
      </form>
    </div>
  );
}

function ExpensesView({ trip, onUpdate }: { trip: Trip; onUpdate: (t: Trip) => void }) {
  const [showForm, setShowForm] = useState(false);

  const handleAdd = (data: Omit<Expense, 'id' | 'date'>) => {
    const newExpense: Expense = {
      ...data,
      id: crypto.randomUUID(),
      date: new Date().toISOString().split('T')[0],
    };
    onUpdate({ ...trip, expenses: [...trip.expenses, newExpense] });
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    onUpdate({ ...trip, expenses: trip.expenses.filter(e => e.id !== id) });
  };

  return (
    <div>
      <div className="section-header">
        <h2>{trip.expenses.length} gasto{trip.expenses.length !== 1 ? 's' : ''}</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(v => !v)}>
          {showForm ? 'Cancelar' : '+ Añadir'}
        </button>
      </div>

      {showForm && (
        <AddExpenseForm participants={trip.participants} onAdd={handleAdd} />
      )}

      {trip.expenses.length === 0 && !showForm ? (
        <p className="empty">Sin gastos todavía.<br />Añade el primero.</p>
      ) : (
        <ul className="expense-list">
          {trip.expenses.map(expense => (
            <li key={expense.id} className="expense-item">
              <span className="expense-date">{expense.date}</span>
              <span className="expense-desc">{expense.description}</span>
              <span className="expense-paid">Pagó {expense.paidBy}</span>
              <span className="expense-amount">{expense.amount.toFixed(2)} €</span>
              <button
                className="btn btn-danger-ghost"
                onClick={() => handleDelete(expense.id)}
                title="Eliminar"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function AddExpenseForm({
  participants,
  onAdd,
}: {
  participants: string[];
  onAdd: (data: Omit<Expense, 'id' | 'date'>) => void;
}) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState(participants[0]);
  const [forWhom, setForWhom] = useState<string[]>([...participants]);

  const toggle = (person: string) => {
    setForWhom(prev =>
      prev.includes(person) ? prev.filter(p => p !== person) : [...prev, person]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !amount || forWhom.length === 0) return;
    onAdd({ description: description.trim(), amount: parseFloat(amount), paidBy, forWhom });
    setDescription('');
    setAmount('');
    setForWhom([...participants]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label>Descripción</label>
        <input
          type="text"
          placeholder="Cena en el puerto"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>

      <div className="field">
        <label>Importe (€)</label>
        <input
          type="number"
          min="0.01"
          step="0.01"
          placeholder="0.00"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
      </div>

      <div className="field">
        <label>Pagado por</label>
        <select value={paidBy} onChange={e => setPaidBy(e.target.value)}>
          {participants.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      <fieldset>
        <legend>¿Para quién?</legend>
        <div className="checkboxes">
          {participants.map(p => (
            <label key={p} className="checkbox-label">
              <input
                type="checkbox"
                checked={forWhom.includes(p)}
                onChange={() => toggle(p)}
              />
              {p}
            </label>
          ))}
        </div>
      </fieldset>

      <button type="submit" className="btn btn-primary">Añadir gasto</button>
    </form>
  );
}

function BalancesView({ trip }: { trip: Trip }) {
  const balances = calculateBalances(trip);
  const total = trip.expenses.reduce((s, e) => s + e.amount, 0);
  const avg = trip.participants.length > 0 ? total / trip.participants.length : 0;

  const paidTotals: Record<string, number> = {};
  trip.participants.forEach(p => (paidTotals[p] = 0));
  trip.expenses.forEach(e => { paidTotals[e.paidBy] = (paidTotals[e.paidBy] ?? 0) + e.amount; });
  const topPayer = Object.entries(paidTotals).sort((a, b) => b[1] - a[1])[0];

  return (
    <div>
      <div className="section-header">
        <h2>Balances</h2>
      </div>

      <ul className="balance-list">
        {balances.map(b => (
          <li key={b.person} className="balance-item">
            <span className="balance-name">{b.person}</span>
            <span className={`balance-amount ${b.amount >= 0 ? 'positive' : 'negative'}`}>
              {b.amount >= 0 ? '+' : ''}{b.amount.toFixed(2)} €
            </span>
          </li>
        ))}
      </ul>

      <div className="summary">
        <div className="summary-row">
          <span>Total gastado</span>
          <span>{total.toFixed(2)} €</span>
        </div>
        <div className="summary-row">
          <span>Media por persona</span>
          <span>{avg.toFixed(2)} €</span>
        </div>
        {topPayer && topPayer[1] > 0 && (
          <div className="summary-row">
            <span>Pagó más</span>
            <span>{topPayer[0]} ({topPayer[1].toFixed(2)} €)</span>
          </div>
        )}
      </div>
    </div>
  );
}

function SettleView({ trip }: { trip: Trip }) {
  const transfers = calculateSettlement(trip);

  return (
    <div>
      <div className="section-header">
        <h2>Liquidación</h2>
      </div>

      {transfers.length === 0 ? (
        <p className="empty">Todos en paz. ✓</p>
      ) : (
        <ul className="transfer-list">
          {transfers.map((t, i) => (
            <li key={i} className="transfer-item">
              <span>{t.from}</span>
              <span className="transfer-arrow">→</span>
              <span>{t.to}</span>
              <span className="transfer-amount">{t.amount.toFixed(2)} €</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
