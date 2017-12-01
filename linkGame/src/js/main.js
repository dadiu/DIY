// let picData = require("pic"); 

; (function () {

    var DR = document.getElementById("app");
    var POINT_A = null; // 点击第一下
    var POINT_B = null; // 点击第二下
    var POINT_BOO = 0;  // 重置点击

    var temp = {
        row: 10,
        column: 10,

        init() {

            let TABLE = document.createElement("table");

            this.trFn(TABLE)
            DR.appendChild(TABLE);

        },

        trFn(dom) {

            let r = 0;
            let tr = null;

            for (; r < this.row; r++) {

                tr = document.createElement("tr");
                this.tdFn(tr, r);

                dom.appendChild(tr);
            }
        },

        tdFn(dom, r) {

            let d = 0;
            let td = null;
            let txt = {
                "pic": "pic",
                "x": r,
                "y": Number
            };

            for (; d < this.column; d++) {

                txt.y = d;
                td = document.createElement("td");
                td.setAttribute("site", JSON.stringify(txt));
                td.innerHTML = '[' + r + ',' + d + ']';
                dom.appendChild(td);
            }

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
                    _t.pointFn(this.getAttribute('site'));
                }, false);
            }
        },

        // 记录点击
        pointFn(attr) {

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
            console.log(POINT_A);
            console.log(POINT_B);

            // 0 折
            
            // 1 折

            // 2 折
        }
    };



    app.init();
}())