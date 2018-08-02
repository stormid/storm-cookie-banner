/**
 * @name storm-cookie-banner: 
 * @version 0.1.0: Thu, 02 Aug 2018 21:30:28 GMT
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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var writeCookie = function writeCookie(settings, preferences) {
    return [settings.name + '=' + JSON.stringify(preferences) + ';', 'expires=' + new Date(new Date().getTime() + settings.expiry * 24 * 60 * 60 * 1000).toGMTString() + ';', 'path=' + settings.path + ';', settings.domain ? 'domain=' + settings.domain : '', settings.secure ? 'secure=' + settings.secure : ''].join('');
};

var readCookie = function readCookie(settings) {
    var cookie = document.cookie.split('; ').map(function (part) {
        return { name: part.split('=')[0], value: part.split('=')[1] };
    }).filter(function (part) {
        return part.name === settings.name;
    })[0];
    return cookie !== undefined ? cookie : false;
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
        'preference': {
            enabled: true,
            fns: [function (settings, consent) {
                document.cookie = writeCookie(settings, consent);
            }]
        }
    },
    classNames: {
        banner: 'cookie-banner',
        btn: 'cookie-banner__btn',
        field: 'cookie-banner__field'
    },
    template: function template(model) {
        return '<section role="dialog" aria-live="polite" aria-label="Cookie consent" aria-describedby="cookie-banner__desc" class="' + model.classNames.banner + '">\n\t\t\t<!--googleoff: all-->\n\t\t\t<div class="small-12" id="cookie-banner__desc">\n\t\t\t\t<h1 class="cookie-banner__heading">This website uses cookies.</h1>\n\t\t\t\t<p class="cookie-banner__text gamma">We use cookies to analyse our traffic and to provide social media features. You can choose which categories\n\t\t\t\tof cookies you consent to, or accept our recommended settings.\n\t\t\t\t<a class="cookie-banner__link" rel="noopener noreferrer nofollow" href="/cookies/">Find out more</a> about the cookies we use before you consent.</p>\n\t\t\t\t<ul class="cookie-banner__list lister push--bottom large-10">\n\t\t\t\t\t<li class="cookie-banner__list-item">\n\t\t\t\t\t\t<input id="cookie-banner__necessary" class="' + model.classNames.field + '" value="necessary" type="checkbox" checked disabled> \n\t\t\t\t\t\t<label class="cookie-banner__label gamma" for="cookie-banner_necessary">Necessary cookies</label>\n\t\t\t\t\t</li>\n\t\t\t\t\t' + model.types.map(function (type) {
            return '<li class="cookie-banner__list-item">\n\t\t\t\t\t\t<input id="cookie-banner__' + type.name.split(' ')[0].replace(' ', '-') + '" class="' + model.classNames.field + '" value="' + type.name + '" type="checkbox"' + (type.enabled ? ' checked' : '') + '> \n\t\t\t\t\t\t<label class="cookie-banner__label gamma" for="cookie-banner__' + type.name.split(' ')[0].replace(' ', '-') + '">' + type.name.substr(0, 1).toUpperCase() + type.name.substr(1) + ' cookies</label>\n\t\t\t\t\t</li>';
        }).join('') + '\n\t\t\t\t</ul>\n\t\t\t</div>\n\t\t\t<button class="' + model.classNames.btn + '">Continue</button>\n\t\t\t<!--googleon: all-->\n\t\t</section>';
    }
};

// import apply from './apply';

var initUI = function initUI(settings) {
    document.body.firstElementChild.insertAdjacentHTML('beforebegin', settings.template(settings));
    var fields = [].slice.call(document.querySelectorAll('.' + settings.classNames.field));
    var banner = document.querySelector('.' + settings.classNames.banner);
    var btn = document.querySelector('.' + settings.classNames.btn);

    TRIGGER_EVENTS.forEach(function (ev) {
        btn.addEventListener(ev, function (e) {
            if (!shouldExecute(e)) return;
            applyConsent(settings, fields.reduce(function (acc, field) {
                return acc[field.value] = field.checked, acc;
            }, {}));
            // banner.parentNode.removeChild(banner);
        });
    });
};

var applyConsent = function applyConsent(settings, consent) {
    console.log(settings, consent);
    // Object.keys(consent).forEach(key => {
    //     consent[key] && apply[key] && apply[key].forEach(fn => fn(settings, consent));
    // });
};

var factory = function factory(settings) {
    if (!cookiesEnabled()) return;
    console.log(settings);

    var cookies = readCookie(settings);

    if (!cookies) initUI(settings);else applyConsent(settings, JSON.parse(cookies.value));
};

var index = {
    init: function init(opts) {
        return factory(Object.assign({}, defaults, opts, {
            types: Object.keys(opts.types).reduce(function (acc, curr) {
                if (acc[curr]) {
                    return Object.assign({}, acc, _defineProperty({}, curr, Object.assign({}, acc[curr], {
                        fns: acc[curr].fns.concat(opts.types[curr.name].fns)
                    })));
                } else return Object.assign({}, acc, _defineProperty({}, curr, opts.types[curr]));
            }, defaults.types)
            // types: opts.types.reduce((acc, curr) => {
            //     const match = acc.filter(type => type.name === curr.name);
            //     if(match.length === 0) acc.push(curr);
            //     else {
            //         match[0] = Object.assign({}, match[0], {
            //             fns: match[0].fns.push(curr.fns),
            //             enabled: curr.enabled === match[0].enabled ? match[0].enabled : !match[0].enabled
            //         })
            //     }
            //     return acc;
            // }, defaults.types)
        }));
    }
};

exports.default = index;;
}));
