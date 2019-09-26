/**
 * @name storm-cookie-banner: 
 * @version 0.4.0: Thu, 26 Sep 2019 11:51:07 GMT
 * @author stormid
 * @license MIT
 */
import defaults from './lib/defaults';
import factory from './lib/factory';
import { composeTypes } from './lib/utils';

export default {
    init: opts => factory(Object.assign({}, defaults, opts, {
        types: Object.keys(opts.types).reduce(composeTypes(opts), defaults.types)
    }))
};