document.addEventListener("DOMContentLoaded", () => {
    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");

    let width = canvas.width;
    let height = canvas.height;

    document.getElementById('imageLoader').addEventListener('change', cargarImagen);
    document.getElementById("restaurar").addEventListener("click", cargarImagen);

    //Se inicia una instancia de FileReader y al cargar una imagen este la dibuja en el lienzo, respetando
    //el tamaño del mismo y no rompiendo el aspecto.
    //Además está asociado al boton de restaurar imagen.
    function cargarImagen() {
        let reader = new FileReader();
        reader.onload = function (event) {
            let img = new Image();
            img.onload = function () {
                if (img.width > window.screen.width || img.height > window.screen.height) {
                    alert("No se acepta el tamaño de la imagen.");
                    return;
                }
                else {
                    canvas.width = img.width;
                    canvas.height = img.height;
                }
                width = canvas.width;
                height = canvas.height;
                ctx.drawImage(img, 0, 0);
            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(document.getElementById("imageLoader").files[0]);
    }
    document.getElementById('clear').addEventListener('click', function (e) {
        ctx.clearRect(0, 0, width, height);
    })

    //Se le asigna el evento al botón correspondiente a descargar lienzo y se procede a la descarga del mismo
    //utilizando la funcion toDataURL(), descargando con el nombre especificado "lienzo.png"
    document.getElementById('download').addEventListener('click',
        function (e) {
            const link = document.createElement('a');
            link.download = "lienzo.png";
            link.href = canvas.toDataURL();
            link.click();
            link.delete;
        });

    class Filter {
        constructor() {
            this.ultimoBrillo = parseInt(document.getElementById("brillo").value);
            this.assignEvents();
        }

        assignEvents() {
            //Se le asigna el evento 'click' al botón correspondiente a cada filtro que acciona su respectiva funcion.
            document.getElementById('blancoynegro').addEventListener('click', () => this.blancoYNegro());
            document.getElementById('negativo').addEventListener("click", () => this.negativo());
            document.getElementById('binarizacion').addEventListener("click", () => this.binarizacion());
            document.getElementById('sepia').addEventListener("click", () => this.sepia());
            document.getElementById('brillo').addEventListener("change", () => this.brillo());
            document.getElementById("saturacion").addEventListener("click", () => this.saturacion());
            document.getElementById("blur").addEventListener("click", () => this.blur());
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

        brillo() {
            //Se toma el canvas y a cada pixel se incrementa en lo que el usuario desee el valor RGB
            //en la misma cantidad, llevandolos a valores más altos
            //Se controló que la imagen se pueda volver a su estado original y que cada vez que se toca el brillo
            //No se aplique en los mismos valores, por lo tanto no llegariamos a una imagen negra o una blanca
            let imageData = ctx.getImageData(0, 0, width, height);
            let brillo = parseInt(document.getElementById('brillo').value);
            let brilloActual = this.ultimoBrillo;
            this.ultimoBrillo = brillo;
            if (brillo < brilloActual)
                brillo = (brilloActual - brillo) * -1;
            else
                brillo = brillo - brilloActual;
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    let index = (x + y * width) * 4;
                    let r = imageData.data[index] + brillo;
                    let g = imageData.data[index + 1] + brillo;
                    let b = imageData.data[index + 2] + brillo;
                    this.setPixel(imageData, x, y, r, g, b, 255);
                }
            }
            ctx.putImageData(imageData, 0, 0);
        }

        saturacion() {
            //Se toma el canvas y a cada pixel se le modifica el valor RGB, buscando el color predominante en cada
            //pixel y aumentándolo en mayor medida que los otros con la diferencia entre el predominante y
            // el valor mas bajo (delta).
            let imageData = ctx.getImageData(0, 0, width, height);
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    let index = (x + y * width) * 4;
                    let r = imageData.data[index];
                    let g = imageData.data[index + 1];
                    let b = imageData.data[index + 2];

                    let maxColor = Math.max(r, g, b);
                    let minColor = Math.min(r, g, b);
                    let delta = maxColor - minColor;

                    if (r == maxColor)
                        r += delta;
                    else if (g == maxColor)
                        g += delta;
                    else if (b == maxColor)
                        b += delta;
                    if (r == minColor)
                        r -= delta;
                    else if (g == minColor)
                        g -= delta;
                    else if (b == minColor)
                        b -= delta;

                    this.setPixel(imageData, x, y, r, g, b, 255);
                }
            }
            ctx.putImageData(imageData, 0, 0, 0, 0, width, height);
        }

        blur() {
            //Por cada pixel metemos los valores R, G y B en un arreglo y los filtramos de ser null,
            //luego hacemos la suma de esos valores y la dividimos por el largo del arreglo,
            //obteniendo así el promedio de los valores de el color de cada pixel.
            let imageData = ctx.getImageData(0, 0, width, height);
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {

                    let reds = [this.getRed(imageData, x - 1, y + 1), this.getRed(imageData, x - 1, y + 1), this.getRed(imageData, x, y + 1), this.getRed(imageData, x + 1, y + 1), this.getRed(imageData, x - 1, y), this.getRed(imageData, x, y), this.getRed(imageData, x + 1, y), this.getRed(imageData, x - 1, y - 1), this.getRed(imageData, x, y - 1), this.getRed(imageData, x + 1, y - 1)].filter(red => red != null);
                    let greens = [this.getGreen(imageData, x - 1, y + 1), this.getGreen(imageData, x - 1, y + 1), this.getGreen(imageData, x, y + 1), this.getGreen(imageData, x + 1, y + 1), this.getGreen(imageData, x - 1, y), this.getGreen(imageData, x, y), this.getGreen(imageData, x + 1, y), this.getGreen(imageData, x - 1, y - 1), this.getGreen(imageData, x, y - 1), this.getGreen(imageData, x + 1, y - 1)].filter(green => green != null)
                    let blues = [this.getBlue(imageData, x - 1, y + 1), this.getBlue(imageData, x - 1, y + 1), this.getBlue(imageData, x, y + 1), this.getBlue(imageData, x + 1, y + 1), this.getBlue(imageData, x - 1, y), this.getBlue(imageData, x, y), this.getBlue(imageData, x + 1, y), this.getBlue(imageData, x - 1, y - 1), this.getBlue(imageData, x, y - 1), this.getBlue(imageData, x + 1, y - 1)].filter(blue => blue != null)
                    let r = reds.reduce((sum, red) => sum += red) / reds.length;
                    let g = greens.reduce((sum, green) => sum += green) / greens.length;
                    let b = blues.reduce((sum, blue) => sum += blue) / blues.length;

                    this.setPixel(imageData, x, y, r, g, b, 255);
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

        getRed(imageData, x, y) {
            let index = (x + y * width) * 4;
            return imageData.data[index]
        }

        getGreen(imageData, x, y) {
            let index = (x + y * width) * 4;
            return imageData.data[index + 1];
        }

        getBlue(imageData, x, y) {
            let index = (x + y * width) * 4;
            return imageData.data[index + 2];
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
        //registradas para generar un trazo utilizando la función stroke() y el color y grosor seleccionado.
        draw(event) {
            if (this.isDrawing) {
                const rect = canvas.getBoundingClientRect();
                this.offsetLeft = rect.left;
                this.offsetTop = rect.top;
                //ctx.fillStyle = this.color;
                //ctx.fillRect(event.clientX - this.offsetLeft, event.clientY - this.offsetTop, 10, 10);
                if (this.lastCoords[0] != null) {
                    let grosor = parseInt(document.getElementById('grosor').value);
                    ctx.lineCap = "round";
                    ctx.beginPath();
                    ctx.lineWidth = grosor;
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
});