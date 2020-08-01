import checkNumInputs from './checkNumInputs';

const forms = (state) => {
  const form = document.querySelectorAll('form'),
    inputs = document.querySelectorAll('input');

  checkNumInputs('input[name="user_phone');

  const message = {
    loading: 'Загрузка...',
    success: 'Спасибо, мы скоро свяжемся с вами',
    failure: 'Что-то пошло не так...'
  };

  const postData = async (url, data) => {
    document.querySelector('.status').textContent = message.loading;
    let res = await fetch(url, {
      method: 'POST',
      body: data
    });
    return await res.text();
  };

  const clearInputs = () => {
    inputs.forEach(item => {
      item.value = '';
    });
  };

  const clearFormData = (formData) => {
    for (let key in state) {
      delete state[key];
    }
  };

  form.forEach(item => {
    item.addEventListener('submit', (e) => {
      e.preventDefault();

      let statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      item.appendChild(statusMessage);

      const formData = new FormData(item);

      if (item.getAttribute('data-calc') === 'end') {
        for (let key in state) {
          formData.append(key, state[key]);
        }
      }
      postData('assets/server.php', formData)
        .then(res => {
          console.log(res);
          statusMessage.textContent = message.success;
        })
        .catch((e) => {
          statusMessage.textContent = message.failure;
          console.log(e);
        })
        .finally(() => {
          clearInputs();
          clearFormData(formData);
          setTimeout(() => {
            statusMessage.remove();
          }, 5000);
        });
    });
  });

  clearFormData(state);
};

export default forms;