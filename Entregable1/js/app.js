let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let imageLoader = document.getElementById('imageLoader');

let width = canvas.width;
let height = canvas.height;

imageLoader.addEventListener('change', cargarImagen, false);


function cargarImagen(e){
    let reader = new FileReader();
    reader.onload = function(event){
        let img = new Image();
        img.onload = function(){
            ctx.drawImage(img,0,0);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);     
}
