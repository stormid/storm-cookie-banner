import { TRIGGER_EVENTS, CLASSNAME } from './constants';
import { readCookie, cookiesEnabled, shouldExecute } from './utils';
import { initBanner, initUpdateBtn } from './ui';
import { apply } from './consent';

export default model => {
    if(!cookiesEnabled()) return;
    const cookies = readCookie(model);
    if(!cookies) initBanner(model);
    else {
        model = Object.assign({}, model, { consent: JSON.parse(cookies.value) });
        apply(model);
        initUpdateBtn(model);
    }
};