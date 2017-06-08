const t = v => Object.prototype.toString.call(v);
const _k = {
    [t()]: v => "undefined",
    [t(null)]: v => "null",
    [t("")]: v => '"' + v + '"',
    [t(0)]: v => '' + v,
    [t(!0)]: v => '' + v,
    [t(new Date)]: v => v.toISOString(),
    [t([])]: v => '[' + v.map((v, i) => i + ':' + h(v)).join(',') + ']',
    [t({})]: v => '{' + Object.keys(v).sort().map(key => key + ':' + h(v[key])).join(',') + '}'
};

let n = 0;
let o = {};
let h = module.exports = v => {
    let k = (_k[t(v)] || JSON.stringify)(v);
    return o[k] = o[k] || ++n;
}
