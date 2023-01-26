import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../../components/Title';
import theme from "../../src/theme/theme";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles"
import FullLayout from '../../src/layouts/FullLayout';
import { connectToDatabase } from '../../lib/mongodb';
interface OrderTypes {
  date: string,
  name: string,
  shipTo: string,
  paymentMethod: string,
  amount: number,
  paymentStatus?:string,
  status?: any,
  orderStatus?: string,
  orderId?: any,
  userID?: any,
  address?: any
}
export default function Orders({orders} : any) {
  
  const [numb,setNumb] = React.useState<number>(4);
  const [loader,setLoader] = React.useState<boolean>(false);
  const loadMoreData = () => {
    setLoader(true)
    setTimeout(() => {
      setLoader(false);
      setNumb(numb + 4)
   },500) 
  }
  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <FullLayout style>
      <Title>Recent Orders</Title>
      <Table size="small" style={{overflowX:"auto"}}>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Ship To</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell>Payment Status</TableCell>
            <TableCell >Sale Amount</TableCell>
            <TableCell align="right">More</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.slice(0,numb).map((row : any) => (

            
            <TableRow key={row._id}>
              <TableCell>{row.orderId}</TableCell>
              <TableCell>{row.address.fullname}</TableCell>
              <TableCell>{row.address.street}</TableCell>
              <TableCell>{row.address.phone}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell>{row.paymentStatus}</TableCell>
              <TableCell >{`Rs${row.amount}`}</TableCell>
              <TableCell align="right"><button>view</button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {
            loader ? 
            <div className="loading">loading...</div> : null
          }
          {
            numb <  orders.length ? 
              loader ? null :
              <Link color="primary" href="#" onClick={loadMoreData} sx={{ mt: 3 }}>
              See more orders
            </Link> : <p className='p'>Yay! You have seen it all</p>
          }
      
    </FullLayout>
    </ThemeProvider>
  )
}

export const getServerSideProps = async() => {
let {db} = await connectToDatabase();
let orders = await db.collection("Orders").find().toArray();
console.log(orders)
  return{
    props:{
      orders : JSON.parse(JSON.stringify(orders))
    }
  }
}