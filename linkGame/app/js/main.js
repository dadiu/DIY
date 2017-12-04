

// console.log(picData);
; (function () {

    var POINT_A = null; // 点击第一下
    var POINT_B = null; // 点击第二下
    var POINT_BOO = false;  // 重置点击
    var BASEPATH = 'img/';
    var CODEARR = [];

    var temp = {
        row: 6,
        column: 6,
        pic_num: 18,
        TABLE: $("<table></table>"),

        init() {

            let picArr = this.picFn();


            this.TABLE.html(this.trFn(picArr));
            $("#app").html(this.TABLE);

        },

        trFn(arr) {

            let r = 0;
            let TR = '';

            for (; r < this.row; r++) {

                CODEARR[r] = [];

                TR += '<tr>' + this.tdFn(r, arr) + '</tr>';
            }

            return TR;

        },

        tdFn(r, arr) {


            // return $('<td></td>');
            let d = 0;
            let TD = '';
            let tdArr = arr.slice(r * this.column, (r + 1) * this.column);

            for (; d < this.column; d++) {

                CODEARR[r][d] = tdArr[d];
                TD += '<td data-x="' + r + '"data-y="' + d + '" id="pic_' + r + '_' + d + '"><img src="' + BASEPATH + tdArr[d] + '.png"/></td>';
            }

            return TD;
        },

        /**
         * @param picData
         */
        picFn: function () {
            let i = 0;
            let j = 0;
            let len = picData.length;
            let copyCount = this.column * this.row / this.pic_num;   // 复制次数
            let idx = Number;
            let linkPicArr = [];
            let copyPicArr = [];

            // 随机图片数组
            for (; i < this.pic_num; i++) {

                idx = Math.floor(Math.random() * len);

                linkPicArr.push(picData[idx]);
            };

            // 复制图片
            for (; j < copyCount; j++) {
                copyPicArr = copyPicArr.concat(linkPicArr);
            };

            // 混乱顺序
            copyPicArr.sort(function () {
                return 0.5 - Math.random()
            });

            return copyPicArr;
        }
    };

    var app = {
        init() {

            // console.log(picData);
            temp.init();
            this.even();
        },

        // 点击事件
        even() {

            let _t = this;
            $("td").on("click", function () {
                _t.pointFn($(this))
            })

            // 重置
            $("#fn-reset").on("click", function () {
                temp.init();
            });
        },

        // 记录点击
        pointFn(dom) {

            let _t = this;
            let x = dom.attr('data-x');
            let y = dom.attr('data-y');

            // console.log({"x" : x, "y" : y});
            // return;
            if (!POINT_BOO) {
                POINT_A = { "x": x, "y": y };
                POINT_BOO = !POINT_BOO;
                return;
            };

            if (POINT_BOO) {
                POINT_B = { "x": x, "y": y };
                POINT_BOO = !POINT_BOO;
                _t.countPointFn();
            };

        },

        // 计算方法
        countPointFn() {

            // 图片是否相同
            if (CODEARR[POINT_A.x][POINT_A.y] !== CODEARR[POINT_B.x][POINT_B.y]) {
                console.log("pic is no");
                return;
            };

            console.log("pic is ok");

            // 0 折
            if (POINT_A.x === POINT_B.x) {
                console.log('x is ok')
                this.checkLine('y')
                return;
            };
            if (POINT_A.y === POINT_B.y) {

                console.log('y is ok')

                this.checkLine('x')

                return;
            };


            // 1 折

            // 2 折
        },

        // 检查
        checkLine: function (type) {

            let a = null;
            let b = null;
            let y = null;

            if (type === 'x') {
                a = POINT_A.x;
                b = POINT_B.x;
                y = POINT_A.y;

                let DOMA = "#pic_" + a + '_' + y;
                let DOMB = "#pic_" + b + '_' + y;                
            }

            $(DOMA,DOMB).html("");


            
        }
    };


    app.init();
}())