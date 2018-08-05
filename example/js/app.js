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
                checked: false,
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
                        checked: opts.types[curr].checked
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
var apply = exports.apply = function apply(model) {
    Object.keys(model.consent).forEach(function (key) {
        model.consent[key] && model.types[key].fns.forEach(function (fn) {
            return fn(model);
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

},{"./utils":8}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _constants = require('./constants');

var _utils = require('./utils');

var _ui = require('./ui');

var _consent = require('./consent');

exports.default = function (model) {
    if (!(0, _utils.cookiesEnabled)()) return;
    var cookies = (0, _utils.readCookie)(model);
    if (!cookies) (0, _ui.initBanner)(model);else {
        model = Object.assign({}, model, { consent: JSON.parse(cookies.value) });
        (0, _consent.apply)(model);
        (0, _ui.initUpdateBtn)(model);
    }
};

},{"./consent":3,"./constants":4,"./ui":7,"./utils":8}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initUpdateBtn = exports.initBanner = undefined;

var _utils = require('./utils');

var _constants = require('./constants');

var _consent = require('./consent');

var initBanner = exports.initBanner = function initBanner(model) {
    console.log(model);
    document.body.firstElementChild.insertAdjacentHTML('beforebegin', model.bannerTemplate((0, _utils.composeModel)(model)));
    var fields = [].slice.call(document.querySelectorAll('.' + model.classNames.field));
    var banner = document.querySelector('.' + model.classNames.banner);
    var btn = document.querySelector('.' + model.classNames.btn);

    _constants.TRIGGER_EVENTS.forEach(function (ev) {
        btn.addEventListener(ev, function (e) {
            if (!(0, _utils.shouldExecute)(e)) return;
            model = Object.assign({}, model, { consent: fields.reduce(function (acc, field) {
                    return acc[field.value] = field.checked, acc;
                }, {}) });
            (0, _consent.apply)(model);
            banner.parentNode.removeChild(banner);
            initUpdateBtn(model);
        });
    });
};

var initUpdateBtn = exports.initUpdateBtn = function initUpdateBtn(model) {
    var updateBtnContainer = document.querySelector('.' + model.classNames.updateBtnContainer);
    if (!updateBtnContainer) return;
    var updateBtn = document.querySelector('.' + model.classNames.updateBtn);
    if (updateBtn) return updateBtn.removeAttribute('disabled');
    updateBtnContainer.innerHTML = model.updateBtnTemplate(model);
    _constants.TRIGGER_EVENTS.forEach(function (ev) {
        updateBtnContainer.addEventListener(ev, function (e) {
            if (!(0, _utils.shouldExecute)(e) || !e.target.classList.contains(model.classNames.updateBtn)) return;
            initBanner(model);
            document.querySelector('.' + model.classNames.updateBtn).setAttribute('disabled', 'disabled');
        });
    });
};

},{"./consent":3,"./constants":4,"./utils":8}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.shouldExecute = exports.composeModel = exports.GTMLoad = exports.readCookie = exports.writeCookie = exports.cookiesEnabled = undefined;

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

var writeCookie = exports.writeCookie = function writeCookie(model) {
    return [model.name + '=' + JSON.stringify(model.consent) + ';', 'expires=' + new Date(new Date().getTime() + model.expiry * 24 * 60 * 60 * 1000).toGMTString() + ';', 'path=' + model.path + ';', model.domain ? 'domain=' + model.domain : '', model.secure ? 'secure=' + model.secure : ''].join('');
};

var readCookie = exports.readCookie = function readCookie(model) {
    var cookie = document.cookie.split('; ').map(function (part) {
        return { name: part.split('=')[0], value: part.split('=')[1] };
    }).filter(function (part) {
        return part.name === model.name;
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

var composeModel = exports.composeModel = function composeModel(model) {
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

var shouldExecute = exports.shouldExecute = function shouldExecute(e) {
    return !!e.keyCode && !_constants.TRIGGER_KEYCODES.includes(e.keyCode) || !(e.which === 3 || e.button === 2);
};

},{"./constants":4}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlL3NyYy9hcHAuanMiLCJzcmMvaW5kZXguanMiLCJzcmMvbGliL2NvbnNlbnQuanMiLCJzcmMvbGliL2NvbnN0YW50cy5qcyIsInNyYy9saWIvZGVmYXVsdHMuanMiLCJzcmMvbGliL2luZGV4LmpzIiwic3JjL2xpYi91aS5qcyIsInNyYy9saWIvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLElBQUEsT0FBQSxRQUFBLFdBQUEsQ0FBQTs7Ozs7Ozs7QUFFQSxPQUFBLGdCQUFBLENBQUEsa0JBQUEsRUFBNEMsWUFBTTtBQUM5QyxVQUFBLE9BQUEsQ0FBQSxJQUFBLENBQWtCO0FBQ2QsZUFBTztBQUNILHlCQUFhO0FBQ1QscUJBQUssQ0FDRCxZQUFNO0FBQUUsNEJBQUEsR0FBQSxDQUFBLGNBQUE7QUFEUCxpQkFBQTtBQURJLGFBRFY7QUFNSCwwQkFBYztBQUNWLHlCQURVLEtBQUE7QUFFVixxQkFBSyxDQUNELFlBQU07QUFBRSw0QkFBQSxHQUFBLENBQUEsZUFBQTtBQURQLGlCQUFBO0FBRkssYUFOWDtBQVlILDJCQUFlO0FBQ1gseUJBRFcsSUFBQTtBQUVYLHFCQUFLLENBQ0QsWUFBTTtBQUFFLDRCQUFBLEdBQUEsQ0FBQSxnQkFBQTtBQURQLGlCQUFBO0FBRk0sYUFaWjtBQWtCSCx5Q0FBNkI7QUFDekIseUJBRHlCLEtBQUE7QUFFekIscUJBQUssQ0FDRCxZQUFNO0FBQUUsNEJBQUEsR0FBQSxDQUFBLDhCQUFBO0FBRFAsaUJBQUE7QUFGb0I7QUFsQjFCO0FBRE8sS0FBbEI7QUFESixDQUFBOzs7Ozs7Ozs7QUNGQSxJQUFBLFlBQUEsUUFBQSxnQkFBQSxDQUFBOzs7O0FBQ0EsSUFBQSxPQUFBLFFBQUEsT0FBQSxDQUFBOzs7Ozs7OztrQkFFZTtBQUNYLFVBQU0sU0FBQSxJQUFBLENBQUEsSUFBQSxFQUFBO0FBQUEsZUFBUSxDQUFBLEdB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LGVBQUEsUUFBQSxZQUFBLEdBQWUsU0FBZixZQUFlLENBQUEsS0FBQSxFQUFTO0FBQ2pDLFdBQU8sT0FBQSxNQUFBLENBQUEsRUFBQSxFQUFBLEtBQUEsRUFBeUI7QUFDNUIsZUFBTyxPQUFBLElBQUEsQ0FBWSxNQUFaLEtBQUEsRUFBQSxNQUFBLENBQWdDLFVBQUEsR0FBQSxFQUFBLElBQUEsRUFBZTtBQUNsRCxnQkFBRyxNQUFBLE9BQUEsQ0FBQSxJQUFBLE1BQUgsU0FBQSxFQUFzQztBQUNsQyxvQkFBQSxJQUFBLElBQVksT0FBQSxNQUFBLENBQUEsRUFBQSxFQUFrQixNQUFBLEtBQUEsQ0FBbEIsSUFBa0IsQ0FBbEIsRUFBcUM7QUFDN0MsNkJBQVMsTUFBQSxPQUFBLENBQUEsSUFBQTtBQURvQyxpQkFBckMsQ0FBWjtBQURKLGFBQUEsTUFJTyxJQUFBLElBQUEsSUFBWSxNQUFBLEtBQUEsQ0FBWixJQUFZLENBQVo7QUFDUCxtQkFBQSxHQUFBO0FBTkcsU0FBQSxFQUFBLEVBQUE7QUFEcUIsS0FBekIsQ0FBUDtBQURHLENBQUE7O0FBYUEsSUFBTSxnQkFBQSxRQUFBLGFBQUEsR0FBZ0IsU0FBaEIsYUFBZ0IsQ0FBQSxDQUFBLEVBQUE7QUFBQSxXQUFNLENBQUMsQ0FBQyxFQUFGLE9BQUEsSUFBZSxDQUFDLFdBQUEsZ0JBQUEsQ0FBQSxRQUFBLENBQTBCLEVBQTNDLE9BQWlCLENBQWhCLElBQXlELEVBQUUsRUFBQSxLQUFBLEtBQUEsQ0FBQSxJQUFpQixFQUFBLE1BQUEsS0FBbEYsQ0FBK0QsQ0FBL0Q7QUFBdEIsQ0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBDb29raWVCYW5uZXIgZnJvbSAnLi4vLi4vc3JjJztcbiAgICBcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAgIENvb2tpZUJhbm5lci5pbml0KHtcbiAgICAgICAgdHlwZXM6IHtcbiAgICAgICAgICAgICduZWNlc3NhcnknOiB7XG4gICAgICAgICAgICAgICAgZm5zOiBbXG4gICAgICAgICAgICAgICAgICAgICgpID0+IHsgY29uc29sZS5sb2coJ05lY2Vzc2FyeSBmbicpOyB9LFxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAncHJlZmVyZW5jZSc6IHtcbiAgICAgICAgICAgICAgICBjaGVja2VkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBmbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4geyBjb25zb2xlLmxvZygnUHJlZmVyZW5jZSBmbicpOyB9LFxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAncGVyZm9ybWFuY2UnOiB7XG4gICAgICAgICAgICAgICAgY2hlY2tlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBmbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4geyBjb25zb2xlLmxvZygnUGVyZm9ybWFuY2UgZm4nKTsgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnYWR2ZXJ0aXNpbmcgYW5kIG1hcmtldGluZyc6IHtcbiAgICAgICAgICAgICAgICBjaGVja2VkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBmbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4geyBjb25zb2xlLmxvZygnQWR2ZXJ0aXNpbmcgYW5kIG1hcmtldGluZyBmbicpOyB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59KTsiLCJpbXBvcnQgZGVmYXVsdHMgZnJvbSAnLi9saWIvZGVmYXVsdHMnO1xuaW1wb3J0IGZhY3RvcnkgZnJvbSAnLi9saWInO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgaW5pdDogb3B0cyA9PiBmYWN0b3J5KE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLCBvcHRzLCB7XG4gICAgICAgIHR5cGVzOiBPYmplY3Qua2V5cyhvcHRzLnR5cGVzKS5yZWR1Y2UoKGFjYywgY3VycikgPT4ge1xuICAgICAgICAgICAgaWYoYWNjW2N1cnJdKSB7XG4gICAgICAgICAgICAgICAgYWNjW2N1cnJdID0gT2JqZWN0LmFzc2lnbih7fSwgYWNjW2N1cnJdLCB7XG4gICAgICAgICAgICAgICAgICAgIGZuczogYWNjW2N1cnJdLmZucy5jb25jYXQob3B0cy50eXBlc1tjdXJyXS5mbnMpLFxuICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiBvcHRzLnR5cGVzW2N1cnJdLmNoZWNrZWRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gIGVsc2UgYWNjW2N1cnJdID0gb3B0cy50eXBlc1tjdXJyXTtcbiAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH0sIGRlZmF1bHRzLnR5cGVzKVxuICAgIH0pKVxufTsiLCJleHBvcnQgY29uc3QgYXBwbHkgPSBtb2RlbCA9PiB7XG4gICAgT2JqZWN0LmtleXMobW9kZWwuY29uc2VudCkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBtb2RlbC5jb25zZW50W2tleV0gJiYgbW9kZWwudHlwZXNba2V5XS5mbnMuZm9yRWFjaChmbiA9PiBmbihtb2RlbCkpO1xuICAgIH0pO1xufTsiLCJleHBvcnQgY29uc3QgVFJJR0dFUl9FVkVOVFMgPSB3aW5kb3cuUG9pbnRlckV2ZW50ID8gWydwb2ludGVydXAnLCAna2V5ZG93biddIDogWydvbnRvdWNoc3RhcnQnIGluIHdpbmRvdyA/ICd0b3VjaHN0YXJ0JyA6ICdjbGljaycsICdrZXlkb3duJyBdO1xuXG5leHBvcnQgY29uc3QgVFJJR0dFUl9LRVlDT0RFUyA9IFsxMywgMzJdO1xuXG5leHBvcnQgY29uc3QgQ0xBU1NOQU1FID0ge1xuICAgIEJBTk5FUjogJ2Nvb2tpZS1iYW5uZXInLFxuICAgIEZJRUxEOiAnY29va2llLWJhbm5lcl9fZmllbGQnLFxuICAgIEJUTjogJ2Nvb2tpZS1iYW5uZXJfX2J0bidcbn07XG5cbmV4cG9ydCBjb25zdCBEQVRBX0FUVFJJQlVURSA9IHtcbiAgICBUWVBFOiAnZGF0YS1jb25zZW50LXR5cGUnLFxuICAgIElEOiAnZGF0YS1jb25zZW50LWlkJ1xufTsiLCJpbXBvcnQgeyB3cml0ZUNvb2tpZSB9IGZyb20gJy4vdXRpbHMnOyBcblxuZXhwb3J0IGRlZmF1bHQge1xuXHRuYW1lOiAnQ29va2llUHJlZmVyZW5jZXMnLFxuXHRwYXRoOiAnLycsXG5cdGRvbWFpbjogJycsXG5cdHNlY3VyZTogJycsXG5cdGV4cGlyeTogMzY1LFxuXHR0eXBlczoge1xuXHRcdCduZWNlc3NhcnknOiB7XG5cdFx0XHRjaGVja2VkOiB0cnVlLFxuXHRcdFx0ZGlzYWJsZWQ6IHRydWUsXG5cdFx0XHRmbnM6IFtdXG5cdFx0fSxcblx0XHQncHJlZmVyZW5jZSc6IHtcblx0XHRcdGNoZWNrZWQ6IHRydWUsXG5cdFx0XHRmbnM6IFtcblx0XHRcdFx0bW9kZWwgPT4geyBkb2N1bWVudC5jb29raWUgPSB3cml0ZUNvb2tpZShtb2RlbCk7IH1cblx0XHRcdF1cblx0XHR9XG5cdH0sXG5cdGNsYXNzTmFtZXM6IHtcblx0XHRiYW5uZXI6ICdjb29raWUtYmFubmVyJyxcblx0XHRidG46ICdjb29raWUtYmFubmVyX19idG4nLFxuXHRcdGZpZWxkOiAnY29va2llLWJhbm5lcl9fZmllbGQnLFxuXHRcdHVwZGF0ZUJ0bkNvbnRhaW5lcjogJ2Nvb2tpZS1iYW5uZXJfX3VwZGF0ZScsXG5cdFx0dXBkYXRlQnRuOiAnY29va2llLWJhbm5lcl9fdXBkYXRlLWJ0bidcblx0fSxcblx0dXBkYXRlQnRuVGVtcGxhdGUobW9kZWwpe1xuXHRcdHJldHVybiBgPGJ1dHRvbiBjbGFzcz1cIiR7bW9kZWwuY2xhc3NOYW1lcy51cGRhdGVCdG59XCI+VXBkYXRlIGNvb2tpZSBwcmVmZXJlbmNlczwvYnV0dG9uPmBcblx0fSxcblx0YmFubmVyVGVtcGxhdGUobW9kZWwpe1xuXHRcdHJldHVybiBgPHNlY3Rpb24gcm9sZT1cImRpYWxvZ1wiIGFyaWEtbGl2ZT1cInBvbGl0ZVwiIGFyaWEtbGFiZWw9XCJDb29raWUgY29uc2VudFwiIGFyaWEtZGVzY3JpYmVkYnk9XCJjb29raWUtYmFubmVyX19kZXNjXCIgY2xhc3M9XCIke21vZGVsLmNsYXNzTmFtZXMuYmFubmVyfVwiPlxuXHRcdFx0PCEtLWdvb2dsZW9mZjogYWxsLS0+XG5cdFx0XHQ8ZGl2IGNsYXNzPVwic21hbGwtMTJcIiBpZD1cImNvb2tpZS1iYW5uZXJfX2Rlc2NcIj5cblx0XHRcdFx0PGgxIGNsYXNzPVwiY29va2llLWJhbm5lcl9faGVhZGluZ1wiPlRoaXMgd2Vic2l0ZSB1c2VzIGNvb2tpZXMuPC9oMT5cblx0XHRcdFx0PHAgY2xhc3M9XCJjb29raWUtYmFubmVyX190ZXh0IGdhbW1hXCI+V2UgdXNlIGNvb2tpZXMgdG8gYW5hbHlzZSBvdXIgdHJhZmZpYyBhbmQgdG8gcHJvdmlkZSBzb2NpYWwgbWVkaWEgZmVhdHVyZXMuIFlvdSBjYW4gY2hvb3NlIHdoaWNoIGNhdGVnb3JpZXNcblx0XHRcdFx0b2YgY29va2llcyB5b3UgY29uc2VudCB0bywgb3IgYWNjZXB0IG91ciByZWNvbW1lbmRlZCBzZXR0aW5ncy5cblx0XHRcdFx0PGEgY2xhc3M9XCJjb29raWUtYmFubmVyX19saW5rXCIgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlciBub2ZvbGxvd1wiIGhyZWY9XCIvY29va2llcy9cIj5GaW5kIG91dCBtb3JlPC9hPiBhYm91dCB0aGUgY29va2llcyB3ZSB1c2UgYmVmb3JlIHlvdSBjb25zZW50LjwvcD5cblx0XHRcdFx0PHVsIGNsYXNzPVwiY29va2llLWJhbm5lcl9fbGlzdCBsaXN0ZXIgcHVzaC0tYm90dG9tIGxhcmdlLTEwXCI+XG5cdFx0XHRcdFx0JHtPYmplY3Qua2V5cyhtb2RlbC50eXBlcykubWFwKHR5cGUgPT4gYDxsaSBjbGFzcz1cImNvb2tpZS1iYW5uZXJfX2xpc3QtaXRlbVwiPlxuXHRcdFx0XHRcdFx0PGlucHV0IGlkPVwiY29va2llLWJhbm5lcl9fJHt0eXBlLnNwbGl0KCcgJylbMF0ucmVwbGFjZSgnICcsICctJyl9XCIgY2xhc3M9XCIke21vZGVsLmNsYXNzTmFtZXMuZmllbGR9XCIgdmFsdWU9XCIke3R5cGV9XCIgdHlwZT1cImNoZWNrYm94XCIke21vZGVsLnR5cGVzW3R5cGVdLmNoZWNrZWQgPyBgIGNoZWNrZWRgIDogJyd9JHttb2RlbC50eXBlc1t0eXBlXS5kaXNhYmxlZCA/IGAgZGlzYWJsZWRgIDogJyd9PiBcblx0XHRcdFx0XHRcdDxsYWJlbCBjbGFzcz1cImNvb2tpZS1iYW5uZXJfX2xhYmVsIGdhbW1hXCIgZm9yPVwiY29va2llLWJhbm5lcl9fJHt0eXBlLnNwbGl0KCcgJylbMF0ucmVwbGFjZSgnICcsICctJyl9XCI+JHt0eXBlLnN1YnN0cigwLCAxKS50b1VwcGVyQ2FzZSgpfSR7dHlwZS5zdWJzdHIoMSl9IGNvb2tpZXM8L2xhYmVsPlxuXHRcdFx0XHRcdDwvbGk+YCkuam9pbignJyl9XG5cdFx0XHRcdDwvdWw+XG5cdFx0XHQ8L2Rpdj5cblx0XHRcdDxidXR0b24gY2xhc3M9XCIke21vZGVsLmNsYXNzTmFtZXMuYnRufVwiPkNvbnRpbnVlPC9idXR0b24+XG5cdFx0XHQ8IS0tZ29vZ2xlb246IGFsbC0tPlxuXHRcdDwvc2VjdGlvbj5gO1xuXHR9LFxuXHRjb25zZW50OiB7fVxufTsiLCJpbXBvcnQgeyBUUklHR0VSX0VWRU5UUywgQ0xBU1NOQU1FIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgcmVhZENvb2tpZSwgY29va2llc0VuYWJsZWQsIHNob3VsZEV4ZWN1dGUgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IGluaXRCYW5uZXIsIGluaXRVcGRhdGVCdG4gfSBmcm9tICcuL3VpJztcbmltcG9ydCB7IGFwcGx5IH0gZnJvbSAnLi9jb25zZW50JztcblxuZXhwb3J0IGRlZmF1bHQgbW9kZWwgPT4ge1xuICAgIGlmKCFjb29raWVzRW5hYmxlZCgpKSByZXR1cm47XG4gICAgY29uc3QgY29va2llcyA9IHJlYWRDb29raWUobW9kZWwpO1xuICAgIGlmKCFjb29raWVzKSBpbml0QmFubmVyKG1vZGVsKTtcbiAgICBlbHNlIHtcbiAgICAgICAgbW9kZWwgPSBPYmplY3QuYXNzaWduKHt9LCBtb2RlbCwgeyBjb25zZW50OiBKU09OLnBhcnNlKGNvb2tpZXMudmFsdWUpIH0pO1xuICAgICAgICBhcHBseShtb2RlbCk7XG4gICAgICAgIGluaXRVcGRhdGVCdG4obW9kZWwpO1xuICAgIH1cbn07IiwiaW1wb3J0IHsgY29tcG9zZU1vZGVsLCBzaG91bGRFeGVjdXRlIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyBUUklHR0VSX0VWRU5UUyB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7IGFwcGx5IH0gZnJvbSAnLi9jb25zZW50JztcblxuZXhwb3J0IGNvbnN0IGluaXRCYW5uZXIgPSBtb2RlbCA9PiB7XG4gICAgY29uc29sZS5sb2cobW9kZWwpO1xuICAgIGRvY3VtZW50LmJvZHkuZmlyc3RFbGVtZW50Q2hpbGQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmViZWdpbicsIG1vZGVsLmJhbm5lclRlbXBsYXRlKGNvbXBvc2VNb2RlbChtb2RlbCkpKTtcbiAgICBjb25zdCBmaWVsZHMgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke21vZGVsLmNsYXNzTmFtZXMuZmllbGR9YCkpO1xuICAgIGNvbnN0IGJhbm5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke21vZGVsLmNsYXNzTmFtZXMuYmFubmVyfWApO1xuICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke21vZGVsLmNsYXNzTmFtZXMuYnRufWApO1xuXG4gICAgVFJJR0dFUl9FVkVOVFMuZm9yRWFjaChldiA9PiB7XG4gICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKGV2LCBlID0+IHtcbiAgICAgICAgICAgIGlmKCFzaG91bGRFeGVjdXRlKGUpKSByZXR1cm47XG4gICAgICAgICAgICBtb2RlbCA9IE9iamVjdC5hc3NpZ24oe30sIG1vZGVsLCB7IGNvbnNlbnQ6IGZpZWxkcy5yZWR1Y2UoKGFjYywgZmllbGQpID0+IHsgcmV0dXJuIGFjY1tmaWVsZC52YWx1ZV0gPSBmaWVsZC5jaGVja2VkLCBhY2MgfSwge30pIH0pO1xuICAgICAgICAgICAgYXBwbHkobW9kZWwpO1xuICAgICAgICAgICAgYmFubmVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoYmFubmVyKTtcbiAgICAgICAgICAgIGluaXRVcGRhdGVCdG4obW9kZWwpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBpbml0VXBkYXRlQnRuID0gbW9kZWwgPT4ge1xuICAgIGNvbnN0IHVwZGF0ZUJ0bkNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke21vZGVsLmNsYXNzTmFtZXMudXBkYXRlQnRuQ29udGFpbmVyfWApO1xuICAgIGlmKCF1cGRhdGVCdG5Db250YWluZXIpIHJldHVybjtcbiAgICBjb25zdCB1cGRhdGVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHttb2RlbC5jbGFzc05hbWVzLnVwZGF0ZUJ0bn1gKTtcbiAgICBpZih1cGRhdGVCdG4pIHJldHVybiB1cGRhdGVCdG4ucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICAgIHVwZGF0ZUJ0bkNvbnRhaW5lci5pbm5lckhUTUwgPSBtb2RlbC51cGRhdGVCdG5UZW1wbGF0ZShtb2RlbCk7XG4gICAgVFJJR0dFUl9FVkVOVFMuZm9yRWFjaChldiA9PiB7XG4gICAgICAgIHVwZGF0ZUJ0bkNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKGV2LCBlID0+IHtcbiAgICAgICAgICAgIGlmKCFzaG91bGRFeGVjdXRlKGUpIHx8ICFlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMobW9kZWwuY2xhc3NOYW1lcy51cGRhdGVCdG4pKSByZXR1cm47XG4gICAgICAgICAgICBpbml0QmFubmVyKG1vZGVsKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke21vZGVsLmNsYXNzTmFtZXMudXBkYXRlQnRufWApLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59OyIsImltcG9ydCB7IFRSSUdHRVJfS0VZQ09ERVMgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbi8vTW9kZXJuaXpyIGNvb2tpZSB0ZXN0XG5leHBvcnQgY29uc3QgY29va2llc0VuYWJsZWQgPSAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gJ2Nvb2tpZXRlc3Q9MSc7XG4gICAgICAgIGNvbnN0IHJldCA9IGRvY3VtZW50LmNvb2tpZS5pbmRleE9mKCdjb29raWV0ZXN0PScpICE9PSAtMTtcbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gJ2Nvb2tpZXRlc3Q9MTsgZXhwaXJlcz1UaHUsIDAxLUphbi0xOTcwIDAwOjAwOjAxIEdNVCc7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgICB9XG4gICAgICBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG59O1xuXG5leHBvcnQgY29uc3Qgd3JpdGVDb29raWUgPSBtb2RlbCA9PiBbXG4gICAgYCR7bW9kZWwubmFtZX09JHtKU09OLnN0cmluZ2lmeShtb2RlbC5jb25zZW50KX07YCxcbiAgICBgZXhwaXJlcz0keyhuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldFRpbWUoKSArIChtb2RlbC5leHBpcnkqMjQqNjAqNjAqMTAwMCkpKS50b0dNVFN0cmluZygpfTtgLFxuICAgIGBwYXRoPSR7bW9kZWwucGF0aH07YCxcbiAgICBtb2RlbC5kb21haW4gPyBgZG9tYWluPSR7bW9kZWwuZG9tYWlufWAgOiAnJyxcbiAgICBtb2RlbC5zZWN1cmUgPyBgc2VjdXJlPSR7bW9kZWwuc2VjdXJlfWAgOiAnJ1xuXS5qb2luKCcnKTtcblxuZXhwb3J0IGNvbnN0IHJlYWRDb29raWUgPSBtb2RlbCA9PiB7XG4gICAgY29uc3QgY29va2llID0gZG9jdW1lbnQuY29va2llLnNwbGl0KCc7ICcpLm1hcChwYXJ0ID0+ICh7IG5hbWU6IHBhcnQuc3BsaXQoJz0nKVswXSwgdmFsdWU6IHBhcnQuc3BsaXQoJz0nKVsxXSB9KSkuZmlsdGVyKHBhcnQgPT4gcGFydC5uYW1lID09PSBtb2RlbC5uYW1lKVswXTtcbiAgICByZXR1cm4gY29va2llICE9PSB1bmRlZmluZWQgPyBjb29raWUgOiBmYWxzZTtcbn07XG5cbmV4cG9ydCBjb25zdCBHVE1Mb2FkID0gY29kZSA9PiB7XG4gICAgKGZ1bmN0aW9uKHcsZCxzLGwsaSl7d1tsXT13W2xdfHxbXTt3W2xdLnB1c2goeydndG0uc3RhcnQnOlxuICAgIG5ldyBEYXRlKCkuZ2V0VGltZSgpLGV2ZW50OidndG0uanMnfSk7dmFyIGY9ZC5nZXRFbGVtZW50c0J5VGFnTmFtZShzKVswXSxcbiAgICBqPWQuY3JlYXRlRWxlbWVudChzKSxkbD1sIT0nZGF0YUxheWVyJz8nJmw9JytsOicnO2ouYXN5bmM9dHJ1ZTtqLnNyYz1cbiAgICAnaHR0cHM6Ly93d3cuZ29vZ2xldGFnbWFuYWdlci5jb20vZ3RtLmpzP2lkPScraStkbDtmLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGosZik7XG4gICAgfSkod2luZG93LGRvY3VtZW50LCdzY3JpcHQnLCdkYXRhTGF5ZXInLCBjb2RlKTtcbn1cblxuZXhwb3J0IGNvbnN0IGNvbXBvc2VNb2RlbCA9IG1vZGVsID0+IHtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgbW9kZWwsIHtcbiAgICAgICAgdHlwZXM6IE9iamVjdC5rZXlzKG1vZGVsLnR5cGVzKS5yZWR1Y2UoKGFjYywgdHlwZSkgPT4ge1xuICAgICAgICAgICAgaWYobW9kZWwuY29uc2VudFt0eXBlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgYWNjW3R5cGVdID0gT2JqZWN0LmFzc2lnbih7fSwgbW9kZWwudHlwZXNbdHlwZV0sIHtcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogbW9kZWwuY29uc2VudFt0eXBlXVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGFjY1t0eXBlXSA9IG1vZGVsLnR5cGVzW3R5cGVdO1xuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfSwge30pXG4gICAgfSlcbn07XG5cbmV4cG9ydCBjb25zdCBzaG91bGRFeGVjdXRlID0gZSA9PiAoISFlLmtleUNvZGUgJiYgIVRSSUdHRVJfS0VZQ09ERVMuaW5jbHVkZXMoZS5rZXlDb2RlKSkgfHwgIShlLndoaWNoID09PSAzIHx8IGUuYnV0dG9uID09PSAyKTsiXX0=
