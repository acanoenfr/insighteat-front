import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import { Alert, Box, Button, Card, CardContent, CircularProgress, Stack, TextField, Typography } from "@mui/material"
import { ChevronRightOutlined } from "@mui/icons-material"
import { BrowserMultiFormatReader } from '@zxing/browser'

import { playBeep } from "@/app/beep"

export function HomePage() {
    const { t } = useTranslation()
    const navigate = useNavigate()

    const [ean, setEan] = useState<string>('')
    const [scanError, setScanError] = useState<string | undefined>()
    const [scanning, setScanning] = useState<boolean>(false)
    const [cameraReady, setCameraReady] = useState<boolean>(false)

    const videoRef = useRef<HTMLVideoElement | null>(null)
    const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null)
    const navigatedRef = useRef(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const code = ean.trim()
        if (!code)
            return
        navigate(`/p/${encodeURIComponent(code)}`)
    }

    useEffect(() => {
        let cancelled = false;

        async function startScanner() {
            if (!videoRef.current)
                return

            setScanError(undefined)
            setScanning(true)

            const reader = new BrowserMultiFormatReader()
            codeReaderRef.current = reader

            try
            {
                await reader.decodeFromVideoDevice(
                    undefined,
                    videoRef.current,
                    result => {
                        if (result) {
                            const text = result.getText().trim()

                            if (!text || navigatedRef.current) return
                            if (!/^\d{8,14}$/.test(text)) return

                            try {
                                playBeep()
                            }
                            catch (e)
                            {
                                console.debug('Silent warning during playing beep.', e)
                            }

                            navigatedRef.current = true
                            stopScanner()
                            navigate(`/p/${encodeURIComponent(text)}`)
                        }
                    }
                );
                if (!cancelled) setCameraReady(true)
            }
            catch (e)
            {
                console.error(e)
                if (!cancelled)
                    setScanError(t('home.ean-scan.errors.camera-permission'))
            }
            finally
            {
                if (!cancelled)
                    setScanning(false)
            }
        }

        startScanner().catch(console.error)

        return () => {
            cancelled = true
            stopScanner()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const stopScanner = () => {
        setScanning(false)
        if (codeReaderRef.current)
            codeReaderRef.current = null
    }

    return (
        <Stack spacing={3} sx={{ mt: 2 }}>
            <Card>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        {t('home.ean-search.title')}
                    </Typography>

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        display="flex"
                        gap={1}
                        mt={1}
                    >
                        <TextField
                            fullWidth
                            label={t('home.ean-search.label')}
                            value={ean}
                            onChange={(e) => setEan(e.target.value)}
                            inputMode="numeric"
                        />
                        <Button type="submit" size="small" variant="contained">
                            <ChevronRightOutlined />
                        </Button>
                    </Box>
                </CardContent>
            </Card>

            <Card>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        {t('home.ean-scan.title')}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" mb={2}>
                        {t('home.ean-scan.description')}
                    </Typography>

                    {scanError && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {scanError}
                        </Alert>
                    )}

                    <Box
                        sx={{
                            position: 'relative',
                            width: '100%',
                            aspectRatio: '4 / 3',
                            bgcolor: '#000',
                            borderRadius: 2,
                            overflow: 'hidden'
                        }}
                    >
                        <video
                            ref={videoRef}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            muted
                            playsInline
                        />

                        <Box
                            sx={{
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                height: '2px',
                                bgcolor: 'red',
                                boxShadow: '0 0 8px rgba(255,0,0,0.8)',
                                pointerEvents: 'none'
                            }}
                        />

                        {(!cameraReady || scanning) && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    inset: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    bgcolor: 'rgba(0,0,0,0.4)',
                                    color: '#fff',
                                    textAlign: 'center',
                                    px: 2
                                }}
                            >
                                <Stack alignItems="center" spacing={1}>
                                    <CircularProgress size={22} color="inherit" />
                                    <Typography variant="body2">
                                        {t('home.ean-scan.camera-loading')}
                                    </Typography>
                                </Stack>
                            </Box>
                        )}
                    </Box>
                </CardContent>
            </Card>
        </Stack>
    )
}
