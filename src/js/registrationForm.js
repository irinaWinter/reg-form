'use strict';

(function () {

  const hide = (elem) => {
    elem.classList.add('hidden');
  };

  const show = (elem) => {
    elem.classList.remove('hidden');
  };

  const regForm = document.querySelector('.page-main__registration');

  const closeButtonClickHandler = () => {
    hide(regForm);
    show(showRegFormButton);
  };
  
  const openForm = () => {
    show(regForm);
    hide(showRegFormButton);

    const closeButton = regForm.querySelector('.close-button');
    closeButton.addEventListener('click', closeButtonClickHandler);
  }

  const showRegFormButtonClickHandler = () => {
    openForm();
  }
  
  const showRegFormButton = document.querySelector('.start-page__button');
  showRegFormButton.addEventListener('click', showRegFormButtonClickHandler);
})();
