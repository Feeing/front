import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import MainPage from './pages/MainPage/MainPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Register from './pages/Register/Register';
import MyPage from './pages/MyPage/MyPage';
import List from './pages/List/List';
import Notice from './pages/Notice/Notice';
import QnA from './pages/QnA/QnA';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/login" component={Login}/>
        <Route exact path="/signup" component={SignUp}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/mypage" component={MyPage}/>
        <Route exact path="/list/:group_name/:group_id" component = {List}/>
        <Route exact path="/notice/:group_name/:group_id" component = {Notice}/>
        <Route exact path="/qna/:group_name/:group_id" component = {QnA}/>
      </Switch>
    </Router>
  );
}

export default App;