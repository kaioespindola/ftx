let i = 0;

function abrirMenu() {
    let menu = document.getElementById("menu");

    if(i == 0) {
        menu.classList = "menuss";
        i = 1;
    }
    else {
        menu.classList = "menussHidden";
        i = 0;
    }
    
}

let navegacao = document.getElementById("navegacao");

var sticky = menu.offsetTop;

window.onscroll = function() {

    if (window.pageYOffset > sticky) {

        navegacao.style.opacity = "0.5";

    } else {

        navegacao.style.opacity = "1";

    }

};


new Swiper ('.swiper-container', {

    slidesPerView: 5,
    spaceBetween: 40,
    direction: 'horizontal',
    loop: false,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    breakpoints: {

        1024: {
            slidesPerView: 4,
            spaceBetween: 30
        },

        780: {
            slidesPerView: 3,
            spaceBetween: 30
        },

        640: {
            slidesPerView: 2,
            spaceBetween: 15
        },

        320: {
            slidesPerView: 1,
            spaceBetween: 15
        }
    }
  
});

let ROOT_URL = 'https://cors-anywhere.herokuapp.com/http://agium.com.br:8050/agium-imoveis/rest/anuncio/buscarAnuncios';

let data = {
    "fields": [
        "titulo","descricao","finalidade","valor","bairro","cidade","quarto","banheiro","vaga_garagem","suite","areatotal"
    ],
    "filter":{
        "cidade":[3662],
        "finalidade":"venda",
        "tipo": ["APARTAMENTO", "CASA_SOBRADO", "Comercial"]
    },
    "paginacao":{
        "pagina": 1,
        "quantidade": 25
    },
    "order":{
        "bairro": "ASC",
        "cidade": "DESC",
        "titulo": "ASC",
        "valor": "DESC",
        "banheiro": "ASC",
        "quarto": "DESC",
        "suite": "ASC",
        "vagaGaragem": "DESC"
    }
};

function getImoveis(url, data, limit) {
        fetch(url, {
            credentials: 'same-origin',
            method: 'POST',
            mode: "cors",
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-type': 'application/json; charset=UTF-8',
                'codigoFilial': 'FphHIee9+YVqZAiK6EwwWQ=='
            })
        })
        .then(response => response.json())
        .then(res => {
            let listaImoveis = document.querySelector(".imoveis-lista");
            listaImoveis.innerHTML = '';
            injectImoveis(res.listaImoveis, limit);
        });
}

function injectImoveis(imoveis, limit) {

    let listaImoveis = document.querySelector(".imoveis-lista");

    imoveis.slice(0, limit).forEach(imovel => {
        console.log(imovel);
        listaImoveis.innerHTML += `
            <a target="_blank" href="https://imoveis.ftxativos.com.br/">
                <div class="imovel" style="background-image:url('${imovel.imagens[1].arquivo}')">
                    <div class="ctd">
                        <div class="dados">
                            <h1>${imovel.titulo}</h1>
                            <p>${imovel.bairro}</p>
                            <h3>${imovel.cidade}/MS</h3>
                            <p>CLIQUE E SAIBA MAIS</p>
                        </div>
                    </div>
                </div>
            </a>
        `;

    })
}

getImoveis(ROOT_URL, data, 6);

function string_to_slug (str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();
  
    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to   = "aaaaeeeeiiiioooouuuunc------";
    for (var i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

    return str;
}