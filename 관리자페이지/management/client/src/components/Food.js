import CustomerInfo from './CustomerInfo'
import CustomerProfile from './CustomerProfile'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { Switch, Route, Redirect,Link } from 'react-router-dom';
import restaurantName from './RestaurantName';
import { BrowserRouter } from 'react-router-dom';
import './Customer.css'
const Food = ({menu_id,image ,menu_name, price}) => { // 함수형 컴포넌트 시작~!
  console.log(image)  
  return (
        
    
    <TableRow>
        <TableCell>{menu_id}</TableCell>
        <TableCell><img className="img_size" src={image} alt="profile"/></TableCell>
        {/* <Link to ={`/main/${id}`}><TableCell>{name}</TableCell></Link> */}
        <TableCell>{menu_name}</TableCell>
        <TableCell>{price}</TableCell>
    </TableRow>

        
    );
  };

export default Food;