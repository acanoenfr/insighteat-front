import scanBeep from '@/assets/sounds/scan-beep.mp3';

let beepAudio: HTMLAudioElement | null = null;

export function playBeep() {
    if (!beepAudio) {
        beepAudio = new Audio(scanBeep)
        beepAudio.preload = 'auto'
    }

    beepAudio.currentTime = 0

    beepAudio
        .play()
        .catch((e) => {
            console.debug('Silent warning during playing beep. ', e)
        });
}
