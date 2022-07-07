/**
 * 
 * 实现一个 `query` 方法，实现对数据的链式查询和处理。
 * 要求
 * `query` 传入参数为原始数据（数组格式，每个元素都是对象）
 * 通过进行链式调用对数据执行操作，支持的方法有
 * `where(predicate)`: 根据参数的条件进行筛选，参数与 `[].filter` 的参数类似
 * `orderBy(key, desc)`: 根据 `key` 的值进行排列，默认升序排列，当第二个参数为 `true` 时降序排列
 * `groupBy(key)`: 根据 `key` 的值对数据元素进行分组，合并为二维数组
 * `execute()`: 执行所有处理并返回最终结果
 */

function query(data) {
  // 在这里完成代码
  class Query {
    constructor(data) {
      this.state = data;
    }

    where = function (predicate) {
      this.state = this.state.filter(predicate)
      return this;
    }

    orderBy = function (key, desc = false) {
      this.state = this.state.sort((v1, v2) => {
        if (desc) return v2[key] - v1[key]
        return v1[key] - v2[key]
      })
      return this
    }

    groupBy = function (key) {
      let group = this.state.reduce((pre, item) => {
        pre[item[key]] = [...(pre[item[key]] || []), item];
        return pre;
      }, {});
      let newState = [];
      for (let key in group) {
        newState.push(group[key]);
      }
      this.state = newState;
      return this;
    }

    execute = function () {
      return this.state;
    }
  }
  return new Query(data)
}

const data = [
  { name: 'foo', age: 16, city: 'shanghai' },
  { name: 'bar', age: 24, city: 'hangzhou' },
  { name: 'fiz', age: 22, city: 'shanghai' },
  { name: 'baz', age: 19, city: 'hangzhou' },
];

const result = query(data)
  .where(item => item.age > 18)
  .orderBy('age')
  .groupBy('city')
  .execute();
console.log('result:', result);

// result
// [
//   [
//     { name: 'baz', age: 19, city: 'hangzhou' },
//     { name: 'bar', age: 24, city: 'hangzhou' },
//   ],
//   [{ name: 'fiz', age: 22, city: 'shanghai' }],
// ]
