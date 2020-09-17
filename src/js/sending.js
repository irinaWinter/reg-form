'use strict';

import './util';
import './form';

(function () {
  const blockRegButton = () => {
    window.form.showRegFormButton.classList.add('button--success');
    window.form.showRegFormButton.disabled = true;
  }

  const printFormData = () => {
    const formData = new FormData(window.util.regForm);
    console.log(JSON.stringify(Object.fromEntries(formData)));
  };

  const regFormSubmitHandler = () => {
    printFormData();
    window.util.setDefaultPageState();
    blockRegButton();
  };

  window.util.regForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    regFormSubmitHandler();
  });
})();
