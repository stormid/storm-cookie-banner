import { writeCookie } from './utils'; 

export default {
	name: 'CookiePreferences',
	path: '/',
	domain: '',
	secure: '',
	expiry: 365,
	types: {
		'preference': {
			enabled: true,
			fns: [
				(settings, consent) => { document.cookie = writeCookie(settings, consent); }
			]
		}
	},
	classNames: {
		banner: 'cookie-banner',
		btn: 'cookie-banner__btn',
		field: 'cookie-banner__field'
	},
	template(model){
		return `<section role="dialog" aria-live="polite" aria-label="Cookie consent" aria-describedby="cookie-banner__desc" class="${model.classNames.banner}">
			<!--googleoff: all-->
			<div class="small-12" id="cookie-banner__desc">
				<h1 class="cookie-banner__heading">This website uses cookies.</h1>
				<p class="cookie-banner__text gamma">We use cookies to analyse our traffic and to provide social media features. You can choose which categories
				of cookies you consent to, or accept our recommended settings.
				<a class="cookie-banner__link" rel="noopener noreferrer nofollow" href="/cookies/">Find out more</a> about the cookies we use before you consent.</p>
				<ul class="cookie-banner__list lister push--bottom large-10">
					<li class="cookie-banner__list-item">
						<input id="cookie-banner__necessary" class="${model.classNames.field}" value="necessary" type="checkbox" checked disabled> 
						<label class="cookie-banner__label gamma" for="cookie-banner_necessary">Necessary cookies</label>
					</li>
					${model.types.map(type => `<li class="cookie-banner__list-item">
						<input id="cookie-banner__${type.name.split(' ')[0].replace(' ', '-')}" class="${model.classNames.field}" value="${type.name}" type="checkbox"${type.enabled ? ` checked` : ''}> 
						<label class="cookie-banner__label gamma" for="cookie-banner__${type.name.split(' ')[0].replace(' ', '-')}">${type.name.substr(0, 1).toUpperCase()}${type.name.substr(1)} cookies</label>
					</li>`).join('')}
				</ul>
			</div>
			<button class="${model.classNames.btn}">Continue</button>
			<!--googleon: all-->
		</section>`;
	}
};