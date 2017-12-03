

// console.log(picData);
; (function () {

    var DR = document.getElementById("app");
    var POINT_A = null; // 点击第一下
    var POINT_B = null; // 点击第二下
    var POINT_BOO = 0;  // 重置点击
    var BASEPATH = 'src/img/'; 
    var CODEARR = [];

    var temp = {
        row: 6,
        column: 6,
        pic_num: 18,

        init() {

            let TABLE = document.createElement("table");
            let picArr = this.picFn();

            this.trFn(TABLE, picArr);
            DR.appendChild(TABLE);
            
        },

        trFn(dom, arr) {

            let r = 0;
            let tr = null;

            for (; r < this.row; r++) {
                
                tr = document.createElement("tr");
                CODEARR[r]=[];
                this.tdFn(tr, r, arr);
                dom.appendChild(tr);
            }
        },

        tdFn(dom, r, arr) {

            let d = 0;
            let td = null;
            let tdArr = arr.slice(r*this.column, (r+1)*this.column);
            let txt = {};
            

            for (; d < this.column; d++) {

                txt = {
                    "x": r,
                    "y": d
                };
                CODEARR[r][d] = tdArr[d] ;
                td = document.createElement("td");
                td.setAttribute("site", JSON.stringify(txt));
                td.innerHTML = '<img src="' + BASEPATH + tdArr[d] + '.png"/>';
                dom.appendChild(td);
            }

        },

        /**
         * @param picData
         */
        picFn : function(){
            let i = 0;
            let j = 0;
            let len = picData.length;
            let copyCount= this.column*this.row / this.pic_num;   // 复制次数
            let idx = Number;
            let linkPicArr = [];
            let copyPicArr = [];

            // 随机图片数组
            for(; i < this.pic_num ; i++){
                
                idx = Math.floor(Math.random()*len);

                linkPicArr.push(picData[idx]);
            };

            // 复制图片
            for(; j < copyCount; j++){
                copyPicArr = copyPicArr.concat(linkPicArr);
            };

            // 混乱顺序
            copyPicArr.sort(function(){
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

            let tdObj = document.getElementsByTagName("td");
            let i = 0;
            let len = tdObj.length;
            let _t = this;

            for (; i < len; i++) {
                tdObj[i].addEventListener('click', function () {
                    _t.pointFn(this.getAttribute('site'), this);
                }, false);
            }
        },

        // 记录点击
        pointFn(attr, idx) {
            console.log(idx);
            let _t = this;
            
            if (POINT_BOO === 0) {
                POINT_A = JSON.parse(attr);
                POINT_BOO++;
                return;
            };

            if(POINT_BOO === 1){
                POINT_B = JSON.parse(attr);
                POINT_BOO = 0;
                _t.countPointFn();
            };
            
        },

        // 计算方法
        countPointFn() {
            // console.log(POINT_A);
            // console.log(POINT_B);
            // console.log(CODEARR);
            // console.log(CODEARR[POINT_A.x][POINT_A.y]);
            // console.log(CODEARR[POINT_B.x][POINT_B.y])

            // 图片是否相同
            if(CODEARR[POINT_A.x][POINT_A.y] !== CODEARR[POINT_B.x][POINT_B.y]){
                console.log("pic is no")
                return ;
            };

            console.log("pic is ok");
            
            // 0 折
            if(POINT_A.x === POINT_B.x){
                console.log('x is ok')
                
                
                return; 
            };
            if(POINT_A.y === POINT_B.y){
                
                console.log('y is ok')
                
                if(Math.abs(POINT_A.x - POINT_B.x) === 1){

                }

                return;
            };

            
            // 1 折

            // 2 折
        },

        // 检查
        checkLine : function(a, b, y){
            
        }
    };


    app.init();
}())