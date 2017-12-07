

// console.log(picData);
; (function () {

    var POINT_A = null;     // 点击第一下  {"x" : Number, "y" : Number}
    var POINT_B = null;     // 点击第二下  {"x" : Number, "y" : Number}
    var POINT_BOO = false;  // 重置点击
    var CODEARR = [];

    // CODEARR = [  x = index
    //     [pic0, pic1],
    //     [pic2, pic3]
    // ]

    var temp = {
        row: 8,     // x
        column: 6,  // y
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

            // 0折
            if (this.isStep0()) {
                return;
            };

            // 1 折
            if (this.isStep1()) {
                return;
            };

            // 2 折
            // if (this.isStep2()) {
            //     return;
            // };

            // default
            this.picStatusFn('error');
            console.log(">>>> other ?");
        },

        // 0 折
        isStep0() {

            // 相邻
            if (
                (Math.abs(POINT_A.x - POINT_B.x) === 1 && POINT_A.y === POINT_B.y) ||
                (Math.abs(POINT_A.y - POINT_B.y) === 1 && POINT_A.x === POINT_B.x)
            ) {

                this.picStatusFn('remove');
                return true;
            };


            if (this.compareFn(POINT_A, POINT_B)) {
                this.picStatusFn('remove');
                return true;
            };

            return false;
        },

        // 1折
        isStep1() {

            let Pt1 = { "x": POINT_A.x, "y": POINT_B.y };
            let Pt2 = { "x": POINT_B.x, "y": POINT_A.y };

            if (this.compareFn(POINT_A, Pt1) && this.compareFn(POINT_B, Pt1) && CODEARR[Pt1.x][Pt1.y] === null) {
                this.picStatusFn('remove');
                return true;
            }

            if (this.compareFn(POINT_A, Pt2) && this.compareFn(POINT_B, Pt2) && CODEARR[Pt2.x][Pt2.y] === null) {
                this.picStatusFn('remove');
                return true;
            }

            return false;

        },

        // 2折
        isStep2() {

            let _t = this;

            // same direction && 0 || max
            if ((POINT_A.x === POINT_B.x && (POINT_B.x === 0 || POINT_B.x === temp.row - 1)) || (POINT_A.y === POINT_B.y && (POINT_B.y === 0 || POINT_B.y === temp.column - 1))) {
                this.picStatusFn('remove');
                return true;
            }

            // other
            let Pt1 = { "x": POINT_A.x, "y": temp.column };
            let Pt2 = { "x" : temp.column, "y" : POINT_A.y};
            let Pt3 = { "x" : POINT_A.x, "y" : 0};
            let Pt4 = { "x" : 0, "y" : POINT_A.y};
            let step1, step2, step3, step4;


            step1 = this.compareSeconFn(POINT_A, Pt1, function (res) {
                
                _t.compareSeconFn(res, { "x": temp.row, "y": res.y }, function (items) {

                    if(items){
                        _t.compareSeconFn(items, POINT_B , function(item){

                            if(item){
                                console.log(">>1 : " + item);
                                _t.picStatusFn('remove');
                                return true;
                            }
                        })
                    }
                    
                })
            })

            if(step1){

                console.log(">>> Pt1 : " + JSON.stringify(Pt1));
                return;
            }


            return false;
        },

        /**
         * 2折算法
         * @param {Object} srcPt 
         * @param {Object} destPt 
         * @param {Function} cb 
         */
        compareSeconFn(srcPt, destPt, cb) {

            let base = 0;
            let roof = 0;
            let back = {};

            if (srcPt.x === destPt.x) {

                base = srcPt.y - destPt.y > 0 ? destPt.y : srcPt.y;
                roof = srcPt.y - destPt.y > 0 ? srcPt.y : destPt.y;

                base++;

                for (; base < roof; base++) {
                    
                    if (CODEARR[srcPt.x][base] === null) {

                        back = { "x": srcPt.x, "y": base };
                        console.log("back x : " + JSON.stringify(back));
                            
                    } else {

                        break;
                    }
                }

            }

            if (srcPt.y === destPt.y) {

                base = srcPt.x - destPt.x > 0 ? destPt.x : srcPt.x;
                roof = srcPt.x - destPt.x > 0 ? srcPt.x : destPt.x;

                base ++;

                for(; base < roof; base++){
                    if(CODEARR[base][srcPt.y] === null){

                        back = { "x": base, "y": srcPt.y }
                        console.log("back y : " + JSON.stringify(back));
                        if(cb && cb(back)){
                            return false;
                        }
                    }
                }

            }

            return false;
        },

        /**
         * 0折 1折算法
         * @param {Object} srcPt    {"x" : Number, "y" : Number} 
         * @param {Object} destPt   {"x" : Number, "y" : Number} 
         */
        compareFn(srcPt, destPt) {

            let base = 0;
            let roof = 0;
            let isBack = true;

            if (srcPt.x === destPt.x) {
                base = srcPt.y - destPt.y > 0 ? destPt.y : srcPt.y;
                roof = srcPt.y - destPt.y > 0 ? srcPt.y : destPt.y;
                base++;

                for (; base < roof; base++) {
                    if (CODEARR[srcPt.x][base] !== null) {
                        isBack = false;
                        break;
                    }
                }

                return isBack;
            }

            if (srcPt.y === destPt.y) {
                base = srcPt.x - destPt.x > 0 ? destPt.x : srcPt.x;
                roof = srcPt.x - destPt.x > 0 ? srcPt.x : destPt.x;

                base++;
                for (; base < roof; base++) {
                    if (CODEARR[base][srcPt.y] !== null) {
                        isBack = false;
                        break;
                    }
                }

                return isBack;
            }

            return false;
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

                // console.log(CODEARR)
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