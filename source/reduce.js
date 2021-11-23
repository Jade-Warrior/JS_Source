// 实现reduce
// 没有初始值，result是数组第一项，从第二项开始遍历
// 有初始值，result是初始值，从第一项开始遍历
Array.prototype.reduce = function reduce(callback, initial) {
  var self = this;// this=>arr
  var index = 0;
	if (initial === undefined) {
    console.log('initial', initial);
  	initial = arr[0];
    index = 1;
  }
  for(;index < self.length; index ++) {
    var item = self[index];
  	initial = callback(initial, item, index);
  }
  return initial;
}
var arr = [10, 20, 30, 40];
var total = arr.reduce((result, item, index) => {
		console.log(result, item, index)
    return result + item;
}, 0);
console.log(total); 