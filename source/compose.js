// 实现函数compose，compose接受多个函数作为参数，并返回⼀个新的函数，新的函数会从右向左依次执⾏原函数， 并且上⼀次结果的返回值将会作为下⼀个函数的参数 
function compose(...fns) {
  return function(init) {
    return fns.reduceRight((res, fn) => {
      return fn(res)
    },init)
  }
}

// test
function toUpperCase(str) {
  return str.toUpperCase();
}

function removeSpaces(str) {
  return str.replace(/\s+/g, '');
}

function reverseString(str) {
  return str.split('').reverse().join('');
}

const processString = compose(toUpperCase, removeSpaces, reverseString);

const result = processString(' Hello World ');
console.log(result); // 输出：DLROWOLLEH
