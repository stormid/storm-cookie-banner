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

// export const GTMLoad = code => () => {
//     (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
//     new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
//     j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
//     'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
//     })(window,document,'script','dataLayer', code);
// }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlL3NyYy9hcHAuanMiLCJzcmMvaW5kZXguanMiLCJzcmMvbGliL2NvbnNlbnQuanMiLCJzcmMvbGliL2NvbnN0YW50cy5qcyIsInNyYy9saWIvZGVmYXVsdHMuanMiLCJzcmMvbGliL2luZGV4LmpzIiwic3JjL2xpYi9yZWR1Y2Vycy5qcyIsInNyYy9saWIvc3RvcmUuanMiLCJzcmMvbGliL3VpLmpzIiwic3JjL2xpYi91dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBQSxPQUFBLFFBQUEsV0FBQSxDQUFBOzs7Ozs7OztBQUVBLE9BQUEsZ0JBQUEsQ0FBQSxrQkFBQSxFQUE0QyxZQUFNO0FBQzlDLFVBQUEsT0FBQSxDQUFBLElBQUEsQ0FBa0I7QUFDZCxlQUFPO0FBQ0gseUJBQWE7QUFDVCxxQkFBSyxDQUNELFlBQU07QUFBRSw0QkFBQSxHQUFBLENBQUEsY0FBQTtBQURQLGlCQUFBO0FBREksYUFEVjtBQU1ILDBCQUFjO0FBQ1YseUJBRFUsSUFBQTtBQUVWLHFCQUFLLENBQ0QsWUFBTTtBQUFFLDRCQUFBLEdBQUEsQ0FBQSxlQUFBO0FBRFAsaUJBQUE7QUFGSyxhQU5YO0FBWUgsMkJBQWU7QUFDWCx5QkFEVyxJQUFBO0FBRVgscUJBQUssQ0FDRCxZQUFNO0FBQUUsNEJBQUEsR0FBQSxDQUFBLGdCQUFBO0FBRFAsaUJBQUE7QUFGTSxhQVpaO0FBa0JILHlDQUE2QjtBQUN6Qix5QkFEeUIsS0FBQTtBQUV6QixxQkFBSyxDQUNELFlBQU07QUFBRSw0QkFBQSxHQUFBLENBQUEsOEJBQUE7QUFEUCxpQkFBQTtBQUZvQjtBQWxCMUI7QUFETyxLQUFsQjtBQURKLENBQUE7Ozs7Ozs7OztBQ0ZBLElBQUEsWUFBQSxRQUFBLGdCQUFBLENBQUE7Ozs7QUFDQSxJQUFBLE9BQUEsUUFBQSxPQUFBLENBQUE7Ozs7Ozs7O2tCQUVlO0FBQ1gsVUFBTSxTQUFBLElBQUEsQ0FBQSxJQUFBLEVBQUE7QUFBQSxlQUFRLENBQUEsR0FBQSxNQUFBLE9BQUEsRUFBUSxPQUFBLE1BQUEsQ0FBQSxFQUFBLEVBQWtCLFdBQWxCLE9BQUEsRUFBQSxJQUFBLEVBQWtDO0FBQ3BELG1CQUFPLE9BQUEsSUFBQSxDQUFZLEtBQVosS0FBQSxFQUFBLE1BQUEsQ0FBK0IsVUFBQSxHQUFBLEVBQUEsSUFBQSxFQUFlO0FBQ2pELG9CQUFHLElBQUgsSUFBRyxDQUFILEVBQWM7QUFDVix3QkFBQSxJQUFBLElBQVksT0FBQSxNQUFBLENBQUEsRUFBQSxFQUFrQixJQUFsQixJQUFrQixDQUFsQixFQUE2QjtBQUNyQyw2QkFBSyxJQUFBLElBQUEsRUFBQSxHQUFBLENBQUEsTUFBQSxDQUFxQixLQUFBLEtBQUEsQ0FBQSxJQUFBLEVBRFcsR0FDaEMsQ0FEZ0M7QUFFckMsaUNBQVMsS0FBQSxLQUFBLENBQUEsSUFBQSxFQUFBLE9BQUEsS0FBQSxTQUFBLEdBQXlDLEtBQUEsS0FBQSxDQUFBLElBQUEsRUFBekMsT0FBQSxHQUFvRSxXQUFBLE9BQUEsQ0FBQSxLQUFBLENBQUEsSUFBQSxFQUFBLE9BQUEsS0FBQSxTQUFBLEdBQTZDLFdBQUEsT0FBQSxDQUFBLEtBQUEsQ0FBQSxJQUFBLEVBQTdDLE9BQUEsR0FBNEU7QUFGcEgscUJBQTdCLENBQVo7QUFESixpQkFBQSxNQUtRLElBQUEsSUFBQSxJQUFZLEtBQUEsS0FBQSxDQUFaLElBQVksQ0FBWjtBQUNSLHVCQUFBLEdBQUE7QUFQRyxhQUFBLEVBUUosV0FBQSxPQUFBLENBUkksS0FBQTtBQUQ2QyxTQUFsQyxDQUFSLENBQVI7QUFBQTtBQURLLEM7Ozs7Ozs7O0FDSFIsSUFBTSxRQUFBLFFBQUEsS0FBQSxHQUFRLFNBQVIsS0FBUSxDQUFBLEtBQUEsRUFBUztBQUMxQixXQUFBLElBQUEsQ0FBWSxNQUFaLE9BQUEsRUFBQSxPQUFBLENBQW1DLFVBQUEsR0FBQSxFQUFPO0FBQ3RDLGNBQUEsT0FBQSxDQUFBLEdBQUEsS0FBc0IsTUFBQSxRQUFBLENBQUEsS0FBQSxDQUFBLEdBQUEsRUFBQSxHQUFBLENBQUEsT0FBQSxDQUFzQyxVQUFBLEVBQUEsRUFBQTtBQUFBLG1CQUFNLEdBQU4sS0FBTSxDQUFOO0FBQTVELFNBQXNCLENBQXRCO0FBREosS0FBQTtBQURHLENBQUE7Ozs7Ozs7O0FDQUEsSUFBTSxpQkFBQSxRQUFBLGNBQUEsR0FBaUIsT0FBQSxZQUFBLEdBQXNCLENBQUEsV0FBQSxFQUF0QixTQUFzQixDQUF0QixHQUFpRCxDQUFDLGtCQUFBLE1BQUEsR0FBQSxZQUFBLEdBQUQsT0FBQSxFQUF4RSxTQUF3RSxDQUF4RTs7QUFFQSxJQUFNLG1CQUFBLFFBQUEsZ0JBQUEsR0FBbUIsQ0FBQSxFQUFBLEVBQXpCLEVBQXlCLENBQXpCOztBQUVBLElBQU0sWUFBQSxRQUFBLFNBQUEsR0FBWTtBQUNyQixZQURxQixlQUFBO0FBRXJCLFdBRnFCLHNCQUFBO0FBR3JCLFNBQUs7QUFIZ0IsQ0FBbEI7O0FBTUEsSUFBTSxpQkFBQSxRQUFBLGNBQUEsR0FBaUI7QUFDMUIsVUFEMEIsbUJBQUE7QUFFMUIsUUFBSTtBQUZzQixDQUF2Qjs7Ozs7Ozs7O0FDVlAsSUFBQSxTQUFBLFFBQUEsU0FBQSxDQUFBOztrQkFFZTtBQUNkLE9BRGMsbUJBQUE7QUFFZCxPQUZjLEdBQUE7QUFHZCxTQUhjLEVBQUE7QUFJZCxTQUpjLEVBQUE7QUFLZCxTQUxjLEdBQUE7QUFNZCxRQUFPO0FBQ04sZUFBYTtBQUNaLFlBRFksSUFBQTtBQUVaLGFBRlksSUFBQTtBQUdaLFFBQUs7QUFITyxHQURQO0FBTU4sZ0JBQWM7QUFDYixZQURhLElBQUE7QUFFYixRQUFLLENBQ0osVUFBQSxLQUFBLEVBQVM7QUFBRSxhQUFBLE1BQUEsR0FBa0IsQ0FBQSxHQUFBLE9BQUEsV0FBQSxFQUFsQixLQUFrQixDQUFsQjtBQURQLElBQUE7QUFGUTtBQU5SLEVBTk87QUFtQmQsYUFBWTtBQUNYLFVBRFcsZUFBQTtBQUVYLE9BRlcsb0JBQUE7QUFHWCxTQUhXLHNCQUFBO0FBSVgsc0JBSlcsdUJBQUE7QUFLWCxhQUFXO0FBTEEsRUFuQkU7QUFBQSxvQkFBQSxTQUFBLGlCQUFBLENBQUEsS0FBQSxFQTBCVTtBQUN2QixTQUFBLG9CQUF5QixNQUFBLFVBQUEsQ0FBekIsU0FBQSxHQUFBLHNDQUFBO0FBM0JhLEVBQUE7QUFBQSxpQkFBQSxTQUFBLGNBQUEsQ0FBQSxLQUFBLEVBNkJPO0FBQ3BCLFNBQUEseUhBQThILE1BQUEsVUFBQSxDQUE5SCxNQUFBLEdBQUEsd25CQUFBLEdBUUssT0FBQSxJQUFBLENBQVksTUFBWixLQUFBLEVBQUEsR0FBQSxDQUE2QixVQUFBLElBQUEsRUFBQTtBQUFBLFVBQUEsa0ZBQ0YsS0FBQSxLQUFBLENBQUEsR0FBQSxFQUFBLENBQUEsRUFBQSxPQUFBLENBQUEsR0FBQSxFQURFLEdBQ0YsQ0FERSxHQUFBLFdBQUEsR0FDOEMsTUFBQSxVQUFBLENBRDlDLEtBQUEsR0FBQSxXQUFBLEdBQUEsSUFBQSxHQUFBLG1CQUFBLElBQ3dHLE1BQUEsS0FBQSxDQUFBLElBQUEsRUFBQSxPQUFBLEdBQUEsVUFBQSxHQUR4RyxFQUFBLEtBQ3NKLE1BQUEsS0FBQSxDQUFBLElBQUEsRUFBQSxRQUFBLEdBQUEsV0FBQSxHQUR0SixFQUFBLElBQUEsZ0ZBQUEsR0FFa0MsS0FBQSxLQUFBLENBQUEsR0FBQSxFQUFBLENBQUEsRUFBQSxPQUFBLENBQUEsR0FBQSxFQUZsQyxHQUVrQyxDQUZsQyxHQUFBLElBQUEsR0FFMkUsS0FBQSxNQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsRUFGM0UsV0FFMkUsRUFGM0UsR0FFNkcsS0FBQSxNQUFBLENBRjdHLENBRTZHLENBRjdHLEdBQUEsbUNBQUE7QUFBN0IsR0FBQSxFQUFBLElBQUEsQ0FSTCxFQVFLLENBUkwsR0FBQSxzREFBQSxHQWNrQixNQUFBLFVBQUEsQ0FkbEIsR0FBQSxHQUFBLGlFQUFBO0FBOUJhLEVBQUE7O0FBZ0RkLFVBQVM7QUFoREssQzs7Ozs7Ozs7O0FDRmYsSUFBQSxTQUFBLFFBQUEsU0FBQSxDQUFBOztBQUNBLElBQUEsTUFBQSxRQUFBLE1BQUEsQ0FBQTs7QUFDQSxJQUFBLFdBQUEsUUFBQSxXQUFBLENBQUE7O0FBQ0EsSUFBQSxTQUFBLFFBQUEsU0FBQSxDQUFBOzs7O0FBQ0EsSUFBQSxZQUFBLFFBQUEsWUFBQSxDQUFBOzs7Ozs7a0JBRWUsVUFBQSxRQUFBLEVBQVk7QUFDdkIsUUFBRyxDQUFDLENBQUEsR0FBQSxPQUFKLGNBQUksR0FBSixFQUFzQjs7QUFFdEIsUUFBTSxRQUFRLENBQUEsR0FBQSxRQUFkLE9BQWMsR0FBZDtBQUNBLFFBQU0sVUFBVSxDQUFBLEdBQUEsT0FBQSxVQUFBLEVBQWhCLFFBQWdCLENBQWhCO0FBQ0EsVUFBQSxNQUFBLENBQWEsVUFBYixZQUFBLEVBQTJCLEVBQUUsVUFBRixRQUFBLEVBQVksU0FBUyxVQUFVLEtBQUEsS0FBQSxDQUFXLFFBQXJCLEtBQVUsQ0FBVixHQUFoRCxFQUEyQixFQUEzQixFQUE0RixDQUFBLE9BQUEsR0FBVyxDQUFDLENBQUEsR0FBQSxJQUFBLFVBQUEsRUFBWixLQUFZLENBQUQsQ0FBWCxHQUFpQyxDQUFFLFNBQUYsS0FBQSxFQUFTLENBQUEsR0FBQSxJQUFBLGFBQUEsRUFBdEksS0FBc0ksQ0FBVCxDQUE3SDs7Ozs7Ozs7O0FDWEcsSUFBTSxlQUFBLFFBQUEsWUFBQSxHQUFlLFNBQWYsWUFBZSxDQUFBLEtBQUEsRUFBQSxJQUFBLEVBQUE7QUFBQSxTQUFpQixPQUFBLE1BQUEsQ0FBQSxFQUFBLEVBQUEsS0FBQSxFQUFqQixJQUFpQixDQUFqQjtBQUFyQixDQUFBO0FBQ0EsSUFBTSxhQUFBLFFBQUEsVUFBQSxHQUFhLFNBQWIsVUFBYSxDQUFBLEtBQUEsRUFBQSxJQUFBLEVBQUE7QUFBQSxTQUFpQixPQUFBLE1BQUEsQ0FBQSxFQUFBLEVBQUEsS0FBQSxFQUFqQixJQUFpQixDQUFqQjtBQUFuQixDQUFBO0FBQ0EsSUFBTSxnQkFBQSxRQUFBLGFBQUEsR0FBZ0IsU0FBaEIsYUFBZ0IsQ0FBQSxLQUFBLEVBQUEsSUFBQSxFQUFBO0FBQUEsU0FBaUIsT0FBQSxNQUFBLENBQUEsRUFBQSxFQUFBLEtBQUEsRUFBakIsSUFBaUIsQ0FBakI7QUFBdEIsQ0FBQTs7Ozs7Ozs7O2tCQ0ZRLFlBQUE7QUFBQSxXQUFPO0FBQ2xCLGVBRGtCLEVBQUE7QUFBQSxnQkFBQSxTQUFBLE1BQUEsQ0FBQSxPQUFBLEVBQUEsU0FBQSxFQUVzQjtBQUFBLGdCQUFBLFFBQUEsSUFBQTs7QUFBQSxnQkFBYixVQUFhLFVBQUEsTUFBQSxHQUFBLENBQUEsSUFBQSxVQUFBLENBQUEsTUFBQSxTQUFBLEdBQUEsVUFBQSxDQUFBLENBQUEsR0FBSCxFQUFHOztBQUNwQyxpQkFBQSxLQUFBLEdBQWEsUUFBUSxLQUFSLEtBQUEsRUFBYixTQUFhLENBQWI7QUFDQSxnQkFBRyxRQUFBLE1BQUEsR0FBSCxDQUFBLEVBQXVCLFFBQUEsT0FBQSxDQUFnQixVQUFBLE1BQUEsRUFBVTtBQUFFLHVCQUFPLE1BQVAsS0FBQTtBQUE1QixhQUFBO0FBSlQsU0FBQTtBQUFBLGtCQUFBLFNBQUEsUUFBQSxHQU1QO0FBQUUsbUJBQU8sS0FBUCxLQUFBO0FBQW1CO0FBTmQsS0FBUDs7Ozs7Ozs7Ozs7QUNBZixJQUFBLFNBQUEsUUFBQSxTQUFBLENBQUE7O0FBQ0EsSUFBQSxhQUFBLFFBQUEsYUFBQSxDQUFBOztBQUNBLElBQUEsV0FBQSxRQUFBLFdBQUEsQ0FBQTs7QUFDQSxJQUFBLFlBQUEsUUFBQSxZQUFBLENBQUE7O0FBRU8sSUFBTSxhQUFBLFFBQUEsVUFBQSxHQUFhLFNBQWIsVUFBYSxDQUFBLEtBQUEsRUFBQTtBQUFBLFdBQVMsVUFBQSxLQUFBLEVBQVM7QUFDeEMsaUJBQUEsSUFBQSxDQUFBLGlCQUFBLENBQUEsa0JBQUEsQ0FBQSxhQUFBLEVBQWtFLE1BQUEsUUFBQSxDQUFBLGNBQUEsQ0FBOEIsQ0FBQSxHQUFBLE9BQUEsb0JBQUEsRUFBaEcsS0FBZ0csQ0FBOUIsQ0FBbEU7QUFDQSxZQUFNLFNBQVMsR0FBQSxLQUFBLENBQUEsSUFBQSxDQUFjLFNBQUEsZ0JBQUEsQ0FBQSxNQUE4QixNQUFBLFFBQUEsQ0FBQSxVQUFBLENBQTNELEtBQTZCLENBQWQsQ0FBZjtBQUNBLFlBQU0sU0FBUyxTQUFBLGFBQUEsQ0FBQSxNQUEyQixNQUFBLFFBQUEsQ0FBQSxVQUFBLENBQTFDLE1BQWUsQ0FBZjtBQUNBLFlBQU0sTUFBTSxTQUFBLGFBQUEsQ0FBQSxNQUEyQixNQUFBLFFBQUEsQ0FBQSxVQUFBLENBQXZDLEdBQVksQ0FBWjs7QUFFQSxtQkFBQSxjQUFBLENBQUEsT0FBQSxDQUF1QixVQUFBLEVBQUEsRUFBTTtBQUN6QixnQkFBQSxnQkFBQSxDQUFBLEVBQUEsRUFBeUIsVUFBQSxDQUFBLEVBQUs7QUFDMUIsb0JBQUcsQ0FBQyxDQUFBLEdBQUEsT0FBQSxhQUFBLEVBQUosQ0FBSSxDQUFKLEVBQXNCO0FBQ3RCLHNCQUFBLE1BQUEsQ0FBYSxVQUFiLFVBQUEsRUFBeUIsRUFBRSxTQUFTLE9BQUEsTUFBQSxDQUFjLFVBQUEsR0FBQSxFQUFBLEtBQUEsRUFBZ0I7QUFBRSwrQkFBTyxJQUFJLE1BQUosS0FBQSxJQUFtQixNQUFuQixPQUFBLEVBQVAsR0FBQTtBQUFoQyxxQkFBQSxFQUFwQyxFQUFvQyxDQUFYLEVBQXpCLEVBQTJILENBQUMsU0FBRCxLQUFBLEVBQVEsY0FBUixLQUFRLENBQVIsRUFBOEIsWUFBTTtBQUFFLDJCQUFBLFVBQUEsQ0FBQSxXQUFBLENBQUEsTUFBQTtBQUFqSyxpQkFBMkgsQ0FBM0g7QUFGSixhQUFBO0FBREosU0FBQTtBQU5zQixLQUFBO0FBQW5CLENBQUE7O0FBY0EsSUFBTSxnQkFBQSxRQUFBLGFBQUEsR0FBZ0IsU0FBaEIsYUFBZ0IsQ0FBQSxLQUFBLEVBQUE7QUFBQSxXQUFTLFVBQUEsS0FBQSxFQUFTO0FBQzNDLFlBQU0scUJBQXFCLFNBQUEsYUFBQSxDQUFBLE1BQTJCLE1BQUEsUUFBQSxDQUFBLFVBQUEsQ0FBdEQsa0JBQTJCLENBQTNCO0FBQ0EsWUFBRyxDQUFILGtCQUFBLEVBQXdCO0FBQ3hCLFlBQU0sWUFBWSxTQUFBLGFBQUEsQ0FBQSxNQUEyQixNQUFBLFFBQUEsQ0FBQSxVQUFBLENBQTdDLFNBQWtCLENBQWxCO0FBQ0EsWUFBQSxTQUFBLEVBQWMsT0FBTyxVQUFBLGVBQUEsQ0FBUCxVQUFPLENBQVA7QUFDZCwyQkFBQSxTQUFBLEdBQStCLE1BQUEsUUFBQSxDQUFBLGlCQUFBLENBQWlDLE1BQWhFLFFBQStCLENBQS9COztBQUVBLG1CQUFBLGNBQUEsQ0FBQSxPQUFBLENBQXVCLFVBQUEsRUFBQSxFQUFNO0FBQ3pCLHFCQUFBLGFBQUEsQ0FBQSxNQUEyQixNQUFBLFFBQUEsQ0FBQSxVQUFBLENBQTNCLFNBQUEsRUFBQSxnQkFBQSxDQUFBLEVBQUEsRUFBdUYsVUFBQSxDQUFBLEVBQUs7QUFDeEYsb0JBQUcsQ0FBQyxDQUFBLEdBQUEsT0FBQSxhQUFBLEVBQUosQ0FBSSxDQUFKLEVBQXNCO0FBQ3RCLHNCQUFBLE1BQUEsQ0FBYSxVQUFiLGFBQUEsRUFBQSxFQUFBLEVBQWdDLENBQUUsV0FBRixLQUFFLENBQUYsRUFBcUIsWUFBTTtBQUFFLHNCQUFBLE1BQUEsQ0FBQSxZQUFBLENBQUEsVUFBQSxFQUFBLFVBQUE7QUFBN0QsaUJBQWdDLENBQWhDO0FBRkosYUFBQTtBQURKLFNBQUE7QUFQeUIsS0FBQTtBQUF0QixDQUFBOzs7Ozs7Ozs7O0FDbkJQLElBQUEsYUFBQSxRQUFBLGFBQUEsQ0FBQTs7QUFFQTtBQUNPLElBQU0saUJBQUEsUUFBQSxjQUFBLEdBQWlCLFNBQWpCLGNBQWlCLEdBQU07QUFDaEMsUUFBSTtBQUNBLGlCQUFBLE1BQUEsR0FBQSxjQUFBO0FBQ0EsWUFBTSxNQUFNLFNBQUEsTUFBQSxDQUFBLE9BQUEsQ0FBQSxhQUFBLE1BQTJDLENBQXZELENBQUE7QUFDQSxpQkFBQSxNQUFBLEdBQUEscURBQUE7QUFDQSxlQUFBLEdBQUE7QUFKSixLQUFBLENBTUUsT0FBQSxDQUFBLEVBQVU7QUFDUixlQUFBLEtBQUE7QUFDRDtBQVRBLENBQUE7O0FBWUEsSUFBTSxjQUFBLFFBQUEsV0FBQSxHQUFjLFNBQWQsV0FBYyxDQUFBLEtBQUEsRUFBQTtBQUFBLFdBQVMsQ0FDN0IsTUFBQSxRQUFBLENBRDZCLElBQzdCLEdBRDZCLEdBQzdCLEdBQXVCLEtBQUEsU0FBQSxDQUFlLE1BRFQsT0FDTixDQUF2QixHQUQ2QixHQUFBLEVBQUEsYUFFcEIsSUFBQSxJQUFBLENBQVMsSUFBQSxJQUFBLEdBQUEsT0FBQSxLQUF3QixNQUFBLFFBQUEsQ0FBQSxNQUFBLEdBQUEsRUFBQSxHQUFBLEVBQUEsR0FBQSxFQUFBLEdBQWxDLElBQUMsRUFGb0IsV0FFcEIsRUFGb0IsR0FBQSxHQUFBLEVBQUEsVUFHeEIsTUFBQSxRQUFBLENBSHdCLElBQUEsR0FBQSxHQUFBLEVBSWhDLE1BQUEsUUFBQSxDQUFBLE1BQUEsR0FBQSxZQUFrQyxNQUFBLFFBQUEsQ0FBbEMsTUFBQSxHQUpnQyxFQUFBLEVBS2hDLE1BQUEsUUFBQSxDQUFBLE1BQUEsR0FBQSxZQUFrQyxNQUFBLFFBQUEsQ0FBbEMsTUFBQSxHQUxnQyxFQUFBLEVBQUEsSUFBQSxDQUFULEVBQVMsQ0FBVDtBQUFwQixDQUFBOztBQVFBLElBQU0sYUFBQSxRQUFBLFVBQUEsR0FBYSxTQUFiLFVBQWEsQ0FBQSxRQUFBLEVBQVk7QUFDbEMsUUFBTSxTQUFTLFNBQUEsTUFBQSxDQUFBLEtBQUEsQ0FBQSxJQUFBLEVBQUEsR0FBQSxDQUFnQyxVQUFBLElBQUEsRUFBQTtBQUFBLGVBQVMsRUFBRSxNQUFNLEtBQUEsS0FBQSxDQUFBLEdBQUEsRUFBUixDQUFRLENBQVIsRUFBNEIsT0FBTyxLQUFBLEtBQUEsQ0FBQSxHQUFBLEVBQTVDLENBQTRDLENBQW5DLEVBQVQ7QUFBaEMsS0FBQSxFQUFBLE1BQUEsQ0FBMEcsVUFBQSxJQUFBLEVBQUE7QUFBQSxlQUFRLEtBQUEsSUFBQSxLQUFjLFNBQXRCLElBQUE7QUFBMUcsS0FBQSxFQUFmLENBQWUsQ0FBZjtBQUNBLFdBQU8sV0FBQSxTQUFBLEdBQUEsTUFBQSxHQUFQLEtBQUE7QUFGRyxDQUFBOztBQUtQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPLElBQU0sdUJBQUEsUUFBQSxvQkFBQSxHQUF1QixTQUF2QixvQkFBdUIsQ0FBQSxLQUFBLEVBQVM7QUFDekMsV0FBTyxPQUFBLE1BQUEsQ0FBQSxFQUFBLEVBQWtCLE1BQWxCLFFBQUEsRUFBa0M7QUFDckMsZUFBTyxPQUFBLElBQUEsQ0FBWSxNQUFBLFFBQUEsQ0FBWixLQUFBLEVBQUEsTUFBQSxDQUF5QyxVQUFBLEdBQUEsRUFBQSxJQUFBLEVBQWU7QUFDM0QsZ0JBQUcsTUFBQSxPQUFBLENBQUEsSUFBQSxNQUFILFNBQUEsRUFBc0M7QUFDbEMsb0JBQUEsSUFBQSxJQUFZLE9BQUEsTUFBQSxDQUFBLEVBQUEsRUFBa0IsTUFBQSxRQUFBLENBQUEsS0FBQSxDQUFsQixJQUFrQixDQUFsQixFQUE4QztBQUN0RCw2QkFBUyxNQUFBLE9BQUEsQ0FBQSxJQUFBLE1BQUEsU0FBQSxHQUFvQyxNQUFBLE9BQUEsQ0FBcEMsSUFBb0MsQ0FBcEMsR0FBMEQsTUFBQSxRQUFBLENBQUEsS0FBQSxDQUFBLElBQUEsRUFBMkI7QUFEeEMsaUJBQTlDLENBQVo7QUFESixhQUFBLE1BSU8sSUFBQSxJQUFBLElBQVksTUFBQSxRQUFBLENBQUEsS0FBQSxDQUFaLElBQVksQ0FBWjtBQUNQLG1CQUFBLEdBQUE7QUFORyxTQUFBLEVBQUEsRUFBQTtBQUQ4QixLQUFsQyxDQUFQO0FBREcsQ0FBQTs7QUFhQSxJQUFNLGdCQUFBLFFBQUEsYUFBQSxHQUFnQixTQUFoQixhQUFnQixDQUFBLENBQUEsRUFBQTtBQUFBLFdBQU0sQ0FBQyxDQUFDLEVBQUYsT0FBQSxJQUFlLENBQUMsV0FBQSxnQkFBQSxDQUFBLFFBQUEsQ0FBMEIsRUFBM0MsT0FBaUIsQ0FBaEIsSUFBeUQsRUFBRSxFQUFBLEtBQUEsS0FBQSxDQUFBLElBQWlCLEVBQUEsTUFBQSxLQUFsRixDQUErRCxDQUEvRDtBQUF0QixDQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IENvb2tpZUJhbm5lciBmcm9tICcuLi8uLi9zcmMnO1xuICAgIFxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gICAgQ29va2llQmFubmVyLmluaXQoe1xuICAgICAgICB0eXBlczoge1xuICAgICAgICAgICAgJ25lY2Vzc2FyeSc6IHtcbiAgICAgICAgICAgICAgICBmbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4geyBjb25zb2xlLmxvZygnTmVjZXNzYXJ5IGZuJyk7IH0sXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdwcmVmZXJlbmNlJzoge1xuICAgICAgICAgICAgICAgIGNoZWNrZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgZm5zOiBbXG4gICAgICAgICAgICAgICAgICAgICgpID0+IHsgY29uc29sZS5sb2coJ1ByZWZlcmVuY2UgZm4nKTsgfSxcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ3BlcmZvcm1hbmNlJzoge1xuICAgICAgICAgICAgICAgIGNoZWNrZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgZm5zOiBbXG4gICAgICAgICAgICAgICAgICAgICgpID0+IHsgY29uc29sZS5sb2coJ1BlcmZvcm1hbmNlIGZuJyk7IH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ2FkdmVydGlzaW5nIGFuZCBtYXJrZXRpbmcnOiB7XG4gICAgICAgICAgICAgICAgY2hlY2tlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgZm5zOiBbXG4gICAgICAgICAgICAgICAgICAgICgpID0+IHsgY29uc29sZS5sb2coJ0FkdmVydGlzaW5nIGFuZCBtYXJrZXRpbmcgZm4nKTsgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufSk7IiwiaW1wb3J0IGRlZmF1bHRzIGZyb20gJy4vbGliL2RlZmF1bHRzJztcbmltcG9ydCBmYWN0b3J5IGZyb20gJy4vbGliJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGluaXQ6IG9wdHMgPT4gZmFjdG9yeShPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgb3B0cywge1xuICAgICAgICB0eXBlczogT2JqZWN0LmtleXMob3B0cy50eXBlcykucmVkdWNlKChhY2MsIGN1cnIpID0+IHtcbiAgICAgICAgICAgIGlmKGFjY1tjdXJyXSkge1xuICAgICAgICAgICAgICAgIGFjY1tjdXJyXSA9IE9iamVjdC5hc3NpZ24oe30sIGFjY1tjdXJyXSwge1xuICAgICAgICAgICAgICAgICAgICBmbnM6IGFjY1tjdXJyXS5mbnMuY29uY2F0KG9wdHMudHlwZXNbY3Vycl0uZm5zKSxcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogb3B0cy50eXBlc1tjdXJyXS5jaGVja2VkICE9PSB1bmRlZmluZWQgPyBvcHRzLnR5cGVzW2N1cnJdLmNoZWNrZWQgOiBkZWZhdWx0cy50eXBlc1tjdXJyXS5jaGVja2VkICE9PSB1bmRlZmluZWQgPyBkZWZhdWx0cy50eXBlc1tjdXJyXS5jaGVja2VkIDogZmFsc2VcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gIGVsc2UgYWNjW2N1cnJdID0gb3B0cy50eXBlc1tjdXJyXTtcbiAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH0sIGRlZmF1bHRzLnR5cGVzKVxuICAgIH0pKVxufTsiLCJleHBvcnQgY29uc3QgYXBwbHkgPSBzdGF0ZSA9PiB7XG4gICAgT2JqZWN0LmtleXMoc3RhdGUuY29uc2VudCkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBzdGF0ZS5jb25zZW50W2tleV0gJiYgc3RhdGUuc2V0dGluZ3MudHlwZXNba2V5XS5mbnMuZm9yRWFjaChmbiA9PiBmbihzdGF0ZSkpO1xuICAgIH0pO1xufTsiLCJleHBvcnQgY29uc3QgVFJJR0dFUl9FVkVOVFMgPSB3aW5kb3cuUG9pbnRlckV2ZW50ID8gWydwb2ludGVydXAnLCAna2V5ZG93biddIDogWydvbnRvdWNoc3RhcnQnIGluIHdpbmRvdyA/ICd0b3VjaHN0YXJ0JyA6ICdjbGljaycsICdrZXlkb3duJyBdO1xuXG5leHBvcnQgY29uc3QgVFJJR0dFUl9LRVlDT0RFUyA9IFsxMywgMzJdO1xuXG5leHBvcnQgY29uc3QgQ0xBU1NOQU1FID0ge1xuICAgIEJBTk5FUjogJ2Nvb2tpZS1iYW5uZXInLFxuICAgIEZJRUxEOiAnY29va2llLWJhbm5lcl9fZmllbGQnLFxuICAgIEJUTjogJ2Nvb2tpZS1iYW5uZXJfX2J0bidcbn07XG5cbmV4cG9ydCBjb25zdCBEQVRBX0FUVFJJQlVURSA9IHtcbiAgICBUWVBFOiAnZGF0YS1jb25zZW50LXR5cGUnLFxuICAgIElEOiAnZGF0YS1jb25zZW50LWlkJ1xufTsiLCJpbXBvcnQgeyB3cml0ZUNvb2tpZSwgR1RNTG9hZCB9IGZyb20gJy4vdXRpbHMnOyBcblxuZXhwb3J0IGRlZmF1bHQge1xuXHRuYW1lOiAnQ29va2llUHJlZmVyZW5jZXMnLFxuXHRwYXRoOiAnLycsXG5cdGRvbWFpbjogJycsXG5cdHNlY3VyZTogJycsXG5cdGV4cGlyeTogMzY1LFxuXHR0eXBlczoge1xuXHRcdCduZWNlc3NhcnknOiB7XG5cdFx0XHRjaGVja2VkOiB0cnVlLFxuXHRcdFx0ZGlzYWJsZWQ6IHRydWUsXG5cdFx0XHRmbnM6IFtdXG5cdFx0fSxcblx0XHQncHJlZmVyZW5jZSc6IHtcblx0XHRcdGNoZWNrZWQ6IHRydWUsXG5cdFx0XHRmbnM6IFtcblx0XHRcdFx0bW9kZWwgPT4geyBkb2N1bWVudC5jb29raWUgPSB3cml0ZUNvb2tpZShtb2RlbCk7IH1cblx0XHRcdF1cblx0XHR9XG5cdH0sXG5cdGNsYXNzTmFtZXM6IHtcblx0XHRiYW5uZXI6ICdjb29raWUtYmFubmVyJyxcblx0XHRidG46ICdjb29raWUtYmFubmVyX19idG4nLFxuXHRcdGZpZWxkOiAnY29va2llLWJhbm5lcl9fZmllbGQnLFxuXHRcdHVwZGF0ZUJ0bkNvbnRhaW5lcjogJ2Nvb2tpZS1iYW5uZXJfX3VwZGF0ZScsXG5cdFx0dXBkYXRlQnRuOiAnY29va2llLWJhbm5lcl9fdXBkYXRlLWJ0bidcblx0fSxcblx0dXBkYXRlQnRuVGVtcGxhdGUobW9kZWwpe1xuXHRcdHJldHVybiBgPGJ1dHRvbiBjbGFzcz1cIiR7bW9kZWwuY2xhc3NOYW1lcy51cGRhdGVCdG59XCI+VXBkYXRlIGNvb2tpZSBwcmVmZXJlbmNlczwvYnV0dG9uPmBcblx0fSxcblx0YmFubmVyVGVtcGxhdGUobW9kZWwpe1xuXHRcdHJldHVybiBgPHNlY3Rpb24gcm9sZT1cImRpYWxvZ1wiIGFyaWEtbGl2ZT1cInBvbGl0ZVwiIGFyaWEtbGFiZWw9XCJDb29raWUgY29uc2VudFwiIGFyaWEtZGVzY3JpYmVkYnk9XCJjb29raWUtYmFubmVyX19kZXNjXCIgY2xhc3M9XCIke21vZGVsLmNsYXNzTmFtZXMuYmFubmVyfVwiPlxuXHRcdFx0PCEtLWdvb2dsZW9mZjogYWxsLS0+XG5cdFx0XHQ8ZGl2IGNsYXNzPVwic21hbGwtMTJcIiBpZD1cImNvb2tpZS1iYW5uZXJfX2Rlc2NcIj5cblx0XHRcdFx0PGgxIGNsYXNzPVwiY29va2llLWJhbm5lcl9faGVhZGluZ1wiPlRoaXMgd2Vic2l0ZSB1c2VzIGNvb2tpZXMuPC9oMT5cblx0XHRcdFx0PHAgY2xhc3M9XCJjb29raWUtYmFubmVyX190ZXh0IGdhbW1hXCI+V2UgdXNlIGNvb2tpZXMgdG8gYW5hbHlzZSBvdXIgdHJhZmZpYyBhbmQgdG8gcHJvdmlkZSBzb2NpYWwgbWVkaWEgZmVhdHVyZXMuIFlvdSBjYW4gY2hvb3NlIHdoaWNoIGNhdGVnb3JpZXNcblx0XHRcdFx0b2YgY29va2llcyB5b3UgY29uc2VudCB0bywgb3IgYWNjZXB0IG91ciByZWNvbW1lbmRlZCBzZXR0aW5ncy5cblx0XHRcdFx0PGEgY2xhc3M9XCJjb29raWUtYmFubmVyX19saW5rXCIgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlciBub2ZvbGxvd1wiIGhyZWY9XCIvY29va2llcy9cIj5GaW5kIG91dCBtb3JlPC9hPiBhYm91dCB0aGUgY29va2llcyB3ZSB1c2UgYmVmb3JlIHlvdSBjb25zZW50LjwvcD5cblx0XHRcdFx0PHVsIGNsYXNzPVwiY29va2llLWJhbm5lcl9fbGlzdCBsaXN0ZXIgcHVzaC0tYm90dG9tIGxhcmdlLTEwXCI+XG5cdFx0XHRcdFx0JHtPYmplY3Qua2V5cyhtb2RlbC50eXBlcykubWFwKHR5cGUgPT4gYDxsaSBjbGFzcz1cImNvb2tpZS1iYW5uZXJfX2xpc3QtaXRlbVwiPlxuXHRcdFx0XHRcdFx0PGlucHV0IGlkPVwiY29va2llLWJhbm5lcl9fJHt0eXBlLnNwbGl0KCcgJylbMF0ucmVwbGFjZSgnICcsICctJyl9XCIgY2xhc3M9XCIke21vZGVsLmNsYXNzTmFtZXMuZmllbGR9XCIgdmFsdWU9XCIke3R5cGV9XCIgdHlwZT1cImNoZWNrYm94XCIke21vZGVsLnR5cGVzW3R5cGVdLmNoZWNrZWQgPyBgIGNoZWNrZWRgIDogJyd9JHttb2RlbC50eXBlc1t0eXBlXS5kaXNhYmxlZCA/IGAgZGlzYWJsZWRgIDogJyd9PiBcblx0XHRcdFx0XHRcdDxsYWJlbCBjbGFzcz1cImNvb2tpZS1iYW5uZXJfX2xhYmVsIGdhbW1hXCIgZm9yPVwiY29va2llLWJhbm5lcl9fJHt0eXBlLnNwbGl0KCcgJylbMF0ucmVwbGFjZSgnICcsICctJyl9XCI+JHt0eXBlLnN1YnN0cigwLCAxKS50b1VwcGVyQ2FzZSgpfSR7dHlwZS5zdWJzdHIoMSl9IGNvb2tpZXM8L2xhYmVsPlxuXHRcdFx0XHRcdDwvbGk+YCkuam9pbignJyl9XG5cdFx0XHRcdDwvdWw+XG5cdFx0XHQ8L2Rpdj5cblx0XHRcdDxidXR0b24gY2xhc3M9XCIke21vZGVsLmNsYXNzTmFtZXMuYnRufVwiPkNvbnRpbnVlPC9idXR0b24+XG5cdFx0XHQ8IS0tZ29vZ2xlb246IGFsbC0tPlxuXHRcdDwvc2VjdGlvbj5gO1xuXHR9LFxuXHRjb25zZW50OiB7fVxufTsiLCJpbXBvcnQgeyBjb29raWVzRW5hYmxlZCwgcmVhZENvb2tpZSB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgaW5pdEJhbm5lciwgaW5pdFVwZGF0ZUJ0biB9IGZyb20gJy4vdWknO1xuaW1wb3J0IHsgYXBwbHkgfSBmcm9tICcuL2NvbnNlbnQnO1xuaW1wb3J0IENyZWF0ZVN0b3JlIGZyb20gJy4vc3RvcmUnO1xuaW1wb3J0IHsgaW5pdGlhbFN0YXRlIH0gZnJvbSAnLi9yZWR1Y2Vycyc7XG5cbmV4cG9ydCBkZWZhdWx0IHNldHRpbmdzID0+IHtcbiAgICBpZighY29va2llc0VuYWJsZWQoKSkgcmV0dXJuO1xuXG4gICAgY29uc3QgU3RvcmUgPSBDcmVhdGVTdG9yZSgpO1xuICAgIGNvbnN0IGNvb2tpZXMgPSByZWFkQ29va2llKHNldHRpbmdzKTtcbiAgICBTdG9yZS51cGRhdGUoaW5pdGlhbFN0YXRlLCB7IHNldHRpbmdzLCBjb25zZW50OiBjb29raWVzID8gSlNPTi5wYXJzZShjb29raWVzLnZhbHVlKSA6IHt9IH0sICFjb29raWVzID8gW2luaXRCYW5uZXIoU3RvcmUpXSA6IFsgYXBwbHksIGluaXRVcGRhdGVCdG4oU3RvcmUpXSk7XG59OyIsImV4cG9ydCBjb25zdCBpbml0aWFsU3RhdGUgPSAoc3RhdGUsIGRhdGEpID0+IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBkYXRhKTtcbmV4cG9ydCBjb25zdCBzZXRDb25zZW50ID0gKHN0YXRlLCBkYXRhKSA9PiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgZGF0YSk7XG5leHBvcnQgY29uc3QgdXBkYXRlQ29uc2VudCA9IChzdGF0ZSwgZGF0YSkgPT4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIGRhdGEpOyIsImV4cG9ydCBkZWZhdWx0ICgpID0+ICh7XG4gICAgc3RhdGU6IHt9LFxuICAgIHVwZGF0ZShyZWR1Y2VyLCBuZXh0U3RhdGUsIGVmZmVjdHMgPSBbXSl7IFxuICAgICAgICB0aGlzLnN0YXRlID0gcmVkdWNlcih0aGlzLnN0YXRlLCBuZXh0U3RhdGUpO1xuICAgICAgICBpZihlZmZlY3RzLmxlbmd0aCA+IDApIGVmZmVjdHMuZm9yRWFjaChlZmZlY3QgPT4geyBlZmZlY3QodGhpcy5zdGF0ZSkgfSk7XG4gICAgfSxcbiAgICBnZXRTdGF0ZSgpIHsgcmV0dXJuIHRoaXMuc3RhdGUgfVxufSk7IiwiaW1wb3J0IHsgY29tcG9zZVVwZGF0ZVVJTW9kZWwsIHNob3VsZEV4ZWN1dGUgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IFRSSUdHRVJfRVZFTlRTIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgYXBwbHkgfSBmcm9tICcuL2NvbnNlbnQnO1xuaW1wb3J0IHsgc2V0Q29uc2VudCwgdXBkYXRlQ29uc2VudCB9IGZyb20gJy4vcmVkdWNlcnMnO1xuXG5leHBvcnQgY29uc3QgaW5pdEJhbm5lciA9IFN0b3JlID0+IHN0YXRlID0+IHtcbiAgICBkb2N1bWVudC5ib2R5LmZpcnN0RWxlbWVudENoaWxkLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlYmVnaW4nLCBzdGF0ZS5zZXR0aW5ncy5iYW5uZXJUZW1wbGF0ZShjb21wb3NlVXBkYXRlVUlNb2RlbChzdGF0ZSkpKTtcbiAgICBjb25zdCBmaWVsZHMgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke3N0YXRlLnNldHRpbmdzLmNsYXNzTmFtZXMuZmllbGR9YCkpO1xuICAgIGNvbnN0IGJhbm5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3N0YXRlLnNldHRpbmdzLmNsYXNzTmFtZXMuYmFubmVyfWApO1xuICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3N0YXRlLnNldHRpbmdzLmNsYXNzTmFtZXMuYnRufWApO1xuXG4gICAgVFJJR0dFUl9FVkVOVFMuZm9yRWFjaChldiA9PiB7XG4gICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKGV2LCBlID0+IHtcbiAgICAgICAgICAgIGlmKCFzaG91bGRFeGVjdXRlKGUpKSByZXR1cm47XG4gICAgICAgICAgICBTdG9yZS51cGRhdGUoc2V0Q29uc2VudCwgeyBjb25zZW50OiBmaWVsZHMucmVkdWNlKChhY2MsIGZpZWxkKSA9PiB7IHJldHVybiBhY2NbZmllbGQudmFsdWVdID0gZmllbGQuY2hlY2tlZCwgYWNjIH0sIHt9KSB9LCBbYXBwbHksIGluaXRVcGRhdGVCdG4oU3RvcmUpLCAoKSA9PiB7IGJhbm5lci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGJhbm5lcik7IH1dKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgaW5pdFVwZGF0ZUJ0biA9IFN0b3JlID0+IHN0YXRlID0+IHtcbiAgICBjb25zdCB1cGRhdGVCdG5Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtzdGF0ZS5zZXR0aW5ncy5jbGFzc05hbWVzLnVwZGF0ZUJ0bkNvbnRhaW5lcn1gKTtcbiAgICBpZighdXBkYXRlQnRuQ29udGFpbmVyKSByZXR1cm47XG4gICAgY29uc3QgdXBkYXRlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7c3RhdGUuc2V0dGluZ3MuY2xhc3NOYW1lcy51cGRhdGVCdG59YCk7XG4gICAgaWYodXBkYXRlQnRuKSByZXR1cm4gdXBkYXRlQnRuLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgICB1cGRhdGVCdG5Db250YWluZXIuaW5uZXJIVE1MID0gc3RhdGUuc2V0dGluZ3MudXBkYXRlQnRuVGVtcGxhdGUoc3RhdGUuc2V0dGluZ3MpO1xuXG4gICAgVFJJR0dFUl9FVkVOVFMuZm9yRWFjaChldiA9PiB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3N0YXRlLnNldHRpbmdzLmNsYXNzTmFtZXMudXBkYXRlQnRufWApLmFkZEV2ZW50TGlzdGVuZXIoZXYsIGUgPT4ge1xuICAgICAgICAgICAgaWYoIXNob3VsZEV4ZWN1dGUoZSkpIHJldHVybjtcbiAgICAgICAgICAgIFN0b3JlLnVwZGF0ZSh1cGRhdGVDb25zZW50LCB7fSwgWyBpbml0QmFubmVyKFN0b3JlKSwgKCkgPT4geyBlLnRhcmdldC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7IH1dKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59OyIsImltcG9ydCB7IFRSSUdHRVJfS0VZQ09ERVMgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbi8vTW9kZXJuaXpyIGNvb2tpZSB0ZXN0XG5leHBvcnQgY29uc3QgY29va2llc0VuYWJsZWQgPSAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gJ2Nvb2tpZXRlc3Q9MSc7XG4gICAgICAgIGNvbnN0IHJldCA9IGRvY3VtZW50LmNvb2tpZS5pbmRleE9mKCdjb29raWV0ZXN0PScpICE9PSAtMTtcbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gJ2Nvb2tpZXRlc3Q9MTsgZXhwaXJlcz1UaHUsIDAxLUphbi0xOTcwIDAwOjAwOjAxIEdNVCc7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgICB9XG4gICAgICBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG59O1xuXG5leHBvcnQgY29uc3Qgd3JpdGVDb29raWUgPSBzdGF0ZSA9PiBbXG4gICAgYCR7c3RhdGUuc2V0dGluZ3MubmFtZX09JHtKU09OLnN0cmluZ2lmeShzdGF0ZS5jb25zZW50KX07YCxcbiAgICBgZXhwaXJlcz0keyhuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldFRpbWUoKSArIChzdGF0ZS5zZXR0aW5ncy5leHBpcnkqMjQqNjAqNjAqMTAwMCkpKS50b0dNVFN0cmluZygpfTtgLFxuICAgIGBwYXRoPSR7c3RhdGUuc2V0dGluZ3MucGF0aH07YCxcbiAgICBzdGF0ZS5zZXR0aW5ncy5kb21haW4gPyBgZG9tYWluPSR7c3RhdGUuc2V0dGluZ3MuZG9tYWlufWAgOiAnJyxcbiAgICBzdGF0ZS5zZXR0aW5ncy5zZWN1cmUgPyBgc2VjdXJlPSR7c3RhdGUuc2V0dGluZ3Muc2VjdXJlfWAgOiAnJ1xuXS5qb2luKCcnKTtcblxuZXhwb3J0IGNvbnN0IHJlYWRDb29raWUgPSBzZXR0aW5ncyA9PiB7XG4gICAgY29uc3QgY29va2llID0gZG9jdW1lbnQuY29va2llLnNwbGl0KCc7ICcpLm1hcChwYXJ0ID0+ICh7IG5hbWU6IHBhcnQuc3BsaXQoJz0nKVswXSwgdmFsdWU6IHBhcnQuc3BsaXQoJz0nKVsxXSB9KSkuZmlsdGVyKHBhcnQgPT4gcGFydC5uYW1lID09PSBzZXR0aW5ncy5uYW1lKVswXTtcbiAgICByZXR1cm4gY29va2llICE9PSB1bmRlZmluZWQgPyBjb29raWUgOiBmYWxzZTtcbn07XG5cbi8vIGV4cG9ydCBjb25zdCBHVE1Mb2FkID0gY29kZSA9PiAoKSA9PiB7XG4vLyAgICAgKGZ1bmN0aW9uKHcsZCxzLGwsaSl7d1tsXT13W2xdfHxbXTt3W2xdLnB1c2goeydndG0uc3RhcnQnOlxuLy8gICAgIG5ldyBEYXRlKCkuZ2V0VGltZSgpLGV2ZW50OidndG0uanMnfSk7dmFyIGY9ZC5nZXRFbGVtZW50c0J5VGFnTmFtZShzKVswXSxcbi8vICAgICBqPWQuY3JlYXRlRWxlbWVudChzKSxkbD1sIT0nZGF0YUxheWVyJz8nJmw9JytsOicnO2ouYXN5bmM9dHJ1ZTtqLnNyYz1cbi8vICAgICAnaHR0cHM6Ly93d3cuZ29vZ2xldGFnbWFuYWdlci5jb20vZ3RtLmpzP2lkPScraStkbDtmLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGosZik7XG4vLyAgICAgfSkod2luZG93LGRvY3VtZW50LCdzY3JpcHQnLCdkYXRhTGF5ZXInLCBjb2RlKTtcbi8vIH1cblxuZXhwb3J0IGNvbnN0IGNvbXBvc2VVcGRhdGVVSU1vZGVsID0gc3RhdGUgPT4ge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5zZXR0aW5ncywge1xuICAgICAgICB0eXBlczogT2JqZWN0LmtleXMoc3RhdGUuc2V0dGluZ3MudHlwZXMpLnJlZHVjZSgoYWNjLCB0eXBlKSA9PiB7XG4gICAgICAgICAgICBpZihzdGF0ZS5jb25zZW50W3R5cGVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBhY2NbdHlwZV0gPSBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5zZXR0aW5ncy50eXBlc1t0eXBlXSwge1xuICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiBzdGF0ZS5jb25zZW50W3R5cGVdICE9PSB1bmRlZmluZWQgPyBzdGF0ZS5jb25zZW50W3R5cGVdIDogc3RhdGUuc2V0dGluZ3MudHlwZXNbdHlwZV0uY2hlY2tlZFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGFjY1t0eXBlXSA9IHN0YXRlLnNldHRpbmdzLnR5cGVzW3R5cGVdO1xuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfSwge30pXG4gICAgfSlcbn07XG5cbmV4cG9ydCBjb25zdCBzaG91bGRFeGVjdXRlID0gZSA9PiAoISFlLmtleUNvZGUgJiYgIVRSSUdHRVJfS0VZQ09ERVMuaW5jbHVkZXMoZS5rZXlDb2RlKSkgfHwgIShlLndoaWNoID09PSAzIHx8IGUuYnV0dG9uID09PSAyKTsiXX0=
