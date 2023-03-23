const preloader = document.querySelector('.preloader');
//
// ---------------- burger menu
//
const body = document.querySelector('body');
const burgerMenu = document.querySelector('.burger__menu');
const nav = document.querySelector('.nav');
const menuLinks = document.querySelectorAll('.header__menu-link');
const logo = document.querySelector('.header__logo');
const headerTopBtn = document.querySelector('.header__top-btn');
const links = [...menuLinks, logo, headerTopBtn];

burgerMenu.classList.add('toggled');
burgerMenu.addEventListener('click', (e) => {
    burgerMenu.classList.toggle('active');
    burgerMenu.classList.toggle('toggled');
    body.classList.toggle('fixed');
    nav.classList.toggle('active');
});

links.forEach((item) => {
    item.addEventListener('click', () => {
        burgerMenu.classList.remove('active');
        burgerMenu.classList.add('toggled');
        body.classList.remove('fixed');
        nav.classList.remove('active');
    });
});
//
// ---------------- THE END
//

window.onload = () => {
    preloader.classList.add('close');
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 1500);
    //
    // ---------------- animaition svg button
    //
    const paths = document.querySelectorAll('.svg-btn path');
    // let countSvg = 0.5;
    let countSvg = 1.5;
    paths.forEach((item) => {
        const len = Math.ceil(item.getTotalLength());
        item.style.strokeDasharray = `${len}px`;
        item.style.strokeDashoffset = `${len}px`;

        item.style.animation = `anim-line 1.5s ease forwards`;
        item.style.animationDelay = `${countSvg}s`;
        countSvg += 0.05;
    });
    //
    // -------------------- parallax
    //
    const parallax = document.querySelector('.parallax__body');

    if (parallax) {
        const clouds = document.querySelector('.images-parallax__clouds');
        const water = document.querySelector('.images-parallax__water');
        const mountains1 = document.querySelector('.images-parallax__mountains-1');
        const mountains2 = document.querySelector('.images-parallax__mountains-2');

        // Коэффициенты
        const forClouds = 40;
        const forWater = 30;
        const forMountains1 = 20;
        const forMountains2 = 15;

        // Скорость анимации
        const speed = 0.05;

        // Объявление переменных
        let positionX = 0,
            positionY = 0;
        let coordXprocent = 0,
            coordYprocent = 0;

        function setMouseParallaxStyle() {
            const distX = coordXprocent - positionX;
            const distY = coordYprocent - positionY;

            positionX = positionX + distX * speed;
            positionY = positionY + distY * speed;

            // Передать стили внутрь объекта
            clouds.style.cssText = `transform: translate(${positionX / forClouds}%, ${positionY / forClouds}%)`;
            water.style.cssText = `transform: translate(${positionX / forWater}%, ${positionY / forWater}%)`;
            mountains1.style.cssText = `transform: translate(${positionX / forMountains1}%, ${positionY / forMountains1}%)`;
            mountains2.style.cssText = `transform: translate(${positionX / forMountains2}%, ${positionY / forMountains2}%)`;

            requestAnimationFrame(setMouseParallaxStyle);
        }
        setMouseParallaxStyle();

        parallax.addEventListener('mousemove', (e) => {
            // Получение ширины и высоты блока
            const parallaxWidth = parallax.offsetWidth;
            const parallaxHeight = parallax.offsetHeight;

            // Ноль по середине
            const coordX = e.pageX - parallaxWidth / 2;
            const coordY = e.pageY - parallaxHeight / 2;

            // Получаем проценты
            coordXprocent = -(coordX / parallaxWidth) * 100;
            coordYprocent = -(coordY / parallaxHeight) * 100;
        });
    }
};
