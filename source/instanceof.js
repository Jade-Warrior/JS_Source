// instanceof：检测原理
//   + 构造函数 Symbol.hasInstance 属性方法
//   + 检测构造函数的prototype是否出现在实例的__proto__上
//   + 不能检测基本数据类型,检测的实例必须都是对象「自己的方法想把基本数据类型也处理了」

function instance_of(example, classFunc) {
  // 参数初始化
  if (typeof classFunc !== "function") throw new TypeError("Right-hand side of 'instanceof' is not callable");
  if (example == null) return false;

  // 支持Symbol的并且拥有Symbol.hasInstance，以这个处理
  if (typeof Symbol !== "undefined") {
    var hasInstance = classFunc[Symbol.hasInstance];
    if (typeof hasInstance === "function") {
      return hasInstance.call(classFunc, example);
    }
  }

  // 不支持的则基于检测原型链来实现
  var prototype = classFunc.prototype,
    proto = Object.getPrototypeOf(example);
  if (!prototype) return false; // 没有prototype的函数（例如：箭头函数）直接返回false
  while (true) {
    // 找到Object.prototype.__proto__
    if (proto === null) return false;
    // 在原型链上找到了类的原型
    if (proto === prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}
let res = instance_of([12, 23], Array);
console.log(res); //=>true  

res = instance_of([12, 23], Object);
console.log(res); //=>true  

res = instance_of([12, 23], RegExp);
console.log(res); //=>false  