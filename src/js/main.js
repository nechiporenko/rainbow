// Application Scripts:



// Сообщения об отправке формы
// Кнопка скролла страницы
// Модальное окно
// Маска для телефонного номера
// Слайдер
// Скроллер
// Если браузер не знает о svg-картинках

jQuery(document).ready(function ($) {
    //Кэшируем
    var $window = $(window),
        $body = $('body');

    

    //
    // Сообщения об отправке формы
    //---------------------------------------------------------------------------------------
    // после аякс-отправки формы ($form), если все ок - $form.find('.g-notice--ok').fadeIn();
    // если вернуло ошибку - $form.find('.g-notice--bad').fadeIn();
    var showFormNotice = (function () {
        var $notice = $('.js-notice');
        $notice.append('<a class="g-notice__close"><i class="icon-cancel"></i></a>'); //иконка закрытия
        $notice.on('click', '.g-notice__close', function (e) {//закроем блок по клику на иконку
            e.preventDefault();
            $(this).parent('div').fadeOut();
        });
    }());

    //
    // Кнопка скролла страницы
    //---------------------------------------------------------------------------------------
    var initPageScroller = (function () {
        var $scroller = $('<div class="scroll-up-btn"><i class="icon-up-open-big"></i></div>');
        $body.append($scroller);
        $window.on('scroll', function () {
            if ($(this).scrollTop() > 300) {
                $scroller.show();
            } else {
                $scroller.hide();
            }
        });
        $scroller.on('click', function () {
            $('html, body').animate({ scrollTop: 0 }, 800);
            return false;
        });
    }());


    //
    // Модальное окно
    //---------------------------------------------------------------------------------------
    var showModal = (function (link) {
        var
        method = {},
        $overlay,
        $modal,
        $close;

        // добавим в документ
        $overlay = $('<div class="overlay" id="overlay"></div>'); //оверлей
        $close = $('<a class="modal__close" href="#"><i class="icon-cancel"></i></a>'); //иконка закрыть
        $body.append($overlay);

        $close.on('click', function (e) {
            e.preventDefault();
            method.close();
        });

        // центрируем окно
        method.center = function () {
            var top, left;

            top = Math.max($window.height() - $modal.outerHeight(), 0) / 2;
            left = Math.max($window.width() - $modal.outerWidth(), 0) / 2;

            $modal.css({
                top: top + $window.scrollTop(),
                left: left + $window.scrollLeft()
            });
        };


        // открываем
        method.open = function (link) {
            $modal = $(link);
            $modal.append($close);
            method.center();
            $window.bind('resize.modal', method.center);
            $overlay.fadeIn();
            $modal.fadeIn();
            

            $overlay.bind('click', function () {
                method.close();
            });
        };

        // закрываем
        method.close = function () {
            $modal.fadeOut('fast');
            $overlay.fadeOut('fast', function () {
                $overlay.unbind('click');
            });
            $window.unbind('resize.modal');
        };

        return method;
    }());

    // клик по кнопке с атрибутом data-modal - открываем модальное окно
    $('[data-modal]').on('click', function (e) {//передаем айди модального окна
        e.preventDefault();
        var link = $(this).data('modal');
        if (link) { showModal.open(link); }
    });

    //
    // Маска для телефонного номера
    //---------------------------------------------------------------------------------------
    $('.js-phone').mask("+7 (999) 99 999 99");


    //
    // Слайдер
    //---------------------------------------------------------------------------------------
    $('.js-slider').bxSlider();


    //
    // Скроллер
    //---------------------------------------------------------------------------------------
    function initScroller() {
        new Miniscroll(".js-scroller", {
            axis: "y",
            size: 8,
            sizethumb: 120,
            //onScroll: function (percent, offset) { },
            thumbColor: "#c0c0c2",
            trackerColor: "#fff"
        });
    }
    if ($('.js-scroller').length) { initScroller(); }


    //
    // Тултипы
    //---------------------------------------------------------------------------------------
    function initTooltips() {
        var winW = $window.width(),
            tipPosition = 'top';
        if (winW > 768) {
            tipPosition = 'left';
        }

        $('.js-form-tip').tooltipster({
            content: $('.b-data__tooltip'),
            contentAsHTML: true,
            minWidth: 300,
            maxWidth: 560,
            trigger: 'click',
            hideOnClick: true,
            position: tipPosition,
            functionBefore: function (origin, continueTooltip) {
                $('#overlay').fadeIn('fast', continueTooltip());
            },
            functionAfter: function (origin) {
                $('#overlay').hide();
            }
        });
    }

    initTooltips();

    //
    // Если браузер не знает о svg-картинках
    //---------------------------------------------------------------------------------------
    if (!Modernizr.svg) {
        $('img[src*="svg"]').attr('src', function () {
            return $(this).attr('src').replace('.svg', '.png');
        });
    }

   
    
});
