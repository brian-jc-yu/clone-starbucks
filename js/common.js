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



const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear(); //연도만 뽑아냄