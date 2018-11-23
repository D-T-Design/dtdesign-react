/*!
 * Bootstrap v3.3.2 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
if (typeof jQuery === 'undefined') {
    throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+

function($) {
    'use strict';
    var version = $.fn.jquery.split(' ')[0].split('.')
    if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1)) {
        throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher')
    }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.2
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+

function($) {
    'use strict';

    // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
    // ============================================================

    function transitionEnd() {
        var el = document.createElement('bootstrap')

        var transEndEventNames = {
            WebkitTransition: 'webkitTransitionEnd',
            MozTransition: 'transitionend',
            OTransition: 'oTransitionEnd otransitionend',
            transition: 'transitionend'
        }

        for (var name in transEndEventNames) {
            if (el.style[name] !== undefined) {
                return {
                    end: transEndEventNames[name]
                }
            }
        }

        return false // explicit for ie8 (  ._.)
    }

    // http://blog.alexmaccaw.com/css-transitions
    $.fn.emulateTransitionEnd = function(duration) {
        var called = false
        var $el = this
        $(this).one('bsTransitionEnd', function() {
            called = true
        })
        var callback = function() {
            if (!called) $($el).trigger($.support.transition.end)
        }
        setTimeout(callback, duration)
        return this
    }

    $(function() {
        $.support.transition = transitionEnd()

        if (!$.support.transition) return

        $.event.special.bsTransitionEnd = {
            bindType: $.support.transition.end,
            delegateType: $.support.transition.end,
            handle: function(e) {
                if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
            }
        }
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.2
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+

function($) {
    'use strict';

    // ALERT CLASS DEFINITION
    // ======================

    var dismiss = '[data-dismiss="alert"]'
    var Alert = function(el) {
        $(el).on('click', dismiss, this.close)
    }

    Alert.VERSION = '3.3.2'

    Alert.TRANSITION_DURATION = 150

    Alert.prototype.close = function(e) {
        var $this = $(this)
        var selector = $this.attr('data-target')

        if (!selector) {
            selector = $this.attr('href')
            selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
        }

        var $parent = $(selector)

        if (e) e.preventDefault()

        if (!$parent.length) {
            $parent = $this.closest('.alert')
        }

        $parent.trigger(e = $.Event('close.bs.alert'))

        if (e.isDefaultPrevented()) return

        $parent.removeClass('in')

        function removeElement() {
            // detach from parent, fire event then clean up data
            $parent.detach().trigger('closed.bs.alert').remove()
        }

        $.support.transition && $parent.hasClass('fade') ?
            $parent
            .one('bsTransitionEnd', removeElement)
            .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
            removeElement()
    }


    // ALERT PLUGIN DEFINITION
    // =======================

    function Plugin(option) {
        return this.each(function() {
            var $this = $(this)
            var data = $this.data('bs.alert')

            if (!data) $this.data('bs.alert', (data = new Alert(this)))
            if (typeof option == 'string') data[option].call($this)
        })
    }

    var old = $.fn.alert

    $.fn.alert = Plugin
    $.fn.alert.Constructor = Alert


    // ALERT NO CONFLICT
    // =================

    $.fn.alert.noConflict = function() {
        $.fn.alert = old
        return this
    }


    // ALERT DATA-API
    // ==============

    $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.2
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+

function($) {
    'use strict';

    // BUTTON PUBLIC CLASS DEFINITION
    // ==============================

    var Button = function(element, options) {
        this.$element = $(element)
        this.options = $.extend({}, Button.DEFAULTS, options)
        this.isLoading = false
    }

    Button.VERSION = '3.3.2'

    Button.DEFAULTS = {
        loadingText: 'loading...'
    }

    Button.prototype.setState = function(state) {
        var d = 'disabled'
        var $el = this.$element
        var val = $el.is('input') ? 'val' : 'html'
        var data = $el.data()

        state = state + 'Text'

        if (data.resetText == null) $el.data('resetText', $el[val]())

        // push to event loop to allow forms to submit
        setTimeout($.proxy(function() {
            $el[val](data[state] == null ? this.options[state] : data[state])

            if (state == 'loadingText') {
                this.isLoading = true
                $el.addClass(d).attr(d, d)
            } else if (this.isLoading) {
                this.isLoading = false
                $el.removeClass(d).removeAttr(d)
            }
        }, this), 0)
    }

    Button.prototype.toggle = function() {
        var changed = true
        var $parent = this.$element.closest('[data-toggle="buttons"]')

        if ($parent.length) {
            var $input = this.$element.find('input')
            if ($input.prop('type') == 'radio') {
                if ($input.prop('checked') && this.$element.hasClass('active')) changed = false
                else $parent.find('.active').removeClass('active')
            }
            if (changed) $input.prop('checked', !this.$element.hasClass('active')).trigger('change')
        } else {
            this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
        }

        if (changed) this.$element.toggleClass('active')
    }


    // BUTTON PLUGIN DEFINITION
    // ========================

    function Plugin(option) {
        return this.each(function() {
            var $this = $(this)
            var data = $this.data('bs.button')
            var options = typeof option == 'object' && option

            if (!data) $this.data('bs.button', (data = new Button(this, options)))

            if (option == 'toggle') data.toggle()
            else if (option) data.setState(option)
        })
    }

    var old = $.fn.button

    $.fn.button = Plugin
    $.fn.button.Constructor = Button


    // BUTTON NO CONFLICT
    // ==================

    $.fn.button.noConflict = function() {
        $.fn.button = old
        return this
    }


    // BUTTON DATA-API
    // ===============

    $(document)
        .on('click.bs.button.data-api', '[data-toggle^="button"]', function(e) {
            var $btn = $(e.target)
            if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
            Plugin.call($btn, 'toggle')
            e.preventDefault()
        })
        .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function(e) {
            $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
        })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.2
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+

function($) {
    'use strict';

    // CAROUSEL CLASS DEFINITION
    // =========================

    var Carousel = function(element, options) {
        this.$element = $(element)
        this.$indicators = this.$element.find('.carousel-indicators')
        this.options = options
        this.paused =
            this.sliding =
            this.interval =
            this.$active =
            this.$items = null

        this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

        this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
            .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
            .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
    }

    Carousel.VERSION = '3.3.2'

    Carousel.TRANSITION_DURATION = 600

    Carousel.DEFAULTS = {
        interval: 5000,
        pause: 'hover',
        wrap: true,
        keyboard: true
    }

    Carousel.prototype.keydown = function(e) {
        if (/input|textarea/i.test(e.target.tagName)) return
        switch (e.which) {
            case 37:
                this.prev();
                break
            case 39:
                this.next();
                break
            default:
                return
        }

        e.preventDefault()
    }

    Carousel.prototype.cycle = function(e) {
        e || (this.paused = false)

        this.interval && clearInterval(this.interval)

        this.options.interval &&
            !this.paused &&
            (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

        return this
    }

    Carousel.prototype.getItemIndex = function(item) {
        this.$items = item.parent().children('.item')
        return this.$items.index(item || this.$active)
    }

    Carousel.prototype.getItemForDirection = function(direction, active) {
        var activeIndex = this.getItemIndex(active)
        var willWrap = (direction == 'prev' && activeIndex === 0) ||
            (direction == 'next' && activeIndex == (this.$items.length - 1))
        if (willWrap && !this.options.wrap) return active
        var delta = direction == 'prev' ? -1 : 1
        var itemIndex = (activeIndex + delta) % this.$items.length
        return this.$items.eq(itemIndex)
    }

    Carousel.prototype.to = function(pos) {
        var that = this
        var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

        if (pos > (this.$items.length - 1) || pos < 0) return

        if (this.sliding) return this.$element.one('slid.bs.carousel', function() {
                that.to(pos)
            }) // yes, "slid"
        if (activeIndex == pos) return this.pause().cycle()

        return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
    }

    Carousel.prototype.pause = function(e) {
        e || (this.paused = true)

        if (this.$element.find('.next, .prev').length && $.support.transition) {
            this.$element.trigger($.support.transition.end)
            this.cycle(true)
        }

        this.interval = clearInterval(this.interval)

        return this
    }

    Carousel.prototype.next = function() {
        if (this.sliding) return
        return this.slide('next')
    }

    Carousel.prototype.prev = function() {
        if (this.sliding) return
        return this.slide('prev')
    }

    Carousel.prototype.slide = function(type, next) {
        var $active = this.$element.find('.item.active')
        var $next = next || this.getItemForDirection(type, $active)
        var isCycling = this.interval
        var direction = type == 'next' ? 'left' : 'right'
        var that = this

        if ($next.hasClass('active')) return (this.sliding = false)

        var relatedTarget = $next[0]
        var slideEvent = $.Event('slide.bs.carousel', {
            relatedTarget: relatedTarget,
            direction: direction
        })
        this.$element.trigger(slideEvent)
        if (slideEvent.isDefaultPrevented()) return

        this.sliding = true

        isCycling && this.pause()

        if (this.$indicators.length) {
            this.$indicators.find('.active').removeClass('active')
            var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
            $nextIndicator && $nextIndicator.addClass('active')
        }

        var slidEvent = $.Event('slid.bs.carousel', {
                relatedTarget: relatedTarget,
                direction: direction
            }) // yes, "slid"
        if ($.support.transition && this.$element.hasClass('slide')) {
            $next.addClass(type)
            $next[0].offsetWidth // force reflow
            $active.addClass(direction)
            $next.addClass(direction)
            $active
                .one('bsTransitionEnd', function() {
                    $next.removeClass([type, direction].join(' ')).addClass('active')
                    $active.removeClass(['active', direction].join(' '))
                    that.sliding = false
                    setTimeout(function() {
                        that.$element.trigger(slidEvent)
                    }, 0)
                })
                .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
        } else {
            $active.removeClass('active')
            $next.addClass('active')
            this.sliding = false
            this.$element.trigger(slidEvent)
        }

        isCycling && this.cycle()

        return this
    }


    // CAROUSEL PLUGIN DEFINITION
    // ==========================

    function Plugin(option) {
        return this.each(function() {
            var $this = $(this)
            var data = $this.data('bs.carousel')
            var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
            var action = typeof option == 'string' ? option : options.slide

            if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
            if (typeof option == 'number') data.to(option)
            else if (action) data[action]()
            else if (options.interval) data.pause().cycle()
        })
    }

    var old = $.fn.carousel

    $.fn.carousel = Plugin
    $.fn.carousel.Constructor = Carousel


    // CAROUSEL NO CONFLICT
    // ====================

    $.fn.carousel.noConflict = function() {
        $.fn.carousel = old
        return this
    }


    // CAROUSEL DATA-API
    // =================

    var clickHandler = function(e) {
        var href
        var $this = $(this)
        var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
        if (!$target.hasClass('carousel')) return
        var options = $.extend({}, $target.data(), $this.data())
        var slideIndex = $this.attr('data-slide-to')
        if (slideIndex) options.interval = false

        Plugin.call($target, options)

        if (slideIndex) {
            $target.data('bs.carousel').to(slideIndex)
        }

        e.preventDefault()
    }

    $(document)
        .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
        .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

    $(window).on('load', function() {
        $('[data-ride="carousel"]').each(function() {
            var $carousel = $(this)
            Plugin.call($carousel, $carousel.data())
        })
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.2
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+

function($) {
    'use strict';

    // COLLAPSE PUBLIC CLASS DEFINITION
    // ================================

    var Collapse = function(element, options) {
        this.$element = $(element)
        this.options = $.extend({}, Collapse.DEFAULTS, options)
        this.$trigger = $(this.options.trigger).filter('[href="#' + element.id + '"], [data-target="#' + element.id + '"]')
        this.transitioning = null

        if (this.options.parent) {
            this.$parent = this.getParent()
        } else {
            this.addAriaAndCollapsedClass(this.$element, this.$trigger)
        }

        if (this.options.toggle) this.toggle()
    }

    Collapse.VERSION = '3.3.2'

    Collapse.TRANSITION_DURATION = 350

    Collapse.DEFAULTS = {
        toggle: true,
        trigger: '[data-toggle="collapse"]'
    }

    Collapse.prototype.dimension = function() {
        var hasWidth = this.$element.hasClass('width')
        return hasWidth ? 'width' : 'height'
    }

    Collapse.prototype.show = function() {
        if (this.transitioning || this.$element.hasClass('in')) return

        var activesData
        var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

        if (actives && actives.length) {
            activesData = actives.data('bs.collapse')
            if (activesData && activesData.transitioning) return
        }

        var startEvent = $.Event('show.bs.collapse')
        this.$element.trigger(startEvent)
        if (startEvent.isDefaultPrevented()) return

        if (actives && actives.length) {
            Plugin.call(actives, 'hide')
            activesData || actives.data('bs.collapse', null)
        }

        var dimension = this.dimension()

        this.$element
            .removeClass('collapse')
            .addClass('collapsing')[dimension](0)
            .attr('aria-expanded', true)

        this.$trigger
            .removeClass('collapsed')
            .attr('aria-expanded', true)

        this.transitioning = 1

        var complete = function() {
            this.$element
                .removeClass('collapsing')
                .addClass('collapse in')[dimension]('')
            this.transitioning = 0
            this.$element
                .trigger('shown.bs.collapse')
        }

        if (!$.support.transition) return complete.call(this)

        var scrollSize = $.camelCase(['scroll', dimension].join('-'))

        this.$element
            .one('bsTransitionEnd', $.proxy(complete, this))
            .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
    }

    Collapse.prototype.hide = function() {
        if (this.transitioning || !this.$element.hasClass('in')) return

        var startEvent = $.Event('hide.bs.collapse')
        this.$element.trigger(startEvent)
        if (startEvent.isDefaultPrevented()) return

        var dimension = this.dimension()

        this.$element[dimension](this.$element[dimension]())[0].offsetHeight

        this.$element
            .addClass('collapsing')
            .removeClass('collapse in')
            .attr('aria-expanded', false)

        this.$trigger
            .addClass('collapsed')
            .attr('aria-expanded', false)

        this.transitioning = 1

        var complete = function() {
            this.transitioning = 0
            this.$element
                .removeClass('collapsing')
                .addClass('collapse')
                .trigger('hidden.bs.collapse')
        }

        if (!$.support.transition) return complete.call(this)

        this.$element[dimension](0)
            .one('bsTransitionEnd', $.proxy(complete, this))
            .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
    }

    Collapse.prototype.toggle = function() {
        this[this.$element.hasClass('in') ? 'hide' : 'show']()
    }

    Collapse.prototype.getParent = function() {
        return $(this.options.parent)
            .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
            .each($.proxy(function(i, element) {
                var $element = $(element)
                this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
            }, this))
            .end()
    }

    Collapse.prototype.addAriaAndCollapsedClass = function($element, $trigger) {
        var isOpen = $element.hasClass('in')

        $element.attr('aria-expanded', isOpen)
        $trigger
            .toggleClass('collapsed', !isOpen)
            .attr('aria-expanded', isOpen)
    }

    function getTargetFromTrigger($trigger) {
        var href
        var target = $trigger.attr('data-target') ||
            (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

        return $(target)
    }


    // COLLAPSE PLUGIN DEFINITION
    // ==========================

    function Plugin(option) {
        return this.each(function() {
            var $this = $(this)
            var data = $this.data('bs.collapse')
            var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

            if (!data && options.toggle && option == 'show') options.toggle = false
            if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
            if (typeof option == 'string') data[option]()
        })
    }

    var old = $.fn.collapse

    $.fn.collapse = Plugin
    $.fn.collapse.Constructor = Collapse


    // COLLAPSE NO CONFLICT
    // ====================

    $.fn.collapse.noConflict = function() {
        $.fn.collapse = old
        return this
    }


    // COLLAPSE DATA-API
    // =================

    $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function(e) {
        var $this = $(this)

        if (!$this.attr('data-target')) e.preventDefault()

        var $target = getTargetFromTrigger($this)
        var data = $target.data('bs.collapse')
        var option = data ? 'toggle' : $.extend({}, $this.data(), {
            trigger: this
        })

        Plugin.call($target, option)
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.2
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+

function($) {
    'use strict';

    // DROPDOWN CLASS DEFINITION
    // =========================

    var backdrop = '.dropdown-backdrop'
    var toggle = '[data-toggle="dropdown"]'
    var Dropdown = function(element) {
        $(element).on('click.bs.dropdown', this.toggle)
    }

    Dropdown.VERSION = '3.3.2'

    Dropdown.prototype.toggle = function(e) {
        var $this = $(this)

        if ($this.is('.disabled, :disabled')) return

        var $parent = getParent($this)
        var isActive = $parent.hasClass('open')

        clearMenus()

        if (!isActive) {
            if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
                // if mobile we use a backdrop because click events don't delegate
                $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
            }

            var relatedTarget = {
                relatedTarget: this
            }
            $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

            if (e.isDefaultPrevented()) return

            $this
                .trigger('focus')
                .attr('aria-expanded', 'true')

            $parent
                .toggleClass('open')
                .trigger('shown.bs.dropdown', relatedTarget)
        }

        return false
    }

    Dropdown.prototype.keydown = function(e) {
        if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

        var $this = $(this)

        e.preventDefault()
        e.stopPropagation()

        if ($this.is('.disabled, :disabled')) return

        var $parent = getParent($this)
        var isActive = $parent.hasClass('open')

        if ((!isActive && e.which != 27) || (isActive && e.which == 27)) {
            if (e.which == 27) $parent.find(toggle).trigger('focus')
            return $this.trigger('click')
        }

        var desc = ' li:not(.divider):visible a'
        var $items = $parent.find('[role="menu"]' + desc + ', [role="listbox"]' + desc)

        if (!$items.length) return

        var index = $items.index(e.target)

        if (e.which == 38 && index > 0) index-- // up
            if (e.which == 40 && index < $items.length - 1) index++ // down
                if (!~index) index = 0

        $items.eq(index).trigger('focus')
    }

    function clearMenus(e) {
        if (e && e.which === 3) return
        $(backdrop).remove()
        $(toggle).each(function() {
            var $this = $(this)
            var $parent = getParent($this)
            var relatedTarget = {
                relatedTarget: this
            }

            if (!$parent.hasClass('open')) return

            $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

            if (e.isDefaultPrevented()) return

            $this.attr('aria-expanded', 'false')
            $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget)
        })
    }

    function getParent($this) {
        var selector = $this.attr('data-target')

        if (!selector) {
            selector = $this.attr('href')
            selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
        }

        var $parent = selector && $(selector)

        return $parent && $parent.length ? $parent : $this.parent()
    }


    // DROPDOWN PLUGIN DEFINITION
    // ==========================

    function Plugin(option) {
        return this.each(function() {
            var $this = $(this)
            var data = $this.data('bs.dropdown')

            if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
            if (typeof option == 'string') data[option].call($this)
        })
    }

    var old = $.fn.dropdown

    $.fn.dropdown = Plugin
    $.fn.dropdown.Constructor = Dropdown


    // DROPDOWN NO CONFLICT
    // ====================

    $.fn.dropdown.noConflict = function() {
        $.fn.dropdown = old
        return this
    }


    // APPLY TO STANDARD DROPDOWN ELEMENTS
    // ===================================

    $(document)
        .on('click.bs.dropdown.data-api', clearMenus)
        .on('click.bs.dropdown.data-api', '.dropdown form', function(e) {
            e.stopPropagation()
        })
        .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
        .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
        .on('keydown.bs.dropdown.data-api', '[role="menu"]', Dropdown.prototype.keydown)
        .on('keydown.bs.dropdown.data-api', '[role="listbox"]', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.2
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+

function($) {
    'use strict';

    // MODAL CLASS DEFINITION
    // ======================

    var Modal = function(element, options) {
        this.options = options
        this.$body = $(document.body)
        this.$element = $(element)
        this.$backdrop =
            this.isShown = null
        this.scrollbarWidth = 0

        if (this.options.remote) {
            this.$element
                .find('.modal-content')
                .load(this.options.remote, $.proxy(function() {
                    this.$element.trigger('loaded.bs.modal')
                }, this))
        }
    }

    Modal.VERSION = '3.3.2'

    Modal.TRANSITION_DURATION = 300
    Modal.BACKDROP_TRANSITION_DURATION = 150

    Modal.DEFAULTS = {
        backdrop: true,
        keyboard: true,
        show: true
    }

    Modal.prototype.toggle = function(_relatedTarget) {
        return this.isShown ? this.hide() : this.show(_relatedTarget)
    }

    Modal.prototype.show = function(_relatedTarget) {
        var that = this
        var e = $.Event('show.bs.modal', {
            relatedTarget: _relatedTarget
        })

        this.$element.trigger(e)

        if (this.isShown || e.isDefaultPrevented()) return

        this.isShown = true

        this.checkScrollbar()
        this.setScrollbar()
        this.$body.addClass('modal-open')

        this.escape()
        this.resize()

        this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

        this.backdrop(function() {
            var transition = $.support.transition && that.$element.hasClass('fade')

            if (!that.$element.parent().length) {
                that.$element.appendTo(that.$body) // don't move modals dom position
            }

            that.$element
                .show()
                .scrollTop(0)

            if (that.options.backdrop) that.adjustBackdrop()
            that.adjustDialog()

            if (transition) {
                that.$element[0].offsetWidth // force reflow
            }

            that.$element
                .addClass('in')
                .attr('aria-hidden', false)

            that.enforceFocus()

            var e = $.Event('shown.bs.modal', {
                relatedTarget: _relatedTarget
            })

            transition ?
                that.$element.find('.modal-dialog') // wait for modal to slide in
                .one('bsTransitionEnd', function() {
                    that.$element.trigger('focus').trigger(e)
                })
                .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
                that.$element.trigger('focus').trigger(e)
        })
    }

    Modal.prototype.hide = function(e) {
        if (e) e.preventDefault()

        e = $.Event('hide.bs.modal')

        this.$element.trigger(e)

        if (!this.isShown || e.isDefaultPrevented()) return

        this.isShown = false

        this.escape()
        this.resize()

        $(document).off('focusin.bs.modal')

        this.$element
            .removeClass('in')
            .attr('aria-hidden', true)
            .off('click.dismiss.bs.modal')

        $.support.transition && this.$element.hasClass('fade') ?
            this.$element
            .one('bsTransitionEnd', $.proxy(this.hideModal, this))
            .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
            this.hideModal()
    }

    Modal.prototype.enforceFocus = function() {
        $(document)
            .off('focusin.bs.modal') // guard against infinite focus loop
            .on('focusin.bs.modal', $.proxy(function(e) {
                if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
                    this.$element.trigger('focus')
                }
            }, this))
    }

    Modal.prototype.escape = function() {
        if (this.isShown && this.options.keyboard) {
            this.$element.on('keydown.dismiss.bs.modal', $.proxy(function(e) {
                e.which == 27 && this.hide()
            }, this))
        } else if (!this.isShown) {
            this.$element.off('keydown.dismiss.bs.modal')
        }
    }

    Modal.prototype.resize = function() {
        if (this.isShown) {
            $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
        } else {
            $(window).off('resize.bs.modal')
        }
    }

    Modal.prototype.hideModal = function() {
        var that = this
        this.$element.hide()
        this.backdrop(function() {
            that.$body.removeClass('modal-open')
            that.resetAdjustments()
            that.resetScrollbar()
            that.$element.trigger('hidden.bs.modal')
        })
    }

    Modal.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove()
        this.$backdrop = null
    }

    Modal.prototype.backdrop = function(callback) {
        var that = this
        var animate = this.$element.hasClass('fade') ? 'fade' : ''

        if (this.isShown && this.options.backdrop) {
            var doAnimate = $.support.transition && animate

            this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
                .prependTo(this.$element)
                .on('click.dismiss.bs.modal', $.proxy(function(e) {
                    if (e.target !== e.currentTarget) return
                    this.options.backdrop == 'static' ?
                        this.$element[0].focus.call(this.$element[0]) :
                        this.hide.call(this)
                }, this))

            if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

            this.$backdrop.addClass('in')

            if (!callback) return

            doAnimate ?
                this.$backdrop
                .one('bsTransitionEnd', callback)
                .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
                callback()

        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass('in')

            var callbackRemove = function() {
                that.removeBackdrop()
                callback && callback()
            }
            $.support.transition && this.$element.hasClass('fade') ?
                this.$backdrop
                .one('bsTransitionEnd', callbackRemove)
                .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
                callbackRemove()

        } else if (callback) {
            callback()
        }
    }

    // these following methods are used to handle overflowing modals

    Modal.prototype.handleUpdate = function() {
        if (this.options.backdrop) this.adjustBackdrop()
        this.adjustDialog()
    }

    Modal.prototype.adjustBackdrop = function() {
        this.$backdrop
            .css('height', 0)
            .css('height', this.$element[0].scrollHeight)
    }

    Modal.prototype.adjustDialog = function() {
        var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
            paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
        })
    }

    Modal.prototype.resetAdjustments = function() {
        this.$element.css({
            paddingLeft: '',
            paddingRight: ''
        })
    }

    Modal.prototype.checkScrollbar = function() {
        this.bodyIsOverflowing = document.body.scrollHeight > document.documentElement.clientHeight
        this.scrollbarWidth = this.measureScrollbar()
    }

    Modal.prototype.setScrollbar = function() {
        var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
        if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
    }

    Modal.prototype.resetScrollbar = function() {
        this.$body.css('padding-right', '')
    }

    Modal.prototype.measureScrollbar = function() { // thx walsh
        var scrollDiv = document.createElement('div')
        scrollDiv.className = 'modal-scrollbar-measure'
        this.$body.append(scrollDiv)
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
        this.$body[0].removeChild(scrollDiv)
        return scrollbarWidth
    }


    // MODAL PLUGIN DEFINITION
    // =======================

    function Plugin(option, _relatedTarget) {
        return this.each(function() {
            var $this = $(this)
            var data = $this.data('bs.modal')
            var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

            if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
            if (typeof option == 'string') data[option](_relatedTarget)
            else if (options.show) data.show(_relatedTarget)
        })
    }

    var old = $.fn.modal

    $.fn.modal = Plugin
    $.fn.modal.Constructor = Modal


    // MODAL NO CONFLICT
    // =================

    $.fn.modal.noConflict = function() {
        $.fn.modal = old
        return this
    }


    // MODAL DATA-API
    // ==============

    $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function(e) {
        var $this = $(this)
        var href = $this.attr('href')
        var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
        var option = $target.data('bs.modal') ? 'toggle' : $.extend({
            remote: !/#/.test(href) && href
        }, $target.data(), $this.data())

        if ($this.is('a')) e.preventDefault()

        $target.one('show.bs.modal', function(showEvent) {
            if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
            $target.one('hidden.bs.modal', function() {
                $this.is(':visible') && $this.trigger('focus')
            })
        })
        Plugin.call($target, option, this)
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.2
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+

function($) {
    'use strict';

    // TOOLTIP PUBLIC CLASS DEFINITION
    // ===============================

    var Tooltip = function(element, options) {
        this.type =
            this.options =
            this.enabled =
            this.timeout =
            this.hoverState =
            this.$element = null

        this.init('tooltip', element, options)
    }

    Tooltip.VERSION = '3.3.2'

    Tooltip.TRANSITION_DURATION = 150

    Tooltip.DEFAULTS = {
        animation: true,
        placement: 'top',
        selector: false,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: 'hover focus',
        title: '',
        delay: 0,
        html: false,
        container: false,
        viewport: {
            selector: 'body',
            padding: 0
        }
    }

    Tooltip.prototype.init = function(type, element, options) {
        this.enabled = true
        this.type = type
        this.$element = $(element)
        this.options = this.getOptions(options)
        this.$viewport = this.options.viewport && $(this.options.viewport.selector || this.options.viewport)

        var triggers = this.options.trigger.split(' ')

        for (var i = triggers.length; i--;) {
            var trigger = triggers[i]

            if (trigger == 'click') {
                this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
            } else if (trigger != 'manual') {
                var eventIn = trigger == 'hover' ? 'mouseenter' : 'focusin'
                var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

                this.$element.on(eventIn + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
                this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
            }
        }

        this.options.selector ?
            (this._options = $.extend({}, this.options, {
                trigger: 'manual',
                selector: ''
            })) :
            this.fixTitle()
    }

    Tooltip.prototype.getDefaults = function() {
        return Tooltip.DEFAULTS
    }

    Tooltip.prototype.getOptions = function(options) {
        options = $.extend({}, this.getDefaults(), this.$element.data(), options)

        if (options.delay && typeof options.delay == 'number') {
            options.delay = {
                show: options.delay,
                hide: options.delay
            }
        }

        return options
    }

    Tooltip.prototype.getDelegateOptions = function() {
        var options = {}
        var defaults = this.getDefaults()

        this._options && $.each(this._options, function(key, value) {
            if (defaults[key] != value) options[key] = value
        })

        return options
    }

    Tooltip.prototype.enter = function(obj) {
        var self = obj instanceof this.constructor ?
            obj : $(obj.currentTarget).data('bs.' + this.type)

        if (self && self.$tip && self.$tip.is(':visible')) {
            self.hoverState = 'in'
            return
        }

        if (!self) {
            self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
            $(obj.currentTarget).data('bs.' + this.type, self)
        }

        clearTimeout(self.timeout)

        self.hoverState = 'in'

        if (!self.options.delay || !self.options.delay.show) return self.show()

        self.timeout = setTimeout(function() {
            if (self.hoverState == 'in') self.show()
        }, self.options.delay.show)
    }

    Tooltip.prototype.leave = function(obj) {
        var self = obj instanceof this.constructor ?
            obj : $(obj.currentTarget).data('bs.' + this.type)

        if (!self) {
            self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
            $(obj.currentTarget).data('bs.' + this.type, self)
        }

        clearTimeout(self.timeout)

        self.hoverState = 'out'

        if (!self.options.delay || !self.options.delay.hide) return self.hide()

        self.timeout = setTimeout(function() {
            if (self.hoverState == 'out') self.hide()
        }, self.options.delay.hide)
    }

    Tooltip.prototype.show = function() {
        var e = $.Event('show.bs.' + this.type)

        if (this.hasContent() && this.enabled) {
            this.$element.trigger(e)

            var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
            if (e.isDefaultPrevented() || !inDom) return
            var that = this

            var $tip = this.tip()

            var tipId = this.getUID(this.type)

            this.setContent()
            $tip.attr('id', tipId)
            this.$element.attr('aria-describedby', tipId)

            if (this.options.animation) $tip.addClass('fade')

            var placement = typeof this.options.placement == 'function' ?
                this.options.placement.call(this, $tip[0], this.$element[0]) :
                this.options.placement

            var autoToken = /\s?auto?\s?/i
            var autoPlace = autoToken.test(placement)
            if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

            $tip
                .detach()
                .css({
                    top: 0,
                    left: 0,
                    display: 'block'
                })
                .addClass(placement)
                .data('bs.' + this.type, this)

            this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

            var pos = this.getPosition()
            var actualWidth = $tip[0].offsetWidth
            var actualHeight = $tip[0].offsetHeight

            if (autoPlace) {
                var orgPlacement = placement
                var $container = this.options.container ? $(this.options.container) : this.$element.parent()
                var containerDim = this.getPosition($container)

                placement = placement == 'bottom' && pos.bottom + actualHeight > containerDim.bottom ? 'top' :
                    placement == 'top' && pos.top - actualHeight < containerDim.top ? 'bottom' :
                    placement == 'right' && pos.right + actualWidth > containerDim.width ? 'left' :
                    placement == 'left' && pos.left - actualWidth < containerDim.left ? 'right' :
                    placement

                $tip
                    .removeClass(orgPlacement)
                    .addClass(placement)
            }

            var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

            this.applyPlacement(calculatedOffset, placement)

            var complete = function() {
                var prevHoverState = that.hoverState
                that.$element.trigger('shown.bs.' + that.type)
                that.hoverState = null

                if (prevHoverState == 'out') that.leave(that)
            }

            $.support.transition && this.$tip.hasClass('fade') ?
                $tip
                .one('bsTransitionEnd', complete)
                .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
                complete()
        }
    }

    Tooltip.prototype.applyPlacement = function(offset, placement) {
        var $tip = this.tip()
        var width = $tip[0].offsetWidth
        var height = $tip[0].offsetHeight

        // manually read margins because getBoundingClientRect includes difference
        var marginTop = parseInt($tip.css('margin-top'), 10)
        var marginLeft = parseInt($tip.css('margin-left'), 10)

        // we must check for NaN for ie 8/9
        if (isNaN(marginTop)) marginTop = 0
        if (isNaN(marginLeft)) marginLeft = 0

        offset.top = offset.top + marginTop
        offset.left = offset.left + marginLeft

        // $.fn.offset doesn't round pixel values
        // so we use setOffset directly with our own function B-0
        $.offset.setOffset($tip[0], $.extend({
            using: function(props) {
                $tip.css({
                    top: Math.round(props.top),
                    left: Math.round(props.left)
                })
            }
        }, offset), 0)

        $tip.addClass('in')

        // check to see if placing tip in new offset caused the tip to resize itself
        var actualWidth = $tip[0].offsetWidth
        var actualHeight = $tip[0].offsetHeight

        if (placement == 'top' && actualHeight != height) {
            offset.top = offset.top + height - actualHeight
        }

        var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

        if (delta.left) offset.left += delta.left
        else offset.top += delta.top

        var isVertical = /top|bottom/.test(placement)
        var arrowDelta = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
        var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

        $tip.offset(offset)
        this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
    }

    Tooltip.prototype.replaceArrow = function(delta, dimension, isHorizontal) {
        this.arrow()
            .css(isHorizontal ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
            .css(isHorizontal ? 'top' : 'left', '')
    }

    Tooltip.prototype.setContent = function() {
        var $tip = this.tip()
        var title = this.getTitle()

        $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
        $tip.removeClass('fade in top bottom left right')
    }

    Tooltip.prototype.hide = function(callback) {
        var that = this
        var $tip = this.tip()
        var e = $.Event('hide.bs.' + this.type)

        function complete() {
            if (that.hoverState != 'in') $tip.detach()
            that.$element
                .removeAttr('aria-describedby')
                .trigger('hidden.bs.' + that.type)
            callback && callback()
        }

        this.$element.trigger(e)

        if (e.isDefaultPrevented()) return

        $tip.removeClass('in')

        $.support.transition && this.$tip.hasClass('fade') ?
            $tip
            .one('bsTransitionEnd', complete)
            .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
            complete()

        this.hoverState = null

        return this
    }

    Tooltip.prototype.fixTitle = function() {
        var $e = this.$element
        if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
            $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
        }
    }

    Tooltip.prototype.hasContent = function() {
        return this.getTitle()
    }

    Tooltip.prototype.getPosition = function($element) {
        $element = $element || this.$element

        var el = $element[0]
        var isBody = el.tagName == 'BODY'

        var elRect = el.getBoundingClientRect()
        if (elRect.width == null) {
            // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
            elRect = $.extend({}, elRect, {
                width: elRect.right - elRect.left,
                height: elRect.bottom - elRect.top
            })
        }
        var elOffset = isBody ? {
            top: 0,
            left: 0
        } : $element.offset()
        var scroll = {
            scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop()
        }
        var outerDims = isBody ? {
            width: $(window).width(),
            height: $(window).height()
        } : null

        return $.extend({}, elRect, scroll, outerDims, elOffset)
    }

    Tooltip.prototype.getCalculatedOffset = function(placement, pos, actualWidth, actualHeight) {
        return placement == 'bottom' ? {
                top: pos.top + pos.height,
                left: pos.left + pos.width / 2 - actualWidth / 2
            } :
            placement == 'top' ? {
                top: pos.top - actualHeight,
                left: pos.left + pos.width / 2 - actualWidth / 2
            } :
            placement == 'left' ? {
                top: pos.top + pos.height / 2 - actualHeight / 2,
                left: pos.left - actualWidth
            } :
            /* placement == 'right' */
            {
                top: pos.top + pos.height / 2 - actualHeight / 2,
                left: pos.left + pos.width
            }

    }

    Tooltip.prototype.getViewportAdjustedDelta = function(placement, pos, actualWidth, actualHeight) {
        var delta = {
            top: 0,
            left: 0
        }
        if (!this.$viewport) return delta

        var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
        var viewportDimensions = this.getPosition(this.$viewport)

        if (/right|left/.test(placement)) {
            var topEdgeOffset = pos.top - viewportPadding - viewportDimensions.scroll
            var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
            if (topEdgeOffset < viewportDimensions.top) { // top overflow
                delta.top = viewportDimensions.top - topEdgeOffset
            } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
                delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
            }
        } else {
            var leftEdgeOffset = pos.left - viewportPadding
            var rightEdgeOffset = pos.left + viewportPadding + actualWidth
            if (leftEdgeOffset < viewportDimensions.left) { // left overflow
                delta.left = viewportDimensions.left - leftEdgeOffset
            } else if (rightEdgeOffset > viewportDimensions.width) { // right overflow
                delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
            }
        }

        return delta
    }

    Tooltip.prototype.getTitle = function() {
        var title
        var $e = this.$element
        var o = this.options

        title = $e.attr('data-original-title') ||
            (typeof o.title == 'function' ? o.title.call($e[0]) : o.title)

        return title
    }

    Tooltip.prototype.getUID = function(prefix) {
        do prefix += ~~(Math.random() * 1000000)
        while (document.getElementById(prefix))
        return prefix
    }

    Tooltip.prototype.tip = function() {
        return (this.$tip = this.$tip || $(this.options.template))
    }

    Tooltip.prototype.arrow = function() {
        return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
    }

    Tooltip.prototype.enable = function() {
        this.enabled = true
    }

    Tooltip.prototype.disable = function() {
        this.enabled = false
    }

    Tooltip.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }

    Tooltip.prototype.toggle = function(e) {
        var self = this
        if (e) {
            self = $(e.currentTarget).data('bs.' + this.type)
            if (!self) {
                self = new this.constructor(e.currentTarget, this.getDelegateOptions())
                $(e.currentTarget).data('bs.' + this.type, self)
            }
        }

        self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }

    Tooltip.prototype.destroy = function() {
        var that = this
        clearTimeout(this.timeout)
        this.hide(function() {
            that.$element.off('.' + that.type).removeData('bs.' + that.type)
        })
    }


    // TOOLTIP PLUGIN DEFINITION
    // =========================

    function Plugin(option) {
        return this.each(function() {
            var $this = $(this)
            var data = $this.data('bs.tooltip')
            var options = typeof option == 'object' && option

            if (!data && option == 'destroy') return
            if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
            if (typeof option == 'string') data[option]()
        })
    }

    var old = $.fn.tooltip

    $.fn.tooltip = Plugin
    $.fn.tooltip.Constructor = Tooltip


    // TOOLTIP NO CONFLICT
    // ===================

    $.fn.tooltip.noConflict = function() {
        $.fn.tooltip = old
        return this
    }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.2
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+

function($) {
    'use strict';

    // POPOVER PUBLIC CLASS DEFINITION
    // ===============================

    var Popover = function(element, options) {
        this.init('popover', element, options)
    }

    if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

    Popover.VERSION = '3.3.2'

    Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
        placement: 'right',
        trigger: 'click',
        content: '',
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    })


    // NOTE: POPOVER EXTENDS tooltip.js
    // ================================

    Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

    Popover.prototype.constructor = Popover

    Popover.prototype.getDefaults = function() {
        return Popover.DEFAULTS
    }

    Popover.prototype.setContent = function() {
        var $tip = this.tip()
        var title = this.getTitle()
        var content = this.getContent()

        $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
        $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
            this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
        ](content)

        $tip.removeClass('fade top bottom left right in')

        // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
        // this manually by checking the contents.
        if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
    }

    Popover.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    }

    Popover.prototype.getContent = function() {
        var $e = this.$element
        var o = this.options

        return $e.attr('data-content') ||
            (typeof o.content == 'function' ?
                o.content.call($e[0]) :
                o.content)
    }

    Popover.prototype.arrow = function() {
        return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
    }

    Popover.prototype.tip = function() {
        if (!this.$tip) this.$tip = $(this.options.template)
        return this.$tip
    }


    // POPOVER PLUGIN DEFINITION
    // =========================

    function Plugin(option) {
        return this.each(function() {
            var $this = $(this)
            var data = $this.data('bs.popover')
            var options = typeof option == 'object' && option

            if (!data && option == 'destroy') return
            if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
            if (typeof option == 'string') data[option]()
        })
    }

    var old = $.fn.popover

    $.fn.popover = Plugin
    $.fn.popover.Constructor = Popover


    // POPOVER NO CONFLICT
    // ===================

    $.fn.popover.noConflict = function() {
        $.fn.popover = old
        return this
    }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.2
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+

function($) {
    'use strict';

    // SCROLLSPY CLASS DEFINITION
    // ==========================

    function ScrollSpy(element, options) {
        var process = $.proxy(this.process, this)

        this.$body = $('body')
        this.$scrollElement = $(element).is('body') ? $(window) : $(element)
        this.options = $.extend({}, ScrollSpy.DEFAULTS, options)
        this.selector = (this.options.target || '') + ' .nav li > a'
        this.offsets = []
        this.targets = []
        this.activeTarget = null
        this.scrollHeight = 0

        this.$scrollElement.on('scroll.bs.scrollspy', process)
        this.refresh()
        this.process()
    }

    ScrollSpy.VERSION = '3.3.2'

    ScrollSpy.DEFAULTS = {
        offset: 10
    }

    ScrollSpy.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }

    ScrollSpy.prototype.refresh = function() {
        var offsetMethod = 'offset'
        var offsetBase = 0

        if (!$.isWindow(this.$scrollElement[0])) {
            offsetMethod = 'position'
            offsetBase = this.$scrollElement.scrollTop()
        }

        this.offsets = []
        this.targets = []
        this.scrollHeight = this.getScrollHeight()

        var self = this

        this.$body
            .find(this.selector)
            .map(function() {
                var $el = $(this)
                var href = $el.data('target') || $el.attr('href')
                var $href = /^#./.test(href) && $(href)

                return ($href &&
                    $href.length &&
                    $href.is(':visible') && [
                        [$href[offsetMethod]().top + offsetBase, href]
                    ]) || null
            })
            .sort(function(a, b) {
                return a[0] - b[0]
            })
            .each(function() {
                self.offsets.push(this[0])
                self.targets.push(this[1])
            })
    }

    ScrollSpy.prototype.process = function() {
        var scrollTop = this.$scrollElement.scrollTop() + this.options.offset
        var scrollHeight = this.getScrollHeight()
        var maxScroll = this.options.offset + scrollHeight - this.$scrollElement.height()
        var offsets = this.offsets
        var targets = this.targets
        var activeTarget = this.activeTarget
        var i

        if (this.scrollHeight != scrollHeight) {
            this.refresh()
        }

        if (scrollTop >= maxScroll) {
            return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
        }

        if (activeTarget && scrollTop < offsets[0]) {
            this.activeTarget = null
            return this.clear()
        }

        for (i = offsets.length; i--;) {
            activeTarget != targets[i] &&
                scrollTop >= offsets[i] &&
                (!offsets[i + 1] || scrollTop <= offsets[i + 1]) &&
                this.activate(targets[i])
        }
    }

    ScrollSpy.prototype.activate = function(target) {
        this.activeTarget = target

        this.clear()

        var selector = this.selector +
            '[data-target="' + target + '"],' +
            this.selector + '[href="' + target + '"]'

        var active = $(selector)
            .parents('li')
            .addClass('active')

        if (active.parent('.dropdown-menu').length) {
            active = active
                .closest('li.dropdown')
                .addClass('active')
        }

        active.trigger('activate.bs.scrollspy')
    }

    ScrollSpy.prototype.clear = function() {
        $(this.selector)
            .parentsUntil(this.options.target, '.active')
            .removeClass('active')
    }


    // SCROLLSPY PLUGIN DEFINITION
    // ===========================

    function Plugin(option) {
        return this.each(function() {
            var $this = $(this)
            var data = $this.data('bs.scrollspy')
            var options = typeof option == 'object' && option

            if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
            if (typeof option == 'string') data[option]()
        })
    }

    var old = $.fn.scrollspy

    $.fn.scrollspy = Plugin
    $.fn.scrollspy.Constructor = ScrollSpy


    // SCROLLSPY NO CONFLICT
    // =====================

    $.fn.scrollspy.noConflict = function() {
        $.fn.scrollspy = old
        return this
    }


    // SCROLLSPY DATA-API
    // ==================

    $(window).on('load.bs.scrollspy.data-api', function() {
        $('[data-spy="scroll"]').each(function() {
            var $spy = $(this)
            Plugin.call($spy, $spy.data())
        })
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.2
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+

function($) {
    'use strict';

    // TAB CLASS DEFINITION
    // ====================

    var Tab = function(element) {
        this.element = $(element)
    }

    Tab.VERSION = '3.3.2'

    Tab.TRANSITION_DURATION = 150

    Tab.prototype.show = function() {
        var $this = this.element
        var $ul = $this.closest('ul:not(.dropdown-menu)')
        var selector = $this.data('target')

        if (!selector) {
            selector = $this.attr('href')
            selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
        }

        if ($this.parent('li').hasClass('active')) return

        var $previous = $ul.find('.active:last a')
        var hideEvent = $.Event('hide.bs.tab', {
            relatedTarget: $this[0]
        })
        var showEvent = $.Event('show.bs.tab', {
            relatedTarget: $previous[0]
        })

        $previous.trigger(hideEvent)
        $this.trigger(showEvent)

        if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

        var $target = $(selector)

        this.activate($this.closest('li'), $ul)
        this.activate($target, $target.parent(), function() {
            $previous.trigger({
                type: 'hidden.bs.tab',
                relatedTarget: $this[0]
            })
            $this.trigger({
                type: 'shown.bs.tab',
                relatedTarget: $previous[0]
            })
        })
    }

    Tab.prototype.activate = function(element, container, callback) {
        var $active = container.find('> .active')
        var transition = callback &&
            $.support.transition &&
            (($active.length && $active.hasClass('fade')) || !!container.find('> .fade').length)

        function next() {
            $active
                .removeClass('active')
                .find('> .dropdown-menu > .active')
                .removeClass('active')
                .end()
                .find('[data-toggle="tab"]')
                .attr('aria-expanded', false)

            element
                .addClass('active')
                .find('[data-toggle="tab"]')
                .attr('aria-expanded', true)

            if (transition) {
                element[0].offsetWidth // reflow for transition
                element.addClass('in')
            } else {
                element.removeClass('fade')
            }

            if (element.parent('.dropdown-menu')) {
                element
                    .closest('li.dropdown')
                    .addClass('active')
                    .end()
                    .find('[data-toggle="tab"]')
                    .attr('aria-expanded', true)
            }

            callback && callback()
        }

        $active.length && transition ?
            $active
            .one('bsTransitionEnd', next)
            .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
            next()

        $active.removeClass('in')
    }


    // TAB PLUGIN DEFINITION
    // =====================

    function Plugin(option) {
        return this.each(function() {
            var $this = $(this)
            var data = $this.data('bs.tab')

            if (!data) $this.data('bs.tab', (data = new Tab(this)))
            if (typeof option == 'string') data[option]()
        })
    }

    var old = $.fn.tab

    $.fn.tab = Plugin
    $.fn.tab.Constructor = Tab


    // TAB NO CONFLICT
    // ===============

    $.fn.tab.noConflict = function() {
        $.fn.tab = old
        return this
    }


    // TAB DATA-API
    // ============

    var clickHandler = function(e) {
        e.preventDefault()
        Plugin.call($(this), 'show')
    }

    $(document)
        .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
        .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.2
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+

function($) {
    'use strict';

    // AFFIX CLASS DEFINITION
    // ======================

    var Affix = function(element, options) {
        this.options = $.extend({}, Affix.DEFAULTS, options)

        this.$target = $(this.options.target)
            .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
            .on('click.bs.affix.data-api', $.proxy(this.checkPositionWithEventLoop, this))

        this.$element = $(element)
        this.affixed =
            this.unpin =
            this.pinnedOffset = null

        this.checkPosition()
    }

    Affix.VERSION = '3.3.2'

    Affix.RESET = 'affix affix-top affix-bottom'

    Affix.DEFAULTS = {
        offset: 0,
        target: window
    }

    Affix.prototype.getState = function(scrollHeight, height, offsetTop, offsetBottom) {
        var scrollTop = this.$target.scrollTop()
        var position = this.$element.offset()
        var targetHeight = this.$target.height()

        if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

        if (this.affixed == 'bottom') {
            if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
            return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
        }

        var initializing = this.affixed == null
        var colliderTop = initializing ? scrollTop : position.top
        var colliderHeight = initializing ? targetHeight : height

        if (offsetTop != null && scrollTop <= offsetTop) return 'top'
        if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

        return false
    }

    Affix.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset
        this.$element.removeClass(Affix.RESET).addClass('affix')
        var scrollTop = this.$target.scrollTop()
        var position = this.$element.offset()
        return (this.pinnedOffset = position.top - scrollTop)
    }

    Affix.prototype.checkPositionWithEventLoop = function() {
        setTimeout($.proxy(this.checkPosition, this), 1)
    }

    Affix.prototype.checkPosition = function() {
        if (!this.$element.is(':visible')) return

        var height = this.$element.height()
        var offset = this.options.offset
        var offsetTop = offset.top
        var offsetBottom = offset.bottom
        var scrollHeight = $('body').height()

        if (typeof offset != 'object') offsetBottom = offsetTop = offset
        if (typeof offsetTop == 'function') offsetTop = offset.top(this.$element)
        if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

        var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

        if (this.affixed != affix) {
            if (this.unpin != null) this.$element.css('top', '')

            var affixType = 'affix' + (affix ? '-' + affix : '')
            var e = $.Event(affixType + '.bs.affix')

            this.$element.trigger(e)

            if (e.isDefaultPrevented()) return

            this.affixed = affix
            this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

            this.$element
                .removeClass(Affix.RESET)
                .addClass(affixType)
                .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
        }

        if (affix == 'bottom') {
            this.$element.offset({
                top: scrollHeight - height - offsetBottom
            })
        }
    }


    // AFFIX PLUGIN DEFINITION
    // =======================

    function Plugin(option) {
        return this.each(function() {
            var $this = $(this)
            var data = $this.data('bs.affix')
            var options = typeof option == 'object' && option

            if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
            if (typeof option == 'string') data[option]()
        })
    }

    var old = $.fn.affix

    $.fn.affix = Plugin
    $.fn.affix.Constructor = Affix


    // AFFIX NO CONFLICT
    // =================

    $.fn.affix.noConflict = function() {
        $.fn.affix = old
        return this
    }


    // AFFIX DATA-API
    // ==============

    $(window).on('load', function() {
        $('[data-spy="affix"]').each(function() {
            var $spy = $(this)
            var data = $spy.data()

            data.offset = data.offset || {}

            if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
            if (data.offsetTop != null) data.offset.top = data.offsetTop

            Plugin.call($spy, data)
        })
    })

}(jQuery);

// END Bootstrap


//	Animations v2.1, Copyright 2014, Joe Mottershaw, https://github.com/joemottershaw/
//	==================================================================================
function animate(o, n, i) {
    -1 != effects.indexOf(n) && (i ? $(o).removeClass("animate-in animate-out").removeClass(effects.join(" ")).addClass("animating infinite").addClass(n) : $(o).removeClass("animate-in animate-out infinite").removeClass(effects.join(" ")).addClass("animating").addClass(n).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
        $(o).removeClass("animating").removeClass(effects.join(" "))
    }))
}

function animateOut(o, n, i) {
    -1 != effects.indexOf(n) && $(o).removeClass("infinite").removeClass(effects.join(" ")).addClass("animating").addClass(n).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
        $(o).addClass("animate-out").removeClass("animating").removeClass(effects.join(" ")), i && $(o).remove()
    })
}

function animateEnd(o, n) {
    $(o).removeClass("animating infinite").removeClass(effects.join(" ")), n && $(o).remove()
}
$(document).ready(function() {
    $("html").hasClass("no-js") && $("html").toggleClass("no-js js"), $(window).width() <= 568 ? $(".animate-in").removeClass("animate-in animating animate-out infinite").removeClass(effects.join(" ")) : $(".animate-in").each(function(o, n) {
        var i = $(n).attr("data-anim-type"),
            e = $(n).attr("data-anim-delay");
        $(n).appear(function() {
            setTimeout(function() {
                $(n).addClass("animating").addClass(i).removeClass("animate-in")
            }, e), $(n).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                $(n).removeClass("animating").removeClass(effects.join(" "))
            })
        }, {
            accX: 0,
            accY: -100
        })
    }), console.log(effects.length + " Animations")
}), $(window).resize(function() {
    $(window).width() <= 568 && $(".animate-in").removeClass("animate-in animating animate-out infinite").removeClass(effects.join(" "))
});
var effects = ["fade-in", "fade-in-up", "fade-in-up-big", "fade-in-up-large", "fade-in-down", "fade-in-down-big", "fade-in-down-large", "fade-in-left", "fade-in-left-big", "fade-in-left-large", "fade-in-right", "fade-in-right-big", "fade-in-right-large", "fade-in-up-left", "fade-in-up-left-big", "fade-in-up-left-large", "fade-in-up-right", "fade-in-up-right-big", "fade-in-up-right-large", "fade-in-down-left", "fade-in-down-left-big", "fade-in-down-left-large", "fade-in-down-right", "fade-in-down-right-big", "fade-in-down-right-large", "fade-out", "fade-out-up", "fade-out-up-big", "fade-out-up-large", "fade-out-down", "fade-out-down-big", "fade-out-down-large", "fade-out-left", "fade-out-left-big", "fade-out-left-large", "fade-out-right", "fade-out-right-big", "fade-out-right-large", "fade-out-up-left", "fade-out-up-left-big", "fade-out-up-left-large", "fade-out-up-right", "fade-out-up-right-big", "fade-out-up-right-large", "fade-out-down-left", "fade-out-down-left-big", "fade-out-down-left-large", "fade-out-down-right", "fade-out-down-right-big", "fade-out-down-right-large", "bounce-in", "bounce-in-big", "bounce-in-large", "bounce-in-up", "bounce-in-up-big", "bounce-in-up-large", "bounce-in-down", "bounce-in-down-big", "bounce-in-down-large", "bounce-in-left", "bounce-in-left-big", "bounce-in-left-large", "bounce-in-right", "bounce-in-right-big", "bounce-in-right-large", "bounce-in-up-left", "bounce-in-up-left-big", "bounce-in-up-left-large", "bounce-in-up-right", "bounce-in-up-right-big", "bounce-in-up-right-large", "bounce-in-down-left", "bounce-in-down-left-big", "bounce-in-down-left-large", "bounce-in-down-right", "bounce-in-down-right-big", "bounce-in-down-right-large", "bounce-out", "bounce-out-big", "bounce-out-large", "bounce-out-up", "bounce-out-up-big", "bounce-out-up-large", "bounce-out-down", "bounce-out-down-big", "bounce-out-down-large", "bounce-out-left", "bounce-out-left-big", "bounce-out-left-large", "bounce-out-right", "bounce-out-right-big", "bounce-out-right-large", "bounce-out-up-left", "bounce-out-up-left-big", "bounce-out-up-left-large", "bounce-out-up-right", "bounce-out-up-right-big", "bounce-out-up-right-large", "bounce-out-down-left", "bounce-out-down-left-big", "bounce-out-down-left-large", "bounce-out-down-right", "bounce-out-down-right-big", "bounce-out-down-right-large", "zoom-in", "zoom-in-up", "zoom-in-up-big", "zoom-in-up-large", "zoom-in-down", "zoom-in-down-big", "zoom-in-down-large", "zoom-in-left", "zoom-in-left-big", "zoom-in-left-large", "zoom-in-right", "zoom-in-right-big", "zoom-in-right-large", "zoom-in-up-left", "zoom-in-up-left-big", "zoom-in-up-left-large", "zoom-in-up-right", "zoom-in-up-right-big", "zoom-in-up-right-large", "zoom-in-down-left", "zoom-in-down-left-big", "zoom-in-down-left-large", "zoom-in-down-right", "zoom-in-down-right-big", "zoom-in-down-right-large", "zoom-out", "zoom-out-up", "zoom-out-up-big", "zoom-out-up-large", "zoom-out-down", "zoom-out-down-big", "zoom-out-down-large", "zoom-out-left", "zoom-out-left-big", "zoom-out-left-large", "zoom-out-right", "zoom-out-right-big", "zoom-out-right-large", "zoom-out-up-left", "zoom-out-up-left-big", "zoom-out-up-left-large", "zoom-out-up-right", "zoom-out-up-right-big", "zoom-out-up-right-large", "zoom-out-down-left", "zoom-out-down-left-big", "zoom-out-down-left-large", "zoom-out-down-right", "zoom-out-down-right-big", "zoom-out-down-right-large", "flip-in-x", "flip-in-y", "flip-in-top-front", "flip-in-top-back", "flip-in-bottom-front", "flip-in-bottom-back", "flip-in-left-front", "flip-in-left-back", "flip-in-right-front", "flip-in-right-back", "flip-out-x", "flip-out-y", "flip-out-top-front", "flip-out-top-back", "flip-out-bottom-front", "flip-out-bottom-back", "flip-out-left-front", "flip-out-left-back", "flip-out-right-front", "flip-out-right-back", "flash", "strobe", "shake-x", "shake-y", "bounce", "tada", "rubber-band", "swing", "spin", "spin-reverse", "slingshot", "slingshot-reverse", "wobble", "pulse", "pulsate", "heartbeat", "panic"];

// Appear JS
(function(e) {
    e.fn.appear = function(t, n) {
        var r = e.extend({
            data: undefined,
            one: true,
            accX: 0,
            accY: 0
        }, n);
        return this.each(function() {
            var n = e(this);
            n.appeared = false;
            if (!t) {
                n.trigger("appear", r.data);
                return
            }
            var i = e(window);
            var s = function() {
                if (!n.is(":visible")) {
                    n.appeared = false;
                    return
                }
                var e = i.scrollLeft();
                var t = i.scrollTop();
                var s = n.offset();
                var o = s.left;
                var u = s.top;
                var a = r.accX;
                var f = r.accY;
                var l = n.height();
                var c = i.height();
                var h = n.width();
                var p = i.width();
                if (u + l + f >= t && u <= t + c + f && o + h + a >= e && o <= e + p + a) {
                    if (!n.appeared) n.trigger("appear", r.data)
                } else {
                    n.appeared = false
                }
            };
            var o = function() {
                n.appeared = true;
                if (r.one) {
                    i.unbind("scroll", s);
                    var o = e.inArray(s, e.fn.appear.checks);
                    if (o >= 0) e.fn.appear.checks.splice(o, 1)
                }
                t.apply(this, arguments)
            };
            if (r.one) n.one("appear", r.data, o);
            else n.bind("appear", r.data, o);
            i.scroll(s);
            e.fn.appear.checks.push(s);
            s()
        })
    };
    e.extend(e.fn.appear, {
        checks: [],
        timeout: null,
        checkAll: function() {
            var t = e.fn.appear.checks.length;
            if (t > 0)
                while (t--) e.fn.appear.checks[t]()
        },
        run: function() {
            if (e.fn.appear.timeout) clearTimeout(e.fn.appear.timeout);
            e.fn.appear.timeout = setTimeout(e.fn.appear.checkAll, 20)
        }
    });
    e.each(["append", "prepend", "after", "before", "attr", "removeAttr", "addClass", "removeClass", "toggleClass", "remove", "css", "show", "hide"], function(t, n) {
        var r = e.fn[n];
        if (r) {
            e.fn[n] = function() {
                var t = r.apply(this, arguments);
                e.fn.appear.run();
                return t
            }
        }
    })
})(jQuery);

// JQuery easing
jQuery.easing.jswing = jQuery.easing.swing;
jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function(e, f, a, h, g) {
        return jQuery.easing[jQuery.easing.def](e, f, a, h, g)
    },
    easeInQuad: function(e, f, a, h, g) {
        return h * (f /= g) * f + a
    },
    easeOutQuad: function(e, f, a, h, g) {
        return -h * (f /= g) * (f - 2) + a
    },
    easeInOutQuad: function(e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return h / 2 * f * f + a
        }
        return -h / 2 * ((--f) * (f - 2) - 1) + a
    },
    easeInCubic: function(e, f, a, h, g) {
        return h * (f /= g) * f * f + a
    },
    easeOutCubic: function(e, f, a, h, g) {
        return h * ((f = f / g - 1) * f * f + 1) + a
    },
    easeInOutCubic: function(e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return h / 2 * f * f * f + a
        }
        return h / 2 * ((f -= 2) * f * f + 2) + a
    },
    easeInQuart: function(e, f, a, h, g) {
        return h * (f /= g) * f * f * f + a
    },
    easeOutQuart: function(e, f, a, h, g) {
        return -h * ((f = f / g - 1) * f * f * f - 1) + a
    },
    easeInOutQuart: function(e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return h / 2 * f * f * f * f + a
        }
        return -h / 2 * ((f -= 2) * f * f * f - 2) + a
    },
    easeInQuint: function(e, f, a, h, g) {
        return h * (f /= g) * f * f * f * f + a
    },
    easeOutQuint: function(e, f, a, h, g) {
        return h * ((f = f / g - 1) * f * f * f * f + 1) + a
    },
    easeInOutQuint: function(e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return h / 2 * f * f * f * f * f + a
        }
        return h / 2 * ((f -= 2) * f * f * f * f + 2) + a
    },
    easeInSine: function(e, f, a, h, g) {
        return -h * Math.cos(f / g * (Math.PI / 2)) + h + a
    },
    easeOutSine: function(e, f, a, h, g) {
        return h * Math.sin(f / g * (Math.PI / 2)) + a
    },
    easeInOutSine: function(e, f, a, h, g) {
        return -h / 2 * (Math.cos(Math.PI * f / g) - 1) + a
    },
    easeInExpo: function(e, f, a, h, g) {
        return (f == 0) ? a : h * Math.pow(2, 10 * (f / g - 1)) + a
    },
    easeOutExpo: function(e, f, a, h, g) {
        return (f == g) ? a + h : h * (-Math.pow(2, -10 * f / g) + 1) + a
    },
    easeInOutExpo: function(e, f, a, h, g) {
        if (f == 0) {
            return a
        }
        if (f == g) {
            return a + h
        }
        if ((f /= g / 2) < 1) {
            return h / 2 * Math.pow(2, 10 * (f - 1)) + a
        }
        return h / 2 * (-Math.pow(2, -10 * --f) + 2) + a
    },
    easeInCirc: function(e, f, a, h, g) {
        return -h * (Math.sqrt(1 - (f /= g) * f) - 1) + a
    },
    easeOutCirc: function(e, f, a, h, g) {
        return h * Math.sqrt(1 - (f = f / g - 1) * f) + a
    },
    easeInOutCirc: function(e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return -h / 2 * (Math.sqrt(1 - f * f) - 1) + a
        }
        return h / 2 * (Math.sqrt(1 - (f -= 2) * f) + 1) + a
    },
    easeInElastic: function(f, h, e, l, k) {
        var i = 1.70158;
        var j = 0;
        var g = l;
        if (h == 0) {
            return e
        }
        if ((h /= k) == 1) {
            return e + l
        }
        if (!j) {
            j = k * 0.3
        }
        if (g < Math.abs(l)) {
            g = l;
            var i = j / 4
        } else {
            var i = j / (2 * Math.PI) * Math.asin(l / g)
        }
        return -(g * Math.pow(2, 10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j)) + e
    },
    easeOutElastic: function(f, h, e, l, k) {
        var i = 1.70158;
        var j = 0;
        var g = l;
        if (h == 0) {
            return e
        }
        if ((h /= k) == 1) {
            return e + l
        }
        if (!j) {
            j = k * 0.3
        }
        if (g < Math.abs(l)) {
            g = l;
            var i = j / 4
        } else {
            var i = j / (2 * Math.PI) * Math.asin(l / g)
        }
        return g * Math.pow(2, -10 * h) * Math.sin((h * k - i) * (2 * Math.PI) / j) + l + e
    },
    easeInOutElastic: function(f, h, e, l, k) {
        var i = 1.70158;
        var j = 0;
        var g = l;
        if (h == 0) {
            return e
        }
        if ((h /= k / 2) == 2) {
            return e + l
        }
        if (!j) {
            j = k * (0.3 * 1.5)
        }
        if (g < Math.abs(l)) {
            g = l;
            var i = j / 4
        } else {
            var i = j / (2 * Math.PI) * Math.asin(l / g)
        }
        if (h < 1) {
            return -0.5 * (g * Math.pow(2, 10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j)) + e
        }
        return g * Math.pow(2, -10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j) * 0.5 + l + e
    },
    easeInBack: function(e, f, a, i, h, g) {
        if (g == undefined) {
            g = 1.70158
        }
        return i * (f /= h) * f * ((g + 1) * f - g) + a
    },
    easeOutBack: function(e, f, a, i, h, g) {
        if (g == undefined) {
            g = 1.70158
        }
        return i * ((f = f / h - 1) * f * ((g + 1) * f + g) + 1) + a
    },
    easeInOutBack: function(e, f, a, i, h, g) {
        if (g == undefined) {
            g = 1.70158
        }
        if ((f /= h / 2) < 1) {
            return i / 2 * (f * f * (((g *= (1.525)) + 1) * f - g)) + a
        }
        return i / 2 * ((f -= 2) * f * (((g *= (1.525)) + 1) * f + g) + 2) + a
    },
    easeInBounce: function(e, f, a, h, g) {
        return h - jQuery.easing.easeOutBounce(e, g - f, 0, h, g) + a
    },
    easeOutBounce: function(e, f, a, h, g) {
        if ((f /= g) < (1 / 2.75)) {
            return h * (7.5625 * f * f) + a
        } else {
            if (f < (2 / 2.75)) {
                return h * (7.5625 * (f -= (1.5 / 2.75)) * f + 0.75) + a
            } else {
                if (f < (2.5 / 2.75)) {
                    return h * (7.5625 * (f -= (2.25 / 2.75)) * f + 0.9375) + a
                } else {
                    return h * (7.5625 * (f -= (2.625 / 2.75)) * f + 0.984375) + a
                }
            }
        }
    },
    easeInOutBounce: function(e, f, a, h, g) {
        if (f < g / 2) {
            return jQuery.easing.easeInBounce(e, f * 2, 0, h, g) * 0.5 + a
        }
        return jQuery.easing.easeOutBounce(e, f * 2 - g, 0, h, g) * 0.5 + h * 0.5 + a
    }
});

// Jquery isotope
(function(window, $, undefined) {
    'use strict';
    var document = window.document;
    var Modernizr = window.Modernizr;
    var capitalize = function(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    var prefixes = 'Moz Webkit O Ms'.split(' ');
    var getStyleProperty = function(propName) {
        var style = document.documentElement.style,
            prefixed;
        if (typeof style[propName] === 'string') {
            return propName;
        }
        propName = capitalize(propName);
        for (var i = 0, len = prefixes.length; i < len; i++) {
            prefixed = prefixes[i] + propName;
            if (typeof style[prefixed] === 'string') {
                return prefixed;
            }
        }
    };
    var transformProp = getStyleProperty('transform'),
        transitionProp = getStyleProperty('transitionProperty');
    var tests = {
        csstransforms: function() {
            return !!transformProp;
        },
        csstransforms3d: function() {
            var test = !!getStyleProperty('perspective');
            if (test) {
                var vendorCSSPrefixes = ' -o- -moz- -ms- -webkit- -khtml- '.split(' '),
                    mediaQuery = '@media (' + vendorCSSPrefixes.join('transform-3d),(') + 'modernizr)',
                    $style = $('<style>' + mediaQuery + '{#modernizr{height:3px}}' + '</style>').appendTo('head'),
                    $div = $('<div id="modernizr" />').appendTo('html');
                test = $div.height() === 3;
                $div.remove();
                $style.remove();
            }
            return test;
        },
        csstransitions: function() {
            return !!transitionProp;
        }
    };
    var testName;
    if (Modernizr) {
        for (testName in tests) {
            if (!Modernizr.hasOwnProperty(testName)) {
                Modernizr.addTest(testName, tests[testName]);
            }
        }
    } else {
        Modernizr = window.Modernizr = {
            _version: '1.6ish: miniModernizr for Isotope'
        };
        var classes = ' ';
        var result;
        for (testName in tests) {
            result = tests[testName]();
            Modernizr[testName] = result;
            classes += ' ' + (result ? '' : 'no-') + testName;
        }
        $('html').addClass(classes);
    }
    if (Modernizr.csstransforms) {
        var transformFnNotations = Modernizr.csstransforms3d ? {
            translate: function(position) {
                return 'translate3d(' + position[0] + 'px, ' + position[1] + 'px, 0) ';
            },
            scale: function(scale) {
                return 'scale3d(' + scale + ', ' + scale + ', 1) ';
            }
        } : {
            translate: function(position) {
                return 'translate(' + position[0] + 'px, ' + position[1] + 'px) ';
            },
            scale: function(scale) {
                return 'scale(' + scale + ') ';
            }
        };
        var setIsoTransform = function(elem, name, value) {
            var data = $.data(elem, 'isoTransform') || {},
                newData = {},
                fnName, transformObj = {},
                transformValue;
            newData[name] = value;
            $.extend(data, newData);
            for (fnName in data) {
                transformValue = data[fnName];
                transformObj[fnName] = transformFnNotations[fnName](transformValue);
            }
            var translateFn = transformObj.translate || '',
                scaleFn = transformObj.scale || '',
                valueFns = translateFn + scaleFn;
            $.data(elem, 'isoTransform', data);
            elem.style[transformProp] = valueFns;
        };
        $.cssNumber.scale = true;
        $.cssHooks.scale = {
            set: function(elem, value) {
                setIsoTransform(elem, 'scale', value);
            },
            get: function(elem, computed) {
                var transform = $.data(elem, 'isoTransform');
                return transform && transform.scale ? transform.scale : 1;
            }
        };
        $.fx.step.scale = function(fx) {
            $.cssHooks.scale.set(fx.elem, fx.now + fx.unit);
        };
        $.cssNumber.translate = true;
        $.cssHooks.translate = {
            set: function(elem, value) {
                setIsoTransform(elem, 'translate', value);
            },
            get: function(elem, computed) {
                var transform = $.data(elem, 'isoTransform');
                return transform && transform.translate ? transform.translate : [0, 0];
            }
        };
    }
    var transitionEndEvent, transitionDurProp;
    if (Modernizr.csstransitions) {
        transitionEndEvent = {
            WebkitTransitionProperty: 'webkitTransitionEnd',
            MozTransitionProperty: 'transitionend',
            OTransitionProperty: 'oTransitionEnd otransitionend',
            transitionProperty: 'transitionend'
        }[transitionProp];
        transitionDurProp = getStyleProperty('transitionDuration');
    }
    var $event = $.event,
        dispatchMethod = $.event.handle ? 'handle' : 'dispatch',
        resizeTimeout;
    $event.special.smartresize = {
        setup: function() {
            $(this).bind("resize", $event.special.smartresize.handler);
        },
        teardown: function() {
            $(this).unbind("resize", $event.special.smartresize.handler);
        },
        handler: function(event, execAsap) {
            var context = this,
                args = arguments;
            event.type = "smartresize";
            if (resizeTimeout) {
                clearTimeout(resizeTimeout);
            }
            resizeTimeout = setTimeout(function() {
                $event[dispatchMethod].apply(context, args);
            }, execAsap === "execAsap" ? 0 : 100);
        }
    };
    $.fn.smartresize = function(fn) {
        return fn ? this.bind("smartresize", fn) : this.trigger("smartresize", ["execAsap"]);
    };
    $.Isotope = function(options, element, callback) {
        this.element = $(element);
        this._create(options);
        this._init(callback);
    };
    var isoContainerStyles = ['width', 'height'];
    var $window = $(window);
    $.Isotope.settings = {
        resizable: true,
        layoutMode: 'masonry',
        containerClass: 'isotope',
        itemClass: 'isotope-item',
        hiddenClass: 'isotope-hidden',
        hiddenStyle: {
            opacity: 0,
            scale: 0.001
        },
        visibleStyle: {
            opacity: 1,
            scale: 1
        },
        containerStyle: {
            position: 'relative',
            overflow: 'hidden'
        },
        animationEngine: 'best-available',
        animationOptions: {
            queue: false,
            duration: 800
        },
        sortBy: 'original-order',
        sortAscending: true,
        resizesContainer: true,
        transformsEnabled: true,
        itemPositionDataEnabled: false
    };
    $.Isotope.prototype = {
        _create: function(options) {
            this.options = $.extend({}, $.Isotope.settings, options);
            this.styleQueue = [];
            this.elemCount = 0;
            var elemStyle = this.element[0].style;
            this.originalStyle = {};
            var containerStyles = isoContainerStyles.slice(0);
            for (var prop in this.options.containerStyle) {
                containerStyles.push(prop);
            }
            for (var i = 0, len = containerStyles.length; i < len; i++) {
                prop = containerStyles[i];
                this.originalStyle[prop] = elemStyle[prop] || '';
            }
            this.element.css(this.options.containerStyle);
            this._updateAnimationEngine();
            this._updateUsingTransforms();
            var originalOrderSorter = {
                'original-order': function($elem, instance) {
                    instance.elemCount++;
                    return instance.elemCount;
                },
                random: function() {
                    return Math.random();
                }
            };
            this.options.getSortData = $.extend(this.options.getSortData, originalOrderSorter);
            this.reloadItems();
            this.offset = {
                left: parseInt((this.element.css('padding-left') || 0), 10),
                top: parseInt((this.element.css('padding-top') || 0), 10)
            };
            var instance = this;
            setTimeout(function() {
                instance.element.addClass(instance.options.containerClass);
            }, 0);
            if (this.options.resizable) {
                $window.bind('smartresize.isotope', function() {
                    instance.resize();
                });
            }
            this.element.delegate('.' + this.options.hiddenClass, 'click', function() {
                return false;
            });
        },
        _getAtoms: function($elems) {
            var selector = this.options.itemSelector,
                $atoms = selector ? $elems.filter(selector).add($elems.find(selector)) : $elems,
                atomStyle = {
                    position: 'absolute'
                };
            $atoms = $atoms.filter(function(i, atom) {
                return atom.nodeType === 1;
            });
            if (this.usingTransforms) {
                atomStyle.left = 0;
                atomStyle.top = 0;
            }
            $atoms.css(atomStyle).addClass(this.options.itemClass);
            this.updateSortData($atoms, true);
            return $atoms;
        },
        _init: function(callback) {
            this.$filteredAtoms = this._filter(this.$allAtoms);
            this._sort();
            this.reLayout(callback);
        },
        option: function(opts) {
            if ($.isPlainObject(opts)) {
                this.options = $.extend(true, this.options, opts);
                var updateOptionFn;
                for (var optionName in opts) {
                    updateOptionFn = '_update' + capitalize(optionName);
                    if (this[updateOptionFn]) {
                        this[updateOptionFn]();
                    }
                }
            }
        },
        _updateAnimationEngine: function() {
            var animationEngine = this.options.animationEngine.toLowerCase().replace(/[ _\-]/g, '');
            var isUsingJQueryAnimation;
            switch (animationEngine) {
                case 'css':
                case 'none':
                    isUsingJQueryAnimation = false;
                    break;
                case 'jquery':
                    isUsingJQueryAnimation = true;
                    break;
                default:
                    isUsingJQueryAnimation = !Modernizr.csstransitions;
            }
            this.isUsingJQueryAnimation = isUsingJQueryAnimation;
            this._updateUsingTransforms();
        },
        _updateTransformsEnabled: function() {
            this._updateUsingTransforms();
        },
        _updateUsingTransforms: function() {
            var usingTransforms = this.usingTransforms = this.options.transformsEnabled && Modernizr.csstransforms && Modernizr.csstransitions && !this.isUsingJQueryAnimation;
            if (!usingTransforms) {
                delete this.options.hiddenStyle.scale;
                delete this.options.visibleStyle.scale;
            }
            this.getPositionStyles = usingTransforms ? this._translate : this._positionAbs;
        },
        _filter: function($atoms) {
            var filter = this.options.filter === '' ? '*' : this.options.filter;
            if (!filter) {
                return $atoms;
            }
            var hiddenClass = this.options.hiddenClass,
                hiddenSelector = '.' + hiddenClass,
                $hiddenAtoms = $atoms.filter(hiddenSelector),
                $atomsToShow = $hiddenAtoms;
            if (filter !== '*') {
                $atomsToShow = $hiddenAtoms.filter(filter);
                var $atomsToHide = $atoms.not(hiddenSelector).not(filter).addClass(hiddenClass);
                this.styleQueue.push({
                    $el: $atomsToHide,
                    style: this.options.hiddenStyle
                });
            }
            this.styleQueue.push({
                $el: $atomsToShow,
                style: this.options.visibleStyle
            });
            $atomsToShow.removeClass(hiddenClass);
            return $atoms.filter(filter);
        },
        updateSortData: function($atoms, isIncrementingElemCount) {
            var instance = this,
                getSortData = this.options.getSortData,
                $this, sortData;
            $atoms.each(function() {
                $this = $(this);
                sortData = {};
                for (var key in getSortData) {
                    if (!isIncrementingElemCount && key === 'original-order') {
                        sortData[key] = $.data(this, 'isotope-sort-data')[key];
                    } else {
                        sortData[key] = getSortData[key]($this, instance);
                    }
                }
                $.data(this, 'isotope-sort-data', sortData);
            });
        },
        _sort: function() {
            var sortBy = this.options.sortBy,
                getSorter = this._getSorter,
                sortDir = this.options.sortAscending ? 1 : -1,
                sortFn = function(alpha, beta) {
                    var a = getSorter(alpha, sortBy),
                        b = getSorter(beta, sortBy);
                    if (a === b && sortBy !== 'original-order') {
                        a = getSorter(alpha, 'original-order');
                        b = getSorter(beta, 'original-order');
                    }
                    return ((a > b) ? 1 : (a < b) ? -1 : 0) * sortDir;
                };
            this.$filteredAtoms.sort(sortFn);
        },
        _getSorter: function(elem, sortBy) {
            return $.data(elem, 'isotope-sort-data')[sortBy];
        },
        _translate: function(x, y) {
            return {
                translate: [x, y]
            };
        },
        _positionAbs: function(x, y) {
            return {
                left: x,
                top: y
            };
        },
        _pushPosition: function($elem, x, y) {
            x = Math.round(x + this.offset.left);
            y = Math.round(y + this.offset.top);
            var position = this.getPositionStyles(x, y);
            this.styleQueue.push({
                $el: $elem,
                style: position
            });
            if (this.options.itemPositionDataEnabled) {
                $elem.data('isotope-item-position', {
                    x: x,
                    y: y
                });
            }
        },
        layout: function($elems, callback) {
            var layoutMode = this.options.layoutMode;
            this['_' + layoutMode + 'Layout']($elems);
            if (this.options.resizesContainer) {
                var containerStyle = this['_' + layoutMode + 'GetContainerSize']();
                this.styleQueue.push({
                    $el: this.element,
                    style: containerStyle
                });
            }
            this._processStyleQueue($elems, callback);
            this.isLaidOut = true;
        },
        _processStyleQueue: function($elems, callback) {
            var styleFn = !this.isLaidOut ? 'css' : (this.isUsingJQueryAnimation ? 'animate' : 'css'),
                animOpts = this.options.animationOptions,
                onLayout = this.options.onLayout,
                objStyleFn, processor, triggerCallbackNow, callbackFn;
            processor = function(i, obj) {
                obj.$el[styleFn](obj.style, animOpts);
            };
            if (this._isInserting && this.isUsingJQueryAnimation) {
                processor = function(i, obj) {
                    objStyleFn = obj.$el.hasClass('no-transition') ? 'css' : styleFn;
                    obj.$el[objStyleFn](obj.style, animOpts);
                };
            } else if (callback || onLayout || animOpts.complete) {
                var isCallbackTriggered = false,
                    callbacks = [callback, onLayout, animOpts.complete],
                    instance = this;
                triggerCallbackNow = true;
                callbackFn = function() {
                    if (isCallbackTriggered) {
                        return;
                    }
                    var hollaback;
                    for (var i = 0, len = callbacks.length; i < len; i++) {
                        hollaback = callbacks[i];
                        if (typeof hollaback === 'function') {
                            hollaback.call(instance.element, $elems, instance);
                        }
                    }
                    isCallbackTriggered = true;
                };
                if (this.isUsingJQueryAnimation && styleFn === 'animate') {
                    animOpts.complete = callbackFn;
                    triggerCallbackNow = false;
                } else if (Modernizr.csstransitions) {
                    var i = 0,
                        firstItem = this.styleQueue[0],
                        testElem = firstItem && firstItem.$el,
                        styleObj;
                    while (!testElem || !testElem.length) {
                        styleObj = this.styleQueue[i++];
                        if (!styleObj) {
                            return;
                        }
                        testElem = styleObj.$el;
                    }
                    var duration = parseFloat(getComputedStyle(testElem[0])[transitionDurProp]);
                    if (duration > 0) {
                        processor = function(i, obj) {
                            obj.$el[styleFn](obj.style, animOpts).one(transitionEndEvent, callbackFn);
                        };
                        triggerCallbackNow = false;
                    }
                }
            }
            $.each(this.styleQueue, processor);
            if (triggerCallbackNow) {
                callbackFn();
            }
            this.styleQueue = [];
        },
        resize: function() {
            if (this['_' + this.options.layoutMode + 'ResizeChanged']()) {
                this.reLayout();
            }
        },
        reLayout: function(callback) {
            this['_' + this.options.layoutMode + 'Reset']();
            this.layout(this.$filteredAtoms, callback);
        },
        addItems: function($content, callback) {
            var $newAtoms = this._getAtoms($content);
            this.$allAtoms = this.$allAtoms.add($newAtoms);
            if (callback) {
                callback($newAtoms);
            }
        },
        insert: function($content, callback) {
            this.element.append($content);
            var instance = this;
            this.addItems($content, function($newAtoms) {
                var $newFilteredAtoms = instance._filter($newAtoms);
                instance._addHideAppended($newFilteredAtoms);
                instance._sort();
                instance.reLayout();
                instance._revealAppended($newFilteredAtoms, callback);
            });
        },
        appended: function($content, callback) {
            var instance = this;
            this.addItems($content, function($newAtoms) {
                instance._addHideAppended($newAtoms);
                instance.layout($newAtoms);
                instance._revealAppended($newAtoms, callback);
            });
        },
        _addHideAppended: function($newAtoms) {
            this.$filteredAtoms = this.$filteredAtoms.add($newAtoms);
            $newAtoms.addClass('no-transition');
            this._isInserting = true;
            this.styleQueue.push({
                $el: $newAtoms,
                style: this.options.hiddenStyle
            });
        },
        _revealAppended: function($newAtoms, callback) {
            var instance = this;
            setTimeout(function() {
                $newAtoms.removeClass('no-transition');
                instance.styleQueue.push({
                    $el: $newAtoms,
                    style: instance.options.visibleStyle
                });
                instance._isInserting = false;
                instance._processStyleQueue($newAtoms, callback);
            }, 10);
        },
        reloadItems: function() {
            this.$allAtoms = this._getAtoms(this.element.children());
        },
        remove: function($content, callback) {
            this.$allAtoms = this.$allAtoms.not($content);
            this.$filteredAtoms = this.$filteredAtoms.not($content);
            var instance = this;
            var removeContent = function() {
                $content.remove();
                if (callback) {
                    callback.call(instance.element);
                }
            };
            if ($content.filter(':not(.' + this.options.hiddenClass + ')').length) {
                this.styleQueue.push({
                    $el: $content,
                    style: this.options.hiddenStyle
                });
                this._sort();
                this.reLayout(removeContent);
            } else {
                removeContent();
            }
        },
        shuffle: function(callback) {
            this.updateSortData(this.$allAtoms);
            this.options.sortBy = 'random';
            this._sort();
            this.reLayout(callback);
        },
        destroy: function() {
            var usingTransforms = this.usingTransforms;
            var options = this.options;
            this.$allAtoms.removeClass(options.hiddenClass + ' ' + options.itemClass).each(function() {
                var style = this.style;
                style.position = '';
                style.top = '';
                style.left = '';
                style.opacity = '';
                if (usingTransforms) {
                    style[transformProp] = '';
                }
            });
            var elemStyle = this.element[0].style;
            for (var prop in this.originalStyle) {
                elemStyle[prop] = this.originalStyle[prop];
            }
            this.element.unbind('.isotope').undelegate('.' + options.hiddenClass, 'click').removeClass(options.containerClass).removeData('isotope');
            $window.unbind('.isotope');
        },
        _getSegments: function(isRows) {
            var namespace = this.options.layoutMode,
                measure = isRows ? 'rowHeight' : 'columnWidth',
                size = isRows ? 'height' : 'width',
                segmentsName = isRows ? 'rows' : 'cols',
                containerSize = this.element[size](),
                segments, segmentSize = this.options[namespace] && this.options[namespace][measure] || this.$filteredAtoms['outer' + capitalize(size)](true) || containerSize;
            segments = Math.floor(containerSize / segmentSize);
            segments = Math.max(segments, 1);
            this[namespace][segmentsName] = segments;
            this[namespace][measure] = segmentSize;
        },
        _checkIfSegmentsChanged: function(isRows) {
            var namespace = this.options.layoutMode,
                segmentsName = isRows ? 'rows' : 'cols',
                prevSegments = this[namespace][segmentsName];
            this._getSegments(isRows);
            return (this[namespace][segmentsName] !== prevSegments);
        },
        _masonryReset: function() {
            this.masonry = {};
            this._getSegments();
            var i = this.masonry.cols;
            this.masonry.colYs = [];
            while (i--) {
                this.masonry.colYs.push(0);
            }
        },
        _masonryLayout: function($elems) {
            var instance = this,
                props = instance.masonry;
            $elems.each(function() {
                var $this = $(this),
                    colSpan = Math.ceil($this.outerWidth(true) / props.columnWidth);
                colSpan = Math.min(colSpan, props.cols);
                if (colSpan === 1) {
                    instance._masonryPlaceBrick($this, props.colYs);
                } else {
                    var groupCount = props.cols + 1 - colSpan,
                        groupY = [],
                        groupColY, i;
                    for (i = 0; i < groupCount; i++) {
                        groupColY = props.colYs.slice(i, i + colSpan);
                        groupY[i] = Math.max.apply(Math, groupColY);
                    }
                    instance._masonryPlaceBrick($this, groupY);
                }
            });
        },
        _masonryPlaceBrick: function($brick, setY) {
            var minimumY = Math.min.apply(Math, setY),
                shortCol = 0;
            for (var i = 0, len = setY.length; i < len; i++) {
                if (setY[i] === minimumY) {
                    shortCol = i;
                    break;
                }
            }
            var x = this.masonry.columnWidth * shortCol,
                y = minimumY;
            this._pushPosition($brick, x, y);
            var setHeight = minimumY + $brick.outerHeight(true),
                setSpan = this.masonry.cols + 1 - len;
            for (i = 0; i < setSpan; i++) {
                this.masonry.colYs[shortCol + i] = setHeight;
            }
        },
        _masonryGetContainerSize: function() {
            var containerHeight = Math.max.apply(Math, this.masonry.colYs);
            return {
                height: containerHeight
            };
        },
        _masonryResizeChanged: function() {
            return this._checkIfSegmentsChanged();
        },
        _fitRowsReset: function() {
            this.fitRows = {
                x: 0,
                y: 0,
                height: 0
            };
        },
        _fitRowsLayout: function($elems) {
            var instance = this,
                containerWidth = this.element.width(),
                props = this.fitRows;
            $elems.each(function() {
                var $this = $(this),
                    atomW = $this.outerWidth(true),
                    atomH = $this.outerHeight(true);
                if (props.x !== 0 && atomW + props.x > containerWidth) {
                    props.x = 0;
                    props.y = props.height;
                }
                instance._pushPosition($this, props.x, props.y);
                props.height = Math.max(props.y + atomH, props.height);
                props.x += atomW;
            });
        },
        _fitRowsGetContainerSize: function() {
            return {
                height: this.fitRows.height
            };
        },
        _fitRowsResizeChanged: function() {
            return true;
        },
        _cellsByRowReset: function() {
            this.cellsByRow = {
                index: 0
            };
            this._getSegments();
            this._getSegments(true);
        },
        _cellsByRowLayout: function($elems) {
            var instance = this,
                props = this.cellsByRow;
            $elems.each(function() {
                var $this = $(this),
                    col = props.index % props.cols,
                    row = Math.floor(props.index / props.cols),
                    x = (col + 0.5) * props.columnWidth - $this.outerWidth(true) / 2,
                    y = (row + 0.5) * props.rowHeight - $this.outerHeight(true) / 2;
                instance._pushPosition($this, x, y);
                props.index++;
            });
        },
        _cellsByRowGetContainerSize: function() {
            return {
                height: Math.ceil(this.$filteredAtoms.length / this.cellsByRow.cols) * this.cellsByRow.rowHeight + this.offset.top
            };
        },
        _cellsByRowResizeChanged: function() {
            return this._checkIfSegmentsChanged();
        },
        _straightDownReset: function() {
            this.straightDown = {
                y: 0
            };
        },
        _straightDownLayout: function($elems) {
            var instance = this;
            $elems.each(function(i) {
                var $this = $(this);
                instance._pushPosition($this, 0, instance.straightDown.y);
                instance.straightDown.y += $this.outerHeight(true);
            });
        },
        _straightDownGetContainerSize: function() {
            return {
                height: this.straightDown.y
            };
        },
        _straightDownResizeChanged: function() {
            return true;
        },
        _masonryHorizontalReset: function() {
            this.masonryHorizontal = {};
            this._getSegments(true);
            var i = this.masonryHorizontal.rows;
            this.masonryHorizontal.rowXs = [];
            while (i--) {
                this.masonryHorizontal.rowXs.push(0);
            }
        },
        _masonryHorizontalLayout: function($elems) {
            var instance = this,
                props = instance.masonryHorizontal;
            $elems.each(function() {
                var $this = $(this),
                    rowSpan = Math.ceil($this.outerHeight(true) / props.rowHeight);
                rowSpan = Math.min(rowSpan, props.rows);
                if (rowSpan === 1) {
                    instance._masonryHorizontalPlaceBrick($this, props.rowXs);
                } else {
                    var groupCount = props.rows + 1 - rowSpan,
                        groupX = [],
                        groupRowX, i;
                    for (i = 0; i < groupCount; i++) {
                        groupRowX = props.rowXs.slice(i, i + rowSpan);
                        groupX[i] = Math.max.apply(Math, groupRowX);
                    }
                    instance._masonryHorizontalPlaceBrick($this, groupX);
                }
            });
        },
        _masonryHorizontalPlaceBrick: function($brick, setX) {
            var minimumX = Math.min.apply(Math, setX),
                smallRow = 0;
            for (var i = 0, len = setX.length; i < len; i++) {
                if (setX[i] === minimumX) {
                    smallRow = i;
                    break;
                }
            }
            var x = minimumX,
                y = this.masonryHorizontal.rowHeight * smallRow;
            this._pushPosition($brick, x, y);
            var setWidth = minimumX + $brick.outerWidth(true),
                setSpan = this.masonryHorizontal.rows + 1 - len;
            for (i = 0; i < setSpan; i++) {
                this.masonryHorizontal.rowXs[smallRow + i] = setWidth;
            }
        },
        _masonryHorizontalGetContainerSize: function() {
            var containerWidth = Math.max.apply(Math, this.masonryHorizontal.rowXs);
            return {
                width: containerWidth
            };
        },
        _masonryHorizontalResizeChanged: function() {
            return this._checkIfSegmentsChanged(true);
        },
        _fitColumnsReset: function() {
            this.fitColumns = {
                x: 0,
                y: 0,
                width: 0
            };
        },
        _fitColumnsLayout: function($elems) {
            var instance = this,
                containerHeight = this.element.height(),
                props = this.fitColumns;
            $elems.each(function() {
                var $this = $(this),
                    atomW = $this.outerWidth(true),
                    atomH = $this.outerHeight(true);
                if (props.y !== 0 && atomH + props.y > containerHeight) {
                    props.x = props.width;
                    props.y = 0;
                }
                instance._pushPosition($this, props.x, props.y);
                props.width = Math.max(props.x + atomW, props.width);
                props.y += atomH;
            });
        },
        _fitColumnsGetContainerSize: function() {
            return {
                width: this.fitColumns.width
            };
        },
        _fitColumnsResizeChanged: function() {
            return true;
        },
        _cellsByColumnReset: function() {
            this.cellsByColumn = {
                index: 0
            };
            this._getSegments();
            this._getSegments(true);
        },
        _cellsByColumnLayout: function($elems) {
            var instance = this,
                props = this.cellsByColumn;
            $elems.each(function() {
                var $this = $(this),
                    col = Math.floor(props.index / props.rows),
                    row = props.index % props.rows,
                    x = (col + 0.5) * props.columnWidth - $this.outerWidth(true) / 2,
                    y = (row + 0.5) * props.rowHeight - $this.outerHeight(true) / 2;
                instance._pushPosition($this, x, y);
                props.index++;
            });
        },
        _cellsByColumnGetContainerSize: function() {
            return {
                width: Math.ceil(this.$filteredAtoms.length / this.cellsByColumn.rows) * this.cellsByColumn.columnWidth
            };
        },
        _cellsByColumnResizeChanged: function() {
            return this._checkIfSegmentsChanged(true);
        },
        _straightAcrossReset: function() {
            this.straightAcross = {
                x: 0
            };
        },
        _straightAcrossLayout: function($elems) {
            var instance = this;
            $elems.each(function(i) {
                var $this = $(this);
                instance._pushPosition($this, instance.straightAcross.x, 0);
                instance.straightAcross.x += $this.outerWidth(true);
            });
        },
        _straightAcrossGetContainerSize: function() {
            return {
                width: this.straightAcross.x
            };
        },
        _straightAcrossResizeChanged: function() {
            return true;
        }
    };
    $.fn.imagesLoaded = function(callback) {
        var $this = this,
            $images = $this.find('img').add($this.filter('img')),
            len = $images.length,
            blank = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==',
            loaded = [];

        function triggerCallback() {
            callback.call($this, $images);
        }

        function imgLoaded(event) {
            var img = event.target;
            if (img.src !== blank && $.inArray(img, loaded) === -1) {
                loaded.push(img);
                if (--len <= 0) {
                    setTimeout(triggerCallback);
                    $images.unbind('.imagesLoaded', imgLoaded);
                }
            }
        }
        if (!len) {
            triggerCallback();
        }
        $images.bind('load.imagesLoaded error.imagesLoaded', imgLoaded).each(function() {
            var src = this.src;
            this.src = blank;
            this.src = src;
        });
        return $this;
    };
    var logError = function(message) {
        if (window.console) {
            window.console.error(message);
        }
    };
    $.fn.isotope = function(options, callback) {
        if (typeof options === 'string') {
            var args = Array.prototype.slice.call(arguments, 1);
            this.each(function() {
                var instance = $.data(this, 'isotope');
                if (!instance) {
                    logError("cannot call methods on isotope prior to initialization; " + "attempted to call method '" + options + "'");
                    return;
                }
                if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {
                    logError("no such method '" + options + "' for isotope instance");
                    return;
                }
                instance[options].apply(instance, args);
            });
        } else {
            this.each(function() {
                var instance = $.data(this, 'isotope');
                if (instance) {
                    instance.option(options);
                    instance._init(callback);
                } else {
                    $.data(this, 'isotope', new $.Isotope(options, this, callback));
                }
            });
        }
        return this;
    };
})(window, jQuery);

// Custom JS
$(document).ready(function() {
    $('.scroll-me a').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1200, 'easeInOutExpo');
        event.preventDefault();
    });
    $('#carousel-slider').carousel({
        interval: 7500
    });
    $.vegas('overlay', {
        src: 'assets/js/overlays/05.png'
    });
    $('.fancybox-media').fancybox({
        openEffect: 'elastic',
        closeEffect: 'elastic',
        helpers: {
            title: {
                type: 'inside'
            }
        }
    });
    $(window).load(function() {
        var $container = $('#work-div');
        $container.isotope({
            filter: '*',
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });
        $('.caegories a').click(function() {
            $('.caegories .active').removeClass('active');
            $(this).addClass('active');
            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });
            return false;
        });
    });
});

// ----------------------------------------------------------------------------
// Vegas - Fullscreen Backgrounds and Slideshows with jQuery.
// v1.3.4 - released 2013-12-16 13:28
// Licensed under the MIT license.
// http://vegas.jaysalvat.com/
// ----------------------------------------------------------------------------
// Copyright (C) 2010-2013 Jay Salvat
// http://jaysalvat.com/
// ----------------------------------------------------------------------------

(function(e) {
    function t(a, n) {
        var o = {
            align: "center",
            valign: "center"
        };
        if (e.extend(o, n), 0 === a.height()) return a.load(function() {
            t(e(this), n)
        }), void 0;
        var i, s, g, d = r(),
            l = d.width,
            u = d.height,
            c = a.width(),
            v = a.height(),
            p = u / l,
            f = v / c;
        p > f ? (i = u / f, s = u) : (i = l, s = l * f), g = {
            width: i + "px",
            height: s + "px",
            top: "auto",
            bottom: "auto",
            left: "auto",
            right: "auto"
        }, isNaN(parseInt(o.valign, 10)) ? "top" == o.valign ? g.top = 0 : "bottom" == o.valign ? g.bottom = 0 : g.top = (u - s) / 2 : g.top = 0 - (s - u) / 100 * parseInt(o.valign, 10) + "px", isNaN(parseInt(o.align, 10)) ? "left" == o.align ? g.left = 0 : "right" == o.align ? g.right = 0 : g.left = (l - i) / 2 : g.left = 0 - (i - l) / 100 * parseInt(o.align, 10) + "px", a.css(g)
    }

    function a() {
        d.prependTo("body").fadeIn()
    }

    function n() {
        d.fadeOut("fast", function() {
            e(this).remove()
        })
    }

    function o() {
        return e("body").css("backgroundImage") ? e("body").css("backgroundImage").replace(/url\("?(.*?)"?\)/i, "$1") : void 0
    }

    function r() {
        var e = window,
            t = "inner";
        return "innerWidth" in window || (e = document.documentElement || document.body, t = "client"), {
            width: e[t + "Width"],
            height: e[t + "Height"]
        }
    }
    var i, s = e("<img />").addClass("vegas-background"),
        g = e("<div />").addClass("vegas-overlay"),
        d = e("<div />").addClass("vegas-loading"),
        l = e(),
        u = null,
        c = [],
        v = 0,
        p = 5e3,
        f = function() {},
        h = {
            init: function(r) {
                var i = {
                    src: o(),
                    align: "center",
                    valign: "center",
                    fade: 0,
                    loading: !0,
                    load: function() {},
                    complete: function() {}
                };
                e.extend(i, e.vegas.defaults.background, r), i.loading && a();
                var g = s.clone();
                return g.css({
                    position: "fixed",
                    left: "0px",
                    top: "0px"
                }).bind("load", function() {
                    g != l && (e(window).bind("load resize.vegas", function() {
                        t(g, i)
                    }), l.is("img") ? (l.stop(), g.hide().insertAfter(l).fadeIn(i.fade, function() {
                        e(".vegas-background").not(this).remove(), e("body").trigger("vegascomplete", [this, v - 1]), i.complete.apply(g, [v - 1])
                    })) : g.hide().prependTo("body").fadeIn(i.fade, function() {
                        e("body").trigger("vegascomplete", [this, v - 1]), i.complete.apply(this, [v - 1])
                    }), l = g, t(l, i), i.loading && n(), e("body").trigger("vegasload", [l.get(0), v - 1]), i.load.apply(l.get(0), [v - 1]), v && (e("body").trigger("vegaswalk", [l.get(0), v - 1]), i.walk.apply(l.get(0), [v - 1])))
                }).attr("src", i.src), e.vegas
            },
            destroy: function(t) {
                return t && "background" != t || (e(".vegas-background, .vegas-loading").remove(), e(window).unbind("*.vegas"), l = e()), t && "overlay" != t || e(".vegas-overlay").remove(), clearInterval(i), e.vegas
            },
            overlay: function(t) {
                var a = {
                    src: null,
                    opacity: null
                };
                return e.extend(a, e.vegas.defaults.overlay, t), g.remove(), g.css({
                    margin: "0",
                    padding: "0",
                    position: "fixed",
                    left: "0px",
                    top: "0px",
                    width: "100%",
                    height: "100%"
                }), a.src === !1 && g.css("backgroundImage", "none"), a.src && g.css("backgroundImage", "url(" + a.src + ")"), a.opacity && g.css("opacity", a.opacity), g.prependTo("body"), e.vegas
            },
            slideshow: function(t, a) {
                var n = {
                    step: v,
                    delay: p,
                    preload: !1,
                    loading: !0,
                    backgrounds: c,
                    walk: f
                };
                if (e.extend(n, e.vegas.defaults.slideshow, t), n.backgrounds != c && (t.step || (n.step = 0), t.walk || (n.walk = function() {}), n.preload && e.vegas("preload", n.backgrounds)), c = n.backgrounds, p = n.delay, v = n.step, f = n.walk, clearInterval(i), !c.length) return e.vegas;
                var o = function() {
                    0 > v && (v = c.length - 1), (v >= c.length || !c[v - 1]) && (v = 0);
                    var t = c[v++];
                    t.walk = n.walk, t.loading = n.loading, t.fade === void 0 && (t.fade = n.fade), t.fade > n.delay && (t.fade = n.delay), e.vegas(t)
                };
                return o(), a || (u = !1, e("body").trigger("vegasstart", [l.get(0), v - 1])), u || (i = setInterval(o, n.delay)), e.vegas
            },
            next: function() {
                var t = v;
                return v && (e.vegas("slideshow", {
                    step: v
                }, !0), e("body").trigger("vegasnext", [l.get(0), v - 1, t - 1])), e.vegas
            },
            previous: function() {
                var t = v;
                return v && (e.vegas("slideshow", {
                    step: v - 2
                }, !0), e("body").trigger("vegasprevious", [l.get(0), v - 1, t - 1])), e.vegas
            },
            jump: function(t) {
                var a = v;
                return v && (e.vegas("slideshow", {
                    step: t
                }, !0), e("body").trigger("vegasjump", [l.get(0), v - 1, a - 1])), e.vegas
            },
            stop: function() {
                var t = v;
                return v = 0, u = null, clearInterval(i), e("body").trigger("vegasstop", [l.get(0), t - 1]), e.vegas
            },
            pause: function() {
                return u = !0, clearInterval(i), e("body").trigger("vegaspause", [l.get(0), v - 1]), e.vegas
            },
            get: function(e) {
                return null === e || "background" == e ? l.get(0) : "overlay" == e ? g.get(0) : "step" == e ? v - 1 : "paused" == e ? u : void 0
            },
            preload: function(t) {
                var a = [];
                for (var n in t)
                    if (t[n].src) {
                        var o = document.createElement("img");
                        o.src = t[n].src, a.push(o)
                    }
                return e.vegas
            }
        };
    e.vegas = function(t) {
        return h[t] ? h[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t ? (e.error("Method " + t + " does not exist"), void 0) : h.init.apply(this, arguments)
    }, e.vegas.defaults = {
        background: {},
        slideshow: {},
        overlay: {}
    }
})(jQuery);

// fancybox
(function(window, document, $, undefined) {
    "use strict";
    var H = $("html"),
        W = $(window),
        D = $(document),
        F = $.fancybox = function() {
            F.open.apply(this, arguments);
        },
        IE = navigator.userAgent.match(/msie/i),
        didUpdate = null,
        isTouch = document.createTouch !== undefined,
        isQuery = function(obj) {
            return obj && obj.hasOwnProperty && obj instanceof $;
        },
        isString = function(str) {
            return str && $.type(str) === "string";
        },
        isPercentage = function(str) {
            return isString(str) && str.indexOf('%') > 0;
        },
        isScrollable = function(el) {
            return (el && !(el.style.overflow && el.style.overflow === 'hidden') && ((el.clientWidth && el.scrollWidth > el.clientWidth) || (el.clientHeight && el.scrollHeight > el.clientHeight)));
        },
        getScalar = function(orig, dim) {
            var value = parseInt(orig, 10) || 0;
            if (dim && isPercentage(orig)) {
                value = F.getViewport()[dim] / 100 * value;
            }
            return Math.ceil(value);
        },
        getValue = function(value, dim) {
            return getScalar(value, dim) + 'px';
        };
    $.extend(F, {
        version: '2.1.5',
        defaults: {
            padding: 15,
            margin: 20,
            width: 800,
            height: 600,
            minWidth: 100,
            minHeight: 100,
            maxWidth: 9999,
            maxHeight: 9999,
            pixelRatio: 1,
            autoSize: true,
            autoHeight: false,
            autoWidth: false,
            autoResize: true,
            autoCenter: !isTouch,
            fitToView: true,
            aspectRatio: false,
            topRatio: 0.5,
            leftRatio: 0.5,
            scrolling: 'auto',
            wrapCSS: '',
            arrows: true,
            closeBtn: true,
            closeClick: false,
            nextClick: false,
            mouseWheel: true,
            autoPlay: false,
            playSpeed: 3000,
            preload: 3,
            modal: false,
            loop: true,
            ajax: {
                dataType: 'html',
                headers: {
                    'X-fancyBox': true
                }
            },
            iframe: {
                scrolling: 'auto',
                preload: true
            },
            swf: {
                wmode: 'transparent',
                allowfullscreen: 'true',
                allowscriptaccess: 'always'
            },
            keys: {
                next: {
                    13: 'left',
                    34: 'up',
                    39: 'left',
                    40: 'up'
                },
                prev: {
                    8: 'right',
                    33: 'down',
                    37: 'right',
                    38: 'down'
                },
                close: [27],
                play: [32],
                toggle: [70]
            },
            direction: {
                next: 'left',
                prev: 'right'
            },
            scrollOutside: true,
            index: 0,
            type: null,
            href: null,
            content: null,
            title: null,
            tpl: {
                wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
                image: '<img class="fancybox-image" src="{href}" alt="" />',
                iframe: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + (IE ? ' allowtransparency="true"' : '') + '></iframe>',
                error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
                closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
                next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
                prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
            },
            openEffect: 'fade',
            openSpeed: 250,
            openEasing: 'swing',
            openOpacity: true,
            openMethod: 'zoomIn',
            closeEffect: 'fade',
            closeSpeed: 250,
            closeEasing: 'swing',
            closeOpacity: true,
            closeMethod: 'zoomOut',
            nextEffect: 'fade',
            nextSpeed: 250,
            nextEasing: 'swing',
            nextMethod: 'changeIn',
            prevEffect: 'fade',
            prevSpeed: 250,
            prevEasing: 'swing',
            prevMethod: 'changeOut',
            helpers: {
                overlay: true,
                title: true
            },
            onCancel: $.noop,
            beforeLoad: $.noop,
            afterLoad: $.noop,
            beforeShow: $.noop,
            afterShow: $.noop,
            beforeChange: $.noop,
            beforeClose: $.noop,
            afterClose: $.noop
        },
        group: {},
        opts: {},
        previous: null,
        coming: null,
        current: null,
        isActive: false,
        isOpen: false,
        isOpened: false,
        wrap: null,
        skin: null,
        outer: null,
        inner: null,
        player: {
            timer: null,
            isActive: false
        },
        ajaxLoad: null,
        imgPreload: null,
        transitions: {},
        helpers: {},
        open: function(group, opts) {
            if (!group) {
                return;
            }
            if (!$.isPlainObject(opts)) {
                opts = {};
            }
            if (false === F.close(true)) {
                return;
            }
            if (!$.isArray(group)) {
                group = isQuery(group) ? $(group).get() : [group];
            }
            $.each(group, function(i, element) {
                var obj = {},
                    href, title, content, type, rez, hrefParts, selector;
                if ($.type(element) === "object") {
                    if (element.nodeType) {
                        element = $(element);
                    }
                    if (isQuery(element)) {
                        obj = {
                            href: element.data('fancybox-href') || element.attr('href'),
                            title: element.data('fancybox-title') || element.attr('title'),
                            isDom: true,
                            element: element
                        };
                        if ($.metadata) {
                            $.extend(true, obj, element.metadata());
                        }
                    } else {
                        obj = element;
                    }
                }
                href = opts.href || obj.href || (isString(element) ? element : null);
                title = opts.title !== undefined ? opts.title : obj.title || '';
                content = opts.content || obj.content;
                type = content ? 'html' : (opts.type || obj.type);
                if (!type && obj.isDom) {
                    type = element.data('fancybox-type');
                    if (!type) {
                        rez = element.prop('class').match(/fancybox\.(\w+)/);
                        type = rez ? rez[1] : null;
                    }
                }
                if (isString(href)) {
                    if (!type) {
                        if (F.isImage(href)) {
                            type = 'image';
                        } else if (F.isSWF(href)) {
                            type = 'swf';
                        } else if (href.charAt(0) === '#') {
                            type = 'inline';
                        } else if (isString(element)) {
                            type = 'html';
                            content = element;
                        }
                    }
                    if (type === 'ajax') {
                        hrefParts = href.split(/\s+/, 2);
                        href = hrefParts.shift();
                        selector = hrefParts.shift();
                    }
                }
                if (!content) {
                    if (type === 'inline') {
                        if (href) {
                            content = $(isString(href) ? href.replace(/.*(?=#[^\s]+$)/, '') : href);
                        } else if (obj.isDom) {
                            content = element;
                        }
                    } else if (type === 'html') {
                        content = href;
                    } else if (!type && !href && obj.isDom) {
                        type = 'inline';
                        content = element;
                    }
                }
                $.extend(obj, {
                    href: href,
                    type: type,
                    content: content,
                    title: title,
                    selector: selector
                });
                group[i] = obj;
            });
            F.opts = $.extend(true, {}, F.defaults, opts);
            if (opts.keys !== undefined) {
                F.opts.keys = opts.keys ? $.extend({}, F.defaults.keys, opts.keys) : false;
            }
            F.group = group;
            return F._start(F.opts.index);
        },
        cancel: function() {
            var coming = F.coming;
            if (!coming || false === F.trigger('onCancel')) {
                return;
            }
            F.hideLoading();
            if (F.ajaxLoad) {
                F.ajaxLoad.abort();
            }
            F.ajaxLoad = null;
            if (F.imgPreload) {
                F.imgPreload.onload = F.imgPreload.onerror = null;
            }
            if (coming.wrap) {
                coming.wrap.stop(true, true).trigger('onReset').remove();
            }
            F.coming = null;
            if (!F.current) {
                F._afterZoomOut(coming);
            }
        },
        close: function(event) {
            F.cancel();
            if (false === F.trigger('beforeClose')) {
                return;
            }
            F.unbindEvents();
            if (!F.isActive) {
                return;
            }
            if (!F.isOpen || event === true) {
                $('.fancybox-wrap').stop(true).trigger('onReset').remove();
                F._afterZoomOut();
            } else {
                F.isOpen = F.isOpened = false;
                F.isClosing = true;
                $('.fancybox-item, .fancybox-nav').remove();
                F.wrap.stop(true, true).removeClass('fancybox-opened');
                F.transitions[F.current.closeMethod]();
            }
        },
        play: function(action) {
            var clear = function() {
                    clearTimeout(F.player.timer);
                },
                set = function() {
                    clear();
                    if (F.current && F.player.isActive) {
                        F.player.timer = setTimeout(F.next, F.current.playSpeed);
                    }
                },
                stop = function() {
                    clear();
                    D.unbind('.player');
                    F.player.isActive = false;
                    F.trigger('onPlayEnd');
                },
                start = function() {
                    if (F.current && (F.current.loop || F.current.index < F.group.length - 1)) {
                        F.player.isActive = true;
                        D.bind({
                            'onCancel.player beforeClose.player': stop,
                            'onUpdate.player': set,
                            'beforeLoad.player': clear
                        });
                        set();
                        F.trigger('onPlayStart');
                    }
                };
            if (action === true || (!F.player.isActive && action !== false)) {
                start();
            } else {
                stop();
            }
        },
        next: function(direction) {
            var current = F.current;
            if (current) {
                if (!isString(direction)) {
                    direction = current.direction.next;
                }
                F.jumpto(current.index + 1, direction, 'next');
            }
        },
        prev: function(direction) {
            var current = F.current;
            if (current) {
                if (!isString(direction)) {
                    direction = current.direction.prev;
                }
                F.jumpto(current.index - 1, direction, 'prev');
            }
        },
        jumpto: function(index, direction, router) {
            var current = F.current;
            if (!current) {
                return;
            }
            index = getScalar(index);
            F.direction = direction || current.direction[(index >= current.index ? 'next' : 'prev')];
            F.router = router || 'jumpto';
            if (current.loop) {
                if (index < 0) {
                    index = current.group.length + (index % current.group.length);
                }
                index = index % current.group.length;
            }
            if (current.group[index] !== undefined) {
                F.cancel();
                F._start(index);
            }
        },
        reposition: function(e, onlyAbsolute) {
            var current = F.current,
                wrap = current ? current.wrap : null,
                pos;
            if (wrap) {
                pos = F._getPosition(onlyAbsolute);
                if (e && e.type === 'scroll') {
                    delete pos.position;
                    wrap.stop(true, true).animate(pos, 200);
                } else {
                    wrap.css(pos);
                    current.pos = $.extend({}, current.dim, pos);
                }
            }
        },
        update: function(e) {
            var type = (e && e.type),
                anyway = !type || type === 'orientationchange';
            if (anyway) {
                clearTimeout(didUpdate);
                didUpdate = null;
            }
            if (!F.isOpen || didUpdate) {
                return;
            }
            didUpdate = setTimeout(function() {
                var current = F.current;
                if (!current || F.isClosing) {
                    return;
                }
                F.wrap.removeClass('fancybox-tmp');
                if (anyway || type === 'load' || (type === 'resize' && current.autoResize)) {
                    F._setDimension();
                }
                if (!(type === 'scroll' && current.canShrink)) {
                    F.reposition(e);
                }
                F.trigger('onUpdate');
                didUpdate = null;
            }, (anyway && !isTouch ? 0 : 300));
        },
        toggle: function(action) {
            if (F.isOpen) {
                F.current.fitToView = $.type(action) === "boolean" ? action : !F.current.fitToView;
                if (isTouch) {
                    F.wrap.removeAttr('style').addClass('fancybox-tmp');
                    F.trigger('onUpdate');
                }
                F.update();
            }
        },
        hideLoading: function() {
            D.unbind('.loading');
            $('#fancybox-loading').remove();
        },
        showLoading: function() {
            var el, viewport;
            F.hideLoading();
            el = $('<div id="fancybox-loading"><div></div></div>').click(F.cancel).appendTo('body');
            D.bind('keydown.loading', function(e) {
                if ((e.which || e.keyCode) === 27) {
                    e.preventDefault();
                    F.cancel();
                }
            });
            if (!F.defaults.fixed) {
                viewport = F.getViewport();
                el.css({
                    position: 'absolute',
                    top: (viewport.h * 0.5) + viewport.y,
                    left: (viewport.w * 0.5) + viewport.x
                });
            }
        },
        getViewport: function() {
            var locked = (F.current && F.current.locked) || false,
                rez = {
                    x: W.scrollLeft(),
                    y: W.scrollTop()
                };
            if (locked) {
                rez.w = locked[0].clientWidth;
                rez.h = locked[0].clientHeight;
            } else {
                rez.w = isTouch && window.innerWidth ? window.innerWidth : W.width();
                rez.h = isTouch && window.innerHeight ? window.innerHeight : W.height();
            }
            return rez;
        },
        unbindEvents: function() {
            if (F.wrap && isQuery(F.wrap)) {
                F.wrap.unbind('.fb');
            }
            D.unbind('.fb');
            W.unbind('.fb');
        },
        bindEvents: function() {
            var current = F.current,
                keys;
            if (!current) {
                return;
            }
            W.bind('orientationchange.fb' + (isTouch ? '' : ' resize.fb') + (current.autoCenter && !current.locked ? ' scroll.fb' : ''), F.update);
            keys = current.keys;
            if (keys) {
                D.bind('keydown.fb', function(e) {
                    var code = e.which || e.keyCode,
                        target = e.target || e.srcElement;
                    if (code === 27 && F.coming) {
                        return false;
                    }
                    if (!e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey && !(target && (target.type || $(target).is('[contenteditable]')))) {
                        $.each(keys, function(i, val) {
                            if (current.group.length > 1 && val[code] !== undefined) {
                                F[i](val[code]);
                                e.preventDefault();
                                return false;
                            }
                            if ($.inArray(code, val) > -1) {
                                F[i]();
                                e.preventDefault();
                                return false;
                            }
                        });
                    }
                });
            }
            if ($.fn.mousewheel && current.mouseWheel) {
                F.wrap.bind('mousewheel.fb', function(e, delta, deltaX, deltaY) {
                    var target = e.target || null,
                        parent = $(target),
                        canScroll = false;
                    while (parent.length) {
                        if (canScroll || parent.is('.fancybox-skin') || parent.is('.fancybox-wrap')) {
                            break;
                        }
                        canScroll = isScrollable(parent[0]);
                        parent = $(parent).parent();
                    }
                    if (delta !== 0 && !canScroll) {
                        if (F.group.length > 1 && !current.canShrink) {
                            if (deltaY > 0 || deltaX > 0) {
                                F.prev(deltaY > 0 ? 'down' : 'left');
                            } else if (deltaY < 0 || deltaX < 0) {
                                F.next(deltaY < 0 ? 'up' : 'right');
                            }
                            e.preventDefault();
                        }
                    }
                });
            }
        },
        trigger: function(event, o) {
            var ret, obj = o || F.coming || F.current;
            if (!obj) {
                return;
            }
            if ($.isFunction(obj[event])) {
                ret = obj[event].apply(obj, Array.prototype.slice.call(arguments, 1));
            }
            if (ret === false) {
                return false;
            }
            if (obj.helpers) {
                $.each(obj.helpers, function(helper, opts) {
                    if (opts && F.helpers[helper] && $.isFunction(F.helpers[helper][event])) {
                        F.helpers[helper][event]($.extend(true, {}, F.helpers[helper].defaults, opts), obj);
                    }
                });
            }
            D.trigger(event);
        },
        isImage: function(str) {
            return isString(str) && str.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i);
        },
        isSWF: function(str) {
            return isString(str) && str.match(/\.(swf)((\?|#).*)?$/i);
        },
        _start: function(index) {
            var coming = {},
                obj, href, type, margin, padding;
            index = getScalar(index);
            obj = F.group[index] || null;
            if (!obj) {
                return false;
            }
            coming = $.extend(true, {}, F.opts, obj);
            margin = coming.margin;
            padding = coming.padding;
            if ($.type(margin) === 'number') {
                coming.margin = [margin, margin, margin, margin];
            }
            if ($.type(padding) === 'number') {
                coming.padding = [padding, padding, padding, padding];
            }
            if (coming.modal) {
                $.extend(true, coming, {
                    closeBtn: false,
                    closeClick: false,
                    nextClick: false,
                    arrows: false,
                    mouseWheel: false,
                    keys: null,
                    helpers: {
                        overlay: {
                            closeClick: false
                        }
                    }
                });
            }
            if (coming.autoSize) {
                coming.autoWidth = coming.autoHeight = true;
            }
            if (coming.width === 'auto') {
                coming.autoWidth = true;
            }
            if (coming.height === 'auto') {
                coming.autoHeight = true;
            }
            coming.group = F.group;
            coming.index = index;
            F.coming = coming;
            if (false === F.trigger('beforeLoad')) {
                F.coming = null;
                return;
            }
            type = coming.type;
            href = coming.href;
            if (!type) {
                F.coming = null;
                if (F.current && F.router && F.router !== 'jumpto') {
                    F.current.index = index;
                    return F[F.router](F.direction);
                }
                return false;
            }
            F.isActive = true;
            if (type === 'image' || type === 'swf') {
                coming.autoHeight = coming.autoWidth = false;
                coming.scrolling = 'visible';
            }
            if (type === 'image') {
                coming.aspectRatio = true;
            }
            if (type === 'iframe' && isTouch) {
                coming.scrolling = 'scroll';
            }
            coming.wrap = $(coming.tpl.wrap).addClass('fancybox-' + (isTouch ? 'mobile' : 'desktop') + ' fancybox-type-' + type + ' fancybox-tmp ' + coming.wrapCSS).appendTo(coming.parent || 'body');
            $.extend(coming, {
                skin: $('.fancybox-skin', coming.wrap),
                outer: $('.fancybox-outer', coming.wrap),
                inner: $('.fancybox-inner', coming.wrap)
            });
            $.each(["Top", "Right", "Bottom", "Left"], function(i, v) {
                coming.skin.css('padding' + v, getValue(coming.padding[i]));
            });
            F.trigger('onReady');
            if (type === 'inline' || type === 'html') {
                if (!coming.content || !coming.content.length) {
                    return F._error('content');
                }
            } else if (!href) {
                return F._error('href');
            }
            if (type === 'image') {
                F._loadImage();
            } else if (type === 'ajax') {
                F._loadAjax();
            } else if (type === 'iframe') {
                F._loadIframe();
            } else {
                F._afterLoad();
            }
        },
        _error: function(type) {
            $.extend(F.coming, {
                type: 'html',
                autoWidth: true,
                autoHeight: true,
                minWidth: 0,
                minHeight: 0,
                scrolling: 'no',
                hasError: type,
                content: F.coming.tpl.error
            });
            F._afterLoad();
        },
        _loadImage: function() {
            var img = F.imgPreload = new Image();
            img.onload = function() {
                this.onload = this.onerror = null;
                F.coming.width = this.width / F.opts.pixelRatio;
                F.coming.height = this.height / F.opts.pixelRatio;
                F._afterLoad();
            };
            img.onerror = function() {
                this.onload = this.onerror = null;
                F._error('image');
            };
            img.src = F.coming.href;
            if (img.complete !== true) {
                F.showLoading();
            }
        },
        _loadAjax: function() {
            var coming = F.coming;
            F.showLoading();
            F.ajaxLoad = $.ajax($.extend({}, coming.ajax, {
                url: coming.href,
                error: function(jqXHR, textStatus) {
                    if (F.coming && textStatus !== 'abort') {
                        F._error('ajax', jqXHR);
                    } else {
                        F.hideLoading();
                    }
                },
                success: function(data, textStatus) {
                    if (textStatus === 'success') {
                        coming.content = data;
                        F._afterLoad();
                    }
                }
            }));
        },
        _loadIframe: function() {
            var coming = F.coming,
                iframe = $(coming.tpl.iframe.replace(/\{rnd\}/g, new Date().getTime())).attr('scrolling', isTouch ? 'auto' : coming.iframe.scrolling).attr('src', coming.href);
            $(coming.wrap).bind('onReset', function() {
                try {
                    $(this).find('iframe').hide().attr('src', '//about:blank').end().empty();
                } catch (e) {}
            });
            if (coming.iframe.preload) {
                F.showLoading();
                iframe.one('load', function() {
                    $(this).data('ready', 1);
                    if (!isTouch) {
                        $(this).bind('load.fb', F.update);
                    }
                    $(this).parents('.fancybox-wrap').width('100%').removeClass('fancybox-tmp').show();
                    F._afterLoad();
                });
            }
            coming.content = iframe.appendTo(coming.inner);
            if (!coming.iframe.preload) {
                F._afterLoad();
            }
        },
        _preloadImages: function() {
            var group = F.group,
                current = F.current,
                len = group.length,
                cnt = current.preload ? Math.min(current.preload, len - 1) : 0,
                item, i;
            for (i = 1; i <= cnt; i += 1) {
                item = group[(current.index + i) % len];
                if (item.type === 'image' && item.href) {
                    new Image().src = item.href;
                }
            }
        },
        _afterLoad: function() {
            var coming = F.coming,
                previous = F.current,
                placeholder = 'fancybox-placeholder',
                current, content, type, scrolling, href, embed;
            F.hideLoading();
            if (!coming || F.isActive === false) {
                return;
            }
            if (false === F.trigger('afterLoad', coming, previous)) {
                coming.wrap.stop(true).trigger('onReset').remove();
                F.coming = null;
                return;
            }
            if (previous) {
                F.trigger('beforeChange', previous);
                previous.wrap.stop(true).removeClass('fancybox-opened').find('.fancybox-item, .fancybox-nav').remove();
            }
            F.unbindEvents();
            current = coming;
            content = coming.content;
            type = coming.type;
            scrolling = coming.scrolling;
            $.extend(F, {
                wrap: current.wrap,
                skin: current.skin,
                outer: current.outer,
                inner: current.inner,
                current: current,
                previous: previous
            });
            href = current.href;
            switch (type) {
                case 'inline':
                case 'ajax':
                case 'html':
                    if (current.selector) {
                        content = $('<div>').html(content).find(current.selector);
                    } else if (isQuery(content)) {
                        if (!content.data(placeholder)) {
                            content.data(placeholder, $('<div class="' + placeholder + '"></div>').insertAfter(content).hide());
                        }
                        content = content.show().detach();
                        current.wrap.bind('onReset', function() {
                            if ($(this).find(content).length) {
                                content.hide().replaceAll(content.data(placeholder)).data(placeholder, false);
                            }
                        });
                    }
                    break;
                case 'image':
                    content = current.tpl.image.replace('{href}', href);
                    break;
                case 'swf':
                    content = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + href + '"></param>';
                    embed = '';
                    $.each(current.swf, function(name, val) {
                        content += '<param name="' + name + '" value="' + val + '"></param>';
                        embed += ' ' + name + '="' + val + '"';
                    });
                    content += '<embed src="' + href + '" type="application/x-shockwave-flash" width="100%" height="100%"' + embed + '></embed></object>';
                    break;
            }
            if (!(isQuery(content) && content.parent().is(current.inner))) {
                current.inner.append(content);
            }
            F.trigger('beforeShow');
            current.inner.css('overflow', scrolling === 'yes' ? 'scroll' : (scrolling === 'no' ? 'hidden' : scrolling));
            F._setDimension();
            F.reposition();
            F.isOpen = false;
            F.coming = null;
            F.bindEvents();
            if (!F.isOpened) {
                $('.fancybox-wrap').not(current.wrap).stop(true).trigger('onReset').remove();
            } else if (previous.prevMethod) {
                F.transitions[previous.prevMethod]();
            }
            F.transitions[F.isOpened ? current.nextMethod : current.openMethod]();
            F._preloadImages();
        },
        _setDimension: function() {
            var viewport = F.getViewport(),
                steps = 0,
                canShrink = false,
                canExpand = false,
                wrap = F.wrap,
                skin = F.skin,
                inner = F.inner,
                current = F.current,
                width = current.width,
                height = current.height,
                minWidth = current.minWidth,
                minHeight = current.minHeight,
                maxWidth = current.maxWidth,
                maxHeight = current.maxHeight,
                scrolling = current.scrolling,
                scrollOut = current.scrollOutside ? current.scrollbarWidth : 0,
                margin = current.margin,
                wMargin = getScalar(margin[1] + margin[3]),
                hMargin = getScalar(margin[0] + margin[2]),
                wPadding, hPadding, wSpace, hSpace, origWidth, origHeight, origMaxWidth, origMaxHeight, ratio, width_, height_, maxWidth_, maxHeight_, iframe, body;
            wrap.add(skin).add(inner).width('auto').height('auto').removeClass('fancybox-tmp');
            wPadding = getScalar(skin.outerWidth(true) - skin.width());
            hPadding = getScalar(skin.outerHeight(true) - skin.height());
            wSpace = wMargin + wPadding;
            hSpace = hMargin + hPadding;
            origWidth = isPercentage(width) ? (viewport.w - wSpace) * getScalar(width) / 100 : width;
            origHeight = isPercentage(height) ? (viewport.h - hSpace) * getScalar(height) / 100 : height;
            if (current.type === 'iframe') {
                iframe = current.content;
                if (current.autoHeight && iframe.data('ready') === 1) {
                    try {
                        if (iframe[0].contentWindow.document.location) {
                            inner.width(origWidth).height(9999);
                            body = iframe.contents().find('body');
                            if (scrollOut) {
                                body.css('overflow-x', 'hidden');
                            }
                            origHeight = body.outerHeight(true);
                        }
                    } catch (e) {}
                }
            } else if (current.autoWidth || current.autoHeight) {
                inner.addClass('fancybox-tmp');
                if (!current.autoWidth) {
                    inner.width(origWidth);
                }
                if (!current.autoHeight) {
                    inner.height(origHeight);
                }
                if (current.autoWidth) {
                    origWidth = inner.width();
                }
                if (current.autoHeight) {
                    origHeight = inner.height();
                }
                inner.removeClass('fancybox-tmp');
            }
            width = getScalar(origWidth);
            height = getScalar(origHeight);
            ratio = origWidth / origHeight;
            minWidth = getScalar(isPercentage(minWidth) ? getScalar(minWidth, 'w') - wSpace : minWidth);
            maxWidth = getScalar(isPercentage(maxWidth) ? getScalar(maxWidth, 'w') - wSpace : maxWidth);
            minHeight = getScalar(isPercentage(minHeight) ? getScalar(minHeight, 'h') - hSpace : minHeight);
            maxHeight = getScalar(isPercentage(maxHeight) ? getScalar(maxHeight, 'h') - hSpace : maxHeight);
            origMaxWidth = maxWidth;
            origMaxHeight = maxHeight;
            if (current.fitToView) {
                maxWidth = Math.min(viewport.w - wSpace, maxWidth);
                maxHeight = Math.min(viewport.h - hSpace, maxHeight);
            }
            maxWidth_ = viewport.w - wMargin;
            maxHeight_ = viewport.h - hMargin;
            if (current.aspectRatio) {
                if (width > maxWidth) {
                    width = maxWidth;
                    height = getScalar(width / ratio);
                }
                if (height > maxHeight) {
                    height = maxHeight;
                    width = getScalar(height * ratio);
                }
                if (width < minWidth) {
                    width = minWidth;
                    height = getScalar(width / ratio);
                }
                if (height < minHeight) {
                    height = minHeight;
                    width = getScalar(height * ratio);
                }
            } else {
                width = Math.max(minWidth, Math.min(width, maxWidth));
                if (current.autoHeight && current.type !== 'iframe') {
                    inner.width(width);
                    height = inner.height();
                }
                height = Math.max(minHeight, Math.min(height, maxHeight));
            }
            if (current.fitToView) {
                inner.width(width).height(height);
                wrap.width(width + wPadding);
                width_ = wrap.width();
                height_ = wrap.height();
                if (current.aspectRatio) {
                    while ((width_ > maxWidth_ || height_ > maxHeight_) && width > minWidth && height > minHeight) {
                        if (steps++ > 19) {
                            break;
                        }
                        height = Math.max(minHeight, Math.min(maxHeight, height - 10));
                        width = getScalar(height * ratio);
                        if (width < minWidth) {
                            width = minWidth;
                            height = getScalar(width / ratio);
                        }
                        if (width > maxWidth) {
                            width = maxWidth;
                            height = getScalar(width / ratio);
                        }
                        inner.width(width).height(height);
                        wrap.width(width + wPadding);
                        width_ = wrap.width();
                        height_ = wrap.height();
                    }
                } else {
                    width = Math.max(minWidth, Math.min(width, width - (width_ - maxWidth_)));
                    height = Math.max(minHeight, Math.min(height, height - (height_ - maxHeight_)));
                }
            }
            if (scrollOut && scrolling === 'auto' && height < origHeight && (width + wPadding + scrollOut) < maxWidth_) {
                width += scrollOut;
            }
            inner.width(width).height(height);
            wrap.width(width + wPadding);
            width_ = wrap.width();
            height_ = wrap.height();
            canShrink = (width_ > maxWidth_ || height_ > maxHeight_) && width > minWidth && height > minHeight;
            canExpand = current.aspectRatio ? (width < origMaxWidth && height < origMaxHeight && width < origWidth && height < origHeight) : ((width < origMaxWidth || height < origMaxHeight) && (width < origWidth || height < origHeight));
            $.extend(current, {
                dim: {
                    width: getValue(width_),
                    height: getValue(height_)
                },
                origWidth: origWidth,
                origHeight: origHeight,
                canShrink: canShrink,
                canExpand: canExpand,
                wPadding: wPadding,
                hPadding: hPadding,
                wrapSpace: height_ - skin.outerHeight(true),
                skinSpace: skin.height() - height
            });
            if (!iframe && current.autoHeight && height > minHeight && height < maxHeight && !canExpand) {
                inner.height('auto');
            }
            $(F.outer).on('swipeleft', function() {
                F.next();
            });
            $(F.outer).on('swiperight', function() {
                F.prev();
            });
        },
        _getPosition: function(onlyAbsolute) {
            var current = F.current,
                viewport = F.getViewport(),
                margin = current.margin,
                width = F.wrap.width() + margin[1] + margin[3],
                height = F.wrap.height() + margin[0] + margin[2],
                rez = {
                    position: 'absolute',
                    top: margin[0],
                    left: margin[3]
                };
            if (current.autoCenter && current.fixed && !onlyAbsolute && height <= viewport.h && width <= viewport.w) {
                rez.position = 'fixed';
            } else if (!current.locked) {
                rez.top += viewport.y;
                rez.left += viewport.x;
            }
            rez.top = getValue(Math.max(rez.top, rez.top + ((viewport.h - height) * current.topRatio)));
            rez.left = getValue(Math.max(rez.left, rez.left + ((viewport.w - width) * current.leftRatio)));
            return rez;
        },
        _afterZoomIn: function() {
            var current = F.current;
            if (!current) {
                return;
            }
            F.isOpen = F.isOpened = true;
            F.wrap.css('overflow', 'visible').addClass('fancybox-opened');
            F.update();
            if (current.closeClick || (current.nextClick && F.group.length > 1)) {
                F.inner.css('cursor', 'pointer').bind('click.fb', function(e) {
                    if (!$(e.target).is('a') && !$(e.target).parent().is('a')) {
                        e.preventDefault();
                        F[current.closeClick ? 'close' : 'next']();
                    }
                });
            }
            if (current.closeBtn) {
                $(current.tpl.closeBtn).appendTo(F.skin).bind('click.fb', function(e) {
                    e.preventDefault();
                    F.close();
                });
            }
            if (current.arrows && F.group.length > 1) {
                if (current.loop || current.index > 0) {
                    $(current.tpl.prev).appendTo(F.outer).bind('click.fb', F.prev);
                }
                if (current.loop || current.index < F.group.length - 1) {
                    $(current.tpl.next).appendTo(F.outer).bind('click.fb', F.next);
                }
            }
            F.trigger('afterShow');
            if (!current.loop && current.index === current.group.length - 1) {
                F.play(false);
            } else if (F.opts.autoPlay && !F.player.isActive) {
                F.opts.autoPlay = false;
                F.play();
            }
        },
        _afterZoomOut: function(obj) {
            obj = obj || F.current;
            $('.fancybox-wrap').trigger('onReset').remove();
            $.extend(F, {
                group: {},
                opts: {},
                router: false,
                current: null,
                isActive: false,
                isOpened: false,
                isOpen: false,
                isClosing: false,
                wrap: null,
                skin: null,
                outer: null,
                inner: null
            });
            F.trigger('afterClose', obj);
        }
    });
    F.transitions = {
        getOrigPosition: function() {
            var current = F.current,
                element = current.element,
                orig = current.orig,
                pos = {},
                width = 50,
                height = 50,
                hPadding = current.hPadding,
                wPadding = current.wPadding,
                viewport = F.getViewport();
            if (!orig && current.isDom && element.is(':visible')) {
                orig = element.find('img:first');
                if (!orig.length) {
                    orig = element;
                }
            }
            if (isQuery(orig)) {
                pos = orig.offset();
                if (orig.is('img')) {
                    width = orig.outerWidth();
                    height = orig.outerHeight();
                }
            } else {
                pos.top = viewport.y + (viewport.h - height) * current.topRatio;
                pos.left = viewport.x + (viewport.w - width) * current.leftRatio;
            }
            if (F.wrap.css('position') === 'fixed' || current.locked) {
                pos.top -= viewport.y;
                pos.left -= viewport.x;
            }
            pos = {
                top: getValue(pos.top - hPadding * current.topRatio),
                left: getValue(pos.left - wPadding * current.leftRatio),
                width: getValue(width + wPadding),
                height: getValue(height + hPadding)
            };
            return pos;
        },
        step: function(now, fx) {
            var ratio, padding, value, prop = fx.prop,
                current = F.current,
                wrapSpace = current.wrapSpace,
                skinSpace = current.skinSpace;
            if (prop === 'width' || prop === 'height') {
                ratio = fx.end === fx.start ? 1 : (now - fx.start) / (fx.end - fx.start);
                if (F.isClosing) {
                    ratio = 1 - ratio;
                }
                padding = prop === 'width' ? current.wPadding : current.hPadding;
                value = now - padding;
                F.skin[prop](getScalar(prop === 'width' ? value : value - (wrapSpace * ratio)));
                F.inner[prop](getScalar(prop === 'width' ? value : value - (wrapSpace * ratio) - (skinSpace * ratio)));
            }
        },
        zoomIn: function() {
            var current = F.current,
                startPos = current.pos,
                effect = current.openEffect,
                elastic = effect === 'elastic',
                endPos = $.extend({
                    opacity: 1
                }, startPos);
            delete endPos.position;
            if (elastic) {
                startPos = this.getOrigPosition();
                if (current.openOpacity) {
                    startPos.opacity = 0.1;
                }
            } else if (effect === 'fade') {
                startPos.opacity = 0.1;
            }
            F.wrap.css(startPos).animate(endPos, {
                duration: effect === 'none' ? 0 : current.openSpeed,
                easing: current.openEasing,
                step: elastic ? this.step : null,
                complete: F._afterZoomIn
            });
        },
        zoomOut: function() {
            var current = F.current,
                effect = current.closeEffect,
                elastic = effect === 'elastic',
                endPos = {
                    opacity: 0.1
                };
            if (elastic) {
                endPos = this.getOrigPosition();
                if (current.closeOpacity) {
                    endPos.opacity = 0.1;
                }
            }
            F.wrap.animate(endPos, {
                duration: effect === 'none' ? 0 : current.closeSpeed,
                easing: current.closeEasing,
                step: elastic ? this.step : null,
                complete: F._afterZoomOut
            });
        },
        changeIn: function() {
            var current = F.current,
                effect = current.nextEffect,
                startPos = current.pos,
                endPos = {
                    opacity: 1
                },
                direction = F.direction,
                distance = 200,
                field;
            startPos.opacity = 0.1;
            if (effect === 'elastic') {
                field = direction === 'down' || direction === 'up' ? 'top' : 'left';
                if (direction === 'down' || direction === 'right') {
                    startPos[field] = getValue(getScalar(startPos[field]) - distance);
                    endPos[field] = '+=' + distance + 'px';
                } else {
                    startPos[field] = getValue(getScalar(startPos[field]) + distance);
                    endPos[field] = '-=' + distance + 'px';
                }
            }
            if (effect === 'none') {
                F._afterZoomIn();
            } else {
                F.wrap.css(startPos).animate(endPos, {
                    duration: current.nextSpeed,
                    easing: current.nextEasing,
                    complete: F._afterZoomIn
                });
            }
        },
        changeOut: function() {
            var previous = F.previous,
                effect = previous.prevEffect,
                endPos = {
                    opacity: 0.1
                },
                direction = F.direction,
                distance = 200;
            if (effect === 'elastic') {
                endPos[direction === 'down' || direction === 'up' ? 'top' : 'left'] = (direction === 'up' || direction === 'left' ? '-' : '+') + '=' + distance + 'px';
            }
            previous.wrap.animate(endPos, {
                duration: effect === 'none' ? 0 : previous.prevSpeed,
                easing: previous.prevEasing,
                complete: function() {
                    $(this).trigger('onReset').remove();
                }
            });
        }
    };
    F.helpers.overlay = {
        defaults: {
            closeClick: true,
            speedOut: 200,
            showEarly: true,
            css: {},
            locked: !isTouch,
            fixed: true
        },
        overlay: null,
        fixed: false,
        el: $('html'),
        create: function(opts) {
            opts = $.extend({}, this.defaults, opts);
            if (this.overlay) {
                this.close();
            }
            this.overlay = $('<div class="fancybox-overlay"></div>').appendTo(F.coming ? F.coming.parent : opts.parent);
            this.fixed = false;
            if (opts.fixed && F.defaults.fixed) {
                this.overlay.addClass('fancybox-overlay-fixed');
                this.fixed = true;
            }
        },
        open: function(opts) {
            var that = this;
            opts = $.extend({}, this.defaults, opts);
            if (this.overlay) {
                this.overlay.unbind('.overlay').width('auto').height('auto');
            } else {
                this.create(opts);
            }
            if (!this.fixed) {
                W.bind('resize.overlay', $.proxy(this.update, this));
                this.update();
            }
            if (opts.closeClick) {
                this.overlay.bind('click.overlay', function(e) {
                    if ($(e.target).hasClass('fancybox-overlay')) {
                        if (F.isActive) {
                            F.close();
                        } else {
                            that.close();
                        }
                        return false;
                    }
                });
            }
            this.overlay.css(opts.css).show();
        },
        close: function() {
            var scrollV, scrollH;
            W.unbind('resize.overlay');
            if (this.el.hasClass('fancybox-lock')) {
                $('.fancybox-margin').removeClass('fancybox-margin');
                scrollV = W.scrollTop();
                scrollH = W.scrollLeft();
                this.el.removeClass('fancybox-lock');
                W.scrollTop(scrollV).scrollLeft(scrollH);
            }
            $('.fancybox-overlay').remove().hide();
            $.extend(this, {
                overlay: null,
                fixed: false
            });
        },
        update: function() {
            var width = '100%',
                offsetWidth;
            this.overlay.width(width).height('100%');
            if (IE) {
                offsetWidth = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);
                if (D.width() > offsetWidth) {
                    width = D.width();
                }
            } else if (D.width() > W.width()) {
                width = D.width();
            }
            this.overlay.width(width).height(D.height());
        },
        onReady: function(opts, obj) {
            var overlay = this.overlay;
            $('.fancybox-overlay').stop(true, true);
            if (!overlay) {
                this.create(opts);
            }
            if (opts.locked && this.fixed && obj.fixed) {
                if (!overlay) {
                    this.margin = D.height() > W.height() ? $('html').css('margin-right').replace("px", "") : false;
                }
                obj.locked = this.overlay.append(obj.wrap);
                obj.fixed = false;
            }
            if (opts.showEarly === true) {
                this.beforeShow.apply(this, arguments);
            }
        },
        beforeShow: function(opts, obj) {
            var scrollV, scrollH;
            if (obj.locked) {
                if (this.margin !== false) {
                    $('*').filter(function() {
                        return ($(this).css('position') === 'fixed' && !$(this).hasClass("fancybox-overlay") && !$(this).hasClass("fancybox-wrap"));
                    }).addClass('fancybox-margin');
                    this.el.addClass('fancybox-margin');
                }
                scrollV = W.scrollTop();
                scrollH = W.scrollLeft();
                this.el.addClass('fancybox-lock');
                W.scrollTop(scrollV).scrollLeft(scrollH);
            }
            this.open(opts);
        },
        onUpdate: function() {
            if (!this.fixed) {
                this.update();
            }
        },
        afterClose: function(opts) {
            if (this.overlay && !F.coming) {
                this.overlay.fadeOut(opts.speedOut, $.proxy(this.close, this));
            }
        }
    };
    F.helpers.title = {
        defaults: {
            type: 'float',
            position: 'bottom'
        },
        beforeShow: function(opts) {
            var current = F.current,
                text = current.title,
                type = opts.type,
                title, target;
            if ($.isFunction(text)) {
                text = text.call(current.element, current);
            }
            if (!isString(text) || $.trim(text) === '') {
                return;
            }
            title = $('<div class="fancybox-title fancybox-title-' + type + '-wrap">' + text + '</div>');
            switch (type) {
                case 'inside':
                    target = F.skin;
                    break;
                case 'outside':
                    target = F.wrap;
                    break;
                case 'over':
                    target = F.inner;
                    break;
                default:
                    target = F.skin;
                    title.appendTo('body');
                    if (IE) {
                        title.width(title.width());
                    }
                    title.wrapInner('<span class="child"></span>');
                    F.current.margin[2] += Math.abs(getScalar(title.css('margin-bottom')));
                    break;
            }
            title[(opts.position === 'top' ? 'prependTo' : 'appendTo')](target);
        }
    };
    $.fn.fancybox = function(options) {
        var index, that = $(this),
            selector = this.selector || '',
            run = function(e) {
                var what = $(this).blur(),
                    idx = index,
                    relType, relVal;
                if (!(e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) && !what.is('.fancybox-wrap')) {
                    relType = options.groupAttr || 'data-fancybox-group';
                    relVal = what.attr(relType);
                    if (!relVal) {
                        relType = 'rel';
                        relVal = what.get(0)[relType];
                    }
                    if (relVal && relVal !== '' && relVal !== 'nofollow') {
                        what = selector.length ? $(selector) : that;
                        what = what.filter('[' + relType + '="' + relVal + '"]');
                        idx = what.index(this);
                    }
                    options.index = idx;
                    if (F.open(what, options) !== false) {
                        e.preventDefault();
                    }
                }
            };
        options = options || {};
        index = options.index || 0;
        if (!selector || options.live === false) {
            that.unbind('click.fb-start').bind('click.fb-start', run);
        } else {
            D.undelegate(selector, 'click.fb-start').delegate(selector + ":not('.fancybox-item, .fancybox-nav')", 'click.fb-start', run);
        }
        this.filter('[data-fancybox-start=1]').trigger('click');
        return this;
    };
    D.ready(function() {
        var w1, w2;
        if ($.scrollbarWidth === undefined) {
            $.scrollbarWidth = function() {
                var parent = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body'),
                    child = parent.children(),
                    width = child.innerWidth() - child.height(99).innerWidth();
                parent.remove();
                return width;
            };
        }
        if ($.support.fixedPosition === undefined) {
            $.support.fixedPosition = (function() {
                var elem = $('<div style="position:fixed;top:20px;"></div>').appendTo('body'),
                    fixed = (elem[0].offsetTop === 20 || elem[0].offsetTop === 15);
                elem.remove();
                return fixed;
            }());
        }
        $.extend(F.defaults, {
            scrollbarWidth: $.scrollbarWidth(),
            fixed: $.support.fixedPosition,
            parent: $('body')
        });
        w1 = $(window).width();
        H.addClass('fancybox-lock-test');
        w2 = $(window).width();
        H.removeClass('fancybox-lock-test');
        $("<style type='text/css'>.fancybox-margin{margin-right: 0;}</style>").appendTo("head");
    });
}(window, document, jQuery));

// jQuery swipe
(function(module) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], module);
    } else {
        module(jQuery);
    }
})(function(jQuery, undefined) {
    var add = jQuery.event.add,
        remove = jQuery.event.remove,
        trigger = function(node, type, data) {
            jQuery.event.trigger(type, data, node);
        },
        settings = {
            threshold: 0.4,
            sensitivity: 6
        };

    function moveend(e) {
        var w, h, event;
        w = e.target.offsetWidth;
        h = e.target.offsetHeight;
        event = {
            distX: e.distX,
            distY: e.distY,
            velocityX: e.velocityX,
            velocityY: e.velocityY,
            finger: e.finger
        };
        if (e.distX > e.distY) {
            if (e.distX > -e.distY) {
                if (e.distX / w > settings.threshold || e.velocityX * e.distX / w * settings.sensitivity > 1) {
                    event.type = 'swiperight';
                    trigger(e.currentTarget, event);
                }
            } else {
                if (-e.distY / h > settings.threshold || e.velocityY * e.distY / w * settings.sensitivity > 1) {
                    event.type = 'swipeup';
                    trigger(e.currentTarget, event);
                }
            }
        } else {
            if (e.distX > -e.distY) {
                if (e.distY / h > settings.threshold || e.velocityY * e.distY / w * settings.sensitivity > 1) {
                    event.type = 'swipedown';
                    trigger(e.currentTarget, event);
                }
            } else {
                if (-e.distX / w > settings.threshold || e.velocityX * e.distX / w * settings.sensitivity > 1) {
                    event.type = 'swipeleft';
                    trigger(e.currentTarget, event);
                }
            }
        }
    }

    function getData(node) {
        var data = jQuery.data(node, 'event_swipe');
        if (!data) {
            data = {
                count: 0
            };
            jQuery.data(node, 'event_swipe', data);
        }
        return data;
    }
    jQuery.event.special.swipe = jQuery.event.special.swipeleft = jQuery.event.special.swiperight = jQuery.event.special.swipeup = jQuery.event.special.swipedown = {
        setup: function(data, namespaces, eventHandle) {
            var data = getData(this);
            if (data.count++ > 0) {
                return;
            }
            add(this, 'moveend', moveend);
            return true;
        },
        teardown: function() {
            var data = getData(this);
            if (--data.count > 0) {
                return;
            }
            remove(this, 'moveend', moveend);
            return true;
        },
        settings: settings
    };
});

// jQuery move
(function(module) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], module);
    } else {
        module(jQuery);
    }
})(function(jQuery, undefined) {
    var
        threshold = 6,
        add = jQuery.event.add,
        remove = jQuery.event.remove,
        trigger = function(node, type, data) {
            jQuery.event.trigger(type, data, node);
        },
        requestFrame = (function() {
            return (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(fn, element) {
                return window.setTimeout(function() {
                    fn();
                }, 25);
            });
        })(),
        ignoreTags = {
            textarea: true,
            input: true,
            select: true,
            button: true
        },
        mouseevents = {
            move: 'mousemove',
            cancel: 'mouseup dragstart',
            end: 'mouseup'
        },
        touchevents = {
            move: 'touchmove',
            cancel: 'touchend',
            end: 'touchend'
        };

    function Timer(fn) {
        var callback = fn,
            active = false,
            running = false;

        function trigger(time) {
            if (active) {
                callback();
                requestFrame(trigger);
                running = true;
                active = false;
            } else {
                running = false;
            }
        }
        this.kick = function(fn) {
            active = true;
            if (!running) {
                trigger();
            }
        };
        this.end = function(fn) {
            var cb = callback;
            if (!fn) {
                return;
            }
            if (!running) {
                fn();
            } else {
                callback = active ? function() {
                    cb();
                    fn();
                } : fn;
                active = true;
            }
        };
    }

    function returnTrue() {
        return true;
    }

    function returnFalse() {
        return false;
    }

    function preventDefault(e) {
        e.preventDefault();
    }

    function preventIgnoreTags(e) {
        if (ignoreTags[e.target.tagName.toLowerCase()]) {
            return;
        }
        e.preventDefault();
    }

    function isLeftButton(e) {
        return (e.which === 1 && !e.ctrlKey && !e.altKey);
    }

    function identifiedTouch(touchList, id) {
        var i, l;
        if (touchList.identifiedTouch) {
            return touchList.identifiedTouch(id);
        }
        i = -1;
        l = touchList.length;
        while (++i < l) {
            if (touchList[i].identifier === id) {
                return touchList[i];
            }
        }
    }

    function changedTouch(e, event) {
        var touch = identifiedTouch(e.changedTouches, event.identifier);
        if (!touch) {
            return;
        }
        if (touch.pageX === event.pageX && touch.pageY === event.pageY) {
            return;
        }
        return touch;
    }

    function mousedown(e) {
        var data;
        if (!isLeftButton(e)) {
            return;
        }
        data = {
            target: e.target,
            startX: e.pageX,
            startY: e.pageY,
            timeStamp: e.timeStamp
        };
        add(document, mouseevents.move, mousemove, data);
        add(document, mouseevents.cancel, mouseend, data);
    }

    function mousemove(e) {
        var data = e.data;
        checkThreshold(e, data, e, removeMouse);
    }

    function mouseend(e) {
        removeMouse();
    }

    function removeMouse() {
        remove(document, mouseevents.move, mousemove);
        remove(document, mouseevents.cancel, mouseend);
    }

    function touchstart(e) {
        var touch, template;
        if (ignoreTags[e.target.tagName.toLowerCase()]) {
            return;
        }
        touch = e.changedTouches[0];
        template = {
            target: touch.target,
            startX: touch.pageX,
            startY: touch.pageY,
            timeStamp: e.timeStamp,
            identifier: touch.identifier
        };
        add(document, touchevents.move + '.' + touch.identifier, touchmove, template);
        add(document, touchevents.cancel + '.' + touch.identifier, touchend, template);
    }

    function touchmove(e) {
        var data = e.data,
            touch = changedTouch(e, data);
        if (!touch) {
            return;
        }
        checkThreshold(e, data, touch, removeTouch);
    }

    function touchend(e) {
        var template = e.data,
            touch = identifiedTouch(e.changedTouches, template.identifier);
        if (!touch) {
            return;
        }
        removeTouch(template.identifier);
    }

    function removeTouch(identifier) {
        remove(document, '.' + identifier, touchmove);
        remove(document, '.' + identifier, touchend);
    }

    function checkThreshold(e, template, touch, fn) {
        var distX = touch.pageX - template.startX,
            distY = touch.pageY - template.startY;
        if ((distX * distX) + (distY * distY) < (threshold * threshold)) {
            return;
        }
        triggerStart(e, template, touch, distX, distY, fn);
    }

    function handled() {
        this._handled = returnTrue;
        return false;
    }

    function flagAsHandled(e) {
        e._handled();
    }

    function triggerStart(e, template, touch, distX, distY, fn) {
        var node = template.target,
            touches, time;
        touches = e.targetTouches;
        time = e.timeStamp - template.timeStamp;
        template.type = 'movestart';
        template.distX = distX;
        template.distY = distY;
        template.deltaX = distX;
        template.deltaY = distY;
        template.pageX = touch.pageX;
        template.pageY = touch.pageY;
        template.velocityX = distX / time;
        template.velocityY = distY / time;
        template.targetTouches = touches;
        template.finger = touches ? touches.length : 1;
        template._handled = handled;
        template._preventTouchmoveDefault = function() {
            e.preventDefault();
        };
        trigger(template.target, template);
        fn(template.identifier);
    }

    function activeMousemove(e) {
        var timer = e.data.timer;
        e.data.touch = e;
        e.data.timeStamp = e.timeStamp;
        timer.kick();
    }

    function activeMouseend(e) {
        var event = e.data.event,
            timer = e.data.timer;
        removeActiveMouse();
        endEvent(event, timer, function() {
            setTimeout(function() {
                remove(event.target, 'click', returnFalse);
            }, 0);
        });
    }

    function removeActiveMouse(event) {
        remove(document, mouseevents.move, activeMousemove);
        remove(document, mouseevents.end, activeMouseend);
    }

    function activeTouchmove(e) {
        var event = e.data.event,
            timer = e.data.timer,
            touch = changedTouch(e, event);
        if (!touch) {
            return;
        }
        e.preventDefault();
        event.targetTouches = e.targetTouches;
        e.data.touch = touch;
        e.data.timeStamp = e.timeStamp;
        timer.kick();
    }

    function activeTouchend(e) {
        var event = e.data.event,
            timer = e.data.timer,
            touch = identifiedTouch(e.changedTouches, event.identifier);
        if (!touch) {
            return;
        }
        removeActiveTouch(event);
        endEvent(event, timer);
    }

    function removeActiveTouch(event) {
        remove(document, '.' + event.identifier, activeTouchmove);
        remove(document, '.' + event.identifier, activeTouchend);
    }

    function updateEvent(event, touch, timeStamp, timer) {
        var time = timeStamp - event.timeStamp;
        event.type = 'move';
        event.distX = touch.pageX - event.startX;
        event.distY = touch.pageY - event.startY;
        event.deltaX = touch.pageX - event.pageX;
        event.deltaY = touch.pageY - event.pageY;
        event.velocityX = 0.3 * event.velocityX + 0.7 * event.deltaX / time;
        event.velocityY = 0.3 * event.velocityY + 0.7 * event.deltaY / time;
        event.pageX = touch.pageX;
        event.pageY = touch.pageY;
    }

    function endEvent(event, timer, fn) {
        timer.end(function() {
            event.type = 'moveend';
            trigger(event.target, event);
            return fn && fn();
        });
    }

    function setup(data, namespaces, eventHandle) {
        add(this, 'movestart.move', flagAsHandled);
        return true;
    }

    function teardown(namespaces) {
        remove(this, 'dragstart drag', preventDefault);
        remove(this, 'mousedown touchstart', preventIgnoreTags);
        remove(this, 'movestart', flagAsHandled);
        return true;
    }

    function addMethod(handleObj) {
        if (handleObj.namespace === "move" || handleObj.namespace === "moveend") {
            return;
        }
        add(this, 'dragstart.' + handleObj.guid + ' drag.' + handleObj.guid, preventDefault, undefined, handleObj.selector);
        add(this, 'mousedown.' + handleObj.guid, preventIgnoreTags, undefined, handleObj.selector);
    }

    function removeMethod(handleObj) {
        if (handleObj.namespace === "move" || handleObj.namespace === "moveend") {
            return;
        }
        remove(this, 'dragstart.' + handleObj.guid + ' drag.' + handleObj.guid);
        remove(this, 'mousedown.' + handleObj.guid);
    }
    jQuery.event.special.movestart = {
        setup: setup,
        teardown: teardown,
        add: addMethod,
        remove: removeMethod,
        _default: function(e) {
            var event, data;
            if (!e._handled()) {
                return;
            }

            function update(time) {
                updateEvent(event, data.touch, data.timeStamp);
                trigger(e.target, event);
            }
            event = {
                target: e.target,
                startX: e.startX,
                startY: e.startY,
                pageX: e.pageX,
                pageY: e.pageY,
                distX: e.distX,
                distY: e.distY,
                deltaX: e.deltaX,
                deltaY: e.deltaY,
                velocityX: e.velocityX,
                velocityY: e.velocityY,
                timeStamp: e.timeStamp,
                identifier: e.identifier,
                targetTouches: e.targetTouches,
                finger: e.finger
            };
            data = {
                event: event,
                timer: new Timer(update),
                touch: undefined,
                timeStamp: undefined
            };
            if (e.identifier === undefined) {
                add(e.target, 'click', returnFalse);
                add(document, mouseevents.move, activeMousemove, data);
                add(document, mouseevents.end, activeMouseend, data);
            } else {
                e._preventTouchmoveDefault();
                add(document, touchevents.move + '.' + e.identifier, activeTouchmove, data);
                add(document, touchevents.end + '.' + e.identifier, activeTouchend, data);
            }
        }
    };
    jQuery.event.special.move = {
        setup: function() {
            add(this, 'movestart.move', jQuery.noop);
        },
        teardown: function() {
            remove(this, 'movestart.move', jQuery.noop);
        }
    };
    jQuery.event.special.moveend = {
        setup: function() {
            add(this, 'movestart.moveend', jQuery.noop);
        },
        teardown: function() {
            remove(this, 'movestart.moveend', jQuery.noop);
        }
    };
    add(document, 'mousedown.move', mousedown);
    add(document, 'touchstart.move', touchstart);
    if (typeof Array.prototype.indexOf === 'function') {
        (function(jQuery, undefined) {
            var props = ["changedTouches", "targetTouches"],
                l = props.length;
            while (l--) {
                if (jQuery.event.props.indexOf(props[l]) === -1) {
                    jQuery.event.props.push(props[l]);
                }
            }
        })(jQuery);
    };
});
