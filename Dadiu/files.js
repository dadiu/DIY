var cheerio = require('cheerio');

exports.edit = function (html) {

    var $ = cheerio.load(html);

    let heroName = $(".title-box").find("span").text().split(" · ");

    let skins = [];
    $(".swiper-slide").each(function () {
        skins.push({
            "name": "",
            "pic": $(this).find("img").prop("src")
        });
    });

    let skills = [];
    
    $("#skillBoxList li").each(function (i) {

        skills.push({
            "name" : $(this).find(".sname").text(),
            "pic" : $(this).find("img").prop("src"),
            "desc" : [],
            "levels" : []
        });

    });

    $("#skillBoxCont .item").each(function (i) {

        // 冷却时间 消耗 描述
        $(this).find(".profile").find("p").each(function(){
            skills[i]['desc'].push($(this).text());
        });

        $(this).find("li").each(function(){
            skills[i]['levels'].push({
                "pic" : $(this).find("img").prop("src"),
                "name" : $(this).find(".name").text(),
                "desc" : $(this).find(".desc").text()
            });
        })
    })

    return JSON.stringify({
        "name_china": heroName[1],
        "honor_china": heroName[0],
        "skins" : skins,
        "skills" : skills
    })

}