setInterval(() => {
  scrollTo(
    0,
    document
      .querySelector('#cafe_main')
      .contentWindow.document.querySelector('.ArticleBottomBtns').offsetTop
  );
  document
    .querySelector('#cafe_main')
    .contentWindow.document.querySelector('textarea').textContent =
    '반갑습니다';
}, 1000);

setInterval(() => {
  document
    .querySelector('#cafe_main')
    .contentWindow.document.querySelector('.selected')
    .parentElement.firstElementChild.nextElementSibling.firstElementChild.firstElementChild.click();
}, 4000);
