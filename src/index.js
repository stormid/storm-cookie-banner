import defaults from './lib/defaults';
import factory from './lib';

export default {
    init: opts => factory(Object.assign({}, defaults, opts, {
        types: Object.keys(opts.types).reduce((acc, curr) => {
            if(acc[curr]) {
                return Object.assign({}, acc, { 
                    [curr]: Object.assign({}, acc[curr], {
                        fns: acc[curr].fns.concat(opts.types[curr.name].fns)
                    })
                });
            }  else return Object.assign({}, acc, { [curr]: opts.types[curr] });
        }, defaults.types)
        // types: opts.types.reduce((acc, curr) => {
        //     const match = acc.filter(type => type.name === curr.name);
        //     if(match.length === 0) acc.push(curr);
        //     else {
        //         match[0] = Object.assign({}, match[0], {
        //             fns: match[0].fns.push(curr.fns),
        //             enabled: curr.enabled === match[0].enabled ? match[0].enabled : !match[0].enabled
        //         })
        //     }
        //     return acc;
        // }, defaults.types)
    }))
};