// 這邊可以寫一起
var hash = window.location.hash;
window.location.hash = '';
window.addEventListener('load', function () {
    console.log(window.location.hash);
    // window.scrollTo(0, 0)
    if (hash) {
        var scrollToTarget_1 = document.querySelector(hash);
        console.log('ha', scrollToTarget_1);
        function step() {
            // 在下面，減完會是負數，在上面則反之
            var navHeight = document.querySelector('.navigation').clientHeight;
            var diff = Math.floor((window.scrollY - (scrollToTarget_1.offsetTop - navHeight)) / 10);
            var scrollTo = window.scrollY - diff; // 就會是這格要前往的位置
            window.scrollTo(0, scrollTo);
            console.log('diff', diff);
            if (getScrollTop() + getWindowHeight() === getScrollHeight()) {
                // scrollAnimation = false
                return;
            }
            else if (getScrollTop() === 0) {
                console.log('到頂！');
                // scrollAnimation = false
                return;
            }
            if (Math.abs(diff) > 0) {
                requestAnimationFrame(step);
            }
            else {
                // scrollAnimation = false
            }
        }
        requestAnimationFrame(step);
    }
});
document.addEventListener('DOMContentLoaded', function () {
    var nav = document.querySelector('.navigation');
    var navBtn = document.querySelector('.navigation-m-btn');
    var linkList = document.querySelectorAll('.scroll-link');
    var scrollAnimation = false;
    // 菜單捲動加上底色
    window.addEventListener('scroll', function () {
        var y = window.scrollY;
        y >= 15
            ? nav.classList.add('is-scrolled')
            : nav.classList.remove('is-scrolled');
    });
    // 手機版菜單按鈕
    navBtn.addEventListener('click', function () {
        nav.classList.toggle('open');
    });
    // 綁定連結捲動事件
    var navHeight = document.querySelector('.navigation').clientHeight;
    linkList.forEach(function (item) {
        item.addEventListener('click', function (ev) {
            ev.preventDefault();
            // 關閉手機版菜單
            nav.classList.remove('open');
            var linkTarget = ev.target;
            if (linkTarget.hash) {
                if (scrollAnimation)
                    return; // 避免重複觸發
                var scrollToTarget_2 = document.querySelector(linkTarget.hash);
                scrollAnimation = true;
                function step() {
                    // 在下面，減完會是負數，在上面則反之
                    var diff = Math.floor((window.scrollY - (scrollToTarget_2.offsetTop - navHeight)) / 10);
                    var scrollTo = window.scrollY - diff; // 就會是這格要前往的位置
                    window.scrollTo(0, scrollTo);
                    console.log('diff', diff);
                    if (getScrollTop() + getWindowHeight() === getScrollHeight()) {
                        scrollAnimation = false;
                        return;
                    }
                    else if (getScrollTop() === 0) {
                        console.log('到頂！');
                        scrollAnimation = false;
                        return;
                    }
                    if (Math.abs(diff) > 0) {
                        requestAnimationFrame(step);
                    }
                    else {
                        scrollAnimation = false;
                    }
                }
                requestAnimationFrame(step);
            }
        });
    });
});
function getScrollTop() {
    var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
    if (document.body) {
        bodyScrollTop = document.body.scrollTop;
    }
    if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    return scrollTop;
}
function getScrollHeight() {
    var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
    var bSH;
    var dSH;
    if (document.body) {
        bSH = document.body.scrollHeight;
    }
    if (document.documentElement) {
        dSH = document.documentElement.scrollHeight;
    }
    scrollHeight = (bSH - dSH > 0) ? bSH : dSH;
    return scrollHeight;
}
function getWindowHeight() {
    var windowHeight = 0;
    if (document.compatMode == "CSS1Compat") {
        windowHeight = document.documentElement.clientHeight;
    }
    else {
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
}
