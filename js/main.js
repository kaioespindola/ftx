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
        "tipo": ["APARTAMENTO"]
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

function getImoveis(url, data) {
    fetch(url, {
        credentials: 'same-origin',
        method: 'POST',
        mode: "cors",
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-type': 'application/json',
            'codigoFilial': 'FphHIee9+YVqZAiK6EwwWQ=='
        })
    })
    .then(response => response.json())
    .then(res => console.log(res))
}

getImoveis(ROOT_URL, data);