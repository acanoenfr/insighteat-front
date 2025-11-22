import { useEffect, useState } from "react"

export function useCameraPermission() {
    const [status, setStatus] = useState<PermissionState | 'unsupported'>('prompt')

    useEffect(() => {
        async function check() {
            if (!navigator.mediaDevices?.getUserMedia) {
                setStatus('unsupported')
                return
            }

            try
            {
                await navigator.mediaDevices.getUserMedia({ video: true })
                setStatus('granted')
            }
            catch
            {
                setStatus('denied')
            }
        }

        check().catch(() => setStatus('denied'))
    }, [])

    return status
}
