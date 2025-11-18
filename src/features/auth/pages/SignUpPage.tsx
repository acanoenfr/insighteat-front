import { useState, type FormEvent } from "react"
import { useNavigate, useLocation } from "react-router-dom"

import { Alert, Box, Button, FormControl, InputLabel, Link, MenuItem, Paper, Select, Stack, TextField, Typography } from "@mui/material"
import { Field, useForm } from "@tanstack/react-form"
import { useTranslation } from "react-i18next"

import { signUp } from "../api"
import type { SignUpRequest } from "../types"

export function SignUpPage() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/sign_in'

    const form = useForm({
            defaultValues: {
                gender: '',
                givenName: '',
                familyName: '',
                email: '',
                password: '',
                passwordConfirmation: ''
            },
            onSubmit: async ({ value }) => handleSignUp({
                gender: value.gender,
                givenName: value.givenName,
                familyName: value.familyName,
                email: value.email,
                plainPassword: value.password
            })
        })
    const [error, setError] = useState<string>()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
    }

    const handleSignUp = async (data: SignUpRequest) => {
        setError(undefined)

        try {
            await signUp(data)
            navigate(from, { replace: true })
        }
        catch
        {
            setError(t('auth.sign-up.errors.unexpected-error'))
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
                        {t('auth.sign-up.title')}
                    </Typography>

                    {error && <Alert severity="error">{error}</Alert>}

                    <Box component="form" onSubmit={handleSubmit}>
                        <Stack spacing={2}>
                            <Field
                                name="gender"
                                form={form}
                                children={({ state, handleChange, handleBlur }) => (
                                    <FormControl fullWidth onBlur={handleBlur}>
                                        <InputLabel>{t('auth.sign-up.fields.gender.label')}</InputLabel>
                                        <Select
                                            value={state.value}
                                            onChange={(e) => handleChange(e.target.value)}
                                        >
                                            <MenuItem value="Male">{t('auth.sign-up.fields.gender.label.options.male')}</MenuItem>
                                            <MenuItem value="Female">{t('auth.sign-up.fields.gender.label.options.female')}</MenuItem>
                                            <MenuItem value="Other">{t('auth.sign-up.fields.gender.label.options.other')}</MenuItem>
                                        </Select>
                                    </FormControl>
                                )}
                            />

                            <Field
                                name="givenName"
                                form={form}
                                children={({ state, handleChange, handleBlur }) => (
                                    <TextField
                                        label={t('auth.sign-up.fields.given-name.label')}
                                        fullWidth
                                        value={state.value}
                                        onChange={(e) => handleChange(e.target.value)}
                                        onBlur={handleBlur}
                                    />
                                )}
                            />

                            <Field
                                name="familyName"
                                form={form}
                                children={({ state, handleChange, handleBlur }) => (
                                    <TextField
                                        label={t('auth.sign-up.fields.family-name.label')}
                                        fullWidth
                                        value={state.value}
                                        onChange={(e) => handleChange(e.target.value)}
                                        onBlur={handleBlur}
                                    />
                                )}
                            />

                            <Field
                                name="email"
                                form={form}
                                children={({ state, handleChange, handleBlur }) => (
                                    <TextField
                                        label={t('auth.sign-up.fields.email.label')}
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
                                        label={t('auth.sign-up.fields.password.label')}
                                        type="password"
                                        fullWidth
                                        value={state.value}
                                        onChange={(e) => handleChange(e.target.value)}
                                        onBlur={handleBlur}
                                    />
                                )}
                            />

                            <Field
                                name="passwordConfirmation"
                                form={form}
                                children={({ state, handleChange, handleBlur }) => (
                                    <TextField
                                        label={t('auth.sign-up.fields.password-confirmation.label')}
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
                                {t('auth.sign-up.actions.submit')}
                            </Button>
                        </Stack>
                    </Box>

                    <Typography variant="body2" color="text.secondary">
                        {t('auth.sign-up.have-account')}{' '}
                        <Link href="/sign_in">
                            {t('auth.sign-up.actions.sign-in-account')}
                        </Link>
                    </Typography>
                </Stack>
            </Paper>
        </Box>
    )
}
