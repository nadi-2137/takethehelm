import { defineImage } from './_shared'

import airlineImg from '@/assets/type/airline.webp'
import cargoImg from '@/assets/type/cargo.webp'
import militaryImg from '@/assets/type/military.webp'
import heliImg from '@/assets/type/heli.webp'
import rescueImg from '@/assets/type/rescue.webp'
import fireImg from '@/assets/type/fire.webp'

export default {
  airline: defineImage(
    airlineImg,
    'Samolot pasażerski linii lotniczych podczas startu z pasa lotniska'
  ),
  cargo: defineImage(cargoImg, 'Samolot cargo podczas załadunku towarów na lotnisku'),
  military: defineImage(
    militaryImg,
    'Wojskowy samolot myśliwski przygotowany do lotu na lotnisku wojskowym'
  ),
  heli: defineImage(heliImg, 'Śmigłowiec stojący na lądowisku w centrum miasta po zmroku'),
  rescue: defineImage(rescueImg, 'Ratowniczy śmigłowiec medyczny podczas akcji w górach'),
  fire: defineImage(fireImg, 'Samolot gaśniczy zrzucający wodę nad pożarem lasu'),
}
