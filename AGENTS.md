# Guía del repositorio

## Estructura del proyecto

Este repositorio contiene un diario de estudio de una página sin compilación:

- `index.html`: estructura semántica y controles del formulario.
- `styles.css`: estilos visuales y adaptación a distintos tamaños de pantalla.
- `app.js`: sesiones, cálculo de las rachas, renderizado y `localStorage`.

Mantén los archivos en la raíz salvo que el proyecto crezca lo suficiente para justificar directorios como `assets/` o `tests/`. No introduzcas frameworks, librerías, gestores de paquetes ni herramientas de compilación sin una decisión explícita.

## Comandos de desarrollo y pruebas

No necesitas instalar ni compilar. Abre `index.html` en un navegador.

```powershell
python -m http.server 8000
```

Sirve el proyecto en `http://localhost:8000` para probarlo mediante un servidor local.

```powershell
node --check app.js
```

Comprueba la sintaxis de JavaScript sin modificar datos. Actualmente no hay pruebas automatizadas, formateador ni linter configurados.

## Estilo de código y nombres

Usa dos espacios de indentación en HTML, CSS y JavaScript. Prioriza `const`, reserva `let` para valores reasignables, termina las sentencias con punto y coma y escribe funciones pequeñas con una sola responsabilidad. Usa nombres en español con `camelCase` para variables y funciones (`calcularRacha`), y mayúsculas con guiones bajos para constantes (`CLAVE_SESIONES`). Las clases CSS deben ser descriptivas, estar en español y usar elementos BEM cuando ayuden (`racha__valor`).

Mantén la interfaz en español, el HTML semántico, las etiquetas asociadas y la navegación mediante teclado. Calcula siempre las fechas con métodos locales; no uses conversiones UTC como `toISOString()` para las fechas de estudio.

Para calcular las rachas, varias sesiones del mismo día cuentan una sola vez. La mejor racha se deriva de las sesiones y no incluye fechas futuras.

Siempre: actualizar `MEMORY.md` al terminar cada tarea.

## Pautas para las pruebas

Antes de entregar cambios:

1. Ejecuta `node --check app.js`.
2. Registra sesiones repetidas en un día, varios días consecutivos y una fecha futura.
3. Comprueba ambas rachas, el orden descendente y que la fecha futura no altere el récord.
4. Recarga la página y confirma la persistencia en `localStorage`.
5. Revisa las vistas móvil y de escritorio, además del estado vacío.

Si se añaden pruebas automatizadas, guárdalas en `tests/` y nómbralas según el comportamiento, por ejemplo `calculo-racha.test.js`.

## Commits y pull requests

No existe historial Git para deducir una convención. Usa títulos breves y en imperativo, como `Corrige el cálculo local de la racha`, y limita cada commit a un cambio. Las pull requests deben explicar el resultado visible, enumerar las pruebas realizadas, enlazar incidencias e incluir capturas móviles y de escritorio cuando haya cambios visuales.

## Datos y compatibilidad

Trata la clave `diarioDeEstudio.sesiones` y su estructura como datos persistentes. Añade una migración antes de cambiar campos almacenados y nunca descartes sesiones silenciosamente.

## Memoria

1. Al empezar, lee `MEMORY.md` para conocer el estado del proyecto y las decisiones tomadas.
2. Al terminar una tarea, actualízalo: estado actual, decisiones importantes (con su porqué) y errores a evitar.
3. Mantenlo breve (máximo ~50 líneas): resume o elimina lo que ya no aporte.
4. Si algo se convierte en una regla permanente, propón moverlo a `AGENTS.md` en lugar de dejarlo en la memoria.
5. No guardes nunca datos sensibles (claves, tokens, datos personales).
