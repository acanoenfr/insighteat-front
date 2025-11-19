import { createBrowserRouter } from "react-router-dom";

import { SignInPage } from "@/features/auth/pages/SignInPage";
import { SignUpPage } from "@/features/auth/pages/SignUpPage";
import { HomePage } from "@/features/home/pages/HomePage";
import { NotFoundPage } from "@/features/errors/pages/NotFoundPage";

import { RequireAuth } from "./RequireAuth";
import { Layout } from "./Layout";
import { ProductPage } from "@/features/products/pages/ProductPage";

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
                    { path: '/p/:code', element: <ProductPage /> }
                ]
            }
        ]
    },

    { path: '*', element: <NotFoundPage /> }
])
