//描述
const object = {
  a: 3,
  b: 4,
  c: 5,
};

omit(object, ["a", "b"]); // => { c: 5 }

omitBy(object, (value) => value === 3); // => { b:4, c: 5 }

function omit(source, keys) {
  return Object.keys(source).reduce((target, nowKey) => {
    if (!keys.includes(nowKey)) target[nowKey] = source[nowKey];
    return target;
  }, {});
}

function omitBy(source, filiterFn) {
  return Object.keys(source).reduce((target, nowKey) => {
    if (!filiterFn(source[nowKey])) target[nowKey] = source[nowKey];
    return target;
  }, {});
}

//-------ts写法

// omit 函数现在有两个泛型参数 T 和 K。
// T 是输入对象的类型，K 是要排除的键的类型，这些键必须是 T 的键的子集。
// omit 函数的返回值类型是 Omit < T, K >，这是 TypeScript 的内置工具类型，它从 T 中排除了 K 键，并返回剩余属性的新类型
function omit<T extends object, K extends keyof T>(source: T, keys: K[]): Omit<T, K> {
  return Object.keys(source).reduce((target, nowKey) => {
    if (!keys.includes(nowKey as any)) {
      target[nowKey] = source[nowKey];
    }
    return target;
  }, {} as Omit<T, K>);
}

// omitBy 函数有一个泛型参数 T，它扩展自 object，表示输入对象的类型。
// filterFn 是一个函数，它接受一个参数（value），并返回一个布尔值。
// 函数的返回值类型是 Partial < T >，表示返回的对象是 T 的一个部分，其中一些属性可能被排除
// 在 TypeScript 中，Partial<T> 是一个实用的工具类型，它用于构造一个新类型，该类型中的所有属性都是原始类型 T 的属性，但是它们都是可选的。
function omitBy<T extends object>(source: T, filterFn: (value: any) => boolean): Partial<T> {
  return Object.keys(source).reduce((target, nowKey) => {
    if (!filterFn(source[nowKey])) {
      target[nowKey] = source[nowKey];
    }
    return target;
  }, {} as Partial<T>);
}


