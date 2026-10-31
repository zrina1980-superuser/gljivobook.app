# 🏗️ Tehnička Arhitektura Sustava — gljivobook.app by Zrina (v3.3 PRO)

> **Projekt:** `gljivobook.app` (`by Zrina • Terenski priručnik & dnevnik`) • **Autor:** Vedran Zrinski (Zrina) • **Kontakt:** [gljivobook@zrina.app](mailto:gljivobook@zrina.app)

Ovaj dokument pruža detaljan uvid u softversku arhitekturu sustava **gljivobook.app (v3.3 PRO)**, podatkovne modele, dvostruki sustav tema (*Tamna šumska* i *Svijetla Paperlike / Terenski dnevnik*), 100% besplatni lokalni mikološki determinator (`offlineDeterminator.ts`) s brzim morfološkim filtrom prije kamere, mikološki kviz motor s bazom od 60 pitanja (`quizEngine.ts`, `quizQuestions.ts`), 3 terenska jokera, High-Score Lock zaštitom (`gljivobook_quiz_record`) i „Malom školom mikologije (Terenskom skriptom)”, kaskadni sustav dohvata fotografija, astronomski izračun zalaska sunca, klijentsku pohranu u `IndexedDB`, interaktivnu satelitsku/topografsku kartu (`Leaflet`), GPX XML serijalizator, „Outdoor Field Log” Canvas generator ulova (`1080×1350 px`), dinamičku validaciju dozvole Hrvatskih šuma te HTML5 Canvas generator Gljivarske iskaznice s QR verifikacijskim pečatom.

---

## 1. Pregled tehnološkog stoga (Tech Stack)

| Sloj | Tehnologija | Uloga u sustavu |
| :--- | :--- | :--- |
| **Frontend UI** | **React 19** + **TypeScript** | Modularno SPA sučelje s funkcionalnim komponentama, navigacijskim stogom (`modalHistory`), kulinarskim modulom, „Malom školom mikologije” i 1-na-1 modalom usporedbe dvojnica. |
| **Sustav tema & Stiliziranje** | **Tailwind CSS v4** (`@tailwindcss/vite`) + **CSS Custom Properties** | Dvostruka tema (`gljivo_theme` u `localStorage`): zadana **Tamna šumska** (`#0b110e` / `#121c16`) i **Svijetla Paperlike / Terenski dnevnik** (`#f6f4ee` / `#ffffff` / `#151a16`) za čitanje na suncu bez odbljeska, uz pristupačnost `Aa` (*Normalno -> Krupno 120% -> Visoki kontrast*). |
| **Build & PWA** | **Vite 6** + **vite-plugin-pwa** (**Workbox**) | Generiranje Service Workera, manifesta i `CacheFirst` / `NetworkFirst` strategija za potpuni offline rad u šumi bez signala. |
| **Lokalni Determinator** | **Božac Offline Engine** (`offlineDeterminator.ts`) + **HTML5 Canvas HSV/RGB** | 100% besplatna klijentska determinacija bez API ključeva: 4 brza morfološka filtra prije kamere + spektralna analiza piksela iz 3 kuta + taksonomsko bodovanje svih 169 vrsta. |
| **Kviz Motor & Skripta** | **Quiz Engine** (`quizEngine.ts`, `quizQuestions.ts`) + **High-Score Lock** | Baza od 60 pitanja (5 rangova × Set A & Set B), progresivni generator runde od 30 pitanja (3A + 3B po rangu), 3 terenska jokera (`50:50`, `Savjet prof. Bošca`, `Sigurnosna košara`), trajno zaključavanje rekorda (`gljivobook_quiz_record`) i 5-poglavna *Terenska skripta za štrebere*. |
| **Poslužitelj** | **Node.js** + **Express** (`server.ts`) | Poslužitelj na portu `3000` koji poslužuje SPA aplikaciju i `/api/health` statusnu rutu bez ikakvih vanjskih plaćenih ključeva. |
| **Meteorološki API** | **Open-Meteo API** (`weatherService.ts`) | Dohvat 10-dnevnih oborina, vlažnosti i temperature tla na 0 cm, zalaska sunca (`sunset`) te 5-dnevne prognoze za Gljivarski indeks pogodnosti (0–100%). |
| **Kartografija & GIS** | **Leaflet** + **GPX 1.1 XML** + **Nominatim / Open-Meteo DEM** | Satelitska (*ESRI World Imagery*) i topografska (*OpenTopoMap*) šumska karta s `IndexedDB` pinovima, automatskim dohvatom nadmorske visine i naselja te `.gpx` serijalizatorom. |
| **Klijentska baza** | **IndexedDB** (`storageService.ts`) + **localStorage** | Asinkrona lokalna pohrana za korisničke fotografije (`photoData`), terenski dnevnik, GPS parking vozila, PDF/sliku dozvole Hrvatskih šuma, selfie portret iskaznice, keš slika i zaključani rekord kviza (`gljivobook_quiz_record`). |
| **Grafika & Certifikat** | **HTML5 Canvas 2D API** | Vektorsko/portretno iscrtavanje **Gljivarske iskaznice s QR verifikacijskim pečatom** (`800×500 px PNG`) i **„Outdoor Field Log” kartice ulova** (`1080×1350 px` / `4:5` PNG sa satelitskim mini-radarom). |

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
    │   ├── mushroomsPaketB.ts       # Paket B (99 vrsta: Russula, Lactarius, Cortinarius, Tricholoma, Suillellus luridus + folkNames)
    │   └── quizQuestions.ts         # Baza od 60 pitanja (q01-q60, Rangovi 1-5, Set A & Set B) + 5 poglavlja „Terenske skripte za štrebere”
    ├── services/
    │   ├── offlineDeterminator.ts   # 100% lokalni/offline mikološki determinator + brzi filtar obilježja + Canvas HSV/RGB analiza
    │   ├── quizEngine.ts            # Generator runde (30 pitanja = 5×[3A+3B]), 3 Jokera (50:50, Božac savjet, Preskok) i High-Score Lock
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
        ├── QuizView.tsx             # Mikološki kviz (30 pitanja kroz 5 rangova, 3 jokera, Mala škola mikologije, High-Score Lock i QR iskaznica)
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
- **GPS Lokator vozila (`🚗 Gdje mi je auto?`), `photoData` pohrana u `IndexedDB`, praćenje dnevne kvote od 3 kg (`DAILY_LIMIT_GRAMS = 3000`) i Dinamička dozvola Hrvatskih šuma (`ForestPermitSection.tsx`).**

---

## 7. Arhitektura Mikološkog Kviza (60 Pitanja Set A & B), 3 Terenska Jokera, High-Score Lock i „Mala Škola Mikologije” (`quizQuestions.ts`, `quizEngine.ts`, `QuizView.tsx`)

1. **Baza pitanja (`ALL_QUESTIONS_JSON`) i progresivni generator runde (`initQuizRound`):**
   - Baza sadrži točno **60 stručnih pitanja** (`q01`–`q60`) raspoređenih u 5 rangova težine po 12 pitanja (6 u Setu A i 6 u Setu B).
   - Pri pokretanju svake nove runde, `initQuizRound` za svaki rang (`1` do `5`) nasumično odabire **3 pitanja iz Seta A** i **3 pitanja iz Seta B**, miješa tih 6 pitanja unutar ranga te Fisher-Yates algoritmom miješa ponuđene odgovore (`shuffleSingleQuestionOptions`), osiguravajući strog rast težine od Ranga 1 (*Šumski šetač*) do Ranga 5 (*Božčev učenik / Master*).
2. **Mehanika 3 Terenska Jokera (jednokratno po rundi):**
   - `applyFiftyFifty(state)` — **`50:50 (Dva spora)`**: Nasumično izbacuje 2 netočna odgovora na trenutnom pitanju.
   - `applyBozacAdvice(state)` — **`🧠 Savjet prof. Bošca`**: Otključava `bozacHint` za trenutno pitanje.
   - `applySkipQuestion(state, pool)` — **`🧺 Sigurnosna košara (Preskok)`**: Preskače trenutno pitanje bez bodovnog penala i zamjenjuje ga neiskorištenim rezervnim pitanjem iz **istog ranga i istog seta (`A` ili `B`)**.
3. **Trajno zaključavanje rekorda (`High-Score Lock` u `localStorage` pod `gljivobook_quiz_record`):**
   - Funkcija `lockQuizResult(finalScore, total, holderName)` uspoređuje ostvareni rezultat s prethodnim rekordom (`Math.max(previousBest, finalScore)`). Niži rezultat nikada ne prepisuje niti degradira povijesno najbolji rezultat, osvojeni stupanj (`1`–`6`), titulu niti Gljivarsku iskaznicu.
4. **Edukativni modul „Mala škola mikologije (Terenska skripta za štrebere)” (`FIELD_SCRIPT_CHAPTERS`):**
   - Strukturiran u 5 poglavlja (*1. Morfologija i anatomija*, *2. Ekologija, staništa i zakonski propisi*, *3. Mikotoksikologija i hitni postupci*, *4. Kritični parovi dvojnica 1-na-1*, *5. Kulinarska pravila, termolabilnost i čuvanje*) s podrškom za obje teme.
5. **HTML5 Canvas Generator službene Gljivarske iskaznice (`800×500 px PNG`) i QR verifikacijski pečat:**
   - Crtanje na `<canvas>` elementu uključuje selfie portret (`120×150 px`) iz `IndexedDB`, serijski broj, datum, titulu prema bodovnom razredu (do *Doktora šume — Zlatne iskaznice prof. Bošca* za 29–30 bodova) te deterministički 13×13 **QR verifikacijski pečat** (`buildVerificationQrMatrix`), uz kompletan pregled točnih i netočnih odgovora s objašnjenjima ispod iskaznice.
