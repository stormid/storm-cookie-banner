/**
 * @name storm-cookie-banner: 
 * @version 0.1.0: Sun, 05 Aug 2018 21:49:23 GMT
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

var writeCookie = function writeCookie(model) {
    return [model.name + '=' + JSON.stringify(model.consent) + ';', 'expires=' + new Date(new Date().getTime() + model.expiry * 24 * 60 * 60 * 1000).toGMTString() + ';', 'path=' + model.path + ';', model.domain ? 'domain=' + model.domain : '', model.secure ? 'secure=' + model.secure : ''].join('');
};

var readCookie = function readCookie(model) {
    var cookie = document.cookie.split('; ').map(function (part) {
        return { name: part.split('=')[0], value: part.split('=')[1] };
    }).filter(function (part) {
        return part.name === model.name;
    })[0];
    return cookie !== undefined ? cookie : false;
};

var composeModel = function composeModel(model) {
    return Object.assign({}, model, {
        types: Object.keys(model.types).reduce(function (acc, type) {
            if (model.consent[type] !== undefined) {
                acc[type] = Object.assign({}, model.types[type], {
                    checked: model.consent[type]
                });
            } else acc[type] = model.types[type];
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

var apply = function apply(model) {
    Object.keys(model.consent).forEach(function (key) {
        model.consent[key] && model.types[key].fns.forEach(function (fn) {
            return fn(model);
        });
    });
};

var initBanner = function initBanner(model) {
    console.log(model);
    document.body.firstElementChild.insertAdjacentHTML('beforebegin', model.bannerTemplate(composeModel(model)));
    var fields = [].slice.call(document.querySelectorAll('.' + model.classNames.field));
    var banner = document.querySelector('.' + model.classNames.banner);
    var btn = document.querySelector('.' + model.classNames.btn);

    TRIGGER_EVENTS.forEach(function (ev) {
        btn.addEventListener(ev, function (e) {
            if (!shouldExecute(e)) return;
            model = Object.assign({}, model, { consent: fields.reduce(function (acc, field) {
                    return acc[field.value] = field.checked, acc;
                }, {}) });
            apply(model);
            banner.parentNode.removeChild(banner);
            initUpdateBtn(model);
        });
    });
};

var initUpdateBtn = function initUpdateBtn(model) {
    var updateBtnContainer = document.querySelector('.' + model.classNames.updateBtnContainer);
    if (!updateBtnContainer) return;
    var updateBtn = document.querySelector('.' + model.classNames.updateBtn);
    if (updateBtn) return updateBtn.removeAttribute('disabled');
    updateBtnContainer.innerHTML = model.updateBtnTemplate(model);
    TRIGGER_EVENTS.forEach(function (ev) {
        updateBtnContainer.addEventListener(ev, function (e) {
            if (!shouldExecute(e) || !e.target.classList.contains(model.classNames.updateBtn)) return;
            initBanner(model);
            document.querySelector('.' + model.classNames.updateBtn).setAttribute('disabled', 'disabled');
        });
    });
};

var factory = function factory(model) {
    if (!cookiesEnabled()) return;
    var cookies = readCookie(model);
    if (!cookies) initBanner(model);else {
        model = Object.assign({}, model, { consent: JSON.parse(cookies.value) });
        apply(model);
        initUpdateBtn(model);
    }
};

var index = {
    init: function init(opts) {
        return factory(Object.assign({}, defaults, opts, {
            types: Object.keys(opts.types).reduce(function (acc, curr) {
                if (acc[curr]) {
                    acc[curr] = Object.assign({}, acc[curr], {
                        fns: acc[curr].fns.concat(opts.types[curr].fns),
                        checked: opts.types[curr].checked
                    });
                } else acc[curr] = opts.types[curr];
                return acc;
            }, defaults.types)
        }));
    }
};

exports.default = index;;
}));
