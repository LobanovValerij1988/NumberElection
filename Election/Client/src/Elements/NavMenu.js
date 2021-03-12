import GetLogs from './Logs';
import VoteButtons from './VoteButtons';
import Diagram from './diagram';
import {Link}  from "react-router-dom";
import test from "./testPage";
import "./Style/layout.css";
function NavMenu() { 
   return (  
       <> 
            <Link to="/" className="links"> choose figure {VoteButtons}   </Link> 
            <Link to="/logs" className="links">  look logs {GetLogs} </Link>
            <Link to="/diagram" className="links"> see results {Diagram}</Link>
            <Link to="/test" className="links"> testPage {test}</Link>  
       </> 
       ); 
      }
export default NavMenu;
