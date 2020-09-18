'use strict';

import '../validation';
import '../warning';
import '../form';

(function () {
  const RegExp = {
    NICKNAME: {
      FIRST_SYMBOL: /^[a-zA-Z]/,
      ILLEGAL_SYMBOL: /[^\w]/
    }
  };

  const Length = {
    MIN: 3,
    MAX: 40
  };

  let nicknameFieldFirstSymbolIsNotNumber;
  let nicknameFieldAllCharactersAreValid;
  let nicknameFieldLengthIsValid;

  const validateNickname = () => {
    nicknameFieldFirstSymbolIsNotNumber = RegExp.NICKNAME.FIRST_SYMBOL.test(window.form.field.nickname.value);
    nicknameFieldAllCharactersAreValid = !RegExp.NICKNAME.ILLEGAL_SYMBOL.test(window.form.field.nickname.value);
    nicknameFieldLengthIsValid = window.form.field.nickname.value.length >= Length.MIN && window.form.field.nickname.value.length <= Length.MAX;

    window.validation.isValid.nickname = nicknameFieldFirstSymbolIsNotNumber
      && nicknameFieldAllCharactersAreValid
      && nicknameFieldLengthIsValid;
  };

  const nicknameFieldKeyupHandler = () => {
    validateNickname();
   
    if (window.form.field.password.value) {
      window.password.doesNotRepeat.nickname = window.form.field.password.value !== window.form.field.nickname.value;
      window.warning.showWarningText(window.password.doesNotRepeat.nickname, window.warning.text.repeatNickname);
      window.warning.hideWarningText(window.password.doesNotRepeat.nickname, window.warning.text.repeatNickname);
    }

    window.warning.hideWarningText(nicknameFieldFirstSymbolIsNotNumber, nicknameFirstLetterWarningText);
    window.warning.hideWarningText(nicknameFieldAllCharactersAreValid, nicknameSymbolsWarningText);
    window.warning.hideWarningText(nicknameFieldLengthIsValid, nicknameLengthdWarningText);
    window.password.markPasswordField();
  };
  window.form.field.nickname.addEventListener('keyup', nicknameFieldKeyupHandler);

  const nicknameLengthdWarningText = document.querySelector('.nickname-length-invalid-js');
  const nicknameSymbolsWarningText = document.querySelector('.nickname-symbols-invalid-js');
  const nicknameFirstLetterWarningText = document.querySelector('.nickname-first-letter-invalid-js');

  const nicknameFieldBlurHandler = () => {
    window.warning.markField(window.validation.isValid.nickname, window.form.field.nickname);
    window.warning.showWarningText(nicknameFieldLengthIsValid, nicknameLengthdWarningText);

    if (window.form.field.nickname.value) {
      window.warning.showWarningText(nicknameFieldFirstSymbolIsNotNumber, nicknameFirstLetterWarningText);
      window.warning.showWarningText(nicknameFieldAllCharactersAreValid, nicknameSymbolsWarningText);
    }
  };
  window.form.field.nickname.addEventListener('blur', nicknameFieldBlurHandler);
})();
