// 方案1:简单粗暴
// let collect = [];
// let timer = null;
// function merge (outNum) {
//   collect.push(outNum);
//   debounce();
// }

// function debounce() {
//   clearTimeout(timer);
//   timer = setTimeout(() => {
//     console.log(eval(collect.join('+')));
//     collect = [];
//   })
// }

// 方案2:闭包变量
function debounce(fn) {
  let collect = [];
  let timer = null;
  return function (num) {
    collect.push(num);
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.call(this, collect);
      collect = [];
    })
  }
}

function add(arr) {
  console.log(eval(arr.join('+')));
}

const merge = debounce(add);

merge(1)
merge(2)
merge(3) // 6

setTimeout(() => {
  merge(4) // 4
})

