/**
 * 光影对决爬虫文件
 */
var http = require('http');
var Promise = require('bluebird');
var fs = require('fs');

var GETBASEURL = "http://www.goodmoba.com/hero/mobile/";
var WRITEURL = "./mp/data/guangying/";

var files = require('./files');
var heroArr = require('./mp/data/guangying/hero-list');

// 解析地址
function backHeroArr(data) {

    let detailArr = [];

    data.forEach(function (element) {
        detailArr.push(getData(GETBASEURL + element.unit_id + '.html'));
    });

    Promise
        .all(detailArr)
        .then(function (items) {
            items.forEach(function (item,i) {
                let newUnitId = data[i]['unit_id'];
                writeFile(WRITEURL + newUnitId + '.js', 'module.exports=' + files.edit(item))
            })
        })
}

// 发起请求
function getData(url) {

    return new Promise(function (resolve, reject) {

        console.log("start :" + url);
        http.get(url, function (res) {

            let buf = new Buffer(0);

            res.on('data', function (data) {

                buf = Buffer.concat([buf, data])

            });

            res.on('end', function () {

                resolve(buf.toString());
                console.log('success :' + url);

            })

        }).on('error', function (e) {

            reject(e);
            console.log("wrong :" + url);

        })
    })
}

// 写入数据
function writeFile(fptah, content) {

    return new Promise(function (resolve, reject) {

        fs.writeFileSync(fptah, content, 'utf-8', function (err) {

            if (err) {
                reject(err)
            } else {
                resolve();
            }
        })
    })
}

// var testData = [{
//     "id": "5",
//     "unit_id": "U005",
//     "name_china": "古瑟",
//     "honor_china": "夜影",
//     "icon2": "Hero\/img_X_U005.png",
//     "icon5": "XuanChuan\/Img_Hero_U005.png",
//     "arcurl": "http:\/\/www.goodmoba.com\/hero\/mobile\/U005.html"
// }];

backHeroArr(heroArr);