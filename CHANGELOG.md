# 📋 Povijest promjena (Changelog) — gljivobook.app by Zrina

Sve značajne arhitekturne, podatkovne, vizualne i pravne nadogradnje projekta **gljivobook.app** (*by Zrina • Terenski priručnik & dnevnik*, službeni kontakt: [gljivobook@zrina.app](mailto:gljivobook@zrina.app)) dokumentirane su kronološki od prvog prototipa do aktualne produkcijske **v3.3 PRO** PWA verzije.

---

## [v3.3 PRO] — 100% Offline Lokalni Determinator + Brzi Filtar Prije Kamere, Svijetla „Paperlike” Tema (`☀️/🌙`), Službeni IMI SOS Protokol Latencije, Bio-Cyber Identitet & „Outdoor Field Log” Share Card (Aktualna verzija)

### ✨ Nove funkcionalnosti i nadogradnje (v3.3 PRO)
- **Dvostruki Terenski Determinator: 100% Besplatni Lokalni Model + Opcionalni Google Gemini AI Skener bez trajno spremljenog autorskog ključa (`src/services/offlineDeterminator.ts`, `src/components/AIScannerView.tsx`, `server.ts`):**
  - Potpuno uklonjeno korištenje trajnog autorskog `GEMINI_API_KEY` ključa u aplikaciji kako se vlasnički ključ nikada ne bi trošio niti trajno čuvao.
  - **Način 1 — 🌲 Lokalni Mikološki Model (Zadano • BEZ API KLJUČA):** Radi 100% offline u dubokoj šumi bez mobilnog signala spajajući brzi morfološki filtar („Obilježja koja vidiš”), HTML5 Canvas HSV/RGB spektralnu analizu piksela iz 3 fotografije (*1. Klobuk*, *2. Odozdo*, *3. Prerez i baza*), tekstualna zapažanja i sezonalnost sa svih 169 vrsta.
  - **Brzi morfološki filtar prije kamere („Obilježja koja vidiš”) + `👁️ Pregledaj sužene vrste`:** U 4 klika (*Ispod klobuka*, *Raste na*, *Dno stručka*, *Meso na prerezu*) sužava 80% vrsta iz baze i prikazuje listu kandidata s izravnim otvaranjem profila vrste čak i prije fotografiranja.
  - **Način 2 — ✨ Google Gemini AI Dubinski Skener (`gemini-3-flash-preview` putem vlastitog Google računa ili privremenog ključa sesije):** Posjetitelj može povezati vlastiti Google račun (`window.aistudio.openSelectKey()`) ili privremeno zalijepiti vlastiti besplatni Gemini API ključ koji vrijedi isključivo u radnoj memoriji trenutne sesije (nikada se ne sprema u `localStorage`). Dodan je interaktivni gumb **`ℹ️ Kako do besplatnog Gemini API ključa?`** s detaljnim uputama u 4 koraka i izravnom poveznicom na `aistudio.google.com/apikey`.
- **Cjeloviti Mikološki Kviz Sustav (60 pitanja Set A & Set B), 3 Terenska Jokera, High-Score Lock i „Mala škola mikologije” (`src/data/quizQuestions.ts`, `src/services/quizEngine.ts`, `src/components/QuizView.tsx`):**
  - **Baza od 60 pitanja i progresivna dinamika runde (30 pitanja kroz 5 rangova):** Za svaku novu rundu generator (`initQuizRound`) izvlači točno **30 pitanja** s progresivnim rastom težine (iz svakog ranga nasumično bira **3 pitanja iz Seta A** i **3 iz Seta B**, miješa ih unutar ranga te miješa redoslijed odgovora): *Rang 1: Šumski šetač (1–6)*, *Rang 2: Berač pripravnik (7–12)*, *Rang 3: Iskusni gljivar (13–18)*, *Rang 4: Terenski determinator (19–24)* i *Rang 5: Božčev učenik / Master (25–30)*.
  - **Mehanika 3 Terenska Jokera (jednokratno po rundi):** `[ 50:50 (Dva spora) ]` uklanja 2 netočna odgovora, `[ 🧠 Savjet prof. Bošca ]` prikazuje autentični savjet prof. Bošca za trenutno pitanje, a `[ 🧺 Sigurnosna košara (Preskok) ]` preskače pitanje bez gubitka bodova i zamjenjuje ga rezervnim pitanjem iz istog ranga i seta.
  - **Trajno čuvanje rekorda (`High-Score Lock` u `localStorage` pod `gljivobook_quiz_record`):** Povijesno najbolji rezultat (`Math.max(previousBest, currentScore)`), osvojeni rang, titula i Gljivarska iskaznica trajno su zaštićeni od degradacije pri ponovnom igranju.
  - **Edukativni vodič „📖 Mala škola mikologije (Terenska skripta za štrebere)”:** Cjelovita teorijska priprema kroz 5 poglavlja (*1. Anatomija*, *2. Ekologija & Bonton*, *3. Mikotoksikologija*, *4. Kritični parovi dvojnica*, *5. Kuhinja & Čuvanje*) uz podršku za tamnu i svijetlu (Paperlike) temu.
  - **Generator službene Gljivarske iskaznice s QR verifikacijskim pečatom (`HTML5 Canvas 800×500 px`):** Prikazuje osobni rekord, analizu svih točnih/netočnih odgovora s objašnjenjima te generira službenu iskaznicu sa službenim PNG logotipom, selfie portretom, titulom (od *Šumskog šetača* do *Doktora šume — Zlatne iskaznice prof. Bošca*) i determinističkim QR verifikacijskim pečatom.
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
- **Službeni neonski PNG logotip „gljivobook.app by Zrina” za cijelu aplikaciju i PWA instalaciju (`public/logo.png`, `public/pwa-512x512.png`, `public/pwa-maskable-512x512.png`, `public/pwa-192x192.png`, `public/apple-touch-icon.png`, `public/favicon.png`, `public/favicon.ico`, `src/components/ZrinaLogo.tsx`, `index.html`, `vite.config.ts`):**
  - Uklonjene sve generirane SVG ikone (`icon.svg` i vektorski nacrti) te je u zaglavlju, modalu O aplikaciji, Canvas generatorima i PWA manifestu za instaliranu aplikaciju postavljen isključivo službeni neonski PNG logotip **`gljivobook.app by Zrina`** u svim standardnim rezolucijama (`1254×1254`, `512×512`, `512×512 maskable`, `192×192`, `180×180`, `64×64` i `favicon.ico`).
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
