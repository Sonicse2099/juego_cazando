var canvas = document.getElementById("areaJuego");
var ctx = canvas.getContext("2d");
 
var gatoAncho = 40;
var gatoLargo = 40;
 
var comidaAncho = 20;
var comidaAlto  = 20;
 
var gatoX = 0;
var gatoY = 0;
 
var comidaX = 0;
var comidaY = 0;
 
var puntos   = 0;
var tiempo   = 10;
var intervalo = null;
 
function obtenerAlazar(maximo) {
    return Math.floor(Math.random() * maximo);
}
 
function actualizarPuntos() {
    document.getElementById("puntos").textContent = puntos;
}
 
function actualizarTiempo() {
    document.getElementById("tiempo").textContent = tiempo;
}
 
function mostrarMensaje(texto) {
    document.getElementById("mensaje").textContent = texto;
}
 
function limpiarCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dibujarFondo();
}
 
function dibujarFondo() {
    ctx.fillStyle = "#080820";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
 
    ctx.strokeStyle = "rgba(30, 30, 80, 0.6)";
    ctx.lineWidth = 1;
 
    var paso = 25;
    for (var x = 0; x <= canvas.width; x += paso) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    for (var y = 0; y <= canvas.height; y += paso) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

function graficarGato() {
    var x = gatoX;
    var y = gatoY;
    var w = gatoAncho;
    var h = gatoLargo;

    ctx.shadowColor = "#00e5ff";
    ctx.shadowBlur  = 12;

    ctx.fillStyle = "#00e5ff";
    ctx.fillRect(x + 4, y + 12, w - 8, h - 12);

    ctx.fillRect(x + 2, y + 4, w - 4, 14);
 
    ctx.fillRect(x + 2,      y,     6, 6); 
    ctx.fillRect(x + w - 8,  y,     6, 6);  

    ctx.fillStyle = "#003a44";
    ctx.fillRect(x + 3,      y + 1,  4, 4);
    ctx.fillRect(x + w - 7,  y + 1,  4, 4);

    ctx.shadowBlur  = 6;
    ctx.shadowColor = "#ffffff";
    ctx.fillStyle   = "#ffffff";
    ctx.fillRect(x + 5,      y + 6,  5, 5);
    ctx.fillRect(x + w - 10, y + 6,  5, 5);
 
    ctx.fillStyle   = "#001a20";
    ctx.shadowBlur  = 0;
    ctx.fillRect(x + 7,      y + 7,  3, 4);
    ctx.fillRect(x + w - 8,  y + 7,  3, 4);

    ctx.fillStyle = "#ff88aa";
    ctx.fillRect(x + (w / 2) - 1, y + 12, 3, 2);

    ctx.shadowColor = "#00e5ff";
    ctx.shadowBlur  = 8;
    ctx.fillStyle   = "#00e5ff";
    ctx.fillRect(x + w, y + h - 10, 8, 4);
    ctx.fillRect(x + w + 6, y + h - 14, 4, 8);
 
    ctx.shadowBlur  = 0;
    ctx.shadowColor = "transparent";
}

function graficarComida() {
    var x = comidaX;
    var y = comidaY;
    var w = comidaAncho;
    var h = comidaAlto;
 
    ctx.shadowColor = "#ffd700";
    ctx.shadowBlur  = 14;

    ctx.fillStyle = "#ffd700";
    ctx.fillRect(x + 4, y + 4, w - 8, h - 8);

    ctx.fillRect(x + w - 8, y + 2, 8, h - 4);

    ctx.fillRect(x,     y,         6, 6);
    ctx.fillRect(x,     y + h - 6, 6, 6);

    ctx.shadowBlur = 4;
    ctx.shadowColor = "#ffffff";
    ctx.fillStyle  = "#ffffff";
    ctx.fillRect(x + w - 5, y + 6, 3, 3);
 
    ctx.fillStyle  = "#1a0000";
    ctx.shadowBlur = 0;
    ctx.fillRect(x + w - 4, y + 7, 2, 2);
 
    ctx.shadowBlur  = 0;
    ctx.shadowColor = "transparent";
}

function iniciarJuego() {
    gatoX = (canvas.width  / 2) - (gatoAncho  / 2);
    gatoY = (canvas.height / 2) - (gatoLargo  / 2);
 
    comidaX = obtenerAlazar(canvas.width  - comidaAncho);
    comidaY = obtenerAlazar(canvas.height - comidaAlto);
 
    puntos = 0;
    tiempo = 10;
 
    actualizarPuntos();
    actualizarTiempo();
    mostrarMensaje("");
 
    limpiarCanvas();
    graficarGato();
    graficarComida();
 
    intervalo = setInterval(restarTiempo, 1000);
}
 
function moverIzquierda() {
    gatoX = gatoX - 10;
    limpiarCanvas();
    graficarGato();
    graficarComida();
    detectarColision();
}
 
function moverDerecha() {
    gatoX = gatoX + 10;
    limpiarCanvas();
    graficarGato();
    graficarComida();
    detectarColision();
}
 
function moverArriba() {
    gatoY = gatoY - 10;
    limpiarCanvas();
    graficarGato();
    graficarComida();
    detectarColision();
}
 
function moverAbajo() {
    gatoY = gatoY + 10;
    limpiarCanvas();
    graficarGato();
    graficarComida();
    detectarColision();
}
 
function detectarColision() {
    var tocaEnX = (gatoX < comidaX + comidaAncho) && (gatoX + gatoAncho > comidaX);
    var tocaEnY = (gatoY < comidaY + comidaAlto)  && (gatoY + gatoLargo > comidaY);
 
    if (tocaEnX && tocaEnY) {
        comidaX = obtenerAlazar(canvas.width  - comidaAncho);
        comidaY = obtenerAlazar(canvas.height - comidaAlto);
 
        puntos = puntos + 1;
        actualizarPuntos();
 
        if (puntos >= 6) {
            clearInterval(intervalo);
            mostrarMensaje("¡GANASTE! ¡6 PESCADOS!");
            alert("¡¡GANASTE!!");
        }
    }
}
 
function restarTiempo() {
    tiempo = tiempo - 1;
    actualizarTiempo();
 
    if (tiempo <= 0) {
        clearInterval(intervalo);
        mostrarMensaje("¡TIEMPO AGOTADO! GAME OVER");
        alert("GAME OVER!");
    }
}
 
function reiniciarJuego() {
    clearInterval(intervalo);
    limpiarCanvas();
    iniciarJuego();
}