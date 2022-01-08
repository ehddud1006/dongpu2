import ExpenseItem from "./components/ExpenseItem";
// 경로 표현시 . 은 현재폴더
// .. 은 상위 폴더를 의미한다.

// 키보드로 드래그할때, ctrl + home은 해당줄 제일 앞까지
// ctrl + end는 해당줄 제일 뒤까지
function App() {
  return (
    <div>
      <h2>Let's get started!</h2>
      <ExpenseItem></ExpenseItem>
    </div>
    // JSX 기본적으로 자바스크립트 내부의 HTML 코드이다.
  );
}

export default App;
