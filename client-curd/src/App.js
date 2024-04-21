import "../node_modules/bootstrap/dist/css/bootstrap.min.css" ;
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import './App.css';
import Navbaar from "./component/Navbaar.js";
import Home from "./component/Home.js";
import Register from "./component/Register.js";
import { Switch, Route } from "react-router-dom";
import Edit from "./component/Edit.js";
import Details from "./component/Details.js";
import Attend from "./component/Attend.js";


function App() {
  return (
    <>

    <Navbaar/>
    <Switch> 
      <Route  exact path="/" component={Home}/>
      <Route  exact path="/attend" component={Attend}/>
      <Route exact path="/register" component={Register}/>
      <Route exact path="/edit/:id" component={Edit}/>
      <Route exact path="/view/:id" component={Details}/>
     
      
    </Switch>

    
    </>
    
  );
}

export default App;
