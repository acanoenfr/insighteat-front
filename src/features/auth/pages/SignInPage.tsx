import { useState, type FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Box, Paper, Stack, Typography, Alert, TextField, Button, Link } from '@mui/material'
import { Field, useForm } from '@tanstack/react-form'
import { useTranslation } from 'react-i18next'

import { useAuthStore } from '@/shared/store/auth.store'
import { signIn } from '../api'

export function SignInPage() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    const signInStore = useAuthStore((s) => s.login)

    const form = useForm({
        defaultValues: {
            username: '',
            password: ''
        },
        onSubmit: async ({ value }) => handleSignIn(value.username, value.password)
    })
    const [error, setError] = useState<string>()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
    }

    const handleSignIn = async (username: string, password: string) => {
        setError(undefined)

        try {
            const res = await signIn({ username, password })
            signInStore(res.token, username)
            navigate(from, { replace: true })
        }
        catch
        {
            setError(t('auth.sign-in.errors.invalid-credentials'))
        }
    }

    return (
        <Box
            display="flex"
            minHeight="100vh"
            alignItems="center"
            justifyContent="center"
            sx={{ bgcolor: 'background.default' }}
        >
            <Paper sx={{ p: 4, width: '100%', maxWidth: 420 }}>
                <Stack spacing={3}>
                    <Typography variant="h5" component="h1">
                        {t('auth.sign-in.title')}
                    </Typography>

                    {error && <Alert severity="error">{error}</Alert>}

                    <Box component="form" onSubmit={handleSubmit}>
                        <Stack spacing={2}>
                            <Field
                                name="username"
                                form={form}
                                children={({ state, handleChange, handleBlur }) => (
                                    <TextField
                                        label={t('auth.sign-in.fields.username.label')}
                                        fullWidth
                                        value={state.value}
                                        onChange={(e) => handleChange(e.target.value)}
                                        onBlur={handleBlur}
                                    />
                                )}
                            />

                            <Field
                                name="password"
                                form={form}
                                children={({ state, handleChange, handleBlur }) => (
                                    <TextField
                                        label={t('auth.sign-in.fields.password.label')}
                                        type="password"
                                        fullWidth
                                        value={state.value}
                                        onChange={(e) => handleChange(e.target.value)}
                                        onBlur={handleBlur}
                                    />
                                )}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                            >
                                {t('auth.sign-in.actions.submit')}
                            </Button>
                        </Stack>
                    </Box>

                    <Typography variant="body2" color="text.secondary">
                        {t('auth.sign-in.no-account')}{' '}
                        <Link href="/sign_up">
                            {t('auth.sign-in.actions.create-account')}
                        </Link>
                    </Typography>
                </Stack>
            </Paper>
        </Box>
    )
}
