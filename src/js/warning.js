'use strict';

(function () {
  const markAsErroneous = (field) => {
    field.classList.add('registration__input--error');
  };

  const markAsCorrect = (field) => {
    field.classList.remove('registration__input--error');
  };

  window.warning = {
    markField: (fieldIsValid, field) => {
      if (!fieldIsValid && fieldIsValid !== undefined) {
        markAsErroneous(field);
      } else {
        markAsCorrect(field);
      }
    },
    showWarningText: (fieldIsValid, text) => {
      if (!fieldIsValid) {
        text.classList.remove('hidden');
      }
    },
    hideWarningText: (fieldIsValid, text) => {
      if (fieldIsValid) {
        text.classList.add('hidden');
      }
    },
    markRuleComplection: (rule, fieldIsValid) => {
      if (fieldIsValid) {
        if (rule.classList.contains('rules__item--error')) {
          rule.classList.remove('rules__item--error');
        }
        rule.classList.add('rules__item--success');
      } else if (rule.classList.contains('rules__item--success')) {
        rule.classList.remove('rules__item--success');
        rule.classList.add('rules__item--error');
      }
    }
  };
})();
