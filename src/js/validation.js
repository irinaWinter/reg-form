'use strict';

import './warning';

(function () {
  window.validation = {
    isValid: {
      email: false,
      nickname: false,
      password: false,
      reEntryPassword: false,
      userAgreement: false,
      regForm: false
    },
    checkFormValidity: () => {
      window.validation.isValid.regForm = window.validation.isValid.email
        && window.validation.isValid.nickname
        && window.validation.isValid.password
        && window.validation.isValid.reEntryPassword
        && window.validation.isValid.userAgreement;

      console.clear();
      console.log('email', window.validation.isValid.email);
      console.log('nickname', window.validation.isValid.nickname);
      console.log('password', window.validation.isValid.password);
      console.log('reEntryPassword', window.validation.isValid.reEntryPassword);
      console.log('userAgreement', window.validation.isValid.userAgreement);
      console.log('regForm', window.validation.isValid.regForm);
    }
  };
})();
