import { defineImage } from './_shared'

import aircraftCargoImg from '@/assets/gallery/aircraft/aircraft-cargo-01.webp'
import aircraftPassengerImg from '@/assets/gallery/aircraft/aircraft-passenger-01.webp'
import airportRunwayImg from '@/assets/gallery/airports/airport-runway-01.webp'
import airportTerminalImg from '@/assets/gallery/airports/airport-terminal-01.webp'
import cockpitControlsImg from '@/assets/gallery/cockpit/cockpit-controls-01.webp'
import cockpitGlassImg from '@/assets/gallery/cockpit/cockpit-glass-01.webp'

export default {
  aircraftCargo: defineImage(aircraftCargoImg, 'Samolot transportowy cargo na lotnisku'),
  aircraftPassenger: defineImage(aircraftPassengerImg, 'Samolot pasażerski na tle nieba'),
  airportRunway: defineImage(airportRunwayImg, 'Pas startowy lotniska w świetle dziennym'),
  airportTerminal: defineImage(airportTerminalImg, 'Samoloty przy terminalu lotniska'),
  cockpitControls: defineImage(cockpitControlsImg, 'Zbliżenie na przyrządy i przełączniki w kokpicie'),
  cockpitGlass: defineImage(cockpitGlassImg, 'Nowoczesny kokpit samolotu z ekranami avioniki'),
}
