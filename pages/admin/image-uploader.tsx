import React from 'react'

import theme from "../../src/theme/theme";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles"
import FullLayout from '../../src/layouts/FullLayout';
export default function ImageUploader() {
  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <FullLayout>
    <div>ImageUploader</div>
    
    </FullLayout>
    </ThemeProvider>
  )
}
