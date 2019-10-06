import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import './NewSlider.scss'
import $ from 'jquery'



class NewSlider extends React.Component {
  componentDidMount() {
    console.log(window.swiper);
    var bg = document.querySelector('.item-bg');
    var items = document.querySelectorAll('.news__item');
    var item = document.querySelector('.news__item');

    function cLog(content) {
        console.log(content)
    }

    if($(window).width() > 800) {
        $(document).on("mouseover", ".news__item", function (_event, _element) {

            var newsItem = document.querySelectorAll('.news__item');
            newsItem.forEach(function (element, index) {
                element.addEventListener('mouseover', function () {
                    var x = this.getBoundingClientRect().left;
                    var y = this.getBoundingClientRect().top;
                    var width = this.getBoundingClientRect().width;
                    var height = this.getBoundingClientRect().height;

                    $('.item-bg').addClass('active');
                    $('.news__item').removeClass('active');
                    // $('.news__item').removeClass('active');


                    bg.style.width = width + 'px';
                    bg.style.height = height + 'px';
                    bg.style.transform = 'translateX(' + x + 'px ) translateY(' + y + 'px)';
                });

                element.addEventListener('mouseleave', function () {
                    $('.item-bg').removeClass('active');
                    $('.news__item').removeClass('active');
                });

            });

        });
    }


    var swiper = new window.swiper('.news-slider', {
        effect: 'coverflow',
        grabCursor: true,
        loop: true,
        centeredSlides: true,
        keyboard: true,
        spaceBetween: 0,
        slidesPerView: 'auto',
        speed: 300,
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 0,
            modifier: 3,
            slideShadows: false
        },
        breakpoints: {
            480: {
                spaceBetween: 0,
                centeredSlides: true
            }
        },
        simulateTouch: true,
        navigation: {
            nextEl: '.news-slider-next',
            prevEl: '.news-slider-prev'
        },
        pagination: {
            el: '.news-slider__pagination',
            clickable: true
        },
        on: {
            init: function () {
                var activeItem = document.querySelector('.swiper-slide-active');

                var sliderItem = activeItem.querySelector('.news__item');

                $('.swiper-slide-active .news__item').addClass('active');

                var x = sliderItem.getBoundingClientRect().left;
                var y = sliderItem.getBoundingClientRect().top;
                var width = sliderItem.getBoundingClientRect().width;
                var height = sliderItem.getBoundingClientRect().height;


                $('.item-bg').addClass('active');

                bg.style.width = width + 'px';
                bg.style.height = height + 'px';
                bg.style.transform = 'translateX(' + x + 'px ) translateY(' + y + 'px)';
            }
        }
    });

    swiper.on('touchEnd', function () {
        $('.news__item').removeClass('active');
        $('.swiper-slide-active .news__item').addClass('active');
    });

    swiper.on('slideChange', function () {
        $('.news__item').removeClass('active');
    });

    swiper.on('slideChangeTransitionEnd', function () {
        $('.news__item').removeClass('active');
        var activeItem = document.querySelector('.swiper-slide-active');

        var sliderItem = activeItem.querySelector('.news__item');

        $('.swiper-slide-active .news__item').addClass('active');

        var x = sliderItem.getBoundingClientRect().left;
        var y = sliderItem.getBoundingClientRect().top;
        var width = sliderItem.getBoundingClientRect().width;
        var height = sliderItem.getBoundingClientRect().height;


        $('.item-bg').addClass('active');

        bg.style.width = width + 'px';
        bg.style.height = height + 'px';
        bg.style.transform = 'translateX(' + x + 'px ) translateY(' + y + 'px)';
    });
  }
  render () {
    return(
      <Fragment>
      <div class="wrapper">

        <div class="background">
          <img src="https://res.cloudinary.com/muhammederdem/image/upload/v1537132206/news-slider/background.jpg" alt=""/>
        </div>
        <div class="item-bg"></div>

        <div class="news-slider">
          <div class="news-slider__wrp swiper-wrapper">
            <div class="news-slider__item swiper-slide">
              <a href="#" class="news__item">
                <div class="news-date">
                  <span class="news-date__title">24</span>
                  <span class="news-date__txt">May</span>
                </div>
                <div class="news__title">
                  Lorem Ipsum Dolor Sit Amed
                </div>

                <p class="news__txt">
                  {"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s..."}
                </p>
              </a>
            </div>

            <div class="news-slider__item swiper-slide">
              <a href="#" class="news__item">
                <div class="news-date">
                  <span class="news-date__title">25</span>
                  <span class="news-date__txt">May</span>
                </div>
                <div class="news__title">
                  Lorem Ipsum Dolor Sit Amed
                </div>

                <p class="news__txt">
                  {"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s..."}
                </p>
              </a>
            </div>

            <div class="news-slider__item swiper-slide">
              <a href="#" class="news__item">
                <div class="news-date">
                  <span class="news-date__title">26</span>
                  <span class="news-date__txt">May</span>
                </div>
                <div class="news__title">
                  Lorem Ipsum Dolor Sit Amed
                </div>

                <p class="news__txt">
                  {"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s..."}
                </p>
              </a>
            </div>

            <div class="news-slider__item swiper-slide">
              <a href="#" class="news__item">
                <div class="news-date">
                  <span class="news-date__title">27</span>
                  <span class="news-date__txt">May</span>
                </div>
                <div class="news__title">
                  Lorem Ipsum Dolor Sit Amed
                </div>

                <p class="news__txt">
                  {"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s..."}
                </p>
              </a>
            </div>

            <div class="news-slider__item swiper-slide">
              <a href="#" class="news__item">
                <div class="news-date">
                  <span class="news-date__title">28</span>
                  <span class="news-date__txt">May</span>
                </div>
                <div class="news__title">
                  Lorem Ipsum Dolor Sit Amed
                </div>

                <p class="news__txt">
                  {"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s..."}
                </p>
              </a>
            </div>

            <div class="news-slider__item swiper-slide">
              <a href="#" class="news__item">
                <div class="news-date">
                  <span class="news-date__title">29</span>
                  <span class="news-date__txt">May</span>
                </div>
                <div class="news__title">
                  Lorem Ipsum Dolor Sit Amed
                </div>

                <p class="news__txt">
                  {"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s..."}
                </p>
              </a>
            </div>
          </div>

          <div class="news-slider__ctr">

            <div class="news-slider__arrows">
              <button class="news-slider__arrow news-slider-prev">
                <span class="icon-font">
                  <svg class="icon icon-arrow-left"><use href="#icon-arrow-left"></use></svg>
                </span>
              </button>
              <button class="news-slider__arrow news-slider-next">
                <span class="icon-font">
                  <svg class="icon icon-arrow-right"><use href="#icon-arrow-right"></use></svg>
                </span>
              </button>
            </div>

          </div>

        </div>

      </div>

      <svg hidden="hidden">
        <defs>
          <symbol id="icon-arrow-left" viewBox="0 0 32 32">
            <title>arrow-left</title>
            <path d="M0.704 17.696l9.856 9.856c0.896 0.896 2.432 0.896 3.328 0s0.896-2.432 0-3.328l-5.792-5.856h21.568c1.312 0 2.368-1.056 2.368-2.368s-1.056-2.368-2.368-2.368h-21.568l5.824-5.824c0.896-0.896 0.896-2.432 0-3.328-0.48-0.48-1.088-0.704-1.696-0.704s-1.216 0.224-1.696 0.704l-9.824 9.824c-0.448 0.448-0.704 1.056-0.704 1.696s0.224 1.248 0.704 1.696z"></path>
          </symbol>
          <symbol id="icon-arrow-right" viewBox="0 0 32 32">
            <title>arrow-right</title>
            <path d="M31.296 14.336l-9.888-9.888c-0.896-0.896-2.432-0.896-3.328 0s-0.896 2.432 0 3.328l5.824 5.856h-21.536c-1.312 0-2.368 1.056-2.368 2.368s1.056 2.368 2.368 2.368h21.568l-5.856 5.824c-0.896 0.896-0.896 2.432 0 3.328 0.48 0.48 1.088 0.704 1.696 0.704s1.216-0.224 1.696-0.704l9.824-9.824c0.448-0.448 0.704-1.056 0.704-1.696s-0.224-1.248-0.704-1.664z"></path>
          </symbol>
        </defs>
      </svg>
      </Fragment>
    )
  }
}

export default NewSlider;
