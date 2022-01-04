function month(m) {
  switch (m) {
    case "Jan":
      return "01";
      break;
    case "Feb":
      return "02";
      break;
    case "Mar":
      return "03";
      break;
    case "Apr":
      return "04";
      break;
    case "May":
      return "05";
      break;
    case "Jun":
      return "06";
      break;
    case "Jul":
      return "07";
      break;
    case "Aug":
      return "08";
      break;
    case "Sep":
      return "09";
      break;
    case "Oct":
      return "10";
      break;
    case "Nov":
      return "11";
      break;
    case "Dec":
      return "12";
      break;

    default:
      console.log(m);
  }
}

function tistory(i, todayList) {
  var month1 = month(todayList[1]);
  // https://ehddud100677.tistory.com/archive/20220104
  $("a:eq(" + i + ")").attr(
    "href",
    "https://ehddud100677.tistory.com/archive/" +
      todayList[3] +
      month1 +
      todayList[2]
  );
}

function github(i, todayList) {
  var month1 = month(todayList[1]);
  // https://github.com/ehddud1006?tab=overview&from=2022-01-04&to=2022-01-04
  $("a:eq(" + i + ")").attr(
    "href",
    "https://github.com/ehddud1006?tab=overview&from=" +
      todayList[3] +
      "-" +
      month1 +
      "-" +
      todayList[2] +
      "&to=" +
      todayList[3] +
      "-" +
      month1 +
      "-" +
      todayList[2]
  );
}

// 오늘
var nownow = new Date();
var now = Date(); // 현재 날짜 및 시간
var todayList = now.split(" ");
// ['Tue', 'Jan', '04', '2022', '15:43:53', 'GMT+0900', '(한국', '표준시)']
tistory(0, todayList);
github(1, todayList);

// 1일
var yesterday = new Date(nownow.setDate(nownow.getDate() - 1));
// 빼는 숫자에 유의할 것 1일전 -1
// 4일전은 이미 1일에서 -1 을 한 상태이므로 -3만 해주면됨
// 7일전은 -3만 해주면됨 (이미 -4 를 한 상태이므로)
var yesterdayString = yesterday.toString();
var yesterdayList = yesterdayString.split(" ");
tistory(2, yesterdayList);
github(3, yesterdayList);

// 4일
var fourdayago = new Date(nownow.setDate(nownow.getDate() - 3));
var fourdayagoString = fourdayago.toString();
var fourdayagoList = fourdayagoString.split(" ");
tistory(4, fourdayagoList);
github(5, fourdayagoList);

// 1주

var oneWeek = new Date(nownow.setDate(nownow.getDate() - 3));
var oneWeekString = oneWeek.toString();
var oneWeekList = oneWeekString.split(" ");
tistory(6, oneWeekList);
github(7, oneWeekList);

// 2주
var twoWeek = new Date(nownow.setDate(nownow.getDate() - 7));
var twoWeekString = twoWeek.toString();
var twoWeekList = twoWeekString.split(" ");
tistory(8, twoWeekList);
github(9, twoWeekList);

// 한달
var oneMonth = new Date(nownow.setDate(nownow.getDate() - 14));
var oneMonthString = oneMonth.toString();
var oneMonthList = oneMonthString.split(" ");
tistory(10, oneMonthList);
github(11, oneMonthList);

// 2달
var twoMonth = new Date(nownow.setDate(nownow.getDate() - 28));
var twoMonthString = twoMonth.toString();
var twoMonthList = twoMonthString.split(" ");
tistory(12, twoMonthList);
github(13, twoMonthList);

// 4달
var fourMonth = new Date(nownow.setDate(nownow.getDate() - 56));
var fourMonthString = fourMonth.toString();
var fourMonthList = fourMonthString.split(" ");
tistory(14, fourMonthList);
github(15, fourMonthList);
