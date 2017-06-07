const t = v => Object.prototype.toString.call(v);
const s = JSON.stringify;

let n = 0;
let o = {};

let _k = {
    [t(null)]: s,
    [t("")]: s,
    [t(0)]: s,
    [t(!0)]: s,
    [t([])]: v => '[' + v.map((v, i) => i + ':' + h(v)).join(',') + ']',
    [t({})]: v => '{' + Object.keys(v).sort().map(key => key + ':' + h(v[key])).join(',') + '}'
};

let h = module.exports = v => {
    let k = _k[t(v)](v);
    return o[k] = o[k] || ++n;
}
