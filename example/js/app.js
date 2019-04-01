(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _src = require('../../src');

var _src2 = _interopRequireDefault(_src);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

window.addEventListener('DOMContentLoaded', function () {
    _src2.default.init({
        secure: true,
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
        var closeBtn = document.querySelector('.' + state.settings.classNames.close);

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
            closeBtn.addEventListener(ev, function (e) {
                if ((0, _utils.shouldReturn)(e)) return;

                Store.update(_reducers.setConsent, { consent: Object.keys(state.settings.types).reduce(function (acc, curr) {
                        acc[curr] = state.settings.types[curr].checked;
                        return acc;
                    }, {})
                }, [_utils.writeCookie, (0, _consent.apply)('remain'), function () {
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

var acquireDomain = function acquireDomain() {
    if (window.location.hostname) return window.location.hostname === 'localhost' ? window.location.hostname : '.' + window.location.hostname;
    var url = window.location.toString().split('://')[1].replace('www');
    var domain = '.' + (url[url.length - 1] === '/' ? url.substr(0, -1) : url);
    return domain === 'localhost' ? domain : '.' + domain;
};

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
    return document.cookie = [state.settings.name + '=' + JSON.stringify(Object.assign({}, state.consent, { intent: state.intent })) + ';', 'expires=' + new Date(new Date().getTime() + state.settings.expiry * 24 * 60 * 60 * 1000).toGMTString() + ';', 'path=' + state.settings.path + ';', 'domain=' + (state.settings.domain ? state.settings.domain : acquireDomain()) + ';', state.settings.secure ? 'secure' : ''].join('');
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
        document.cookie = [model.name + '=' + model.value + ';', 'expires=' + model.expiry + ';', 'path=' + state.settings.path + ';', 'domain=' + (state.settings.domain ? state.settings.domain : acquireDomain()) + ';', state.settings.secure ? 'secure' : ''].join('');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlL3NyYy9hcHAuanMiLCJzcmMvaW5kZXguanMiLCJzcmMvbGliL2NvbnNlbnQuanMiLCJzcmMvbGliL2NvbnN0YW50cy5qcyIsInNyYy9saWIvZGVmYXVsdHMuanMiLCJzcmMvbGliL2luZGV4LmpzIiwic3JjL2xpYi9yZWR1Y2Vycy5qcyIsInNyYy9saWIvc3RvcmUuanMiLCJzcmMvbGliL3VpLmpzIiwic3JjL2xpYi91dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBQSxPQUFBLFFBQUEsV0FBQSxDQUFBOzs7Ozs7OztBQUVBLE9BQUEsZ0JBQUEsQ0FBQSxrQkFBQSxFQUE0QyxZQUFNO0FBQzlDLFVBQUEsT0FBQSxDQUFBLElBQUEsQ0FBa0I7QUFDZCxnQkFEYyxJQUFBO0FBRWQsZUFBTztBQUNILHlCQUFhO0FBQ1QscUJBQUssQ0FDRCxZQUFNO0FBQUUsNEJBQUEsR0FBQSxDQUFBLGNBQUE7QUFEUCxpQkFBQTtBQURJLGFBRFY7QUFNSCwyQkFBZTtBQUNYLHlCQURXLElBQUE7QUFFWCxxQkFBSyxDQUNELFlBQU07QUFBRSw0QkFBQSxHQUFBLENBQUEsZ0JBQUE7QUFEUCxpQkFBQTtBQUZNLGFBTlo7QUFZSCx5Q0FBNkI7QUFDekIseUJBRHlCLEtBQUE7QUFFekIscUJBQUssQ0FDRCxZQUFNO0FBQUUsNEJBQUEsR0FBQSxDQUFBLDhCQUFBO0FBRFAsaUJBQUE7QUFGb0I7QUFaMUI7QUFGTyxLQUFsQjtBQURKLENBQUE7Ozs7Ozs7OztBQ0ZBLElBQUEsWUFBQSxRQUFBLGdCQUFBLENBQUE7Ozs7QUFDQSxJQUFBLE9BQUEsUUFBQSxPQUFBLENBQUE7Ozs7Ozs7O2tCQUVlO0FBQ1gsVUFBTSxTQUFBLElBQUEsQ0FBQSxJQUFBLEVBQUE7QUFBQSxlQUFRLENBQUEsR0FBQSxNQUFBLE9BQUEsRUFBUSxPQUFBLE1BQUEsQ0FBQSxFQUFBLEVB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QVksT0FBQSxNQUFBLENBQUEsRUFBQSxFQUFrQixNQUFBLFFBQUEsQ0FBQSxLQUFBLENBQWxCLElBQWtCLENBQWxCLEVBQThDO0FBQ3RELDZCQUFTLE1BQUEsT0FBQSxDQUFBLElBQUEsTUFBQSxTQUFBLEdBQW9DLE1BQUEsT0FBQSxDQUFwQyxJQUFvQyxDQUFwQyxHQUEwRCxNQUFBLFFBQUEsQ0FBQSxLQUFBLENBQUEsSUFBQSxFQUEyQjtBQUR4QyxpQkFBOUMsQ0FBWjtBQURKLGFBQUEsTUFJTyxJQUFBLElBQUEsSUFBWSxNQUFBLFFBQUEsQ0FBQSxLQUFBLENBQVosSUFBWSxDQUFaO0FBQ1AsbUJBQUEsR0FBQTtBQU5HLFNBQUEsRUFBQSxFQUFBO0FBRDhCLEtBQWxDLENBQVA7QUFERyxDQUFBOztBQWFBLElBQU0sZUFBQSxRQUFBLFlBQUEsR0FBZSxTQUFmLFlBQWUsQ0FBQSxDQUFBLEVBQUE7QUFBQSxXQUFNLENBQUMsQ0FBQyxFQUFGLE9BQUEsSUFBZSxDQUFDLENBQUMsV0FBQSxnQkFBQSxDQUFBLE9BQUEsQ0FBeUIsRUFBMUMsT0FBaUIsQ0FBakIsSUFBeUQsRUFBQSxLQUFBLElBQVcsRUFBQSxLQUFBLEtBQTFFLENBQUE7QUFBckIsQ0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBDb29raWVCYW5uZXIgZnJvbSAnLi4vLi4vc3JjJztcbiAgICBcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAgIENvb2tpZUJhbm5lci5pbml0KHtcbiAgICAgICAgc2VjdXJlOiB0cnVlLFxuICAgICAgICB0eXBlczoge1xuICAgICAgICAgICAgJ25lY2Vzc2FyeSc6IHtcbiAgICAgICAgICAgICAgICBmbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4geyBjb25zb2xlLmxvZygnTmVjZXNzYXJ5IGZuJyk7IH0sXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdwZXJmb3JtYW5jZSc6IHtcbiAgICAgICAgICAgICAgICBjaGVja2VkOiB0cnVlLFxuICAgICAgICAgICAgICAgIGZuczogW1xuICAgICAgICAgICAgICAgICAgICAoKSA9PiB7IGNvbnNvbGUubG9nKCdQZXJmb3JtYW5jZSBmbicpOyB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdhZHZlcnRpc2luZyBhbmQgbWFya2V0aW5nJzoge1xuICAgICAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGZuczogW1xuICAgICAgICAgICAgICAgICAgICAoKSA9PiB7IGNvbnNvbGUubG9nKCdBZHZlcnRpc2luZyBhbmQgbWFya2V0aW5nIGZuJyk7IH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn0pOyIsImltcG9ydCBkZWZhdWx0cyBmcm9tICcuL2xpYi9kZWZhdWx0cyc7XG5pbXBvcnQgZmFjdG9yeSBmcm9tICcuL2xpYic7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBpbml0OiBvcHRzID0+IGZhY3RvcnkoT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMsIG9wdHMsIHtcbiAgICAgICAgdHlwZXM6IE9iamVjdC5rZXlzKG9wdHMudHlwZXMpLnJlZHVjZSgoYWNjLCBjdXJyKSA9PiB7XG4gICAgICAgICAgICBpZihhY2NbY3Vycl0pIHtcbiAgICAgICAgICAgICAgICBhY2NbY3Vycl0gPSBPYmplY3QuYXNzaWduKHt9LCBhY2NbY3Vycl0sIHtcbiAgICAgICAgICAgICAgICAgICAgZm5zOiBhY2NbY3Vycl0uZm5zLmNvbmNhdChvcHRzLnR5cGVzW2N1cnJdLmZucyksXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6IG9wdHMudHlwZXNbY3Vycl0uY2hlY2tlZCAhPT0gdW5kZWZpbmVkID8gb3B0cy50eXBlc1tjdXJyXS5jaGVja2VkIDogZGVmYXVsdHMudHlwZXNbY3Vycl0uY2hlY2tlZCAhPT0gdW5kZWZpbmVkID8gZGVmYXVsdHMudHlwZXNbY3Vycl0uY2hlY2tlZCA6IGZhbHNlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9ICBlbHNlIGFjY1tjdXJyXSA9IG9wdHMudHlwZXNbY3Vycl07XG4gICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICB9LCBkZWZhdWx0cy50eXBlcylcbiAgICB9KSlcbn07IiwiZXhwb3J0IGNvbnN0IGFwcGx5ID0gKHBlcmYgPSAnYWRkJykgPT4gc3RhdGUgPT4ge1xuICAgIC8vO187IG5lZWRzIHByb3BlciBlbnVtXG4gICAgY29uc3QgYXBwbGllZFN0YXRlID0gcGVyZiA9PT0gJ2FkZCcgXG4gICAgICAgICAgICAgICAgICAgICAgICA/IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IGNvbnNlbnQ6ICBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5jb25zZW50LCB7IHBlcmZvcm1hbmNlOiB0cnVlIH0pIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHBlcmYgPT09ICdyZW1vdmUnXG4gICAgICAgICAgICAgICAgICAgICAgICA/ICBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBjb25zZW50OiAgT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuY29uc2VudCwgeyBwZXJmb3JtYW5jZTogZmFsc2UgfSl9KVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBzdGF0ZTtcblxuICAgIE9iamVjdC5rZXlzKGFwcGxpZWRTdGF0ZS5jb25zZW50KS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIChhcHBsaWVkU3RhdGUuY29uc2VudFtrZXldICYmIGFwcGxpZWRTdGF0ZS5zZXR0aW5ncy50eXBlc1trZXldKSAmJiBhcHBsaWVkU3RhdGUuc2V0dGluZ3MudHlwZXNba2V5XS5mbnMuZm9yRWFjaChmbiA9PiBmbihhcHBsaWVkU3RhdGUpKTtcbiAgICB9KTtcbn07IiwiZXhwb3J0IGNvbnN0IFRSSUdHRVJfRVZFTlRTID0gd2luZG93LlBvaW50ZXJFdmVudCA/IFsncG9pbnRlcnVwJywgJ2tleWRvd24nXSA6IFsnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cgPyAndG91Y2hzdGFydCcgOiAnY2xpY2snLCAna2V5ZG93bicgXTtcblxuZXhwb3J0IGNvbnN0IFRSSUdHRVJfS0VZQ09ERVMgPSBbMTMsIDMyXTtcblxuZXhwb3J0IGNvbnN0IENMQVNTTkFNRSA9IHtcbiAgICBCQU5ORVI6ICdwcmVmZXJlbmNlcy1iYW5uZXInLFxuICAgIEZJRUxEOiAncHJlZmVyZW5jZXMtYmFubmVyX19maWVsZCcsXG4gICAgQlROOiAncHJlZmVyZW5jZXMtYmFubmVyX19idG4nXG59O1xuXG5leHBvcnQgY29uc3QgREFUQV9BVFRSSUJVVEUgPSB7XG4gICAgVFlQRTogJ2RhdGEtY29uc2VudC10eXBlJyxcbiAgICBJRDogJ2RhdGEtY29uc2VudC1pZCdcbn07IiwiaW1wb3J0IHsgd3JpdGVDb29raWUgfSBmcm9tICcuL3V0aWxzJzsgXG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0bmFtZTogJ0Nvb2tpZVByZWZlcmVuY2VzJyxcblx0cGF0aDogJy8nLFxuXHRkb21haW46ICcnLFxuXHRzZWN1cmU6IHRydWUsXG5cdGV4cGlyeTogMzY1LFxuXHR0eXBlczoge1xuXHRcdCduZWNlc3NhcnknOiB7XG5cdFx0XHRjaGVja2VkOiB0cnVlLFxuXHRcdFx0ZGlzYWJsZWQ6IHRydWUsXG5cdFx0XHRmbnM6IFtdXG5cdFx0fVxuXHR9LFxuXHRwb2xpY3lVUkw6ICcvY29va2llLXBvbGljeScsXG5cdGNsYXNzTmFtZXM6IHtcblx0XHRiYW5uZXI6ICdwcmVmZXJlbmNlcy1iYW5uZXInLFxuXHRcdGJ0bjogJ3ByZWZlcmVuY2VzLWJhbm5lcl9fYnRuJyxcblx0XHRmaWVsZDogJ3ByZWZlcmVuY2VzLWJhbm5lcl9fZmllbGQnLFxuXHRcdHVwZGF0ZUJ0bkNvbnRhaW5lcjogJ3ByZWZlcmVuY2VzLWJhbm5lcl9fdXBkYXRlJyxcblx0XHR1cGRhdGVCdG46ICdwcmVmZXJlbmNlcy1iYW5uZXJfX3VwZGF0ZS1idG4nLFxuXHRcdGNsb3NlOiAncHJlZmVyZW5jZS1iYW5uZXJfX2Nsb3NlJ1xuXHR9LFxuXHR1cGRhdGVCdG5UZW1wbGF0ZShtb2RlbCl7XG5cdFx0cmV0dXJuIGA8YnV0dG9uIGNsYXNzPVwiJHttb2RlbC5jbGFzc05hbWVzLnVwZGF0ZUJ0bn1cIj5VcGRhdGUgY29va2llIHByZWZlcmVuY2VzPC9idXR0b24+YFxuXHR9LFxuXHRiYW5uZXJUZW1wbGF0ZShtb2RlbCl7XG5cdFx0cmV0dXJuIGA8c2VjdGlvbiByb2xlPVwiZGlhbG9nXCIgYXJpYS1saXZlPVwicG9saXRlXCIgYXJpYS1sYWJlbD1cIkNvb2tpZSBjb25zZW50XCIgYXJpYS1kZXNjcmliZWRieT1cInByZWZlcmVuY2VzLWJhbm5lcl9fZGVzY1wiIGNsYXNzPVwiJHttb2RlbC5jbGFzc05hbWVzLmJhbm5lcn1cIj5cblx0XHRcdDxkaXYgY2xhc3M9XCJwcmVmZXJlbmNlcy1jb250ZW50XCI+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJ3cmFwXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInJvd1wiPlxuXHRcdFx0XHRcdFx0PCEtLWdvb2dsZW9mZjogYWxsLS0+XG5cdFx0XHRcdFx0XHQ8ZGl2IGlkPVwicHJlZmVyZW5jZXMtYmFubmVyX19kZXNjXCI+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJwcmVmZXJlbmNlcy1iYW5uZXJfX2hlYWRpbmdcIj5UaGlzIHdlYnNpdGUgdXNlcyBjb29raWVzLjwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInByZWZlcmVuY2VzLWJhbm5lcl9fdGV4dFwiPldlIHVzZSBjb29raWVzIHRvIGFuYWx5c2Ugb3VyIHRyYWZmaWMgYW5kIHRvIHByb3ZpZGUgc29jaWFsIG1lZGlhIGZlYXR1cmVzLiBZb3UgY2FuIGNob29zZSB3aGljaCBjYXRlZ29yaWVzIG9mIGNvb2tpZXMgeW91IGNvbnNlbnQgdG8sIG9yIGFjY2VwdCBvdXIgcmVjb21tZW5kZWQgc2V0dGluZ3MuXG5cdFx0XHRcdFx0XHRcdDxhIGNsYXNzPVwicHJlZmVyZW5jZXMtYmFubmVyX19saW5rXCIgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlciBub2ZvbGxvd1wiIGhyZWY9XCIke21vZGVsLnBvbGljeVVSTH1cIj4gRmluZCBvdXQgbW9yZSBhYm91dCB0aGUgY29va2llcyB3ZSB1c2UuPC9hPjwvcD5cblx0XHRcdFx0XHRcdFx0PHVsIGNsYXNzPVwicHJlZmVyZW5jZXMtYmFubmVyX19saXN0XCI+XG5cdFx0XHRcdFx0XHRcdFx0JHtPYmplY3Qua2V5cyhtb2RlbC50eXBlcykubWFwKHR5cGUgPT4gYDxsaSBjbGFzcz1cInByZWZlcmVuY2VzLWJhbm5lcl9fbGlzdC1pdGVtXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8aW5wdXQgaWQ9XCJwcmVmZXJlbmNlcy1iYW5uZXJfXyR7dHlwZS5zcGxpdCgnICcpWzBdLnJlcGxhY2UoJyAnLCAnLScpfVwiIGNsYXNzPVwiJHttb2RlbC5jbGFzc05hbWVzLmZpZWxkfVwiIHZhbHVlPVwiJHt0eXBlfVwiIHR5cGU9XCJjaGVja2JveFwiJHttb2RlbC50eXBlc1t0eXBlXS5jaGVja2VkID8gYCBjaGVja2VkYCA6ICcnfSR7bW9kZWwudHlwZXNbdHlwZV0uZGlzYWJsZWQgPyBgIGRpc2FibGVkYCA6ICcnfT5cblx0XHRcdFx0XHRcdFx0XHRcdDxsYWJlbCBjbGFzcz1cInByZWZlcmVuY2VzLWJhbm5lcl9fbGFiZWxcIiBmb3I9XCJwcmVmZXJlbmNlcy1iYW5uZXJfXyR7dHlwZS5zcGxpdCgnICcpWzBdLnJlcGxhY2UoJyAnLCAnLScpfVwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQke3R5cGUuc3Vic3RyKDAsIDEpLnRvVXBwZXJDYXNlKCl9JHt0eXBlLnN1YnN0cigxKX0gY29va2llc1xuXHRcdFx0XHRcdFx0XHRcdFx0PC9sYWJlbD4gIFxuXHRcdFx0XHRcdFx0XHRcdDwvbGk+YCkuam9pbignJyl9XG5cdFx0XHRcdFx0XHRcdDwvdWw+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDxidXR0b24gY2xhc3M9XCIke21vZGVsLmNsYXNzTmFtZXMuYnRufVwiPk9LPC9idXR0b24+XG5cdFx0XHRcdFx0XHQ8YnV0dG9uIGNsYXNzPVwiJHttb2RlbC5jbGFzc05hbWVzLmNsb3NlfVwiPiAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdFx0XHRcdFx0XHQ8c3ZnIGZvY3VzYWJsZT1cImZhbHNlXCIgY2xhc3M9XCJwcmVmZXJlbmNlLWJhbm5lcl9fY2xvc2UtaWNvblwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+PHBhdGggZD1cIk0xOSA2LjQxTDE3LjU5IDUgMTIgMTAuNTkgNi40MSA1IDUgNi40MSAxMC41OSAxMiA1IDE3LjU5IDYuNDEgMTkgMTIgMTMuNDEgMTcuNTkgMTkgMTkgMTcuNTkgMTMuNDEgMTJ6XCIvPjxwYXRoIGQ9XCJNMCAwaDI0djI0SDB6XCIgZmlsbD1cIm5vbmVcIi8+PC9zdmc+XG5cdFx0XHRcdFx0XHQ8L2J1dHRvbj5cblx0XHRcdFx0XHRcdDwhLS1nb29nbGVvbjogYWxsLS0+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0PC9zZWN0aW9uPmA7XG5cdH1cbn07IiwiaW1wb3J0IHsgY29va2llc0VuYWJsZWQsIHJlYWRDb29raWUgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IGluaXRCYW5uZXIsIGluaXRVcGRhdGVCdG4gfSBmcm9tICcuL3VpJztcbmltcG9ydCB7IGFwcGx5IH0gZnJvbSAnLi9jb25zZW50JztcbmltcG9ydCBDcmVhdGVTdG9yZSBmcm9tICcuL3N0b3JlJztcbmltcG9ydCB7IGluaXRpYWxTdGF0ZSB9IGZyb20gJy4vcmVkdWNlcnMnO1xuXG5leHBvcnQgZGVmYXVsdCBzZXR0aW5ncyA9PiB7XG4gICAgaWYoIWNvb2tpZXNFbmFibGVkKCkpIHJldHVybjtcbiAgICBcbiAgICBjb25zdCBTdG9yZSA9IENyZWF0ZVN0b3JlKCk7XG4gICAgY29uc3QgY29va2llcyA9IHJlYWRDb29raWUoc2V0dGluZ3MpO1xuICAgIFN0b3JlLnVwZGF0ZShcbiAgICAgICAgaW5pdGlhbFN0YXRlLFxuICAgICAgICB7IFxuICAgICAgICAgICAgc2V0dGluZ3MsXG4gICAgICAgICAgICBjb25zZW50OiBjb29raWVzID8gSlNPTi5wYXJzZShjb29raWVzLnZhbHVlKSA6IHt9IFxuICAgICAgICB9LFxuICAgICAgICBbYXBwbHkoIWNvb2tpZXMgPyAnYWRkJyA6ICdyZW1haW4nKSwgY29va2llcyA/IGluaXRVcGRhdGVCdG4oU3RvcmUpIDogaW5pdEJhbm5lcihTdG9yZSldXG4gICAgKTtcbn07IiwiZXhwb3J0IGNvbnN0IGluaXRpYWxTdGF0ZSA9IChzdGF0ZSwgZGF0YSkgPT4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIGRhdGEpO1xuZXhwb3J0IGNvbnN0IHNldENvbnNlbnQgPSAoc3RhdGUsIGRhdGEpID0+IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBkYXRhKTtcbmV4cG9ydCBjb25zdCB1cGRhdGVDb25zZW50ID0gKHN0YXRlLCBkYXRhKSA9PiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgZGF0YSk7IiwiZXhwb3J0IGRlZmF1bHQgKCkgPT4gKHtcbiAgICBzdGF0ZToge30sXG4gICAgdXBkYXRlKHJlZHVjZXIsIG5leHRTdGF0ZSwgZWZmZWN0cyA9IFtdKXsgXG4gICAgICAgIHRoaXMuc3RhdGUgPSByZWR1Y2VyKHRoaXMuc3RhdGUsIG5leHRTdGF0ZSk7XG4gICAgICAgIGlmKGVmZmVjdHMubGVuZ3RoID4gMCkgZWZmZWN0cy5mb3JFYWNoKGVmZmVjdCA9PiB7IGVmZmVjdCh0aGlzLnN0YXRlKSB9KTtcbiAgICB9LFxuICAgIGdldFN0YXRlKCkgeyByZXR1cm4gdGhpcy5zdGF0ZSB9XG59KTsiLCJpbXBvcnQgeyBjb21wb3NlVXBkYXRlVUlNb2RlbCwgc2hvdWxkUmV0dXJuLCB3cml0ZUNvb2tpZSwgZGVsZXRlQ29va2llcyB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgVFJJR0dFUl9FVkVOVFMgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBhcHBseSB9IGZyb20gJy4vY29uc2VudCc7XG5pbXBvcnQgeyBzZXRDb25zZW50LCB1cGRhdGVDb25zZW50IH0gZnJvbSAnLi9yZWR1Y2Vycyc7XG5cbmV4cG9ydCBjb25zdCBpbml0QmFubmVyID0gU3RvcmUgPT4gc3RhdGUgPT4ge1xuICAgIGRvY3VtZW50LmJvZHkuZmlyc3RFbGVtZW50Q2hpbGQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmViZWdpbicsIHN0YXRlLnNldHRpbmdzLmJhbm5lclRlbXBsYXRlKGNvbXBvc2VVcGRhdGVVSU1vZGVsKHN0YXRlKSkpO1xuICAgIGNvbnN0IGZpZWxkcyA9IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLiR7c3RhdGUuc2V0dGluZ3MuY2xhc3NOYW1lcy5maWVsZH1gKSk7XG4gICAgY29uc3QgYmFubmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7c3RhdGUuc2V0dGluZ3MuY2xhc3NOYW1lcy5iYW5uZXJ9YCk7XG4gICAgY29uc3QgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7c3RhdGUuc2V0dGluZ3MuY2xhc3NOYW1lcy5idG59YCk7XG4gICAgY29uc3QgY2xvc2VCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtzdGF0ZS5zZXR0aW5ncy5jbGFzc05hbWVzLmNsb3NlfWApO1xuXG4gICAgVFJJR0dFUl9FVkVOVFMuZm9yRWFjaChldiA9PiB7XG4gICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKGV2LCBlID0+IHtcbiAgICAgICAgICAgIGlmKHNob3VsZFJldHVybihlKSkgcmV0dXJuO1xuICAgICAgICAgICAgY29uc3QgY29uc2VudCA9IGZpZWxkcy5yZWR1Y2UoKGFjYywgZmllbGQpID0+IHsgcmV0dXJuIGFjY1tmaWVsZC52YWx1ZV0gPSBmaWVsZC5jaGVja2VkLCBhY2MgfSwge30pO1xuXG4gICAgICAgICAgICBTdG9yZS51cGRhdGUoXG4gICAgICAgICAgICAgICAgc2V0Q29uc2VudCxcbiAgICAgICAgICAgICAgICB7IGNvbnNlbnQgfSxcbiAgICAgICAgICAgICAgICAhY29uc2VudC5wZXJmb3JtYW5jZSBcbiAgICAgICAgICAgICAgICA/IFtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlQ29va2llcyxcbiAgICAgICAgICAgICAgICAgICAgd3JpdGVDb29raWUsXG4gICAgICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IGxvY2F0aW9uLnJlbG9hZCgpLCA2MCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgOiBbXG4gICAgICAgICAgICAgICAgICAgIHdyaXRlQ29va2llLFxuICAgICAgICAgICAgICAgICAgICBhcHBseShzdGF0ZS5jb25zZW50LnBlcmZvcm1hbmNlID8gJ3JlbWFpbicgOiAncmVtb3ZlJyksXG4gICAgICAgICAgICAgICAgICAgICgpID0+IHsgXG4gICAgICAgICAgICAgICAgICAgICAgICBiYW5uZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChiYW5uZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdFVwZGF0ZUJ0bihTdG9yZSkoc3RhdGUpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgICAgY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcihldiwgZSA9PiB7XG4gICAgICAgICAgICBpZihzaG91bGRSZXR1cm4oZSkpIHJldHVybjtcblxuICAgICAgICAgICAgU3RvcmUudXBkYXRlKFxuICAgICAgICAgICAgICAgIHNldENvbnNlbnQsXG4gICAgICAgICAgICAgICAgeyBjb25zZW50OiBPYmplY3Qua2V5cyhzdGF0ZS5zZXR0aW5ncy50eXBlcykucmVkdWNlKChhY2MsIGN1cnIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjY1tjdXJyXSA9IHN0YXRlLnNldHRpbmdzLnR5cGVzW2N1cnJdLmNoZWNrZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICAgICAgICAgICAgICB9LCB7fSlcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgd3JpdGVDb29raWUsXG4gICAgICAgICAgICAgICAgICAgIGFwcGx5KCdyZW1haW4nKSxcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4geyBcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhbm5lci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGJhbm5lcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0VXBkYXRlQnRuKFN0b3JlKShzdGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGluaXRVcGRhdGVCdG4gPSBTdG9yZSA9PiBzdGF0ZSA9PiB7XG4gICAgY29uc3QgdXBkYXRlQnRuQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7c3RhdGUuc2V0dGluZ3MuY2xhc3NOYW1lcy51cGRhdGVCdG5Db250YWluZXJ9YCk7XG4gICAgaWYoIXVwZGF0ZUJ0bkNvbnRhaW5lcikgcmV0dXJuO1xuICAgIGNvbnN0IHVwZGF0ZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3N0YXRlLnNldHRpbmdzLmNsYXNzTmFtZXMudXBkYXRlQnRufWApO1xuICAgIGlmKHVwZGF0ZUJ0bikgdXBkYXRlQnRuLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgICBlbHNlIHVwZGF0ZUJ0bkNvbnRhaW5lci5pbm5lckhUTUwgPSBzdGF0ZS5zZXR0aW5ncy51cGRhdGVCdG5UZW1wbGF0ZShzdGF0ZS5zZXR0aW5ncyk7XG4gICAgY29uc3QgaGFuZGxlciA9IGUgPT4ge1xuICAgICAgICBpZihzaG91bGRSZXR1cm4oZSkpIHJldHVybjtcbiAgICAgICAgU3RvcmUudXBkYXRlKHVwZGF0ZUNvbnNlbnQsIHt9LCBbIGluaXRCYW5uZXIoU3RvcmUpLCAoKSA9PiB7IFxuICAgICAgICAgICAgZS50YXJnZXQuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgVFJJR0dFUl9FVkVOVFMuZm9yRWFjaChldiA9PiB7XG4gICAgICAgICAgICAgICAgZS50YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldiwgaGFuZGxlcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfV0pO1xuICAgIH07XG5cbiAgICBUUklHR0VSX0VWRU5UUy5mb3JFYWNoKGV2ID0+IHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7c3RhdGUuc2V0dGluZ3MuY2xhc3NOYW1lcy51cGRhdGVCdG59YCkuYWRkRXZlbnRMaXN0ZW5lcihldiwgaGFuZGxlcik7XG4gICAgfSk7XG59OyIsImltcG9ydCB7IFRSSUdHRVJfS0VZQ09ERVMgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbmNvbnN0IGFjcXVpcmVEb21haW4gPSAoKSA9PiB7XG4gICAgaWYod2luZG93LmxvY2F0aW9uLmhvc3RuYW1lKSByZXR1cm4gd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lID09PSAnbG9jYWxob3N0JyA/IHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSA6IGAuJHt3aW5kb3cubG9jYXRpb24uaG9zdG5hbWV9YDtcbiAgICBsZXQgdXJsID0gd2luZG93LmxvY2F0aW9uLnRvU3RyaW5nKCkuc3BsaXQoJzovLycpWzFdLnJlcGxhY2UoJ3d3dycpO1xuICAgIGNvbnN0IGRvbWFpbiA9IGAuJHsodXJsW3VybC5sZW5ndGggLSAxXSA9PT0gJy8nID8gdXJsLnN1YnN0cigwLCAtMSkgOiB1cmwpfWA7XG4gICAgcmV0dXJuIGRvbWFpbiA9PT0gJ2xvY2FsaG9zdCcgPyBkb21haW46IGAuJHtkb21haW59YDtcbn07XG5cbi8vTW9kZXJuaXpyIGNvb2tpZSB0ZXN0XG5leHBvcnQgY29uc3QgY29va2llc0VuYWJsZWQgPSAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gJ2Nvb2tpZXRlc3Q9MSc7XG4gICAgICAgIGNvbnN0IHJldCA9IGRvY3VtZW50LmNvb2tpZS5pbmRleE9mKCdjb29raWV0ZXN0PScpICE9PSAtMTtcbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gJ2Nvb2tpZXRlc3Q9MTsgZXhwaXJlcz1UaHUsIDAxLUphbi0xOTcwIDAwOjAwOjAxIEdNVCc7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgICB9XG4gICAgICBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG59O1xuXG5leHBvcnQgY29uc3Qgd3JpdGVDb29raWUgPSBzdGF0ZSA9PiBkb2N1bWVudC5jb29raWUgPSBbXG4gICAgYCR7c3RhdGUuc2V0dGluZ3MubmFtZX09JHtKU09OLnN0cmluZ2lmeShPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5jb25zZW50LCB7IGludGVudDogc3RhdGUuaW50ZW50IH0pKX07YCxcbiAgICBgZXhwaXJlcz0keyhuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldFRpbWUoKSArIChzdGF0ZS5zZXR0aW5ncy5leHBpcnkqMjQqNjAqNjAqMTAwMCkpKS50b0dNVFN0cmluZygpfTtgLFxuICAgIGBwYXRoPSR7c3RhdGUuc2V0dGluZ3MucGF0aH07YCxcbiAgICBgZG9tYWluPSR7c3RhdGUuc2V0dGluZ3MuZG9tYWluID8gc3RhdGUuc2V0dGluZ3MuZG9tYWluIDogYWNxdWlyZURvbWFpbigpfTtgLFxuICAgIHN0YXRlLnNldHRpbmdzLnNlY3VyZSA/IGBzZWN1cmVgIDogJydcbl0uam9pbignJyk7XG5cbmV4cG9ydCBjb25zdCByZWFkQ29va2llID0gc2V0dGluZ3MgPT4ge1xuICAgIGNvbnN0IGNvb2tpZSA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOyAnKS5tYXAocGFydCA9PiAoeyBuYW1lOiBwYXJ0LnNwbGl0KCc9JylbMF0sIHZhbHVlOiBwYXJ0LnNwbGl0KCc9JylbMV0gfSkpLmZpbHRlcihwYXJ0ID0+IHBhcnQubmFtZSA9PT0gc2V0dGluZ3MubmFtZSlbMF07XG4gICAgcmV0dXJuIGNvb2tpZSAhPT0gdW5kZWZpbmVkID8gY29va2llIDogZmFsc2U7XG59O1xuXG5jb25zdCB1cGRhdGVDb29raWUgPSBzdGF0ZSA9PiBtb2RlbCA9PiB7XG4gICAgZG9jdW1lbnQuY29va2llID0gW1xuICAgICAgICBgJHttb2RlbC5uYW1lfT0ke21vZGVsLnZhbHVlfTtgLFxuICAgICAgICBgZXhwaXJlcz0ke21vZGVsLmV4cGlyeX07YCxcbiAgICAgICAgYHBhdGg9JHtzdGF0ZS5zZXR0aW5ncy5wYXRofTtgLFxuICAgICAgICBgZG9tYWluPSR7c3RhdGUuc2V0dGluZ3MuZG9tYWluID8gc3RhdGUuc2V0dGluZ3MuZG9tYWluIDogYWNxdWlyZURvbWFpbigpfTtgLFxuICAgICAgICBzdGF0ZS5zZXR0aW5ncy5zZWN1cmUgPyBgc2VjdXJlYCA6ICcnXG4gICAgXS5qb2luKCcnKTtcbn1cblxuZXhwb3J0IGNvbnN0IGRlbGV0ZUNvb2tpZXMgPSBzdGF0ZSA9PiB7XG4gICAgZG9jdW1lbnQuY29va2llXG4gICAgICAgIC5zcGxpdCgnOyAnKVxuICAgICAgICAubWFwKHBhcnQgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBuYW1lOiBwYXJ0LnNwbGl0KCc9JylbMF0sXG4gICAgICAgICAgICAgICAgdmFsdWU6IHBhcnQuc3BsaXQoJz0nKVsxXSxcbiAgICAgICAgICAgICAgICBleHBpcnk6ICdUaHUsIDAxIEphbiAxOTcwIDAwOjAwOjAxIEdNVCdcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pXG4gICAgICAgIC5tYXAodXBkYXRlQ29va2llKHN0YXRlKSk7XG59O1xuXG5leHBvcnQgY29uc3QgY29tcG9zZVVwZGF0ZVVJTW9kZWwgPSBzdGF0ZSA9PiB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLnNldHRpbmdzLCB7XG4gICAgICAgIHR5cGVzOiBPYmplY3Qua2V5cyhzdGF0ZS5zZXR0aW5ncy50eXBlcykucmVkdWNlKChhY2MsIHR5cGUpID0+IHtcbiAgICAgICAgICAgIGlmKHN0YXRlLmNvbnNlbnRbdHlwZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGFjY1t0eXBlXSA9IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLnNldHRpbmdzLnR5cGVzW3R5cGVdLCB7XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6IHN0YXRlLmNvbnNlbnRbdHlwZV0gIT09IHVuZGVmaW5lZCA/IHN0YXRlLmNvbnNlbnRbdHlwZV0gOiBzdGF0ZS5zZXR0aW5ncy50eXBlc1t0eXBlXS5jaGVja2VkXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgYWNjW3R5cGVdID0gc3RhdGUuc2V0dGluZ3MudHlwZXNbdHlwZV07XG4gICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICB9LCB7fSlcbiAgICB9KVxufTtcblxuZXhwb3J0IGNvbnN0IHNob3VsZFJldHVybiA9IGUgPT4gKCEhZS5rZXlDb2RlICYmICF+VFJJR0dFUl9LRVlDT0RFUy5pbmRleE9mKGUua2V5Q29kZSkgfHwgKGUud2hpY2ggJiYgZS53aGljaCA9PT0gMykpOyJdfQ==
