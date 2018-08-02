import { DATA_ATTRIBUTE } from './constants';
import Load from 'storm-load';
import { writeCookie } from './utils'; 

const preference = [
    (settings, consent) => {
        document.cookie = writeCookie(settings, consent);
    }
]

const performance = [];

const advertising = [
    // () => {
    //     window._gaq = window._gaq || [];
    //     window._gaq.push(['_setAccount', 'UA-XXXXXXXX-X']);
    //     window._gaq.push(['_trackPageview']);
    //     Load('https://ssl.google-analytics.com/ga.js');
    // },
    () => {}
];

export default { preference, performance, advertising };