import { Mushroom, RawMushroom, RegionId } from '../types/mushroom';
import { PAKET_B_MUSHROOMS } from './mushroomsPaketB';

const PAKET_A_MUSHROOMS: RawMushroom[] = [
  // 1. ZELENA PUPAVKA
  {
    id: "zelena-pupavka",
    name: "Zelena pupavka",
    latin: "Amanita phalloides (Vaill. ex Fr.) Secr.",
    synonyms: "Agaricus phalloides",
    folkNames: ["gomoljača", "zelena gomoljača", "smrtna pupavka", "bijela gomoljača", "otrovnica", "kačja gljiva"],
    wikiQuery: "Amanita_phalloides",
    bozacRef: "Svezak 1, br. 1, str. 50",
    status: "DANGER",
    statusLabel: "🔴 SMRTNO OTROVNA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "vjencic_ovoj",
    shortSummary: "Najopasnija gljiva naših šuma! Klobuk maslinastozelen s uraslim tamnijim radijalnim vlaknima, listići zauvijek bijeli, vjenčić visi, a na dnu stručka je slobodna bijela vrećica (ovoj).",
    simpleBullets: [
      "Klobuk maslinastozelen, žutozelen ili sivozelen, svilenkast i bez krpica.",
      "Listići su UVIJEK čisto bijeli (nikad ne postanu ružičasti ili smeđi!).",
      "Dno stručka ima gomolj obavijen slobodnim bijelim vrećastim ovojem (čašicom)."
    ],
    bozacDetails: {
      klobuk: "6–15 cm, zvonast pa otvoren, maslinastozelen, žutozelen ili sivozelen, radijalno uraslo vlaknast, za kiše ljepljiv, gol.",
      listici: "Bijeli, gusti, mekani, široki, slobodni (odvojeni od stručka), s mnogo lamelula.",
      strucak: "5–11 cm visok, 1–2 cm debeo, bjelkast sa zelenkastim mramorastim crtežom, nosi bijeli viseći vjenčić, u dnu jako gomoljast i obavijen bijelim opnastim ovojem.",
      meso: "Bijelo, pod kožicom klobuka zelenožućkasto, miris u mladosti ugodan, u starosti na med i strvinu. Kemijske reakcije: meso i listići na sumpornu kiselinu reagiraju ljubičasto.",
      spore: "Bijele, okruglaste do eliptične, 8–10 µm, amiloidne."
    },
    lookalikes: [
      { targetId: "zelena-krasnica", trait: "Vjenčić, ovoj i lomljivost mesa", mine: "Vlaknasto meso + IMA viseći vjenčić i vrećasti ovoj u dnu", other: "Zelena krasnica (Jestiva): Krhko meso puca poput krede, NEMA ni vjenčić ni ovoj!" },
      { targetId: "golubaca", trait: "Ovoj i vjenčić", mine: "Ima vjenčić i slobodan ovoj u dnu stručka", other: "Golubača (Jestiva): Nema vjenčić, nema ovoj, listići elastični/masni!" },
      { targetId: "bijela-zelena-pupavka", trait: "Boja klobuka", mine: "Maslinastozelen klobuk s radijalnim vlaknima", other: "Bijeli oblik zelene pupavke (SMRTONOSNA): Potpuno bijeli klobuk bez pigmenta, jednako smrtonosan!" },
      { targetId: "zuckasta-pupavka", trait: "Miris i ostaci ovoja", mine: "Klobuk gol bez krpica, miris u mladosti blag", other: "Žućkasta pupavka (Otrovna): Bradavice na klobuku, miris na sirovi krumpir / rotkvicu." }
    ],
    habitat: "Bjelogorične (hrast, bukva, pitomi kesten) i crnogorične šume Medvednice, Samoborskog gorja i Zagorja, od srpnja do studenog.",
    kitchen: "SMRTONOSNA! Sadrži amatoksine i faloidine. Pola klobuka uzrokuje zatajenje jetre i bubrega. Simptomi se javljaju tek 6–24 sata nakon jela.",
    season: "Srpanj – Studeni"
  },

  // 2. PROLJETNA BIJELA PUPAVKA
  {
    id: "bijela-pupavka",
    name: "Proljetna bijela pupavka",
    latin: "Amanita verna (Bull. ex Fr.) Lamarck",
    synonyms: "Agaricus vernus Bull.",
    folkNames: ["bijela gomoljača", "proljetna gomoljača", "bijela pupavka", "anđeo smrti"],
    wikiQuery: "Amanita_verna",
    bozacRef: "Svezak 1, br. 3, str. 51",
    status: "DANGER",
    statusLabel: "🔴 SMRTNO OTROVNA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "vjencic_ovoj",
    shortSummary: "Smrtonosna proljetno-ljetna bijela pupavka! Često je berači zamijene s mladim šampinjonom, golubljom vitezovkom ili tobolčarkom, no ima trajno bijele listiće, vjenčić i vrećicu u dnu.",
    simpleBullets: [
      "Cijela gljiva je snježnobijela (klobuk, listići i stručak).",
      "Listići NIKADA ne postaju ružičasti ili smeđi.",
      "Dno stručka izrasta iz duboke bijele vrećice (ovoja)."
    ],
    bozacDetails: {
      klobuk: "4–10 cm, polukuglast pa raširen, potpuno bijel, svilenasto sjajan i gladak.",
      listici: "Potpuno bijeli, gusti, slobodni od stručka.",
      strucak: "6–12 cm, bijel, valjkast, nosi bijeli viseći vjenčić, dno gomoljasto u bijelom ovoju.",
      meso: "Mekano, bijelo, bez mirisa u mladosti, s KOH ne žuti (ili vrlo slabo).",
      spore: "Gotovo okrugle, 8–10 x 7–8 µm, amiloidne, otrusina bijela."
    },
    lookalikes: [
      { targetId: "poljska-pecurka", trait: "Boja listića i ovoj", mine: "Trajno bijeli listići + vrećasti ovoj u zemlji", other: "Poljska pečurka (Jestiva): Listići ružičasti pa crnosmeđi, NEMA ovoj!" },
      { targetId: "golublja-vitezovka", trait: "Vjenčić i ovoj", mine: "IMA vjenčić i vrećasti ovoj u dnu", other: "Golublja vitezovka (Jestiva): NEMA ni vjenčić ni ovoj, u dnu plavkasta mrlja!" },
      { targetId: "bijela-zelena-pupavka", trait: "Sezona i srodnost", mine: "Proljetno-ljetna vrsta toplijih hrastovih šuma", other: "Bijeli oblik zelene pupavke (SMRTONOSNA): Kasnoljetno-jesenski albinistički oblik zelene pupavke!" }
    ],
    habitat: "Toplije listopadne šume (hrast, grab, kesten) u proljeće i ljeto.",
    kitchen: "SMRTONOSNA! Izaziva isti faloidinski sindrom s fatalnim zatajenjem jetre.",
    season: "Svibanj – Rujan"
  },

  // 3. SMRDLJIVA PUPAVKA
  {
    id: "smrdljiva-pupavka",
    name: "Smrdljiva pupavka",
    latin: "Amanita virosa Secr.",
    folkNames: ["smrdljiva gomoljača", "čunjasta pupavka", "anđeo uništenja", "bijela smrdulja"],
    wikiQuery: "Amanita_virosa",
    bozacRef: "Svezak 1, br. 5, str. 52",
    status: "DANGER",
    statusLabel: "🔴 SMRTNO OTROVNA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "vjencic_ovoj",
    shortSummary: "Snježnobijela pupavka s čunjastim klobukom, čupavo-vlaknastim stručkom i teškim, odbojnim mirisom na strvinu. Meso s kalijevom lužinom (KOH) odmah jarko požuti.",
    simpleBullets: [
      "Klobuk je asimetričan, zvonasto-čunjast, snježnobijel.",
      "Stručak je čupav i cik-cak vlaknast ispod poderanog vjenčića.",
      "Reakcija s KOH (lužinom) trenutačno oboji meso u jarko žuto."
    ],
    bozacDetails: {
      klobuk: "5–10 cm, isprva čunjast pa zvonast, snježnobijel, rub često nepravilan i resast.",
      listici: "Slobodni, vrlo gusti, čisto bijeli.",
      strucak: "8–15 cm, valjkast, vitak, cik-cak vunasto čehast, vjenčić nježan i često poderan, dno u vrećastom ovoju.",
      meso: "Bijelo, mekano, miriše neugodno. Kemijska reakcija: meso i kožica s kalijevom lužinom (KOH) trenutačno požute.",
      spore: "Okruglaste, 8–10 µm, amiloidne."
    },
    lookalikes: [
      { targetId: "poljska-pecurka", trait: "Boja listića i baza", mine: "Bijeli listići + ovoj u dnu + čupav stručak", other: "Pečurke (Jestive): Ružičasti/smeđi listići + nema ovoj." }
    ],
    habitat: "Vlažne planinske šume bukve, jele i smreke (vršna zona Medvednice, Gorski kotar).",
    kitchen: "SMRTONOSNA!",
    season: "Srpanj – Listopad"
  },

  // 4. ŽUĆKASTA PUPAVKA
  {
    id: "zuckasta-pupavka",
    name: "Žućkasta pupavka",
    latin: "Amanita citrina (Schff.) S. F. Gray",
    synonyms: "Amanita mappa (Batsch ex Fr.) Quél.",
    folkNames: ["žuta gomoljača", "limunasta pupavka", "krumpirača pupavka", "lažna zelena pupavka"],
    wikiQuery: "Amanita_citrina",
    bozacRef: "Svezak 1, br. 6 i 7, str. 52–54",
    status: "DANGER",
    statusLabel: "🔴 OTROVNA / NEJESTIVA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "vjencic_ovoj",
    shortSummary: "Masovno prisutna u jesen na Medvednici! Limunskožuti ili bijeli klobuk s krpicama, odbojan miris na sirovi krumpir ili rotkvicu, a na dnu kuglast gomolj s oštrim rubom.",
    simpleBullets: [
      "Jak i prodoran miris na sirovi krumpir ili rotkvicu.",
      "Klobuk limunastožut ili bijel, posut nepravilnim bjelkastim krpicama.",
      "Gomoljasto dno stručka je okruglo i oštro obrubljeno urezom (nema slobodnu vrećicu)."
    ],
    bozacDetails: {
      klobuk: "5–10 cm, polukuglast pa raširen, blijedo limunastožut do žućkastozelenkast, pokriven nepravilnim krpastim ostacima ovoja.",
      listici: "Slobodni, gusti, bjelkasti sa žućkastim odsjajem.",
      strucak: "5–12 cm, pri vrhu nosi opnast viseći žućkasti vjenčić, pri dnu završava okruglastim gomoljem s oštrim rubnim urezom.",
      meso: "Bijelo, pod kožicom klobuka žućkasto, miris izrazit na rotkvicu i sirovi krumpir.",
      spore: "Bijele, ovalne, 7–10 x 7–11 µm."
    },
    lookalikes: [
      { targetId: "zelena-pupavka", trait: "Miris i izgled klobuka", mine: "Miris na sirovi krumpir + krpice na klobuku + obrubljen gomolj", other: "Zelena pupavka (SMRTONOSNA): Gol klobuk s uraslim vlaknima + slobodna vrećica u dnu!" }
    ],
    habitat: "Listopadne i crnogorične šume (vrlo česta pod bukvom i hrastom) od kolovoza do studenog.",
    kitchen: "Nejestiva i blago otrovna (sadrži bufotenin), neugodna okusa.",
    season: "Kolovoz – Studeni"
  },

  // 5. PANTEROVA MUHARA
  {
    id: "panterova-muhara",
    name: "Panterova muhara",
    latin: "Amanita pantherina (DC ex Fr.) Secr.",
    folkNames: ["panterovka", "smeđa muhara", "lažna biserka", "pjegava muhara", "luda gljiva"],
    wikiQuery: "Amanita_pantherina",
    bozacRef: "Svezak 1, br. 15 i 16, str. 58–60",
    status: "DANGER",
    statusLabel: "🔴 SMRTNO OTROVNA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "vjencic_ovoj",
    shortSummary: "Najopasnija dvojnica biserke i prave tigrice! Smeđi klobuk s čisto bijelim točkicama, NAREBRAN rub klobuka, GLADAK vjenčić i čisto bijelo meso koje nikad ne crveni.",
    simpleBullets: [
      "Rub klobuka je izrazito NAREBRAN (ucrtkan), a klobuk posut snježnobijelim bradavicama.",
      "Vjenčić (prsten) na stručku je potpuno GLADAK (nema crtice odozgo!).",
      "Meso je UVIJEK čisto bijelo i nikada ne mijenja boju u crvenkastu."
    ],
    bozacDetails: {
      klobuk: "5–12 cm, polukuglast pa otvoren, smeđosiv do tamnosmeđ, posut mnogobrojnim bijelim bradavicama, rub klobuka tipično narebran.",
      listici: "Gusti, bijeli, slobodni, ne drže se za stručak.",
      strucak: "6–15 cm, bijel, šupalj, nosi gladak bijeli vjenčić, dno gomoljasto s 2–3 prstenasta obruča.",
      meso: "Bijelo, nepromjenljivo, miris blag na rotkvicu.",
      spore: "Eliptične, 10 x 7–8 µm, neamiloidne."
    },
    lookalikes: [
      { targetId: "biserka", trait: "Promjena boje mesa i vjenčić", mine: "Meso ostaje ČISTO BIJELO + GLADAK vjenčić + narebran rub", other: "Biserka (Uvjetno jestiva): Meso POCRVENI na prerezu + vjenčić je NAREBRAN!" },
      { targetId: "prava-tigrica", trait: "Vjenčić i rub klobuka", mine: "Gladak vjenčić + narebran rub klobuka", other: "Prava tigrica (Uvjetno jestiva): NAREBRAN vjenčić + gladak rub klobuka!" }
    ],
    habitat: "Listopadne i crnogorične šume, šumski putovi i rubovi šuma, od lipnja do studenog.",
    kitchen: "SMRTNO OTROVNA! Izaziva panterinski (neurotoksični) sindrom s teškim halucinacijama, grčevima i komom.",
    season: "Lipanj – Studeni"
  },

  // 6. CRVENA MUHARA
  {
    id: "crvena-muhara",
    name: "Crvena muhara",
    latin: "Amanita muscaria Linn. ex Fries",
    folkNames: ["muhara", "muharica", "crvenkapica", "luda gljiva", "muholovka", "vještičja gljiva"],
    wikiQuery: "Amanita_muscaria",
    bozacRef: "Svezak 1, br. 17, str. 60",
    status: "DANGER",
    statusLabel: "🔴 OTROVNA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "vjencic_ovoj",
    shortSummary: "Poznata otrovnica jarkocrvenog klobuka s bijelim točkicama. Kad kiša opere točkice, neoprezni je zamijene s blagvom — no muhara ima ČISTO BIJELE listiće i stručak!",
    simpleBullets: [
      "Jarkocrveni klobuk s bijelim bradavicama (koje kiša može isprati!).",
      "Listići i stručak su ČISTO BIJELI (kod carske blagve su zlatnožuti!).",
      "Dno stručka ima prstenaste bradavičaste pojaseve (nema debelu bijelu vrećicu)."
    ],
    bozacDetails: {
      klobuk: "8–20 cm, jarkocrven, za kiše ljepljiv, posut bijelim bradavicama ovoja.",
      listici: "Bijeli, gusti, slobodni.",
      strucak: "10–20 cm, bijel, s visećim bijelim vjenčićem koji ima žućkasti rub, dno gomoljasto.",
      meso: "Bijelo, pod kožicom klobuka tanko žutonarančasto. S fenolom meso postane vinsko-crveno.",
      spore: "Eliptične, bijele, 9–12 x 6–9 µm."
    },
    lookalikes: [
      { targetId: "carska-blagva", trait: "Boja listića i stručka", mine: "BIJELI listići i stručak + bradavice na dnu", other: "Carska blagva (Delikatesa): ZLATNOŽUTI listići i stručak + debeli bijeli ovoj!" }
    ],
    habitat: "U simbiozi s brezom, smrekom i borom, ljeti i u jesen.",
    kitchen: "OTROVNA! Sadrži iboteničnu kiselinu i muscimol.",
    season: "Srpanj – Studeni"
  },

  // 7. CARSKA BLAGVA
  {
    id: "carska-blagva",
    name: "Carska blagva (Blagva)",
    latin: "Amanita caesarea (Scop. ex Fr.) Pers.",
    folkNames: ["blagva", "kneginja", "jajčara", "žumanjka", "kraljevka", "rudnjača", "škripavac"],
    wikiQuery: "Amanita_caesarea",
    bozacRef: "Svezak 1, br. 19, str. 62",
    status: "SAFE",
    statusLabel: "🟢 VRHUNSKA DELIKATESA (ZAŠTIĆENA)",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "vjencic_ovoj",
    shortSummary: "Kraljica gljiva naših hrastovih šuma! Narančastocrveni klobuk narebranog ruba, ZLATNOŽUTI listići i stručak, te velika bijela vrećasta čašica (ovoj) na dnu.",
    simpleBullets: [
      "Listići, stručak i viseći prsten su ZLATNOŽUTI (nikad bijeli!).",
      "Klobuk je žarkonarančast do crvenkast, rub je pravilno narebran.",
      "Izrasta iz debelog snježnobijelog jajeta (vrećastog ovoja) na dnu stručka."
    ],
    bozacDetails: {
      klobuk: "8–20 cm, krasne narančastocrvene boje poput zrele rajčice, gladak, rub ucrtkan.",
      listici: "Zlatnožuti, gusti, slobodni od stručka.",
      strucak: "8–15 cm, pun pa šupljikav, zlatnožut s velikim žutim narebranim vjenčićem, u dnu u debelom bijelom ovoju.",
      meso: "Pod kožicom i stručkom žuto, u sredini bijelo, izvanrednog okusa.",
      spore: "Bijeložućkaste, jajolike, 9–14 x 5–7 µm."
    },
    lookalikes: [
      { targetId: "crvena-muhara", trait: "Boja listića i stručka", mine: "ZLATNOŽUTI listići i stručak + bijeli ovoj", other: "Crvena muhara (OTROVNA): ČISTO BIJELI listići i stručak!" }
    ],
    habitat: "Svijetle hrastove i kestenove šume Medvednice, Samoborskog gorja i Zagorja od srpnja do listopada.",
    kitchen: "Vrhunska delikatesa! U RH je na popisu strogo zaštićenih vrsta – branje u prirodi je zakonski zabranjeno.",
    season: "Srpanj – Listopad"
  },

  // 8. BISERNA MUHARA (BISERKA)
  {
    id: "biserka",
    name: "Biserna muhara (Biserka)",
    latin: "Amanita rubescens (Pers. ex Fr.) S. F. Gray",
    folkNames: ["biserka", "crvenkasta muhara", "rumenka", "jestiva muhara", "bisernica"],
    wikiQuery: "Amanita_rubescens",
    bozacRef: "Svezak 1, br. 10 i 11, str. 56",
    status: "WARN",
    statusLabel: "🟡 UVJETNO JESTIVA (DOBRO SKUhati!)",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "samo_vjencic",
    shortSummary: "Najčešća muhara Medvednice i Zagorja! Smeđocrvenkasti klobuk s krpicama, meso na prerezu i u crvotočinama POCRVENI (boja crnog vina), a vjenčić je odozgo NAREBRAN.",
    simpleBullets: [
      "Meso na prerezu, u dnu stručka i u rupicama od crva uvijek POCRVENI.",
      "Vjenčić (prsten) na stručku je s gornje strane jasno NAREBRAN (prugast).",
      "Rub klobuka je GLADAK (nije narebran kao kod panterove muhare)."
    ],
    bozacDetails: {
      klobuk: "6–15 cm, crvenkastosmeđ do mesnato-oker, posut bjelkasto-sivim bradavicama, rub gladak.",
      listici: "Bijeli, gusti, na pritisak i sa starenjem poprimaju crvenkaste mrlje.",
      strucak: "10–18 cm, bjelkast s crvenkastim daškom, nosi viseći široki NAREBRANI vjenčić, dno gomoljasto.",
      meso: "Bijelo, na zraku polako poprima boju crnog vina. Reakcija: s fenolom postane crveno kao vino.",
      spore: "Bijele, eliptične, 7–10 x 5–8 µm, amiloidne."
    },
    lookalikes: [
      { targetId: "panterova-muhara", trait: "Meso i vjenčić (PITANJE ŽIVOTA!)", mine: "Meso POCRVENI + NAREBRAN vjenčić + gladak rub", other: "Panterova muhara (SMRTONOSNA): Meso ostaje ČISTO BIJELO + GLADAK vjenčić + narebran rub!" },
      { targetId: "hrapava-muhara", trait: "Boja bradavica i crvenjenje mesa", mine: "Bjelkasto-sive bradavice + meso POCRVENI", other: "Hrapava muhara (OTROVNA): Sumporastožute šiljate bradavice na klobuku i gomolju + meso NE crveni!" },
      { targetId: "prava-tigrica", trait: "Crvenjenje mesa", mine: "Meso crveni na zraku", other: "Prava tigrica (Uvjetno jestiva): Meso ne crveni, vjenčić također narebran." }
    ],
    habitat: "Sve šume Medvednice i Zagorja od svibnja do studenog.",
    kitchen: "Sirova je otrovna jer sadrži termolabilni hemolizin koji se razara na 70 °C. Oguliti kožicu klobuka i dobro prokuhati ili ispeći.",
    season: "Svibanj – Studeni"
  },

  // 9. PRAVA TIGRICA
  {
    id: "prava-tigrica",
    name: "Prava tigrica",
    latin: "Amanita excelsa / Amanita spissa (Fr.) Kummer",
    folkNames: ["tigrica", "debela muhara", "siva muhara", "čvrsta muhara"],
    wikiQuery: "Amanita_excelsa",
    bozacRef: "Svezak 1, br. 12, str. 56",
    status: "WARN",
    statusLabel: "🟡 UVJETNO JESTIVA (SAMO ZA ISKUSNE)",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "samo_vjencic",
    shortSummary: "Siva muhara s bijelim mesom koje NE crveni, ali ima jasno NAREBRAN vjenčić i GLADAK rub klobuka. Zbog ogromne sličnosti s panterovom muharom traži maksimalan oprez!",
    simpleBullets: [
      "Vjenčić (prsten) je s gornje strane jasno NAREBRAN (brazdast).",
      "Rub klobuka je GLADAK (nije urezan/narebran).",
      "Meso je čisto bijelo i NE crveni kao kod biserke."
    ],
    bozacDetails: {
      klobuk: "6–15 cm, siv ili sivosmeđ, pokriven pepeljasto-sivim brašnastim krpicama, rub gladak.",
      listici: "Bijeli, gusti, slobodni.",
      strucak: "8–15 cm, tvrd, sivkast, s narebranim visećim vjenčićem, baza zadebljana u repasti gomolj.",
      meso: "Bijelo, čvrsto, ne mijenja boju, miris na repu ili rotkvicu.",
      spore: "Eliptične, 8–10 x 6–8 µm, amiloidne."
    },
    lookalikes: [
      { targetId: "panterova-muhara", trait: "Vjenčić i rub klobuka", mine: "NAREBRAN vjenčić + GLADAK rub klobuka", other: "Panterova muhara (SMRTONOSNA): GLADAK vjenčić + NAREBRAN rub klobuka + obruči na dnu!" },
      { targetId: "biserka", trait: "Crvenjenje mesa", mine: "Meso ostaje bijelo", other: "Biserka: Meso na prerezu pocrveni u boju vina." }
    ],
    habitat: "Bjelogorične i crnogorične šume ljeti i u jesen.",
    kitchen: "Sirova otrovna. Zbog opasnosti od zamjene s panterovom muharom ne preporučuje se početnicima.",
    season: "Srpanj – Listopad"
  },

  // 10. CRVENOSMEĐA PRESLICA
  {
    id: "smeda-preslica",
    name: "Crvenosmeđa i siva preslica",
    latin: "Amanita fulva / Amanita vaginata",
    folkNames: ["preslica", "kukmača", "siva preslica", "smeđa preslica", "košuljašica"],
    wikiQuery: "Amanita_fulva",
    bozacRef: "Svezak 1, br. 31 i 32, str. 70",
    status: "WARN",
    statusLabel: "🟡 UVJETNO JESTIVA (PROKUHATI)",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Vitka i krhka preslica s duboko narebranim rubom klobuka, stručkom POTPUNO BEZ PRSTENA i visokim slobodnim vrećastim ovojem na dnu.",
    simpleBullets: [
      "Rub klobuka je izrazito i duboko NAREBRAN poput zubaca češlja.",
      "Stručak je dugačak, šupalj i NIKADA nema prsten (vjenčić).",
      "Dno stručka raste iz visoke bijele vrećice (ovoja)."
    ],
    bozacDetails: {
      klobuk: "4–10 cm, crvenkastosmeđ (A. fulva) ili pepeljastosiv (A. vaginata), s izraženom grbicom i duboko narebranim rubom.",
      listici: "Bijeli, slobodni, gusti.",
      strucak: "8–15 cm, vitak, šupalj, bez vjenčića, dno obavijeno visokim slobodnim ovojem.",
      meso: "Tanko, bijelo, lomljivo.",
      spore: "Okruglaste, 9–12 µm, neamiloidne."
    },
    lookalikes: [
      { targetId: "zelena-pupavka", trait: "Vjenčić i rub klobuka", mine: "NEMA vjenčić + duboko narebran rub", other: "Zelena pupavka (SMRTONOSNA): IMA viseći vjenčić + gladak rub klobuka!" }
    ],
    habitat: "Kisele bukove, kestenove i borove šume Medvednice i Zagorja, ljeto i jesen.",
    kitchen: "Sirova je otrovna! Obavezno prokuhati i baciti vodu prije pripreme.",
    season: "Lipanj – Listopad"
  },

  // 11. VELIKA SUNČANICA
  {
    id: "velika-suncanica",
    name: "Velika sunčanica",
    latin: "Macrolepiota procera (Scop. ex Fr.) Sing.",
    folkNames: ["sunčanica", "kozarka", "kišobran", "srndać", "srnjak", "prstenjača", "gubavica", "parazol", "dežnik"],
    wikiQuery: "Macrolepiota_procera",
    bozacRef: "Svezak 1, br. 51, str. 84",
    status: "SAFE",
    statusLabel: "🟢 VRHUNSKA JESTIVA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "samo_vjencic",
    shortSummary: "Kraljica pohanja! Visoka 20–40 cm, s krupnim klobukom pokrivenim smeđim čehama, TIGRASTO IŠARANIM stručkom poput zmijske kože i dvostrukim prstenom koji slobodno klizi.",
    simpleBullets: [
      "Stručak je visok, tvrd i smeđe TIGRASTO IŠARAN (poput zmijske kože).",
      "Prsten (vjenčić) je dvostruk, vunast i SLOBODNO POMIČAN duž stručka.",
      "Klobuk je ogroman (10–30 cm), a meso miriše na lješnjake i ne crveni."
    ],
    bozacDetails: {
      klobuk: "10–30 cm, u početku kuglast pa otvoren poput suncobrana, s tamnim ispupčenjem i krupnim smeđim ljuskama.",
      listici: "Gusti, mekani, bijeli, odmaknuti od stručka i spojeni na ovratnik (collarium).",
      strucak: "15–40 cm, vitak, drvenast, šupalj, smeđe zmijasto išaran, s dvostrukim pomičnim prstenom, baza gomoljasta bez ovoja.",
      meso: "Bijelo, mekano u klobuku, nepromjenljivo, miris i okus na lješnjake.",
      spore: "Eliptične, 12–20 x 9–14 µm, dekstrinoidne."
    },
    lookalikes: [
      { targetId: "smrdljiva-stitarka", trait: "Veličina klobuka i stručak", mine: "Klobuk 10–30 cm + tigrast stručak + pomičan prsten", other: "Smrdljiva štitarka (OTROVNA): Klobuk manji od 6 cm + gladak stručak + nepomičan prsten!" },
      { targetId: "otrovna-suncanica", trait: "Stručak i crvenjenje mesa", mine: "Tigrast stručak + meso ostaje bijelo", other: "Otrovna sunčanica (OTROVNA): Gladak stručak bez šara + meso na prerezu jako crveni!" }
    ],
    habitat: "Svijetle šume, rubovi šuma, proplanci i livade Medvednice i Zagorja od srpnja do studenog.",
    kitchen: "Pohani klobuk je omiljeni jesenski specijalitet. Drvenasti stručak se osuši i samelje u mirisni gljivlji začin.",
    season: "Srpanj – Studeni"
  },

  // 12. KUŠTRAVA SUNČANICA
  {
    id: "kustrava-suncanica",
    name: "Kuštrava sunčanica",
    latin: "Chlorophyllum rhacodes (Macrolepiota rhacodes)",
    folkNames: ["šumska sunčanica", "čupava kozarka", "crveneća sunčanica", "šumski kišobran", "srndać"],
    wikiQuery: "Chlorophyllum_rhacodes",
    bozacRef: "Svezak 1, br. 60, str. 90",
    status: "WARN",
    statusLabel: "🟡 UVJETNO JESTIVA (PROKUHATI)",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "samo_vjencic",
    shortSummary: "Šumska sunčanica s GLATKIM stručkom bez tigrastih šara i mesom koje na prerezu odmah pocrveni u narančasto-ciglastu boju.",
    simpleBullets: [
      "Stručak je potpuno GLADAK (nema tigraste smeđe šare!).",
      "Meso na prerezu i pritisak odmah postane narančasto pa vinskocrveno.",
      "Klobuk ima debele, nepravilne i kuštrave smeđe krpe."
    ],
    bozacDetails: {
      klobuk: "8–18 cm, jastučast pa otvoren, pokriven krupnim crijepastim smeđim krpama na bijeloj podlozi.",
      listici: "Bijeli, na dodir pocrvene.",
      strucak: "10–18 cm, gladak, bijel pa smećkast, s pomičnim prstenom i jako zadebljanom bazom.",
      meso: "Bijelo, na prerezu odmah pocrveni u boju šafrana pa u smeđecrvenu.",
      spore: "Eliptične, 10–15 x 6–7 µm."
    },
    lookalikes: [
      { targetId: "otrovna-suncanica", trait: "Stanište i baza stručka", mine: "Raste duboko u šumi, zaobljen gomolj", other: "Otrovna vrtna sunčanica (OTROVNA): Raste u vrtu/kompostu, oštro obrubljen gomolj!" },
      { targetId: "velika-suncanica", trait: "Stručak i boja mesa", mine: "Gladak stručak + meso crveni", other: "Velika sunčanica (Jestiva): Tigrast stručak + meso ostaje bijelo." }
    ],
    habitat: "Bjelogorične i crnogorične šume bogate humusom, ljeto i jesen.",
    kitchen: "Obavezno dobro termički obraditi. Jedu se samo klobuci.",
    season: "Srpanj – Studeni"
  },

  // 13. OTROVNA (VRTNA) SUNČANICA
  {
    id: "otrovna-suncanica",
    name: "Otrovna (vrtna) sunčanica",
    latin: "Chlorophyllum brunneum / Macrolepiota venenata",
    folkNames: ["vrtna sunčanica", "lažna kozarka", "otrovna kozarka", "gubavica", "štitarka"],
    wikiQuery: "Chlorophyllum_brunneum",
    bozacRef: "Svezak 1, br. 61 i 62, str. 92",
    status: "DANGER",
    statusLabel: "🔴 OTROVNA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "samo_vjencic",
    shortSummary: "Opasna dvojnica koja raste po parkovima, vrtovima i na kompostu! Ima gladak stručak, meso koje na prerezu crveni i oštro obrubljen, spljošten gomolj na dnu.",
    simpleBullets: [
      "Raste izvan šume: na kompostu, u vrtovima, staklenicima i parkovima.",
      "Stručak je potpuno gladak i završava velikom spljoštenom lukovicom s oštrim rubom.",
      "Meso na prerezu jako pocrveni."
    ],
    bozacDetails: {
      klobuk: "8–18 cm, sivosmeđ s radijalnim krpama, u sredini tamniji.",
      listici: "Gusti, bijeli, na pritisak crvene.",
      strucak: "Kratak u odnosu na klobuk, gladak, na dnu gomoljasto zadebljan i oštro obrubljen.",
      meso: "Na prerezu odmah pocrveni, poslije prljavosmeđe.",
      spore: "Eliptične, 10–12 x 7–8 µm."
    },
    lookalikes: [
      { targetId: "velika-suncanica", trait: "Stručak i stanište", mine: "Gladak stručak + obrubljen gomolj + raste u vrtu/kompostu", other: "Velika sunčanica (Jestiva): Tigrast stručak + raste u šumi!" }
    ],
    habitat: "Vrtovi, parkovi, gredice s kompostom i stajskim gnojem, ljeti i u jesen.",
    kitchen: "OTROVNA! Izaziva teške želučano-crijevne smetnje i dehidraciju.",
    season: "Srpanj – Listopad"
  },

  // 14. SMRDLJIVA ŠTITARKA (I MALE ŠTITARKE)
  {
    id: "smrdljiva-stitarka",
    name: "Smrdljiva štitarka",
    latin: "Lepiota cristata (Bolt. ex Fr.) Kummer",
    folkNames: ["štitarka", "mala štitarka", "češljasta štitarka", "lažna mala sunčanica", "gubavica"],
    wikiQuery: "Lepiota_cristata",
    bozacRef: "Svezak 1, br. 63, str. 92",
    status: "DANGER",
    statusLabel: "🔴 OTROVNA (OPREZ: MALE ŠTITARKE)",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "samo_vjencic",
    shortSummary: "Minijaturna 'sunčanica' promjera klobuka samo 2–5 cm. Mnoge srodne male štitarke (npr. Lepiota helveola, L. brunneoincarnata) sadrže smrtonosne amatoksine!",
    simpleBullets: [
      "Klobuk je vrlo malen (2 do 5 cm) sa sitnim smeđecrvenim ljuskicama.",
      "Prstenak je slabašan i nepomičan (brzo otpadne).",
      "Meso ima oštar neugodan miris na plin ili gumu."
    ],
    bozacDetails: {
      klobuk: "2–5 cm, čunjasto-zvonolik pa otvoren, prekriven sitnim crvenkastosmeđim čehicama, u sredini gladak i tamniji.",
      listici: "Bijeli, slobodni, gusti.",
      strucak: "3–6 cm, tanak, šupalj, pri dnu crvenkast, s prolaznim vjenčićem.",
      meso: "Tanko, bijelo, oštrog neugodnog mirisa.",
      spore: "Klinaste, 6–7 x 3–3,5 µm."
    },
    lookalikes: [
      { targetId: "velika-suncanica", trait: "Promjer klobuka (ZLATNO PRAVILO)", mine: "Klobuk manji od 6 cm + nepomičan prsten", other: "Velika sunčanica (Jestiva): Klobuk 10–30 cm + pomičan prsten!" }
    ],
    habitat: "Parkovi, vrtovi, rubovi staza i šuma, ljeti i u jesen.",
    kitchen: "OTROVNA! Zlatno pravilo gljivarstva: Nikada ne brati sunčanice s klobukom manjim od 10 cm!",
    season: "Srpanj – Listopad"
  },

  // 15. POLJSKA PEČURKA (LIVADNI ŠAMPINJON)
  {
    id: "poljska-pecurka",
    name: "Poljska pečurka (Livadni šampinjon)",
    latin: "Agaricus campestris L. ex Fr.",
    folkNames: ["šampinjon", "pečurka", "rudnjača", "travničarka", "bijelka", "livadna pečurka", "kukmak"],
    wikiQuery: "Agaricus_campestris",
    bozacRef: "Svezak 1, br. 141, str. 146",
    status: "SAFE",
    statusLabel: "🟢 IZVRSNA JESTIVA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "samo_vjencic",
    shortSummary: "Omiljeni livadni šampinjon! Klobuk bjelkast i svilenast, listići najprije živo ružičasti pa čokoladnosmeđi, stručak s prolaznim vjenčićem, a dno stručka POTPUNO BEZ OVOJA.",
    simpleBullets: [
      "Listići su u mladosti živo ružičasti, a kasnije čokoladnosmeđi (nikada čisto bijeli!).",
      "Na dnu stručka NEMA nikakvu vrećicu (ovoj).",
      "Meso na prerezu ima ugodan miris i ne žuti intenzivno."
    ],
    bozacDetails: {
      klobuk: "5–12 cm, polukuglast pa konveksan, bijel, svilenast do sitno čehast.",
      listici: "Slobodni, gusti, najprije krasne ružičaste boje, zatim čokoladnosmeđi do crnkasti.",
      strucak: "3–8 cm, bijel, valjkast, nosi jednostavan bijeli vjenčić, bez ovoja.",
      meso: "Bijelo, na prerezu dobiva blagi crvenkasti dašak, ugodna mirisa i okusa.",
      spore: "Eliptične, smeđe, 7–9 x 5–6 µm."
    },
    lookalikes: [
      { targetId: "bijela-pupavka", trait: "Boja listića i ovoj na dnu stručka", mine: "Ružičasti pa smeđi listići + NEMA ovoj na dnu", other: "Bijela pupavka (SMRTONOSNA): Zauvijek bijeli listići + vrećasti ovoj na dnu!" },
      { targetId: "otrovna-pecurka", trait: "Miris i prerez dna stručka", mine: "Ugodan miris na gljive + dno stručka NE žuti", other: "Otrovna pečurka (OTROVNA): Smrdi na tintu/karbol + dno stručka trenutačno krom-žuto!" }
    ],
    habitat: "Pašnjaci, livade, voćnjaci i polja od svibnja do studenog.",
    kitchen: "Vrhunska kulinarska gljiva za sve namjene.",
    season: "Svibanj – Studeni"
  },

  // 16. ŠUMSKA (ANISOVA) PEČURKA
  {
    id: "sumska-pecurka",
    name: "Šumska pečurka (Gomoljasta šumarica)",
    latin: "Agaricus silvicola / Agaricus essettei",
    folkNames: ["šumski šampinjon", "anisova pečurka", "šumarica", "bijela šumarica", "mirisna pečurka"],
    wikiQuery: "Agaricus_silvicola",
    bozacRef: "Svezak 1, br. 146 i 147, str. 150–151",
    status: "SAFE",
    statusLabel: "🟢 IZVRSNA JESTIVA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "samo_vjencic",
    shortSummary: "Šumski šampinjon koji miriše na anis i bademe! Klobuk bjelkast i na dodir polako požuti, listići sivoružičasti pa tamnosmeđi, a dno stručka ima spljošteni gomolj BEZ ovoja.",
    simpleBullets: [
      "Jako izražen, ugodan miris na ANIS ili gorke bademe.",
      "Listići su u zrelosti čokoladnosmeđi (nikad ne ostaju bijeli).",
      "Dno stručka ima gomoljasto zadebljanje, ali NEMA slobodan ovoj (čašicu)."
    ],
    bozacDetails: {
      klobuk: "6–12 cm, bijel, svilenast, na dodir polako poprima žućkastu nijansu.",
      listici: "Slobodni, najprije bjelkasti pa sivkasto-ružičasti i na kraju tamnosmeđi.",
      strucak: "8–14 cm, vitak, bijel, s visećim dvostrukim vjenčićem i odrezanim rubom gomolja u dnu.",
      meso: "Bijelo, miris intenzivan na anis (Pimpinella anisum).",
      spore: "Smeđe, ovalne, 5–6 x 3–4 µm."
    },
    lookalikes: [
      { targetId: "zelena-pupavka", trait: "Boja listića i ovoj", mine: "Smeđi listići + miris na anis + nema ovoj", other: "Zelena i bijela pupavka (SMRTONOSNE): Čisto bijeli listići + vrećasti ovoj u dnu!" },
      { targetId: "otrovna-pecurka", trait: "Miris i brzina žućenja", mine: "Miriše na anis (ugodno) + polako žuti", other: "Otrovna pečurka: Smrdi na tintu/karbol + dno stručka trenutačno jarko žuto!" }
    ],
    habitat: "Bjelogorične i crnogorične šume Medvednice (česta i u parku Maksimir) od ljeta do jeseni.",
    kitchen: "Izvrsna jestiva gljiva delikatesne arome.",
    season: "Lipanj – Listopad"
  },

  // 17. OTROVNA (KARBOLOVA) PEČURKA
  {
    id: "otrovna-pecurka",
    name: "Otrovna pečurka (Karbolova pečurka)",
    latin: "Agaricus xanthodermus Genevier",
    folkNames: ["karbolovka", "žuti šampinjon", "lažni šampinjon", "smrdljiva pečurka", "tintača"],
    wikiQuery: "Agaricus_xanthodermus",
    bozacRef: "Svezak 1, br. 148, str. 152",
    status: "DANGER",
    statusLabel: "🔴 OTROVNA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "samo_vjencic",
    shortSummary: "Najopasniji lažni šampinjon! Na najmanji zarez u dnu stručka meso u sekundi postane JARKO KROM-ŽUTO i smrdi na tintu, fenol ili bolnicu (miris se pojačava kuhanjem!).",
    simpleBullets: [
      "Prereži dno stručka: meso trenutačno postane JARKO KROM-ŽUTO.",
      "Oštar, kemijski smrad na tintu, karbol ili bolnicu.",
      "Klobuk kod mladih primjeraka često ima četvrtast (trapezast) oblik."
    ],
    bozacDetails: {
      klobuk: "5–15 cm, trapezoidan pa otvoren, bijel ili sivkast, na dodir brzo požuti.",
      listici: "Slobodni, najprije blijedoružičasti, zatim čokoladnosmeđi.",
      strucak: "Bijel, šupalj, s debelim vjenčićem, gomoljasto dno na prerezu trenutačno postane sumporasto/krom-žuto.",
      meso: "Bijelo, na bazi stručka naglo žuto, prodorna mirisa na tintu/karbol.",
      spore: "Ovalne, 5–7 x 3–4 µm."
    },
    lookalikes: [
      { targetId: "poljska-pecurka", trait: "Prerez dna stručka i miris", mine: "Dno stručka odmah JARKO ŽUTO + smrdi na tintu", other: "Poljska pečurka (Jestiva): Dno stručka ne žuti + miris ugodan na gljive!" },
      { targetId: "sumska-pecurka", trait: "Karakter mirisa", mine: "Smrad na karbol/tintu", other: "Šumska pečurka (Jestiva): Miris na anis i bademe." }
    ],
    habitat: "Parkovi, livade, vrtovi, rubovi šuma, često u skupinama od ljeta do jeseni.",
    kitchen: "OTROVNA! Kuhanjem cijela kuća zasmrdi na tintu; uzrokuje jako povraćanje i proljev.",
    season: "Lipanj – Studeni"
  },

  // 18. VELIKA (LJEPLJIVA) TOBOLČARKA
  {
    id: "velika-tobolcarka",
    name: "Velika tobolčarka",
    latin: "Volvopluteus gloiocephalus (Volvariella speciosa)",
    folkNames: ["tobolčarka", "ljepljiva tobolčarka", "ornjača", "strništarka"],
    wikiQuery: "Volvopluteus_gloiocephalus",
    bozacRef: "Svezak 1, br. 43 i 44, str. 78",
    status: "SAFE",
    statusLabel: "🟢 JESTIVA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Raste na oranicama, njivama i kompostu. Klobuk ljepljiv i sivosmeđ, na dnu ima bijeli vrećasti ovoj, ali NIKADA nema vjenčić, a listići u zrelosti postanu RUŽIČASTI.",
    simpleBullets: [
      "Stručak je potpuno gladak i NIKADA nema prsten/vjenčić.",
      "Listići su u zrelosti mesnato ružičasti (od ružičastih spora).",
      "Dno stručka izrasta iz slobodnog bijelog ovoja u tlu."
    ],
    bozacDetails: {
      klobuk: "6–15 cm, ljepljiv, u početku čunjast pa otvoren, bjelkast do sivosmeđ.",
      listici: "Slobodni, najprije bijeli, kad spore sazriju postanu ružičasti.",
      strucak: "10–18 cm, vitak, bijel, bez vjenčića, na dnu u mekom bijelom ovoju.",
      meso: "Mekano, miriše na rotkvicu.",
      spore: "Crvenkasto-ružičaste, eliptične, 12–18 x 8–10 µm."
    },
    lookalikes: [
      { targetId: "bijela-pupavka", trait: "Vjenčić i boja listića", mine: "NEMA vjenčić + ružičasti zreli listići (raste na njivi)", other: "Bijela pupavka (SMRTONOSNA): IMA vjenčić + trajno bijeli listići (raste u šumi)!" }
    ],
    habitat: "Polja, strništa, vrtovi i kompostišta od svibnja do studenog.",
    kitchen: "Jestiva, ali osrednje kvalitete zbog mekog mesa i mirisa na rotkvicu.",
    season: "Svibanj – Studeni"
  },

  // 19. VELIKA GNOJIŠTARKA
  {
    id: "velika-gnojistarka",
    name: "Velika gnojištarka",
    latin: "Coprinus comatus (Müll. ex Fr.) S. F. Gray",
    folkNames: ["čupava gnojištarka", "tintača", "velika tintača", "bablji prdac", "odvjetnička perika"],
    wikiQuery: "Coprinus_comatus",
    bozacRef: "Svezak 1, br. 101, str. 118",
    status: "SAFE",
    statusLabel: "🟢 VRHUNSKA DELIKATESA (DOK JE BIJELA)",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "samo_vjencic",
    shortSummary: "Poznata valjkasta bijela čupava gljiva koja raste uz putove i travnjake. Izvanredna delikatesa, ali se mora ubrati i pripremiti dok su joj listići čisto bijeli!",
    simpleBullets: [
      "Klobuk je izdužen i valjkast, prekriven bijelim čupavim ljuskama.",
      "Jestiva je ISKLJUČIVO dok su listići iznutra snježnobijeli.",
      "Starenjem se klobuk rastapa u crnu tekućinu poput tinte."
    ],
    bozacDetails: {
      klobuk: "Visok 5–15 cm, valjkast, bijel s oker vrhom, prekriven čupavim čehama.",
      listici: "Gusti, slobodni, bijeli pa ružičasti, a zatim se otope u crnu tekućinu.",
      strucak: "10–25 cm, bijel, šupalj, nosi uski pomični prstenčić.",
      meso: "Bijelo, nježno, ugodna mirisa.",
      spore: "Crne, eliptične, 10–15 x 6–9 µm."
    },
    lookalikes: [
      { targetId: "jajasta-gnojistarka", trait: "Boja i površina klobuka", mine: "Snježnobijel i čupav klobuk", other: "Jajasta gnojištarka (OTROVNA S ALKOHOLOM): Siv i gladak/brazdast klobuk!" }
    ],
    habitat: "Travnjaci, parkovi, uz ceste i rubove šuma u proljeće i jesen.",
    kitchen: "Vrhunska gljiva (dinstana na maslacu ili pohana). Pripremiti unutar 2 sata od branja!",
    season: "Travanj – Lipanj & Rujan – Studeni"
  },

  // 20. JAJASTA GNOJIŠTARKA
  {
    id: "jajasta-gnojistarka",
    name: "Jajasta gnojištarka",
    latin: "Coprinopsis atramentaria (Bull. ex Fr.) Fr.",
    folkNames: ["siva gnojištarka", "alkoholna tintača", "crna tintača", "pijana gljiva"],
    wikiQuery: "Coprinopsis_atramentaria",
    bozacRef: "Svezak 1, br. 103, str. 120",
    status: "DANGER",
    statusLabel: "🔴 OTROVNA UZ ALKOHOL",
    hymenium: "listici", growth: "busen", latex: "nema", ring: "bez",
    shortSummary: "Raste u gustim busenima uz panjeve. Sadrži koprin: u kombinaciji s alkoholom (čak i do 3 dana prije ili poslije jela!) izaziva antabusni sindrom trovanja.",
    simpleBullets: [
      "Klobuk je siv do sivosmeđ, radijalno naboran i gladak (nije bijel ni čupav).",
      "Raste u gustim busenima oko panjeva ili zakopanog drveta.",
      "Strogo zabranjen alkohol uz jelo ili danima nakon jela!"
    ],
    bozacDetails: {
      klobuk: "3–8 cm, jajolik pa zvonast, pepeljastosiv, sitno izbrazdan.",
      listici: "Gusti, bjelkasti pa crnosmeđi, pretvaraju se u tintu.",
      strucak: "Bijel, šupalj, sa sitnim prstenastim pojasom pri dnu.",
      meso: "Sivkasto, bez mirisa.",
      spore: "Crne, 6–12 x 5–6 µm."
    },
    lookalikes: [
      { targetId: "velika-gnojistarka", trait: "Boja i ljuske klobuka", mine: "Siva i glatka u busenu", other: "Velika gnojištarka (Jestiva): Bijela i čupava s pomičnim prstenom!" }
    ],
    habitat: "Parkovi, vrtovi, uz panjeve i uz puteve od proljeća do kasne jeseni.",
    kitchen: "Izaziva koprinski sindrom: crvenilo lica, ubrzan puls, gušenje, pad tlaka i povraćanje uz alkohol.",
    season: "Svibanj – Studeni"
  },

  // 21. PRAVA PUZA (MEDENJAČA)
  {
    id: "prava-puza",
    name: "Prava puza (Medenjača)",
    latin: "Armillaria mellea (Vahl. ex Fr.) Karst.",
    folkNames: ["puza", "medenjača", "mraznica", "grmača", "mekinja", "panjevčica", "puzica", "šumski čavao"],
    wikiQuery: "Armillaria_mellea",
    bozacRef: "Svezak 1, br. 95, str. 114",
    status: "WARN",
    statusLabel: "🟡 UVJETNO JESTIVA (PROKUHATI!)",
    hymenium: "listici", growth: "busen", latex: "nema", ring: "samo_vjencic",
    shortSummary: "Omiljena jesenska gljiva Zagorja i Medvednice! Raste u velikim busenima na panjevima, ima medenožuti klobuk s tamnim čehicama, bijele listiće i čvrst bijelo-žuti vjenčić.",
    simpleBullets: [
      "Raste u velikim busenima na panjevima i korijenju u listopadu i studenom.",
      "Ispod klobuka ima čvrst, postojan kožasto-vunasti vjenčić (prsten).",
      "Listići su bijeli do krem (nikada hrđavosmeđi!)."
    ],
    bozacDetails: {
      klobuk: "4–12 cm, medenožut do žućkastosmeđ, u sredini prekriven tamnijim vlaknastim čehicama, rub u starosti narebran.",
      listici: "Bijeli do blijedožućkasti, prirasli do lagano silazni.",
      strucak: "Dug, vlaknast, žilav, u gornjem dijelu nosi čvrst opnast vjenčić.",
      meso: "U klobuku mekano i bijelo, u stručku drvenasto. Otisak spora snježnobijel.",
      spore: "Eliptične, bijele, 8–10 x 5–6 µm."
    },
    lookalikes: [
      { targetId: "rebrasta-patuljica", trait: "Boja listića i klobuk (SMRTNO VAŽNO!)", mine: "Bijeli listići + čehice na klobuku + bijeli otisak spora", other: "Rebrasta patuljica (SMRTONOSNA): Hrđavosmeđi listići + gladak klobuk + hrđavosmeđe spore!" },
      { targetId: "sumporaca", trait: "Boja listića i okus", mine: "Bijeli listići + blag okus", other: "Sumporača (OTROVNA): Sumporasto-zeleni listići + gorka kao pelin!" }
    ],
    habitat: "Panjevi i živo drveće bukve, hrasta i voćaka u jesen (rujan – studeni).",
    kitchen: "Sirova je otrovna! Jedu se SAMO KLOBUCI. Obavezno prokuhati 15 minuta u kipućoj vodi i BACITI prvu vodu prije pripreme ili kiseljenja.",
    season: "Rujan – Studeni"
  },

  // 22. GRMAČA (ČUPAVA GRMAČA / GOLA PUZA)
  {
    id: "grmaca",
    name: "Čupava grmača (Gola puza)",
    latin: "Desarmillaria tabescens (Armillaria tabescens)",
    folkNames: ["grmača", "gola puza", "hrastova grmača", "mraznica bez prstena", "mekinja"],
    wikiQuery: "Desarmillaria_tabescens",
    bozacRef: "Svezak 1, br. 100, str. 118",
    status: "WARN",
    statusLabel: "🟡 UVJETNO JESTIVA (PROKUHATI)",
    hymenium: "listici", growth: "busen", latex: "nema", ring: "bez",
    shortSummary: "Raste u gustim grmovima na panjevima hrasta i kestena. Vrlo slična puzi, ali stručak NIKADA NEMA vjenčić (prsten)!",
    simpleBullets: [
      "Raste u zbijenim busenima uz panjeve bjelogorice.",
      "Klobuk medeno-smeđ s tamnim čehicama, listići bjelkasti.",
      "Stručak je potpuno GOL (nema prsten ni u najmlađoj fazi!)."
    ],
    bozacDetails: {
      klobuk: "4–8 cm, mesnat, medenožut do crvenkastosmeđ, u sredini prekriven tamnim čehastim vlakancima.",
      listici: "Bjelkasti pa blijedo oker, malo se spuštaju niz stručak.",
      strucak: "Dug, zakrivljen, žilav, potpuno bez vjenčića.",
      meso: "Bijelo, ugodna mirisa i okusa.",
      spore: "Bijele, 8–9 x 5–6 µm."
    },
    lookalikes: [
      { targetId: "zavodnica", trait: "Boja listića i mesa", mine: "Bjelkasti listići + bijelo meso", other: "Zavodnica (OTROVNA): Cijela je jarkonarančasta (i listići i meso!)." }
    ],
    habitat: "Panjevi i korijenje hrasta i kestena krajem ljeta i u ranu jesen.",
    kitchen: "Sirova je otrovna. Prokuhati 15 minuta i odliti vodu; jedu se samo klobuci.",
    season: "Kolovoz – Listopad"
  },

  // 23. MALA (PROMJENLJIVA) PANJEVČICA
  {
    id: "mala-panjevcica",
    name: "Mala panjevčica",
    latin: "Kuehneromyces mutabilis (Schff. ex Fr.) Sing.",
    folkNames: ["panjevčica", "promjenljiva panjevčica", "jušna panjevka", "mekinja", "bukova panjevčica"],
    wikiQuery: "Kuehneromyces_mutabilis",
    bozacRef: "Svezak 1, br. 235, str. 212",
    status: "WARN",
    statusLabel: "🟡 VRHUNSKA JESTIVA (SAMO ZA ISKUSNE!)",
    hymenium: "listici", growth: "busen", latex: "nema", ring: "samo_vjencic",
    shortSummary: "Aromatična gljiva bukovih panjeva. Klobuk dvobojan (sušenjem oker u sredini, vodenastosmeđ na rubu), a stručak ISPOD prstena gusto prekriven tamnosmeđim stršećim ljuskicama.",
    simpleBullets: [
      "Klobuk je dvobojan (u sredini suh i oker, uz rub vodenast i tamnosmeđ).",
      "Stručak je ISPOD prstena gusto LJUSKAV (čehast).",
      "Meso miriše ugodno na svježe gljive (nikad na brašno!)."
    ],
    bozacDetails: {
      klobuk: "3–8 cm, higrofan, cimetastosmeđ kad je vlažan, a sušenjem postaje blijedo okeržut.",
      listici: "Gusti, cimetastosmeđi, prirasli.",
      strucak: "Žilav, nosi prstenak; iznad prstena gladak i bjelkast, a ISPOD prstena gusto posut tamnim ljuskicama.",
      meso: "Bjelkasto-žućkasto, vrlo ugodna aromatična mirisa.",
      spore: "Žućkaste, 5–7 x 4–5 µm."
    },
    lookalikes: [
      { targetId: "rebrasta-patuljica", trait: "Stručak ispod prstena i miris (PITANJE ŽIVOTA!)", mine: "Stručak ISPOD prstena LJUSKAV + ugodan gljivlji miris", other: "Rebrasta patuljica (SMRTONOSNA): Stručak ispod prstena GLADAK sa srebrnim nitima + miris na brašno!" }
    ],
    habitat: "Na panjevima bukve i drugog bjelogoričnog drveća od proljeća do studenog.",
    kitchen: "Izvrsna aromatična gljiva za juhe i variva, no zbog smrtonosne dvojnice početnici je ne smiju skupljati!",
    season: "Svibanj – Studeni"
  },

  // 24. PRAVA SUMPORAČA
  {
    id: "sumporaca",
    name: "Prava sumporača",
    latin: "Hypholoma fasciculare (Huds. ex Fr.) Kumm.",
    folkNames: ["sumporača", "žuta panjevčica", "gorka panjevčica", "lažna puza"],
    wikiQuery: "Hypholoma_fasciculare",
    bozacRef: "Svezak 1, br. 212, str. 196",
    status: "DANGER",
    statusLabel: "🔴 OTROVNA (GORKA)",
    hymenium: "listici", growth: "busen", latex: "nema", ring: "bez",
    shortSummary: "Najčešća otrovnica na panjevima! Raste u velikim busenima, ima sumporastožuti klobuk, ZELENKASTOŽUTE listiće, žuto meso i nepodnošljivo je gorka poput pelina.",
    simpleBullets: [
      "Listići su sumporastožuti i ubrzo poprime MASLINASTOZELENU boju.",
      "Meso je sumporastožuto i ekstremno gorko.",
      "Nema pravi kožasti prsten na stručku."
    ],
    bozacDetails: {
      klobuk: "3–7 cm, sumporastožut s narančastosmeđom sredinom, gladak.",
      listici: "Gusti, sumporastožuti pa maslinastozeleni i na kraju ljubičastosmeđi.",
      strucak: "Tanak, šupalj, sumporastožut, pri dnu smećkast, bez prstena.",
      meso: "Žuto, vrlo gorko, miris neugodan.",
      spore: "Ljubičastosmeđe, 7–8 x 4–5 µm."
    },
    lookalikes: [
      { targetId: "prava-puza", trait: "Boja listića i okus", mine: "Zeleni listići + žuto meso + gorka", other: "Prava puza (Uvjetno jestiva): Bijeli listići + bijelo meso + kožasti vjenčić!" },
      { targetId: "mala-panjevcica", trait: "Boja listića i stručak", mine: "Sumporasto-zeleni listići", other: "Mala panjevčica: Cimetastosmeđi listići + ljuskav stručak." }
    ],
    habitat: "Na panjevima i trulom drvetu tijekom cijele godine.",
    kitchen: "OTROVNA! Izaziva teške probavne smetnje i grčeve.",
    season: "Travanj – Prosinac"
  },

  // 25. REBRASTA PATULJICA
  {
    id: "rebrasta-patuljica",
    name: "Rebrasta patuljica (Pogubna kapica)",
    latin: "Galerina marginata (Batsch) Kühner",
    folkNames: ["pogubna kapica", "smrtonosna panjevčica", "lažna panjevčica", "rebrasta kapica"],
    wikiQuery: "Galerina_marginata",
    bozacRef: "Svezak 1, br. 260 i 261, str. 230",
    status: "DANGER",
    statusLabel: "🔴 SMRTNO OTROVNA",
    hymenium: "listici", growth: "drvo", latex: "nema", ring: "samo_vjencic",
    shortSummary: "Smrtonosna gljiva s panjeva koja sadrži iste amatoksine kao zelena pupavka! Klobuk je gladak i vodenast, listići hrđavosmeđi, a stručak ispod prstena ima srebrnasta vlakna (bez ljusaka).",
    simpleBullets: [
      "Listići su oker do HRĐAVOSMEĐI (nikada bijeli!).",
      "Stručak ispod prstena je GLADAK s uzdužnim srebrnastim vlakancima (nema stršeće ljuske!).",
      "Meso miriše na brašno i sadrži smrtonosne amatoksine."
    ],
    bozacDetails: {
      klobuk: "1,5–4 cm, higrofan, po vlažnom vremenu oker-smeđ s prozirno narebranim rubom, gladak.",
      listici: "Gusti, cimetasto-hrđavosmeđi.",
      strucak: "Tanak, šupalj, nosi mali vjenčić, ispod vjenčića je pokriven bjelkastim vlakancima (nikada čehast!).",
      meso: "Tanko, oker, miris i okus na brašno.",
      spore: "Hrđavosmeđe, eliptične, 8–10,5 x 5–6 µm."
    },
    lookalikes: [
      { targetId: "mala-panjevcica", trait: "Stručak ispod vjenčića (PITANJE ŽIVOTA!)", mine: "GLADAK stručak sa srebrnim nitima + miris na brašno", other: "Mala panjevčica: Gusto LJUSKAV stručak ispod vjenčića + ugodan gljivlji miris!" },
      { targetId: "prava-puza", trait: "Boja listića i spora", mine: "Hrđavosmeđi listići i spore", other: "Prava puza: Bijeli listići i bijele spore!" }
    ],
    habitat: "Panjevi i srušena debla crnogorice i bjelogorice u jesen.",
    kitchen: "SMRTONOSNA!",
    season: "Kolovoz – Studeni"
  },

  // 26. PLANINSKA (SMRTONOSNA) KOPRENKA
  {
    id: "planinska-koprenka",
    name: "Planinska (smrtonosna) koprenka",
    latin: "Cortinarius orellanus Fries",
    folkNames: ["smrtonosna koprenka", "crvenjača", "orelaninska koprenka", "hrđava koprenka"],
    wikiQuery: "Cortinarius_orellanus",
    bozacRef: "Svezak 1, br. 284, str. 246",
    status: "DANGER",
    statusLabel: "🔴 SMRTNO OTROVNA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Najpodmuklija gljiva Europe! Klobuk i listići boje hrđe ili cimeta s paučinastim nitima. Otrov orelanin razara bubrege s odgođenim djelovanjem od 3 do 14 dana nakon jela!",
    simpleBullets: [
      "Cijela gljiva je tople lisnato-narančastosmeđe do hrđave boje.",
      "Listići su debeli, rijetki i boje hrđe/cimeta.",
      "U mladosti ima paučinastu koprenu (cortinu) između klobuka i stručka."
    ],
    bozacDetails: {
      klobuk: "3–8,5 cm, stožasto konveksan s tupim ispupčenjem, fino baršunast, narančasto-hrđavosmeđ.",
      listici: "Rijetki, debeli, cimetasti pa hrđavosmeđi.",
      strucak: "Valjkast, pun, žućkast sa smeđim vlaknima koprene, bez prstena.",
      meso: "Žućkasto do hrđasto, miris na rotkvicu. Reakcija: s KOH meso postane smeđe.",
      spore: "Eliptične, bradavičaste, 8,5–12 x 5,5–7 µm."
    },
    lookalikes: [
      { targetId: "lisicica", trait: "Trusište ispod klobuka", mine: "Pravi listići boje hrđe + paučinasta koprena", other: "Lisičica (Jestiva): Debele račvaste žute letvice koje se spuštaju niz stručak!" }
    ],
    habitat: "Toplije hrastove i bukove šume u ljeto i jesen.",
    kitchen: "SMRTONOSNA! Izaziva potpuno i nepovratno zatajenje bubrega. Zlatno pravilo: Nikada ne sakupljati gljive sa smeđim listićima i paučinastim nitima!",
    season: "Srpanj – Listopad"
  },

  // 27. OLOVASTA RUDOLISKA
  {
    id: "olovna-rudoliska",
    name: "Olovasta rudoliska",
    latin: "Entoloma sinuatum (Bull. ex Fr.) Kummer",
    synonyms: "Entoloma lividum Bull.",
    folkNames: ["rudoliska", "velika rudoliska", "brašnjarica otrovna", "lažna đurđevača", "olovka"],
    wikiQuery: "Entoloma_sinuatum",
    bozacRef: "Svezak 1, br. 431, str. 346",
    status: "DANGER",
    statusLabel: "🔴 TEŠKO OTROVNA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Velika i privlačna gljiva koja miriše na svježe brašno! Klobuk olovnosivkast ili boje bijele kave, a listići iz žućkastih prelaze u RUŽIČASTE i izrezani su uz stručak.",
    simpleBullets: [
      "Listići su u mladosti žućkasti, a u zrelosti postanu mesnato RUŽIČASTI.",
      "Listići su uz stručak izrezani sa zupcem (ne spuštaju se niz stručak).",
      "Ima jak i ugodan miris na svježe brašno, no izaziva teška trovanja!"
    ],
    bozacDetails: {
      klobuk: "6–15 cm, mesnat, bjelkast do olovnosivkast, gladak i sjajan.",
      listici: "Široki, prirasli sa zupcem, najprije blijedožućkasti, zatim losos-ružičasti.",
      strucak: "Čvrst, bijel, u dnu zadebljan, bez prstena.",
      meso: "Bijelo, čvrsto, miriše na svježe brašno.",
      spore: "Karakteristično uglate (višekutne), ružičaste, 8–10 x 7–8 µm."
    },
    lookalikes: [
      { targetId: "siva-maglenka", trait: "Boja listića i silaznost", mine: "Listići RUŽIČASTI i izrezani uz stručak", other: "Siva maglenka (Uvjetno jestiva): Listići krem-bjelkasti i spuštaju se niz stručak!" },
      { targetId: "djurdjevaca", trait: "Sezona rasta i listići", mine: "Raste u ljeto/jesen + ružičasti listići", other: "Đurđevača (Jestiva): Raste u rano proljeće (travanj/svibanj) + bijeli listići." }
    ],
    habitat: "Bjelogorične šume hrasta i bukve na vapnencu u ljeto i jesen.",
    kitchen: "TEŠKO OTROVNA! Izaziva silovite želučano-crijevne bolove i zatajenje cirkulacije.",
    season: "Srpanj – Listopad"
  },

  // 28. SIVA MAGLENKA
  {
    id: "siva-maglenka",
    name: "Siva maglenka",
    latin: "Clitocybe nebularis (Batsch. ex Fr.) Kumm.",
    folkNames: ["maglenka", "maglen", "sivkasta grlašica", "jesenska maglenka", "mrazovka"],
    wikiQuery: "Clitocybe_nebularis",
    bozacRef: "Svezak 1, br. 692, str. 528",
    status: "WARN",
    statusLabel: "🟡 UVJETNO JESTIVA (PROKUHATI)",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Kasnojesenska gljiva koja na Medvednici masovno stvara viline krugove u listopadu i studenom. Pepeljastosivi klobuk, gusti silazni krem listići i jak aromatičan miris.",
    simpleBullets: [
      "Klobuk je pepeljastosiv, kao posut maglenim injem.",
      "Listići su gusti, bjelkasto-žućkasti i blago silazni niz stručak (nikad ružičasti!).",
      "Vrlo jak, slatkasto-aromatičan miris."
    ],
    bozacDetails: {
      klobuk: "6–20 cm, mesnat, pepeljastosiv do sivosmeđ, u mladosti s bijelim prahom.",
      listici: "Vrlo gusti, krem do blijedožućkasti, silazni niz stručak.",
      strucak: "6–15 cm, spužvast, u dnu batasto zadebljan s ostacima bijelog micelija, bez prstena.",
      meso: "Bijelo, čvrsto, vrlo jakog specifičnog mirisa.",
      spore: "Blijedožućkaste, ovalne, 6–8 x 3–4 µm."
    },
    lookalikes: [
      { targetId: "olovna-rudoliska", trait: "Boja listića i miris (PAZI!)", mine: "Krem-bjelkasti listići koji silaze niz stručak + aromatičan miris", other: "Olovasta rudoliska (TEŠKO OTROVNA!): Listići postaju RUŽIČASTI + miris na brašno!" }
    ],
    habitat: "Bukove, hrastove i smrekove šume u kasnu jesen (listopad – prosinac).",
    kitchen: "Sirova je otrovna. Obavezno prokuhati 15 minuta i odliti vodu. Najbolja za kiseljenje u manjim količinama.",
    season: "Listopad – Prosinac"
  },

  // 29. MODRIKAČA (MODRA KOTURNICA)
  {
    id: "modrikaca",
    name: "Modra koturnica (Modrikača)",
    latin: "Lepista nuda (Bull. ex Fr.) Cooke",
    folkNames: ["modrikača", "ljubičasta koturnica", "plavka", "modrača", "mraznica ljubičasta"],
    wikiQuery: "Lepista_nuda",
    bozacRef: "Svezak 1, br. 655, str. 502",
    status: "WARN",
    statusLabel: "🟡 UVJETNO JESTIVA (PROKUHATI)",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Prekrasna kasnojesenska gljiva žive ljubičaste boje! Raste u šušnju u krugovima, nema paučinastu koprenu, a listići ostaju ljubičasti bez smeđeg praha.",
    simpleBullets: [
      "Klobuk, listići i stručak su žive ljubičaste do plavoljubičaste boje.",
      "NEMA paučinu niti hrđavosmeđi prah na stručku.",
      "Ima ugodan voćni miris."
    ],
    bozacDetails: {
      klobuk: "5–15 cm, gladak, vlažan, intenzivno ljubičast pa sivosmeđast.",
      listici: "Gusti, ljubičasti, lako se odvajaju od klobuka.",
      strucak: "Ljubičast, valjkast, u dnu zadebljan i obrastao ljubičastim micelijem, bez prstena.",
      meso: "Bjelkastoljubičasto, ugodna mirisa.",
      spore: "Blijedoružičaste, sitno bradavičaste, 6–8 x 4–5 µm."
    },
    lookalikes: [
      { targetId: "dvobojna-koturnica", trait: "Boja klobuka i listića", mine: "Cijela gljiva (i klobuk i listići i stručak) je ljubičasta", other: "Dvobojna koturnica (Jestiva): Samo je stručak ljubičast, a klobuk i listići su krem-kožnati!" },
      { targetId: "planinska-koprenka", trait: "Paučina i boja spora", mine: "Ljubičasti listići + nema paučinu + ružičasti prah spora", other: "Koprenke (Cortinarius): Paučinasta koprena na stručku + hrđavosmeđe spore!" }
    ],
    habitat: "Bogata šumska tla s debelim slojem lišća i komposta od listopada do prosinca.",
    kitchen: "Sirova je otrovna (hemolizini)! Prokuhati ili dobro ispeći; izvrsna za dinstanje i kiseljenje.",
    season: "Listopad – Prosinac"
  },

  // 30. VILIN KLINČAC
  {
    id: "vilin-klincac",
    name: "Vilin klinčac",
    latin: "Marasmius oreades (Bolg. ex Fr.) Fries",
    folkNames: ["klinčac", "klinček", "vilinsko kolo", "livadni klinčac", "sušica"],
    wikiQuery: "Marasmius_oreades",
    bozacRef: "Svezak 1, br. 533, str. 418",
    status: "SAFE",
    statusLabel: "🟢 IZVRSNA JESTIVA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Mala livadna gljiva s pašnjaka i dvorišta koja raste u vilinim krugovima. RIJETKI razmaknuti listići, grbica na klobuku i elastičan žilav stručak koji se može zavrnuti bez pucanja.",
    simpleBullets: [
      "Listići su izrazito RIJETKI (razmaknuti) i krem-boje.",
      "Stručak je tanak i žilav – može se omotati oko prsta a da ne pukne.",
      "Klobuk oker-boje s tupom grbicom u sredini."
    ],
    bozacDetails: {
      klobuk: "2–5 cm, konveksan s tupim ispupčenjem, oker-kožnate boje, po kiši vodenast.",
      listici: "Rijetki, debeli, slobodni, bjelkasti do krem.",
      strucak: "4–7 cm, tanak, pun, žilav i elastičan, bez prstena.",
      meso: "Bjelkasto, ugodna mirisa na klinčiće ili bademe.",
      spore: "Bijele, eliptične, 8–10 x 5–7 µm."
    },
    lookalikes: [
      { targetId: "otrovna-brasnjaca", trait: "Gustoća listića i klobuk", mine: "RIJETKI listići + grbica na klobuku + žilav stručak", other: "Otrovna brašnjača (SMRTONOSNA): GUSTI silazni listići + ulegnut bijeli klobuk!" }
    ],
    habitat: "Livadni krugovi na pašnjacima i parkovima od svibnja do studenog.",
    kitchen: "Klobuci su jedna od najboljih gljiva za juhu.",
    season: "Svibanj – Studeni"
  },

  // 31. OTROVNA BRAŠNJAČA
  {
    id: "otrovna-brasnjaca",
    name: "Otrovna brašnjača (Bijela grlašica)",
    latin: "Clitocybe dealbata (Sow. ex Fr.) Kummer",
    folkNames: ["bijela grlašica", "brašnjača", "travnata grlašica", "otrovni klinčac"],
    wikiQuery: "Clitocybe_dealbata",
    bozacRef: "Svezak 1, br. 705, str. 538",
    status: "DANGER",
    statusLabel: "🔴 SMRTNO OTROVNA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Mala bjelkasta livadna otrovnica koja raste u istim krugovima u travi kao vilin klinčac! Sadrži visoke doze muskarina.",
    simpleBullets: [
      "Klobuk je bijel, u sredini ULEGNUT (nema grbicu!).",
      "Listići su GUSTI i spuštaju se niz stručak (nisu rijetki!).",
      "Raste po livadama i parkovima."
    ],
    bozacDetails: {
      klobuk: "2–5 cm, bjelkast s okerastim mrljama, ulegnut.",
      listici: "Gusti, uski, bjelkasti, spuštaju se niz stručak.",
      strucak: "3–4 cm, tanak, bjelkast, bez prstena.",
      meso: "Bijelo, miriše na svježe brašno.",
      spore: "Bijele, 4–5 x 2–3,5 µm."
    },
    lookalikes: [
      { targetId: "vilin-klincac", trait: "Listići i klobuk", mine: "GUSTI silazni listići + ulegnut klobuk", other: "Vilin klinčac (Jestiv): RIJETKI slobodni listići + grbica na klobuku!" }
    ],
    habitat: "Livade, pašnjaci i travnjaci od ljeta do jeseni.",
    kitchen: "SMRTNO OTROVNA (muskarinski sindrom).",
    season: "Srpanj – Studeni"
  },

  // 32. PLEMENITA (BOROVA) RUJNICA
  {
    id: "plemenita-rujnica",
    name: "Plemenita (borova) rujnica",
    latin: "Lactarius deliciosus Linn. ex Fries",
    folkNames: ["rujnica", "briza", "borovka", "borova rujnica", "mrkvica", "rujevka", "brinjovka"],
    wikiQuery: "Lactarius_deliciosus",
    bozacRef: "Svezak 2, br. 741, str. 60",
    status: "SAFE",
    statusLabel: "🟢 VRHUNSKA DELIKATESA",
    hymenium: "listici", growth: "tlo", latex: "narancasto", ring: "bez",
    shortSummary: "Vrhunska gljiva borovih šuma! Na prerezu pušta gusto NARANČASTO mlijeko boje mrkve koje dugo ostaje narančasto, a na oštećenjima poprimi zelenu boju patine.",
    simpleBullets: [
      "Raste isključivo pod borovima.",
      "Na prerezu pušta gusto NARANČASTO mlijeko boje mrkve (nikad bijelo!).",
      "Klobuk ima koncentrične krugove i na dodir polako pozeleni."
    ],
    bozacDetails: {
      klobuk: "5–12 cm, ulegnut, narančast s tamnijim krugovima i zelenim mrljama.",
      listici: "Gusti, narančasti, na pritisak pozelene.",
      strucak: "3–8 cm, šupalj, narančast s tamnijim jamicama.",
      meso: "Krhko, pušta narančasto mlijeko slatkasta okusa.",
      spore: "Otrusina oker-smeđa, spore 7–9 x 6–7 µm."
    },
    lookalikes: [
      { targetId: "runjava-mlijecnica", trait: "Mlijeko i rub klobuka (PAZI!)", mine: "NARANČASTO mlijeko + gladak rub (pod borom)", other: "Runjava mliječnica (OTROVNA): BIJELO papreno mlijeko + dlakav čupav rub (pod brezom)!" },
      { targetId: "smrekova-rujnica", trait: "Stanište", mine: "Raste pod borom", other: "Smrekova rujnica: Raste pod smrekom, malo gorkasta." }
    ],
    habitat: "Borove šume od rujna do studenog.",
    kitchen: "Delikatesa na žaru ili tavi. Prije zamrzavanja blanširati 2 min.",
    season: "Rujan – Studeni"
  },

  // 33. SMREKINA RUJNICA
  {
    id: "smrekova-rujnica",
    name: "Smrekina rujnica",
    latin: "Lactarius deterrimus Gröger",
    folkNames: ["smrečnica", "briza", "smrekova rujnica", "zelena rujnica", "jelovka"],
    wikiQuery: "Lactarius_deterrimus",
    bozacRef: "Svezak 2, br. 742, str. 60",
    status: "SAFE",
    statusLabel: "🟢 JESTIVA",
    hymenium: "listici", growth: "tlo", latex: "narancasto", ring: "bez",
    shortSummary: "Česta rujnica u smrekovim šumama Medvednice i Zagorja. Pušta narančasto mlijeko koje za 15–20 minuta postane crvenoljubičasto, a klobuk brzo sav pozeleni.",
    simpleBullets: [
      "Raste isključivo ispod smreka (Picea abies).",
      "Narančasto mlijeko za 15-ak minuta na zraku pocrveni.",
      "Klobuk vrlo brzo poprimi jake zelene mrlje."
    ],
    bozacDetails: {
      klobuk: "5–10 cm, narančast, bez jasnih krugova, brzo cijeli pozeleni.",
      listici: "Narančasti, silazni, na dodir zelene.",
      strucak: "Šupalj, bez jamica, gore s bijelim pojasom.",
      meso: "Narančasto mlijeko koje tamni u vinskocrveno, okus malo gorkast.",
      spore: "Bradavičave, 7,5–10 x 6–7,5 µm."
    },
    lookalikes: [
      { targetId: "plemenita-rujnica", trait: "Stablo i jamice na stručku", mine: "Pod smrekom + stručak bez jamica", other: "Plemenita rujnica: Pod borom + stručak s jamicama." }
    ],
    habitat: "Smrekove šume od kolovoza do studenog.",
    kitchen: "Dobra na tavi ili ukiseljena.",
    season: "Kolovoz – Studeni"
  },

  // 34. RUNJAVA MLIJEČNICA (BREZOVKA)
  {
    id: "runjava-mlijecnica",
    name: "Runjava mliječnica (Brezovka)",
    latin: "Lactarius torminosus (Schff. ex Fr.) Gray",
    folkNames: ["brezovka", "dlakava mliječnica", "lažna rujnica", "čupava mliječnica", "brezova rujnica"],
    wikiQuery: "Lactarius_torminosus",
    bozacRef: "Svezak 2, br. 748, str. 66",
    status: "DANGER",
    statusLabel: "🔴 OTROVNA",
    hymenium: "listici", growth: "tlo", latex: "bijelo", ring: "bez",
    shortSummary: "Opasna dvojnica rujnice! Klobuk ružičasto-narančast s krugovima, ali je rub klobuka gusto VUNASTO ČUPAV, raste pod brezom i pušta BIJELO papreno mlijeko!",
    simpleBullets: [
      "Pušta BIJELO mlijeko (nikad narančasto!) koje žestoko peče jezik.",
      "Rub klobuka je jako podvijen i gusto pokriven dlakama poput vune.",
      "Raste isključivo pod brezama."
    ],
    bozacDetails: {
      klobuk: "4–12 cm, ljevkast, ružičasto-narančast s krugovima, rub jako čupav i dlakav.",
      listici: "Bjelkasti do blijedoružičasti, silazni.",
      strucak: "Šupalj, blijedoružičast.",
      meso: "Bijelo, pušta obilno bijelo mlijeko izrazito paprenog okusa.",
      spore: "Okruglaste, 8–10 x 6–7 µm."
    },
    lookalikes: [
      { targetId: "plemenita-rujnica", trait: "Boja mlijeka i rub klobuka", mine: "BIJELO papreno mlijeko + čupav rub (pod brezom)", other: "Rujnice (Jestive): NARANČASTO mlijeko + gladak rub (pod borom/smrekom)!" }
    ],
    habitat: "Ispod breza ljeti i u jesen.",
    kitchen: "OTROVNA! Izaziva teške želučano-crijevne bolove.",
    season: "Srpanj – Studeni"
  },

  // 35. GOLUBAČA (LJUBIČASTOZELENA KRASNICA)
  {
    id: "golubaca",
    name: "Ljubičastozelena krasnica (Golubača)",
    latin: "Russula cyanoxantha (Schff.) Fr.",
    folkNames: ["golubača", "golubica", "sivka", "kokošica", "modra krasnica", "masna golubača"],
    wikiQuery: "Russula_cyanoxantha",
    bozacRef: "Svezak 2, br. 812, str. 112",
    status: "SAFE",
    statusLabel: "🟢 VRHUNSKA JESTIVA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Kraljica krasnica! Klobuk šaren u tonovima ljubičaste i zelene boje, a njezini bijeli listići su jedini među krasnicama ELASTIČNI ('masni') i ne lome se kad prijeđeš prstom!",
    simpleBullets: [
      "Klobuk šaren poput golubljeg perja (ljubičast, zelenkast, sivosmeđ).",
      "Listići su na dodir ELASTIČNI i savitljivi (ne pucaju pod prstom!).",
      "Stručak puca poput krede, nema prsten ni ovoj."
    ],
    bozacDetails: {
      klobuk: "5–15 cm, tvrd, ulegnut, ljubičast, zelenkast i sivosmeđ.",
      listici: "Bijeli, račvasti, mekani i elastični (masni na dodir).",
      strucak: "Bijel, tvrd, puca kao kreda, bez prstena i bez ovoja.",
      meso: "Bijelo, čvrsto, blagog okusa po lješnjacima.",
      spore: "Bijele, okruglaste, 7–9 x 6–7 µm."
    },
    lookalikes: [
      { targetId: "zelena-pupavka", trait: "Prsten i ovoj", mine: "NEMA prsten ni ovoj + stručak puca kao kreda", other: "Zelena pupavka (SMRTONOSNA): IMA prsten i vrećicu u dnu!" },
      { targetId: "bljuvara", trait: "Listići i okus", mine: "Elastični listići + blag okus", other: "Bljuvara (OTROVNA): Krhki listići + žestoko ljuta!" }
    ],
    habitat: "Bukove i hrastove šume od lipnja do studenog.",
    kitchen: "Vrhunska za žar, tavu, gulaše.",
    season: "Lipanj – Studeni"
  },

  // 36. ZELENA KRASNICA
  {
    id: "zelena-krasnica",
    name: "Zelena krasnica (Bradavičasta golubača)",
    latin: "Russula virescens (Schff.) Fr.",
    folkNames: ["zelena golubača", "zelenka", "kokošica", "kravica", "ispucana golubača", "golubača"],
    wikiQuery: "Russula_virescens",
    bozacRef: "Svezak 2, br. 804, str. 106",
    status: "SAFE",
    statusLabel: "🟢 VRHUNSKA DELIKATESA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Najcjenjenija krasnica! Zeleni klobuk je suh i karakteristično ispucan u sitna bradavičasta polja (poput plavog sira), a stručak puca kao kreda i nema prsten ni ovoj.",
    simpleBullets: [
      "Zeleni klobuk je suh i ispucan u sitna višekutna polja.",
      "Stručak je čisto bijel, puca kao kreda i NEMA ni prsten ni čašicu!",
      "Meso je tvrdo i blagog, orašastog okusa."
    ],
    bozacDetails: {
      klobuk: "5–15 cm, mesnat, zelenkasto-plavkast, kožica raspucana na sitne bradavice.",
      listici: "Bijeli do krem, krhki i lomljivi.",
      strucak: "Bijel, tvrd, bez prstena i bez ovoja.",
      meso: "Bijelo, tvrdo, okus po lješnjacima.",
      spore: "Okruglaste, 6–9 x 5–7 µm."
    },
    lookalikes: [
      { targetId: "zelena-pupavka", trait: "Kožica klobuka i ovoj", mine: "Ispucan zelen klobuk + NEMA prsten ni ovoj", other: "Zelena pupavka (SMRTONOSNA): Glatka kožica + IMA prsten i bijelu vrećicu u dnu!" }
    ],
    habitat: "Hrastove i bukove šume u ljeto i ranu jesen.",
    kitchen: "Vrhunska na žaru s malo krupne soli.",
    season: "Lipanj – Listopad"
  },

  // 37. KRASNICA BLJUVARA
  {
    id: "bljuvara",
    name: "Krasnica bljuvara",
    latin: "Russula emetica (Schff. ex Fr.) Pers.",
    folkNames: ["bljuvara", "crvena bljuvara", "paprena krasnica", "vragolinka", "ljuta crvenka"],
    wikiQuery: "Russula_emetica",
    bozacRef: "Svezak 2, br. 831, str. 126",
    status: "DANGER",
    statusLabel: "🔴 OTROVNA (PAPRENA)",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Jarkocrvena krasnica sa snježnobijelim listićima i stručkom. Mrvica mesa na vrhu jezika peče poput najljuće paprike!",
    simpleBullets: [
      "Klobuk je jarkocrven poput trešnje, a listići i stručak snježnobijeli.",
      "Meso je nepodnošljivo papreno i peče.",
      "Nema točkice, nema prsten, nema ovoj."
    ],
    bozacDetails: {
      klobuk: "4–10 cm, jarkocrven, sjajan, kožica se lako guli.",
      listici: "Čisto bijeli, krhki.",
      strucak: "Bijel, spužvast, puca kao kreda.",
      meso: "Bijelo, izrazito paprenog i ljutog okusa.",
      spore: "Okruglaste, 8–10 x 7–8 µm."
    },
    lookalikes: [
      { targetId: "golubaca", trait: "Boja i okus", mine: "Jarkocrvena + peče kao paprika", other: "Golubača (Jestiva): Ljubičasto-zelena + blag okus po lješnjacima." }
    ],
    habitat: "Vlažne šume smreke i bukve.",
    kitchen: "OTROVNA! Pravilo za krasnice: blage su jestive, ljute i gorke nisu!",
    season: "Srpanj – Studeni"
  },

  // 38. JESENSKI (PRAVI) VRGANJ
  {
    id: "jesenski-vrganj",
    name: "Jesenski (pravi) vrganj",
    latin: "Boletus edulis Bull. ex Fries",
    folkNames: ["jurček", "jesenec", "pravi vrganj", "bijeli vrganj", "hrženjak", "vrganj", "bukov vrganj", "šumski kruh"],
    wikiQuery: "Boletus_edulis",
    bozacRef: "Svezak 2, br. 1069, str. 294",
    status: "SAFE",
    statusLabel: "🟢 VRHUNSKA DELIKATESA",
    hymenium: "cjevcice", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Kralj jesenskih šuma! Smeđi klobuk sa svijetlim rubom, spužva bijela pa žutozelena, na stručku reljefna BIJELA mrežica, a meso nikada ne plavi.",
    simpleBullets: [
      "Ispod klobuka je spužva (bijela pa žutozelena, nikad crvena!).",
      "Na stručku se jasno vidi fina reljefna BIJELA mrežica.",
      "Čvrsto bijelo meso na prerezu NE MIJENJA boju (ne plavi!)."
    ],
    bozacDetails: {
      klobuk: "7–25 cm, polukuglast pa otvoren, kestenjastosmeđ sa svjetlijim rubom.",
      listici: "Cjevčice i pore najprije bijele, zatim žute i maslinastozelene.",
      strucak: "Trbušast, svijetlosmeđ, u gornjem dijelu s bijelom mrežicom.",
      meso: "Bijelo (ispod kožice klobuka smeđecrvenkasto), ne plavi, ugodna mirisa.",
      spore: "Vretenaste, 14–19 x 4–6 µm."
    },
    lookalikes: [
      { targetId: "zucara", trait: "Mrežica, pore i okus", mine: "Bijela mrežica + žutozelene pore + slatkast okus", other: "Žučara (Nejestiva): Tamnosmeđa mrežica + ružičaste pore + gorka kao žuč!" },
      { targetId: "ludara", trait: "Boja pora i plavljenje", mine: "Bijelo/žute pore + meso NE plavi", other: "Ludara (OTROVNA): Crvene pore + meso plavi!" }
    ],
    habitat: "Bukove, hrastove, kestenove i smrekove šume od lipnja do studenog.",
    kitchen: "Vrhunska delikatesa: za sušenje, tavu, zamrzavanje.",
    season: "Lipanj – Studeni"
  },

  // 39. RASPUCANI (LJETNI) VRGANJ
  {
    id: "raspucani-vrganj",
    name: "Raspucani (ljetni) vrganj",
    latin: "Boletus reticulatus (Boletus aestivalis)",
    folkNames: ["ljetni vrganj", "jurček", "hrženjak", "mrežasti vrganj", "proljetni vrganj", "hrastov vrganj"],
    wikiQuery: "Boletus_reticulatus",
    bozacRef: "Svezak 2, br. 1070, str. 294",
    status: "SAFE",
    statusLabel: "🟢 VRHUNSKA DELIKATESA",
    hymenium: "cjevcice", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Prvi vrganj sezone (kreće u svibnju)! Klobuk suh i baršunast, često mrežasto raspucan na suncu, mrežica pokriva cijeli stručak, a miris je najjači među vrganjima.",
    simpleBullets: [
      "Klobuk je suh, baršunast i često raspucan u sitna polja.",
      "Mrežica se pruža duž cijelog stručka sve do dna.",
      "Meso je bijelo i ne plavi."
    ],
    bozacDetails: {
      klobuk: "6–20 cm, svijetlosmeđ do oker, suh i raspucan.",
      listici: "Cjevčice bijele pa žutozelene.",
      strucak: "Smećkast, cijelom dužinom s bjelkastom mrežicom.",
      meso: "Bijelo i ispod kožice klobuka, ne plavi, izrazito aromatično.",
      spore: "Eliptično vretenaste, 13–17 x 4–5 µm."
    },
    lookalikes: [
      { targetId: "zucara", trait: "Pore i okus", mine: "Žutozelene pore + aromatičan miris", other: "Žučara: Ružičaste pore + gorka kao žuč." }
    ],
    habitat: "Toplije hrastove i bukove šume od svibnja do rujna.",
    kitchen: "Najbolji za sušenje zbog intenzivne arome.",
    season: "Svibanj – Rujan"
  },

  // 40. BOROV (CRVENI) VRGANJ
  {
    id: "borov-vrganj",
    name: "Borov (crveni) vrganj",
    latin: "Boletus pinophilus (Boletus pinicola)",
    folkNames: ["borovik", "crveni vrganj", "borov jurček", "mahagonij vrganj", "jesenec crveni"],
    wikiQuery: "Boletus_pinophilus",
    bozacRef: "Svezak 2, br. 1068, str. 292",
    status: "SAFE",
    statusLabel: "🟢 VRHUNSKA DELIKATESA",
    hymenium: "cjevcice", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Najteži i najčvršći vrganj! Prekrasan crvenosmeđi klobuk boje mahagonija, izuzetno debeli trbušasti stručak i čvrsto bijelo meso koje ne plavi.",
    simpleBullets: [
      "Klobuk je crvenosmeđe boje mahagonija.",
      "Stručak je vrlo debeo s crvenkasto-bijelom mrežicom.",
      "Meso je izuzetno tvrdo i ne mijenja boju."
    ],
    bozacDetails: {
      klobuk: "8–25 cm, crvenosmeđ do kestenjast, u mladosti s bijelim prahom.",
      listici: "Cjevčice bijele pa žuto-maslinaste.",
      strucak: "Trbušast, crvenkastosmeđ s finom mrežicom.",
      meso: "Bijelo, pod kožicom klobuka vinskocrveno, ne plavi.",
      spore: "Vretenaste, 14–19 x 4–6 µm."
    },
    lookalikes: [
      { targetId: "jesenski-vrganj", trait: "Boja klobuka", mine: "Crvenosmeđ (mahagonij) klobuk", other: "Jesenski vrganj: Smeđi klobuk sa svijetlim rubom." }
    ],
    habitat: "Bukove, borove i smrekove šume u proljeće i jesen.",
    kitchen: "Zadržava najbolju čvrstoću pri kuhanju i kiseljenju.",
    season: "Svibanj – Lipanj & Rujan – Studeni"
  },

  // 41. KOSTANJEVKA (KESTENOV VRGANJ)
  {
    id: "kostanjevka",
    name: "Kestenov vrganj (Kostanjevka / Kestenjasti vrganj)",
    latin: "Imleria badia (Xerocomus badius)",
    synonyms: "Boletus badius Fr.",
    folkNames: ["kostanjevka", "kostanjevec", "kestenjar", "borovik", "modrikaš", "plavac", "maron"],
    wikiQuery: "Imleria_badia",
    bozacRef: "Svezak 2, br. 1117, str. 326",
    status: "SAFE",
    statusLabel: "🟢 IZVRSNA JESTIVA",
    regions: ["karlovac", "medvednica_zagorje", "gorski_kotar", "slavonija"],
    hymenium: "cjevcice", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Omiljeni jesenski vrganj kestenovih i crnogoričnih šuma Pokuplja, Banovine (Petrova i Zrinska gora), Karlovca, Medvednice i Gorskog kotara! Kestenjastosmeđi klobuk, stručak bez mrežice, a žute pore ispod klobuka na dodir prstom odmah tamno POPLAVE.",
    simpleBullets: [
      "Žute pore na pritisak prsta odmah modro-zeleno POPLAVE.",
      "Klobuk je tamno kestenjastosmeđ (boje pitomog kestena), a stručak nema mrežicu.",
      "Raste masovno u kestenovim, bukovim i crnogoričnim šumama u jesen."
    ],
    bozacDetails: {
      klobuk: "4–14 cm, polukuglast pa jastučast, kestenjastosmeđ do čokoladnosmeđ, u mladosti baršunast, za kiše ljepljiv i sjajan.",
      listici: "Cjevčice duge, prirasle, blijedožute pa žutozelene; pore uglate, na pritisak prsta trenutačno poplave.",
      strucak: "5–12 cm, valjkast, čvrst, svijetlosmeđ s uzdužnim smeđim vlakancima, uvijek BEZ mrežice.",
      meso: "Čvrsto, bjelkasto-žućkasto, iznad cjevčica na prerezu lagano poplavi, ugodna voćnog mirisa i slatkasta okusa.",
      spore: "Vretenaste, glatke, maslinastosmeđe, 12–15 x 4,5–5,5 µm."
    },
    lookalikes: [
      { targetId: "ludara", trait: "Boja pora i klobuka", mine: "Žute pore koje plave + kestenjastosmeđi klobuk", other: "Ludara (OTROVNA): Crvene pore + bjelkast klobuk!" },
      { targetId: "zucara", trait: "Boja pora i okus", mine: "Žutozelene pore koje plave + blag okus", other: "Žučara (Nejestiva): Ružičaste pore + tamna mrežica + gorka kao žuč!" }
    ],
    habitat: "Kestenove, bukove i crnogorične šume Pokuplja, Banovine, Korduna, Medvednice i Gorskog kotara od kolovoza do studenog.",
    kitchen: "Izvrsna gljiva koja rijetko biva crvljiva; vrhunska za dinstanje, sušenje, gulaše i kiseljenje.",
    season: "Kolovoz – Studeni"
  },

  // 42. ŽUČARA (GORKI VRGANJ)
  {
    id: "zucara",
    name: "Gorki vrganj (Žučara)",
    latin: "Tylopilus felleus (Bull. ex Fr.) Karst.",
    folkNames: ["žučara", "žučnjak", "lažni vrganj", "gorčak", "divlji vrganj"],
    wikiQuery: "Tylopilus_felleus",
    bozacRef: "Svezak 2, br. 1166, str. 362",
    status: "DANGER",
    statusLabel: "🔴 NEJESTIVA (EKSTREMNO GORKA)",
    hymenium: "cjevcice", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Lažni vrganj koji upropasti cijelo jelo! Ima TAMNU smeđu mrežicu na stručku, RUŽIČASTU spužvu i nepodnošljivo gorko meso.",
    simpleBullets: [
      "Pore (spužva) u zrelosti postanu prljavo RUŽIČASTE.",
      "Mrežica na stručku je tamna (smeđa ili crna na svjetlijoj podlozi).",
      "Meso je nepodnošljivo gorko poput pelina ili žuči."
    ],
    bozacDetails: {
      klobuk: "5–15 cm, žućkastosmeđ do kestenjast, gladak.",
      listici: "Cjevčice bijele pa ružičaste, izbočene.",
      strucak: "Trbušast s jako izraženom tamnosmeđom mrežicom.",
      meso: "Bijelo, mekano, ekstremno gorko.",
      spore: "Vretenaste, ružičaste, 12–15 x 4–5 µm."
    },
    lookalikes: [
      { targetId: "jesenski-vrganj", trait: "Mrežica, pore i okus", mine: "Tamna mrežica + ružičaste pore + gorka", other: "Jesenski vrganj: Bijela mrežica + žutozelene pore + slatkast okus." }
    ],
    habitat: "Crnogorične i bukove šume ljeti i u jesen.",
    kitchen: "Nije otrovna, ali jedan primjerak učini cijeli lonac nejestivim.",
    season: "Srpanj – Listopad"
  },

  // 43. LUDARA
  {
    id: "ludara",
    name: "Ludara (Vražji vrganj)",
    latin: "Rubroboletus satanas (Boletus satanas)",
    folkNames: ["vražji vrganj", "luda gljiva", "ludara", "krvavi vrganj", "sotonski vrganj", "divlji vrganj"],
    wikiQuery: "Rubroboletus_satanas",
    bozacRef: "Svezak 2, br. 1097, str. 312",
    status: "DANGER",
    statusLabel: "🔴 OTROVNA",
    hymenium: "cjevcice", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Kredastobijeli ili sivkasti klobuk, KRVAVOCRVENE pore i bačvasti crveni stručak. Meso na prerezu poplavi, a stariji primjerci zaudaraju na strvinu.",
    simpleBullets: [
      "Klobuk je kredastobijel do sivkast (nikad smeđ!).",
      "Pore i stručak su jarko krvavocrvene boje.",
      "Meso na prerezu poplavi."
    ],
    bozacDetails: {
      klobuk: "10–25 cm, mesnat, bjelkast do pepeljastosiv.",
      listici: "Pore sitne, krvavocrvene, na dodir poplave.",
      strucak: "Kratak, bačvasto zadebljan, gore žut, dolje crven s crvenom mrežicom.",
      meso: "Žućkasto, na prerezu lagano poplavi, miris u starosti odbojan.",
      spore: "Vretenaste, 11–14 x 5–7 µm."
    },
    lookalikes: [
      { targetId: "jesenski-vrganj", trait: "Pore i klobuk", mine: "Bjelkast klobuk + crvene pore + meso plavi", other: "Pravi vrganji: Smeđi klobuk + bijelo/žute pore + meso ne plavi!" },
      { targetId: "kovac", trait: "Klobuk i miris", mine: "Bjelkast klobuk + neugodan miris", other: "Kovac: Tamnosmeđ klobuk + crvene točkice na stručku." }
    ],
    habitat: "Toplije hrastove i bukove šume na vapnencu ljeti i u ranu jesen.",
    kitchen: "OTROVNA! Izaziva teška povraćanja i grčeve.",
    season: "Srpanj – Rujan"
  },

  // 44. LISIČICA
  {
    id: "lisicica",
    name: "Lisičica (Lisičarka)",
    latin: "Cantharellus cibarius Fries",
    folkNames: ["lisička", "žiluša", "žutulja", "bregunka", "žumanjčica", "kajsijača", "lisičarka"],
    wikiQuery: "Cantharellus_cibarius",
    bozacRef: "Svezak 2, br. 985, str. 234",
    status: "SAFE",
    statusLabel: "🟢 VRHUNSKA DELIKATESA",
    hymenium: "letvice", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Žumanjčanožuta gljiva s mirisom na marelice! Odozdo nema tanke listiće nego debele račvaste nabore (letvice) koji silaze niz stručak. Raste iz zemlje, nikad na panju.",
    simpleBullets: [
      "Ispod klobuka su DEBELE, račvaste žute letvice (ne tanki listići!).",
      "Raste pojedinačno ili u grupama IZ ZEMLJE (nikada u busenu na panju!).",
      "Meso je bjelkasto, ugodna voćnog mirisa na marelice i nikad crvljivo."
    ],
    bozacDetails: {
      klobuk: "3–10 cm, ljevkast s valovitim rubom, žumanjčanožut.",
      listici: "Žute letvice (grebeni) koje se račvaju i spuštaju niz stručak.",
      strucak: "Pun, čvrst, boje klobuka, prema dnu uži.",
      meso: "Bjelkasto, vlaknasto, miris na breskve i marelice.",
      spore: "Blijedožućkaste, 7–12 x 4–6 µm."
    },
    lookalikes: [
      { targetId: "zavodnica", trait: "Trusište i stanište (SMRTNO VAŽNO!)", mine: "Iz zemlje + debele račvaste letvice + bjelkasto meso", other: "Zavodnica (OTROVNA): Raste u BUSENU na panju + tanki gusti listići + narančasto meso!" }
    ],
    habitat: "Bukove, hrastove i crnogorične šume od lipnja do studenog.",
    kitchen: "Vrhunska s jajima i u gulašu. Prije zamrzavanja obavezno blanširati!",
    season: "Lipanj – Studeni"
  },

  // 45. ZAVODNICA
  {
    id: "zavodnica",
    name: "Zavodnica",
    latin: "Omphalotus olearius (DC. ex Fr.) Sing.",
    folkNames: ["lažna lisičica", "otrovna lisička", "maslinova zavodnica", "svjetleća gljiva"],
    wikiQuery: "Omphalotus_olearius",
    bozacRef: "Svezak 2, br. 1006, str. 250",
    status: "DANGER",
    statusLabel: "🔴 OTROVNA",
    hymenium: "listici", growth: "busen", latex: "nema", ring: "bez",
    shortSummary: "Najčešći uzrok trovanja u Hrvatskoj! Raste u velikim busenima na panjevima hrasta i kestena. Cijela je jarkonarančasta (klobuk, gusti listići i meso).",
    simpleBullets: [
      "Raste u gustim busenima na panjevima i korijenju hrasta i kestena.",
      "Cijela gljiva je jarkonarančasta (i klobuk, i listići, i meso na prerezu!).",
      "Ima prave tanke listiće (ne debele letvice kao lisičica)."
    ],
    bozacDetails: {
      klobuk: "5–15 cm, ljevkast, jarkonarančast do crvenosmeđ.",
      listici: "Gusti, tanki, narančastožuti, silazni niz stručak, noću mogu bioluminiscirati.",
      strucak: "Dug, zakrivljen u busenu, narančastosmeđ.",
      meso: "Narančasto, žilavo.",
      spore: "Okruglaste, 5–7 x 4–6 µm."
    },
    lookalikes: [
      { targetId: "lisicica", trait: "Stanište i listići", mine: "Busen na panju + tanki narančasti listići + narančasto meso", other: "Lisičica (Jestiva): Raste iz zemlje + debele letvice + bjelkasto meso!" }
    ],
    habitat: "Panjevi hrasta i pitomog kestena od srpnja do listopada.",
    kitchen: "OTROVNA! Izaziva teška povraćanja i bolove u trbuhu.",
    season: "Srpanj – Listopad"
  },

  // 46. CRNA TRUBAČA
  {
    id: "crna-trubaca",
    name: "Crna trubača (Mrka trubača)",
    latin: "Craterellus cornucopioides (L.) Pers.",
    folkNames: ["mrtvačka truba", "pepelnica", "crna truba", "rog obilja", "šumski tartuf", "mrka trubača"],
    wikiQuery: "Craterellus_cornucopioides",
    bozacRef: "Svezak 2, br. 997, str. 244",
    status: "SAFE",
    statusLabel: "🟢 VRHUNSKA DELIKATESA",
    hymenium: "letvice", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "U obliku duboke šuplje trube! Iznutra čađavosmeđa do crna, izvana pepeljastosiva i glatka (bez listića). Sušenjem daje nevjerojatnu aromu.",
    simpleBullets: [
      "Potpuno šuplja truba sve do dna stručka.",
      "Vanjska strana je pepeljastosiva i glatka bez ikakvih listića.",
      "Raste u kolonijama u vlažnim bukovim šumama."
    ],
    bozacDetails: {
      klobuk: "3–8 cm, ljevkast, šupalj do baze, tamnosmeđ do crn.",
      listici: "Nema listića; vanjski himenij je pepeljastosiv i gladak.",
      strucak: "Šupalj, stapa se s klobukom.",
      meso: "Tanko, elastično, aromatično.",
      spore: "Eliptične, bijele, 12–17 x 7–10 µm."
    },
    lookalikes: [
      { targetId: "judino-uho", trait: "Oblik i stanište", mine: "Šuplja crna truba iz zemlje u šumi", other: "Judino uho: Želatinozno uho na stablu bazge." }
    ],
    habitat: "Bukove šume Medvednice i Zagorja od kolovoza do studenog.",
    kitchen: "Izvrsna svježa s tjesteninom, a sušena i samljevena u prah služi kao aromatični začin.",
    season: "Kolovoz – Studeni"
  },

  // 47. BUKOVAČA
  {
    id: "bukovaca",
    name: "Bukovača",
    latin: "Pleurotus ostreatus (Jacq. ex Fr.) Kumm.",
    folkNames: ["školjkača", "zimska bukovača", "bukova grmača", "ostrigasta bukovača"],
    wikiQuery: "Pleurotus_ostreatus",
    bozacRef: "Svezak 2, br. 1015, str. 256",
    status: "SAFE",
    statusLabel: "🟢 IZVRSNA JESTIVA I LJEKOVITA",
    medicinal: true,
    hymenium: "listici", growth: "drvo", latex: "nema", ring: "bez",
    shortSummary: "Raste poput crijepova na panjevima i deblima bukve i vrbe u hladnom dijelu godine. Sivosmeđi klobuk, bijeli silazni listići i bogatstvo prirodnog lovastatina.",
    simpleBullets: [
      "Raste u busenima na drvetu od listopada do veljače.",
      "Klobuk u obliku školjke, sivo-smeđ do čelično-modar.",
      "Bijeli listići se duboko spuštaju niz bočni stručak."
    ],
    bozacDetails: {
      klobuk: "5–20 cm, školjkast ili lepezast, gladak, sivkast do škriljastosiv.",
      listici: "Gusti, bijeli do krem, silazni.",
      strucak: "Kratak, bočan, dlakav u bazi.",
      meso: "Bijelo, čvrsto, ugodna okusa.",
      spore: "Valjkaste, 8–11 x 3–4 µm."
    },
    lookalikes: [
      { targetId: "puranov-rep", trait: "Meso i listići", mine: "Debela i mesnata s listićima", other: "Puranov rep: Tanke kožaste lepeze sa sitnim porama (za čaj)." }
    ],
    habitat: "Debele bukve, topole, vrbe u kasnu jesen i zimu.",
    kitchen: "Odlična pohana ili na žaru.",
    season: "Listopad – Veljača"
  },

  // 48. OBIČNI PROSENJAK (JEŽEK)
  {
    id: "prosenjak",
    name: "Obični prosenjak (Ježek)",
    latin: "Hydnum repandum L. ex Fr.",
    synonyms: "Dentinum repandum (L.) S.F. Gray",
    folkNames: ["ježek", "ježevica", "igličar", "bodljikavac", "bijeli ježek", "prosenjak"],
    wikiQuery: "Hydnum_repandum",
    bozacRef: "Svezak 2, br. 1423, str. 544",
    status: "SAFE",
    statusLabel: "🟢 IZVRSNA JESTIVA",
    hymenium: "iglice", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Jedna od najsigurnijih i najčešćih jesenskih gljiva Medvednice i sjeverozapadne Hrvatske! Ispod žućkastog klobuka nema ni listiće ni spužvu, nego stotine KRHIKIH IGLICA (bodljica) koje se spuštaju niz stručak.",
    simpleBullets: [
      "Ispod klobuka su krhke bjelkasto-žućkaste IGLICE (bodlje) koje se lako rune prstom i spuštaju niz stručak.",
      "Klobuk je blijedožut do boje bijele kave, mesnat, valovita i podvijena ruba.",
      "Stručak je često ekscentričan, pun i bjelkast; u Hrvatskoj nema otrovnih dvojnica s ovakvim iglicama!"
    ],
    bozacDetails: {
      klobuk: "4–12 cm, mesnat, tvrd, nepravilno grbav i režnjast, bjelkastožut do oker ili boje marelice, suh i baršunast.",
      listici: "Himenij čine krhke šiljate iglice (bodlje) duge 3–8 mm, bjelkastožute do boje mesa, koje se spuštaju (silazne su) niz stručak.",
      strucak: "3–8 cm, čvrst, pun, često postran (ekscentričan), bjelkast, na pritisak požuti, bez prstena.",
      meso: "Bijelo, čvrsto i krhko, na zraku požuti, blagog mirisa, kod starijih primjeraka blago gorkasto-papreno.",
      spore: "Okruglasto-jajolike, glatke, neamiloidne, 6,5–9 x 5,5–7,5 µm, otrusina bijela."
    },
    lookalikes: [
      { targetId: "rdjasti-prosenjak", trait: "Boja klobuka i prirast iglica", mine: "Blijedožuti klobuk + iglice se SPUŠTAJU niz deblji stručak", other: "Rđasti prosenjak (Jestiv): Narančasto-rđasti klobuk + iglice završavaju ravno uz tanji stručak!" },
      { targetId: "lisicica", trait: "Trusište ispod klobuka", mine: "Krhke iglice (bodlje) ispod klobuka", other: "Lisičica (Jestiva): Debele račvaste letvice (nabori)." }
    ],
    habitat: "Bukove, hrastove i crnogorične šume Medvednice, Samoborskog gorja i Zagorja, često u velikim vilinim krugovima i redovima od srpnja do prosinca.",
    kitchen: "Izvrsna gljiva čvrstog mesa koje se ne raskuha; odlična za gulaše, dinstanje s jajima i kiseljenje (kod starijih primjeraka ostrugati iglice).",
    season: "Srpanj – Prosinac"
  },

  // 49. JESTIVI SMRČAK
  {
    id: "jestivi-smrcak",
    name: "Jestivi smrčak",
    latin: "Morchella esculenta (L.) Pers.",
    folkNames: ["smrčak", "kapičar", "spužvača", "maurhelj", "žuti smrčak", "saćarka"],
    wikiQuery: "Morchella_esculenta",
    bozacRef: "Svezak 2, br. 1663, str. 714",
    status: "WARN",
    statusLabel: "🟡 VRHUNSKA DELIKATESA (PROKUHATI)",
    hymenium: "letvice", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Proljetna delikatesa! Klobuk s dubokim jamicama poput pčelinjeg saća, a iznutra je cijela gljiva POTPUNO ŠUPLJA.",
    simpleBullets: [
      "Klobuk ima pravilne jamice poput pčelinjeg saća.",
      "Na uzdužnom prerezu cijela je gljiva šuplja od vrha do dna.",
      "Raste u proljeće (travanj – svibanj) uz rijeke, topole, jasene i voćnjake."
    ],
    bozacDetails: {
      klobuk: "4–10 cm visok, jajolik, oker do smeđ, sa saćastim udubljenjima.",
      listici: "Spore nastaju u jamicama (alveolama).",
      strucak: "Bijel, šupalj, pri dnu zadebljan.",
      meso: "Voštano, ugodna mirisa.",
      spore: "Eliptične, 18–20 x 11–14 µm."
    },
    lookalikes: [
      { targetId: "hrckovi", trait: "Izgled klobuka i prerez (SMRTNO VAŽNO!)", mine: "Klobuk kao SAĆE + potpuno šupalj", other: "Proljetni hrčak (SMRTONOSNA): Klobuk vijugav kao MOZAK + komorasto ispunjen!" }
    ],
    habitat: "Proljeće uz jasene, topole, potoke i u starim voćnjacima.",
    kitchen: "Sirov otrovan. Obavezno termički obraditi 15 min ili osušiti.",
    season: "Travanj – Svibanj"
  },

  // 50. PROLJETNI HRČAK (MOŽDANICA)
  {
    id: "hrckovi",
    name: "Proljetni hrčak (Moždanica)",
    latin: "Gyromitra esculenta (Pers.) Fr.",
    folkNames: ["moždanica", "hrčak", "lažni smrčak", "kapičar otrovni", "mozgača"],
    wikiQuery: "Gyromitra_esculenta",
    bozacRef: "Svezak 2, br. 1703, str. 742",
    status: "DANGER",
    statusLabel: "🔴 SMRTNO OTROVNA",
    hymenium: "letvice", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Smrtonosna dvojnica smrčka! Umjesto saća s rupicama, klobuk je crvenosmeđ i vijugavo naboran točno poput ljudskog MOZGA.",
    simpleBullets: [
      "Klobuk ima vijugave nabore poput MOZGA (nema saćaste jamice).",
      "Iznutra ima više nepravilnih komora (nije jedinstveno šupalj).",
      "Sadrži smrtonosni otrov giromitrin."
    ],
    bozacDetails: {
      klobuk: "5–12 cm, crvenosmeđ, nepravilno naboran poput mozga.",
      listici: "Himenij na vanjskim vijugama.",
      strucak: "Kratak, bjelkast, nepravilan.",
      meso: "Voštano, lomljivo.",
      spore: "Eliptične, 18–21 x 8–10 µm."
    },
    lookalikes: [
      { targetId: "jestivi-smrcak", trait: "Površina klobuka", mine: "Naboran kao MOZAK + komorast", other: "Smrčak: Pčelinje SAĆE + jedinstveno šupalj." }
    ],
    habitat: "Pjeskovita tla ispod borova i smreka u proljeće.",
    kitchen: "SMRTONOSNA!",
    season: "Ožujak – Svibanj"
  },

  // 51. JUDINO UHO
  {
    id: "judino-uho",
    name: "Judino uho",
    latin: "Auricularia auricula-judae (Bull.) Quél.",
    folkNames: ["bazgovača", "šumsko uho", "crna gljiva", "bazgovo uho"],
    wikiQuery: "Auricularia_auricula-judae",
    bozacRef: "Svezak 2, br. 1521, str. 614",
    status: "SAFE",
    statusLabel: "🟢 JESTIVA I LJEKOVITA",
    medicinal: true,
    hymenium: "glatko", growth: "drvo", latex: "nema", ring: "bez",
    shortSummary: "Želatinozna gljiva u obliku ljudske uške koja raste na granama crne bazge. Elastična poput gume, odlična za azijska jela i jačanje krvožilnog sustava.",
    simpleBullets: [
      "Raste izravno na granama bazge u obliku elastičnog smeđeg uha.",
      "Savija se pod prstima poput gume.",
      "Vanjska strana je baršunasta, unutarnja sjajna s žilicama."
    ],
    bozacDetails: {
      klobuk: "3–10 cm, uškast, crvenkastosmeđ, elastičan i želatinozan.",
      listici: "Nema listiće; plodište je glatko do venozno naborano.",
      strucak: "Bez stručka, bočno prirastao.",
      meso: "Hrskavo i želatinozno.",
      spore: "Valjkaste, 14–19 x 6–8 µm."
    },
    lookalikes: [
      { targetId: "crna-trubaca", trait: "Podloga", mine: "Raste na stablu BAZGE", other: "Crna trubača: Raste iz ZEMLJE u bukovoj šumi." }
    ],
    habitat: "Crna bazga tijekom cijele godine (posebno zimi i u rano proljeće).",
    kitchen: "U woku, juhama i umacima.",
    season: "Cijela godina"
  },

  // 52. BREZINA GUBA (LJEKOVITA)
  {
    id: "brezina-guba",
    name: "Brezina guba",
    latin: "Fomitopsis betulina (Piptoporus betulinus)",
    folkNames: ["brezov trud", "brezova guba", "Ötzijeva gljiva"],
    wikiQuery: "Fomitopsis_betulina",
    bozacRef: "Svezak 2, br. 1200, str. 388",
    status: "SAFE",
    statusLabel: "🍵 LJEKOVITA (ZA ČAJ)",
    medicinal: true,
    hymenium: "cjevcice", growth: "drvo", latex: "nema", ring: "bez",
    shortSummary: "Poznata ljekovita guba s breze (pronađena i kod ledenog čovjeka Ötzija!). Narezana i osušena daje odličan čaj protiv upala i za jačanje imuniteta.",
    simpleBullets: [
      "Raste ISKLJUČIVO na stablima i granama breze.",
      "Klobuk je bubrežast, odozgo sivkastosmeđ, a odozdo čisto bijel s porama.",
      "Meso je bijelo i plutasto, ugodna mirisa."
    ],
    bozacDetails: {
      klobuk: "5–20 cm, jastučast, sivo-oker, s podvijenim rubom.",
      listici: "Cjevčice kratke, pore sitne i snježnobijele.",
      strucak: "Bez stručka ili kratak bočni bataljak.",
      meso: "Bijelo, plutasto, kiselkastog okusa.",
      spore: "Cilindrične, 5–6 x 1,5 µm."
    },
    lookalikes: [
      { targetId: "bukova-guba", trait: "Stablo domaćin", mine: "Na BREZI + bijelo meso", other: "Bukova guba: Na BUKVI + tvrdo smeđe meso." }
    ],
    habitat: "Na brezama tijekom cijele godine.",
    kitchen: "Narezati na listiće i osušiti na 45 °C za čaj.",
    season: "Cijela godina"
  },

  // 53. PURANOV REP (LJEKOVITA)
  {
    id: "puranov-rep",
    name: "Puranov rep (Šarena tvrdokoška)",
    latin: "Trametes versicolor (L.) Lloyd",
    folkNames: ["šarena tvrdokoška", "ćuranov rep", "lepezača", "šarena guba"],
    wikiQuery: "Trametes_versicolor",
    bozacRef: "Svezak 2, br. 1221, str. 402",
    status: "SAFE",
    statusLabel: "🍵 VRHUNSKA LJEKOVITA (ČAJ)",
    medicinal: true,
    hymenium: "cjevcice", growth: "drvo", latex: "nema", ring: "bez",
    shortSummary: "Svjetski poznata ljekovita gljiva za imunitet! Šarene lepeze s bijelim porama odozdo koje masovno rastu na panjevima bukve i hrasta.",
    simpleBullets: [
      "Tanke, kožaste lepeze sa šarenim prugama (smeđa, plavkasta, bijeli rub).",
      "Gornja strana je baršunasta na dodir.",
      "KLJUČNI ZNAK ODOZDO: Donja strana ima sitne BIJELE PORE (rupice)!"
    ],
    bozacDetails: {
      klobuk: "3–8 cm, tanak (1–3 mm), kožast, koncentrično višebojno prugast.",
      listici: "Cjevčice kratke; pore sitne (3–5 po mm), bijele do krem.",
      strucak: "Nema stručka, bočno prirasla u rozetama.",
      meso: "Bijelo, kožasto, žilavo.",
      spore: "Valjkaste, 5–7 x 1,5–2,5 µm."
    },
    lookalikes: [
      { targetId: "bukovaca", trait: "Donja strana", mine: "Tanka lepeza sa sitnim BIJELIM PORAMA", other: "Lažni puranov rep (Stereum): Odozdo je žućkastosmeđ i POTPUNO GLADAK bez rupica!" }
    ],
    habitat: "Panjevi i debla bukve i hrasta cijele godine.",
    kitchen: "Osušiti i kuhati 30 minuta na laganoj vatri kao ljekoviti čaj.",
    season: "Cijela godina"
  },

  // 54. HRASTOVA SJAJNICA (REISHI)
  {
    id: "hrastova-sjajnica",
    name: "Hrastova sjajnica (Reishi)",
    latin: "Ganoderma lucidum (Curt. ex Fr.) Karst.",
    folkNames: ["reishi", "sjajnica", "lakirana guba", "gljiva besmrtnosti"],
    wikiQuery: "Ganoderma_lucidum",
    bozacRef: "Svezak 2, br. 1276, str. 440",
    status: "SAFE",
    statusLabel: "🍵 LJEKOVITA (REISHI)",
    medicinal: true,
    hymenium: "cjevcice", growth: "drvo", latex: "nema", ring: "bez",
    shortSummary: "Kraljica ljekovitih gljiva! Klobuk i bočni stručak sjaje se poput crvenog laka, a raste pri bazi panjeva hrasta i kestena.",
    simpleBullets: [
      "Površina klobuka i stručka je sjajna kao da je LAKIRANA crvenim lakom.",
      "Ima izražen bočni stručak.",
      "Meso je drvenasto i gorko."
    ],
    bozacDetails: {
      klobuk: "5–20 cm, bubrežast, pokriven tvrdom sjajnom crvenosmeđom korom.",
      listici: "Cjevčice sitne, bijele pa cimetaste.",
      strucak: "Bočan, tvrd, jednako sjajan kao klobuk.",
      meso: "Drvenasto, cimetastosmeđe, gorko.",
      spore: "Smeđe, bradavičaste, 7–10 x 5–7 µm."
    },
    lookalikes: [
      { targetId: "bukova-guba", trait: "Kora i stručak", mine: "Sjajna crvena lakirana kora + stručak", other: "Bukova guba: Mat siva kora bez stručka." }
    ],
    habitat: "Panjevi hrasta i kestena ljeti i u jesen.",
    kitchen: "Osušiti i pripremati čaj ili tinkturu u domaćoj rakiji.",
    season: "Lipanj – Studeni"
  },

  // 55. BUKOVA GUBA (TRUD)
  {
    id: "bukova-guba",
    name: "Bukova guba (Trud)",
    latin: "Fomitopsis fomentaria (Fomes fomentarius)",
    folkNames: ["trud", "kresiva guba", "konjsko kopito", "bukov trud"],
    wikiQuery: "Fomes_fomentarius",
    bozacRef: "Svezak 2, br. 1201, str. 388",
    status: "SAFE",
    statusLabel: "🍵 LJEKOVITA (TRUD)",
    medicinal: true,
    hymenium: "cjevcice", growth: "drvo", latex: "nema", ring: "bez",
    shortSummary: "Tvrda siva guba u obliku konjskog kopita na stablima bukve. Unutarnje smeđe meso (amadou) koristi se za ljekoviti čaj i obloge.",
    simpleBullets: [
      "Raste na bukvama u obliku konjskog kopita.",
      "Izvana je siva i tvrda poput kamena.",
      "Meso iznutra je baršunasto smeđe poput kože."
    ],
    bozacDetails: {
      klobuk: "10–40 cm, višegodišnja, kopitasta s koncentričnim valovima.",
      listici: "Višeslojne cjevčice, pore sitne i sivkaste.",
      strucak: "Nema stručka, čvrsto prirasla uz deblo.",
      meso: "Žućkastosmeđe, plutasto.",
      spore: "Valjkaste, 15–20 x 5–6 µm."
    },
    lookalikes: [
      { targetId: "brezina-guba", trait: "Stablo", mine: "Raste na bukvama, siva i kopitasta", other: "Brezina guba: Raste na brezama, bubrežasta i bijela odozdo." }
    ],
    habitat: "Debla bukve cijele godine.",
    kitchen: "Čaj od unutarnjeg sloja za jačanje imuniteta.",
    season: "Cijela godina"
  },

  // 56. ZEČARKA (MAITAKE)
  {
    id: "zecarka",
    name: "Zečarka (Maitake)",
    latin: "Grifola frondosa (Dicks. ex Fr.) S. F. Gray",
    folkNames: ["maitake", "šumska kokoš", "hrastova grmača", "jelenovo uho"],
    wikiQuery: "Grifola_frondosa",
    bozacRef: "Svezak 2, br. 1182, str. 374",
    status: "SAFE",
    statusLabel: "🟢 JESTIVA I LJEKOVITA (ZAŠTIĆENA)",
    medicinal: true,
    hymenium: "cjevcice", growth: "drvo", latex: "nema", ring: "bez",
    shortSummary: "Golemi razgranati grm od stotina sivosmeđih klobuka pri dnu hrasta ili kestena. Vrhunska jestiva i snažno ljekovita vrsta.",
    simpleBullets: [
      "Ogroman grm (često 5–10 kg) od stotina lepezastih klobuka.",
      "Raste pri dnu starih hrastova i kestena.",
      "Donja strana klobuka ima sitne bijele pore."
    ],
    bozacDetails: {
      klobuk: "Zajednička baza se grana u desetke klobuka širine 3–8 cm, sivosmeđe boje.",
      listici: "Cjevčice kratke, pore bijele.",
      strucak: "Gusto razgranat, bjelkast.",
      meso: "Bijelo, krhko, ugodna mirisa.",
      spore: "Ovalne, 5–6 x 4–5 µm."
    },
    lookalikes: [
      { targetId: "puranov-rep", trait: "Veličina", mine: "Veliki mesnati grm iz jedne baze", other: "Puranov rep: Tanke pojedinačne kožaste lepeze." }
    ],
    habitat: "Baza hrasta i kestena u jesen. U RH zaštićena u prirodi.",
    kitchen: "Elitna gastronomska i medicinska gljiva.",
    season: "Rujan – Listopad"
  },

  // 57. BARIŠUNASTA ZIMSKA PANJEVCICA
  {
    id: "zimska-panjevcica",
    name: "Baršunasta (zimska) panjevčica",
    latin: "Flammulina velutipes (Curt. ex Fr.) Sing.",
    folkNames: ["mraznica", "zimska panjevčica", "enoki", "snježnica", "baršunasta panjevka"],
    wikiQuery: "Flammulina_velutipes",
    bozacRef: "Svezak 1, br. 519, str. 408",
    status: "SAFE",
    statusLabel: "🟢 IZVRSNA ZIMSKA GLJIVA",
    hymenium: "listici", growth: "busen", latex: "nema", ring: "bez",
    shortSummary: "Zimska delicija koja raste na snijegu! Narančastožuti ljepljivi klobuk i stručak koji je u donjem dijelu tamnosmeđ i baršunast poput pliša.",
    simpleBullets: [
      "Raste usred zime i snijega (studeni – ožujak) na vrbama i topolama.",
      "Stručak je u donjoj polovici tamnosmeđ i baršunast na dodir.",
      "Nema prsten, a listići su blijedožućkasti."
    ],
    bozacDetails: {
      klobuk: "2–8 cm, žutonarančast, za vlažna vremena jako ljepljiv.",
      listici: "Rijetki, bjelkasti pa žućkasti.",
      strucak: "Žilav, bez vjenčića, baršunasto crnosmeđ.",
      meso: "Žućkasto, ugodna mirisa.",
      spore: "Bijele, valjkaste, 8–11 x 3–4 µm."
    },
    lookalikes: [
      { targetId: "rebrasta-patuljica", trait: "Sezona i stručak", mine: "Raste zimi na snijegu + baršunast crni stručak bez prstena", other: "Rebrasta patuljica: Raste u jesen + nosi prsten!" }
    ],
    habitat: "Na panjevima i deblima vrbe, topole i brijesta zimi.",
    kitchen: "Odlična u zimskim juhama i varivima (jedu se samo klobuci).",
    season: "Studeni – Ožujak"
  },

  // 58. VELIKA MARTINČICA
  {
    id: "velika-martincica",
    name: "Velika martinčica",
    latin: "Infundibulicybe geotropa (Bull. ex Fr.) Harmaja",
    folkNames: ["martinčica", "martinščak", "golema grlašica", "jesenski lijevak"],
    wikiQuery: "Infundibulicybe_geotropa",
    bozacRef: "Svezak 1, br. 683, str. 522",
    status: "SAFE",
    statusLabel: "🟢 IZVRSNA JESTIVA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Velika gljiva u obliku dubokog lijevka koja raste oko Martinja u studenom. U dnu lijevka uvijek ima istaknutu malu grbicu!",
    simpleBullets: [
      "Klobuk je velik (10–25 cm), duboko ljevkast, ali u sredini ima malu ispupčenu GRBICU.",
      "Boje je kože ili bijele kave, a gusti listići se spuštaju niz stručak.",
      "Raste u velikim krugovima u kasnu jesen."
    ],
    bozacDetails: {
      klobuk: "10–25 cm, duboko ulegnut s grbicom u sredini, okerast.",
      listici: "Gusti, krem, silazni niz stručak.",
      strucak: "8–18 cm, debeo, čvrst, prema dnu zadebljan, bez prstena.",
      meso: "Bijelo, čvrsto, miriše na bademe.",
      spore: "Bijele, okruglaste, 6–8 x 5–7 µm."
    },
    lookalikes: [
      { targetId: "olovna-rudoliska", trait: "Oblik i listići", mine: "Ljevkasta s grbicom + silazni krem listići", other: "Olovasta rudoliska (OTROVNA): Nije ljevkasta + ružičasti listići!" }
    ],
    habitat: "Rubovi šuma i livade u studenom.",
    kitchen: "Izvrsna za gulaše i kiseljenje.",
    season: "Listopad – Prosinac"
  },

  // 59. LAVLJA GRIVA (BRADATI IGLIČAR)
  {
    id: "lavlja-griva",
    name: "Bradati igličar (Lavlja griva)",
    latin: "Hericium erinaceus (Bull. ex Fr.) Pers.",
    folkNames: ["lavlja griva", "djedova brada", "igličar", "ježeva gljiva"],
    wikiQuery: "Hericium_erinaceus",
    bozacRef: "Svezak 2, br. 1444, str. 560",
    status: "SAFE",
    statusLabel: "🟢 VRHUNSKA LJEKOVITA I DELIKATESA",
    medicinal: true,
    hymenium: "iglice", growth: "drvo", latex: "nema", ring: "bez",
    shortSummary: "Poznati neuro-regenerativni adaptogen! Izgleda kao bijeli vodopad ili brada sa stotinama dugih visećih bijelih iglica na stablima bukve i hrasta.",
    simpleBullets: [
      "Potpuno bijelo kuglasto tijelo s dugim visećim iglicama poput brade.",
      "Raste na deblima živih i mrtvih hrastova i bukvi.",
      "Potpuno jedinstvenog izgleda – nema otrovnih dvojnica."
    ],
    bozacDetails: {
      klobuk: "10–25 cm, mesnata nepodijeljena masa s koje vise bijele bodlje duge do 5 cm.",
      listici: "Himenij na dugim visećim iglicama.",
      strucak: "Kratak bočni bataljak.",
      meso: "Bijelo, elastično, okus podsjeća na škampe/jastoga.",
      spore: "Okruglaste, amiloidne, 5–6 x 4,5–5,5 µm."
    },
    lookalikes: [
      { targetId: "prosenjak", trait: "Način rasta", mine: "Raste na deblu bukve s dugim visećim resama", other: "Prosenjak: Raste iz zemlje s kratkim bodljama ispod klobuka." }
    ],
    habitat: "Stare bukve i hrastovi u kasno ljeto i jesen (u RH zaštićena vrsta).",
    kitchen: "Vrhunski kulinarski i nootropni ekstrakt (stimulira živčani faktor rasta NGF).",
    season: "Rujan – Studeni"
  },

  // 60. JESTIVA KRASNICA
  {
    id: "jestiva-krasnica",
    name: "Jestiva krasnica (Kratkokožna golubača)",
    latin: "Russula vesca Fries",
    folkNames: ["kokošica", "golubača", "šunkarica", "mesnata krasnica", "sivka"],
    wikiQuery: "Russula_vesca",
    bozacRef: "Svezak 2, br. 847, str. 136",
    status: "SAFE",
    statusLabel: "🟢 IZVRSNA JESTIVA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Klobuk boje kuhane šunke čija je kožica za 1–2 mm kraća od ruba, pa uz rub proviruju goli bijeli listići poput zubića. Meso tvrdo i orašasto.",
    simpleBullets: [
      "Kožica klobuka ne dopire do ruba (vire bijeli listići uz rub).",
      "Klobuk boje mesa ili šunke.",
      "Stručak puca kao kreda, a meso je ugodno blago."
    ],
    bozacDetails: {
      klobuk: "5–11 cm, ružičasto-smeđkast, kožica se povlači od ruba otkrivajući listiće.",
      listici: "Gusti, bijeli, račvasti.",
      strucak: "Bijel, tvrd, prema dnu malo sužen.",
      meso: "Čvrsto, bijelo, okus na lješnjake.",
      spore: "Bijele, 6–8,5 x 5–6,5 µm."
    },
    lookalikes: [
      { targetId: "bljuvara", trait: "Kožica i okus", mine: "Kratka kožica + blag okus", other: "Bljuvara: Kožica prekriva cijeli klobuk + žestoko ljuta!" }
    ],
    habitat: "Listopadne i crnogorične šume ljeti i u jesen.",
    kitchen: "Jedna od najukusnijih krasnica.",
    season: "Lipanj – Listopad"
  },

  // 61. CRNI (HAJDINSKI / KESTENOV) VRGANJ
  {
    id: "crni-vrganj",
    name: "Hajdinski tamni vrganj (Crni / Kestenov vrganj)",
    latin: "Boletus aereus Bull. ex Fr.",
    synonyms: "Tubiporus aereus (Bull.) Karst.",
    folkNames: ["ciganin", "crni jurček", "hajdinski vrganj", "brončani vrganj", "crni vrganj", "kestenjar", "hrženjak crni"],
    wikiQuery: "Boletus_aereus",
    bozacRef: "Svezak 2, br. 1075, str. 298",
    status: "SAFE",
    statusLabel: "🟢 VRHUNSKA DELIKATESA",
    regions: ["karlovac", "medvednica_zagorje", "slavonija", "istra_kvarner", "dalmacija"],
    hymenium: "cjevcice", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Najcjenjeniji vrganj toplih kestenovih i hrastovih šuma Pokuplja, Banovine (Petrova i Zrinska gora), Medvednice, Slavonije i Istre! Tamnosmeđi do brončano-crni baršunasti klobuk, bijele pa žutomaslinaste pore, smećkasti stručak s mrežicom i tvrdo bijelo meso koje nikad ne plavi.",
    simpleBullets: [
      "Klobuk je tamno čokoladnosmeđ do gotovo crn s bakreno-brončanim odsjajem i baršunastom površinom.",
      "Pore su u mladosti snježnobijele i sitne, a stručak zdepast sa svijetlosmeđom mrežicom.",
      "Čvrsto bijelo meso uopće ne mijenja boju na prerezu i ima intenzivan orašasti miris."
    ],
    bozacDetails: {
      klobuk: "7–20 cm, polukuglast pa otvoren, mesnat i tvrd, tamnosmeđ do crnosmeđ s brončanim mrljama, suh i fino baršunast.",
      listici: "Cjevčice najprije bijele, zatim žućkaste do maslinastozelene; pore sitne, okrugle, ne mijenjaju boju na dodir.",
      strucak: "6–14 cm, zdepast, trbušast, oker-smeđ do crvenkastosmeđ, prekriven finom smećkastom mrežicom.",
      meso: "Snježnobijelo (čak i neposredno ispod tamne kožice klobuka!), iznimno tvrdo, ne plavi, ugodnog mirisa i okusa po lješnjacima.",
      spore: "Vretenaste, glatke, maslinastosmeđe, 13–16 x 4–5,5 µm."
    },
    lookalikes: [
      { targetId: "jesenski-vrganj", trait: "Boja klobuka i mesa pod kožicom", mine: "Gotovo crn baršunast klobuk + posve bijelo meso pod kožicom", other: "Jesenski vrganj (Jestiv): Svjetliji smeđi klobuk s bijelim rubom + crvenkasta linija pod kožicom." },
      { targetId: "ludara", trait: "Boja pora i klobuka (PAZI!)", mine: "Tamni crnosmeđi klobuk + bijele/žute pore + meso ne plavi", other: "Ludara (OTROVNA): Kredastobijeli klobuk + krvavocrvene pore + meso plavi!" }
    ],
    habitat: "Toplije šume pitomog kestena (Castanea sativa) i hrasta u Pokuplju, Banovini (Zrinska i Petrova gora), Karlovcu, na Medvednici, u Zagorju, Slavoniji i Istri od lipnja do listopada.",
    kitchen: "Apsolutni kralj među vrganjima; zbog iznimno čvrstog mesa vrhunski je za sušenje, kiseljenje, rižota i pripremu na žaru.",
    season: "Lipanj – Listopad"
  },

  // 62. KOVAC (ZELENJAČA S CRVENIM PORAMA)
  {
    id: "kovac",
    name: "Kovac (Baršunasti vrganj / Zelenjača)",
    latin: "Neoboletus luridiformis (Boletus erythropus)",
    folkNames: ["kovač", "zelenjača", "modrikaš", "točkastonoška", "sljemenski kovač", "baršunasti vrganj"],
    wikiQuery: "Neoboletus_luridiformis",
    bozacRef: "Svezak 2, br. 1095, str. 312",
    status: "WARN",
    statusLabel: "🟡 IZVRSNA JESTIVA (DOBRO SKUhati)",
    hymenium: "cjevcice", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Vrlo čest vrganj na Sljemenu! Tamnosmeđi baršunasti klobuk, krvavocrvene pore, žuti stručak posut CRVENIM TOČKICAMA (bez mrežice!), a meso na prerezu odmah tamno POPLAVI.",
    simpleBullets: [
      "Klobuk je tamnosmeđ i baršunast (nikad bijel kao kod ludare!).",
      "Stručak NEMA mrežicu nego je posut sitnim crvenim točkicama.",
      "Žuto meso na prerezu odmah poplavi, a kuhanjem opet postane žuto!"
    ],
    bozacDetails: {
      klobuk: "6–20 cm, tamnosmeđ, suh i baršunast.",
      listici: "Pore sitne, narančastocrvene do krvavocrvene, na dodir tamnoplave.",
      strucak: "Debeo, žut s gustim crvenim zrncima/točkicama (bez mrežice!).",
      meso: "Žuto, na prerezu trenutačno tamnoplavo.",
      spore: "Vretenaste, 11–18 x 4,5–7 µm."
    },
    lookalikes: [
      { targetId: "ludara", trait: "Klobuk i ukras na stručku (SMRTNO VAŽNO!)", mine: "TAMNOSMEĐ klobuk + crvene TOČKICE na stručku", other: "Ludara (OTROVNA): BIJEL klobuk + crvena MREŽICA na stručku!" }
    ],
    habitat: "Bukove i crnogorične šume Medvednice od lipnja do studenog.",
    kitchen: "Sirov je otrovan! Obavezno kuhati 20 minuta. Izvrstan u gulašima i za kiseljenje.",
    season: "Lipanj – Studeni"
  },

  // 63. KRALJEVKA
  {
    id: "kraljevka",
    name: "Kraljevka (Kraljevski vrganj)",
    latin: "Butyriboletus regius (Krombholz) Arora",
    folkNames: ["kraljevski vrganj", "ružičasti jurček", "kraljevka", "carski vrganj"],
    wikiQuery: "Butyriboletus_regius",
    bozacRef: "Svezak 2, br. 1077, str. 298",
    status: "SAFE",
    statusLabel: "🟢 VRHUNSKA DELIKATESA (ZAŠTIĆENA)",
    hymenium: "cjevcice", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Prekrasan vrganj s ružičasto-crvenim klobukom, limunskožutim porama i žutim stručkom s mrežicom. Žuto meso na prerezu NE PLAVI!",
    simpleBullets: [
      "Klobuk je ružičastocrvene do malinaste boje.",
      "Pore i stručak s mrežicom su jarko žuti.",
      "Žuto meso na prerezu uopće NE plavi."
    ],
    bozacDetails: {
      klobuk: "6–18 cm, ružičastocrven, fino baršunast.",
      listici: "Pore sitne, limunskožute, na pritisak ne plave.",
      strucak: "Žut s finom žutom mrežicom.",
      meso: "Tvrdo, žuto, nepromjenljivo na zraku.",
      spore: "10–15 x 4–6 µm."
    },
    lookalikes: [
      { targetId: "ludara", trait: "Pore i meso", mine: "Žute pore + meso NE plavi", other: "Ludara (OTROVNA): Crvene pore + meso plavi!" }
    ],
    habitat: "Tople hrastove i bukove šume u ljeto.",
    kitchen: "Zaštićena vrsta u RH.",
    season: "Srpanj – Rujan"
  },

  // 64. ŠILJATONOGI VRGANJ
  {
    id: "siljatonogi-vrganj",
    name: "Šiljatonogi vrganj",
    latin: "Butyriboletus appendiculatus (Schff.) Arora",
    folkNames: ["žuti vrganj", "maslenjak", "korjenasti jurček", "hrastov žuti vrganj"],
    wikiQuery: "Butyriboletus_appendiculatus",
    bozacRef: "Svezak 2, br. 1079, str. 300",
    status: "SAFE",
    statusLabel: "🟢 VRHUNSKA DELIKATESA",
    hymenium: "cjevcice", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Smeđi klobuk, žute pore, žuti stručak s mrežicom čije je dno u zemlji korjenasto UŠILJENO poput repe. Tvrdo i ukusno meso.",
    simpleBullets: [
      "Dno stručka u zemlji je korjenasto zašiljeno.",
      "Pore i stručak su žute boje maslaca.",
      "Meso je čvrsto i na prerezu slabo ili nimalo plavi."
    ],
    bozacDetails: {
      klobuk: "8–18 cm, kestenjastosmeđ do oker, suh.",
      listici: "Cjevčice žute, pore sitne.",
      strucak: "Žut s mrežicom, u bazi korjenasto ušiljen.",
      meso: "Tvrdo, svijetložuto, ugodna mirisa.",
      spore: "Vretenaste, 11–14 x 4–6 µm."
    },
    lookalikes: [
      { targetId: "zucara", trait: "Okus i pore", mine: "Žute pore + slatkast okus", other: "Žučara: Ružičaste pore + gorka kao žuč!" }
    ],
    habitat: "Hrastove i bukove šume od lipnja do listopada.",
    kitchen: "Vrhunski vrganj izuzetne čvrstoće.",
    season: "Lipanj – Listopad"
  },

  // 65. ZLATAČA
  {
    id: "zlataca",
    name: "Zlatača (Crvenonogi baršunovac)",
    latin: "Xerocomellus chrysenteron (Bull.) Šutara",
    folkNames: ["zlatača", "ispucani vrganj", "kozarica", "crvenonogi vrganj", "baršunovac"],
    wikiQuery: "Xerocomellus_chrysenteron",
    bozacRef: "Svezak 2, br. 1120, str. 328",
    status: "SAFE",
    statusLabel: "🟢 JESTIVA",
    hymenium: "cjevcice", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Česta gljiva na Medvednici. Klobuk sivosmeđ i ispucan, a kroz pukotine proviruje crveno meso! Stručak tanak i crvenkast pri dnu.",
    simpleBullets: [
      "Kožica klobuka je ispucana u polja s crvenim pukotinama.",
      "Pore su široke, uglate i žute.",
      "Stručak je u donjoj polovici crven."
    ],
    bozacDetails: {
      klobuk: "3–8 cm, maslinastosmeđ, ispucan s crvenom podlogom.",
      listici: "Pore krupne, uglate, žute pa maslinaste.",
      strucak: "Tanak, žut i u donjem dijelu crven, bez mrežice.",
      meso: "Žućkasto, pod kožicom crveno, slabo plavi.",
      spore: "12–15 x 5–7 µm."
    },
    lookalikes: [
      { targetId: "kostanjevka", trait: "Klobuk", mine: "Crvene pukotine na klobuku", other: "Kostanjevka: Kestenjast klobuk bez crvenila." }
    ],
    habitat: "Sve vrste šuma od lipnja do studenog.",
    kitchen: "Dobra dok je mlada i čvrsta.",
    season: "Lipanj – Studeni"
  },

  // 66. MASLENKA (OSINAC)
  {
    id: "maslenka",
    name: "Maslenka (Prstenasti sluzavac / Osinac)",
    latin: "Suillus luteus (L. ex Fr.) Roussel",
    folkNames: ["osinac", "maslenjak", "borovik sluzavi", "slinavka", "maslenka", "borova slinavka"],
    wikiQuery: "Suillus_luteus",
    bozacRef: "Svezak 2, br. 1157, str. 356",
    status: "SAFE",
    statusLabel: "🟢 IZVRSNA JESTIVA (OGULITI KOŽICU)",
    hymenium: "cjevcice", growth: "tlo", latex: "nema", ring: "samo_vjencic",
    shortSummary: "Raste isključivo pod borovima! Čokoladnosmeđi sluzavi klobuk čija se kožica lako guli, žute pore i bijelo-ljubičasti prsten na stručku.",
    simpleBullets: [
      "Raste samo pod borovima.",
      "Ima kožasti PRSTEN na stručku.",
      "Ljepljiva kožica klobuka se guli u jednom potezu."
    ],
    bozacDetails: {
      klobuk: "5–12 cm, čokoladnosmeđ, vrlo sluzav.",
      listici: "Pore sitne, limunskožute.",
      strucak: "Nosi kožasti vjenčić, gore žut s točkicama.",
      meso: "Bjelkasto-žućkasto, mekano.",
      spore: "Vretenaste, 7–10 x 3–4 µm."
    },
    lookalikes: [
      { targetId: "zrnata-slinavka", trait: "Prsten", mine: "IMA prsten na stručku", other: "Zrnata slinavka: NEMA prsten na stručku!" }
    ],
    habitat: "Borove šume od proljeća do jeseni.",
    kitchen: "Obavezno oguliti kožicu klobuka; izvrsna za kiseljenje.",
    season: "Svibanj – Studeni"
  },

  // 67. ZRNATI SLUZAVAC (SLINAVKA)
  {
    id: "zrnata-slinavka",
    name: "Zrnati sluzavac (Zrnata slinavka)",
    latin: "Suillus granulatus (L. ex Fr.) Kuntze",
    synonyms: "Boletus granulatus L.",
    folkNames: ["slinavka", "suzača", "borova maslenka", "osinac bez prstena", "mliječna slinavka"],
    wikiQuery: "Suillus_granulatus",
    bozacRef: "Svezak 2, br. 1146, str. 348",
    status: "SAFE",
    statusLabel: "🟢 JESTIVA (OGULITI KOŽICU)",
    hymenium: "cjevcice", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Vrlo česta slinavka borovih šuma i parkova sjeverozapadne Hrvatske! Za razliku od maslenke NEMA prsten na stručku, a žute pore i vrh stručka u mladosti luče mliječne kapljice koje sušenjem ostavljaju smeđa zrnca.",
    simpleBullets: [
      "Raste isključivo ispod borova (Pinus) i nikada NEMA vjenčić (prsten) na stručku.",
      "Na žutim porama i vrhu stručka u mladosti su orošene mliječne bijele kapljice.",
      "Sluzava crvenkastosmeđa kožica klobuka lako se guli u jednom potezu."
    ],
    bozacDetails: {
      klobuk: "4–12 cm, polukuglast pa jastučast, žutosmeđ do crvenkasto-hrđavosmeđ, po vlažnom vremenu jako sluzav, po suhom sjajan, kožica se lako guli.",
      listici: "Cjevčice kratke, prirasle, blijedožute; pore sitne, okrugle, u mladosti luče bjelkaste mliječne kapljice koje sušenjem potamne.",
      strucak: "4–9 cm, valjkast, pun, blijedožut, bez prstena, u gornjem dijelu posut sitnim žućkastim pa smeđim zrncima (granulama).",
      meso: "Debelo, mekano, blijedožuto, ne mijenja boju na prerezu, ugodna voćnog mirisa i blagog okusa.",
      spore: "Vretenasto-eliptične, glatke, 8–10 x 3–4 µm, otrusina oker-smeđa."
    },
    lookalikes: [
      { targetId: "maslenka", trait: "Prsten na stručku", mine: "NEMA prsten na stručku + vrh stručka posut zrncima", other: "Maslenka (Jestiva): IMA bijelo-ljubičasti kožasti prsten na stručku!" },
      { targetId: "arisev-prstenjak", trait: "Stablo domaćin i prsten", mine: "Raste pod BOROM + bez prstena", other: "Arišev prstenjak (Jestiv): Raste pod ARIŠEM + ima prsten." }
    ],
    habitat: "Borove šume, šumski rubovi i parkovi s borovima na Medvednici i u sjeverozapadnoj Hrvatskoj od svibnja do studenog.",
    kitchen: "Vrlo dobra jestiva gljiva; obavezno oguliti sluzavu kožicu s klobuka prije pripreme kako jelo ne bi bilo sluzavo i teško probavljivo.",
    season: "Svibanj – Studeni"
  },

  // 68. OBIČNA UVIJAČA
  {
    id: "uvijaca",
    name: "Obična uvijača (Podvijača)",
    latin: "Paxillus involutus (Batsch ex Fr.) Fr.",
    folkNames: ["podvijača", "uvijača", "smrtna podvijača", "kiselača"],
    wikiQuery: "Paxillus_involutus",
    bozacRef: "Svezak 2, br. 1062, str. 288",
    status: "DANGER",
    statusLabel: "🔴 SMRTNO OTROVNA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Nekad smatrana jestivom, a danas znamo da izaziva smrtonosnu autoimunu reakciju (raspad crvenih krvnih zrnaca)! Klobuk s podvijenim rubom, listići na pritisak tamno posmeđe.",
    simpleBullets: [
      "Rub klobuka je jako PODVIJEN i baršunast.",
      "Žućkasti listići na najmanji pritisak prsta odmah TAMNO POSMEĐE.",
      "Izaziva nakupljanje antitijela i smrtonosno raspadanje krvi!"
    ],
    bozacDetails: {
      klobuk: "5–15 cm, ulegnut, okerast do maslinastosmeđ, rub dugo podvijen.",
      listici: "Gusti, silazni, lako se odvajaju od klobuka, na dodir jako posmeđe.",
      strucak: "Kratak, pun, bez prstena.",
      meso: "Žućkasto, na zraku posmeđi.",
      spore: "Hrđavosmeđe, 8–10 x 5–6 µm."
    },
    lookalikes: [
      { targetId: "plemenita-rujnica", trait: "Mlijeko", mine: "NEMA mlijeko + listići na dodir posmeđe", other: "Rujnica: Pušta narančasto mlijeko i pozeleni!" }
    ],
    habitat: "Bjelogorične i crnogorične šume, vrlo česta pod brezama.",
    kitchen: "SMRTNO OTROVNA (Paxillus sindrom)! Nikada ne sakupljati.",
    season: "Srpanj – Studeni"
  },

  // 69. ARIŠEV PRSTENJAK
  {
    id: "arisev-prstenjak",
    name: "Arišev vrganj (Arišev prstenjak)",
    latin: "Suillus grevillei (Klotzsch) Singer",
    folkNames: ["ariševac", "zlatna maslenka", "arišev jurček", "žuti sluzavac"],
    wikiQuery: "Suillus_grevillei",
    bozacRef: "Svezak 2, br. 1153, str. 354",
    status: "SAFE",
    statusLabel: "🟢 JESTIVA (OGULITI KOŽICU)",
    hymenium: "cjevcice", growth: "tlo", latex: "nema", ring: "samo_vjencic",
    shortSummary: "Zlatnožuti do narančasti sluzavi vrganj koji raste ISKLJUČIVO pod arišem! Ima žuti vjenčić i žute pore.",
    simpleBullets: [
      "Raste isključivo pod drvetom ariša.",
      "Klobuk je sluzav, zlatnožut do narančast.",
      "Ima žuti prsten na stručku i žute pore."
    ],
    bozacDetails: {
      klobuk: "5–12 cm, jarko zlatnožut, sluzav.",
      listici: "Pore sitne, sumporastožute.",
      strucak: "Žut s crvenosmeđim vlaknima i vjenčićem.",
      meso: "Žuto, mekano.",
      spore: "Vretenaste, 8–10 x 3–4 µm."
    },
    lookalikes: [
      { targetId: "maslenka", trait: "Stablo i boja", mine: "Zlatnožuta pod arišem", other: "Maslenka: Čokoladnosmeđa pod borom." }
    ],
    habitat: "Isključivo ispod ariša od lipnja do studenog.",
    kitchen: "Dobra gljiva; oguliti sluzavu kožicu prije pripreme.",
    season: "Lipanj – Studeni"
  },

  // 70. ŠUPLJIKAVI ARIŠEVAC
  {
    id: "supljikavi-vrganj",
    name: "Šupljikavi vrganj (Kravač)",
    latin: "Boletinus cavipes (Opat.) Kalchbr.",
    folkNames: ["kravač", "šuplji ariševac", "arišev vrganj"],
    wikiQuery: "Suillus_cavipes",
    bozacRef: "Svezak 2, br. 1169, str. 366",
    status: "SAFE",
    statusLabel: "🟢 JESTIVA",
    hymenium: "cjevcice", growth: "tlo", latex: "nema", ring: "samo_vjencic",
    shortSummary: "Raste pod arišem. Klobuk suh i vlaknasto-čehav, pore krupne i uglate, a stručak s prstenom je iznutra ŠUPALJ.",
    simpleBullets: [
      "Klobuk je suh i čehast (nije sluzav!).",
      "Stručak je iznutra šupalj.",
      "Raste isključivo pod arišem."
    ],
    bozacDetails: {
      klobuk: "4–10 cm, cimetastosmeđ, pustenasto-ljuskav.",
      listici: "Pore široke, radijalne, žute pa maslinaste.",
      strucak: "S prstenom, u donjem dijelu šupalj.",
      meso: "Žućkasto, mekano.",
      spore: "7–10 x 3–4 µm."
    },
    lookalikes: [
      { targetId: "arisev-prstenjak", trait: "Klobuk", mine: "Suh i ljuskav klobuk + šupalj stručak", other: "Arišev prstenjak: Jako sluzav i gladak klobuk." }
    ],
    habitat: "Pod arišem ljeti i u jesen.",
    kitchen: "Jestivi su mlađi primjerci.",
    season: "Kolovoz – Listopad"
  }
];

// High-priority edible/conditionally edible species with lethal or severely poisonous lookalikes
const EXPLICIT_HIGH_RISK_IDS = new Set<string>([
  'blagva',             // Carska blagva -> Muhara / Zelena pupavka
  'biserka',            // Biserka -> Panterovka / Hrapava muhara
  'poljska-pecurka',    // Poljska pečurka -> Bijela pupavka / Otrovna pečurka
  'sumska-pecurka',     // Šumska pečurka -> Bijela pupavka / Otrovna pečurka
  'sumska-rudnjaca',    // Šumska rudnjača -> Otrovna pečurka
  'velika-suncanica',   // Velika sunčanica -> Otrovne sunčanice (Lepiota) / Zelena pupavka
  'suncanica',          // Sunčanica
  'djurdjevaca',        // Đurđevača -> Crvenkasta cjepača / Olovasta rudoliska
  'lisicica',           // Lisičica -> Zavodnica
  'prava-puza',         // Prava puza -> Sumporača / Rebrasta patuljica
  'jestivi-smrcak',     // Jestivi smrčak -> Proljetni hrčak (Moždanica)
  'mala-panjevcica',    // Mala panjevčica -> Rebrasta patuljica (Galerina marginata)
  'zelena-krasnica',    // Zelena krasnica -> Zelena pupavka
  'golubaca',           // Golubača -> Zelena pupavka
  'vilin-klincac',      // Vilin klinčac -> Otrovna brašnjača (Clitocybe dealbata)
  'plemenita-rujnica',  // Plemenita rujnica -> Runjava mliječnica
  'kovac',              // Kovac -> Ludara
  'golublja-vitezovka', // Golublja vitezovka -> Bijela pupavka / Bijela vitezovka
  'crnobijela-vitezovka', // Crnobijela vitezovka -> Tigrica (Tricholoma pardinum)
  'modrikaca',          // Modrikača -> Ljubičaste koprenke / Čista uvijača
  'dvobojna-koturnica', // Dvobojna koturnica -> Koprenke
  'zuta-capica',        // Žuta capica -> Trobojna otrovna capica
  'jablanovaca',        // Jablanovača -> Sumporača / Rebrasta patuljica
  'mediteranska-krasnica', // Mediteranska krasnica -> Zelena pupavka
]);

function inferRegions(item: RawMushroom): RegionId[] {
  if (item.regions && item.regions.length > 0) {
    return item.regions;
  }

  const text = `${item.name} ${item.latin} ${item.habitat} ${item.shortSummary}`.toLowerCase();
  const regions = new Set<RegionId>();

  // Specific habitat & biogeographical rules for Croatia
  if (
    text.includes('mediteran') ||
    text.includes('crnik') ||
    text.includes('istra') ||
    text.includes('primor') ||
    text.includes('kvarner') ||
    text.includes('otoc')
  ) {
    regions.add('istra_kvarner');
    regions.add('dalmacija');
  }

  if (text.includes('dalmacij') || text.includes('makij') || text.includes('alepsk')) {
    regions.add('dalmacija');
    regions.add('istra_kvarner');
  }

  // Mountain conifer / beech-fir species (spruce, fir, larch, mountain pines)
  if (
    text.includes('smrek') ||
    text.includes('jela') ||
    text.includes('jele') ||
    text.includes('jelov') ||
    text.includes('ariš') ||
    text.includes('planinsk') ||
    text.includes('gorski kotar') ||
    text.includes('velebit') ||
    text.includes('crnogori')
  ) {
    regions.add('gorski_kotar');
    regions.add('medvednica_zagorje');
  }

  // Lowland oak, floodplain willow/poplar, ash, meadow species (Slavonija & Podravina)
  if (
    text.includes('hrast') ||
    text.includes('vrb') ||
    text.includes('topol') ||
    text.includes('jablan') ||
    text.includes('jasen') ||
    text.includes('livad') ||
    text.includes('pašnjak') ||
    text.includes('travnjak') ||
    text.includes('slavonij') ||
    text.includes('posavin') ||
    text.includes('bjelogori') ||
    text.includes('listopadn')
  ) {
    regions.add('slavonija');
    regions.add('medvednica_zagorje');
    regions.add('karlovac');
  }

  // Chestnut, beech, hornbeam, Pokuplje/Karlovac/Banovina & Medvednica/Zagorje
  if (
    text.includes('kesten') ||
    text.includes('bukv') ||
    text.includes('bukov') ||
    text.includes('grab') ||
    text.includes('medvednic') ||
    text.includes('sljeme') ||
    text.includes('zagorj') ||
    text.includes('karlov') ||
    text.includes('žumber')
  ) {
    regions.add('medvednica_zagorje');
    regions.add('karlovac');
    regions.add('gorski_kotar');
  }

  // Thermophilic oak/pine/limestone species also present in Istra/Kvarner
  if (
    text.includes('vapnen') ||
    text.includes('toplij') ||
    text.includes('blagva') ||
    text.includes('ludara') ||
    text.includes('kraljevka') ||
    text.includes('borov') ||
    text.includes('tartuf')
  ) {
    regions.add('istra_kvarner');
    regions.add('karlovac');
    regions.add('medvednica_zagorje');
  }

  // Default continental & mountain coverage if general forest habitat
  if (regions.size === 0) {
    regions.add('medvednica_zagorje');
    regions.add('gorski_kotar');
    regions.add('karlovac');
    regions.add('slavonija');
  }

  return Array.from(regions);
}

function deduplicateAndEnrichMushrooms(list: RawMushroom[]): Mushroom[] {
  const seenIds = new Set<string>();
  const seenWiki = new Set<string>();
  const deduped: RawMushroom[] = [];

  for (const item of list) {
    const normId = item.id.trim().toLowerCase();
    const normWiki = (item.wikiQuery || '').trim().toLowerCase().replace(/\s+/g, '_');

    if (seenIds.has(normId)) continue;
    if (normWiki && seenWiki.has(normWiki)) continue;

    seenIds.add(normId);
    if (normWiki) seenWiki.add(normWiki);
    deduped.push(item);
  }

  const statusById = new Map<string, string>();
  for (const item of deduped) {
    statusById.set(item.id, item.status);
  }

  return deduped.map((item): Mushroom => {
    const isEdibleOrConditional = item.status === 'SAFE' || item.status === 'WARN';

    // Check if any lookalike is a DANGER species in catalog or explicitly marked as OTROVNA/SMRTONOSNA
    const hasDangerousLookalikeInList = item.lookalikes.some((l) => {
      const targetStatus = statusById.get(l.targetId);
      const otherUpper = l.other.toUpperCase();
      return (
        targetStatus === 'DANGER' ||
        otherUpper.includes('SMRTONOSN') ||
        otherUpper.includes('SMRTNO') ||
        otherUpper.includes('OTROVN')
      );
    });

    const hasLethalLookalike =
      item.hasLethalLookalike ??
      (isEdibleOrConditional &&
        (EXPLICIT_HIGH_RISK_IDS.has(item.id) || hasDangerousLookalikeInList));

    // Sort lookalikes so dangerous/lethal lookalikes appear first in "Moja gljiva vs. Dvojnik"
    const sortedLookalikes = [...item.lookalikes].sort((a, b) => {
      const aDanger =
        statusById.get(a.targetId) === 'DANGER' ||
        a.other.toUpperCase().includes('SMRT') ||
        a.other.toUpperCase().includes('OTROVN')
          ? 1
          : 0;
      const bDanger =
        statusById.get(b.targetId) === 'DANGER' ||
        b.other.toUpperCase().includes('SMRT') ||
        b.other.toUpperCase().includes('OTROVN')
          ? 1
          : 0;
      return bDanger - aDanger;
    });

    return {
      ...item,
      regions: inferRegions(item),
      hasLethalLookalike,
      lookalikes: sortedLookalikes,
    };
  });
}

const EDIBLE_FAVORITE_ORDER: string[] = [
  // Najtraženije jestive i delikatesne vrste u Hrvatskoj (vrganji, sunčanice, lisičice, trubače, rujnice, prosenjaci...)
  'ljetni-vrganj',
  'pravi-vrganj',
  'borov-vrganj',
  'crni-vrganj',
  'suncanica',
  'lisicica',
  'mrka-trubaca',
  'zuckasta-trubaca',
  'smrekova-rujnica',
  'jelova-rujnica',
  'borova-rujnica',
  'prosenjak',
  'blagva',
  'brezov-djed',
  'grabov-djed',
  'crveni-turcin',
  'smrcak',
  'bukovaca',
  'golubaca',
  'zlatna-krasnica',
  'jestiva-krasnica',
  'biserka',
  'puza',
  'ovcica',
  'modrikaca',
  'dvobojna-koturnica',
  'crnobijela-vitezovka',
  'djurdjevaca',
  'ozujka',
  'velika-puhara',
  'bradavicasta-puhara',
  'poljska-pecurka',
  'sumska-pecurka',
  'sumska-rudnjaca',
  'gnojstarka',
  'kovac',
  'mrezastonogi-vrganj',
  'barunasti-vrganj',
  'maslenka',
  'slinavka',
  'crni-ljetni-tartuf',
  'zuti-zbunavac',
  'jablanovaca',
];

const DANGER_PRIORITY_ORDER: string[] = [
  // Ključne smrtonosne i opasne vrste (prikazuju se prve kad je aktivan filtar "Otrovne", a na dnu u standardnom "Favoriti" prikazu)
  'zelena-pupavka',
  'bijela-pupavka',
  'smrdljiva-pupavka',
  'panterova-muhara',
  'crvena-muhara',
  'mesnatosmedja-stitarka',
  'smrdljiva-stitarka',
  'rebrasta-patuljica',
  'hrczek',
  'ludara',
  'zavodnica',
  'olovna-rudoliska',
  'crvenjaca',
  'planinska-koprenka',
  'otrovna-pecurka',
  'sumporaca',
  'krumpiraca',
  'crvenkasta-cjepaca',
  'tigrasta-vitezovka',
];

const EDIBLE_FAVORITE_RANK_MAP = new Map<string, number>(
  EDIBLE_FAVORITE_ORDER.map((id, idx) => [id, idx + 1])
);

const DANGER_PRIORITY_RANK_MAP = new Map<string, number>(
  DANGER_PRIORITY_ORDER.map((id, idx) => [id, idx + 1])
);

export function getMushroomFavoriteRank(id: string): number {
  return EDIBLE_FAVORITE_RANK_MAP.get(id) ?? 1000;
}

export function getMushroomDangerRank(id: string): number {
  return DANGER_PRIORITY_RANK_MAP.get(id) ?? 1000;
}

export const INITIAL_MUSHROOMS: Mushroom[] = deduplicateAndEnrichMushrooms([
  ...PAKET_A_MUSHROOMS,
  ...PAKET_B_MUSHROOMS,
]).sort((a, b) => {
  const aIsDanger = a.status === 'DANGER' ? 1 : 0;
  const bIsDanger = b.status === 'DANGER' ? 1 : 0;
  if (aIsDanger !== bIsDanger) return aIsDanger - bIsDanger;
  return getMushroomFavoriteRank(a.id) - getMushroomFavoriteRank(b.id);
});

