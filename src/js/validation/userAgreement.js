'use strict';

import '../validation'
import '../registration'

(function () {
  const consentField = document.querySelector('.registration__agreement-input');

  const checkConsent = () => {
    window.validation.isValid.userAgreement = consentField.checked;
  };

  const consentFieldChangeHandler = () => {
    checkConsent();
    window.validation.checkFormValidity();
    window.registration.allowRegistration();
  };

  consentField.addEventListener('change', consentFieldChangeHandler);
})();
