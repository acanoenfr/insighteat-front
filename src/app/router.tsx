import { createBrowserRouter } from "react-router-dom";

import { SignInPage } from "@/features/auth/pages/SignInPage";
import { SignUpPage } from "@/features/auth/pages/SignUpPage";
import { HomePage } from "@/features/home/pages/HomePage";
import { ProductPage } from "@/features/products/pages/ProductPage";
import { NotFoundPage } from "@/features/errors/pages/NotFoundPage";

import { Layout } from "./Layout";
import { RequireAuth } from "./RequireAuth";

export const router = createBrowserRouter([
    { path: '/sign_in', element: <SignInPage /> },
    { path: '/sign_up', element: <SignUpPage /> },
    {
        element: <RequireAuth />,
        children: [
            {
                element: <Layout />,
                children: [
                    { index: true, element: <HomePage /> },
                    { path: '/p/:barcode', element: <ProductPage /> }
                ]
            }
        ]
    },
    { path: '*', element: <NotFoundPage /> }
])
