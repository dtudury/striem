"use strict";

//http://www.isthe.com/chongo/src/fnv/test_fnv.c

//0x100000001b3
let _l = 0x100;
let _r = 0x1b3;

function rs32 (x) {
    return Math.floor(x / 0x100000000);
}

module.exports = function(str, target) {
    //0xcbf29ce484222325
    let l = 0xcbf29ce4;
    let r = 0x84222325;
    for (let i = 0; i < str.length; i++) {
        r = (r ^ str.charCodeAt(i)) >>> 0;
        let rr = r * _r;
        l = (rs32(rr) + r * _l + l * _r) >>> 0;
        r = rr >>> 0;
    }
    return [l, r];
}
