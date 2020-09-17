'use strict';

(function () {
  window.form = {
    showRegFormButton: document.querySelector('.start-page__button')
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
