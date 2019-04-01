/**
 * @name storm-cookie-banner: 
 * @version 0.3.2: Mon, 01 Apr 2019 15:53:16 GMT
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

var acquireDomain = function acquireDomain() {
    if (window.location.hostname) return window.location.hostname === 'localhost' ? window.location.hostname : '.' + window.location.hostname;
    var url = window.location.toString().split('://')[1].replace('www');
    var domain = '.' + (url[url.length - 1] === '/' ? url.substr(0, -1) : url);
    return domain === 'localhost' ? domain : '.' + domain;
};

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
    return document.cookie = [state.settings.name + '=' + JSON.stringify(Object.assign({}, state.consent, { intent: state.intent })) + ';', 'expires=' + new Date(new Date().getTime() + state.settings.expiry * 24 * 60 * 60 * 1000).toGMTString() + ';', 'path=' + state.settings.path + ';', 'domain=' + (state.settings.domain ? state.settings.domain : acquireDomain()) + ';', state.settings.secure ? 'secure' : ''].join('');
};

var readCookie = function readCookie(settings) {
    var cookie = document.cookie.split('; ').map(function (part) {
        return { name: part.split('=')[0], value: part.split('=')[1] };
    }).filter(function (part) {
        return part.name === settings.name;
    })[0];
    return cookie !== undefined ? cookie : false;
};

var updateCookie = function updateCookie(state) {
    return function (model) {
        document.cookie = [model.name + '=' + model.value + ';', 'expires=' + model.expiry + ';', 'path=' + state.settings.path + ';', 'domain=' + (state.settings.domain ? state.settings.domain : acquireDomain()) + ';', state.settings.secure ? 'secure' : ''].join('');
    };
};

var deleteCookies = function deleteCookies(state) {
    document.cookie.split('; ').map(function (part) {
        return {
            name: part.split('=')[0],
            value: part.split('=')[1],
            expiry: 'Thu, 01 Jan 1970 00:00:01 GMT'
        };
    }).map(updateCookie(state));
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

var shouldReturn = function shouldReturn(e) {
    return !!e.keyCode && !~TRIGGER_KEYCODES.indexOf(e.keyCode) || e.which && e.which === 3;
};

var defaults = {
    name: 'CookiePreferences',
    path: '/',
    domain: '',
    secure: true,
    expiry: 365,
    types: {
        'necessary': {
            checked: true,
            disabled: true,
            fns: []
        }
    },
    policyURL: '/cookie-policy',
    classNames: {
        banner: 'preferences-banner',
        btn: 'preferences-banner__btn',
        field: 'preferences-banner__field',
        updateBtnContainer: 'preferences-banner__update',
        updateBtn: 'preferences-banner__update-btn',
        close: 'preference-banner__close'
    },
    updateBtnTemplate: function updateBtnTemplate(model) {
        return '<button class="' + model.classNames.updateBtn + '">Update cookie preferences</button>';
    },
    bannerTemplate: function bannerTemplate(model) {
        return '<section role="dialog" aria-live="polite" aria-label="Cookie consent" aria-describedby="preferences-banner__desc" class="' + model.classNames.banner + '">\n\t\t\t<div class="preferences-content">\n\t\t\t\t<div class="wrap">\n\t\t\t\t\t<div class="row">\n\t\t\t\t\t\t<!--googleoff: all-->\n\t\t\t\t\t\t<div id="preferences-banner__desc">\n\t\t\t\t\t\t\t<div class="preferences-banner__heading">This website uses cookies.</div>\n\t\t\t\t\t\t\t<p class="preferences-banner__text">We use cookies to analyse our traffic and to provide social media features. You can choose which categories of cookies you consent to, or accept our recommended settings.\n\t\t\t\t\t\t\t<a class="preferences-banner__link" rel="noopener noreferrer nofollow" href="' + model.policyURL + '"> Find out more about the cookies we use.</a></p>\n\t\t\t\t\t\t\t<ul class="preferences-banner__list">\n\t\t\t\t\t\t\t\t' + Object.keys(model.types).map(function (type) {
            return '<li class="preferences-banner__list-item">\n\t\t\t\t\t\t\t\t\t<input id="preferences-banner__' + type.split(' ')[0].replace(' ', '-') + '" class="' + model.classNames.field + '" value="' + type + '" type="checkbox"' + (model.types[type].checked ? ' checked' : '') + (model.types[type].disabled ? ' disabled' : '') + '>\n\t\t\t\t\t\t\t\t\t<label class="preferences-banner__label" for="preferences-banner__' + type.split(' ')[0].replace(' ', '-') + '">\n\t\t\t\t\t\t\t\t\t\t' + type.substr(0, 1).toUpperCase() + type.substr(1) + ' cookies\n\t\t\t\t\t\t\t\t\t</label>  \n\t\t\t\t\t\t\t\t</li>';
        }).join('') + '\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<button class="' + model.classNames.btn + '">OK</button>\n\t\t\t\t\t\t<button class="' + model.classNames.close + '">                        \n\t\t\t\t\t\t\t<svg focusable="false" class="preference-banner__close-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t\t<!--googleon: all-->\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</section>';
    }
};

var apply = function apply() {
    var perf = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'add';
    return function (state) {
        //;_; needs proper enum
        var appliedState = perf === 'add' ? Object.assign({}, state, { consent: Object.assign({}, state.consent, { performance: true }) }) : perf === 'remove' ? Object.assign({}, state, { consent: Object.assign({}, state.consent, { performance: false }) }) : state;

        Object.keys(appliedState.consent).forEach(function (key) {
            appliedState.consent[key] && appliedState.settings.types[key] && appliedState.settings.types[key].fns.forEach(function (fn) {
                return fn(appliedState);
            });
        });
    };
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
        var closeBtn = document.querySelector('.' + state.settings.classNames.close);

        TRIGGER_EVENTS.forEach(function (ev) {
            btn.addEventListener(ev, function (e) {
                if (shouldReturn(e)) return;
                var consent = fields.reduce(function (acc, field) {
                    return acc[field.value] = field.checked, acc;
                }, {});

                Store.update(setConsent, { consent: consent }, !consent.performance ? [deleteCookies, writeCookie, function () {
                    window.setTimeout(function () {
                        return location.reload();
                    }, 60);
                }] : [writeCookie, apply(state.consent.performance ? 'remain' : 'remove'), function () {
                    banner.parentNode.removeChild(banner);
                    initUpdateBtn(Store)(state);
                }]);
            });
            closeBtn.addEventListener(ev, function (e) {
                if (shouldReturn(e)) return;

                Store.update(setConsent, { consent: Object.keys(state.settings.types).reduce(function (acc, curr) {
                        acc[curr] = state.settings.types[curr].checked;
                        return acc;
                    }, {})
                }, [writeCookie, apply('remain'), function () {
                    banner.parentNode.removeChild(banner);
                    initUpdateBtn(Store)(state);
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
        if (updateBtn) updateBtn.removeAttribute('disabled');else updateBtnContainer.innerHTML = state.settings.updateBtnTemplate(state.settings);
        var handler = function handler(e) {
            if (shouldReturn(e)) return;
            Store.update(updateConsent, {}, [initBanner(Store), function () {
                e.target.setAttribute('disabled', 'disabled');
                TRIGGER_EVENTS.forEach(function (ev) {
                    e.target.removeEventListener(ev, handler);
                });
            }]);
        };

        TRIGGER_EVENTS.forEach(function (ev) {
            document.querySelector('.' + state.settings.classNames.updateBtn).addEventListener(ev, handler);
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
    Store.update(initialState, {
        settings: settings,
        consent: cookies ? JSON.parse(cookies.value) : {}
    }, [apply(!cookies ? 'add' : 'remain'), cookies ? initUpdateBtn(Store) : initBanner(Store)]);
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
