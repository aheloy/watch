
; (function () {

  const DEFAULT_TIMEZONE = 'Europe/London';

  function Watch(element, timezone = DEFAULT_TIMEZONE) {
    this._timezone = timezone;
    this._calcRotationCount = 0;

    this._createWrappers(element);
    this._createArrows();
    this._createLabels();

    this._runWatch();
  }



  Watch.prototype._createWrappers = function (element) {
    this._watch = createDiv(element, 'watch_default');
    this._lineLabelsWrapper = createDiv(this._watch, 'labels');
    this._boldLineLabelsWrapper = createDiv(this._watch, 'bold-labels');
    this._numericLabelsWrapper = createDiv(this._watch, 'numeric-labels');
    this._arrowsWrapper = createDiv(this._watch, 'arrows');
  };



  Watch.prototype._createArrows = function () {
    this._hourArrow = createDiv(this._arrowsWrapper, 'watch__hour-arrow');
    this._minuteArrow = createDiv(this._arrowsWrapper, 'watch__minute-arrow');
    this._secondArrow = createDiv(this._arrowsWrapper, 'watch__second-arrow');
  };



  Watch.prototype._createLabels = function () {
    createSeveralDivs(this._lineLabelsWrapper, 'watch__line-label', 60);
    createSeveralDivs(this._boldLineLabelsWrapper, 'watch__line-label_bold', 12);
    createSeveralDivs(this._numericLabelsWrapper, 'watch__numeric-label', 12);
  };



  Watch.prototype._runWatch = function () {
    setInterval(function () {
      this._syncTime();
      this._calcRotation();

      this._hourArrow.style.transform = `rotate(${this._rotateHourArrow}deg)`;
      this._minuteArrow.style.transform = `rotate(${this._rotateMinuteArrow}deg)`;

      TweenLite.to(this._secondArrow, 0.3, {
        ease: Elastic.easeOut.config(1.2, 0.75),
        rotation: this._rotateSecondArrow
      });

    }.bind(this), 1000);
  };



  Watch.prototype._calcRotation = function () {
    this._rotateHourArrow = this._hours * 30 + this._minutes * 0.5 + this._seconds * 0.0083;
    this._rotateMinuteArrow = this._minutes * 6 + this._seconds * 0.1;
    if (this._calcRotationCount) {
      this._rotateSecondArrow += 6;
    } else {
      this._rotateSecondArrow = this._seconds * 6;
    }

    this._calcRotationCount++;
  }



  Watch.prototype._syncTime = function () {
    const datetime = moment.tz(moment().format(), this._timezone);
    this._seconds = datetime.second();
    this._minutes = datetime.minute();
    this._hours = datetime.hours();
  }



  window.Watch = Watch;



  function createDiv(parent, className) {
    let elem = document.createElement('div');
    elem.className = className;
    return parent.appendChild(elem);
  }

  function createSeveralDivs(parent, className, number) {
    let content = ('<div class="' + className + '"></div>').repeat(number);
    parent.insertAdjacentHTML('beforeEnd', content);
  }

})();