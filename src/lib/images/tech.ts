import { defineImage } from './_shared'

import techAutopilotImg from '@/assets/hero/autopilot.webp'
import techFlightSafetyImg from '@/assets/hero/flight-safety.webp'
import techNavigationSystemsImg from '@/assets/hero/navigation-systems.webp'
import techWeatherRadarImg from '@/assets/hero/weather-radar.webp'

export default {
  autopilot: defineImage(
    techAutopilotImg,
    'Panel autopilota w kokpicie z pokretlami trybow lotu i wskazaniami systemow'
  ),
  flightSafety: defineImage(
    techFlightSafetyImg,
    'Ekran i procedury bezpieczenstwa lotu w nowoczesnym kokpicie samolotu'
  ),
  navigationSystems: defineImage(
    techNavigationSystemsImg,
    'Ekran systemow nawigacyjnych z trasa lotu i danymi pozycyjnymi'
  ),
  weatherRadar: defineImage(
    techWeatherRadarImg,
    'Radar pogodowy z obrazem stref opadow i burz na trasie lotu'
  ),
}
