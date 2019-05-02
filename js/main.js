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
        var titulo = utf8Encode(imovel.titulo);
        listaImoveis.innerHTML += `
            <a href="#">
                <div class="imovel" style="background-image:url('${imovel.imagens[1].arquivo}')">
                    <div class="ctd">
                        <div class="dados">
                            <h1>${utf8Decode(imovel.titulo)}</h1>
                            <h3>${imovel.cidade}</h3>
                            <p>CLIQUE E SAIBA MAIS</p>
                        </div>
                    </div>
                </div>
            </a>
        `;

    })
}

getImoveis(ROOT_URL, data, 3);



function utf8Encode(unicodeString) {
    if (typeof unicodeString != 'string') throw new TypeError('parameter ‘unicodeString’ is not a string');
    const utf8String = unicodeString.replace(
        /[\u0080-\u07ff]/g,  // U+0080 - U+07FF => 2 bytes 110yyyyy, 10zzzzzz
        function(c) {
            var cc = c.charCodeAt(0);
            return String.fromCharCode(0xc0 | cc>>6, 0x80 | cc&0x3f); }
    ).replace(
        /[\u0800-\uffff]/g,  // U+0800 - U+FFFF => 3 bytes 1110xxxx, 10yyyyyy, 10zzzzzz
        function(c) {
            var cc = c.charCodeAt(0);
            return String.fromCharCode(0xe0 | cc>>12, 0x80 | cc>>6&0x3F, 0x80 | cc&0x3f); }
    );
    return utf8String;
}


function utf8Decode(utf8String) {
    if (typeof utf8String != 'string') throw new TypeError('parameter ‘utf8String’ is not a string');
    // note: decode 3-byte chars first as decoded 2-byte strings could appear to be 3-byte char!
    const unicodeString = utf8String.replace(
        /[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,  // 3-byte chars
        function(c) {  // (note parentheses for precedence)
            var cc = ((c.charCodeAt(0)&0x0f)<<12) | ((c.charCodeAt(1)&0x3f)<<6) | ( c.charCodeAt(2)&0x3f);
            return String.fromCharCode(cc); }
    ).replace(
        /[\u00c0-\u00df][\u0080-\u00bf]/g,                 // 2-byte chars
        function(c) {  // (note parentheses for precedence)
            var cc = (c.charCodeAt(0)&0x1f)<<6 | c.charCodeAt(1)&0x3f;
            return String.fromCharCode(cc); }
    );
    return unicodeString;
}