const pageScroll = (function () {
    const fn = function (e) {
        e.preventDefault();
        e.stopPropagation();
    };
    let islock = false;

    return {
        lock: function () {
            if (islock)return;
            islock = true;
            document.addEventListener('touchmove', fn);
        },
        unlock: function () {
            islock = false;
            document.removeEventListener('touchmove', fn);
        }
    };
})();

// color 验证
const isColor = function (value) {
    const colorReg = /^#([a-fA-F0-9]){3}(([a-fA-F0-9]){3})?$/;
    const rgbaReg = /^[rR][gG][bB][aA]\(\s*((25[0-5]|2[0-4]\d|1?\d{1,2})\s*,\s*){3}\s*(\.|\d+\.)?\d+\s*\)$/;
    const rgbReg = /^[rR][gG][bB]\(\s*((25[0-5]|2[0-4]\d|1?\d{1,2})\s*,\s*){2}(25[0-5]|2[0-4]\d|1?\d{1,2})\s*\)$/;

    return colorReg.test(value) || rgbaReg.test(value) || rgbReg.test(value);
};

// 获取滚动区
const getScrollview = function (el) {
    let currentNode = el;
    while (currentNode && currentNode.tagName !== 'HTML' && currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
        let overflowY = document.defaultView.getComputedStyle(currentNode).overflowY;
        if (overflowY === 'scroll' || overflowY === 'auto') {
            return currentNode;
        }
        currentNode = currentNode.parentNode;
    }
    return window;
};

// 是否滚动到可视区
const checkInview = function (scrollView, el, scale) {
    // 滚动区高度
    const contentHeight = scrollView == window ? document.body.offsetHeight : scrollView.offsetHeight;
    // 滚动区距离顶部距离
    const contentTop = scrollView === window ? 0 : scrollView.getBoundingClientRect().top;
    // 元素距离滚动区顶部距离
    const post = el.getBoundingClientRect().top - contentTop;
    const posb = post + el.offsetHeight;

    return (post >= 0 && post < contentHeight * (scale || 1)) || (posb > 0 && posb <= contentHeight * (scale || 1));
};

// 是否包含某个 class
const hasClass = function (elem, cls) {
    cls = cls || '';
    if (cls.replace(/\s/g, '').length == 0) return false;
    return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
};

// 增加 class
const addClass = function (ele, cls) {
    if (!hasClass(ele, cls)) {
        ele.className = ele.className == '' ? cls : ele.className + ' ' + cls;
    }
};

// 移除 class
const removeClass = function (ele, cls) {
    if (hasClass(ele, cls)) {
        let newClass = ' ' + ele.className.replace(/[\t\r\n]/g, '') + ' ';
        while (newClass.indexOf(' ' + cls + ' ') >= 0) {
            newClass = newClass.replace(' ' + cls + ' ', ' ');
        }
        ele.className = newClass.replace(/^\s+|\s+$/g, '');
    }
};

export {pageScroll, isColor, getScrollview, checkInview, addClass, removeClass};
