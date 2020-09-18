'use strict';

(function () {
  window.form = {
    showRegFormButton: document.querySelector('.start-page__button'),
    field: {
      email: document.querySelector('.registration__input[name=email]'),
      nickname: document.querySelector('.registration__input[name=name]'),
      password: document.querySelector('.registration__input[name=password]')
    }
  }
  
  const closeButtonClickHandler = () => {
    window.util.setDefaultPageState();
  };
  
  const openForm = () => {
    window.util.show(window.util.regFormBox);
    window.util.hide(window.form.showRegFormButton);

    const closeButton = window.util.regFormBox.querySelector('.close-button');
    closeButton.addEventListener('click', closeButtonClickHandler);
  }

  const showRegFormButtonClickHandler = () => {
    openForm();
  }
  
  window.form.showRegFormButton.addEventListener('click', showRegFormButtonClickHandler);
})();
