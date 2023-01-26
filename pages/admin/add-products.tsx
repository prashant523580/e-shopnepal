import * as React from "react";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import theme from "../../src/theme/theme";
import Input from '@mui/material/Input'
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles"
import FullLayout from '../../src/layouts/FullLayout';
import Image from "next/image";
import { ProductTypes } from "../../interface/productInterface";
import InputLabel from "@mui/material/InputLabel";
import Select,{SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { json } from "stream/consumers";
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
    console.log(e.target.files[0])
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
    let form = new FormData();
    form.append("title", newProduct.title)
    form.append("availableQuantity", newProduct.availableQuantity)
    form.append("brand", newProduct.brand)
    form.append("category", newProduct.category)
    form.append("color", newProduct.color)
    form.append("size", newProduct.size)
    form.append("description", newProduct.description)
    form.append("price", newProduct.price)
    form.append("imgSrc", image)
    console.log(form)

    let productData = {
      imgSrc : image.name,
      ...newProduct
    }
    let res = await fetch("/api/products",{
      method:"POST",
      body: JSON.stringify(productData),
      headers:{
        "Content-Type":"application/json"
      }
    })
    let data = await res.json();
    console.log(data)
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
            <TextField
              onChange={inputEvent}
              required
              id="category"
              name="category"
              label="Category"
              fullWidth
              autoComplete="category"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={inputEvent}
              required
              id="price"
              name="price"
              label="Price"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
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
              required
              id="image"
              name="image"
              type="file"
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
            <button onClick={addProduct}>submit</button>
          </Grid>
        </Grid>
      </FullLayout>
    </ThemeProvider>
  )
}
