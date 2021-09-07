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
 clear.addEventListener('click', function(e){
     ctx.clearRect(0,0, width, height);
 })

//Se le asigna el evento al botón correspondiente a descargar lienzo y se procede a la descarga del mismo
//utilizando la funcion toDataURL(), descargando con el nombre especificado "lienzo.png"
download.addEventListener('click',
function(e){
    const link = document.createElement('a');
    link.download = "lienzo.png";
    link.href = canvas.toDataURL();
    link.click();
    link.delete;
});

//Se le asigna el evento al botón correspondiente al filtro negativo y luego se aplica el filtro.
//Se toma el canvas y a cada pixel se le modifica el valor RGB a el valor opuesto, restándole a 255 el valor
//actual.
negativo.addEventListener('click',
function(e){
    let pixelesImagen = ctx.getImageData(0,0,width,height);
    for (let i=0; i < pixelesImagen.data.length; i+=4){
        pixelesImagen.data[i] = 255 - pixelesImagen.data[i];
        pixelesImagen.data[i+1] = 255 - pixelesImagen.data[i+1];
        pixelesImagen.data[i+2] = 255 - pixelesImagen.data[i+2];
        pixelesImagen.data[i+3] = 255;
    }
    ctx.putImageData(pixelesImagen,0,0)
})

//Se le asigna el evento al botón correspondiente al filtro de grises y luego se aplica el filtro.
//Se toma el canvas y a cada pixel se le modifica el valor RGB, obteniendo un promedio de ese valor
//por cada pixel y haciéndolo el nuevo valor.
blancoynegro.addEventListener('click',
function(e){
    let pixelesImagen = ctx.getImageData(0,0,width,height);
    for (let y = 0; y < height; y++){
        for (let x = 0; x < width; x++){
            let index = (x + y * width) * 4;
            let r = pixelesImagen.data[index];
            let g = pixelesImagen.data[index + 1];
            let b = pixelesImagen.data[index + 2];
    
            pixelesImagen.data[index] = (r + g + b) /3;
            pixelesImagen.data[index+1] = (r + g + b) /3;
            pixelesImagen.data[index+2] = (r + g + b) /3;
        }
    }
    ctx.putImageData(pixelesImagen, 0, 0, 0, 0, width, height);
})

//Se crea el constructor de la clase Element, que utilizaremos como lápiz.
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
        document.getElementById("goma").addEventListener("click", () => this.color = this.colors.blanco);
        document.getElementById("lapiz").addEventListener("click", () => this.changeColor());
        document.getElementById("color").addEventListener("change", () => this.changeColor())
    }

    //Cambia el color actual de dibujo al seleccionado entre todos los colores disponibles.
    changeColor() {
        console.log(this.colors);
        let selectedColor = document.getElementById("color").value;
        this.color = this.colors[selectedColor];
    }

    //Funcion de dibujado, cuando esta el click presionado se basa en las coordenadas actuales y las ultimas
    //registradas para generar un trazo utilizando la función stroke() y el color seleccionado.
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

//Se crea instancia de la clase Element.
const pencil = new Element();