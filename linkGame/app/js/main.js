

// console.log(picData);
; (function () {

    var POINT_A = null; // 点击第一下
    var POINT_B = null; // 点击第二下
    var POINT_BOO = false;  // 重置点击
    var CODEARR = [];

    var temp = {
        row: 6,
        column: 6,
        pic_num: 6,
        TABLE: $("<table cellspacing='0'></table>"),

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
                TD += '<td id="pic_' + r + '_' + d + '"><i data-x="' + r + '"data-y="' + d + '" class="pic-link pic-' + tdArr[d] + '" ><i></td>';
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
            $("#app").on("click", ".pic-link", function () {
                $(".pic-link").removeClass("pic-false");
                if (!$(this).hasClass('pic-true')) {
                    _t.pointFn($(this))
                }
            })

            // 重置
            $("#fn-reset").on("click", function () {
                temp.init();
            });
        },

        // 记录点击
        pointFn(dom) {

            let _t = this;
            let x = parseInt(dom.attr('data-x'));
            let y = parseInt(dom.attr('data-y'));

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

            console.log(POINT_A);
            console.log(POINT_B);

            // 位置是否相同
            if (POINT_A.x === POINT_B.x && POINT_A.y === POINT_B.y) {
                console.log("the same pic");
                this.picStatusFn('error');
                return;
            }

            // 图片是否相同
            if (CODEARR[POINT_A.x][POINT_A.y] !== CODEARR[POINT_B.x][POINT_B.y]) {
                console.log("pic is no");
                this.picStatusFn('error');
                return;
            };

            ///////////////////////////////////////
            // 0折
            if (!this.isStep_0()) {
                return;
            };

            ///////////////////////////////////////
            // 1 折
            if (!this.isStep_1()) {
                return;
            };

            console.log(">>>> other ?");


            // 2 折
        },

        // 0 折
        isStep_0() {

        },

        // 1折
        isStep_1() {

            // X轴


            // Y轴
        },

        compareFn(){

        },

        // 移除 或 警告
        picStatusFn(type) {

            let DOMA = "#pic_" + POINT_A.x + '_' + POINT_A.y;
            let DOMB = "#pic_" + POINT_B.x + '_' + POINT_B.y;
            let pic = $(DOMA + ',' + DOMB).find('.pic-link');

            if (type === 'remove') {
                CODEARR[POINT_A.x][POINT_A.y] = null;
                CODEARR[POINT_B.x][POINT_B.y] = null;
                pic.removeClass("pic-false").addClass("pic-true");
                return;
            }
            if (type === 'error') {
                pic.addClass("pic-false");
                return;
            }

        }
    };


    app.init();
}())