import $ from "../core";

$.prototype.animationOverTime = function (dur, cb, fin) {
  let timeStart;

  function _animationOverTime(time) {
    if (!timeStart) {
      timeStart = time;
    }
    let timeElapsed = time - timeStart;
    let complection = Math.min(timeElapsed / dur, 1);

    cb(complection);
    if (timeElapsed < dur) {
      requestAnimationFrame(_animationOverTime);
    } else {
      if (typeof fin === "function") {
        fin();
      }
    }
  }
  return _animationOverTime;
};
