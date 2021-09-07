let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let imageLoader = document.getElementById('imageLoader');
let download = document.getElementById('download');
let clear = document.getElementById('clear');
let blancoynegro = document.getElementById('blancoynegro');
let negativo = document.getElementById('negativo');

let width = canvas.width;
let height = canvas.height;

imageLoader.addEventListener('change', cargarImagen, false);


//Se inicia una instancia de FileReader y al cargar una imagen este la dibuja en el lienzo, respetando
//el tamaño del mismo y no rompiendo el aspecto.
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
clear.addEventListener('click', function (e) {
    ctx.clearRect(0, 0, width, height);
})

//Se le asigna el evento al botón correspondiente a descargar lienzo y se procede a la descarga del mismo
//utilizando la funcion toDataURL(), descargando con el nombre especificado "lienzo.png"
download.addEventListener('click',
    function (e) {
        const link = document.createElement('a');
        link.download = "lienzo.png";
        link.href = canvas.toDataURL();
        link.click();
        link.delete;
    });

class Filter {
    constructor() {
        this.assignEvents();
    }

    assignEvents() {
        blancoynegro.addEventListener('click', () => this.blancoYNegro());
        negativo.addEventListener("click", () => this.negativo());
    }

    blancoYNegro() {
        //Se le asigna el evento al botón correspondiente al filtro de grises y luego se aplica el filtro.
        //Se toma el canvas y a cada pixel se le modifica el valor RGB, obteniendo un promedio de ese valor
        //por cada pixel y haciéndolo el nuevo valor.
        let imageData = ctx.getImageData(0, 0, width, height);
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let index = (x + y * width) * 4;
                let r = imageData.data[index];
                let g = imageData.data[index + 1];
                let b = imageData.data[index + 2];

                let color = (r + g + b) / 3;

                this.setPixel(imageData, x, y, color, color, color, 255);
            }
        }
        ctx.putImageData(imageData, 0, 0, 0, 0, width, height);
    }

    negativo() {
        //Se le asigna el evento al botón correspondiente al filtro negativo y luego se aplica el filtro.
        //Se toma el canvas y a cada pixel se le modifica el valor RGB a el valor opuesto, restándole a 255 el valor
        //actual.
        let imageData = ctx.getImageData(0, 0, width, height);
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let index = (x + y * width) * 4;
                let r = 255 - imageData.data[index];
                let g = 255 - imageData.data[index + 1];
                let b = 255 - imageData.data[index + 2];
                this.setPixel(imageData, x, y, r, g, b, 255);
            }
        }
        ctx.putImageData(imageData, 0, 0)

    }

    setPixel(imageData,x, y, r, g, b, a) {
        let index = (x + y * width) * 4;
        imageData.data[index] = r;
        imageData.data[index + 1] = g;
        imageData.data[index + 2] = b;
        imageData.data[index + 3] = a;
    }
}

//Se crea el constructor de la clase Element, que utilizaremos como lápiz.
class Element {

    constructor() {
        this.isDrawing = false;
        this.lastCoords = [null, null];
        this.assignEvents();
        this.changeColor();
    }

    //Se asignan los eventos para la funcionalidad de poder dibujar, utilizando el movimiento del mouse
    //y cuando se esta presionando o no el click.
    //Además se agregan los eventos para utilizar lapiz, goma o cambiar de color.
    assignEvents() {
        canvas.addEventListener("mousedown", () => this.isDrawing = true);
        canvas.addEventListener("mousemove", event => this.draw(event));
        canvas.addEventListener("mouseup", () => {
            this.isDrawing = false;
            this.lastCoords = [null, null];
        });
        document.getElementById("goma").addEventListener("click", () => this.color = "#ffffff");
        document.getElementById("lapiz").addEventListener("click", () => this.changeColor());
        document.getElementById("color").addEventListener("change", () => this.changeColor())
    }

    //Cambia el color actual de dibujo al seleccionado entre todos los colores disponibles.
    changeColor() {
        this.color = document.getElementById("color").value;
    }

    //Funcion de dibujado, cuando esta el click presionado se basa en las coordenadas actuales y las ultimas
    //registradas para generar un trazo utilizando la función stroke() y el color seleccionado.
    draw(event) {
        if (this.isDrawing) {
            const rect = canvas.getBoundingClientRect();
            this.offsetLeft = rect.left;
            this.offsetTop = rect.top;
            //ctx.fillStyle = this.color;
            //ctx.fillRect(event.clientX - this.offsetLeft, event.clientY - this.offsetTop, 10, 10);
            if (this.lastCoords[0] != null) {
                ctx.lineCap = "round";
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

//Se crea instancia de la clase Element.
const pencil = new Element();
const filter = new Filter();