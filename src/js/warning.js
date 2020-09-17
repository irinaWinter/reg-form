// 'use strict';

// (function () {
//   const markAsErroneous = (field) => {
//     field.classList.add('registration__input--error');
//   };

//   const markAsCorrect = (field) => {
//     field.classList.remove('registration__input--error');
//   };

//   window.warning = {
//     markField: (fieldIsValid, field) => {
//       if (!fieldIsValid && fieldIsValid !== undefined) {
//         markAsErroneous(field);
//       } else {
//         markAsCorrect(field);
//       }
//     },

//     markRuleComplection: (rule, fieldIsValid) => {
//       if (fieldIsValid) {
//         if (rule.classList.contains('rules__item--error')) {
//           rule.classList.remove('rules__item--error');
//         }
//         rule.classList.add('rules__item--success');
//       } else if (rule.classList.contains('rules__item--success')) {
//         rule.classList.remove('rules__item--success');
//         rule.classList.add('rules__item--error');
//       }
//     }
//   };

//   const preventRepetition = () => {
//     const similarityRule = document.querySelector('.rules__item--similarity');

//     if ((!passwordDoesNotRepeatEmail && passwordDoesNotRepeatEmail !== undefined)
//       || !passwordDoesNotRepeatNickname  && passwordDoesNotRepeatNickname !== undefined) {
//       similarityRule.classList.add('rules__item--error');
//     } else {
//       similarityRule.classList.remove('rules__item--error');
//     }
//   };

//   window.warning = {

//   }
// })();
