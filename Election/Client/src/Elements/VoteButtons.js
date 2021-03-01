import './Button'
import Button from './Button';
function VoteButtons() {
   let numbers=[1,2,3,4,5,6,7,8,9];
 
 return (
  numbers.map(i=> <Button  key={i}  number={ i} /> )
  );
}

export default VoteButtons;
