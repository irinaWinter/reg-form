'use strict';

import './warning';

(function () {
  const RegExp = {
    NICKNAME: {
      FIRST_SYMBOL: /^[a-zA-Z]/,
      SYMBOLS: /[a-zA-Z0-9-_\.]$/
    },
    PASSWORD: {
      LETTERS: /(?=.*[a-z])(?=.*[A-Z]).*$/,
      NUMBERS: /^(?=.*\d).*$/
    }
  };

  const isValid = {
    nickname: false,
    password: false,
    reEntryPassword: false,
    userAgreement: false
  };

  window.validation = {
    RegExp: {
      EMAIL_ADDRESS: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i
    },
    passwordDoesNotRepeat: {
      email: true,
      nickname: true
    },
    isValid: {
      email: false,
      regForm: false
    },
    checkFormValidity: () => {
      window.validation.isValid.regForm = window.validation.isValid.email
        && isValid.nickname
        && isValid.password
        && isValid.reEntryPassword
        && isValid.userAgreement;
    },
    markPasswordField: () => {
      validatePassword();
      markRulesCompliance();
  
      if (window.form.field.password.value) {
        window.warning.markField(isValid.password, window.form.field.password);  
      }
    }
  }
  
  // Password
  let passwordFieldContainLetters;
  let passwordFieldContainNumbers;
  let passwordFieldLengthIsValid;

  const validatePassword = () => {
    passwordFieldContainLetters = RegExp.PASSWORD.LETTERS.test(window.form.field.password.value);
    passwordFieldContainNumbers = RegExp.PASSWORD.NUMBERS.test(window.form.field.password.value);
    passwordFieldLengthIsValid = window.form.field.password.value.length > 5 && window.form.field.password.value.length < 33;
 
    isValid.password = passwordFieldContainLetters
      && passwordFieldContainNumbers
      && passwordFieldLengthIsValid
      && window.validation.passwordDoesNotRepeat.email
      && window.validation.passwordDoesNotRepeat.nickname;
  };

  const markRulesCompliance = () => {
    const rulesForLetters = document.querySelector('.rules-letters-js');
    window.warning.markRuleComplection(rulesForLetters, passwordFieldContainLetters);

    const rulesForNumbers = document.querySelector('.rules-numbers-js');
    window.warning.markRuleComplection(rulesForNumbers, passwordFieldContainNumbers);

    const rulesForLength = document.querySelector('.rules-length-js');
    window.warning.markRuleComplection(rulesForLength, passwordFieldLengthIsValid);
  };

  const repeatNicknameWarningText = document.querySelector('.repeat-nickname-invalid-js');
  
  const passwordFieldKeyupHandler = () => {
    if (window.form.field.email.value) {
      window.validation.passwordDoesNotRepeat.email = window.form.field.password.value !== window.form.field.email.value;
      window.warning.showWarningText(window.validation.passwordDoesNotRepeat.email, window.warning.text.repeatEmail);
      window.warning.hideWarningText(window.validation.passwordDoesNotRepeat.email, window.warning.text.repeatEmail);
    }

    if (nicknameField.value) {
      window.validation.passwordDoesNotRepeat.nickname = window.form.field.password.value !== nicknameField.value;
      window.warning.showWarningText(window.validation.passwordDoesNotRepeat.nickname, repeatNicknameWarningText);
      window.warning.hideWarningText(window.validation.passwordDoesNotRepeat.nickname, repeatNicknameWarningText);
    }

    window.validation.markPasswordField();
  };
  window.form.field.password.addEventListener('keyup', passwordFieldKeyupHandler);
  
  const passwordFieldBlurHandler = () => {
    window.warning.markField(isValid.password, window.form.field.password);
  };
  window.form.field.password.addEventListener('blur', passwordFieldBlurHandler);

  // Nickname
  const nicknameField = document.querySelector('.registration__input[name=name]');

  let nicknameFieldFirstSymbolIsNotNumber;
  let nicknameFieldAllCharactersAreValid;
  let nicknameFieldLengthIsValid;

  const validateNickname = () => {
    nicknameFieldFirstSymbolIsNotNumber = RegExp.NICKNAME.FIRST_SYMBOL.test(nicknameField.value);
    nicknameFieldAllCharactersAreValid = RegExp.NICKNAME.SYMBOLS.test(nicknameField.value);
    nicknameFieldLengthIsValid = nicknameField.value.length > 2 && nicknameField.value.length < 41;

    isValid.nickname = nicknameFieldFirstSymbolIsNotNumber
      && nicknameFieldAllCharactersAreValid
      && nicknameFieldLengthIsValid;
  };

  const nicknameFieldKeyupHandler = () => {
    validateNickname();
    
    if (window.form.field.password.value) {
      window.validation.passwordDoesNotRepeat.nickname = window.form.field.password.value !== nicknameField.value;
      window.warning.showWarningText(window.validation.passwordDoesNotRepeat.nickname, repeatNicknameWarningText);
      window.warning.hideWarningText(window.validation.passwordDoesNotRepeat.nickname, repeatNicknameWarningText);
    }

    window.warning.hideWarningText(nicknameFieldFirstSymbolIsNotNumber, nicknameFirstLetterWarningText);
    window.warning.hideWarningText(nicknameFieldAllCharactersAreValid, nicknameSymbolsWarningText);
    window.warning.hideWarningText(nicknameFieldLengthIsValid, nicknameLengthdWarningText);
    window.validation.markPasswordField();
  };
  nicknameField.addEventListener('keyup', nicknameFieldKeyupHandler);

  const nicknameLengthdWarningText = document.querySelector('.nickname-length-invalid-js');
  const nicknameSymbolsWarningText = document.querySelector('.nickname-symbols-invalid-js');
  const nicknameFirstLetterWarningText = document.querySelector('.nickname-first-letter-invalid-js');

  const nicknameFieldBlurHandler = () => {
    window.warning.markField(isValid.nickname, nicknameField);
    window.warning.showWarningText(nicknameFieldLengthIsValid, nicknameLengthdWarningText);

    if (nicknameField.value) {
      window.warning.showWarningText(nicknameFieldFirstSymbolIsNotNumber, nicknameFirstLetterWarningText);
      window.warning.showWarningText(nicknameFieldAllCharactersAreValid, nicknameSymbolsWarningText);
    }
  };
  nicknameField.addEventListener('blur', nicknameFieldBlurHandler);

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
