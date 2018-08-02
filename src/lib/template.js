import { CLASSNAME } from './constants';

export const renderBanner = types => `<section role="dialog" aria-live="polite" aria-label="Cookie consent" aria-describedby="${CLASSNAME.BANNER}__desc" class="${CLASSNAME.BANNER}">
    <div class="wrapper relative">
        <!--googleoff: all-->
        <div class="small-12" id="${CLASSNAME.BANNER}__desc">
            <h1 class="${CLASSNAME.BANNER}__heading">This website uses cookies.</h1>
            <p class="${CLASSNAME.BANNER}__text gamma">We use cookies to analyse our traffic and to provide social media features. You can choose which categories
            of cookies you consent to, or accept our recommended settings.
            <a class="${CLASSNAME.BANNER}__link" rel="noopener noreferrer nofollow" href="/cookies/">Find out more</a> about the cookies we use before you consent.</p>
            <div class="row">
                <ul class="${CLASSNAME.BANNER}__list lister push--bottom large-10">
                    <li class="${CLASSNAME.BANNER}__list-item xsmall-12 large-6">
                        <input id="${CLASSNAME.BANNER}__necessary" class="${CLASSNAME.FIELD}" value="necessary" type="checkbox" checked disabled> 
                        <label class="${CLASSNAME.BANNER}__label gamma" for="${CLASSNAME.BANNER}__necessary">Necessary cookies</label>
                    </li>
                    ${types.map(type => `<li class="${CLASSNAME.BANNER}__list-item xsmall-12 large-6">
                        <input id="${CLASSNAME.BANNER}__${type.name.split(' ')[0]}" class="${CLASSNAME.FIELD}" value="${type.name.split(' ')[0]}" type="checkbox"${type.enabled ? ` checked` : ''}> 
                        <label class="${CLASSNAME.BANNER}__label gamma" for="${CLASSNAME.BANNER}__${type.name.split(' ')[0]}">${type.name.substr(0, 1).toUpperCase()}${type.name.substr(1)} cookies</label>
                    </li>`).join('')}
                </ul>
            </div>
        </div>
        <button class="${CLASSNAME.BTN} btn btn-primary gamma">Continue</button>
        <!--googleon: all-->
    </div>
</section>`