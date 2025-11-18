import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider, CssBaseline } from "@mui/material"

import { router } from "./app/router";
import { queryClient } from "./app/queryClient"
import { theme } from "./app/theme"

import './app/i18n'
import "./styles/main.scss"

ReactDOM
  .createRoot(document.getElementById("root")!)
  .render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </React.StrictMode>,
  )
