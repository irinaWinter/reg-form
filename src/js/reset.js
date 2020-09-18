'use strict';

(function () {
  const hide = (item) => {
    item.classList.add('hidden');
  };

  const hideErrorText = () => {
    const errorText = document.querySelectorAll('.invalid-js');
    errorText.forEach(hide);
  };

  const setDefaultStyleForField = (field) => {
    field.classList.remove('registration__input--error');
  };

  const setDefaultFieldStyle = () => {
    const fields = document.querySelectorAll('input');
    fields.forEach(setDefaultStyleForField);
  };

  const resetPasswordRule = (rule) => {
    rule.classList.remove('rules__item--success');
    rule.classList.remove('rules__item--error');
  };

  const resetPasswordRules = () => {
    const passwordRules = document.querySelectorAll('.rules__item');
    passwordRules.forEach(resetPasswordRule);
  };

  const resetData = () => {
    window.validation.isValid.email = false;
    window.validation.isValid.nickname = false;
    window.validation.isValid.password = false;
    window.validation.isValid.reEntryPassword = false;
    window.validation.isValid.userAgreement = false;
    window.validation.isValid.regForm = false;
  }

  window.resetForm = () => {
    window.util.regForm.reset();
    hideErrorText();
    setDefaultFieldStyle();
    resetPasswordRules();
    resetData();
    window.registration.blockButton();
  };
})();
