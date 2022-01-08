import "./ExpenseItem.css";
// css 파일을 import 해준다.

// 컴포넌트를 생성할 경우 카멜표기법을 사용하고
// 첫글자는 항상 대문자로 표기하여야한다.
// ex) ExpenseItem 처럼 말이다.
function ExpenseItem() {
  //   return <h2>Expens item!</h2>;

  return (
    <div className="expense-item">
      {/* 리액트에는 class = className 이라고 생각하면된다. */}
      <div>March 28th 2021</div>
      <div className="expense-item__description">
        <h2>Car Insurance</h2>
        <div className="expense-item__price">$294.67</div>
      </div>
    </div>
  );
  // 여러개의 태그를 return 하기 위해서는
  // <div></div>로 감싸주어야한다.
}

export default ExpenseItem;
