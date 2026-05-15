# Siteshoots - dokumentacja zbiorcza

Ten plik jest jedynym źródłem prawdy dla mechanizmu screenshotów i audytu stron.

## Cel

Mechanizm `siteshoots` służy do:
- generowania screenshotów wszystkich stron z sitemapy,
- weryfikacji responsywności na zdefiniowanych viewportach,
- wykrywania podstawowych problemów jakościowych (HTTP, JS, obrazy, overflow, brak H1).

## Skrypty (package.json)

- `pnpm screenshots:run`
  - uruchamia Playwrightowy generator screenshotów.
- `pnpm screenshots`
  - robi `build`, uruchamia `preview`, czeka aż strona wstanie i generuje screenshoty.
- `pnpm screenshots:audit`
  - odpala automatyczny audyt po sitemapie i zapisuje wynik.
- `pnpm siteshoots`
  - uruchamia pełny pipeline screenshotów w devcontainerze.
- `pnpm siteshoots:audit`
  - uruchamia screenshoty + audyt w devcontainerze.

## Jak to działa

### 1) Źródło URL-i

Skrypty pobierają listę stron z sitemapy (`dist/sitemap.xml`, `dist/sitemap-index.xml` lub `dist/sitemap-0.xml`).

### 2) Viewporty

Każda strona jest renderowana na zestawie viewportów z pliku `tools/screenshots/viewports.mjs`.

### 3) Screenshoty

Generator zapisuje pliki PNG do katalogu `screenshots/<viewport>/<route>/index.png`.

### 4) Audyt

Audyt sprawdza m.in.:
- status HTTP,
- błędy JS w konsoli,
- niedoładowane obrazy,
- poziomy overflow (`scrollWidth > innerWidth`),
- obecność `h1`.

Wyniki trafiają do:
- `audit-results.json` (JSON),
- `siteshoots-audit-latest.md` (raport markdown).

## Standardowa procedura lokalna

1. `pnpm install`
2. `pnpm siteshoots`
3. `pnpm siteshoots:audit`
4. Przejrzyj:
   - katalog `screenshots/`,
   - `audit-results.json`,
   - `siteshoots-audit-latest.md`.

## Uruchomienie z filtrem stron

Dla `siteshoots` można ograniczyć zakres przez `--only`:

```bash
pnpm siteshoots -- --only=/galeria --only=/zawod/typy-pilotow
```

Wspierane są też wildcardy typu `/*` (logika w `screenshot-pages.mjs`).

## Najważniejsze zmienne środowiskowe

- `SCREENSHOT_BASE_URL` - bazowy adres dla renderu (`preview` / środowisko docelowe).
- `SCREENSHOT_ONLY` - lista tras rozdzielona przecinkami do zawężenia zakresu.
- `SCREENSHOT_CLEAN=1` - czyści katalog wyjściowy przed generowaniem.
- `SCREENSHOT_WAIT_MS` - dodatkowe opóźnienie przed screenshotem.
- `SCREENSHOT_NAV_TIMEOUT_MS` - timeout na nawigację.
- `SCREENSHOT_HIDE_CONTEST_NOTICE=1` - ukrywa notice w screenshotach/audycie.
- `SITEMAP_PATH` - ręczne wskazanie pliku sitemapy.
- `SITESHOOTS_AUDIT_OUT` - ścieżka wyjścia JSON audytu.
- `SITESHOOTS_AUDIT_DOC` - ścieżka wyjścia markdown audytu.

## Co uznajemy za "gotowe"

- brak błędów wykonania `pnpm siteshoots` i `pnpm siteshoots:audit`,
- screenshoty dla wszystkich stron i viewportów,
- brak krytycznych problemów w raporcie:
  - `high` dla `images`, `network`, `responsive`, `http`.

## Typowe problemy i szybkie diagnozy

- Brak screenshotów:
  - sprawdź `pnpm build` i obecność `dist/sitemap*.xml`.
- Brak części stron:
  - sprawdź sitemapę i ewentualny `SCREENSHOT_ONLY`.
- Przypadkowe różnice layoutu:
  - podnieś `SCREENSHOT_WAIT_MS`.
- Fałszywe problemy przez banery/notice:
  - upewnij się, że aktywne jest `SCREENSHOT_HIDE_CONTEST_NOTICE=1`.

## Uwaga dot. repo

- Katalog `/screenshots` (root) jest ignorowany przez git.
- Katalog `tools/screenshots` nie jest ignorowany i pozostaje wersjonowany.
