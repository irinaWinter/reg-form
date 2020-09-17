'use strict';

import './warning';

(function () {
  const RegExp = {
    EMAIL_ADDRESS: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i,
    NICKNAME: /^[a-zA-Z][a-zA-Z0-9-_\.]{3,40}$/,
    PASSWORD: {
      LETTERS: /(?=.*[a-z])(?=.*[A-Z]).*$/,
      NUMBERS: /^(?=.*\d).*$/
    }
  };

  // const isValid = {
  //   email: false,
  //   nickname: false,
  //   password: false,
  //   reEntryPassword: false,
  //   userAgrees: false,
  //   form: isValid.email
  //      && isValid.nickname
  //      && isValid.password
  //      && isValid.reEntryPassword
  //      && isValid.userAgrees
  // }

  const passwordDoesNotRepeat = {
    email: true,
    nicknameField: true
  }
  
  window.validation = {

  };

  let emailFieldIsValid;
  let nicknameFieldIsValid;
  let passwordDoesNotRepeatEmail;
  let passwordDoesNotRepeatNickname;
  let passwordFieldIsValid;
  let reEntryPasswordIsMatch;
  let userAgrees;
  let formIsValid;

  const checkValidityForm = () => {
    formIsValid = emailFieldIsValid
      && nicknameFieldIsValid
      && passwordFieldIsValid
      && reEntryPasswordIsMatch
      && userAgrees;
  };

  const markAsErroneous = (field) => {
    field.classList.add('registration__input--error');
  };

  const markAsCorrect = (field) => {
    field.classList.remove('registration__input--error');
  };

  const checkForm = (isValid, field) => {
    if (!isValid && isValid !== undefined) {
      markAsErroneous(field);
    } else {
      markAsCorrect(field);
    }
  };

  const emailField = document.querySelector('.registration__input[name=email]');
  const nicknameField = document.querySelector('.registration__input[name=name]');



// lfkghjlskdfjhglksdjhfgljhsdlkgjhldsjhgkjsdhflkg

  // Password
  const passwordField = document.querySelector('.registration__input[name=password]');

  const checkRuleExecution = (rule, fieldIsCorrect) => {
    if (fieldIsCorrect) {
      if (rule.classList.contains('rules__item--error')) {
        rule.classList.remove('rules__item--error');
      }
      rule.classList.add('rules__item--success');
    } else if (rule.classList.contains('rules__item--success')) {
      rule.classList.remove('rules__item--success');
      rule.classList.add('rules__item--error');
    }
  }
  
  const validatePassword = () => {
    const passwordFieldContainLetters = RegExp.PASSWORD.LETTERS.test(passwordField.value);
    const rulesForLetters = document.querySelector('.rules-letters-js');
  
    checkRuleExecution(rulesForLetters, passwordFieldContainLetters);
  
    const passwordFieldContainNumbers = RegExp.PASSWORD.NUMBERS.test(passwordField.value);
    const rulesForNumbers = document.querySelector('.rules-numbers-js');
  
    checkRuleExecution(rulesForNumbers, passwordFieldContainNumbers);
  
    const passwordFieldLengthIsValid = passwordField.value.length > 5 && passwordField.value.length < 33;
    const rulesForLength = document.querySelector('.rules-length-js');
  
    checkRuleExecution(rulesForLength, passwordFieldLengthIsValid);
 
    passwordFieldIsValid = passwordFieldContainLetters
      && passwordFieldContainNumbers
      && passwordFieldLengthIsValid
      && passwordDoesNotRepeatEmail
      && passwordDoesNotRepeatNickname;

    if (passwordField.value) {
      checkForm(passwordFieldIsValid, passwordField);  
    }
  };
  
  const passwordFieldKeyupHandler = () => {
    if (emailField.value) {
      passwordDoesNotRepeatEmail = passwordField.value !== emailField.value;
    }

    if (nicknameField.value) {
      passwordDoesNotRepeatNickname = passwordField.value !== nicknameField.value;
    }
    validatePassword();
    preventRepetition();
    checkValidityForm();
  };
  passwordField.addEventListener('keyup', passwordFieldKeyupHandler);
  
  const passwordFieldBlurHandler = () => {
    checkForm(passwordFieldIsValid, passwordField);
  };
  passwordField.addEventListener('blur', passwordFieldBlurHandler);

  // Email
  const validateEmail = () => {
    emailFieldIsValid = RegExp.EMAIL_ADDRESS.test(emailField.value);
  };

  const emailFieldKeyupHandler = () => {
    validateEmail();
    
    if (passwordField.value) {
      passwordDoesNotRepeatEmail = passwordField.value !== emailField.value;
    }

    validatePassword();
    preventRepetition();
    checkValidityForm();
  };

  emailField.addEventListener('keyup', emailFieldKeyupHandler);

  const emailFieldBlurHandler = () => {
    checkForm(emailFieldIsValid, emailField);
  };
  emailField.addEventListener('blur', emailFieldBlurHandler);

  // Nickname
  const validateNickname = () => {
    nicknameFieldIsValid = RegExp.NICKNAME.test(nicknameField.value);
  };

  const nicknameFieldKeyupHandler = () => {
    validateNickname();
    
    if (passwordField.value) {
      passwordDoesNotRepeatNickname = passwordField.value !== nicknameField.value;
    }

    validatePassword();
    preventRepetition();
    checkValidityForm();
  };
  nicknameField.addEventListener('keyup', nicknameFieldKeyupHandler);

  const nicknameFieldBlurHandler = () => {
    checkForm(nicknameFieldIsValid, nicknameField);
  };
  nicknameField.addEventListener('blur', nicknameFieldBlurHandler);

  // Similarity

  const preventRepetition = () => {
    const similarityRule = document.querySelector('.rules__item--similarity');

    if ((!passwordDoesNotRepeatEmail && passwordDoesNotRepeatEmail !== undefined)
      || !passwordDoesNotRepeatNickname  && passwordDoesNotRepeatNickname !== undefined) {
      similarityRule.classList.add('rules__item--error');
    } else {
      similarityRule.classList.remove('rules__item--error');
    }
  };  

  // PasswordsMatch
  const passwordReEntryField = document.querySelector('.registration__input[name=password-check]');

  const checkReEntryPasswordsMatch = () => {
    reEntryPasswordIsMatch = passwordField.value === passwordReEntryField.value;
  };

  const passwordReEntryFieldKeyupHandler = () => {
    checkReEntryPasswordsMatch();
    checkValidityForm();
  };
  passwordReEntryField.addEventListener('keyup', passwordReEntryFieldKeyupHandler);

  const passwordReEntryFieldBlurHandler = () => {
    checkForm(reEntryPasswordIsMatch, passwordReEntryField);
  };
  passwordReEntryField.addEventListener('blur', passwordReEntryFieldBlurHandler);

  // Consent
  const consentField = document.querySelector('.registration__agreement-input');

  const checkConsent = () => {
    userAgrees = consentField.checked;
  };

  const consentFieldChangeHandler = () => {
    checkConsent();
    checkValidityForm();
    allowRegistration();
  };

  consentField.addEventListener('change', consentFieldChangeHandler);

  // Registration
  const registrationButton = document.querySelector('.registration__button');

  const unlockButton = () => {
    registrationButton.classList.remove('button--disabled');
    registrationButton.disabled = false;
  };

  const blockButton = () => {
    registrationButton.classList.add('button--disabled');
    registrationButton.disabled = true;
  }

  const allowRegistration = () => {
    if (formIsValid) {
      unlockButton();
    } else {
      blockButton()
    }
  }

  const form = document.querySelector('.registration__form');

  const formKeyupHandler = () => {
    checkValidityForm();
    allowRegistration();
  }
  form.addEventListener('keyup', formKeyupHandler);
})();
