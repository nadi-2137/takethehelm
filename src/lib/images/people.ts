import { defineImage } from './_shared'

import ameliaEarhartImg from '@/assets/people/amelia-earhart-smithsonian.jpg'
import personAtcImg from '@/assets/people/person-atc-01.webp'
import pilotByAircraftImg from '@/assets/people/pilotka-przy-samolocie.webp'
import raymondeDeLarocheImg from '@/assets/people/raymonde-de-laroche.jpg'
import sabihaGokcenImg from '@/assets/people/sabiha-gokcen.jpg'

export default {
  atc: defineImage(
    personAtcImg,
    'Kontrolerka ruchu lotniczego obserwuje operacje lotniskowe z wiezy kontroli lotow'
  ),
  pilotByAircraft: defineImage(
    pilotByAircraftImg,
    'Pilotka stoi obok samolotu na plycie lotniska przed lotem'
  ),
  pioneer01: defineImage(
    ameliaEarhartImg,
    'Portret Amelii Earhart, pionierki lotnictwa i pierwszej kobiety, ktora samotnie przeleciala nad Atlantykiem'
  ),
  pioneer02: defineImage(
    raymondeDeLarocheImg,
    'Portret Raymonde de Laroche, pierwszej kobiety z oficjalna licencja pilota'
  ),
  pioneer03: defineImage(
    sabihaGokcenImg,
    'Portret Sabiha Gokcen, jednej z pierwszych kobiet pilotow wojskowych na swiecie'
  ),
}
