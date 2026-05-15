import { defineImage } from './_shared'

import story1Img from '@/assets/story/story-1.webp'
import story2Img from '@/assets/story/story-2.webp'
import story3Img from '@/assets/story/story-3.webp'

export default {
  one: defineImage(story1Img, 'Historia pionierek lotnictwa i ich wplywu na wspolczesna awiacje'),
  two: defineImage(
    story2Img,
    'Codzienna praca zalogi kokpitowej podczas przygotowania i prowadzenia lotu'
  ),
  three: defineImage(story3Img, 'Etapy rozwoju od pierwszych lotow szkolnych do zawodu pilota'),
}
