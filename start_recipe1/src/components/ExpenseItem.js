import App from "../App";
import "./ExpenseItem.css";
// css 파일을 import 해준다.

// 컴포넌트를 생성할 경우 카멜표기법을 사용하고
// 첫글자는 항상 대문자로 표기하여야한다.
// ex) ExpenseItem 처럼 말이다.
function ExpenseItem(props) {
  //  App.js로 부터 데이터를 받는다 props 에

  //   return <h2>Expens item!</h2>;
  // const expenseDate = new Date();
  // console.log(expenseDate);
  // const expenseTitle = "Car Insurance";
  // const expenseAmount = 294.67;
  // retrun 전에 쓰는 코드는 자바스크립트 코드를 사용할 수 있다

  return (
    <div className="expense-item">
      {/* 리액트에는 class = className 이라고 생각하면된다. */}
      <div>{props.date.toDateString()}</div>
      {/* 오류가 났다. 이유는 Date 객체를 생성하고 사용하려고하였는데,
      이를 String으로 변환하지 않아서 생긴 오류였다.
      해결방법은 toDateString 을 사용하였다. */}
      <div className="expense-item__description">
        <h2>{props.title}</h2>
        {/* <ExpenseItem
        title={expenses[0].title}
        amount={expenses[0].amount}
        date={expenses[0].date}
      ></ExpenseItem> 
        
        title로 이름을 설정하였기 때문에 props.title을 사용한다.*/}

        <div className="expense-item__price">{props.amount}</div>
      </div>
    </div>
  );
  // 여러개의 태그를 return 하기 위해서는
  // <div></div>로 감싸주어야한다.
}

export default ExpenseItem;
