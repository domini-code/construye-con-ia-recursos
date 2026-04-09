# Especificación Técnica — gastos-viaje v1.2.0

## 1. Qué hace el proyecto

Aplicación web para registrar y repartir gastos de grupo en un viaje. Permite que varios participantes anoten quién pagó cada gasto, calcula cuánto debe o le deben a cada persona, y genera la lista mínima de transferencias para saldar todas las deudas.

---

## 2. Para quién está pensado

Grupos pequeños (2–10 personas) que comparten gastos en un viaje: alojamiento, restaurantes, transporte, actividades. No requiere cuenta ni registro; todo funciona offline en el navegador.

---

## 3. Funcionalidades detectadas

### Setup del viaje
- Crear un viaje con nombre y lista de participantes (separados por coma).
- Validación mínima: nombre no vacío y al menos 2 participantes.
- El viaje se persiste en `localStorage`; al recargar la página se restaura automáticamente.

### Gestión de gastos (`ExpensesView`)
- Listar todos los gastos registrados (fecha, descripción, quién pagó, importe).
- Añadir un gasto mediante formulario inline:
  - Descripción (texto libre)
  - Importe en euros (número con 2 decimales)
  - Quién pagó (select con los participantes)
  - Para quién aplica (checkboxes — por defecto todos)
- Eliminar un gasto individual.
- Estado vacío con mensaje orientativo.

### Balances (`BalancesView`)
- Muestra el saldo neto de cada participante:
  - Positivo (verde): le deben dinero.
  - Negativo (rojo): debe dinero.
- Muestra el total gastado en el viaje.

### Liquidación (`SettleView`)
- Calcula la lista mínima de transferencias para que todos queden a cero.
- Formato: `Persona A → Persona B   XX.XX €`
- Si todos están en paz, muestra "Todos en paz. ✓"

### Gestión del viaje
- Botón "Nuevo viaje" que borra los datos de `localStorage` y vuelve a la pantalla de setup.

---

## 4. Arquitectura

```
src/
├── types.ts         — Interfaces de dominio (Expense, Trip)
├── storage.ts       — Capa de persistencia (loadTrip, saveTrip, clearTrip → localStorage)
├── settlement.ts    — Lógica de negocio pura (calculateBalances, calculateSettlement)
├── App.tsx          — UI completa (5 componentes en un único archivo)
└── index.css        — Estilos globales con CSS custom properties (design system propio)
```

### Flujo de datos

```
localStorage
    │
    ▼
App (useState<Trip | null>)
    │
    ├── TripSetup        ← sin viaje activo
    │
    └── header nav (tabs: expenses | balances | settle)
            │
            ├── ExpensesView
            │       └── AddExpenseForm
            ├── BalancesView   ← llama calculateBalances()
            └── SettleView     ← llama calculateSettlement()
```

### Algoritmo de liquidación (`settlement.ts`)
1. Calcula el saldo neto de cada persona: `pagado - parte_proporcional`.
2. Separa en deudores (saldo < 0) y acreedores (saldo > 0), ordenados por magnitud.
3. Itera con dos punteros: en cada paso crea una transferencia por el mínimo entre lo que debe el deudor actual y lo que se le debe al acreedor actual, y avanza el puntero del que queda a cero.
4. Resultado: número mínimo de transferencias.

> **Nota:** El campo `forWhom` existe en el modelo `Expense` pero el cálculo de balances actual divide el gasto entre **todos los participantes** del viaje, ignorando `forWhom`. Hay una discrepancia entre modelo y lógica de negocio.

---

## 5. Tecnologías

| Capa | Tecnología | Versión |
|---|---|---|
| Framework UI | React | ^19.0.0 |
| Lenguaje | TypeScript | ~5.7.2 |
| Bundler / Dev server | Vite | ^6.0.5 |
| Estilos | CSS vanilla (custom properties) | — |
| Persistencia | Web Storage API (`localStorage`) | — |
| Generación de IDs | `crypto.randomUUID()` (nativa) | — |
| Dependencias externas | Ninguna (solo React + React DOM) | — |

### Entorno
- SPA sin routing (una sola URL, navegación por estado).
- Sin servidor, sin base de datos: 100% client-side.
- Sin librería de componentes ni framework CSS.
- Sin gestor de estado externo (solo `useState` + `useEffect`).
