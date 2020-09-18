'use strict';

import '../form';
import '../validation';
import '../warning';

(function () {
  const Length = {
    MIN: 6,
    MAX: 32
  }

  window.password = {
    validatePassword: () => {
      window.validation.password.contain.letters = window.validation.RegExp.PASSWORD.LETTERS.test(window.form.field.password.value);
      window.validation.password.contain.numbers = window.validation.RegExp.PASSWORD.NUMBERS.test(window.form.field.password.value);
      window.validation.password.lengthIsValid = window.form.field.password.value.length >= Length.MIN
        && window.form.field.password.value.length <= Length.MAX;
   
      window.validation.isValid.password = window.validation.password.contain.letters
        && window.validation.password.contain.numbers
        && window.validation.password.lengthIsValid
        && window.validation.password.doesNotRepeat.email
        && window.validation.password.doesNotRepeat.nickname;
    },
    markRulesCompliance: () => {
      const rulesForLetters = document.querySelector('.rules-letters-js');
      window.warning.markRuleComplection(rulesForLetters, window.validation.password.contain.letters);
  
      const rulesForNumbers = document.querySelector('.rules-numbers-js');
      window.warning.markRuleComplection(rulesForNumbers, window.validation.password.contain.numbers);
  
      const rulesForLength = document.querySelector('.rules-length-js');
      window.warning.markRuleComplection(rulesForLength, window.validation.password.lengthIsValid);
    }
  };
  
  const passwordFieldKeyupHandler = () => {
    if (window.form.field.email.value) {
      window.validation.password.doesNotRepeat.email = window.form.field.password.value !== window.form.field.email.value;
      window.warning.toggleWarningText(window.validation.password.doesNotRepeat.email, window.warning.text.repeatEmail);
    }

    if (window.form.field.nickname.value) {
      window.validation.password.doesNotRepeat.nickname = window.form.field.password.value !== window.form.field.nickname.value;
      window.warning.toggleWarningText(window.validation.password.doesNotRepeat.nickname, window.warning.text.repeatNickname);
    }

    window.validation.markPasswordField();
  };
  window.form.field.password.addEventListener('keyup', passwordFieldKeyupHandler);
  
  const passwordFieldBlurHandler = () => {
    window.warning.markField(window.validation.isValid.password, window.form.field.password);
  };
  window.form.field.password.addEventListener('blur', passwordFieldBlurHandler);
})();
