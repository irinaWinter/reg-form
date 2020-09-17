'use strict';

(function () {
  window.util = {
    regFormBox: document.querySelector('.page-main__registration'),
    regForm: document.querySelector('.registration__form'),
    hide: (elem) => {
      elem.classList.add('hidden');
    },
    show: (elem) => {
      elem.classList.remove('hidden');
    },
    setDefaultPageState: () => {
      window.util.regForm.reset();
      window.util.hide(window.util.regFormBox);
      window.util.show(window.form.showRegFormButton);
    }
  }
})();
