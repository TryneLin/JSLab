$(function () {

    // $("input").on("click", function () {
    //     $("h1").text($("li").eq(Math.floor(Math.random()*$("li").length)).text()) 
    // })

    // 語法簡化
    $("button").on("click", function () {
        let numberOfList = $("#dinnerlist li").length
        let randomOfNumber = Math.floor(Math.random() * numberOfList)
        $("h1").text($("#dinnerlist li").eq(randomOfNumber).text())

        // 方法1
        let picOfList = ["noodle1.jpg","rice.jfif","dumpling.jfif","noodle2.jpg"]
        $("img").attr( "src", picOfList[randomOfNumber] )
        
        //方法2
        // let picOfList = { 拉麵: "noodle1.jpg", 水餃: "dumpling.jfif", 滷肉飯: "rice.jfif", 麵疙瘩: "noodle2.jpg" }
        // $("img").attr("src", picOfList[$("li").eq(randomOfNumber).text()])      
    })

    // jquery 語法轉換
    // $("input") => let thisInput = document.getElementsByTagName("input")[0]
    // .on("click", function () {alert("Hi")}) => thisInput.addEventListener("click", function(){alert("Hi")})

    // $("h1") => let thisH1 = document.getElementsByTagName("h1")[0]
    // .text("?") => thisH1.innerHTML = "?"


})


