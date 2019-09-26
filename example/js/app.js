(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _src = require('../../src');

var _src2 = _interopRequireDefault(_src);

var _utils = require('../../src/lib/utils');

var _stormLoad = require('storm-load');

var _stormLoad2 = _interopRequireDefault(_stormLoad);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

window.addEventListener('DOMContentLoaded', function () {
    (0, _stormLoad2.default)('./js/storm-cookie-banner.standalone.js').then(function () {
        StormCookieBanner.init({
            secure: true,
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
});

},{"../../src":3,"../../src/lib/utils":11,"storm-load":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
/**
 * @name storm-load: Lightweight promise-based script loader
 * @version 1.0.3: Fri, 29 Jun 2018 12:47:49 GMT
 * @author stormid
 * @license MIT
 */
var create = function create(url) {
	var async = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

	return new Promise(function (resolve, reject) {
		var s = document.createElement('script');
		s.src = url;
		s.async = async;
		s.onload = s.onreadystatechange = function () {
			if (!this.readyState || this.readyState === 'complete') resolve();
		};
		s.onerror = s.onabort = reject;
		document.head.appendChild(s);
	});
};

var synchronous = exports.synchronous = function synchronous(urls) {
	return new Promise(function (resolve, reject) {
		var next = function next() {
			if (!urls.length) return resolve();
			create(urls.shift(), false).then(next).catch(reject);
		};
		next();
	});
};

exports.default = function (urls) {
	var async = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

	urls = [].concat(urls);
	if (!async) return synchronous(urls);

	return Promise.all(urls.map(function (url) {
		return create(url);
	}));
};

},{}],3:[function(require,module,exports){
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

},{"./lib/defaults":6,"./lib/factory":7,"./lib/utils":11}],4:[function(require,module,exports){
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

},{"./reducers":8}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var TRIGGER_EVENTS = exports.TRIGGER_EVENTS = window.PointerEvent ? ['pointerup', 'keydown'] : ['ontouchstart' in window ? 'touchstart' : 'click', 'keydown'];

var TRIGGER_KEYCODES = exports.TRIGGER_KEYCODES = [13, 32];

},{}],6:[function(require,module,exports){
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
	updateBtnTemplate: function updateBtnTemplate(model) {
		return '<button class="' + model.classNames.updateBtn + '">Update privacy preferences</button>';
	},
	bannerTemplate: function bannerTemplate(model) {
		return '<section role="dialog" aria-live="polite" aria-label="You privacy" class="' + model.classNames.banner + '">\n\t\t\t<div class="privacy-content">\n\t\t\t\t<div class="wrap">\n\t\t\t\t\t<div class="row">\n\t\t\t\t\t\t<!--googleoff: all-->\n\t\t\t\t\t\t<div class="privacy-banner__title">Cookies</div>\n\t\t\t\t\t\t<p>We use cookies to improve your experience on our site and show you personalised advertising.</p>\n\t\t\t\t\t\t<p>Find out more from our <a class="privacy-banner__link" rel="noopener noreferrer nofollow" href="/privacy-policy">privacy policy</a> and <a class="privacy-banner__link" rel="noopener noreferrer nofollow" href="' + model.policyURL + '">cookie policy</a>.</p>\n\t\t\t\t\t\t<button class="btn btn--primary ' + model.classNames.acceptBtn + '">Accept and close</button>\n\t\t\t\t\t\t<a class="privacy-banner__link" rel="noopener noreferrer nofollow" href="' + model.policyURL + '">Your options</a>\n\t\t\t\t\t\t<!--googleon: all-->\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</section>';
	},
	messageTemplate: function messageTemplate(model) {
		return '<div class="privacy-banner__form-msg" aria-role="alert">' + model.settings.savedMessage + '</div>';
	},
	formTemplate: function formTemplate(model) {
		return '<form class="' + model.settings.classNames.form + '" novalidate>\n\t\t\t\t' + Object.keys(model.settings.types).map(function (type) {
			return '<fieldset class="' + model.settings.classNames.fieldset + '">\n\t\t\t\t<legend class="' + model.settings.classNames.legend + '">\n\t\t\t\t\t<span class="block alpha primary-font-medium push-half--bottom ' + model.settings.classNames.title + '">' + model.settings.types[type].title + '</span>\n\t\t\t\t\t<span class="block beta push-half--bottom ' + model.settings.classNames.description + '">' + model.settings.types[type].description + '</span>\n\t\t\t\t</legend>\n\t\t\t\t<div class="form-row">\n\t\t\t\t\t<div class="relative">\n\t\t\t\t\t\t<label class="form-control-label form-control-label--checkbox">\n\t\t\t\t\t\t\t<input\n\t\t\t\t\t\t\t\tclass="form-row-checkbox__checkbox form-row-checkbox__checkbox--radio ' + model.settings.classNames.field + '"\n\t\t\t\t\t\t\t\ttype="radio"\n\t\t\t\t\t\t\t\tname="privacy-' + type.split(' ')[0].replace(' ', '-') + '"\n\t\t\t\t\t\t\t\tvalue="1"\n\t\t\t\t\t\t\t\t' + (model.consent[type] === 1 ? ' checked' : '') + '>\n\t\t\t\t\t\t\t<span class="privacy-banner__label-text">I am OK with this</span>\n\t\t\t\t\t\t\t<span class="privacy-banner__label-description">' + model.settings.types[type].labels.yes + '</span>\n\t\t\t\t\t\t</label>    \n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="form-row">\n\t\t\t\t\t<div class="relative">\n\t\t\t\t\t\t<label class="form-control-label form-control-label--checkbox">\n\t\t\t\t\t\t\t<input\n\t\t\t\t\t\t\t\tclass="form-row-checkbox__checkbox form-row-checkbox__checkbox--radio ' + model.settings.classNames.field + '"\n\t\t\t\t\t\t\t\ttype="radio"\n\t\t\t\t\t\t\t\tname="privacy-' + type.split(' ')[0].replace(' ', '-') + '"\n\t\t\t\t\t\t\t\tvalue="0"\n\t\t\t\t\t\t\t\t' + (model.consent[type] === 0 ? ' checked' : '') + '>\n\t\t\t\t\t\t\t<span class="privacy-banner__label-text">No thank you</span>\n\t\t\t\t\t\t\t<span class="privacy-banner__label-description">' + model.settings.types[type].labels.no + '</span>\n\t\t\t\t\t\t</label>    \n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</fieldset>';
		}).join('') + '\n\t\t\t<button class="btn btn--primary ' + model.settings.classNames.submitBtn + '"' + (Object.keys(model.consent).length === 0 ? ' disabled' : '') + '>Save my settings</button>\n\t\t</form>';
	}
};

},{"./utils":11}],7:[function(require,module,exports){
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

},{"./consent":4,"./reducers":8,"./store":9,"./ui":10,"./utils":11}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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

},{"./consent":4,"./constants":5,"./reducers":8,"./utils":11}],11:[function(require,module,exports){
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

},{"./constants":5}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlL3NyYy9hcHAuanMiLCJub2RlX21vZHVsZXMvc3Rvcm0tbG9hZC9kaXN0L3N0b3JtLWxvYWQuanMiLCJzcmMvaW5kZXguanMiLCJzcmMvbGliL2NvbnNlbnQuanMiLCJzcmMvbGliL2NvbnN0YW50cy5qcyIsInNyYy9saWIvZGVmYXVsdHMuanMiLCJzcmMvbGliL2ZhY3RvcnkuanMiLCJzcmMvbGliL3JlZHVjZXJzLmpzIiwic3JjL2xpYi9zdG9yZS5qcyIsInNyYy9saWIvdWkuanMiLCJzcmMvbGliL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFBLE9BQUEsUUFBQSxXQUFBLENBQUE7Ozs7QUFDQSxJQUFBLFNBQUEsUUFBQSxxQkFBQSxDQUFBOztBQUNBLElBQUEsYUFBQSxRQUFBLFlBQUEsQ0FBQTs7Ozs7Ozs7QUFFQSxPQUFBLGdCQUFBLENBQUEsa0JBQUEsRUFBNEMsWUFBTTtBQUM5QyxLQUFBLEdBQUEsWUFBQSxPQUFBLEVBQUEsd0NBQUEsRUFBQSxJQUFBLENBQ1UsWUFBTTtBQUNSLDBCQUFBLElBQUEsQ0FBdUI7QUFDbkIsb0JBRG1CLElBQUE7QUFFbkIsdUJBQVcsQ0FBRSxZQUFNO0FBQ2Ysd0JBQUEsR0FBQSxDQUFBLGNBQUE7QUFDQSxpQkFBQSxHQUFBLE9BQUEsV0FBQSxFQUFZO0FBQ1IsOEJBQVU7QUFDTiw4QkFETSx1QkFBQTtBQUVOLGdDQUFRO0FBRkYscUJBREY7QUFLUiw2QkFBUztBQUxELGlCQUFaO0FBSmUsYUFFUixDQUZRO0FBWW5CLG1CQUFPO0FBQ0gsK0JBQWU7QUFDWCwyQkFEVyx5QkFBQTtBQUVYLGlDQUZXLHFJQUFBO0FBR1gsNEJBQVE7QUFDSiw2QkFESSx1RkFBQTtBQUVKLDRCQUFJO0FBRkEscUJBSEc7QUFPWCx5QkFBSyxDQUNELFlBQU07QUFDRixnQ0FBQSxHQUFBLENBQUEsZ0JBQUE7QUFD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LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgQ29va2llQmFubmVyIGZyb20gJy4uLy4uL3NyYyc7XG5pbXBvcnQgeyB3cml0ZUNvb2tpZSB9IGZyb20gJy4uLy4uL3NyYy9saWIvdXRpbHMnO1xuaW1wb3J0IExvYWQgZnJvbSAnc3Rvcm0tbG9hZCc7XG4gICAgXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgICBMb2FkKCcuL2pzL3N0b3JtLWNvb2tpZS1iYW5uZXIuc3RhbmRhbG9uZS5qcycpXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIFN0b3JtQ29va2llQmFubmVyLmluaXQoe1xuICAgICAgICAgICAgICAgIHNlY3VyZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBuZWNlc3Nhcnk6IFsgKCkgPT4geyBcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ05lY2Vzc2FyeSBmbicpO1xuICAgICAgICAgICAgICAgICAgICB3cml0ZUNvb2tpZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICcuVGVzdC5OZWNlc3NhcnlDb29raWUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cGlyeTogM1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNlbnQ6ICc2NjYnLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IF0sXG4gICAgICAgICAgICAgICAgdHlwZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgJ3BlcmZvcm1hbmNlJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdQZXJmb3JtYW5jZSBwcmVmZXJlbmNlcycsXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1BlcmZvcm1hbmNlIGNvb2tpZXMgYXJlIHVzZWQgdG8gbWVhc3VyZSB0aGUgcGVyZm9ybWFuY2Ugb2Ygb3VyIHdlYnNpdGUgYW5kIG1ha2UgaW1wcm92ZW1lbnRzLiBZb3VyIHBlcnNvbmFsIGRhdGEgaXMgbm90IGlkZW50aWZpZWQuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHllczogJ1BhZ2VzIHlvdSB2aXNpdCBhbmQgYWN0aW9ucyB5b3UgdGFrZSB3aWxsIGJlIG1lYXN1cmVkIGFuZCB1c2VkIHRvIGltcHJvdmUgdGhlIHNlcnZpY2UnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vOiAnUGFnZXMgeW91IHZpc2l0IGFuZCBhY3Rpb25zIHlvdSB0YWtlIHdpbGwgbm90IGJlIG1lYXN1cmVkIGFuZCB1c2VkIHRvIGltcHJvdmUgdGhlIHNlcnZpY2UnXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZm5zOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKCkgPT4geyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1BlcmZvcm1hbmNlIGZuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRlQ29va2llKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJy5UZXN0LlBlcmZvcm1hbmNlQ29va2llJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHBpcnk6IDNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zZW50OiAnNjY2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAnYWRzJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdTZXQgeW91ciBwZXJzb25hbGlzZWQgYWRzIHByZWZlcmVuY2VzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnV2Ugd29yayB3aXRoIGFkdmVydGlzaW5nIHBhcnRuZXJzIHRvIHNob3cgeW91IGFkcyBmb3Igb3VyIHByb2R1Y3RzIGFuZCBzZXJ2aWNlcyBhY3Jvc3MgdGhlIHdlYi4gIFlvdSBjYW4gY2hvb3NlIHdoZXRoZXIgd2UgY29sbGVjdCBhbmQgc2hhcmUgdGhhdCBkYXRhIHdpdGggb3VyIHBhcnRuZXJzIGJlbG93LiAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWxzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeWVzOiAnT3VyIHBhcnRuZXJzIG1pZ2h0IHNlcnZlIHlvdSBhZHMga25vd2luZyB5b3UgaGF2ZSB2aXNpdGVkIG91ciB3ZWJzaXRlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBubzogJ091ciBwYXJ0bmVycyB3aWxsIHN0aWxsIHNlcnZlIHlvdSBhZHMsIGJ1dCB0aGV5IHdpbGwgbm90IGtub3cgeW91IGhhdmUgdmlzaXRlZCBvdXQgd2Vic2l0ZSdcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBmbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKSA9PiB7IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQWRzIGZuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRlQ29va2llKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJy5UZXN0LkFkc0Nvb2tpZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwaXJ5OiAzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc2VudDogJzY2NicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICBcbn0pOyIsIi8qKlxuICogQG5hbWUgc3Rvcm0tbG9hZDogTGlnaHR3ZWlnaHQgcHJvbWlzZS1iYXNlZCBzY3JpcHQgbG9hZGVyXG4gKiBAdmVyc2lvbiAxLjAuMzogRnJpLCAyOSBKdW4gMjAxOCAxMjo0Nzo0OSBHTVRcbiAqIEBhdXRob3Igc3Rvcm1pZFxuICogQGxpY2Vuc2UgTUlUXG4gKi9cbmNvbnN0IGNyZWF0ZSA9ICh1cmwsIGFzeW5jID0gdHJ1ZSkgPT4ge1xuXHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdGxldCBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cdFx0cy5zcmMgPSB1cmw7XG5cdFx0cy5hc3luYyA9IGFzeW5jO1xuXHRcdHMub25sb2FkID0gcy5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcblx0XHRcdGlmICghdGhpcy5yZWFkeVN0YXRlIHx8IHRoaXMucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJykgcmVzb2x2ZSgpO1xuXHRcdH07XG5cdFx0cy5vbmVycm9yID0gcy5vbmFib3J0ID0gcmVqZWN0O1xuXHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQocyk7XG5cdH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHN5bmNocm9ub3VzID0gdXJscyA9PiB7XG5cdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0bGV0IG5leHQgPSAoKSA9PiB7XG5cdFx0XHRpZiAoIXVybHMubGVuZ3RoKSByZXR1cm4gcmVzb2x2ZSgpO1xuXHRcdFx0Y3JlYXRlKHVybHMuc2hpZnQoKSwgZmFsc2UpLnRoZW4obmV4dCkuY2F0Y2gocmVqZWN0KTtcblx0XHR9O1xuXHRcdG5leHQoKTtcblx0fSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCAodXJscywgYXN5bmMgPSB0cnVlKSA9PiB7XG5cdHVybHMgPSBbXS5jb25jYXQodXJscyk7XG5cdGlmICghYXN5bmMpIHJldHVybiBzeW5jaHJvbm91cyh1cmxzKTtcblxuXHRyZXR1cm4gUHJvbWlzZS5hbGwodXJscy5tYXAodXJsID0+IGNyZWF0ZSh1cmwpKSk7XG59OyIsImltcG9ydCBkZWZhdWx0cyBmcm9tICcuL2xpYi9kZWZhdWx0cyc7XG5pbXBvcnQgZmFjdG9yeSBmcm9tICcuL2xpYi9mYWN0b3J5JztcbmltcG9ydCB7IGNvbXBvc2VUeXBlcyB9IGZyb20gJy4vbGliL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGluaXQ6IG9wdHMgPT4gZmFjdG9yeShPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgb3B0cywge1xuICAgICAgICB0eXBlczogT2JqZWN0LmtleXMob3B0cy50eXBlcykucmVkdWNlKGNvbXBvc2VUeXBlcyhvcHRzKSwgZGVmYXVsdHMudHlwZXMpXG4gICAgfSkpXG59OyIsImltcG9ydCB7IHVwZGF0ZUV4ZWN1dGVkIH0gZnJvbSAnLi9yZWR1Y2Vycyc7XG5cbmV4cG9ydCBjb25zdCBhcHBseSA9IFN0b3JlID0+IHN0YXRlID0+IHtcbiAgICBPYmplY3Qua2V5cyhzdGF0ZS5jb25zZW50KS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGlmKHN0YXRlLnNldHRpbmdzLnR5cGVzW2tleV0uZXhlY3V0ZWQgPT09IHRydWUpIHJldHVybjtcbiAgICAgICAgaWYoc3RhdGUuY29uc2VudFtrZXldICYmIEJvb2xlYW4oc3RhdGUuY29uc2VudFtrZXldKSkge1xuICAgICAgICAgICAgc3RhdGUuc2V0dGluZ3MudHlwZXNba2V5XS5mbnMuZm9yRWFjaChmbiA9PiBmbihzdGF0ZSkpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgU3RvcmUudXBkYXRlKHVwZGF0ZUV4ZWN1dGVkLCBPYmplY3Qua2V5cyhzdGF0ZS5zZXR0aW5ncy50eXBlcykucmVkdWNlKChhY2MsIHR5cGUpID0+IHtcbiAgICAgICAgYWNjW3R5cGVdID0gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuc2V0dGluZ3MudHlwZXNbdHlwZV0sIHsgZXhlY3V0ZWQ6IHN0YXRlLnNldHRpbmdzLnR5cGVzW3R5cGVdLmV4ZWN1dGVkIHx8IChzdGF0ZS5jb25zZW50W3R5cGVdICYmIEJvb2xlYW4oc3RhdGUuY29uc2VudFt0eXBlXSkpIH0pO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KSk7XG59O1xuXG5leHBvcnQgY29uc3QgbmVjZXNzYXJ5ID0gc3RhdGUgPT4ge1xuICAgIHN0YXRlLnNldHRpbmdzLm5lY2Vzc2FyeS5mb3JFYWNoKGZuID0+IGZuKHN0YXRlKSk7XG59O1xuXG4iLCJleHBvcnQgY29uc3QgVFJJR0dFUl9FVkVOVFMgPSB3aW5kb3cuUG9pbnRlckV2ZW50ID8gWydwb2ludGVydXAnLCAna2V5ZG93biddIDogWydvbnRvdWNoc3RhcnQnIGluIHdpbmRvdyA/ICd0b3VjaHN0YXJ0JyA6ICdjbGljaycsICdrZXlkb3duJyBdO1xuXG5leHBvcnQgY29uc3QgVFJJR0dFUl9LRVlDT0RFUyA9IFsxMywgMzJdOyIsImltcG9ydCB7IHJlbW92ZVN1YmRvbWFpbiB9IGZyb20gJy4vdXRpbHMnOyBcblxuZXhwb3J0IGRlZmF1bHQge1xuXHRuYW1lOiAnLkNvb2tpZVByZWZlcmVuY2VzJyxcblx0cGF0aDogJycsXG5cdGRvbWFpbjogd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lID09PSAnbG9jYWxob3N0JyA/ICcnIDogYC4ke3JlbW92ZVN1YmRvbWFpbih3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUpfWAsXG5cdHNlY3VyZTogdHJ1ZSxcblx0ZXhwaXJ5OiAzNjUsXG5cdHR5cGVzOiB7fSxcblx0bmVjZXNzYXJ5OiBbXSxcblx0YmFubmVyVHJpZ2dlcjogZmFsc2UsXG5cdHBvbGljeVVSTDogJy9jb29raWUtcG9saWN5Jyxcblx0Y2xhc3NOYW1lczoge1xuXHRcdGJhbm5lcjogJ3ByaXZhY3ktYmFubmVyJyxcblx0XHRhY2NlcHRCdG46ICdwcml2YWN5LWJhbm5lcl9fYWNjZXB0Jyxcblx0XHRzdWJtaXRCdG46ICdwcml2YWN5LWJhbm5lcl9fc3VibWl0Jyxcblx0XHRmaWVsZDogJ3ByaXZhY3ktYmFubmVyX19maWVsZCcsXG5cdFx0Zm9ybTogJ3ByaXZhY3ktYmFubmVyX19mb3JtJyxcblx0XHRmaWVsZHNldDogJ3ByaXZhY3ktYmFubmVyX19maWVsZHNldCcsXG5cdFx0bGVnZW5kOiAncHJpdmFjeS1iYW5uZXJfX2xlZ2VuZCcsXG5cdFx0Zm9ybUNvbnRhaW5lcjogJ3ByaXZhY3ktYmFubmVyX19mb3JtLWNvbnRhaW5lcicsXG5cdFx0Zm9ybU1lc3NhZ2U6ICdwcml2YWN5LWJhbm5lcl9fZm9ybS1tc2cnLFxuXHRcdHRpdGxlOiAncHJpdmFjeS1iYW5uZXJfX2Zvcm0tdGl0bGUnLFxuXHRcdGRlc2NyaXB0aW9uOiAncHJpdmFjeS1iYW5uZXJfX2Zvcm0tZGVzY3JpcHRpb24nXG5cdH0sXG5cdHNhdmVkTWVzc2FnZTogJ1lvdXIgc2V0dGluZ3MgaGF2ZSBiZWVuIHNhdmVkLicsXG5cdHVwZGF0ZUJ0blRlbXBsYXRlKG1vZGVsKXtcblx0XHRyZXR1cm4gYDxidXR0b24gY2xhc3M9XCIke21vZGVsLmNsYXNzTmFtZXMudXBkYXRlQnRufVwiPlVwZGF0ZSBwcml2YWN5IHByZWZlcmVuY2VzPC9idXR0b24+YFxuXHR9LFxuXHRiYW5uZXJUZW1wbGF0ZShtb2RlbCl7XG5cdFx0cmV0dXJuIGA8c2VjdGlvbiByb2xlPVwiZGlhbG9nXCIgYXJpYS1saXZlPVwicG9saXRlXCIgYXJpYS1sYWJlbD1cIllvdSBwcml2YWN5XCIgY2xhc3M9XCIke21vZGVsLmNsYXNzTmFtZXMuYmFubmVyfVwiPlxuXHRcdFx0PGRpdiBjbGFzcz1cInByaXZhY3ktY29udGVudFwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwid3JhcFwiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJyb3dcIj5cblx0XHRcdFx0XHRcdDwhLS1nb29nbGVvZmY6IGFsbC0tPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInByaXZhY3ktYmFubmVyX190aXRsZVwiPkNvb2tpZXM8L2Rpdj5cblx0XHRcdFx0XHRcdDxwPldlIHVzZSBjb29raWVzIHRvIGltcHJvdmUgeW91ciBleHBlcmllbmNlIG9uIG91ciBzaXRlIGFuZCBzaG93IHlvdSBwZXJzb25hbGlzZWQgYWR2ZXJ0aXNpbmcuPC9wPlxuXHRcdFx0XHRcdFx0PHA+RmluZCBvdXQgbW9yZSBmcm9tIG91ciA8YSBjbGFzcz1cInByaXZhY3ktYmFubmVyX19saW5rXCIgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlciBub2ZvbGxvd1wiIGhyZWY9XCIvcHJpdmFjeS1wb2xpY3lcIj5wcml2YWN5IHBvbGljeTwvYT4gYW5kIDxhIGNsYXNzPVwicHJpdmFjeS1iYW5uZXJfX2xpbmtcIiByZWw9XCJub29wZW5lciBub3JlZmVycmVyIG5vZm9sbG93XCIgaHJlZj1cIiR7bW9kZWwucG9saWN5VVJMfVwiPmNvb2tpZSBwb2xpY3k8L2E+LjwvcD5cblx0XHRcdFx0XHRcdDxidXR0b24gY2xhc3M9XCJidG4gYnRuLS1wcmltYXJ5ICR7bW9kZWwuY2xhc3NOYW1lcy5hY2NlcHRCdG59XCI+QWNjZXB0IGFuZCBjbG9zZTwvYnV0dG9uPlxuXHRcdFx0XHRcdFx0PGEgY2xhc3M9XCJwcml2YWN5LWJhbm5lcl9fbGlua1wiIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXIgbm9mb2xsb3dcIiBocmVmPVwiJHttb2RlbC5wb2xpY3lVUkx9XCI+WW91ciBvcHRpb25zPC9hPlxuXHRcdFx0XHRcdFx0PCEtLWdvb2dsZW9uOiBhbGwtLT5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQ8L3NlY3Rpb24+YDtcblx0fSxcblx0bWVzc2FnZVRlbXBsYXRlKG1vZGVsKXtcblx0XHRyZXR1cm4gYDxkaXYgY2xhc3M9XCJwcml2YWN5LWJhbm5lcl9fZm9ybS1tc2dcIiBhcmlhLXJvbGU9XCJhbGVydFwiPiR7bW9kZWwuc2V0dGluZ3Muc2F2ZWRNZXNzYWdlfTwvZGl2PmBcblx0fSxcblx0Zm9ybVRlbXBsYXRlKG1vZGVsKXtcblx0XHRyZXR1cm4gYDxmb3JtIGNsYXNzPVwiJHttb2RlbC5zZXR0aW5ncy5jbGFzc05hbWVzLmZvcm19XCIgbm92YWxpZGF0ZT5cblx0XHRcdFx0JHtPYmplY3Qua2V5cyhtb2RlbC5zZXR0aW5ncy50eXBlcykubWFwKHR5cGUgPT4gYDxmaWVsZHNldCBjbGFzcz1cIiR7bW9kZWwuc2V0dGluZ3MuY2xhc3NOYW1lcy5maWVsZHNldH1cIj5cblx0XHRcdFx0PGxlZ2VuZCBjbGFzcz1cIiR7bW9kZWwuc2V0dGluZ3MuY2xhc3NOYW1lcy5sZWdlbmR9XCI+XG5cdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJibG9jayBhbHBoYSBwcmltYXJ5LWZvbnQtbWVkaXVtIHB1c2gtaGFsZi0tYm90dG9tICR7bW9kZWwuc2V0dGluZ3MuY2xhc3NOYW1lcy50aXRsZX1cIj4ke21vZGVsLnNldHRpbmdzLnR5cGVzW3R5cGVdLnRpdGxlfTwvc3Bhbj5cblx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cImJsb2NrIGJldGEgcHVzaC1oYWxmLS1ib3R0b20gJHttb2RlbC5zZXR0aW5ncy5jbGFzc05hbWVzLmRlc2NyaXB0aW9ufVwiPiR7bW9kZWwuc2V0dGluZ3MudHlwZXNbdHlwZV0uZGVzY3JpcHRpb259PC9zcGFuPlxuXHRcdFx0XHQ8L2xlZ2VuZD5cblx0XHRcdFx0PGRpdiBjbGFzcz1cImZvcm0tcm93XCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInJlbGF0aXZlXCI+XG5cdFx0XHRcdFx0XHQ8bGFiZWwgY2xhc3M9XCJmb3JtLWNvbnRyb2wtbGFiZWwgZm9ybS1jb250cm9sLWxhYmVsLS1jaGVja2JveFwiPlxuXHRcdFx0XHRcdFx0XHQ8aW5wdXRcblx0XHRcdFx0XHRcdFx0XHRjbGFzcz1cImZvcm0tcm93LWNoZWNrYm94X19jaGVja2JveCBmb3JtLXJvdy1jaGVja2JveF9fY2hlY2tib3gtLXJhZGlvICR7bW9kZWwuc2V0dGluZ3MuY2xhc3NOYW1lcy5maWVsZH1cIlxuXHRcdFx0XHRcdFx0XHRcdHR5cGU9XCJyYWRpb1wiXG5cdFx0XHRcdFx0XHRcdFx0bmFtZT1cInByaXZhY3ktJHt0eXBlLnNwbGl0KCcgJylbMF0ucmVwbGFjZSgnICcsICctJyl9XCJcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZT1cIjFcIlxuXHRcdFx0XHRcdFx0XHRcdCR7bW9kZWwuY29uc2VudFt0eXBlXSA9PT0gMSA/IGAgY2hlY2tlZGAgOiAnJ30+XG5cdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwicHJpdmFjeS1iYW5uZXJfX2xhYmVsLXRleHRcIj5JIGFtIE9LIHdpdGggdGhpczwvc3Bhbj5cblx0XHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJwcml2YWN5LWJhbm5lcl9fbGFiZWwtZGVzY3JpcHRpb25cIj4ke21vZGVsLnNldHRpbmdzLnR5cGVzW3R5cGVdLmxhYmVscy55ZXN9PC9zcGFuPlxuXHRcdFx0XHRcdFx0PC9sYWJlbD4gICAgXG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwiZm9ybS1yb3dcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwicmVsYXRpdmVcIj5cblx0XHRcdFx0XHRcdDxsYWJlbCBjbGFzcz1cImZvcm0tY29udHJvbC1sYWJlbCBmb3JtLWNvbnRyb2wtbGFiZWwtLWNoZWNrYm94XCI+XG5cdFx0XHRcdFx0XHRcdDxpbnB1dFxuXHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwiZm9ybS1yb3ctY2hlY2tib3hfX2NoZWNrYm94IGZvcm0tcm93LWNoZWNrYm94X19jaGVja2JveC0tcmFkaW8gJHttb2RlbC5zZXR0aW5ncy5jbGFzc05hbWVzLmZpZWxkfVwiXG5cdFx0XHRcdFx0XHRcdFx0dHlwZT1cInJhZGlvXCJcblx0XHRcdFx0XHRcdFx0XHRuYW1lPVwicHJpdmFjeS0ke3R5cGUuc3BsaXQoJyAnKVswXS5yZXBsYWNlKCcgJywgJy0nKX1cIlxuXHRcdFx0XHRcdFx0XHRcdHZhbHVlPVwiMFwiXG5cdFx0XHRcdFx0XHRcdFx0JHttb2RlbC5jb25zZW50W3R5cGVdID09PSAwID8gYCBjaGVja2VkYCA6ICcnfT5cblx0XHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJwcml2YWN5LWJhbm5lcl9fbGFiZWwtdGV4dFwiPk5vIHRoYW5rIHlvdTwvc3Bhbj5cblx0XHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJwcml2YWN5LWJhbm5lcl9fbGFiZWwtZGVzY3JpcHRpb25cIj4ke21vZGVsLnNldHRpbmdzLnR5cGVzW3R5cGVdLmxhYmVscy5ub308L3NwYW4+XG5cdFx0XHRcdFx0XHQ8L2xhYmVsPiAgICBcblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2ZpZWxkc2V0PmApLmpvaW4oJycpfVxuXHRcdFx0PGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tLXByaW1hcnkgJHttb2RlbC5zZXR0aW5ncy5jbGFzc05hbWVzLnN1Ym1pdEJ0bn1cIiR7T2JqZWN0LmtleXMobW9kZWwuY29uc2VudCkubGVuZ3RoID09PSAwID8gYCBkaXNhYmxlZGAgOiAnJ30+U2F2ZSBteSBzZXR0aW5nczwvYnV0dG9uPlxuXHRcdDwvZm9ybT5gO1xuXHR9XG59OyIsImltcG9ydCB7IGNvb2tpZXNFbmFibGVkLCByZWFkQ29va2llLCBub29wIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyBpbml0QmFubmVyLCBpbml0Rm9ybSB9IGZyb20gJy4vdWknO1xuaW1wb3J0IHsgbmVjZXNzYXJ5LCBhcHBseSB9IGZyb20gJy4vY29uc2VudCc7XG5pbXBvcnQgeyBjcmVhdGVTdG9yZSB9IGZyb20gJy4vc3RvcmUnO1xuaW1wb3J0IHsgaW5pdGlhbFN0YXRlIH0gZnJvbSAnLi9yZWR1Y2Vycyc7XG5cbmV4cG9ydCBkZWZhdWx0IHNldHRpbmdzID0+IHtcbiAgICBpZighY29va2llc0VuYWJsZWQoKSkgcmV0dXJuO1xuICAgIFxuICAgIGNvbnN0IFN0b3JlID0gY3JlYXRlU3RvcmUoKTtcbiAgICBjb25zdCBjb29raWVzID0gcmVhZENvb2tpZShzZXR0aW5ncyk7XG4gICAgU3RvcmUudXBkYXRlKFxuICAgICAgICBpbml0aWFsU3RhdGUsXG4gICAgICAgIHsgc2V0dGluZ3MsIGNvbnNlbnQ6IGNvb2tpZXMgPyBKU09OLnBhcnNlKGNvb2tpZXMudmFsdWUpIDogeyB9IH0sXG4gICAgICAgIFsgbmVjZXNzYXJ5LCBhcHBseShTdG9yZSksIGNvb2tpZXMgPyBub29wIDogaW5pdEJhbm5lcihTdG9yZSksIGluaXRGb3JtKFN0b3JlKSBdXG4gICAgKTtcblxuICAgIHJldHVybiB7IGdldFN0YXRlOiBTdG9yZS5nZXRTdGF0ZSB9IDtcbn07IiwiZXhwb3J0IGNvbnN0IGluaXRpYWxTdGF0ZSA9IChzdGF0ZSwgZGF0YSkgPT4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIGRhdGEpO1xuZXhwb3J0IGNvbnN0IHVwZGF0ZUNvbnNlbnQgPSAoc3RhdGUsIGRhdGEpID0+IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IGNvbnNlbnQ6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmNvbnNlbnQsIGRhdGEpfSk7XG5leHBvcnQgY29uc3QgdXBkYXRlRXhlY3V0ZWQgPSAoc3RhdGUsIGRhdGEpID0+IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IHNldHRpbmdzOiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5zZXR0aW5ncywgeyB0eXBlczogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuc2V0dGluZ3MudHlwZXMsIGRhdGEpIH0pfSk7IiwiZXhwb3J0IGNvbnN0IGNyZWF0ZVN0b3JlID0gKCkgPT4ge1xuICAgIC8vc2hhcmVkIGNlbnRyYWxpc2VkIHZhbGlkYXRvciBzdGF0ZVxuICAgIGxldCBzdGF0ZSA9IHt9O1xuICAgIFxuICAgIC8vc3RhdGUgZ2V0dGVyXG4gICAgY29uc3QgZ2V0U3RhdGUgPSAoKSA9PiBzdGF0ZTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBuZXh0IHN0YXRlIGJ5IGludm9raW5nIHJlZHVjZXIgb24gY3VycmVudCBzdGF0ZVxuICAgICAqIFxuICAgICAqIEV4ZWN1dGUgc2lkZSBlZmZlY3RzIG9mIHN0YXRlIHVwZGF0ZSwgYXMgcGFzc2VkIGluIHRoZSB1cGRhdGVcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gcmVkdWNlciBbRnVuY3Rpb25dIFxuICAgICAqIEBwYXJhbSBuZXh0U3RhdGUgW09iamVjdF0gTmV3IHNsaWNlIG9mIHN0YXRlIHRvIGNvbWJpbmUgd2l0aCBjdXJyZW50IHN0YXRlIHRvIGNyZWF0ZSBuZXh0IHN0YXRlXG4gICAgICogQHBhcmFtIGVmZmVjdHMgW0FycmF5XSBBcnJheSBvZiBzaWRlIGVmZmVjdCBmdW5jdGlvbnMgdG8gaW52b2tlIGFmdGVyIHN0YXRlIHVwZGF0ZSAoRE9NLCBvcGVyYXRpb25zLCBjbWRzLi4uKVxuICAgICAqL1xuICAgIGNvbnN0IHVwZGF0ZSA9IGZ1bmN0aW9uKHJlZHVjZXIsIG5leHRTdGF0ZSwgZWZmZWN0cykge1xuICAgICAgICBzdGF0ZSA9ICByZWR1Y2VyKHN0YXRlLCBuZXh0U3RhdGUpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhzdGF0ZSk7XG4gICAgICAgIGlmKCFlZmZlY3RzKSByZXR1cm47XG4gICAgICAgIGVmZmVjdHMuZm9yRWFjaChlZmZlY3QgPT4geyBlZmZlY3Qoc3RhdGUpOyB9KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHsgdXBkYXRlLCBnZXRTdGF0ZSB9O1xufTsiLCJpbXBvcnQgeyBzaG91bGRSZXR1cm4sIHdyaXRlQ29va2llLCBncm91cFZhbHVlUmVkdWNlciwgZGVsZXRlQ29va2llcyB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgVFJJR0dFUl9FVkVOVFMgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBhcHBseSB9IGZyb20gJy4vY29uc2VudCc7XG5pbXBvcnQgeyB1cGRhdGVDb25zZW50IH0gZnJvbSAnLi9yZWR1Y2Vycyc7XG5cbmV4cG9ydCBjb25zdCBpbml0QmFubmVyID0gU3RvcmUgPT4gc3RhdGUgPT4ge1xuICAgIGRvY3VtZW50LmJvZHkuZmlyc3RFbGVtZW50Q2hpbGQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmViZWdpbicsIHN0YXRlLnNldHRpbmdzLmJhbm5lclRlbXBsYXRlKHN0YXRlLnNldHRpbmdzKSk7XG4gICAgY29uc3QgYmFubmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7c3RhdGUuc2V0dGluZ3MuY2xhc3NOYW1lcy5iYW5uZXJ9YCk7XG4gICAgY29uc3QgYWNjZXB0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7c3RhdGUuc2V0dGluZ3MuY2xhc3NOYW1lcy5hY2NlcHRCdG59YCk7XG5cbiAgICBUUklHR0VSX0VWRU5UUy5mb3JFYWNoKGV2ID0+IHtcbiAgICAgICAgYWNjZXB0QnRuLmFkZEV2ZW50TGlzdGVuZXIoZXYsIGUgPT4ge1xuICAgICAgICAgICAgaWYoc2hvdWxkUmV0dXJuKGUpKSByZXR1cm47XG5cbiAgICAgICAgICAgIFN0b3JlLnVwZGF0ZShcbiAgICAgICAgICAgICAgICB1cGRhdGVDb25zZW50LFxuICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKHN0YXRlLnNldHRpbmdzLnR5cGVzKS5yZWR1Y2UoKGFjYywgdHlwZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhY2NbdHlwZV0gPSAxO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICAgICAgICAgIH0sIHt9KSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIHdyaXRlQ29va2llLFxuICAgICAgICAgICAgICAgICAgICBhcHBseShTdG9yZSksXG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUJhbm5lcihiYW5uZXIpLFxuICAgICAgICAgICAgICAgICAgICBpbml0Rm9ybShTdG9yZSlcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn07XG5cbmNvbnN0IHJlbW92ZUJhbm5lciA9IGJhbm5lciA9PiAoKSA9PiAoYmFubmVyICYmIGJhbm5lci5wYXJlbnROb2RlKSAmJiBiYW5uZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChiYW5uZXIpO1xuXG5leHBvcnQgY29uc3QgaW5pdEZvcm0gPSBTdG9yZSA9PiBzdGF0ZSA9PiB7XG4gICAgY29uc3QgZm9ybUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3N0YXRlLnNldHRpbmdzLmNsYXNzTmFtZXMuZm9ybUNvbnRhaW5lcn1gKTtcbiAgICBpZighZm9ybUNvbnRhaW5lcikgcmV0dXJuO1xuXG4gICAgZm9ybUNvbnRhaW5lci5pbm5lckhUTUwgPSBzdGF0ZS5zZXR0aW5ncy5mb3JtVGVtcGxhdGUoc3RhdGUpO1xuXG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3N0YXRlLnNldHRpbmdzLmNsYXNzTmFtZXMuZm9ybX1gKTtcbiAgICBjb25zdCBiYW5uZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtzdGF0ZS5zZXR0aW5ncy5jbGFzc05hbWVzLmJhbm5lcn1gKTtcbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtzdGF0ZS5zZXR0aW5ncy5jbGFzc05hbWVzLnN1Ym1pdEJ0bn1gKTtcbiAgICBjb25zdCBncm91cHMgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke3N0YXRlLnNldHRpbmdzLmNsYXNzTmFtZXMuZmllbGR9YCkpLnJlZHVjZSgoZ3JvdXBzLCBmaWVsZCkgPT4ge1xuICAgICAgICBjb25zdCBncm91cE5hbWUgPSBmaWVsZC5nZXRBdHRyaWJ1dGUoJ25hbWUnKS5yZXBsYWNlKCdwcml2YWN5LScsICcnKTtcbiAgICAgICAgaWYoZ3JvdXBzW2dyb3VwTmFtZV0pIGdyb3Vwc1tncm91cE5hbWVdLnB1c2goZmllbGQpO1xuICAgICAgICBlbHNlIGdyb3Vwc1tncm91cE5hbWVdID0gW2ZpZWxkXTtcbiAgICAgICAgcmV0dXJuIGdyb3VwcztcbiAgICB9LCB7fSk7XG5cbiAgICBjb25zdCBleHRyYWN0Q29uc2VudCA9ICgpID0+IE9iamVjdC5rZXlzKGdyb3VwcykucmVkdWNlKChhY2MsIGtleSkgPT4ge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGdyb3Vwc1trZXldLnJlZHVjZShncm91cFZhbHVlUmVkdWNlciwgJycpO1xuICAgICAgICBpZih2YWx1ZSkgYWNjW2tleV0gPSBwYXJzZUludCh2YWx1ZSk7XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30pO1xuXG4gICAgY29uc3QgZW5hYmxlQnV0dG9uID0gZSA9PiB7XG4gICAgICAgIGlmKE9iamVjdC5rZXlzKGV4dHJhY3RDb25zZW50KCkpLmxlbmd0aCAhPT0gT2JqZWN0LmtleXMoZ3JvdXBzKS5sZW5ndGgpIHJldHVybjtcbiAgICAgICAgYnV0dG9uLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgICAgICAgZm9ybS5yZW1vdmVFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlbmFibGVCdXR0b24pO1xuICAgIH07XG4gICAgYnV0dG9uLmhhc0F0dHJpYnV0ZSgnZGlzYWJsZWQnKSAmJiBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGVuYWJsZUJ1dHRvbik7XG4gICAgXG4gICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBlID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBTdG9yZS51cGRhdGUoXG4gICAgICAgICAgICB1cGRhdGVDb25zZW50LFxuICAgICAgICAgICAgZXh0cmFjdENvbnNlbnQoKSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBkZWxldGVDb29raWVzLFxuICAgICAgICAgICAgICAgIHdyaXRlQ29va2llLFxuICAgICAgICAgICAgICAgIGFwcGx5KFN0b3JlKSxcbiAgICAgICAgICAgICAgICByZW1vdmVCYW5uZXIoYmFubmVyKSxcbiAgICAgICAgICAgICAgICByZW5kZXJNZXNzYWdlKGJ1dHRvbilcbiAgICAgICAgICAgIF1cbiAgICAgICAgKTtcbiAgICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCByZW5kZXJNZXNzYWdlID0gYnV0dG9uID0+IHN0YXRlID0+IHtcbiAgICBidXR0b24uaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmVuZCcsIHN0YXRlLnNldHRpbmdzLm1lc3NhZ2VUZW1wbGF0ZShzdGF0ZSkpO1xuICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBidXR0b24ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChidXR0b24ubmV4dEVsZW1lbnRTaWJsaW5nKTtcbiAgICAgICAgYnV0dG9uLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgICB9LCAzMDAwKTtcbn07IiwiaW1wb3J0IHsgVFJJR0dFUl9LRVlDT0RFUyB9IGZyb20gJy4vY29uc3RhbnRzJztcblxuLy9Nb2Rlcm5penIgY29va2llIHRlc3RcbmV4cG9ydCBjb25zdCBjb29raWVzRW5hYmxlZCA9ICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgICBkb2N1bWVudC5jb29raWUgPSAnY29va2lldGVzdD0xJztcbiAgICAgICAgY29uc3QgcmV0ID0gZG9jdW1lbnQuY29va2llLmluZGV4T2YoJ2Nvb2tpZXRlc3Q9JykgIT09IC0xO1xuICAgICAgICBkb2N1bWVudC5jb29raWUgPSAnY29va2lldGVzdD0xOyBleHBpcmVzPVRodSwgMDEtSmFuLTE5NzAgMDA6MDA6MDEgR01UJztcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH1cbiAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbn07XG5cbmV4cG9ydCBjb25zdCB3cml0ZUNvb2tpZSA9IHN0YXRlID0+IHtcbiAgICBkb2N1bWVudC5jb29raWUgPSBbXG4gICAgICAgIGAke3N0YXRlLnNldHRpbmdzLm5hbWV9PSR7SlNPTi5zdHJpbmdpZnkoc3RhdGUuY29uc2VudCl9O2AsXG4gICAgICAgIGBleHBpcmVzPSR7KG5ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgKHN0YXRlLnNldHRpbmdzLmV4cGlyeSoyNCo2MCo2MCoxMDAwKSkpLnRvR01UU3RyaW5nKCl9O2AsXG4gICAgICAgIHN0YXRlLnNldHRpbmdzLnBhdGggPyBgcGF0aD0ke3N0YXRlLnNldHRpbmdzLnBhdGh9YCA6ICcnLFxuICAgICAgICBzdGF0ZS5zZXR0aW5ncy5kb21haW4gPyBgZG9tYWluPSR7c3RhdGUuc2V0dGluZ3MuZG9tYWlufWAgOiAnJyxcbiAgICAgICAgc3RhdGUuc2V0dGluZ3Muc2VjdXJlID8gYHNlY3VyZWAgOiAnJ1xuICAgIF0uam9pbignJyk7XG59XG5cbmV4cG9ydCBjb25zdCByZWFkQ29va2llID0gc2V0dGluZ3MgPT4ge1xuICAgIGNvbnN0IGNvb2tpZSA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOyAnKS5tYXAocGFydCA9PiAoeyBuYW1lOiBwYXJ0LnNwbGl0KCc9JylbMF0sIHZhbHVlOiBwYXJ0LnNwbGl0KCc9JylbMV0gfSkpLmZpbHRlcihwYXJ0ID0+IHBhcnQubmFtZSA9PT0gc2V0dGluZ3MubmFtZSlbMF07XG4gICAgcmV0dXJuIGNvb2tpZSAhPT0gdW5kZWZpbmVkID8gY29va2llIDogZmFsc2U7XG59O1xuXG5jb25zdCB1cGRhdGVDb29raWUgPSBzdGF0ZSA9PiBtb2RlbCA9PiBkb2N1bWVudC5jb29raWUgPSBbXG4gICAgYCR7bW9kZWwubmFtZX09JHttb2RlbC52YWx1ZX07YCxcbiAgICBgZXhwaXJlcz0ke21vZGVsLmV4cGlyeX07YCxcbiAgICBgcGF0aD0ke3N0YXRlLnNldHRpbmdzLnBhdGh9O2AsXG4gICAgc3RhdGUuc2V0dGluZ3MuZG9tYWluID8gYGRvbWFpbj0ke3N0YXRlLnNldHRpbmdzLmRvbWFpbn07YCA6ICcnLFxuICAgIHN0YXRlLnNldHRpbmdzLnNlY3VyZSA/IGBzZWN1cmVgIDogJydcbl0uam9pbignJyk7XG5cbmV4cG9ydCBjb25zdCBkZWxldGVDb29raWVzID0gc3RhdGUgPT4ge1xuICAgIGRvY3VtZW50LmNvb2tpZVxuICAgICAgICAuc3BsaXQoJzsgJylcbiAgICAgICAgLm1hcChwYXJ0ID0+ICh7IFxuICAgICAgICAgICAgbmFtZTogcGFydC5zcGxpdCgnPScpWzBdLFxuICAgICAgICAgICAgdmFsdWU6IHBhcnQuc3BsaXQoJz0nKVsxXSxcbiAgICAgICAgICAgIGV4cGlyeTogJ1RodSwgMDEgSmFuIDE5NzAgMDA6MDA6MDEgR01UJ1xuICAgICAgICB9KSlcbiAgICAgICAgLm1hcCh1cGRhdGVDb29raWUoc3RhdGUpKTtcbn07XG5cbmV4cG9ydCBjb25zdCBzaG91bGRSZXR1cm4gPSBlID0+ICghIWUua2V5Q29kZSAmJiAhflRSSUdHRVJfS0VZQ09ERVMuaW5kZXhPZihlLmtleUNvZGUpIHx8IChlLndoaWNoICYmIGUud2hpY2ggPT09IDMpKTtcblxuZXhwb3J0IGNvbnN0IGNvbXBvc2VUeXBlcyA9IG9wdHMgPT4gKGFjYywgY3VycikgPT4ge1xuICAgIGlmKGFjY1tjdXJyXSkge1xuICAgICAgICBhY2NbY3Vycl0gPSBPYmplY3QuYXNzaWduKHt9LCBhY2NbY3Vycl0sIHtcbiAgICAgICAgICAgIGZuczogYWNjW2N1cnJdLmZucy5jb25jYXQob3B0cy50eXBlc1tjdXJyXS5mbnMpLFxuICAgICAgICB9KTtcbiAgICB9ICBlbHNlIGFjY1tjdXJyXSA9IG9wdHMudHlwZXNbY3Vycl07XG4gICAgcmV0dXJuIGFjYztcbn07XG5cbmV4cG9ydCBjb25zdCBub29wID0gKCkgPT4ge307XG5cbmV4cG9ydCBjb25zdCBpc0NoZWNrYWJsZSA9IGZpZWxkID0+ICgvcmFkaW98Y2hlY2tib3gvaSkudGVzdChmaWVsZC50eXBlKTtcblxuY29uc3QgaGFzVmFsdWUgPSBpbnB1dCA9PiAoaW5wdXQudmFsdWUgIT09IHVuZGVmaW5lZCAmJiBpbnB1dC52YWx1ZSAhPT0gbnVsbCAmJiBpbnB1dC52YWx1ZS5sZW5ndGggPiAwKTtcblxuZXhwb3J0IGNvbnN0IGdyb3VwVmFsdWVSZWR1Y2VyID0gKGFjYywgaW5wdXQpID0+IHtcbiAgICBpZighaXNDaGVja2FibGUoaW5wdXQpICYmIGhhc1ZhbHVlKGlucHV0KSkgYWNjID0gaW5wdXQudmFsdWU7XG4gICAgaWYoaXNDaGVja2FibGUoaW5wdXQpICYmIGlucHV0LmNoZWNrZWQpIHtcbiAgICAgICAgaWYoQXJyYXkuaXNBcnJheShhY2MpKSBhY2MucHVzaChpbnB1dC52YWx1ZSlcbiAgICAgICAgZWxzZSBhY2MgPSBbaW5wdXQudmFsdWVdO1xuICAgIH1cbiAgICByZXR1cm4gYWNjO1xufTtcblxuY29uc3QgZmlyc3RUTERzICA9IFwiYWN8YWR8YWV8YWZ8YWd8YWl8YWx8YW18YW58YW98YXF8YXJ8YXN8YXR8YXV8YXd8YXh8YXp8YmF8YmJ8YmV8YmZ8Ymd8Ymh8Yml8Ymp8Ym18Ym98YnJ8YnN8YnR8YnZ8Ynd8Ynl8Ynp8Y2F8Y2N8Y2R8Y2Z8Y2d8Y2h8Y2l8Y2x8Y218Y258Y298Y3J8Y3V8Y3Z8Y3d8Y3h8Y3p8ZGV8ZGp8ZGt8ZG18ZG98ZHp8ZWN8ZWV8ZWd8ZXN8ZXR8ZXV8Zml8Zm18Zm98ZnJ8Z2F8Z2J8Z2R8Z2V8Z2Z8Z2d8Z2h8Z2l8Z2x8Z218Z258Z3B8Z3F8Z3J8Z3N8Z3R8Z3d8Z3l8aGt8aG18aG58aHJ8aHR8aHV8aWR8aWV8aW18aW58aW98aXF8aXJ8aXN8aXR8amV8am98anB8a2d8a2l8a218a258a3B8a3J8a3l8a3p8bGF8bGJ8bGN8bGl8bGt8bHJ8bHN8bHR8bHV8bHZ8bHl8bWF8bWN8bWR8bWV8bWd8bWh8bWt8bWx8bW58bW98bXB8bXF8bXJ8bXN8bXR8bXV8bXZ8bXd8bXh8bXl8bmF8bmN8bmV8bmZ8bmd8bmx8bm98bnJ8bnV8bnp8b218cGF8cGV8cGZ8cGh8cGt8cGx8cG18cG58cHJ8cHN8cHR8cHd8cHl8cWF8cmV8cm98cnN8cnV8cnd8c2F8c2J8c2N8c2R8c2V8c2d8c2h8c2l8c2p8c2t8c2x8c218c258c298c3J8c3R8c3V8c3Z8c3h8c3l8c3p8dGN8dGR8dGZ8dGd8dGh8dGp8dGt8dGx8dG18dG58dG98dHB8dHJ8dHR8dHZ8dHd8dHp8dWF8dWd8dWt8dXN8dXl8dXp8dmF8dmN8dmV8dmd8dml8dm58dnV8d2Z8d3N8eXRcIi5zcGxpdCgnfCcpO1xuY29uc3Qgc2Vjb25kVExEcyA9IFwiYXp1cmV3ZWJzaXRlc3xjb218ZWR1fGdvdnxuZXR8bWlsfG9yZ3xub218c2NofGNhYXxyZXN8b2ZmfGdvYnxpbnR8dHVyfGlwNnx1cml8dXJufGFzbnxhY3R8bnN3fHFsZHx0YXN8dmljfHByb3xiaXp8YWRtfGFkdnxhZ3J8YXJxfGFydHxhdG98YmlvfGJtZHxjaW18Y25nfGNudHxlY258ZWNvfGVtcHxlbmd8ZXNwfGV0Y3xldGl8ZmFyfGZuZHxmb3R8ZnN0fGcxMnxnZ2Z8aW1ifGluZHxpbmZ8am9yfGp1c3xsZWd8bGVsfG1hdHxtZWR8bXVzfG5vdHxudHJ8b2RvfHBwZ3xwc2N8cHNpfHFzbHxyZWN8c2xnfHNydnx0ZW98dG1wfHRyZHx2ZXR8emxnfHdlYnxsdGR8c2xkfHBvbHxmaW58azEyfGxpYnxwcml8YWlwfGZpZXxldW58c2NpfHByZHxjY2l8cHZ0fG1vZHxpZHZ8cmVsfHNleHxnZW58bmljfGFicnxiYXN8Y2FsfGNhbXxlbXJ8ZnZnfGxhenxsaWd8bG9tfG1hcnxtb2x8cG1ufHB1Z3xzYXJ8c2ljfHRhYXx0b3N8dW1ifHZhb3x2ZGF8dmVufG1pZXzljJfmtbfpgZN85ZKM5q2M5bGxfOelnuWliOW3nXzpub/lhZDls7Z8YXNzfHJlcHx0cmF8cGVyfG5nb3xzb2N8Z3JwfHBsY3xpdHN8YWlyfGFuZHxidXN8Y2FufGRkcnxqZmt8bWFkfG5yd3xueWN8c2tpfHNweXx0Y218dWxtfHVzYXx3YXJ8ZmhzfHZnc3xkZXB8ZWlkfGZldHxmbGF8ZmzDpXxnb2x8aG9mfGhvbHxzZWx8dmlrfGNyaXxpd2l8aW5nfGFib3xmYW18Z29rfGdvbnxnb3B8Z29zfGFpZHxhdG18Z3NtfHNvc3xlbGt8d2F3fGVzdHxhY2F8YmFyfGNwYXxqdXJ8bGF3fHNlY3xwbG98d3d3fGJpcnxjYmd8amFyfGtodnxtc2t8bm92fG5za3xwdHp8cm5kfHNwYnxzdHZ8dG9tfHRza3x1ZG18dnJufGNtd3xrbXN8bmt6fHNuenxwdWJ8Zmh2fHJlZHxlbnN8bmF0fHJuc3xybnV8YmJzfHRlbHxiZWx8a2VwfG5oc3xkbml8ZmVkfGlzYXxuc258Z3VifGUxMnx0ZWN80L7RgNCzfNC+0LHRgHzRg9C/0YB8YWx0fG5pc3xqcG58bWV4fGF0aHxpa2l8bmlkfGdkYXxpbmNcIi5zcGxpdCgnfCcpO1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlU3ViZG9tYWluID0gcyA9PiB7XG4gICAgcyA9IHMucmVwbGFjZSgvXnd3d1xcLi8sICcnKTtcbiAgICBsZXQgcGFydHMgPSBzLnNwbGl0KCcuJyk7XG4gICAgXG4gICAgd2hpbGUgKHBhcnRzLmxlbmd0aCA+IDMpIHtcbiAgICAgICAgcGFydHMuc2hpZnQoKTtcbiAgICB9XG5cbiAgICBpZiAocGFydHMubGVuZ3RoID09PSAzICYmICgoc2Vjb25kVExEcy5pbmRleE9mKHBhcnRzWzFdKSA9PT0gLTEpICYmIGZpcnN0VExEcy5pbmRleE9mKHBhcnRzWzJdKSA9PT0gLTEpKSB7XG4gICAgICAgIHBhcnRzLnNoaWZ0KCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcnRzLmpvaW4oJy4nKTtcbn07Il19
