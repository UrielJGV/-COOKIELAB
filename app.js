
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

if (!nombre) {
  const respuesta = prompt("¡Hola! ¿Cómo te llamas?");

  if (respuesta && respuesta.trim()) {
    nombre = respuesta.trim();
    guardarCookie("usuario", nombre);
    alert(`¡Bienvenido/a, ${nombre}!`);
    document.querySelector("#saludo").textContent = `¡Hola, ${nombre}!`;
  } else {
    document.querySelector("#saludo").textContent = "¡Hola! Bienvenido/a a CookieLab.";
  }
} else {
  document.querySelector("#saludo").textContent = `Hola de nuevo, ${nombre}`;
}
