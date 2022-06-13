$(function () {

    // 建立變數: 答題進度
    let currentQuiz = null

    // 按下按鈕後要執行的動作
    $("#startButton").on("click", function () {

        if (currentQuiz == null) {
            //剛開始作答
            currentQuiz = 0
            //reset currentQuiz 歸零

            //顯示題目 集合questions[第一筆0]."question"
            $("#question").text(questions[0].question)

            //重新開始後清空
            // $("#options").empty()


            // 加入選項
            questions[0].answers.forEach(function(element, index, array) {
                $("#options").append(`<input type="radio" name="options" value="${index}">
                <label>${element[0]}</label><br><br> `)
            })

        

            $("#startButton").attr("value", "Next")


        } else {
            //已經開始作答
            //尋訪哪一個選項有被選取
            $.each($(":radio"), function (i, val) {
                if (val.checked==true) {
                    // 是不是已經最後要產生結果
                    if (isNaN(questions[currentQuiz].answers[i][1])) {
                        // 產生結果並重新開始
                        let finalResult = questions[currentQuiz].answers[i][1]
                        $("#question").text(finalAnswers[finalResult][0])
                        $("#options").empty()
                        $("#options").append(`${finalAnswers[finalResult][1]}<br><br></br>`)
                        currentQuiz=null
                        $("#startButton").attr("value","重新開始")
                        

                    } else {
                        // 跳下一題,原始資料為紙本資料從1開始, 所以要-1對照js陣列
                        currentQuiz= questions[currentQuiz].answers[i][1]-1
                        $("#question").text(questions[currentQuiz].question)
                        $("#options").empty()
                        questions[currentQuiz].answers.forEach(function (element, index, array) {
                            $("#options").append(`<input type="radio" name="options" value="${index}">
                            <label>${element[0]}</label><br><br> `)
                        })


                    } return false //跳離迴圈
                }


            })


        }

    })

})
