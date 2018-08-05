/**
 * @name storm-cookie-banner: 
 * @version 0.1.0: Sun, 05 Aug 2018 21:49:22 GMT
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
                    checked: opts.types[curr].checked
                });
            }  else acc[curr] = opts.types[curr];
            return acc;
        }, defaults.types)
    }))
};