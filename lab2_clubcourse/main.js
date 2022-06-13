
$(function () {

    let topicCount = topic.length
    let inputMonth
    let inputDay

    // 1 sec = 1000 ms
    // 計算一天的秒數
    let millisecsPerDay = 24 * 60 * 60 * 1000

    function addtable() {
        $("#courseTable").append("<tr><th>場次</th><th>時間</th><th>主題</th></tr>")
        // id => #

        for (let x = 0; x < topicCount; x++) {

            let thisDateObject = new Date(startDate.getTime() + 7 * x * millisecsPerDay)

            if (topic[x].indexOf("停課") >= 0) {
                $("#courseTable").append(
                    `<tr><td>${x + 1}</th>
                    <td>${thisDateObject.getMonth() + 1}/${thisDateObject.getDate()}</td>
                    <td style= background:gray>${topic[x]}</td>
                    </tr>`
                )

            } else {
                $("#courseTable").append(
                    `<tr ><td>${x + 1}</th>
                        <td>${thisDateObject.getMonth() + 1}/${thisDateObject.getDate()}</td>
                        <td>${topic[x]}</td>
                        </tr>`
                )
            }

        }
    }

    window.onload = addtable()

    $("#startDate").on("change", function () {
        // 取得自行設定後的月份跟日期
        let inputMonth = $("#startDate").val().slice(5, 7)
        let inputDay = $("#startDate").val().slice(8)
        // setMonthAndDay(2,1)
        setMonthAndDay(inputMonth, inputDay)
        $("#courseTable").empty()
        addtable()
    })


    // <td>${( new Date(startDate.getTime()+7*x*millisecsPerDay)).toLocaleDateString()}</td>
    // <td>${startDate}</td>

})
