/**
 * 对象扁平化
 * 示例：
 *   var input = {
 *     a: 1,
 *     b: [ 1, 2, { c: true }, [ 3 ] ],
 *     d: { e: 2, f: 3 },
 *     g: null,
 *   }
 *   var output = flatten(input);
 *   output如下
 *   {
 *     "a": 1,
 *     "b[0]": 1,
 *     "b[1]": 2,
 *     "b[2].c": true,
 *     "b[3][0]": 3,
 *     "d.e": 2,
 *     "d.f": 3,
 *     // "g": null,  值为null或者undefined，丢弃
 *  	}
 */
const obj = { a: { b: { c: 1 } }, d: 1, e: { f: 0 } }
console.log(flattenObject(obj)); // { 'a.b.c': 1, d: 1 ,'e.f':0}
const input = {
	a: 1,
	b: [1, 2, { c: true }, [3]],
	d: { e: 2, f: 3 },
	g: null,
}
console.log(flattenObject(input))


function flattenObject(obj) {
	const res = {};
	flatten(obj, '', res);
	return res;
}
// 判断是否数组
function isArray(obj) {
	return Object.prototype.toString.call(obj) === '[object Array]';
}
// 判断是否对象
function isObj(obj) {
	return Object.prototype.toString.call(obj) === '[object Object]';
}
function flatten(obj, prefix, res) {
	Object.keys(obj).forEach((k) => {
		if (obj[k] === null || obj[k] === undefined) return
		const nextKey = prefix.length > 0 ? `${prefix}${isArray(obj) ? `[${k}]` : `.${k}`}` : k;
		if (isArray(obj[k]) || isObj(obj[k])) {
			flatten(obj[k], nextKey, res);
		} else {
			res[nextKey] = obj[k];
		}
	});
}
