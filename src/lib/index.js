// import { TRIGGER_EVENTS, CLASSNAME } from './constants';
import { cookiesEnabled } from './utils';
// import { initBanner, initUpdateBtn } from './ui';
// import { apply } from './consent';
import CreateStore from './store';
import { setInitialState } from './reducers';

export default settings => {
    if(!cookiesEnabled()) return;

    const Store = CreateStore();
    const cookies = readCookie(settings);

    Store.update(initialState, { settings, consent: cookies ? JSON.parse(cookies.value) : {} }, !cookies ? [initBanner] : [ apply, initUpdateBtn]);


    // const cookies = readCookie(model);
    // if(!cookies) initBanner(model);
    // else {
    //     model = Object.assign({}, model, { consent: JSON.parse(cookies.value) });
    //     apply(model);
    //     initUpdateBtn(model);
    // }
};