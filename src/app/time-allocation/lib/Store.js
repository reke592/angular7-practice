/**
 * centralise store for time allocation module.
 * 
 * @param state initial state
 * @param actions function dictionary
 * @param mutations function dictionary
 * TODO: create getters
 */
module.exports = function({ state, actions, mutations }) {
    let _state = state || {};
    let _actions = actions || {};
    let _mutations = mutations || {};
    let _listeners = {};
    
    // state proxy cache
    let _last_version = 0;
    let _version = 0;
    let _proxy_cache = null;


    // -- event sourcing

    // syntactic sugar for pubsub with reference component
    function subscribe(component) {
        return {
            on : (event_type, cb) => on(event_type, cb, component)
        }
    }

    // pubsub
    function on(event_type, cb, ref_component = undefined) {
        if(!toString.call(cb).match('Function'))
            throw Error(`${event_type} callback is not a function.`);
        
        if (ref_component) {
            cb.ref_component = ref_component;
            ref_component.$store_events = ref_component.$store_events || {};
            ref_component.$store_events[event_type] = true;
        }

        _listeners[event_type] = _listeners[event_type] || [];
        _listeners[event_type].push(cb);
        // console.log(_listeners)
    }

    // nukking
    function emit(event_type, payload) {
        _listeners[event_type] = _listeners[event_type] || [];
        _listeners[event_type].map(cb => cb({state: getState(), payload}));
    }

    // unregister all listeners, will be put in root component onDestroy life cycle
    function unsubscribeAll() {
        Object.keys(_listeners).map(key => {
            delete _listeners[key];
        })
    }

    function unsubscribe(component) {
        if(!component) return;
        if(!component.$store_events) return;

        // iterate all events
        Object.keys(component.$store_events).map(key => {
            // iterate and delete each event listener
            _listeners[key].map(fn => {
                if (fn.ref_component == component)
                    return Promise.resolve().then(_ => _listeners[key].pop(fn));
                }
            );
        })
    }

    // -- store handling

    function dispatch(action, param) {
        if(!_actions[action])
            throw Error(`unknown store action ${action}.`);
        try {
            result = _actions[action]({state: _state, payload: param, commit, emit});
            return Promise.resolve(result);
        } catch(e) {
            return Promise.reject(e);
        }
    }

    // run cb in event loop, use this to avoid race condition
    function delayLoad(cb) {
        setTimeout(cb, 0);
    }

    function commit(mutation, param) {
        if(!_mutations[mutation])
            throw Error(`unknown store mutation ${mutation}.`);
        
        try {
            result = _mutations[mutation]({state: _state, payload: param, emit});
            // for state proxy cache
            _last_version ++;
            return Promise.resolve(result);
        } catch(e) {
            return Promise.reject(e);
        }
    }

    // -- securing design pattern

    // restrict direct update in state. try return cache to avoid memory leaks
    function getState() {
        _proxy_cache = (_version !== _last_version)
            ? new Proxy(_state, { set: (target, key, value) => false })
            : _proxy_cache;
        _version = _last_version;
        return _proxy_cache;
    }

    return {
        get state () { 
            return getState()
        },
        commit,
        dispatch,
        delayLoad,
        emit,
        on,
        subscribe,
        unsubscribe,
        unsubscribeAll,
    }
}
