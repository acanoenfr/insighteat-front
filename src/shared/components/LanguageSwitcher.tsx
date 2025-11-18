import { FormControl, MenuItem, Select, type SelectChangeEvent } from "@mui/material"
import { useTranslation } from "react-i18next"

export function LanguageSwitcher() {
    const { i18n, t } = useTranslation()
    const current = i18n.resolvedLanguage || 'en'

    const handleChange = (event: SelectChangeEvent<string>) => {
        i18n.changeLanguage(event.target.value)
    }

    return (
        <FormControl size="small" variant="outlined">
            <Select
                value={current}
                onChange={handleChange}
                sx={{
                    color: 'inherit',
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.4)' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.8)' }
                }}
            >
                <MenuItem value="en">{t('app.language.english')}</MenuItem>
                <MenuItem value="fr">{t('app.language.french')}</MenuItem>
            </Select>
        </FormControl>
    )
}
