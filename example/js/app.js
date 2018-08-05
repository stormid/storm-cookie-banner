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

exports.default = {
    init: function init(opts) {
        return (0, _lib2.default)(Object.assign({}, _defaults2.default, opts, {
            types: Object.keys(opts.types).reduce(function (acc, curr) {
                if (acc[curr]) {
                    acc[curr] = Object.assign({}, acc[curr], {
                        fns: acc[curr].fns.concat(opts.types[curr].fns),
                        enabled: opts.types[curr].enabled
                    });
                } else acc[curr] = opts.types[curr];
                return acc;
            }, _defaults2.default.types)
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
		field: 'cookie-banner__field',
		changeBtn: 'cookie-banner__change'
	},
	template: function template(model) {
		return '<section role="dialog" aria-live="polite" aria-label="Cookie consent" aria-describedby="cookie-banner__desc" class="' + model.classNames.banner + '">\n\t\t\t<!--googleoff: all-->\n\t\t\t<div class="small-12" id="cookie-banner__desc">\n\t\t\t\t<h1 class="cookie-banner__heading">This website uses cookies.</h1>\n\t\t\t\t<p class="cookie-banner__text gamma">We use cookies to analyse our traffic and to provide social media features. You can choose which categories\n\t\t\t\tof cookies you consent to, or accept our recommended settings.\n\t\t\t\t<a class="cookie-banner__link" rel="noopener noreferrer nofollow" href="/cookies/">Find out more</a> about the cookies we use before you consent.</p>\n\t\t\t\t<ul class="cookie-banner__list lister push--bottom large-10">\n\t\t\t\t\t<li class="cookie-banner__list-item">\n\t\t\t\t\t\t<input id="cookie-banner__necessary" class="' + model.classNames.field + '" value="necessary" type="checkbox" checked disabled> \n\t\t\t\t\t\t<label class="cookie-banner__label gamma" for="cookie-banner_necessary">Necessary cookies</label>\n\t\t\t\t\t</li>\n\t\t\t\t\t' + Object.keys(model.types).map(function (type) {
			return '<li class="cookie-banner__list-item">\n\t\t\t\t\t\t<input id="cookie-banner__' + type.split(' ')[0].replace(' ', '-') + '" class="' + model.classNames.field + '" value="' + type + '" type="checkbox"' + (model.types[type].enabled ? ' checked' : '') + '> \n\t\t\t\t\t\t<label class="cookie-banner__label gamma" for="cookie-banner__' + type.split(' ')[0].replace(' ', '-') + '">' + type.substr(0, 1).toUpperCase() + type.substr(1) + ' cookies</label>\n\t\t\t\t\t</li>';
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
            banner.parentNode.removeChild(banner);
        });
    });
};

var applyConsent = function applyConsent(settings, consent) {
    Object.keys(consent).forEach(function (key) {
        consent[key] && settings.types[key].fns.forEach(function (fn) {
            return fn(settings, consent);
        });
    });
};

exports.default = function (settings) {
    if (!(0, _utils.cookiesEnabled)()) return;
    console.log(settings);

    var cookies = (0, _utils.readCookie)(settings);

    if (!cookies) initUI(settings);else {
        applyConsent(settings, JSON.parse(cookies.value));

        /*
        Add change button
        const btn = document.querySelector(`.${settings.classNames.changeBtn}`);
         TRIGGER_EVENTS.forEach(ev => {
            btn.addEventListener(ev, e => {
                if(!shouldExecute(e)) return;     
                applyConsent(settings, fields.reduce((acc, field) => { return acc[field.value] = field.checked, acc }, {}));
                banner.parentNode.removeChild(banner);
            });
        });
         */
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlL3NyYy9hcHAuanMiLCJzcmMvaW5kZXguanMiLCJzcmMvbGliL2NvbnN0YW50cy5qcyIsInNyYy9saWIvZGVmYXVsdHMuanMiLCJzcmMvbGliL2luZGV4LmpzIiwic3JjL2xpYi91dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBQSxPQUFBLFFBQUEsV0FBQSxDQUFBOzs7Ozs7OztBQUVBLE9BQUEsZ0JBQUEsQ0FBQSxrQkFBQSxFQUE0QyxZQUFNO0FBQzlDLFVBQUEsT0FBQSxDQUFBLElBQUEsQ0FBa0I7QUFDZCxlQUFPO0FBQ0gsMEJBQWU7QUFDWCx5QkFEVyxLQUFBO0FBRVgscUJBQUssQ0FDRCxZQUFNO0FBQUUsNEJBQUEsR0FBQSxDQUFBLGVBQUE7QUFEUCxpQkFBQTtBQUZNLGFBRFo7QUFPSCwyQkFBZTtBQUNYLHlCQURXLElBQUE7QUFFWCxxQkFBSyxDQUNELFlBQU07QUFBRSw0QkFBQSxHQUFBLENBQUEsZ0JBQUE7QUFEUCxpQkFBQTtBQUZNLGFBUFo7QUFhSCx5Q0FBNkI7QUFDekIseUJBRHlCLEtBQUE7QUFFekIscUJBQUssQ0FDRCxZQUFNO0FBQUUsNEJBQUEsR0FBQSxDQUFBLDhCQUFBO0FBRFAsaUJBQUE7QUFGb0I7QUFiMUI7QUFETyxLQUFsQjtBQURKLENBQUE7Ozs7Ozs7OztBQ0ZBLElBQUEsWUFBQSxRQUFBLGdCQUFBLENBQUE7Ozs7QUFDQSxJQUFBLE9BQUEsUUFBQSxPQUFBLENBQUE7Ozs7Ozs7O2tCQUVlO0FBQ1gsVUFBTSxTQUFBLElBQUEsQ0FBQSxJQUFBLEVBQUE7QUFBQSxlQUFRLENBQUEsR0FBQSxNQUFBLE9BQUEsRUFBUSxPQUFBLE1BQUEsQ0FBQSxFQUFBLEVBQWtCLFdBQWxCLE9BQUEsRUFBQSxJQUFBLEVBQWtDO0FBQ3BELG1CQUFPLE9BQUEsSUFBQSxDQUFZLEtBQVosS0FBQSxFQUFBLE1BQUEs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LElBQUEsSUFBQSxHQUQ2QyxPQUM3QyxFQUQ2QyxFQUN4QixPQURjLFFBQVUsRUFBVixFQUNHLElBQUksSUFBRSxFQUFBLG9CQUFBLENBQUEsQ0FBQSxFQUFOLENBQU0sQ0FBTjtBQUFBLFlBQ3RDLElBQUUsRUFBQSxhQUFBLENBRG9DLENBQ3BDLENBRG9DO0FBQUEsWUFDakIsS0FBRyxLQUFBLFdBQUEsR0FBZSxRQUFmLENBQUEsR0FEYyxFQUFBLENBQ1ksRUFBQSxLQUFBLEdBQUEsSUFBQSxDQUFhLEVBQUEsR0FBQSxHQUMvRCxnREFBQSxDQUFBLEdBRCtELEVBQUEsQ0FDWixFQUFBLFVBQUEsQ0FBQSxZQUFBLENBQUEsQ0FBQSxFQUFBLENBQUE7QUFIbkQsS0FBQSxFQUFBLE1BQUEsRUFBQSxRQUFBLEVBQUEsUUFBQSxFQUFBLFdBQUEsRUFBQSxJQUFBO0FBREcsQ0FBQTs7QUFRQSxJQUFNLGdCQUFBLFFBQUEsYUFBQSxHQUFnQixTQUFoQixhQUFnQixDQUFBLENBQUEsRUFBQTtBQUFBLFdBQU0sQ0FBQyxDQUFDLEVBQUYsT0FBQSxJQUFlLENBQUMsV0FBQSxnQkFBQSxDQUFBLFFBQUEsQ0FBMEIsRUFBM0MsT0FBaUIsQ0FBaEIsSUFBeUQsRUFBRSxFQUFBLEtBQUEsS0FBQSxDQUFBLElBQWlCLEVBQUEsTUFBQSxLQUFsRixDQUErRCxDQUEvRDtBQUF0QixDQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IENvb2tpZUJhbm5lciBmcm9tICcuLi8uLi9zcmMnO1xuICAgIFxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gICAgQ29va2llQmFubmVyLmluaXQoe1xuICAgICAgICB0eXBlczoge1xuICAgICAgICAgICAgJ3ByZWZlcmVuY2UnIDoge1xuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGZuczogW1xuICAgICAgICAgICAgICAgICAgICAoKSA9PiB7IGNvbnNvbGUubG9nKCdQcmVmZXJlbmNlIGZuJyk7IH0sXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdwZXJmb3JtYW5jZSc6IHtcbiAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIGZuczogW1xuICAgICAgICAgICAgICAgICAgICAoKSA9PiB7IGNvbnNvbGUubG9nKCdQZXJmb3JtYW5jZSBmbicpOyB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdhZHZlcnRpc2luZyBhbmQgbWFya2V0aW5nJzoge1xuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGZuczogW1xuICAgICAgICAgICAgICAgICAgICAoKSA9PiB7IGNvbnNvbGUubG9nKCdBZHZlcnRpc2luZyBhbmQgbWFya2V0aW5nIGZuJyk7IH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn0pOyIsImltcG9ydCBkZWZhdWx0cyBmcm9tICcuL2xpYi9kZWZhdWx0cyc7XG5pbXBvcnQgZmFjdG9yeSBmcm9tICcuL2xpYic7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBpbml0OiBvcHRzID0+IGZhY3RvcnkoT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMsIG9wdHMsIHtcbiAgICAgICAgdHlwZXM6IE9iamVjdC5rZXlzKG9wdHMudHlwZXMpLnJlZHVjZSgoYWNjLCBjdXJyKSA9PiB7XG4gICAgICAgICAgICBpZihhY2NbY3Vycl0pIHtcbiAgICAgICAgICAgICAgICBhY2NbY3Vycl0gPSBPYmplY3QuYXNzaWduKHt9LCBhY2NbY3Vycl0sIHtcbiAgICAgICAgICAgICAgICAgICAgZm5zOiBhY2NbY3Vycl0uZm5zLmNvbmNhdChvcHRzLnR5cGVzW2N1cnJdLmZucyksXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IG9wdHMudHlwZXNbY3Vycl0uZW5hYmxlZFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSAgZWxzZSBhY2NbY3Vycl0gPSBvcHRzLnR5cGVzW2N1cnJdO1xuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfSwgZGVmYXVsdHMudHlwZXMpXG4gICAgfSkpXG59OyIsImV4cG9ydCBjb25zdCBUUklHR0VSX0VWRU5UUyA9IHdpbmRvdy5Qb2ludGVyRXZlbnQgPyBbJ3BvaW50ZXJ1cCcsICdrZXlkb3duJ10gOiBbJ29udG91Y2hzdGFydCcgaW4gd2luZG93ID8gJ3RvdWNoc3RhcnQnIDogJ2NsaWNrJywgJ2tleWRvd24nIF07XG5cbmV4cG9ydCBjb25zdCBUUklHR0VSX0tFWUNPREVTID0gWzEzLCAzMl07XG5cbmV4cG9ydCBjb25zdCBDTEFTU05BTUUgPSB7XG4gICAgQkFOTkVSOiAnY29va2llLWJhbm5lcicsXG4gICAgRklFTEQ6ICdjb29raWUtYmFubmVyX19maWVsZCcsXG4gICAgQlROOiAnY29va2llLWJhbm5lcl9fYnRuJ1xufTtcblxuZXhwb3J0IGNvbnN0IERBVEFfQVRUUklCVVRFID0ge1xuICAgIFRZUEU6ICdkYXRhLWNvbnNlbnQtdHlwZScsXG4gICAgSUQ6ICdkYXRhLWNvbnNlbnQtaWQnXG59OyIsImltcG9ydCB7IHdyaXRlQ29va2llIH0gZnJvbSAnLi91dGlscyc7IFxuXG5leHBvcnQgZGVmYXVsdCB7XG5cdG5hbWU6ICdDb29raWVQcmVmZXJlbmNlcycsXG5cdHBhdGg6ICcvJyxcblx0ZG9tYWluOiAnJyxcblx0c2VjdXJlOiAnJyxcblx0ZXhwaXJ5OiAzNjUsXG5cdHR5cGVzOiB7XG5cdFx0J3ByZWZlcmVuY2UnOiB7XG5cdFx0XHRlbmFibGVkOiB0cnVlLFxuXHRcdFx0Zm5zOiBbXG5cdFx0XHRcdChzZXR0aW5ncywgY29uc2VudCkgPT4geyBkb2N1bWVudC5jb29raWUgPSB3cml0ZUNvb2tpZShzZXR0aW5ncywgY29uc2VudCk7IH1cblx0XHRcdF1cblx0XHR9XG5cdH0sXG5cdGNsYXNzTmFtZXM6IHtcblx0XHRiYW5uZXI6ICdjb29raWUtYmFubmVyJyxcblx0XHRidG46ICdjb29raWUtYmFubmVyX19idG4nLFxuXHRcdGZpZWxkOiAnY29va2llLWJhbm5lcl9fZmllbGQnLFxuXHRcdGNoYW5nZUJ0bjogJ2Nvb2tpZS1iYW5uZXJfX2NoYW5nZSdcblx0fSxcblx0dGVtcGxhdGUobW9kZWwpe1xuXHRcdHJldHVybiBgPHNlY3Rpb24gcm9sZT1cImRpYWxvZ1wiIGFyaWEtbGl2ZT1cInBvbGl0ZVwiIGFyaWEtbGFiZWw9XCJDb29raWUgY29uc2VudFwiIGFyaWEtZGVzY3JpYmVkYnk9XCJjb29raWUtYmFubmVyX19kZXNjXCIgY2xhc3M9XCIke21vZGVsLmNsYXNzTmFtZXMuYmFubmVyfVwiPlxuXHRcdFx0PCEtLWdvb2dsZW9mZjogYWxsLS0+XG5cdFx0XHQ8ZGl2IGNsYXNzPVwic21hbGwtMTJcIiBpZD1cImNvb2tpZS1iYW5uZXJfX2Rlc2NcIj5cblx0XHRcdFx0PGgxIGNsYXNzPVwiY29va2llLWJhbm5lcl9faGVhZGluZ1wiPlRoaXMgd2Vic2l0ZSB1c2VzIGNvb2tpZXMuPC9oMT5cblx0XHRcdFx0PHAgY2xhc3M9XCJjb29raWUtYmFubmVyX190ZXh0IGdhbW1hXCI+V2UgdXNlIGNvb2tpZXMgdG8gYW5hbHlzZSBvdXIgdHJhZmZpYyBhbmQgdG8gcHJvdmlkZSBzb2NpYWwgbWVkaWEgZmVhdHVyZXMuIFlvdSBjYW4gY2hvb3NlIHdoaWNoIGNhdGVnb3JpZXNcblx0XHRcdFx0b2YgY29va2llcyB5b3UgY29uc2VudCB0bywgb3IgYWNjZXB0IG91ciByZWNvbW1lbmRlZCBzZXR0aW5ncy5cblx0XHRcdFx0PGEgY2xhc3M9XCJjb29raWUtYmFubmVyX19saW5rXCIgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlciBub2ZvbGxvd1wiIGhyZWY9XCIvY29va2llcy9cIj5GaW5kIG91dCBtb3JlPC9hPiBhYm91dCB0aGUgY29va2llcyB3ZSB1c2UgYmVmb3JlIHlvdSBjb25zZW50LjwvcD5cblx0XHRcdFx0PHVsIGNsYXNzPVwiY29va2llLWJhbm5lcl9fbGlzdCBsaXN0ZXIgcHVzaC0tYm90dG9tIGxhcmdlLTEwXCI+XG5cdFx0XHRcdFx0PGxpIGNsYXNzPVwiY29va2llLWJhbm5lcl9fbGlzdC1pdGVtXCI+XG5cdFx0XHRcdFx0XHQ8aW5wdXQgaWQ9XCJjb29raWUtYmFubmVyX19uZWNlc3NhcnlcIiBjbGFzcz1cIiR7bW9kZWwuY2xhc3NOYW1lcy5maWVsZH1cIiB2YWx1ZT1cIm5lY2Vzc2FyeVwiIHR5cGU9XCJjaGVja2JveFwiIGNoZWNrZWQgZGlzYWJsZWQ+IFxuXHRcdFx0XHRcdFx0PGxhYmVsIGNsYXNzPVwiY29va2llLWJhbm5lcl9fbGFiZWwgZ2FtbWFcIiBmb3I9XCJjb29raWUtYmFubmVyX25lY2Vzc2FyeVwiPk5lY2Vzc2FyeSBjb29raWVzPC9sYWJlbD5cblx0XHRcdFx0XHQ8L2xpPlxuXHRcdFx0XHRcdCR7T2JqZWN0LmtleXMobW9kZWwudHlwZXMpLm1hcCh0eXBlID0+IGA8bGkgY2xhc3M9XCJjb29raWUtYmFubmVyX19saXN0LWl0ZW1cIj5cblx0XHRcdFx0XHRcdDxpbnB1dCBpZD1cImNvb2tpZS1iYW5uZXJfXyR7dHlwZS5zcGxpdCgnICcpWzBdLnJlcGxhY2UoJyAnLCAnLScpfVwiIGNsYXNzPVwiJHttb2RlbC5jbGFzc05hbWVzLmZpZWxkfVwiIHZhbHVlPVwiJHt0eXBlfVwiIHR5cGU9XCJjaGVja2JveFwiJHttb2RlbC50eXBlc1t0eXBlXS5lbmFibGVkID8gYCBjaGVja2VkYCA6ICcnfT4gXG5cdFx0XHRcdFx0XHQ8bGFiZWwgY2xhc3M9XCJjb29raWUtYmFubmVyX19sYWJlbCBnYW1tYVwiIGZvcj1cImNvb2tpZS1iYW5uZXJfXyR7dHlwZS5zcGxpdCgnICcpWzBdLnJlcGxhY2UoJyAnLCAnLScpfVwiPiR7dHlwZS5zdWJzdHIoMCwgMSkudG9VcHBlckNhc2UoKX0ke3R5cGUuc3Vic3RyKDEpfSBjb29raWVzPC9sYWJlbD5cblx0XHRcdFx0XHQ8L2xpPmApLmpvaW4oJycpfVxuXHRcdFx0XHQ8L3VsPlxuXHRcdFx0PC9kaXY+XG5cdFx0XHQ8YnV0dG9uIGNsYXNzPVwiJHttb2RlbC5jbGFzc05hbWVzLmJ0bn1cIj5Db250aW51ZTwvYnV0dG9uPlxuXHRcdFx0PCEtLWdvb2dsZW9uOiBhbGwtLT5cblx0XHQ8L3NlY3Rpb24+YDtcblx0fVxufTsiLCJpbXBvcnQgeyBUUklHR0VSX0VWRU5UUywgQ0xBU1NOQU1FIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgcmVhZENvb2tpZSwgY29va2llc0VuYWJsZWQsIHNob3VsZEV4ZWN1dGUgfSBmcm9tICcuL3V0aWxzJztcblxuY29uc3QgaW5pdFVJID0gc2V0dGluZ3MgPT4ge1xuICAgIGRvY3VtZW50LmJvZHkuZmlyc3RFbGVtZW50Q2hpbGQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmViZWdpbicsIHNldHRpbmdzLnRlbXBsYXRlKHNldHRpbmdzKSk7XG4gICAgY29uc3QgZmllbGRzID0gW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuJHtzZXR0aW5ncy5jbGFzc05hbWVzLmZpZWxkfWApKTtcbiAgICBjb25zdCBiYW5uZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtzZXR0aW5ncy5jbGFzc05hbWVzLmJhbm5lcn1gKTtcbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtzZXR0aW5ncy5jbGFzc05hbWVzLmJ0bn1gKTtcblxuICAgIFRSSUdHRVJfRVZFTlRTLmZvckVhY2goZXYgPT4ge1xuICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihldiwgZSA9PiB7XG4gICAgICAgICAgICBpZighc2hvdWxkRXhlY3V0ZShlKSkgcmV0dXJuOyAgICAgXG4gICAgICAgICAgICBhcHBseUNvbnNlbnQoc2V0dGluZ3MsIGZpZWxkcy5yZWR1Y2UoKGFjYywgZmllbGQpID0+IHsgcmV0dXJuIGFjY1tmaWVsZC52YWx1ZV0gPSBmaWVsZC5jaGVja2VkLCBhY2MgfSwge30pKTtcbiAgICAgICAgICAgIGJhbm5lci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGJhbm5lcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufTtcblxuY29uc3QgYXBwbHlDb25zZW50ID0gKHNldHRpbmdzLCBjb25zZW50KSA9PiB7XG4gICAgT2JqZWN0LmtleXMoY29uc2VudCkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBjb25zZW50W2tleV0gJiYgc2V0dGluZ3MudHlwZXNba2V5XS5mbnMuZm9yRWFjaChmbiA9PiBmbihzZXR0aW5ncywgY29uc2VudCkpO1xuICAgIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgc2V0dGluZ3MgPT4ge1xuICAgIGlmKCFjb29raWVzRW5hYmxlZCgpKSByZXR1cm47XG4gICAgY29uc29sZS5sb2coc2V0dGluZ3MpO1xuXG4gICAgY29uc3QgY29va2llcyA9IHJlYWRDb29raWUoc2V0dGluZ3MpO1xuICAgIFxuICAgIGlmKCFjb29raWVzKSBpbml0VUkoc2V0dGluZ3MpO1xuICAgIGVsc2Uge1xuICAgICAgICBhcHBseUNvbnNlbnQoc2V0dGluZ3MsIEpTT04ucGFyc2UoY29va2llcy52YWx1ZSkpO1xuXG4gICAgICAgIC8qXG4gICAgICAgIEFkZCBjaGFuZ2UgYnV0dG9uXG4gICAgICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3NldHRpbmdzLmNsYXNzTmFtZXMuY2hhbmdlQnRufWApO1xuXG4gICAgICAgIFRSSUdHRVJfRVZFTlRTLmZvckVhY2goZXYgPT4ge1xuICAgICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoZXYsIGUgPT4ge1xuICAgICAgICAgICAgICAgIGlmKCFzaG91bGRFeGVjdXRlKGUpKSByZXR1cm47ICAgICBcbiAgICAgICAgICAgICAgICBhcHBseUNvbnNlbnQoc2V0dGluZ3MsIGZpZWxkcy5yZWR1Y2UoKGFjYywgZmllbGQpID0+IHsgcmV0dXJuIGFjY1tmaWVsZC52YWx1ZV0gPSBmaWVsZC5jaGVja2VkLCBhY2MgfSwge30pKTtcbiAgICAgICAgICAgICAgICBiYW5uZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChiYW5uZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICovXG4gICAgfVxuXG59OyIsImltcG9ydCB7IFRSSUdHRVJfS0VZQ09ERVMgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbi8vTW9kZXJuaXpyIGNvb2tpZSB0ZXN0XG5leHBvcnQgY29uc3QgY29va2llc0VuYWJsZWQgPSAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gJ2Nvb2tpZXRlc3Q9MSc7XG4gICAgICAgIGNvbnN0IHJldCA9IGRvY3VtZW50LmNvb2tpZS5pbmRleE9mKCdjb29raWV0ZXN0PScpICE9PSAtMTtcbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gJ2Nvb2tpZXRlc3Q9MTsgZXhwaXJlcz1UaHUsIDAxLUphbi0xOTcwIDAwOjAwOjAxIEdNVCc7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgICB9XG4gICAgICBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG59O1xuXG5leHBvcnQgY29uc3Qgd3JpdGVDb29raWUgPSAoc2V0dGluZ3MsIHByZWZlcmVuY2VzKSA9PiBbXG4gICAgYCR7c2V0dGluZ3MubmFtZX09JHtKU09OLnN0cmluZ2lmeShwcmVmZXJlbmNlcyl9O2AsXG4gICAgYGV4cGlyZXM9JHsobmV3IERhdGUobmV3IERhdGUoKS5nZXRUaW1lKCkgKyAoc2V0dGluZ3MuZXhwaXJ5KjI0KjYwKjYwKjEwMDApKSkudG9HTVRTdHJpbmcoKX07YCxcbiAgICBgcGF0aD0ke3NldHRpbmdzLnBhdGh9O2AsXG4gICAgc2V0dGluZ3MuZG9tYWluID8gYGRvbWFpbj0ke3NldHRpbmdzLmRvbWFpbn1gIDogJycsXG4gICAgc2V0dGluZ3Muc2VjdXJlID8gYHNlY3VyZT0ke3NldHRpbmdzLnNlY3VyZX1gIDogJydcbl0uam9pbignJyk7XG5cbmV4cG9ydCBjb25zdCByZWFkQ29va2llID0gc2V0dGluZ3MgPT4ge1xuICAgIGNvbnN0IGNvb2tpZSA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOyAnKS5tYXAocGFydCA9PiAoeyBuYW1lOiBwYXJ0LnNwbGl0KCc9JylbMF0sIHZhbHVlOiBwYXJ0LnNwbGl0KCc9JylbMV0gfSkpLmZpbHRlcihwYXJ0ID0+IHBhcnQubmFtZSA9PT0gc2V0dGluZ3MubmFtZSlbMF07XG4gICAgcmV0dXJuIGNvb2tpZSAhPT0gdW5kZWZpbmVkID8gY29va2llIDogZmFsc2U7XG59O1xuXG5leHBvcnQgY29uc3QgR1RNTG9hZCA9IGNvZGUgPT4ge1xuICAgIChmdW5jdGlvbih3LGQscyxsLGkpe3dbbF09d1tsXXx8W107d1tsXS5wdXNoKHsnZ3RtLnN0YXJ0JzpcbiAgICBuZXcgRGF0ZSgpLmdldFRpbWUoKSxldmVudDonZ3RtLmpzJ30pO3ZhciBmPWQuZ2V0RWxlbWVudHNCeVRhZ05hbWUocylbMF0sXG4gICAgaj1kLmNyZWF0ZUVsZW1lbnQocyksZGw9bCE9J2RhdGFMYXllcic/JyZsPScrbDonJztqLmFzeW5jPXRydWU7ai5zcmM9XG4gICAgJ2h0dHBzOi8vd3d3Lmdvb2dsZXRhZ21hbmFnZXIuY29tL2d0bS5qcz9pZD0nK2krZGw7Zi5wYXJlbnROb2RlLmluc2VydEJlZm9yZShqLGYpO1xuICAgIH0pKHdpbmRvdyxkb2N1bWVudCwnc2NyaXB0JywnZGF0YUxheWVyJywgY29kZSk7XG59XG5cbmV4cG9ydCBjb25zdCBzaG91bGRFeGVjdXRlID0gZSA9PiAoISFlLmtleUNvZGUgJiYgIVRSSUdHRVJfS0VZQ09ERVMuaW5jbHVkZXMoZS5rZXlDb2RlKSkgfHwgIShlLndoaWNoID09PSAzIHx8IGUuYnV0dG9uID09PSAyKTsiXX0=
