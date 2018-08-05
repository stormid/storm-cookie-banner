export const apply = model => {
    Object.keys(model.consent).forEach(key => {
        model.consent[key] && model.types[key].fns.forEach(fn => fn(model));
    });
};