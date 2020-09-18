'use strict';

import './validation'

(function () {
  window.registration = {
    allowRegistration: () => {
      if (window.validation.isValid.regForm) {
        unlockButton();
      } else {
        blockButton()
      }
    }
  };

  const registrationButton = document.querySelector('.registration__button');

  const unlockButton = () => {
    registrationButton.classList.remove('button--disabled');
    registrationButton.disabled = false;
  };

  const blockButton = () => {
    registrationButton.classList.add('button--disabled');
    registrationButton.disabled = true;
  }

  const formKeyupHandler = () => {
    window.validation.checkFormValidity();
    window.registration.allowRegistration();
  }

  window.util.regForm.addEventListener('keyup', formKeyupHandler);
})();