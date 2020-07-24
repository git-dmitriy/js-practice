const modals = () => {
  function bindModal(trigger, modal, close) {
    trigger.addEventListener('click', (e) => {
      if (e.target) {
        e.preventDefault();
      }
      modal.style.display = 'block';
      document.body.overflow = 'hidden';
    });
    close.addEventListener('click', () => {
      modal.style.display = 'none';
      document.body.overflow = '';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
        document.body.overflow = '';
      }
    });

  }

  const callEngineerBtn = document.querySelector('.popup_engineer_btn'),
    modalEngineer = document.querySelector('.popup_engineer'),
    modalEngineerclose = document.querySelector('.popup_engineer .popup_close');

  bindModal(callEngineerBtn, modalEngineer, modalEngineerclose);
};

export default modals;