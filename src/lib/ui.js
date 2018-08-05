import { composeModel, shouldExecute } from './utils';
import { TRIGGER_EVENTS } from './constants';
import { apply } from './consent';

export const initBanner = model => {
    console.log(model);
    document.body.firstElementChild.insertAdjacentHTML('beforebegin', model.bannerTemplate(composeModel(model)));
    const fields = [].slice.call(document.querySelectorAll(`.${model.classNames.field}`));
    const banner = document.querySelector(`.${model.classNames.banner}`);
    const btn = document.querySelector(`.${model.classNames.btn}`);

    TRIGGER_EVENTS.forEach(ev => {
        btn.addEventListener(ev, e => {
            if(!shouldExecute(e)) return;
            model = Object.assign({}, model, { consent: fields.reduce((acc, field) => { return acc[field.value] = field.checked, acc }, {}) });     
            apply(model);
            banner.parentNode.removeChild(banner);
            initUpdateBtn(model);
        });
    });
};

export const initUpdateBtn = model => {
    const updateBtnContainer = document.querySelector(`.${model.classNames.updateBtnContainer}`);
    if(!updateBtnContainer) return;
    const updateBtn = document.querySelector(`.${model.classNames.updateBtn}`);
    if(updateBtn) return updateBtn.removeAttribute('disabled');
    updateBtnContainer.innerHTML = model.updateBtnTemplate(model);
    TRIGGER_EVENTS.forEach(ev => {
        updateBtnContainer.addEventListener(ev, e => {
            if(!shouldExecute(e) || !e.target.classList.contains(model.classNames.updateBtn)) return;
            initBanner(model);
            document.querySelector(`.${model.classNames.updateBtn}`).setAttribute('disabled', 'disabled');
        });
    });
};