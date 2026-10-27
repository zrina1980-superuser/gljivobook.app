# 🏗️ Tehnička Arhitektura Sustava — gljivobook.app by Zrina (v3.3 PRO)

> **Projekt:** `gljivobook.app` (`by Zrina • Terenski priručnik & dnevnik`) • **Autor:** Vedran Zrinski (Zrina) • **Kontakt:** [gljivobook@zrina.app](mailto:gljivobook@zrina.app)

Ovaj dokument pruža detaljan uvid u softversku arhitekturu sustava **gljivobook.app (v3.3 PRO)**, podatkovne modele, dvostruki sustav tema (*Tamna šumska* i *Svijetla Paperlike / Terenski dnevnik*), 100% besplatni lokalni mikološki determinator (`offlineDeterminator.ts`) s brzim morfološkim filtrom prije kamere, kaskadni sustav dohvata i predmemoriranja fotografija, meteorološki i astronomski izračun zalaska sunca, sezonske terenske opasnosti (`getSeasonalForestHazard`), cjelogodišnju matricu „Upozorenje tjedna” (`SEASONAL_WARNINGS`), kulinarsko-toksikološki modul, klijentsku pohranu u `IndexedDB`, interaktivnu satelitsku/topografsku kartu (`Leaflet`), GPX XML serijalizator, „Outdoor Field Log” Canvas generator ulova (`1080×1350 px` sa satelitskim mini-radarom), dinamičku validaciju dozvole Hrvatskih šuma te HTML5 Canvas generator iskaznice sa selfie portretom.

---

## 1. Pregled tehnološkog stoga (Tech Stack)

| Sloj | Tehnologija | Uloga u sustavu |
| :--- | :--- | :--- |
| **Frontend UI** | **React 19** + **TypeScript** | Modularno SPA sučelje s funkcionalnim komponentama, navigacijskim stogom (`modalHistory`), kulinarskim modulom i 1-na-1 modalom usporedbe dvojnica. |
| **Sustav tema & Stiliziranje** | **Tailwind CSS v4** (`@tailwindcss/vite`) + **CSS Custom Properties** | Dvostruka tema (`gljivo_theme` u `localStorage`): zadana **Tamna šumska** (`#0b110e` / `#121c16`) i **Svijetla Paperlike / Terenski dnevnik** (`#f6f4ee` / `#ffffff` / `#151a16`) za čitanje na suncu bez odbljeska, uz pristupačnost `Aa` (*Normalno -> Krupno 120% -> Visoki kontrast*). |
| **Build & PWA** | **Vite 6** + **vite-plugin-pwa** (**Workbox**) | Generiranje Service Workera, manifesta i `CacheFirst` / `NetworkFirst` strategija za potpuni offline rad u šumi bez signala. |
| **Lokalni Determinator** | **Božac Offline Engine** (`offlineDeterminator.ts`) + **HTML5 Canvas HSV/RGB** | 100% besplatna klijentska determinacija bez API ključeva: 4 brza morfološka filtra prije kamere + spektralna analiza piksela iz 3 kuta + taksonomsko bodovanje svih 169 vrsta. |
| **Poslužitelj** | **Node.js** + **Express** (`server.ts`) | Poslužitelj na portu `3000` koji poslužuje SPA aplikaciju i `/api/health` statusnu rutu bez ikakvih vanjskih plaćenih ključeva. |
| **Meteorološki API** | **Open-Meteo API** (`weatherService.ts`) | Dohvat 10-dnevnih oborina, vlažnosti i temperature tla na 0 cm, zalaska sunca (`sunset`) te 5-dnevne prognoze za Gljivarski indeks pogodnosti (0–100%). |
| **Kartografija & GIS** | **Leaflet** + **GPX 1.1 XML** + **Nominatim / Open-Meteo DEM** | Satelitska (*ESRI World Imagery*) i topografska (*OpenTopoMap*) šumska karta s `IndexedDB` pinovima, automatskim dohvatom nadmorske visine i naselja te `.gpx` serijalizatorom. |
| **Klijentska baza** | **IndexedDB** (`storageService.ts`) | Asinkrona lokalna pohrana za korisničke fotografije (`photoData`), terenski dnevnik, GPS parking vozila, PDF/sliku dozvole Hrvatskih šuma, certifikat iskaznice i keš slika. |
| **Grafika & Ispit** | **HTML5 Canvas 2D API** | Vektorsko/portretno iscrtavanje **Gljivarske iskaznice** (`800×500 px PNG`) i **„Outdoor Field Log” kartice ulova** (`1080×1350 px` / `4:5` PNG sa satelitskim mini-radarom). |

---

## 2. Struktura direktorija i komponenti

```text
/
├── server.ts                        # Express SPA poslužitelj + /api/health (bez vanjskih API ključeva)
├── vite.config.ts                   # Vite + Tailwind v4 + Workbox PWA runtimeCaching konfiguracija
├── index.html                       # Ulazna HTML točka, OpenGraph oznake i Bio-Cyber PWA ikone
├── README.md                        # Pregled projekta, modula i uputa za pokretanje (v3.3 PRO)
├── ARCHITECTURE.md                  # Tehnička arhitektura sustava (ovaj dokument)
├── CHANGELOG.md                     # Kronološka povijest promjena po verzijama (v1.0 -> v3.3 PRO)
└── src/
    ├── App.tsx                      # Glavna aplikacijska ljuska, preklopnik teme (☀️/🌙), Aa pristupačnost, IMI SOS modal i 1-na-1 usporedba
    ├── main.tsx                     # React 19 root inicijalizacija i registracija Service Workera
    ├── index.css                    # Globalni tokeni, Tamna šumska tema, Svijetla Paperlike tema (html.light) i Leaflet stilovi
    ├── types/
    │   └── mushroom.ts              # Stroge TypeScript definicije (Mushroom, folkNames, SavedFinding, TreeFilterId, CulinaryRecipe...)
    ├── data/
    │   ├── mushrooms.ts             # Paket A (70 temeljnih vrsta) + hrvatska narodna imena (folkNames) i rangiranje favorita
    │   └── mushroomsPaketB.ts       # Paket B (99 vrsta: Russula, Lactarius, Cortinarius, Tricholoma, Suillellus luridus + folkNames)
    ├── services/
    │   ├── offlineDeterminator.ts   # 100% lokalni/offline mikološki determinator + brzi filtar obilježja + Canvas HSV/RGB analiza
    │   ├── imageService.ts          # Kaskadni dohvat slika (Wikipedia -> iNaturalist -> Wikimedia Commons + skipUrl oporavak)
    │   ├── storageService.ts        # Nativni IndexedDB omotač s automatskom migracijom iz localStoragea
    │   └── weatherService.ts        # Open-Meteo integracija, astronomski zalazak sunca, sezonski hazardi i Gljivarski indeks (0-100%)
    ├── hooks/
    │   ├── usePWAInstall.ts         # Detekcija mrežnog statusa (online/offline) i PWA instalacije
    │   └── useSpeechRecognition.ts  # Hrvatski glasovni unos (Web Speech API hr-HR + mobilni fallback)
    └── components/
        ├── ZrinaLogo.tsx            # Vektorski Bio-Cyber hibridni logotip (luk klobuka, micelij/hife + PCB vodovi, godovi/radar i gljivobook.app)
        ├── EncyclopediaView.tsx     # Naslovnica Baze: SEASONAL_WARNINGS matrica, jednoredna statusna traka, filtar po stablima i mreža vrsta
        ├── MushroomDetailModal.tsx  # Modal detalja vrste: CC-BY-SA atribucija izvora slike, Brzi pregled, Detaljno, Kulinarski modul & 20-min timer
        ├── MushroomImage.tsx        # Lazy-loaded komponenta za prikaz slika s IntersectionObserverom, skipUrl fallbackom i okvirom za svijetlu temu
        ├── AIScannerView.tsx        # Brzi morfološki filtar prije kamere („Obilježja koja vidiš”) + analiza iz 3 kuta (kamera / galerija)
        ├── FieldJournalView.tsx     # GPS dnevnik, photoData pohrana, Leaflet karta, Outdoor Field Log Canvas (1080x1350), mini-radar, GPS auto i 3 kg limit
        ├── ForestPermitSection.tsx  # Dinamička šumska dozvola (Hrvatske šume) s validacijom godine i fullscreen prikazom za lugara
        ├── QuizView.tsx             # Rangirani kviz (30 pitanja, 6 rangova, 10 foto-pitanja s preloadom) + HTML5 Canvas iskaznica sa selfiejem
        └── AboutModal.tsx           # Informacije o projektu gljivobook.app (v3.3 PRO), Privatnost/Kolačići/Licence, HŠ dozvola i IMI SOS kontakt (+385 1 2348 342)
```

---

## 3. Lokalni Offline Mikološki Determinator i Brzi Filtar Prije Kamere (`offlineDeterminator.ts` & `AIScannerView.tsx`)

Kako bi aplikacija bila 100% besplatna za javno dijeljenje i radila u dubokoj šumi bez mobilnog signala, determinacija se izvršava u cijelosti lokalno na uređaju korisnika:
1. **Korak prije kamere — Brzi morfološki filtar (`VisibleTraitsFilter`):**
   - Funkcija `evaluateVisibleTraitsMatch(mushroom, visibleTraits)` u stvarnom vremenu filtrira svih 169 vrsta prema 4 ključna terenska pitanja:
     - **Ispod klobuka (`underCap`):** `listici`, `cjevcice` (spužva), `bodljice` (iglice), `trubasto` (letvice/glatko).
     - **Raste na (`growsOn`):** `tlo` ili `panj_deblo`.
     - **Dno stručka (`stemBase`):** `ima_vrecicu` (volva/ovoj) ili `nema_vrecice`.
     - **Meso na prerezu (`fleshCut`):** `mijenja_boju` (plavi, crveni, žuti, crni), `ne_mijenja` ili `pusta_mlijeko`.
2. **Spektralna analiza fotografije (`extractImageColorProfile`):**
   - Središnji dio učitanih fotografija (klobuk, odozdo, prerez) analizira se na `offscreen` HTML5 Canvasu (`96×96 px`), pri čemu se izračunava distribucija HSV/RGB tonova (crveni, narančasto-žuti, smeđi, bijelo-krem, ljubičasto-zeleni i tamni tonovi) bez slanja slika na vanjski poslužitelj.
3. **Višekriterijsko bodovanje i sigurnosni protokol:**
   - Kombinira podudaranje vidljivih obilježja, spektralni profil klobuka, bilješke o staništu/drveću, mirisu i promjeni boje mesa na prerezu te aktivni mjesec u godini, ograničava maksimalnu pouzdanost na **90%** i uvijek ističe opasne dvojnike i provjeru baze stručka.

---

## 4. Dvostruki Sustav Tema: Tamna Šumska & Svijetla „Paperlike / Terenski dnevnik” (`index.css` & `App.tsx`)

- **Preklopnik teme (`☀️ / 🌙`):** Pohranjuje stanje u `localStorage` pod ključem `gljivo_theme` (`'dark'` | `'light'`) i sinkronizira klasu `.light` na `<html>` i `<body>`.
- **Svijetla „Paperlike” arhitektura (`html.light`):**
  - **Pozadine:** Glavna podloga `#f6f4ee` (*Warm Off-White* za čitanje na suncu bez odbljeska), kartice i modali `#ffffff`, unutarnji okviri `#faf8f3`, sekundarni gumbi `#f0ece1`, trake napretka `#e2dcd0` i obrubi `#e2dcd2`.
  - **Tipografija i semantika:** Primarni tekst `#151a16`, sekundarni tekst `#4a544b`, jestive vrste `#166534` (bedž `#dcfce7`), uvjetno jestive `#b45309` (bedž `#fef3c7`), otrovne/SOS `#991b1b` (bedž `#fee2e2`).

---

## 5. Terenska Sigurnosna Upozorenja, Astronomski Zalazak Sunca, Filtar po Stablima i Službeni IMI SOS Protokol

1. **Cjelogodišnja matrica `SEASONAL_WARNINGS` i jednoredna statusna traka (`EncyclopediaView.tsx` & `weatherService.ts`):**
   - Dinamički mijenja „Upozorenje tjedna” i akcijski gumb prema `new Date().getMonth()` (*Moždanica*, *Zelena pupavka*, *Panterova muhara*, *Štitarke*, *Rebrasta patuljica*).
   - Statusna traka ispod tražilice prikazuje `🌅 Zalazak u HH:MM • {seasonalHazard}` (iz Open-Meteo API-ja ili offline astronomskog izračuna `calculateAstronomicalSunset`).
2. **Službeni SOS protokol Centra za kontrolu otrovanja (IMI):**
   - U cijelom sustavu koristi se službeni naziv **Centar za kontrolu otrovanja pri Institutu za medicinska istraživanja i medicinu rada (IMI)** (*Poison Control Centre at the Institute for Medical Research and Occupational Health (IMI)*) i međunarodni broj **`+385 1 2348 342`** uz **`112 / 194`**, te podjela na **sindrom kratke latencije (< 6 h)** i **sindrom duge latencije (6–24 h+ — HITNO NA HITNU!)**.

---

## 6. Interaktivna Karta (`Leaflet`), „Outdoor Field Log” Share Card (`1080×1350 px`), Satelitski Mini-Radar, Lokator Auta i 3 kg Limit (`FieldJournalView.tsx`)

- **„Outdoor Field Log” dijeljenje ulova (`1080×1350 px` / `4:5` PNG):** Dvoslojno kadriranje fotografije bez rezanja (`contain` + `blurred backdrop`), uvjetni prikaz kilaže isključivo za ulove `> 0.5 kg`, automatski dohvat nadmorske visine (GPS / Open-Meteo DEM) i šireg područja/naselja te satelitski mini-radar šireg masiva (*ESRI World Imagery Zoom 11*) bez prikaza GPS koordinata.
- **GPS Lokator vozila (`🚗 Gdje mi je auto?`), `photoData` pohrana u `IndexedDB`, praćenje dnevne kvote od 3 kg (`DAILY_LIMIT_GRAMS = 3000`), Dinamička dozvola Hrvatskih šuma (`ForestPermitSection.tsx`) i Rangirani kviz s Gljivarskom iskaznicom (`QuizView.tsx`).**
