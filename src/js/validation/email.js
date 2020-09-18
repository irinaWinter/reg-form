'use strict';

import '../validation';
import '../warning';
import '../form';

(function () {
  const validateEmail = () => {
    window.validation.isValid.email = window.validation.RegExp.EMAIL_ADDRESS.test(window.form.field.email.value);
  };

  const emailWarningText = document.querySelector('.email-invalid-js');
  
  const emailFieldKeyupHandler = () => {
    validateEmail();
    window.warning.hideWarningText(window.validation.isValid.email, emailWarningText);
    window.validation.markPasswordField();
    
    if (window.form.field.password.value) {
      window.validation.passwordDoesNotRepeat.email = window.form.field.password.value !== window.form.field.email.value;
      window.warning.toggleWarningText(window.validation.passwordDoesNotRepeat.email, window.warning.text.repeatEmail);
    }
  };
  window.form.field.email.addEventListener('keyup', emailFieldKeyupHandler);


  const emailFieldBlurHandler = () => {
    window.warning.markField(window.validation.isValid.email, window.form.field.email);
    window.warning.showWarningText(window.validation.isValid.email, emailWarningText);
  };
  window.form.field.email.addEventListener('blur', emailFieldBlurHandler); 
})();
