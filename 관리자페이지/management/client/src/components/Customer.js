import CustomerInfo from './CustomerInfo'
import CustomerProfile from './CustomerProfile'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const Customer = ({id,image,name,birthday,gender,job}) => { // 함수형 컴포넌트 시작~!
    return (
        <TableRow>
            <TableCell>{id}</TableCell>
            <TableCell><img src={image} alt="profile"/></TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{birthday}</TableCell>
            <TableCell>{gender}</TableCell>
            <TableCell>{job}</TableCell>
        </TableRow>
    );
  };

export default Customer;