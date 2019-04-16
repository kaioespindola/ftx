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