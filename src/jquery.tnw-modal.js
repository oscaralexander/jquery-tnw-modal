/**
 * Modal
 * Copyright © 2017, Alexander Griffioen <mail@oscaralexander.com>
 * Published under MIT license.
 */

const pluginName = 'tnwModal'

class TNWModal {
    constructor(el, options) {
        this.options = $.extend({}, this.defaults, options)
        this.$el = $(el)
        this.init()
    }

    hideAll() {
        $('body').removeClass(this.options.classNameHasModal)
        $(`.${this.options.classNameModal}`).removeClass(this.options.classNameVisible)
    }

    hide() {
        $('body').removeClass(this.options.classNameHasModal)
        this.$el.removeClass(this.options.classNameVisible).trigger('modal:hide')
    }

    init() {
        this.name = this.$el.attr('data-modal')

        $('body').on('click', `[data-modal-show="${this.name}"]`, this.onShow.bind(this))
        $('body').on('keydown', (e) => {
            if (e.keyCode === 27) {
                this.hide()
            }
        })
        $('[data-modal-hide]', this.$el).on('click', this.onHide.bind(this))
    }

    onHide(e) {
        e.preventDefault()
        this.hide()
    }

    onShow(e) {
        e.preventDefault()
        this.show()
    }

    show() {
        this.hideAll()
        $('body').addClass(this.options.classNameHasModal)
        this.$el.addClass(this.options.classNameVisible)

        setTimeout(() => {
            this.$el.trigger('modal:show')
        }, 10)
    }
}

TNWModal.prototype.defaults = {
    classNameHasModal: 'has-modal',
    classNameVisible: 'is-visible'
}

$.fn[pluginName] = function (options) {
    return this.each(function () {
        let instance = $(this).data(pluginName)

        if (!instance) {
            $(this).data(pluginName, new TNWModal(this, options))
        } else {
            if (typeof options === 'string') {
                instance[options]()
            }
        }
    })
}