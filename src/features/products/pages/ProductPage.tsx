import { useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"

import { Alert, Box, Card, CardContent, CardHeader, Chip, CircularProgress, Grid, Stack, Typography } from "@mui/material"

import { useProduct } from "../hooks/useProduct"
import { env } from "@/app/env"
import type { ProductComponent } from "../types"
import { getEcoScoreIcon, getNovaIcon, getNutriScoreIcon } from "@/app/iconHelpers"

export function ProductPage() {
    const { barcode = '' } = useParams()
    const { t } = useTranslation()

    const { data, isLoading, isError } = useProduct(barcode)
    const scores: string[] = ['A', 'B', 'C', 'D', 'E']

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

    const renderComponentsList = (components: ProductComponent[], kind: 'negative' | 'positive') => {
        if (!components?.length) {
            return (
                <Typography variant="body2" color="text.secondary">
                    {kind === 'negative' ? t('product.nutrition.components.negative.description') : t('product.nutrition.components.positive.description')}
                </Typography>
            )
        }

        return (
            <Stack spacing={0.75}>
                {components.map((c) => (
                    <Box
                        key={c.id}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'baseline',
                            borderBottom: '1px solid rgba(0,0,0,0.05)',
                            pb: 0.5
                        }}
                    >
                        <Typography variant="body2">
                            {t(`product.nutrition.components.types.${formatComponentId(c.id)}`)}{' '}
                        </Typography>
                        <Typography component="span" variant="caption" color="text.secondary">
                            {c.value}{c.unit !== 'number' ? ` ${c.unit}` : ''}
                        </Typography>
                    </Box>
                ))}
            </Stack>
        )
    }

    const formatComponentId = (id: string) => {
        return id
            .replaceAll(/_/g, '-')
    }

    const describeNovaGroup = (novaGroup: number | null | undefined) => {
        switch (novaGroup) {
            case 1:
                return t('product.nova.types.1')
            case 2:
                return t('product.nova.types.2')
            case 3:
                return t('product.nova.types.3')
            case 4:
                return t('product.nova.types.4')
        }
    }

    return (
        <div className="product-page">
            <Stack spacing={3} sx={{ mt: 2 }}>
                <Card>
                    <CardContent>
                        <Grid container spacing={3} alignItems="flex-start">
                            <Grid item xs={12} md={4}>
                                <Box
                                    sx={{
                                        width: '100%',
                                        borderRadius: 2,
                                        overflow: 'hidden',
                                        bgcolor: '#f5f5f5',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        minHeight: 200
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={`${data.imageUrl}front_fr.${data.images.front['fr']}.full.jpg`}
                                        alt={data.name}
                                        sx={{
                                            maxWidth: '100%',
                                            maxHeight: 280,
                                            objectFit: 'contain'
                                        }}
                                    />
                                </Box>
                            </Grid>
                            
                            <Grid item xs={12} md={8}>
                                <Stack spacing={2}>
                                    <Box>
                                        <Typography variant="h5" gutterBottom>
                                            {data.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {data.brandName && `${data.brandName} • `}
                                            {data.quantity}
                                        </Typography>
                                    </Box>

                                    <Box>
                                        <Typography variant="subtitle1" gutterBottom>
                                            {t('product.ingredients.title')}
                                        </Typography>
                                        <Typography variant="body2">
                                            {data.ingredients}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader
                        title={t('product.nutrition.title')}
                    />
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={3}>
                                <Stack spacing={1}>
                                    {scores.includes(data.data.grade) ? (
                                        <Box
                                            component="img"
                                            src={getNutriScoreIcon(data.data.grade)}
                                            alt={data.data.grade}
                                            sx={{ maxWidth: 160, maxHeight: 80 }}
                                        />
                                    ) : (
                                        <Typography variant="h3" color="text.secondary">
                                            {t('product.nutriscore.not-applicable')}
                                        </Typography>
                                    )}

                                    <Box mt={1} display="flex" flexWrap="wrap" gap={0.5}>
                                        {data.data.isCheese && <Chip size="small" label={t('product.nutriscore.flags.cheese')} />}
                                        {data.data.isWater && <Chip size="small" label={t('product.nutriscore.flags.water')} />}
                                        {data.data.isBeverage && <Chip size="small" label={t('product.nutriscore.flags.beverage')} />}
                                        {data.data.isRedMeatProduct && <Chip size="small" label={t('product.nutriscore.flags.red-meat')} />}
                                        {data.data.isFatOilNutsSeeds && <Chip size="small" label={t('product.nutriscore.flags.fat-oil-nuts')} />}
                                    </Box>

                                    {!!data.data.positiveNutrients?.length && (
                                        <Box mt={1}>
                                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                                {t('product.nutriscore.positive-nutrients.label')}
                                            </Typography>
                                            <Box display="flex" flexWrap="wrap" gap={0.5}>
                                                {data.data.positiveNutrients.map((n) => (
                                                    <Chip key={n} size="small" label={t(`product.nutriscore.positive-nutrients.types.${formatComponentId(n)}`)} />
                                                ))}
                                            </Box>
                                        </Box>
                                    )}
                                </Stack>
                            </Grid>

                            <Grid item xs={12} md={9} sx={{ width: '100%' }}>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    {t('product.nutrition.per')}{' '}
                                    {data.nutritionDataPer}
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6} sx={{ width: '40%' }}>
                                        <Typography variant="subtitle2" gutterBottom>
                                            {t('product.nutrition.components.negative.label')}
                                        </Typography>
                                        {renderComponentsList(data.data.components.negative, 'negative')}
                                    </Grid>
                                    <Grid item xs={12} md={6} sx={{ width: '40%' }}>
                                        <Typography variant="subtitle2" gutterBottom>
                                            {t('product.nutrition.components.positive.label')}
                                        </Typography>
                                        {renderComponentsList(data.data.components.positive, 'positive')}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader title={t('product.ecoscore.title')} />
                    <CardContent>
                        <Stack spacing={1}>
                            {scores.includes(data.ecoscore) ? (
                                <Box
                                    component="img"
                                    src={getEcoScoreIcon(data.ecoscore)}
                                    alt={data.ecoscore}
                                    sx={{ maxWidth: 160, maxHeight: 80 }}
                                />
                            ) : (
                                <Typography variant="h4" color="text.secondary">
                                    {t('product.ecoscore.not-applicable')}
                                </Typography>
                            )}
                            <Typography variant="body2" color="text.secondary">
                                {t('product.ecoscore.description')}
                            </Typography>
                        </Stack>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader title={t('product.nova.title')} />
                    <CardContent>
                        <Stack spacing={1}>
                            {[1, 2, 3, 4].includes(data.novaGroup) ? (
                                <Box
                                    component="img"
                                    src={getNovaIcon(data.novaGroup)}
                                    alt={data.novaGroup.toString()}
                                    sx={{ maxWidth: 60 }}
                                />
                            ) : (
                                <Typography variant="h4" color="text.secondary">
                                    {t('product.nova.not-applicable')}
                                </Typography>
                            )}
                            <Typography variant="body2" color="text.secondary">
                                {t('product.nova.description')}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {describeNovaGroup(data.novaGroup)}
                            </Typography>
                        </Stack>
                    </CardContent>
                </Card>
            </Stack>
        </div>
    )
}
