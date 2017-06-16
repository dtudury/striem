const KEY = Symbol("string of current object in list");
const INDEX = Symbol("position of current object in list");
const PARENTS = Symbol("pointer to objects invalidated by change");
const NEXT = Symbol("pointer to object that replaced current object");
const PREV = Symbol("pointer to object replaced by current object");
const LATEST = Symbol("pointer to most recent version of current object");

//o.next, o.parents, o.prev

function to_type(value) {
    let tos = Object.prototype.toString.call(value);
    return tos.substring(8, tos.length - 1);
}

let deep_types = [to_type([]), to_type({})];
let shallow_types = [to_type(), to_type(null), to_type(false), to_type(0), to_type(""), to_type(new Date)];

let o = {};
let a = [null]; //so the first index is truthy

function manage(value) {
    let type = to_type(value);
    if (deep_types.indexOf(type) === -1) {
        throw new Error(`only types managed: [${deep_types}]`);
    }
}

function hash(value, ancestors = [], parent, name) {
    let circle_size = ~ancestors.indexOf(value);
    if (circle_size) {
        parent[name] = circle_size;
        return;
    }
    let type = to_type(value);
    if (deep_types.indexOf(type) !== -1) {
        ancestors = [value].concat(ancestors);
        let target = new value.constructor();
        Object.keys(value).sort().forEach(property => {
            hash(value[property], ancestors, target, property);
        })
        value = target;
    } else if (shallow_types.indexOf(type) === -1) {
        console.warn(`consider adding ${type} to shallow_types or deep_types`);
        throw new Error(`unhandled key type: ${key}`);
    }
    let key = type + ':' + JSON.stringify(value);
    if (!o[key]) {
        o[key] = a.length;
        a.push(value);
    }
    console.log(o[key], key);
    if (parent) {
        parent[name] = o[key];
    } else {
        return o[key];
    }
}

function insert(value, parents = []) {
    let type = to_type(value);
    let key = type + ':';
    if (deep_types.indexOf(type) !== -1) {
        if (value[KEY]) {
            return o[value[KEY]];
        }
        parents = [value].concat(parents);
        let target = new value.constructor();
        let proxy = new Proxy(target, {
            get (target, property) {
                return a[target[property]];
            },
            set (target, property, value) {
                let i = insert(value, parents);
                //... do something with next and parents
            },
            deleteProperty (target, property) {
            }
        })
        Object.keys(value).sort().forEach(property => {
            target[property] = insert(value[property], parents);
        })
        key += JSON.stringify(target);
        value = proxy;
    } else if (shallow_types.indexOf(type) !== -1) {
        key += JSON.stringify(value);
    } else {
        console.warn(`consider adding ${type} to shallow_types or deep_types`);
        throw new Error(`unhandled key type: ${key}`);
    }
    if (!o[key]) {
        o[key] = a.length;
        a.push(value);
    }
    return o[key];
}

module.exports = {hash, manage, insert, PARENTS, NEXT, LATEST, to_type, deep_types, shallow_types};
