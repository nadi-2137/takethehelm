import { defineImage } from './_shared'

import becomePilotImg from '@/assets/section/become-pilot.webp'
import flightTrainingImg from '@/assets/section/flight-training.webp'
import pilotLicenseImg from '@/assets/section/pilot-license.webp'
import pilotSkillsImg from '@/assets/section/pilot-skills.webp'
import workDayImg from '@/assets/section/work-day.webp'
import technologyImg from '@/assets/section/technology.webp'
import mythsAndFactsImg from '@/assets/section/myths-and-facts.webp'
import pilotLicenseAltImg from '@/assets/section/pilot-license-alt.webp'
import whoIsPilotImg from '@/assets/section/who-is-pilot.webp'
import pilotTypesImg from '@/assets/section/pilot-types.webp'
import responsibilityImg from '@/assets/section/pilot-responsibility.webp'
import pilotDayImg from '@/assets/section/pilot-day.webp'

export default {
  becomePilot: defineImage(
    becomePilotImg,
    'Samolot pasażerski startujący z pasa lotniska o zachodzie słońca'
  ),

  flightTraining: defineImage(
    flightTrainingImg,
    'Pilotka samolotu pasażerskiego sterująca samolotem w kokpicie'
  ),

  pilotLicense: defineImage(pilotLicenseImg, 'Pilotka przy samolocie na tle zachodzącego słońca'),

  pilotSkills: defineImage(
    pilotSkillsImg,
    'Pilotka samolotu pasażerskiego sterująca samolotem w kokpicie'
  ),

  workDay: defineImage(workDayImg, 'Pilotka samolotu pasażerskiego sterująca samolotem w kokpicie'),

  technology: defineImage(
    technologyImg,
    'Samolot pasażerski lecący nad chmurami o zachodzie słońca'
  ),

  mythsAndFacts: defineImage(
    mythsAndFactsImg,
    'Samolot pasażerski startujący z pasa lotniska o zachodzie słońca'
  ),
  pilotLicenseAlt: defineImage(
    pilotLicenseAltImg,
    'Pilotka przy samolocie na tle zachodzącego słońca'
  ),
  whoIsPilot: defineImage(whoIsPilotImg, 'Pilotka przy samolocie gotowa do lotu'),
  pilotTypes: defineImage(pilotTypesImg, 'Różne typy lotnictwa i specjalizacje pilota'),
  responsibility: defineImage(
    responsibilityImg,
    'Pilotka przed samolotem pasażerskim na płycie lotniska'
  ),
  pilotDay: defineImage(pilotDayImg, 'Dzień pracy pilotki od briefingu do lądowania'),
}
