import { RawMushroom } from '../types/mushroom';

export const PAKET_B_MUSHROOMS: RawMushroom[] = [
  // ==========================================
  // ROD RUSSULA (KRASNICE) — 22 VRSTE (71–92)
  // ==========================================

  // 71. ZLATNA KRASNICA
  {
    id: "zlatna-krasnica",
    name: "Zlatna krasnica",
    latin: "Russula aurea Pers. (Russula aurata)",
    synonyms: "Russula aurata (With.) Fr.",
    folkNames: ["zlatna golubača", "kokošica zlatna", "žutoostrična krasnica", "kraljevska golubača"],
    wikiQuery: "Russula_aurea",
    bozacRef: "Svezak 2, br. 801, str. 104",
    status: "SAFE",
    statusLabel: "🟢 VRHUNSKA DELIKATESA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Jedna od najljepših i najukusnijih krasnica! Klobuk narančastocrven sa zlatnožutim mrljama, a oštrica listića i meso ispod kožice klobuka su karakteristično LIMUNSKOŽUTI.",
    simpleBullets: [
      "Oštrica bijelih/krem listića je jarko limunskožute boje.",
      "Meso neposredno ispod kožice klobuka je zlatnožuto i blagog okusa.",
      "Stručak puca poput krede, bez prstena i bez ovoja."
    ],
    bozacDetails: {
      klobuk: "4–10 cm, polukuglast pa otvoren, narančastocrven do bakrenocrven s mrljama zlatnožute boje.",
      listici: "Slobodni do prirasli, krem do oker, s karakterističnom limunskožutom oštricom.",
      strucak: "4–8 cm, valjkast, krhak, bijel s čestim limunskožutim daškom.",
      meso: "Bijelo, pod kožicom klobuka zlatnožuto, blagog i slatkastog okusa.",
      spore: "Okruglaste, bradavičasto-mrežaste, 7,5–10 x 6–8,5 µm, otrusina oker."
    },
    lookalikes: [
      { targetId: "bljuvara", trait: "Okus i boja oštrice listića", mine: "Blag slatkast okus + žuta oštrica listića", other: "Krasnica bljuvara (OTROVNA): Snježnobijeli listići + peče kao paprika!" },
      { targetId: "carska-blagva", trait: "Vjenčić i ovoj", mine: "Krhki stručak BEZ vjenčića i BEZ ovoja", other: "Carska blagva: Ima žuti vjenčić i debeli bijeli ovoj u dnu!" }
    ],
    habitat: "Bjelogorične (bukva, hrast) i crnogorične šume ljeti i u ranu jesen.",
    kitchen: "Vrhunska jestiva gljiva za pečenje na žaru i pirjanje.",
    season: "Lipanj – Listopad"
  },

  // 72. MODROŽUTA KRASNICA
  {
    id: "modrozuta-krasnica",
    name: "Modrožuta (kameleonska) krasnica",
    latin: "Russula risigallina (Batsch) Sacc.",
    synonyms: "Russula chamaeleontina, Russula lutea",
    folkNames: ["kameleonska golubača", "marelična krasnica", "žuta kokošica"],
    wikiQuery: "Russula_risigallina",
    bozacRef: "Svezak 2, br. 875, str. 156",
    status: "SAFE",
    statusLabel: "🟢 IZVRSNA JESTIVA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Manja krasnica toplih žutih i mareličnih tonova čiji listići u zrelosti postaju žumanjčanožuti. Kožica klobuka se guli gotovo do samog središta, a meso miriše na marelice ili ruže.",
    simpleBullets: [
      "Kožica klobuka se lako guli gotovo u cijelosti.",
      "Listići su u zrelosti intenzivno žumanjčanožuti.",
      "Meso je blago i u starosti miriše na marelice ili kompot."
    ],
    bozacDetails: {
      klobuk: "3–6 cm, tanak, žut, narančastožut ili ružičasto-marelice, kožica se posve guli.",
      listici: "Prilično rijetki, najprije krem, zatim živo žumanjčanožuti.",
      strucak: "3–6 cm, krhak, šupalj, čisto bijel.",
      meso: "Bijelo, krhko, blagog okusa i voćnog mirisa.",
      spore: "Okruglaste, trnovite, 7,5–9 x 6,5–8 µm, otrusina tamnožuta."
    },
    lookalikes: [
      { targetId: "zucna-krasnica", trait: "Okus i boja listića", mine: "Žumanjčanožuti listići + blag okus", other: "Žučna krasnica (Nejestiva): Blijedo-oker listići + žestoko ljuto-gorka!" }
    ],
    habitat: "Bjelogorične i crnogorične šume od ljeta do jeseni.",
    kitchen: "Vrlo ukusna unatoč manjim dimenzijama i krhkom mesu.",
    season: "Lipanj – Listopad"
  },

  // 73. SMEĐOZELENA KRASNICA
  {
    id: "smedozelena-krasnica",
    name: "Smeđozelena krasnica",
    latin: "Russula heterophylla (Fr.) Fr.",
    folkNames: ["zelena golubača", "sivka", "kokošica", "kravica"],
    wikiQuery: "Russula_heterophylla",
    bozacRef: "Svezak 2, br. 809, str. 110",
    status: "SAFE",
    statusLabel: "🟢 VRHUNSKA JESTIVA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Čvrsta i mesnata krasnica maslinastozelenog do smeđozelenog klobuka čiji se bijeli listići uz stručak karakteristično račvaju, a sa zelenom galicom (FeSO4) meso reagira losos-ružičasto.",
    simpleBullets: [
      "Bijeli listići su uz stručak gusto račvasti i pomalo elastični.",
      "Klobuk je zelenosmeđ, nikad nema prsten ni ovoj.",
      "Meso s kristalima zelene galice (FeSO4) brzo postane narančastoružičasto."
    ],
    bozacDetails: {
      klobuk: "5–12 cm, mesnat, zelenkastosmeđ do maslinastozelen, gladak.",
      listici: "Gusti, uz stručak račvasti, bijeli do krem.",
      strucak: "4–8 cm, čvrst, pun, bijel s hrđavim mrljama na dnu.",
      meso: "Tvrdo, bijelo, blagog okusa po lješnjacima.",
      spore: "Najsitnije među krasnicama, 5–7 x 4–6 µm, otrusina čisto bijela."
    },
    lookalikes: [
      { targetId: "zelena-pupavka", trait: "Prsten, ovoj i lomljivost", mine: "NEMA vjenčić ni ovoj + stručak puca kao kreda", other: "Zelena pupavka (SMRTONOSNA): IMA vjenčić i vrećasti ovoj u dnu!" }
    ],
    habitat: "Listopadne šume (bukva, hrast) od lipnja do listopada.",
    kitchen: "Izvrsna jestiva krasnica čvrstog mesa.",
    season: "Lipanj – Listopad"
  },

  // 74. RAČVASTA KRASNICA
  {
    id: "racvasta-krasnica",
    name: "Račvasta krasnica",
    latin: "Russula subterfurcata / Russula furcata",
    folkNames: ["viličasta golubača", "račvasta golubača", "zelena kokošica"],
    wikiQuery: "Russula_subterfurcata",
    bozacRef: "Svezak 2, br. 810, str. 110",
    status: "SAFE",
    statusLabel: "🟢 JESTIVA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Srodnica smeđozelene krasnice s izraženo račvastim (viličastim) listićima i tamno maslinastozelenim klobukom.",
    simpleBullets: [
      "Listići se višestruko račvaju poput vilica od stručka prema rubu.",
      "Klobuk je tamno maslinastozelen sa smećkastim središtem.",
      "Stručak je kratak, bijel i puca poput krede."
    ],
    bozacDetails: {
      klobuk: "6–12 cm, mesnat, u sredini ulegnut, maslinastozelen.",
      listici: "Debeli, bijeli do krem, izrazito račvasti.",
      strucak: "Bijel, pun, tvrd, bez prstena.",
      meso: "Bijelo, u početku blago, u listićima ponekad malo gorkasto.",
      spore: "Okruglaste, 6–8 x 5–6,5 µm."
    },
    lookalikes: [
      { targetId: "zelena-pupavka", trait: "Vjenčić i ovoj", mine: "Bez vjenčića i bez ovoja", other: "Zelena pupavka (SMRTONOSNA): Viseći vjenčić i bijela čašica u dnu!" }
    ],
    habitat: "Hrastove i bukove šume ljeti i u jesen.",
    kitchen: "Dobra jestiva gljiva nakon kratke termičke obrade.",
    season: "Srpanj – Listopad"
  },

  // 75. SILLJEVA KRASNICA (LASICA)
  {
    id: "silljeva-krasnica",
    name: "Silljeva krasnica (Lasica)",
    latin: "Russula mustelina Fries",
    folkNames: ["lasica", "bikovka", "kravica", "vrganjasta golubača", "smeđa kokošica"],
    wikiQuery: "Russula_mustelina",
    bozacRef: "Svezak 2, br. 807, str. 108",
    status: "SAFE",
    statusLabel: "🟢 VRHUNSKA JESTIVA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Planinska krasnica koja iz daljine izgleda točno kao pravi vrganj! Klobuk boje lješnjaka ili dlake lasice, vrlo debelo i tvrdo meso, ali ispod klobuka ima listiće umjesto spužve.",
    simpleBullets: [
      "Klobuk smeđ poput vrganja, često napola skriven pod iglicama.",
      "Meso je izuzetno tvrdo, teško i blagog orašastog okusa.",
      "Raste u višim crnogoričnim šumama (smreka, jela)."
    ],
    bozacDetails: {
      klobuk: "6–15 cm, polukuglast, mesnat, žutosmeđ do kestenjastosmeđ.",
      listici: "Gusti, krem-bijeli sa smeđim mrljama, pomalo masni.",
      strucak: "Debeo, tvrd, bijel pa smećkast, bez prstena.",
      meso: "Debelo, bijelo, sa FeSO4 reagira narančasto-ružičasto.",
      spore: "Eliptične, 7,5–10 x 6–7,5 µm."
    },
    lookalikes: [
      { targetId: "smrdljiva-krasnica", trait: "Miris i okus", mine: "Glatkiji rub klobuka + blag okus po lješnjacima", other: "Smrdljiva krasnica (Otrovna): Rebrast sluzav rub + zaudara i peče!" }
    ],
    habitat: "Crnogorične šume Gorskog kotara i viših predjela od srpnja do listopada.",
    kitchen: "Među najukusnijim i najizdašnijim krasnicama za sve načine pripreme.",
    season: "Srpanj – Listopad"
  },

  // 76. MASLINASTA KRASNICA
  {
    id: "maslinasta-krasnica",
    name: "Maslinasta krasnica",
    latin: "Russula olivacea (Schff.) Pers.",
    folkNames: ["maslinasta golubača", "bukova golubača", "kokošica velika"],
    wikiQuery: "Russula_olivacea",
    bozacRef: "Svezak 2, br. 854, str. 142",
    status: "WARN",
    statusLabel: "🟡 UVJETNO JESTIVA (DOBRO ISPEĆI/SKUHATI!)",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Krupna krasnica bukovih šuma s baršunastim klobukom koji ima koncentrične prijelaze maslinastozelene i vinskocrvene boje te ružičasto-isprugan stručak. Sirova ili polusirova izaziva trovanje!",
    simpleBullets: [
      "Kožica klobuka je suha i baršunasta sa sitnim koncentričnim pukotinama.",
      "Stručak je pri vrhu pod listićima ružičasto nahukan.",
      "Meso s kapljicom fenola reagira živo ljubičasto-kupinasto."
    ],
    bozacDetails: {
      klobuk: "8–20 cm, mesnat, maslinastozelen i purpurnocrven, suh.",
      listici: "Široki, žumanjčanožuti, uz rub često crvenkaste oštrice.",
      strucak: "Čvrst, bijel s karmin-ružičastim zonama.",
      meso: "Bijelo, tvrdo, blago, s fenolom daje vinskocrveno-ljubičastu reakciju.",
      spore: "Trnovite, 8–11 x 7–9 µm, otrusina žuta."
    },
    lookalikes: [
      { targetId: "koznata-krasnica", trait: "Reakcija s fenolom i kožica", mine: "S fenolom ljubičasta + mat baršunast klobuk", other: "Kožnata krasnica (Jestiva): S fenolom smeđecrvena + sjajan klobuk." }
    ],
    habitat: "Bukove šume Medvednice, Žumberka i Gorskog kotara ljeti i u jesen.",
    kitchen: "Sirova i nedovoljno pečena na žaru izaziva jaka želučana trovanja! Obavezno temeljito prokuhati ili dugo pirjati.",
    season: "Srpanj – Listopad"
  },

  // 77. KOŽNATA KRASNICA
  {
    id: "koznata-krasnica",
    name: "Kožnata krasnica",
    latin: "Russula alutacea (Fr.) Fr.",
    folkNames: ["kožnata golubača", "crvena kokošica", "vinska golubača"],
    wikiQuery: "Russula_alutacea",
    bozacRef: "Svezak 2, br. 856, str. 144",
    status: "SAFE",
    statusLabel: "🟢 IZVRSNA JESTIVA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Velika bjelogorična krasnica vinskocrvenog do smeđeljubičastog sjajnog klobuka, debelih okeržutih listića i ugodnog orašastog okusa.",
    simpleBullets: [
      "Klobuk je vinskocrven do smeđeljubičast sa žućkastom sredinom, gladak i sjajan.",
      "Listići su debeli, krem pa okeržuti.",
      "Meso je potpuno blago, miriše blago na med i voće."
    ],
    bozacDetails: {
      klobuk: "7–15 cm, mesnat, vinskocrven sa žuto-maslinastim središtem.",
      listici: "Debeli, široki, žućkasti do oker.",
      strucak: "Bijel s blagim ružičastim daškom.",
      meso: "Bijelo, blago, s fenolom polako postaje smeđecrveno.",
      spore: "8–10 x 7–8,5 µm, otrusina okeržuta."
    },
    lookalikes: [
      { targetId: "maslinasta-krasnica", trait: "Kožica klobuka", mine: "Gladak sjajan klobuk", other: "Maslinasta krasnica: Baršunast i koncentrično ispucan klobuk." }
    ],
    habitat: "Bukove i hrastove šume u ljeto i jesen.",
    kitchen: "Izvrsna jestiva gljiva za sve načine pripreme.",
    season: "Srpanj – Listopad"
  },

  // 78. VINOCRVENA KRASNICA
  {
    id: "vinocrvena-krasnica",
    name: "Vinocrvena krasnica",
    latin: "Russula vinosa Lindblad (Russula obscura)",
    folkNames: ["vinska golubača", "siveća krasnica", "tamnocrvena kokošica"],
    wikiQuery: "Russula_vinosa",
    bozacRef: "Svezak 2, br. 851, str. 140",
    status: "SAFE",
    statusLabel: "🟢 IZVRSNA JESTIVA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Krasnica crnogoričnih šuma tamno vinskocrvenog klobuka čije bijelo meso na prerezu i starenjem polako POSIVI.",
    simpleBullets: [
      "Meso na prerezu i u dnu stručka na zraku polako posivi pa pocrni.",
      "Klobuk je tamne vinskocrvene boje.",
      "Okus mesa je blag (nije ljut!)."
    ],
    bozacDetails: {
      klobuk: "5–12 cm, mesnat, vinskocrven s tamnijim središtem.",
      listici: "Krem-oker, na oštećenjima posive.",
      strucak: "Bijel, ubrzo sivo-smećkasto nahukan.",
      meso: "Bijelo, na zraku polako posivi, blagog okusa.",
      spore: "Bradavičaste, 8–11 x 6,5–8,5 µm."
    },
    lookalikes: [
      { targetId: "krvavocrvena-krasnica", trait: "Promjena boje mesa i okus", mine: "Meso posivi + blag okus", other: "Krvavocrvena krasnica (Nejestiva): Meso ne sivi + ljuto i gorko!" }
    ],
    habitat: "Vlažne smrekove i borove šume ljeti i u jesen.",
    kitchen: "Vrlo dobra jestiva vrsta.",
    season: "Srpanj – Listopad"
  },

  // 79. SLATKASTA (IZBLIJEDJELA) KRASNICA
  {
    id: "slatkasta-krasnica",
    name: "Izblijedjela krasnica",
    latin: "Russula exalbicans (Pers.) Melzer & Zvára",
    synonyms: "Russula depallens",
    folkNames: ["blijeda golubača", "brezova golubača"],
    wikiQuery: "Russula_exalbicans",
    bozacRef: "Svezak 2, br. 848, str. 138",
    status: "SAFE",
    statusLabel: "🟢 JESTIVA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Raste uvijek pod brezama; ružičastocrveni klobuk brzo izblijedi u bjelkasto-zelenkaste tonove, a stručak u vlazi blago posivi.",
    simpleBullets: [
      "Raste u simbiozi s brezom.",
      "Klobuk iz ružičaste boje brzo izblijedi u krem-bjelkastu.",
      "Meso je blago do sasvim neznatno pikantno u listićima mladih gljiva."
    ],
    bozacDetails: {
      klobuk: "5–10 cm, ružičastocrven, ubrzo izblijedi od sredine.",
      listici: "Gusti, prirasli, krem do oker.",
      strucak: "Bijel s vodenasto-sivkastim žilicama.",
      meso: "Bijelo, blago posivi.",
      spore: "7–9 x 6–7 µm."
    },
    lookalikes: [
      { targetId: "bljuvara", trait: "Okus i boja klobuka", mine: "Klobuk brzo izblijedi + blag okus", other: "Bljuvara: Jarkocrveni klobuk + žestoko paprena!" }
    ],
    habitat: "Pod brezama od lipnja do listopada.",
    kitchen: "Jestiva nakon kuhanja ili pirjanja.",
    season: "Lipanj – Listopad"
  },

  // 80. ŽUTA KRASNICA
  {
    id: "zuta-krasnica",
    name: "Žuta krasnica",
    latin: "Russula claroflava Grove",
    folkNames: ["žuta golubača", "brezova žuta kokošica", "limunka"],
    wikiQuery: "Russula_claroflava",
    bozacRef: "Svezak 2, br. 850, str. 140",
    status: "SAFE",
    statusLabel: "🟢 IZVRSNA JESTIVA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Prepoznatljiva krasnica jarko krom-žutog klobuka koja raste pod brezama na vlažnom tlu, a bijelo meso i stručak na prerezu i starenjem POSIVE.",
    simpleBullets: [
      "Klobuk je živo limunsko ili krom-žut.",
      "Bijeli stručak i meso na prerezu polako postanu pepeljastosivi.",
      "Raste isključivo pod brezama i ima potpuno blag okus."
    ],
    bozacDetails: {
      klobuk: "5–10 cm, jarko žut, gladak.",
      listici: "Blijedožuti pa oker, na oštećenjima posive.",
      strucak: "Bijel, starenjem i na dodir posivi.",
      meso: "Bijelo, na zraku sivi, blagog okusa.",
      spore: "8–10 x 7–8 µm, otrusina oker."
    },
    lookalikes: [
      { targetId: "zuckasta-pupavka", trait: "Vjenčić, gomolj i miris", mine: "NEMA vjenčić ni gomolj + meso sivi + blag miris", other: "Žućkasta pupavka (Otrovna): IMA vjenčić i obrubljen gomolj + miris na krumpir!" }
    ],
    habitat: "Vlažna staništa pod brezama ljeti i u jesen.",
    kitchen: "Izvrsna jestiva gljiva.",
    season: "Srpanj – Listopad"
  },

  // 81. BADEMOVA KRASNICA
  {
    id: "bademova-krasnica",
    name: "Bademova krasnica",
    latin: "Russula grata Britzelm. (Russula laurocerasi)",
    folkNames: ["marcipanka", "bademova smrdulja", "rebrasta krasnica"],
    wikiQuery: "Russula_grata",
    bozacRef: "Svezak 2, br. 820, str. 118",
    status: "DANGER",
    statusLabel: "🔴 NEJESTIVA / BLAGO OTROVNA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Okeržuti klobuk s kvržasto narebranim rubom i prodornim mirisom na gorke bademe (marcipan), dok u dnu stručka zaudara neugodno, a okus je ljut.",
    simpleBullets: [
      "Klobuk je oker-smeđ s duboko kvržasto-brazdastim rubom.",
      "Izrazito miriše na gorke bademe ili marcipan.",
      "Listići i meso su ljutog i neugodnog okusa."
    ],
    bozacDetails: {
      klobuk: "4–9 cm, okeržut do hrđavosmeđ, sluzav, rub kvržasto narebran.",
      listici: "Bjelkasti sa smeđim mrljama.",
      strucak: "Bjelkast, komorasto šupalj.",
      meso: "Krhko, miris na gorke bademe, okus ljut.",
      spore: "Okruglaste s visokim krilastim grebenima, 8–10 µm."
    },
    lookalikes: [
      { targetId: "smrdljiva-krasnica", trait: "Miris", mine: "Miriše na gorke bademe / marcipan", other: "Smrdljiva krasnica: Zaudara na užeglo ulje." }
    ],
    habitat: "Listopadne i crnogorične šume ljeti i u jesen.",
    kitchen: "Nejestiva i blago otrovna za probavni sustav.",
    season: "Srpanj – Listopad"
  },

  // 82. SMRDLJIVA KRASNICA
  {
    id: "smrdljiva-krasnica",
    name: "Smrdljiva krasnica (Smrdulja)",
    latin: "Russula foetens Pers. ex Fr.",
    folkNames: ["smrdulja", "smrdljiva golubača", "uljenka", "bikovka otrovna"],
    wikiQuery: "Russula_foetens",
    bozacRef: "Svezak 2, br. 818, str. 116",
    status: "DANGER",
    statusLabel: "🔴 OTROVNA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Česta u našim šumama! Sluzav žutosmeđi klobuk s duboko rebrasto-kvržastim rubom, nepodnošljiv smrad na užeglo ulje ili plin i žestoko papren okus.",
    simpleBullets: [
      "Rub klobuka je duboko kvržasto izbrazdan, a površina ljepljiva.",
      "Odbojan miris na užeglo ulje i pokvarenu ribu.",
      "Na listićima često stoje vodenaste kapljice, a okus je papreno ljut."
    ],
    bozacDetails: {
      klobuk: "7–15 cm, kuglast pa raširen, oker-smeđ, jako sluzav, rub kvržasto narebran.",
      listici: "Bjelkasti sa smeđim mrljama, suze kapljice.",
      strucak: "Bjelkast, komorasto šupalj.",
      meso: "Krhko, odbojnog mirisa i paprenog okusa.",
      spore: "Bradavičave, 7,5–10 x 7–9 µm."
    },
    lookalikes: [
      { targetId: "silljeva-krasnica", trait: "Rub klobuka, miris i okus", mine: "Kvržast rub + odbojan miris + paprena", other: "Silljeva krasnica (Jestiva): Gladak rub + ugodan miris + blag okus." }
    ],
    habitat: "Sve vrste šuma u ljeto i jesen.",
    kitchen: "OTROVNA! Izaziva povraćanje i proljev.",
    season: "Srpanj – Listopad"
  },

  // 83. CIMETASTA (RAKOVA) KRASNICA
  {
    id: "cimetasta-krasnica",
    name: "Cimetasta (rakova) krasnica",
    latin: "Russula xerampelina (Schff.) Fr.",
    folkNames: ["rakova golubača", "ribarica", "haringina krasnica", "kokošica"],
    wikiQuery: "Russula_xerampelina",
    bozacRef: "Svezak 2, br. 845, str. 136",
    status: "SAFE",
    statusLabel: "🟢 JESTIVA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Krasnica koja u zrelosti miriše na kuhane rakove ili morsku ribu! Meso na pritisak požuti u smeđe, a sa zelenom galicom (FeSO4) trenutačno postane MASLINASTOZELENO.",
    simpleBullets: [
      "Meso s FeSO4 (zelenom galicom) odmah reagira tamno maslinastozeleno.",
      "Miris u zrelosti podsjeća na kuhane morske rakove ili haringu.",
      "Stručak na dodir prstom polako posmeđi."
    ],
    bozacDetails: {
      klobuk: "6–12 cm, vinskocrven do purpurno-smeđ.",
      listici: "Krem do oker, na dodir smeđe.",
      strucak: "Bijel ili karmin-ružičast, na pritisak požuti pa posmeđi.",
      meso: "Čvrsto, blago, miriše na rakove, s FeSO4 zeleno.",
      spore: "8–11 x 7–8,5 µm."
    },
    lookalikes: [
      { targetId: "krvavocrvena-krasnica", trait: "Miris, okus i FeSO4", mine: "Miris na rakove + blag okus + FeSO4 zeleno", other: "Krvavocrvena krasnica: Ljuta + FeSO4 ružičasto." }
    ],
    habitat: "Crnogorične i bjelogorične šume ljeti i u jesen.",
    kitchen: "Dobra jestiva gljiva; neugodan miris na ribu potpuno nestaje kuhanjem.",
    season: "Srpanj – Studeni"
  },

  // 84. CRNKASTA KRASNICA
  {
    id: "crnkasta-krasnica",
    name: "Crnkasta krasnica",
    latin: "Russula nigricans Bull. ex Fr.",
    folkNames: ["ugljenka", "crna golubača", "pougljenka"],
    wikiQuery: "Russula_nigricans",
    bozacRef: "Svezak 2, br. 796, str. 100",
    status: "WARN",
    statusLabel: "🟡 SLABE KVALITETE / NEJESTIVA U STAROSTI",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: " prepoznatljiva po iznimno DEBELIM i RIJETKIM listićima te mesu koje na prerezu prvo POCRVENI poput cigle, a zatim potpuno POCRNI kao ugljen.",
    simpleBullets: [
      "Listići su izrazito debeli, rijetki (razmaknuti) i krhki.",
      "Meso na prerezu najprije pocrveni, a potom pocrni.",
      "Stari primjerci u šumi stoje potpuno crni poput pougljenjenog drveta."
    ],
    bozacDetails: {
      klobuk: "7–20 cm, tvrd, bjelkast pa čađavosmeđ i na kraju crn.",
      listici: "Vrlo rijetki i debeli, žućkasti, na dodir pocrvene pa pocrne.",
      strucak: "Kratak, debeo, tvrd, bjelkast pa crn.",
      meso: "Tvrdo, na zraku pocrveni pa pocrni.",
      spore: "Bijele, 6,5–8 x 6–7 µm."
    },
    lookalikes: [
      { targetId: "gustolistaca-krasnica", trait: "Gustoća listića", mine: "Vrlo RIJETKI i debeli listići", other: "Gustolista krasnica: Vrlo GUSTI i tanki listići." }
    ],
    habitat: "Sve vrste šuma od lipnja do studenog.",
    kitchen: "Jestiva samo posve mlada dok je bijela, no drvenasta je i slabe vrijednosti.",
    season: "Lipanj – Studeni"
  },

  // 85. GUSTOLISTA KRASNICA
  {
    id: "gustolistaca-krasnica",
    name: "Gustolista krasnica",
    latin: "Russula densifolia Secr. ex Gillet",
    folkNames: ["mala ugljenka", "gustolista crnka"],
    wikiQuery: "Russula_densifolia",
    bozacRef: "Svezak 2, br. 798, str. 102",
    status: "DANGER",
    statusLabel: "🔴 NEJESTIVA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Za razliku od crnkaste krasnice, ima vrlo GUSTE listiće, a bijelo meso na prerezu najprije pocrveni, a potom posivi i pocrni.",
    simpleBullets: [
      "Listići su izrazito GUSTI i tanki.",
      "Meso na prerezu prvo pocrveni, a zatim pocrni.",
      "Okus u listićima je umjereno ljut."
    ],
    bozacDetails: {
      klobuk: "5–10 cm, bjelkast pa sivosmeđ i crnkast.",
      listici: "Vrlo gusti, uski, krem.",
      strucak: "Kratak, tvrd, bijel pa crnkast.",
      meso: "Bijelo, crveni pa crni na zraku.",
      spore: "7–9 x 6–7 µm."
    },
    lookalikes: [
      { targetId: "crnkasta-krasnica", trait: "Listići", mine: "Vrlo gusti listići", other: "Crnkasta krasnica: Vrlo rijetki debeli listići." }
    ],
    habitat: "Bukove i crnogorične šume ljeti i u jesen.",
    kitchen: "Nejestiva.",
    season: "Srpanj – Listopad"
  },

  // 86. BIJELA (ZEMLJASTA) KRASNICA
  {
    id: "bijela-krasnica",
    name: "Bijela (zemljasta) krasnica",
    latin: "Russula delica Fries",
    folkNames: ["bijela golubača", "suha paprenjača", "zemljasta golubača", "kravica bijela"],
    wikiQuery: "Russula_delica",
    bozacRef: "Svezak 2, br. 794, str. 98",
    status: "SAFE",
    statusLabel: "🟢 JESTIVA (SLABIJE KVALITETE)",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Krupna bijela ljevkasta krasnica koja izdiže zemlju i lišće; izgleda identično kao paprena mliječnica, ali na prerezu NE PUŠTA nikakvo mlijeko!",
    simpleBullets: [
      "Cijela je prljavobijela s oker mrljama i ljevkastim klobukom.",
      "Na prerezu NEMA mliječnog soka (suha je!).",
      "Uz spoj sa stručkom listići često imaju plavkastozeleni odsjaj."
    ],
    bozacDetails: {
      klobuk: "7–16 cm, tvrd, ljevkast, prljavobijel s ostacima zemlje.",
      listici: "Prilično rijetki, silazni, bjelkasti sa zelenkastim odsjajem.",
      strucak: "Kratak, debeo, bijel.",
      meso: "Bijelo, vrlo tvrdo, bez mlijeka.",
      spore: "8–11 x 7–9 µm."
    },
    lookalikes: [
      { targetId: "paprena-mlijecnica", trait: "Mliječni sok", mine: "NEMA mliječni sok na prerezu", other: "Paprena mliječnica: Pušta obilno BIJELO papreno mlijeko!" }
    ],
    habitat: "Sve vrste šuma od lipnja do studenog.",
    kitchen: "Jestiva, ali tvrdog i pomalo trpkog mesa.",
    season: "Lipanj – Studeni"
  },

  // 87. ZELENKASTA (BREZOVA) KRASNICA
  {
    id: "zelenkasta-krasnica",
    name: "Zelenkasta (brezova) krasnica",
    latin: "Russula aeruginea Lindblad ex Fr.",
    folkNames: ["brezova golubača", "travnata golubača", "zelenka", "sivka"],
    wikiQuery: "Russula_aeruginea",
    bozacRef: "Svezak 2, br. 814, str. 114",
    status: "WARN",
    statusLabel: "🟡 UVJETNO JESTIVA (DOBRO PROKUHATI)",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Zelena krasnica koja raste pod brezama i smrekama; klobuk je travnatozelen i gladak (nije ispucan u polja kao kod R. virescens), s hrđavim točkicama.",
    simpleBullets: [
      "Klobuk je travnatozelen, gladak i za vlage ljepljiv.",
      "Nema prsten ni ovoj, stručak puca kao kreda.",
      "Raste pod brezama i crnogoricom."
    ],
    bozacDetails: {
      klobuk: "5–10 cm, travnatozelen, u sredini tamniji, gladak, rub malo narebran.",
      listici: "Krem-bjelkasti sa smeđim točkicama.",
      strucak: "Bijel, pri dnu s hrđavim mrljama.",
      meso: "Bijelo, krhko, u mladih listića malo ljutkasto.",
      spore: "6,5–9 x 5–6,5 µm."
    },
    lookalikes: [
      { targetId: "zelena-pupavka", trait: "Prsten i ovoj (SMRTNO VAŽNO!)", mine: "NEMA vjenčić ni ovoj + krhak stručak", other: "Zelena pupavka (SMRTONOSNA): IMA viseći vjenčić i vrećasti ovoj u dnu!" },
      { targetId: "zelena-krasnica", trait: "Površina klobuka", mine: "Gladak zeleni klobuk", other: "Zelena krasnica (R. virescens): Klobuk raspucan u bradavičasta polja." }
    ],
    habitat: "Ispod breza i smreka od lipnja do listopada.",
    kitchen: "Obavezno dobro prokuhati jer sirova izaziva probavne smetnje.",
    season: "Lipanj – Listopad"
  },

  // 88. KRVAVOCRVENA KRASNICA
  {
    id: "krvavocrvena-krasnica",
    name: "Krvavocrvena krasnica",
    latin: "Russula sanguinea (Bull.) Fr.",
    folkNames: ["borova bljuvara", "krvava krasnica", "ljuta crvenka"],
    wikiQuery: "Russula_sanguinea",
    bozacRef: "Svezak 2, br. 827, str. 122",
    status: "DANGER",
    statusLabel: "🔴 NEJESTIVA / BLAGO OTROVNA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Raste pod borovima; ima krvavocrveni klobuk čija se kožica teško guli, a stručak je također ružičastocrven i okus mesa je papreno-gorak.",
    simpleBullets: [
      "Klobuk je krvavocrven, a stručak ružičastocrven.",
      "Listići se blago spuštaju niz stručak.",
      "Okus je ljut i gorak, raste isključivo pod borovima."
    ],
    bozacDetails: {
      klobuk: "4–10 cm, krvavocrven, kožica prirasla.",
      listici: "Krem-oker, blago silazni.",
      strucak: "Ružičastocrven, tvrd.",
      meso: "Bijelo, pod kožicom crveno, ljuto i gorko.",
      spore: "7,5–9,5 x 6,5–8 µm."
    },
    lookalikes: [
      { targetId: "jestiva-krasnica", trait: "Okus i boja stručka", mine: "Crven stručak + ljut okus", other: "Jestiva krasnica (R. vesca): Bijel stručak + blag okus po lješnjacima." }
    ],
    habitat: "Borove šume u ljeto i jesen.",
    kitchen: "Nejestiva i blago otrovna.",
    season: "Srpanj – Studeni"
  },

  // 89. LJUBIČASTA (SARDONSKA) KRASNICA
  {
    id: "ljubicasta-krasnica",
    name: "Sardonska (limunskolista) krasnica",
    latin: "Russula sardonia Fries",
    folkNames: ["limunskolista bljuvara", "ljubičasta bljuvara", "paprena ljubičica"],
    wikiQuery: "Russula_sardonia",
    bozacRef: "Svezak 2, br. 829, str. 124",
    status: "DANGER",
    statusLabel: "🔴 OTROVNA (PAPRENA)",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Česta u borovim šumama u kasnu jesen! Klobuk i stručak su tamno purpurnoljubičasti, a listići su LIMUNSKOŽUTI i s kapljicom amonijaka pocrvene.",
    simpleBullets: [
      "Klobuk i stručak su ljubičasto-purpurni, a listići limunskožuti.",
      "Meso je nepodnošljivo ljuto i peče jezik.",
      "Na kap amonijaka listići i meso postanu ružičastocrveni."
    ],
    bozacDetails: {
      klobuk: "5–10 cm, purpurno-ljubičast do vinskocrven.",
      listici: "Gusti, limunskožuti, suze kapljice.",
      strucak: "Ljubičasto-ružičast, tvrd.",
      meso: "Žućkasto, žestoko papreno, s amonijakom crveni.",
      spore: "7–9 x 6–7,5 µm."
    },
    lookalikes: [
      { targetId: "golubaca", trait: "Boja listića i okus", mine: "Limunskožuti listići + žestoko paprena", other: "Golubača (Jestiva): Čisto bijeli elastični listići + blag okus!" }
    ],
    habitat: "Borove šume u jesen.",
    kitchen: "OTROVNA!",
    season: "Rujan – Studeni"
  },

  // 90. ŽUČNA KRASNICA
  {
    id: "zucna-krasnica",
    name: "Žučna krasnica",
    latin: "Russula fellea Fries",
    folkNames: ["žučna golubača", "oker bljuvara", "gorčica"],
    wikiQuery: "Russula_fellea",
    bozacRef: "Svezak 2, br. 823, str. 120",
    status: "DANGER",
    statusLabel: "🔴 NEJESTIVA / BLAGO OTROVNA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Jednobojna slamnato-oker krasnica bukovih šuma (i klobuk, i listići, i stručak su u tonovima oker boje), miriše na kompot od jabuka ili pelargonije, a peče kao žuč i papar!",
    simpleBullets: [
      "Cijela gljiva (klobuk, listići i stručak) je u istom oker-žutom tonu.",
      "Miriše voćno na kuhane jabuke ili pelargonije.",
      "Okus je žestoko ljut i gorak."
    ],
    bozacDetails: {
      klobuk: "4–9 cm, okeržut do boje meda.",
      listici: "Blijedo oker.",
      strucak: "Oker-žućkast, nikad čisto bijel.",
      meso: "Žućkasto, miris na kompot od jabuka, okus žestoko papren.",
      spore: "7,5–9 x 6–7,5 µm."
    },
    lookalikes: [
      { targetId: "zuta-krasnica", trait: "Okus i boja stručka", mine: "Oker stručak + žestoko ljuta", other: "Žuta krasnica: Bijel stručak koji sivi + blag okus." }
    ],
    habitat: "Bukove šume ljeti i u jesen.",
    kitchen: "Nejestiva i blago otrovna.",
    season: "Kolovoz – Studeni"
  },

  // 91. BUKOVA BLJUVARA
  {
    id: "bukova-bljuvara",
    name: "Bukova bljuvara",
    latin: "Russula nobilis Velen. (Russula mairei)",
    folkNames: ["bljuvara", "bukova crvenka", "paprena golubača"],
    wikiQuery: "Russula_nobilis",
    bozacRef: "Svezak 2, br. 833, str. 128",
    status: "DANGER",
    statusLabel: "🔴 OTROVNA (PAPRENA)",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Najčešća crvena bljuvara naših bukovih šuma! Jarkocrveni klobuk čija se kožica teško guli, snježnobijeli listići sa zelenkastim odsjajem i žestoko papren okus.",
    simpleBullets: [
      "Raste u bukovim šumama (dok prava R. emetica raste u tresetu pod smrekom).",
      "Klobuk je jarkocrven, a listići i stručak snježnobijeli.",
      "Meso na vrhu jezika trenutačno peče poput čilija."
    ],
    bozacDetails: {
      klobuk: "4–8 cm, čvrst, jarkocrven, kožica se guli samo na rubu.",
      listici: "Gusti, bijeli s blagim plavkastozelenim odsjajem.",
      strucak: "Bijel, pun, tvrd.",
      meso: "Bijelo, voćnog mirisa i žestoko paprenog okusa.",
      spore: "7–8,5 x 6–6,5 µm."
    },
    lookalikes: [
      { targetId: "jestiva-krasnica", trait: "Boja klobuka i okus", mine: "Jarkocrvena + žestoko paprena", other: "Jestiva krasnica (R. vesca): Mesnato-ružičasta + kratka kožica + blag okus." }
    ],
    habitat: "Bukove šume Medvednice i cijele Hrvatske od ljeta do jeseni.",
    kitchen: "OTROVNA!",
    season: "Srpanj – Studeni"
  },

  // 92. LOMLJIVA KRASNICA
  {
    id: "lomljiva-krasnica",
    name: "Lomljiva krasnica",
    latin: "Russula fragilis (Pers. ex Fr.) Fr.",
    folkNames: ["krhka bljuvara", "mala bljuvara"],
    wikiQuery: "Russula_fragilis",
    bozacRef: "Svezak 2, br. 838, str. 130",
    status: "DANGER",
    statusLabel: "🔴 OTROVNA / NEJESTIVA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Mala, izuzetno krhka crveno-ljubičasta krasnica čija je oštrica listića pod povećalom sitno NAZUBLJENA poput pile, a okus je trenutačno papren.",
    simpleBullets: [
      "Oštrica bijelih listića je sitno nazubljena poput pile.",
      "Klobuk je krhak, crveno-ljubičast s tamnom sredinom.",
      "Okus je žestoko ljut."
    ],
    bozacDetails: {
      klobuk: "2–6 cm, tanak, karmincrven s crnoljubičastim središtem.",
      listici: "Bijeli, s karakteristično nazubljenom oštricom.",
      strucak: "Krhak, bijel, šupalj.",
      meso: "Tanko, miriše na voće (kokos/jabuka), okus ljut.",
      spore: "7,5–9 x 6–7,5 µm."
    },
    lookalikes: [
      { targetId: "bljuvara", trait: "Oštrica listića", mine: "Nazubljena oštrica listića", other: "Bljuvara: Glatka oštrica listića." }
    ],
    habitat: "Sve vrste šuma u ljeto i jesen.",
    kitchen: "Otrovna (izaziva probavne smetnje).",
    season: "Srpanj – Studeni"
  },

  // ==========================================
  // ROD LACTARIUS (MLIJEČNICE) — 20 VRSTA (93–112)
  // ==========================================

  // 93. KRVNA (KRVAVA) RUJNICA
  {
    id: "krvava-rujnica",
    name: "Krvna rujnica (Krvava rujnica)",
    latin: "Lactarius sanguifluus (Paulet) Fr.",
    folkNames: ["briza", "krvavica", "borovka", "istarska rujnica", "vino-rujnica", "brinjovka"],
    wikiQuery: "Lactarius_sanguifluus",
    bozacRef: "Svezak 2, br. 744, str. 62",
    status: "SAFE",
    statusLabel: "🟢 VRHUNSKA DELIKATESA",
    regions: ["istra_kvarner", "dalmacija", "karlovac", "medvednica_zagorje"],
    hymenium: "listici", growth: "tlo", latex: "narancasto", ring: "bez",
    shortSummary: "Najukusnija od svih rujnica i kraljica istarskih i primorskih borika! Raste pod borovima na vapnenačkom tlu, a na prerezu odmah pušta gusto VINSKOCRVENO (krvavo) mlijeko, ne narančasto!",
    simpleBullets: [
      "Na prerezu od prve sekunde pušta tamno VINSKOCRVENO mlijeko (boje crnog vina).",
      "Raste pod crnim i alepskim borom na vapnenačkim terenima (Istra, Kvarner, Dalmacija, Žumberak).",
      "Cijela je prošarana vinsko-ljubičastim i zelenim tonovima."
    ],
    bozacDetails: {
      klobuk: "5–12 cm, mesnat, narančasto-oker s vinskocrvenim i zelenkastim mrljama.",
      listici: "Gusti, blijedonarančasti s vinskocrvenim odsjajem.",
      strucak: "Kratak, čvrst, s vinskocrvenim jamicama.",
      meso: "Čvrsto, pušta tamnocrveno mlijeko blagog okusa.",
      spore: "7,5–9,5 x 6–7,5 µm."
    },
    lookalikes: [
      { targetId: "plemenita-rujnica", trait: "Boja mlijeka", mine: "Odmah tamno VINSKOCRVENO mlijeko", other: "Plemenita rujnica: Mlijeko boje mrkve (narančasto)." }
    ],
    habitat: "Borove šume na vapnencu u Istri, Primorju, Dalmaciji i Žumberku u jesen.",
    kitchen: "Apsolutni kulinarski vrh među mliječnicama, najbolja na gradelama ili tavi s maslinovim uljem.",
    season: "Rujan – Prosinac"
  },

  // 94. JELOVA (JAMASTA) RUJNICA
  {
    id: "jelova-rujnica",
    name: "Jelova rujnica (Jamasta rujnica)",
    latin: "Lactarius salmonicolor R. Heim & Leclair",
    folkNames: ["jelovka", "briza", "gorska rujnica", "jamasta rujnica", "lososna rujnica"],
    wikiQuery: "Lactarius_salmonicolor",
    bozacRef: "Svezak 2, br. 746, str. 64",
    status: "SAFE",
    statusLabel: "🟢 JESTIVA",
    regions: ["gorski_kotar", "medvednica_zagorje", "karlovac"],
    hymenium: "listici", growth: "tlo", latex: "narancasto", ring: "bez",
    shortSummary: "Prepoznatljiva rujnica Gorskog kotara, Like i vršnog dijela Medvednice koja raste ISKLJUČIVO pod jelama (Abies alba) i gotovo nikada ne pozeleni! Klobuk i mlijeko su žive losos-narančaste boje, a stručak je pun krupnih jamica.",
    simpleBullets: [
      "Raste isključivo ispod običnih jela (Gorski kotar, Lika, Kapela, Velebit, vršni dio Medvednice).",
      "Gotovo nikada nema zelene mrlje po klobuku.",
      "Stručak je gusto prekriven tamnonarančastim jamicama."
    ],
    bozacDetails: {
      klobuk: "6–15 cm, losos-narančast do žutonarančast, ne zeleni.",
      listici: "Narančasti, silazni.",
      strucak: "Šupalj, losos-narančast s izrazitim jamicama.",
      meso: "Narančasto mlijeko, blago gorkastog okusa.",
      spore: "8,5–11 x 6,5–8 µm."
    },
    lookalikes: [
      { targetId: "smrekova-rujnica", trait: "Stablo i zelenjenje", mine: "Pod jelom + NE zeleni + jamice na stručku", other: "Smrekina rujnica: Pod smrekom + jako pozeleni + bez jamica." },
      { targetId: "zuta-mlijecnica", trait: "Boja mlijeka", mine: "Losos-narančasto mlijeko", other: "Žuta mliječnica (Otrovna): Bijelo mlijeko koje požuti u sumpornožuto!" }
    ],
    habitat: "Gorske jelove i bukovo-jelove šume Gorskog kotara, Like i Medvednice od kolovoza do studenog.",
    kitchen: "Dobra jestiva gljiva za prženje i kiseljenje.",
    season: "Kolovoz – Studeni"
  },

  // 95. POLUKRVAVA RUJNICA
  {
    id: "polukrvava-rujnica",
    name: "Polukrvava rujnica",
    latin: "Lactarius semisanguifluus R. Heim & Leclair",
    folkNames: ["zelena briza", "borovka", "polukrvavica", "rujnica"],
    wikiQuery: "Lactarius_semisanguifluus",
    bozacRef: "Svezak 2, br. 745, str. 62",
    status: "SAFE",
    statusLabel: "🟢 IZVRSNA JESTIVA",
    hymenium: "listici", growth: "tlo", latex: "narancasto", ring: "bez",
    shortSummary: "Borova rujnica čiji klobuk brzo postane gotovo posve zelen, a narančasto mlijeko na prerezu za 5 do 8 minuta pocrveni u boju crnog vina.",
    simpleBullets: [
      "Mlijeko je u prvoj sekundi narančasto, ali za 5 minuta postane vinskocrveno.",
      "Klobuk vrlo brzo poprimi maslinastozelenu boju.",
      "Raste pod borovima na vapnencu."
    ],
    bozacDetails: {
      klobuk: "5–10 cm, narančast, ubrzo sav prekriven zelenom patinom.",
      listici: "Narančasti, na dodir pozelene.",
      strucak: "Kratak, s jamicama.",
      meso: "Na prerezu za 5 minuta vinskocrveno.",
      spore: "8–10 x 6,5–8 µm."
    },
    lookalikes: [
      { targetId: "krvava-rujnica", trait: "Brzina crvenjenja mlijeka", mine: "Mlijeko prvo narančasto pa za 5 min pocrveni", other: "Krvava rujnica: Mlijeko je od prve sekunde vinskocrveno." }
    ],
    habitat: "Borove šume i travnati proplanci s klekom u jesen.",
    kitchen: "Odlična na tavi i žaru.",
    season: "Rujan – Studeni"
  },

  // 96. PAPRENA MLIJEČNICA (PAPRENJAČA)
  {
    id: "paprena-mlijecnica",
    name: "Paprena mliječnica (Paprenjača)",
    latin: "Lactarius piperatus (L. ex Fr.) Pers.",
    folkNames: ["paprenjača", "bijela mliječnica", "mliječerka", "kravica", "paprenka", "sirovica bijela"],
    wikiQuery: "Lactarius_piperatus",
    bozacRef: "Svezak 2, br. 736, str. 56",
    status: "WARN",
    statusLabel: "🟡 UVJETNO JESTIVA (SPECIJALITET NA ŽARU)",
    hymenium: "listici", growth: "tlo", latex: "bijelo", ring: "bez",
    shortSummary: "Velika snježnobijela gljiva s IZNIMNO GUSTIM uskim listićima koja na prerezu pušta obilno bijelo papreno mlijeko. Pečena na žaru sa slaninom gubi ljutinu i postaje tradicionalni specijalitet!",
    simpleBullets: [
      "Listići su iznimno GUSTI, tanki i uski poput listova knjige.",
      "Cijela gljiva je čisto bijela, tvrda i glatka.",
      "Na prerezu pušta obilno bijelo mlijeko koje ostaje bijelo."
    ],
    bozacDetails: {
      klobuk: "6–16 cm, ljevkast, tvrd, bijel, gladak.",
      listici: "Iznimno gusti, vrlo uski, račvasti, bijeli do krem.",
      strucak: "Čvrst, pun, bijel, prema dnu uži.",
      meso: "Bijelo, tvrdo, s obilnim bijelim paprenim mlijekom koje ne mijenja boju.",
      spore: "Bijele, 6,5–9 x 5–7 µm."
    },
    lookalikes: [
      { targetId: "barsunasta-mlijecnica", trait: "Gustoća listića i površina klobuka", mine: "Vrlo GUSTI listići + gladak klobuk", other: "Baršunasta mliječnica (Nejestiva): RIJETKI debeli listići + baršunast klobuk!" },
      { targetId: "bijela-krasnica", trait: "Mliječni sok", mine: "Pušta obilno bijelo mlijeko", other: "Bijela krasnica: Nema mlijeka na prerezu." }
    ],
    habitat: "Hrastove i bukove šume u ljeto (čak i za najvećih suša).",
    kitchen: "U kontinentalnoj Hrvatskoj tradicionalno se peče na žaru/ploči štednjaka posoljena s preprženom slaninom i češnjakom (toplina razgrađuje paprene seskviterpene).",
    season: "Lipanj – Rujan"
  },

  // 97. ZELENKASTA PAPRENJAČA
  {
    id: "zelenkasta-paprenjaca",
    name: "Zelenkasta paprenjača",
    latin: "Lactarius glaucescens Crossl.",
    folkNames: ["paprenjača", "zelena mliječerka", "modreća paprenjača"],
    wikiQuery: "Lactarius_glaucescens",
    bozacRef: "Svezak 2, br. 737, str. 56",
    status: "WARN",
    statusLabel: "🟡 UVJETNO JESTIVA",
    hymenium: "listici", growth: "tlo", latex: "bijelo", ring: "bez",
    shortSummary: "Bliska srodnica paprenjače s vrlo gustim listićima čije bijelo mlijeko sušenjem na zraku poprimi MASLINASTOZELENU boju, a s kapljicom KOH trenutačno postane narančastožuto.",
    simpleBullets: [
      "Bijelo mlijeko se na zraku nakon 20–30 minuta osuši u zelenkaste kapljice.",
      "S kalijevom lužinom (KOH) mlijeko trenutačno požuti.",
      "Izrazito gusti uski listići kao kod prave paprenjače."
    ],
    bozacDetails: {
      klobuk: "5–14 cm, tvrd, bijel s oker mrljama.",
      listici: "Vrlo gusti, uski, bjelkasti sa zelenkastim mrljama.",
      strucak: "Kratak, pun, bijel.",
      meso: "Bijelo mlijeko koje zeleni, s KOH narančastožuto.",
      spore: "6,5–8,5 x 5–6,5 µm."
    },
    lookalikes: [
      { targetId: "paprena-mlijecnica", trait: "Promjena boje mlijeka", mine: "Mlijeko pozeleni na zraku i požuti s KOH", other: "Paprena mliječnica: Mlijeko ostaje bijelo." }
    ],
    habitat: "Bukove i hrastove šume ljeti.",
    kitchen: "Priprema se jednako kao prava paprenjača (dobro pečena na žaru).",
    season: "Lipanj – Rujan"
  },

  // 98. BARŠUNASTA MLIJEČNICA (MLIJEČNA RUNJAVKA)
  {
    id: "barsunasta-mlijecnica",
    name: "Baršunasta mliječnica (Mliječna runjavka)",
    latin: "Lactarius vellereus (Fr.) Fr.",
    folkNames: ["runjavka", "lažna paprenjača", "dlakava paprenjača", "velika bijela mliječnica"],
    wikiQuery: "Lactarius_vellereus",
    bozacRef: "Svezak 2, br. 738, str. 58",
    status: "DANGER",
    statusLabel: "🔴 NEJESTIVA",
    hymenium: "listici", growth: "tlo", latex: "bijelo", ring: "bez",
    shortSummary: "Ogromna bijela šumska gljiva (do 25 cm!) s BARŠUNASTO DLAKAVIM klobukom i RIJETKIM debelim listićima. Često je zamijene s paprenjačom, no runjavka ostaje gorka i nejestiva i nakon pečenja!",
    simpleBullets: [
      "Listići su RIJETKI (razmaknuti) i debeli (kod paprenjače su gusti!).",
      "Površina klobuka je suha i baršunasto-pustenasta poput čohe.",
      "Bijelo mlijeko je gorko i papreno."
    ],
    bozacDetails: {
      klobuk: "8–25 cm, ljevkast, bijel do žućkast, gusto baršunasto dlakav.",
      listici: "Rijetki, debeli, bjelkasti pa oker.",
      strucak: "Kratak, vrlo debeo, baršunast.",
      meso: "Tvrdo, bijelo mlijeko gorko-paprenog okusa.",
      spore: "7,5–9,5 x 6,5–8,5 µm."
    },
    lookalikes: [
      { targetId: "paprena-mlijecnica", trait: "Gustoća listića i klobuk", mine: "RIJETKI listići + baršunast klobuk (Nejestiva)", other: "Paprenjača: Vrlo GUSTI uski listići + gladak klobuk." }
    ],
    habitat: "Bukove i hrastove šume ljeti i u jesen.",
    kitchen: "Nejestiva (pretvrda i trajno gorka).",
    season: "Srpanj – Listopad"
  },

  // 99. PRESNAC (SIROVA MLIJEČNICA)
  {
    id: "presnac",
    name: "Presnac (Sirova mliječnica)",
    latin: "Lactarius volemus (Fr.) Fr.",
    folkNames: ["presnac", "sirovica", "kravica", "prijesnac", "slatka mliječnica", "hljebarka"],
    wikiQuery: "Lactarius_volemus",
    bozacRef: "Svezak 2, br. 784, str. 90",
    status: "SAFE",
    statusLabel: "🟢 IZVRSNA JESTIVA (I SIROVA!)",
    hymenium: "listici", growth: "tlo", latex: "bijelo", ring: "bez",
    shortSummary: "Narančastosmeđa mliječnica koja na najmanji zarez luči enormne količine SLATKASTOG bijelog mlijeka koje na prstima ostavlja ljepljive smeđe mrlje i miriše na ribu (haringu).",
    simpleBullets: [
      "Pušta obilno bijelo mlijeko koje je potpuno BLAGO i slatkasto (ne peče!).",
      "Mlijeko na zraku posmeđi i lijepi se za prste.",
      "Meso s kristalima zelene galice (FeSO4) trenutačno pozeleni."
    ],
    bozacDetails: {
      klobuk: "5–14 cm, mesnat, suh, baršunast, narančastosmeđ do zlatnosmeđ.",
      listici: "Krem-žuti, na dodir odmah posmeđe.",
      strucak: "Pun, tvrd, boje klobuka.",
      meso: "Bjelkasto, miriše na kuhane rakove/ribu, sa FeSO4 zeleno.",
      spore: "Okruglaste, mrežaste, 8–10 µm."
    },
    lookalikes: [
      { targetId: "ridja-mlijecnica", trait: "Okus mlijeka i grbica", mine: "Potpuno BLAGO mlijeko + bez oštre grbice", other: "Riđa mliječnica (Otrovna): Mlijeko peče kao vatra + oštra grbica na klobuku!" }
    ],
    habitat: "Bjelogorične šume (bukva, hrast, kesten) ljeti.",
    kitchen: "Izvrsna pržena na maslacu ili slanini; narodno ime 'presnac' dobila je jer se može jesti i sirova (prijesna)!",
    season: "Lipanj – Rujan"
  },

  // 100. HRASTOVA MLIJEČNICA
  {
    id: "hrastova-mlijecnica",
    name: "Hrastova mliječnica",
    latin: "Lactarius quietus (Fr.) Fr.",
    folkNames: ["stjeničarka", "hrastova sirovica", "mirna mliječnica"],
    wikiQuery: "Lactarius_quietus",
    bozacRef: "Svezak 2, br. 775, str. 84",
    status: "DANGER",
    statusLabel: "🔴 NEJESTIVA",
    hymenium: "listici", growth: "tlo", latex: "bijelo", ring: "bez",
    shortSummary: "Najčešća mliječnica ispod hrastova! Smeđecrvenkasti klobuk s tamnijim krugovima, blijedožućkasto mlijeko i specifičan miris na stjenice ili vlažno rublje.",
    simpleBullets: [
      "Raste isključivo u simbiozi s hrastom (Quercus).",
      "Klobuk je cimetasto-smeđ s tamnijim koncentričnim krugovima.",
      "Miriše na stjenice (smrdljive martine) ili ulje."
    ],
    bozacDetails: {
      klobuk: "4–9 cm, cimetastosmeđ s tamnijim zonama.",
      listici: "Bjelkasti pa crvenkastosmeđi.",
      strucak: "Boje klobuka, prema dnu tamniji i vinskocrven.",
      meso: "Mlijeko krem-bijelo, miris na stjenice.",
      spore: "7,5–9 x 6,5–7,5 µm."
    },
    lookalikes: [
      { targetId: "slatkasta-mlijecnica", trait: "Stablo i krugovi na klobuku", mine: "Pod hrastom + koncentrični krugovi", other: "Slatkasta mliječnica: Pod bukvom + klobuk bez krugova." }
    ],
    habitat: "Hrastove šume od ljeta do kasne jeseni.",
    kitchen: "Nejestiva zbog neugodnog mirisa i okusa.",
    season: "Srpanj – Studeni"
  },

  // 101. SLATKASTA MLIJEČNICA
  {
    id: "slatkasta-mlijecnica",
    name: "Slatkasta (bukova) mliječnica",
    latin: "Lactarius subdulcis (Pers. ex Fr.) S. F. Gray",
    folkNames: ["bukova sirovica", "slatka mliječnica", "mala kravica"],
    wikiQuery: "Lactarius_subdulcis",
    bozacRef: "Svezak 2, br. 778, str. 86",
    status: "SAFE",
    statusLabel: "🟢 JESTIVA",
    hymenium: "listici", growth: "tlo", latex: "bijelo", ring: "bez",
    shortSummary: "Masovna jesenska gljiva bukovih šuma! Manji crvenkastosmeđi klobuk BEZ krugova i vodenastobijelo mlijeko blago gorkasto-slatkastog okusa.",
    simpleBullets: [
      "Raste u velikom broju u bukovoj šuški u jesen.",
      "Klobuk je jednobojno smeđecrvenkast bez koncentričnih zona.",
      "Mlijeko je bijelo i blagog okusa."
    ],
    bozacDetails: {
      klobuk: "3–7 cm, ulegnut s malom grbicom, cimetastosmeđ.",
      listici: "Gusti, bjelkasti pa mesnatosmeđi.",
      strucak: "Tanak, šupalj, u dnu dlakav.",
      meso: "Tanko, bijelo mlijeko blagog okusa.",
      spore: "7,5–9,5 x 6–7,5 µm."
    },
    lookalikes: [
      { targetId: "ridja-mlijecnica", trait: "Okus mlijeka", mine: "Blago mlijeko (pod bukvom)", other: "Riđa mliječnica (Otrovna): Žestoko papreno mlijeko (pod crnogoricom)!" }
    ],
    habitat: "Bukove šume od kolovoza do studenog.",
    kitchen: "Jestiva u miješanim jelima od gljiva.",
    season: "Kolovoz – Studeni"
  },

  // 102. KAMFORNA MLIJEČNICA
  {
    id: "kamforna-mlijecnica",
    name: "Kamforna mliječnica",
    latin: "Lactarius camphoratus (Bull. ex Fr.) Fr.",
    folkNames: ["maggi gljiva", "začinska mliječnica", "cikorijača"],
    wikiQuery: "Lactarius_camphoratus",
    bozacRef: "Svezak 2, br. 782, str. 88",
    status: "SAFE",
    statusLabel: "🟢 ZAČINSKA JESTIVA",
    hymenium: "listici", growth: "tlo", latex: "vodenasto", ring: "bez",
    shortSummary: "Mala tamno crvenosmeđa mliječnica s vodenastim mlijekom koja pri sušenju razvija snažan miris na cikoriju, piskavicu i Maggi začin za juhu!",
    simpleBullets: [
      "Sušenjem intenzivno miriše na Maggi kocku za juhu ili cikoriju.",
      "Klobuk je malen (2–5 cm), tamno crvenosmeđ.",
      "Mlijeko je rijetko, vodenastobijelo i blago."
    ],
    bozacDetails: {
      klobuk: "2–5 cm, tamno crvenosmeđ, s malom bradavicom.",
      listici: "Gusti, crvenkasto-oker.",
      strucak: "Tanak, boje klobuka.",
      meso: "Tanko, vodenasto mlijeko, jak miris na začin Maggi / cikoriju.",
      spore: "7–8,5 x 6–7,5 µm."
    },
    lookalikes: [
      { targetId: "slatkasta-mlijecnica", trait: "Miris pri sušenju", mine: "Jak miris na Maggi začin", other: "Slatkasta mliječnica: Blag miris na gumu/lišće." }
    ],
    habitat: "Kisela tla u crnogoričnim i bukovim šumama.",
    kitchen: "Osušena i samljevena u prah koristi se kao vrhunski prirodni začin za umake i juhe.",
    season: "Srpanj – Studeni"
  },

  // 103. SMRDLJIVA (LJUTA) MLIJEČNICA
  {
    id: "smrdljiva-mlijecnica",
    name: "Lješnjakova (ljuta) mliječnica",
    latin: "Lactarius pyrogalus (Bull. ex Fr.) Fr.",
    folkNames: ["lješnjakova mliječnica", "vatrena mliječnica", "ljuta kravica"],
    wikiQuery: "Lactarius_pyrogalus",
    bozacRef: "Svezak 2, br. 760, str. 74",
    status: "DANGER",
    statusLabel: "🔴 OTROVNA (VRLO LJUTA)",
    hymenium: "listici", growth: "tlo", latex: "bijelo", ring: "bez",
    shortSummary: "Raste uvijek ispod grmova lijeske (Corylus avellana)! Sivo-maslinasti klobuk, rijetki okeržuti listići i bijelo mlijeko koje pali jezik poput vatre.",
    simpleBullets: [
      "Raste isključivo ispod lijeske.",
      "Listići su prilično rijetki i žutonarančasti.",
      "Bijelo mlijeko je ekstremno ljuto (s KOH postane zlatnožuto)."
    ],
    bozacDetails: {
      klobuk: "4–9 cm, sivo-oker do sivo-maslinast.",
      listici: "Rijetki, oker-narančasti.",
      strucak: "Bjelkasto-sivkast, šupalj.",
      meso: "Bijelo mlijeko ekstremno peče.",
      spore: "6,5–8 x 5,5–7 µm."
    },
    lookalikes: [
      { targetId: "ljepljiva-mlijecnica", trait: "Listići i stablo", mine: "Rijetki žuti listići pod lijeskom", other: "Ljepljiva mliječnica: Gusti bijeli listići pod bukvom." }
    ],
    habitat: "Šikare i rubovi šuma uz lijesku u ljeto i jesen.",
    kitchen: "OTROVNA!",
    season: "Kolovoz – Listopad"
  },

  // 104. ŽUTA MLIJEČNICA (ŽUTI JAMIČAR)
  {
    id: "zuta-mlijecnica",
    name: "Žuta mliječnica (Žuti jamičar)",
    latin: "Lactarius scrobiculatus (Scop. ex Fr.) Fr.",
    folkNames: ["žuti jamičar", "pasja rujnica", "smrekova žuta mliječnica"],
    wikiQuery: "Lactarius_scrobiculatus",
    bozacRef: "Svezak 2, br. 747, str. 64",
    status: "DANGER",
    statusLabel: "🔴 OTROVNA",
    hymenium: "listici", growth: "tlo", latex: "bijelo", ring: "bez",
    shortSummary: "Velika zlatnožuta mliječnica smrekovih šuma s čupavim rubom klobuka, krupnim jamicama na stručku i bijelim mlijekom koje u 3 sekunde na zraku postane SUMPORASTOŽUTO!",
    simpleBullets: [
      "Bijelo mlijeko na zraku u par sekundi postane jarko sumporastožuto!",
      "Stručak je prekriven krupnim sjajnim žutim jamicama.",
      "Rub klobuka je vunasto čupav."
    ],
    bozacDetails: {
      klobuk: "8–20 cm, ljevkast, zlatnožut, sluzav, rub dlakav.",
      listici: "Bjelkasto-žućkasti, silazni.",
      strucak: "Kratak, debeo, s krupnim jamicama.",
      meso: "Mlijeko bijelo, odmah požuti, žestoko papreno.",
      spore: "7,5–9 x 6–7 µm."
    },
    lookalikes: [
      { targetId: "jelova-rujnica", trait: "Boja mlijeka", mine: "Bijelo mlijeko koje požuti u sumpornožuto", other: "Jelova rujnica (Jestiva): Mlijeko je losos-narančasto i blago!" }
    ],
    habitat: "Planinske šume smreke (Gorski kotar, Velebit, Sljeme).",
    kitchen: "OTROVNA u sirovom i pečenom stanju.",
    season: "Kolovoz – Listopad"
  },

  // 105. BLIJEDA MLIJEČNICA
  {
    id: "blijeda-mlijecnica",
    name: "Blijeda mliječnica",
    latin: "Lactarius pallidus Pers. ex Fr.",
    folkNames: ["blijeda bukovača mliječna", "kožnata mliječnica"],
    wikiQuery: "Lactarius_pallidus",
    bozacRef: "Svezak 2, br. 758, str. 72",
    status: "DANGER",
    statusLabel: "🔴 NEJESTIVA",
    hymenium: "listici", growth: "tlo", latex: "bijelo", ring: "bez",
    shortSummary: "Vrlo česta mliječnica u bukovim šumama; jednobojno blijedo-mesnato-oker boje, sluzavog klobuka i gorko-ljutkastog bijelog mlijeka.",
    simpleBullets: [
      "Raste isključivo pod bukvama.",
      "Cijela gljiva je blijede boje kože ili bijele kave, bez koncentričnih krugova.",
      "Mlijeko je bijelo i gorkasto-ljuto."
    ],
    bozacDetails: {
      klobuk: "5–10 cm, sluzav, blijedo-mesnato-oker, bez zona.",
      listici: "Blijedo oker.",
      strucak: "Šupalj, iste boje kao klobuk.",
      meso: "Bijelo mlijeko neugodnog gorko-ljutog okusa.",
      spore: "7,5–9,5 x 6–7,5 µm."
    },
    lookalikes: [
      { targetId: "slatkasta-mlijecnica", trait: "Sluzavost i boja", mine: "Sluzav blijedo-oker klobuk + ljutkasto mlijeko", other: "Slatkasta mliječnica: Suh smeđecrvenkast klobuk + blago mlijeko." }
    ],
    habitat: "Bukove šume od ljeta do jeseni.",
    kitchen: "Nejestiva.",
    season: "Kolovoz – Studeni"
  },

  // 106. LJEPLJIVA (BUKOVA) MLIJEČNICA
  {
    id: "ljepljiva-mlijecnica",
    name: "Ljepljiva (bukova) mliječnica",
    latin: "Lactarius blennius (Fr.) Fr.",
    folkNames: ["sluzava bukova mliječnica", "pjegava mliječnica"],
    wikiQuery: "Lactarius_blennius",
    bozacRef: "Svezak 2, br. 755, str. 70",
    status: "DANGER",
    statusLabel: "🔴 NEJESTIVA / BLAGO OTROVNA",
    hymenium: "listici", growth: "tlo", latex: "bijelo", ring: "bez",
    shortSummary: "Masovna u bukovim šumama! Sluzav sivo-maslinastozeleni klobuk s tamnim točkastim krugovima, a bijelo mlijeko na oštećenim listićima sušenjem postane PEPELJASTOSIVO.",
    simpleBullets: [
      "Klobuk je jako sluzav, maslinastozelen sa sitnim tamnim mrljama u krugovima.",
      "Bijeli listići na dodir posive, a mlijeko se suši u sivozelene kapljice.",
      "Okus je žestoko papren."
    ],
    bozacDetails: {
      klobuk: "4–10 cm, sluzav, maslinastozelen do sivosmeđ s kapljičastim zonama.",
      listici: "Gusti, bijeli, na ranama sivozeleni.",
      strucak: "Ljepljiv, sivkastozelenkast.",
      meso: "Bijelo mlijeko koje se suši u sivozeleno, papreno.",
      spore: "6,5–8,5 x 5,5–6,5 µm."
    },
    lookalikes: [
      { targetId: "smedozelena-krasnica", trait: "Mlijeko", mine: "Pušta bijelo papreno mlijeko", other: "Smeđozelena krasnica (Jestiva): Nema mlijeka + blag okus." }
    ],
    habitat: "Isključivo u bukovim šumama ljeti i u jesen.",
    kitchen: "Nejestiva.",
    season: "Kolovoz – Studeni"
  },

  // 107. CRNA (MRKA) MLIJEČNICA
  {
    id: "crna-mlijecnica",
    name: "Crna (mrka) mliječnica",
    latin: "Lactarius turpis (Weinm.) Fr. (Lactarius necator)",
    folkNames: ["mrka mliječnica", "crna brezovka", "maslinastocrna mliječnica"],
    wikiQuery: "Lactarius_turpis",
    bozacRef: "Svezak 2, br. 752, str. 68",
    status: "DANGER",
    statusLabel: "🔴 OTROVNA (MUTAGENA)",
    hymenium: "listici", growth: "tlo", latex: "bijelo", ring: "bez",
    shortSummary: "Tamno maslinastocrna mliječnica koja raste pod brezom i smrekom. Sadrži mutageni spoj nekatorin koji se ne razgrađuje ni kuhanjem! S kapljicom KOH klobuk trenutačno postane ljubičast.",
    simpleBullets: [
      "Klobuk je tamno maslinastosmeđ do crnkast s baršunastim rubom.",
      "S lužinom (KOH) klobuk i mlijeko trenutačno reagiraju ljubičasto.",
      "Sadrži mutageni toksin nekatorin."
    ],
    bozacDetails: {
      klobuk: "6–15 cm, maslinastocrn, u mladosti sa žutozelenim pustenastim rubom.",
      listici: "Prljavobijeli pa oker, na dodir posmeđe.",
      strucak: "Kratak, maslinastosmeđ.",
      meso: "Bijelo papreno mlijeko, s KOH ljubičasto.",
      spore: "6,5–8,5 x 5,5–6,5 µm."
    },
    lookalikes: [
      { targetId: "crnkasta-krasnica", trait: "Mlijeko i listići", mine: "Pušta bijelo mlijeko + gusti listići", other: "Crnkasta krasnica: Nema mlijeka + rijetki debeli listići." }
    ],
    habitat: "Pod brezama i smrekama u jesen.",
    kitchen: "OTROVNA (dokazano mutagena)!",
    season: "Kolovoz – Studeni"
  },

  // 108. RIĐA MLIJEČNICA
  {
    id: "ridja-mlijecnica",
    name: "Riđa mliječnica",
    latin: "Lactarius rufus (Scop. ex Fr.) Fr.",
    folkNames: ["gorčica", "ljuta crvenosmeđa mliječnica", "lažni presnac"],
    wikiQuery: "Lactarius_rufus",
    bozacRef: "Svezak 2, br. 772, str. 82",
    status: "DANGER",
    statusLabel: "🔴 OTROVNA (EKSTREMNO PAPRENA)",
    hymenium: "listici", growth: "tlo", latex: "bijelo", ring: "bez",
    shortSummary: "Crvenosmeđa mliječnica s OŠTROM ŠILJATOM GRBICOM u sredini klobuka i bijelim mlijekom koje nakon par sekundi žvakanja izaziva nepodnošljivo pečenje u ustima!",
    simpleBullets: [
      "U samom središtu ulegnutog klobuka uvijek stoji oštra šiljata bradavica (grbica).",
      "Mlijeko je bijelo i izaziva žestoko pečenje jezika.",
      "Raste u kiselim crnogoričnim i brezovim šumama."
    ],
    bozacDetails: {
      klobuk: "4–9 cm, suh, crvenosmeđ, s oštrom grbicom u sredini.",
      listici: "Gusti, oker-crvenkasti.",
      strucak: "Svjetlije crvenosmeđ, u bazi bjelkasto pustenast.",
      meso: "Bijelo mlijeko ekstremno ljuto.",
      spore: "7,5–9,5 x 6–7 µm."
    },
    lookalikes: [
      { targetId: "presnac", trait: "Grbica na klobuku i okus mlijeka", mine: "Oštra grbica + mlijeko peče kao vatra", other: "Presnac (Jestiv): Bez grbice + potpuno blago mlijeko!" }
    ],
    habitat: "Crnogorične šume (smreka, bor) od ljeta do kasne jeseni.",
    kitchen: "OTROVNA u sirovom i pečenom stanju.",
    season: "Srpanj – Studeni"
  },

  // 109. MIRIŠLJAVA (KOKOSOVA) MLIJEČNICA
  {
    id: "ciklina-mlijecnica",
    name: "Mirišljava (kokosova) mliječnica",
    latin: "Lactarius glyciosmus (Fr. ex Fr.) Fr.",
    folkNames: ["kokosovka", "mirisna mliječnica", "kokosova gljiva"],
    wikiQuery: "Lactarius_glyciosmus",
    bozacRef: "Svezak 2, br. 768, str. 78",
    status: "SAFE",
    statusLabel: "🟢 JESTIVA (ZAČINSKA)",
    hymenium: "listici", growth: "tlo", latex: "bijelo", ring: "bez",
    shortSummary: "Mala sivo-ljubičasta mliječnica koja raste pod brezama i ima nevjerojatno ugodan, snažan miris na KOKOSOVO BRAŠNO!",
    simpleBullets: [
      "Intenzivno i nepogrešivo miriše na kokos (kokosovo brašno).",
      "Klobuk je suh, pustenast, pepeljasto-ružičastosiv.",
      "Raste isključivo pod brezama."
    ],
    bozacDetails: {
      klobuk: "2–6 cm, tanak, sivkasto-ljubičast, s malom grbicom.",
      listici: "Gusti, krem-ružičasti.",
      strucak: "Krhak, bjelkasto-sivkast.",
      meso: "Bijelo mlijeko, miris na kokos.",
      spore: "7–8,5 x 5,5–6,5 µm."
    },
    lookalikes: [
      { targetId: "kamforna-mlijecnica", trait: "Miris i boja", mine: "Sivkasta + miris na kokos", other: "Kamforna mliječnica: Crvenosmeđa + miris na Maggi začin." }
    ],
    habitat: "Vlažna mjesta pod brezama u jesen.",
    kitchen: "Jestiva u malim količinama kao aromatični dodatak.",
    season: "Kolovoz – Studeni"
  },

  // 110. SMOLASTA MLIJEČNICA
  {
    id: "smolasta-mlijecnica",
    name: "Smolasta mliječnica",
    latin: "Lactarius picinus Fries",
    folkNames: ["baršunasta crna mliječnica", "smrekova smolavka"],
    wikiQuery: "Lactarius_picinus",
    bozacRef: "Svezak 2, br. 789, str. 94",
    status: "DANGER",
    statusLabel: "🔴 NEJESTIVA",
    hymenium: "listici", growth: "tlo", latex: "bijelo", ring: "bez",
    shortSummary: "Planinska mliječnica s baršunastim tamno čokoladnosmeđim (gotovo crnim) klobukom, oker listićima i bijelim mlijekom koje na mesu polako poružičasti.",
    simpleBullets: [
      "Klobuk je baršunast, tamno čokoladnosmeđ do crnosmeđ.",
      "Bijelo meso s mlijekom na prerezu polako postane losos-ružičasto.",
      "Okus je gorak i ljut."
    ],
    bozacDetails: {
      klobuk: "4–10 cm, baršunast, tamno umbra-smeđ.",
      listici: "Gusti, kontrastno okeržuti.",
      strucak: "Smeđ, baršunast.",
      meso: "Bijelo, na zraku u dodiru s mlijekom pocrveni, gorko-ljuto.",
      spore: "Okruglaste, mrežaste, 8–10 µm."
    },
    lookalikes: [
      { targetId: "cadjava-mlijecnica", trait: "Boja klobuka i stanište", mine: "Gotovo crnosmeđ klobuk pod smrekom + ljuta", other: "Čađava mliječnica: Sivosmeđ klobuk pod bjelogoricom + blaža." }
    ],
    habitat: "Planinske smrekove šume Gorskog kotara i Velebita.",
    kitchen: "Nejestiva.",
    season: "Kolovoz – Listopad"
  },

  // 111. ČAĐAVA MLIJEČNICA
  {
    id: "cadjava-mlijecnica",
    name: "Čađava mliječnica",
    latin: "Lactarius fuliginosus (Fr.) Fr.",
    folkNames: ["čađavka", "ružičeća mliječnica"],
    wikiQuery: "Lactarius_fuliginosus",
    bozacRef: "Svezak 2, br. 787, str. 92",
    status: "WARN",
    statusLabel: "🟡 SLABE KVALITETE / NEPREPORUČLJIVA",
    hymenium: "listici", growth: "tlo", latex: "bijelo", ring: "bez",
    shortSummary: "Bjelogorična mliječnica baršunastog čađavosmeđeg klobuka čije bijelo meso natopljeno mlijekom na prerezu za par minuta poprimi lijepu RUŽIČASTO-CRVENU boju.",
    simpleBullets: [
      "Prerezano meso u kontaktu s bijelim mlijekom postane losos-ružičasto.",
      "Klobuk je suh i baršunast poput jelenje kože.",
      "Raste u bjelogoričnim šumama (bukva, hrast)."
    ],
    bozacDetails: {
      klobuk: "5–10 cm, čađavosmeđ do sivosmeđ, baršunast.",
      listici: "Krem-oker, na oštećenjima crvenkasti.",
      strucak: "Bjelkast do svijetlosmeđ.",
      meso: "Bijelo, na zraku pocrveni u losos-boju.",
      spore: "8–10 µm."
    },
    lookalikes: [
      { targetId: "smolasta-mlijecnica", trait: "Stanište", mine: "Bjelogorica, svjetliji klobuk", other: "Smolasta mliječnica: Crnogorica, tamnosmeđ klobuk." }
    ],
    habitat: "Listopadne šume ljeti i u jesen.",
    kitchen: "Nije cijenjena za jelo zbog gorkastog okusa.",
    season: "Srpanj – Listopad"
  },

  // 112. LJUBIČASTA MLIJEČNICA
  {
    id: "otrovnoljubicasta-mlijecnica",
    name: "Ljubičasta mliječnica",
    latin: "Lactarius uvidus (Fr. ex Fr.) Fr.",
    folkNames: ["ljubičasta suzača", "modreća mliječnica"],
    wikiQuery: "Lactarius_uvidus",
    bozacRef: "Svezak 2, br. 763, str. 76",
    status: "DANGER",
    statusLabel: "🔴 NEJESTIVA / OTROVNA",
    hymenium: "listici", growth: "tlo", latex: "bijelo", ring: "bez",
    shortSummary: "Sluzava sivkasta mliječnica čije bijelo mlijeko i svako prignječeno mjesto na listićima i stručku u par minuta postanu ŽIVO LJUBIČASTI!",
    simpleBullets: [
      "Bijelo mlijeko i meso na dodir i prerez brzo postanu intenzivno ljubičasti!",
      "Klobuk je sluzav, sivo-mesnate boje bez izraženih krugova.",
      "Okus je gorak."
    ],
    bozacDetails: {
      klobuk: "4–10 cm, sluzav, sivo-ružičast do sivo-smeđ.",
      listici: "Bjelkasti, na pritisak postanu ljubičasti.",
      strucak: "Šupalj, bjelkast, na dodir ljubičast.",
      meso: "Bijelo mlijeko koje u dodiru s mesom postaje ljubičasto.",
      spore: "8,5–10,5 x 7–8,5 µm."
    },
    lookalikes: [
      { targetId: "blijeda-mlijecnica", trait: "Promjena boje mlijeka", mine: "Mlijeko i rane postanu LJUBIČASTI", other: "Blijeda mliječnica: Mlijeko ostaje bijelo." }
    ],
    habitat: "Vlažne šume breze, vrbe i smreke.",
    kitchen: "Nejestiva i otrovna za probavu.",
    season: "Kolovoz – Listopad"
  },

  // ==========================================
  // ROD CORTINARIUS (KOPRENKE) — 19 VRSTA (113–131)
  // ==========================================

  // 113. CRVENJAČA (ZLATNA KOPRENKA)
  {
    id: "crvenjaca",
    name: "Crvenjača (Zlatna koprenka)",
    latin: "Cortinarius rubellus Cooke (Cortinarius speciosissimus)",
    folkNames: ["zlatna koprenka", "šiljata crvenjača", "smrtonosna crvenjača"],
    wikiQuery: "Cortinarius_rubellus",
    bozacRef: "Svezak 1, br. 285, str. 246",
    status: "DANGER",
    statusLabel: "🔴 SMRTNO OTROVNA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Smrtonosna sestra planinske koprenke koja raste u crnogoričnim šumama! Ima čunjasti hrđavonarančasti klobuk s tupom grbicom i ŽUTE CIK-CAK POJASEVE na stručku.",
    simpleBullets: [
      "Klobuk je stožast s izraženom bradavicom (grbicom) u sredini.",
      "Na crvenosmeđem stručku nalaze se žućkasti cik-cak prstenasti pojasevi.",
      "Sadrži smrtonosni orelanin koji razara bubrege nakon 3–20 dana!"
    ],
    bozacDetails: {
      klobuk: "3–8 cm, stožasto-zvonolik s grbicom, suh, lisnato-hrđavosmeđ.",
      listici: "Rijetki, široki, boje cimeta i hrđe.",
      strucak: "Valjkast, hrđavosmeđ sa žutim cik-cak pojasevima koprene.",
      meso: "Žućkasto do smećkasto, miris na rotkvicu.",
      spore: "Bradavičave, 8,5–11,5 x 6,5–8,5 µm."
    },
    lookalikes: [
      { targetId: "planinska-koprenka", trait: "Pojasevi na stručku i stanište", mine: "Žuti cik-cak pojasevi na stručku + raste u crnogorici", other: "Planinska koprenka (SMRTONOSNA): Stručak bez pojaseva + raste u bjelogorici." },
      { targetId: "lisicica", trait: "Trusište", mine: "Rijetki hrđavosmeđi listići", other: "Lisičica (Jestiva): Debele račvaste žute letvice!" }
    ],
    habitat: "Vlažne planinske šume smreke i jele u mahovini (Gorski kotar, Sljeme).",
    kitchen: "SMRTONOSNA (orelaninski sindrom)!",
    season: "Kolovoz – Listopad"
  },

  // 114. CIGANČEK (PRSTENASTA KOPRENKA)
  {
    id: "cigancek",
    name: "Ciganček (Prstenasta koprenka)",
    latin: "Cortinarius caperatus (Pers.) Fr. (Rozites caperatus)",
    folkNames: ["ciganka", "ciganček", "ciganin", "prstenasta koprenka", "bjeloglava"],
    wikiQuery: "Cortinarius_caperatus",
    bozacRef: "Svezak 1, br. 282, str. 244",
    status: "SAFE",
    statusLabel: "🟢 VRHUNSKA JESTIVA (ZA ISKUSNE)",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "samo_vjencic",
    shortSummary: "Jedna od rijetkih vrhunskih jestivih gljiva iz roda Cortinarius! Klobuk okeržut posut ljubičasto-srebrnastim injem, naboran, a na stručku nosi pravi OPNASTI PRSTEN (ne samo paučinu!).",
    simpleBullets: [
      "Za razliku od ostalih koprenki, na stručku ima pravi kožasti PRSTEN (vjenčić).",
      "Klobuk je oker-medene boje, radijalno naboran i posut sivkastim injem.",
      "Iznad prstena stručak je sitno pahuljast s blagim ljubičastim daškom."
    ],
    bozacDetails: {
      klobuk: "5–12 cm, zvonast pa otvoren, okeržut, naboran, u mladosti posut bjelkasto-ljubičastim injem.",
      listici: "Prirasli, nazubljene oštrice, najprije glinastožuti pa hrđavosmeđi.",
      strucak: "7–14 cm, bjelkast, nosi opnast bijelo-žućkasti vjenčić.",
      meso: "Bijelo, mekano, blagog i ugodnog okusa.",
      spore: "Bademaste, bradavičave, 11–14 x 7–9 µm, otrusina hrđavosmeđa."
    },
    lookalikes: [
      { targetId: "planinska-koprenka", trait: "Prsten i boja", mine: "IMA opnast prsten + oker klobuk s injem", other: "Planinska koprenka (SMRTONOSNA): NEMA prsten (samo paučina) + narančasto-hrđav klobuk!" }
    ],
    habitat: "Kisela tla u šumama bukve, smreke, bora i borovnice od srpnja do listopada.",
    kitchen: "Izvrsna jestiva gljiva za sve namjene, ali traži dobro poznavanje zbog srodnih otrovnih koprenki.",
    season: "Srpanj – Listopad"
  },

  // 115. LJUBIČASTA KOPRENKA
  {
    id: "ljubicasta-koprenka",
    name: "Ljubičasta koprenka",
    latin: "Cortinarius violaceus (L.) Gray",
    folkNames: ["modra koprenka", "baršunasta ljubičica"],
    wikiQuery: "Cortinarius_violaceus",
    bozacRef: "Svezak 1, br. 286, str. 248",
    status: "SAFE",
    statusLabel: "🟢 JESTIVA (RIJETKA)",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Spektakularna gljiva koja je IZVANA I IZNUTRA tamno čelično-ljubičaste boje! Klobuk je gusto baršunasto-ljuskav, a meso miriše na cedrovinu (olovku).",
    simpleBullets: [
      "Klobuk je suh i gusto baršunasto-čehast, tamno modroljubičast.",
      "Meso na prerezu je intenzivno tamnoljubičasto i miriše na drvo cedra.",
      "Na stručku se vidi paučinasta koprena posuta hrđavosmeđim sporama."
    ],
    bozacDetails: {
      klobuk: "5–12 cm, mesnat, tamnoljubičast, gusto sitno čehast.",
      listici: "Široki, rijetki, tamnoljubičasti pa cimetastosmeđi od spora.",
      strucak: "U dnu jako gomoljasto-toljagast, tamnoljubičast.",
      meso: "Tamnoljubičasto, s KOH postane krvavocrveno.",
      spore: "Bradavičave, 11–15 x 7–9 µm."
    },
    lookalikes: [
      { targetId: "jarceva-koprenka", trait: "Boja mesa i miris", mine: "Tamnoljubičasto meso + miris na cedrovinu", other: "Jarčeva koprenka (Nejestiva): Šafranasto-smeđe meso + neugodan miris na jarca!" },
      { targetId: "modrikaca", trait: "Površina klobuka i spore", mine: "Baršunast klobuk + hrđavosmeđe spore", other: "Modrikača: Gladak klobuk + ružičaste spore." }
    ],
    habitat: "Vlažne bukove i crnogorične šume u jesen.",
    kitchen: "Jestiva, pri kuhanju oboji vodu u ljubičasto, no rijetka je pa je treba čuvati.",
    season: "Kolovoz – Listopad"
  },

  // 116. NABORANA (IZVRSNA) KOPRENKA
  {
    id: "naborana-koprenka",
    name: "Naborana (izvrsna) koprenka",
    latin: "Cortinarius praestans (Cordier) Gillet",
    folkNames: ["izvrsna koprenka", "divovska koprenka", "bukova koprenka"],
    wikiQuery: "Cortinarius_praestans",
    bozacRef: "Svezak 1, br. 301, str. 258",
    status: "SAFE",
    statusLabel: "🟢 VRHUNSKA JESTIVA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Najveća i najukusnija koprenka naših bukovih šuma! Masivna gljiva (do 25 cm!) ljubičasto-smeđeg klobuka s karakteristično NABORANIM rubom i bijelo-ljubičastim velom na debelom stručku.",
    simpleBullets: [
      "Vrlo krupna i teška gljiva s karakteristično naboranim rubom klobuka.",
      "U mladosti cijela obavijena bjelkasto-ljubičastim velom.",
      "Meso je debelo, čvrsto, bjelkasto i ugodnog okusa."
    ],
    bozacDetails: {
      klobuk: "10–25 cm, polukuglast, ljubičasto-kestenjastosmeđ s ostacima vela, rub grubo naboran.",
      listici: "Gusti, najprije bjelkasto-ljubičasti, zatim glinasto-hrđavi.",
      strucak: "Masivan, trbušast (do 5 cm debeo), bjelkasto-ljubičast.",
      meso: "Debelo, čvrsto, bijelo, blagog mirisa i okusa.",
      spore: "Limunolike, 15–18 x 8–10 µm."
    },
    lookalikes: [
      { targetId: "bakrenocrvena-koprenka", trait: "Meso na dodir", mine: "Meso na pritisak NE postaje ljubičasto", other: "Bakrenocrvena koprenka: Listići i meso na dodir odmah tamnoljubičasti." }
    ],
    habitat: "Svijetle bukove i hrastove šume na vapnenačkom tlu u jesen.",
    kitchen: "Izvrsna delikatesna gljiva čvrstog mesa, odlična za pohanje i kiseljenje.",
    season: "Rujan – Studeni"
  },

  // 117. JARČEVA KOPRENKA
  {
    id: "jarceva-koprenka",
    name: "Jarčeva koprenka",
    latin: "Cortinarius traganus (Fr. ex Fr.) Fr.",
    folkNames: ["smrdljiva ljubičasta koprenka", "jarčevka"],
    wikiQuery: "Cortinarius_traganus",
    bozacRef: "Svezak 1, br. 342, str. 286",
    status: "DANGER",
    statusLabel: "🔴 NEJESTIVA / BLAGO OTROVNA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Izvana svijetloljubičasta koprenka s gomoljastim stručkom, no kad je prerežete, meso iznutra je ŽUTOSMEĐE (boje šafrana) i ima težak miris na acetilen ili jarca!",
    simpleBullets: [
      "Izvana je ljubičasta, a na prerezu je meso šafranasto-smeđe!",
      "Ima jak, težak miris na trulo kruškovo voće, acetilen ili jarca.",
      "Okus je gorak i neugodan."
    ],
    bozacDetails: {
      klobuk: "5–10 cm, polukuglast, svilenast, blijedoljubičast pa oker.",
      listici: "Rijetki, od početka šafranasto-oker do hrđavosmeđi (nikad ljubičasti!).",
      strucak: "Ljubičast, u dnu jako gomoljast.",
      meso: "Oker-žutosmeđe, neugodnog mirisa i gorkog okusa.",
      spore: "8–10 x 5–6 µm."
    },
    lookalikes: [
      { targetId: "modrikaca", trait: "Boja listića i mesa na prerezu", mine: "Žutosmeđe meso i listići + paučina", other: "Modrikača (Uvjetno jestiva): Ljubičasti listići i bjelkastoljubičasto meso!" }
    ],
    habitat: "Crnogorične i bukove šume na kiselom tlu u jesen.",
    kitchen: "Nejestiva i izaziva probavne smetnje.",
    season: "Kolovoz – Listopad"
  },

  // 118. BIJELOLJUBIČASTA KOPRENKA
  {
    id: "bijeloljubicasta-koprenka",
    name: "Bijeloljubičasta koprenka",
    latin: "Cortinarius alboviolaceus (Pers. ex Fr.) Fr.",
    folkNames: ["srebrnoljubičasta koprenka"],
    wikiQuery: "Cortinarius_alboviolaceus",
    bozacRef: "Svezak 1, br. 340, str. 284",
    status: "DANGER",
    statusLabel: "🔴 NEJESTIVA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Svilenkasto sjajna srebrnastobijela koprenka s nježnim ljubičastim odsjajem i kosim pojasom na gomoljastom stručku.",
    simpleBullets: [
      "Klobuk je svilenkast, bjelkasto-ljubičast s tupom grbicom.",
      "Listići su u mladosti sivkastoljubičasti pa cimetastosmeđi.",
      "Stručak ima bjelkasti pojas od koprene."
    ],
    bozacDetails: {
      klobuk: "4–8 cm, zvonast, svilenasto vlaknast, bjelkasto-ljubičast.",
      listici: "Sivkastoljubičasti pa hrđavosmeđi.",
      strucak: "Toljagast, bjelkastoljubičast.",
      meso: "Blijedoljubičasto, miris slab na sirovi krumpir.",
      spore: "8–10 x 5–6 µm."
    },
    lookalikes: [
      { targetId: "modrikaca", trait: "Paučina i spore", mine: "Ima paučinastu koprenu i hrđavosmeđe spore", other: "Modrikača: Nema koprenu, ružičaste spore." }
    ],
    habitat: "Bukove, hrastove i brezove šume u jesen.",
    kitchen: "Nejestiva.",
    season: "Rujan – Studeni"
  },

  // 119. KRVAVOCRVENA KOPRENKA
  {
    id: "krvavocrvena-koprenka",
    name: "Krvavocrvena koprenka",
    latin: "Cortinarius sanguineus (Wulf. ex Fr.) Fr.",
    folkNames: ["krvavica", "krvava koprenka", "crvena bojadišarka"],
    wikiQuery: "Cortinarius_sanguineus",
    bozacRef: "Svezak 1, br. 289, str. 250",
    status: "DANGER",
    statusLabel: "🔴 OTROVNA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Mala koprenka koja je u cijelosti (klobuk, listići, stručak i meso) tamne KRVAVOCRVENE boje! Kad se stisne prstima, ispušta crveni sok.",
    simpleBullets: [
      "Klobuk, listići i stručak su jednolično tamno krvavocrveni.",
      "Na pritisak ispušta vinskocrvenu tekućinu.",
      "Raste u vlažnoj mahovini crnogoričnih šuma."
    ],
    bozacDetails: {
      klobuk: "2–5 cm, sitno vlaknast, tamno krvavocrven.",
      listici: "Krvavocrveni pa hrđavocrveni.",
      strucak: "Tanak, krvavocrven, u bazi s narančastocrvenim micelijem.",
      meso: "Krvavocrveno, miris na rotkvicu ili cedrovinu.",
      spore: "7–9 x 4,5–5,5 µm."
    },
    lookalikes: [
      { targetId: "polukrvava-koprenka", trait: "Boja klobuka i stručka", mine: "I klobuk i stručak su tamno krvavocrveni", other: "Polukrvava koprenka: Samo listići su krvavocrveni, a klobuk i stručak žutosmeđi!" }
    ],
    habitat: "Vlažne smrekove i jelove šume ljeti i u jesen.",
    kitchen: "OTROVNA! Sadrži antrakinonske derivate koji izazivaju teške probavne smetnje.",
    season: "Kolovoz – Studeni"
  },

  // 120. POLUKRVAVA KOPRENKA
  {
    id: "polukrvava-koprenka",
    name: "Polukrvava koprenka",
    latin: "Cortinarius semisanguineus (Fr.) Gillet",
    folkNames: ["krvavolistna koprenka", "crvenolista koprenka", "bojadisarka"],
    wikiQuery: "Cortinarius_semisanguineus",
    bozacRef: "Svezak 1, br. 288, str. 248",
    status: "DANGER",
    statusLabel: "🔴 OTROVNA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Izvana izgleda bezazleno sa smeđe-maslinastim klobukom i žutim stručkom, ali kad je okrenete, listići ispod klobuka su šokantno KRVAVOCRVENI!",
    simpleBullets: [
      "Klobuk je oker-maslinastosmeđ, a listići ispod njega su jarko krvavocrveni!",
      "Stručak je žućkast, tanak i vlaknast.",
      "Miriše na rotkvicu ili jod."
    ],
    bozacDetails: {
      klobuk: "3–7 cm, sa središnjom grbicom, oker-smeđ.",
      listici: "Gusti, jarko krvavocrveni.",
      strucak: "Žut, u dnu crvenkast.",
      meso: "Žućkasto, gorkasto.",
      spore: "6–8 x 4–5 µm."
    },
    lookalikes: [
      { targetId: "cimetasta-koprenka", trait: "Boja listića", mine: "Krvavocrveni listići", other: "Cimetasta koprenka: Narančasto-cimetasti listići." }
    ],
    habitat: "Borove, smrekove i brezove šume u jesen.",
    kitchen: "OTROVNA!",
    season: "Kolovoz – Studeni"
  },

  // 121. CIMETASTA KOPRENKA
  {
    id: "cimetasta-koprenka",
    name: "Cimetasta koprenka",
    latin: "Cortinarius cinnamomeus (L. ex Fr.) Fr.",
    folkNames: ["cimetnjača", "cimetna koprenka"],
    wikiQuery: "Cortinarius_cinnamomeus",
    bozacRef: "Svezak 1, br. 290, str. 250",
    status: "DANGER",
    statusLabel: "🔴 OTROVNA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Manja koprenka cimetastosmeđeg klobuka, narančasto-cimetastih listića i limunskožutog mesa.",
    simpleBullets: [
      "Klobuk je suh, cimetastosmeđ do maslinastosmeđ.",
      "Listići su u mladosti živo narančasti pa boje cimeta.",
      "Meso na prerezu je limunskožuto."
    ],
    bozacDetails: {
      klobuk: "2–6 cm, s grbicom, sitno čehasto-vlaknast, cimetastosmeđ.",
      listici: "Narančasti do cimetastosmeđi.",
      strucak: "Tanak, žut sa smeđim vlakancima.",
      meso: "Žuto, miriše na rotkvicu.",
      spore: "6,5–8,5 x 4–5 µm."
    },
    lookalikes: [
      { targetId: "planinska-koprenka", trait: "Veličina i boja mesa", mine: "Tanak žuti stručak i limunskožuto meso", other: "Planinska koprenka (SMRTONOSNA): Deblji stručak i hrđasto meso." }
    ],
    habitat: "Crnogorične i bjelogorične šume od ljeta do jeseni.",
    kitchen: "OTROVNA!",
    season: "Srpanj – Studeni"
  },

  // 122. CRVENOLJUSKAVA KOPRENKA
  {
    id: "crvenoljuskava-koprenka",
    name: "Crvenoljuskava koprenka",
    latin: "Cortinarius bolaris (Pers. ex Fr.) Fr.",
    folkNames: ["crvenočehasta koprenka", "crvenopjegava koprenka"],
    wikiQuery: "Cortinarius_bolaris",
    bozacRef: "Svezak 1, br. 294, str. 252",
    status: "DANGER",
    statusLabel: "🔴 OTROVNA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Bjelkasto-žućkasti klobuk i stručak su gusto prekriveni cinober-crvenim ljuskicama, a cijela gljiva na dodir prstom požuti u boju šafrana!",
    simpleBullets: [
      "Svijetla podloga klobuka i stručka posuta je crvenim ljuskicama.",
      "Na pritisak prstom meso i stručak požute u krom-žutu boju.",
      "Raste pod bukvom i hrastom."
    ],
    bozacDetails: {
      klobuk: "3–8 cm, bjelkast, gusto pokriven crvenim čehicama.",
      listici: "Krem pa cimetastosmeđi.",
      strucak: "Crveno čehast, u bazi žut.",
      meso: "Bijelo, na zraku požuti.",
      spore: "Okruglaste, 6–8 x 5–6 µm."
    },
    lookalikes: [
      { targetId: "pojasasta-koprenka", trait: "Klobuk i žućenje", mine: "Crvene ljuskice na klobuku + žuti na dodir", other: "Pojasasta koprenka: Crveni pojasevi samo na stručku." }
    ],
    habitat: "Bukove i hrastove šume u jesen.",
    kitchen: "OTROVNA!",
    season: "Kolovoz – Listopad"
  },

  // 123. VARLJIVA KOPRENKA
  {
    id: "varljiva-koprenka",
    name: "Varljiva (opeka) koprenka",
    latin: "Cortinarius varius (Schff. ex Fr.) Fr.",
    folkNames: ["opekasta koprenka", "šarena koprenka", "smrekova koprenka"],
    wikiQuery: "Cortinarius_varius",
    bozacRef: "Svezak 1, br. 305, str. 260",
    status: "SAFE",
    statusLabel: "🟢 JESTIVA (SAMO ZA ISKUSNE)",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Prekrasna koprenka smrekovih šuma! Klobuk sluzav i žutosmeđ poput cigle, listići u mladosti ŽIVO LJUBIČASTI, a toljagasti stručak snježnobijel!",
    simpleBullets: [
      "Kontrast triju boja: žutosmeđi klobuk + ljubičasti listići + čisto bijeli stručak.",
      "Meso s kapljicom KOH trenutačno postane krom-žuto.",
      "Meso je čisto bijelo i potpuno blagog okusa."
    ],
    bozacDetails: {
      klobuk: "5–10 cm, polukuglast, sluzav, žuto-opečnatosmeđ.",
      listici: "Gusti, najprije jarko ljubičasti, kasnije cimetastosmeđi.",
      strucak: "Toljagasto zadebljan u dnu, snježnobijel s bijelom paučinom.",
      meso: "Čisto bijelo, čvrsto, s KOH žuto.",
      spore: "Bademaste, 10–12 x 6–7 µm."
    },
    lookalikes: [
      { targetId: "planinska-koprenka", trait: "Boja listića i stručka", mine: "Ljubičasti mladi listići + bijeli stručak + sluzav klobuk", other: "Planinska koprenka (SMRTONOSNA): Hrđavi listići + žuti stručak + suh klobuk!" }
    ],
    habitat: "Vapnenačke smrekove šume (Gorski kotar) u jesen.",
    kitchen: "Vrlo dobra jestiva gljiva, ali je smiju brati samo vrsni poznavatelji.",
    season: "Kolovoz – Listopad"
  },

  // 124. SLUZAVA KOPRENKA
  {
    id: "sluzava-koprenka",
    name: "Sluzava koprenka",
    latin: "Cortinarius collinitus (Sow. ex Fr.) Fr.",
    folkNames: ["slinava koprenka", "plavopojasna koprenka"],
    wikiQuery: "Cortinarius_collinitus",
    bozacRef: "Svezak 1, br. 358, str. 296",
    status: "SAFE",
    statusLabel: "🟢 JESTIVA (SLABIJE KVALITETE)",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "I klobuk i stručak su prekriveni debelim sluzavim omotačem, a na stručku sluz puca u plavkasto-ljubičaste prstenaste pojaseve.",
    simpleBullets: [
      "Klobuk je narančastosmeđ i jako sluzav.",
      "Dugačak stručak ima plavkastoljubičaste sluzave pojaseve.",
      "Raste u mahovini smrekovih šuma."
    ],
    bozacDetails: {
      klobuk: "4–9 cm, zvonast, jako sluzav, žutosmeđ.",
      listici: "Blijedoljubičasti pa hrđavosmeđi.",
      strucak: "Dug, valjkast, s ljubičastim sluzavim pojasima.",
      meso: "Bjelkasto, blago.",
      spore: "12–15 x 7–8,5 µm."
    },
    lookalikes: [
      { targetId: "crvenjaca", trait: "Sluzavost", mine: "Debelo sluzav klobuk i stručak s plavkastim pojasima", other: "Crvenjača (SMRTONOSNA): Suh klobuk i suh stručak sa žutim cik-cak pojasima!" }
    ],
    habitat: "Vlažne smrekove šume u jesen.",
    kitchen: "Jestiva nakon skidanja sluzi, ali se zbog sigurnosti ne preporučuje sakupljati.",
    season: "Kolovoz – Listopad"
  },

  // 125. DIVOVSKA (TRIJUMFALNA) KOPRENKA
  {
    id: "divovska-koprenka",
    name: "Trijumfalna (žutopojasasta) koprenka",
    latin: "Cortinarius triumphans Fries",
    folkNames: ["žutopojasasta koprenka", "brezova koprenka"],
    wikiQuery: "Cortinarius_triumphans",
    bozacRef: "Svezak 1, br. 308, str. 262",
    status: "SAFE",
    statusLabel: "🟢 JESTIVA (ZA ISKUSNE)",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Krupna koprenka koja raste pod brezama; ima zlatnožuti klobuk i dugačak stručak ukrašen s više katova žućkastosmeđih vunastih vjenčića.",
    simpleBullets: [
      "Raste uvijek u blizini breza (Betula).",
      "Stručak nosi više katova žućkastosmeđih prstenastih vjenčića.",
      "Meso s lužinom (KOH) reagira zlatnožuto."
    ],
    bozacDetails: {
      klobuk: "6–14 cm, mesnat, zlatnožut do marelice.",
      listici: "Gusti, bjelkasti s plavkastim daškom pa glinastosmeđi.",
      strucak: "8–15 cm, toljagast, s više katova žutih vunastih pojaseva.",
      meso: "Bijelo do krem, bez neugodnog mirisa.",
      spore: "10–13 x 6–7 µm."
    },
    lookalikes: [
      { targetId: "cigancek", trait: "Prsten na stručku", mine: "Više vunastih pojaseva duž stručka (pod brezom)", other: "Ciganček: Jedan kožasti prsten pri vrhu stručka." }
    ],
    habitat: "Uz breze na vlažnijim tlima u jesen.",
    kitchen: "Dobra jestiva gljiva za iskusne determinatore.",
    season: "Rujan – Listopad"
  },

  // 126. ZAVODLJIVA (PRELIJEPA) KOPRENKA
  {
    id: "zavodljiva-koprenka",
    name: "Prelijepa (zavodljiva) koprenka",
    latin: "Cortinarius splendens R. Henry",
    folkNames: ["sumporna koprenka", "lažna zelenka", "smrtonosna žuta koprenka"],
    wikiQuery: "Cortinarius_splendens",
    bozacRef: "Svezak 1, br. 332, str. 278",
    status: "DANGER",
    statusLabel: "🔴 SMRTNO OTROVNA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Opasna dvojnica zelenkaste vitezovke u bukovim šumama! Cijela je jarko sumporasto-kromžute boje, sa smeđim mrljama na klobuku i oštro obrubljenim gomoljem na dnu stručka.",
    simpleBullets: [
      "Klobuk, listići, stručak i meso su intenzivno KROM-ŽUTE boje.",
      "Na dnu stručka ima širok, oštro obrubljen gomolj.",
      "Izaziva smrtonosno zatajenje bubrega!"
    ],
    bozacDetails: {
      klobuk: "4–8 cm, sluzav, jarko žut sa smeđecrvenim mrljama u sredini.",
      listici: "Sumporastožuti pa hrđavosmeđi od spora.",
      strucak: "Žut s paučinom i oštro obrubljenim gomoljem na dnu.",
      meso: "Intenzivno krom-žuto, s KOH maslinastosmeđe.",
      spore: "9–11 x 5–6 µm."
    },
    lookalikes: [
      { targetId: "zelenkasta-vitezovka", trait: "Gomolj, paučina i boja spora (SMRTNO VAŽNO!)", mine: "Oštro obrubljen gomolj + paučina + hrđavosmeđe spore", other: "Zelenkasta vitezovka: Valjkast stručak bez gomolja i bez paučine + bijele spore!" }
    ],
    habitat: "Bukove šume na vapnenačkom tlu u jesen.",
    kitchen: "SMRTNO OTROVNA!",
    season: "Rujan – Studeni"
  },

  // 127. LIMUNSKOŽUTA KOPRENKA
  {
    id: "limunskozuta-koprenka",
    name: "Limunskožuta koprenka",
    latin: "Cortinarius limonius (Fr. ex Fr.) Fr.",
    folkNames: ["limunasta koprenka", "žuta koprenka"],
    wikiQuery: "Cortinarius_limonius",
    bozacRef: "Svezak 1, br. 287, str. 248",
    status: "DANGER",
    statusLabel: "🔴 SMRTNO OTROVNA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Bliža srodnica smrtonosne crvenjače s vodenasto-narančastosmeđim klobukom koji sušenjem postane jarko limunskožut.",
    simpleBullets: [
      "Klobuk je higrofan: vlažan crvenosmeđ, suh limunskožut.",
      "Stručak ima žute vunaste pojaseve.",
      "Raste u vlažnim smrekovim šumama i sadrži nefrotoksine."
    ],
    bozacDetails: {
      klobuk: "4–8 cm, konveksan, narančastosmeđ pa žut.",
      listici: "Rijetki, žutonarančasti pa hrđavi.",
      strucak: "Žut s vlaknastim ostacima koprene.",
      meso: "Žuto, s KOH crnosmeđe.",
      spore: "Okruglaste, 7,5–9 x 6–7,5 µm."
    },
    lookalikes: [
      { targetId: "crvenjaca", trait: "Oblik klobuka i spore", mine: "Zaobljeniji klobuk + okruglaste spore", other: "Crvenjača: Stožast klobuk s grbicom." }
    ],
    habitat: "Vlažne crnogorične šume u mahovini.",
    kitchen: "SMRTNO OTROVNA!",
    season: "Kolovoz – Listopad"
  },

  // 128. BAKRENOCRVENA KOPRENKA
  {
    id: "bakrenocrvena-koprenka",
    name: "Purpurno-smeđa koprenka",
    latin: "Cortinarius purpurascens Fries",
    folkNames: ["purpurna koprenka", "tamnoljubičasta koprenka"],
    wikiQuery: "Cortinarius_purpurascens",
    bozacRef: "Svezak 1, br. 318, str. 268",
    status: "DANGER",
    statusLabel: "🔴 NEJESTIVA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Ljubičasta koprenka sa smeđim klobukom i obrubljenim gomoljem čiji listići i meso na dodir prstom odmah postanu TAMNO PURPURNOLJUBIČASTI!",
    simpleBullets: [
      "Listići i stručak na pritisak prsta trenutačno potamne u purpurnoljubičastu boju.",
      "Stručak završava obrubljenim gomoljem.",
      "Meso s Lugolovom otopinom (jodom) daje vinskocrvenu reakciju."
    ],
    bozacDetails: {
      klobuk: "5–12 cm, sluzav, kestenjastosmeđ s ljubičastim rubom.",
      listici: "Ljubičasti, na dodir tamnopurpurni.",
      strucak: "Ljubičast s gomoljem na dnu.",
      meso: "Svijetloljubičasto, na zraku potamni.",
      spore: "8–10 x 5–6 µm."
    },
    lookalikes: [
      { targetId: "naborana-koprenka", trait: "Promjena boje na pritisak", mine: "Listići i meso na dodir tamnoljubičasti", other: "Naborana koprenka (Jestiva): Meso ne mijenja boju." }
    ],
    habitat: "Crnogorične i bjelogorične šume u jesen.",
    kitchen: "Nejestiva.",
    season: "Rujan – Studeni"
  },

  // 129. MODROLISTA KOPRENKA
  {
    id: "modrolistaca-koprenka",
    name: "Modra koprenka",
    latin: "Cortinarius caerulescens (Schff.) Fr.",
    folkNames: ["plava koprenka", "modrolista koprenka"],
    wikiQuery: "Cortinarius_caerulescens",
    bozacRef: "Svezak 1, br. 312, str. 264",
    status: "DANGER",
    statusLabel: "🔴 NEJESTIVA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Plavoljubičasta koprenka bukovih šuma koja u zrelosti od središta klobuka postaje oker-žućkasta, a na dnu stručka ima širok obrubljen gomolj.",
    simpleBullets: [
      "U mladosti cijela modroljubičasta, kasnije klobuk u sredini požuti.",
      "Stručak ima oštro obrubljen gomolj u bazi.",
      "Na stručku ostaje smeđi trag od spora na paučini."
    ],
    bozacDetails: {
      klobuk: "5–10 cm, sluzav, plavoljubičast pa oker-smećkast.",
      listici: "Gusti, plavoljubičasti pa cimetastosmeđi.",
      strucak: "Plavkast s širokim obrubljenim gomoljem.",
      meso: "Blijedoljubičasto do bjelkasto.",
      spore: "8,5–11 x 5–6 µm."
    },
    lookalikes: [
      { targetId: "modrikaca", trait: "Gomolj i sluzavost", mine: "Sluzav klobuk + oštro obrubljen gomolj + smeđe spore", other: "Modrikača: Suh klobuk + bez gomolja + ružičaste spore." }
    ],
    habitat: "Bukove i hrastove šume na vapnencu u jesen.",
    kitchen: "Nejestiva.",
    season: "Rujan – Studeni"
  },

  // 130. LJEKARNIČKA (GORKA) KOPRENKA
  {
    id: "ljekarnicka-koprenka",
    name: "Gorka (ljekarnička) koprenka",
    latin: "Cortinarius infractus (Pers. ex Fr.) Fr.",
    folkNames: ["gorka koprenka", "čađava koprenka"],
    wikiQuery: "Cortinarius_infractus",
    bozacRef: "Svezak 1, br. 336, str. 282",
    status: "DANGER",
    statusLabel: "🔴 NEJESTIVA (EKSTREMNO GORKA)",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Česta koprenka u našim šumama s čađavo-maslinastosivim klobukom, vrlo tamnim maslinastosmeđim listićima i nepodnošljivo GORKIM mesom!",
    simpleBullets: [
      "Listići su već u mladosti tamno čađavo-maslinastosmeđi.",
      "Meso je ekstremno gorko poput pelina.",
      "S otopinom talijeva oksida (Tl4) meso reagira limunskožuto."
    ],
    bozacDetails: {
      klobuk: "5–10 cm, maslinastosiv do čađavosmeđ, uraslo vlaknast.",
      listici: "Tamno maslinastosmeđi sa svjetlijom oštricom.",
      strucak: "Toljagast, sivkast s ljubičastim vrhom.",
      meso: "Bjelkasto-sivkasto, izrazito gorko.",
      spore: "Okruglaste, 7–9 x 5,5–6,5 µm."
    },
    lookalikes: [
      { targetId: "crnobijela-vitezovka", trait: "Boja listića i okus", mine: "Tamni maslinastosmeđi listići + gorka kao žuč", other: "Crnobijela vitezovka (Jestiva): Bijelo-žuti listići + blag okus na brašno!" }
    ],
    habitat: "Bukove, hrastove i crnogorične šume u jesen.",
    kitchen: "Nejestiva i blago toksična.",
    season: "Kolovoz – Studeni"
  },

  // 131. POJASASTA (NARUKVIČASTA) KOPRENKA
  {
    id: "pojasasta-koprenka",
    name: "Pojasasta (narukvičasta) koprenka",
    latin: "Cortinarius armillatus (Fr. ex Fr.) Fr.",
    folkNames: ["crvenopojasna koprenka", "narukvičasta koprenka"],
    wikiQuery: "Cortinarius_armillatus",
    bozacRef: "Svezak 1, br. 348, str. 290",
    status: "DANGER",
    statusLabel: "🔴 OTROVNA / SUMNJIVA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Velika koprenka koja raste pod brezama i lako se prepoznaje po 2 do 4 kosa JARKO CINOBER-CRVENA POJASA (narukvice) oko dugačkog stručka!",
    simpleBullets: [
      "Na stručku se ističu jarkocrveni kosi prstenasti pojasevi.",
      "Raste uvijek u simbiozi s brezom.",
      "Klobuk je suh, vlaknast, ciglasto-smeđ."
    ],
    bozacDetails: {
      klobuk: "6–12 cm, zvonast pa otvoren, ciglastosmeđ.",
      listici: "Rijetki, široki, cimetastosmeđi.",
      strucak: "8–15 cm, toljagast, s 2–4 cinober-crvena kosa pojasa.",
      meso: "Smećkasto, s KOH postane tamno ljubičastocrno.",
      spore: "10–12 x 6–7 µm."
    },
    lookalikes: [
      { targetId: "crvenjaca", trait: "Boja pojaseva i stablo", mine: "Cinober-crveni pojasevi pod brezom", other: "Crvenjača (SMRTONOSNA): Žuti cik-cak pojasevi pod smrekom!" }
    ],
    habitat: "Vlažna kisela tla pod brezama u jesen.",
    kitchen: "Ne smije se sakupljati za jelo.",
    season: "Kolovoz – Listopad"
  },

  // ==========================================
  // ROD TRICHOLOMA (VITEZOVKE) — 19 VRSTA (132–150)
  // ==========================================

  // 132. ZEMLJASTA VITEZOVKA (MIŠKA)
  {
    id: "zemljasta-vitezovka",
    name: "Zemljasta vitezovka (Miška)",
    latin: "Tricholoma terreum (Schff. ex Fr.) Kummer",
    folkNames: ["miška", "mišica", "siva miška", "borova miška", "mrazovka"],
    wikiQuery: "Tricholoma_terreum",
    bozacRef: "Svezak 1, br. 596, str. 462",
    status: "WARN",
    statusLabel: "🟡 UVJETNO JESTIVA (OPREZ: DVOJNICE!)",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Poznata kasnojesenska 'miška' koja raste masovno pod borovima! Klobuk malen, suh i baršunasto čehast poput mišjeg krzna, sivo-bijeli listići izrezani uz stručak i BEZ mirisa na brašno.",
    simpleBullets: [
      "Klobuk je suh i gusto baršunasto vlaknast poput mišje dlake.",
      "Meso NEMA miris na brašno i nije ljuto.",
      "Raste pod borovima u kasnu jesen sve do snijega."
    ],
    bozacDetails: {
      klobuk: "3–7 cm, zvonast s grbicom, mišjesiv, gusto pustenasto-čehast.",
      listici: "Izrezani sa zupcem uz stručak, bjelkasti do pepeljastosivi.",
      strucak: "3–7 cm, krhak, bijel, vlaknast, bez prstena.",
      meso: "Krhko, bjelkasto-sivkasto, blagog okusa i bez mirisa na brašno.",
      spore: "Bijele, eliptične, 6–7 x 4–5 µm."
    },
    lookalikes: [
      { targetId: "tigrasta-vitezovka", trait: "Veličina, čehice i miris (SMRTNO VAŽNO!)", mine: "Manja i krhka + sitno pustenasta + BEZ mirisa na brašno (pod borom)", other: "Tigrasta vitezovka (TEŠKO OTROVNA!): Masivna i debela + krupne tigraste ljuske + jak miris na brašno!" },
      { targetId: "zasuljena-vitezovka", trait: "Oblik klobuka i okus", mine: "Tupa grbica + blag okus", other: "Zašiljena vitezovka (Otrovna): Oštar šiljati klobuk s prugama + gorko-papren okus!" }
    ],
    habitat: "Borove šume i parkovi od rujna do prosinca.",
    kitchen: "Tradicionalno popularna za juhe i kiseljenje, no ne smije se jesti u prevelikim uzastopnim obrocima i traži oprez zbog tigraste vitezovke.",
    season: "Rujan – Prosinac"
  },

  // 133. TIGRASTA (OTROVNA) VITEZOVKA
  {
    id: "tigrasta-vitezovka",
    name: "Tigrasta (otrovna) vitezovka",
    latin: "Tricholoma pardinum Quél. (Tricholoma tigrinum)",
    folkNames: ["vražja koturnica", "otrovna vitezovka", "lažna miška", "tigrasta musura"],
    wikiQuery: "Tricholoma_pardinum",
    bozacRef: "Svezak 1, br. 593, str. 460",
    status: "DANGER",
    statusLabel: "🔴 TEŠKO OTROVNA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Najopasnija otrovnica među vitezovkama! Krupna i zdepasta gljiva s koncentričnim krupnim crnosivim ljuskama poput tigrova krzna na klobuku i jakim mirisom na svježe brašno.",
    simpleBullets: [
      "Klobuk je mesnat i prekriven krupnim tamnosivim crijepastim ljuskama.",
      "Ima snažan, ugodan miris na svježe mljeveno brašno.",
      "Na listićima se u vlažnom vremenu pojavljuju zelenkasto-plavkaste kapljice."
    ],
    bozacDetails: {
      klobuk: "6–15 cm, debeo i mesnat, srebrnastosiv s krupnim tamnim koncentričnim ljuskama.",
      listici: "Široki, izrezani uz stručak, bjelkasti sa zelenkastim odsjajem.",
      strucak: "Debeo, trbušast, bijel, u dnu okerast.",
      meso: "Debelo, čvrsto, bijelo, miriše na brašno.",
      spore: "8–10 x 5,5–6,5 µm (znatno veće nego kod miške)."
    },
    lookalikes: [
      { targetId: "zemljasta-vitezovka", trait: "Građa, ljuske i miris", mine: "Debela i teška + krupne ljuske + jak miris na brašno", other: "Zemljasta vitezovka (Miška): Mala i krhka + sitno pustenasta + bez mirisa na brašno!" },
      { targetId: "crnobijela-vitezovka", trait: "Površina klobuka", mine: "Krupne koncentrične ljuske na klobuku", other: "Crnobijela vitezovka: Urasla crna radijalna vlakna bez stršećih ljusaka." }
    ],
    habitat: "Planinske bukove, jelove i smrekove šume (Gorski kotar, Velebit, Sljeme) ljeti i u jesen.",
    kitchen: "TEŠKO OTROVNA! Izaziva dramatičan gastroenteritis s teškom dehidracijom već 1 sat nakon jela.",
    season: "Kolovoz – Listopad"
  },

  // 134. ZELENKASTA VITEZOVKA (ZELENKA)
  {
    id: "zelenkasta-vitezovka",
    name: "Zelenkasta vitezovka (Zelenka)",
    latin: "Tricholoma equestre (L.) P. Kumm. (Tricholoma flavovirens)",
    folkNames: ["zelenka", "zelena vitezovka", "zelenjača", "vitezovka", "konjska gljiva"],
    wikiQuery: "Tricholoma_equestre",
    bozacRef: "Svezak 1, br. 585, str. 454",
    status: "DANGER",
    statusLabel: "🔴 OTROVNA U VEĆIM KOLIČINAMA (RABDOMIOLIZA)",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Nekad cijenjena kasnojesenska gljiva borovih šuma sa žutozelenim klobukom i SUMPORASTOŽUTIM listićima. Danas znamo da uzastopna konzumacija može izazvati smrtonosno razaranje mišića (rabdomiolizu)!",
    simpleBullets: [
      "Listići i stručak su živo sumporasto-kanarinskožute boje.",
      "Meso je bijelo i ugodno miriše na brašno (nema neugodan miris na plin!).",
      "Uzastopno jedenje izaziva rabdomiolizu (otkazivanje mišića i srca)."
    ],
    bozacDetails: {
      klobuk: "5–10 cm, ljepljiv, žutozelen sa smeđim ljuskicama u sredini.",
      listici: "Gusti, izrezani uz stručak, sumporastožuti.",
      strucak: "Čvrst, pun, sumporastožut.",
      meso: "Bijelo sa žutim rubom, miriše na brašno.",
      spore: "Bijele, 6–8 x 4–5 µm."
    },
    lookalikes: [
      { targetId: "sumporasta-vitezovka", trait: "Miris i boja mesa", mine: "Bijelo meso + ugodan miris na brašno", other: "Sumporasta vitezovka (Otrovna): Sumporastožuto meso + zaudara na plin!" },
      { targetId: "zavodljiva-koprenka", trait: "Paučina i gomolj", mine: "Bez paučine i bez gomolja + bijele spore", other: "Zavodljiva koprenka (SMRTONOSNA): Obrubljen gomolj + smeđe spore!" }
    ],
    habitat: "Pjeskovite borove šume u kasnu jesen (listopad – studeni).",
    kitchen: "Više se ne preporučuje za jelo zbog zabilježenih smrtnih slučajeva rabdomiolize nakon više uzastopnih obroka.",
    season: "Rujan – Studeni"
  },

  // 135. SUMPORASTA VITEZOVKA
  {
    id: "sumporasta-vitezovka",
    name: "Sumporasta vitezovka (Smrdulja)",
    latin: "Tricholoma sulphureum (Bull. ex Fr.) Kummer",
    folkNames: ["smrdulja", "plinska gljiva", "sumpornjak", "žuta smrdulja"],
    wikiQuery: "Tricholoma_sulphureum",
    bozacRef: "Svezak 1, br. 588, str. 456",
    status: "DANGER",
    statusLabel: "🔴 OTROVNA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Cijela je sumporastožute boje (i klobuk, i RIJETKI debeli listići, i stručak, i meso iznutra) te zaudara na rasvjetni plin, katran ili sumpor!",
    simpleBullets: [
      "Prodoran kemijski smrad na plin, katran ili naftalin!",
      "Listići su izrazito RIJETKI i debeli, sumporastožuti.",
      "I meso na prerezu je sumporastožuto."
    ],
    bozacDetails: {
      klobuk: "3–8 cm, suh, sumporastožut sa crvenkastosmeđim središtem.",
      listici: "Debeli, rijetki, izrezani uz stručak, sumporastožuti.",
      strucak: "Vitak, vlaknast, žut.",
      meso: "Sumporastožuto, jakog neugodnog mirisa na plin.",
      spore: "9–11 x 5–6,5 µm."
    },
    lookalikes: [
      { targetId: "zelenkasta-vitezovka", trait: "Miris i boja mesa", mine: "Smrdi na plin + žuto meso + rijetki listići", other: "Zelenkasta vitezovka: Miriše na brašno + bijelo meso + gusti listići." }
    ],
    habitat: "Bukove i hrastove šume u jesen.",
    kitchen: "OTROVNA!",
    season: "Kolovoz – Studeni"
  },

  // 136. GOLUBLJA VITEZOVKA
  {
    id: "golublja-vitezovka",
    name: "Golublja vitezovka",
    latin: "Tricholoma columbetta (Fr.) Kummer",
    folkNames: ["bijela golubica", "svilenasta vitezovka", "bijela miška"],
    wikiQuery: "Tricholoma_columbetta",
    bozacRef: "Svezak 1, br. 591, str. 458",
    status: "SAFE",
    statusLabel: "🟢 IZVRSNA JESTIVA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Jedina kvalitetna jestiva čisto bijela vitezovka! Klobuk je svilenasto sjajan i snježnobijel, a dno stručka često ima karakteristične PLAVKASTOZELENE ili ružičaste mrlje.",
    simpleBullets: [
      "Klobuk je svilenasto vlaknast i čisto bijel (poput bijelog goluba).",
      "Na samom dnu stručka često se vidi plavkastozelena mrlja.",
      "Meso je blagog okusa i blagog mirisa na brašno."
    ],
    bozacDetails: {
      klobuk: "5–10 cm, čunjast pa raširen, snježnobijel, svilenasto sjajan.",
      listici: "Bijeli, izrezani uz stručak.",
      strucak: "Čvrst, bijel, u bazi često s plavozelenim mrljama.",
      meso: "Bijelo, čvrsto, blago.",
      spore: "5,5–7 x 4–5 µm."
    },
    lookalikes: [
      { targetId: "bijela-vitezovka", trait: "Miris, okus i površina klobuka", mine: "Svilenasto sjajan klobuk + blag okus + plavkaste mrlje u dnu", other: "Bijela vitezovka (Nejestiva): Mat oker-bijel klobuk + jak neugodan miris i ljut okus!" },
      { targetId: "bijela-zelena-pupavka", trait: "Vjenčić i ovoj (SMRTNO VAŽNO!)", mine: "NEMA vjenčić ni ovoj + listići izrezani uz stručak", other: "Bijeli oblik zelene pupavke (SMRTONOSNA): IMA viseći vjenčić i slobodan vrećasti ovoj u dnu!" },
      { targetId: "crvenkasta-cjepaca", trait: "Crvenjenje i boja listića", mine: "Bijeli listići + plavkastozelena mrlja u bazi stručka", other: "Crvenkasta cjepača (SMRTONOSNA): Cijela gljiva dobiva ciglastocrvene mrlje, a listići postaju sivo-smeđi!" }
    ],
    habitat: "Bukove, hrastove i brezove šume Medvednice i sjeverozapadne Hrvatske u jesen.",
    kitchen: "Vrlo ukusna jestiva gljiva čvrstog mesa, prikladna za pirjanje, juhe i kiseljenje.",
    season: "Rujan – Studeni"
  },

  // 137. SAPUNAČA (SAPUNASTA VITEZOVKA)
  {
    id: "sapunaca",
    name: "Sapunača (Sapunasta vitezovka)",
    latin: "Tricholoma saponaceum (Fr.) Kummer",
    folkNames: ["sapunjača", "sapunara", "sapunka"],
    wikiQuery: "Tricholoma_saponaceum",
    bozacRef: "Svezak 1, br. 590, str. 458",
    status: "DANGER",
    statusLabel: "🔴 NEJESTIVA / BLAGO OTROVNA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Vrlo promjenljiva sivozelena vitezovka koja se odmah prepoznaje po mirisu na SAPUN za pranje rublja i po tome što dno stručka na oštećenjima POCRVENI u losos-boju!",
    simpleBullets: [
      "Karakterističan miris na lužnati sapun za pranje rublja.",
      "Dno stručka i meso pri bazi na zraku poprime losos-crvenkastu boju.",
      "Listići su prilično rijetki i bjelkasto-zelenkasti."
    ],
    bozacDetails: {
      klobuk: "5–12 cm, sivozelen do maslinastosmeđ, gladak ili sitno raspucan.",
      listici: "Rijetki, bjelkasti sa zelenkastim odsjajem.",
      strucak: "Vretenast, u bazi crvenkasto mrljav.",
      meso: "Bijelo, u dnu pocrveni, miris na sapun.",
      spore: "5–6,5 x 3,5–4,5 µm."
    },
    lookalikes: [
      { targetId: "crnobijela-vitezovka", trait: "Miris i crvenjenje baze", mine: "Miris na sapun + crvenkasta baza stručka", other: "Crnobijela vitezovka (Jestiva): Miris na brašno + žućkastozelene nijanse na stručku." }
    ],
    habitat: "Sve vrste šuma u kasnu jesen.",
    kitchen: "Nejestiva i blago otrovna (sadrži hemolizine).",
    season: "Rujan – Studeni"
  },

  // 138. CRNOBIJELA (PRIRUBLJENA) VITEZOVKA
  {
    id: "crnobijela-vitezovka",
    name: "Crnobijela vitezovka (Prirubljenka)",
    latin: "Tricholoma portentosum (Fr.) Quél.",
    folkNames: ["prirubljenka", "zimska miška", "čađava vitezovka", "snježnica", "mrazovka"],
    wikiQuery: "Tricholoma_portentosum",
    bozacRef: "Svezak 1, br. 584, str. 452",
    status: "SAFE",
    statusLabel: "🟢 VRHUNSKA DELIKATESA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Vrhunska kasnojesenska i zimska gljiva! Klobuk čađavosiv s uraslim crnim radijalnim vlakancima (kao iscrtan olovkom), a bijeli listići i stručak imaju nježan LIMUNSKOŽUTI odsjaj!",
    simpleBullets: [
      "Klobuk je tamnosiv s uraslim crnim radijalnim crticama (nije ljuskav!).",
      "Bijeli stručak i listići imaju karakterističan limunskožuti dašak.",
      "Meso miriše na svježe brašno i kamenice te je blagog, slatkastog okusa."
    ],
    bozacDetails: {
      klobuk: "5–12 cm, zvonast pa raširen, ljepljiv, čađavosiv s crnim radijalnim vlakancima.",
      listici: "Izrezani uz stručak, bijeli s limunskožutim odsjajem.",
      strucak: "Čvrst, pun, bijel sa žuto-zelenkastim pramenovima.",
      meso: "Bijelo, krhko, ugodnog mirisa na brašno.",
      spore: "Bijele, 5–6 x 3,5–5 µm."
    },
    lookalikes: [
      { targetId: "zasuljena-vitezovka", trait: "Oblik klobuka i okus (PAZI!)", mine: "Zaobljen klobuk + žuti dašak na stručku + BLAG okus", other: "Zašiljena vitezovka (Otrovna): Oštar stožasti vrh + bez žute boje + PAPRENO-GORAK okus!" },
      { targetId: "tigrasta-vitezovka", trait: "Površina klobuka", mine: "Glatka kožica s uraslim crnim nitima", other: "Tigrasta vitezovka (OTROVNA): Krupne izbočene sive ljuske!" },
      { targetId: "zemljasta-vitezovka", trait: "Veličina, kožica i miris", mine: "Krupna, ljepljiv klobuk s crnim nitima + miris na svježe brašno", other: "Zemljasta vitezovka (Miška): Manja, suh pustenast klobuk + bez mirisa na brašno." }
    ],
    habitat: "Borove, smrekove i mješovite bukovo-jelove šume Medvednice, Gorskog kotara i sjeverozapadne Hrvatske u kasnu jesen i zimu (listopad – prosinac).",
    kitchen: "Vrhunska kasnojesenska i zimska delikatesa za pohanje, juhe, rižota i kiseljenje.",
    season: "Listopad – Prosinac"
  },

  // 139. ŽUĆKASTA VITEZOVKA
  {
    id: "zuckasta-vitezovka",
    name: "Žućkasta vitezovka",
    latin: "Tricholoma scalpturatum (Fr.) Quél.",
    folkNames: ["žuteća miška", "lažna miška", "brašnasta miška"],
    wikiQuery: "Tricholoma_scalpturatum",
    bozacRef: "Svezak 1, br. 598, str. 464",
    status: "SAFE",
    statusLabel: "🟢 JESTIVA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Vrlo slična miški, ali raste i u bjelogoričnim šumama i parkovima, ima miris na brašno, a bijeli listići starenjem i na dodir poprimaju LIMUNSKOŽUTE mrlje!",
    simpleBullets: [
      "Bijeli listići na rubu klobuka i na oštećenjima požute.",
      "Za razliku od prave miške, ima jasan miris na brašno.",
      "Klobuk je sivkasto-smeđ i sitno vlaknasto čehast."
    ],
    bozacDetails: {
      klobuk: "3–8 cm, sivosmeđ, raspucan u sitne čehice.",
      listici: "Bijeli, u starosti i na dodir limunskožuto mrljavi.",
      strucak: "Bijel, vlaknast.",
      meso: "Bijelo, miriše na brašno.",
      spore: "5–6 x 3–4 µm."
    },
    lookalikes: [
      { targetId: "zemljasta-vitezovka", trait: "Žućenje listića i miris", mine: "Listići požute + miris na brašno", other: "Miška (T. terreum): Listići posive + bez mirisa na brašno." }
    ],
    habitat: "Bjelogorične i crnogorične šume te gradski parkovi od lipnja do studenog.",
    kitchen: "Dobra jestiva gljiva.",
    season: "Lipanj – Studeni"
  },

  // 140. ZAŠILJENA (GORUĆA) VITEZOVKA
  {
    id: "zasuljena-vitezovka",
    name: "Zašiljena (paprena) vitezovka",
    latin: "Tricholoma virgatum (Fr. ex Fr.) Kummer",
    folkNames: ["šiljata vitezovka", "paprena miška", "ljuta vitezovka"],
    wikiQuery: "Tricholoma_virgatum",
    bozacRef: "Svezak 1, br. 595, str. 462",
    status: "DANGER",
    statusLabel: "🔴 OTROVNA (GORKO-PAPRENA)",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Opasna siva dvojnica miške i crnobijele vitezovke! Prepoznaje se po OŠTROM STOŽASTOM VRHU klobuka (poput šiljate kape) i gorkom, papreno-palećem okusu!",
    simpleBullets: [
      "Klobuk je oštro stožasto zašiljen u sredini, srebrnastosiv i radijalno vlaknast.",
      "Meso nakon par sekundi žvakanja postaje žestoko gorko i papreno!",
      "Oštrica listića je u starosti sitno crno točkasta."
    ],
    bozacDetails: {
      klobuk: "4–8 cm, stožast s oštrim šiljkom, pepeljastosiv, suh i sjajan.",
      listici: "Sivkastobijeli, oštrica tamno točkasta.",
      strucak: "Bijel, valjkast.",
      meso: "Bjelkasto-sivo, izrazito gorko i papreno.",
      spore: "6,5–8 x 5–6 µm."
    },
    lookalikes: [
      { targetId: "crnobijela-vitezovka", trait: "Oblik klobuka i okus", mine: "Oštro šiljat klobuk + gorko-papren okus", other: "Crnobijela vitezovka (Jestiva): Zaobljen klobuk + žućkasti dašak + blag okus." }
    ],
    habitat: "Crnogorične i bukove šume u jesen.",
    kitchen: "OTROVNA!",
    season: "Kolovoz – Studeni"
  },

  // 141. BIJELA VITEZOVKA
  {
    id: "bijela-vitezovka",
    name: "Bijela vitezovka",
    latin: "Tricholoma album (Schff. ex Fr.) Kumm.",
    folkNames: ["smrdljiva bijela vitezovka", "divlja bijela vitezovka"],
    wikiQuery: "Tricholoma_album",
    bozacRef: "Svezak 1, br. 589, str. 456",
    status: "DANGER",
    statusLabel: "🔴 NEJESTIVA / OTROVNA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Bijela vitezovka sa suhim mat klobukom koja ima težak, odbojan miris na trulu repu, zemlju i plijesan te oštar, ljutkasto-gorak okus.",
    simpleBullets: [
      "Klobuk je mat bijel s okerastim središtem (nije svilenasto sjajan).",
      "Miris je težak, slatkasto-zemljast i neugodan.",
      "Okus je ubrzo gorak i ljut u grlu."
    ],
    bozacDetails: {
      klobuk: "4–9 cm, suh, bijel s oker sredinom.",
      listici: "Bijeli, izrezani uz stručak.",
      strucak: "Bijel, vlaknast.",
      meso: "Bijelo, odbojnog mirisa i ljutog okusa.",
      spore: "5,5–7 x 3,5–4,5 µm."
    },
    lookalikes: [
      { targetId: "golublja-vitezovka", trait: "Miris i okus", mine: "Neugodan miris + gorak i ljut okus", other: "Golublja vitezovka (Jestiva): Svilenast klobuk + blag okus + plava mrlja u dnu." }
    ],
    habitat: "Bjelogorične šume (hrast, breza, bukva) u jesen.",
    kitchen: "Otrovna (izaziva povraćanje).",
    season: "Rujan – Studeni"
  },

  // 142. GOLEMA VITEZOVKA
  {
    id: "golema-vitezovka",
    name: "Golema vitezovka",
    latin: "Tricholoma colossus (Fr.) Quél.",
    folkNames: ["orijaška vitezovka", "borova golemača"],
    wikiQuery: "Tricholoma_colossus",
    bozacRef: "Svezak 1, br. 574, str. 446",
    status: "SAFE",
    statusLabel: "🟢 JESTIVA (RIJETKA)",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "samo_vjencic",
    shortSummary: "Div među vitezovkama! Klobuk i do 25 cm promjera, ciglasto-crvenosmeđ, iznimno tvrdog mesa koje na prerezu polako POCRVENI u losos-boju.",
    simpleBullets: [
      "Masivna i teška gljiva borovih šuma s prstenastim pojasom na stručku.",
      "Vrlo tvrdo bijelo meso na prerezu pocrveni.",
      "Iznad prstenaste zone stručak je čisto bijel, a ispod crvenosmeđ."
    ],
    bozacDetails: {
      klobuk: "10–25 cm, polukuglast, debeo, crvenosmeđ.",
      listici: "Gusti, bijeli s crvenkastim mrljama.",
      strucak: "Debeo (do 6 cm), s opnastim pojasom.",
      meso: "Tvrdo, na zraku postane losos-ružičasto, blago gorkasto.",
      spore: "8–10 x 5,5–7 µm."
    },
    lookalikes: [
      { targetId: "borova-vitezovka", trait: "Promjena boje mesa", mine: "Meso na prerezu pocrveni", other: "Borova vitezovka: Meso ostaje čisto bijelo." }
    ],
    habitat: "Borove šume u jesen.",
    kitchen: "Jestiva nakon kuhanja, ali rijetka vrsta koju treba štedjeti.",
    season: "Rujan – Studeni"
  },

  // 143. BOROVA (VRATOLOMA) VITEZOVKA
  {
    id: "borova-vitezovka",
    name: "Borova (prstenasta) vitezovka",
    latin: "Tricholoma batschii Gulden (Tricholoma fracticum)",
    folkNames: ["vratoloma vitezovka", "prstenasta vitezovka"],
    wikiQuery: "Tricholoma_batschii",
    bozacRef: "Svezak 1, br. 578, str. 448",
    status: "DANGER",
    statusLabel: "🔴 NEJESTIVA / BLAGO OTROVNA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "samo_vjencic",
    shortSummary: "Smeđa vitezovka borovih šuma s OŠTRO RAZGRANIČENOM DVOBOJNOM ZONOM na stručku: vrh stručka pod listićima je snježnobijel, a donji dio kestenjastosmeđ!",
    simpleBullets: [
      "Stručak ima oštru kožastu granicu: gore čisto bijel, dolje crvenosmeđ.",
      "Klobuk je kestenjastosmeđ i za kiše jako sluzav.",
      "Meso miriše na brašno, ali je izrazito gorko."
    ],
    bozacDetails: {
      klobuk: "5–12 cm, sluzav, kestenjastosmeđ.",
      listici: "Bijeli s crvenosmeđim mrljama.",
      strucak: "S oštrim prstenastim pojasom, iznad bijel, ispod smeđ.",
      meso: "Bijelo, miriše na brašno, gorkog okusa.",
      spore: "5–6 x 4–5 µm."
    },
    lookalikes: [
      { targetId: "bukova-vitezovka", trait: "Prstenasta granica na stručku", mine: "Oštra bijelo-smeđa granica na stručku (pod borom)", other: "Bukova vitezovka: Postupan prijelaz boje bez prstena (pod bukvom)." }
    ],
    habitat: "Borove šume na vapnenačkom tlu u jesen.",
    kitchen: "Nejestiva i uzrokuje probavne smetnje.",
    season: "Rujan – Studeni"
  },

  // 144. TOPOLOVA VITEZOVKA
  {
    id: "topolova-vitezovka",
    name: "Topolova vitezovka",
    latin: "Tricholoma populinum J. E. Lange",
    folkNames: ["jablanova vitezovka", "pješčana topolovača"],
    wikiQuery: "Tricholoma_populinum",
    bozacRef: "Svezak 1, br. 581, str. 450",
    status: "SAFE",
    statusLabel: "🟢 JESTIVA",
    hymenium: "listici", growth: "busen", latex: "nema", ring: "bez",
    shortSummary: "Jedina smeđa vitezovka koja raste u busenima ISKLJUČIVO ispod topola i jablana, ugodno miriše na svježe brašno i ima potpuno blag okus.",
    simpleBullets: [
      "Raste uvijek u krugovima i busenima u travi ispod topola (Populus).",
      "Miriše snažno na svježe brašno i nije gorka.",
      "Klobuk je mesnato-crvenkastosmeđ."
    ],
    bozacDetails: {
      klobuk: "6–14 cm, mesnat, crvenosmeđ do boje lješnjaka.",
      listici: "Bijeli, u starosti s crvenosmeđim mrljama.",
      strucak: "Čvrst, bjelkast pa smećkast.",
      meso: "Debelo, bijelo, miris i okus na svježe brašno.",
      spore: "5–6,5 x 3,5–4 µm."
    },
    lookalikes: [
      { targetId: "bukova-vitezovka", trait: "Stablo domaćin i okus", mine: "Raste pod TOPOLOM + miris na brašno + blag okus", other: "Bukova vitezovka (Otrovna): Raste pod BUKVOM + gorak okus!" }
    ],
    habitat: "Drvoredi topola, riječne obale i parkovi u jesen.",
    kitchen: "Dobra jestiva gljiva za gulaše i kiseljenje.",
    season: "Rujan – Studeni"
  },

  // 145. BUKOVA (USTALJENA) VITEZOVKA
  {
    id: "bukova-vitezovka",
    name: "Bukova (opaljena) vitezovka",
    latin: "Tricholoma ustale (Fr. ex Fr.) Kummer",
    folkNames: ["opaljena vitezovka", "smeđa bukovača"],
    wikiQuery: "Tricholoma_ustale",
    bozacRef: "Svezak 1, br. 580, str. 450",
    status: "DANGER",
    statusLabel: "🔴 OTROVNA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Česta smeđa vitezovka bukovih šuma sa sluzavim kestenjastim klobukom, listićima koji dobivaju crnosmeđe mrlje i gorkastim mesom BEZ mirisa na brašno.",
    simpleBullets: [
      "Raste isključivo pod bukvama.",
      "Klobuk je sluzav, kestenjastosmeđ i u starosti gotovo crn u sredini.",
      "Meso NEMA miris na brašno i gorkasto je."
    ],
    bozacDetails: {
      klobuk: "4–9 cm, sluzav, kestenjastosmeđ.",
      listici: "Krem s tamnim rđavim mrljama.",
      strucak: "Vlaknast, bjelkast pa smeđ u dnu, bez prstenaste zone.",
      meso: "Bjelkasto, gorkasto, bez mirisa na brašno.",
      spore: "5,5–7 x 4–5 µm."
    },
    lookalikes: [
      { targetId: "topolova-vitezovka", trait: "Stablo i miris", mine: "Pod bukvom + bez mirisa na brašno + gorkasta", other: "Topolova vitezovka (Jestiva): Pod topolom + jak miris na brašno." }
    ],
    habitat: "Bukove šume u jesen.",
    kitchen: "OTROVNA (izaziva povraćanje i proljev)!",
    season: "Rujan – Studeni"
  },

  // 146. BRADAVIČASTA VITEZOVKA
  {
    id: "bradavicasta-vitezovka",
    name: "Bradavičasta (runjava) vitezovka",
    latin: "Tricholoma vaccinum (Schff. ex Fr.) Kummer",
    folkNames: ["runjava vitezovka", "kravlja vitezovka"],
    wikiQuery: "Tricholoma_vaccinum",
    bozacRef: "Svezak 1, br. 582, str. 452",
    status: "DANGER",
    statusLabel: "🔴 OTROVNA / NEJESTIVA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Smeđecrvena vitezovka smrekovih šuma čiji je klobuk SUH i gusto prekriven vunastim ljuskicama s čupavim rubom, a stručak iznutra šupalj.",
    simpleBullets: [
      "Klobuk je suh (nikad sluzav!) i gusto čupavo-ljuskav s dlakavim rubom.",
      "Stručak je u zrelosti cjevasto ŠUPALJ.",
      "Raste pod smrekama, okus je gorak i trpak."
    ],
    bozacDetails: {
      klobuk: "4–8 cm, zvonast s grbicom, crvenosmeđ, gusto vunasto čehast.",
      listici: "Krem s crvenkastim mrljama.",
      strucak: "Šupalj, vlaknast, crvenosmeđ.",
      meso: "Bjelkasto-crvenkasto, gorko.",
      spore: "6–7,5 x 4,5–5,5 µm."
    },
    lookalikes: [
      { targetId: "ljuskava-vitezovka", trait: "Rub klobuka i šupljina stručka", mine: "Vunast čupav rub klobuka + šupalj stručak", other: "Ljuskava vitezovka: Gladak rub klobuka + pun stručak." }
    ],
    habitat: "Smrekove šume u jesen.",
    kitchen: "Otrovna (izaziva probavne smetnje).",
    season: "Rujan – Studeni"
  },

  // 147. ZLATNA VITEZOVKA
  {
    id: "zlatna-vitezovka",
    name: "Zlatna (narančasta) vitezovka",
    latin: "Tricholoma aurantium (Schff. ex Fr.) Ricken",
    folkNames: ["narančasta vitezovka", "tigrasta naranča"],
    wikiQuery: "Tricholoma_aurantium",
    bozacRef: "Svezak 1, br. 575, str. 446",
    status: "DANGER",
    statusLabel: "🔴 NEJESTIVA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Vrlo upadljiva vitezovka žarkonarančastog klobuka čiji je stručak gusto obavijen narančasto-crvenim cik-cak pojasevima sve do bijelog vrha!",
    simpleBullets: [
      "Cijeli stručak osim samog bijelog vrha je narančastocrveno tigrasto išaran.",
      "Miriše jako na brašno i krastavce.",
      "Meso je gorko i neugodnog okusa."
    ],
    bozacDetails: {
      klobuk: "5–10 cm, ljepljiv, živo narančastocrven.",
      listici: "Bijeli s hrđavim mrljama.",
      strucak: "Gusto pokriven narančastim čehastim pojasima, pri vrhu bijel.",
      meso: "Bijelo, gorko, miriše na brašno.",
      spore: "4,5–5,5 x 3–4 µm."
    },
    lookalikes: [
      { targetId: "arisev-prstenjak", trait: "Trusište ispod klobuka", mine: "Bijeli LISTIĆI ispod klobuka", other: "Arišev prstenjak (Jestiv): Žute CJEVČICE (spužva) ispod klobuka." }
    ],
    habitat: "Crnogorične šume na vapnencu u jesen.",
    kitchen: "Nejestiva zbog gorčine.",
    season: "Rujan – Studeni"
  },

  // 148. CRVENOŽUTA (PANJEVSKA) VITEZOVKA
  {
    id: "crvenozuta-vitezovka",
    name: "Crvenožuta (panjevska) vitezovka",
    latin: "Tricholomopsis rutilans (Schff. ex Fr.) Sing.",
    folkNames: ["panjevska vitezovka", "purpurna panjevka", "šarena panjevka"],
    wikiQuery: "Tricholomopsis_rutilans",
    bozacRef: "Svezak 1, br. 608, str. 470",
    status: "WARN",
    statusLabel: "🟡 SLABE KVALITETE / NEPREPORUČLJIVA",
    hymenium: "listici", growth: "drvo", latex: "nema", ring: "bez",
    shortSummary: "Prekrasna gljiva koja raste na panjevima smreke i bora! Žuta podloga klobuka je gusto prekrivena purpurno-vinskocrvenim baršunastim ljuskicama, a listići ispod su ZLATNOŽUTI.",
    simpleBullets: [
      "Raste izravno na crnogoričnim panjevima (smreka, bor, jela).",
      "Klobuk je purpurnocrveno ljuskav na žutoj podlozi.",
      "Listići i meso su jarko žumanjčanožuti."
    ],
    bozacDetails: {
      klobuk: "5–15 cm, žut, gusto prekriven purpurnocrvenim čehicama.",
      listici: "Gusti, žumanjčanožuti.",
      strucak: "Žut s purpurnim vlakancima, bez prstena.",
      meso: "Žuto, vodenasto, miriše na trulo drvo.",
      spore: "Bijele, 7–8,5 x 5–6 µm."
    },
    lookalikes: [
      { targetId: "sumporaca", trait: "Boja klobuka i listića", mine: "Purpurne ljuskice na klobuku + zlatnožuti listići", other: "Prava sumporača (Otrovna): Gladak klobuk + zelenkastožuti listići." }
    ],
    habitat: "Na panjevima crnogorice od ljeta do kasne jeseni.",
    kitchen: "Nekad smatrana uvjetno jestivom nakon prokuhavanja, no pljesnivog je okusa i izaziva probavne tegobe.",
    season: "Srpanj – Studeni"
  },

  // 149. LJUSKAVA VITEZOVKA
  {
    id: "ljuskava-vitezovka",
    name: "Ljuskava vitezovka",
    latin: "Tricholoma imbricatum (Fr. ex Fr.) Kummer",
    folkNames: ["crijepasta vitezovka", "smeđa borovka"],
    wikiQuery: "Tricholoma_imbricatum",
    bozacRef: "Svezak 1, br. 583, str. 452",
    status: "DANGER",
    statusLabel: "🔴 NEJESTIVA / BLAGO OTROVNA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Smeđa vitezovka borovih šuma sa suhim klobukom koji se raspucava u crijepaste ljuskice, punim stručkom bez prstena i gorkastim mesom.",
    simpleBullets: [
      "Klobuk je suh, tamnosmeđ i sitno crijepasto raspucan.",
      "Za razliku od bradavičaste vitezovke, stručak je iznutra PUN.",
      "Raste pod borovima u jesen."
    ],
    bozacDetails: {
      klobuk: "5–10 cm, čunjast, suh, crvenkastosmeđ, crijepasto čehast.",
      listici: "Krem s crvenosmeđim mrljama.",
      strucak: "Pun, vretenast, bez prstenaste zone.",
      meso: "Bijelo, gorkasto.",
      spore: "6–8 x 4–5 µm."
    },
    lookalikes: [
      { targetId: "bradavicasta-vitezovka", trait: "Stručak i stablo", mine: "Pun stručak + raste pod borom", other: "Bradavičasta vitezovka: Šupalj stručak + dlakav rub + pod smrekom." }
    ],
    habitat: "Borove šume u jesen.",
    kitchen: "Nejestiva.",
    season: "Rujan – Studeni"
  },

  // 150. ĐURĐEVAČA (PROLJETNA VITEZOVKA)
  {
    id: "djurdjevaca",
    name: "Đurđevača (Proljetna vitezovka)",
    latin: "Calocybe gambosa (Fr.) Donk (Tricholoma georgii)",
    folkNames: ["jurjevka", "đurđevka", "ranka", "proljetna brašnjača", "svibanjska gljiva", "jurjevčica"],
    wikiQuery: "Calocybe_gambosa",
    bozacRef: "Svezak 1, br. 612, str. 474",
    status: "SAFE",
    statusLabel: "🟢 VRHUNSKA PROLJETNA DELIKATESA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Kraljica proljeća (oko Jurjeva, 23. travnja)! Raste u vilinim krugovima po voćnjacima i rubovima trnja, ima debelo bijelo meso, iznimno guste uske bijele listiće i snažan miris na svježe brašno.",
    simpleBullets: [
      "Raste u proljeće (travanj – svibanj) u vilinim krugovima u travi i uz glog/trnje.",
      "Listići su iznimno GUSTI, uski i bijelo-krem boje (nikad ružičasti ni smeđi!).",
      "Snažan i ugodan miris na svježe mljeveno pšenično brašno."
    ],
    bozacDetails: {
      klobuk: "4–12 cm, debeo i mesnat, bjelkast do krem-oker, s podvijenim rubom.",
      listici: "Vrlo gusti, uski, izrezani uz stručak, bijeli do krem.",
      strucak: "Kratak, debeo, pun, bijel, bez prstena i bez ovoja.",
      meso: "Debelo, čvrsto, bijelo, intenzivnog mirisa na brašno.",
      spore: "Bijele, eliptične, 5–6 x 3–4 µm."
    },
    lookalikes: [
      { targetId: "crvenkasta-cjepaca", trait: "Promjena boje i miris (SMRTNO VAŽNO U PROLJEĆE!)", mine: "Klobuk gladak, listići trajno bijeli, NE crveni i snažno miriše na SVJEŽE BRAŠNO", other: "Crvenkasta cjepača (SMRTONOSNA): Klobuk stožast i radijalno raspucan, dobiva CIGLASTOCRVENE mrlje, listići posmeđe i miriše voćno-alkoholno!" },
      { targetId: "olovna-rudoliska", trait: "Sezona i boja listića", mine: "Raste u PROLJEĆE + gusti bijeli listići", other: "Olovasta rudoliska (TEŠKO OTROVNA): Raste ljeti/jesen + široki listići koji postaju ružičasti!" },
      { targetId: "bijela-pupavka", trait: "Vjenčić i ovoj", mine: "NEMA vjenčić ni ovoj u dnu + jak miris na brašno", other: "Bijela pupavka (SMRTONOSNA): IMA vjenčić i vrećasti ovoj u dnu!" }
    ],
    habitat: "Livade, pašnjaci, voćnjaci i rubovi bjelogoričnih šuma u proljeće.",
    kitchen: "Vrhunska proljetna delikatesa za juhe, rižota i pirjanje s jajima.",
    season: "Travanj – Svibanj"
  },

  // ==========================================
  // KRITIČNE VRSTE MEDVEDNICE I SZ HRVATSKE (151–158)
  // ==========================================

  // 151. CRVENKASTA CJEPAČA
  {
    id: "crvenkasta-cjepaca",
    name: "Crvenkasta cjepača (Opekasta cjepača)",
    latin: "Inocybe erubescens Blytt (Inocybe patouillardii Bres.)",
    synonyms: "Inocybe patouillardii, Inocybe lateraria",
    folkNames: ["opekasta cjepača", "patujarova cjepača", "lažna đurđevača", "smrtonosna cjepača"],
    wikiQuery: "Inocybe_erubescens",
    bozacRef: "Svezak 1, br. 247, str. 220",
    status: "DANGER",
    statusLabel: "🔴 SMRTNO OTROVNA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Najsmrtonosnija proljetna dvojnica đurđevače u parkovima i šumama Medvednice i Zagreba! U mladosti je bjelkasta, ali starenjem i na dodir dobiva OPEKASTO-CRVENE mrlje, klobuk je stožast i radijalno raspucan, a NEMA miris na brašno!",
    simpleBullets: [
      "Klobuk je stožasto-zvonast s grbicom, radijalno vlaknasto raspucan, iz bijele prelazi u ciglasto-crvenu boju!",
      "Meso i stručak na dodir ili starenjem pocrvene (kod đurđevače nikada ne crvene!).",
      "NEMA miris na svježe brašno (miriše slatkasto-voćno ili na alkohol) i sadrži ogromne količine smrtonosnog muskarina!"
    ],
    bozacDetails: {
      klobuk: "3–9 cm, stožasto-zvonast pa raširen s izbočenim tjemenom, svilenasto radijalno vlaknast, rub se radijalno cijepa; u mladosti bjelkast do blijedožućkast, ubrzo na dodir i starenjem poprima cinober ili opekasto-crvene mrlje.",
      listici: "Gusti, prirasli do gotovo slobodni, u mladosti bjelkasti, zatim prljavo maslinasto-cimetastosmeđi s crvenkastim mrljama i bijelom oštricom.",
      strucak: "4–10 cm, valjkast, pun, vlaknast, bjelkast pa ubrzo vinskocrven ili ciglastocrven, bez prstena i bez ovoja.",
      meso: "Bijelo, na prerezu i u dnu stručka polako pocrveni, miris neugodan voćno-alkoholni ili na plijesan (nikad na brašno!).",
      spore: "Glatke, bademasto-grahaste, žutosmeđe, 10–14 x 6–8 µm, otrusina duhanskosmeđa."
    },
    lookalikes: [
      { targetId: "djurdjevaca", trait: "Crvenjenje, miris i listići (PITANJE ŽIVOTA!)", mine: "Dobiva CRVENE mrlje + smeđi zreli listići + NEMA miris na brašno", other: "Đurđevača (Jestiva): Nikad ne crveni + trajno bijelo-krem listići + snažan miris na svježe brašno!" },
      { targetId: "poljska-pecurka", trait: "Prsten i oblik klobuka", mine: "Nema prsten + stožast radijalno raspucan klobuk koji crveni", other: "Poljska pečurka (Jestiva): Ima prsten + polukuglast klobuk + čokoladnosmeđi listići." },
      { targetId: "golublja-vitezovka", trait: "Sezona i boja spora", mine: "Proljeće/rano ljeto + smeđe spore + crvene mrlje", other: "Golublja vitezovka (Jestiva): Jesen + bijele spore + plavkasta mrlja na dnu stručka." }
    ],
    habitat: "Parkovi (Maksimir, Tuškanac), podnožje Medvednice, šumski putovi pod bukvom, lipom i hrastom od svibnja do srpnja.",
    kitchen: "SMRTNO OTROVNA! Sadrži ekstremno visoku koncentraciju muskarina (do 20 puta više od crvene muhare). Izaziva teško znojenje, slinjenje, suženje zjenica, gušenje i zastoj srca već 15–60 minuta nakon jela. Protuotrov u bolnici je atropin.",
    season: "Svibanj – Srpanj"
  },

  // 152. BIJELI OBLIK ZELENE PUPAVKE
  {
    id: "bijela-zelena-pupavka",
    name: "Bijeli oblik zelene pupavke",
    latin: "Amanita phalloides var. alba (Costantin & L.M. Dufour) E.-J. Gilbert",
    synonyms: "Amanita phalloides f. alba Britzelm.",
    folkNames: ["bijela gomoljača", "albinistička pupavka", "bijela smrt"],
    wikiQuery: "Amanita_phalloides_var._alba",
    bozacRef: "Svezak 1, br. 2, str. 50",
    status: "DANGER",
    statusLabel: "🔴 SMRTNO OTROVNA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "vjencic_ovoj",
    shortSummary: "Potpuno bijeli (albinistički) varijetet zelene pupavke koji raste u istim hrastovim i bukovim šumama Medvednice i SZ Hrvatske u kasno ljeto i jesen! Nema nimalo zelenog pigmenta pa ga neiskusni zamijene za šampinjon ili bijelu vitezovku.",
    simpleBullets: [
      "Cijela gljiva (klobuk, listići, stručak, vjenčić i ovoj) je čisto bijele boje.",
      "Za razliku od pečurki (šampinjona), listići ostaju ZAUVIJEK BIJELI i na dnu stručka ima duboku bijelu vrećicu (ovoj).",
      "Raste od kolovoza do studenog zajedno s klasičnom zelenom pupavkom i jednako je smrtonosna!"
    ],
    bozacDetails: {
      klobuk: "6–13 cm, zvonast pa konveksno raširen, čisto bijel (ponekad u tjemenu s jedva primjetnim krem ili bjelkasto-žućkastim daškom), svilenasto radijalno vlaknast, gladak.",
      listici: "Slobodni, gusti, široki, trajno snježnobijeli.",
      strucak: "7–14 cm, bijel, sitno mramorasto vlaknast, s bijelim visećim vjenčićem i gomoljastom bazom obavijenom slobodnim bijelim vrećastim ovojem (volvom).",
      meso: "Bijelo, mekano, u mladosti blagog mirisa, u starosti zaudara na sirovi med i vlažnu zemlju.",
      spore: "Okruglasto-jajolike, amiloidne, 8–10 x 7–8 µm, otrusina bijela."
    },
    lookalikes: [
      { targetId: "zelena-pupavka", trait: "Boja klobuka", mine: "Potpuno bijeli klobuk bez zelenog pigmenta", other: "Zelena pupavka (SMRTONOSNA): Maslinastozeleni klobuk s tamnijim radijalnim vlaknima." },
      { targetId: "golublja-vitezovka", trait: "Vjenčić i vrećasti ovoj u dnu", mine: "IMA viseći vjenčić i vrećasti ovoj u dnu stručka", other: "Golublja vitezovka (Jestiva): NEMA ni vjenčić ni ovoj, listići izrezani uz stručak!" },
      { targetId: "sumska-pecurka", trait: "Boja listića i dno stručka", mine: "Trajno bijeli listići + bijeli ovoj u dnu + bez mirisa na anis", other: "Šumska pečurka (Jestiva): Ružičasti pa čokoladnosmeđi listići + NEMA ovoj + miriše na anis!" },
      { targetId: "bijela-pupavka", trait: "Sezona i morfološka robusnost", mine: "Kasnoljetno-jesenski robusniji oblik zelene pupavke", other: "Proljetna bijela pupavka (A. verna): Nježnija proljetno-ljetna vrsta." }
    ],
    habitat: "Bjelogorične i mješovite šume (hrast, bukva, pitomi kesten) Medvednice, Samoborskog gorja i Hrvatskog zagorja od kolovoza do studenog.",
    kitchen: "SMRTNO OTROVNA! Sadrži identičnu smrtonosnu količinu amanitina i faloidina kao i zelena pupavka.",
    season: "Kolovoz – Studeni"
  },

  // 153. HRAPAVA MUHARA
  {
    id: "hrapava-muhara",
    name: "Hrapava muhara (Žutoljuskava muhara)",
    latin: "Amanita franchetii (Boud.) Fayod (Amanita aspera)",
    synonyms: "Amanita aspera (Fr.) Hooker",
    folkNames: ["žutobradavičasta muhara", "lažna biserka", "oštroljuskava pupavka"],
    wikiQuery: "Amanita_franchetii",
    bozacRef: "Svezak 1, br. 14, str. 58",
    status: "DANGER",
    statusLabel: "🔴 OTROVNA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "samo_vjencic",
    shortSummary: "Opasna dvojnica biserke i tigrice u hrastovim i bukovim šumama! Prepoznaje se po SUMPORASTOŽUTIM šiljatim bradavicama na smeđem klobuku, žutom rubu vjenčića i žutim ljuskicama na gomolju stručka.",
    simpleBullets: [
      "Klobuk je sivosmeđ ili žutosmeđ, posut sitnim šiljatim SUMPORASTOŽUTIM bradavicama.",
      "Vjenčić je odozgo narebran, ali na donjem rubu ima karakteristične ŽUTE pahuljaste ljuskice.",
      "Za razliku od biserke, bijelo meso na prerezu NE POCRVENI u vinsku boju!"
    ],
    bozacDetails: {
      klobuk: "5–10 cm, polukuglast pa raširen, smeđosiv do maslinastosmeđ, pokriven sitnim piramidalnim krom-žutim ili sumporastožutim bradavicama, rub gladak.",
      listici: "Gusti, slobodni, bijeli sa žućkastom oštricom.",
      strucak: "6–12 cm, bjelkast, nosi bijeli narebrani vjenčić obrubljen žutim ljuskicama; gomoljasto dno okruženo koncentričnim redovima žutih bradavičastih ljuskica.",
      meso: "Bijelo, neposredno pod kožicom klobuka žućkasto, ne crveni na zraku, miris slab.",
      spore: "Eliptične, amiloidne, 8–10 x 6–7 µm, otrusina bijela."
    },
    lookalikes: [
      { targetId: "biserka", trait: "Boja bradavica i promjena boje mesa", mine: "SUMPORASTOŽUTE bradavice + meso NE pocrveni u vinsku boju", other: "Biserka (Uvjetno jestiva): Bjelkasto-sive bradavice + meso POCRVENI na prerezu i u crvotočinama!" },
      { targetId: "prava-tigrica", trait: "Boja bradavica na klobuku i gomolju", mine: "Žute šiljate bradavice na klobuku, rubu vjenčića i gomolju", other: "Prava tigrica (Uvjetno jestiva): Pepeljastosive krpice na klobuku i bijeli rub vjenčića." },
      { targetId: "panterova-muhara", trait: "Vjenčić i bradavice", mine: "Žute bradavice + narebran vjenčić", other: "Panterova muhara (SMRTONOSNA): Čisto bijele bradavice + gladak vjenčić + narebran rub klobuka!" }
    ],
    habitat: "Svijetle hrastove, bukove i kestenove šume Medvednice i sjeverozapadne Hrvatske od srpnja do listopada.",
    kitchen: "OTROVNA! Ne smije se sakupljati za jelo.",
    season: "Srpanj – Listopad"
  },

  // 154. RĐASTI PROSENJAK
  {
    id: "rdjasti-prosenjak",
    name: "Rđasti prosenjak (Crvenkasti ježek)",
    latin: "Hydnum rufescens Pers. ex Fr.",
    synonyms: "Hydnum repandum var. rufescens (Pers.) Barla",
    folkNames: ["crveni ježek", "mali ježek", "rđasta igličarka", "bodljikavac"],
    wikiQuery: "Hydnum_rufescens",
    bozacRef: "Svezak 2, br. 1424, str. 544",
    status: "SAFE",
    statusLabel: "🟢 IZVRSNA JESTIVA",
    hymenium: "iglice", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Sestrinska vrsta običnog prosenjaka, vrlo česta u višim bukovo-jelovim šumama Medvednice! Manji je i pravilniji, ima toplu NARANČASTO-RĐASTU boju klobuka, a krhke iglice ispod klobuka NE spuštaju se niz stručak.",
    simpleBullets: [
      "Klobuk je živo narančasto-rđaste do mareličastocrvene boje, tanji i pravilniji nego kod običnog prosenjaka.",
      "Ispod klobuka su krhke iglice (bodlje) koje završavaju u ravnini sa stručkom (nisu silazne!).",
      "Stručak je tanji, duži i obično smješten u samoj sredini klobuka."
    ],
    bozacDetails: {
      klobuk: "3–8 cm, konveksan pa u sredini malo ulegnut, pravilno okruglast, fino baršunast, narančasto-rđast do opečnatocrvenkast.",
      listici: "Himenij čine krhke šiljate iglice duge 2–6 mm, bjelkasto-oker do boje marelice, prirasle uz stručak s jasnim kružnim izrezom (ne spuštaju se niz stručak).",
      strucak: "3–7 cm, tanji i vitkiji nego kod običnog prosenjaka, centralan, bjelkast do narančasto-žućkast.",
      meso: "Krhko, bjelkasto do blijedonarančasto, ugodna voćnog mirisa, kod starijih primjeraka blago gorkasto.",
      spore: "Okruglaste, 7–9 x 6–7,5 µm, otrusina bijela."
    },
    lookalikes: [
      { targetId: "prosenjak", trait: "Boja klobuka i prirast iglica", mine: "Narančasto-rđasti klobuk + iglice NE silaze niz stručak + vitkiji stručak", other: "Obični prosenjak (Jestiv): Blijedožuti mesnat klobuk + iglice se SPUŠTAJU niz zdepasti stručak." },
      { targetId: "lisicica", trait: "Trusište ispod klobuka", mine: "Krhke iglice (bodlje) koje se lako mrve prstom", other: "Lisičica (Jestiva): Debele račvaste žute letvice." }
    ],
    habitat: "Bukove, jelove i smrekove šume Medvednice, Žumberka i Gorskog kotara od kolovoza do prosinca.",
    kitchen: "Izvrsna jestiva gljiva poput običnog prosenjaka; odlična za miješane gulaše, rižota i kiseljenje.",
    season: "Kolovoz – Prosinac"
  },

  // 155. DVOBOJNA KOTURNICA
  {
    id: "dvobojna-koturnica",
    name: "Dvobojna koturnica (Ljubičastonoga koturnica)",
    latin: "Lepista personata (Fr. ex Fr.) Cooke (Lepista saeva)",
    synonyms: "Lepista saeva (Fr.) P.D. Orton, Tricholoma personatum",
    folkNames: ["plavonoga", "livadna modrikača", "modronoga", "ljubičastonoga"],
    wikiQuery: "Lepista_personata",
    bozacRef: "Svezak 1, br. 656, str. 502",
    status: "SAFE",
    statusLabel: "🟢 IZVRSNA JESTIVA (PROKUHATI)",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Prepoznatljiva kasnojesenska delikatesa travnjaka, voćnjaka i šumskih rubova! Za razliku od modrikače koja je cijela ljubičasta, kod dvobojne koturnice klobuk i listići su KREM-KOŽNATI, a samo je debeli stručak ŽIVO LJUBIČAST!",
    simpleBullets: [
      "Izrazita dvobojnost: klobuk i listići su bjelkasto-oker (boje bijele kave), a stručak je jarko LJUBIČASTO-PLAV!",
      "Stručak je zdepast i prekriven ljubičastim vlaknastim ljuskicama, ali NEMA paučinastu koprenu.",
      "Raste u kasnu jesen (često i nakon prvog mraza) u vilinim krugovima na livadama i rubovima šuma."
    ],
    bozacDetails: {
      klobuk: "5–15 cm, debeo i mesnat, polukuglast pa otvoren, gladak, kožnato-žućkast, boje bijele kave ili sivkasto-oker (nikad ljubičast!).",
      listici: "Gusti, široki, izrezani uz stručak, bjelkasti do krem-žućkasti (bez ljubičaste boje), lako se odvajaju od mesa klobuka.",
      strucak: "4–10 cm visok, 1,5–3 cm debeo, čvrst, u dnu batasto zadebljan, prekriven uzdužnim jarko ljubičastim ili plavoljubičastim vlakancima.",
      meso: "Debelo, čvrsto, bjelkasto, ugodna voćno-brašnastog mirisa i blagog okusa.",
      spore: "Eliptične, sitno bradavičaste, 6–8 x 4–5 µm, otrusina blijedoružičasta."
    },
    lookalikes: [
      { targetId: "modrikaca", trait: "Boja klobuka i listića", mine: "Krem-kožnat klobuk i krem listići + SAMO stručak ljubičast (na livadama)", other: "Modrikača (Uvjetno jestiva): I klobuk i listići i stručak su ljubičasti (u šumskom lišću)!" },
      { targetId: "jarceva-koprenka", trait: "Meso na prerezu i paučina", mine: "Bijelo ugodno meso + bez paučine + ružičaste spore", other: "Jarčeva koprenka (Nejestiva): Šafranasto-smeđe meso koje smrdi na acetilen/jarca + hrđave spore!" }
    ],
    habitat: "Livade, pašnjaci, voćnjaci, parkovi i rubovi bjelogoričnih šuma sjeverozapadne Hrvatske od listopada do prosinca.",
    kitchen: "Izvrsna, mesnata i izdašna gljiva; kao i modrikaču, obavezno je termički obraditi (prokuhati ili dobro ispeći). Vrhunska za pohanje i kiseljenje.",
    season: "Listopad – Prosinac"
  },

  // 156. ŠUMSKA RUDNJAČA
  {
    id: "sumska-rudnjaca",
    name: "Šumska rudnjača (Krvava pečurka)",
    latin: "Agaricus silvaticus Schaeff. ex Secr. (Agaricus sylvaticus)",
    synonyms: "Psalliota silvatica (Schaeff.) P. Kumm.",
    folkNames: ["krvava pečurka", "šumski šampinjon", "smeđa pečurka", "krvara"],
    wikiQuery: "Agaricus_sylvaticus",
    bozacRef: "Svezak 1, br. 139, str. 144",
    status: "SAFE",
    statusLabel: "🟢 IZVRSNA JESTIVA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "samo_vjencic",
    shortSummary: "Izvrsna pečurka crnogoričnih i mješovitih šuma Medvednice! Klobuk je gusto prekriven smeđim vlaknastim ljuskama, a bijelo meso na prerezu ili ubodu trenutačno POCRVENI poput krvi (nikada ne žuti i ne smrdi na tintu!).",
    simpleBullets: [
      "Klobuk je prekriven prilegnutim smeđim do crvenosmeđim vlaknastim čehama na svjetlijoj podlozi.",
      "Bijelo meso na prerezu odmah POCRVENI u boju mrkve i svježe krvi, a potom potamni u smeđu.",
      "Ima ugodan gljivlji miris (nikada ne žuti u bazi stručka i ne smrdi na karbol!)."
    ],
    bozacDetails: {
      klobuk: "5–12 cm, zvonast pa raširen, oker-smeđ, gusto pokriven sitnim crijepastim crvenosmeđim ljuskicama, u tjemenu tamnosmeđ.",
      listici: "Slobodni, gusti, u mladosti sivoružičasti, na dodir pocrvene, u zrelosti čokoladnosmeđi.",
      strucak: "6–12 cm, vitak, šupalj, u dnu gomoljasto zadebljan, bjelkast pa smećkast, s opnastim visećim vjenčićem; na pritisak krvari crveno.",
      meso: "Bijelo, tanko, na prerezu naglo poprima krvavocrvenu nijansu, miris i okus vrlo ugodni.",
      spore: "Jajoliko-eliptične, glatke, 4,5–6 x 3–4 µm, otrusina tamnosmeđa."
    },
    lookalikes: [
      { targetId: "otrovna-pecurka", trait: "Promjena boje mesa u dnu stručka i miris", mine: "Meso POCRVENI poput krvi + ugodan šumski miris", other: "Otrovna pečurka (OTROVNA): Dno stručka trenutačno postane JARKO KROM-ŽUTO + smrdi na tintu/karbol!" },
      { targetId: "sumska-pecurka", trait: "Površina klobuka i boja mesa", mine: "Smeđe ljuskav klobuk + meso crveni", other: "Šumska anisova pečurka (Jestiva): Bijel gladak klobuk + meso polako žuti i miriše na anis." },
      { targetId: "biserka", trait: "Boja listića i spora", mine: "Ružičasti pa čokoladnosmeđi listići", other: "Biserka (Uvjetno jestiva): Trajno bijeli listići s crvenim mrljama." }
    ],
    habitat: "Smrekove, jelove i mješovite bukovo-jelove šume Medvednice, Gorskog kotara i Zagorja od srpnja do studenog.",
    kitchen: "Vrhunska jestiva gljiva punog okusa, izvrsna za dinstanje, rižota, juhe i umake.",
    season: "Srpanj – Studeni"
  },

  // 157. TROBOJNA CAPICA
  {
    id: "trobojna-capica",
    name: "Trobojna otrovna capica (Lijepa capica)",
    latin: "Ramaria formosa (Pers. ex Fr.) Quél.",
    synonyms: "Clavaria formosa Pers.",
    folkNames: ["otrovna capica", "lijepa capica", "otrovni koralj", "vražja medvjeđa šapa"],
    wikiQuery: "Ramaria_formosa",
    bozacRef: "Svezak 2, br. 1465, str. 574",
    status: "DANGER",
    statusLabel: "🔴 OTROVNA",
    regions: ["gorski_kotar", "medvednica_zagorje", "karlovac"],
    hymenium: "glatko", growth: "busen", latex: "nema", ring: "bez",
    shortSummary: "Najčešća otrovna koraljasta gljiva u bukovim šumama Gorskog kotara, Like i Medvednice! Prepoznaje se po TRI BOJE na mladoj gljivi: mesnati panj je BIJEL, grane su LOSOS-RUŽIČASTE, a sami vršci grana su LIMUNSKOŽUTI!",
    simpleBullets: [
      "Tri jasne boje u mladosti: bijela baza + narančasto-ružičaste (losos) grane + limunskožuti vršci!",
      "Meso je kredasto-krhko, gorkog okusa, a kad se osuši mrvi se u prah.",
      "Na pritisak prstom grane poprimaju vinskocrveno-smeđe mrlje."
    ],
    bozacDetails: {
      klobuk: "Plodište grmasto-koraljasto, 8–20 cm visoko i široko; iz debelog bijelog panja izbijaju brojne grane losos-ružičaste do narančastoružičaste boje koje završavaju tupim limunskožutim vršcima.",
      listici: "Himenij je gladak i prekriva vanjsku površinu grana; u starosti cijela gljiva izblijedi u oker-žućkastu boju pa oprez treba biti još veći!",
      strucak: "Debeo, mesnat, pun, u dnu bjelkast, na oštećenjima smeđecrvenkast.",
      meso: "Bijelo do blijedoružičasto, krhko, na zraku malo potamni, okus gorak i trpak.",
      spore: "Izduženo eliptične, bradavičave, oker-žute, 9–13 x 4,5–6 µm."
    },
    lookalikes: [
      { targetId: "zuta-capica", trait: "Boja grana i okus (PAZI!)", mine: "TROBOJNA (bijeli panj + LOSOS-RUŽIČASTE grane + žuti vršci) + gorko meso", other: "Žuta capica (Uvjetno jestiva): DVOBOJNA (bijeli panj + jednolično SUMPORASTOŽUTE grane bez ružičaste boje) + blag okus!" }
    ],
    habitat: "Bukove i jelove šume Gorskog kotara, Like, Medvednice i Korduna od kolovoza do listopada.",
    kitchen: "OTROVNA! Izaziva težak gastrointestinalni sindrom (jako povraćanje, vodenaste proljeve i grčeve u trbuhu već 30 minuta do 3 sata nakon jela).",
    season: "Kolovoz – Listopad"
  },

  // 158. ŽUTA CAPICA
  {
    id: "zuta-capica",
    name: "Žuta jestiva capica (Medvjeđa šapa)",
    latin: "Ramaria flava (Schaeff. ex Fr.) Quél.",
    synonyms: "Clavaria flava Schaeff.",
    folkNames: ["medvjeđa šapa", "capica", "žuti koralj", "pjetlova kreste", "zečje capice"],
    wikiQuery: "Ramaria_flava",
    bozacRef: "Svezak 2, br. 1456, str. 568",
    status: "WARN",
    statusLabel: "🟡 UVJETNO JESTIVA (SAMO MLADA)",
    hasLethalLookalike: true,
    regions: ["gorski_kotar", "medvednica_zagorje", "karlovac"],
    hymenium: "glatko", growth: "busen", latex: "nema", ring: "bez",
    shortSummary: "Poznata koraljasta 'medvjeđa šapa' bukovih i crnogoričnih šuma Gorskog kotara, Like i Medvednice! Za razliku od otrovne trobojne capice, žuta capica ima bjelkasti panj i jednolično SUMPORASTOŽUTE grane bez losos-ružičastih tonova.",
    simpleBullets: [
      "Grane i vršci su jednolično sumporasto do limunskožuti (NEMA losos-ružičaste boje na granama!).",
      "Debeli bijeli panj u dnu često ima vinskocrvenkaste mrlje.",
      "Jestivi su samo posve mladi primjerci nakon prokuhavanja i odlijevanja vode."
    ],
    bozacDetails: {
      klobuk: "Plodište koraljasto razgranato, 10–20 cm visoko; grane guste, glatke, jednolično sumporastožute do limunskožute, u starosti okeraste.",
      listici: "Himenij prekriva površinu grana; vršci su dvostruko ili trostruko nazubljeni i iste žute boje kao i grane.",
      strucak: "Debeo (do 5 cm), masivan, bjelkast, u bazi često s vinskocrvenkastim mrljama.",
      meso: "Bijelo, mramorirano, mekano, ugodna mirisa i blagog okusa (vršci kod starijih gljiva postanu gorki).",
      spore: "Valjkasto-eliptične, sitno bradavičave, 11–15 x 4–5,5 µm, otrusina oker."
    },
    lookalikes: [
      { targetId: "trobojna-capica", trait: "Boja grana i okus (SMRTNO VAŽNA RAZLIKA!)", mine: "Jednolično ŽUTE grane i žuti vršci + blag okus", other: "Trobojna capica (OTROVNA): LOSOS-RUŽIČASTE grane sa žutim vršcima + gorko meso!" }
    ],
    habitat: "Bukove i crnogorične šume Gorskog kotara, Like i Medvednice od srpnja do listopada.",
    kitchen: "Uvjetno jestiva dok je sasvim mlada: odrezati vrške grana, prokuhati 10–15 minuta i baciti vodu. Starije primjerke nikada ne brati jer se lako zamijene s izblijedjelom trobojnom capicom!",
    season: "Srpanj – Listopad"
  },

  // 159. CRNI LJETNI TARTUF
  {
    id: "crni-ljetni-tartuf",
    name: "Crni ljetni tartuf (Scorzone)",
    latin: "Tuber aestivum Vittad.",
    synonyms: "Tuber blotii Desf.",
    folkNames: ["tartuf", "crni tartuf", "scorzone", "gomoljača", "podzemna gljiva"],
    wikiQuery: "Tuber_aestivum",
    bozacRef: "Svezak 2, br. 1762, str. 784",
    status: "SAFE",
    statusLabel: "🟢 VRHUNSKA DELIKATESA",
    regions: ["istra_kvarner", "dalmacija", "slavonija", "medvednica_zagorje"],
    hymenium: "glatko", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Autohtoni podzemni dragulj Istre (dolina Mirne i Motovunska šuma), ali i hrastovih šuma Slavonije i Žumberka! Izvana je crnosmeđ s krupnim piramidalnim bradavicama, a iznutra (gleba) lješnjak-smeđ s gustom mrežom bijelih žilica.",
    simpleBullets: [
      "Raste pod zemljom (2–15 cm duboko) uz korijenje hrasta, lijeske, bukve i crnog bora.",
      "Vanjska kora (peridij) je crna i prekrivena krupnim višekutnim piramidalnim bradavicama.",
      "Unutrašnjost je na prerezu čvrsta, smećkasto-žućkasta s bijelim mramornim žilicama i ugodnog orašasto-gljivljeg mirisa."
    ],
    bozacDetails: {
      klobuk: "Plodište podzemno, gomoljasto, 2–10 cm u promjeru, crnosmeđe do crno, pokriveno krupnim, tvrdim piramidalnim bradavicama širokim 3–9 mm s poprečnim prugama.",
      listici: "Gleba (unutrašnjost) u mladosti bjelkasta, zatim žućkastosmeđa do boje lješnjaka, protkana brojnim vijugavim bjelkastim sterilnim žilicama.",
      strucak: "Nema stručka (podzemna gljiva gomoljača); vadi se isključivo uz pomoć dresiranih pasa tartufara.",
      meso: "Čvrsto, aromatično, ugodna mirisa na kuhani kukuruz, lješnjake i šumski humus.",
      spore: "Eliptične, mrežasto-alveolarne, žutosmeđe, 24–35 x 18–26 µm, po 1–6 u askusu."
    },
    lookalikes: [
      { targetId: "krumpiraca", trait: "Unutrašnjost na prerezu i miris (PAZI!)", mine: "Mramorirano smeđe meso s BIJELIM ŽILICAMA + ugodan orašasti miris", other: "Otrovna krumpirača (OTROVNA): Raste na površini + iznutra ljubičastocrna BEZ bijelih mramornih žilica + neugodan miris na gumu!" }
    ],
    habitat: "Vapnenačka tla u hrastovim, grabovim i lješnjakovim šumama Istre, Kvarnera, Dalmacije te kontinentalnih šuma Slavonije i Medvednice od svibnja do studenog.",
    kitchen: "Vrhunska gastronomska delikatesa: nariban svjež preko fuža, pljukanaca, fritaje, bifteka ili u maslinovom ulju.",
    season: "Svibanj – Studeni"
  },

  // 160. MEDITERANSKA KRASNICA (CRNIKINA KRASNICA)
  {
    id: "mediteranska-krasnica",
    name: "Mediteranska krasnica (Crnikina krasnica)",
    latin: "Russula ilicis Romagn., Chevassut & Privat",
    folkNames: ["crnikina krasnica", "primorska golubača", "otočka krasnica"],
    wikiQuery: "Russula_ilicis",
    bozacRef: "Svezak 2, br. 815, str. 114",
    status: "SAFE",
    statusLabel: "🟢 IZVRSNA JESTIVA",
    regions: ["istra_kvarner", "dalmacija"],
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Krupna, mesnata krasnica mediteranskog pojasa koja raste ISKLJUČIVO u simbiozi s hrastom crnikom (Quercus ilex) i meduncem u Istri, na Kvarneru i u Dalmaciji! Klobuk je blijedo ružičasto-ljubičast sa zelenkastom ili oker sredinom, a meso potpuno blago.",
    simpleBullets: [
      "Raste u makiji i šumama hrasta crnike (Quercus ilex) uz obalu i na otocima u jesen i zimi.",
      "Klobuk je mesnat, pastelno ružičasto-ljubičast i zelenkasto-oker s ljepljivom kožicom koja nosi pričvršćene listiće crnike.",
      "Listići su bjelkasti do krem, često račvasti uz stručak, a okus mesa je potpuno blag i orašast."
    ],
    bozacDetails: {
      klobuk: "6–15 cm, debeo, mesnat, polukuglast pa otvoren i ulegnut, bjelkast s vinsko-ljubičastim, ružičastim i maslinasto-oker mrljama; kožica debela i guli se do polovice.",
      listici: "Gusti, debeli, uz stručak račvasti, bjelkasti pa krem-žućkasti.",
      strucak: "4–9 x 2–3,5 cm, zdepast, tvrd, pun, bijel, u dnu malo posmeđi, puca poput krede, bez prstena i ovoja.",
      meso: "Debelo, vrlo čvrsto, bijelo, blagog okusa po lješnjacima. Kemijska reakcija: sa FeSO4 reagira slabo sivo-ružičasto do zelenkasto (poput R. cyanoxantha).",
      spore: "Okruglasto-eliptične, bradavičave, 7–9 x 6–7,5 µm, otrusina krem-bjelkasta."
    },
    lookalikes: [
      { targetId: "golubaca", trait: "Stanište i boja spora", mine: "Isključivo pod hrastom crnikom u Mediteranu + krem otrusina", other: "Golubača (Jestiva): Kontinentalne i mediteranske šume + posve bijela otrusina i masni elastični listići." },
      { targetId: "zelena-pupavka", trait: "Vjenčić, ovoj i lom stručka (SMRTNO VAŽNO!)", mine: "Stručak puca kao kreda + NEMA vjenčić ni ovoj u dnu", other: "Zelena pupavka (SMRTONOSNA - česta i pod crnikom!): IMA prsten i bijelu vrećicu (volvu) u dnu stručka!" }
    ],
    habitat: "Šume hrasta crnike (Quercus ilex) i hrasta medunca u Istri, na Kvarnerskim otocima (Krk, Cres, Lošinj, Rab) i u Dalmaciji od listopada do siječnja.",
    kitchen: "Izvrsna mediteranska jestiva gljiva čvrstog mesa, vrsna na gradelama ili pirjana s češnjakom i peršinom.",
    season: "Listopad – Siječanj"
  },

  // 161. ŽUTI ŽBUNAVAC (VRBOVAČA / ŠUMSKO PILE)
  {
    id: "zuti-zbunavac",
    name: "Žuti žbunavac (Vrbovača / Šumsko pile)",
    latin: "Laetiporus sulphureus (Bull. ex Fr.) Murrill",
    synonyms: "Polyporus sulphureus (Bull.) Fr.",
    folkNames: ["vrbovača", "šumsko pile", "žuti trud", "vrbin trud", "pileća gljiva"],
    wikiQuery: "Laetiporus_sulphureus",
    bozacRef: "Svezak 2, br. 1292, str. 454",
    status: "WARN",
    statusLabel: "🟡 IZVRSNA JESTIVA (MLADA I PROKUHANA)",
    regions: ["slavonija", "karlovac", "medvednica_zagorje"],
    hymenium: "cjevcice", growth: "drvo", latex: "nema", ring: "bez",
    shortSummary: "Kultna proljetna gljiva poplavnih šuma Slavonije, Posavine, Podravine i Pokuplja! Raste u kaskadnim jarko žuto-narančastim lepezama na živim vrbama, topolama i hrastovima. Mlado meso ima teksturu i okus piletine!",
    simpleBullets: [
      "Raste na deblima vrba, topola, hrastova i divljih trešanja u proljeće (svibanj – lipanj) uz rijeke Savu, Dravu, Dunav i Kupu.",
      "Cijela gljiva je jarko SUMPORASTOŽUTA do narančastožuta, s mikroskopski sitnim žutim porama odozdo.",
      "Jestiva samo dok je mlada, mekana i sočna (nikada ne brati primjerke koji rastu na otrovnoj tisi ili bagremu!)."
    ],
    bozacDetails: {
      klobuk: "10–40 cm široki lepezasti klobuci složeni poput crijepova jedan iznad drugoga u grmove teške i do 10 kg; gornja strana narančastožuta do blijedocrvenkasta, rub valovit i žut.",
      listici: "Cjevčice vrlo kratke (1–4 mm), pore sitne, okrugle, žive sumporastožute boje, u mladosti luče vodenaste kapljice.",
      strucak: "Nema pravog stručka; klobuci su bočno srasli u zajedničku mesnatu bazu pričvršćenu za stablo.",
      meso: "U mladosti mekano, sočno, mesnato, žućkastobijelo, ugodnog mirisa; u starosti postaje suho, tvrdo i mrvi se poput sira ili krede.",
      spore: "Jajoliko-eliptične, glatke, bezbojne, 5–7 x 3,5–5 µm, otrusina bijela."
    },
    lookalikes: [
      { targetId: "orijaska-grma", trait: "Boja plodišta", mine: "Jarko sumporastožute i narančaste lepeze na deblu vrbe/hrasta", other: "Orijaška grma (Jestiva): Sivosmeđe lepeze pri dnu bukve i hrasta koje na pritisak pocrne." }
    ],
    habitat: "Na živim i odumrlim stablima vrbe, topole, hrasta lužnjaka i voćaka u poplavnim šumama Slavonije (Kopački rit, Spačva), Posavine, Podravine i Pokuplja od svibnja do rujna.",
    kitchen: "U Slavoniji i Posavini omiljena 'vrbovača': mladi mekani rubovi se prokuhaju 10 minuta, a zatim pohaju kao pileći odresci ili spremaju u fiš-paprikaš i gulaš. Sirov izaziva probavne smetnje!",
    season: "Svibanj – Rujan"
  },

  // 162. JABLANOVAČA (TOPOLOVAČA)
  {
    id: "jablanovaca",
    name: "Jablanovača (Topolovača)",
    latin: "Cyclocybe aegerita (V. Brig.) Vizzini (Agrocybe aegerita)",
    synonyms: "Agrocybe cylindracea (DC.) Maire, Pholiota aegerita",
    folkNames: ["topolovača", "pioppino", "jablanovka", "bazgovača"],
    wikiQuery: "Cyclocybe_aegerita",
    bozacRef: "Svezak 1, br. 240, str. 216",
    status: "SAFE",
    statusLabel: "🟢 VRHUNSKA DELIKATESA",
    hasLethalLookalike: true,
    regions: ["slavonija", "dalmacija", "istra_kvarner", "karlovac", "medvednica_zagorje"],
    hymenium: "listici", growth: "busen", latex: "nema", ring: "samo_vjencic",
    shortSummary: "Jedna od najcjenjenijih gljiva ritskih šuma Slavonije te Dalmacije i Istre! Raste u busenima na panjevima i živim stablima jablana, topole, vrbe i bazge. Ima naboran i ispucan smeđe-krem klobuk, izražen bijeli prsten i opojan miris na vino i voće!",
    simpleBullets: [
      "Raste u busenima na topolama (jablanima), vrbama i bazgi od proljeća do kasne jeseni.",
      "Klobuk je u mladosti tamnosmeđ, a potom izblijedi u krem-oker boju te je u sredini mrežasto naboran i raspucan.",
      "Nosi širok, trajan bijeli prsten (vjenčić) koji s gornje strane posmeđi od spora, a listići su bjelkasti pa duhansko-smeđi."
    ],
    bozacDetails: {
      klobuk: "4–14 cm, polukuglast pa konveksan i raširen, suh, u mladosti kestenjastosmeđ, kasnije oker-žućkast do bijele kave s tamnijom sredinom, karakteristično naboran i poljasto raspucan.",
      listici: "Gusti, prirasli ili s kratkim zubićem silazni, u mladosti bjelkasti do krem, u zrelosti cimetasto-smeđi do duhansko-smeđi.",
      strucak: "5–15 cm, pun, čvrst, vlaknast, bjelkast do svilenasto smećkast, u gornjem dijelu nosi dobro razvijen opnast bijeli vjenčić.",
      meso: "Čvrsto, bijelo, u bazi stručka malo smećkasto, izvanredno ugodna mirisa na voće, mošt ili kvasac te slatkastog okusa.",
      spore: "Eliptične, glatke, s kličnim otvorom, 8,5–11 x 5–6 µm, otrusina duhansko-smeđa."
    },
    lookalikes: [
      { targetId: "sumporaca", trait: "Boja listića, prsten i okus (PAZI!)", mine: "Krem pa smeđi listići + bijelo slatko meso + širok bijeli prsten", other: "Prava sumporača (OTROVNA): ZELENO-ŽUTI listići + žuto ekstremno GORKO meso + bez pravog prstena!" },
      { targetId: "rebrasta-patuljica", trait: "Veličina, klobuk i stablo domaćin", mine: "Krupna mesnata gljiva na topoli/vrbi s naboranim suhim klobukom", other: "Rebrasta patuljica (SMRTONOSNA): Sitna vodenasta gljiva s prozirno narebranim rubom klobuka i mirisom na brašno!" }
    ],
    habitat: "Panjevi, korijenje i rane na živim stablima topole, jablana, vrbe i bazge u Slavoniji, Baranji, Posavini, Dalmaciji i Istri od travnja do studenog.",
    kitchen: "Vrhunska delikatesa koju su uzgajali još stari Rimljani; izvanredna na žaru, u rižotu, tjesteninama i gulašu (koriste se klobuci i gornji mekani dio stručka).",
    season: "Travanj – Studeni"
  },

  // 163. MREŽASTONOGI VRGANJ
  {
    id: "mrezastonogi-vrganj",
    name: "Mrežastonogi vrganj",
    latin: "Suillellus luridus (Schaeff.) Murrill (Boletus luridus)",
    synonyms: "Boletus luridus Schaeff.",
    folkNames: ["ciganin", "kovac mrežasti", "modrikaš", "volak", "krvavi vrganj"],
    wikiQuery: "Suillellus_luridus",
    bozacRef: "Svezak 2, br. 1093, str. 310",
    status: "WARN",
    statusLabel: "🟡 UVJETNO JESTIVA (DOBRO PROKUHATI!)",
    hasLethalLookalike: true,
    regions: ["medvednica_zagorje", "gorski_kotar", "karlovac", "slavonija", "istra_kvarner"],
    hymenium: "cjevcice", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Čest vrganj bjelogoričnih i mješovitih šuma! Prepoznaje se po maslinasto-oker klobuku, narančastocrvenim porama, izduženoj tamnocrvenoj MREŽICI na stručku i crvenkastoj (Batailleovoj) liniji između cjevčica i mesa na prerezu.",
    simpleBullets: [
      "Pore ispod klobuka su narančastocrvene i na dodir trenutačno tamno poplave.",
      "Na žuto-crvenom stručku nalazi se krupna, izdužena crveno-smeđa MREŽICA (kod kovca su samo točkice bez mrežice!).",
      "Na uzdužnom prerezu između cjevčica i mesa klobuka često se vidi tanka crvena linija (Batailleova crta), a meso odmah modri."
    ],
    bozacDetails: {
      klobuk: "5–18 cm, polukuglast pa jastučast, maslinasto-oker do kožnato-smećkast, u mladosti baršunast, za kiše ljepljiv.",
      listici: "Cjevčice žute pa maslinaste, slobodne; pore sitne, okrugle, narančastocrvene do cinober-crvene, na pritisak odmah tamnoplave.",
      strucak: "6–14 cm, toljagast ili trbušast, gore žućkast, niže narančastocrven i prekriven izraženom izduženom crvenosmeđom mrežicom.",
      meso: "Žućkasto, u bazi stručka vinskocrveno, ispod cjevčica crveno (Batailleova linija); na prerezu trenutačno modro poplavi.",
      spore: "Eliptično-vretenaste, glatke, 11–15 x 5–6,5 µm, otrusina maslinastosmeđa."
    },
    lookalikes: [
      { targetId: "ludara", trait: "Boja klobuka i miris (SMRTNO VAŽNO!)", mine: "Maslinasto-oker ili smećkast klobuk + izdužena mrežica + ugodan miris", other: "Ludara (OTROVNA): Kredastobijeli do pepeljastosivi klobuk + bačvast stručak + u starosti smrdi na strvinu!" },
      { targetId: "kovac", trait: "Ukras na stručku", mine: "Stručak prekriven izduženom MREŽICOM", other: "Kovac / Zelenjača (Uvjetno jestiv): Tamnosmeđi klobuk + stručak posut sitnim crvenim TOČKICAMA bez mrežice." }
    ],
    habitat: "Svijetle bjelogorične i mješovite šume (bukva, hrast, grab) te šumski proplanci na vapnenačkom tlu od svibnja do studenog.",
    kitchen: "Sirov i nedovoljno kuhan je otrovan! Obavezno kuhati ili pirjati najmanje 20 minuta na >70 °C. Ne preporučuje se konzumacija uz alkohol.",
    season: "Svibanj – Studeni"
  },

  // 164. BREZOV DJED
  {
    id: "brezov-djed",
    name: "Brezov djed (Obični djed)",
    latin: "Leccinum scabrum (Bull.) Gray",
    synonyms: "Boletus scaber Bull.",
    folkNames: ["dedek", "dedec", "brezovec", "brezovik", "kozak", "šumski djed"],
    wikiQuery: "Leccinum_scabrum",
    bozacRef: "Svezak 2, br. 1138, str. 346",
    status: "SAFE",
    statusLabel: "🟢 IZVRSNA JESTIVA",
    hymenium: "cjevcice", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Omiljeni 'dedek' Hrvatskog zagorja, Prigorja i Gorskog kotara! Raste isključivo u simbiozi s brezama. Prepoznaje se po sivosmeđem jastučastom klobuku i vitkom bijelom stručku posutom hrapavim tamnosmeđim čehicama.",
    simpleBullets: [
      "Raste isključivo u blizini breza (čak i uz pojedinačne breze na livadama i rubovima šuma).",
      "Stručak je vitak, bijel i cijelom dužinom prekriven sitnim hrapavim sivosmeđim ili crnkastim ljuskicama.",
      "Bijelo meso na prerezu ostaje bijelo ili tek neznatno posivi (kod grabovog djeda pocrni!)."
    ],
    bozacDetails: {
      klobuk: "5–15 cm, polukuglast pa jastučast, gladak, za vlažna vremena ljepljiv, sivosmeđ do lješnjak-smeđ.",
      listici: "Cjevčice duge, oko stručka utisnute, bjelkaste pa sivkaste; pore sitne, okrugle, bijelosive.",
      strucak: "8–18 cm visok, vitak, prema dolje malo deblji, vlaknast i tvrd, bijel, gusto posut sivosmeđim hrapavim čehama.",
      meso: "Bijelo, u klobuku mekano (kod starijih spužvasto), u stručku vlaknasto, na zraku ne mijenja boju ili tek blagozarumeni/posivi.",
      spore: "Vretenaste, glatke, 14–18 x 5–6 µm, otrusina maslinastosmeđa."
    },
    lookalikes: [
      { targetId: "grabov-djed", trait: "Stablo domaćin i promjena boje mesa", mine: "Raste pod BREZOM + meso na prerezu ostaje bjelkasto", other: "Grabov djed (Jestiv): Raste pod GRABOM + klobuk je naboran, a meso na prerezu ljubičasto POCRNI!" },
      { targetId: "žučara", trait: "Pore, stručak i okus", mine: "Sivkaste pore + crne hrapave čehice na stručku + blag okus", other: "Žučara (Nejestiva): Ružičaste pore + smeđa MREŽICA na stručku + nejestivo gorko meso!" }
    ],
    habitat: "Brezove šume, šumski proplanci i vlažne livade s brezama diljem Hrvatske od lipnja do studenog.",
    kitchen: "Vrlo cijenjena jestiva gljiva (osobito mladi čvrsti klobuci); odlična u miješanim jelima s vrganjima, u juhama, rižotu i za sušenje.",
    season: "Lipanj – Studeni"
  },

  // 165. GRABOV DJED
  {
    id: "grabov-djed",
    name: "Grabov djed",
    latin: "Leccinum pseudoscabrum (Kallenb.) Šutara (Leccinum carpini)",
    synonyms: "Leccinum carpini (R. Schulz) M.M. Moser ex Reid",
    folkNames: ["grabovec", "dedek", "dedec", "crni dedek", "grabov vrganj", "kozak"],
    wikiQuery: "Leccinum_pseudoscabrum",
    bozacRef: "Svezak 2, br. 1141, str. 348",
    status: "SAFE",
    statusLabel: "🟢 IZVRSNA JESTIVA",
    hymenium: "cjevcice", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Najčešći 'dedek' grabovih i hrastovo-grabovih šuma Zagorja, Medvednice i Slavonije! Prepoznaje se po karakteristično NABORANOM (čekićastom) smeđem klobuku i bijelom mesu koje na prerezu brzo poljubičasti i POCRNI.",
    simpleBullets: [
      "Klobuk je maslinastosmeđ do tamnosmeđ i karakteristično jamasto naboran (kao kovan čekićem).",
      "Raste u simbiozi s običnim grabom (Carpinus betulus) i lijeskom.",
      "Bijelo meso na prerezu najprije postane sivoružičasto-ljubičasto, a ubrzo zatim potpuno POCRNI (isto i pri kuhanju!)."
    ],
    bozacDetails: {
      klobuk: "4–12 cm, polukuglast pa jastučast, suh, karakteristično mozgoliko ili jamasto naboran, žutosmeđ, sivosmeđ do crnosmeđ.",
      listici: "Cjevčice duge, slobodne, bjelkasto-žućkaste pa sivosmeđe; pore sitne, na dodir pocrne.",
      strucak: "7–15 cm, vitak, u sredini ponekad malo zadebljan, bjelkast, prekriven uzdužnim nizovima sitnih smeđecrnkastih čehica.",
      meso: "Bjelkasto, na prerezu brzo mijenja boju u ljubičastosivu pa crnu, ugodna mirisa i okusa.",
      spore: "Vretenaste, 14–19 x 5–6,5 µm, otrusina maslinastosmeđa."
    },
    lookalikes: [
      { targetId: "brezov-djed", trait: "Površina klobuka i boja mesa na prerezu", mine: "Naboran klobuk pod GRABOM + meso na prerezu POCRNI", other: "Brezov djed (Jestiv): Gladak klobuk pod BREZOM + meso na prerezu ostaje bijelo." }
    ],
    habitat: "Grabove, hrastovo-grabove i lješnjakove šume sjeverozapadne Hrvatske, Medvednice i Slavonije od lipnja do listopada.",
    kitchen: "Izvrsna jestiva gljiva (iako pri kuhanju pocrni, okus je izvrstan); preporučuje se dobra termička obrada (15 min).",
    season: "Lipanj – Listopad"
  },

  // 166. CRVENI TURČIN (TREPETLJIKAR)
  {
    id: "crveni-turcin",
    name: "Crveni turčin (Trepetljikar / Jasenik)",
    latin: "Leccinum aurantiacum (Bull.) Gray (Leccinum rufum)",
    synonyms: "Boletus aurantiacus Bull., Leccinum albostipitatum",
    folkNames: ["turčin", "turek", "trepetljikar", "crvenkapac", "jasenik", "crveni dedek"],
    wikiQuery: "Leccinum_aurantiacum",
    bozacRef: "Svezak 2, br. 1132, str. 340",
    status: "SAFE",
    statusLabel: "🟢 IZVRSNA JESTIVA (DOBRO TERMIČKI OBRADITI)",
    hymenium: "cjevcice", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Kralj među djedovima i turcima! Prepoznatljiv na prvi pogled po jarko NARANČASTO-CRVENOM klobuku (poput turskog fesa) s prevjesnom kožicom na rubu i snažnom bijelom stručku posutom crvenosmeđim čehama. Raste pod trepetljikom, topolom i hrastom.",
    simpleBullets: [
      "Klobuk je žarko narančasto-crven do opečnatocrven, a kožica na rubu visi 2–5 mm preko cjevčica!",
      "Stručak je čvrst, debeo, bijel i prekriven bijelim pa crvenosmeđim hrapavim ljuskicama.",
      "Bijelo meso na prerezu polako posivi, poljubičasti i na kraju pocrni."
    ],
    bozacDetails: {
      klobuk: "6–20 cm, u mladosti kuglast sa stisnutim rubom uz stručak, potom jastučast, mesnat, narančasto-rđast do koraljnocrven; kožica prelazi rub klobuka.",
      listici: "Cjevčice duge, slobodne, bjelkaste pa sivomaslinaste; pore sitne, okrugle, bjelkaste do sive.",
      strucak: "10–20 cm visok, 2–5 cm debeo, snažan, batast, bijel, gusto posut najprije bijelim, a zatim rđastosmeđim čehama.",
      meso: "Čvrsto i debelo, bijelo, na zraku prelazi u vinskosivu pa ljubičastocrnu boju, u dnu stručka ponekad modrozeleno.",
      spore: "Vretenaste, 13–17 x 4–5,5 µm, otrusina smeđemaslinasta."
    },
    lookalikes: [
      { targetId: "brezov-djed", trait: "Boja klobuka", mine: "Žarko narančasto-crveni klobuk s prevjesnom kožicom", other: "Brezov djed (Jestiv): Sivosmeđi klobuk pod brezom." }
    ],
    habitat: "Uz jasiku (trepetljiku), topolu, hrast i bukvu po rubovima šuma Zagorja, Prigorja, Gorskog kotara i Slavonije od lipnja do studenog.",
    kitchen: "Izvrsna, čvrsta i izdašna jestiva gljiva (ostaje čvršća od običnog djeda); obavezno dobro prokuhati ili pirjati barem 15–20 minuta jer sirova izaziva probavne smetnje.",
    season: "Lipanj – Studeni"
  },

  // 167. BRADAVIČASTA PUHARA
  {
    id: "bradavicasta-puhara",
    name: "Bradavičasta puhara (Točkasta puhara)",
    latin: "Lycoperdon perlatum Pers.",
    synonyms: "Lycoperdon gemmatum Batsch",
    folkNames: ["puhara", "bumbak", "prašnica", "vučji prdac", "vučja guzica", "prdavac"],
    wikiQuery: "Lycoperdon_perlatum",
    bozacRef: "Svezak 2, br. 1662, str. 712",
    status: "SAFE",
    statusLabel: "🟢 JESTIVA (DOK JE IZNUTRA ČISTO BIJELA)",
    hasLethalLookalike: true,
    hymenium: "glatko", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Najčešća šumska puhara u Hrvatskoj! Ima oblik obrnute kruške (s užim stručkom i okruglastom glavicom) te je posuta sitnim stožastim BODLJICAMA koje se lako otaru prstom i ostavljaju mrežasti uzorak. Jestiva dok je iznutra snježnobijela!",
    simpleBullets: [
      "Kruškolikog je oblika i prekrivena sitnim stožastim bradavicama/bodljicama koje na dodir otpadaju.",
      "Na uzdužnom prerezu mlada gljiva mora biti JEDNOLIČNO ČISTO BIJELA (bez obzira zametka klobuka i bez crne mase!).",
      "U starosti posmeđi, na vrhu joj se otvori rupica i na pritisak 'puhne' oblak maslinastosmeđih spora."
    ],
    bozacDetails: {
      klobuk: "Plodište kruškoliko ili tučkoliko, 3–8 cm visoko, 2–5 cm široko, u mladosti bijelo do krem, pokriveno krupnijim stožastim bodljama okruženim vijencem sitnih zrnca.",
      listici: "Gleba (unutrašnjost) u mladosti čvrsta i snježnobijela, kasnije požuti i pretvori se u maslinastosmeđu prašnjavu masu spora.",
      strucak: "Donji dio plodišta sužen je u sterilni spužvasti stručak koji nikada ne stvara prah.",
      meso: "Bijelo, mekano poput sira u mladosti, ugodna mirisa i blagog okusa.",
      spore: "Okrugle, sitno bradavičave, 3,5–4,5 µm, maslinastosmeđe."
    },
    lookalikes: [
      { targetId: "zelena-pupavka", trait: "Uzdužni prerez (SMRTNO VAŽNO PRAVILO!)", mine: "Na prerezu JEDNOLIČNO BIJELA spužvasta masa + sitne bodljice izvana", other: "Mlada Zelena pupavka u jajetu (SMRTONOSNA): Glatko bijelo jaje + na prerezu se vidi OBRIS KLOBUKA I STRUČKA!" },
      { targetId: "krumpiraca", trait: "Unutrašnjost na prerezu i tvrdoća", mine: "Mekana kruškolika gljiva + iznutra BIJELA", other: "Otrovna krumpirača (OTROVNA): Tvrda žutosmeđa kugla + iznutra od rane mladosti CRNO-LJUBIČASTA!" }
    ],
    habitat: "Bjelogorične i crnogorične šume (često u skupinama uz šumske staze) diljem Hrvatske od lipnja do studenog.",
    kitchen: "Jestiva isključivo dok je na prerezu čisto bijela! Ogule se bodljice, nareže na ploške i prži na maslacu ili poha. Svaku puharu prije tave OBAVEZNO prerezati popola!",
    season: "Lipanj – Studeni"
  },

  // 168. VELIKA PUHARA (GOLolema ćelavica)
  {
    id: "velika-puhara",
    name: "Velika puhara (Golema ćelavica)",
    latin: "Calvatia gigantea (Batsch) Lloyd (Langermannia gigantea)",
    synonyms: "Langermannia gigantea (Batsch) Rostk., Lycoperdon giganteum",
    folkNames: ["veliki bumbak", "golema puhara", "kravlja glava", "bundevača", "ćelavica"],
    wikiQuery: "Calvatia_gigantea",
    bozacRef: "Svezak 2, br. 1648, str. 702",
    status: "SAFE",
    statusLabel: "🟢 IZVRSNA JESTIVA (DOK JE IZNUTRA BIJELA)",
    hymenium: "glatko", growth: "tlo", latex: "nema", ring: "bez",
    shortSummary: "Div među gljivama hrvatskih livada, voćnjaka i šumskih proplanaka! Izgleda poput goleme bijele nogometne lopte promjera 15 do 60 cm (ponekad teške i preko 5 kg). Dok je iznutra snježnobijela i čvrsta, daje vrhunske odreske za pohanje!",
    simpleBullets: [
      "Golemo kuglasto bijelo plodište veličine od šake pa sve do velike bundeve (15–60 cm)!",
      "Vanjska kožica je glatka poput bijele jelenje kože i lako se guli u krpama.",
      "Jestiva je samo dok je na prerezu posve bijela i čvrsta poput svježeg sira (čim požuti, postaje nejestiva)."
    ],
    bozacDetails: {
      klobuk: "Plodište okruglasto ili spljošteno kuglasto, 15–50 (80) cm široko, bijelo do kožnato-žućkasto, glatko, bez pravog stručka, pričvršćeno za tlo korjenčićem.",
      listici: "Gleba u mladosti snježnobijela, čvrsta i homogena; sazrijevanjem požuti pa postane maslinastosmeđa prašina (jedna puhara sadrži bilijune spora!).",
      strucak: "Nema stručka (sjedilačko kuglasto plodište).",
      meso: "Bijelo, kompaktno, ugodna mirisa i blagog okusa.",
      spore: "Okrugle, gotovo glatke, 3,5–5 µm, maslinastosmeđe."
    },
    lookalikes: [
      { targetId: "bradavicasta-puhara", trait: "Veličina i površina", mine: "Golema glatka bijela kugla (15–50 cm) na livadama", other: "Bradavičasta puhara (Jestiva): Mala kruškolika šumska puhara (3–8 cm) posuta bodljicama." }
    ],
    habitat: "Gnojene livade, pašnjaci, voćnjaci, rubovi šuma i vrtovi diljem Hrvatske od svibnja do listopada.",
    kitchen: "Oguli se vanjska kožica, nareže na odreske debele 1 cm i poha na bečki način ili prži na naglo.",
    season: "Svibanj – Listopad"
  },

  // 169. MESNATOSMEĐA ŠTITARKA
  {
    id: "mesnatosmedja-stitarka",
    name: "Mesnatosmeđa štitarka (Otrovna štitarka)",
    latin: "Lepiota brunneoincarnata Chodat & C. Martin",
    folkNames: ["otrovna štitarka", "lažna sunčanica", "mala štitarka", "smrtonosna štitarka"],
    wikiQuery: "Lepiota_brunneoincarnata",
    bozacRef: "Svezak 1, br. 176, str. 172",
    status: "DANGER",
    statusLabel: "💀 SMRTONOSNO OTROVNA",
    hymenium: "listici", growth: "tlo", latex: "nema", ring: "samo_vjencic",
    shortSummary: "Jedna od najopasnijih malih štitarki u Hrvatskoj! Raste u jesen po travnjacima, parkovima, voćnjacima i rubovima šuma. Izgleda kao minijaturna sunčanica (klobuk SAMO 2,5–6 cm!), ali sadrži iste SMRTONOSNE AMATOKSINE kao i zelena pupavka!",
    simpleBullets: [
      "PATULJASTI RAST: Klobuk je širok samo 2,5 do 6 cm (ZLATNO PRAVILO: nikada ne brati 'male sunčanice' ispod 10 cm!).",
      "Klobuk nosi koncentrične vinskocrveno-smeđe ili čokoladnosmeđe ljuskice na ružičasto-bjelkastoj podlozi.",
      "Stručak NEMA pomični dvostruki prsten, nego samo vinskocrvenosmeđi ljuskavi pojas u donjoj polovici, a meso na prerezu pocrveni!"
    ],
    bozacDetails: {
      klobuk: "2,5–6 cm, polukuglast pa otvoren, s tamnom crvenosmeđom ili purpurnosmeđom sredinom i koncentričnim tamnosmeđim ljuskama na bjelkasto-ružičastoj podlozi.",
      listici: "Slobodni, gusti, bjelkasti do blijedokrem.",
      strucak: "3–5 cm visok, 0,5–0,9 cm tanak, valjkast, iznad prstenaste zone bijel, a u donjem dijelu opasan vinskocrveno-smeđim ljuskavim pojasovima (bez pomičnog prstena!).",
      meso: "Bijelo, na prerezu i u kori stručka nakon par minuta postane VINSKOCRVENKASTO, blagog voćnog mirisa.",
      spore: "Eliptične, 7–9,5 x 4,5–5,5 µm, otrusina bijela."
    },
    lookalikes: [
      { targetId: "suncanica", trait: "Promjer klobuka i prsten (SMRTNO VAŽNO!)", mine: "MALI klobuk (2,5–6 cm) + NEMA pomični prsten + meso crveni", other: "Velika sunčanica (Jestiva): GOLEM klobuk (10–30 cm) + visok tigrast stručak (do 40 cm) + POMIČNI dvostruki prsten!" },
      { targetId: "smrdljiva-stitarka", trait: "Miris i boja ljuskica", mine: "Vinskocrveno-smeđe ljuskice + voćni miris + meso pocrveni", other: "Smrdljiva štitarka (SMRTONOSNA): Hrđavosmeđe ljuskice + neugodan miris na gumu/plin!" }
    ],
    habitat: "Travnjaci, parkovi, vrtovi, vinogradi i šumski rubovi diljem Hrvatske od kolovoza do studenog.",
    kitchen: "SMRTONOSNO OTROVNA! Uzrokuje faloidinski sindrom (teško zatajenje jetre i bubrega s dugom latencijom od 6 do 24 sata). Već nekoliko malih klobuka može biti smrtonosno!",
    season: "Kolovoz – Studeni"
  }
];



