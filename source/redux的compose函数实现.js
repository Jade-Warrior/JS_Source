function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
  /*            a                               b          result
    第一次循环： div2                             mul3        (...args) => div2(mul3(...args))
    第二次循环:(...args) => div2(mul3(...args))  add1        (...args) => div2(mul3(add1(...args)))
  */
}

const add1 = x => x + 1;
const mul3 = x => x * 3;
const div2 = x => x / 2;

var operate = compose(div2, mul3, add1);
var result = operate(0);
console.log(result);