import './App.css';
import GetLogs from './Elements/Logs';
import VoteButtons from './Elements/VoteButtons';
import Diagram from './Elements/diagram';
import NavMenu from './Elements/NavMenu';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
    return (    
   <div> 
     
     <Router> 
        <div>
          <NavMenu/>
          <Switch> 
            <Route exact path="/" component={VoteButtons} />
            <Route exact path="/logs" component={GetLogs} />
            <Route exact path="/diagram" component={Diagram} />
            <Route  children={() => <h2>Not found</h2>} />
          </Switch> 
        </div>
      </Router>
    </div> 
     );
   }
  
 



export default App;
