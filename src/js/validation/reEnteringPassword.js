'use strict';

import '../validation'
import '../form'
import '../warning'

(function () {
  window.checkReEntryPasswordsMatch = () => {
    window.validation.isValid.reEntryPassword = window.form.field.password.value === window.form.field.passwordReEntry.value;
  };

  const passwordReEntryFieldKeyupHandler = () => {
    window.checkReEntryPasswordsMatch();
    window.warning.hideWarningText(window.validation.isValid.reEntryPassword, window.warning.text.reEntryPassword);
  };
  window.form.field.passwordReEntry.addEventListener('keyup', passwordReEntryFieldKeyupHandler);

  const passwordReEntryFieldBlurHandler = () => {
    window.warning.markField(window.validation.isValid.reEntryPassword, window.form.field.passwordReEntry);
    window.warning.showWarningText(window.validation.isValid.reEntryPassword, window.warning.text.reEntryPassword);
  };
  window.form.field.passwordReEntry.addEventListener('blur', passwordReEntryFieldBlurHandler);
})();
