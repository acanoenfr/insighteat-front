import { Link, Outlet } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material"

import { useAuthStore } from "@/shared/store/auth.store"

export function Layout() {
    const { t } = useTranslation()
    const { logout } = useAuthStore()

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

                    <Button
                        color="error"
                        variant="contained"
                        sx={{ marginLeft: 1 }}
                        onClick={logout}
                    >
                        {t('app.actions.sign-out')}
                    </Button>
                </Toolbar>
            </AppBar>

            <Container maxWidth="md" sx={{ py: 3, flexGrow: 1 }}>
                <Outlet />
            </Container>
        </Box>
    )
}
