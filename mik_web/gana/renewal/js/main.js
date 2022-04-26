$(document).ready(function () {
  $(window).resize(function () {
    ww = $(window).width();
    dh = $(document).height();
  });
  ww = $(window).width();
  dh = $(document).height();

  //메인 슬라이드
  var menu = [
    "https://shop.hansalim.or.kr/shopping/is/itm/070311018/070311018_1_568.jpg",
    "https://shop.hansalim.or.kr/shopping/is/itm/070311018/070311018_2_568.jpg",
    "https://shop.hansalim.or.kr/shopping/is/itm/070311018/070311018_3_568.jpg",
    "https://shop.hansalim.or.kr/shopping/is/itm/070311018/070311018_4_568.jpg",
  ];
  const sc1 = new Swiper(".sc1", {
    // Optional parameters
    direction: "horizontal",
    loop: true,
    speed: 600,
    // autoplay: {delay: 3000, disableOnInteraction: false},
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        return (
          "<img class='test " + className + "' src='" + menu[index] + "'/>"
        );
      },
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}); //end
