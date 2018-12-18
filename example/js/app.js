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
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var apply = exports.apply = function apply() {
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

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var TRIGGER_EVENTS = exports.TRIGGER_EVENTS = window.PointerEvent ? ['pointerup', 'keydown'] : ['ontouchstart' in window ? 'touchstart' : 'click', 'keydown'];

var TRIGGER_KEYCODES = exports.TRIGGER_KEYCODES = [13, 32];

var CLASSNAME = exports.CLASSNAME = {
    BANNER: 'preferences-banner',
    FIELD: 'preferences-banner__field',
    BTN: 'preferences-banner__btn'
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
		updateBtn: 'preferences-banner__update-btn'
	},
	updateBtnTemplate: function updateBtnTemplate(model) {
		return '<button class="' + model.classNames.updateBtn + '">Update cookie preferences</button>';
	},
	bannerTemplate: function bannerTemplate(model) {
		return '<section role="dialog" aria-live="polite" aria-label="Cookie consent" aria-describedby="preferences-banner__desc" class="' + model.classNames.banner + '">\n\t\t\t<div class="preferences-content">\n\t\t\t\t<div class="wrap">\n\t\t\t\t\t<div class="row">\n\t\t\t\t\t\t<!--googleoff: all-->\n\t\t\t\t\t\t<div id="preferences-banner__desc">\n\t\t\t\t\t\t\t<div class="preferences-banner__heading">This website uses cookies.</div>\n\t\t\t\t\t\t\t<p class="preferences-banner__text">We use cookies to analyse our traffic and to provide social media features. You can choose which categories of cookies you consent to, or accept our recommended settings.\n\t\t\t\t\t\t\t<a class="preferences-banner__link" rel="noopener noreferrer nofollow" href="' + model.policyURL + '"> Find out more about the cookies we use.</a></p>\n\t\t\t\t\t\t\t<ul class="preferences-banner__list">\n\t\t\t\t\t\t\t\t' + Object.keys(model.types).map(function (type) {
			return '<li class="preferences-banner__list-item">\n\t\t\t\t\t\t\t\t\t<input id="preferences-banner__' + type.split(' ')[0].replace(' ', '-') + '" class="' + model.classNames.field + '" value="' + type + '" type="checkbox"' + (model.types[type].checked ? ' checked' : '') + (model.types[type].disabled ? ' disabled' : '') + '>\n\t\t\t\t\t\t\t\t\t<label class="preferences-banner__label" for="preferences-banner__' + type.split(' ')[0].replace(' ', '-') + '">\n\t\t\t\t\t\t\t\t\t\t' + type.substr(0, 1).toUpperCase() + type.substr(1) + ' cookies\n\t\t\t\t\t\t\t\t\t</label>  \n\t\t\t\t\t\t\t\t</li>';
		}).join('') + '\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<button class="' + model.classNames.btn + '">OK</button>\n\t\t\t\t\t\t<!--googleon: all-->\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</section>';
	}
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
    Store.update(_reducers.initialState, {
        settings: settings,
        consent: cookies ? JSON.parse(cookies.value) : {}
    }, [(0, _consent.apply)(!cookies ? 'add' : 'remain'), cookies ? (0, _ui.initUpdateBtn)(Store) : (0, _ui.initBanner)(Store)]);
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
                if ((0, _utils.shouldReturn)(e)) return;

                var consent = fields.reduce(function (acc, field) {
                    return acc[field.value] = field.checked, acc;
                }, {});
                Store.update(_reducers.setConsent, { consent: consent }, !consent.performance ? [_utils.deleteCookies, _utils.writeCookie, function () {
                    window.setTimeout(function () {
                        return location.reload();
                    }, 60);
                }] : [_utils.writeCookie, (0, _consent.apply)(state.consent.performance ? 'remain' : 'remove'), function () {
                    banner.parentNode.removeChild(banner);
                    initUpdateBtn(Store)(state);
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
        if (updateBtn) updateBtn.removeAttribute('disabled');else updateBtnContainer.innerHTML = state.settings.updateBtnTemplate(state.settings);
        var handler = function handler(e) {
            if ((0, _utils.shouldReturn)(e)) return;
            Store.update(_reducers.updateConsent, {}, [initBanner(Store), function () {
                e.target.setAttribute('disabled', 'disabled');
                _constants.TRIGGER_EVENTS.forEach(function (ev) {
                    e.target.removeEventListener(ev, handler);
                });
            }]);
        };

        _constants.TRIGGER_EVENTS.forEach(function (ev) {
            document.querySelector('.' + state.settings.classNames.updateBtn).addEventListener(ev, handler);
        });
    };
};

},{"./consent":3,"./constants":4,"./reducers":7,"./utils":10}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.shouldReturn = exports.composeUpdateUIModel = exports.deleteCookies = exports.readCookie = exports.writeCookie = exports.cookiesEnabled = undefined;

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
    return document.cookie = [state.settings.name + '=' + JSON.stringify(Object.assign({}, state.consent, { intent: state.intent })) + ';', 'expires=' + new Date(new Date().getTime() + state.settings.expiry * 24 * 60 * 60 * 1000).toGMTString() + ';', 'path=' + state.settings.path + ';', state.settings.domain ? 'domain=' + state.settings.domain : '', state.settings.secure ? 'secure' : ''].join('');
};

var readCookie = exports.readCookie = function readCookie(settings) {
    var cookie = document.cookie.split('; ').map(function (part) {
        return { name: part.split('=')[0], value: part.split('=')[1] };
    }).filter(function (part) {
        return part.name === settings.name;
    })[0];
    return cookie !== undefined ? cookie : false;
};

var updateCookie = function updateCookie(state) {
    return function (model) {
        return document.cookie = [model.name + '=' + model.value + ';', 'expires=' + model.expiry + ';', 'path=' + state.settings.path + ';', state.settings.domain ? 'domain=' + state.settings.domain + ';' : '', state.settings.secure ? 'secure' : ''].join('');
    };
};

var deleteCookies = exports.deleteCookies = function deleteCookies(state) {
    document.cookie.split('; ').map(function (part) {
        return {
            name: part.split('=')[0],
            value: part.split('=')[1],
            expiry: 'Thu, 01 Jan 1970 00:00:01 GMT'
        };
    }).map(updateCookie(state));
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

var shouldReturn = exports.shouldReturn = function shouldReturn(e) {
    return !!e.keyCode && !~_constants.TRIGGER_KEYCODES.indexOf(e.keyCode) || e.which && e.which === 3;
};

},{"./constants":4}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlL3NyYy9hcHAuanMiLCJzcmMvaW5kZXguanMiLCJzcmMvbGliL2NvbnNlbnQuanMiLCJzcmMvbGliL2NvbnN0YW50cy5qcyIsInNyYy9saWIvZGVmYXVsdHMuanMiLCJzcmMvbGliL2luZGV4LmpzIiwic3JjL2xpYi9yZWR1Y2Vycy5qcyIsInNyYy9saWIvc3RvcmUuanMiLCJzcmMvbGliL3VpLmpzIiwic3JjL2xpYi91dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBQSxPQUFBLFFBQUEsV0FBQSxDQUFBOzs7Ozs7OztBQUVBLE9BQUEsZ0JBQUEsQ0FBQSxrQkFBQSxFQUE0QyxZQUFNO0FBQzlDLFVBQUEsT0FBQSxDQUFBLElBQUEsQ0FBa0I7QUFDZCxlQUFPO0FBQ0gseUJBQWE7QUFDVCxxQkFBSyxDQUNELFlBQU07QUFBRSw0QkFBQSxHQUFBLENBQUEsY0FBQTtBQURQLGlCQUFBO0FBREksYUFEVjtBQU1ILDJCQUFlO0FBQ1gseUJBRFcsSUFBQTtBQUVYLHFCQUFLLENBQ0QsWUFBTTtBQUFFLDRCQUFBLEdBQUEsQ0FBQSxnQkFBQTtBQURQLGlCQUFBO0FBRk0sYUFOWjtBQVlILHlDQUE2QjtBQUN6Qix5QkFEeUIsS0FBQTtBQUV6QixxQkFBSyxDQUNELFlBQU07QUFBRSw0QkFBQSxHQUFBLENBQUEsOEJBQUE7QUFEUCxpQkFBQTtBQUZvQjtBQVoxQjtBQURPLEtBQWxCO0FBREosQ0FBQTs7Ozs7Ozs7O0FDRkEsSUFBQSxZQUFBLFFBQUEsZ0JBQUEsQ0FBQTs7OztBQUNBLElBQUEsT0FBQSxRQUFBLE9BQUEsQ0FBQTs7Ozs7Ozs7a0JBRWU7QUFDWCxVQUFNLFNBQUEsSUFBQSxDQUFBLElBQUEsRUFBQTtBQUFBLGVBQVEsQ0FBQSxHQUFBLE1BQUEsT0FBQSxFQUFRLE9BQUEsTUFBQSxDQUFBLEVBQUEsRUFBa0IsV0FBbEIsT0FBQSxF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Q0FBQSxLQUFBLENBQUEsSUFBQSxFQUEyQjtBQUR4QyxpQkFBOUMsQ0FBWjtBQURKLGFBQUEsTUFJTyxJQUFBLElBQUEsSUFBWSxNQUFBLFFBQUEsQ0FBQSxLQUFBLENBQVosSUFBWSxDQUFaO0FBQ1AsbUJBQUEsR0FBQTtBQU5HLFNBQUEsRUFBQSxFQUFBO0FBRDhCLEtBQWxDLENBQVA7QUFERyxDQUFBOztBQWFBLElBQU0sZUFBQSxRQUFBLFlBQUEsR0FBZSxTQUFmLFlBQWUsQ0FBQSxDQUFBLEVBQUE7QUFBQSxXQUFNLENBQUMsQ0FBQyxFQUFGLE9BQUEsSUFBZSxDQUFDLENBQUMsV0FBQSxnQkFBQSxDQUFBLE9BQUEsQ0FBeUIsRUFBMUMsT0FBaUIsQ0FBakIsSUFBeUQsRUFBQSxLQUFBLElBQVcsRUFBQSxLQUFBLEtBQTFFLENBQUE7QUFBckIsQ0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBDb29raWVCYW5uZXIgZnJvbSAnLi4vLi4vc3JjJztcbiAgICBcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAgIENvb2tpZUJhbm5lci5pbml0KHtcbiAgICAgICAgdHlwZXM6IHtcbiAgICAgICAgICAgICduZWNlc3NhcnknOiB7XG4gICAgICAgICAgICAgICAgZm5zOiBbXG4gICAgICAgICAgICAgICAgICAgICgpID0+IHsgY29uc29sZS5sb2coJ05lY2Vzc2FyeSBmbicpOyB9LFxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAncGVyZm9ybWFuY2UnOiB7XG4gICAgICAgICAgICAgICAgY2hlY2tlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBmbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4geyBjb25zb2xlLmxvZygnUGVyZm9ybWFuY2UgZm4nKTsgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnYWR2ZXJ0aXNpbmcgYW5kIG1hcmtldGluZyc6IHtcbiAgICAgICAgICAgICAgICBjaGVja2VkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBmbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4geyBjb25zb2xlLmxvZygnQWR2ZXJ0aXNpbmcgYW5kIG1hcmtldGluZyBmbicpOyB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59KTsiLCJpbXBvcnQgZGVmYXVsdHMgZnJvbSAnLi9saWIvZGVmYXVsdHMnO1xuaW1wb3J0IGZhY3RvcnkgZnJvbSAnLi9saWInO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgaW5pdDogb3B0cyA9PiBmYWN0b3J5KE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLCBvcHRzLCB7XG4gICAgICAgIHR5cGVzOiBPYmplY3Qua2V5cyhvcHRzLnR5cGVzKS5yZWR1Y2UoKGFjYywgY3VycikgPT4ge1xuICAgICAgICAgICAgaWYoYWNjW2N1cnJdKSB7XG4gICAgICAgICAgICAgICAgYWNjW2N1cnJdID0gT2JqZWN0LmFzc2lnbih7fSwgYWNjW2N1cnJdLCB7XG4gICAgICAgICAgICAgICAgICAgIGZuczogYWNjW2N1cnJdLmZucy5jb25jYXQob3B0cy50eXBlc1tjdXJyXS5mbnMpLFxuICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiBvcHRzLnR5cGVzW2N1cnJdLmNoZWNrZWQgIT09IHVuZGVmaW5lZCA/IG9wdHMudHlwZXNbY3Vycl0uY2hlY2tlZCA6IGRlZmF1bHRzLnR5cGVzW2N1cnJdLmNoZWNrZWQgIT09IHVuZGVmaW5lZCA/IGRlZmF1bHRzLnR5cGVzW2N1cnJdLmNoZWNrZWQgOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSAgZWxzZSBhY2NbY3Vycl0gPSBvcHRzLnR5cGVzW2N1cnJdO1xuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfSwgZGVmYXVsdHMudHlwZXMpXG4gICAgfSkpXG59OyIsImV4cG9ydCBjb25zdCBhcHBseSA9IChwZXJmID0gJ2FkZCcpID0+IHN0YXRlID0+IHtcbiAgICAvLztfOyBuZWVkcyBwcm9wZXIgZW51bVxuICAgIGNvbnN0IGFwcGxpZWRTdGF0ZSA9IHBlcmYgPT09ICdhZGQnIFxuICAgICAgICAgICAgICAgICAgICAgICAgPyBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBjb25zZW50OiAgT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuY29uc2VudCwgeyBwZXJmb3JtYW5jZTogdHJ1ZSB9KSB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBwZXJmID09PSAncmVtb3ZlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgPyAgT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgY29uc2VudDogIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmNvbnNlbnQsIHsgcGVyZm9ybWFuY2U6IGZhbHNlIH0pfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIDogc3RhdGU7XG5cbiAgICBPYmplY3Qua2V5cyhhcHBsaWVkU3RhdGUuY29uc2VudCkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAoYXBwbGllZFN0YXRlLmNvbnNlbnRba2V5XSAmJiBhcHBsaWVkU3RhdGUuc2V0dGluZ3MudHlwZXNba2V5XSkgJiYgYXBwbGllZFN0YXRlLnNldHRpbmdzLnR5cGVzW2tleV0uZm5zLmZvckVhY2goZm4gPT4gZm4oYXBwbGllZFN0YXRlKSk7XG4gICAgfSk7XG59OyIsImV4cG9ydCBjb25zdCBUUklHR0VSX0VWRU5UUyA9IHdpbmRvdy5Qb2ludGVyRXZlbnQgPyBbJ3BvaW50ZXJ1cCcsICdrZXlkb3duJ10gOiBbJ29udG91Y2hzdGFydCcgaW4gd2luZG93ID8gJ3RvdWNoc3RhcnQnIDogJ2NsaWNrJywgJ2tleWRvd24nIF07XG5cbmV4cG9ydCBjb25zdCBUUklHR0VSX0tFWUNPREVTID0gWzEzLCAzMl07XG5cbmV4cG9ydCBjb25zdCBDTEFTU05BTUUgPSB7XG4gICAgQkFOTkVSOiAncHJlZmVyZW5jZXMtYmFubmVyJyxcbiAgICBGSUVMRDogJ3ByZWZlcmVuY2VzLWJhbm5lcl9fZmllbGQnLFxuICAgIEJUTjogJ3ByZWZlcmVuY2VzLWJhbm5lcl9fYnRuJ1xufTtcblxuZXhwb3J0IGNvbnN0IERBVEFfQVRUUklCVVRFID0ge1xuICAgIFRZUEU6ICdkYXRhLWNvbnNlbnQtdHlwZScsXG4gICAgSUQ6ICdkYXRhLWNvbnNlbnQtaWQnXG59OyIsImltcG9ydCB7IHdyaXRlQ29va2llIH0gZnJvbSAnLi91dGlscyc7IFxuXG5leHBvcnQgZGVmYXVsdCB7XG5cdG5hbWU6ICdDb29raWVQcmVmZXJlbmNlcycsXG5cdHBhdGg6ICcvJyxcblx0ZG9tYWluOiAnJyxcblx0c2VjdXJlOiB0cnVlLFxuXHRleHBpcnk6IDM2NSxcblx0dHlwZXM6IHtcblx0XHQnbmVjZXNzYXJ5Jzoge1xuXHRcdFx0Y2hlY2tlZDogdHJ1ZSxcblx0XHRcdGRpc2FibGVkOiB0cnVlLFxuXHRcdFx0Zm5zOiBbXVxuXHRcdH1cblx0fSxcblx0cG9saWN5VVJMOiAnL2Nvb2tpZS1wb2xpY3knLFxuXHRjbGFzc05hbWVzOiB7XG5cdFx0YmFubmVyOiAncHJlZmVyZW5jZXMtYmFubmVyJyxcblx0XHRidG46ICdwcmVmZXJlbmNlcy1iYW5uZXJfX2J0bicsXG5cdFx0ZmllbGQ6ICdwcmVmZXJlbmNlcy1iYW5uZXJfX2ZpZWxkJyxcblx0XHR1cGRhdGVCdG5Db250YWluZXI6ICdwcmVmZXJlbmNlcy1iYW5uZXJfX3VwZGF0ZScsXG5cdFx0dXBkYXRlQnRuOiAncHJlZmVyZW5jZXMtYmFubmVyX191cGRhdGUtYnRuJ1xuXHR9LFxuXHR1cGRhdGVCdG5UZW1wbGF0ZShtb2RlbCl7XG5cdFx0cmV0dXJuIGA8YnV0dG9uIGNsYXNzPVwiJHttb2RlbC5jbGFzc05hbWVzLnVwZGF0ZUJ0bn1cIj5VcGRhdGUgY29va2llIHByZWZlcmVuY2VzPC9idXR0b24+YFxuXHR9LFxuXHRiYW5uZXJUZW1wbGF0ZShtb2RlbCl7XG5cdFx0cmV0dXJuIGA8c2VjdGlvbiByb2xlPVwiZGlhbG9nXCIgYXJpYS1saXZlPVwicG9saXRlXCIgYXJpYS1sYWJlbD1cIkNvb2tpZSBjb25zZW50XCIgYXJpYS1kZXNjcmliZWRieT1cInByZWZlcmVuY2VzLWJhbm5lcl9fZGVzY1wiIGNsYXNzPVwiJHttb2RlbC5jbGFzc05hbWVzLmJhbm5lcn1cIj5cblx0XHRcdDxkaXYgY2xhc3M9XCJwcmVmZXJlbmNlcy1jb250ZW50XCI+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJ3cmFwXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInJvd1wiPlxuXHRcdFx0XHRcdFx0PCEtLWdvb2dsZW9mZjogYWxsLS0+XG5cdFx0XHRcdFx0XHQ8ZGl2IGlkPVwicHJlZmVyZW5jZXMtYmFubmVyX19kZXNjXCI+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJwcmVmZXJlbmNlcy1iYW5uZXJfX2hlYWRpbmdcIj5UaGlzIHdlYnNpdGUgdXNlcyBjb29raWVzLjwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInByZWZlcmVuY2VzLWJhbm5lcl9fdGV4dFwiPldlIHVzZSBjb29raWVzIHRvIGFuYWx5c2Ugb3VyIHRyYWZmaWMgYW5kIHRvIHByb3ZpZGUgc29jaWFsIG1lZGlhIGZlYXR1cmVzLiBZb3UgY2FuIGNob29zZSB3aGljaCBjYXRlZ29yaWVzIG9mIGNvb2tpZXMgeW91IGNvbnNlbnQgdG8sIG9yIGFjY2VwdCBvdXIgcmVjb21tZW5kZWQgc2V0dGluZ3MuXG5cdFx0XHRcdFx0XHRcdDxhIGNsYXNzPVwicHJlZmVyZW5jZXMtYmFubmVyX19saW5rXCIgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlciBub2ZvbGxvd1wiIGhyZWY9XCIke21vZGVsLnBvbGljeVVSTH1cIj4gRmluZCBvdXQgbW9yZSBhYm91dCB0aGUgY29va2llcyB3ZSB1c2UuPC9hPjwvcD5cblx0XHRcdFx0XHRcdFx0PHVsIGNsYXNzPVwicHJlZmVyZW5jZXMtYmFubmVyX19saXN0XCI+XG5cdFx0XHRcdFx0XHRcdFx0JHtPYmplY3Qua2V5cyhtb2RlbC50eXBlcykubWFwKHR5cGUgPT4gYDxsaSBjbGFzcz1cInByZWZlcmVuY2VzLWJhbm5lcl9fbGlzdC1pdGVtXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8aW5wdXQgaWQ9XCJwcmVmZXJlbmNlcy1iYW5uZXJfXyR7dHlwZS5zcGxpdCgnICcpWzBdLnJlcGxhY2UoJyAnLCAnLScpfVwiIGNsYXNzPVwiJHttb2RlbC5jbGFzc05hbWVzLmZpZWxkfVwiIHZhbHVlPVwiJHt0eXBlfVwiIHR5cGU9XCJjaGVja2JveFwiJHttb2RlbC50eXBlc1t0eXBlXS5jaGVja2VkID8gYCBjaGVja2VkYCA6ICcnfSR7bW9kZWwudHlwZXNbdHlwZV0uZGlzYWJsZWQgPyBgIGRpc2FibGVkYCA6ICcnfT5cblx0XHRcdFx0XHRcdFx0XHRcdDxsYWJlbCBjbGFzcz1cInByZWZlcmVuY2VzLWJhbm5lcl9fbGFiZWxcIiBmb3I9XCJwcmVmZXJlbmNlcy1iYW5uZXJfXyR7dHlwZS5zcGxpdCgnICcpWzBdLnJlcGxhY2UoJyAnLCAnLScpfVwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQke3R5cGUuc3Vic3RyKDAsIDEpLnRvVXBwZXJDYXNlKCl9JHt0eXBlLnN1YnN0cigxKX0gY29va2llc1xuXHRcdFx0XHRcdFx0XHRcdFx0PC9sYWJlbD4gIFxuXHRcdFx0XHRcdFx0XHRcdDwvbGk+YCkuam9pbignJyl9XG5cdFx0XHRcdFx0XHRcdDwvdWw+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDxidXR0b24gY2xhc3M9XCIke21vZGVsLmNsYXNzTmFtZXMuYnRufVwiPk9LPC9idXR0b24+XG5cdFx0XHRcdFx0XHQ8IS0tZ29vZ2xlb246IGFsbC0tPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdDwvc2VjdGlvbj5gO1xuXHR9XG59OyIsImltcG9ydCB7IGNvb2tpZXNFbmFibGVkLCByZWFkQ29va2llIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyBpbml0QmFubmVyLCBpbml0VXBkYXRlQnRuIH0gZnJvbSAnLi91aSc7XG5pbXBvcnQgeyBhcHBseSB9IGZyb20gJy4vY29uc2VudCc7XG5pbXBvcnQgQ3JlYXRlU3RvcmUgZnJvbSAnLi9zdG9yZSc7XG5pbXBvcnQgeyBpbml0aWFsU3RhdGUgfSBmcm9tICcuL3JlZHVjZXJzJztcblxuZXhwb3J0IGRlZmF1bHQgc2V0dGluZ3MgPT4ge1xuICAgIGlmKCFjb29raWVzRW5hYmxlZCgpKSByZXR1cm47XG4gICAgXG4gICAgY29uc3QgU3RvcmUgPSBDcmVhdGVTdG9yZSgpO1xuICAgIGNvbnN0IGNvb2tpZXMgPSByZWFkQ29va2llKHNldHRpbmdzKTtcbiAgICBTdG9yZS51cGRhdGUoXG4gICAgICAgIGluaXRpYWxTdGF0ZSxcbiAgICAgICAgeyBcbiAgICAgICAgICAgIHNldHRpbmdzLFxuICAgICAgICAgICAgY29uc2VudDogY29va2llcyA/IEpTT04ucGFyc2UoY29va2llcy52YWx1ZSkgOiB7fSBcbiAgICAgICAgfSxcbiAgICAgICAgW2FwcGx5KCFjb29raWVzID8gJ2FkZCcgOiAncmVtYWluJyksIGNvb2tpZXMgPyBpbml0VXBkYXRlQnRuKFN0b3JlKSA6IGluaXRCYW5uZXIoU3RvcmUpXVxuICAgICk7XG59OyIsImV4cG9ydCBjb25zdCBpbml0aWFsU3RhdGUgPSAoc3RhdGUsIGRhdGEpID0+IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBkYXRhKTtcbmV4cG9ydCBjb25zdCBzZXRDb25zZW50ID0gKHN0YXRlLCBkYXRhKSA9PiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgZGF0YSk7XG5leHBvcnQgY29uc3QgdXBkYXRlQ29uc2VudCA9IChzdGF0ZSwgZGF0YSkgPT4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIGRhdGEpOyIsImV4cG9ydCBkZWZhdWx0ICgpID0+ICh7XG4gICAgc3RhdGU6IHt9LFxuICAgIHVwZGF0ZShyZWR1Y2VyLCBuZXh0U3RhdGUsIGVmZmVjdHMgPSBbXSl7IFxuICAgICAgICB0aGlzLnN0YXRlID0gcmVkdWNlcih0aGlzLnN0YXRlLCBuZXh0U3RhdGUpO1xuICAgICAgICBpZihlZmZlY3RzLmxlbmd0aCA+IDApIGVmZmVjdHMuZm9yRWFjaChlZmZlY3QgPT4geyBlZmZlY3QodGhpcy5zdGF0ZSkgfSk7XG4gICAgfSxcbiAgICBnZXRTdGF0ZSgpIHsgcmV0dXJuIHRoaXMuc3RhdGUgfVxufSk7IiwiaW1wb3J0IHsgY29tcG9zZVVwZGF0ZVVJTW9kZWwsIHNob3VsZFJldHVybiwgd3JpdGVDb29raWUsIGRlbGV0ZUNvb2tpZXMgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IFRSSUdHRVJfRVZFTlRTIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgYXBwbHkgfSBmcm9tICcuL2NvbnNlbnQnO1xuaW1wb3J0IHsgc2V0Q29uc2VudCwgdXBkYXRlQ29uc2VudCB9IGZyb20gJy4vcmVkdWNlcnMnO1xuXG5leHBvcnQgY29uc3QgaW5pdEJhbm5lciA9IFN0b3JlID0+IHN0YXRlID0+IHtcbiAgICBkb2N1bWVudC5ib2R5LmZpcnN0RWxlbWVudENoaWxkLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlYmVnaW4nLCBzdGF0ZS5zZXR0aW5ncy5iYW5uZXJUZW1wbGF0ZShjb21wb3NlVXBkYXRlVUlNb2RlbChzdGF0ZSkpKTtcbiAgICBjb25zdCBmaWVsZHMgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke3N0YXRlLnNldHRpbmdzLmNsYXNzTmFtZXMuZmllbGR9YCkpO1xuICAgIGNvbnN0IGJhbm5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3N0YXRlLnNldHRpbmdzLmNsYXNzTmFtZXMuYmFubmVyfWApO1xuICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3N0YXRlLnNldHRpbmdzLmNsYXNzTmFtZXMuYnRufWApO1xuXG4gICAgVFJJR0dFUl9FVkVOVFMuZm9yRWFjaChldiA9PiB7XG4gICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKGV2LCBlID0+IHtcbiAgICAgICAgICAgIGlmKHNob3VsZFJldHVybihlKSkgcmV0dXJuO1xuXG4gICAgICAgICAgICBjb25zdCBjb25zZW50ID0gZmllbGRzLnJlZHVjZSgoYWNjLCBmaWVsZCkgPT4geyByZXR1cm4gYWNjW2ZpZWxkLnZhbHVlXSA9IGZpZWxkLmNoZWNrZWQsIGFjYyB9LCB7fSk7XG4gICAgICAgICAgICBTdG9yZS51cGRhdGUoXG4gICAgICAgICAgICAgICAgc2V0Q29uc2VudCxcbiAgICAgICAgICAgICAgICB7IGNvbnNlbnQgfSxcbiAgICAgICAgICAgICAgICAhY29uc2VudC5wZXJmb3JtYW5jZSBcbiAgICAgICAgICAgICAgICA/IFtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlQ29va2llcyxcbiAgICAgICAgICAgICAgICAgICAgd3JpdGVDb29raWUsXG4gICAgICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IGxvY2F0aW9uLnJlbG9hZCgpLCA2MCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgOiBbXG4gICAgICAgICAgICAgICAgICAgIHdyaXRlQ29va2llLFxuICAgICAgICAgICAgICAgICAgICBhcHBseShzdGF0ZS5jb25zZW50LnBlcmZvcm1hbmNlID8gJ3JlbWFpbicgOiAncmVtb3ZlJyksXG4gICAgICAgICAgICAgICAgICAgICgpID0+IHsgXG4gICAgICAgICAgICAgICAgICAgICAgICBiYW5uZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChiYW5uZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdFVwZGF0ZUJ0bihTdG9yZSkoc3RhdGUpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBpbml0VXBkYXRlQnRuID0gU3RvcmUgPT4gc3RhdGUgPT4ge1xuICAgIGNvbnN0IHVwZGF0ZUJ0bkNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3N0YXRlLnNldHRpbmdzLmNsYXNzTmFtZXMudXBkYXRlQnRuQ29udGFpbmVyfWApO1xuICAgIGlmKCF1cGRhdGVCdG5Db250YWluZXIpIHJldHVybjtcbiAgICBjb25zdCB1cGRhdGVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtzdGF0ZS5zZXR0aW5ncy5jbGFzc05hbWVzLnVwZGF0ZUJ0bn1gKTtcbiAgICBpZih1cGRhdGVCdG4pIHVwZGF0ZUJ0bi5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gICAgZWxzZSB1cGRhdGVCdG5Db250YWluZXIuaW5uZXJIVE1MID0gc3RhdGUuc2V0dGluZ3MudXBkYXRlQnRuVGVtcGxhdGUoc3RhdGUuc2V0dGluZ3MpO1xuICAgIGNvbnN0IGhhbmRsZXIgPSBlID0+IHtcbiAgICAgICAgaWYoc2hvdWxkUmV0dXJuKGUpKSByZXR1cm47XG4gICAgICAgIFN0b3JlLnVwZGF0ZSh1cGRhdGVDb25zZW50LCB7fSwgWyBpbml0QmFubmVyKFN0b3JlKSwgKCkgPT4geyBcbiAgICAgICAgICAgIGUudGFyZ2V0LnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgIFRSSUdHRVJfRVZFTlRTLmZvckVhY2goZXYgPT4ge1xuICAgICAgICAgICAgICAgIGUudGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXYsIGhhbmRsZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1dKTtcbiAgICB9O1xuXG4gICAgVFJJR0dFUl9FVkVOVFMuZm9yRWFjaChldiA9PiB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3N0YXRlLnNldHRpbmdzLmNsYXNzTmFtZXMudXBkYXRlQnRufWApLmFkZEV2ZW50TGlzdGVuZXIoZXYsIGhhbmRsZXIpO1xuICAgIH0pO1xufTsiLCJpbXBvcnQgeyBUUklHR0VSX0tFWUNPREVTIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG4vL01vZGVybml6ciBjb29raWUgdGVzdFxuZXhwb3J0IGNvbnN0IGNvb2tpZXNFbmFibGVkID0gKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9ICdjb29raWV0ZXN0PTEnO1xuICAgICAgICBjb25zdCByZXQgPSBkb2N1bWVudC5jb29raWUuaW5kZXhPZignY29va2lldGVzdD0nKSAhPT0gLTE7XG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9ICdjb29raWV0ZXN0PTE7IGV4cGlyZXM9VGh1LCAwMS1KYW4tMTk3MCAwMDowMDowMSBHTVQnO1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgfVxuICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHdyaXRlQ29va2llID0gc3RhdGUgPT4gZG9jdW1lbnQuY29va2llID0gW1xuICAgIGAke3N0YXRlLnNldHRpbmdzLm5hbWV9PSR7SlNPTi5zdHJpbmdpZnkoT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuY29uc2VudCwgeyBpbnRlbnQ6IHN0YXRlLmludGVudCB9KSl9O2AsXG4gICAgYGV4cGlyZXM9JHsobmV3IERhdGUobmV3IERhdGUoKS5nZXRUaW1lKCkgKyAoc3RhdGUuc2V0dGluZ3MuZXhwaXJ5KjI0KjYwKjYwKjEwMDApKSkudG9HTVRTdHJpbmcoKX07YCxcbiAgICBgcGF0aD0ke3N0YXRlLnNldHRpbmdzLnBhdGh9O2AsXG4gICAgc3RhdGUuc2V0dGluZ3MuZG9tYWluID8gYGRvbWFpbj0ke3N0YXRlLnNldHRpbmdzLmRvbWFpbn1gIDogJycsXG4gICAgc3RhdGUuc2V0dGluZ3Muc2VjdXJlID8gYHNlY3VyZWAgOiAnJ1xuXS5qb2luKCcnKTtcblxuZXhwb3J0IGNvbnN0IHJlYWRDb29raWUgPSBzZXR0aW5ncyA9PiB7XG4gICAgY29uc3QgY29va2llID0gZG9jdW1lbnQuY29va2llLnNwbGl0KCc7ICcpLm1hcChwYXJ0ID0+ICh7IG5hbWU6IHBhcnQuc3BsaXQoJz0nKVswXSwgdmFsdWU6IHBhcnQuc3BsaXQoJz0nKVsxXSB9KSkuZmlsdGVyKHBhcnQgPT4gcGFydC5uYW1lID09PSBzZXR0aW5ncy5uYW1lKVswXTtcbiAgICByZXR1cm4gY29va2llICE9PSB1bmRlZmluZWQgPyBjb29raWUgOiBmYWxzZTtcbn07XG5cbmNvbnN0IHVwZGF0ZUNvb2tpZSA9IHN0YXRlID0+IG1vZGVsID0+IGRvY3VtZW50LmNvb2tpZSA9IFtcbiAgICBgJHttb2RlbC5uYW1lfT0ke21vZGVsLnZhbHVlfTtgLFxuICAgIGBleHBpcmVzPSR7bW9kZWwuZXhwaXJ5fTtgLFxuICAgIGBwYXRoPSR7c3RhdGUuc2V0dGluZ3MucGF0aH07YCxcbiAgICBzdGF0ZS5zZXR0aW5ncy5kb21haW4gPyBgZG9tYWluPSR7c3RhdGUuc2V0dGluZ3MuZG9tYWlufTtgIDogJycsXG4gICAgc3RhdGUuc2V0dGluZ3Muc2VjdXJlID8gYHNlY3VyZWAgOiAnJ1xuXS5qb2luKCcnKTtcblxuZXhwb3J0IGNvbnN0IGRlbGV0ZUNvb2tpZXMgPSBzdGF0ZSA9PiB7XG4gICAgZG9jdW1lbnQuY29va2llXG4gICAgICAgIC5zcGxpdCgnOyAnKVxuICAgICAgICAubWFwKHBhcnQgPT4gKHsgXG4gICAgICAgICAgICBuYW1lOiBwYXJ0LnNwbGl0KCc9JylbMF0sXG4gICAgICAgICAgICB2YWx1ZTogcGFydC5zcGxpdCgnPScpWzFdLFxuICAgICAgICAgICAgZXhwaXJ5OiAnVGh1LCAwMSBKYW4gMTk3MCAwMDowMDowMSBHTVQnXG4gICAgICAgIH0pKVxuICAgICAgICAubWFwKHVwZGF0ZUNvb2tpZShzdGF0ZSkpO1xufTtcblxuZXhwb3J0IGNvbnN0IGNvbXBvc2VVcGRhdGVVSU1vZGVsID0gc3RhdGUgPT4ge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5zZXR0aW5ncywge1xuICAgICAgICB0eXBlczogT2JqZWN0LmtleXMoc3RhdGUuc2V0dGluZ3MudHlwZXMpLnJlZHVjZSgoYWNjLCB0eXBlKSA9PiB7XG4gICAgICAgICAgICBpZihzdGF0ZS5jb25zZW50W3R5cGVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBhY2NbdHlwZV0gPSBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5zZXR0aW5ncy50eXBlc1t0eXBlXSwge1xuICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiBzdGF0ZS5jb25zZW50W3R5cGVdICE9PSB1bmRlZmluZWQgPyBzdGF0ZS5jb25zZW50W3R5cGVdIDogc3RhdGUuc2V0dGluZ3MudHlwZXNbdHlwZV0uY2hlY2tlZFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGFjY1t0eXBlXSA9IHN0YXRlLnNldHRpbmdzLnR5cGVzW3R5cGVdO1xuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfSwge30pXG4gICAgfSlcbn07XG5cbmV4cG9ydCBjb25zdCBzaG91bGRSZXR1cm4gPSBlID0+ICghIWUua2V5Q29kZSAmJiAhflRSSUdHRVJfS0VZQ09ERVMuaW5kZXhPZihlLmtleUNvZGUpIHx8IChlLndoaWNoICYmIGUud2hpY2ggPT09IDMpKTsiXX0=
