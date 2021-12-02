// 实现一个方法，拉平Object
const obj = { a: { b: { c: 1 } }, d: 1, e: { f: 0 } }
console.log(flattenObject(obj)); // { 'a.b.c': 1, d: 1 ,'e.f':0}

function flattenObject(obj) {
	const res = {};
	flatten(obj, '', res);
	return res;
}

function flatten(obj, prefix, res) {
	Object.keys(obj).forEach((k) => {
		const nextKey = prefix.length > 0 ? `${prefix}.${k}` : k;
		if (typeof obj[k] === 'object' && typeof obj[k] !== null) {
			flatten(obj[k], nextKey, res);
		} else {
			res[nextKey] = obj[k];
		}
	});
}
