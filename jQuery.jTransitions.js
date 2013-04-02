(function ($) {
    var methods = {
        noEvents: false,

        init: function (options) {
            var config = $.extend({
                orientation: 'horizontal',
                duration: 300
            }, options);

            this.element
				.css({
				    position: 'absolute',
				    overflow: 'hidden'
				});

            //Follow resize events so we can refresh the alignments
			//$.resize($.proxy(this._onWindowResize, this));


            //this.refresh();
            this.element
			    .data('jTransitions.orientation', config.orientation)
				.data('jTransitions.duration', config.duration)
                .data('jTransitions.flushToLeft', config.flushToLeft)
                .data('jTransitions.flushToTop', config.flushToTop)
                .data('jTransitions.leftOffset', config.leftOffset)
                .data('jTransitions.callback', config.callback);

            this.refresh();

            return this.element;
        },

        next: function () {
            var active = this.active();

            if (active != null && active.length > 0 && !active.is(':last-child')) {
                return this.active(
					active.next()
				);
            }
        },

        prev: function () {
            var active = this.active();

            if (active != null && active.length > 0 && !active.is(':first-child')) {
                return this.active(
					active.prev()
				);
            }
        },

        refresh: function (noEvents) {
            this.noEvents = noEvents === true;
            this.element
				.children()
				.each(
				    $.proxy(this.alignElement, this)
				);

            var el = this.active();
            if (el.length == 0) {
                this.element
				    .children()
					.first()
					.attr('activeChild', 'true');
            }

            this.active(el);
            return this.element;
        },

        active: function (element) {
            var self = this,
                el = this.element
						 .children()
						 .filter(function () { return self.isActive(this); });

            if (!element || element.length == 0) return el;
            var destPos = this.destPos(element),
			    curPos = element.position();

            this.gotoPosition(
				'-=' + (this.flushToLeft() || (curPos.left - destPos.left)),
				'-=' + (this.flushToTop() || (curPos.top - destPos.top))
			);

            el.removeAttr('activeChild');
            return element.attr('activeChild', 'true');
        },


        /************************************
        *  Helper Methods
        ************************************/
        gotoPosition: function (left, top) {
            try {
                this.element
				    .children()
				    .clearQueue()
			        .animate({
			            top: top,
			            left: left
			        }, {
			            duration: this.duration
			        }).promise().done(this.callback());
            } catch (e) {
                $.debug(e);
            }
        },

        isActive: function (element) {
            return $(element).is('[activechild="true"]');
        },

        isVertical: function () {
            return this.orientation() == 'vertical';
        },

        duration: function (val) {
            return this.data('jTransitions.duration', val);
        },

        orientation: function (val) {
            return this.data('jTransitions.orientation', val);
        },

        flushToLeft: function (val) {
            return this.data('jTransitions.flushToLeft', val);
        },

        flushToTop: function (val) {
            return this.data('jTransitions.flushToTop', val);
        },

        leftOffset: function (val) {
            return this.data('jTransitions.leftOffset', val);
        },

        callback: function (val) {
            return this.noEvents ? $.noop : this.data('jTransitions.callback', val);
        },

        alignElement: function (idx, element) {
            var activeIndex = this.active().index(),
			    $element = $(element),
			    pos = this.destPos($element),
				vert = this.isVertical();

            if (activeIndex == -1) {
                activeIndex = 0;
            }

            $element.css({ margin: '0px' });

            if (this.isActive($element)) {
                $element.css(pos);
            } else {
                $element.css({
                    top: this.flushToTop() || (vert ? ((this.element.height() * (activeIndex + idx)) + pos.top) : pos.top),
                    left: this.flushToLeft() || (vert ? pos.left : ((this.element.width() * (activeIndex + idx)) + pos.left)),
                    position: 'absolute'
                });
            }
        },

        destPos: function (element) {
            return {
                top: /* this.flushToTop() || */ Math.max(0, this.element.height() / 2 - $(element).height() / 2),
                left: /* this.flushToLeft() || */ Math.max(0, this.element.width() / 2 - $(element).width() / 2) + this.leftOffset()
            };
        },

        data: function (key, val) {
            var args;

            if (val) (function () { args = arguments; })(key, val);
            else (function () { args = arguments; })(key);

            return this.element
                .data
                .apply(this.element, args);
        },

        //We are not in scope here
        _onWindowResize: function () {
            this.refresh();
        }
    };

    $.fn.jTransitions =
		function (method) {
		    var cls = function () { };
		    cls.prototype = methods;

		    cls = new cls();
		    cls.element = this;

		    // Method calling logic
		    if (cls[method]) {
		        return cls[method].apply(cls, Array.prototype.slice.call(arguments, 1));
		    } else if (typeof method === 'object' || !method) {
		        return cls.init.apply(cls, arguments);
		    } else {
		        $.error('Method ' + method + ' does not exist on jQuery.jTransitions');
		    }

		    return this;
		};
})(jQuery);