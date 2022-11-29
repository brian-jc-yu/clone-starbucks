const searchEl = document.querySelector(`.search`); //document는 HTML 자체를 의미함
const searchInputEl = searchEl.querySelector(`input`);

searchEl.addEventListener(`click`, function () {
  searchInputEl.focus();
});

searchInputEl.addEventListener(`focus`, function () {
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder', '통합검색'); /*Attribute는 HTML의 속성*/
});

searchInputEl.addEventListener('blur', function () {
  /* blur 포커스 해제된 상태 */
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', '');
});

/* 스크롤하면 뱃지가 사라지도록 하는 기능 */
const badgeEl = document.querySelector('header .badges');

// 스크롤 업 버튼을 누르면 올라가는 기능
const toTopEl = document.querySelector('#to-top');

window.addEventListener('scroll', _.throttle(function () { //ajax-loadsh 뱃지 스크롤 사라지게하는 라이브러리 - 오픈소스
  console.log(window.scrollY); //화면이 스크롤될때마다 스크롤Y값이 갱신되어 
  if (window.scrollY > 500) {
    //Y자표가 500보다 커지면 뱃지 숨김
    // badgeEl.style.display = 'none'; 뱃지숨김

    //ajax-gsap-뱃지 사라짐 부드럽게하는 라이브러리 - 오픈소스
    gsap.to(badgeEl, 0.6, { //(요소, 지속시간 초, 옵션-객채로 사용가능{} )
      opacity: 0,
      display: 'none' //css 문자값 앞뒤 따옴포 ''
    });

    //Y자표가 500보타 커지면 스크롤 버튼 표시
    gsap.to('toTopEl', 0.2, {
      x: 0
    });

  } else { //500 이하 뱃지 보이기
    gsap.to(badgeEl, 0.6, {
      opacity: 1,
      display: 'block' //css 문자값 앞뒤 따옴포 ''
      // badgeEl.style.display ='block'; 뱃지 표시
    })

    //500 이하 스크롤 버튼 숨기기
    gsap.to('toTopEl', 0.2, {
      x: 100
    } );

  }
}, 300)); // 300ms 0.3초 코드를 딜레이를 시켜 과부하 방지 
// _.throttle(함수, 지연시간 추가 ms단위)

/* 스크롤 업 버튼을 누르면 올라가는 기능 -
const toTopEl = document.querySelector('#to-top'); 위에 선언함 */
toTopEl.addEventListener('click', function() {
  gsap.to(window, 0.7, {  //window 페이지가 출력되는 화면 자체를 애니메이션 처리
    scrollTo: 0,
  });

});






//new swiper(선택자-클래스, 옵션-함수or객채 );
new Swiper('.notice-line .swiper-container', {
  /** new = 자바스크립트 생성자 */
  direction: 'vertical', //슬라이딩 방향 기본값 horizontal
  autoplay: true, //자동 재생
  loop: true //반복 재생
});


new Swiper('.promotion .swiper-container', {
  slidesPerView: 3, //한 버에 보여줄 슬라이드 갯수
  spaceBetween: 10, // 슬라이드 사이 여백
  centeredSlides: true, // 1번 슬라이드가 가운데 출력
  loop: true,
  // autoplay: {
  //   delay: 3000 //단위: 밀리세컨
  // }
  pagination: {
    el: '.promotion .swiper-pagination', //페이지 번호 선택자
    clickable: true // 사용자의 페이지 번호 요소 제어
  },
  navigation: {
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next'
  }
});


/*하단 AWARDS 슬라이드 */
new Swiper('.awards .swiper-container', {
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5,
  navigation: {
    prevEl:'.awards .swiper-prev',
    nextEl:'.awards .swiper-next'
  }
});



//버튼 클릭에따라 숨김 보임 설정하는 법.
const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion')
let isHidePromotion = false; //초기값은 Hide숨김- false 상태 =보임 상태
promotionToggleBtn.addEventListener('click', function () {
  isHidePromotion = !isHidePromotion // !은 반대값을 반환함
  if (isHidePromotion) {
    //숨김 처리 -  초기상태는 보이는 상태이므로 버튼에 Hide 값을 추가하여 클릭시 숨김처리
    promotionEl.classList.add('hide');

  } else {
    //보임 처리 - 클릭후 숨김 상태이기에 버튼에 Hide 값을 제거하여 클릭시 보임처리
    promotionEl.classList.remove('hide');
  }
})

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

function floatingObject(selector, delay, size) {
  //gsap.to(요소, 시간, 옵션);
  gsap.to(selector, //선택자
    random(1.5, 2.5), //애니메이션 동작 시간
    { //옵션-객체
    y: size,
    repeat: -1, //-1 무한 반복 js에서 지원하는 기능
    yoyo: true, //애니메이션이 진행되고 되돌아옴
    ease: Power1.easeInOut,
    delay: random(0, delay),

  });
}

floatingObject('.floating1', 1, 15);
floatingObject('.floating2', 0.5, 15);
floatingObject('.floating3', 1.5, 20);



const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function (spyEl) {
  new ScrollMagic
    .Scene({
      triggerElement: spyEl, //보여짐 여부를 람시할 요소 지정
      triggerHook: 0.8,  //뷰포인트에서 최상단=0 최하단=1로 0.8은 아래쪽 80%지점
    })
    .setClassToggle(spyEl, 'show')
    .addTo(new ScrollMagic.Controller());
});

const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear(); //연도만 뽑아냄