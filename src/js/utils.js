/**
 * Mardin Utility functions.
 */

import Noty from 'noty';

/**
 * Notifications utility.
 */
export class Notifications {
    constructor() {
        console.log(window.noty);
        // ready noty
        if (window.noty === undefined) {
            this.readyNoty();
        }
    }

    /**
     * Initialize notification helpers.
     *
     * @return
     */
    readyNoty() {
        // Set noty defaults
        Noty.overrideDefaults({
            type: 'alert',
            layout: 'topRight',
            theme: 'mint',
            text: '',
            timeout: 10000,
            progressBar: true,
            closeWith: ['click', 'button'],
            animation: {
                open: 'noty_effects_open animated fadeInRight', // or Animate.css class names like: 'animated bounceInLeft'
                close: 'noty_effects_close animated fadeOutRight', // or Animate.css class names like: 'animated bounceOutLeft'
                easing: 'swing',
                speed: 350 // opening & closing animation speed
            },
            id: false,
            force: false,
            killer: false,
            queue: 'global',
            container: false,
            buttons: [],
            sounds: {
                sources: [],
                volume: 1,
                conditions: []
            },
            titleCount: {
                conditions: []
            },
            modal: false
        });

        // add noty to self
        this.noty = Noty;

        this.noty.show = function(obj) {
            return new Noty(obj).show();
        };

        this.noty.info = function(msg, props) {
            return new Noty(
                $.extend(
                    {
                        type: 'notice',
                        text: msg
                    },
                    props || {}
                )
            ).show();
        };

        this.noty.success = function(msg, props) {
            return new Noty(
                $.extend(
                    {
                        type: 'success',
                        text: msg
                    },
                    props || {}
                )
            ).show();
        };

        this.noty.error = function(msg, props) {
            return new Noty(
                $.extend(
                    {
                        type: 'error',
                        text: msg,
                        timeout: 15000
                    },
                    props || {}
                )
            ).show();
        };
        this.noty.warning = function(msg, props) {
            return new Noty(
                $.extend(
                    {
                        type: 'warning',
                        text: msg,
                        timeout: 15000
                    },
                    props || {}
                )
            ).show();
        };

        // grab the css
        require('noty/lib/noty.css');

        return (window.noty = window.Noty = this.noty);
    }
}

/**
 * String trim function
 */
export var trimString = (string, length) => {
    length = length || 200;
    return string.length > length ? string.substring(0, length - 3) + '...' : string;
};
