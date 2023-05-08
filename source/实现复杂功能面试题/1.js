/**
 * fn 执行时间不一定，可能同步可能异步
 * timeout 以内用 fn 的结果，timeout 以外返回 'timeout'

 * function runFn(fn, timeout) {
 *   // code
 * }
 * 
 * 这道题目核心是考
1. event loop
2. setTimeout
3. Promise
4. 如何组织状态判断
*/

function runFn(fn, timeout) {
  return new Promise((resolve) => {
    let status = 'pending';
    let res = fn();
    setTimeout(() => {
      if (status === 'pending') {
        status = 'end';
        resolve(timeout)
      }
    }, timeout);
    if (Object.prototype.toString.call(res) === '[object Promise]') {
      res.then((succ) => {
        status = 'end';
        resolve(succ);
      })
    } else {
      status = 'end';
      resolve(res);
    }
  })
}

// test

function func1() {
  return 'func1 同步'
}
function func2() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('func2 异步 执行完')
    }, 20)
  })
}
function func3() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('func3 异步 未执行完')
    }, 1000)
  })
}

async function main() {
  const res1 = await runFn(func1, 500);
  const res2 = await runFn(func2, 500);
  const res3 = await runFn(func3, 500);
  console.log(res1, res2, res3)
  // func1 同步 func2 异步 执行完 500
}

main();