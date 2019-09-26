(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _src = require('../../src');

var _src2 = _interopRequireDefault(_src);

var _utils = require('../../src/lib/utils');

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

window.addEventListener('DOMContentLoaded', function () {
    _src2.default.init({
        secure: true,
        domain: '',
        policyURL: '/',
        necessary: [function () {
            console.log('Necessary fn');
            (0, _utils.writeCookie)({
                settings: {
                    name: '.Test.NecessaryCookie',
                    expiry: 3
                },
                consent: '666'
            });
        }],
        types: {
            'performance': {
                title: 'Performance preferences',
                description: 'Performance cookies are used to measure the performance of our website and make improvements. Your personal data is not identified.',
                labels: {
                    yes: 'Pages you visit and actions you take will be measured and used to improve the service',
                    no: 'Pages you visit and actions you take will not be measured and used to improve the service'
                },
                fns: [function () {
                    console.log('Performance fn');
                    (0, _utils.writeCookie)({
                        settings: {
                            name: '.Test.PerformanceCookie',
                            expiry: 3
                        },
                        consent: '666'
                    });
                }]
            },
            'ads': {
                title: 'Set your personalised ads preferences',
                description: 'We work with advertising partners to show you ads for our products and services across the web.  You can choose whether we collect and share that data with our partners below. ',
                labels: {
                    yes: 'Our partners might serve you ads knowing you have visited our website',
                    no: 'Our partners will still serve you ads, but they will not know you have visited out website'
                },
                fns: [function () {
                    console.log('Ads fn');
                    (0, _utils.writeCookie)({
                        settings: {
                            name: '.Test.AdsCookie',
                            expiry: 3
                        },
                        consent: '666'
                    });
                }]
            }
        }
    });
});

},{"../../src":2,"../../src/lib/utils":10}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defaults = require('./lib/defaults');

var _defaults2 = _interopRequireDefault(_defaults);

var _factory = require('./lib/factory');

var _factory2 = _interopRequireDefault(_factory);

var _utils = require('./lib/utils');

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = {
    init: function init(opts) {
        return (0, _factory2.default)(Object.assign({}, _defaults2.default, opts, {
            types: Object.keys(opts.types).reduce((0, _utils.composeTypes)(opts), _defaults2.default.types)
        }));
    }
};

},{"./lib/defaults":5,"./lib/factory":6,"./lib/utils":10}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.necessary = exports.apply = undefined;

var _reducers = require('./reducers');

var apply = exports.apply = function apply(Store) {
    return function (state) {
        Object.keys(state.consent).forEach(function (key) {
            if (state.settings.types[key].executed === true) return;
            if (state.consent[key] && Boolean(state.consent[key])) {
                state.settings.types[key].fns.forEach(function (fn) {
                    return fn(state);
                });
            }
        });
        Store.update(_reducers.updateExecuted, Object.keys(state.settings.types).reduce(function (acc, type) {
            acc[type] = Object.assign({}, state.settings.types[type], { executed: state.settings.types[type].executed || state.consent[type] && Boolean(state.consent[type]) });
            return acc;
        }, {}));
    };
};

var necessary = exports.necessary = function necessary(state) {
    state.settings.necessary.forEach(function (fn) {
        return fn(state);
    });
};

},{"./reducers":7}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var TRIGGER_EVENTS = exports.TRIGGER_EVENTS = window.PointerEvent ? ['pointerup', 'keydown'] : ['ontouchstart' in window ? 'touchstart' : 'click', 'keydown'];

var TRIGGER_KEYCODES = exports.TRIGGER_KEYCODES = [13, 32];

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utils = require('./utils');

exports.default = {
	name: '.CookiePreferences',
	path: '',
	domain: window.location.hostname === 'localhost' ? '' : '.' + (0, _utils.removeSubdomain)(window.location.hostname),
	secure: true,
	expiry: 365,
	types: {},
	necessary: [],
	bannerTrigger: false,
	policyURL: '/cookie-policy',
	classNames: {
		banner: 'privacy-banner',
		acceptBtn: 'privacy-banner__accept',
		submitBtn: 'privacy-banner__submit',
		field: 'privacy-banner__field',
		form: 'privacy-banner__form',
		fieldset: 'privacy-banner__fieldset',
		legend: 'privacy-banner__legend',
		formContainer: 'privacy-banner__form-container',
		formMessage: 'privacy-banner__form-msg',
		title: 'privacy-banner__form-title',
		description: 'privacy-banner__form-description'
	},
	savedMessage: 'Your settings have been saved.',
	bannerTemplate: function bannerTemplate(model) {
		return '<section role="dialog" aria-live="polite" aria-label="You privacy" class="' + model.classNames.banner + '">\n\t\t\t<div class="privacy-content">\n\t\t\t\t<div class="wrap">\n\t\t\t\t\t<div class="row">\n\t\t\t\t\t\t<!--googleoff: all-->\n\t\t\t\t\t\t<div class="privacy-banner__title">Cookies</div>\n\t\t\t\t\t\t<p>We use cookies to improve your experience on our site and show you personalised advertising.</p>\n\t\t\t\t\t\t<p>Find out more from our <a class="privacy-banner__link" rel="noopener noreferrer nofollow" href="/privacy-policy">privacy policy</a> and <a class="privacy-banner__link" rel="noopener noreferrer nofollow" href="' + model.policyURL + '">cookie policy</a>.</p>\n\t\t\t\t\t\t<button class="btn btn--primary ' + model.classNames.acceptBtn + '">Accept and close</button>\n\t\t\t\t\t\t<a class="privacy-banner__link" rel="noopener noreferrer nofollow" href="' + model.policyURL + '">Your options</a>\n\t\t\t\t\t\t<!--googleon: all-->\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</section>';
	},
	messageTemplate: function messageTemplate(model) {
		return '<div class="' + model.settings.classNames.formMessage + '" aria-role="alert">' + model.settings.savedMessage + '</div>';
	},
	formTemplate: function formTemplate(model) {
		return '<form class="' + model.settings.classNames.form + '" novalidate>\n\t\t\t\t' + Object.keys(model.settings.types).map(function (type) {
			return '<fieldset class="' + model.settings.classNames.fieldset + '">\n\t\t\t\t<legend class="' + model.settings.classNames.legend + '">\n\t\t\t\t\t<span class="' + model.settings.classNames.title + '">' + model.settings.types[type].title + '</span>\n\t\t\t\t\t<span class="' + model.settings.classNames.description + '">' + model.settings.types[type].description + '</span>\n\t\t\t\t</legend>\n\t\t\t\t<div class="form-row">\n\t\t\t\t\t<div class="relative">\n\t\t\t\t\t\t<label class="privacy-banner__label">\n\t\t\t\t\t\t\t<input\n\t\t\t\t\t\t\t\tclass="' + model.settings.classNames.field + '"\n\t\t\t\t\t\t\t\ttype="radio"\n\t\t\t\t\t\t\t\tname="privacy-' + type.split(' ')[0].replace(' ', '-') + '"\n\t\t\t\t\t\t\t\tvalue="1"\n\t\t\t\t\t\t\t\t' + (model.consent[type] === 1 ? ' checked' : '') + '>\n\t\t\t\t\t\t\t<span class="privacy-banner__label-text">I am OK with this</span>\n\t\t\t\t\t\t\t<span class="privacy-banner__label-description">' + model.settings.types[type].labels.yes + '</span>\n\t\t\t\t\t\t</label>    \n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="form-row">\n\t\t\t\t\t<div class="relative">\n\t\t\t\t\t\t<label class="privacy-banner__label">\n\t\t\t\t\t\t\t<input\n\t\t\t\t\t\t\t\tclass="' + model.settings.classNames.field + '"\n\t\t\t\t\t\t\t\ttype="radio"\n\t\t\t\t\t\t\t\tname="privacy-' + type.split(' ')[0].replace(' ', '-') + '"\n\t\t\t\t\t\t\t\tvalue="0"\n\t\t\t\t\t\t\t\t' + (model.consent[type] === 0 ? ' checked' : '') + '>\n\t\t\t\t\t\t\t<span class="privacy-banner__label-text">No thank you</span>\n\t\t\t\t\t\t\t<span class="privacy-banner__label-description">' + model.settings.types[type].labels.no + '</span>\n\t\t\t\t\t\t</label>    \n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</fieldset>';
		}).join('') + '\n\t\t\t<button class="' + model.settings.classNames.submitBtn + '"' + (Object.keys(model.consent).length === 0 ? ' disabled' : '') + '>Save my settings</button>\n\t\t</form>';
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

var _reducers = require('./reducers');

exports.default = function (settings) {
    if (!(0, _utils.cookiesEnabled)()) return;

    var Store = (0, _store.createStore)();
    var cookies = (0, _utils.readCookie)(settings);
    Store.update(_reducers.initialState, { settings: settings, consent: cookies ? JSON.parse(cookies.value) : {} }, [_consent.necessary, (0, _consent.apply)(Store), cookies ? _utils.noop : (0, _ui.initBanner)(Store), (0, _ui.initForm)(Store)]);

    return { getState: Store.getState };
};

},{"./consent":3,"./reducers":7,"./store":8,"./ui":9,"./utils":10}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var initialState = exports.initialState = function initialState(state, data) {
  return Object.assign({}, state, data);
};
var updateConsent = exports.updateConsent = function updateConsent(state, data) {
  return Object.assign({}, state, { consent: Object.assign({}, state.consent, data) });
};
var updateExecuted = exports.updateExecuted = function updateExecuted(state, data) {
  return Object.assign({}, state, { settings: Object.assign({}, state.settings, { types: Object.assign({}, state.settings.types, data) }) });
};

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var createStore = exports.createStore = function createStore() {
    //shared centralised validator state
    var state = {};

    //state getter
    var getState = function getState() {
        return state;
    };

    /**
     * Create next state by invoking reducer on current state
     * 
     * Execute side effects of state update, as passed in the update
     * 
     * @param reducer [Function] 
     * @param nextState [Object] New slice of state to combine with current state to create next state
     * @param effects [Array] Array of side effect functions to invoke after state update (DOM, operations, cmds...)
     */
    var update = function update(reducer, nextState, effects) {
        state = reducer(state, nextState);
        // console.log(state);
        if (!effects) return;
        effects.forEach(function (effect) {
            effect(state);
        });
    };

    return { update: update, getState: getState };
};

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.renderMessage = exports.initForm = exports.initBanner = undefined;

var _utils = require('./utils');

var _constants = require('./constants');

var _consent = require('./consent');

var _reducers = require('./reducers');

var initBanner = exports.initBanner = function initBanner(Store) {
    return function (state) {
        document.body.firstElementChild.insertAdjacentHTML('beforebegin', state.settings.bannerTemplate(state.settings));
        var banner = document.querySelector('.' + state.settings.classNames.banner);
        var acceptBtn = document.querySelector('.' + state.settings.classNames.acceptBtn);

        _constants.TRIGGER_EVENTS.forEach(function (ev) {
            acceptBtn.addEventListener(ev, function (e) {
                if ((0, _utils.shouldReturn)(e)) return;

                Store.update(_reducers.updateConsent, Object.keys(state.settings.types).reduce(function (acc, type) {
                    acc[type] = 1;
                    return acc;
                }, {}), [_utils.writeCookie, (0, _consent.apply)(Store), removeBanner(banner), initForm(Store)]);
            });
        });
    };
};

var removeBanner = function removeBanner(banner) {
    return function () {
        return banner && banner.parentNode && banner.parentNode.removeChild(banner);
    };
};

var initForm = exports.initForm = function initForm(Store) {
    return function (state) {
        var formContainer = document.querySelector('.' + state.settings.classNames.formContainer);
        if (!formContainer) return;

        formContainer.innerHTML = state.settings.formTemplate(state);

        var form = document.querySelector('.' + state.settings.classNames.form);
        var banner = document.querySelector('.' + state.settings.classNames.banner);
        var button = document.querySelector('.' + state.settings.classNames.submitBtn);
        var groups = [].slice.call(document.querySelectorAll('.' + state.settings.classNames.field)).reduce(function (groups, field) {
            var groupName = field.getAttribute('name').replace('privacy-', '');
            if (groups[groupName]) groups[groupName].push(field);else groups[groupName] = [field];
            return groups;
        }, {});

        var extractConsent = function extractConsent() {
            return Object.keys(groups).reduce(function (acc, key) {
                var value = groups[key].reduce(_utils.groupValueReducer, '');
                if (value) acc[key] = parseInt(value);
                return acc;
            }, {});
        };

        var enableButton = function enableButton(e) {
            if (Object.keys(extractConsent()).length !== Object.keys(groups).length) return;
            button.removeAttribute('disabled');
            form.removeEventListener('change', enableButton);
        };
        button.hasAttribute('disabled') && form.addEventListener('change', enableButton);

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            Store.update(_reducers.updateConsent, extractConsent(), [_utils.deleteCookies, _utils.writeCookie, (0, _consent.apply)(Store), removeBanner(banner), renderMessage(button)]);
        });
    };
};

var renderMessage = exports.renderMessage = function renderMessage(button) {
    return function (state) {
        button.insertAdjacentHTML('afterend', state.settings.messageTemplate(state));
        button.setAttribute('disabled', 'disabled');
        window.setTimeout(function () {
            button.parentNode.removeChild(button.nextElementSibling);
            button.removeAttribute('disabled');
        }, 3000);
    };
};

},{"./consent":3,"./constants":4,"./reducers":7,"./utils":10}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.removeSubdomain = exports.groupValueReducer = exports.isCheckable = exports.noop = exports.composeTypes = exports.shouldReturn = exports.deleteCookies = exports.readCookie = exports.writeCookie = exports.cookiesEnabled = undefined;

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
    document.cookie = [state.settings.name + '=' + JSON.stringify(state.consent) + ';', 'expires=' + new Date(new Date().getTime() + state.settings.expiry * 24 * 60 * 60 * 1000).toGMTString() + ';', state.settings.path ? 'path=' + state.settings.path : '', state.settings.domain ? 'domain=' + state.settings.domain : '', state.settings.secure ? 'secure' : ''].join('');
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

var shouldReturn = exports.shouldReturn = function shouldReturn(e) {
    return !!e.keyCode && !~_constants.TRIGGER_KEYCODES.indexOf(e.keyCode) || e.which && e.which === 3;
};

var composeTypes = exports.composeTypes = function composeTypes(opts) {
    return function (acc, curr) {
        if (acc[curr]) {
            acc[curr] = Object.assign({}, acc[curr], {
                fns: acc[curr].fns.concat(opts.types[curr].fns)
            });
        } else acc[curr] = opts.types[curr];
        return acc;
    };
};

var noop = exports.noop = function noop() {};

var isCheckable = exports.isCheckable = function isCheckable(field) {
    return (/radio|checkbox/i.test(field.type)
    );
};

var hasValue = function hasValue(input) {
    return input.value !== undefined && input.value !== null && input.value.length > 0;
};

var groupValueReducer = exports.groupValueReducer = function groupValueReducer(acc, input) {
    if (!isCheckable(input) && hasValue(input)) acc = input.value;
    if (isCheckable(input) && input.checked) {
        if (Array.isArray(acc)) acc.push(input.value);else acc = [input.value];
    }
    return acc;
};

var firstTLDs = "ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|be|bf|bg|bh|bi|bj|bm|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|cl|cm|cn|co|cr|cu|cv|cw|cx|cz|de|dj|dk|dm|do|dz|ec|ee|eg|es|et|eu|fi|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|im|in|io|iq|ir|is|it|je|jo|jp|kg|ki|km|kn|kp|kr|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|na|nc|ne|nf|ng|nl|no|nr|nu|nz|om|pa|pe|pf|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sx|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|yt".split('|');
var secondTLDs = "azurewebsites|com|edu|gov|net|mil|org|nom|sch|caa|res|off|gob|int|tur|ip6|uri|urn|asn|act|nsw|qld|tas|vic|pro|biz|adm|adv|agr|arq|art|ato|bio|bmd|cim|cng|cnt|ecn|eco|emp|eng|esp|etc|eti|far|fnd|fot|fst|g12|ggf|imb|ind|inf|jor|jus|leg|lel|mat|med|mus|not|ntr|odo|ppg|psc|psi|qsl|rec|slg|srv|teo|tmp|trd|vet|zlg|web|ltd|sld|pol|fin|k12|lib|pri|aip|fie|eun|sci|prd|cci|pvt|mod|idv|rel|sex|gen|nic|abr|bas|cal|cam|emr|fvg|laz|lig|lom|mar|mol|pmn|pug|sar|sic|taa|tos|umb|vao|vda|ven|mie|北海道|和歌山|神奈川|鹿児島|ass|rep|tra|per|ngo|soc|grp|plc|its|air|and|bus|can|ddr|jfk|mad|nrw|nyc|ski|spy|tcm|ulm|usa|war|fhs|vgs|dep|eid|fet|fla|flå|gol|hof|hol|sel|vik|cri|iwi|ing|abo|fam|gok|gon|gop|gos|aid|atm|gsm|sos|elk|waw|est|aca|bar|cpa|jur|law|sec|plo|www|bir|cbg|jar|khv|msk|nov|nsk|ptz|rnd|spb|stv|tom|tsk|udm|vrn|cmw|kms|nkz|snz|pub|fhv|red|ens|nat|rns|rnu|bbs|tel|bel|kep|nhs|dni|fed|isa|nsn|gub|e12|tec|орг|обр|упр|alt|nis|jpn|mex|ath|iki|nid|gda|inc".split('|');

var removeSubdomain = exports.removeSubdomain = function removeSubdomain(s) {
    s = s.replace(/^www\./, '');
    var parts = s.split('.');

    while (parts.length > 3) {
        parts.shift();
    }

    if (parts.length === 3 && secondTLDs.indexOf(parts[1]) === -1 && firstTLDs.indexOf(parts[2]) === -1) {
        parts.shift();
    }

    return parts.join('.');
};

},{"./constants":4}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlL3NyYy9hcHAuanMiLCJzcmMvaW5kZXguanMiLCJzcmMvbGliL2NvbnNlbnQuanMiLCJzcmMvbGliL2NvbnN0YW50cy5qcyIsInNyYy9saWIvZGVmYXVsdHMuanMiLCJzcmMvbGliL2ZhY3RvcnkuanMiLCJzcmMvbGliL3JlZHVjZXJzLmpzIiwic3JjL2xpYi9zdG9yZS5qcyIsInNyYy9saWIvdWkuanMiLCJzcmMvbGliL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFBLE9BQUEsUUFBQSxXQUFBLENBQUE7Ozs7QUFDQSxJQUFBLFNBQUEsUUFBQSxxQkFBQSxDQUFBOzs7Ozs7QUFFQSxPQUFBLGdCQUFBLENBQUEsa0JBQUEsRUFBNEMsWUFBTTtBQUM5QyxVQUFBLE9BQUEsQ0FBQSxJQUFBLENBQWtCO0FBQ2QsZ0JBRGMsSUFBQTtBQUVkLG1CQUZjLEdBQUE7QUFHZCxtQkFBVyxDQUFFLFlBQU07QUFDZixvQkFBQSxHQUFBLENBQUEsY0FBQTtBQUNBLGFBQUEsR0FBQSxPQUFBLFdBQUEsRUFBWTtBQUNSLDBCQUFVO0FBQ04sMEJBRE0sdUJBQUE7QUFFTiw0QkFBUTtBQUZGLGlCQURGO0FBS1IseUJBQVM7QUFMRCxhQUFaO0FBTFUsU0FHSCxDQUhHO0FBYWQsZUFBTztBQUNILDJCQUFlO0FBQ1gsdUJBRFcseUJBQUE7QUFFWCw2QkFGVyxxSUFBQTtBQUdYLHdCQUFRO0FBQ0oseUJBREksdUZBQUE7QUFFSix3QkFBSTtBQUZBLGlCQUhHO0FBT1gscUJBQUssQ0FDRCxZQUFNO0FBQ0YsNEJBQUEsR0FBQSxDQUFBLGdCQUFBO0FBQ0EscUJBQUEsR0FBQSxPQUFBLFdBQUEsRUFBWTtBQUNSLGtDQUFVO0FBQ04sa0NBRE0seUJBQUE7QUFFTixvQ0FBUTtBQUZGLHlCQURGO0FBS1IsaUNBQVM7QUFMRCxxQkFBWjtBQUhILGlCQUFBO0FBUE0sYUFEWjtBQXFCSCxtQkFBTztBQUNILHVCQURHLHVDQUFBO0FBRUgsNkJBRkcsa0xBQUE7QUFHSCx3QkFBUTtBQUNKLHlCQURJLHVFQUFBO0FBRUosd0JBQUk7QUFGQSxpQkFITDtBQU9ILHFCQUFLLENBQ0QsWUFBTTtBQUNGLDRCQUFBLEdBQUEsQ0FBQSxRQUFBO0FBQ0EscUJBQUEsR0FBQSxPQUFBLFdBQUEsRUFBWTtBQUNSLGtDQUFVO0FBQ04sa0NBRE0saUJBQUE7QUFFTixvQ0FBUTtBQUZGLHlCQURGO0FBS1IsaUNBQVM7QUFMRCxxQkFBWjtBQUhILGlCQUFBO0FBUEY7QUFyQko7QUFiTyxLQUFsQjtBQURKLENBQUE7Ozs7Ozs7OztBQ0hBLElBQUEsWUFBQSxRQUFBLGdCQUFBLENBQUE7Ozs7QUFDQSxJQUFBLFdBQUEsUUFBQSxlQUFBLENBQUE7Ozs7QUFDQSxJQUFBLFNBQUEsUUFBQSxhQUFBLENBQUE7Ozs7OztrQkFFZTtBQUNYLFVBQU0sU0FBQSxJQUFBLENBQUEsSUFBQSxFQUFBO0FBQUEsZUFBUSxDQUFBLEdBQUEsVUFBQSxPQUFBLEVBQVEsT0FBQSxNQUFBLENBQUEsRUFBQSxFQUFrQixXQUFsQixPQUFBLEVBQUEsSUFBQSxFQUFrQztBQUNwRCxtQkFBTyxPQUFBLElBQUEsQ0FBWSxLQUFaLEtBQUEsRUFBQSxNQUFBLENBQStCLENBQUEsR0FBQSxPQUFBLFlBQUEsRUFBL0IsSUFBK0IsQ0FBL0IsRUFBbUQsV0FBQSxPQUFBLENBQW5ELEtBQUE7QUFENkMsU0FBbEMsQ0FBUixDQUFSO0FBQUE7QUFESyxDOzs7Ozs7Ozs7O0FDSmYsSUFBQSxZQUFBLFFBQUEsWUFBQSxDQUFBOztBQUVPLElBQU0sUUFBQSxRQUFBLEtBQUEsR0FBUSxTQUFSLEtBQVEsQ0FBQSxLQUFBLEVBQUE7QUFBQSxXQUFTLFVBQUEsS0FBQSxFQUFTO0FBQ25DLGVBQUEsSUFBQSxDQUFZLE1BQVosT0FBQSxFQUFBLE9BQUEsQ0FBbUMsVUFBQSxHQUFBLEVBQU87QUFDdEMsZ0JBQUcsTUFBQSxRQUFBLENBQUEsS0FBQSxDQUFBLEdBQUEsRUFBQSxRQUFBLEtBQUgsSUFBQSxFQUFnRDtBQUNoRCxnQkFBRyxNQUFBLE9BQUEsQ0FBQSxHQUFBLEtBQXNCLFFBQVEsTUFBQSxPQUFBLENBQWpDLEdBQWlDLENBQVIsQ0FBekIsRUFBc0Q7QUFDbEQsc0JBQUEsUUFBQSxDQUFBLEtBQUEsQ0FBQSxHQUFBLEVBQUEsR0FBQSxDQUFBLE9BQUEsQ0FBc0MsVUFBQSxFQUFBLEVBQUE7QUFBQSwyQkFBTSxHQUFOLEtBQU0sQ0FBTjtBQUF0QyxpQkFBQTtBQUNIO0FBSkwsU0FBQTtBQU1BLGNBQUEsTUFBQSxDQUFhLFVBQWIsY0FBQSxFQUE2QixPQUFBLElBQUEsQ0FBWSxNQUFBLFFBQUEsQ0FBWixLQUFBLEVBQUEsTUFBQSxDQUF5QyxVQUFBLEdBQUEsRUFBQSxJQUFBLEVBQWU7QUFDakYsZ0JBQUEsSUFBQSxJQUFZLE9BQUEsTUFBQSxDQUFBLEVBQUEsRUFBa0IsTUFBQSxRQUFBLENBQUEsS0FBQSxDQUFsQixJQUFrQixDQUFsQixFQUE4QyxFQUFFLFVBQVUsTUFBQSxRQUFBLENBQUEsS0FBQSxDQUFBLElBQUEsRUFBQSxRQUFBLElBQXdDLE1BQUEsT0FBQSxDQUFBLElBQUEsS0FBdUIsUUFBUSxNQUFBLE9BQUEsQ0FBN0ksSUFBNkksQ0FBUixDQUEzRSxFQUE5QyxDQUFaO0FBQ0EsbUJBQUEsR0FBQTtBQUZ5QixTQUFBLEVBQTdCLEVBQTZCLENBQTdCO0FBUGlCLEtBQUE7QUFBZCxDQUFBOztBQWFBLElBQU0sWUFBQSxRQUFBLFNBQUEsR0FBWSxTQUFaLFNBQVksQ0FBQSxLQUFBLEVBQVM7QUFDOUIsVUFBQSxRQUFBLENBQUEsU0FBQSxDQUFBLE9BQUEsQ0FBaUMsVUFBQSxFQUFBLEVBQUE7QUFBQSxlQUFNLEdBQU4sS0FBTSxDQUFOO0FBQWpDLEtBQUE7QUFERyxDQUFBOzs7Ozs7OztBQ2ZBLElBQU0saUJBQUEsUUFBQSxjQUFBLEdBQWlCLE9BQUEsWUFBQSxHQUFzQixDQUFBLFdBQUEsRUFBdEIsU0FBc0IsQ0FBdEIsR0FBaUQsQ0FBQyxrQkFBQSxNQUFBLEdBQUEsWUFBQSxHQUFELE9BQUEsRUFBeEUsU0FBd0UsQ0FBeEU7O0FBRUEsSUFBTSxtQkFBQSxRQUFBLGdCQUFBLEdBQW1CLENBQUEsRUFBQSxFQUF6QixFQUF5QixDQUF6Qjs7Ozs7Ozs7O0FDRlAsSUFBQSxTQUFBLFFBQUEsU0FBQSxDQUFBOztrQkFFZTtBQUNkLE9BRGMsb0JBQUE7QUFFZCxPQUZjLEVBQUE7QUFHZCxTQUFRLE9BQUEsUUFBQSxDQUFBLFFBQUEsS0FBQSxXQUFBLEdBQUEsRUFBQSxHQUFBLE1BQW9ELENBQUEsR0FBQSxPQUFBLGVBQUEsRUFBZ0IsT0FBQSxRQUFBLENBSDlELFFBRzhDLENBSDlDO0FBSWQsU0FKYyxJQUFBO0FBS2QsU0FMYyxHQUFBO0FBTWQsUUFOYyxFQUFBO0FBT2QsWUFQYyxFQUFBO0FBUWQsZ0JBUmMsS0FBQTtBQVNkLFlBVGMsZ0JBQUE7QUFVZCxhQUFZO0FBQ1gsVUFEVyxnQkFBQTtBQUVYLGFBRlcsd0JBQUE7QUFHWCxhQUhXLHdCQUFBO0FBSVgsU0FKVyx1QkFBQTtBQUtYLFFBTFcsc0JBQUE7QUFNWCxZQU5XLDBCQUFBO0FBT1gsVUFQVyx3QkFBQTtBQVFYLGlCQVJXLGdDQUFBO0FBU1gsZUFUVywwQkFBQTtBQVVYLFNBVlcsNEJBQUE7QUFXWCxlQUFhO0FBWEYsRUFWRTtBQXVCZCxlQXZCYyxnQ0FBQTtBQUFBLGlCQUFBLFNBQUEsY0FBQSxDQUFBLEtBQUEsRUF3Qk87QUFDcEIsU0FBQSwrRUFBb0YsTUFBQSxVQUFBLENBQXBGLE1BQUEsR0FBQSxzaEJBQUEsR0FPME4sTUFQMU4sU0FBQSxHQUFBLHdFQUFBLEdBUXNDLE1BQUEsVUFBQSxDQVJ0QyxTQUFBLEdBQUEsb0hBQUEsR0FTK0UsTUFUL0UsU0FBQSxHQUFBLHNIQUFBO0FBekJhLEVBQUE7QUFBQSxrQkFBQSxTQUFBLGVBQUEsQ0FBQSxLQUFBLEVBeUNRO0FBQ3JCLFNBQUEsaUJBQXNCLE1BQUEsUUFBQSxDQUFBLFVBQUEsQ0FBdEIsV0FBQSxHQUFBLHNCQUFBLEdBQWtGLE1BQUEsUUFBQSxDQUFsRixZQUFBLEdBQUEsUUFBQTtBQTFDYSxFQUFBO0FBQUEsZUFBQSxTQUFBLFlBQUEsQ0FBQSxLQUFBLEVBNENLO0FBQ2xCLFNBQUEsa0JBQXVCLE1BQUEsUUFBQSxDQUFBLFVBQUEsQ0FBdkIsSUFBQSxHQUFBLHlCQUFBLEdBQ0ksT0FBQSxJQUFBLENBQVksTUFBQSxRQUFBLENBQVosS0FBQSxFQUFBLEdBQUEsQ0FBc0MsVUFBQSxJQUFBLEVBQUE7QUFBQSxVQUFBLHNCQUE0QixNQUFBLFFBQUEsQ0FBQSxVQUFBLENBQTVCLFFBQUEsR0FBQSw2QkFBQSxHQUN2QixNQUFBLFFBQUEsQ0FBQSxVQUFBLENBRHVCLE1BQUEsR0FBQSw2QkFBQSxHQUV4QixNQUFBLFFBQUEsQ0FBQSxVQUFBLENBRndCLEtBQUEsR0FBQSxJQUFBLEdBRVksTUFBQSxRQUFBLENBQUEsS0FBQSxDQUFBLElBQUEsRUFGWixLQUFBLEdBQUEsa0NBQUEsR0FHeEIsTUFBQSxRQUFBLENBQUEsVUFBQSxDQUh3QixXQUFBLEdBQUEsSUFBQSxHQUdrQixNQUFBLFFBQUEsQ0FBQSxLQUFBLENBQUEsSUFBQSxFQUhsQixXQUFBLEdBQUEsZ01BQUEsR0FTM0IsTUFBQSxRQUFBLENBQUEsVUFBQSxDQVQyQixLQUFBLEdBQUEsaUVBQUEsR0FXcEIsS0FBQSxLQUFBLENBQUEsR0FBQSxFQUFBLENBQUEsRUFBQSxPQUFBLENBQUEsR0FBQSxFQVhvQixHQVdwQixDQVhvQixHQUFBLGdEQUFBLElBYWxDLE1BQUEsT0FBQSxDQUFBLElBQUEsTUFBQSxDQUFBLEdBQUEsVUFBQSxHQWJrQyxFQUFBLElBQUEsb0pBQUEsR0FlYSxNQUFBLFFBQUEsQ0FBQSxLQUFBLENBQUEsSUFBQSxFQUFBLE1BQUEsQ0FmYixHQUFBLEdBQUEseU9BQUEsR0F1QjNCLE1BQUEsUUFBQSxDQUFBLFVBQUEsQ0F2QjJCLEtBQUEsR0FBQSxpRUFBQSxHQXlCcEIsS0FBQSxLQUFBLENBQUEsR0FBQSxFQUFBLENBQUEsRUFBQSxPQUFBLENBQUEsR0FBQSxFQXpCb0IsR0F5QnBCLENBekJvQixHQUFBLGdEQUFBLElBMkJsQyxNQUFBLE9BQUEsQ0FBQSxJQUFBLE1BQUEsQ0FBQSxHQUFBLFVBQUEsR0EzQmtDLEVBQUEsSUFBQSwrSUFBQSxHQTZCYSxNQUFBLFFBQUEsQ0FBQSxLQUFBLENBQUEsSUFBQSxFQUFBLE1BQUEsQ0E3QmIsRUFBQSxHQUFBLHdGQUFBO0FBQXRDLEdBQUEsRUFBQSxJQUFBLENBREosRUFDSSxDQURKLEdBQUEseUJBQUEsR0FtQ2tCLE1BQUEsUUFBQSxDQUFBLFVBQUEsQ0FuQ2xCLFNBQUEsR0FBQSxHQUFBLElBbUN5RCxPQUFBLElBQUEsQ0FBWSxNQUFaLE9BQUEsRUFBQSxNQUFBLEtBQUEsQ0FBQSxHQUFBLFdBQUEsR0FuQ3pELEVBQUEsSUFBQSx5Q0FBQTtBQXFDQTtBQWxGYSxDOzs7Ozs7Ozs7QUNGZixJQUFBLFNBQUEsUUFBQSxTQUFBLENBQUE7O0FBQ0EsSUFBQSxNQUFBLFFBQUEsTUFBQSxDQUFBOztBQUNBLElBQUEsV0FBQSxRQUFBLFdBQUEsQ0FBQTs7QUFDQSxJQUFBLFNBQUEsUUFBQSxTQUFBLENBQUE7O0FBQ0EsSUFBQSxZQUFBLFFBQUEsWUFBQSxDQUFBOztrQkFFZSxVQUFBLFFBQUEsRUFBWTtBQUN2QixRQUFHLENBQUMsQ0FBQSxHQUFBLE9BQUosY0FBSSxHQUFKLEVBQXNCOztBQUV0QixRQUFNLFFBQVEsQ0FBQSxHQUFBLE9BQWQsV0FBYyxHQUFkO0FBQ0EsUUFBTSxVQUFVLENBQUEsR0FBQSxPQUFBLFVBQUEsRUFBaEIsUUFBZ0IsQ0FBaEI7QUFDQSxVQUFBLE1BQUEsQ0FDSSxVQURKLFlBQUEsRUFFSSxFQUFFLFVBQUYsUUFBQSxFQUFZLFNBQVMsVUFBVSxLQUFBLEtBQUEsQ0FBVyxRQUFyQixLQUFVLENBQVYsR0FGekIsRUFFSSxFQUZKLEVBR0ksQ0FBRSxTQUFGLFNBQUEsRUFBYSxDQUFBLEdBQUEsU0FBQSxLQUFBLEVBQWIsS0FBYSxDQUFiLEVBQTJCLFVBQVUsT0FBVixJQUFBLEdBQWlCLENBQUEsR0FBQSxJQUFBLFVBQUEsRUFBNUMsS0FBNEMsQ0FBNUMsRUFBK0QsQ0FBQSxHQUFBLElBQUEsUUFBQSxFQUhuRSxLQUdtRSxDQUEvRCxDQUhKOztBQU1BLFdBQU8sRUFBRSxVQUFVLE1BQW5CLFFBQU8sRUFBUDs7Ozs7Ozs7O0FDakJHLElBQU0sZUFBQSxRQUFBLFlBQUEsR0FBZSxTQUFmLFlBQWUsQ0FBQSxLQUFBLEVBQUEsSUFBQSxFQUFBO0FBQUEsU0FBaUIsT0FBQSxNQUFBLENBQUEsRUFBQSxFQUFBLEtBQUEsRUFBakIsSUFBaUIsQ0FBakI7QUFBckIsQ0FBQTtBQUNBLElBQU0sZ0JBQUEsUUFBQSxhQUFBLEdBQWdCLFNBQWhCLGFBQWdCLENBQUEsS0FBQSxFQUFBLElBQUEsRUFBQTtBQUFBLFNBQWlCLE9BQUEsTUFBQSxDQUFBLEVBQUEsRUFBQSxLQUFBLEVBQXlCLEVBQUUsU0FBUyxPQUFBLE1BQUEsQ0FBQSxFQUFBLEVBQWtCLE1BQWxCLE9BQUEsRUFBckQsSUFBcUQsQ0FBWCxFQUF6QixDQUFqQjtBQUF0QixDQUFBO0FBQ0EsSUFBTSxpQkFBQSxRQUFBLGNBQUEsR0FBaUIsU0FBakIsY0FBaUIsQ0FBQSxLQUFBLEVBQUEsSUFBQSxFQUFBO0FBQUEsU0FBaUIsT0FBQSxNQUFBLENBQUEsRUFBQSxFQUFBLEtBQUEsRUFBeUIsRUFBRSxVQUFVLE9BQUEsTUFBQSxDQUFBLEVBQUEsRUFBa0IsTUFBbEIsUUFBQSxFQUFrQyxFQUFFLE9BQU8sT0FBQSxNQUFBLENBQUEsRUFBQSxFQUFrQixNQUFBLFFBQUEsQ0FBbEIsS0FBQSxFQUFqRyxJQUFpRyxDQUFULEVBQWxDLENBQVosRUFBekIsQ0FBakI7QUFBdkIsQ0FBQTs7Ozs7Ozs7QUNGQSxJQUFNLGNBQUEsUUFBQSxXQUFBLEdBQWMsU0FBZCxXQUFjLEdBQU07QUFDN0I7QUFDQSxRQUFJLFFBQUosRUFBQTs7QUFFQTtBQUNBLFFBQU0sV0FBVyxTQUFYLFFBQVcsR0FBQTtBQUFBLGVBQUEsS0FBQTtBQUFqQixLQUFBOztBQUVBOzs7Ozs7Ozs7QUFTQSxRQUFNLFNBQVMsU0FBVCxNQUFTLENBQUEsT0FBQSxFQUFBLFNBQUEsRUFBQSxPQUFBLEVBQXNDO0FBQ2pELGdCQUFTLFFBQUEsS0FBQSxFQUFULFNBQVMsQ0FBVDtBQUNBO0FBQ0EsWUFBRyxDQUFILE9BQUEsRUFBYTtBQUNiLGdCQUFBLE9BQUEsQ0FBZ0IsVUFBQSxNQUFBLEVBQVU7QUFBRSxtQkFBQSxLQUFBO0FBQTVCLFNBQUE7QUFKSixLQUFBOztBQU9BLFdBQU8sRUFBRSxRQUFGLE1BQUEsRUFBVSxVQUFqQixRQUFPLEVBQVA7QUF2QkcsQ0FBQTs7Ozs7Ozs7OztBQ0FQLElBQUEsU0FBQSxRQUFBLFNBQUEsQ0FBQTs7QUFDQSxJQUFBLGFBQUEsUUFBQSxhQUFBLENBQUE7O0FBQ0EsSUFBQSxXQUFBLFFBQUEsV0FBQSxDQUFBOztBQUNBLElBQUEsWUFBQSxRQUFBLFlBQUEsQ0FBQTs7QUFFTyxJQUFNLGFBQUEsUUFBQSxVQUFBLEdBQWEsU0FBYixVQUFhLENBQUEsS0FBQSxFQUFBO0FBQUEsV0FBUyxVQUFBLEtBQUEsRUFBUztBQUN4QyxpQkFBQSxJQUFBLENBQUEsaUJBQUEsQ0FBQSxrQkFBQSxDQUFBLGFBQUEsRUFBa0UsTUFBQSxRQUFBLENBQUEsY0FBQSxDQUE4QixNQUFoRyxRQUFrRSxDQUFsRTtBQUNBLFlBQU0sU0FBUyxTQUFBLGFBQUEsQ0FBQSxNQUEyQixNQUFBLFFBQUEsQ0FBQSxVQUFBLENBQTFDLE1BQWUsQ0FBZjtBQUNBLFlBQU0sWUFBWSxTQUFBLGFBQUEsQ0FBQSxNQUEyQixNQUFBLFFBQUEsQ0FBQSxVQUFBLENBQTdDLFNBQWtCLENBQWxCOztBQUVBLG1CQUFBLGNBQUEsQ0FBQSxPQUFBLENBQXVCLFVBQUEsRUFBQSxFQUFNO0FBQ3pCLHNCQUFBLGdCQUFBLENBQUEsRUFBQSxFQUErQixVQUFBLENBQUEsRUFBSztBQUNoQyxvQkFBRyxDQUFBLEdBQUEsT0FBQSxZQUFBLEVBQUgsQ0FBRyxDQUFILEVBQW9COztBQUVwQixzQkFBQSxNQUFBLENBQ0ksVUFESixhQUFBLEVBRUksT0FBQSxJQUFBLENBQVksTUFBQSxRQUFBLENBQVosS0FBQSxFQUFBLE1BQUEsQ0FBeUMsVUFBQSxHQUFBLEVBQUEsSUFBQSxFQUFlO0FBQ3BELHdCQUFBLElBQUEsSUFBQSxDQUFBO0FBQ0EsMkJBQUEsR0FBQTtBQUZKLGlCQUFBLEVBRkosRUFFSSxDQUZKLEVBTUksQ0FDSSxPQURKLFdBQUEsRUFFSSxDQUFBLEdBQUEsU0FBQSxLQUFBLEVBRkosS0FFSSxDQUZKLEVBR0ksYUFISixNQUdJLENBSEosRUFJSSxTQVZSLEtBVVEsQ0FKSixDQU5KO0FBSEosYUFBQTtBQURKLFNBQUE7QUFMc0IsS0FBQTtBQUFuQixDQUFBOztBQTBCUCxJQUFNLGVBQWUsU0FBZixZQUFlLENBQUEsTUFBQSxFQUFBO0FBQUEsV0FBVSxZQUFBO0FBQUEsZUFBTyxVQUFVLE9BQVgsVUFBQyxJQUFnQyxPQUFBLFVBQUEsQ0FBQSxXQUFBLENBQXZDLE1BQXVDLENBQXZDO0FBQVYsS0FBQTtBQUFyQixDQUFBOztBQUVPLElBQU0sV0FBQSxRQUFBLFFBQUEsR0FBVyxTQUFYLFFBQVcsQ0FBQSxLQUFBLEVBQUE7QUFBQSxXQUFTLFVBQUEsS0FBQSxFQUFTO0FBQ3RDLFlBQU0sZ0JBQWdCLFNBQUEsYUFBQSxDQUFBLE1BQTJCLE1BQUEsUUFBQSxDQUFBLFVBQUEsQ0FBakQsYUFBc0IsQ0FBdEI7QUFDQSxZQUFHLENBQUgsYUFBQSxFQUFtQjs7QUFFbkIsc0JBQUEsU0FBQSxHQUEwQixNQUFBLFFBQUEsQ0FBQSxZQUFBLENBQTFCLEtBQTBCLENBQTFCOztBQUVBLFlBQU0sT0FBTyxTQUFBLGFBQUEsQ0FBQSxNQUEyQixNQUFBLFFBQUEsQ0FBQSxVQUFBLENBQXhDLElBQWEsQ0FBYjtBQUNBLFlBQU0sU0FBUyxTQUFBLGFBQUEsQ0FBQSxNQUEyQixNQUFBLFFBQUEsQ0FBQSxVQUFBLENBQTFDLE1BQWUsQ0FBZjtBQUNBLFlBQU0sU0FBUyxTQUFBLGFBQUEsQ0FBQSxNQUEyQixNQUFBLFFBQUEsQ0FBQSxVQUFBLENBQTFDLFNBQWUsQ0FBZjtBQUNBLFlBQU0sU0FBUyxHQUFBLEtBQUEsQ0FBQSxJQUFBLENBQWMsU0FBQSxnQkFBQSxDQUFBLE1BQThCLE1BQUEsUUFBQSxDQUFBLFVBQUEsQ0FBNUMsS0FBYyxDQUFkLEVBQUEsTUFBQSxDQUF1RixVQUFBLE1BQUEsRUFBQSxLQUFBLEVBQW1CO0FBQ3JILGdCQUFNLFlBQVksTUFBQSxZQUFBLENBQUEsTUFBQSxFQUFBLE9BQUEsQ0FBQSxVQUFBLEVBQWxCLEVBQWtCLENBQWxCO0FBQ0EsZ0JBQUcsT0FBSCxTQUFHLENBQUgsRUFBc0IsT0FBQSxTQUFBLEVBQUEsSUFBQSxDQUF0QixLQUFzQixFQUF0QixLQUNLLE9BQUEsU0FBQSxJQUFvQixDQUFwQixLQUFvQixDQUFwQjtBQUNMLG1CQUFBLE1BQUE7QUFKVyxTQUFBLEVBQWYsRUFBZSxDQUFmOztBQU9BLFlBQU0saUJBQWlCLFNBQWpCLGNBQWlCLEdBQUE7QUFBQSxtQkFBTSxPQUFBLElBQUEsQ0FBQSxNQUFBLEVBQUEsTUFBQSxDQUEyQixVQUFBLEdBQUEsRUFBQSxHQUFBLEVBQWM7QUFDbEUsb0JBQU0sUUFBUSxPQUFBLEdBQUEsRUFBQSxNQUFBLENBQW1CLE9BQW5CLGlCQUFBLEVBQWQsRUFBYyxDQUFkO0FBQ0Esb0JBQUEsS0FBQSxFQUFVLElBQUEsR0FBQSxJQUFXLFNBQVgsS0FBVyxDQUFYO0FBQ1YsdUJBQUEsR0FBQTtBQUh5QixhQUFBLEVBQU4sRUFBTSxDQUFOO0FBQXZCLFNBQUE7O0FBTUEsWUFBTSxlQUFlLFNBQWYsWUFBZSxDQUFBLENBQUEsRUFBSztBQUN0QixnQkFBRyxPQUFBLElBQUEsQ0FBQSxnQkFBQSxFQUFBLE1BQUEsS0FBeUMsT0FBQSxJQUFBLENBQUEsTUFBQSxFQUE1QyxNQUFBLEVBQXdFO0FBQ3hFLG1CQUFBLGVBQUEsQ0FBQSxVQUFBO0FBQ0EsaUJBQUEsbUJBQUEsQ0FBQSxRQUFBLEVBQUEsWUFBQTtBQUhKLFNBQUE7QUFLQSxlQUFBLFlBQUEsQ0FBQSxVQUFBLEtBQW1DLEtBQUEsZ0JBQUEsQ0FBQSxRQUFBLEVBQW5DLFlBQW1DLENBQW5DOztBQUVBLGFBQUEsZ0JBQUEsQ0FBQSxRQUFBLEVBQWdDLFVBQUEsQ0FBQSxFQUFLO0FBQ2pDLGNBQUEsY0FBQTtBQUNBLGtCQUFBLE1BQUEsQ0FDSSxVQURKLGFBQUEsRUFBQSxnQkFBQSxFQUdJLENBQ0ksT0FESixhQUFBLEVBRUksT0FGSixXQUFBLEVBR0ksQ0FBQSxHQUFBLFNBQUEsS0FBQSxFQUhKLEtBR0ksQ0FISixFQUlJLGFBSkosTUFJSSxDQUpKLEVBS0ksY0FSUixNQVFRLENBTEosQ0FISjtBQUZKLFNBQUE7QUE3Qm9CLEtBQUE7QUFBakIsQ0FBQTs7QUE2Q0EsSUFBTSxnQkFBQSxRQUFBLGFBQUEsR0FBZ0IsU0FBaEIsYUFBZ0IsQ0FBQSxNQUFBLEVBQUE7QUFBQSxXQUFVLFVBQUEsS0FBQSxFQUFTO0FBQzVDLGVBQUEsa0JBQUEsQ0FBQSxVQUFBLEVBQXNDLE1BQUEsUUFBQSxDQUFBLGVBQUEsQ0FBdEMsS0FBc0MsQ0FBdEM7QUFDQSxlQUFBLFlBQUEsQ0FBQSxVQUFBLEVBQUEsVUFBQTtBQUNBLGVBQUEsVUFBQSxDQUFrQixZQUFNO0FBQ3BCLG1CQUFBLFVBQUEsQ0FBQSxXQUFBLENBQThCLE9BQTlCLGtCQUFBO0FBQ0EsbUJBQUEsZUFBQSxDQUFBLFVBQUE7QUFGSixTQUFBLEVBQUEsSUFBQTtBQUh5QixLQUFBO0FBQXRCLENBQUE7Ozs7Ozs7Ozs7QUM5RVAsSUFBQSxhQUFBLFFBQUEsYUFBQSxDQUFBOztBQUVBO0FBQ08sSUFBTSxpQkFBQSxRQUFBLGNBQUEsR0FBaUIsU0FBakIsY0FBaUIsR0FBTTtBQUNoQyxRQUFJO0FBQ0EsaUJBQUEsTUFBQSxHQUFBLGNBQUE7QUFDQSxZQUFNLE1BQU0sU0FBQSxNQUFBLENBQUEsT0FBQSxDQUFBLGFBQUEsTUFBMkMsQ0FBdkQsQ0FBQTtBQUNBLGlCQUFBLE1BQUEsR0FBQSxxREFBQTtBQUNBLGVBQUEsR0FBQTtBQUpKLEtBQUEsQ0FNRSxPQUFBLENBQUEsRUFBVTtBQUNSLGVBQUEsS0FBQTtBQUNEO0FBVEEsQ0FBQTs7QUFZQSxJQUFNLGNBQUEsUUFBQSxXQUFBLEdBQWMsU0FBZCxXQUFjLENBQUEsS0FBQSxFQUFTO0FBQ2hDLGFBQUEsTUFBQSxHQUFrQixDQUNYLE1BQUEsUUFBQSxDQURXLElBQ1gsR0FEVyxHQUNYLEdBQXVCLEtBQUEsU0FBQSxDQUFlLE1BRDNCLE9BQ1ksQ0FBdkIsR0FEVyxHQUFBLEVBQUEsYUFFRixJQUFBLElBQUEsQ0FBUyxJQUFBLElBQUEsR0FBQSxPQUFBLEtBQXdCLE1BQUEsUUFBQSxDQUFBLE1BQUEsR0FBQSxFQUFBLEdBQUEsRUFBQSxHQUFBLEVBQUEsR0FBbEMsSUFBQyxFQUZFLFdBRUYsRUFGRSxHQUFBLEdBQUEsRUFHZCxNQUFBLFFBQUEsQ0FBQSxJQUFBLEdBQUEsVUFBOEIsTUFBQSxRQUFBLENBQTlCLElBQUEsR0FIYyxFQUFBLEVBSWQsTUFBQSxRQUFBLENBQUEsTUFBQSxHQUFBLFlBQWtDLE1BQUEsUUFBQSxDQUFsQyxNQUFBLEdBSmMsRUFBQSxFQUtkLE1BQUEsUUFBQSxDQUFBLE1BQUEsR0FBQSxRQUFBLEdBTGMsRUFBQSxFQUFBLElBQUEsQ0FBbEIsRUFBa0IsQ0FBbEI7QUFERyxDQUFBOztBQVVBLElBQU0sYUFBQSxRQUFBLFVBQUEsR0FBYSxTQUFiLFVBQWEsQ0FBQSxRQUFBLEVBQVk7QUFDbEMsUUFBTSxTQUFTLFNBQUEsTUFBQSxDQUFBLEtBQUEsQ0FBQSxJQUFBLEVBQUEsR0FBQSxDQUFnQyxVQUFBLElBQUEsRUFBQTtBQUFBLGVBQVMsRUFBRSxNQUFNLEtBQUEsS0FBQSxDQUFBLEdBQUEsRUFBUixDQUFRLENBQVIsRUFBNEIsT0FBTyxLQUFBLEtBQUEsQ0FBQSxHQUFBLEVBQTVDLENBQTRDLENBQW5DLEVBQVQ7QUFBaEMsS0FBQSxFQUFBLE1BQUEsQ0FBMEcsVUFBQSxJQUFBLEVBQUE7QUFBQSxlQUFRLEtBQUEsSUFBQSxLQUFjLFNBQXRCLElBQUE7QUFBMUcsS0FBQSxFQUFmLENBQWUsQ0FBZjtBQUNBLFdBQU8sV0FBQSxTQUFBLEdBQUEsTUFBQSxHQUFQLEtBQUE7QUFGRyxDQUFBOztBQUtQLElBQU0sZUFBZSxTQUFmLFlBQWUsQ0FBQSxLQUFBLEVBQUE7QUFBQSxXQUFTLFVBQUEsS0FBQSxFQUFBO0FBQUEsZUFBUyxTQUFBLE1BQUEsR0FBa0IsQ0FDbEQsTUFEa0QsSUFDbEQsR0FEa0QsR0FDbEQsR0FBYyxNQURvQyxLQUNsRCxHQURrRCxHQUFBLEVBQUEsYUFFMUMsTUFGMEMsTUFBQSxHQUFBLEdBQUEsRUFBQSxVQUc3QyxNQUFBLFFBQUEsQ0FINkMsSUFBQSxHQUFBLEdBQUEsRUFJckQsTUFBQSxRQUFBLENBQUEsTUFBQSxHQUFBLFlBQWtDLE1BQUEsUUFBQSxDQUFsQyxNQUFBLEdBQUEsR0FBQSxHQUpxRCxFQUFBLEVBS3JELE1BQUEsUUFBQSxDQUFBLE1BQUEsR0FBQSxRQUFBLEdBTHFELEVBQUEsRUFBQSxJQUFBLENBQTNCLEVBQTJCLENBQTNCO0FBQVQsS0FBQTtBQUFyQixDQUFBOztBQVFPLElBQU0sZ0JBQUEsUUFBQSxhQUFBLEdBQWdCLFNBQWhCLGFBQWdCLENBQUEsS0FBQSxFQUFTO0FBQ2xDLGFBQUEsTUFBQSxDQUFBLEtBQUEsQ0FBQSxJQUFBLEVBQUEsR0FBQSxDQUVTLFVBQUEsSUFBQSxFQUFBO0FBQUEsZUFBUztBQUNWLGtCQUFNLEtBQUEsS0FBQSxDQUFBLEdBQUEsRUFESSxDQUNKLENBREk7QUFFVixtQkFBTyxLQUFBLEtBQUEsQ0FBQSxHQUFBLEVBRkcsQ0FFSCxDQUZHO0FBR1Ysb0JBQVE7QUFIRSxTQUFUO0FBRlQsS0FBQSxFQUFBLEdBQUEsQ0FPUyxhQVBULEtBT1MsQ0FQVDtBQURHLENBQUE7O0FBV0EsSUFBTSxlQUFBLFFBQUEsWUFBQSxHQUFlLFNBQWYsWUFBZSxDQUFBLENBQUEsRUFBQTtBQUFBLFdBQU0sQ0FBQyxDQUFDLEVBQUYsT0FBQSxJQUFlLENBQUMsQ0FBQyxXQUFBLGdCQUFBLENBQUEsT0FBQSxDQUF5QixFQUExQyxPQUFpQixDQUFqQixJQUF5RCxFQUFBLEtBQUEsSUFBVyxFQUFBLEtBQUEsS0FBMUUsQ0FBQTtBQUFyQixDQUFBOztBQUVBLElBQU0sZUFBQSxRQUFBLFlBQUEsR0FBZSxTQUFmLFlBQWUsQ0FBQSxJQUFBLEVBQUE7QUFBQSxXQUFRLFVBQUEsR0FBQSxFQUFBLElBQUEsRUFBZTtBQUMvQyxZQUFHLElBQUgsSUFBRyxDQUFILEVBQWM7QUFDVixnQkFBQSxJQUFBLElBQVksT0FBQSxNQUFBLENBQUEsRUFBQSxFQUFrQixJQUFsQixJQUFrQixDQUFsQixFQUE2QjtBQUNyQyxxQkFBSyxJQUFBLElBQUEsRUFBQSxHQUFBLENBQUEsTUFBQSxDQUFxQixLQUFBLEtBQUEsQ0FBQSxJQUFBLEVBQXJCLEdBQUE7QUFEZ0MsYUFBN0IsQ0FBWjtBQURKLFNBQUEsTUFJUSxJQUFBLElBQUEsSUFBWSxLQUFBLEtBQUEsQ0FBWixJQUFZLENBQVo7QUFDUixlQUFBLEdBQUE7QUFOd0IsS0FBQTtBQUFyQixDQUFBOztBQVNBLElBQU0sT0FBQSxRQUFBLElBQUEsR0FBTyxTQUFQLElBQU8sR0FBTSxDQUFuQixDQUFBOztBQUVBLElBQU0sY0FBQSxRQUFBLFdBQUEsR0FBYyxTQUFkLFdBQWMsQ0FBQSxLQUFBLEVBQUE7QUFBQSxXQUFTLG1CQUFBLElBQUEsQ0FBeUIsTUFBekIsSUFBQTtBQUFUO0FBQXBCLENBQUE7O0FBRVAsSUFBTSxXQUFXLFNBQVgsUUFBVyxDQUFBLEtBQUEsRUFBQTtBQUFBLFdBQVUsTUFBQSxLQUFBLEtBQUEsU0FBQSxJQUE2QixNQUFBLEtBQUEsS0FBN0IsSUFBQSxJQUFxRCxNQUFBLEtBQUEsQ0FBQSxNQUFBLEdBQS9ELENBQUE7QUFBakIsQ0FBQTs7QUFFTyxJQUFNLG9CQUFBLFFBQUEsaUJBQUEsR0FBb0IsU0FBcEIsaUJBQW9CLENBQUEsR0FBQSxFQUFBLEtBQUEsRUFBZ0I7QUFDN0MsUUFBRyxDQUFDLFlBQUQsS0FBQyxDQUFELElBQXVCLFNBQTFCLEtBQTBCLENBQTFCLEVBQTJDLE1BQU0sTUFBTixLQUFBO0FBQzNDLFFBQUcsWUFBQSxLQUFBLEtBQXNCLE1BQXpCLE9BQUEsRUFBd0M7QUFDcEMsWUFBRyxNQUFBLE9BQUEsQ0FBSCxHQUFHLENBQUgsRUFBdUIsSUFBQSxJQUFBLENBQVMsTUFBaEMsS0FBdUIsRUFBdkIsS0FDSyxNQUFNLENBQUMsTUFBUCxLQUFNLENBQU47QUFDUjtBQUNELFdBQUEsR0FBQTtBQU5HLENBQUE7O0FBU1AsSUFBTSxZQUFhLDJxQkFBQSxLQUFBLENBQW5CLEdBQW1CLENBQW5CO0FBQ0EsSUFBTSxhQUFhLDQ2QkFBQSxLQUFBLENBQW5CLEdBQW1CLENBQW5COztBQUVPLElBQU0sa0JBQUEsUUFBQSxlQUFBLEdBQWtCLFNBQWxCLGVBQWtCLENBQUEsQ0FBQSxFQUFLO0FBQ2hDLFFBQUksRUFBQSxPQUFBLENBQUEsUUFBQSxFQUFKLEVBQUksQ0FBSjtBQUNBLFFBQUksUUFBUSxFQUFBLEtBQUEsQ0FBWixHQUFZLENBQVo7O0FBRUEsV0FBTyxNQUFBLE1BQUEsR0FBUCxDQUFBLEVBQXlCO0FBQ3JCLGNBQUEsS0FBQTtBQUNIOztBQUVELFFBQUksTUFBQSxNQUFBLEtBQUEsQ0FBQSxJQUF3QixXQUFBLE9BQUEsQ0FBbUIsTUFBbkIsQ0FBbUIsQ0FBbkIsTUFBaUMsQ0FBbEMsQ0FBdkIsSUFBZ0UsVUFBQSxPQUFBLENBQWtCLE1BQWxCLENBQWtCLENBQWxCLE1BQWdDLENBQXBHLENBQUEsRUFBeUc7QUFDckcsY0FBQSxLQUFBO0FBQ0g7O0FBRUQsV0FBTyxNQUFBLElBQUEsQ0FBUCxHQUFPLENBQVA7QUFaRyxDQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IENvb2tpZUJhbm5lciBmcm9tICcuLi8uLi9zcmMnO1xuaW1wb3J0IHsgd3JpdGVDb29raWUgfSBmcm9tICcuLi8uLi9zcmMvbGliL3V0aWxzJztcbiAgICBcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAgIENvb2tpZUJhbm5lci5pbml0KHtcbiAgICAgICAgc2VjdXJlOiB0cnVlLFxuICAgICAgICBwb2xpY3lVUkw6ICcvJyxcbiAgICAgICAgbmVjZXNzYXJ5OiBbICgpID0+IHsgXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTmVjZXNzYXJ5IGZuJyk7XG4gICAgICAgICAgICB3cml0ZUNvb2tpZSh7XG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJy5UZXN0Lk5lY2Vzc2FyeUNvb2tpZScsXG4gICAgICAgICAgICAgICAgICAgIGV4cGlyeTogM1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY29uc2VudDogJzY2NicsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBdLFxuICAgICAgICB0eXBlczoge1xuICAgICAgICAgICAgJ3BlcmZvcm1hbmNlJzoge1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnUGVyZm9ybWFuY2UgcHJlZmVyZW5jZXMnLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnUGVyZm9ybWFuY2UgY29va2llcyBhcmUgdXNlZCB0byBtZWFzdXJlIHRoZSBwZXJmb3JtYW5jZSBvZiBvdXIgd2Vic2l0ZSBhbmQgbWFrZSBpbXByb3ZlbWVudHMuIFlvdXIgcGVyc29uYWwgZGF0YSBpcyBub3QgaWRlbnRpZmllZC4nLFxuICAgICAgICAgICAgICAgIGxhYmVsczoge1xuICAgICAgICAgICAgICAgICAgICB5ZXM6ICdQYWdlcyB5b3UgdmlzaXQgYW5kIGFjdGlvbnMgeW91IHRha2Ugd2lsbCBiZSBtZWFzdXJlZCBhbmQgdXNlZCB0byBpbXByb3ZlIHRoZSBzZXJ2aWNlJyxcbiAgICAgICAgICAgICAgICAgICAgbm86ICdQYWdlcyB5b3UgdmlzaXQgYW5kIGFjdGlvbnMgeW91IHRha2Ugd2lsbCBub3QgYmUgbWVhc3VyZWQgYW5kIHVzZWQgdG8gaW1wcm92ZSB0aGUgc2VydmljZSdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZuczogW1xuICAgICAgICAgICAgICAgICAgICAoKSA9PiB7IFxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1BlcmZvcm1hbmNlIGZuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB3cml0ZUNvb2tpZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJy5UZXN0LlBlcmZvcm1hbmNlQ29va2llJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwaXJ5OiAzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zZW50OiAnNjY2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdhZHMnOiB7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICdTZXQgeW91ciBwZXJzb25hbGlzZWQgYWRzIHByZWZlcmVuY2VzJyxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1dlIHdvcmsgd2l0aCBhZHZlcnRpc2luZyBwYXJ0bmVycyB0byBzaG93IHlvdSBhZHMgZm9yIG91ciBwcm9kdWN0cyBhbmQgc2VydmljZXMgYWNyb3NzIHRoZSB3ZWIuICBZb3UgY2FuIGNob29zZSB3aGV0aGVyIHdlIGNvbGxlY3QgYW5kIHNoYXJlIHRoYXQgZGF0YSB3aXRoIG91ciBwYXJ0bmVycyBiZWxvdy4gJyxcbiAgICAgICAgICAgICAgICBsYWJlbHM6IHtcbiAgICAgICAgICAgICAgICAgICAgeWVzOiAnT3VyIHBhcnRuZXJzIG1pZ2h0IHNlcnZlIHlvdSBhZHMga25vd2luZyB5b3UgaGF2ZSB2aXNpdGVkIG91ciB3ZWJzaXRlJyxcbiAgICAgICAgICAgICAgICAgICAgbm86ICdPdXIgcGFydG5lcnMgd2lsbCBzdGlsbCBzZXJ2ZSB5b3UgYWRzLCBidXQgdGhleSB3aWxsIG5vdCBrbm93IHlvdSBoYXZlIHZpc2l0ZWQgb3V0IHdlYnNpdGUnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4geyBcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdBZHMgZm4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRlQ29va2llKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnLlRlc3QuQWRzQ29va2llJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwaXJ5OiAzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zZW50OiAnNjY2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59KTsiLCJpbXBvcnQgZGVmYXVsdHMgZnJvbSAnLi9saWIvZGVmYXVsdHMnO1xuaW1wb3J0IGZhY3RvcnkgZnJvbSAnLi9saWIvZmFjdG9yeSc7XG5pbXBvcnQgeyBjb21wb3NlVHlwZXMgfSBmcm9tICcuL2xpYi91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBpbml0OiBvcHRzID0+IGZhY3RvcnkoT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMsIG9wdHMsIHtcbiAgICAgICAgdHlwZXM6IE9iamVjdC5rZXlzKG9wdHMudHlwZXMpLnJlZHVjZShjb21wb3NlVHlwZXMob3B0cyksIGRlZmF1bHRzLnR5cGVzKVxuICAgIH0pKVxufTsiLCJpbXBvcnQgeyB1cGRhdGVFeGVjdXRlZCB9IGZyb20gJy4vcmVkdWNlcnMnO1xuXG5leHBvcnQgY29uc3QgYXBwbHkgPSBTdG9yZSA9PiBzdGF0ZSA9PiB7XG4gICAgT2JqZWN0LmtleXMoc3RhdGUuY29uc2VudCkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBpZihzdGF0ZS5zZXR0aW5ncy50eXBlc1trZXldLmV4ZWN1dGVkID09PSB0cnVlKSByZXR1cm47XG4gICAgICAgIGlmKHN0YXRlLmNvbnNlbnRba2V5XSAmJiBCb29sZWFuKHN0YXRlLmNvbnNlbnRba2V5XSkpIHtcbiAgICAgICAgICAgIHN0YXRlLnNldHRpbmdzLnR5cGVzW2tleV0uZm5zLmZvckVhY2goZm4gPT4gZm4oc3RhdGUpKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIFN0b3JlLnVwZGF0ZSh1cGRhdGVFeGVjdXRlZCwgT2JqZWN0LmtleXMoc3RhdGUuc2V0dGluZ3MudHlwZXMpLnJlZHVjZSgoYWNjLCB0eXBlKSA9PiB7XG4gICAgICAgIGFjY1t0eXBlXSA9IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLnNldHRpbmdzLnR5cGVzW3R5cGVdLCB7IGV4ZWN1dGVkOiBzdGF0ZS5zZXR0aW5ncy50eXBlc1t0eXBlXS5leGVjdXRlZCB8fCAoc3RhdGUuY29uc2VudFt0eXBlXSAmJiBCb29sZWFuKHN0YXRlLmNvbnNlbnRbdHlwZV0pKSB9KTtcbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSkpO1xufTtcblxuZXhwb3J0IGNvbnN0IG5lY2Vzc2FyeSA9IHN0YXRlID0+IHtcbiAgICBzdGF0ZS5zZXR0aW5ncy5uZWNlc3NhcnkuZm9yRWFjaChmbiA9PiBmbihzdGF0ZSkpO1xufTtcblxuIiwiZXhwb3J0IGNvbnN0IFRSSUdHRVJfRVZFTlRTID0gd2luZG93LlBvaW50ZXJFdmVudCA/IFsncG9pbnRlcnVwJywgJ2tleWRvd24nXSA6IFsnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cgPyAndG91Y2hzdGFydCcgOiAnY2xpY2snLCAna2V5ZG93bicgXTtcblxuZXhwb3J0IGNvbnN0IFRSSUdHRVJfS0VZQ09ERVMgPSBbMTMsIDMyXTsiLCJpbXBvcnQgeyByZW1vdmVTdWJkb21haW4gfSBmcm9tICcuL3V0aWxzJzsgXG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0bmFtZTogJy5Db29raWVQcmVmZXJlbmNlcycsXG5cdHBhdGg6ICcnLFxuXHRkb21haW46IHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSA9PT0gJ2xvY2FsaG9zdCcgPyAnJyA6IGAuJHtyZW1vdmVTdWJkb21haW4od2luZG93LmxvY2F0aW9uLmhvc3RuYW1lKX1gLFxuXHRzZWN1cmU6IHRydWUsXG5cdGV4cGlyeTogMzY1LFxuXHR0eXBlczoge30sXG5cdG5lY2Vzc2FyeTogW10sXG5cdGJhbm5lclRyaWdnZXI6IGZhbHNlLFxuXHRwb2xpY3lVUkw6ICcvY29va2llLXBvbGljeScsXG5cdGNsYXNzTmFtZXM6IHtcblx0XHRiYW5uZXI6ICdwcml2YWN5LWJhbm5lcicsXG5cdFx0YWNjZXB0QnRuOiAncHJpdmFjeS1iYW5uZXJfX2FjY2VwdCcsXG5cdFx0c3VibWl0QnRuOiAncHJpdmFjeS1iYW5uZXJfX3N1Ym1pdCcsXG5cdFx0ZmllbGQ6ICdwcml2YWN5LWJhbm5lcl9fZmllbGQnLFxuXHRcdGZvcm06ICdwcml2YWN5LWJhbm5lcl9fZm9ybScsXG5cdFx0ZmllbGRzZXQ6ICdwcml2YWN5LWJhbm5lcl9fZmllbGRzZXQnLFxuXHRcdGxlZ2VuZDogJ3ByaXZhY3ktYmFubmVyX19sZWdlbmQnLFxuXHRcdGZvcm1Db250YWluZXI6ICdwcml2YWN5LWJhbm5lcl9fZm9ybS1jb250YWluZXInLFxuXHRcdGZvcm1NZXNzYWdlOiAncHJpdmFjeS1iYW5uZXJfX2Zvcm0tbXNnJyxcblx0XHR0aXRsZTogJ3ByaXZhY3ktYmFubmVyX19mb3JtLXRpdGxlJyxcblx0XHRkZXNjcmlwdGlvbjogJ3ByaXZhY3ktYmFubmVyX19mb3JtLWRlc2NyaXB0aW9uJ1xuXHR9LFxuXHRzYXZlZE1lc3NhZ2U6ICdZb3VyIHNldHRpbmdzIGhhdmUgYmVlbiBzYXZlZC4nLFxuXHRiYW5uZXJUZW1wbGF0ZShtb2RlbCl7XG5cdFx0cmV0dXJuIGA8c2VjdGlvbiByb2xlPVwiZGlhbG9nXCIgYXJpYS1saXZlPVwicG9saXRlXCIgYXJpYS1sYWJlbD1cIllvdSBwcml2YWN5XCIgY2xhc3M9XCIke21vZGVsLmNsYXNzTmFtZXMuYmFubmVyfVwiPlxuXHRcdFx0PGRpdiBjbGFzcz1cInByaXZhY3ktY29udGVudFwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwid3JhcFwiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJyb3dcIj5cblx0XHRcdFx0XHRcdDwhLS1nb29nbGVvZmY6IGFsbC0tPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInByaXZhY3ktYmFubmVyX190aXRsZVwiPkNvb2tpZXM8L2Rpdj5cblx0XHRcdFx0XHRcdDxwPldlIHVzZSBjb29raWVzIHRvIGltcHJvdmUgeW91ciBleHBlcmllbmNlIG9uIG91ciBzaXRlIGFuZCBzaG93IHlvdSBwZXJzb25hbGlzZWQgYWR2ZXJ0aXNpbmcuPC9wPlxuXHRcdFx0XHRcdFx0PHA+RmluZCBvdXQgbW9yZSBmcm9tIG91ciA8YSBjbGFzcz1cInByaXZhY3ktYmFubmVyX19saW5rXCIgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlciBub2ZvbGxvd1wiIGhyZWY9XCIvcHJpdmFjeS1wb2xpY3lcIj5wcml2YWN5IHBvbGljeTwvYT4gYW5kIDxhIGNsYXNzPVwicHJpdmFjeS1iYW5uZXJfX2xpbmtcIiByZWw9XCJub29wZW5lciBub3JlZmVycmVyIG5vZm9sbG93XCIgaHJlZj1cIiR7bW9kZWwucG9saWN5VVJMfVwiPmNvb2tpZSBwb2xpY3k8L2E+LjwvcD5cblx0XHRcdFx0XHRcdDxidXR0b24gY2xhc3M9XCJidG4gYnRuLS1wcmltYXJ5ICR7bW9kZWwuY2xhc3NOYW1lcy5hY2NlcHRCdG59XCI+QWNjZXB0IGFuZCBjbG9zZTwvYnV0dG9uPlxuXHRcdFx0XHRcdFx0PGEgY2xhc3M9XCJwcml2YWN5LWJhbm5lcl9fbGlua1wiIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXIgbm9mb2xsb3dcIiBocmVmPVwiJHttb2RlbC5wb2xpY3lVUkx9XCI+WW91ciBvcHRpb25zPC9hPlxuXHRcdFx0XHRcdFx0PCEtLWdvb2dsZW9uOiBhbGwtLT5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQ8L3NlY3Rpb24+YDtcblx0fSxcblx0bWVzc2FnZVRlbXBsYXRlKG1vZGVsKXtcblx0XHRyZXR1cm4gYDxkaXYgY2xhc3M9XCIke21vZGVsLnNldHRpbmdzLmNsYXNzTmFtZXMuZm9ybU1lc3NhZ2V9XCIgYXJpYS1yb2xlPVwiYWxlcnRcIj4ke21vZGVsLnNldHRpbmdzLnNhdmVkTWVzc2FnZX08L2Rpdj5gXG5cdH0sXG5cdGZvcm1UZW1wbGF0ZShtb2RlbCl7XG5cdFx0cmV0dXJuIGA8Zm9ybSBjbGFzcz1cIiR7bW9kZWwuc2V0dGluZ3MuY2xhc3NOYW1lcy5mb3JtfVwiIG5vdmFsaWRhdGU+XG5cdFx0XHRcdCR7T2JqZWN0LmtleXMobW9kZWwuc2V0dGluZ3MudHlwZXMpLm1hcCh0eXBlID0+IGA8ZmllbGRzZXQgY2xhc3M9XCIke21vZGVsLnNldHRpbmdzLmNsYXNzTmFtZXMuZmllbGRzZXR9XCI+XG5cdFx0XHRcdDxsZWdlbmQgY2xhc3M9XCIke21vZGVsLnNldHRpbmdzLmNsYXNzTmFtZXMubGVnZW5kfVwiPlxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwiJHttb2RlbC5zZXR0aW5ncy5jbGFzc05hbWVzLnRpdGxlfVwiPiR7bW9kZWwuc2V0dGluZ3MudHlwZXNbdHlwZV0udGl0bGV9PC9zcGFuPlxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwiJHttb2RlbC5zZXR0aW5ncy5jbGFzc05hbWVzLmRlc2NyaXB0aW9ufVwiPiR7bW9kZWwuc2V0dGluZ3MudHlwZXNbdHlwZV0uZGVzY3JpcHRpb259PC9zcGFuPlxuXHRcdFx0XHQ8L2xlZ2VuZD5cblx0XHRcdFx0PGRpdiBjbGFzcz1cImZvcm0tcm93XCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInJlbGF0aXZlXCI+XG5cdFx0XHRcdFx0XHQ8bGFiZWwgY2xhc3M9XCJwcml2YWN5LWJhbm5lcl9fbGFiZWxcIj5cblx0XHRcdFx0XHRcdFx0PGlucHV0XG5cdFx0XHRcdFx0XHRcdFx0Y2xhc3M9XCIke21vZGVsLnNldHRpbmdzLmNsYXNzTmFtZXMuZmllbGR9XCJcblx0XHRcdFx0XHRcdFx0XHR0eXBlPVwicmFkaW9cIlxuXHRcdFx0XHRcdFx0XHRcdG5hbWU9XCJwcml2YWN5LSR7dHlwZS5zcGxpdCgnICcpWzBdLnJlcGxhY2UoJyAnLCAnLScpfVwiXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU9XCIxXCJcblx0XHRcdFx0XHRcdFx0XHQke21vZGVsLmNvbnNlbnRbdHlwZV0gPT09IDEgPyBgIGNoZWNrZWRgIDogJyd9PlxuXHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cInByaXZhY3ktYmFubmVyX19sYWJlbC10ZXh0XCI+SSBhbSBPSyB3aXRoIHRoaXM8L3NwYW4+XG5cdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwicHJpdmFjeS1iYW5uZXJfX2xhYmVsLWRlc2NyaXB0aW9uXCI+JHttb2RlbC5zZXR0aW5ncy50eXBlc1t0eXBlXS5sYWJlbHMueWVzfTwvc3Bhbj5cblx0XHRcdFx0XHRcdDwvbGFiZWw+ICAgIFxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cImZvcm0tcm93XCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInJlbGF0aXZlXCI+XG5cdFx0XHRcdFx0XHQ8bGFiZWwgY2xhc3M9XCJwcml2YWN5LWJhbm5lcl9fbGFiZWxcIj5cblx0XHRcdFx0XHRcdFx0PGlucHV0XG5cdFx0XHRcdFx0XHRcdFx0Y2xhc3M9XCIke21vZGVsLnNldHRpbmdzLmNsYXNzTmFtZXMuZmllbGR9XCJcblx0XHRcdFx0XHRcdFx0XHR0eXBlPVwicmFkaW9cIlxuXHRcdFx0XHRcdFx0XHRcdG5hbWU9XCJwcml2YWN5LSR7dHlwZS5zcGxpdCgnICcpWzBdLnJlcGxhY2UoJyAnLCAnLScpfVwiXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU9XCIwXCJcblx0XHRcdFx0XHRcdFx0XHQke21vZGVsLmNvbnNlbnRbdHlwZV0gPT09IDAgPyBgIGNoZWNrZWRgIDogJyd9PlxuXHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cInByaXZhY3ktYmFubmVyX19sYWJlbC10ZXh0XCI+Tm8gdGhhbmsgeW91PC9zcGFuPlxuXHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cInByaXZhY3ktYmFubmVyX19sYWJlbC1kZXNjcmlwdGlvblwiPiR7bW9kZWwuc2V0dGluZ3MudHlwZXNbdHlwZV0ubGFiZWxzLm5vfTwvc3Bhbj5cblx0XHRcdFx0XHRcdDwvbGFiZWw+ICAgIFxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZmllbGRzZXQ+YCkuam9pbignJyl9XG5cdFx0XHQ8YnV0dG9uIGNsYXNzPVwiJHttb2RlbC5zZXR0aW5ncy5jbGFzc05hbWVzLnN1Ym1pdEJ0bn1cIiR7T2JqZWN0LmtleXMobW9kZWwuY29uc2VudCkubGVuZ3RoID09PSAwID8gYCBkaXNhYmxlZGAgOiAnJ30+U2F2ZSBteSBzZXR0aW5nczwvYnV0dG9uPlxuXHRcdDwvZm9ybT5gO1xuXHR9XG59OyIsImltcG9ydCB7IGNvb2tpZXNFbmFibGVkLCByZWFkQ29va2llLCBub29wIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyBpbml0QmFubmVyLCBpbml0Rm9ybSB9IGZyb20gJy4vdWknO1xuaW1wb3J0IHsgbmVjZXNzYXJ5LCBhcHBseSB9IGZyb20gJy4vY29uc2VudCc7XG5pbXBvcnQgeyBjcmVhdGVTdG9yZSB9IGZyb20gJy4vc3RvcmUnO1xuaW1wb3J0IHsgaW5pdGlhbFN0YXRlIH0gZnJvbSAnLi9yZWR1Y2Vycyc7XG5cbmV4cG9ydCBkZWZhdWx0IHNldHRpbmdzID0+IHtcbiAgICBpZighY29va2llc0VuYWJsZWQoKSkgcmV0dXJuO1xuICAgIFxuICAgIGNvbnN0IFN0b3JlID0gY3JlYXRlU3RvcmUoKTtcbiAgICBjb25zdCBjb29raWVzID0gcmVhZENvb2tpZShzZXR0aW5ncyk7XG4gICAgU3RvcmUudXBkYXRlKFxuICAgICAgICBpbml0aWFsU3RhdGUsXG4gICAgICAgIHsgc2V0dGluZ3MsIGNvbnNlbnQ6IGNvb2tpZXMgPyBKU09OLnBhcnNlKGNvb2tpZXMudmFsdWUpIDogeyB9IH0sXG4gICAgICAgIFsgbmVjZXNzYXJ5LCBhcHBseShTdG9yZSksIGNvb2tpZXMgPyBub29wIDogaW5pdEJhbm5lcihTdG9yZSksIGluaXRGb3JtKFN0b3JlKSBdXG4gICAgKTtcblxuICAgIHJldHVybiB7IGdldFN0YXRlOiBTdG9yZS5nZXRTdGF0ZSB9IDtcbn07IiwiZXhwb3J0IGNvbnN0IGluaXRpYWxTdGF0ZSA9IChzdGF0ZSwgZGF0YSkgPT4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIGRhdGEpO1xuZXhwb3J0IGNvbnN0IHVwZGF0ZUNvbnNlbnQgPSAoc3RhdGUsIGRhdGEpID0+IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IGNvbnNlbnQ6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmNvbnNlbnQsIGRhdGEpfSk7XG5leHBvcnQgY29uc3QgdXBkYXRlRXhlY3V0ZWQgPSAoc3RhdGUsIGRhdGEpID0+IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IHNldHRpbmdzOiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5zZXR0aW5ncywgeyB0eXBlczogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuc2V0dGluZ3MudHlwZXMsIGRhdGEpIH0pfSk7IiwiZXhwb3J0IGNvbnN0IGNyZWF0ZVN0b3JlID0gKCkgPT4ge1xuICAgIC8vc2hhcmVkIGNlbnRyYWxpc2VkIHZhbGlkYXRvciBzdGF0ZVxuICAgIGxldCBzdGF0ZSA9IHt9O1xuICAgIFxuICAgIC8vc3RhdGUgZ2V0dGVyXG4gICAgY29uc3QgZ2V0U3RhdGUgPSAoKSA9PiBzdGF0ZTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBuZXh0IHN0YXRlIGJ5IGludm9raW5nIHJlZHVjZXIgb24gY3VycmVudCBzdGF0ZVxuICAgICAqIFxuICAgICAqIEV4ZWN1dGUgc2lkZSBlZmZlY3RzIG9mIHN0YXRlIHVwZGF0ZSwgYXMgcGFzc2VkIGluIHRoZSB1cGRhdGVcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gcmVkdWNlciBbRnVuY3Rpb25dIFxuICAgICAqIEBwYXJhbSBuZXh0U3RhdGUgW09iamVjdF0gTmV3IHNsaWNlIG9mIHN0YXRlIHRvIGNvbWJpbmUgd2l0aCBjdXJyZW50IHN0YXRlIHRvIGNyZWF0ZSBuZXh0IHN0YXRlXG4gICAgICogQHBhcmFtIGVmZmVjdHMgW0FycmF5XSBBcnJheSBvZiBzaWRlIGVmZmVjdCBmdW5jdGlvbnMgdG8gaW52b2tlIGFmdGVyIHN0YXRlIHVwZGF0ZSAoRE9NLCBvcGVyYXRpb25zLCBjbWRzLi4uKVxuICAgICAqL1xuICAgIGNvbnN0IHVwZGF0ZSA9IGZ1bmN0aW9uKHJlZHVjZXIsIG5leHRTdGF0ZSwgZWZmZWN0cykge1xuICAgICAgICBzdGF0ZSA9ICByZWR1Y2VyKHN0YXRlLCBuZXh0U3RhdGUpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhzdGF0ZSk7XG4gICAgICAgIGlmKCFlZmZlY3RzKSByZXR1cm47XG4gICAgICAgIGVmZmVjdHMuZm9yRWFjaChlZmZlY3QgPT4geyBlZmZlY3Qoc3RhdGUpOyB9KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHsgdXBkYXRlLCBnZXRTdGF0ZSB9O1xufTsiLCJpbXBvcnQgeyBzaG91bGRSZXR1cm4sIHdyaXRlQ29va2llLCBncm91cFZhbHVlUmVkdWNlciwgZGVsZXRlQ29va2llcyB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgVFJJR0dFUl9FVkVOVFMgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBhcHBseSB9IGZyb20gJy4vY29uc2VudCc7XG5pbXBvcnQgeyB1cGRhdGVDb25zZW50IH0gZnJvbSAnLi9yZWR1Y2Vycyc7XG5cbmV4cG9ydCBjb25zdCBpbml0QmFubmVyID0gU3RvcmUgPT4gc3RhdGUgPT4ge1xuICAgIGRvY3VtZW50LmJvZHkuZmlyc3RFbGVtZW50Q2hpbGQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmViZWdpbicsIHN0YXRlLnNldHRpbmdzLmJhbm5lclRlbXBsYXRlKHN0YXRlLnNldHRpbmdzKSk7XG4gICAgY29uc3QgYmFubmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7c3RhdGUuc2V0dGluZ3MuY2xhc3NOYW1lcy5iYW5uZXJ9YCk7XG4gICAgY29uc3QgYWNjZXB0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7c3RhdGUuc2V0dGluZ3MuY2xhc3NOYW1lcy5hY2NlcHRCdG59YCk7XG5cbiAgICBUUklHR0VSX0VWRU5UUy5mb3JFYWNoKGV2ID0+IHtcbiAgICAgICAgYWNjZXB0QnRuLmFkZEV2ZW50TGlzdGVuZXIoZXYsIGUgPT4ge1xuICAgICAgICAgICAgaWYoc2hvdWxkUmV0dXJuKGUpKSByZXR1cm47XG5cbiAgICAgICAgICAgIFN0b3JlLnVwZGF0ZShcbiAgICAgICAgICAgICAgICB1cGRhdGVDb25zZW50LFxuICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKHN0YXRlLnNldHRpbmdzLnR5cGVzKS5yZWR1Y2UoKGFjYywgdHlwZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhY2NbdHlwZV0gPSAxO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICAgICAgICAgIH0sIHt9KSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIHdyaXRlQ29va2llLFxuICAgICAgICAgICAgICAgICAgICBhcHBseShTdG9yZSksXG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUJhbm5lcihiYW5uZXIpLFxuICAgICAgICAgICAgICAgICAgICBpbml0Rm9ybShTdG9yZSlcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn07XG5cbmNvbnN0IHJlbW92ZUJhbm5lciA9IGJhbm5lciA9PiAoKSA9PiAoYmFubmVyICYmIGJhbm5lci5wYXJlbnROb2RlKSAmJiBiYW5uZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChiYW5uZXIpO1xuXG5leHBvcnQgY29uc3QgaW5pdEZvcm0gPSBTdG9yZSA9PiBzdGF0ZSA9PiB7XG4gICAgY29uc3QgZm9ybUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3N0YXRlLnNldHRpbmdzLmNsYXNzTmFtZXMuZm9ybUNvbnRhaW5lcn1gKTtcbiAgICBpZighZm9ybUNvbnRhaW5lcikgcmV0dXJuO1xuXG4gICAgZm9ybUNvbnRhaW5lci5pbm5lckhUTUwgPSBzdGF0ZS5zZXR0aW5ncy5mb3JtVGVtcGxhdGUoc3RhdGUpO1xuXG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3N0YXRlLnNldHRpbmdzLmNsYXNzTmFtZXMuZm9ybX1gKTtcbiAgICBjb25zdCBiYW5uZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtzdGF0ZS5zZXR0aW5ncy5jbGFzc05hbWVzLmJhbm5lcn1gKTtcbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtzdGF0ZS5zZXR0aW5ncy5jbGFzc05hbWVzLnN1Ym1pdEJ0bn1gKTtcbiAgICBjb25zdCBncm91cHMgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke3N0YXRlLnNldHRpbmdzLmNsYXNzTmFtZXMuZmllbGR9YCkpLnJlZHVjZSgoZ3JvdXBzLCBmaWVsZCkgPT4ge1xuICAgICAgICBjb25zdCBncm91cE5hbWUgPSBmaWVsZC5nZXRBdHRyaWJ1dGUoJ25hbWUnKS5yZXBsYWNlKCdwcml2YWN5LScsICcnKTtcbiAgICAgICAgaWYoZ3JvdXBzW2dyb3VwTmFtZV0pIGdyb3Vwc1tncm91cE5hbWVdLnB1c2goZmllbGQpO1xuICAgICAgICBlbHNlIGdyb3Vwc1tncm91cE5hbWVdID0gW2ZpZWxkXTtcbiAgICAgICAgcmV0dXJuIGdyb3VwcztcbiAgICB9LCB7fSk7XG5cbiAgICBjb25zdCBleHRyYWN0Q29uc2VudCA9ICgpID0+IE9iamVjdC5rZXlzKGdyb3VwcykucmVkdWNlKChhY2MsIGtleSkgPT4ge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGdyb3Vwc1trZXldLnJlZHVjZShncm91cFZhbHVlUmVkdWNlciwgJycpO1xuICAgICAgICBpZih2YWx1ZSkgYWNjW2tleV0gPSBwYXJzZUludCh2YWx1ZSk7XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30pO1xuXG4gICAgY29uc3QgZW5hYmxlQnV0dG9uID0gZSA9PiB7XG4gICAgICAgIGlmKE9iamVjdC5rZXlzKGV4dHJhY3RDb25zZW50KCkpLmxlbmd0aCAhPT0gT2JqZWN0LmtleXMoZ3JvdXBzKS5sZW5ndGgpIHJldHVybjtcbiAgICAgICAgYnV0dG9uLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgICAgICAgZm9ybS5yZW1vdmVFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlbmFibGVCdXR0b24pO1xuICAgIH07XG4gICAgYnV0dG9uLmhhc0F0dHJpYnV0ZSgnZGlzYWJsZWQnKSAmJiBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGVuYWJsZUJ1dHRvbik7XG4gICAgXG4gICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBlID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBTdG9yZS51cGRhdGUoXG4gICAgICAgICAgICB1cGRhdGVDb25zZW50LFxuICAgICAgICAgICAgZXh0cmFjdENvbnNlbnQoKSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBkZWxldGVDb29raWVzLFxuICAgICAgICAgICAgICAgIHdyaXRlQ29va2llLFxuICAgICAgICAgICAgICAgIGFwcGx5KFN0b3JlKSxcbiAgICAgICAgICAgICAgICByZW1vdmVCYW5uZXIoYmFubmVyKSxcbiAgICAgICAgICAgICAgICByZW5kZXJNZXNzYWdlKGJ1dHRvbilcbiAgICAgICAgICAgIF1cbiAgICAgICAgKTtcbiAgICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCByZW5kZXJNZXNzYWdlID0gYnV0dG9uID0+IHN0YXRlID0+IHtcbiAgICBidXR0b24uaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmVuZCcsIHN0YXRlLnNldHRpbmdzLm1lc3NhZ2VUZW1wbGF0ZShzdGF0ZSkpO1xuICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBidXR0b24ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChidXR0b24ubmV4dEVsZW1lbnRTaWJsaW5nKTtcbiAgICAgICAgYnV0dG9uLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgICB9LCAzMDAwKTtcbn07IiwiaW1wb3J0IHsgVFJJR0dFUl9LRVlDT0RFUyB9IGZyb20gJy4vY29uc3RhbnRzJztcblxuLy9Nb2Rlcm5penIgY29va2llIHRlc3RcbmV4cG9ydCBjb25zdCBjb29raWVzRW5hYmxlZCA9ICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgICBkb2N1bWVudC5jb29raWUgPSAnY29va2lldGVzdD0xJztcbiAgICAgICAgY29uc3QgcmV0ID0gZG9jdW1lbnQuY29va2llLmluZGV4T2YoJ2Nvb2tpZXRlc3Q9JykgIT09IC0xO1xuICAgICAgICBkb2N1bWVudC5jb29raWUgPSAnY29va2lldGVzdD0xOyBleHBpcmVzPVRodSwgMDEtSmFuLTE5NzAgMDA6MDA6MDEgR01UJztcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH1cbiAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbn07XG5cbmV4cG9ydCBjb25zdCB3cml0ZUNvb2tpZSA9IHN0YXRlID0+IHtcbiAgICBkb2N1bWVudC5jb29raWUgPSBbXG4gICAgICAgIGAke3N0YXRlLnNldHRpbmdzLm5hbWV9PSR7SlNPTi5zdHJpbmdpZnkoc3RhdGUuY29uc2VudCl9O2AsXG4gICAgICAgIGBleHBpcmVzPSR7KG5ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgKHN0YXRlLnNldHRpbmdzLmV4cGlyeSoyNCo2MCo2MCoxMDAwKSkpLnRvR01UU3RyaW5nKCl9O2AsXG4gICAgICAgIHN0YXRlLnNldHRpbmdzLnBhdGggPyBgcGF0aD0ke3N0YXRlLnNldHRpbmdzLnBhdGh9YCA6ICcnLFxuICAgICAgICBzdGF0ZS5zZXR0aW5ncy5kb21haW4gPyBgZG9tYWluPSR7c3RhdGUuc2V0dGluZ3MuZG9tYWlufWAgOiAnJyxcbiAgICAgICAgc3RhdGUuc2V0dGluZ3Muc2VjdXJlID8gYHNlY3VyZWAgOiAnJ1xuICAgIF0uam9pbignJyk7XG59XG5cbmV4cG9ydCBjb25zdCByZWFkQ29va2llID0gc2V0dGluZ3MgPT4ge1xuICAgIGNvbnN0IGNvb2tpZSA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOyAnKS5tYXAocGFydCA9PiAoeyBuYW1lOiBwYXJ0LnNwbGl0KCc9JylbMF0sIHZhbHVlOiBwYXJ0LnNwbGl0KCc9JylbMV0gfSkpLmZpbHRlcihwYXJ0ID0+IHBhcnQubmFtZSA9PT0gc2V0dGluZ3MubmFtZSlbMF07XG4gICAgcmV0dXJuIGNvb2tpZSAhPT0gdW5kZWZpbmVkID8gY29va2llIDogZmFsc2U7XG59O1xuXG5jb25zdCB1cGRhdGVDb29raWUgPSBzdGF0ZSA9PiBtb2RlbCA9PiBkb2N1bWVudC5jb29raWUgPSBbXG4gICAgYCR7bW9kZWwubmFtZX09JHttb2RlbC52YWx1ZX07YCxcbiAgICBgZXhwaXJlcz0ke21vZGVsLmV4cGlyeX07YCxcbiAgICBgcGF0aD0ke3N0YXRlLnNldHRpbmdzLnBhdGh9O2AsXG4gICAgc3RhdGUuc2V0dGluZ3MuZG9tYWluID8gYGRvbWFpbj0ke3N0YXRlLnNldHRpbmdzLmRvbWFpbn07YCA6ICcnLFxuICAgIHN0YXRlLnNldHRpbmdzLnNlY3VyZSA/IGBzZWN1cmVgIDogJydcbl0uam9pbignJyk7XG5cbmV4cG9ydCBjb25zdCBkZWxldGVDb29raWVzID0gc3RhdGUgPT4ge1xuICAgIGRvY3VtZW50LmNvb2tpZVxuICAgICAgICAuc3BsaXQoJzsgJylcbiAgICAgICAgLm1hcChwYXJ0ID0+ICh7IFxuICAgICAgICAgICAgbmFtZTogcGFydC5zcGxpdCgnPScpWzBdLFxuICAgICAgICAgICAgdmFsdWU6IHBhcnQuc3BsaXQoJz0nKVsxXSxcbiAgICAgICAgICAgIGV4cGlyeTogJ1RodSwgMDEgSmFuIDE5NzAgMDA6MDA6MDEgR01UJ1xuICAgICAgICB9KSlcbiAgICAgICAgLm1hcCh1cGRhdGVDb29raWUoc3RhdGUpKTtcbn07XG5cbmV4cG9ydCBjb25zdCBzaG91bGRSZXR1cm4gPSBlID0+ICghIWUua2V5Q29kZSAmJiAhflRSSUdHRVJfS0VZQ09ERVMuaW5kZXhPZihlLmtleUNvZGUpIHx8IChlLndoaWNoICYmIGUud2hpY2ggPT09IDMpKTtcblxuZXhwb3J0IGNvbnN0IGNvbXBvc2VUeXBlcyA9IG9wdHMgPT4gKGFjYywgY3VycikgPT4ge1xuICAgIGlmKGFjY1tjdXJyXSkge1xuICAgICAgICBhY2NbY3Vycl0gPSBPYmplY3QuYXNzaWduKHt9LCBhY2NbY3Vycl0sIHtcbiAgICAgICAgICAgIGZuczogYWNjW2N1cnJdLmZucy5jb25jYXQob3B0cy50eXBlc1tjdXJyXS5mbnMpLFxuICAgICAgICB9KTtcbiAgICB9ICBlbHNlIGFjY1tjdXJyXSA9IG9wdHMudHlwZXNbY3Vycl07XG4gICAgcmV0dXJuIGFjYztcbn07XG5cbmV4cG9ydCBjb25zdCBub29wID0gKCkgPT4ge307XG5cbmV4cG9ydCBjb25zdCBpc0NoZWNrYWJsZSA9IGZpZWxkID0+ICgvcmFkaW98Y2hlY2tib3gvaSkudGVzdChmaWVsZC50eXBlKTtcblxuY29uc3QgaGFzVmFsdWUgPSBpbnB1dCA9PiAoaW5wdXQudmFsdWUgIT09IHVuZGVmaW5lZCAmJiBpbnB1dC52YWx1ZSAhPT0gbnVsbCAmJiBpbnB1dC52YWx1ZS5sZW5ndGggPiAwKTtcblxuZXhwb3J0IGNvbnN0IGdyb3VwVmFsdWVSZWR1Y2VyID0gKGFjYywgaW5wdXQpID0+IHtcbiAgICBpZighaXNDaGVja2FibGUoaW5wdXQpICYmIGhhc1ZhbHVlKGlucHV0KSkgYWNjID0gaW5wdXQudmFsdWU7XG4gICAgaWYoaXNDaGVja2FibGUoaW5wdXQpICYmIGlucHV0LmNoZWNrZWQpIHtcbiAgICAgICAgaWYoQXJyYXkuaXNBcnJheShhY2MpKSBhY2MucHVzaChpbnB1dC52YWx1ZSlcbiAgICAgICAgZWxzZSBhY2MgPSBbaW5wdXQudmFsdWVdO1xuICAgIH1cbiAgICByZXR1cm4gYWNjO1xufTtcblxuY29uc3QgZmlyc3RUTERzICA9IFwiYWN8YWR8YWV8YWZ8YWd8YWl8YWx8YW18YW58YW98YXF8YXJ8YXN8YXR8YXV8YXd8YXh8YXp8YmF8YmJ8YmV8YmZ8Ymd8Ymh8Yml8Ymp8Ym18Ym98YnJ8YnN8YnR8YnZ8Ynd8Ynl8Ynp8Y2F8Y2N8Y2R8Y2Z8Y2d8Y2h8Y2l8Y2x8Y218Y258Y298Y3J8Y3V8Y3Z8Y3d8Y3h8Y3p8ZGV8ZGp8ZGt8ZG18ZG98ZHp8ZWN8ZWV8ZWd8ZXN8ZXR8ZXV8Zml8Zm18Zm98ZnJ8Z2F8Z2J8Z2R8Z2V8Z2Z8Z2d8Z2h8Z2l8Z2x8Z218Z258Z3B8Z3F8Z3J8Z3N8Z3R8Z3d8Z3l8aGt8aG18aG58aHJ8aHR8aHV8aWR8aWV8aW18aW58aW98aXF8aXJ8aXN8aXR8amV8am98anB8a2d8a2l8a218a258a3B8a3J8a3l8a3p8bGF8bGJ8bGN8bGl8bGt8bHJ8bHN8bHR8bHV8bHZ8bHl8bWF8bWN8bWR8bWV8bWd8bWh8bWt8bWx8bW58bW98bXB8bXF8bXJ8bXN8bXR8bXV8bXZ8bXd8bXh8bXl8bmF8bmN8bmV8bmZ8bmd8bmx8bm98bnJ8bnV8bnp8b218cGF8cGV8cGZ8cGh8cGt8cGx8cG18cG58cHJ8cHN8cHR8cHd8cHl8cWF8cmV8cm98cnN8cnV8cnd8c2F8c2J8c2N8c2R8c2V8c2d8c2h8c2l8c2p8c2t8c2x8c218c258c298c3J8c3R8c3V8c3Z8c3h8c3l8c3p8dGN8dGR8dGZ8dGd8dGh8dGp8dGt8dGx8dG18dG58dG98dHB8dHJ8dHR8dHZ8dHd8dHp8dWF8dWd8dWt8dXN8dXl8dXp8dmF8dmN8dmV8dmd8dml8dm58dnV8d2Z8d3N8eXRcIi5zcGxpdCgnfCcpO1xuY29uc3Qgc2Vjb25kVExEcyA9IFwiYXp1cmV3ZWJzaXRlc3xjb218ZWR1fGdvdnxuZXR8bWlsfG9yZ3xub218c2NofGNhYXxyZXN8b2ZmfGdvYnxpbnR8dHVyfGlwNnx1cml8dXJufGFzbnxhY3R8bnN3fHFsZHx0YXN8dmljfHByb3xiaXp8YWRtfGFkdnxhZ3J8YXJxfGFydHxhdG98YmlvfGJtZHxjaW18Y25nfGNudHxlY258ZWNvfGVtcHxlbmd8ZXNwfGV0Y3xldGl8ZmFyfGZuZHxmb3R8ZnN0fGcxMnxnZ2Z8aW1ifGluZHxpbmZ8am9yfGp1c3xsZWd8bGVsfG1hdHxtZWR8bXVzfG5vdHxudHJ8b2RvfHBwZ3xwc2N8cHNpfHFzbHxyZWN8c2xnfHNydnx0ZW98dG1wfHRyZHx2ZXR8emxnfHdlYnxsdGR8c2xkfHBvbHxmaW58azEyfGxpYnxwcml8YWlwfGZpZXxldW58c2NpfHByZHxjY2l8cHZ0fG1vZHxpZHZ8cmVsfHNleHxnZW58bmljfGFicnxiYXN8Y2FsfGNhbXxlbXJ8ZnZnfGxhenxsaWd8bG9tfG1hcnxtb2x8cG1ufHB1Z3xzYXJ8c2ljfHRhYXx0b3N8dW1ifHZhb3x2ZGF8dmVufG1pZXzljJfmtbfpgZN85ZKM5q2M5bGxfOelnuWliOW3nXzpub/lhZDls7Z8YXNzfHJlcHx0cmF8cGVyfG5nb3xzb2N8Z3JwfHBsY3xpdHN8YWlyfGFuZHxidXN8Y2FufGRkcnxqZmt8bWFkfG5yd3xueWN8c2tpfHNweXx0Y218dWxtfHVzYXx3YXJ8ZmhzfHZnc3xkZXB8ZWlkfGZldHxmbGF8ZmzDpXxnb2x8aG9mfGhvbHxzZWx8dmlrfGNyaXxpd2l8aW5nfGFib3xmYW18Z29rfGdvbnxnb3B8Z29zfGFpZHxhdG18Z3NtfHNvc3xlbGt8d2F3fGVzdHxhY2F8YmFyfGNwYXxqdXJ8bGF3fHNlY3xwbG98d3d3fGJpcnxjYmd8amFyfGtodnxtc2t8bm92fG5za3xwdHp8cm5kfHNwYnxzdHZ8dG9tfHRza3x1ZG18dnJufGNtd3xrbXN8bmt6fHNuenxwdWJ8Zmh2fHJlZHxlbnN8bmF0fHJuc3xybnV8YmJzfHRlbHxiZWx8a2VwfG5oc3xkbml8ZmVkfGlzYXxuc258Z3VifGUxMnx0ZWN80L7RgNCzfNC+0LHRgHzRg9C/0YB8YWx0fG5pc3xqcG58bWV4fGF0aHxpa2l8bmlkfGdkYXxpbmNcIi5zcGxpdCgnfCcpO1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlU3ViZG9tYWluID0gcyA9PiB7XG4gICAgcyA9IHMucmVwbGFjZSgvXnd3d1xcLi8sICcnKTtcbiAgICBsZXQgcGFydHMgPSBzLnNwbGl0KCcuJyk7XG4gICAgXG4gICAgd2hpbGUgKHBhcnRzLmxlbmd0aCA+IDMpIHtcbiAgICAgICAgcGFydHMuc2hpZnQoKTtcbiAgICB9XG5cbiAgICBpZiAocGFydHMubGVuZ3RoID09PSAzICYmICgoc2Vjb25kVExEcy5pbmRleE9mKHBhcnRzWzFdKSA9PT0gLTEpICYmIGZpcnN0VExEcy5pbmRleE9mKHBhcnRzWzJdKSA9PT0gLTEpKSB7XG4gICAgICAgIHBhcnRzLnNoaWZ0KCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcnRzLmpvaW4oJy4nKTtcbn07Il19
