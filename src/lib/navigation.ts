export const navigation = {
  brand: {
    name: 'Własny kurs',
    tagline: 'Wyżej niż szklany sufit',
    homeHref: '',
  },
  navbar: {
    variant: 'aviation',
    items: [
      { label: 'Start', href: '' },
      {
        label: 'Zawód',
        href: 'zawod/',
        children: [
          { label: 'Kim jest pilot?', href: 'zawod/kim-jest-pilot/' },
          { label: 'Dzień pracy', href: 'zawod/dzien-pracy/' },
          { label: 'Odpowiedzialność', href: 'zawod/odpowiedzialnosc/' },
          { label: 'Typy pilotów', href: 'zawod/typy-pilotow/' },
          { label: 'Zawód przyszłości', href: 'zawod/zawod-przyszlosci/' },
        ],
      },
      {
        label: 'Kariera',
        href: 'kariera/',
        children: [
          { label: 'Jak zostać pilotką', href: 'kariera/jak-zostac/' },
          { label: 'Szkolenia lotnicze', href: 'kariera/szkolenia/' },
          { label: 'Umiejętności', href: 'kariera/umiejetnosci/' },
          { label: 'Licencje', href: 'kariera/licencje/' },
          { label: 'Checklista kandydata', href: 'kariera/checklista-kandydata/' },
        ],
      },
      {
        label: 'Technologia',
        href: 'technologia/',
        children: [
          { label: 'Kokpit', href: 'technologia/kokpit/' },
          { label: 'Autopilot', href: 'technologia/autopilot/' },
          { label: 'Nawigacja', href: 'technologia/nawigacja/' },
          { label: 'Radar pogodowy', href: 'technologia/radar-pogodowy/' },
          { label: 'Bezpieczeństwo', href: 'technologia/bezpieczenstwo/' },
          { label: 'Jak działa bezpieczeństwo', href: 'technologia/jak-dziala-bezpieczenstwo/' },
        ],
      },
      {
        label: 'Wiedza',
        href: 'wiedza/',
        children: [
          { label: 'Ciekawostki', href: 'wiedza/ciekawostki/' },
          { label: 'Słownik pojęć', href: 'wiedza/slownik/' },
          { label: 'FAQ', href: 'wiedza/faq/' },
          { label: 'Mity i fakty', href: 'wiedza/mity-i-fakty/' },
          { label: 'Quiz', href: 'wiedza/quiz/' },
        ],
      },
      {
        label: 'Ludzie',
        href: 'ludzie/',
        children: [
          { label: 'Kobiety w lotnictwie', href: 'ludzie/kobiety-w-lotnictwie/' },
          { label: 'Pionierki', href: 'ludzie/pionierki/' },
        ],
      },
      { label: 'Galeria', href: 'galeria/' },
    ],
  },
  footer: {
    variant: 'nav',
    columns: [
      {
        title: 'Zawód',
        items: [
          { label: 'Zawód pilota', href: 'zawod/' },
          { label: 'Kim jest pilot?', href: 'zawod/kim-jest-pilot/' },
          { label: 'Dzień pracy', href: 'zawod/dzien-pracy/' },
          { label: 'Odpowiedzialność', href: 'zawod/odpowiedzialnosc/' },
          { label: 'Typy pilotów', href: 'zawod/typy-pilotow/' },
          { label: 'Zawód przyszłości', href: 'zawod/zawod-przyszlosci/' },
        ],
      },
      {
        title: 'Kariera',
        items: [
          { label: 'Kariera pilotki', href: 'kariera/' },
          { label: 'Jak zostać pilotką', href: 'kariera/jak-zostac/' },
          { label: 'Szkolenia lotnicze', href: 'kariera/szkolenia/' },
          { label: 'Umiejętności', href: 'kariera/umiejetnosci/' },
          { label: 'Licencje', href: 'kariera/licencje/' },
          { label: 'Checklista kandydata', href: 'kariera/checklista-kandydata/' },
        ],
      },
      {
        title: 'Technologia',
        items: [
          { label: 'Technologia w lotnictwie', href: 'technologia/' },
          { label: 'Kokpit', href: 'technologia/kokpit/' },
          { label: 'Autopilot', href: 'technologia/autopilot/' },
          { label: 'Nawigacja', href: 'technologia/nawigacja/' },
          { label: 'Radar pogodowy', href: 'technologia/radar-pogodowy/' },
          { label: 'Bezpieczeństwo', href: 'technologia/bezpieczenstwo/' },
          { label: 'Jak działa bezpieczeństwo', href: 'technologia/jak-dziala-bezpieczenstwo/' },
        ],
      },
      {
        title: 'Wiedza',
        items: [
          { label: 'Baza wiedzy lotniczej', href: 'wiedza/' },
          { label: 'Ciekawostki', href: 'wiedza/ciekawostki/' },
          { label: 'Słownik pojęć', href: 'wiedza/slownik/' },
          { label: 'FAQ', href: 'wiedza/faq/' },
          { label: 'Mity i fakty', href: 'wiedza/mity-i-fakty/' },
          { label: 'Quiz', href: 'wiedza/quiz/' },
        ],
      },
      {
        title: 'Projekt',
        items: [
          { label: 'O stronie', href: 'o-stronie/' },
          { label: 'Źródła', href: 'zrodla/' },
          { label: 'Galeria', href: 'galeria/' },
        ],
      },
      {
        title: 'Ludzie',
        items: [
          { label: 'Ludzie lotnictwa', href: 'ludzie/' },
          { label: 'Kobiety w lotnictwie', href: 'ludzie/kobiety-w-lotnictwie/' },
          { label: 'Pionierki', href: 'ludzie/pionierki/' },
        ],
      },
    ],
    copyright: '© Własny kurs — Wyżej niż szklany sufit',
    author: 'Nadia Zofia Łuczak, klasa VIII A, SP 83 w Łodzi',
  },
} as const
