$(document).ready(function(){
    /* 
    carusel jquery
    $('.carousel__inner').slick({
        speed: 1200,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"</button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"</button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: false,
                    arrows: false,
                }
            }

        ]
      }); */

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

    

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    //modal

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });


    $('.button_mini').each(function (i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        })
    })
    

    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });

    //Валидация

    function valideForms(form) {
        $(form).validate({
            rules: {
                name: "required",
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: "Пожалуйста, введите своё имя!",
                phone: "Пожалуйста, введите номер своего телефона!",
                email: {
                  required: "Пожалуйста, введите свою почту!",
                  email: "Введите почту в данном формате name@domain.com"
                }
              }
        });
    };

    valideForms('#consultation-form');
    valideForms('#consultation form');
    valideForms('#order form');

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    //sending letter
    
    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    //Smooth scroll and pageup
    $(window).scroll(function() {
        if ($(this).scrollTop() >1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href^='#']").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    //подключение библиотеки WOW
    new WOW().init();

  });

  window.addEventListener('DOMContentLoaded', function () {
    "use strict";

    //slider
    function slider() {   
        let slideIndex = 1,
            slides = document.querySelectorAll('.slider__item'),
            prev = document.querySelector('.slider__prev'),
            next = document.querySelector('.slider__next');
    
            showSlides(slideIndex);
            
            function showSlides(n) {
    
                if (n > slides.length) {
                    slideIndex = 1;
                }
                if (n < 1) {
                    slideIndex = slides.length;
                }
    
                slides.forEach((item) => item.style.display = 'none');
    
                slides[slideIndex - 1].style.display = 'block';
                }
    
            function plusSlides(n) {
                showSlides(slideIndex += n);
            }  
            function currentSlide(n) {
                showSlides(slideIndex = n);
            }
    
            prev.addEventListener('click', function() {
                plusSlides(-1);
            });
    
            next.addEventListener('click', function() {
                plusSlides(1);
            });
    
        };


    slider();

});