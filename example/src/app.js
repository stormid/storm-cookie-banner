import CookieBanner from '../../src';
    
window.addEventListener('DOMContentLoaded', () => {
    CookieBanner.init({
        types: {
            'preference' : {
                enabled: false,
                fns: [
                    () => { console.log('Preference fn'); },
                ]
            },
            'performance': {
                enabled: true,
                fns: [
                    () => { console.log('Performance fn'); }
                ]
            },
            'advertising and marketing': {
                enabled: false,
                fns: [
                    () => { console.log('Advertising and marketing fn'); }
                ]
            }
        }
    });
});