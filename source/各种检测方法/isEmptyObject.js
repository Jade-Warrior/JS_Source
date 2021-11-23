// 检测是否为空对象(空数组也是空对象)

// Object.getOwnPropertyNames可以判断出对象原生内置属性
// 例如 Object.getOwnPropertyNames(new Array()) = ['length']
function isEmptyObject(obj) {
  // 排除非对象
  if (obj == null) return false;
  if (typeof obj !== "object") return false;

  // 是一个对象「纯粹对象或者特殊对象都可以」
  var keys = Object.keys(obj);
  if (Object.getOwnPropertySymbols) {
    // 兼容这个属性的情况下，我们再去拼接
    keys = keys.concat(Object.getOwnPropertySymbols(obj));
  }
  return keys.length === 0;
}

console.log(isEmptyObject([])) // false
console.log(isEmptyObject({})) // true
const obj = {}
obj[Symbol('obj')] = 'acc'
console.log(Object.getOwnPropertySymbols(obj)) // [Symbol(obj)]
console.log(isEmptyObject(obj)) // false