export class Timer {
  constructor(options) {
    this.container = options.container;
    this.endDate = options.endDate;
  }

  init() {
    let container = document.querySelector(this.container);

    let endDateStr = `${this.endDate.year}-${this.endDate.month}-${this.endDate.day}T${this.endDate.hours}:${this.endDate.minutes}:${this.endDate.seconds}`;

    const timer = setInterval(() => {
      let date = new Date(endDateStr);
      let ms_left = date - Date.now();
      if (ms_left <= 0) {
        clearInterval(timer);

        container.innerHTML = "Время акции истекло";
      } else {
        let res = new Date(ms_left);

        let year = res.getUTCFullYear() - 1970 || "";
        let month = res.getUTCMonth() || "";
        let day = res.getUTCDate() - 1;
        let hour = res.getUTCHours();
        let minutes = res.getUTCMinutes();
        let second = res.getUTCSeconds();

        year = year.toString().slice(-2);
        month = month < 10 ? "0" + month : month;
        day = day < 10 ? "0" + day : day;
        hour = hour < 10 ? "0" + hour : hour;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        second = second < 10 ? "0" + second : second;
        container.innerHTML = `
          <span class="month"> ${month}</span>
          <span>/</span>
          <span class="days">${day}</span>
          <br>
					<span class="hours">${hour}</span>
					<span>:</span>
					<span class="minutes">${minutes}</span>
					<span>:</span>
					<span class="seconds">${second}</span>`;
      }
    }, 1000);
  }
}
