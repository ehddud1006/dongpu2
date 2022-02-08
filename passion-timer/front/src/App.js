import Date from "./components/date/Date";
import TopBar from "./components/topBar/TopBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./components/singnIn/SignIn";
import Study from "./components/study/Study";


function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <TopBar category={"전체"}></TopBar>
          <Date category={"전체"}></Date>
        </Route>
        <Route path="/su">
          <TopBar category={"수능"}></TopBar>
          <Date category={"수능"}></Date>
        </Route>
        <Route path="/gong">
          <TopBar category={"공무원"}></TopBar>
          <Date category={"공무원"}></Date>
        </Route>
        <Route path="/ja">
          <TopBar category={"자격증"}></TopBar>
          <Date category={"자격증"}></Date>
        </Route>
        <Route path="/dae">
          <TopBar category={"대학생"}></TopBar>
          <Date category={"대학생"}></Date>
        </Route>
        <Route path="/signIn">
          <SignIn></SignIn>
        </Route>
        <Route path="/study">
          <Study></Study>
        </Route>
      </Switch>
    </Router>

  );
}

export default App;