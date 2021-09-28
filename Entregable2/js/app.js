document.addEventListener("DOMContentLoaded", () => {
    "use strict";
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    let filas = 6;
    let columnas = 7;

    document.getElementById('reset').addEventListener('click',function () {
        location.reload();
      });

    
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
                li.addEventListener("mouseup", () => {
                    this.ponerFicha(i);
                });
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
                let img = new Image();
                img.onload = function () {
                    ctx.drawImage(img, columna * 50, lastIndexOf0 * 50);
                }
                img.src = this.currentPlayer == 1 ? "img/ficha-roja.png" : "img/ficha-azul.png";
                this.currentPlayer = this.currentPlayer == 1 ? 2 : 1;
            }
            else
                alert("Ya no se pueden insertar mas fichas en esta columna.");
        }
    }

    const tablero = new Board(columnas, filas);
    tablero.pintarTablero();
});

