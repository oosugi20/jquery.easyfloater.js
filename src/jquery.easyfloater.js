;(function ($, window, undefiend) {
'use script';

var MODULE_NAME = 'Easyfloater';
var PLUGIN_NAME = 'easyfloater';
var Module;


/**
 * Module
 */
Module = function (element, options) {
	this.el = element;
	this.$el = $(element);
	this.options = $.extend({
		slideInDuration: 200,
		slideOutDuration: 150,
		collisionY: 50
	}, options);
};

(function (fn) {
	/**
	 * init
	 */
	fn.init = function () {
		this.shift_y = this.$el.innerHeight() * -1;
		this._prepareElms();
		this._eventify();
		this.$el.css({ top: this.shift_y });
	};

	/**
	 * _prepareElms
	 */
	fn._prepareElms = function () {
	};

	/**
	 * _eventify
	 */
	fn._eventify = function () {
		var _this = this;
		$(window).on('load scroll', function () {
			if (_this.isCollision()) {
				_this.show();
			} else {
				_this.hide();
			}
		});
	};

	/**
	 * isCollision
	 * @return {Boolean}
	 */
	fn.isCollision = function () {
		var collision_y = this.options.collisionY;
		var scroll_top = $(window).scrollTop();
		return scroll_top >= collision_y;
	};

	/**
	 * show
	 */
	fn.show = function () {
		var duration = this.options.slideInDuration;
		if (this._state === 'showed') { return; }
		this.$el.show();
		this.$el.stop(true, false).animate({ top: 0 }, { duration: duration });
		this._state = 'showed';
	};

	/**
	 * hide
	 */
	fn.hide = function () {
		var duration = this.options.slideOutDuration;
		var shift_y = this.shift_y;
		if (this._state === 'hidden') { return; }
		this.$el.stop(true, false).animate({ top: shift_y }, {
			duration: duration,
			complete: function () {
				$(this).hide();
			}
		});
		this._state = 'hidden';
	};

})(Module.prototype);


// set jquery.fn
$.fn[PLUGIN_NAME] = function (options) {
	return this.each(function () {
		var module;
		if (!$.data(this, PLUGIN_NAME)) {
			module = new Module(this, options);
			$.data(this, PLUGIN_NAME, module);
			module.init();
		}
	});
};

// set global
$[MODULE_NAME] = Module;

})(jQuery, this);
