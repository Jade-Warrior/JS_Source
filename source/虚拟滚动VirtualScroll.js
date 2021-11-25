class VirtualScroll {
  constructor({ el, list, itemElementGenerator, itemHeight }) {
    this.$list = el // 视口元素
    this.list = list // 需要展示的列表数据
    this.itemHeight = itemHeight // 每个列表元素的高度
    this.itemElementGenerator = itemElementGenerator // 列表元素的DOM生成器

    this.mapList()
    this.initContainer()
    this.bindEvents()

    this._virtualOffset = 0
    this.virtualOffset = this._virtualOffset
  }
  initContainer() {
    this.containerHeight = this.$list.clientHeight
    this.$list.style.overflow = "hidden"
    this.contentHeight = sumHeight(this._list)
  }
  mapList() {
    this._list = this.list.map((item, i) => ({
      height: this.itemHeight,
      index: i,
      item: item,
    }))
  }
  bindEvents() {
    let y = 0
    const scrollSpace = this.contentHeight - this.containerHeight
    const updateOffset = (e) => {
      e.preventDefault()
      y += e.deltaY
      y = Math.max(y, 0)
      y = Math.min(y, scrollSpace)
      this.virtualOffset = y
    }
    this.$list.addEventListener("wheel", updateOffset)
  }

  set virtualOffset(val) {
    this._virtualOffset = val
    this.render(val)
  }
  get virtualOffset() {
    return this._virtualOffset
  }

  render(virtualOffset) {
    // 头部和底部分别渲染list的第几个
    const headIndex = findIndexOverHeight(this._list, virtualOffset)
    const tailIndex = findIndexOverHeight(this._list, virtualOffset + this.containerHeight)

    this.renderOffset = virtualOffset - sumHeight(this._list, 0, headIndex)
    // 需要渲染出来的列表
    this.renderList = this._list.slice(headIndex, tailIndex + 1)

    const $listWp = document.createElement("div")
    this.renderList.forEach((item) => {
      const $el = this.itemElementGenerator(item)
      $listWp.appendChild($el)
    })
    $listWp.style.transform = `translateY(-${this.renderOffset}px)`
    this.$list.innerHTML = ''
    this.$list.appendChild($listWp)
  }
}
// 找到第一个累加高度大于指定高度的序号
export function findIndexOverHeight(list, offset) {
  let currentHeight = 0
  for (let i = 0; i < list.length; i++) {
    const { height } = list[i]
    currentHeight += height

    if (currentHeight > offset) {
      return i
    }
  }

  return list.length - 1
}

// 获取列表中某一段的累加高度
export function sumHeight(list, start = 0, end = list.length) {
  let height = 0
  for (let i = start; i < end; i++) {
    height += list[i].height
  }

  return height
}

