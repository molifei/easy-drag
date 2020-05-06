let drag = (function () {
    let dv = document.getElementById("dv"),
        btn = document.getElementById("btn"),
        // 存储百分比位置数组
        position = [],
        // 存储当前标记位置
        mousePos = {},
        // 拖拽物的创建时间
        time,
        // position数组是否存在当前拖拽对象已有位置
        flag = false,
        // 存在的位置
        flagIndex = -1; // 存在的位置

    // 小数  取小数点后两位
    function toPercent(point) {
        let str = Number(point * 100).toFixed(2);
        str += "%";
        return str;
    }

// 获取位置
    function mouseCoords(ev, type = "num") {

        if (ev.PageX && ev.PageY) {
            return {x: ev.PageX, y: ev.PageY}
        }
        //做兼容
        d = document.documentElement || document.body;

        // 获取横纵坐标
        let pX = ev.clientX + d.scrollLeft - d.clientLeft
        let pY = ev.clientY + d.scrollTop - d.clientTop

        // 返回值判断
        if (type === "num") {
            return {x: pX, y: pY}
        } else if (type === "per") {
            // 获取屏幕长宽
            let screenWidth = document.body.clientWidth
            let screenHeight = document.body.clientHeight

            // 计算百分比
            let perX = toPercent(pX / screenWidth)
            let perY = toPercent(pY / screenHeight)

            return {x: perX, y: perY}
        }
    }

    // 创建一个标记
    btn.addEventListener("click", function () {
        let newDv = document.createElement("div")
        newDv.setAttribute("time", Date.parse(new Date()))
        newDv.classList.add("show")
        newDv.classList.add("draggable")
        newDv.draggable = true
        document.body.appendChild(newDv)
    })

    // 拖拽开始
    document.ondragstart = function (ev) {
        // 存储拖动目标
        let _this = ev.target
        // 存储拖动目标的创建时间
        time = _this.getAttribute("time")

        // 拖拽开始，判断在位置数组中是否有当前拖拽的目标
        for (let i = 0; i < position.length; i++) {
            if (position[i].time === time) {
                flag = true;
                flagIndex = i;
                break
            }
        }

        // console.log(`时间：${time}开始移动`);

        offsetX = ev.offsetX;
        offsetY = ev.offsetY;
    };

    // 拖拽中
    document.ondrag = function (ev) {
        // console.log('事件源cat正在拖动中');
        let x = ev.pageX,
            y = ev.pageY;
        // console.log(x + '-' + y);
        if (x === 0 && y === 0) {//不处理最后一刻x,y都为0 的情景
            return
        }
        x -= offsetX;
        y -= offsetY;
        ev.target.style.left = x + 'px';
        ev.target.style.top = y + 'px';
    }

    // 拖拽结束
    document.ondragend = function (ev) {
        // console.log('cat源对象拖动结束')
        mousePos = mouseCoords(ev, "per")
        // 将位置添加进数组
        mousePos.time = time

        // 添加位置时进行判断是否是已经存在的标志
        if (flag) {
            position.splice(flagIndex, 1, mousePos)
            flag = false
        } else {
            position.push(mousePos)
            flag = false
        }

        console.log(position)
    }

    return position
})();
