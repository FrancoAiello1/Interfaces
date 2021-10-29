
let puntajeMax = 5;
let tiempo = 0;
let tocaTijera = false;
let detectar;

document.addEventListener('DOMContentLoaded', (event) => {
    //Al cargarse el html por completo esconde usando JQuery los elementos no necesarios en el momento.
    $("#game").hide();
    $("#ganador").hide();
    $("#perdedor").hide();
    $("#explota").hide();
});

document.onkeydown = function (event) {
    //Al apretar la barra espaciadora ejecuta la funcion jump() y tambien hace la aparicion de la moneda
    //en un maximo de 10 segundos.
    if ((!event.repeat) && (event.keyCode == 32)) {
        let distance = document.getElementById("moneda").getBoundingClientRect().x - document.getElementById("gb").getBoundingClientRect().x;
        jump();
        setTimeout(() => {
            document.getElementById("moneda").classList.add("move-coin");
            document.getElementById("div-moneda").classList.add("div-moneda");
        }, Math.floor(Math.random() * 10000) + distance);
    }

}


function jump() {
    //Agrega la clase gbjump a el personaje, que contiene la animacion para el mismo, luego la remueve despues de 1 segundo.
    document.getElementById("gb").classList.add("gbjump");
    let agarro = false;
    setTimeout(() => {
        document.getElementById("gb").classList.remove("gbjump");
    }, 1000);

    agarroMoneda();

}

function agarroMoneda() {
    //Chequea si el personaje se acerco lo suficiente a la moneda como para haberla agarrado, si es así remueve la misma
    //y suma un punto.
    //Usando JQuery muestra y oculta la animacion de colectar la moneda
    let distance = document.getElementById("moneda").getBoundingClientRect().x - document.getElementById("gb").getBoundingClientRect().x;
    if (distance <= 321 && distance > 0) {

        setTimeout(() => {
            document.getElementById("moneda").classList.remove("move-coin");
            
            $("#explota").show();
            setTimeout(() => {
                $("#explota").hide();
                document.getElementById("div-moneda").classList.remove("div-moneda");
            }, 1000);
            console.log("aca");
        }, distance)

        sumarPuntos();

    }
}

function chocoTijera() {
    //Con un booleano y las posiciones de los elementos en pantalla verifica si estos dos ultimos 
    //se tocaron y ejecuta la funcion finJuego()

    let hitboxPanaIzq = document.getElementById("gb").getBoundingClientRect().left;
    let hitboxPanaTop = document.getElementById("gb").getBoundingClientRect().top;
    let hitboxTijera = document.getElementById("scissors").getBoundingClientRect().left;

    if (!tocaTijera && parseInt(hitboxTijera) - parseInt(hitboxPanaIzq) <= 0 && parseInt(hitboxTijera) - parseInt(hitboxPanaIzq) > -10 && parseInt(hitboxPanaTop) >= 540) {
        tocaTijera = true;
    }
    if (tocaTijera) {
        finJuego();
    }
}

function finJuego() {
    //Borra el setInterval que detecta si te chocaste la tijera, agrega la clase con la animacion de muerte
    //y muestra un mensaje al usuario
    clearInterval(detectar);
    document.getElementById("gb").classList.add("gbdead");
    document.getElementById("div-moneda").classList.remove("div-moneda");
    setTimeout(() => {
        $("#game").hide();
        $("#perdedor").show();
    }, 1000);

}

function sumarPuntos() {
    //Agrega un punto por cada moneda obtenida, al llegar al limite se ejecuta la funcion ganador()
    setTimeout(() => {
        document.getElementById("puntos").innerHTML = parseInt(document.getElementById("puntos").innerHTML) + 1;
        agarro = true;
        if (document.getElementById("puntos").innerHTML == puntajeMax) {
            ganador();
        }
    }, 500)

}

function ganador() {
    //Usando JQuery oculta el html del juego y muestra el aviso de ganador
    $("#game").hide();
    $("#ganador").show();
}

function background2() {
    //Agrega la clase con diferente imagen a cada capa del escenario 
    console.log("yes");
    document.getElementById("capa1").classList.add("back2-1");
    document.getElementById("capa2").classList.add("back2-2");
    document.getElementById("capa3").classList.add("back2-3");
    document.getElementById("capa4").classList.add("back2-4");
    document.getElementById("capa5").classList.add("back2-5");
    document.getElementById("capa6").classList.add("back2-6");
    document.getElementById("capa7").classList.add("back2-7");
    document.getElementById("capa8").classList.remove("capa8");
}

function background1() {
    //Agrega la clase con diferente imagen a cada capa del escenario 
    document.getElementById("capa1").classList.remove("back2-1");
    document.getElementById("capa2").classList.remove("back2-2");
    document.getElementById("capa3").classList.remove("back2-3");
    document.getElementById("capa4").classList.remove("back2-4");
    document.getElementById("capa5").classList.remove("back2-5");
    document.getElementById("capa6").classList.remove("back2-6");
    document.getElementById("capa7").classList.remove("back2-7");
    document.getElementById("capa8").classList.add("capa8");
}

function play() {
    //Usando JQuery muestra el juego y oculta las instrucciones, agrega un setInterval que pregunta 
    //por la colision de las tijeras y el player model.
    $("#game").show();
    $("#instrucciones").hide();
    detectar = setInterval(chocoTijera, 0);
}
