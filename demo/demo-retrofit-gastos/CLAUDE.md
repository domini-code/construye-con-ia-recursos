# CLAUDE.md — gastos-viaje

## Visión del proyecto

App web client-side para dividir gastos de grupo en un viaje. Sin backend, sin cuenta, sin instalación. El usuario crea un viaje, registra quién pagó qué y la app calcula los balances y la lista mínima de transferencias para saldar deudas.

Es un proyecto de demostración usado como material de curso (DominiCode / Udemy). El código debe permanecer legible y didáctico: sin abstracciones innecesarias, sin over-engineering.

---

## Stack técnico

| Capa | Tecnología |
|---|---|
| UI | React 19 (JSX, hooks) |
| Lenguaje | TypeScript 5.7 |
| Bundler | Vite 6 |
| Estilos | CSS vanilla con custom properties (sin Tailwind, sin CSS Modules) |
| Persistencia | `localStorage` (sin IndexedDB, sin servidor) |
| IDs | `crypto.randomUUID()` nativa |
| Dependencias runtime | Solo `react` y `react-dom` — no hay más |

---

## Convenciones de código observadas

### Estructura de archivos
- **Un módulo = una responsabilidad**: `types.ts` solo interfaces, `storage.ts` solo I/O a localStorage, `settlement.ts` solo lógica de cálculo.
- Toda la UI vive en `App.tsx` — componentes co-localizados en un único archivo, sin carpeta de componentes.
- No hay barrel files (`index.ts`), no hay alias de paths.

### Componentes
- Componentes como funciones nombradas (no arrow functions exportadas).
- Solo el componente raíz (`App`) tiene `export default`. El resto no se exporta.
- Props tipadas inline con objetos literales: `{ trip: Trip; onUpdate: (t: Trip) => void }`. Sin interfaces separadas para props.
- No se usan `React.FC` ni `React.ReactNode` explícitos.

### Estado
- Estado local con `useState`. Sin Context, sin Zustand, sin Redux.
- `useEffect` solo para cargar el viaje desde localStorage al montar.
- El estado del viaje sube a `App` y baja por props — prop drilling explícito e intencional.

### Estilos
- Clases BEM-like descriptivas: `.expense-item`, `.balance-amount`, `.transfer-arrow`.
- Modificadores como clases adicionales: `.balance-amount.positive`, `.balance-amount.negative`.
- Variables CSS definidas en `:root`, referenciadas con `var(--nombre)`.
- Sin estilos inline salvo casos puntuales de valores dinámicos (`color: 'var(--text-muted)'`).

### TypeScript
- Tipos de unión para vistas: `type View = 'expenses' | 'balances' | 'settle'`.
- `Omit<Expense, 'id' | 'date'>` para formularios — no se crean tipos duplicados.
- Sin `any`, sin `as unknown`.
- Aserciones de tipo solo donde son inevitables: `JSON.parse(raw) as Trip`.

### Nombrado
- Español para UI y etiquetas visibles al usuario.
- Inglés para variables, funciones, interfaces y claves de datos.
- Funciones de actualización: prefijo `handle` para handlers de eventos, prefijo `update`/`calculate` para lógica de negocio.

---

## Qué NO tocar y por qué

### `settlement.ts` — algoritmo de liquidación
El algoritmo de dos punteros (deudores/acreedores ordenados) produce el número mínimo de transferencias. Es correcto y está probado mentalmente. **No refactorizar** sin tests que lo cubran primero.

### `storage.ts` — clave de localStorage
La clave `'gastos-viaje-data'` identifica los datos de usuarios reales que ya tienen viajes guardados. **Cambiar el nombre de la clave borra los datos** de quien tenga la app abierta en el navegador.

### CSS custom properties en `:root`
El design system (colores, radios, tipografía) está definido ahí. Cambiar un valor afecta toda la UI. No añadir colores hardcodeados en componentes — usar siempre `var(--nombre)`.

### Ausencia de librería de componentes
Intencional. El proyecto es material didáctico: mostrar que React + CSS vanilla es suficiente. **No instalar** Shadcn, Radix, MUI, Ant Design ni similares.

### Sin router
La navegación por tabs es estado React (`useState<View>`). No instalar React Router: la app tiene una sola URL y no necesita deep linking.

---

## Restricciones reales del proyecto

### Sin backend
No hay API, no hay base de datos, no hay autenticación. Todo vive en el `localStorage` del navegador. Consecuencia: los datos no se sincronizan entre dispositivos y se pierden al limpiar el navegador. Esto es una decisión de diseño, no un bug pendiente.

### Un viaje a la vez
La app solo gestiona un viaje activo. "Nuevo viaje" borra el anterior sin confirmación. No hay historial de viajes. No añadir multi-viaje sin repensar el modelo de storage.

### Deuda técnica conocida — `forWhom` ignorado
El campo `forWhom: string[]` existe en `Expense` pero `calculateBalances` divide siempre el gasto entre **todos** los participantes del viaje, no solo los marcados. Arreglarlo cambia los resultados para viajes existentes — evaluar el impacto antes de tocar.

### Sin tests
No hay ficheros de test ni configuración de Vitest/Jest. No asumir cobertura. Antes de modificar `settlement.ts`, escribir tests unitarios para `calculateBalances` y `calculateSettlement`.

### Moneda fija en euros
Los importes se muestran siempre con `€`. No hay soporte multi-moneda ni internacionalización de números. No añadir i18n sin acordarlo explícitamente.

### `crypto.randomUUID()` requiere HTTPS o localhost
En producción la app debe servirse por HTTPS. En desarrollo Vite sirve en localhost, por lo que funciona sin problema.
