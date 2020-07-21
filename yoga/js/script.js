window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  let tab = document.querySelectorAll('.info-header-tab'),
    info = document.querySelector('.info-header'),
    tabContent = document.querySelectorAll('.info-tab-content');

  function hideTabContent(a) {
    for (let i = a; i < tabContent.length; i++) {
      tabContent[i].classList.remove('show');
      tabContent[i].classList.add('hide');
    }
  }
  hideTabContent(1);

  function showTabContent(element) {
    if (tabContent[element].classList.contains('hide')) {
      tabContent[element].classList.remove('hide');
      tabContent[element].classList.add('show');
    }
  }
  info.addEventListener('click', function (event) {
    let target = event.target;
    if (target && target.classList.contains('info-header-tab')) {
      for (let i = 0; i < tab.length; i++) {
        if (target == tab[i]) {
          hideTabContent(0);
          showTabContent(i);
          break;
        }
      }
    }
  });


  //  timer
  let deadline = '2020-09-21T00:00:00';

  function getTimeRemaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date()),
      seconds = ('00' + Math.floor((t % (1000 * 60)) / 1000)).slice(-2), // 1000 ms == 1s
      minutes = ('00' + Math.floor((t % (1000 * 60 * 60)) / (1000 * 60))).slice(-2),
      hours = ('00' + Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).slice(-2), // 3 600s == 60m == 1h
      days = ('00' + Math.floor(t / (1000 * 60 * 60 * 24))).slice(-2); // 24h == 1 440m == 1d

    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };

  }

  function setClock(id, endtime) {
    let timer = document.getElementById(id),
      days = document.querySelector('.days'),
      hours = document.querySelector('.hours'),
      minutes = document.querySelector('.minutes'),
      seconds = document.querySelector('.seconds'),
      timeInterval = setInterval(updateClock, 1000);

    function updateClock() {
      let t = getTimeRemaining(endtime);
      days.textContent = t.days;
      hours.textContent = t.hours;
      minutes.textContent = t.minutes;
      seconds.textContent = t.seconds;

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }
  setClock('timer', deadline);



});