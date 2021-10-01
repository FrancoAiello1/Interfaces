document.addEventListener("DOMContentLoaded", () => {
    "use strict";
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    let filas = 6;
    let columnas = 7;

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
                li.style.padding = "20px";
                li.style.cursor = "pointer";
                li.style.border = "1px solid black";
                li.style.borderRadius = "5px"
                li.style.marginLeft = "1px";
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

            //Busca 4 en linea horizontalmente.
            let cantidadFichas = 1;
            let xNegativo = columna - 1;
            for (let x = columna + 1; x <= this.height; x++) { 
                if (this.board[x][fila] == this.currentPlayer) {
                    cantidadFichas++;
                }
                while (xNegativo >= 0 && this.board[xNegativo][fila] == this.currentPlayer) { 
                    cantidadFichas++;                                                     
                    xNegativo--;
                }
            }
            if (cantidadFichas >= 4) {
                alert("Gano el jugador " + this.currentPlayer + ' B)');
                this.pintarTablero();
                this.currentPlayer = 1;
                return;
            }
            
            //Busca 4 en linea verticalmente.
            cantidadFichas = 1;
            for (let y = fila + 1; y < this.width; y++) { 
                if (this.board[columna][y] == this.currentPlayer) {
                    cantidadFichas++;
                }
                else
                break;
            }
            if (cantidadFichas >= 4) {
                console.log(cantidadFichas);
                return;
            }
        }
    }

    const tablero = new Board(columnas, filas);
    tablero.pintarTablero();
});

