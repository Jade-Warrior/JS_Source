// id pid数据转为树形数据结构

const flat2tree = flatLs => {
  flatLs.forEach(item => {
    if (item.pid !== 0) {
      const index = flatLs.findIndex(v => v.id === item.pid)
      if (index !== -1) {
        flatLs[index].children = flatLs[index].children || []
        flatLs[index].children.push(item)
      }
    }
  })
  return flatLs.filter(item => item.pid == 0)
}


// test1
const data1 = [
  {id: 1, pid: 0},
  {id: 2, pid: 0},
  {id: 3, pid: 0},
  {id: 4, pid: 1},
  {id: 5, pid: 1},
  {id: 6, pid: 2},
  {id: 7, pid: 3},
  {id: 8, pid: 3},
  {id: 9, pid: 4},
  {id: 10, pid: 1}
]
console.log(flat2tree(data1));

//test2
const data2 = [
  {
    id: 1,
    pid: 0,
    name: "广东省"
  }, {
    id: 4,
    pid: 1,
    name: "佛山市"
  }, {
    id: 5,
    pid: 1,
    name: "汕头市"
  }, {
    id: 6,
    pid: 1,
    name: "东莞市"
  }, {
    id: 2,
    pid: 0,
    name: "湖北省"
  }, {
    id: 7,
    pid: 2,
    name: "黄冈市"
  }, {
    id: 8,
    pid: 2,
    name: "宜昌市"
  }, {
    id: 9,
    pid: 2,
    name: "襄阳市"
  }, {
    id: 3,
    pid: 0,
    name: "河南省"
  }, {
    id: 10,
    pid: 3,
    name: "洛阳市"
  }, {
    id: 11,
    pid: 3,
    name: "开封市"
  }, {
    id: 12,
    pid: 3,
    name: "新乡市"
  }
]
console.log(flat2tree(data2));