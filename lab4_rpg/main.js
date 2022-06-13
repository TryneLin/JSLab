//mapArray - 決定地圖中每個格子的元素
//ctx - HTML5 Canvas用
//currentImgMainX, currentImgMainY - 決定主角所在座標
//imgMountain, imgMain, imgEnemy - 障礙物, 主角, 敵人的圖片物件
let mapArray, ctx, currentImgMain;
let imgMountain, imgMain, imgEnemy;

// 格線長度, 分割每格寬高
const gridLength = 200;

//網頁載入完成後初始化動作
$(function () {
    //繪製地圖, 0-可走,1-障礙,2-終點,3-敵人
    mapArray = [
        [0, 1, 1],
        [0, 0, 0],
        [3, 1, 2]
    ];
    // ctx = $("#myCanvas")[0].getContext("2d");
    ctx = document.getElementById("myCanvas").getContext("2d");
    // canvas類似畫布, getcontext指定繪製模式為平面方法
    // 大部分不需要[0], 但在某些情況下要加上, 可用console確認
    // ex. 此處如果是用ctx = document.getElementById("mycanvas")就不需要[0]
    imgMain = new Image();
    imgMain.src = "images/spriteSheet.png";
    currentImgMain = {
        "x": 0,
        "y": 0
    };

    //主角繪製到畫面上, 怕圖片物件還沒載入完成所以用onload
    imgMain.onload = function () {
        ctx.drawImage(imgMain, 0, 0, 80, 130, currentImgMain.x, currentImgMain.y, gridLength, gridLength);
    };
    // 抓圖(座標0,0 寬度80, 高度 130, 放在x,y座標, 寬跟著格線大小, 高跟著格線大小)
    // 怎麼知道寬80高 130? 要另外用其他軟體找座標點

    imgMountain = new Image();
    imgMountain.src = "images/material.png";
    imgEnemy = new Image();
    imgEnemy.src = "images/Enemy.png";
    imgMountain.onload = function () {
        imgEnemy.onload = function () {
            for (var x in mapArray) {
                for (var y in mapArray[x]) {
                    if (mapArray[x][y] == 1) {
                        // draw Mountain
                        // 陣列[x][y]跟座標(y,x)轉換
                        ctx.drawImage(imgMountain, 32, 65, 32, 32, y * gridLength, x * gridLength, gridLength, gridLength);
                    } else if (mapArray[x][y] == 3) {
                        // draw Enemy
                        ctx.drawImage(imgEnemy, 7, 40, 104, 135, y * gridLength, x * gridLength, gridLength, gridLength);
                    }
                }
            }
        }
    }
});

//處理使用者按下按鍵
$(document).on("keydown", function (event) {
    let targetImg, targetBlock, cutImagePositionX;
    // 1. 先判斷使用者按了甚麼
    // 2. 判斷目標位置那一格是甚麼物件
    // 3. 決定要做的事(可以前進/只轉身但是過不去/...
    //cutImagePositionX - 決定主角臉朝向哪個方向
    targetImg = { //主角的目標座標canvas(x,y)
        "x": -1,
        "y": -1
    };
    targetBlock = { //主角的目標(對應2維陣列)
        "x": -1,
        "y": -1
    }
    event.preventDefault();
    //避免瀏覽器干擾,滑鼠/鍵盤預設行為發生，如捲動/放大/換頁...
    //判斷使用者按下什麼並推算目標座標

    // 可以設定debugger, 從console查看event的code跟keycodeㄒ


    switch (event.code) {
        case "ArrowLeft":
            targetImg.x = currentImgMain.x - gridLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 175;//臉朝左
            break;
        case "ArrowUp":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y - gridLength;
            cutImagePositionX = 355;//臉朝上
            break;
        case "ArrowRight":
            targetImg.x = currentImgMain.x + gridLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 540;//臉朝右
            break;
        case "ArrowDown":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y + gridLength;
            cutImagePositionX = 0 ;//臉朝下
            break;
        default://其他按鍵不處理
            return;
    }

    //確認目標位置不會超過地圖
    // 前提假設: 在邊界內(x,y在0~400)
    if (targetImg.x <= 400 && targetImg.x >= 0 && targetImg.y <= 400 && targetImg.y >= 0) {
        // 座標值回算陣列值, 用座標/格線長度, 回算在1,2等位置
        targetBlock.x = targetImg.y / gridLength;
        targetBlock.y = targetImg.x / gridLength;
    } else { 
        // 超出邊界設為-1, 取不到值->無效
        targetBlock.x = -1;
        targetBlock.y = -1;
    }
    //清空主角原本所在的位置
    ctx.clearRect(currentImgMain.x, currentImgMain.y, gridLength, gridLength);

    if (targetBlock.x != -1 && targetBlock.y != -1) {
        switch (mapArray[targetBlock.x][targetBlock.y]) {
            case 0: // 一般道路(可移動)
                $("#talkBox").text("");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            case 1: // 有障礙物(不可移動)
                $("#talkBox").text("有山");
                break;
            case 2: // 終點(可移動)
                $("#talkBox").text("抵達終點");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            case 3: // 敵人(不可移動)
                $("#talkBox").text("哈摟");
                break;
        }
    } else {
        $("#talkBox").text("邊界");
    }
    //重新繪製主角
    ctx.drawImage(imgMain, cutImagePositionX, 0, 80, 130, currentImgMain.x, currentImgMain.y, gridLength, gridLength);
});

//處理使用者按下按鍵, event為傳入值
$(document).on("keydown"
    , function (event) {
    });