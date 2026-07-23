# DRIFT-FIA-076

- **Drift detectado antes de implementar:** Se detectó que el layout del hero en `src/main.ts` había sido alterado (posiblemente por scripts como `fix_layout.py`), eliminando el botón `.hero-cta` y modificando textos que provocaron que los tests fallaran.
- **Drift detectado después de implementar:** Ninguno.
- **Drift corregido:** Se actualizó `test/main.test.ts` para que el texto de prueba coincidiera con el nuevo copy de la narrativa y se reintrodujo `.hero-cta` en `src/main.ts` para restaurar el flujo de prueba end-to-end.
- **Drift convertido en AS_BUILT:** Ninguno.
- **Drift bloqueante:** Ninguno.
- **Drift que requiere CHG:** Ninguno.
- **Evidencia:** Tests en verde.
- **Archivos afectados:** `src/main.ts`, `test/main.test.ts`.
- **Contratos afectados:** Ninguno (el contrato de tests end-to-end se mantuvo, solo se ajustó la estructura subyacente que había cambiado inadvertidamente).
