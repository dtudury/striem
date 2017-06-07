const t = v => Object.prototype.toString.call(v);
const s = JSON.stringify;

let n = 0;
let o = {};
let a = [];

function hash (v) {
    let k = {
        [t(null)]: s,
        [t("")]: s,
        [t(0)]: s,
        [t(!0)]: s,
        [t([])]: v => '[' + v.map((v, i) => i + ':' + hash(v)).join(',') + ']',
        [t({})]: v => '{' + Object.keys(v).sort().map(key => key + ':' + hash(v[key])).join(',') + '}'
    }[t(v)](v);
    if (!o[k]) {
        o[k] = ++n;
        a[n] = v;
    }
    return o[k];
}

module.exports = hash;
