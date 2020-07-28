import checkNumInputs from './checkNumInputs';

const changeModalState = (state) => {

  const windowShape = document.querySelectorAll('.balcon_icons_img'),
    windowWidth = document.querySelector('#width'),
    windowHeight = document.querySelector('#height'),
    windowType = document.querySelector('#view_type'),
    windowProfile = document.querySelectorAll('.checkbox');

  checkNumInputs('#width');
  checkNumInputs('#height');

  function bindActionToElements(event, element, prop) {
    element.forEach((item, i) => {
      item.addEventListener(event, () => {
        state[prop] = i;
        console.log(state);
      });
    });
  }

  bindActionToElements('click', windowShape, 'form');

};

export default changeModalState;