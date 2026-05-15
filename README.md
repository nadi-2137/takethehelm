# Własny kurs — Wyżej niż szklany sufit

Strona konkursowa o zawodzie pilotki i lotnictwie, przygotowana jako projekt edukacyjny.

## Repozytorium i strona

- Repozytorium: https://github.com/nadi-2137/takethehelm
- Strona: https://nadia.luczak.org/takethehelm/

## Autor

- Nadia Zofia Łuczak
- Klasa VIII A, SP 83 w Łodzi

## Cel projektu

Strona tłumaczy:
- na czym polega praca pilotki,
- jak wygląda ścieżka edukacji i kariery,
- jak działa nowoczesna technologia lotnicza,
- dlaczego kobiety w lotnictwie są ważną częścią historii i teraźniejszości branży.

## Stack technologiczny

- Astro 5
- Tailwind CSS v4
- TypeScript
- Node.js 20+
- pnpm

## Wymagania lokalne

Przed startem zainstaluj:
- Node.js (rekomendowane LTS, minimum 20)
- pnpm (`npm i -g pnpm`)
- Git

Rekomendowane środowisko:
- Visual Studio Code
- rozszerzenia: Astro, Prettier, ESLint, Code Spell Checker

## Szybki start

1. Sklonuj repozytorium.
2. Zainstaluj zależności.
3. Uruchom serwer developerski.

```bash
pnpm install
pnpm dev
```

Domyślnie dev działa pod `/`.

## Najważniejsze skrypty

```bash
pnpm dev              # lokalny dev pod /
pnpm dev:subpath      # lokalny dev pod /takethehelm/
pnpm build            # build produkcyjny pod /takethehelm/
pnpm preview          # podgląd builda lokalnie
pnpm format           # formatowanie całego repo
pnpm format:astro     # formatowanie tylko plików .astro
pnpm spell            # sprawdzenie słownikowe cspell
pnpm og:generate      # generowanie grafik OG
```

## Jak wprowadzać poprawki (workflow)

1. Uruchom `pnpm dev`.
2. Wprowadzaj zmiany w `src/pages`, `src/components`, `src/lib`, `src/styles`.
3. Przed commitem uruchom:

```bash
pnpm format
pnpm spell
pnpm build
```

4. Sprawdź ręcznie najważniejsze strony i nawigację.

## Struktura projektu

- `src/pages/**` - strony i routing Astro
- `src/components/blocks/**` - sekcje i komponenty UI
- `src/layouts/BaseLayout.astro` - główny layout
- `src/lib/navigation.ts` - treści i konfiguracja nawigacji
- `src/lib/images/**` - mapowanie assetów graficznych
- `src/styles/global.css` - style globalne
- `public/` - pliki statyczne (favicony, OG)
- `tools/` - skrypty pomocnicze (screenshots, OG)

## Siteshoots i audyt jakości

Projekt ma zautomatyzowany mechanizm screenshotów i audytu stron.

Podstawowe komendy:

```bash
pnpm siteshoots
pnpm siteshoots:audit
```

Po audycie powstają:
- `audit-results.json`
- `siteshoots-audit-latest.md`

Pełna dokumentacja działania jest w:
- `docs/siteshoots.md`

## Build i publikacja

Build jest przygotowany pod ścieżkę bazową:
- `/takethehelm/`

Dlatego do testu publikacji używaj:

```bash
pnpm build
pnpm preview
```

i sprawdzaj, czy wszystkie ścieżki oraz assety działają poprawnie pod prefiksem `/takethehelm/`.

## Status

To finalna wersja strony konkursowej.
