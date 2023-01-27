import * as React from "react";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import theme from "../../src/theme/theme";
import Input from '@mui/material/Input'
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles"
import FullLayout from '../../src/layouts/FullLayout';
import Image from "next/image";
import { ProductTypes } from "../../interface/productInterface";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import Button from "@mui/material/Button";
export default function AddProducts() {
  const [image, setImage] = React.useState<any>('');
  const [newProduct, setNewProduct] = React.useState<ProductTypes>({
availableQuantity: "",
brand: "",
category: "",
color: "",
description: "",
price: "",
size: "",
title: ""
  });
  // const [size, setSize] = React.useState('');
  const handleImage = (e: any) => {
    setImage(e.target.files[0])
  }
  const inputEvent = (e: any) => {
    let { name, value } = e.target;
    console.log(name, " ", value)
    setNewProduct((pre: any) => {
      return {
        ...pre,
        [name]: value
      }
    })
  }
  const addProduct = async () => {
    if((newProduct.title === "" && newProduct.availableQuantity === "" && newProduct.brand === "" &&
        newProduct.category === "" && newProduct.color === "" && newProduct.description === "" && newProduct.price === "" &&
        newProduct.size === ""
    )){
        alert("fill all inputs")
      }else{

        let formData = new FormData();
        formData.append("title", newProduct.title)
    formData.append("availableQuantity", newProduct.availableQuantity)
    formData.append("brand", newProduct.brand)
    formData.append("category", newProduct.category)
    formData.append("color", newProduct.color)
    formData.append("size", newProduct.size)
    formData.append("description", newProduct.description)
    formData.append("price", newProduct.price)
    formData.append("imgSrc", image)
    // console.log(formData)
    
    // let productData = {
      //   imgSrc : image,
      //   ...newProduct
      // }
      let res = await axios.post("/api/products", formData)
      // let data = await res.json();
      // console.log(res.status == 200)
      if(res.status === 200){
       
        setImage("");
        setNewProduct({
          availableQuantity: "",
          brand: "",
          category: "",
          color: "",
          description: "",
          price: "",
          size: "",
          title: ""
        })
      }
    }
    }
  // const handleChange = (event: SelectChangeEvent) => {
  //   // setSize(event.target.value as string);
  // };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FullLayout>
        <Typography variant="h6" gutterBottom>
          Add Products
        </Typography>
        <Grid container spacing={3}>
      
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={inputEvent}
              required
              value={newProduct.title}
              id="title"
              name="title"
              label="Title"
              fullWidth
              autoComplete="title"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
            value={newProduct.brand}
              onChange={inputEvent}
              required
              id="brand"
              name="brand"
              label="Brand"
              fullWidth
              autoComplete="brand"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
            value={newProduct.color}
              onChange={inputEvent}
              required
              id="color"
              name="color"
              label="Color"
              fullWidth
              autoComplete="color"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            {/* <TextField
            onChange={inputEvent}
          required
            id="size"
            name="size"
            label="Size"
            fullWidth
            autoComplete="size"
            variant="standard"
          /> */}
          <FormControl fullWidth>

            <InputLabel id="demo-simple-select-label">Size</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={newProduct?.size}
              label="size"
              name="size"
              onChange={inputEvent}
            >
              <MenuItem value={"S"}>S</MenuItem>
              <MenuItem value={"M"}>M</MenuItem>
              <MenuItem value={"L"}>L</MenuItem>
              <MenuItem value={"XL"}>XL</MenuItem>
              <MenuItem value={"XXL"}>XXL</MenuItem>
            </Select>
          </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            {/* <TextField
              onChange={inputEvent}
              required
              id="category"
              name="category"
              label="Category"
              fullWidth
              autoComplete="category"
              variant="standard"
            /> */}
              <FormControl fullWidth>

<InputLabel id="demo-simple-select-label">Category</InputLabel>
<Select
  labelId="demo-simple-select-label"
  id="demo-simple-select"
  value={newProduct?.category}
  label="category"
  name="category"
  onChange={inputEvent}
>
  <MenuItem value={"t-shirt"}>tshirt</MenuItem>
  <MenuItem value={"hoodie"}>hoddie</MenuItem>
  <MenuItem value={"pant"}>pant</MenuItem>
</Select>
</FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
            value={newProduct.price}
              onChange={inputEvent}
              required
              id="price"
              name="price"
              label="Price"
              fullWidth
              autoComplete="price"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
            value={newProduct.availableQuantity}
              onChange={inputEvent}
              required
              id="availableQuantity"
              name="availableQuantity"
              label="Availabl eQuantity"
              fullWidth
              autoComplete="availableQuantity"
              variant="standard"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
            value={newProduct.description}
              onChange={inputEvent}
              required
              id="description"
              name="description"
              label="Description"
              fullWidth
              multiline
              rows={4}
              autoComplete="description"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <Input
            // value={image}
              required
              id="image"
              name="image"
              type="file"
              // accept="image/png, image/gif, image/jpeg"
              onChange={handleImage}
              fullWidth
            // multiline
            // rows={4}
            // autoComplete="image"
            // variant="standard"
            />
          </Grid>
          {image &&
            <Grid item xs={12}>
              <div className="img">
                <Image width={100} height={100} alt="selected img" src={URL.createObjectURL(image)} />
              </div>
            </Grid>
          }
          <Grid item xs={12}>
            <Button style={{
              color:"white",
              background: "gray"
            }} onClick={addProduct}>submit</Button>
          </Grid>
        </Grid>
      </FullLayout>
    </ThemeProvider>
  )
}
