# MEMORY.md — Diario de Estudio

Memoria del proyecto entre sesiones. Máximo ~50 líneas: resume o elimina lo que ya no aporte.

## Estado actual

- v1 funcionando: registrar sesiones, racha actual, mejor racha y lista de sesiones.
- Las sesiones se guardan en localStorage; ambas rachas se calculan a partir de ellas.
- `AGENTS.md` contiene las reglas permanentes de contribución y mantenimiento de esta memoria.

## Decisiones (y por qué)

- Sin backend ni dependencias: cualquiera debe poder abrirlo con doble clic.
- Fecha editable en el formulario: permite registrar días pasados y ver la racha crecer.
- Fechas calculadas siempre en horario local: evita errores de día causados por conversiones UTC.
- La racha sigue viva durante hoy si la última sesión fue ayer: solo se rompe al terminar el día.
- La mejor racha usa fechas únicas y omite días futuros: representa únicamente logros ya alcanzados.
- Las tarjetas de racha van en paralelo en escritorio y apiladas en móvil; la mejor usa 🏆.

## Aprendizajes y errores a evitar

- Comparar días con operaciones de calendario local al mediodía, no con milisegundos ni UTC.
- Al publicar, localStorage sigue aislado por URL, navegador y dispositivo; los datos locales existentes no se migran solos.

## Próximos pasos

- Elegir un alojamiento estático gratuito y publicar; GitHub Pages es la opción recomendada y Netlify Drop la más rápida.
