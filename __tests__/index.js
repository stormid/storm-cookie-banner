import CookieBanner from '../src';

const init = () => {
    // Set up our document body
    document.body.innerHTML = `<div class="cookie-banner__update"></div>`;
    CookieBanner.init({ 
        types: { 
            'test': {
                fns: []
            }
        }
    });
};

describe(`Rendering the banner`, () => {
    
    beforeAll(init);

    it('It should render the cookie banner', async () => {
        expect(document.querySelector('.cookie-banner')).not.toBeNull();
    });

    it('It should render each type option and the default necessary and preference types as checkboxes', async () => {
        const fields = Array.from(document.querySelectorAll('.cookie-banner__field'));
        expect(fields.length).toEqual(3);
        expect(fields.map(field => field.value)).toEqual([ 'necessary', 'preference', 'test' ]);
    });

});

describe(`Accessibility`, () => {
    
    it('The cookie banner should be a dialog', async () => {
        expect(document.querySelector('.cookie-banner').getAttribute('role')).toEqual('dialog');
    });
    
    it('The cookie banner should have be polite aria live region', async () => {
        expect(document.querySelector('.cookie-banner').getAttribute('aria-live')).toEqual('polite');
    });
    
    it('The cookie banner should have an aria label', async () => {
        expect(document.querySelector('.cookie-banner').getAttribute('aria-label')).toBeDefined();
    });
    
    it('The cookie banner should be described by an element', async () => {
        expect(document.getElementById(document.querySelector('.cookie-banner').getAttribute('aria-describedby'))).not.toBeNull();
    });
    
});

describe(`Set consent cookies`, () => {

    it('Sets a cookie based on consent form', async () => {
        for (const field of document.querySelectorAll('.cookie-banner__field')){
            field.checked = true;
        }
        document.querySelector('.cookie-banner__btn').click();

        expect(document.cookie).toEqual(`CookiePreferences={"necessary":true,"preference":true,"test":true}`);
    });

    it('Hides the cookie banner', async () => {
        expect(document.querySelector('.cookie-banner')).toBeNull();
    });

    it('Renders the update cookie preferences button', async () => {
        expect(document.querySelector('.cookie-banner__update-btn')).not.toBeNull();
    });

});

describe(`Update consent cookies`, () => {

    it('Show cookie banner to update consent', async () => {
        document.querySelector('.cookie-banner__update-btn').click();
        expect(document.querySelector('.cookie-banner__update-btn')).not.toBeNull();
    });
    
    it('Updates a cookie based on consent form', async () => {
        for (const field of document.querySelectorAll('.cookie-banner__field')){
            field.checked = (field.value !== 'test');
        }
        document.querySelector('.cookie-banner__btn').click();

        expect(document.cookie).toEqual(`CookiePreferences={"necessary":true,"preference":true,"test":false}`);
    });

    it('Hides the cookie banner', async () => {
        expect(document.querySelector('.cookie-banner')).toBeNull();
    });

});