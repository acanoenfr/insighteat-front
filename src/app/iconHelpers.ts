// Nutriscore SVGs
import nutriscoreA from '@/assets/svgs/nutriscore/nutriscore-a-new-fr.svg'
import nutriscoreB from '@/assets/svgs/nutriscore/nutriscore-b-new-fr.svg'
import nutriscoreC from '@/assets/svgs/nutriscore/nutriscore-c-new-fr.svg'
import nutriscoreD from '@/assets/svgs/nutriscore/nutriscore-d-new-fr.svg'
import nutriscoreE from '@/assets/svgs/nutriscore/nutriscore-e-new-fr.svg'

// Ecoscore SVGs
import ecoscoreA from '@/assets/svgs/ecoscore/ecoscore-a.svg'
import ecoscoreB from '@/assets/svgs/ecoscore/ecoscore-b.svg'
import ecoscoreC from '@/assets/svgs/ecoscore/ecoscore-c.svg'
import ecoscoreD from '@/assets/svgs/ecoscore/ecoscore-d.svg'
import ecoscoreE from '@/assets/svgs/ecoscore/ecoscore-e.svg'

// NOVA SVGs
import nova1 from "@/assets/svgs/nova/nova-group-1.svg"
import nova2 from "@/assets/svgs/nova/nova-group-2.svg"
import nova3 from "@/assets/svgs/nova/nova-group-3.svg"
import nova4 from "@/assets/svgs/nova/nova-group-4.svg"

const nutriscoreIcons: Record<string, string> = {
    a: nutriscoreA,
    b: nutriscoreB,
    c: nutriscoreC,
    d: nutriscoreD,
    e: nutriscoreE
}

const ecoscoreIcons: Record<string, string> = {
    a: ecoscoreA,
    b: ecoscoreB,
    c: ecoscoreC,
    d: ecoscoreD,
    e: ecoscoreE
}

const novaIcons: Record<number, string> = {
    1: nova1,
    2: nova2,
    3: nova3,
    4: nova4
}

export function getNutriScoreIcon(grade?: string): string | undefined {
    if (!grade)
        return undefined

    const g = grade.trim().toLowerCase()
    return nutriscoreIcons[g] ?? undefined
}

export function getEcoScoreIcon(grade?: string): string | undefined {
    if (!grade)
        return undefined

    const e = grade.trim().toLowerCase()
    return ecoscoreIcons[e] ?? undefined
}

export function getNovaIcon(novaGroup?: number): string | undefined {
    if (!novaGroup)
        return undefined

    const n = Number(novaGroup)
    return novaIcons[n] ?? undefined
}
