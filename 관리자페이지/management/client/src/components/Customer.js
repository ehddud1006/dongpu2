import CustomerInfo from './CustomerInfo'
import CustomerProfile from './CustomerProfile'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { Switch, Route, Redirect,Link } from 'react-router-dom';
import restaurantName from './RestaurantName';
import { BrowserRouter } from 'react-router-dom';
import './Customer.css'
const Customer = ({id,image,name,birthday,gender,job}) => { // 함수형 컴포넌트 시작~!
    console.log(image)
    return (
    
    <BrowserRouter>
        <TableRow>
            <TableCell>{id}</TableCell>
            <TableCell><img className="img_size" src={image} alt="profile"/></TableCell>
            {/* <Link to ={`/main/${id}`}><TableCell>{name}</TableCell></Link> */}
            <TableCell><a href={`/main/${id}`}>{name}</a></TableCell>
            <TableCell>{job}</TableCell>
            <TableCell>{birthday}</TableCell>
            <TableCell>{gender}</TableCell>
        </TableRow>
    </BrowserRouter>
        
    );
  };

export default Customer;