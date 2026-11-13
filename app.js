const CLAVE_SESIONES = "diarioDeEstudio.sesiones";

const formulario = document.querySelector("#formulario-sesion");
const campoFecha = document.querySelector("#fecha");
const campoTema = document.querySelector("#tema");
const campoMinutos = document.querySelector("#minutos");
const diasRacha = document.querySelector("#dias-racha");
const unidadRacha = document.querySelector("#unidad-racha");
const diasMejorRacha = document.querySelector("#dias-mejor-racha");
const unidadMejorRacha = document.querySelector("#unidad-mejor-racha");
const listaSesiones = document.querySelector("#lista-sesiones");
const mensajeVacio = document.querySelector("#sin-sesiones");

let sesiones = cargarSesiones();

campoFecha.value = obtenerFechaLocal();
mostrarDatos();

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const tema = campoTema.value.trim();
  const minutos = Number(campoMinutos.value);

  if (!tema || !Number.isInteger(minutos) || minutos <= 0) {
    return;
  }

  const nuevaSesion = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    fecha: campoFecha.value,
    tema,
    minutos,
    creadaEn: Date.now(),
  };

  sesiones.push(nuevaSesion);
  guardarSesiones();
  mostrarDatos();

  formulario.reset();
  campoFecha.value = obtenerFechaLocal();
  campoTema.focus();
});

function cargarSesiones() {
  try {
    const datosGuardados = localStorage.getItem(CLAVE_SESIONES);
    return datosGuardados ? JSON.parse(datosGuardados) : [];
  } catch (error) {
    console.error("No se pudieron cargar las sesiones guardadas.", error);
    return [];
  }
}

function guardarSesiones() {
  try {
    localStorage.setItem(CLAVE_SESIONES, JSON.stringify(sesiones));
  } catch (error) {
    console.error("No se pudieron guardar las sesiones.", error);
  }
}

function mostrarDatos() {
  mostrarRachas();
  mostrarSesiones();
}

function mostrarRachas() {
  const fechasConEstudio = obtenerFechasConEstudio();
  const rachaActual = calcularRachaActual(fechasConEstudio);
  const mejorRacha = calcularMejorRacha(fechasConEstudio);

  actualizarContadorRacha(diasRacha, unidadRacha, rachaActual);
  actualizarContadorRacha(
    diasMejorRacha,
    unidadMejorRacha,
    mejorRacha,
  );
}

function obtenerFechasConEstudio() {
  return new Set(sesiones.map((sesion) => sesion.fecha));
}

function calcularRachaActual(fechasConEstudio) {
  const hoy = new Date();
  hoy.setHours(12, 0, 0, 0);

  let diaARevisar = new Date(hoy);

  // Si hoy aún no tiene sesión, la racha de ayer sigue viva durante todo el día.
  if (!fechasConEstudio.has(convertirFechaAClave(diaARevisar))) {
    diaARevisar.setDate(diaARevisar.getDate() - 1);
  }

  let racha = 0;

  while (fechasConEstudio.has(convertirFechaAClave(diaARevisar))) {
    racha += 1;
    diaARevisar.setDate(diaARevisar.getDate() - 1);
  }

  return racha;
}

function calcularMejorRacha(fechasConEstudio) {
  const hoy = obtenerFechaLocal();
  const fechasOrdenadas = [...fechasConEstudio]
    .filter((fecha) => fecha <= hoy)
    .sort();

  let mejorRacha = 0;
  let rachaEnCurso = 0;
  let fechaAnterior = null;

  fechasOrdenadas.forEach((fecha) => {
    const esConsecutiva =
      fechaAnterior !== null && fecha === sumarDiasAFecha(fechaAnterior, 1);

    rachaEnCurso = esConsecutiva ? rachaEnCurso + 1 : 1;
    mejorRacha = Math.max(mejorRacha, rachaEnCurso);
    fechaAnterior = fecha;
  });

  return mejorRacha;
}

function actualizarContadorRacha(elementoDias, elementoUnidad, valor) {
  elementoDias.textContent = valor;
  elementoUnidad.textContent = valor === 1 ? "día" : "días";
}

function mostrarSesiones() {
  listaSesiones.replaceChildren();

  const sesionesOrdenadas = [...sesiones].sort((a, b) => {
    const comparacionPorFecha = b.fecha.localeCompare(a.fecha);
    return comparacionPorFecha || (b.creadaEn ?? 0) - (a.creadaEn ?? 0);
  });

  mensajeVacio.hidden = sesionesOrdenadas.length > 0;

  sesionesOrdenadas.forEach((sesion) => {
    const elemento = document.createElement("li");
    elemento.className = "sesion";

    const informacion = document.createElement("div");

    const tema = document.createElement("p");
    tema.className = "sesion__tema";
    tema.textContent = sesion.tema;

    const fecha = document.createElement("p");
    fecha.className = "sesion__fecha";
    fecha.textContent = formatearFecha(sesion.fecha);

    const minutos = document.createElement("span");
    minutos.className = "sesion__minutos";
    minutos.textContent = `${sesion.minutos} min`;

    informacion.append(tema, fecha);
    elemento.append(informacion, minutos);
    listaSesiones.append(elemento);
  });
}

function obtenerFechaLocal() {
  return convertirFechaAClave(new Date());
}

function convertirFechaAClave(fecha) {
  const anio = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");
  return `${anio}-${mes}-${dia}`;
}

function sumarDiasAFecha(fechaEnTexto, cantidad) {
  const [anio, mes, dia] = fechaEnTexto.split("-").map(Number);
  const fechaLocal = new Date(anio, mes - 1, dia, 12);
  fechaLocal.setDate(fechaLocal.getDate() + cantidad);
  return convertirFechaAClave(fechaLocal);
}

function formatearFecha(fechaEnTexto) {
  const [anio, mes, dia] = fechaEnTexto.split("-").map(Number);
  const fechaLocal = new Date(anio, mes - 1, dia);

  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(fechaLocal);
}
