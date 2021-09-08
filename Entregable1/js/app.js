let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let imageLoader = document.getElementById('imageLoader');
let download = document.getElementById('download');
let clear = document.getElementById('clear');
let blancoynegro = document.getElementById('blancoynegro');
let negativo = document.getElementById('negativo');
let binarizacion = document.getElementById('binarizacion');
let sepia = document.getElementById('sepia');

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
        //Se le asigna el evento 'click' al botón correspondiente a cada filtro que acciona su respectiva funcion.
        blancoynegro.addEventListener('click', () => this.blancoYNegro());
        negativo.addEventListener("click", () => this.negativo());
        binarizacion.addEventListener("click", () => this.binarizacion());
        sepia.addEventListener("click", () => this.sepia());
    }

    blancoYNegro() {
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

    binarizacion() {
        //Se toma el canvas y a cada pixel dependiendo de la suma de los valores RGB, se le asigna el color blanco
        //o negro, cuando el color se acerca mas al negro que al blanco se le asigna a cada pixel el valor 0
        //y cuando el color se acerca mas al blanco que al negro se le asigna a cada pixel el valor 255;
        let imageData = ctx.getImageData(0, 0, width, height);
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let index = (x + y * width) * 4;
                let valor = 255;
                if ((imageData.data[index] + imageData.data[index + 1] + imageData.data[index + 2]) / 3 < 255 / 3)
                    valor = 0;

                this.setPixel(imageData, x, y, valor, valor, valor, 255);
            }
        }
        ctx.putImageData(imageData, 0, 0)
    }

    sepia() {
        //Se toma el canvas y a cada pixel se le modifica el valor RGB con el algoritmo de filtro sepia, luego se
        //asigna ese nuevo valor a cada color del pixel.
        console.log('click');
        let imageData = ctx.getImageData(0, 0, width, height);
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let index = (x + y * width) * 4;
                let r = imageData.data[index];
                let g = imageData.data[index + 1];
                let b = imageData.data[index + 2];
                let a = imageData.data[index + 3];

                let newRed = (0.393 * r + 0.769 * g + 0.189 * b);
                let newGreen = (0.349 * r + 0.686 * g + 0.168 * b);
                let newBlue = (0.272 * r + 0.534 * g + 0.131 * b);

                if (newRed > 255) {
                    r = 255;
                } else {
                    r = newRed;
                }
                if (newGreen > 255) {
                    g = 255;
                } else {
                    g = newGreen;
                }
                if (newBlue > 255) {
                    b = 255;
                } else {
                    b = newBlue;
                }
                this.setPixel(imageData, x, y, r, g, b, a);
            }
        }
        ctx.putImageData(imageData, 0, 0, 0, 0, width, height);

    }

    setPixel(imageData, x, y, r, g, b, a) {
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

    //Cambia el color actual de dibujo al seleccionado.
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

//Se crea instancia de la clase Element y Filter.
const pencil = new Element();
const filter = new Filter();