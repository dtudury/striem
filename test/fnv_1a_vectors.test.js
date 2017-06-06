
const fnv_1a = require("../lib/fnv_1a.js");

function test(str, target) {
    let hash = fnv_1a(str, target);
    let hash_str = "0x" + ("00000000" + hash[0].toString(16)).substr(-8) + ("00000000" + hash[1].toString(16)).substr(-8)
    console.log(JSON.stringify(str), target, hash_str, hash_str == target);
}

//http://www.isthe.com/chongo/src/fnv/test_fnv.c
test("", "0xcbf29ce484222325");
test("a", "0xaf63dc4c8601ec8c");
test("b", "0xaf63df4c8601f1a5");
test("c", "0xaf63de4c8601eff2");
test("d", "0xaf63d94c8601e773");
test("e", "0xaf63d84c8601e5c0");
test("f", "0xaf63db4c8601ead9");
test("fo", "0x08985907b541d342");
test("foo", "0xdcb27518fed9d577");
test("foob", "0xdd120e790c2512af");
test("fooba", "0xcac165afa2fef40a");
test("foobar", "0x85944171f73967e8");
