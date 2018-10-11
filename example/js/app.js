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
                if (!(0, _utils.shouldExecute)(e)) return;

                var consent = fields.reduce(function (acc, field) {
                    return acc[field.value] = field.checked, acc;
                }, {});
                Store.update(_reducers.setConsent, { consent: consent }, !consent.performance ? [_utils.writeCookie, function () {
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
        console.log('init btn');
        var updateBtnContainer = document.querySelector('.' + state.settings.classNames.updateBtnContainer);
        console.log('Attemping to render...');
        if (!updateBtnContainer) return;
        var updateBtn = document.querySelector('.' + state.settings.classNames.updateBtn);
        if (updateBtn) updateBtn.removeAttribute('disabled');else updateBtnContainer.innerHTML = state.settings.updateBtnTemplate(state.settings);
        var handler = function handler(e) {
            if (!(0, _utils.shouldExecute)(e)) return;
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
exports.shouldExecute = exports.composeUpdateUIModel = exports.readCookie = exports.writeCookie = exports.cookiesEnabled = undefined;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlL3NyYy9hcHAuanMiLCJzcmMvaW5kZXguanMiLCJzcmMvbGliL2NvbnNlbnQuanMiLCJzcmMvbGliL2NvbnN0YW50cy5qcyIsInNyYy9saWIvZGVmYXVsdHMuanMiLCJzcmMvbGliL2luZGV4LmpzIiwic3JjL2xpYi9yZWR1Y2Vycy5qcyIsInNyYy9saWIvc3RvcmUuanMiLCJzcmMvbGliL3VpLmpzIiwic3JjL2xpYi91dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBQSxPQUFBLFFBQUEsV0FBQSxDQUFBOzs7Ozs7OztBQUVBLE9BQUEsZ0JBQUEsQ0FBQSxrQkFBQSxFQUE0QyxZQUFNO0FBQzlDLFVBQUEsT0FBQSxDQUFBLElBQUEsQ0FBa0I7QUFDZCxlQUFPO0FBQ0gseUJBQWE7QUFDVCxxQkFBSyxDQUNELFlBQU07QUFBRSw0QkFBQSxHQUFBLENBQUEsY0FBQTtBQURQLGlCQUFBO0FBREksYUFEVjtBQU1ILDJCQUFlO0FBQ1gseUJBRFcsSUFBQTtBQUVYLHFCQUFLLENBQ0QsWUFBTTtBQUFFLDRCQUFBLEdBQUEsQ0FBQSxnQkFBQTtBQURQLGlCQUFBO0FBRk0sYUFOWjtBQVlILHlDQUE2QjtBQUN6Qix5QkFEeUIsS0FBQTtBQUV6QixxQkFBSyxDQUNELFlBQU07QUFBRSw0QkFBQSxHQUFBLENBQUEsOEJBQUE7QUFEUCxpQkFBQTtBQUZvQjtBQVoxQjtBQURPLEtBQWxCO0FBREosQ0FBQTs7Ozs7Ozs7O0FDRkEsSUFBQSxZQUFBLFFBQUEsZ0JBQUEsQ0FBQTs7OztBQUNBLElBQUEsT0FBQSxRQUFBLE9BQUEsQ0FBQTs7Ozs7Ozs7a0JBRWU7QUFDWCxVQUFNLFNBQUEsSUFBQSxDQUFBLElBQUEsRUFBQTtBQUFBLGVBQVEsQ0FBQSxHQUFBLE1BQUEsT0FBQSxFQUFRLE9BQUEsTUFBQSxDQUFBLEVBQUEsRUFBa0IsV0FBbEIsT0FBQSxF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QSxFQUFBLElBQUEsRUFBZTtBQUMzRCxnQkFBRyxNQUFBLE9BQUEsQ0FBQSxJQUFBLE1BQUgsU0FBQSxFQUFzQztBQUNsQyxvQkFBQSxJQUFBLElBQVksT0FBQSxNQUFBLENBQUEsRUFBQSxFQUFrQixNQUFBLFFBQUEsQ0FBQSxLQUFBLENBQWxCLElBQWtCLENBQWxCLEVBQThDO0FBQ3RELDZCQUFTLE1BQUEsT0FBQSxDQUFBLElBQUEsTUFBQSxTQUFBLEdBQW9DLE1BQUEsT0FBQSxDQUFwQyxJQUFvQyxDQUFwQyxHQUEwRCxNQUFBLFFBQUEsQ0FBQSxLQUFBLENBQUEsSUFBQSxFQUEyQjtBQUR4QyxpQkFBOUMsQ0FBWjtBQURKLGFBQUEsTUFJTyxJQUFBLElBQUEsSUFBWSxNQUFBLFFBQUEsQ0FBQSxLQUFBLENBQVosSUFBWSxDQUFaO0FBQ1AsbUJBQUEsR0FBQTtBQU5HLFNBQUEsRUFBQSxFQUFBO0FBRDhCLEtBQWxDLENBQVA7QUFERyxDQUFBOztBQWFBLElBQU0sZ0JBQUEsUUFBQSxhQUFBLEdBQWdCLFNBQWhCLGFBQWdCLENBQUEsQ0FBQSxFQUFBO0FBQUEsV0FBTSxDQUFDLENBQUMsRUFBRixPQUFBLElBQWUsQ0FBQyxXQUFBLGdCQUFBLENBQUEsUUFBQSxDQUEwQixFQUEzQyxPQUFpQixDQUFoQixJQUF5RCxFQUFFLEVBQUEsS0FBQSxLQUFBLENBQUEsSUFBaUIsRUFBQSxNQUFBLEtBQWxGLENBQStELENBQS9EO0FBQXRCLENBQUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgQ29va2llQmFubmVyIGZyb20gJy4uLy4uL3NyYyc7XG4gICAgXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgICBDb29raWVCYW5uZXIuaW5pdCh7XG4gICAgICAgIHR5cGVzOiB7XG4gICAgICAgICAgICAnbmVjZXNzYXJ5Jzoge1xuICAgICAgICAgICAgICAgIGZuczogW1xuICAgICAgICAgICAgICAgICAgICAoKSA9PiB7IGNvbnNvbGUubG9nKCdOZWNlc3NhcnkgZm4nKTsgfSxcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ3BlcmZvcm1hbmNlJzoge1xuICAgICAgICAgICAgICAgIGNoZWNrZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgZm5zOiBbXG4gICAgICAgICAgICAgICAgICAgICgpID0+IHsgY29uc29sZS5sb2coJ1BlcmZvcm1hbmNlIGZuJyk7IH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ2FkdmVydGlzaW5nIGFuZCBtYXJrZXRpbmcnOiB7XG4gICAgICAgICAgICAgICAgY2hlY2tlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgZm5zOiBbXG4gICAgICAgICAgICAgICAgICAgICgpID0+IHsgY29uc29sZS5sb2coJ0FkdmVydGlzaW5nIGFuZCBtYXJrZXRpbmcgZm4nKTsgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufSk7IiwiaW1wb3J0IGRlZmF1bHRzIGZyb20gJy4vbGliL2RlZmF1bHRzJztcbmltcG9ydCBmYWN0b3J5IGZyb20gJy4vbGliJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGluaXQ6IG9wdHMgPT4gZmFjdG9yeShPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgb3B0cywge1xuICAgICAgICB0eXBlczogT2JqZWN0LmtleXMob3B0cy50eXBlcykucmVkdWNlKChhY2MsIGN1cnIpID0+IHtcbiAgICAgICAgICAgIGlmKGFjY1tjdXJyXSkge1xuICAgICAgICAgICAgICAgIGFjY1tjdXJyXSA9IE9iamVjdC5hc3NpZ24oe30sIGFjY1tjdXJyXSwge1xuICAgICAgICAgICAgICAgICAgICBmbnM6IGFjY1tjdXJyXS5mbnMuY29uY2F0KG9wdHMudHlwZXNbY3Vycl0uZm5zKSxcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogb3B0cy50eXBlc1tjdXJyXS5jaGVja2VkICE9PSB1bmRlZmluZWQgPyBvcHRzLnR5cGVzW2N1cnJdLmNoZWNrZWQgOiBkZWZhdWx0cy50eXBlc1tjdXJyXS5jaGVja2VkICE9PSB1bmRlZmluZWQgPyBkZWZhdWx0cy50eXBlc1tjdXJyXS5jaGVja2VkIDogZmFsc2VcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gIGVsc2UgYWNjW2N1cnJdID0gb3B0cy50eXBlc1tjdXJyXTtcbiAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH0sIGRlZmF1bHRzLnR5cGVzKVxuICAgIH0pKVxufTsiLCJleHBvcnQgY29uc3QgYXBwbHkgPSAocGVyZiA9ICdhZGQnKSA9PiBzdGF0ZSA9PiB7XG4gICAgLy87XzsgbmVlZHMgcHJvcGVyIGVudW1cbiAgICBjb25zdCBhcHBsaWVkU3RhdGUgPSBwZXJmID09PSAnYWRkJyBcbiAgICAgICAgICAgICAgICAgICAgICAgID8gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgY29uc2VudDogIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmNvbnNlbnQsIHsgcGVyZm9ybWFuY2U6IHRydWUgfSkgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIDogcGVyZiA9PT0gJ3JlbW92ZSdcbiAgICAgICAgICAgICAgICAgICAgICAgID8gIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IGNvbnNlbnQ6ICBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5jb25zZW50LCB7IHBlcmZvcm1hbmNlOiBmYWxzZSB9KX0pXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHN0YXRlO1xuXG4gICAgT2JqZWN0LmtleXMoYXBwbGllZFN0YXRlLmNvbnNlbnQpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgKGFwcGxpZWRTdGF0ZS5jb25zZW50W2tleV0gJiYgYXBwbGllZFN0YXRlLnNldHRpbmdzLnR5cGVzW2tleV0pICYmIGFwcGxpZWRTdGF0ZS5zZXR0aW5ncy50eXBlc1trZXldLmZucy5mb3JFYWNoKGZuID0+IGZuKGFwcGxpZWRTdGF0ZSkpO1xuICAgIH0pO1xufTsiLCJleHBvcnQgY29uc3QgVFJJR0dFUl9FVkVOVFMgPSB3aW5kb3cuUG9pbnRlckV2ZW50ID8gWydwb2ludGVydXAnLCAna2V5ZG93biddIDogWydvbnRvdWNoc3RhcnQnIGluIHdpbmRvdyA/ICd0b3VjaHN0YXJ0JyA6ICdjbGljaycsICdrZXlkb3duJyBdO1xuXG5leHBvcnQgY29uc3QgVFJJR0dFUl9LRVlDT0RFUyA9IFsxMywgMzJdO1xuXG5leHBvcnQgY29uc3QgQ0xBU1NOQU1FID0ge1xuICAgIEJBTk5FUjogJ3ByZWZlcmVuY2VzLWJhbm5lcicsXG4gICAgRklFTEQ6ICdwcmVmZXJlbmNlcy1iYW5uZXJfX2ZpZWxkJyxcbiAgICBCVE46ICdwcmVmZXJlbmNlcy1iYW5uZXJfX2J0bidcbn07XG5cbmV4cG9ydCBjb25zdCBEQVRBX0FUVFJJQlVURSA9IHtcbiAgICBUWVBFOiAnZGF0YS1jb25zZW50LXR5cGUnLFxuICAgIElEOiAnZGF0YS1jb25zZW50LWlkJ1xufTsiLCJpbXBvcnQgeyB3cml0ZUNvb2tpZSB9IGZyb20gJy4vdXRpbHMnOyBcblxuZXhwb3J0IGRlZmF1bHQge1xuXHRuYW1lOiAnQ29va2llUHJlZmVyZW5jZXMnLFxuXHRwYXRoOiAnLycsXG5cdGRvbWFpbjogJycsXG5cdHNlY3VyZTogdHJ1ZSxcblx0ZXhwaXJ5OiAzNjUsXG5cdHR5cGVzOiB7XG5cdFx0J25lY2Vzc2FyeSc6IHtcblx0XHRcdGNoZWNrZWQ6IHRydWUsXG5cdFx0XHRkaXNhYmxlZDogdHJ1ZSxcblx0XHRcdGZuczogW11cblx0XHR9XG5cdH0sXG5cdHBvbGljeVVSTDogJy9jb29raWUtcG9saWN5Jyxcblx0Y2xhc3NOYW1lczoge1xuXHRcdGJhbm5lcjogJ3ByZWZlcmVuY2VzLWJhbm5lcicsXG5cdFx0YnRuOiAncHJlZmVyZW5jZXMtYmFubmVyX19idG4nLFxuXHRcdGZpZWxkOiAncHJlZmVyZW5jZXMtYmFubmVyX19maWVsZCcsXG5cdFx0dXBkYXRlQnRuQ29udGFpbmVyOiAncHJlZmVyZW5jZXMtYmFubmVyX191cGRhdGUnLFxuXHRcdHVwZGF0ZUJ0bjogJ3ByZWZlcmVuY2VzLWJhbm5lcl9fdXBkYXRlLWJ0bidcblx0fSxcblx0dXBkYXRlQnRuVGVtcGxhdGUobW9kZWwpe1xuXHRcdHJldHVybiBgPGJ1dHRvbiBjbGFzcz1cIiR7bW9kZWwuY2xhc3NOYW1lcy51cGRhdGVCdG59XCI+VXBkYXRlIGNvb2tpZSBwcmVmZXJlbmNlczwvYnV0dG9uPmBcblx0fSxcblx0YmFubmVyVGVtcGxhdGUobW9kZWwpe1xuXHRcdHJldHVybiBgPHNlY3Rpb24gcm9sZT1cImRpYWxvZ1wiIGFyaWEtbGl2ZT1cInBvbGl0ZVwiIGFyaWEtbGFiZWw9XCJDb29raWUgY29uc2VudFwiIGFyaWEtZGVzY3JpYmVkYnk9XCJwcmVmZXJlbmNlcy1iYW5uZXJfX2Rlc2NcIiBjbGFzcz1cIiR7bW9kZWwuY2xhc3NOYW1lcy5iYW5uZXJ9XCI+XG5cdFx0XHQ8ZGl2IGNsYXNzPVwicHJlZmVyZW5jZXMtY29udGVudFwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwid3JhcFwiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJyb3dcIj5cblx0XHRcdFx0XHRcdDwhLS1nb29nbGVvZmY6IGFsbC0tPlxuXHRcdFx0XHRcdFx0PGRpdiBpZD1cInByZWZlcmVuY2VzLWJhbm5lcl9fZGVzY1wiPlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwicHJlZmVyZW5jZXMtYmFubmVyX19oZWFkaW5nXCI+VGhpcyB3ZWJzaXRlIHVzZXMgY29va2llcy48L2Rpdj5cblx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJwcmVmZXJlbmNlcy1iYW5uZXJfX3RleHRcIj5XZSB1c2UgY29va2llcyB0byBhbmFseXNlIG91ciB0cmFmZmljIGFuZCB0byBwcm92aWRlIHNvY2lhbCBtZWRpYSBmZWF0dXJlcy4gWW91IGNhbiBjaG9vc2Ugd2hpY2ggY2F0ZWdvcmllcyBvZiBjb29raWVzIHlvdSBjb25zZW50IHRvLCBvciBhY2NlcHQgb3VyIHJlY29tbWVuZGVkIHNldHRpbmdzLlxuXHRcdFx0XHRcdFx0XHQ8YSBjbGFzcz1cInByZWZlcmVuY2VzLWJhbm5lcl9fbGlua1wiIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXIgbm9mb2xsb3dcIiBocmVmPVwiJHttb2RlbC5wb2xpY3lVUkx9XCI+IEZpbmQgb3V0IG1vcmUgYWJvdXQgdGhlIGNvb2tpZXMgd2UgdXNlLjwvYT48L3A+XG5cdFx0XHRcdFx0XHRcdDx1bCBjbGFzcz1cInByZWZlcmVuY2VzLWJhbm5lcl9fbGlzdFwiPlxuXHRcdFx0XHRcdFx0XHRcdCR7T2JqZWN0LmtleXMobW9kZWwudHlwZXMpLm1hcCh0eXBlID0+IGA8bGkgY2xhc3M9XCJwcmVmZXJlbmNlcy1iYW5uZXJfX2xpc3QtaXRlbVwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0PGlucHV0IGlkPVwicHJlZmVyZW5jZXMtYmFubmVyX18ke3R5cGUuc3BsaXQoJyAnKVswXS5yZXBsYWNlKCcgJywgJy0nKX1cIiBjbGFzcz1cIiR7bW9kZWwuY2xhc3NOYW1lcy5maWVsZH1cIiB2YWx1ZT1cIiR7dHlwZX1cIiB0eXBlPVwiY2hlY2tib3hcIiR7bW9kZWwudHlwZXNbdHlwZV0uY2hlY2tlZCA/IGAgY2hlY2tlZGAgOiAnJ30ke21vZGVsLnR5cGVzW3R5cGVdLmRpc2FibGVkID8gYCBkaXNhYmxlZGAgOiAnJ30+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8bGFiZWwgY2xhc3M9XCJwcmVmZXJlbmNlcy1iYW5uZXJfX2xhYmVsXCIgZm9yPVwicHJlZmVyZW5jZXMtYmFubmVyX18ke3R5cGUuc3BsaXQoJyAnKVswXS5yZXBsYWNlKCcgJywgJy0nKX1cIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0JHt0eXBlLnN1YnN0cigwLCAxKS50b1VwcGVyQ2FzZSgpfSR7dHlwZS5zdWJzdHIoMSl9IGNvb2tpZXNcblx0XHRcdFx0XHRcdFx0XHRcdDwvbGFiZWw+ICBcblx0XHRcdFx0XHRcdFx0XHQ8L2xpPmApLmpvaW4oJycpfVxuXHRcdFx0XHRcdFx0XHQ8L3VsPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8YnV0dG9uIGNsYXNzPVwiJHttb2RlbC5jbGFzc05hbWVzLmJ0bn1cIj5PSzwvYnV0dG9uPlxuXHRcdFx0XHRcdFx0PCEtLWdvb2dsZW9uOiBhbGwtLT5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQ8L3NlY3Rpb24+YDtcblx0fVxufTsiLCJpbXBvcnQgeyBjb29raWVzRW5hYmxlZCwgcmVhZENvb2tpZSB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgaW5pdEJhbm5lciwgaW5pdFVwZGF0ZUJ0biB9IGZyb20gJy4vdWknO1xuaW1wb3J0IHsgYXBwbHkgfSBmcm9tICcuL2NvbnNlbnQnO1xuaW1wb3J0IENyZWF0ZVN0b3JlIGZyb20gJy4vc3RvcmUnO1xuaW1wb3J0IHsgaW5pdGlhbFN0YXRlIH0gZnJvbSAnLi9yZWR1Y2Vycyc7XG5cbmV4cG9ydCBkZWZhdWx0IHNldHRpbmdzID0+IHtcbiAgICBpZighY29va2llc0VuYWJsZWQoKSkgcmV0dXJuO1xuICAgIFxuICAgIGNvbnN0IFN0b3JlID0gQ3JlYXRlU3RvcmUoKTtcbiAgICBjb25zdCBjb29raWVzID0gcmVhZENvb2tpZShzZXR0aW5ncyk7XG4gICAgU3RvcmUudXBkYXRlKFxuICAgICAgICBpbml0aWFsU3RhdGUsXG4gICAgICAgIHsgXG4gICAgICAgICAgICBzZXR0aW5ncyxcbiAgICAgICAgICAgIGNvbnNlbnQ6IGNvb2tpZXMgPyBKU09OLnBhcnNlKGNvb2tpZXMudmFsdWUpIDoge30gXG4gICAgICAgIH0sXG4gICAgICAgIFthcHBseSghY29va2llcyA/ICdhZGQnIDogJ3JlbWFpbicpLCBjb29raWVzID8gaW5pdFVwZGF0ZUJ0bihTdG9yZSkgOiBpbml0QmFubmVyKFN0b3JlKV1cbiAgICApO1xufTsiLCJleHBvcnQgY29uc3QgaW5pdGlhbFN0YXRlID0gKHN0YXRlLCBkYXRhKSA9PiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgZGF0YSk7XG5leHBvcnQgY29uc3Qgc2V0Q29uc2VudCA9IChzdGF0ZSwgZGF0YSkgPT4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIGRhdGEpO1xuZXhwb3J0IGNvbnN0IHVwZGF0ZUNvbnNlbnQgPSAoc3RhdGUsIGRhdGEpID0+IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBkYXRhKTsiLCJleHBvcnQgZGVmYXVsdCAoKSA9PiAoe1xuICAgIHN0YXRlOiB7fSxcbiAgICB1cGRhdGUocmVkdWNlciwgbmV4dFN0YXRlLCBlZmZlY3RzID0gW10peyBcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHJlZHVjZXIodGhpcy5zdGF0ZSwgbmV4dFN0YXRlKTtcbiAgICAgICAgaWYoZWZmZWN0cy5sZW5ndGggPiAwKSBlZmZlY3RzLmZvckVhY2goZWZmZWN0ID0+IHsgZWZmZWN0KHRoaXMuc3RhdGUpIH0pO1xuICAgIH0sXG4gICAgZ2V0U3RhdGUoKSB7IHJldHVybiB0aGlzLnN0YXRlIH1cbn0pOyIsImltcG9ydCB7IGNvbXBvc2VVcGRhdGVVSU1vZGVsLCBzaG91bGRFeGVjdXRlLCB3cml0ZUNvb2tpZSB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgVFJJR0dFUl9FVkVOVFMgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBhcHBseSB9IGZyb20gJy4vY29uc2VudCc7XG5pbXBvcnQgeyBzZXRDb25zZW50LCB1cGRhdGVDb25zZW50IH0gZnJvbSAnLi9yZWR1Y2Vycyc7XG5cbmV4cG9ydCBjb25zdCBpbml0QmFubmVyID0gU3RvcmUgPT4gc3RhdGUgPT4ge1xuICAgIGRvY3VtZW50LmJvZHkuZmlyc3RFbGVtZW50Q2hpbGQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmViZWdpbicsIHN0YXRlLnNldHRpbmdzLmJhbm5lclRlbXBsYXRlKGNvbXBvc2VVcGRhdGVVSU1vZGVsKHN0YXRlKSkpO1xuICAgIGNvbnN0IGZpZWxkcyA9IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLiR7c3RhdGUuc2V0dGluZ3MuY2xhc3NOYW1lcy5maWVsZH1gKSk7XG4gICAgY29uc3QgYmFubmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7c3RhdGUuc2V0dGluZ3MuY2xhc3NOYW1lcy5iYW5uZXJ9YCk7XG4gICAgY29uc3QgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7c3RhdGUuc2V0dGluZ3MuY2xhc3NOYW1lcy5idG59YCk7XG5cbiAgICBUUklHR0VSX0VWRU5UUy5mb3JFYWNoKGV2ID0+IHtcbiAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoZXYsIGUgPT4ge1xuICAgICAgICAgICAgaWYoIXNob3VsZEV4ZWN1dGUoZSkpIHJldHVybjtcblxuICAgICAgICAgICAgY29uc3QgY29uc2VudCA9IGZpZWxkcy5yZWR1Y2UoKGFjYywgZmllbGQpID0+IHsgcmV0dXJuIGFjY1tmaWVsZC52YWx1ZV0gPSBmaWVsZC5jaGVja2VkLCBhY2MgfSwge30pO1xuICAgICAgICAgICAgU3RvcmUudXBkYXRlKFxuICAgICAgICAgICAgICAgIHNldENvbnNlbnQsXG4gICAgICAgICAgICAgICAgeyBjb25zZW50IH0sXG4gICAgICAgICAgICAgICAgIWNvbnNlbnQucGVyZm9ybWFuY2UgXG4gICAgICAgICAgICAgICAgPyBbIFxuICAgICAgICAgICAgICAgICAgICB3cml0ZUNvb2tpZSxcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4gbG9jYXRpb24ucmVsb2FkKCksIDYwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICA6IFtcbiAgICAgICAgICAgICAgICAgICAgd3JpdGVDb29raWUsXG4gICAgICAgICAgICAgICAgICAgIGFwcGx5KHN0YXRlLmNvbnNlbnQucGVyZm9ybWFuY2UgPyAncmVtYWluJyA6ICdyZW1vdmUnKSxcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4geyBcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhbm5lci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGJhbm5lcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0VXBkYXRlQnRuKFN0b3JlKShzdGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGluaXRVcGRhdGVCdG4gPSBTdG9yZSA9PiBzdGF0ZSA9PiB7XG4gICAgY29uc29sZS5sb2coJ2luaXQgYnRuJyk7XG4gICAgY29uc3QgdXBkYXRlQnRuQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7c3RhdGUuc2V0dGluZ3MuY2xhc3NOYW1lcy51cGRhdGVCdG5Db250YWluZXJ9YCk7XG4gICAgY29uc29sZS5sb2coJ0F0dGVtcGluZyB0byByZW5kZXIuLi4nKTtcbiAgICBpZighdXBkYXRlQnRuQ29udGFpbmVyKSByZXR1cm47XG4gICAgY29uc3QgdXBkYXRlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7c3RhdGUuc2V0dGluZ3MuY2xhc3NOYW1lcy51cGRhdGVCdG59YCk7XG4gICAgaWYodXBkYXRlQnRuKSB1cGRhdGVCdG4ucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICAgIGVsc2UgdXBkYXRlQnRuQ29udGFpbmVyLmlubmVySFRNTCA9IHN0YXRlLnNldHRpbmdzLnVwZGF0ZUJ0blRlbXBsYXRlKHN0YXRlLnNldHRpbmdzKTtcbiAgICBjb25zdCBoYW5kbGVyID0gZSA9PiB7XG4gICAgICAgIGlmKCFzaG91bGRFeGVjdXRlKGUpKSByZXR1cm47XG4gICAgICAgIFN0b3JlLnVwZGF0ZSh1cGRhdGVDb25zZW50LCB7fSwgWyBpbml0QmFubmVyKFN0b3JlKSwgKCkgPT4geyBcbiAgICAgICAgICAgIGUudGFyZ2V0LnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgIFRSSUdHRVJfRVZFTlRTLmZvckVhY2goZXYgPT4ge1xuICAgICAgICAgICAgICAgIGUudGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXYsIGhhbmRsZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1dKTtcbiAgICB9O1xuXG4gICAgVFJJR0dFUl9FVkVOVFMuZm9yRWFjaChldiA9PiB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3N0YXRlLnNldHRpbmdzLmNsYXNzTmFtZXMudXBkYXRlQnRufWApLmFkZEV2ZW50TGlzdGVuZXIoZXYsIGhhbmRsZXIpO1xuICAgIH0pO1xufTsiLCJpbXBvcnQgeyBUUklHR0VSX0tFWUNPREVTIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG4vL01vZGVybml6ciBjb29raWUgdGVzdFxuZXhwb3J0IGNvbnN0IGNvb2tpZXNFbmFibGVkID0gKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9ICdjb29raWV0ZXN0PTEnO1xuICAgICAgICBjb25zdCByZXQgPSBkb2N1bWVudC5jb29raWUuaW5kZXhPZignY29va2lldGVzdD0nKSAhPT0gLTE7XG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9ICdjb29raWV0ZXN0PTE7IGV4cGlyZXM9VGh1LCAwMS1KYW4tMTk3MCAwMDowMDowMSBHTVQnO1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgfVxuICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHdyaXRlQ29va2llID0gc3RhdGUgPT4gZG9jdW1lbnQuY29va2llID0gW1xuICAgIGAke3N0YXRlLnNldHRpbmdzLm5hbWV9PSR7SlNPTi5zdHJpbmdpZnkoT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuY29uc2VudCwgeyBpbnRlbnQ6IHN0YXRlLmludGVudCB9KSl9O2AsXG4gICAgYGV4cGlyZXM9JHsobmV3IERhdGUobmV3IERhdGUoKS5nZXRUaW1lKCkgKyAoc3RhdGUuc2V0dGluZ3MuZXhwaXJ5KjI0KjYwKjYwKjEwMDApKSkudG9HTVRTdHJpbmcoKX07YCxcbiAgICBgcGF0aD0ke3N0YXRlLnNldHRpbmdzLnBhdGh9O2AsXG4gICAgc3RhdGUuc2V0dGluZ3MuZG9tYWluID8gYGRvbWFpbj0ke3N0YXRlLnNldHRpbmdzLmRvbWFpbn1gIDogJycsXG4gICAgc3RhdGUuc2V0dGluZ3Muc2VjdXJlID8gYHNlY3VyZWAgOiAnJ1xuXS5qb2luKCcnKTtcblxuZXhwb3J0IGNvbnN0IHJlYWRDb29raWUgPSBzZXR0aW5ncyA9PiB7XG4gICAgY29uc3QgY29va2llID0gZG9jdW1lbnQuY29va2llLnNwbGl0KCc7ICcpLm1hcChwYXJ0ID0+ICh7IG5hbWU6IHBhcnQuc3BsaXQoJz0nKVswXSwgdmFsdWU6IHBhcnQuc3BsaXQoJz0nKVsxXSB9KSkuZmlsdGVyKHBhcnQgPT4gcGFydC5uYW1lID09PSBzZXR0aW5ncy5uYW1lKVswXTtcbiAgICByZXR1cm4gY29va2llICE9PSB1bmRlZmluZWQgPyBjb29raWUgOiBmYWxzZTtcbn07XG5cbmV4cG9ydCBjb25zdCBjb21wb3NlVXBkYXRlVUlNb2RlbCA9IHN0YXRlID0+IHtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuc2V0dGluZ3MsIHtcbiAgICAgICAgdHlwZXM6IE9iamVjdC5rZXlzKHN0YXRlLnNldHRpbmdzLnR5cGVzKS5yZWR1Y2UoKGFjYywgdHlwZSkgPT4ge1xuICAgICAgICAgICAgaWYoc3RhdGUuY29uc2VudFt0eXBlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgYWNjW3R5cGVdID0gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuc2V0dGluZ3MudHlwZXNbdHlwZV0sIHtcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogc3RhdGUuY29uc2VudFt0eXBlXSAhPT0gdW5kZWZpbmVkID8gc3RhdGUuY29uc2VudFt0eXBlXSA6IHN0YXRlLnNldHRpbmdzLnR5cGVzW3R5cGVdLmNoZWNrZWRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBhY2NbdHlwZV0gPSBzdGF0ZS5zZXR0aW5ncy50eXBlc1t0eXBlXTtcbiAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH0sIHt9KVxuICAgIH0pXG59O1xuXG5leHBvcnQgY29uc3Qgc2hvdWxkRXhlY3V0ZSA9IGUgPT4gKCEhZS5rZXlDb2RlICYmICFUUklHR0VSX0tFWUNPREVTLmluY2x1ZGVzKGUua2V5Q29kZSkpIHx8ICEoZS53aGljaCA9PT0gMyB8fCBlLmJ1dHRvbiA9PT0gMik7Il19
