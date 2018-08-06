import CookieBanner from '../src';

test('', () => {
    // Set up our document body
    document.body.innerHTML = ``;

    CookieBanner.init({
        types: {
            'necessary': {
                fns: [
                    () => { console.log('Necessary fn'); },
                ]
            },
            'preference': {
                checked: true,
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