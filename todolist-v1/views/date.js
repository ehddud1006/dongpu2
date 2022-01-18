module.exports.getDate = getDate;
// getDate()로 쓰지 않는 이유는 고차함수와 비슷한 원리

module.exports = getDate;
// 하나의 함수만 존재할때

function getDate() {
    // res.sendFile(__dirname + "/index.html");
    let today = new Date();
    // var currentDay = today.getDay();


    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    let day = today.toLocaleDateString("en-US", options);
    // Date 객체의 날짜 부분을 지역의 언어에 맞는 문자열 표현으로 반환한다.


    // if (currentDay == 6) {
    //   // 6은 토요일 0은 일요일을 뜻한다.
    //   // res.send("weekend")
    //   day = "Saturday";
    // }
    // else if (currentDay == 0) {
    //   // res.send("working day")
    //   // res.write("<p>It is not the weekend.</p>");
    //   // res.write("<h1>YOu Work");
    //   // res.send()

    //   // 다시한번 상기시키자 res.write()는 버퍼에 쓰고
    //   // send를 통해 전부 보낸다.
    //   day = "Sunday"
    // }
    // else if (currentDay == 1) {
    //   day = "Monday"
    // }
    // else if (currentDay == 2) {
    //   day = "Tuesday"
    // }
    // else if (currentDay == 3) {
    //   day = "Wednesday"
    // }
    // else if (currentDay == 4) {
    //   day = "Thursday"
    // }
    // else if (currentDay == 5) {
    //   day = "Friday"
    // }
    return day
}

module.exports.getDay = getDay;

function getDay() {
    let today = new Date();

    let options = {
        weekday: "long"
    };

    let day = today.toLocaleDateString("en-US", options);

    return day
}