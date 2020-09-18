'use strict';

import './warning';

(function () {
  const RegExp = {
    EMAIL_ADDRESS: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i,
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
    email: false,
    nickname: false,
    password: false,
    reEntryPassword: false,
    userAgreement: false
  };

  window.validation = {
    passwordDoesNotRepeat: {
      email: true,
      nickname: true
    },
    isValid: {
      email: false,
      regForm: false
    },
    checkFormValidity: () => {
      window.validation.isValid.regForm = isValid.email
        && isValid.nickname
        && isValid.password
        && isValid.reEntryPassword
        && isValid.userAgreement;
    }
  }
  
  // Password
  const passwordField = document.querySelector('.registration__input[name=password]');

  let passwordFieldContainLetters;
  let passwordFieldContainNumbers;
  let passwordFieldLengthIsValid;

  const validatePassword = () => {
    passwordFieldContainLetters = RegExp.PASSWORD.LETTERS.test(passwordField.value);
    passwordFieldContainNumbers = RegExp.PASSWORD.NUMBERS.test(passwordField.value);
    passwordFieldLengthIsValid = passwordField.value.length > 5 && passwordField.value.length < 33;
 
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

  const markPasswordField = () => {
    validatePassword();
    markRulesCompliance();

    if (passwordField.value) {
      window.warning.markField(isValid.password, passwordField);  
    }
  };

  const repeatEmailWarningText = document.querySelector('.repeat-email-invalid-js');
  const repeatNicknameWarningText = document.querySelector('.repeat-nickname-invalid-js');
  
  const passwordFieldKeyupHandler = () => {
    if (emailField.value) {
      window.validation.passwordDoesNotRepeat.email = passwordField.value !== emailField.value;
      window.warning.showWarningText(window.validation.passwordDoesNotRepeat.email, repeatEmailWarningText);
      window.warning.hideWarningText(window.validation.passwordDoesNotRepeat.email, repeatEmailWarningText);
    }

    if (nicknameField.value) {
      window.validation.passwordDoesNotRepeat.nickname = passwordField.value !== nicknameField.value;
      window.warning.showWarningText(window.validation.passwordDoesNotRepeat.nickname, repeatNicknameWarningText);
      window.warning.hideWarningText(window.validation.passwordDoesNotRepeat.nickname, repeatNicknameWarningText);
    }

    markPasswordField();
  };
  passwordField.addEventListener('keyup', passwordFieldKeyupHandler);
  
  const passwordFieldBlurHandler = () => {
    window.warning.markField(isValid.password, passwordField);
  };
  passwordField.addEventListener('blur', passwordFieldBlurHandler);

  // Email
  const emailField = document.querySelector('.registration__input[name=email]');

  const validateEmail = () => {
    isValid.email = RegExp.EMAIL_ADDRESS.test(emailField.value);
  };

  const emailFieldKeyupHandler = () => {
    validateEmail();
    
    if (passwordField.value) {
      window.validation.passwordDoesNotRepeat.email = passwordField.value !== emailField.value;
      window.warning.showWarningText(window.validation.passwordDoesNotRepeat.email, repeatEmailWarningText);
      window.warning.hideWarningText(window.validation.passwordDoesNotRepeat.email, repeatEmailWarningText);
    }

    window.warning.hideWarningText(isValid.email, emailWarningText);
    markPasswordField();
  };

  emailField.addEventListener('keyup', emailFieldKeyupHandler);

  const emailWarningText = document.querySelector('.email-invalid-js');

  const emailFieldBlurHandler = () => {
    window.warning.markField(isValid.email, emailField);

    window.warning.showWarningText(isValid.email, emailWarningText);
    markPasswordField();
  };
  emailField.addEventListener('blur', emailFieldBlurHandler);

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
    
    if (passwordField.value) {
      window.validation.passwordDoesNotRepeat.nickname = passwordField.value !== nicknameField.value;
      window.warning.showWarningText(window.validation.passwordDoesNotRepeat.nickname, repeatNicknameWarningText);
      window.warning.hideWarningText(window.validation.passwordDoesNotRepeat.nickname, repeatNicknameWarningText);
    }

    window.warning.hideWarningText(nicknameFieldFirstSymbolIsNotNumber, nicknameFirstLetterWarningText);
    window.warning.hideWarningText(nicknameFieldAllCharactersAreValid, nicknameSymbolsWarningText);
    window.warning.hideWarningText(nicknameFieldLengthIsValid, nicknameLengthdWarningText);
    markPasswordField();
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
    isValid.reEntryPassword = passwordField.value === passwordReEntryField.value;
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
