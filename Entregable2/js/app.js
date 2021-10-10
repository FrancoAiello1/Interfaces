document.addEventListener("DOMContentLoaded", () => {
    "use strict";
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    
    var img = new Image();
    img.onload = function() {
      ctx.drawImage(img, 0, 0);
    };
    img.src = 'img/start.png';

    let enLinea = 4;
    let filas = enLinea + 2;
    let columnas = enLinea + 3;
    let width = columnas * 50;
    let height = filas * 50;
    canvas.width = width;
    canvas.height = height;

    document.getElementById('reset').addEventListener('click', function () {
        location.reload();
    });

    function allowDrop(ev) {
        ev.preventDefault();
    }

    class Juego {
        //Clase princiapal, construye la logica del juego y tambien la visualizacion del tablero
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.board = [];
            this.currentPlayer = 1;
            this.fichaj1 = "";
            this.fichaj2 = "";
        }

        pintarHeader() {
            //Crea un espacio correspondiente a cada columna donde el jugador va a poner la ficha
            //Dicho espacio es representado por una imagen de una flecha.
            if (document.getElementById("cantidad")) {
                document.getElementById("cantidad").remove();
            }
            document.getElementById("list").innerHTML = "";
            for (let i = 0; i < this.width; i++) {
                let li = document.createElement('li');
                li.innerHTML = i + 1;
                let img = document.createElement("img");
                img.src = "img/flecha-abajo.png";
                img.addEventListener("dragover", (e) => {
                    allowDrop(e);
                });
                img.addEventListener("drop", (e) => {
                    this.ponerFicha(i);
                })

                img.style.cursor = "pointer";
                img.style.marginLeft = "1px";
                img.style.maxWidth = "50px"
                document.getElementById("list").appendChild(img);
            }
        }

        pintarTablero() {
            //A cada espacio de la matriz le asigna la imagen correspondiente al tablero vacío para
            //así armarlo.
            //Controla el tiempo de juego y muestra de que jugador es el turno.
            for (let x = 0; x < this.width; x++) {
                this.board.push([]);
                for (let y = 0; y < this.height; y++) {
                    this.board[x].push(0);
                    let img = new Image();
                    img.onload = function () {
                        ctx.drawImage(img, x * 50, y * 50);
                    }
                    img.src = "img/tablero.png";
                    ctx.drawImage(img, x * 50, y * 50);
                }
            }
            let segundos = 60;
            let interval = setInterval(() => {
                document.getElementById("labelsecs").innerHTML = "Turno del jugador " + this.currentPlayer;
                document.getElementById("segundos").innerHTML = segundos + "s";
                segundos--;
            }, 1000);
            setTimeout(() => {
                document.getElementById("labelsecs").innerHTML ="Limite de tiempo alcanzado, reiniciando juego.";
                setTimeout(() => {
                    this.restart();
                }, 3000);
                clearInterval(interval);
            }, 60000);
        }


        dibujarFichas() {
            //Arma los grupos de fichas con la ficha seleccionada por cada jugador
            //Al ser una ficha puesta en el tablero la misma es borrada.
            document.getElementById("fichas-1").innerHTML = "";
            document.getElementById("fichas-2").innerHTML = "";
            for (let i = 0; i < this.width * this.height; i++) {
                let img = new Image();
                img.src = i % 2 == 0 ? this.fichaj1 : this.fichaj2;
                img.width = "50";
                img.height = "50";
                document.getElementById(`fichas-${i % 2 == 0 ? '1' : '2'}`).appendChild(img);
                img.addEventListener("mousedown", () => {
                    img.draggable = true;
                    if (!(i % 2 == 0 && this.currentPlayer == 1 || i % 2 != 0 && this.currentPlayer == 2)) {
                        img.draggable = false;
                    }
                    let currentPlayer = this.currentPlayer;
                    img.addEventListener("dragend", () => {
                        if (currentPlayer != this.currentPlayer) {
                            img.remove();
                        }
                    })
                })
            }
        }

        ponerFicha(columna) {
            //Funcion dedicada a poner la ficha en el tablero, la ubica en la ultima posicion libre que encuentra
            //Si la columna esta llena muestra un mensaje indicándolo
            let lastIndexOf0 = this.board[columna].lastIndexOf(0);
            if (lastIndexOf0 != -1) {
                this.board[columna][lastIndexOf0] = this.currentPlayer;
                this.getGanador(columna, lastIndexOf0);
                let img = new Image();
                img.onload = function () {
                    ctx.drawImage(img, columna * 50, lastIndexOf0 * 50, 50, 50);
                }
                img.src = this.currentPlayer == 1 ? this.fichaj1 : this.fichaj2;

                this.currentPlayer = this.currentPlayer == 1 ? 2 : 1;

            }
            else {
                document.getElementById("ganador").innerHTML = "Ya no se pueden insertar mas fichas en esta columna.";
                setTimeout(() => {
                    document.getElementById("ganador").innerHTML = ""
                }, 3000);
            }
        }

        setFichaJ1(imgSrc) {
            //Funcion que asigna la imagen que cada jugador utilizará.
            this.fichaj1 = imgSrc;
            if (this.fichaj2 != "") {
                this.iniciarTablero();
            }
        }

        setFichaJ2(imgSrc) {
            //Funcion que asigna la imagen que cada jugador utilizará.
            this.fichaj2 = imgSrc;
            if (this.fichaj1 != "") {
                this.iniciarTablero()

            }
        }

        iniciarTablero() {
            //Llama a las tres funciones principales del juego, armando el tablero para poder jugar.
            this.pintarTablero();
            this.pintarHeader();
            this.dibujarFichas();
        }

        getGanador(columna, fila) {
            //Controla si hay ganadores cuando una ficha es puesta en el tablero.
            this.verificarHorizontalmente(columna, fila);
            this.verificarVerticalmente(columna, fila);
            this.verificarDiagonalmenteIzquierdaDerecha(columna, fila)
            this.verificarDiagonalmenteDerechaIzquierda(columna, fila)
        }

        verificarHorizontalmente(columna, fila) {
            //Busca 4 en linea horizontalmente.
            let cantidadFichas = 1;
            let xNegativo = columna - 1;
            let noEncontro = false;
            let x = columna + 1;
            do {
                if (this.board[x] && this.board[x][fila] == this.currentPlayer) {
                    cantidadFichas++;
                }
                else {
                    noEncontro = true;
                }
                while (xNegativo >= 0 && this.board[xNegativo][fila] == this.currentPlayer) {
                    cantidadFichas++;
                    xNegativo--;
                }
                if (noEncontro || cantidadFichas >= enLinea) {
                    break;
                }
                x++;
            }
            while (x <= this.height);

            if (cantidadFichas >= enLinea) {
                this.imprimirGanador();
            }

        }

        verificarVerticalmente(columna, fila) {
            //Busca 4 en linea verticalmente.
            let cantidadFichas = 1;
            for (let y = fila + 1; y < this.width; y++) {
                if (this.board[columna][y] == this.currentPlayer) {
                    cantidadFichas++;
                }
                else {
                    break;
                }
            }
            if (cantidadFichas >= enLinea) {
                this.imprimirGanador();
            }
        }

        verificarDiagonalmenteIzquierdaDerecha(columna, fila) {
            //Busca 4 en linea en diagonal
            let cantidadFichas = 1;
            let filaActual = fila - 1;
            let xNegativo = columna - 1;
            let filaNegativo = fila + 1;
            let noEncontro = false;
            let x = columna + 1;

            do {
                if (this.board[x] && this.board[x][filaActual] == this.currentPlayer) {
                    filaActual--;
                    cantidadFichas++;
                }
                else {
                    noEncontro = true;
                }
                while (xNegativo >= 0 && this.board[xNegativo][filaNegativo] == this.currentPlayer) {
                    cantidadFichas++;
                    xNegativo--;
                    filaNegativo++;
                }
                if (noEncontro || cantidadFichas >= enLinea) {
                    break;
                }
                x++;
            }
            while (x <= this.height);
            if (cantidadFichas >= enLinea) {
                this.imprimirGanador();
            }
        }

        verificarDiagonalmenteDerechaIzquierda(columna, fila) {
            //Busca 4 en linea en diagonal
            let cantidadFichas = 1;
            let filaActual = fila - 1;
            let xNegativo = columna + 1;
            let filaNegativo = fila + 1;
            let noEncontro = false;
            let x = columna - 1;

            do {
                if (this.board[x] && this.board[x][filaActual] == this.currentPlayer) {
                    filaActual--;
                    cantidadFichas++;
                }
                else {
                    noEncontro = true;
                }
                while (xNegativo <= this.width && this.board[xNegativo] && this.board[xNegativo][filaNegativo] == this.currentPlayer) {
                    cantidadFichas++;
                    xNegativo++;
                    filaNegativo++;
                }
                if (noEncontro || cantidadFichas >= enLinea) {
                    break;
                }
                x--;
            }
            while (x <= this.height);
            if (cantidadFichas >= enLinea) {
                this.imprimirGanador();
            }
        }

        imprimirGanador() {
            //Notifica al usuario quién fue el ganador y reinicia el tablero, manteniendo la configuración de juego.
            document.getElementById("title").innerHTML = "Gano el jugador " + this.currentPlayer+ ", reiniciando tablero.";
            setTimeout(() => {
                document.getElementById("segundos").innerHTML = "";
                this.restart();
                document.getElementById("title").innerHTML = "X en linea";
            }, 3000);
            
        }

        restart() {
            //Vacía la matriz de la lógica del juego e inicia un tablero vacío, setea el turno al jugador 1.
            for (let i = 1; i < 99999; i++)
                window.clearInterval(i);
            this.board = [];
            this.iniciarTablero();
            this.currentPlayer = 1;
        }
    }

    let tablero = new Juego(columnas, filas); //Instancia de la clase juego.


    //Cambia el tamaño del tablero de juego basado en la cantidad de fichas en línea que quiera juegar el usuario.
    document.getElementById('enLinea').addEventListener('change', () => {
        enLinea = parseInt(document.getElementById('enLinea').value);
        if (enLinea > 1) {
            document.getElementById("list").innerHTML = "";
            tablero.width = enLinea + 3;
            tablero.height = enLinea + 2;
            width = tablero.width * 50;
            height = tablero.height * 50;
            canvas.width = width;
            canvas.height = height;
            document.getElementById("cantidad").remove();
        }
    });

    //Permite al usuario elegir una imagen personalizada para el jugador 1.
    //Deshabilita la seleccion de imagen y ficha predeterminada.
    document.querySelectorAll(".j1").forEach(el => {
        el.addEventListener("change", (e) => {
            if (el.files) {
                let reader = new FileReader();
                reader.onload = function (event) {
                    tablero.setFichaJ1(event.target.result);
                }
                reader.readAsDataURL(el.files[0]);
            }
            else {
                tablero.setFichaJ1(`img/${el.value}`)
            }
            if (document.getElementById("elegir-fichas-1")) {
                document.getElementById("elegir-fichas-1").remove();
            }
        });
        
    })

    //Permite al usuario elegir una imagen personalizada para el jugador 2.
    //Deshabilita la seleccion de imagen y ficha predeterminada.
    document.querySelectorAll(".j2").forEach(el => {
        el.addEventListener("change", (e) => {
            if (el.files) {
                let reader = new FileReader();
                reader.onload = function (event) {
                    tablero.setFichaJ2(event.target.result);
                }
                reader.readAsDataURL(el.files[0]);
            }
            else {
                tablero.setFichaJ2(`img/${el.value}`)
            }
            if (document.getElementById("elegir-fichas-2")) {
                document.getElementById("elegir-fichas-2").remove();
            }
        });
        
    })
});