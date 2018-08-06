import { writeCookie, GTMLoad } from './utils'; 

export default {
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
	},
	consent: {}
};