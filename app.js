
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

const nombre = prompt("¡Hola! ¿Cómo te llamas?");

if (nombre && nombre.trim()) {
  const nombreGuardado = nombre.trim();
  guardarCookie("usuario", nombreGuardado);
  alert(`¡Bienvenido/a, ${nombreGuardado}!`);
  document.querySelector("#saludo").textContent = `¡Hola, ${nombreGuardado}!`;
} else {
  document.querySelector("#saludo").textContent = "¡Hola! Bienvenido/a a CookieLab.";
}
