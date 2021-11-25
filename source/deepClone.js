// 相对简单版的deepclone，没有考虑特殊类型（map,set,reg,Date...）
const deepClone = function deepClone(target, cache = new WeakMap()) {
  if (typeof target === "object" && target !== null) {
    const cloneTarget = new target.constructor();
    // 循环引用问题
    if(cache.get(target)) {
      return cache.get(target);
    }
    cache.set(target, cloneTarget);
    for(let i in target) {
      cloneTarget[i] = deepClone(target[i], cache);
    }
    return cloneTarget;
  }
  return target;
};

// test
let target = {
  field1: 1,
  field2: undefined,
  field3: {
    child: 'child'
  },
  field4: [2, 4, 8],
};
target.target = target;
let cloneTarget = deepClone(target);
target.field3.child = 'change';
target.field4[0] = 0;
console.log(target);
console.log(cloneTarget);
