/**
 * @name storm-cookie-banner: 
 * @version 0.3.1: Tue, 18 Dec 2018 08:53:45 GMT
 * @author stormid
 * @license MIT
 */
import defaults from './lib/defaults';
import factory from './lib';

export default {
    init: opts => factory(Object.assign({}, defaults, opts, {
        types: Object.keys(opts.types).reduce((acc, curr) => {
            if(acc[curr]) {
                acc[curr] = Object.assign({}, acc[curr], {
                    fns: acc[curr].fns.concat(opts.types[curr].fns),
                    checked: opts.types[curr].checked !== undefined ? opts.types[curr].checked : defaults.types[curr].checked !== undefined ? defaults.types[curr].checked : false
                });
            }  else acc[curr] = opts.types[curr];
            return acc;
        }, defaults.types)
    }))
};