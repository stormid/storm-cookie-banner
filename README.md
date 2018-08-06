# Storm cookie banner

Cookie banner that can categorise cookies and conditionally invoke cookie-reliant functionality based on user-consent.

[![npm version](https://badge.fury.io/js/storm-cookie-banner.svg)](https://badge.fury.io/js/storm-cookie-banner)

## Example
[https://mjbp.github.io/storm-cookie-banner](https://mjbp.github.io/storm-cookie-banner)

## Usage
Cookie management works by categorising cookies and the functions that initialise them, encapsulating them in a configuration object.

Cookies category names can be any valid String. Preference cookies are a mandatory category that is used by the banner itself to save preferences if consented.

JS
```
npm i -S storm-cookie-banner
```
Using es6 import
```
import CookieBanner from 'storm-cookie-banner';

CookieBanner.init({
    types: {
        'necessary': {
            fns: [
                () => { 
                    //function that depends upon or creates a 'necessary' cookies
                 }
            ]
        },
        'preference': {
            checked: true, //whether the checkbox shown to the user is checked by default or not
            fns: [ //array of cookie-reliant functions
                () => { 
                    //function that depends upon or creates a 'preference' cookies
                 }
            ]
        },
        'performance': {
            checked: true,
            fns: [
                () => { 
                    //function that depends upon or creates a 'performance' cookies
                }
            ]
        },
        'advertising and marketing': {
            checked: false,
            fns: [
                () => { 
                    //function that depends upon or creates a 'Advertising and marketing' cookies
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
        StormCookieBanner.init('.js-tabs');
    });
```


## Options
```
{
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
			fns: [
				model => { document.cookie = writeCookie(model); }
			]
		}
	},
	classNames: {
		banner: 'cookie-banner',
		btn: 'cookie-banner__btn',
		field: 'cookie-banner__field',
		updateBtnContainer: 'cookie-banner__update',
		updateBtn: 'cookie-banner__update-btn'
	},
	updateBtnTemplate(model){
		return `<button class="${model.classNames.updateBtn}">Update cookie preferences</button>`
	},
	bannerTemplate(model){
		return `<section role="dialog" aria-live="polite" aria-label="Cookie consent" aria-describedby="cookie-banner__desc" class="${model.classNames.banner}">
			<!--googleoff: all-->
			<div class="small-12" id="cookie-banner__desc">
				<h1 class="cookie-banner__heading">This website uses cookies.</h1>
				<p class="cookie-banner__text gamma">We use cookies to analyse our traffic and to provide social media features. You can choose which categories
				of cookies you consent to, or accept our recommended settings.
				<a class="cookie-banner__link" rel="noopener noreferrer nofollow" href="/cookies/">Find out more</a> about the cookies we use before you consent.</p>
				<ul class="cookie-banner__list lister push--bottom large-10">
					${Object.keys(model.types).map(type => `<li class="cookie-banner__list-item">
						<input id="cookie-banner__${type.split(' ')[0].replace(' ', '-')}" class="${model.classNames.field}" value="${type}" type="checkbox"${model.types[type].checked ? ` checked` : ''}${model.types[type].disabled ? ` disabled` : ''}> 
						<label class="cookie-banner__label gamma" for="cookie-banner__${type.split(' ')[0].replace(' ', '-')}">${type.substr(0, 1).toUpperCase()}${type.substr(1)} cookies</label>
					</li>`).join('')}
				</ul>
			</div>
			<button class="${model.classNames.btn}">Continue</button>
			<!--googleon: all-->
		</section>`;
	
}
```

## Tests
```
npm test
```

## Browser support
This is module has both es6 and es5 distributions. The es6 version should be used in a workflow that transpiles.

The es5 version depends unpon Object.assign so all evergreen browsers are supported out of the box, ie9+ is supported with polyfills. ie8+ will work with even more polyfils for Array functions and eventListeners.

## Dependencies
None

## License
MIT