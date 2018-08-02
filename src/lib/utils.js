import { TRIGGER_KEYCODES } from './constants';

//Modernizr cookie test
export const cookiesEnabled = () => {
    try {
        document.cookie = 'cookietest=1';
        const ret = document.cookie.indexOf('cookietest=') !== -1;
        document.cookie = 'cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT';
        return ret;
      }
      catch (e) {
        return false;
      }
};

export const writeCookie = (settings, preferences) => [
    `${settings.name}=${JSON.stringify(preferences)};`,
    `expires=${(new Date(new Date().getTime() + (settings.expiry*24*60*60*1000))).toGMTString()};`,
    `path=${settings.path};`,
    settings.domain ? `domain=${settings.domain}` : '',
    settings.secure ? `secure=${settings.secure}` : ''
].join('');

export const readCookie = settings => {
    const cookie = document.cookie.split('; ').map(part => ({ name: part.split('=')[0], value: part.split('=')[1] })).filter(part => part.name === settings.name)[0];
    return cookie !== undefined ? cookie : false;
};

export const GTMLoad = code => {
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer', code);
}

export const shouldExecute = e => (!!e.keyCode && !TRIGGER_KEYCODES.includes(e.keyCode)) || !(e.which === 3 || e.button === 2);