/**
 * @name storm-cookie-banner: 
 * @version 0.4.0: Thu, 26 Sep 2019 12:02:09 GMT
 * @author stormid
 * @license MIT
 */
(function(root, factory) {
   var mod = {
       exports: {}
   };
   if (typeof exports !== 'undefined'){
       mod.exports = exports
       factory(mod.exports)
       module.exports = mod.exports.default
   } else {
       factory(mod.exports);
       root.StormCookieBanner = mod.exports.default
   }

}(this, function(exports) {
   'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var TRIGGER_EVENTS = window.PointerEvent ? ['pointerup', 'keydown'] : ['ontouchstart' in window ? 'touchstart' : 'click', 'keydown'];

var TRIGGER_KEYCODES = [13, 32];

//Modernizr cookie test
var cookiesEnabled = function cookiesEnabled() {
    try {
        document.cookie = 'cookietest=1';
        var ret = document.cookie.indexOf('cookietest=') !== -1;
        document.cookie = 'cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT';
        return ret;
    } catch (e) {
        return false;
    }
};

var writeCookie = function writeCookie(state) {
    document.cookie = [state.settings.name + '=' + JSON.stringify(state.consent) + ';', 'expires=' + new Date(new Date().getTime() + state.settings.expiry * 24 * 60 * 60 * 1000).toGMTString() + ';', state.settings.path ? 'path=' + state.settings.path : '', state.settings.domain ? 'domain=' + state.settings.domain : '', state.settings.secure ? 'secure' : ''].join('');
};

var readCookie = function readCookie(settings) {
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

var deleteCookies = function deleteCookies(state) {
    document.cookie.split('; ').map(function (part) {
        return {
            name: part.split('=')[0],
            value: part.split('=')[1],
            expiry: 'Thu, 01 Jan 1970 00:00:01 GMT'
        };
    }).map(updateCookie(state));
};

var shouldReturn = function shouldReturn(e) {
    return !!e.keyCode && !~TRIGGER_KEYCODES.indexOf(e.keyCode) || e.which && e.which === 3;
};

var composeTypes = function composeTypes(opts) {
    return function (acc, curr) {
        if (acc[curr]) {
            acc[curr] = Object.assign({}, acc[curr], {
                fns: acc[curr].fns.concat(opts.types[curr].fns)
            });
        } else acc[curr] = opts.types[curr];
        return acc;
    };
};

var noop = function noop() {};

var isCheckable = function isCheckable(field) {
    return (/radio|checkbox/i.test(field.type)
    );
};

var hasValue = function hasValue(input) {
    return input.value !== undefined && input.value !== null && input.value.length > 0;
};

var groupValueReducer = function groupValueReducer(acc, input) {
    if (!isCheckable(input) && hasValue(input)) acc = input.value;
    if (isCheckable(input) && input.checked) {
        if (Array.isArray(acc)) acc.push(input.value);else acc = [input.value];
    }
    return acc;
};

var firstTLDs = "ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|be|bf|bg|bh|bi|bj|bm|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|cl|cm|cn|co|cr|cu|cv|cw|cx|cz|de|dj|dk|dm|do|dz|ec|ee|eg|es|et|eu|fi|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|im|in|io|iq|ir|is|it|je|jo|jp|kg|ki|km|kn|kp|kr|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|na|nc|ne|nf|ng|nl|no|nr|nu|nz|om|pa|pe|pf|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sx|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|yt".split('|');
var secondTLDs = "azurewebsites|com|edu|gov|net|mil|org|nom|sch|caa|res|off|gob|int|tur|ip6|uri|urn|asn|act|nsw|qld|tas|vic|pro|biz|adm|adv|agr|arq|art|ato|bio|bmd|cim|cng|cnt|ecn|eco|emp|eng|esp|etc|eti|far|fnd|fot|fst|g12|ggf|imb|ind|inf|jor|jus|leg|lel|mat|med|mus|not|ntr|odo|ppg|psc|psi|qsl|rec|slg|srv|teo|tmp|trd|vet|zlg|web|ltd|sld|pol|fin|k12|lib|pri|aip|fie|eun|sci|prd|cci|pvt|mod|idv|rel|sex|gen|nic|abr|bas|cal|cam|emr|fvg|laz|lig|lom|mar|mol|pmn|pug|sar|sic|taa|tos|umb|vao|vda|ven|mie|北海道|和歌山|神奈川|鹿児島|ass|rep|tra|per|ngo|soc|grp|plc|its|air|and|bus|can|ddr|jfk|mad|nrw|nyc|ski|spy|tcm|ulm|usa|war|fhs|vgs|dep|eid|fet|fla|flå|gol|hof|hol|sel|vik|cri|iwi|ing|abo|fam|gok|gon|gop|gos|aid|atm|gsm|sos|elk|waw|est|aca|bar|cpa|jur|law|sec|plo|www|bir|cbg|jar|khv|msk|nov|nsk|ptz|rnd|spb|stv|tom|tsk|udm|vrn|cmw|kms|nkz|snz|pub|fhv|red|ens|nat|rns|rnu|bbs|tel|bel|kep|nhs|dni|fed|isa|nsn|gub|e12|tec|орг|обр|упр|alt|nis|jpn|mex|ath|iki|nid|gda|inc".split('|');

var removeSubdomain = function removeSubdomain(s) {
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

var defaults = {
    name: '.CookiePreferences',
    path: '',
    domain: window.location.hostname === 'localhost' ? '' : '.' + removeSubdomain(window.location.hostname),
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

var initialState = function initialState(state, data) {
    return Object.assign({}, state, data);
};
var updateConsent = function updateConsent(state, data) {
    return Object.assign({}, state, { consent: Object.assign({}, state.consent, data) });
};
var updateExecuted = function updateExecuted(state, data) {
    return Object.assign({}, state, { settings: Object.assign({}, state.settings, { types: Object.assign({}, state.settings.types, data) }) });
};

var apply = function apply(Store) {
    return function (state) {
        Object.keys(state.consent).forEach(function (key) {
            if (state.settings.types[key].executed === true) return;
            if (state.consent[key] && Boolean(state.consent[key])) {
                state.settings.types[key].fns.forEach(function (fn) {
                    return fn(state);
                });
            }
        });
        Store.update(updateExecuted, Object.keys(state.settings.types).reduce(function (acc, type) {
            acc[type] = Object.assign({}, state.settings.types[type], { executed: state.settings.types[type].executed || state.consent[type] && Boolean(state.consent[type]) });
            return acc;
        }, {}));
    };
};

var necessary = function necessary(state) {
    state.settings.necessary.forEach(function (fn) {
        return fn(state);
    });
};

var initBanner = function initBanner(Store) {
    return function (state) {
        document.body.firstElementChild.insertAdjacentHTML('beforebegin', state.settings.bannerTemplate(state.settings));
        var banner = document.querySelector('.' + state.settings.classNames.banner);
        var acceptBtn = document.querySelector('.' + state.settings.classNames.acceptBtn);

        TRIGGER_EVENTS.forEach(function (ev) {
            acceptBtn.addEventListener(ev, function (e) {
                if (shouldReturn(e)) return;

                Store.update(updateConsent, Object.keys(state.settings.types).reduce(function (acc, type) {
                    acc[type] = 1;
                    return acc;
                }, {}), [writeCookie, apply(Store), removeBanner(banner), initForm(Store)]);
            });
        });
    };
};

var removeBanner = function removeBanner(banner) {
    return function () {
        return banner && banner.parentNode && banner.parentNode.removeChild(banner);
    };
};

var initForm = function initForm(Store) {
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
                var value = groups[key].reduce(groupValueReducer, '');
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
            Store.update(updateConsent, extractConsent(), [deleteCookies, writeCookie, apply(Store), removeBanner(banner), renderMessage(button)]);
        });
    };
};

var renderMessage = function renderMessage(button) {
    return function (state) {
        button.insertAdjacentHTML('afterend', state.settings.messageTemplate(state));
        button.setAttribute('disabled', 'disabled');
        window.setTimeout(function () {
            button.parentNode.removeChild(button.nextElementSibling);
            button.removeAttribute('disabled');
        }, 3000);
    };
};

var createStore = function createStore() {
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

var factory = function factory(settings) {
    if (!cookiesEnabled()) return;

    var Store = createStore();
    var cookies = readCookie(settings);
    Store.update(initialState, { settings: settings, consent: cookies ? JSON.parse(cookies.value) : {} }, [necessary, apply(Store), cookies ? noop : initBanner(Store), initForm(Store)]);

    return { getState: Store.getState };
};

var index = {
    init: function init(opts) {
        return factory(Object.assign({}, defaults, opts, {
            types: Object.keys(opts.types).reduce(composeTypes(opts), defaults.types)
        }));
    }
};

exports.default = index;;
}));
