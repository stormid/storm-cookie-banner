(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _src = require('../../src');

var _src2 = _interopRequireDefault(_src);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

window.addEventListener('DOMContentLoaded', function () {
    _src2.default.init({
        types: {
            'preference': {
                enabled: false,
                fns: [function () {
                    console.log('Preference fn');
                }]
            },
            'performance': {
                enabled: true,
                fns: [function () {
                    console.log('Performance fn');
                }]
            },
            'advertising and marketing': {
                enabled: false,
                fns: [function () {
                    console.log('Advertising and marketing fn');
                }]
            }
        }
    });
});

},{"../../src":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defaults = require('./lib/defaults');

var _defaults2 = _interopRequireDefault(_defaults);

var _lib = require('./lib');

var _lib2 = _interopRequireDefault(_lib);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
        obj[key] = value;
    }return obj;
}

exports.default = {
    init: function init(opts) {
        return (0, _lib2.default)(Object.assign({}, _defaults2.default, opts, {
            types: Object.keys(opts.types).reduce(function (acc, curr) {
                if (acc[curr]) {
                    return Object.assign({}, acc, _defineProperty({}, curr, Object.assign({}, acc[curr], {
                        fns: acc[curr].fns.concat(opts.types[curr.name].fns)
                    })));
                } else return Object.assign({}, acc, _defineProperty({}, curr, opts.types[curr]));
            }, _defaults2.default.types)
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

},{"./lib":5,"./lib/defaults":4}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var TRIGGER_EVENTS = exports.TRIGGER_EVENTS = window.PointerEvent ? ['pointerup', 'keydown'] : ['ontouchstart' in window ? 'touchstart' : 'click', 'keydown'];

var TRIGGER_KEYCODES = exports.TRIGGER_KEYCODES = [13, 32];

var CLASSNAME = exports.CLASSNAME = {
    BANNER: 'cookie-banner',
    FIELD: 'cookie-banner__field',
    BTN: 'cookie-banner__btn'
};

var DATA_ATTRIBUTE = exports.DATA_ATTRIBUTE = {
    TYPE: 'data-consent-type',
    ID: 'data-consent-id'
};

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utils = require('./utils');

exports.default = {
	name: 'CookiePreferences',
	path: '/',
	domain: '',
	secure: '',
	expiry: 365,
	types: {
		'preference': {
			enabled: true,
			fns: [function (settings, consent) {
				document.cookie = (0, _utils.writeCookie)(settings, consent);
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

},{"./utils":6}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _constants = require('./constants');

var _utils = require('./utils');

// import apply from './apply';

var initUI = function initUI(settings) {
    document.body.firstElementChild.insertAdjacentHTML('beforebegin', settings.template(settings));
    var fields = [].slice.call(document.querySelectorAll('.' + settings.classNames.field));
    var banner = document.querySelector('.' + settings.classNames.banner);
    var btn = document.querySelector('.' + settings.classNames.btn);

    _constants.TRIGGER_EVENTS.forEach(function (ev) {
        btn.addEventListener(ev, function (e) {
            if (!(0, _utils.shouldExecute)(e)) return;
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

exports.default = function (settings) {
    if (!(0, _utils.cookiesEnabled)()) return;
    console.log(settings);

    var cookies = (0, _utils.readCookie)(settings);

    if (!cookies) initUI(settings);else applyConsent(settings, JSON.parse(cookies.value));
};

},{"./constants":3,"./utils":6}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.shouldExecute = exports.GTMLoad = exports.readCookie = exports.writeCookie = exports.cookiesEnabled = undefined;

var _constants = require('./constants');

//Modernizr cookie test
var cookiesEnabled = exports.cookiesEnabled = function cookiesEnabled() {
    try {
        document.cookie = 'cookietest=1';
        var ret = document.cookie.indexOf('cookietest=') !== -1;
        document.cookie = 'cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT';
        return ret;
    } catch (e) {
        return false;
    }
};

var writeCookie = exports.writeCookie = function writeCookie(settings, preferences) {
    return [settings.name + '=' + JSON.stringify(preferences) + ';', 'expires=' + new Date(new Date().getTime() + settings.expiry * 24 * 60 * 60 * 1000).toGMTString() + ';', 'path=' + settings.path + ';', settings.domain ? 'domain=' + settings.domain : '', settings.secure ? 'secure=' + settings.secure : ''].join('');
};

var readCookie = exports.readCookie = function readCookie(settings) {
    var cookie = document.cookie.split('; ').map(function (part) {
        return { name: part.split('=')[0], value: part.split('=')[1] };
    }).filter(function (part) {
        return part.name === settings.name;
    })[0];
    return cookie !== undefined ? cookie : false;
};

var GTMLoad = exports.GTMLoad = function GTMLoad(code) {
    (function (w, d, s, l, i) {
        w[l] = w[l] || [];w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s),
            dl = l != 'dataLayer' ? '&l=' + l : '';j.async = true;j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', code);
};

var shouldExecute = exports.shouldExecute = function shouldExecute(e) {
    return !!e.keyCode && !_constants.TRIGGER_KEYCODES.includes(e.keyCode) || !(e.which === 3 || e.button === 2);
};

},{"./constants":3}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlL3NyYy9hcHAuanMiLCJzcmMvaW5kZXguanMiLCJzcmMvbGliL2NvbnN0YW50cy5qcyIsInNyYy9saWIvZGVmYXVsdHMuanMiLCJzcmMvbGliL2luZGV4LmpzIiwic3JjL2xpYi91dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBQSxPQUFBLFFBQUEsV0FBQSxDQUFBOzs7Ozs7OztBQUVBLE9BQUEsZ0JBQUEsQ0FBQSxrQkFBQSxFQUE0QyxZQUFNO0FBQzlDLFVBQUEsT0FBQSxDQUFBLElBQUEsQ0FBa0I7QUFDZCxlQUFPO0FBQ0gsMEJBQWU7QUFDWCx5QkFEVyxLQUFBO0FBRVgscUJBQUssQ0FDRCxZQUFNO0FBQUUsNEJBQUEsR0FBQSxDQUFBLGVBQUE7QUFEUCxpQkFBQTtBQUZNLGFBRFo7QUFPSCwyQkFBZTtBQUNYLHlCQURXLElBQUE7QUFFWCxxQkFBSyxDQUNELFlBQU07QUFBRSw0QkFBQSxHQUFBLENBQUEsZ0JBQUE7QUFEUCxpQkFBQTtBQUZNLGFBUFo7QUFhSCx5Q0FBNkI7QUFDekIseUJBRHlCLEtBQUE7QUFFekIscUJBQUssQ0FDRCxZQUFNO0FBQUUsNEJBQUEsR0FBQSxDQUFBLDhCQUFBO0FBRFAsaUJBQUE7QUFGb0I7QUFiMUI7QUFETyxLQUFsQjtBQURKLENBQUE7Ozs7Ozs7OztBQ0ZBLElBQUEsWUFBQSxRQUFBLGdCQUFBLENBQUE7Ozs7QUFDQSxJQUFBLE9BQUEsUUFBQSxPQUFBLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7a0JBRWU7QUFDWCxVQUFNLFNBQUEsSUFBQSxDQUFBLElBQUEsRUFBQTtBQUFBLGVBQVEsQ0FBQSxHQUFBLE1BQUEsT0FBQSxFQUFRLE9BQUEsTUFBQSxDQUFBLEVBQUEsRUFBa0IsV0FBbEIsT0FBQSxFQUFBLElBQUEsRUFBa0M7QUFDcEQsbUJBQU8sT0FBQSxJQUFBLENBQVksS0FBWixLQUFBLEVB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QSxDQUFBLENBQUEsRUFBTixDQUFNLENBQU47QUFBQSxZQUN0QyxJQUFFLEVBQUEsYUFBQSxDQURvQyxDQUNwQyxDQURvQztBQUFBLFlBQ2pCLEtBQUcsS0FBQSxXQUFBLEdBQWUsUUFBZixDQUFBLEdBRGMsRUFBQSxDQUNZLEVBQUEsS0FBQSxHQUFBLElBQUEsQ0FBYSxFQUFBLEdBQUEsR0FDL0QsZ0RBQUEsQ0FBQSxHQUQrRCxFQUFBLENBQ1osRUFBQSxVQUFBLENBQUEsWUFBQSxDQUFBLENBQUEsRUFBQSxDQUFBO0FBSG5ELEtBQUEsRUFBQSxNQUFBLEVBQUEsUUFBQSxFQUFBLFFBQUEsRUFBQSxXQUFBLEVBQUEsSUFBQTtBQURHLENBQUE7O0FBUUEsSUFBTSxnQkFBQSxRQUFBLGFBQUEsR0FBZ0IsU0FBaEIsYUFBZ0IsQ0FBQSxDQUFBLEVBQUE7QUFBQSxXQUFNLENBQUMsQ0FBQyxFQUFGLE9BQUEsSUFBZSxDQUFDLFdBQUEsZ0JBQUEsQ0FBQSxRQUFBLENBQTBCLEVBQTNDLE9BQWlCLENBQWhCLElBQXlELEVBQUUsRUFBQSxLQUFBLEtBQUEsQ0FBQSxJQUFpQixFQUFBLE1BQUEsS0FBbEYsQ0FBK0QsQ0FBL0Q7QUFBdEIsQ0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBDb29raWVCYW5uZXIgZnJvbSAnLi4vLi4vc3JjJztcbiAgICBcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAgIENvb2tpZUJhbm5lci5pbml0KHtcbiAgICAgICAgdHlwZXM6IHtcbiAgICAgICAgICAgICdwcmVmZXJlbmNlJyA6IHtcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBmbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4geyBjb25zb2xlLmxvZygnUHJlZmVyZW5jZSBmbicpOyB9LFxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAncGVyZm9ybWFuY2UnOiB7XG4gICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBmbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4geyBjb25zb2xlLmxvZygnUGVyZm9ybWFuY2UgZm4nKTsgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnYWR2ZXJ0aXNpbmcgYW5kIG1hcmtldGluZyc6IHtcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBmbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4geyBjb25zb2xlLmxvZygnQWR2ZXJ0aXNpbmcgYW5kIG1hcmtldGluZyBmbicpOyB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59KTsiLCJpbXBvcnQgZGVmYXVsdHMgZnJvbSAnLi9saWIvZGVmYXVsdHMnO1xuaW1wb3J0IGZhY3RvcnkgZnJvbSAnLi9saWInO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgaW5pdDogb3B0cyA9PiBmYWN0b3J5KE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLCBvcHRzLCB7XG4gICAgICAgIHR5cGVzOiBPYmplY3Qua2V5cyhvcHRzLnR5cGVzKS5yZWR1Y2UoKGFjYywgY3VycikgPT4ge1xuICAgICAgICAgICAgaWYoYWNjW2N1cnJdKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGFjYywgeyBcbiAgICAgICAgICAgICAgICAgICAgW2N1cnJdOiBPYmplY3QuYXNzaWduKHt9LCBhY2NbY3Vycl0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZuczogYWNjW2N1cnJdLmZucy5jb25jYXQob3B0cy50eXBlc1tjdXJyLm5hbWVdLmZucylcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gIGVsc2UgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGFjYywgeyBbY3Vycl06IG9wdHMudHlwZXNbY3Vycl0gfSk7XG4gICAgICAgIH0sIGRlZmF1bHRzLnR5cGVzKVxuICAgICAgICAvLyB0eXBlczogb3B0cy50eXBlcy5yZWR1Y2UoKGFjYywgY3VycikgPT4ge1xuICAgICAgICAvLyAgICAgY29uc3QgbWF0Y2ggPSBhY2MuZmlsdGVyKHR5cGUgPT4gdHlwZS5uYW1lID09PSBjdXJyLm5hbWUpO1xuICAgICAgICAvLyAgICAgaWYobWF0Y2gubGVuZ3RoID09PSAwKSBhY2MucHVzaChjdXJyKTtcbiAgICAgICAgLy8gICAgIGVsc2Uge1xuICAgICAgICAvLyAgICAgICAgIG1hdGNoWzBdID0gT2JqZWN0LmFzc2lnbih7fSwgbWF0Y2hbMF0sIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgZm5zOiBtYXRjaFswXS5mbnMucHVzaChjdXJyLmZucyksXG4gICAgICAgIC8vICAgICAgICAgICAgIGVuYWJsZWQ6IGN1cnIuZW5hYmxlZCA9PT0gbWF0Y2hbMF0uZW5hYmxlZCA/IG1hdGNoWzBdLmVuYWJsZWQgOiAhbWF0Y2hbMF0uZW5hYmxlZFxuICAgICAgICAvLyAgICAgICAgIH0pXG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vICAgICByZXR1cm4gYWNjO1xuICAgICAgICAvLyB9LCBkZWZhdWx0cy50eXBlcylcbiAgICB9KSlcbn07IiwiZXhwb3J0IGNvbnN0IFRSSUdHRVJfRVZFTlRTID0gd2luZG93LlBvaW50ZXJFdmVudCA/IFsncG9pbnRlcnVwJywgJ2tleWRvd24nXSA6IFsnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cgPyAndG91Y2hzdGFydCcgOiAnY2xpY2snLCAna2V5ZG93bicgXTtcblxuZXhwb3J0IGNvbnN0IFRSSUdHRVJfS0VZQ09ERVMgPSBbMTMsIDMyXTtcblxuZXhwb3J0IGNvbnN0IENMQVNTTkFNRSA9IHtcbiAgICBCQU5ORVI6ICdjb29raWUtYmFubmVyJyxcbiAgICBGSUVMRDogJ2Nvb2tpZS1iYW5uZXJfX2ZpZWxkJyxcbiAgICBCVE46ICdjb29raWUtYmFubmVyX19idG4nXG59O1xuXG5leHBvcnQgY29uc3QgREFUQV9BVFRSSUJVVEUgPSB7XG4gICAgVFlQRTogJ2RhdGEtY29uc2VudC10eXBlJyxcbiAgICBJRDogJ2RhdGEtY29uc2VudC1pZCdcbn07IiwiaW1wb3J0IHsgd3JpdGVDb29raWUgfSBmcm9tICcuL3V0aWxzJzsgXG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0bmFtZTogJ0Nvb2tpZVByZWZlcmVuY2VzJyxcblx0cGF0aDogJy8nLFxuXHRkb21haW46ICcnLFxuXHRzZWN1cmU6ICcnLFxuXHRleHBpcnk6IDM2NSxcblx0dHlwZXM6IHtcblx0XHQncHJlZmVyZW5jZSc6IHtcblx0XHRcdGVuYWJsZWQ6IHRydWUsXG5cdFx0XHRmbnM6IFtcblx0XHRcdFx0KHNldHRpbmdzLCBjb25zZW50KSA9PiB7IGRvY3VtZW50LmNvb2tpZSA9IHdyaXRlQ29va2llKHNldHRpbmdzLCBjb25zZW50KTsgfVxuXHRcdFx0XVxuXHRcdH1cblx0fSxcblx0Y2xhc3NOYW1lczoge1xuXHRcdGJhbm5lcjogJ2Nvb2tpZS1iYW5uZXInLFxuXHRcdGJ0bjogJ2Nvb2tpZS1iYW5uZXJfX2J0bicsXG5cdFx0ZmllbGQ6ICdjb29raWUtYmFubmVyX19maWVsZCdcblx0fSxcblx0dGVtcGxhdGUobW9kZWwpe1xuXHRcdHJldHVybiBgPHNlY3Rpb24gcm9sZT1cImRpYWxvZ1wiIGFyaWEtbGl2ZT1cInBvbGl0ZVwiIGFyaWEtbGFiZWw9XCJDb29raWUgY29uc2VudFwiIGFyaWEtZGVzY3JpYmVkYnk9XCJjb29raWUtYmFubmVyX19kZXNjXCIgY2xhc3M9XCIke21vZGVsLmNsYXNzTmFtZXMuYmFubmVyfVwiPlxuXHRcdFx0PCEtLWdvb2dsZW9mZjogYWxsLS0+XG5cdFx0XHQ8ZGl2IGNsYXNzPVwic21hbGwtMTJcIiBpZD1cImNvb2tpZS1iYW5uZXJfX2Rlc2NcIj5cblx0XHRcdFx0PGgxIGNsYXNzPVwiY29va2llLWJhbm5lcl9faGVhZGluZ1wiPlRoaXMgd2Vic2l0ZSB1c2VzIGNvb2tpZXMuPC9oMT5cblx0XHRcdFx0PHAgY2xhc3M9XCJjb29raWUtYmFubmVyX190ZXh0IGdhbW1hXCI+V2UgdXNlIGNvb2tpZXMgdG8gYW5hbHlzZSBvdXIgdHJhZmZpYyBhbmQgdG8gcHJvdmlkZSBzb2NpYWwgbWVkaWEgZmVhdHVyZXMuIFlvdSBjYW4gY2hvb3NlIHdoaWNoIGNhdGVnb3JpZXNcblx0XHRcdFx0b2YgY29va2llcyB5b3UgY29uc2VudCB0bywgb3IgYWNjZXB0IG91ciByZWNvbW1lbmRlZCBzZXR0aW5ncy5cblx0XHRcdFx0PGEgY2xhc3M9XCJjb29raWUtYmFubmVyX19saW5rXCIgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlciBub2ZvbGxvd1wiIGhyZWY9XCIvY29va2llcy9cIj5GaW5kIG91dCBtb3JlPC9hPiBhYm91dCB0aGUgY29va2llcyB3ZSB1c2UgYmVmb3JlIHlvdSBjb25zZW50LjwvcD5cblx0XHRcdFx0PHVsIGNsYXNzPVwiY29va2llLWJhbm5lcl9fbGlzdCBsaXN0ZXIgcHVzaC0tYm90dG9tIGxhcmdlLTEwXCI+XG5cdFx0XHRcdFx0PGxpIGNsYXNzPVwiY29va2llLWJhbm5lcl9fbGlzdC1pdGVtXCI+XG5cdFx0XHRcdFx0XHQ8aW5wdXQgaWQ9XCJjb29raWUtYmFubmVyX19uZWNlc3NhcnlcIiBjbGFzcz1cIiR7bW9kZWwuY2xhc3NOYW1lcy5maWVsZH1cIiB2YWx1ZT1cIm5lY2Vzc2FyeVwiIHR5cGU9XCJjaGVja2JveFwiIGNoZWNrZWQgZGlzYWJsZWQ+IFxuXHRcdFx0XHRcdFx0PGxhYmVsIGNsYXNzPVwiY29va2llLWJhbm5lcl9fbGFiZWwgZ2FtbWFcIiBmb3I9XCJjb29raWUtYmFubmVyX25lY2Vzc2FyeVwiPk5lY2Vzc2FyeSBjb29raWVzPC9sYWJlbD5cblx0XHRcdFx0XHQ8L2xpPlxuXHRcdFx0XHRcdCR7bW9kZWwudHlwZXMubWFwKHR5cGUgPT4gYDxsaSBjbGFzcz1cImNvb2tpZS1iYW5uZXJfX2xpc3QtaXRlbVwiPlxuXHRcdFx0XHRcdFx0PGlucHV0IGlkPVwiY29va2llLWJhbm5lcl9fJHt0eXBlLm5hbWUuc3BsaXQoJyAnKVswXS5yZXBsYWNlKCcgJywgJy0nKX1cIiBjbGFzcz1cIiR7bW9kZWwuY2xhc3NOYW1lcy5maWVsZH1cIiB2YWx1ZT1cIiR7dHlwZS5uYW1lfVwiIHR5cGU9XCJjaGVja2JveFwiJHt0eXBlLmVuYWJsZWQgPyBgIGNoZWNrZWRgIDogJyd9PiBcblx0XHRcdFx0XHRcdDxsYWJlbCBjbGFzcz1cImNvb2tpZS1iYW5uZXJfX2xhYmVsIGdhbW1hXCIgZm9yPVwiY29va2llLWJhbm5lcl9fJHt0eXBlLm5hbWUuc3BsaXQoJyAnKVswXS5yZXBsYWNlKCcgJywgJy0nKX1cIj4ke3R5cGUubmFtZS5zdWJzdHIoMCwgMSkudG9VcHBlckNhc2UoKX0ke3R5cGUubmFtZS5zdWJzdHIoMSl9IGNvb2tpZXM8L2xhYmVsPlxuXHRcdFx0XHRcdDwvbGk+YCkuam9pbignJyl9XG5cdFx0XHRcdDwvdWw+XG5cdFx0XHQ8L2Rpdj5cblx0XHRcdDxidXR0b24gY2xhc3M9XCIke21vZGVsLmNsYXNzTmFtZXMuYnRufVwiPkNvbnRpbnVlPC9idXR0b24+XG5cdFx0XHQ8IS0tZ29vZ2xlb246IGFsbC0tPlxuXHRcdDwvc2VjdGlvbj5gO1xuXHR9XG59OyIsImltcG9ydCB7IFRSSUdHRVJfRVZFTlRTLCBDTEFTU05BTUUgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyByZWFkQ29va2llLCBjb29raWVzRW5hYmxlZCwgc2hvdWxkRXhlY3V0ZSB9IGZyb20gJy4vdXRpbHMnO1xuLy8gaW1wb3J0IGFwcGx5IGZyb20gJy4vYXBwbHknO1xuXG5jb25zdCBpbml0VUkgPSBzZXR0aW5ncyA9PiB7XG4gICAgZG9jdW1lbnQuYm9keS5maXJzdEVsZW1lbnRDaGlsZC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWJlZ2luJywgc2V0dGluZ3MudGVtcGxhdGUoc2V0dGluZ3MpKTtcbiAgICBjb25zdCBmaWVsZHMgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke3NldHRpbmdzLmNsYXNzTmFtZXMuZmllbGR9YCkpO1xuICAgIGNvbnN0IGJhbm5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3NldHRpbmdzLmNsYXNzTmFtZXMuYmFubmVyfWApO1xuICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3NldHRpbmdzLmNsYXNzTmFtZXMuYnRufWApO1xuXG4gICAgVFJJR0dFUl9FVkVOVFMuZm9yRWFjaChldiA9PiB7XG4gICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKGV2LCBlID0+IHtcbiAgICAgICAgICAgIGlmKCFzaG91bGRFeGVjdXRlKGUpKSByZXR1cm47ICAgICBcbiAgICAgICAgICAgIGFwcGx5Q29uc2VudChzZXR0aW5ncywgZmllbGRzLnJlZHVjZSgoYWNjLCBmaWVsZCkgPT4geyByZXR1cm4gYWNjW2ZpZWxkLnZhbHVlXSA9IGZpZWxkLmNoZWNrZWQsIGFjYyB9LCB7fSkpO1xuICAgICAgICAgICAgLy8gYmFubmVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoYmFubmVyKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuXG5jb25zdCBhcHBseUNvbnNlbnQgPSAoc2V0dGluZ3MsIGNvbnNlbnQpID0+IHtcbiAgICBjb25zb2xlLmxvZyhzZXR0aW5ncywgY29uc2VudCk7XG4gICAgLy8gT2JqZWN0LmtleXMoY29uc2VudCkuZm9yRWFjaChrZXkgPT4ge1xuICAgIC8vICAgICBjb25zZW50W2tleV0gJiYgYXBwbHlba2V5XSAmJiBhcHBseVtrZXldLmZvckVhY2goZm4gPT4gZm4oc2V0dGluZ3MsIGNvbnNlbnQpKTtcbiAgICAvLyB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNldHRpbmdzID0+IHtcbiAgICBpZighY29va2llc0VuYWJsZWQoKSkgcmV0dXJuO1xuICAgIGNvbnNvbGUubG9nKHNldHRpbmdzKTtcblxuICAgIGNvbnN0IGNvb2tpZXMgPSByZWFkQ29va2llKHNldHRpbmdzKTtcbiAgICBcbiAgICBpZighY29va2llcykgaW5pdFVJKHNldHRpbmdzKTtcbiAgICBlbHNlIGFwcGx5Q29uc2VudChzZXR0aW5ncywgSlNPTi5wYXJzZShjb29raWVzLnZhbHVlKSk7XG5cbn07IiwiaW1wb3J0IHsgVFJJR0dFUl9LRVlDT0RFUyB9IGZyb20gJy4vY29uc3RhbnRzJztcblxuLy9Nb2Rlcm5penIgY29va2llIHRlc3RcbmV4cG9ydCBjb25zdCBjb29raWVzRW5hYmxlZCA9ICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgICBkb2N1bWVudC5jb29raWUgPSAnY29va2lldGVzdD0xJztcbiAgICAgICAgY29uc3QgcmV0ID0gZG9jdW1lbnQuY29va2llLmluZGV4T2YoJ2Nvb2tpZXRlc3Q9JykgIT09IC0xO1xuICAgICAgICBkb2N1bWVudC5jb29raWUgPSAnY29va2lldGVzdD0xOyBleHBpcmVzPVRodSwgMDEtSmFuLTE5NzAgMDA6MDA6MDEgR01UJztcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH1cbiAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbn07XG5cbmV4cG9ydCBjb25zdCB3cml0ZUNvb2tpZSA9IChzZXR0aW5ncywgcHJlZmVyZW5jZXMpID0+IFtcbiAgICBgJHtzZXR0aW5ncy5uYW1lfT0ke0pTT04uc3RyaW5naWZ5KHByZWZlcmVuY2VzKX07YCxcbiAgICBgZXhwaXJlcz0keyhuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldFRpbWUoKSArIChzZXR0aW5ncy5leHBpcnkqMjQqNjAqNjAqMTAwMCkpKS50b0dNVFN0cmluZygpfTtgLFxuICAgIGBwYXRoPSR7c2V0dGluZ3MucGF0aH07YCxcbiAgICBzZXR0aW5ncy5kb21haW4gPyBgZG9tYWluPSR7c2V0dGluZ3MuZG9tYWlufWAgOiAnJyxcbiAgICBzZXR0aW5ncy5zZWN1cmUgPyBgc2VjdXJlPSR7c2V0dGluZ3Muc2VjdXJlfWAgOiAnJ1xuXS5qb2luKCcnKTtcblxuZXhwb3J0IGNvbnN0IHJlYWRDb29raWUgPSBzZXR0aW5ncyA9PiB7XG4gICAgY29uc3QgY29va2llID0gZG9jdW1lbnQuY29va2llLnNwbGl0KCc7ICcpLm1hcChwYXJ0ID0+ICh7IG5hbWU6IHBhcnQuc3BsaXQoJz0nKVswXSwgdmFsdWU6IHBhcnQuc3BsaXQoJz0nKVsxXSB9KSkuZmlsdGVyKHBhcnQgPT4gcGFydC5uYW1lID09PSBzZXR0aW5ncy5uYW1lKVswXTtcbiAgICByZXR1cm4gY29va2llICE9PSB1bmRlZmluZWQgPyBjb29raWUgOiBmYWxzZTtcbn07XG5cbmV4cG9ydCBjb25zdCBHVE1Mb2FkID0gY29kZSA9PiB7XG4gICAgKGZ1bmN0aW9uKHcsZCxzLGwsaSl7d1tsXT13W2xdfHxbXTt3W2xdLnB1c2goeydndG0uc3RhcnQnOlxuICAgIG5ldyBEYXRlKCkuZ2V0VGltZSgpLGV2ZW50OidndG0uanMnfSk7dmFyIGY9ZC5nZXRFbGVtZW50c0J5VGFnTmFtZShzKVswXSxcbiAgICBqPWQuY3JlYXRlRWxlbWVudChzKSxkbD1sIT0nZGF0YUxheWVyJz8nJmw9JytsOicnO2ouYXN5bmM9dHJ1ZTtqLnNyYz1cbiAgICAnaHR0cHM6Ly93d3cuZ29vZ2xldGFnbWFuYWdlci5jb20vZ3RtLmpzP2lkPScraStkbDtmLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGosZik7XG4gICAgfSkod2luZG93LGRvY3VtZW50LCdzY3JpcHQnLCdkYXRhTGF5ZXInLCBjb2RlKTtcbn1cblxuZXhwb3J0IGNvbnN0IHNob3VsZEV4ZWN1dGUgPSBlID0+ICghIWUua2V5Q29kZSAmJiAhVFJJR0dFUl9LRVlDT0RFUy5pbmNsdWRlcyhlLmtleUNvZGUpKSB8fCAhKGUud2hpY2ggPT09IDMgfHwgZS5idXR0b24gPT09IDIpOyJdfQ==
