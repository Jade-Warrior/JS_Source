// ------------ call ------------
Function.prototype.call = function(context, ...args) {
  context === null ? context = window : null;
  !/^(object|function)$/.test(typeof context) ? context = Object(context) : null;

  const self = this;
  const key = Symbol('key');
  context[key] = self;
  const res = context[key](...args);
  delete context[key];
  return res
}

// test
function fn1(x, y) {
  console.log(this, x, y);
}
let obj1 = {
  name: 'object1',
  fn1: 100
}
fn1.call(0, 10, 20);
fn1.call(obj1, 10, 20);


// ------------ bind ------------
Function.prototype.bind = function(context, ...outArgs) {
  const self = this;
  return function(...innerArgs) {
    self.call(context, ...outArgs, ...innerArgs);
  }
}

// test
function fn2(x, y, ev) {
  console.log(this, x, y, ev);
}
let obj2 = {
  name: 'obj2'
};
document.body.onclick = fn2.bind(obj2, 10, 20);


// ------------ new ------------
function MyNew(Constructor, ...params) {
  // let obj = {} // 1：执行会创建一个新对象
  // obj.__proto__ = Constructor.prototype // 2：该对象的原型等于构造函数prototype

  const obj = Object.create(Constructor.prototype);// 直接完成1，2步
  const result = Constructor.call(obj, ...params); // 3： 将构造函数的this指向新对象
  return result !== null && typeof result === 'object' ? result : obj;
  // 4： 如果call返回的是一个对象，就返回该对象，如果call返回的不是一个对象，就返回创建的对象
}

// test
function Man(name, age) {
  this.name = name;
  this.age = age;
}
var tom = new Man('tom', 20)
var mike = MyNew(Man, 'mike', 30)
console.log(tom instanceof Man, mike instanceof Man)
