export default () => ({
    state: {
        clones: []
    },
    update(reducer, nextState, effects = []){ 
        this.state = reducer(this.state, nextState);
        //console.log(this.state);
        if(effects.length > 0) effects.forEach(effect => { effect(this.state) });
    },
    getState() { return this.state }
});