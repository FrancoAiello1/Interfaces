let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let imageLoader = document.getElementById('imageLoader');

let width = canvas.width;
let height = canvas.height;

imageLoader.addEventListener('change', cargarImagen, false);

function cargarImagen(e) {
    let reader = new FileReader();
    reader.onload = function (event) {
        let img = new Image();
        img.onload = function () {
            ctx.drawImage(img, 0, 0);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
}

class Element {
 
    constructor() {
        this.isDrawing = false;
        this.lastCoords = [null, null];
        this.colors = {
            "rojo": "#FF0000",
            "blanco": "#FFFFFF",
            "azul": "#003AFF",
            "negro": "#000000",
            "verde": "#08FF00",
            "amarillo": "#DCFF00",
        }
        this.color = this.colors.negro;
        this.assignEvents();
    }

    assignEvents() {
        canvas.addEventListener("mousedown", () => this.isDrawing = true);
        canvas.addEventListener("mousemove", event => this.draw(event));
        canvas.addEventListener("mouseup", () => {
            this.isDrawing = false;
            this.lastCoords = [null, null];
        });
        document.getElementById("goma").addEventListener("click", () => this.color = this.colors.blanco);
        document.getElementById("lapiz").addEventListener("click", () => this.changeColor());
        document.getElementById("color").addEventListener("change", () => this.changeColor())
    }

    changeColor() {
        console.log(this.colors);
        let selectedColor = document.getElementById("color").value;
        this.color = this.colors[selectedColor];
    }

    draw(event){
        if (this.isDrawing){
            const rect = canvas.getBoundingClientRect();
            this.offsetLeft = rect.left;
            this.offsetTop = rect.top;
            //ctx.fillStyle = this.color;
            //ctx.fillRect(event.clientX - this.offsetLeft, event.clientY - this.offsetTop, 10, 10);
            if (this.lastCoords[0] != null) {
                ctx.beginPath();
                ctx.lineWidth = 10;
                ctx.moveTo(this.lastCoords[0], this.lastCoords[1])
                ctx.lineTo(event.clientX - this.offsetLeft, event.clientY - this.offsetTop);
                ctx.strokeStyle = this.color;
                ctx.stroke();
            }
                // linea entre coords actuales y lastCoords
            this.lastCoords = [event.clientX - this.offsetLeft, event.clientY - this.offsetTop];
        }
    }
}
const pencil = new Element();