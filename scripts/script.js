// Cambiar Hoja de estilo

function addCss(fileName) {

    let theme = sessionStorage.getItem("tema");
    console.log(fileName);
    if (fileName === undefined) {
        if (theme === null) {
            sessionStorage.setItem("tema", "oscuro");
        }
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
function navegar() {
    location.href = '/upload.html';
}
// Ocultar barra de busqueda de sugerencias
document.getElementById('site-search').addEventListener('input', async function (e) {
    let cajita = document.getElementById('resultado');
    let sug = document.getElementById('site-search')
    if (e.target.value !== '' && e.target.value.length > 2) {
        cajita.style.display = "block";
        let texto = sug.value;
        console.log(sug.value)
        busquedaRelacionada(texto, 3);
        console.log(texto);
        document.querySelector('div.busqueda>button').classList.add('typing')
        //   console.log('show button');
    }
    else {
        console.log(e.target.value)
        cajita.style.display = "none";

        document.querySelector('div.busqueda>button').classList.remove('typing')


        //   console.log('hide button');
    }
});

function temas() {
    var tema = document.getElementById("despliegue").style.display
    if (tema == "block") {
        document.getElementById("despliegue").style.display = "none";
    } else {
        document.getElementById("despliegue").style.display = "block"
    }
}
let api_key = 'api_key=aiSyvuotTBkiW8LiDS2grIV7FM6KZv9T';
async function searchGif(termino, limit) {
    let urlbusqueda = [];
    return new Promise(async (resolve, reject) => {
        try {
            let busqueda = await fetch(`https://api.giphy.com/v1/gifs/search?${api_key}&q=${termino}&limit=${limit}&lang=es&rating=pg`)
            let jsonb = await busqueda.json();
            for (let i = 0; i < limit; i++) {
                urlbusqueda.push(jsonb.data[i]);
            };
            console.log(urlbusqueda)

            resolve([urlbusqueda]);
        } catch (error) {
            reject(error)
        }
    })
}

async function cuadrosBusqueda(numero) {
    try {
        desaparecer(1);
        let cuadritosBusqueda;
        let termino;
        let cajita = document.getElementById('resultado');
        cajita.style.display = "none";
        if (numero === 0) {
            termino = document.getElementById('site-search').value;
            cuadritosBusqueda = await searchGif(termino, 12);

        } else {
            termino = document.querySelector(`div#resultado div:nth-child(${numero})`).textContent
            cuadritosBusqueda = await searchGif(termino, 12);
            console.log(cuadritosBusqueda);
        }
        termino = termino.charAt(0).toUpperCase() + termino.slice(1);
        let h3 = `${termino} (Resultado)`;
        // console.log(cuadritosBusqueda[0][0]);
        let ultimoCuadro = `
        <div class="sugerimos">
            <h3>
                ${h3}:
            </h3>
        </div>
        <section class="tendencias2" id="tendencias3">`;

        cuadritosBusqueda[0].reverse().forEach((url) => {
            ultimoCuadro += `
            <div class="gif-tendencias">
                <img src="${url.images.original.url}" alt="">

            </div>`
        })
        let tags = cuadritosBusqueda[0][0].title;
        ultimoCuadro += `<section/>`
        let ejemplos = `<section class="ejemplos">
        <div>
          
        </div>
        <div>
          
        </div>
        <div>
          #${tags}
        </div>
      </section>`
        busquedaRelacionada(termino, 2);
        document.querySelector('#resultado').insertAdjacentHTML("afterend", ultimoCuadro);
        document.querySelector('#resultado').insertAdjacentHTML("afterend", ejemplos);
        //     if (numero) {
        //         document.getElementById('despliegue').insertAdjacentHTML("afterend", ultimoCuadro);
        //     } else {
        //         document.getElementById('subir').insertAdjacentHTML("afterend", ultimoCuadro);
        //     }
    } catch (error) {
        console.log('error', error);
    }
}
// *****************Hoy te sugerimos******************
// let key = "aiSyvuotTBkiW8LiDS2grIV7FM6KZv9T&q";
// let limit = 4;
let tendencias = "https://api.giphy.com/v1/gifs/trending";
let busqueda = "";

async function sugerimos() {
    return new Promise(async (resolve, reject) => {
        try {

            let apikey = "aiSyvuotTBkiW8LiDS2grIV7FM6KZv9T";
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            let hoy = await fetch(`https://api.giphy.com/v1/trending/searches?api_key=${apikey}`, requestOptions);
            let res = await hoy.json();
            let url = [];
            let data2 = [];
            let rand = Math.floor(res.data.length * Math.random());
            console.log(rand);
            let limiteSup = 0;
            if (rand >= 4) {
                limiteSup = rand;
            } else {
                limiteSup = rand + 4;
            }
            let limiteInf = limiteSup - 4;
            console.log(limiteSup);
            console.log(res.data);
            // console.log(typeof data.data[0]);
            let prueba = await searchGif(res.data[0], 1);
            console.log(prueba[0][0].images.original.url)
            // let tester1 = await searchGif(prueba, 1)
            console.log(prueba);
            for (let i = limiteInf; i < limiteSup; i++) {
                let prueba = await searchGif(res.data[i], 1);
                url.push(prueba[0][0].images.original.url);
                data2.push(prueba[0][0].title);
            }
            /* console.log(url[2] + 'URLS++++++++++');
            console.log(url[3]) */
            let output = '';
            let count = 0;
            data2.forEach((gif) => {
                let titulo = gif.toLowerCase();
                // console.log(titulo)
                console.log(titulo.indexOf('by') + ' ' + titulo.indexOf('gif'));
                let remove = 0;
                if (titulo.indexOf('by') > titulo.indexOf('gif') || titulo.indexOf('by') < 0) {
                    remove = titulo.indexOf('gif') - 1
                    // console.log(remove + 'vv' + typeof remove)
                } else if (titulo.indexOf('by') > 3) {
                    remove = titulo.indexOf('by') - 1
                    console.log(remove)
                }
                let tags = titulo.substring(0, remove);
                let hashtags = tags.replace(/ /g, " #")
                // hashtags = `#${hashtags}`
                // console.log(hashtags)
                output +=
                    `<div class="busqueda sugerencias tendencias">
        <div>
            <h4>
            #${hashtags}
            </h4>
            <img src="/assets/button3.svg" alt="x">

        </div>
        <img src=" ${url[count]}" alt="guifo sugerencia" class="giphy">
        <button class="ver-mas">
            <h4>Ver mas</h4>
        </button>
    </div>`
                count++
                // console.log(url[count - 1])
            });
            // console.log(output)
            document.getElementById('hoy').innerHTML = output;
            resolve(output);

        } catch (error) {
            reject(error)
        }
    })
}



function tendencias2() {
    let key = 'aiSyvuotTBkiW8LiDS2grIV7FM6KZv9T'
    let limit = 5;
    const found = fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${key}&limit=${limit}`)
        .then((response) => { return response.json() })
        .then((data) => {

            // ***********Sugerimos*********

            // *************Tendencias***********
            let output2 = ''
            data.data.forEach((gif) => {
                let titulo = gif.title.toLowerCase();
                console.log(titulo)
                console.log(titulo.indexOf('by') + ' ' + titulo.indexOf('gif'));
                let remove = 0
                if (titulo.indexOf('by') > titulo.indexOf('gif') || titulo.indexOf('by') < 0) {
                    remove = titulo.indexOf('gif') - 1
                    // console.log(remove + 'vv' + typeof remove)
                } else {
                    remove = titulo.indexOf('by') - 1
                    console.log(remove)
                }
                // remove += 0
                console.log(remove)
                let tags = titulo.substring(0, remove);
                let hashtags = tags.replace(/ /g, " #")
                hashtags = `#${hashtags}`
                output2 +=
                    `<div class="gif-tendencias">
            <img src="${gif.images.original.url}" alt="">
            <div>
                <h3>${hashtags}</h3>
            </div>
        </div>`
            })
            document.getElementById("tendencias3").innerHTML = output2;
            // *************Tendencias***********

            // document.getElementById("resultado").innerHTML=data[0].embed_url
            return data
        }).catch((error) => { return error })
    console.log(found)

    return found
}
window.onload = function () {
    tendencias2();
    sugerimos();
    addCss();
}

// window.onload = tendencias2, sugerimos;
// *****************Hoy te sugerimos******************

// *****************HASHTAG**********

function busquedaRelacionada(nombre, limite) {
    let i = 1;
    let key = "aiSyvuotTBkiW8LiDS2grIV7FM6KZv9T&q";
    // let limite = 3;
    console.log(nombre);
    console.log(limite);
    const found = fetch(`https://api.giphy.com/v1/tags/related/{${nombre}}?api_key=${key}&limit=3&rating=pg&lang=es`)
        .then((response) => { return response.json() })
        .then((data) => {
            data.data.forEach((tag) => {
                console.log(document.querySelector(`#resultado div:nth-child(n)`));
                document.querySelector(`#resultado div:nth-child(${i})`).innerHTML = tag.name.charAt(0).toUpperCase() + tag.name.slice(1);
                i++

            })
            console.log()
            if (limite == 2) {
                let tagLargo = data.data[1].name;
                let tagCorto = data.data[0].name;
                let aux;
                if (tagLargo.length < tagCorto.length) {
                    aux = tagCorto;
                    tagCorto = tagLargo;
                    tagLargo = aux;
                }
                console.log(tagCorto + 'asdfasdfasdfasdfasdf')
                document.querySelector('.ejemplos>div:nth-child(2)').innerHTML = '#' + tagLargo;
                document.querySelector('.ejemplos>div:nth-child(1)').innerHTML = '#' + tagCorto;
            }

            console.log(data)
            return data
        }).catch((error) => { return error })
    console.log(found)

    return found
}

async function subir3(numero) {
    try {
        if (!numero) {
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
        // document.getElementById('cancelar').remove()
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

function desaparecer(selector) {
    if (typeof selector == 'string') {
        var elem = document.querySelector('header');
    } else {
        var elem = document.querySelector('#resultado');
    }
    // var elem = document.querySelector('header');
    var sibling = elem.nextElementSibling;
    while (sibling) {
        sibling.remove();
        sibling = elem.nextElementSibling;
    }
    if (typeof selector == 'string') {
        subir3(1);
    }
};

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