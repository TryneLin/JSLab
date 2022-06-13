let topic = ["尚未開學",
    "國定假日",
    "停課-環境準備",
    "停課-隨機性",
    "重複性",
    "成果發表"
]

let startDate = new Date()
function setMonthAndDay(startMonth, startDay) {
    //設定好月份和日期, month從0開始, 所以輸入值要再-1
    startDate.setMonth(startMonth-1, startDay)
    startDate.setHours(0)
    startDate.setMinutes(0)
    startDate.setSeconds(0)
}

// setMonthAndDay(2,1)
