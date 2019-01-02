document.addEventListener('DOMContentLoaded', function () {
    var nav = document.querySelector('.navigation');
    var navBtn = document.querySelector('.navigation-m-btn');
    window.addEventListener('scroll', function () {
        var y = window.scrollY;
        y >= 15
            ? nav.classList.add('is-scrolled')
            : nav.classList.remove('is-scrolled');
    });
    navBtn.addEventListener('click', function () {
        nav.classList.toggle('open');
    });
});
