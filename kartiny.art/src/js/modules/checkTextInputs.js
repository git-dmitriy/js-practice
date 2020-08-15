/*
* модуль для проверки ввода исключительно на русском языке
*/

const checkTextInputs = (selector) => {
  const txtInputs = document.querySelectorAll(selector);
  txtInputs.forEach(input => {
    input.addEventListener('keypress', function(e){
      if (e.key.match(/[^а-яё 0-9]/igm)) {
        e.preventDefault();
      }
    });
  });

};

export default checkTextInputs;
