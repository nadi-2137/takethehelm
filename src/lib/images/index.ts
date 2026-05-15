export * from './_shared'
import hero from './hero'
import card from './card'
import section from './section'
import type from './type'
import gallery from './gallery'
import people from './people'
import story from './story'
import decor from './decor'
import tech from './tech'

export const images = {
  site: {
    home: hero.home,
    gallery: hero.gallery,
    galleryCover: hero.galleryCover,
    knowledge: hero.knowledge,
    sources: hero.sources,
  },
  topic: {
    career: {
      becomePilot: hero.becomePilot,
      becomePilotCard: section.becomePilot,
      flightTraining: section.flightTraining,
      pilotLicense: section.pilotLicense,
      pilotSkills: section.pilotSkills,
      airlineCareer: card.airlineCareer,
    },
    profession: {
      whoIsPilot: hero.whoIsPilot,
      whoIsPilotCard: section.whoIsPilot,
      workDay: section.workDay,
      workDayHero: hero.workDayHero,
      responsibility: hero.responsibility,
      responsibilityCard: section.responsibility,
      pilotTypes: section.pilotTypes,
      pilotJob: card.pilotJob,
    },
    technology: {
      cockpit: hero.technology,
      cockpitCard: section.technology,
      cockpitPromoCard: card.aviationTechnology,
      autopilot: hero.autopilot,
      autopilotPanel: tech.autopilot,
      navigation: hero.navigationSystems,
      navigationPanel: tech.navigationSystems,
      weatherRadarPanel: tech.weatherRadar,
      safetyPanel: tech.flightSafety,
      weatherRadar: hero.weatherRadar,
      safety: hero.flightSafety,
    },
    knowledge: {
      factsAndMyths: hero.factsAndMyths,
      mythsAndFactsCard: section.mythsAndFacts,
    },
    people: {
      womenInAviation: hero.womenInAviation,
      womenInAviationCard: card.womenInAviation,
    },
  },
  roles: type,
  gallery,
  people,
  stories: story,
  backgrounds: decor,
  legacy: {
    hero,
    card,
    section,
    type,
    story,
    decor,
    tech,
  },
}
