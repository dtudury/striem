const {KEY} = require("./symbols");

const type = v => Object.prototype.toString.call(v);
const key_functions = {
    [type()]: v => "undefined",
    [type(null)]: v => "null",
    [type("")]: v => '"' + v + '"',
    [type(0)]: v => '' + v,
    [type(!0)]: v => '' + v,
    [type(new Date)]: v => v.toISOString(),
    [type([])]: v => '[' + v.map((v, i) => i + ':' + h(v)).join(',') + ']',
    [type({})]: v => '{' + Object.keys(v).sort().map(key => key + ':' + h(v[key])).join(',') + '}'
};

let n = 0;
let o = {};
let h = v => {
    let k = (key_functions[type(v)] || JSON.stringify)(v);
    return o[k] = o[k] || ++n;
}

const Striem = module.exports = (target, parent) => {
    //let's hash target, target can only be object or array
    //children that are objects or arrays get proxied by striem
    //we'll tell them that we're their parent just after
    let _hash;
    let _links;
    if (type(target) === type([])) {
    } else if (type(target) == type({})) {
    }
    return new Proxy(target, {
        get: (obj, prop) => {
            console.log("get:", obj, prop, obj[prop]);
            return obj[prop]
        },
        set: (obj, prop, value) => {
            console.log("set:", obj, prop, value);
            return obj[prop] = value;
        }
    });
}
