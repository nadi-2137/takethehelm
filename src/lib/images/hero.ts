import heroBecomePilot from '@/assets/hero/become-pilot.webp'
import heroHome from '@/assets/hero/home.webp'
import heroWomenInAviation from '@/assets/hero/women-in-aviation.webp'
import heroTechnology from '@/assets/hero/technology.webp'
import heroSources from '@/assets/hero/sources.webp'
import heroGallery from '@/assets/hero/gallery.webp'
import heroWhoIsPilot from '@/assets/hero/who-is-pilot.webp'
import heroKnowledge from '@/assets/hero/knowledge.webp'
import heroResponsibility from '@/assets/hero/pilot-responsibility.webp'
import heroFactsAndMyths from '@/assets/hero/facts-and-myths.webp'
import heroAutopilot from '@/assets/hero/autopilot.webp'
import heroFlightSafety from '@/assets/hero/flight-safety.webp'
import heroNavigationSystems from '@/assets/hero/navigation-systems.webp'
import heroWeatherRadar from '@/assets/hero/weather-radar.webp'
import heroWorkDayHero from '@/assets/hero/work-day-hero.webp'
import heroGalleryCover from '@/assets/hero/gallery-cover.webp'

import { defineImage } from './_shared'

export default {
  becomePilot: defineImage(heroBecomePilot, 'Pilot w kokpicie samolotu'),
  home: defineImage(heroHome, 'Samolot na tle zachodzącego słońca'),
  womenInAviation: defineImage(heroWomenInAviation, 'Pilotka przy samolocie'),
  technology: defineImage(heroTechnology, 'Nowoczesny kokpit'),
  sources: defineImage(heroSources, 'Stosy książek i dokumentów'),
  gallery: defineImage(heroGallery, 'Kolaż zdjęć lotniczych'),
  whoIsPilot: defineImage(heroWhoIsPilot, 'Pilotka w kombinezonie na tle samolotu'),
  knowledge: defineImage(heroKnowledge, 'Kokpit samolotu z widokiem na chmury'),
  responsibility: defineImage(
    heroResponsibility,
    'Pilotka przed samolotem pasażerskim na płycie lotniska'
  ),
  factsAndMyths: defineImage(
    heroFactsAndMyths,
    'Nowoczesny samolot pasażerski lecący ponad chmurami'
  ),
  autopilot: defineImage(
    heroAutopilot,
    'Panel autopilota samolotu pasażerskiego podczas lotu rejsowego'
  ),
  flightSafety: defineImage(
    heroFlightSafety,
    'Piloci samolotu pasażerskiego wykonujący procedury bezpieczeństwa podczas lotu w trudnych warunkach pogodowych'
  ),
  navigationSystems: defineImage(
    heroNavigationSystems,
    'Systemy nawigacyjne samolotu pasażerskiego wyświetlające trasę lotu'
  ),
  weatherRadar: defineImage(
    heroWeatherRadar,
    'Radar pogodowy w kokpicie samolotu pokazujący aktywne komórki burzowe'
  ),
  workDayHero: defineImage(heroWorkDayHero, 'Pilotka podczas pracy w kokpicie samolotu'),
  galleryCover: defineImage(heroGalleryCover, 'Samolot na płycie lotniska'),
}
