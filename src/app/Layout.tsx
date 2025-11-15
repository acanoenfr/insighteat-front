import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { AppBar, Box, Toolbar, Typography } from "@mui/material"

import { LanguageSwitcher } from "@/shared/components/LanguageSwitcher"

export function Layout() {
    const { t } = useTranslation()

    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component={Link}
                        to="/"
                        sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}
                    >
                        {t('app.title')}
                    </Typography>

                    <LanguageSwitcher />
                </Toolbar>
            </AppBar>
        </Box>
    )
}
