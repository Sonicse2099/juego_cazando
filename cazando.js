var canvas = document.getElementById("areaJuego");
var ctx = canvas.getContext("2d");

var gatoAncho = 40;
var gatoLargo = 40;

var comidaAncho = 20;
var comidaAlto = 20;

var gatoX = 0;
var gatoY = 0;

var comidaX = 0;
var comidaY = 0;

var puntos = 0;
var tiempo = 10;
var intervalo = null;

function obtenerAlazar(maximo){
    return Math.floor(Math.random()*maximo)
}

function actualizarPuntos(){
    document.getElementById("puntos").textContent = puntos;
}

function mostrarMensaje(texto) {
    document.getElementById("mensaje").textContent = texto;
}

function dibujarRectangulo(x,y,ancho,alto,color){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, ancho, alto); 
}
function graficarGato() {
    graficarRectangulo(gatoX, gatoY, gatoAncho, gatoLargo, "white");
}

function graficarComida() {
    graficarRectangulo(comidaX, comidaY, comidaAncho, comidaAlto, "gold");
}

function iniciarJuego(){
    gatoX = (canvas.width / 2) - (gatoAncho / 2);
    gatoY = (canvas.heigth / 2) - (gatoLargo / 2);

    comidaX = (canvas.width / 2) - (comidaAncho / 2);
    comidaY = (canvas.heigth / 2) - (comidaAlto / 2);

    puntos = 0;
    tiempo = 10;
    actualizarPuntos();
    actualizarTiempo();
    mostrarMensaje("");

    graficarGato();
    graficarComida();

    intervalo = setInterval(restarTiempo, 1000);

}

function limpiarCanvas(){
    ctx.clearRect(0,0, canvas.width,canvas.heigth);
}

function moverIzquierda(){
    gatoX = gatoX - 10;
    limpiarCanva();
    graficarGato();
    graficarComida();
    detectarColision();
}

function moverDerecha(){
    gatoX = gatoX + 10;
    limpiarCanva();
    graficarGato();
    graficarComida();
    detectarColision();
}

function moverArriba(){
    gatoY = gatoY - 10;
    limpiarCanva();
    graficarGato();
    graficarComida();
    detectarColision();
}

function moverAbajo(){
    gatoY = gatoY + 10;
    limpiarCanva();
    graficarGato();
    graficarComida();
    detectarColision();
}

function detectarColision(){
    var tocaEnX = (gatoX < comidaX + comidaAncho) && (gatoX + gatoAncho > comidaX);
    var tocaEnY = (gatoY < comidaY + comidaAlto) && (gatoY + gatoLargo > comidaY);

    if(tocaEnX && tocaEnY){
        comidaX = obtenerAleatorio(canvas.width  - comidaAncho);
        comidaY = obtenerAleatorio(canvas.height - comidaAlto);

        puntos = puntos + 1;
        actualizarPuntos();

        if (puntos >= 6) {
            clearInterval(intervalo);
            mostrarMensaje("¡Ganaste!Comiste 6 veces.");
            alert("¡Ganaste!");
        }
    }
}