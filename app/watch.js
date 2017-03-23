/*jshint esversion: 6 */

;(function(){

	const DEFAULT_TIMEZONE = 'Europe/London';

	function Watch(element, timezone=DEFAULT_TIMEZONE) {
		this._timezone = timezone;

		this._createWrappers(element);
		this._createArrows();
		this._createLabels();

		this._runWatch();
	}

	window.Watch = Watch;

	Watch.prototype._createWrappers = function(element) {
		this._watch 								= createDiv(element, 'watch_default');
		this._lineLabelsWrapper 		= createDiv(this._watch, 'labels');
		this._boldLineLabelsWrapper = createDiv(this._watch, 'bold-labels');
		this._numericLabelsWrapper 	= createDiv(this._watch, 'numeric-labels');
		this._arrowsWrapper 				= createDiv(this._watch, 'arrows');
	};

	Watch.prototype._createArrows = function() {
		this._hourArrow 	= createDiv(this._arrowsWrapper, 'watch__hour-arrow');
		this._minuteArrow = createDiv(this._arrowsWrapper, 'watch__minute-arrow');
		this._secondArrow = createDiv(this._arrowsWrapper, 'watch__second-arrow');

		



	};

	Watch.prototype._createLabels = function() {
		createSeveralDivs(this._lineLabelsWrapper, 'watch__line-label', 60);
		createSeveralDivs(this._boldLineLabelsWrapper, 'watch__line-label_bold', 12);
		createSeveralDivs(this._numericLabelsWrapper, 'watch__numeric-label', 12);
	};

	Watch.prototype._runWatch = function() {
		setInterval( function() {

			const datetime = moment.tz(moment().format(), this._timezone);

			let hours = datetime.hours(); // 0...23
			hours = hours > 12 ? hours - 12 : hours; // 0...12
			let minutes = datetime.minute(); // 0...59
			let seconds = datetime.second(); // 0...59

			let rotateHourArrow = hours * 30 + minutes * 0.5 + seconds * 0.0083;
			let rotateMinuteArrow = minutes * 6 + seconds * 0.1;
			let rotateSecondArrow = seconds * 6;

			this._hourArrow.style.transform = `rotate(${rotateHourArrow}deg)`;
			this._minuteArrow.style.transform = `rotate(${rotateMinuteArrow}deg)`;

			TweenLite.to(this._secondArrow, 0.3, { 
				ease: Elastic.easeOut.config(1.2, 0.75),
				rotation: rotateSecondArrow
			});

		}.bind(this), 1000);
	};




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