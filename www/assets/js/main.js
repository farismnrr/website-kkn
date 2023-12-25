/**
 * Template Name: PhotoFolio
 * Updated: Sep 18 2023 with Bootstrap v5.3.2
 * Template URL: https://bootstrapmade.com/photofolio-bootstrap-photography-website-template/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    /**
     * Preloader
     */
    const preloader = document.querySelector('#preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('loaded');
            }, 1000);
            setTimeout(() => {
                preloader.remove();
            }, 2000);
        });
    }

    /**
     * Mobile nav toggle
     */
    const mobileNavShow = document.querySelector('.mobile-nav-show');
    const mobileNavHide = document.querySelector('.mobile-nav-hide');

    document.querySelectorAll('.mobile-nav-toggle').forEach((el) => {
        el.addEventListener('click', function (event) {
            event.preventDefault();
            mobileNavToogle();
        });
    });

    function mobileNavToogle() {
        document.querySelector('body').classList.toggle('mobile-nav-active');
        mobileNavShow.classList.toggle('d-none');
        mobileNavHide.classList.toggle('d-none');
    }

    /**
     * Hide mobile nav on same-page/hash links
     */
    document.querySelectorAll('#navbar a').forEach((navbarlink) => {
        if (!navbarlink.hash) return;

        let section = document.querySelector(navbarlink.hash);
        if (!section) return;

        navbarlink.addEventListener('click', () => {
            if (document.querySelector('.mobile-nav-active')) {
                mobileNavToogle();
            }
        });
    });

    /**
     * Toggle mobile nav dropdowns
     */
    const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

    navDropdowns.forEach((el) => {
        el.addEventListener('click', function (event) {
            if (document.querySelector('.mobile-nav-active')) {
                event.preventDefault();
                this.classList.toggle('active');
                this.nextElementSibling.classList.toggle('dropdown-active');

                let dropDownIndicator = this.querySelector(
                    '.dropdown-indicator',
                );
                dropDownIndicator.classList.toggle('bi-chevron-up');
                dropDownIndicator.classList.toggle('bi-chevron-down');
            }
        });
    });

    /**
     * Scroll top button
     */
    const scrollTop = document.querySelector('.scroll-top');
    if (scrollTop) {
        const togglescrollTop = function () {
            window.scrollY > 100
                ? scrollTop.classList.add('active')
                : scrollTop.classList.remove('active');
        };
        window.addEventListener('load', togglescrollTop);
        document.addEventListener('scroll', togglescrollTop);
        scrollTop.addEventListener(
            'click',
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            }),
        );
    }

    /**
     * Initiate glightbox
     */
    const glightbox = GLightbox({
        selector: '.glightbox',
    });

    /**
     * Init swiper slider with 1 slide at once in desktop view
     */
    new Swiper('.slides-1', {
        speed: 600,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        slidesPerView: 'auto',
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    /**
     * Init swiper slider with 3 slides at once in desktop view
     */
    new Swiper('.slides-3', {
        speed: 600,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        slidesPerView: 'auto',
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 40,
            },

            1200: {
                slidesPerView: 3,
            },
        },
    });

    /**
     * Animation on scroll function and init
     */
    function aos_init() {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
        });
    }
    window.addEventListener('load', () => {
        aos_init();
    });
});

function showAlert() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var subject = document.getElementById('subject').value;
    var message = document.getElementById('message').value;

    if (name === '' || email === '' || subject === '' || message === '') {
        // Handle form validation or display an error message if needed
    } else {
        // Set timeout to redirect after 5 seconds
        setTimeout(function () {
            alert('Pesan terkirim!');
            // Menggunakan JavaScript untuk mengarahkan pengguna ke halaman contact.html
            window.location.href = 'contact.html';
        }, 5000);

        // Untuk memastikan formulir tidak dikirim secara default, return false
        return false;
    }
}

var form = document.getElementById('my-form');

async function handleSubmit(event) {
    event.preventDefault();
    var status = document.getElementById('my-form-status');
    var data = new FormData(event.target);
    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            Accept: 'application/json',
        },
    })
        .then((response) => {
            if (response.ok) {
                status.innerHTML = 'Thanks for your submission!';
                form.reset();
            } else {
                response.json().then((data) => {
                    if (Object.hasOwn(data, 'errors')) {
                        status.innerHTML = data['errors']
                            .map((error) => error['message'])
                            .join(', ');
                    } else {
                        status.innerHTML =
                            'Oops! There was a problem submitting your form';
                    }
                });
            }
        })
        .catch((error) => {
            status.innerHTML = 'Oops! There was a problem submitting your form';
        });
}
form.addEventListener('submit', handleSubmit);
