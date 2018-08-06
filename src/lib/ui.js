import { composeUpdateUIModel, shouldExecute } from './utils';
import { TRIGGER_EVENTS } from './constants';
import { apply } from './consent';
import { setConsent, updateConsent } from './reducers';

export const initBanner = Store => state => {
    document.body.firstElementChild.insertAdjacentHTML('beforebegin', state.settings.bannerTemplate(composeUpdateUIModel(state)));
    const fields = [].slice.call(document.querySelectorAll(`.${state.settings.classNames.field}`));
    const banner = document.querySelector(`.${state.settings.classNames.banner}`);
    const btn = document.querySelector(`.${state.settings.classNames.btn}`);

    TRIGGER_EVENTS.forEach(ev => {
        btn.addEventListener(ev, e => {
            if(!shouldExecute(e)) return;
            Store.update(setConsent, { consent: fields.reduce((acc, field) => { return acc[field.value] = field.checked, acc }, {}) }, [apply, initUpdateBtn(Store), () => { banner.parentNode.removeChild(banner); }]);
        });
    });
};

export const initUpdateBtn = Store => state => {
    const updateBtnContainer = document.querySelector(`.${state.settings.classNames.updateBtnContainer}`);
    if(!updateBtnContainer) return;
    const updateBtn = document.querySelector(`.${state.settings.classNames.updateBtn}`);
    if(updateBtn) return updateBtn.removeAttribute('disabled');
    updateBtnContainer.innerHTML = state.settings.updateBtnTemplate(state.settings);

    TRIGGER_EVENTS.forEach(ev => {
        document.querySelector(`.${state.settings.classNames.updateBtn}`).addEventListener(ev, e => {
            if(!shouldExecute(e)) return;
            Store.update(updateConsent, {}, [ initBanner(Store), () => { e.target.setAttribute('disabled', 'disabled'); }]);
        });
    });
};