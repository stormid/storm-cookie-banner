export const apply = state => {
    Object.keys(state.consent).forEach(key => {
        state.consent[key] && state.settings.types[key].fns.forEach(fn => fn(state));
    });
};