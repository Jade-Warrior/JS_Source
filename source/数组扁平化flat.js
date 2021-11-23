let arr = [
  [1, 2, 2],
  [3, 4, 5, 5],
  [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10
];

/* 方案1：使用 Array.prototype.flat 处理 */
// Array.prototype.flat() 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。
// 指定要提取嵌套数组的结构深度，默认值为 1
const arr1 = arr.flat(Infinity);
console.log(arr1);

/* 方案2：把数组直接变为字符串即可 */
// 把数组直接变为字符串即可（数组toString之后，不管你有多少级，最后都会变为以逗号分隔的字符串，没有中括号和所谓的层级了），相当于直接的扁平化了
// arr.toString() -> "1,2,2,3,4,5,5,6,7,8,9,11,12,12,13,14,10"
const arr2 = arr.toString().split(',').map(item => Number(item));
console.log(arr2);

/*方案3：JSON.stringify + 正则替换*/
const arr3 = JSON.stringify(arr).replace(/(\[|\])/g, '').split(',').map(item => Number(item));
console.log(arr3);

/*方案4：reduce + 递归*/
function flatArray(arr) {
  let result = [];
  return arr.reduce((acc, item) => {
    return Array.isArray(item) ? acc.concat(flatArray(item)) : acc.concat(item)
  }, [])
}
const arr4 = flatArray(arr);
console.log(arr4);