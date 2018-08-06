/**
 * @name storm-cookie-banner: 
 * @version 0.1.0: Mon, 06 Aug 2018 09:52:15 GMT
 * @author stormid
 * @license MIT
 */
(function(root, factory) {
   var mod = {
       exports: {}
   };
   if (typeof exports !== 'undefined'){
       mod.exports = exports
       factory(mod.exports)
       module.exports = mod.exports.default
   } else {
       factory(mod.exports);
       root.StormCookieBanner = mod.exports.default
   }

}(this, function(exports) {
   'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var TRIGGER_EVENTS = window.PointerEvent ? ['pointerup', 'keydown'] : ['ontouchstart' in window ? 'touchstart' : 'click', 'keydown'];

var TRIGGER_KEYCODES = [13, 32];

//Modernizr cookie test
var cookiesEnabled = function cookiesEnabled() {
    try {
        document.cookie = 'cookietest=1';
        var ret = document.cookie.indexOf('cookietest=') !== -1;
        document.cookie = 'cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT';
        return ret;
    } catch (e) {
        return false;
    }
};

var writeCookie = function writeCookie(state) {
    return [state.settings.name + '=' + JSON.stringify(state.consent) + ';', 'expires=' + new Date(new Date().getTime() + state.settings.expiry * 24 * 60 * 60 * 1000).toGMTString() + ';', 'path=' + state.settings.path + ';', state.settings.domain ? 'domain=' + state.settings.domain : '', state.settings.secure ? 'secure=' + state.settings.secure : ''].join('');
};

var readCookie = function readCookie(settings) {
    var cookie = document.cookie.split('; ').map(function (part) {
        return { name: part.split('=')[0], value: part.split('=')[1] };
    }).filter(function (part) {
        return part.name === settings.name;
    })[0];
    return cookie !== undefined ? cookie : false;
};

var composeUpdateUIModel = function composeUpdateUIModel(state) {
    return Object.assign({}, state.settings, {
        types: Object.keys(state.settings.types).reduce(function (acc, type) {
            if (state.consent[type] !== undefined) {
                acc[type] = Object.assign({}, state.settings.types[type], {
                    checked: state.consent[type] !== undefined ? state.consent[type] : state.settings.types[type].checked
                });
            } else acc[type] = state.settings.types[type];
            return acc;
        }, {})
    });
};

var shouldExecute = function shouldExecute(e) {
    return !!e.keyCode && !TRIGGER_KEYCODES.includes(e.keyCode) || !(e.which === 3 || e.button === 2);
};

var defaults = {
    name: 'CookiePreferences',
    path: '/',
    domain: '',
    secure: '',
    expiry: 365,
    types: {
        'necessary': {
            checked: true,
            disabled: true,
            fns: []
        },
        'preference': {
            checked: true,
            fns: [function (model) {
                document.cookie = writeCookie(model);
            }]
        }
    },
    classNames: {
        banner: 'cookie-banner',
        btn: 'cookie-banner__btn',
        field: 'cookie-banner__field',
        updateBtnContainer: 'cookie-banner__update',
        updateBtn: 'cookie-banner__update-btn'
    },
    updateBtnTemplate: function updateBtnTemplate(model) {
        return '<button class="' + model.classNames.updateBtn + '">Update cookie preferences</button>';
    },
    bannerTemplate: function bannerTemplate(model) {
        return '<section role="dialog" aria-live="polite" aria-label="Cookie consent" aria-describedby="cookie-banner__desc" class="' + model.classNames.banner + '">\n\t\t\t<!--googleoff: all-->\n\t\t\t<div class="small-12" id="cookie-banner__desc">\n\t\t\t\t<h1 class="cookie-banner__heading">This website uses cookies.</h1>\n\t\t\t\t<p class="cookie-banner__text gamma">We use cookies to analyse our traffic and to provide social media features. You can choose which categories\n\t\t\t\tof cookies you consent to, or accept our recommended settings.\n\t\t\t\t<a class="cookie-banner__link" rel="noopener noreferrer nofollow" href="/cookies/">Find out more</a> about the cookies we use before you consent.</p>\n\t\t\t\t<ul class="cookie-banner__list lister push--bottom large-10">\n\t\t\t\t\t' + Object.keys(model.types).map(function (type) {
            return '<li class="cookie-banner__list-item">\n\t\t\t\t\t\t<input id="cookie-banner__' + type.split(' ')[0].replace(' ', '-') + '" class="' + model.classNames.field + '" value="' + type + '" type="checkbox"' + (model.types[type].checked ? ' checked' : '') + (model.types[type].disabled ? ' disabled' : '') + '> \n\t\t\t\t\t\t<label class="cookie-banner__label gamma" for="cookie-banner__' + type.split(' ')[0].replace(' ', '-') + '">' + type.substr(0, 1).toUpperCase() + type.substr(1) + ' cookies</label>\n\t\t\t\t\t</li>';
        }).join('') + '\n\t\t\t\t</ul>\n\t\t\t</div>\n\t\t\t<button class="' + model.classNames.btn + '">Continue</button>\n\t\t\t<!--googleon: all-->\n\t\t</section>';
    },

    consent: {}
};

var apply = function apply(state) {
    Object.keys(state.consent).forEach(function (key) {
        state.consent[key] && state.settings.types[key].fns.forEach(function (fn) {
            return fn(state);
        });
    });
};

var initialState = function initialState(state, data) {
    return Object.assign({}, state, data);
};
var setConsent = function setConsent(state, data) {
    return Object.assign({}, state, data);
};
var updateConsent = function updateConsent(state, data) {
    return Object.assign({}, state, data);
};

var initBanner = function initBanner(Store) {
    return function (state) {
        document.body.firstElementChild.insertAdjacentHTML('beforebegin', state.settings.bannerTemplate(composeUpdateUIModel(state)));
        var fields = [].slice.call(document.querySelectorAll('.' + state.settings.classNames.field));
        var banner = document.querySelector('.' + state.settings.classNames.banner);
        var btn = document.querySelector('.' + state.settings.classNames.btn);

        TRIGGER_EVENTS.forEach(function (ev) {
            btn.addEventListener(ev, function (e) {
                if (!shouldExecute(e)) return;
                Store.update(setConsent, { consent: fields.reduce(function (acc, field) {
                        return acc[field.value] = field.checked, acc;
                    }, {}) }, [apply, initUpdateBtn(Store), function () {
                    banner.parentNode.removeChild(banner);
                }]);
            });
        });
    };
};

var initUpdateBtn = function initUpdateBtn(Store) {
    return function (state) {
        var updateBtnContainer = document.querySelector('.' + state.settings.classNames.updateBtnContainer);
        if (!updateBtnContainer) return;
        var updateBtn = document.querySelector('.' + state.settings.classNames.updateBtn);
        if (updateBtn) return updateBtn.removeAttribute('disabled');
        updateBtnContainer.innerHTML = state.settings.updateBtnTemplate(state.settings);

        TRIGGER_EVENTS.forEach(function (ev) {
            document.querySelector('.' + state.settings.classNames.updateBtn).addEventListener(ev, function (e) {
                if (!shouldExecute(e)) return;
                Store.update(updateConsent, {}, [initBanner(Store), function () {
                    e.target.setAttribute('disabled', 'disabled');
                }]);
            });
        });
    };
};

var CreateStore = function CreateStore() {
    return {
        state: {},
        update: function update(reducer, nextState) {
            var _this = this;

            var effects = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

            this.state = reducer(this.state, nextState);
            if (effects.length > 0) effects.forEach(function (effect) {
                effect(_this.state);
            });
        },
        getState: function getState() {
            return this.state;
        }
    };
};

var factory = function factory(settings) {
    if (!cookiesEnabled()) return;

    var Store = CreateStore();
    var cookies = readCookie(settings);
    Store.update(initialState, { settings: settings, consent: cookies ? JSON.parse(cookies.value) : {} }, !cookies ? [initBanner(Store)] : [apply, initUpdateBtn(Store)]);
};

var index = {
    init: function init(opts) {
        return factory(Object.assign({}, defaults, opts, {
            types: Object.keys(opts.types).reduce(function (acc, curr) {
                if (acc[curr]) {
                    acc[curr] = Object.assign({}, acc[curr], {
                        fns: acc[curr].fns.concat(opts.types[curr].fns),
                        checked: opts.types[curr].checked !== undefined ? opts.types[curr].checked : defaults.types[curr].checked !== undefined ? defaults.types[curr].checked : false
                    });
                } else acc[curr] = opts.types[curr];
                return acc;
            }, defaults.types)
        }));
    }
};

exports.default = index;;
}));
