import CookieBanner from '../../src';
    
window.addEventListener('DOMContentLoaded', () => {
    CookieBanner.init({
        types: {
            'necessary': {
                fns: [
                    () => { console.log('Necessary fn'); },
                ]
            },
            'preference': {
                checked: false,
                fns: [
                    () => { console.log('Preference fn'); },
                ]
            },
            'performance': {
                checked: true,
                fns: [
                    () => { console.log('Performance fn'); }
                ]
            },
            'advertising and marketing': {
                checked: false,
                fns: [
                    () => { console.log('Advertising and marketing fn'); }
                ]
            }
        }
    });
});