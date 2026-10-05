
console.log("CookieLab iniciado");

const DURACION_30_DIAS = 30 * 24 * 60 * 60;

function guardarCookie(nombre, valor, segundos = DURACION_30_DIAS) {
  document.cookie = `${encodeURIComponent(nombre)}=${encodeURIComponent(valor)}; max-age=${segundos}; path=/; SameSite=Lax`;
}

function leerCookie(nombre) {
  const prefijo = `${encodeURIComponent(nombre)}=`;
  const cookie = document.cookie
    .split("; ")
    .find((elemento) => elemento.startsWith(prefijo));

  return cookie ? decodeURIComponent(cookie.slice(prefijo.length)) : null;
}

let nombre = leerCookie("usuario");
let primeraVisita = !nombre;

if (primeraVisita) {
  const respuesta = prompt("¡Hola! ¿Cómo te llamas?");

  if (respuesta && respuesta.trim()) {
    nombre = respuesta.trim();
    guardarCookie("usuario", nombre);
    alert(`¡Bienvenido/a, ${nombre}!`);
  }
}

const selectorTema = document.querySelector("#tema");
const selectorIdioma = document.querySelector("#idioma");
const temaGuardado = leerCookie("tema");
const idiomaGuardado = leerCookie("idioma");

if (temaGuardado === "oscuro" || temaGuardado === "claro") {
  selectorTema.value = temaGuardado;
}
if (idiomaGuardado === "en" || idiomaGuardado === "es") {
  selectorIdioma.value = idiomaGuardado;
}

function aplicarTema() {
  document.body.classList.toggle("tema-oscuro", selectorTema.value === "oscuro");
}

function mostrarSaludo() {
  const ingles = selectorIdioma.value === "en";

  if (nombre) {
    document.querySelector("#saludo").textContent = ingles
      ? `Welcome back, ${nombre}`
      : primeraVisita
        ? `¡Hola, ${nombre}!`
        : `Hola de nuevo, ${nombre}`;
  } else {
    document.querySelector("#saludo").textContent = ingles
      ? "Welcome to CookieLab!"
      : "¡Hola! Bienvenido/a a CookieLab.";
  }
}

const visitasPrevias = Number(leerCookie("visitas"));
let visitas = Number.isSafeInteger(visitasPrevias) && visitasPrevias > 0
  ? visitasPrevias + 1
  : 1;
guardarCookie("visitas", visitas);

const fechaUltimaVisitaGuardada = leerCookie("ultimaVisita");
let fechaUltimaVisita = fechaUltimaVisitaGuardada
  ? new Date(fechaUltimaVisitaGuardada)
  : null;
if (fechaUltimaVisita && Number.isNaN(fechaUltimaVisita.getTime())) {
  fechaUltimaVisita = null;
}
guardarCookie("ultimaVisita", new Date().toISOString());

function mostrarVisitas() {
  document.querySelector("#contador-visitas").textContent =
    selectorIdioma.value === "en"
      ? `You have visited this page ${visitas} time${visitas === 1 ? "" : "s"}.`
      : `Has visitado esta página ${visitas} ${visitas === 1 ? "vez" : "veces"}.`;
}

function mostrarUltimaVisita() {
  const ingles = selectorIdioma.value === "en";
  const ultimaVisita = document.querySelector("#ultima-visita");

  if (fechaUltimaVisita) {
    const fecha = new Intl.DateTimeFormat(
      ingles ? "en" : "es",
      { dateStyle: "long", timeStyle: "short" },
    ).format(fechaUltimaVisita);
    ultimaVisita.textContent = ingles
      ? `Your last visit was ${fecha}.`
      : `Tu última visita fue el ${fecha}.`;
  } else {
    ultimaVisita.textContent = ingles
      ? "This is your first recorded visit."
      : "Esta es tu primera visita registrada.";
  }
}

selectorTema.addEventListener("change", () => {
  guardarCookie("tema", selectorTema.value);
  aplicarTema();
});

selectorIdioma.addEventListener("change", () => {
  guardarCookie("idioma", selectorIdioma.value);
  mostrarSaludo();
  mostrarVisitas();
  mostrarUltimaVisita();
});

document.querySelector("#cambiar-nombre").addEventListener("click", () => {
  const respuesta = prompt(
    selectorIdioma.value === "en" ? "What is your name?" : "¿Cómo te llamas?",
    nombre || "",
  );

  if (respuesta && respuesta.trim()) {
    nombre = respuesta.trim();
    primeraVisita = false;
    guardarCookie("usuario", nombre);
    mostrarSaludo();
  }
});

document.querySelector("#olvidarme").addEventListener("click", () => {
  const confirmar = confirm(
    selectorIdioma.value === "en"
      ? "Delete all CookieLab data saved in this browser?"
      : "¿Quieres borrar todos los datos de CookieLab guardados en este navegador?",
  );

  if (!confirmar) {
    return;
  }

  ["usuario", "tema", "idioma", "visitas", "ultimaVisita", "pruebaCaducidad"]
    .forEach((cookie) => guardarCookie(cookie, "", 0));

  nombre = null;
  visitas = 0;
  fechaUltimaVisita = null;
  primeraVisita = true;
  selectorTema.value = "claro";
  selectorIdioma.value = "es";
  aplicarTema();
  mostrarSaludo();
  mostrarVisitas();
  mostrarUltimaVisita();
  document.querySelector("#estado-caducidad").textContent = "";
  document.querySelector("#estado-cuenta").textContent =
    selectorIdioma.value === "en"
      ? "Your saved data has been deleted. Reload to start again."
      : "Tus datos guardados se han borrado. Recarga para empezar de nuevo.";
});

document.querySelector("#crear-cookie-prueba").addEventListener("click", () => {
  guardarCookie("pruebaCaducidad", "activa", 60);
  document.querySelector("#estado-caducidad").textContent =
    selectorIdioma.value === "en"
      ? "Test cookie created. It expires automatically in one minute."
      : "Cookie de prueba creada. Caduca automáticamente en un minuto.";
});

aplicarTema();
mostrarSaludo();
mostrarVisitas();
mostrarUltimaVisita();
