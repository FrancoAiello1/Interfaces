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

    class Board {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.board = [];
            this.pintarHeader();
            this.currentPlayer = 1;
        }

        pintarHeader() {
            for (let i = 0; i < this.width; i++) {
                let li = document.createElement('li');
                li.innerHTML = i + 1;
                li.addEventListener("dragover", (e) => {
                    allowDrop(e);
                });
                li.addEventListener("drop", (e) => {
                    this.ponerFicha(i);
                })
                li.style.padding = "18px";
                li.style.cursor = "pointer";
                li.style.border = "1px solid black";
                li.style.borderRadius = "5px"
                li.style.marginLeft = "1px";
                li.style.maxWidth = "50px"
                document.getElementById("list").appendChild(li);
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
        }

        ponerFicha(columna) {
            let lastIndexOf0 = this.board[columna].lastIndexOf(0);
            if (lastIndexOf0 != -1) {
                this.board[columna][lastIndexOf0] = this.currentPlayer;
                this.getGanador(columna, lastIndexOf0);

                let img = new Image();
                img.onload = function () {
                    ctx.drawImage(img, columna * 50, lastIndexOf0 * 50);
                }
                img.src = this.currentPlayer == 1 ? "img/ficha-roja.png" : "img/ficha-azul.png";
                this.currentPlayer = this.currentPlayer == 1 ? 2 : 1;
                if (this.currentPlayer == 2) {
                    document.getElementById("drag1").style.display = "none";
                    document.getElementById("drag2").style.display = "block";
                }
                else {
                    document.getElementById("drag2").style.display = "none";
                    document.getElementById("drag1").style.display = "block";
                }

            }
            else
                alert("Ya no se pueden insertar mas fichas en esta columna.");
        }

        getGanador(columna, fila) {
            this.verificarHorizontalmente(columna, fila);
            this.verificarVerticalmente(columna, fila);
            this.verificarDiagonalmente(columna, fila)
        }

        verificarHorizontalmente(columna, fila) {
            //Busca 4 en linea horizontalmente.
            let cantidadFichas = 1;
            let xNegativo = columna - 1;
            let noEncontro = false;
            for (let x = columna + 1; x <= this.height + 1; x++) {
                if (!(x > this.height)) {
                    if (this.board[x][fila] == this.currentPlayer) {
                        cantidadFichas++;
                    }
                    else {
                        noEncontro = true;
                    }
                }
                while (xNegativo >= 0 && this.board[xNegativo][fila] == this.currentPlayer) {
                    cantidadFichas++;
                    xNegativo--;
                }
                if (noEncontro) {
                    break;
                }
            }
            if (cantidadFichas >= enLinea) {
                alert("Gano el jugador " + this.currentPlayer + ' B)');
                location.reload();
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
                alert("Gano el jugador " + this.currentPlayer + ' B)');
                location.reload();
            }
        }

        verificarDiagonalmente(columna, fila) {
            //Busca 4 en linea en diagonal
            let cantidadFichas = 1;
            let filaActual = fila - 1;
            let xNegativo = columna - 1;
            let filaNegativo = fila + 1;
            let noEncontro = false;
            for (let x = columna + 1; x <= this.height + 1; x++) {
                if (!(x > this.height)) {
                    if (this.board[x][filaActual] == this.currentPlayer) {
                        filaActual--;
                        cantidadFichas++;
                    }
                    else {
                        noEncontro = true;
                    }
                }
                while (xNegativo >= 0 && this.board[xNegativo][filaNegativo] == this.currentPlayer) {
                    cantidadFichas++;
                    xNegativo--;
                    filaNegativo++;
                }
                if (noEncontro) {
                    break;
                }
            }
            if (cantidadFichas >= enLinea) {
                alert("Gano el jugador " + this.currentPlayer + ' B)');
                //location.reload();
            }
        }
    }

    let tablero = new Board(columnas, filas);
    tablero.pintarTablero();

    document.getElementById('enLinea').addEventListener('change', () => {
        enLinea = parseInt(document.getElementById('enLinea').value);
        if (enLinea > 1) {
            document.getElementById("list").innerHTML = "";
            filas = enLinea + 2;
            columnas = enLinea + 3;
            width = columnas  * 50;
            height = filas * 50;
            canvas.width = width;
            canvas.height = height;
            tablero = new Board(columnas, filas);
            tablero.pintarTablero();
        }
    });

});

