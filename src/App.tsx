import { RouterProvider } from "react-router-dom"
import { Alert, Snackbar } from "@mui/material"

import { router } from "./app/router"
import { useCameraPermission } from "./shared/hooks/useCameraPermission";
import { useTranslation } from "react-i18next";

export function App() {
    const { t } = useTranslation()
    const cameraStatus = useCameraPermission()

    return (
        <>
            <RouterProvider router={router} />

            <Snackbar
                open={cameraStatus === 'denied'}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity="warning" variant="filled" sx={{ width: '100%' }}>
                    {t('app.errors.camera-permission')}
                </Alert>
            </Snackbar>
        </>
    )
}