# 🍄 gljivobook.app (`gljivobook.app by Zrina v3.3 PRO`)

> **by Zrina • Terenski priručnik & dnevnik**
>
> **Autor i razvoj:** Vedran Zrinski (**Zrina**)  
> **Kontakt za suradnju i prijavu grešaka:** [gljivobook@zrina.app](mailto:gljivobook@zrina.app)  
> **Stručni temelj:** *Enciklopedija gljiva* (Svezak 1 i 2), prof. dr. sc. Romano Božac.

---

## 📖 Sažetak projekta

**gljivobook.app (v3.3 PRO)** je progresivna web-aplikacija (**PWA**) dizajnirana za rad na terenu — uključujući duboke šumske predjele bez mobilnog signala (Medvednica, Žumberak, Zagorje, Gorski kotar, Lika, Istra, Kvarner, Slavonija, Pokuplje, Banovina i Dalmacija). Aplikacija je **100% besplatna i ne zahtijeva nikakav vanjski API ključ**, pa je spremna za javno dijeljenje i trenutni rad izvan mreže.

Spaja klasičnu mikološku taksonomiju i morfološke opise prema standardu prof. dr. sc. Romana Bošca s modernim terenskim alatima:
- **Dvostruki sustav tema (`☀️ / 🌙`):** Tamna šumska tema i svijetla **„Paperlike / Terenski dnevnik”** tema za čitanje na jakom suncu bez odbljeska, uz gumb **`Aa`** (*100% -> 120% -> Visoki kontrast*).
- **Dvostruki Terenski Determinator (`offlineDeterminator.ts` + Opcionalni Google Gemini AI Skener):** Zadani **Lokalni Mikološki Model (Božac Offline Engine)** radi 100% besplatno i izvan mreže bez API ključa uz **Brzi morfološki filtar prije kamere („Obilježja koja vidiš”)** s trenutačnim pregledom suženih vrsta (`👁️ Pregledaj sužene vrste`), dok napredni **Google Gemini AI Dubinski Skener** omogućuje opcionalno povezivanje vlastitog Google računa (AI Studio) ili privremeni unos vlastitog Gemini API ključa samo za tekuću sesiju (bez trajnog spremanja autorskog ključa u aplikaciji) uz ugrađeni **`ℹ️ Kako do besplatnog Gemini API ključa?`** vodič.
- **169 autohtonih vrsta Hrvatske s hrvatskim narodnim imenima (`folkNames`), pametnim razvrstavanjem (`⭐ Favoriti` vs `A–Z`), cjelogodišnjom matricom „Upozorenje tjedna” i mikoriznim filtrom po stablima (`🌲 Ispod stabla`).**
- **Službeni SOS protokol Centra za kontrolu otrovanja pri Institutu za medicinska istraživanja i medicinu rada (IMI) (`+385 1 2348 342` / `112`)** s razlikovanjem sindroma kratke (< 6 h) i duge latencije (6–24 h+).
- **Satelitski i topografski GPS dnevnik nalazišta (`Leaflet`), „Outdoor Field Log” generator kartice ulova (`1080×1350 px`), GPS lokator parkiranog automobila (`🚗 Gdje mi je auto?`), praćenje dnevnog limita berbe (3 kg), dinamička evidencija dozvole Hrvatskih šuma te mikološki kviz sustav (baza 60 pitanja Set A & B, runda od 30 pitanja kroz 5 rangova, 3 terenska jokera, High-Score Lock, „Mala škola mikologije” i Gljivarska iskaznica s QR verifikacijskim pečatom).**

---

## 🧩 Ključni moduli aplikacije (v3.3 PRO)

### 1. 📚 Terenska Enciklopedija (169 autohtonih vrsta Hrvatske) + Cjelogodišnja Upozorenja, Pametno Razvrstavanje & Narodna Imena
- **Cjelogodišnja matrica „Upozorenje tjedna” i jednoredna sigurnosna traka (`EncyclopediaView.tsx`):**
  - Dinamičko sezonsko upozorenje prema tekućem mjesecu (`new Date().getMonth()`) s brzim akcijskim gumbom (`🔍 Pogledaj: Moždanica / Zelena pupavka / Panterova muhara / Štitarke / Rebrasta patuljica`).
  - Jednoredna statusna traka ispod tražilice: **`🌅 Zalazak u HH:MM • {seasonalHazard}`** (proljeće: krpelji, ljeto: poskoci i zabrana vatre, jesen: lovna sezona, zima: zaleđene staze i rani mrak).
- **Pametno razvrstavanje (`⭐ Favoriti (Preporučeno)` vs `A–Z`) i hrvatska narodna imena (`folkNames`):**
  - Zadani način prikaza na vrh stavlja najtraženije jestive gljive aktivne u tekućem mjesecu (*vrganji, sunčanice, lisičice, trubače, rujnice, prosenjaci...*), dok su otrovne pupavke na dnu (osim pri odabiru filtra *Otrovne* ili preklopnika *A–Z*).
  - Svih 169 vrsta sadrži regionalne i dijalektalne hrvatske nazive (*jurček, jesenec, kozarka, kišobran, dedec, turčin, lisička, žiluša, mrtvačka truba, golubača, kravica, presnac, grmača, mraznica, bumbak...*) uključene u tražilicu i prikaz na karticama.
- **Filtar po mikoriznim partnerima i staništu (`🌲 Ispod stabla`):**
  - Redak brzih čipova **`[Sva stabla, Bukva, Hrast, Smreka, Jela, Bor, Breza]`** koji trenutačno filtrira gljive prema staništu i simbiotskim vrstama drveća.
- **Prekidač načina prikaza (`[ ⚡ Brzi pregled ] | [ 🔬 Detaljno ]`) + `🍽️ Priprema & Recepti`, regionalni filtri Hrvatske, kalendar plodonošenja `I – XII` te 1-na-1 usporedba dvojnica (`⚖️ Usporedi 1 na 1`).**

### 2. ☀️/🌙 Svijetla „Paperlike / Terenski dnevnik” Tema i Pristupačnost (`Aa`)
- **Preklopnik teme (`☀️ / 🌙` u zaglavlju):** Omogućuje trenutno prebacivanje između zadane **Tamne šumske teme** (`#0b110e`) i **Svijetle „Paperlike / Terenski dnevnik” teme** (`#f6f4ee` topla papirnata podloga, `#ffffff` kartice, `#151a16` ugljeno-crni tekst) optimizirane za vanjsku upotrebu na suncu bez odbljeska.
- **Višestupanjska pristupačnost (`Aa`):** Tri razine čitljivosti (*Normalno 100% -> Krupno 120% -> Visoki kontrast za jako sunce*).

### 3. 📸 Dvostruki Terenski Determinator: Lokalni Offline Model + Opcionalni Google Gemini AI Skener (`AIScannerView.tsx`, `offlineDeterminator.ts`, `server.ts`)
- **Brzi morfološki filtar prije kamere — „Obilježja koja vidiš” + Pregled suženih vrsta (`👁️ Pregledaj sužene vrste`):**
  1. **Ispod klobuka:** `Listići` / `Cjevčice (spužva)` / `Bodljice` / `Trubasto`
  2. **Raste na:** `Tlu` / `Panju ili deblu`
  3. **Dno stručka:** `Ima vrećicu (volvu)` / `Nema vrećice`
  4. **Meso na prerezu:** `Mijenja boju (plavi, crveni)` / `Ne mijenja` / `Pušta mlijeko`
- **Način A — 🌲 Lokalni Mikološki Model (Zadano • BEZ API KLJUČA):**
  - Radi 100% besplatno i izvan mreže kombinirajući odabrana obilježja, spektralnu analizu boja s fotografija (*1. Klobuk*, *2. Odozdo*, *3. Prerez i baza*) i terenske bilješke sa svih 169 vrsta u bazi uz maksimalnu pouzdanost ograničenu na **90%**.
- **Način B — ✨ Google Gemini AI Dubinski Skener (Opcionalno • VLASTITI KLJUČ / GOOGLE RAČUN):**
  - U aplikaciji **nije trajno spremljen nikakav autorski API ključ**. Posjetitelj može povezati vlastiti Google račun putem AI Studija (`🔗 Poveži Google račun`) ili privremeno unijeti vlastiti besplatni Gemini API ključ isključivo za tekuću sesiju (uz ugrađeni **`ℹ️ Kako do besplatnog Gemini API ključa?`** vodič u 4 koraka).

### 4. 🍽️ Kulinarski Modul i Toksikološke Upute (`MushroomDetailModal.tsx`)
- **Provjereni recepti prilagođeni rodu gljive:** Za svaku jestivu (`SAFE`) i uvjetno jestivu (`WARN`) vrstu generiraju se 3 ciljana kulinarska recepta i upute za konzerviranje.
- **Toksikološki sigurnosni okvir za uvjetno jestive gljive (`WARN`):** Crveni sigurnosni okvir s upozorenjem na termolabilne hemolizine (obavezna termička obrada 15–20 min na >70 °C), upozorenjem na koprinski sindrom uz alkohol te ugrađenim **interaktivnim 20-minutnim timerom termičke obrade**.

### 5. 🌲 Gljivarski Barometar i 5-dnevna Prognoza (`Open-Meteo API`)
- **Gljivarski indeks pogodnosti (`0 – 100%`):** Automatski izračun uvjeta za fruktifikaciju na temelju 10-dnevnih oborina, vlažnosti i temperature tla na 0 cm te 5-dnevnog trenda.

### 6. 🔍 Interaktivni Vizualni Ključ (4 morfološka koraka)
- Sustav eliminacije u 4 koraka na temelju značajki vidljivih golim okom na terenu (*Himenij ispod klobuka*, *Način rasta i supstrat*, *Prsten i ovoj u bazi*, *Mliječni sok na prerezu*).

### 7. 📍 Terenski GPS Dnevnik, „Outdoor Field Log” Share Card (`1080×1350 px`), Lokator Auta, 3 kg Limit & Dozvola Hrvatskih Šuma
- **Fotografije nalaza (`photoData` u `IndexedDB`), GPS Lokator parkiranog automobila (`🚗 Gdje mi je auto?`), praćenje dnevnog limita berbe od 3,00 kg (`3000 g`), interaktivna satelitska/topografska `Leaflet` karta, GPX 1.1 XML izvoz/uvoz, „Outdoor Field Log” Share Card (`1080×1350 px` sa satelitskim mini-radarom) te Dinamička evidencija dozvole Hrvatskih šuma (`ForestPermitSection.tsx`).**

### 8. 🏅 Mikološki Kviz Sustav (60 Pitanja Set A & B, 3 Jokera, High-Score Lock), „Mala škola mikologije” & Gljivarska Iskaznica (`HTML5 Canvas`)
- **Dinamika runde od 30 pitanja kroz 5 progresivnih rangova (`src/services/quizEngine.ts`, `src/data/quizQuestions.ts`):** Iz baze od 60 pitanja motor za svaku rundu nasumično izvlači po 3 pitanja iz Seta A i 3 iz Seta B za svaki rang (*1. Šumski šetač*, *2. Berač pripravnik*, *3. Iskusni gljivar*, *4. Terenski determinator*, *5. Božčev učenik / Master*).
- **3 Terenska Jokera (jednokratno po rundi):** `[ 50:50 (Dva spora) ]`, `[ 🧠 Savjet prof. Bošca ]` i `[ 🧺 Sigurnosna košara (Preskok) ]` (zamjena pitanjem iz istog ranga i seta bez bodovnog penala).
- **High-Score Lock (`gljivobook_quiz_record`):** Trajno zaključavanje najboljeg ostvarenog rezultata i titule u `localStorage` (`Math.max(previousBest, currentScore)`).
- **📖 Mala škola mikologije (Terenska skripta za štrebere):** Cjeloviti edukativni vodič kroz 5 poglavlja (*Anatomija, Ekologija i Bonton, Mikotoksikologija, Kritični parovi dvojnica, Kuhinja i čuvanje*).
- **Službena Gljivarska iskaznica (`800×500 px PNG`):** HTML5 Canvas certifikat s imenom igrača, selfie portretom, titulom (do *Doktora šume — Zlatne iskaznice prof. Bošca*), QR verifikacijskim pečatom i detaljnom analizom svih odgovora.

---

## 🚑 SOS Protokol u slučaju sumnje na trovanje gljivama

- **Hitne službe (0–24 h):** **`112 / 194`**
- **Centar za kontrolu otrovanja pri Institutu za medicinska istraživanja i medicinu rada (IMI)** (*Poison Control Centre at the Institute for Medical Research and Occupational Health (IMI)*): **`+385 1 2348 342`**
- **Vrijeme reakcije (latencija simptoma):**
  - **Simptomi unutar 6 sati:** *Sindrom kratke latencije* — uglavnom probavne smetnje, mučnina, grčevi. Piti tekućinu, javiti se liječniku.
  - **Simptomi nakon 6 do 24 sata (ili više dana):** *Sindrom duge latencije* — **HITNO NA HITNU!** Karakteristično za najopasnije gljive (*zelena pupavka, rebrasta patuljica, koprenke*). Otrov je već prešao u krv i napada jetru i bubrege.
  - **Napomena:** U bolnicu obavezno ponijeti ostatke gljiva ili otpatke od čišćenja iz kante za smeće.

---

## 🚀 Brze upute za pokretanje

```bash
# 1. Instalacija ovisnosti
npm install

# 2. Pokretanje razvojnog poslužitelja (Express + Vite na portu 3000)
npm run dev

# 3. Produkcijski build
npm run build
npm start
```

---

## 🔒 Privatnost, kolačići, atribucija slika i pravni disclaimer

- **100% lokalna privatnost (`IndexedDB`):** Aplikacija **gljivobook.app** ne koristi kolačiće za praćenje niti šalje GPS lokacije na poslužitelj. Svi dnevnici nalaza, pinovi parkiranog automobila i dozvole Hrvatskih šuma spremaju se isključivo lokalno na uređaju korisnika.
- **Creative Commons atribucija fotografija (`CC-BY-SA`):** Ispod glavne fotografije svake vrste u `MushroomDetailModal.tsx` nalazi se diskretna oznaka izvora (`📷 Izvor fotografije: Wikimedia Commons / iNaturalist (CC-BY-SA)`) s izravnom poveznicom na izvorni URL slike.
- **Upozorenje o sigurnosti:** Aplikacija **gljivobook.app** služi isključivo kao pomoćni terenski i edukativni priručnik. Niti jedna fotografija, interaktivni vizualni ključ niti determinator ne mogu jamčiti 100% sigurnost identifikacije niti mogu zamijeniti pregled ubrane gljive uživo od strane stručnog determinatora ili mikologa. Konzumacija samoniklih gljiva je isključivo na vlastitu odgovornost. U slučaju sumnje na trovanje odmah nazovite **Centar za kontrolu otrovanja pri Institutu za medicinska istraživanja i medicinu rada (IMI) / Poison Control Centre at the Institute for Medical Research and Occupational Health (IMI) na broj `+385 1 2348 342`** ili **112**.

---

*gljivobook.app by Zrina v3.3 PRO • Kontakt: gljivobook@zrina.app • Medvednica & Zagorje*
