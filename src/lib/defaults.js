import { writeCookie } from './utils'; 

export default {
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
	updateBtnTemplate(model){
		return `<button class="${model.classNames.updateBtn}">Update cookie preferences</button>`
	},
	bannerTemplate(model){
		return `<section role="dialog" aria-live="polite" aria-label="Cookie consent" aria-describedby="preferences-banner__desc" class="${model.classNames.banner}">
			<div class="preferences-content">
				<div class="wrap">
					<div class="row">
						<!--googleoff: all-->
						<div id="preferences-banner__desc">
							<div class="preferences-banner__heading">This website uses cookies.</div>
							<p class="preferences-banner__text">We use cookies to analyse our traffic and to provide social media features. You can choose which categories of cookies you consent to, or accept our recommended settings.
							<a class="preferences-banner__link" rel="noopener noreferrer nofollow" href="${model.policyURL}"> Find out more about the cookies we use.</a></p>
							<ul class="preferences-banner__list">
								${Object.keys(model.types).map(type => `<li class="preferences-banner__list-item">
									<input id="preferences-banner__${type.split(' ')[0].replace(' ', '-')}" class="${model.classNames.field}" value="${type}" type="checkbox"${model.types[type].checked ? ` checked` : ''}${model.types[type].disabled ? ` disabled` : ''}>
									<label class="preferences-banner__label" for="preferences-banner__${type.split(' ')[0].replace(' ', '-')}">
										${type.substr(0, 1).toUpperCase()}${type.substr(1)} cookies
									</label>  
								</li>`).join('')}
							</ul>
						</div>
						<button class="${model.classNames.btn}">OK</button>
						<button class="${model.classNames.close}">                        
							<svg focusable="false" class="preference-banner__close-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
						</button>
						<!--googleon: all-->
					</div>
				</div>
			</div>
		</section>`;
	}
};