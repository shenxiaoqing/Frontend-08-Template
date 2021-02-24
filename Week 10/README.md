学习笔记

## 排版 ｜ 根据浏览器属性进行排版

```js
function getStyle(element) {
    if (!element.style) {
        element.style = {}
    }
    for (let prop in element.computedStyle) {
        const p = element.computedStyle.value
        element.style[prop] = element.computedStyle[prop].value

        if (element.style[prop].toString().match(/px$/)) {
            element.style[prop] = parseInt(element.style[prop])
        }
        if (element.style[prop].toString().match(/^[0-9\.]+$/)) {
            element.style[prop] = parseInt(element.style[prop])
        }
    }
    return element.style
}

function layout(element) {
    if (!element.computedStyle) {
        return
    }
    const elementStyle = getStyle(element)
    if (elementStyle.display !== 'flex') {
        return
    }
    const items = element.children.filter(e => e.type === 'element')
    items.sort((a, b) => {
        return (a.order || 0) - (b.order || 0)
    })
    const style = elementStyle
    ['width', 'height'].forEach(size => {
        if (style[size] === 'auto' || style[size] === '') {
            style[size] = null
        }
    })
    if (!style.flexDireaction || style.flexDireaction === 'auto') {
        style.flexDireaction = 'row'
    }
    if (!style.alignItems || style.alignItems === 'auto') {
        style.alignItems = 'stretch'
    }
    if (!style.flexWrap || style.flexWrap === 'auto') {
        style.flexWrap = 'nowrap'
    }
    if (!style.alignContent || style.alignContent === 'auto') {
        style.alignContent = 'stretch'
    }

    let mainSize, mainStart, mainEnd, mainSign, mainBase,
        corossSize, corssStart, crossEnd, crossSign, crossBase
    if (style.flexDireaction === 'row') {
        mainSize = 'width'
        mainStart = 'left'
        mainEnd = 'right'
        mainSign = +1
        mainBase = 0

        corossSize = 'height'
        corssStart = 'top'
        crossEnd = 'bottom'
    }
    if (style.flexDireaction === 'row-reverse') {
        mainSize = 'width'
        mainStart = 'right'
        mainEnd = 'left'
        mainSign = -1
        mainBase = style.width

        corossSize = 'height'
        corssStart = 'top'
        crossEnd = 'bottom'
    }
    if (style.flexDireaction === 'column') {
        mainSize = 'height'
        mainStart = 'top'
        mainEnd = 'bottom'
        mainSign = +1
        mainBase = 0

        corossSize = 'width'
        corssStart = 'left'
        crossEnd = 'right'
    }
    if (style.flexDireaction === 'column-reverse') {
        mainSize = 'height'
        mainStart = 'bottom'
        mainEnd = 'top'
        mainSign = -1
        mainBase = style.height

        corossSize = 'width'
        corssStart = 'left'
        crossEnd = 'right'
    }
    if (style.flexDireaction === 'wrap-reverse') {
        const tmp = corssStart
        corssStart = crossEnd
        crossEnd = tmp
        crossSign = -1
    } else {
        crossBase = 0
        crossSign = 1
    }
}

module.exports = layout
```

## 排版 | 收集元素进行

分行

1. 根据主轴尺寸，把元素分进行
1. 若设置了no-wrap，则强行分配进第一行

## 排版 ｜ 计算主轴

1. 找出所有的flex元素
1. 把主轴方向的剩余尺寸按比例分配给这些元素
1. 若剩余空间为负数，所有flex元素为0，等比压缩剩余元素

## 排版 | 计算交叉轴

1. 根据每一行中最大元素尺寸计算行高
1. 根据行高 flex-align 和 item-align 确定元素具体位置

