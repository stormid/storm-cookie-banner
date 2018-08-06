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
            'necessary': {
                fns: [function () {
                    console.log('Necessary fn');
                }]
            },
            'preference': {
                checked: true,
                fns: [function () {
                    console.log('Preference fn');
                }]
            },
            'performance': {
                checked: true,
                fns: [function () {
                    console.log('Performance fn');
                }]
            },
            'advertising and marketing': {
                checked: false,
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
                        checked: opts.types[curr].checked !== undefined ? opts.types[curr].checked : _defaults2.default.types[curr].checked !== undefined ? _defaults2.default.types[curr].checked : false
                    });
                } else acc[curr] = opts.types[curr];
                return acc;
            }, _defaults2.default.types)
        }));
    }
};

},{"./lib":6,"./lib/defaults":5}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var apply = exports.apply = function apply(state) {
    Object.keys(state.consent).forEach(function (key) {
        state.consent[key] && state.settings.types[key].fns.forEach(function (fn) {
            return fn(state);
        });
    });
};

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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
		'necessary': {
			checked: true,
			disabled: true,
			fns: []
		},
		'preference': {
			checked: true,
			fns: [function (model) {
				document.cookie = (0, _utils.writeCookie)(model);
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

},{"./utils":10}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require('./utils');

var _ui = require('./ui');

var _consent = require('./consent');

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _reducers = require('./reducers');

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = function (settings) {
    if (!(0, _utils.cookiesEnabled)()) return;

    var Store = (0, _store2.default)();
    var cookies = (0, _utils.readCookie)(settings);
    Store.update(_reducers.initialState, { settings: settings, consent: cookies ? JSON.parse(cookies.value) : {} }, !cookies ? [(0, _ui.initBanner)(Store)] : [_consent.apply, (0, _ui.initUpdateBtn)(Store)]);
};

},{"./consent":3,"./reducers":7,"./store":8,"./ui":9,"./utils":10}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var initialState = exports.initialState = function initialState(state, data) {
  return Object.assign({}, state, data);
};
var setConsent = exports.setConsent = function setConsent(state, data) {
  return Object.assign({}, state, data);
};
var updateConsent = exports.updateConsent = function updateConsent(state, data) {
  return Object.assign({}, state, data);
};

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
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

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initUpdateBtn = exports.initBanner = undefined;

var _utils = require('./utils');

var _constants = require('./constants');

var _consent = require('./consent');

var _reducers = require('./reducers');

var initBanner = exports.initBanner = function initBanner(Store) {
    return function (state) {
        document.body.firstElementChild.insertAdjacentHTML('beforebegin', state.settings.bannerTemplate((0, _utils.composeUpdateUIModel)(state)));
        var fields = [].slice.call(document.querySelectorAll('.' + state.settings.classNames.field));
        var banner = document.querySelector('.' + state.settings.classNames.banner);
        var btn = document.querySelector('.' + state.settings.classNames.btn);

        _constants.TRIGGER_EVENTS.forEach(function (ev) {
            btn.addEventListener(ev, function (e) {
                if (!(0, _utils.shouldExecute)(e)) return;
                Store.update(_reducers.setConsent, { consent: fields.reduce(function (acc, field) {
                        return acc[field.value] = field.checked, acc;
                    }, {}) }, [_consent.apply, initUpdateBtn(Store), function () {
                    banner.parentNode.removeChild(banner);
                }]);
            });
        });
    };
};

var initUpdateBtn = exports.initUpdateBtn = function initUpdateBtn(Store) {
    return function (state) {
        var updateBtnContainer = document.querySelector('.' + state.settings.classNames.updateBtnContainer);
        if (!updateBtnContainer) return;
        var updateBtn = document.querySelector('.' + state.settings.classNames.updateBtn);
        if (updateBtn) return updateBtn.removeAttribute('disabled');
        updateBtnContainer.innerHTML = state.settings.updateBtnTemplate(state.settings);

        _constants.TRIGGER_EVENTS.forEach(function (ev) {
            document.querySelector('.' + state.settings.classNames.updateBtn).addEventListener(ev, function (e) {
                if (!(0, _utils.shouldExecute)(e)) return;
                Store.update(_reducers.updateConsent, {}, [initBanner(Store), function () {
                    e.target.setAttribute('disabled', 'disabled');
                }]);
            });
        });
    };
};

},{"./consent":3,"./constants":4,"./reducers":7,"./utils":10}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.shouldExecute = exports.composeUpdateUIModel = exports.GTMLoad = exports.readCookie = exports.writeCookie = exports.cookiesEnabled = undefined;

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

var writeCookie = exports.writeCookie = function writeCookie(state) {
    return [state.settings.name + '=' + JSON.stringify(state.consent) + ';', 'expires=' + new Date(new Date().getTime() + state.settings.expiry * 24 * 60 * 60 * 1000).toGMTString() + ';', 'path=' + state.settings.path + ';', state.settings.domain ? 'domain=' + state.settings.domain : '', state.settings.secure ? 'secure=' + state.settings.secure : ''].join('');
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

var composeUpdateUIModel = exports.composeUpdateUIModel = function composeUpdateUIModel(state) {
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

var shouldExecute = exports.shouldExecute = function shouldExecute(e) {
    return !!e.keyCode && !_constants.TRIGGER_KEYCODES.includes(e.keyCode) || !(e.which === 3 || e.button === 2);
};

},{"./constants":4}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlL3NyYy9hcHAuanMiLCJzcmMvaW5kZXguanMiLCJzcmMvbGliL2NvbnNlbnQuanMiLCJzcmMvbGliL2NvbnN0YW50cy5qcyIsInNyYy9saWIvZGVmYXVsdHMuanMiLCJzcmMvbGliL2luZGV4LmpzIiwic3JjL2xpYi9yZWR1Y2Vycy5qcyIsInNyYy9saWIvc3RvcmUuanMiLCJzcmMvbGliL3VpLmpzIiwic3JjL2xpYi91dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBQSxPQUFBLFFBQUEsV0FBQSxDQUFBOzs7Ozs7OztBQUVBLE9BQUEsZ0JBQUEsQ0FBQSxrQkFBQSxFQUE0QyxZQUFNO0FBQzlDLFVBQUEsT0FBQSxDQUFBLElBQUEsQ0FBa0I7QUFDZCxlQUFPO0FBQ0gseUJBQWE7QUFDVCxxQkFBSyxDQUNELFlBQU07QUFBRSw0QkFBQSxHQUFBLENBQUEsY0FBQTtBQURQLGlCQUFBO0FBREksYUFEVjtBQU1ILDBCQUFjO0FBQ1YseUJBRFUsSUFBQTtBQUVWLHFCQUFLLENBQ0QsWUFBTTtBQUFFLDRCQUFBLEdBQUEsQ0FBQSxlQUFBO0FBRFAsaUJBQUE7QUFGSyxhQU5YO0FBWUgsMkJBQWU7QUFDWCx5QkFEVyxJQUFBO0FBRVgscUJBQUssQ0FDRCxZQUFNO0FBQUUsNEJBQUEsR0FBQSxDQUFBLGdCQUFBO0FBRFAsaUJBQUE7QUFGTSxhQVpaO0FBa0JILHlDQUE2QjtBQUN6Qix5QkFEeUIsS0FBQTtBQUV6QixxQkFBSyxDQUNELFlBQU07QUFBRSw0QkFBQSxHQUFBLENBQUEsOEJBQUE7QUFEUCxpQkFBQTtBQUZvQjtBQWxCMUI7QUFETyxLQUFsQjtBQURKLENBQUE7Ozs7Ozs7OztBQ0ZBLElBQUEsWUFBQSxRQUFBLGdCQUFBLENBQUE7Ozs7QUFDQSxJQUFBLE9BQUEsUUFBQSxPQUFBLENBQUE7Ozs7Ozs7O2tCQUVlO0FBQ1gsVUFBTSxT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QUFBLENBQXBDLElBQW9DLENBQXBDLEdBQTBELE1BQUEsUUFBQSxDQUFBLEtBQUEsQ0FBQSxJQUFBLEVBQTJCO0FBRHhDLGlCQUE5QyxDQUFaO0FBREosYUFBQSxNQUlPLElBQUEsSUFBQSxJQUFZLE1BQUEsUUFBQSxDQUFBLEtBQUEsQ0FBWixJQUFZLENBQVo7QUFDUCxtQkFBQSxHQUFBO0FBTkcsU0FBQSxFQUFBLEVBQUE7QUFEOEIsS0FBbEMsQ0FBUDtBQURHLENBQUE7O0FBYUEsSUFBTSxnQkFBQSxRQUFBLGFBQUEsR0FBZ0IsU0FBaEIsYUFBZ0IsQ0FBQSxDQUFBLEVBQUE7QUFBQSxXQUFNLENBQUMsQ0FBQyxFQUFGLE9BQUEsSUFBZSxDQUFDLFdBQUEsZ0JBQUEsQ0FBQSxRQUFBLENBQTBCLEVBQTNDLE9BQWlCLENBQWhCLElBQXlELEVBQUUsRUFBQSxLQUFBLEtBQUEsQ0FBQSxJQUFpQixFQUFBLE1BQUEsS0FBbEYsQ0FBK0QsQ0FBL0Q7QUFBdEIsQ0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBDb29raWVCYW5uZXIgZnJvbSAnLi4vLi4vc3JjJztcbiAgICBcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAgIENvb2tpZUJhbm5lci5pbml0KHtcbiAgICAgICAgdHlwZXM6IHtcbiAgICAgICAgICAgICduZWNlc3NhcnknOiB7XG4gICAgICAgICAgICAgICAgZm5zOiBbXG4gICAgICAgICAgICAgICAgICAgICgpID0+IHsgY29uc29sZS5sb2coJ05lY2Vzc2FyeSBmbicpOyB9LFxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAncHJlZmVyZW5jZSc6IHtcbiAgICAgICAgICAgICAgICBjaGVja2VkOiB0cnVlLFxuICAgICAgICAgICAgICAgIGZuczogW1xuICAgICAgICAgICAgICAgICAgICAoKSA9PiB7IGNvbnNvbGUubG9nKCdQcmVmZXJlbmNlIGZuJyk7IH0sXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdwZXJmb3JtYW5jZSc6IHtcbiAgICAgICAgICAgICAgICBjaGVja2VkOiB0cnVlLFxuICAgICAgICAgICAgICAgIGZuczogW1xuICAgICAgICAgICAgICAgICAgICAoKSA9PiB7IGNvbnNvbGUubG9nKCdQZXJmb3JtYW5jZSBmbicpOyB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdhZHZlcnRpc2luZyBhbmQgbWFya2V0aW5nJzoge1xuICAgICAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGZuczogW1xuICAgICAgICAgICAgICAgICAgICAoKSA9PiB7IGNvbnNvbGUubG9nKCdBZHZlcnRpc2luZyBhbmQgbWFya2V0aW5nIGZuJyk7IH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn0pOyIsImltcG9ydCBkZWZhdWx0cyBmcm9tICcuL2xpYi9kZWZhdWx0cyc7XG5pbXBvcnQgZmFjdG9yeSBmcm9tICcuL2xpYic7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBpbml0OiBvcHRzID0+IGZhY3RvcnkoT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMsIG9wdHMsIHtcbiAgICAgICAgdHlwZXM6IE9iamVjdC5rZXlzKG9wdHMudHlwZXMpLnJlZHVjZSgoYWNjLCBjdXJyKSA9PiB7XG4gICAgICAgICAgICBpZihhY2NbY3Vycl0pIHtcbiAgICAgICAgICAgICAgICBhY2NbY3Vycl0gPSBPYmplY3QuYXNzaWduKHt9LCBhY2NbY3Vycl0sIHtcbiAgICAgICAgICAgICAgICAgICAgZm5zOiBhY2NbY3Vycl0uZm5zLmNvbmNhdChvcHRzLnR5cGVzW2N1cnJdLmZucyksXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6IG9wdHMudHlwZXNbY3Vycl0uY2hlY2tlZCAhPT0gdW5kZWZpbmVkID8gb3B0cy50eXBlc1tjdXJyXS5jaGVja2VkIDogZGVmYXVsdHMudHlwZXNbY3Vycl0uY2hlY2tlZCAhPT0gdW5kZWZpbmVkID8gZGVmYXVsdHMudHlwZXNbY3Vycl0uY2hlY2tlZCA6IGZhbHNlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9ICBlbHNlIGFjY1tjdXJyXSA9IG9wdHMudHlwZXNbY3Vycl07XG4gICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICB9LCBkZWZhdWx0cy50eXBlcylcbiAgICB9KSlcbn07IiwiZXhwb3J0IGNvbnN0IGFwcGx5ID0gc3RhdGUgPT4ge1xuICAgIE9iamVjdC5rZXlzKHN0YXRlLmNvbnNlbnQpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgc3RhdGUuY29uc2VudFtrZXldICYmIHN0YXRlLnNldHRpbmdzLnR5cGVzW2tleV0uZm5zLmZvckVhY2goZm4gPT4gZm4oc3RhdGUpKTtcbiAgICB9KTtcbn07IiwiZXhwb3J0IGNvbnN0IFRSSUdHRVJfRVZFTlRTID0gd2luZG93LlBvaW50ZXJFdmVudCA/IFsncG9pbnRlcnVwJywgJ2tleWRvd24nXSA6IFsnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cgPyAndG91Y2hzdGFydCcgOiAnY2xpY2snLCAna2V5ZG93bicgXTtcblxuZXhwb3J0IGNvbnN0IFRSSUdHRVJfS0VZQ09ERVMgPSBbMTMsIDMyXTtcblxuZXhwb3J0IGNvbnN0IENMQVNTTkFNRSA9IHtcbiAgICBCQU5ORVI6ICdjb29raWUtYmFubmVyJyxcbiAgICBGSUVMRDogJ2Nvb2tpZS1iYW5uZXJfX2ZpZWxkJyxcbiAgICBCVE46ICdjb29raWUtYmFubmVyX19idG4nXG59O1xuXG5leHBvcnQgY29uc3QgREFUQV9BVFRSSUJVVEUgPSB7XG4gICAgVFlQRTogJ2RhdGEtY29uc2VudC10eXBlJyxcbiAgICBJRDogJ2RhdGEtY29uc2VudC1pZCdcbn07IiwiaW1wb3J0IHsgd3JpdGVDb29raWUgfSBmcm9tICcuL3V0aWxzJzsgXG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0bmFtZTogJ0Nvb2tpZVByZWZlcmVuY2VzJyxcblx0cGF0aDogJy8nLFxuXHRkb21haW46ICcnLFxuXHRzZWN1cmU6ICcnLFxuXHRleHBpcnk6IDM2NSxcblx0dHlwZXM6IHtcblx0XHQnbmVjZXNzYXJ5Jzoge1xuXHRcdFx0Y2hlY2tlZDogdHJ1ZSxcblx0XHRcdGRpc2FibGVkOiB0cnVlLFxuXHRcdFx0Zm5zOiBbXVxuXHRcdH0sXG5cdFx0J3ByZWZlcmVuY2UnOiB7XG5cdFx0XHRjaGVja2VkOiB0cnVlLFxuXHRcdFx0Zm5zOiBbXG5cdFx0XHRcdG1vZGVsID0+IHsgZG9jdW1lbnQuY29va2llID0gd3JpdGVDb29raWUobW9kZWwpOyB9XG5cdFx0XHRdXG5cdFx0fVxuXHR9LFxuXHRjbGFzc05hbWVzOiB7XG5cdFx0YmFubmVyOiAnY29va2llLWJhbm5lcicsXG5cdFx0YnRuOiAnY29va2llLWJhbm5lcl9fYnRuJyxcblx0XHRmaWVsZDogJ2Nvb2tpZS1iYW5uZXJfX2ZpZWxkJyxcblx0XHR1cGRhdGVCdG5Db250YWluZXI6ICdjb29raWUtYmFubmVyX191cGRhdGUnLFxuXHRcdHVwZGF0ZUJ0bjogJ2Nvb2tpZS1iYW5uZXJfX3VwZGF0ZS1idG4nXG5cdH0sXG5cdHVwZGF0ZUJ0blRlbXBsYXRlKG1vZGVsKXtcblx0XHRyZXR1cm4gYDxidXR0b24gY2xhc3M9XCIke21vZGVsLmNsYXNzTmFtZXMudXBkYXRlQnRufVwiPlVwZGF0ZSBjb29raWUgcHJlZmVyZW5jZXM8L2J1dHRvbj5gXG5cdH0sXG5cdGJhbm5lclRlbXBsYXRlKG1vZGVsKXtcblx0XHRyZXR1cm4gYDxzZWN0aW9uIHJvbGU9XCJkaWFsb2dcIiBhcmlhLWxpdmU9XCJwb2xpdGVcIiBhcmlhLWxhYmVsPVwiQ29va2llIGNvbnNlbnRcIiBhcmlhLWRlc2NyaWJlZGJ5PVwiY29va2llLWJhbm5lcl9fZGVzY1wiIGNsYXNzPVwiJHttb2RlbC5jbGFzc05hbWVzLmJhbm5lcn1cIj5cblx0XHRcdDwhLS1nb29nbGVvZmY6IGFsbC0tPlxuXHRcdFx0PGRpdiBjbGFzcz1cInNtYWxsLTEyXCIgaWQ9XCJjb29raWUtYmFubmVyX19kZXNjXCI+XG5cdFx0XHRcdDxoMSBjbGFzcz1cImNvb2tpZS1iYW5uZXJfX2hlYWRpbmdcIj5UaGlzIHdlYnNpdGUgdXNlcyBjb29raWVzLjwvaDE+XG5cdFx0XHRcdDxwIGNsYXNzPVwiY29va2llLWJhbm5lcl9fdGV4dCBnYW1tYVwiPldlIHVzZSBjb29raWVzIHRvIGFuYWx5c2Ugb3VyIHRyYWZmaWMgYW5kIHRvIHByb3ZpZGUgc29jaWFsIG1lZGlhIGZlYXR1cmVzLiBZb3UgY2FuIGNob29zZSB3aGljaCBjYXRlZ29yaWVzXG5cdFx0XHRcdG9mIGNvb2tpZXMgeW91IGNvbnNlbnQgdG8sIG9yIGFjY2VwdCBvdXIgcmVjb21tZW5kZWQgc2V0dGluZ3MuXG5cdFx0XHRcdDxhIGNsYXNzPVwiY29va2llLWJhbm5lcl9fbGlua1wiIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXIgbm9mb2xsb3dcIiBocmVmPVwiL2Nvb2tpZXMvXCI+RmluZCBvdXQgbW9yZTwvYT4gYWJvdXQgdGhlIGNvb2tpZXMgd2UgdXNlIGJlZm9yZSB5b3UgY29uc2VudC48L3A+XG5cdFx0XHRcdDx1bCBjbGFzcz1cImNvb2tpZS1iYW5uZXJfX2xpc3QgbGlzdGVyIHB1c2gtLWJvdHRvbSBsYXJnZS0xMFwiPlxuXHRcdFx0XHRcdCR7T2JqZWN0LmtleXMobW9kZWwudHlwZXMpLm1hcCh0eXBlID0+IGA8bGkgY2xhc3M9XCJjb29raWUtYmFubmVyX19saXN0LWl0ZW1cIj5cblx0XHRcdFx0XHRcdDxpbnB1dCBpZD1cImNvb2tpZS1iYW5uZXJfXyR7dHlwZS5zcGxpdCgnICcpWzBdLnJlcGxhY2UoJyAnLCAnLScpfVwiIGNsYXNzPVwiJHttb2RlbC5jbGFzc05hbWVzLmZpZWxkfVwiIHZhbHVlPVwiJHt0eXBlfVwiIHR5cGU9XCJjaGVja2JveFwiJHttb2RlbC50eXBlc1t0eXBlXS5jaGVja2VkID8gYCBjaGVja2VkYCA6ICcnfSR7bW9kZWwudHlwZXNbdHlwZV0uZGlzYWJsZWQgPyBgIGRpc2FibGVkYCA6ICcnfT4gXG5cdFx0XHRcdFx0XHQ8bGFiZWwgY2xhc3M9XCJjb29raWUtYmFubmVyX19sYWJlbCBnYW1tYVwiIGZvcj1cImNvb2tpZS1iYW5uZXJfXyR7dHlwZS5zcGxpdCgnICcpWzBdLnJlcGxhY2UoJyAnLCAnLScpfVwiPiR7dHlwZS5zdWJzdHIoMCwgMSkudG9VcHBlckNhc2UoKX0ke3R5cGUuc3Vic3RyKDEpfSBjb29raWVzPC9sYWJlbD5cblx0XHRcdFx0XHQ8L2xpPmApLmpvaW4oJycpfVxuXHRcdFx0XHQ8L3VsPlxuXHRcdFx0PC9kaXY+XG5cdFx0XHQ8YnV0dG9uIGNsYXNzPVwiJHttb2RlbC5jbGFzc05hbWVzLmJ0bn1cIj5Db250aW51ZTwvYnV0dG9uPlxuXHRcdFx0PCEtLWdvb2dsZW9uOiBhbGwtLT5cblx0XHQ8L3NlY3Rpb24+YDtcblx0fSxcblx0Y29uc2VudDoge31cbn07IiwiaW1wb3J0IHsgY29va2llc0VuYWJsZWQsIHJlYWRDb29raWUgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IGluaXRCYW5uZXIsIGluaXRVcGRhdGVCdG4gfSBmcm9tICcuL3VpJztcbmltcG9ydCB7IGFwcGx5IH0gZnJvbSAnLi9jb25zZW50JztcbmltcG9ydCBDcmVhdGVTdG9yZSBmcm9tICcuL3N0b3JlJztcbmltcG9ydCB7IGluaXRpYWxTdGF0ZSB9IGZyb20gJy4vcmVkdWNlcnMnO1xuXG5leHBvcnQgZGVmYXVsdCBzZXR0aW5ncyA9PiB7XG4gICAgaWYoIWNvb2tpZXNFbmFibGVkKCkpIHJldHVybjtcblxuICAgIGNvbnN0IFN0b3JlID0gQ3JlYXRlU3RvcmUoKTtcbiAgICBjb25zdCBjb29raWVzID0gcmVhZENvb2tpZShzZXR0aW5ncyk7XG4gICAgU3RvcmUudXBkYXRlKGluaXRpYWxTdGF0ZSwgeyBzZXR0aW5ncywgY29uc2VudDogY29va2llcyA/IEpTT04ucGFyc2UoY29va2llcy52YWx1ZSkgOiB7fSB9LCAhY29va2llcyA/IFtpbml0QmFubmVyKFN0b3JlKV0gOiBbIGFwcGx5LCBpbml0VXBkYXRlQnRuKFN0b3JlKV0pO1xufTsiLCJleHBvcnQgY29uc3QgaW5pdGlhbFN0YXRlID0gKHN0YXRlLCBkYXRhKSA9PiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgZGF0YSk7XG5leHBvcnQgY29uc3Qgc2V0Q29uc2VudCA9IChzdGF0ZSwgZGF0YSkgPT4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIGRhdGEpO1xuZXhwb3J0IGNvbnN0IHVwZGF0ZUNvbnNlbnQgPSAoc3RhdGUsIGRhdGEpID0+IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBkYXRhKTsiLCJleHBvcnQgZGVmYXVsdCAoKSA9PiAoe1xuICAgIHN0YXRlOiB7fSxcbiAgICB1cGRhdGUocmVkdWNlciwgbmV4dFN0YXRlLCBlZmZlY3RzID0gW10peyBcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHJlZHVjZXIodGhpcy5zdGF0ZSwgbmV4dFN0YXRlKTtcbiAgICAgICAgaWYoZWZmZWN0cy5sZW5ndGggPiAwKSBlZmZlY3RzLmZvckVhY2goZWZmZWN0ID0+IHsgZWZmZWN0KHRoaXMuc3RhdGUpIH0pO1xuICAgIH0sXG4gICAgZ2V0U3RhdGUoKSB7IHJldHVybiB0aGlzLnN0YXRlIH1cbn0pOyIsImltcG9ydCB7IGNvbXBvc2VVcGRhdGVVSU1vZGVsLCBzaG91bGRFeGVjdXRlIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyBUUklHR0VSX0VWRU5UUyB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7IGFwcGx5IH0gZnJvbSAnLi9jb25zZW50JztcbmltcG9ydCB7IHNldENvbnNlbnQsIHVwZGF0ZUNvbnNlbnQgfSBmcm9tICcuL3JlZHVjZXJzJztcblxuZXhwb3J0IGNvbnN0IGluaXRCYW5uZXIgPSBTdG9yZSA9PiBzdGF0ZSA9PiB7XG4gICAgZG9jdW1lbnQuYm9keS5maXJzdEVsZW1lbnRDaGlsZC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWJlZ2luJywgc3RhdGUuc2V0dGluZ3MuYmFubmVyVGVtcGxhdGUoY29tcG9zZVVwZGF0ZVVJTW9kZWwoc3RhdGUpKSk7XG4gICAgY29uc3QgZmllbGRzID0gW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuJHtzdGF0ZS5zZXR0aW5ncy5jbGFzc05hbWVzLmZpZWxkfWApKTtcbiAgICBjb25zdCBiYW5uZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtzdGF0ZS5zZXR0aW5ncy5jbGFzc05hbWVzLmJhbm5lcn1gKTtcbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtzdGF0ZS5zZXR0aW5ncy5jbGFzc05hbWVzLmJ0bn1gKTtcblxuICAgIFRSSUdHRVJfRVZFTlRTLmZvckVhY2goZXYgPT4ge1xuICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihldiwgZSA9PiB7XG4gICAgICAgICAgICBpZighc2hvdWxkRXhlY3V0ZShlKSkgcmV0dXJuO1xuICAgICAgICAgICAgU3RvcmUudXBkYXRlKHNldENvbnNlbnQsIHsgY29uc2VudDogZmllbGRzLnJlZHVjZSgoYWNjLCBmaWVsZCkgPT4geyByZXR1cm4gYWNjW2ZpZWxkLnZhbHVlXSA9IGZpZWxkLmNoZWNrZWQsIGFjYyB9LCB7fSkgfSwgW2FwcGx5LCBpbml0VXBkYXRlQnRuKFN0b3JlKSwgKCkgPT4geyBiYW5uZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChiYW5uZXIpOyB9XSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGluaXRVcGRhdGVCdG4gPSBTdG9yZSA9PiBzdGF0ZSA9PiB7XG4gICAgY29uc3QgdXBkYXRlQnRuQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7c3RhdGUuc2V0dGluZ3MuY2xhc3NOYW1lcy51cGRhdGVCdG5Db250YWluZXJ9YCk7XG4gICAgaWYoIXVwZGF0ZUJ0bkNvbnRhaW5lcikgcmV0dXJuO1xuICAgIGNvbnN0IHVwZGF0ZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3N0YXRlLnNldHRpbmdzLmNsYXNzTmFtZXMudXBkYXRlQnRufWApO1xuICAgIGlmKHVwZGF0ZUJ0bikgcmV0dXJuIHVwZGF0ZUJ0bi5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gICAgdXBkYXRlQnRuQ29udGFpbmVyLmlubmVySFRNTCA9IHN0YXRlLnNldHRpbmdzLnVwZGF0ZUJ0blRlbXBsYXRlKHN0YXRlLnNldHRpbmdzKTtcblxuICAgIFRSSUdHRVJfRVZFTlRTLmZvckVhY2goZXYgPT4ge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtzdGF0ZS5zZXR0aW5ncy5jbGFzc05hbWVzLnVwZGF0ZUJ0bn1gKS5hZGRFdmVudExpc3RlbmVyKGV2LCBlID0+IHtcbiAgICAgICAgICAgIGlmKCFzaG91bGRFeGVjdXRlKGUpKSByZXR1cm47XG4gICAgICAgICAgICBTdG9yZS51cGRhdGUodXBkYXRlQ29uc2VudCwge30sIFsgaW5pdEJhbm5lcihTdG9yZSksICgpID0+IHsgZS50YXJnZXQuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpOyB9XSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufTsiLCJpbXBvcnQgeyBUUklHR0VSX0tFWUNPREVTIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG4vL01vZGVybml6ciBjb29raWUgdGVzdFxuZXhwb3J0IGNvbnN0IGNvb2tpZXNFbmFibGVkID0gKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9ICdjb29raWV0ZXN0PTEnO1xuICAgICAgICBjb25zdCByZXQgPSBkb2N1bWVudC5jb29raWUuaW5kZXhPZignY29va2lldGVzdD0nKSAhPT0gLTE7XG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9ICdjb29raWV0ZXN0PTE7IGV4cGlyZXM9VGh1LCAwMS1KYW4tMTk3MCAwMDowMDowMSBHTVQnO1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgfVxuICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHdyaXRlQ29va2llID0gc3RhdGUgPT4gW1xuICAgIGAke3N0YXRlLnNldHRpbmdzLm5hbWV9PSR7SlNPTi5zdHJpbmdpZnkoc3RhdGUuY29uc2VudCl9O2AsXG4gICAgYGV4cGlyZXM9JHsobmV3IERhdGUobmV3IERhdGUoKS5nZXRUaW1lKCkgKyAoc3RhdGUuc2V0dGluZ3MuZXhwaXJ5KjI0KjYwKjYwKjEwMDApKSkudG9HTVRTdHJpbmcoKX07YCxcbiAgICBgcGF0aD0ke3N0YXRlLnNldHRpbmdzLnBhdGh9O2AsXG4gICAgc3RhdGUuc2V0dGluZ3MuZG9tYWluID8gYGRvbWFpbj0ke3N0YXRlLnNldHRpbmdzLmRvbWFpbn1gIDogJycsXG4gICAgc3RhdGUuc2V0dGluZ3Muc2VjdXJlID8gYHNlY3VyZT0ke3N0YXRlLnNldHRpbmdzLnNlY3VyZX1gIDogJydcbl0uam9pbignJyk7XG5cbmV4cG9ydCBjb25zdCByZWFkQ29va2llID0gc2V0dGluZ3MgPT4ge1xuICAgIGNvbnN0IGNvb2tpZSA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOyAnKS5tYXAocGFydCA9PiAoeyBuYW1lOiBwYXJ0LnNwbGl0KCc9JylbMF0sIHZhbHVlOiBwYXJ0LnNwbGl0KCc9JylbMV0gfSkpLmZpbHRlcihwYXJ0ID0+IHBhcnQubmFtZSA9PT0gc2V0dGluZ3MubmFtZSlbMF07XG4gICAgcmV0dXJuIGNvb2tpZSAhPT0gdW5kZWZpbmVkID8gY29va2llIDogZmFsc2U7XG59O1xuXG5leHBvcnQgY29uc3QgR1RNTG9hZCA9IGNvZGUgPT4ge1xuICAgIChmdW5jdGlvbih3LGQscyxsLGkpe3dbbF09d1tsXXx8W107d1tsXS5wdXNoKHsnZ3RtLnN0YXJ0JzpcbiAgICBuZXcgRGF0ZSgpLmdldFRpbWUoKSxldmVudDonZ3RtLmpzJ30pO3ZhciBmPWQuZ2V0RWxlbWVudHNCeVRhZ05hbWUocylbMF0sXG4gICAgaj1kLmNyZWF0ZUVsZW1lbnQocyksZGw9bCE9J2RhdGFMYXllcic/JyZsPScrbDonJztqLmFzeW5jPXRydWU7ai5zcmM9XG4gICAgJ2h0dHBzOi8vd3d3Lmdvb2dsZXRhZ21hbmFnZXIuY29tL2d0bS5qcz9pZD0nK2krZGw7Zi5wYXJlbnROb2RlLmluc2VydEJlZm9yZShqLGYpO1xuICAgIH0pKHdpbmRvdyxkb2N1bWVudCwnc2NyaXB0JywnZGF0YUxheWVyJywgY29kZSk7XG59XG5cbmV4cG9ydCBjb25zdCBjb21wb3NlVXBkYXRlVUlNb2RlbCA9IHN0YXRlID0+IHtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuc2V0dGluZ3MsIHtcbiAgICAgICAgdHlwZXM6IE9iamVjdC5rZXlzKHN0YXRlLnNldHRpbmdzLnR5cGVzKS5yZWR1Y2UoKGFjYywgdHlwZSkgPT4ge1xuICAgICAgICAgICAgaWYoc3RhdGUuY29uc2VudFt0eXBlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgYWNjW3R5cGVdID0gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuc2V0dGluZ3MudHlwZXNbdHlwZV0sIHtcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogc3RhdGUuY29uc2VudFt0eXBlXSAhPT0gdW5kZWZpbmVkID8gc3RhdGUuY29uc2VudFt0eXBlXSA6IHN0YXRlLnNldHRpbmdzLnR5cGVzW3R5cGVdLmNoZWNrZWRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBhY2NbdHlwZV0gPSBzdGF0ZS5zZXR0aW5ncy50eXBlc1t0eXBlXTtcbiAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH0sIHt9KVxuICAgIH0pXG59O1xuXG5leHBvcnQgY29uc3Qgc2hvdWxkRXhlY3V0ZSA9IGUgPT4gKCEhZS5rZXlDb2RlICYmICFUUklHR0VSX0tFWUNPREVTLmluY2x1ZGVzKGUua2V5Q29kZSkpIHx8ICEoZS53aGljaCA9PT0gMyB8fCBlLmJ1dHRvbiA9PT0gMik7Il19
