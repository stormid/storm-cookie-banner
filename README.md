# Storm cookie banner

Cookie banner that can categorise cookies and conditionally invoke functionality that generates cookies based on user consent.

[![npm version](https://badge.fury.io/js/storm-cookie-banner.svg)](https://badge.fury.io/js/storm-cookie-banner)

## Example
[https://stormid.github.io/storm-cookie-banner](https://stormid.github.io/storm-cookie-banner)

## Usage
Cookie management works by categorising cookies and the functions that initialise them, encapsulating them in a configuration 'type'.

A cookie type is a collection of cookies that the user can consent to. Each type consists of a settings used used in the consent form - title, description, labels for consent/refusal inputs; as well as an array of functions that create cookies that execute if the user consents to the type. 

Necessary cookies (or functions that create necessary cookies) do not need to be managed via the Cookie Banner, but if you would like to hook in to the banner lifecycle to trigger them, the functions can be added to the 'necessary' array configuration property. 

Cookies type names can be any valid String.

JS
```
npm i -S storm-cookie-banner
```
Using es6 import
```
import CookieBanner from 'storm-cookie-banner';

CookieBanner.init({
	necessary: [ () => { 
            //code that generates a cookie
        } ],
        types: {
            'performance': {
                title: 'Performance preferences',
                description: 'Performance cookies are used to measure the performance of our website and make improvements. Your personal data is not identified.',
                labels: {
                    yes: 'Pages you visit and actions you take will be measured and used to improve the service',
                    no: 'Pages you visit and actions you take will not be measured and used to improve the service'
                },
                fns: [
                    () => { 
            			//code related to performance that generates a cookie
                    },					
                    () => { 
            			//code related to performance that generates a cookie
                    }
                ]
            },
            'ads': {
                title: 'Set your personalised ads preferences',
                description: 'We work with advertising partners to show you ads for our products and services across the web.  You can choose whether we collect and share that data with our partners below. ',
                labels: {
                    yes: 'Our partners might serve you ads knowing you have visited our website',
                    no: 'Our partners will still serve you ads, but they will not know you have visited out website'
                },
                fns: [
                    () => { 
            			//code related to ads that generates a cookie
                    }
                ]
            }
        }
});
```
or aynchronous browser loading (use the .standalone version in the /dist folder)
```
import Load from 'storm-load';

Load('/content/js/async/storm-cookie-banner.standalone.js')
    .then(() => {
        StormCookieBanner.init({
	    types: { ... as es6 example }
	});
```


## Default options
No cookie types are included by default, you must configure that yourself

```
{
	name: '.CookiePreferences',
	path: '',
	domain: window.location.hostname === 'localhost' ? '' : `.${removeSubdomain(window.location.hostname)}`,
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
	updateBtnTemplate(model){
		return `<button class="${model.classNames.updateBtn}">Update privacy preferences</button>`
	},
	bannerTemplate(model){
		return `<section role="dialog" aria-live="polite" aria-label="You privacy" class="${model.classNames.banner}">
			<div class="privacy-content">
				<div class="wrap">
					<div class="row">
						<!--googleoff: all-->
						<div class="privacy-banner__title">Cookies</div>
						<p>We use cookies to improve your experience on our site and show you personalised advertising.</p>
						<p>Find out more from our <a class="privacy-banner__link" rel="noopener noreferrer nofollow" href="/privacy-policy">privacy policy</a> and <a class="privacy-banner__link" rel="noopener noreferrer nofollow" href="${model.policyURL}">cookie policy</a>.</p>
						<button class="btn btn--primary ${model.classNames.acceptBtn}">Accept and close</button>
						<a class="privacy-banner__link" rel="noopener noreferrer nofollow" href="${model.policyURL}">Your options</a>
						<!--googleon: all-->
					</div>
				</div>
			</div>
		</section>`;
	},
	messageTemplate(model){
		return `<div class="privacy-banner__form-msg" aria-role="alert">${model.settings.savedMessage}</div>`
	},
	formTemplate(model){
		return `<form class="${model.settings.classNames.form}" novalidate>
				${Object.keys(model.settings.types).map(type => `<fieldset class="${model.settings.classNames.fieldset}">
				<legend class="${model.settings.classNames.legend}">
					<span class="block alpha primary-font-medium push-half--bottom ${model.settings.classNames.title}">${model.settings.types[type].title}</span>
					<span class="block beta push-half--bottom ${model.settings.classNames.description}">${model.settings.types[type].description}</span>
				</legend>
				<div class="form-row">
					<div class="relative">
						<label class="form-control-label form-control-label--checkbox">
							<input
								class="form-row-checkbox__checkbox form-row-checkbox__checkbox--radio ${model.settings.classNames.field}"
								type="radio"
								name="privacy-${type.split(' ')[0].replace(' ', '-')}"
								value="1"
								${model.consent[type] === 1 ? ` checked` : ''}>
							<span class="privacy-banner__label-text">I am OK with this</span>
							<span class="privacy-banner__label-description">${model.settings.types[type].labels.yes}</span>
						</label>    
					</div>
				</div>
				<div class="form-row">
					<div class="relative">
						<label class="form-control-label form-control-label--checkbox">
							<input
								class="form-row-checkbox__checkbox form-row-checkbox__checkbox--radio ${model.settings.classNames.field}"
								type="radio"
								name="privacy-${type.split(' ')[0].replace(' ', '-')}"
								value="0"
								${model.consent[type] === 0 ? ` checked` : ''}>
							<span class="privacy-banner__label-text">No thank you</span>
							<span class="privacy-banner__label-description">${model.settings.types[type].labels.no}</span>
						</label>    
					</div>
				</div>
			</fieldset>`).join('')}
			<button class="btn btn--primary ${model.settings.classNames.submitBtn}"${Object.keys(model.consent).length === 0 ? ` disabled` : ''}>Save my settings</button>
		</form>`;
}
```

## Tests
```
npm t
```

## Browser support
This is module has both es6 and es5 distributions. The es6 version should be used in a workflow that transpiles.

The es5 version depends unpon Object.assign so all evergreen browsers are supported out of the box, ie9+ is supported with polyfills. ie8+ will work with even more polyfils for Array functions and eventListeners.

## Dependencies
None

## License
MIT
