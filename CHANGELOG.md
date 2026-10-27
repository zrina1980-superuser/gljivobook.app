# 📋 Povijest promjena (Changelog) — gljivobook.app by Zrina

Sve značajne arhitekturne, podatkovne, vizualne i pravne nadogradnje projekta **gljivobook.app** (*by Zrina • Terenski priručnik & dnevnik*, službeni kontakt: [gljivobook@zrina.app](mailto:gljivobook@zrina.app)) dokumentirane su kronološki od prvog prototipa do aktualne produkcijske **v3.3 PRO** PWA verzije.

---

## [v3.3 PRO] — 100% Offline Lokalni Determinator + Brzi Filtar Prije Kamere, Svijetla „Paperlike” Tema (`☀️/🌙`), Službeni IMI SOS Protokol Latencije, Bio-Cyber Identitet & „Outdoor Field Log” Share Card (Aktualna verzija)

### ✨ Nove funkcionalnosti i nadogradnje (v3.3 PRO)
- **100% Besplatni & Offline Lokalni Mikološki Determinator bez API ključa (`src/services/offlineDeterminator.ts`, `src/components/AIScannerView.tsx`, `server.ts`):**
  - Potpuno uklonjena ovisnost o privatnom `GEMINI_API_KEY` ključu kako bi se aplikacija mogla slobodno dijeliti svim gljivarima bez troškova i bez izlaganja ključeva, te kako bi determinator radio **100% offline u dubokoj šumi bez mobilnog signala**.
  - **Brzi morfološki filtar prije kamere („Obilježja koja vidiš”):** U koraku prije analize slike ugrađene su 4 brze skupine gumba koje odmah u stvarnom vremenu sužavaju 80% vrsta iz baze:
    1. *Ispod klobuka:* `Listići` / `Cjevčice (spužva)` / `Bodljice` / `Trubasto`
    2. *Raste na:* `Tlu` / `Panju ili deblu`
    3. *Dno stručka:* `Ima vrećicu (volvu)` / `Nema vrećice`
    4. *Meso na prerezu:* `Mijenja boju (plavi, crveni)` / `Ne mijenja` / `Pušta mlijeko`
  - **Hibridna lokalna analiza (`runLocalMycologicalDetermination`):** Spaja odabrana terenska obilježja, HTML5 Canvas HSV/RGB spektralnu analizu piksela iz do 3 fotografije (*1. Klobuk*, *2. Odozdo*, *3. Prerez i baza*), tekstualna zapažanja (stanište, miris, promjena boje mesa) i sezonalnost sa svih 169 autohtonih vrsta iz ključa prof. dr. sc. Romana Bošca (uz sigurnosno ograničenje pouzdanosti na maks. 90%).
- **Dvostruki sustav tema: Tamna šumska & Svijetla „Paperlike / Terenski dnevnik” tema (`src/index.css`, `src/App.tsx`):**
  - U zaglavlje aplikacije (lijevo od gumba `Aa`) dodan je preklopnik teme **`☀️ / 🌙`** koji sprema odabir u `localStorage` (`gljivo_theme`) i preklapa klasu `.light` na `<html>` i `<body>`.
  - **Svijetla „Paperlike” paleta za čitanje na jakom suncu bez odbljeska:** Topla papirnata podloga (`#f6f4ee`), mat bijele kartice (`#ffffff`), pergamentni unutarnji okviri (`#faf8f3`), topli kameni gumbi i trake napretka (`#f0ece1` / `#e2dcd0`), obrubi boje suhog lista (`#e2dcd2`) te ugljeno-crna tipografija (`#151a16`) i tamno-sivi sekundarni tekst (`#4a544b`).
  - **Semantičke mikološke boje u svijetloj temi:** Jestivo (`#166534` na `#dcfce7`), Uvjetno jestivo / Meteo (`#b45309` na `#fef3c7`), Otrovno / Smrtonosno / SOS (`#991b1b` na `#fee2e2`), uz uokvirene fotografije (`#f0ece1` + `1px solid #e2dcd2`) i potpuno usklađen prikaz u Dnevniku, dozvoli Hrvatskih šuma, Kvizu i Info modalu.
- **Službeni naziv Centra za kontrolu otrovanja (IMI) i klinički SOS protokol latencije (`src/App.tsx`, `src/components/AboutModal.tsx`, `README.md`):**
  - U svim hrvatskim sučeljima, karticama i modalima naziv ustanove glasi **Centar za kontrolu otrovanja pri Institutu za medicinska istraživanja i medicinu rada (IMI)**, a na engleskom **Poison Control Centre at the Institute for Medical Research and Occupational Health (IMI)** uz međunarodni telefonski format **`+385 1 2348 342`** i hitnu službu **`112 / 194`**.
  - U SOS modal ugrađen je protokol razlikovanja trovanja prema vremenu reakcije:
    - **Simptomi unutar 6 sati (Sindrom kratke latencije):** Uglavnom probavne smetnje, mučnina, grčevi — piti tekućinu i javiti se liječniku.
    - **Simptomi nakon 6 do 24 sata ili više dana (Sindrom duge latencije — HITNO NA HITNU!):** Karakteristično za najopasnije gljive (*zelena pupavka, rebrasta patuljica, koprenke*) kod kojih je otrov već prešao u krv i napada jetru i bubrege.
    - **Napomena za bolnicu:** Obavezno ponijeti ostatke gljiva ili otpatke od čišćenja iz kante za smeće.
- **Pravna čistoća, atribucija fotografija i privatnost (`src/components/MushroomDetailModal.tsx`, `src/components/MushroomImage.tsx`, `src/components/AboutModal.tsx`):**
  - Ispod glavne fotografije svake vrste u `MushroomDetailModal.tsx` dodana je diskretna oznaka izvora: **`📷 Izvor fotografije: Wikimedia Commons / iNaturalist (CC-BY-SA)`** s klikabilnom poveznicom na izvorni URL slike.
  - U `AboutModal.tsx` dodana je sekcija **`🔒 Privatnost, kolačići i licence`** koja potvrđuje da aplikacija ne koristi kolačiće za praćenje niti šalje GPS lokacije na poslužitelj (svi dnevnici, pinovi automobila i dozvole spremaju se isključivo lokalno u `IndexedDB` na uređaju korisnika) te navodi Creative Commons atribuciju javnih API baza slika (*Wikipedia, Wikimedia Commons, iNaturalist*) i stručni temelj (*prof. dr. sc. Romano Božac*).
- **Vizualni i brending redizajn u „gljivobook.app” te Bio-Cyber hibridni logotip (`public/icon.svg`, `src/components/ZrinaLogo.tsx`, `index.html`, `vite.config.ts`, `src/App.tsx`, `src/components/AboutModal.tsx`):**
  - Ugrađen vektorski Bio-Cyber hibridni logotip (50% micelij/šuma + 50% digitalna tehnologija) u `ZrinaLogo.tsx`, `public/icon.svg` i sve PWA ikone: duboka tamna šuma (`#040d09`), klorofil smaragd (`#10b981`), neonski cijan (`#00f5ff`) i topla boja spora/zlata (`#f59e0b`).
  - Ažurirani naziv aplikacije u **`gljivobook.app`** uz podnaslov **`by Zrina • Terenski priručnik & dnevnik`**, zaglavlje s gumbima **`"☀️/🌙"`**, **`"Aa"`** (100% -> 120% -> Visoki kontrast) i **`"ℹ️"`**, te službena kontakt adresa **`gljivobook@zrina.app`**.
- **Cjelogodišnja dinamička matrica za „⚠️ Upozorenje tjedna” (`SEASONAL_WARNINGS`) i jednoredna statusna traka (`🌅 Zalazak u {dynamicSunsetTime} • {seasonalHazard}` u `src/components/EncyclopediaView.tsx` i `src/services/weatherService.ts`).**
- **Pametno razvrstavanje (`⭐ Favoriti (Preporučeno)` vs `A–Z`) i potpuna baza hrvatskih narodnih imena (`folkNames` za svih 169 vrsta u `src/data/mushrooms.ts`, `src/data/mushroomsPaketB.ts`, `src/App.tsx`).**
- **Redizajn „Outdoor Field Log” Share Carda (`1080×1350 px` / `4:5` u `src/components/FieldJournalView.tsx`):**
  - Portretni format `1080×1350 px` (`4:5`) na dubokoj tamnozelenoj podlozi (`#0b120e`), kadriranje cijele fotografije bez rezanja (`contain` + `blurred backdrop`), uvjetni prikaz mase ulova isključivo ako je `> 0.5 kg`, satelitski mini-radar šireg šumskog masiva (`Zoom 11` bez koordinata) i potpis `Gljivobook Pro • Terenski dnevnik`.
- **Dodavanje fotografije nalaza u Dnevnik (`photoData` u `IndexedDB`), Kulinarski modul s 20-minutnim timerom termičke obrade, GPS Lokator parkiranog automobila (`🚗 Gdje mi je auto?`) i 3 kg dnevni limit berbe.**

---

## [v3.1.0] — Prošireni Certifikacijski Ispit (30 Pitanja + Foto-pitanja), Selfie ID Iskaznica & Dinamička Šumska Dozvola HŠ

### ✨ Nove funkcionalnosti i nadogradnje (v3.1.0)
- **Prošireni i otežani Rangirani kviz znanja (30 pitanja, 5 po svakom rangu u `src/components/QuizView.tsx`):**
  - Ispit proširen na **30 pitanja** (5 po rangu od *I. Početnika* do *VI. Determinatora*), uklonjen "najduži odgovor" bias, dodane stvarne mikološke zamke, 10 vizualnih foto-pitanja (`MushroomImage`) i dinamičko miješanje odgovora (`Fisher-Yates shuffle`).
- **Redizajn Gljivarske iskaznice s podrškom za selfie portret (`src/components/QuizView.tsx`):**
  - Opcija **`📸 Uslikaj selfie za iskaznicu`** i crtanje ID portreta (`120×150 px`, omjer `3:4`) sa smaragdnim obrubom i šaljivim potpisom u podnožju.
- **Dinamička šumska dozvola — Hrvatske šume (`src/components/ForestPermitSection.tsx` u Info modalu i Dnevniku):**
  - Unos broja dozvole, pohrana PDF/slike u `IndexedDB`, dinamička validacija godine (`new Date().getFullYear()`) i fullscreen prikaz za šumara.

---

## [v3.0.0] — Rangirani Kviz (6 stupnjeva), Digitalna Gljivarska Iskaznica, Interaktivna Satelitska/Topo Karta, GPX XML Izvoz & Gljivarski Barometar

### ✨ Nove funkcionalnosti (v3.0.0)
- **Rangirani kviz znanja u 6 stupnjeva napredovanja i Digitalna Gljivarska Iskaznica (`HTML5 Canvas 800×500 px`).**
- **Interaktivna šumska satelitska i topografska karta (`Leaflet` u `src/components/FieldJournalView.tsx`).**
- **GPX 1.1 XML izvoz i uvoz za GPS navigacije (`src/components/FieldJournalView.tsx`)** i Haversine kompas azimuta.
- **Gljivarski barometar / prognoza putem Open-Meteo API-ja (`src/services/weatherService.ts`)** i **Dinamika sezone (`🗓️ Aktivno ovaj mjesec` + Kalendar `I – XII`)**.
- **UI/UX optimizacija naslovnice, 50/50 prekidač načina prikaza, navigacijski stog (`modalHistory`) i 1-na-1 usporedba dvojnica (`⚖️ Usporedi 1 na 1`).**

---

## [v2.4.0] — Regionalna Hrvatska, Sigurnosni Bedževi & Vanjske Mikološke Baze

- **Regionalno filtriranje Hrvatske (`RegionId`)**, **proširenje baze na 162 vrste**, **oznaka visokog rizika zamjene (`hasLethalLookalike`)** i **sigurnosni protokol determinatora**.

---

## [v2.2.0] — Rebranding u Gljivobook, PWA Offline Optimizacija & IndexedDB Migracija

- **Rebranding u „Gljivobook by Zrina”**, **First-Launch Guard**, **migracija na `IndexedDB`** i **Workbox offline keširanje slika**.

---

## [v2.0.0] — Paket B (158 vrsta), Kritične vrste Medvednice & Terenska galerija (4 kuta)

- **Paket B (+80 vrsta iz Enciklopedije gljiva Romana Bošca)** i **Terenska galerija iz 4 kuta + Lightbox**.

---

## [v1.5.0] — Satelitski GPS Terenski Dnevnik & Multimodalni Skener

- **Terenski dnevnik s geolokacijom (`FieldJournalView.tsx`)** i **Determinator iz 3 kuta (`AIScannerView.tsx`)**.

---

## [v1.0.0] — Inicijalni prototip i temeljnih 70 vrsta (Paket A)

- Prva verzija aplikacije sa 70 najvažnijih vrsta gljiva Hrvatske prema *Enciklopediji gljiva* (Svezak 1 i 2) prof. dr. sc. Romana Bošca.
