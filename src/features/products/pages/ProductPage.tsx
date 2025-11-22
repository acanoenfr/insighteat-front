import { useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"

import { Alert, Box, CircularProgress, Stack, Typography } from "@mui/material"

import { useProduct } from "../hooks/useProduct"
import { env } from "@/app/env"

export function ProductPage() {
    const { barcode = '' } = useParams()
    const { t } = useTranslation()

    const { data, isLoading, isError } = useProduct(barcode)

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (isError || !data) {
        return (
            <Alert severity="error" sx={{ mt: 2 }}>
                {t('product.not-found')}
            </Alert>
        );
    }

    return (
        <div className="product-page">
            <Stack spacing={3}>
                <Box>
                    <Typography variant="h5" gutterBottom>
                        {data.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {data.brandName && `${data.brandName} • `}
                        {data.quantity}
                    </Typography>

                    <img
                        src={`${env.VITE_PRODUCT_BASE_URL}${data.imageUrl}front_fr.${data.images.front['fr']}.full.jpg`}
                        alt={data.name}
                        width="40%"
                    />
                </Box>
            </Stack>
        </div>
    )
}
