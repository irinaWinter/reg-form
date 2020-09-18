'use strict';

import '../form';
import '../validation';
import '../warning';
import './reEnteringPassword';

(function () {
  const Length = {
    MIN: 6,
    MAX: 32
  }

  const RegExp = {
    PASSWORD: {
      LETTERS: /(?=.*[a-z])(?=.*[A-Z]).*$/,
      NUMBERS: /^(?=.*\d).*$/
    }
  };

  const password = {
    contain: {
      letters: '',
      numbers: ''
    },
    lengthIsValid: ''
  };

  window.password = {
    doesNotRepeat: {
      email: true,
      nickname: true
    },
    validatePassword: () => {
      password.contain.letters = RegExp.PASSWORD.LETTERS.test(window.form.field.password.value);
      password.contain.numbers = RegExp.PASSWORD.NUMBERS.test(window.form.field.password.value);
      password.lengthIsValid = window.form.field.password.value.length >= Length.MIN
        && window.form.field.password.value.length <= Length.MAX;
   
      window.validation.isValid.password = password.contain.letters
        && password.contain.numbers
        && password.lengthIsValid
        && window.password.doesNotRepeat.email
        && window.password.doesNotRepeat.nickname;
    },
    markRulesCompliance: () => {
      const rulesForLetters = document.querySelector('.rules-letters-js');
      window.warning.markRuleComplection(rulesForLetters, password.contain.letters);
  
      const rulesForNumbers = document.querySelector('.rules-numbers-js');
      window.warning.markRuleComplection(rulesForNumbers, password.contain.numbers);
  
      const rulesForLength = document.querySelector('.rules-length-js');
      window.warning.markRuleComplection(rulesForLength, password.lengthIsValid);
    },
    markPasswordField: () => {
      window.password.validatePassword();
      window.password.markRulesCompliance();
  
      if (window.form.field.password.value) {
        window.warning.markField(window.validation.isValid.password, window.form.field.password);  
      }
    }
  }; 
  
  const passwordFieldKeyupHandler = () => {
    if (window.form.field.email.value) {
      window.password.doesNotRepeat.email = window.form.field.password.value !== window.form.field.email.value;
      window.warning.toggleWarningText(window.password.doesNotRepeat.email, window.warning.text.repeatEmail);
    }

    if (window.form.field.nickname.value) {
      window.password.doesNotRepeat.nickname = window.form.field.password.value !== window.form.field.nickname.value;
      window.warning.toggleWarningText(window.password.doesNotRepeat.nickname, window.warning.text.repeatNickname);
    }

    if (window.form.field.passwordReEntry.value) {
      window.checkReEntryPasswordsMatch();
      window.warning.markField(window.validation.isValid.reEntryPassword, window.form.field.passwordReEntry);
      window.warning.toggleWarningText(window.validation.isValid.reEntryPassword, window.warning.text.reEntryPassword);
    }

    window.password.markPasswordField();
  };
  window.form.field.password.addEventListener('keyup', passwordFieldKeyupHandler);
  
  const passwordFieldBlurHandler = () => {
    window.warning.markField(window.validation.isValid.password, window.form.field.password);
  };
  window.form.field.password.addEventListener('blur', passwordFieldBlurHandler);
})();
