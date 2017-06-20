const KEY = Symbol("string of current object in list");
const INDEX = Symbol("position of current object in list");
const PARENTS = Symbol("pointer to objects invalidated by change");
const NEXT = Symbol("pointer to object that replaced current object");
const PREV = Symbol("pointer to object replaced by current object");
const LATEST = Symbol("pointer to most recent version of current object");
const REGISTER = Symbol("function for registering observers on new state");

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

/*
//let's wrap objects and arrays later
let proxy = new Proxy(copy, {
    get (copy, property) {
        //console.log(`get ${property}`);
        return copy[property];
    },
    set (copy, property, value) {
        console.log(`set ${property} to ${value}`);
        return copy[property] = value;
    },
    deleteProperty (copy, property) {
        //console.log(`delete ${property}`);
        return delete copy[property];
    }
});
*/


module.exports = {store, PARENTS, NEXT, LATEST, to_type, deep_types, shallow_types};
