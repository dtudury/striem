function to_type(value) {
    let tos = Object.prototype.toString.call(value);
    return tos.substring(8, tos.length - 1);
}

let deep_types = [to_type([]), to_type({})];
let shallow_types = [to_type(), to_type(null), to_type(false), to_type(0), to_type(""), to_type(new Date)];

let o = {};
let a = [null]; //so the next index is truthy

function index(type, value) {
    let key = type + ':' + JSON.stringify(value);
    if (!o[key]) {
        o[key] = a.length;
        a.push(value);
    }
    console.log(o[key], key);
    return o[key];
}

function store(value, ancestors = []) {
    let circle_size = ~ancestors.indexOf(value);
    if (circle_size) {
        return circle_size;
    }
    let type = to_type(value);
    if (deep_types.indexOf(type) !== -1) {
        ancestors = [value].concat(ancestors);
        let copy = new value.constructor();
        Object.keys(value).sort().forEach(property => {
            copy[property] = store(value[property], ancestors);
        })
        return index(type, copy);
    } else if (shallow_types.indexOf(type) !== -1) {
        return index(type, value);
    } else {
        throw new Error(`unhandled key type: ${key}`);
    }
}

module.exports = {store, to_type, deep_types, shallow_types};
