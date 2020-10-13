function subirHtml() {
    let cuadroGrande = document.querySelector('div.crear-cuadroGrande')
    cuadroGrande.style.display = 'none'
    let chequeo = ''
    chequeo += `    <div>
        <h4>
            Crear Guifos
        </h4>
        <img src="/assets/button3.svg" alt="x">
    </div>
   
    <video autoplay playsinline></video>
   
    <div>
    
    <button  id="camarita">
    </button>
    
    <button onload="streamVideo()" onclick="grabar2()" id="grabar" >
    <h2 class="capturar">Capturar</h2>
    </button>
    </div>
    <div>

    </div>
    `
    console.log(chequeo);
    document.getElementById('subir').innerHTML = chequeo;
    document.getElementById('subir').style.display = 'block';
    document.querySelector('#subir div h4').innerHTML = "Un Chequeo Antes de Empezar"

}
// ----------------------------------

function addCss(fileName) {

    let theme = sessionStorage.getItem("tema");
    console.log(fileName);

    if (fileName === undefined) {
        console.log('*************RECARGA**********')
        if (theme == 'oscuro') {
            document.styleSheets[1].disabled = true;
            document.styleSheets[2].disabled = false;
        } else if (theme == 'claro') {
            document.styleSheets[1].disabled = false;
            document.styleSheets[2].disabled = true;
        }
    }

    if (fileName == 1 && theme == 'oscuro') {
        sessionStorage.setItem("tema", "claro");
        document.styleSheets[1].disabled = false;
        document.styleSheets[2].disabled = true;
    } else if (fileName == 2 && theme == 'claro') {
        sessionStorage.setItem("tema", "oscuro");
        document.styleSheets[1].disabled = true;
        document.styleSheets[2].disabled = false;
    }

}
window.onload = function () {
    addCss();
}
// --------------------------------------------

var video = document.querySelector('video');
var dateStarted;
// *************STREAM VIDEO********************
function streamVideo() {
    var constraints = { audio: false, video: { height: { max: 480 } } };

    navigator.mediaDevices.getUserMedia(constraints)
        .then(function (mediaStream) {
            var video = document.querySelector('video');

            video.srcObject = mediaStream;
            video.onloadedmetadata = function (e) {
                video.play();
            };
        })
        .catch(function (err) { console.log(err.name + ": " + err.message); });
}
// *************STREAM VIDEO********************

// *************DURACION**************************

function calculateTimeDuration(secs) {
    var hr = Math.floor(secs / 3600);
    var min = Math.floor((secs - (hr * 3600)) / 60);
    var sec = Math.floor(secs - (hr * 3600) - (min * 60));

    if (min < 10) {
        min = "0" + min;
    }

    if (sec < 10) {
        sec = "0" + sec;
    }

    if (hr <= 0) {
        return min + ':' + sec;
    }

    return hr + ':' + min + ':' + sec;
}
// *************DURACION**************************


// *************OBJETO RECORDER*************

var tiempo = true;
function captureCamera(callback) {
    navigator.mediaDevices.getUserMedia({ audio: false, video: true }).then(function (camera) {
        callback(camera);
    }).catch(function (error) {
        alert('Unable to capture your camera. Please check console logs.');
        console.error(error);
    });
}
var blob;
function stopRecordingCallback() {
    var video = document.querySelector('video');
    let preview = document.createElement('img');
    preview.id = "preview";
    video.after(preview);
    preview.srcObject = null;
    video.remove();

    blob = recorder.getBlob();
    preview.src = URL.createObjectURL(blob);
    // document.querySelector("video").controls = true;
    recorder.stopRecording();
    reproductor();
    // recorder = null;
    console.log("------------" + blob.size);
}

function calculateTimeDuration(secs) {
    var hr = Math.floor(secs / 3600);
    var min = Math.floor((secs - (hr * 3600)) / 60);
    var sec = Math.floor(secs - (hr * 3600) - (min * 60));

    if (min < 10) {
        min = "0" + min;
    }

    if (sec < 10) {
        sec = "0" + sec;
    }

    if (hr <= 0) {
        return min + ':' + sec;
    }

    return hr + ':' + min + ':' + sec;
}


var recorder; // globally accessible
function grabar2() {

    let camarita = document.getElementById('camarita');
    let camaritaStop = document.createElement('button');
    let stop = document.createElement('button');
    document.getElementById('grabar').remove();
    document.querySelector('#subir div h4').innerHTML = "Capturando Tu Guifo";

    camaritaStop.id = 'camarita-stop';
    stop.id = 'stop';
    camarita.after(camaritaStop);
    camaritaStop.after(stop);
    document.getElementById("camarita").remove();
    document.querySelector('.crear-cuadroGrande div button:nth-child(2)').innerHTML = 'Listo';
    stop.addEventListener("click", function () {
        return recorder.stopRecording(stopRecordingCallback)
    });
    captureCamera(function (camera) {
        var video = document.querySelector('video');
        video.srcObject = camera;
        recorder = RecordRTC(camera, {
            type: 'gif',
            frameRate: 1,
            quality: 5,
            width: 360,
            hidden: 240,
            onGifRecordingStarted: function () {
                console.log('Gif recording started.');
            }

        });

        recorder.startRecording();
        dateStarted = new Date().getTime();
        let capt = document.querySelector('.busqueda div:nth-child(4)');
        capt.classList.add('timer');
        (function looper() {
            if (document.querySelector('video') == null) {
                return;
            }
            document.querySelector('.timer').innerHTML = '00:00:' + calculateTimeDuration((new Date().getTime() - dateStarted) / 1000);
            setTimeout(looper, 1000);
        })();

    });
}
function reproductor() {
    let cuadritos = '';
    for (let i = 0; i < 17; i++) {
        cuadritos += `<div></div> \n`;
    }
    let progressBar = `<div id="contenedor"><div id="flecha"></div><div id="cargando"></div></div>`;
    console.log('***************************************');
    console.log(progressBar);
    let camarita = document.getElementById('camarita-stop');
    let subir = document.createElement('button');
    subir.id = 'subir2';
    let repetir = document.createElement('button');
    repetir.id = 'repetir';
    repetir.innerText = 'Repetir Captura';
    subir.innerText = 'Subir Guifo';
    // document.querySelector('.timer').after(progressBar);
    document.querySelector('.timer').insertAdjacentHTML("afterend", progressBar);
    document.querySelector('#cargando').innerHTML = cuadritos;
    document.getElementById('stop').remove();
    camarita.after(repetir);
    repetir.after(subir);
    camarita.remove();
    document.querySelector('#subir div h4').innerHTML = "Vista Previa";
    subir.addEventListener('click', function () {
        return subirGif(blob);
    });
    repetir.addEventListener('click', function () {
        return location.reload(true);
    })
};
let key = "aiSyvuotTBkiW8LiDS2grIV7FM6KZv9T";

function subirHtml2() {
    ['preview', 'contenedor'].forEach(function (id) {
        document.getElementById(id).style.display = "none";
    });
    let cuadritos = '';
    for (let i = 0; i < 23; i++) {
        cuadritos += `<div></div> \n`;
    }
    let subiendo = `<div class="globo">
    <img src="/assets/globe_img.png" alt="globo terraqueo">
    <h2>Estamos subiendo tu guifo…</h2>
    <div class="progress-bar-dos">${cuadritos}</div>
    <h3>Tiempo restante: <s>38 años</s> algunos minutos</h3>
    </div><button id="cancelar">Cancelar</button>`;
    document.getElementById('subir2').remove();
    document.querySelector('#subir div h4').innerHTML = "Subiendo Guifo";

    // let controller = new AbortController();
    document.querySelector('#subir > div:nth-child(1)').insertAdjacentHTML("afterend", subiendo);
    document.getElementById('repetir').parentNode.remove();
    /*   let abortBtn = document.getElementById('cancelar');
      abortBtn.addEventListener('click', function () {
          console.log('Subida Cancelada!');
          controller.abort();
      }); */
    console.log("hecho");

}
var idArray = new Array();
async function subirGif(gif) {
    subirHtml2();
    const controller = new AbortController();
    const signal = controller.signal;
    let abortBtn = document.getElementById('cancelar');
    abortBtn.addEventListener('click', function () {
        if (controller) controller.abort();
        console.log('Subida Cancelada!');
        setTimeout(window.location.reload(true), 3000);
    });
    var formdata = new FormData();
    formdata.append("api_key", "aiSyvuotTBkiW8LiDS2grIV7FM6KZv9T");
    formdata.append("file", blob);
    formdata.append("tags", "camiloandresb266");

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
        signal: signal,
    };
    fetch("https://upload.giphy.com/v1/gifs\n", requestOptions)
        .then(response => response.json())
        .then(result => {
            let gifId = result.data.id;
            let string = JSON.stringify(gifId).replace(/\"/g, "");

            let ids = localStorage.getItem('ids') || '[]';
            //   JSON.parse(ids).concat(string)
            localStorage.setItem('ids', JSON.stringify(JSON.parse(ids).concat(string)));
            console.log(result);
            creado();
        })
        .catch(error => console.log('error', error));

}

function creado() {
    let imagen = URL.createObjectURL(blob);
    console.log(imagen);
    document.querySelector('#subir div h4').innerHTML = "Guifo Subido Con Éxito"
    let exito = `<div class="exito">
    <img src="${imagen}" alt="">
    <h2>Guifo Subido Con Éxito</h2>
    <button onclick="copiar()" id="copiar">Copiar Enlace Guifo</button>
    <button onclick="descargar()" id="descargar">Descargar Guifo</button>
    <button onclick="listo()" id="listo">Listo</button>
    </div>`;
    console.log(exito);
    document.getElementById('subir').style.width = '50vw';
    document.getElementById('subir').style.height = '391px';
    document.getElementById('subir').style.marginBottom = '180px';

    document.querySelector('.globo').style.display = "none";
    document.querySelector('.timer').style.display = "none";
    document.querySelector('.sugerencias>div:nth-child(2)').insertAdjacentHTML("afterend", exito);
    subir3();
}
// --------------------------------------
function listo() {
    document.getElementById('subir').style.display = 'initial';
    document.getElementById('subir').style.visibility = 'hidden';
}
//****************ULTIMO ESTADO************** */
function fecthcUrls(tipo, id) {
    return new Promise(async (resolve, reject) => {
        if (tipo == 1) {
            try {
                let url2 = await fetch(`https://api.giphy.com/v1/gifs/${id}?api_key=aiSyvuotTBkiW8LiDS2grIV7FM6KZv9T`);

                let response = await url2.json();

                resolve([response.data.images.original.url])
            } catch (error) {
                reject(error)
            }
        } else {
            try {
                let url2 = await fetch(`http://api.giphy.com/v1/gifs?api_key=aiSyvuotTBkiW8LiDS2grIV7FM6KZv9T&ids=${id}`);

                let response = await url2.json();

                const result = response.data.map(element => element.images.original.url)

                resolve(result)
            } catch (error) {
                reject(error)
            }
        }
    })

}

async function subir3(numero) {
    try {
        if (numero) {
            document.querySelector('header').nextElementSibling.remove();
        }

        const ids = JSON.parse(localStorage.getItem('ids'))

        const stringIds = ids.join(',');

        let urls = []

        if (ids.length > 1) {
            urls = await fecthcUrls(2, stringIds)
        } else {
            urls = await fecthcUrls(1, stringIds)
        }
        document.getElementById('cancelar').remove()
        let ultimoCuadro = `
    <div class="sugerimos">
        <h3>
            Mis guifos:
        </h3>
    </div>
    <section class="tendencias2" id="tendencias3">`;

        urls.reverse().forEach((url) => {
            ultimoCuadro += `
        <div class="gif-tendencias">
            <img src="${url}" alt="">
           
        </div>`
        })

        ultimoCuadro += `<section/>`
        // document.querySelector('header').insertAdjacentHTML("afterend", ultimoCuadro);
        if (numero) {
            document.getElementById('despliegue').insertAdjacentHTML("afterend", ultimoCuadro);
        } else {
            document.getElementById('subir').insertAdjacentHTML("afterend", ultimoCuadro);
        }
    } catch (error) {
        console.log('error', error);
    }

}




function copiar() {
    let imagenBlob = document.querySelector('.gif-tendencias img').src;
    const texto = document.createElement('textarea');
    texto.value = imagenBlob;
    document.body.appendChild(texto);
    texto.select();
    document.execCommand('copy');
    document.body.removeChild(texto);

}

function descargar() {
    console.log(blob)
    invokeSaveAsDialog(blob)
}



function playPause() {
    var image = document.getElementById("likes"),
        button = document.getElementById("pause");

    if (image.classList && image && button) {
        button.onclick = function () {
            if (this.value == 'pause') {
                image.classList.add('pause');
                this.value = 'play';
            } else {
                image.classList.remove('pause');
                this.value = 'pause';
            }
        };
    }
}
function stopRec() {
    this.disabled = true;
    recorder.stopRecording(stopRecordingCallback);
}

