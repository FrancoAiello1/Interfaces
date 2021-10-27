document.onkeydown = function (event) {
    if (!event.repeat) {
        document.getElementById("gb").classList.add("gbjump");
        let agarro = false;
        setTimeout(() => {
            document.getElementById("gb").classList.remove("gbjump");
        }, 1000);
        console.log("a");
        let distance = document.getElementById("moneda").getBoundingClientRect().x - document.getElementById("gb").getBoundingClientRect().x;
        if (distance <= 321 && distance > 0) {
            setTimeout(() => {
                document.getElementById("moneda").classList.remove("move-coin");
                document.getElementById("div-moneda").classList.remove("div-moneda");
            }, distance)
            document.getElementById("puntos").innerHTML = parseInt(document.getElementById("puntos").innerHTML) + 1;
            agarro = true;
            if (document.getElementById("puntos").innerHTML == 5){
                ganador();
            }
            setTimeout(() => {
                document.getElementById("moneda").classList.add("move-coin");
                document.getElementById("div-moneda").classList.add("div-moneda");
            }, Math.floor(Math.random() * 10000) + distance);
        }

    }
}

function ganador(){
    
}


