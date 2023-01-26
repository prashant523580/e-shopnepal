import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../../components/Title';
import theme from "../../src/theme/theme";
import DeleteIcon from '@mui/icons-material/Delete';
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles"
import FullLayout from '../../src/layouts/FullLayout';
import { connectToDatabase } from '../../lib/mongodb';
import Link from 'next/link';
import Image from 'next/image';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: 400,
  height:500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY:"auto"
};
export default function Products({products}:any) {
  const [numb,setNumb] = React.useState<number>(6);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loader,setLoader] = React.useState<boolean>(false);
  const [product,setProduct] = React.useState<any>([]);

  const loadMoreData = () => {
    setLoader(true)
    setTimeout(() => {
      setLoader(false);
      setNumb(numb + 8)
   },500) 
  }


  const deleteProduct = async (_id : any) => {
    console.log(_id)
    let res = await fetch("/api/product/deleteProduct",{
      method:"POST",
      body: JSON.stringify(_id),
      headers:{
        "Content-Type": "application/json"
      }
    })
    let data = await res.json();
    console.log(data)
    if(data.success){
      window.location.reload()
    }
  }
  const handleProductModal = (product : any) => {
    
    setProduct(product)
    // handleOpen()
    
  }
  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <FullLayout>
    <div>
      {
        product && 
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
        <h1> {product.title}</h1>
            {/* {product._id} */}
          </Typography>
          <div style={{
            position:"relative",
            width:"300px",
            height:"400px"
          }}>

          <Image src={product.imgSrc} alt={product.title} fill />
          </div>
          <div>
            <h3>category:{product.category}</h3>
            <p>Available Quantity : {product.availableQuantity}</p>
            <p>color : {product.color}</p>
            <p>size : {product.size}</p>
            <p>Price : {product.price}</p>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {product.description}
            </Typography>
          </div>
        </Box>
      </Modal>
      }
    </div>
    <div>Products</div>
    <Table size="small" style={{overflowX:"auto"}}>
      <TableHead>
          <TableRow>
            <TableCell>img</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>category</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Size</TableCell>
            <TableCell>Color</TableCell>
            <TableCell>Avaialble Quantity</TableCell>
            <TableCell > Amount</TableCell>
            <TableCell colSpan={2} align="right">More</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(products).slice(0,numb).map((key : any) => (

            
            <TableRow key={products[key]._id}>
              <TableCell><Image alt={products[key].title} src={products[key].imgSrc} sizes="100vw" width={100} height={100}/></TableCell>
              <TableCell> <h1 className='truncate w-40'> {products[key].title}</h1></TableCell>
              <TableCell>{products[key].category}</TableCell>
              <TableCell>{products[key].brand}</TableCell>
              <TableCell>{products[key].size}</TableCell>
              <TableCell>{products[key].color}</TableCell>
              <TableCell>{products[key].availableQuantity}</TableCell>
              {/* <TableCell>{products[key].address.phone}</TableCell>
              <TableCell>{products[key].paymentStatus}</TableCell> */}
              <TableCell >{`Rs${products[key].price}`}</TableCell>
              <TableCell colSpan={2} align="right"><button onClick={() => {handleProductModal(products[key]) , handleOpen()}}>edit</button> </TableCell>
              <TableCell colSpan={2} align="right"> <button onClick={ () => deleteProduct(products[key]._id)}><DeleteIcon style={{color:"red"}}/></button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {
            loader ? 
            <div className="loading">loading...</div> : null
          }
          {
            numb <  products.length ? 
              loader ? null :
              <Link color="primary" href="#" onClick={loadMoreData} >
              See more orders
            </Link> : <p className='p'>Yay! You have seen it all</p>
          }
      
    </FullLayout>
    </ThemeProvider>
  )
}

export const getServerSideProps = async () => {
let {db} = await connectToDatabase();

let products = await db.collection("Products").find().toArray();
let newProducts : any = {};
for(let item of products){
    if(item.title in newProducts){
        if(!newProducts[item.title].color.includes(item.color) && item.availableQuantity > 0){
            newProducts[item.title].color.push(item.color)
        }
        if(!newProducts[item.title].size.includes(item.size) && item.availableQuantity > 0){
            newProducts[item.title].size.push(item.size)
        }
    }else{
        newProducts[item.title] =  item
        if(item.availableQuantity > 0){
            newProducts[item.title].size = [item.size];
            newProducts[item.title].color = [item.color]
          }else{
          newProducts[item.title].size = [];
          newProducts[item.title].color = []

        }
    }

}
  return{
    props:{
      products : JSON.parse(JSON.stringify(products))
    }
  }
}
