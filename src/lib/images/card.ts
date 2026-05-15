import { defineImage } from './_shared'

import airlineCareerImg from '@/assets/card/airline-career.webp'
import aviationTechnologyImg from '@/assets/card/aviation-technology.webp'
import pilotJobImg from '@/assets/card/pilot-job.webp'
import womenInAviationImg from '@/assets/card/women-in-aviation.webp'

export default {
  airlineCareer: defineImage(
    airlineCareerImg,
    'Samolot pasażerski startujący z pasa lotniska o zachodzie słońca'
  ),

  aviationTechnology: defineImage(
    aviationTechnologyImg,
    'Nowoczesny kokpit samolotu pasażerskiego podczas lotu rejsowego'
  ),

  pilotJob: defineImage(
    pilotJobImg,
    'Pilotka samolotu pasażerskiego sterująca samolotem w kokpicie'
  ),

  womenInAviation: defineImage(
    womenInAviationImg,
    'Pilotka przy samolocie na tle zachodzącego słońca'
  ),
}
