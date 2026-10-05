
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
const primeraVisita = !nombre;

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

selectorTema.addEventListener("change", () => {
  guardarCookie("tema", selectorTema.value);
  aplicarTema();
});

selectorIdioma.addEventListener("change", () => {
  guardarCookie("idioma", selectorIdioma.value);
  mostrarSaludo();
});

aplicarTema();
mostrarSaludo();
