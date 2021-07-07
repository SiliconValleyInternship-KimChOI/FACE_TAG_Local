import logo from './logo.svg';
import './App.css';
import Main from './js/Main'
import Result from './js/Result'
import { BrowserRouter,Route, Link,Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <Route path="/" component={Main} exact/>
      <Route path="/result" component={Result} />
    </div>
  );
}

export default App;
