// 实现函数 promisify，把回调函数改成 promise 形式

const promisify = (func) => (...rest) => {
  return new Promise((resolve, reject) => {
    func.call(this, ...rest, (err, rst) => {
      if (err) {
        reject(err)
      } else {
        resolve(rst)
      }
    })
  })
}

var func1 = function (a, b, c, callback) {
  let rst = a + b + c;
  callback(null, rst);
};
var func2 = promisify(func1);
func2(1, 2, 3).then((rst) => {
  console.log("rst", rst);
}); //输出6

