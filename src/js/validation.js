'use strict';

import './warning';

(function () {
  const RegExp = {
    NICKNAME: {
      FIRST_SYMBOL: /^[a-zA-Z]/,
      SYMBOLS: /[a-zA-Z0-9-_\.]$/
    },
    
  };

  const isValid = {
    nickname: false,
    reEntryPassword: false,
    userAgreement: false
  };

  window.validation = {
    RegExp: {
      EMAIL_ADDRESS: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i,
      PASSWORD: {
        LETTERS: /(?=.*[a-z])(?=.*[A-Z]).*$/,
        NUMBERS: /^(?=.*\d).*$/
      }
    },
    password: {
      doesNotRepeat: {
        email: true,
        nickname: true
      },
      contain: {
        letters: '',
        numbers: ''
      },
      lengthIsValid: ''
    },
    isValid: {
      email: false,
      password: false,
      regForm: false
    },
    checkFormValidity: () => {
      window.validation.isValid.regForm = window.validation.isValid.email
        && isValid.nickname
        && window.validation.isValid.password
        && isValid.reEntryPassword
        && isValid.userAgreement;
    },
    markPasswordField: () => {
      window.password.validatePassword();
      window.password.markRulesCompliance();
  
      if (window.form.field.password.value) {
        window.warning.markField(window.validation.isValid.password, window.form.field.password);  
      }
    }
  }
  
  // Nickname
  let nicknameFieldFirstSymbolIsNotNumber;
  let nicknameFieldAllCharactersAreValid;
  let nicknameFieldLengthIsValid;

  const validateNickname = () => {
    nicknameFieldFirstSymbolIsNotNumber = RegExp.NICKNAME.FIRST_SYMBOL.test(window.form.field.nickname.value);
    nicknameFieldAllCharactersAreValid = RegExp.NICKNAME.SYMBOLS.test(window.form.field.nickname.value);
    nicknameFieldLengthIsValid = window.form.field.nickname.value.length > 2 && window.form.field.nickname.value.length < 41;

    isValid.nickname = nicknameFieldFirstSymbolIsNotNumber
      && nicknameFieldAllCharactersAreValid
      && nicknameFieldLengthIsValid;
  };

  const nicknameFieldKeyupHandler = () => {
    validateNickname();
    
    if (window.form.field.password.value) {
      window.validation.password.doesNotRepeat.nickname = window.form.field.password.value !== window.form.field.nickname.value;
      window.warning.showWarningText(window.validation.password.doesNotRepeat.nickname, window.warning.text.repeatNickname);
      window.warning.hideWarningText(window.validation.password.doesNotRepeat.nickname, window.warning.text.repeatNickname);
    }

    window.warning.hideWarningText(nicknameFieldFirstSymbolIsNotNumber, nicknameFirstLetterWarningText);
    window.warning.hideWarningText(nicknameFieldAllCharactersAreValid, nicknameSymbolsWarningText);
    window.warning.hideWarningText(nicknameFieldLengthIsValid, nicknameLengthdWarningText);
    window.validation.markPasswordField();
  };
  window.form.field.nickname.addEventListener('keyup', nicknameFieldKeyupHandler);

  const nicknameLengthdWarningText = document.querySelector('.nickname-length-invalid-js');
  const nicknameSymbolsWarningText = document.querySelector('.nickname-symbols-invalid-js');
  const nicknameFirstLetterWarningText = document.querySelector('.nickname-first-letter-invalid-js');

  const nicknameFieldBlurHandler = () => {
    window.warning.markField(isValid.nickname, window.form.field.nickname);
    window.warning.showWarningText(nicknameFieldLengthIsValid, nicknameLengthdWarningText);

    if (window.form.field.nickname.value) {
      window.warning.showWarningText(nicknameFieldFirstSymbolIsNotNumber, nicknameFirstLetterWarningText);
      window.warning.showWarningText(nicknameFieldAllCharactersAreValid, nicknameSymbolsWarningText);
    }
  };
  window.form.field.nickname.addEventListener('blur', nicknameFieldBlurHandler);

  // PasswordsMatch
  const passwordReEntryField = document.querySelector('.registration__input[name=password-check]');
  const passwordReEntryTextError = document.querySelector('.passwords-invalid-js');

  const checkReEntryPasswordsMatch = () => {
    isValid.reEntryPassword = window.form.field.password.value === passwordReEntryField.value;
  };

  const passwordReEntryFieldKeyupHandler = () => {
    checkReEntryPasswordsMatch();
    window.warning.hideWarningText(isValid.reEntryPassword, passwordReEntryTextError);
  };
  passwordReEntryField.addEventListener('keyup', passwordReEntryFieldKeyupHandler);

  const passwordReEntryFieldBlurHandler = () => {
    window.warning.markField(isValid.reEntryPassword, passwordReEntryField);
    window.warning.showWarningText(isValid.reEntryPassword, passwordReEntryTextError);
  };
  passwordReEntryField.addEventListener('blur', passwordReEntryFieldBlurHandler);

  // Consent
  const consentField = document.querySelector('.registration__agreement-input');

  const checkConsent = () => {
    isValid.userAgreement = consentField.checked;
  };

  const consentFieldChangeHandler = () => {
    checkConsent();
    window.validation.checkFormValidity();
    window.registration.allowRegistration();
  };

  consentField.addEventListener('change', consentFieldChangeHandler);
})();
