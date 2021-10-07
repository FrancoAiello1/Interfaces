document.addEventListener("DOMContentLoaded", () => {
    "use strict";
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

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
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.board = [];
            this.currentPlayer = 1;
            this.fichaj1 = "";
            this.fichaj2 = "";
        }

        pintarHeader() {
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
            setInterval(() => {
                document.getElementById("segundos").innerHTML = segundos;
                segundos--;
            }, 1000);
            setTimeout(() => {
                this.restart();
            }, 60000);
        }


        dibujarFichas() {
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
            let lastIndexOf0 = this.board[columna].lastIndexOf(0);
            if (lastIndexOf0 != -1) {
                this.board[columna][lastIndexOf0] = this.currentPlayer;
                this.getGanador(columna, lastIndexOf0);
                let img = new Image();
                img.onload = function () {
                    ctx.drawImage(img, columna * 50, lastIndexOf0 * 50, 50, 50);
                }
                console.log(lastIndexOf0);

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
            this.fichaj1 = imgSrc;
            if (this.fichaj2 != "") {
                this.iniciarTablero();
            }
        }

        setFichaJ2(imgSrc) {
            this.fichaj2 = imgSrc;
            if (this.fichaj1 != "") {
                this.iniciarTablero()

            }
        }

        iniciarTablero() {
            this.pintarTablero();
            this.pintarHeader();
            this.dibujarFichas();
        }

        getGanador(columna, fila) {
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
            document.getElementById("ganador").innerHTML = "Gano el jugador " + this.currentPlayer;
            setTimeout(() => {
                document.getElementById("ganador").innerHTML = "";
                this.restart();
            }, 2000);
        }

        restart() {
            this.board = [];
            this.iniciarTablero();
            this.currentPlayer = 1;
        }
    }

    let tablero = new Juego(columnas, filas);

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

    document.querySelector(".j1").addEventListener("change", (e) => {
        let reader = new FileReader();
        reader.onload = function (event) {
            tablero.setFichaJ1(event.target.result);
        }
        reader.readAsDataURL(document.querySelector(".j1").files[0]);
        if (document.getElementById("elegir-fichas-1")) {
            document.getElementById("elegir-fichas-1").remove();
        }
    });

    document.querySelector(".j2").addEventListener("change", (e) => {
        let reader = new FileReader();
        reader.onload = function (event) {
            tablero.setFichaJ2(event.target.result);
        }
        reader.readAsDataURL(document.querySelector(".j2").files[0]);
        if (document.getElementById("elegir-fichas-2")) {
            document.getElementById("elegir-fichas-2").remove();
        }
    });

    document.getElementById("detj1").addEventListener('click', function () {
        let imgSrc = "img/ficha-roja.png";
        tablero.setFichaJ1(imgSrc);
        if (document.getElementById("elegir-fichas-1")) {
            document.getElementById("elegir-fichas-1").remove();
        }
    });

    document.getElementById("detj2").addEventListener('click', function () {
        let imgSrc = "img/ficha-azul.png";
        tablero.setFichaJ2(imgSrc);
        if (document.getElementById("elegir-fichas-2")) {
            document.getElementById("elegir-fichas-2").remove();
        }
    });
});