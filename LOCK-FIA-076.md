# LOCK-FIA-076

Estado: LOCKED

La FIA-076 queda bloqueada.

Código, SPEC, FIA, VF y JSON reflejan el mismo comportamiento real.

El frontend se conecta al backend mediante entorno (`VITE_API_BASE_URL`), sin depender de `configureServer` de Vite para las llamadas en `dist`.
Se ha verificado exitosamente mediante Typecheck, ESLint, Vitest y Build.

Se autoriza comenzar FIA-076+1 (o la siguiente FIA correspondiente).
