const {manage, insert} = require('../lib/hash');

function test (v) {
    console.log(insert(v), v)
}

class Test {
    constructor () {}
}


test(null);
test(true);
test(false);
test(0);
test(1);
test(1234);
test(1 / 0);
test();
test(new Date);
test("asdf");
test("null");
test("true");
test("1234");
test([1,2,3]);
test([3,2,1]);
test({a:1, b:2});
test({b:2, a:1});
test(new Test)

manage("asdf")
