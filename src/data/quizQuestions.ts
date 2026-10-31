export interface RawQuizQuestion {
  id: string;
  rank: 1 | 2 | 3 | 4 | 5;
  set: 'A' | 'B';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  bozacHint: string;
  relatedMushroomId?: string;
  visualMushroomId?: string;
  visualFocusLabel?: string;
}

export interface FieldScriptSection {
  id: string;
  chapterNumber: number;
  shortTitle: string;
  title: string;
  subtitle: string;
  iconName: 'anatomy' | 'ecology' | 'toxicology' | 'lookalikes' | 'culinary';
  keyTakeaway: string;
  blocks: {
    heading: string;
    badge?: string;
    badgeTone?: 'emerald' | 'red' | 'amber';
    paragraphs?: string[];
    bullets?: {
      term: string;
      description: string;
    }[];
  }[];
}

export const FIELD_SCRIPT_CHAPTERS: FieldScriptSection[] = [
  {
    id: 'morfologija-i-anatomija',
    chapterNumber: 1,
    shortTitle: '1. Anatomija',
    title: '1. Morfologija i anatomija gljive',
    subtitle: 'Upoznavanje građe plodnog tijela nadzemnih gljiva (makromiceta) temelj je svake sigurne determinacije.',
    iconName: 'anatomy',
    keyTakeaway: 'Uvijek pregledajte cijelo plodno tijelo od klobuka i himenija do samog dna stručka ukopanog u tlo.',
    blocks: [
      {
        heading: 'Himenij (plodište)',
        badge: 'TVORNICA SPORA',
        badgeTone: 'emerald',
        paragraphs: [
          'Dio gljive u kojem se na bazidijima ili u askusima stvaraju spore. Prema građi himenija gljive primarno dijelimo na 5 skupina:'
        ],
        bullets: [
          {
            term: '1. Cjevčice (pore / spužva)',
            description: 'Karakteristične za porodicu vrganjevki (Boletaceae). Pore u mladosti mogu biti bijele, žute, crvene ili maslinaste, a kod nekih vrsta mijenjaju boju na pritisak (npr. kestenjasti vrganj plavi, žučara prljavo ružičasti).'
          },
          {
            term: '2. Listići (lamele)',
            description: 'Radijalno raspoređeni listići ispod klobuka. Mogu biti slobodni (ne dotiču stručak, npr. kod pupavki i pečurki), prirasli, izrezani ili silazni (spuštaju se niz stručak, npr. kod bukovača).'
          },
          {
            term: '3. Bodljice (igle / zupci)',
            description: 'Meke, guste i lomljive okomite bodljice s donje strane klobuka. Klasični predstavnik je prosenjak / ježevica (Hydnum repandum).'
          },
          {
            term: '4. Nabori / žile (pseudolamele)',
            description: 'Nisu pravi listići već zadebljali, viličasto razgranjeni nabori mesa koji silaze niz stručak, karakteristični za prave lisičice (Cantharellus).'
          },
          {
            term: '5. Glatke ili nepravilne površine',
            description: 'Poput trubastog himenija kod crne trubače (Craterellus cornucopioides).'
          }
        ]
      },
      {
        heading: 'Stručak, prsten i volva',
        badge: 'KLJUČNI ZNAKOVI RODOVA',
        badgeTone: 'amber',
        bullets: [
          {
            term: 'Vrećica (volva)',
            description: 'Ostatak općeg ovoja (velum universale) na samom dnu stručka. Prisutnost slobodne, kožaste bijele vrećice u bazi stručka ključni je morfološki znak porodice Amanitaceae (smrtno opasne zelene pupavke i njezinih varijeteta).'
          },
          {
            term: 'Prsten (vjenčić / annulus)',
            description: 'Ostatak parcijalnog ovoja (velum partiale) koji je u mladosti štitio listiće. Kod velike sunčanice (Macrolepiota procera) prsten je dvostruk, podstavljen, debeo i slobodno se može pomicati rukom gore-dolje po stručku.'
          }
        ]
      },
      {
        heading: 'Otisak spora (Spore print)',
        badge: 'LABORATORIJSKI POTPIS',
        badgeTone: 'emerald',
        paragraphs: [
          'Metoda kojom se klobuk zrele gljive položi himenijem prema dolje na pola bijeli, a pola crni papir i poklopi staklenom čašom na 6–12 sati. Boja praha spora u masi (bijela, ružičasta, hrđavosmeđa, čokoladno-crna) uklanja sumnje među rodovima koji naoko izgledaju identično.'
        ]
      }
    ]
  },
  {
    id: 'ekologija-i-propisi',
    chapterNumber: 2,
    shortTitle: '2. Ekologija & Bonton',
    title: '2. Ekologija, staništa i zakonski propisi',
    subtitle: 'Simbioza sa šumskim drvećem, očuvanje podzemnog micelija i zakonska pravila sakupljanja u RH.',
    iconName: 'ecology',
    keyTakeaway: 'Dnevni limit za osobne potrebe iznosi 3 kg, rupa nakon branja zatrpava se lišćem, a PVC vrećice su strogo zabranjene.',
    blocks: [
      {
        heading: 'Mikoriza i Saprotrofi',
        badge: 'ŠUMSKI EKOSUSTAV',
        badgeTone: 'emerald',
        bullets: [
          {
            term: 'Mikoriza (Ektomikoriza)',
            description: 'Simbiotski suživot micelija gljive i korijenja višeg drveća (hife obavijaju korijen poput plašta — Hartigova mreža — bez prodiranja u stanice). Gljiva stablo opskrbljuje vodom, fosforom i mineralima iz velikog volumena tla, dok stablo gljivi predaje ugljikohidrate i šećere stvorene fotosintezom. Pravi vrganji, muhare, lisičice i rujnice isključivo su mikorizne vrste i ne mogu se umjetno uzgajati na piljevini.'
          },
          {
            term: 'Saprotrofi (Razlagači)',
            description: 'Gljive razlagači mrtve organske tvari. Bukovače (Pleurotus) i zimske panjevčice (Flammulina) razlažu mrtvo drvo (lignin i celulozu), dok gnojištarke razlažu organski humus i gnoj.'
          },
          {
            term: 'Sklerocij & Hipogeične gljive (Tartufi)',
            description: 'Sklerocij je tvrda, zbijena podzemna nakupina micelija bogata hranjivim tvarima za preživljavanje suše ili zime. Gomoljače (rod Tuber) razvijaju se pod zemljom (hipogeično) kao prilagodba na sušu i hladnoću, a spore šire šumske životinje privučene jakim aromama.'
          }
        ]
      },
      {
        heading: 'Zakonska regulativa u RH i očuvanje staništa',
        badge: 'PRAVILNIK RH (MAX 3 KG)',
        badgeTone: 'amber',
        bullets: [
          {
            term: 'Maksimalno 3 kg dnevno',
            description: 'Prema Pravilniku o zaštiti gljiva u šumama RH, dopušteno je ubrati do maksimalno 3 kg nadzemnih dijelova gljiva po beraču dnevno za osobne potrebe. Za sakupljanje je potrebna dozvola Hrvatskih šuma.'
          },
          {
            term: 'Zaštita micelija pri branju',
            description: 'Plodno tijelo treba odrezati nožem pri dnu ili pažljivo zakrenuti, a rupu obavezno zatrpati zemljom i lišćem kako vjetar i sunce ne bi isušili izloženi micelij.'
          }
        ]
      },
      {
        heading: 'Zabrana PVC vrećica i autoliza bjelančevina',
        badge: 'SEKUNDARNO TROVANJE',
        badgeTone: 'red',
        paragraphs: [
          'Sakupljanje u plastične vrećice strogo je zabranjeno jer nedostatak zraka, kondenzacija, vlažnost i toplina ubrzavaju proces autolize (samorazgradnje bjelančevina) pod utjecajem bakterija. Dolazi do stvaranja izuzetno otrovnih kemijskih spojeva (ptomaina / kadaverina), pa i potpuno jestiva gljiva iz najlona može izazvati teško sekundarno trovanje. Koriste se isključivo zračne pletene košare.'
        ]
      }
    ]
  },
  {
    id: 'mikotoksikologija',
    chapterNumber: 3,
    shortTitle: '3. Toksikologija',
    title: '3. Mikotoksikologija i hitni postupci',
    subtitle: 'Temelj procjene opasnosti kod trovanja je vrijeme proteklo od konzumacije do prvih simptoma (latencija).',
    iconName: 'toxicology',
    keyTakeaway: 'Simptomi nakon 6 do 24 sata (duga latencija) ukazuju na smrtonosna oštećenja jetre i bubrega — hitno u bolnicu uz ostatke gljiva!',
    blocks: [
      {
        heading: 'A. Sindrom kratke latencije (Simptomi unutar 15 min do 4–6 sati)',
        badge: 'KRATKA LATENCIJA (< 6h)',
        badgeTone: 'amber',
        bullets: [
          {
            term: 'Gastrointestinalni sindrom',
            description: 'Mučnina, povraćanje, proljev, grčevi u trbuhu. Uzrokuju ga blago otrovne vrste (npr. olovasta rudoliska, otrovne krasnice poput bljuvare, neprokuhane uvjetno jestive gljive). Rijetko završava smrću uz rehidraciju.'
          },
          {
            term: 'Koprinski sindrom (Coprinopsis atramentaria)',
            description: 'Jajasta gnojištarka sadrži koprin, spoj koji blokira enzim acetaldehid dehidrogenazu. Ako se unutar 48 sati prije ili poslije jela popije i najmanja količina alkohola, dolazi do nakupljanja acetaldehida u krvi: javlja se žarenje lica, lupanje srca, pad tlaka i panika. Bez alkohola, gljiva je jestiva.'
          },
          {
            term: 'Muskarinski sindrom (Inocybe i otrovne Clitocybe)',
            description: 'Male bijele cjepače (Inocybe) i otrovne livadne lijevke (Clitocybe) unutar 2 sata izazivaju prekomjerno znojenje, slinjenje, suzenje očiju, suženje zjenica i usporen rad srca. Protulijek je atropin.'
          },
          {
            term: 'Panterinski sindrom (Amanita muscaria i Amanita pantherina)',
            description: 'Uzrokuju ga ibotenska kiselina i muscimol, koji djeluju na središnji živčani sustav izazivajući delirij, konfuziju, halucinacije i grčeve.'
          }
        ]
      },
      {
        heading: 'B. Sindrom duge latencije (Simptomi nakon 6 do 24 sata i više dana — ŽIVOTNO OPASNO!)',
        badge: 'DUGA LATENCIJA (> 6h) • SMRTNA OPASNOST',
        badgeTone: 'red',
        bullets: [
          {
            term: 'Faloidinski / Amatoksinski sindrom (Amanita phalloides, Galerina marginata, male Lepiota)',
            description: 'Latencija 6 do 24 sata potpunog zatišja. Zelena pupavka sadrži faloidine (brzog djelovanja) i amatoksine (sporog djelovanja). Amatoksini ulaze u stanice jetre (hepatocite) i ireverzibilno blokiraju enzim RNK polimerazu II, zaustavljajući sintezu bjelančevina. Slijede kolerični proljevi, prividno poboljšanje 2. i 3. dan, a zatim 4. do 7. dan potpuno zatajenje jetre i bubrega.'
          },
          {
            term: 'Orelaninski sindrom (Cortinarius orellanus — crvenjača)',
            description: 'Latencija je ekstremno duga, od 2 do 20 dana (2 do 3 tjedna)! Kada se jave žeđ, suhoća usta i bolovi u križima, bubrežno tkivo je već nepovratno uništeno i dijaliza ili transplantacija su jedini izlaz.'
          },
          {
            term: 'Giromitrinski sindrom (Gyromitra esculenta — proljetni hrčak)',
            description: 'Otrov giromitrin hidrolizira u monometilhidrazin (spoj koji se koristi kao raketno gorivo). Oštećuje jetru i središnji živčani sustav. Otrov je hlapljiv, pa pare pri kuhanju mogu otrovati kuhara u zatvorenoj prostoriji.'
          },
          {
            term: 'Zlatno pravilo za Hitnu pomoć i IMI (+385 1 2348 342)',
            description: 'U bolnicu obavezno ponijeti ostatke hrane ili sirove otpatke od čišćenja iz kante za smeće radi mikroskopske analize spora kako bi liječnici odmah odredili točan protulijek.'
          }
        ]
      }
    ]
  },
  {
    id: 'kriticni-parovi-dvojnica',
    chapterNumber: 4,
    shortTitle: '4. Parovi dvojnica',
    title: '4. Kritični parovi dvojnica (Usporedbe 1-na-1)',
    subtitle: 'Šest najvažnijih terenskih razlika koje dijele vrhunsku delikatesu od kobne pogreške.',
    iconName: 'lookalikes',
    keyTakeaway: 'Nikada ne berite sunčanice manje od 10 cm, uvijek otkopajte bazu stručka kod bijelih gljiva i provjerite ljuskice na panjevčicama.',
    blocks: [
      {
        heading: '1. Biserna muhara (Amanita rubescens) vs. Panterova muhara (Amanita pantherina)',
        badge: 'UVJETNO JESTIVA vs. SMRTNO OTROVNA',
        badgeTone: 'red',
        bullets: [
          {
            term: 'Biserka (Amanita rubescens)',
            description: 'Meso na prerezu, zraku i oštećenjima od ličinki poprima boju mesa / starog vina (crveni). Prsten je izbrazdan po gornjoj površini.'
          },
          {
            term: 'Panterovka (Amanita pantherina)',
            description: 'Meso je trajno snježnobijelo i nikada ne mijenja boju. Baza stručka ima glatke stepenaste ogrlice (čarapice).'
          }
        ]
      },
      {
        heading: '2. Jesenski vrganj (Boletus edulis) vs. Žučara (Tylopilus felleus)',
        badge: 'DELIKATESA vs. NEJESTIVA GORKA',
        badgeTone: 'amber',
        bullets: [
          {
            term: 'Jesenski vrganj (Boletus edulis)',
            description: 'Bijela do blijeda mrežica na gornjem dijelu stručka; pore u mladosti bijele, zatim žute do maslinastozelene; meso ugodnog mirisa na lješnjak.'
          },
          {
            term: 'Žučara (Tylopilus felleus)',
            description: 'Izražena, tamna, reljefna crnkasto-smeđa mrežica preko stručka; pore u starosti postaju prljavoružičaste; meso je nepodnošljivo gorko.'
          }
        ]
      },
      {
        heading: '3. Lisičica (Cantharellus cibarius) vs. Maslinova zavodnica (Omphalotus olearius)',
        badge: 'DELIKATESA vs. OTROVNA',
        badgeTone: 'red',
        bullets: [
          {
            term: 'Lisičica (Cantharellus cibarius)',
            description: 'Raste pojedinačno iz zemlje/mahovine; s donje strane ima tupe, viličasto spojene žile/nabore koji silaze niz stručak; meso miriše na marelice.'
          },
          {
            term: 'Zavodnica (Omphalotus olearius)',
            description: 'Raste u gustim buketima izravno na panjevima i korijenju hrasta ili masline (također dvojnica bukovače u toplijim krajevima); ima prave, oštre, guste listiće; bioluminiscentna u mraku.'
          }
        ]
      },
      {
        heading: '4. Velika sunčanica (Macrolepiota procera) vs. Male otrovne štitarke (Lepiota spp.)',
        badge: 'PRAVILO 10 CM',
        badgeTone: 'red',
        bullets: [
          {
            term: 'Velika sunčanica (Macrolepiota procera)',
            description: 'Raste visoko, klobuk preko 15–30 cm, pomičan dvostruki prsten, stručak tigrasto izbrazdan poput zmijske kože.'
          },
          {
            term: 'Otrovne štitarke (Lepiota brunneoincarnata, L. clypeolaria)',
            description: 'Promjer klobuka manji od 10 cm, fiksiran ili propadajući prsten; sadrže smrtonosne amatoksine. Pravilo: Ne beri sunčanice promjera manjeg od 10 cm!'
          }
        ]
      },
      {
        heading: '5. Panjevčica (Kuehneromyces mutabilis) vs. Rebrasta patuljica (Galerina marginata)',
        badge: 'JESTIVA vs. SMRTNO OTROVNA',
        badgeTone: 'red',
        bullets: [
          {
            term: 'Panjevčica (Kuehneromyces mutabilis)',
            description: 'Stručak ispod prstena gusto je prekriven tamnim, stršećim ljuskicama; ugodan gljivlji miris.'
          },
          {
            term: 'Rebrasta patuljica (Galerina marginata)',
            description: 'Stručak ispod prstena je gladak i srebrnasto-svilenkasto vlaknast, bez ljuskica; miris po vlažnom brašnu; sadrži smrtonosne amatoksine.'
          }
        ]
      },
      {
        heading: '6. Livadna/Šumska pečurka (Agaricus) vs. Bijela/Zelena pupavka (Amanita phalloides)',
        badge: 'JESTIVA vs. SMRTNO OTROVNA',
        badgeTone: 'red',
        bullets: [
          {
            term: 'Pečurka / Šampinjon (Agaricus campestris / silvicola)',
            description: 'Listići u mladosti ružičasti, starenjem postaju čokoladnosmeđi do crni; dno stručka nema volvu (vrećicu).'
          },
          {
            term: 'Zelena / Bijela pupavka (Amanita phalloides)',
            description: 'Listići su trajno snježnobijeli; u dnu stručka nalazi se izražena slobodna bijela kožasta volva (često skrivena ispod mahovine i lišća!).'
          }
        ]
      }
    ]
  },
  {
    id: 'kulinarska-pravila',
    chapterNumber: 5,
    shortTitle: '5. Kuhinja & Čuvanje',
    title: '5. Kulinarska pravila, termolabilnost i čuvanje',
    subtitle: 'Pravilna termička obrada uvjetno jestivih vrsta, suho čišćenje, blanširanje i sušenje.',
    iconName: 'culinary',
    keyTakeaway: 'Uvjetno jestive vrste kuhajte najmanje 20 minuta, gljive čistite na suho bez potapanja u vodu, a lisičice blanširajte prije zamrzavanja.',
    blocks: [
      {
        heading: 'Termolabilni otrovi i uvjetna jestivost',
        badge: 'MINIMALNO 20 MINUTA KUHANJA',
        badgeTone: 'amber',
        paragraphs: [
          'Modrikača (Lepista nuda), biserka (Amanita rubescens), maglenka (Clitocybe nebularis) i proljetni smrčak (Morchella esculenta) sadrže termolabilne toksine (hemolizine ili nebularin) koji sirovi razaraju eritrocite ili izazivaju teške probavne smetnje. Obavezna je termička obrada na najmanje 75–80°C u trajanju od minimalno 20 minuta uz prolijevanje prve vode kod maglenke.'
        ]
      },
      {
        heading: 'Čišćenje, zamrzavanje i sušenje',
        badge: 'GASTRONOMSKI STANDARD',
        badgeTone: 'emerald',
        bullets: [
          {
            term: 'Suho čišćenje (Bez potapanja u vodu)',
            description: 'Gljive se nikada ne potapaju u vodu jer cjevčice i meso poput spužve upijaju vlagu, čime gube aromu i postaju gnjecave. Čiste se na suho: nožićem se odstrani zemlja s baze, a površina klobuka prebriše se vlažnom krpom ili kistom.'
          },
          {
            term: 'Zamrzavanje lisičica (Obavezno blanširanje)',
            description: 'Lisičice sadrže gorke tvari koje na temperaturama ispod nule u sirovom stanju reagiraju s mastima. Ako se zamrznu sirove, nakon odmrzavanja postaju žilave i gorke. Moraju se prije zamrzavanja blanširati (2–3 minute u kipućoj vodi) ili kratko dinstati na maslacu.'
          },
          {
            term: 'Sušenje i rehidracija',
            description: 'Najbolje gljive za sušenje su crne trubače i vrganji. Sušenjem crna trubača koncentrira guanilate i glutamate te mljevenjem u crni prah služi kao vrhunski začin („crni tartuf za siromašne”). Suhe gljive se rehidriraju namakanjem u mlakoj vodi 20–30 min, a procijeđena tekućina koristi se kao bogati temeljac.'
          }
        ]
      }
    ]
  }
];

export const ALL_QUESTIONS_JSON: RawQuizQuestion[] = [
  {
    id: 'q01',
    rank: 1,
    set: 'A',
    question: 'Koja je osnovna razlika na donjoj strani klobuka između pravog jesenskog vrganja i livadne pečurke?',
    options: [
      'Vrganj ima cjevčice (spužvu), a pečurka listiće',
      'Vrganj ima bodljice, a pečurka cjevčice',
      'Vrganj ima glatku površinu, a pečurka mrežicu',
      'Obje gljive imaju identične bijele listiće'
    ],
    correctIndex: 0,
    explanation: 'Vrganjevke (Boletaceae) ispod klobuka nose himenij u obliku cjevčica s porama (spužva), dok pečurke (Agaricus) imaju prave listiće.',
    bozacHint: 'Opipajte prstom pod klobukom: spužva pripada vrganju, a listići pečurki.',
    relatedMushroomId: 'jesenski-vrganj',
    visualMushroomId: 'jesenski-vrganj',
    visualFocusLabel: 'HIMENIJ VRGANJA (CJEVČICE / SPUŽVA)'
  },
  {
    id: 'q02',
    rank: 1,
    set: 'A',
    question: 'Kojoj prepoznatljivoj boji pripada klobuk klasične crvene muhare (Amanita muscaria)?',
    options: [
      'Maslinastozelena',
      'Jarkocrvena s bijelim piramidalnim krpicama',
      'Čokoladno smeđa s plavim pjegama',
      'Sumporastožuta s crnim prugama'
    ],
    correctIndex: 1,
    explanation: 'Crvena muhara ima upečatljiv crveni klobuk posut bijelim ostacima ovoja u obliku krpica.',
    bozacHint: 'Sjetite se ilustracija iz dječjih bajki: jarkocrvena kapa s bijelim točkicama.',
    relatedMushroomId: 'crvena-muhara',
    visualMushroomId: 'crvena-muhara',
    visualFocusLabel: 'KLOBUK S BIJELIM KRPICAMA OVOJA'
  },
  {
    id: 'q03',
    rank: 1,
    set: 'A',
    question: 'Gdje se na pravoj velikoj sunčanici (Macrolepiota procera) nalazi prsten na stručku?',
    options: [
      'Prsten je nepomičan i urastao u dno stručka',
      'Prsten je dvostruk, podstavljen i slobodno se pomiče gore-dolje',
      'Sunčanica uopće nema prsten, već samo ovoj',
      'Prsten visi poput tanke paučine na samom vrhu'
    ],
    correctIndex: 1,
    explanation: 'Prsten velike sunčanice je debeo, dvostruk i nije prirastao uz stručak – može se slobodno klizati rukom duž stručka.',
    bozacHint: 'Ako se vjenčić ne da pomicati poput prstena na ruci, oprez – to nije prava sunčanica!',
    relatedMushroomId: 'velika-suncanica',
    visualMushroomId: 'velika-suncanica',
    visualFocusLabel: 'DVOSTRUKI POMIČNI PRSTEN NA STRUČKU'
  },
  {
    id: 'q04',
    rank: 1,
    set: 'A',
    question: 'Koju boju poprimaju pore jesenskog vrganja (Boletus edulis) u punoj starosti?',
    options: [
      'Iz bijelih preko žutih prelaze u maslinasto-zelenkaste',
      'Postaju jarkocrvene poput krvi',
      'Postaju potpuno snježnobijele',
      'Prelaze u modroljubičastu boju'
    ],
    correctIndex: 0,
    explanation: 'Pore pravog vrganja u mladosti su bijele, zatim postaju žućkaste, a u zrelosti maslinastozelene boje zrelih spora.',
    bozacHint: 'Bijelo u mladosti, zeleno u starosti – to je prirodni ciklus spora pravog vrganja.',
    relatedMushroomId: 'jesenski-vrganj'
  },
  {
    id: 'q05',
    rank: 1,
    set: 'A',
    question: "Što je to 'micelij' u svijetu gljiva?",
    options: [
      'Samo gornja kožica klobuka',
      'Podzemna mreža finih hifa koja čini pravo tijelo gljive',
      'Ostatak sasušenih spora na suncu',
      'Kemijski spoj koji tjera kukce'
    ],
    correctIndex: 1,
    explanation: 'Micelij je vegetativno tijelo gljive sastavljeno od mikroskopskih niti (hifa) u tlu ili drvu, dok je gljiva koju beremo tek plodno tijelo.',
    bozacHint: 'Ono što beremo samo je jabuka na grani; micelij u tlu je čitavo stablo.'
  },
  {
    id: 'q06',
    rank: 1,
    set: 'A',
    question: 'Koja je najpoznatija jestiva gljiva prepoznatljive zlatnožute boje i mirisa na marelice?',
    options: [
      'Lisičica (Cantharellus cibarius)',
      'Zelena pupavka',
      'Smrdljivi stršak',
      'Otrovna rudoliska'
    ],
    correctIndex: 0,
    explanation: 'Obična lisičica cijenjena je zbog svoje zlatnožute boje, viličastih žila i ugodnog voćnog mirisa koji podsjeća na breskve ili marelice.',
    bozacHint: 'Zlato šumskog tla koje miriše na svježe ubrano voće.',
    relatedMushroomId: 'lisicica',
    visualMushroomId: 'lisicica',
    visualFocusLabel: 'ZLATNOŽUTO PLODNO TIJELO I NABORI'
  },
  {
    id: 'q07',
    rank: 1,
    set: 'B',
    question: 'Koja od navedenih gljiva s donje strane klobuka nema listiće nego mekane, lomljive bodljice?',
    options: [
      'Bukovača',
      'Prosenjak ili ježevica (Hydnum repandum)',
      'Smrekova rujnica',
      'Crna trubača'
    ],
    correctIndex: 1,
    explanation: 'Prosenjak (Hydnum repandum) pripada ježevicama; njegov himenij čine guste, nježne i lomljive iglice/bodljice.',
    bozacHint: 'Gljiva koja s donje strane klobuka nosi pravo malo polje mekih ježevih bodlji.',
    relatedMushroomId: 'prosenjak',
    visualMushroomId: 'prosenjak',
    visualFocusLabel: 'IGLIČASTI HIMENIJ (BODLJICE ISPOD KLOBUKA)'
  },
  {
    id: 'q08',
    rank: 1,
    set: 'B',
    question: 'Koju boju poprimaju listići livadne pečurke (Agaricus campestris) kako gljiva stari?',
    options: [
      'Iz ružičastih prelaze u tamnosmeđe do čokoladno-crne',
      'Iz snježnobijelih prelaze u trajno žute',
      'Iz plavih prelaze u zelene',
      'Ostaju trajno mliječno bijeli'
    ],
    correctIndex: 0,
    explanation: 'Mlade pečurke imaju nježno ružičaste listiće koji starenjem i sazrijevanjem spora postaju tamnočokoladni i gotovo crni.',
    bozacHint: 'Ako su listići odrasle gljive ostali snježnobijeli, u ruci držite pupavku, a ne šampinjon!',
    relatedMushroomId: 'poljska-pecurka'
  },
  {
    id: 'q09',
    rank: 1,
    set: 'B',
    question: "Što u mikologiji označava pojam 'himenij'?",
    options: [
      'Fizički korijen gljive duboko u zemlji',
      'Plodno tijelo na kojem se stvaraju spore (listići, cjevčice, bodlje)',
      'Ovoj u dnu stručka (volva)',
      'Sluzavi sloj na površini klobuka'
    ],
    correctIndex: 1,
    explanation: 'Himenij je fertilni sloj plodnog tijela na kojem nastaju spore namijenjene razmnožavanju.',
    bozacHint: 'To je tvornica spora s donje strane klobuka.'
  },
  {
    id: 'q10',
    rank: 1,
    set: 'B',
    question: 'Kako nazivamo karakterističan vrećasti ovoj na bazi stručka kod zelene pupavke?',
    options: [
      'Kortina',
      'Volva',
      'Sklerocij',
      'Apofiza'
    ],
    correctIndex: 1,
    explanation: 'Volva je donji ostatak općeg ovoja (velum universale) koji poput vrećice obavija bazu stručka kod roda Amanita.',
    bozacHint: 'Smrt se u šumi često krije u bijeloj vrećici zakopanoj u lišću.',
    relatedMushroomId: 'zelena-pupavka',
    visualMushroomId: 'zelena-pupavka',
    visualFocusLabel: 'VOLVA (VREĆICA) NA DNU STRUČKA'
  },
  {
    id: 'q11',
    rank: 1,
    set: 'B',
    question: 'Koja je osnovna karakteristika lisičice koja je razlikuje od običnih gljiva s listićima?',
    options: [
      'Ima cjevčice s porama',
      'Nema prave listiće nego viličasto spojene žile (letvice)',
      'Potpuno je šuplja poput lopte',
      'Raste isključivo pod zemljom'
    ],
    correctIndex: 1,
    explanation: 'Lisičice nemaju prave listiće koji se daju odvojiti, već nepravilno razgranjene žile/nabore koji se stapaju sa stručkom.',
    bozacHint: 'Nabori mesa koji silaze niz stručak, a ne tanki oštri nožići.',
    relatedMushroomId: 'lisicica'
  },
  {
    id: 'q12',
    rank: 1,
    set: 'B',
    question: 'Koja od navedenih gljiva raste u gustim grmovima na panjevima i deblima bjelogorice?',
    options: [
      'Bukovača (Pleurotus ostreatus)',
      'Borov vrganj',
      'Livadna pečurka',
      'Blagva'
    ],
    correctIndex: 0,
    explanation: 'Bukovača je saprofit i raste busenasto na panjevima i srušenim deblima bukve, graba i topole u kasnu jesen.',
    bozacHint: 'Gljiva koja ne traži zemlju nego panj starog bjelogoričnog drveta.',
    relatedMushroomId: 'bukovaca',
    visualMushroomId: 'bukovaca',
    visualFocusLabel: 'BUSENASTI RAST NA DEBLU BJELOGORICE'
  },
  {
    id: 'q13',
    rank: 2,
    set: 'A',
    question: 'Zbog čega se modrikača (Lepista nuda) i biserna muhara (Amanita rubescens) ubrajaju u uvjetno jestive gljive?',
    options: [
      'Zato što se moraju kiseliti najmanje 6 mjeseci',
      'Zato što sirove sadrže termolabilne hemolizine koji se uništavaju kuhanjem min. 20 min',
      'Zato što im se mora oguliti kožica klobuka prije sušenja',
      'Zato što su jestive samo ako rastu ispod crnogorice'
    ],
    correctIndex: 1,
    explanation: 'Uvjetno jestive gljive sadrže termolabilne otrove (često hemolizine koji razaraju crvena krvna zrnca) koji se kuhanjem na temperaturi iznad 75°C potpuno razgrađuju.',
    bozacHint: 'Vatra neutralizira njihove otrove; sirove nikada u usta!',
    relatedMushroomId: 'biserka'
  },
  {
    id: 'q14',
    rank: 2,
    set: 'A',
    question: 'Kakav mliječni sok ispušta smrekova rujnica (Lactarius deterrimus) kada joj prerežemo listiće?',
    options: [
      'Vodenast i proziran poput rose',
      'Intenzivno mrkvaste, jarkonarančaste boje',
      'Gusto bijelo mlijeko izrazito ljutog okusa',
      'Plavo-zelenu gustu sluz'
    ],
    correctIndex: 1,
    explanation: 'Prave rujnice iz odjeljka Dapetes odlikuju se jarkonarančastim ili crvenim mliječnim sokom koji na zraku polako oksidira i poprima zelenkaste tonove.',
    bozacHint: 'Mrkva u listićima koja s vremenom pozeleni poput bakrene patine.',
    relatedMushroomId: 'smrekova-rujnica',
    visualMushroomId: 'smrekova-rujnica',
    visualFocusLabel: 'MRKVASTO-NARANČASTI MLIJEČNI SOK'
  },
  {
    id: 'q15',
    rank: 2,
    set: 'A',
    question: 'Na kojem staništu nikada nećete naći bukovaču (Pleurotus ostreatus)?',
    options: [
      'Izravno iz kiselog pjeskovitog tla na suhoj livadi',
      'Na deblu srušene bukve',
      'Na panju topole ili graba',
      'Na oštećenom živom bjelogoričnom stablu'
    ],
    correctIndex: 0,
    explanation: 'Bukovača je drvna gljiva (lignikol) i ne raste izravno iz trave na tlu.',
    bozacHint: 'Bukovača je stvorena za drvo, livadno tlo nije njezin dom.',
    relatedMushroomId: 'bukovaca'
  },
  {
    id: 'q16',
    rank: 2,
    set: 'A',
    question: 'Koji je pravilan postupak pripreme i čišćenja svježih vrganja prije kuhanja?',
    options: [
      'Potopiti ih u vodu s octom na dva sata',
      'Očistiti na suho nožićem i kistom; ne prati u vodi jer upijaju tekućinu',
      'Ukloniti cjevčice pod jakim mlazom tople vode',
      'Oguliti stručak do bijelog mesa'
    ],
    correctIndex: 1,
    explanation: 'Gljive se nikada ne peru u posudi s vodom jer spužvasta struktura upija vlagu i gubi arome; čiste se četkicom i vlažnom krpom.',
    bozacHint: 'Voda je neprijatelj arome vrganja – kist i nožić su jedini alati.',
    relatedMushroomId: 'jesenski-vrganj'
  },
  {
    id: 'q17',
    rank: 2,
    set: 'A',
    question: 'Zašto se lisičice (Cantharellus cibarius) prije zamrzavanja preporučuje kratko blanširati?',
    options: [
      'Da ne bi pozelenjele u ledu',
      'Ako se zamrznu sirove, nakon odmrzavanja postaju žilave i gorke',
      'Zato što gube vitamine',
      'Zato što sirove mogu oštetiti ambalažu'
    ],
    correctIndex: 1,
    explanation: 'Sirova lisičica na niskim temperaturama stvara gorčinu; termičko blanširanje od 2 minute čuva okus i teksturu mesa.',
    bozacHint: 'Kratko u kipuću vodu prije zamrzivača, inače ćete dobiti gorku gumu.',
    relatedMushroomId: 'lisicica'
  },
  {
    id: 'q18',
    rank: 2,
    set: 'A',
    question: 'Po čemu je crna trubača (Craterellus cornucopioides) kulinarski najpoznatija?',
    options: [
      'Daje najbolji žele za hladetinu',
      'Sušenjem i mljevenjem u crni prah služi kao vrhunski aromatični začin',
      'Može se jesti potpuno sirova u neograničenim količinama',
      'Raste isključivo pod snijegom u siječnju'
    ],
    correctIndex: 1,
    explanation: 'Crna trubača se zbog tankog mesa idealno suši i melje u crni mikološki prah koji jelima daje duboku umami aromu.',
    bozacHint: 'Crni tartuf za siromašne – suha i samljevena pretvara se u zlato za umake.',
    relatedMushroomId: 'crna-trubaca',
    visualMushroomId: 'crna-trubaca',
    visualFocusLabel: 'TRUBASTO PLODNO TIJELO BEZ LISTIĆA'
  },
  {
    id: 'q19',
    rank: 2,
    set: 'B',
    question: 'Koja je jestiva gljiva poznata po izrazitom mirisu na svježe samljeveno brašno?',
    options: [
      'Đurđevača / svibanjska brona (Calocybe gambosa)',
      'Zelena pupavka',
      'Smrdljivi stršak',
      'Lisičica'
    ],
    correctIndex: 0,
    explanation: 'Đurđevača, koja raste u proljeće oko blagdana sv. Jurja, ima ugodan i jak miris na svježe pšenično brašno.',
    bozacHint: 'Proljetna gljiva s livada koja miriše ravno na mlin i pšenično zrno.',
    relatedMushroomId: 'durdevaca'
  },
  {
    id: 'q20',
    rank: 2,
    set: 'B',
    question: 'Zašto se gljiva maglenka (Clitocybe nebularis) mora kuhati u kipućoj vodi najmanje 15-20 minuta uz bacanje vode?',
    options: [
      'Zato što sadrži nebularin i termolabilne toksine koji sirovi izazivaju trovanje',
      'Zato što je presuha',
      'Zato što joj kožica klobuka pocrni bez kuhanja',
      'Zato što privlači ose ako se ne prokuha'
    ],
    correctIndex: 0,
    explanation: 'Maglenka sadrži spoj nebularin i toksine koji bez temeljite termičke obrade i odbacivanja vode kuhanja izazivaju žestoke probavne smetnje.',
    bozacHint: 'Maglenka traži kipući lonac i bacanje prve vode – zaboravite brzo prženje.',
    relatedMushroomId: 'maglenka'
  },
  {
    id: 'q21',
    rank: 2,
    set: 'B',
    question: 'Koji je najbolji način dugotrajnog očuvanja mirisa i okusa pravog jesenskog vrganja?',
    options: [
      'Konzerviranje u soli',
      'Sušenje narezanih ploški na zraku ili dehidratoru',
      'Držanje u plastičnoj vrećici u smočnici',
      'Kuhanje s limuntusom'
    ],
    correctIndex: 1,
    explanation: 'Sušenjem vrganj razvija intenzivan miris i koncentrira arome, a osušen u staklenkama traje godinama.',
    bozacHint: 'Tanko narezano i osušeno pod blagim strujanjem toplog zraka.',
    relatedMushroomId: 'jesenski-vrganj'
  },
  {
    id: 'q22',
    rank: 2,
    set: 'B',
    question: 'U koje doba godine se u našim šumama javlja proljetni smrčak (Morchella esculenta)?',
    options: [
      'U listopadu i studenom',
      'U rano proljeće, od ožujka do svibnja',
      'Usred vrućeg kolovoza',
      'Tijekom cijele zime'
    ],
    correctIndex: 1,
    explanation: 'Smrčci su tipične rano proljetne gljive koje plodonosu duž rijeka, pod jasenom i voćkama od kraja ožujka do početka svibnja.',
    bozacHint: 'Kad se priroda budi i voćke cvjetaju, smrčak izlazi na obalama rijeka.',
    relatedMushroomId: 'jestivi-smrcak',
    visualMushroomId: 'jestivi-smrcak',
    visualFocusLabel: 'KLOBUK POPUT PČELINJEG SAĆA'
  },
  {
    id: 'q23',
    rank: 2,
    set: 'B',
    question: 'Koja je glavna odlika gljiva iz roda krasnica (Russula) u pogledu lomljivosti mesa?',
    options: [
      'Meso im je žilavo i rastezljivo poput gume',
      'Meso im je zrnasto i krhko poput krede te puca bez cijeđenja mlijeka',
      'Ispuštaju ljepljivu crnu smolu',
      'Meso im je puno drvenastih vlakana'
    ],
    correctIndex: 1,
    explanation: 'Krasnice sferocitnom građom stanica daju krhko meso koje se lomi poput krede i nema mliječnog soka (za razliku od mliječnica).',
    bozacHint: 'Pukne poput krede pod prstima, a mlijeka nema – to je krasnica.',
    relatedMushroomId: 'golubaca'
  },
  {
    id: 'q24',
    rank: 2,
    set: 'B',
    question: "Što označava naziv 'vilinski krug' kod gljiva na livadi ili u šumi?",
    options: [
      'Prostor gdje su se gljive osušile od mraza',
      'Kružno širenje micelija iz središta prema van na čijem rubu niču plodna tijela',
      'Gnijezdo šumskih ptica prekriveno sporama',
      'Umjetno zasađeni nasad gljiva'
    ],
    correctIndex: 1,
    explanation: 'Micelij ravnomjerno raste u krug iz jedne točke; na vanjskom rubu gdje je tlo najbogatije hranjivim tvarima plodna tijela formiraju pravilan krug.',
    bozacHint: 'Podzemna mreža širi se poput vala na vodi, ostavljajući gljive na obodu kruga.',
    relatedMushroomId: 'vilin-klincac'
  },
  {
    id: 'q25',
    rank: 3,
    set: 'A',
    question: 'Koja je ključna razlika između biserke (Amanita rubescens) i smrtno otrovne panterove muhare (Amanita pantherina)?',
    options: [
      'Biserka ima gladak stručak, a panterovka čupav',
      'Meso biserke na prerezu i oštećenjima crveni, dok meso panterovke ostaje snježnobijelo',
      'Panterovka nema prsten, a biserka ima dvostruki ovoj',
      'Biserka raste samo na stijenama'
    ],
    correctIndex: 1,
    explanation: 'Amanita rubescens (biserka) ima meso koje u dodiru sa zrakom polako poprima vinsko-crvenu boju (otud naziv rubescens), dok meso panterovke ostaje potpuno bijelo.',
    bozacHint: 'Crveni li meso na lomu poput starog vina? Ako da, biserka je; ako ostaje bijelo – panterovka ubija!',
    relatedMushroomId: 'biserka',
    visualMushroomId: 'biserka',
    visualFocusLabel: 'CRVENJENJE MESA I IZBRAZDANI PRSTEN'
  },
  {
    id: 'q26',
    rank: 3,
    set: 'A',
    question: 'Kako ćete na terenu pouzdano prepoznati žučaru (Tylopilus felleus) i ne zamijeniti je s pravim vrganjem?',
    options: [
      'Žučara ima izbočenu tamnosmeđu mrežicu, pore u starosti ružičaste i meso je izrazito gorko',
      'Žučara nikada nema stručak deblji od 5 milimetara',
      'Pravi vrganj ima ružičaste pore, a žučara uvijek zelene',
      'Žučara na prerezu odmah poprimi intenzivno modru boju'
    ],
    correctIndex: 0,
    explanation: 'Žučara ima tamnu, krupnu mrežicu na svjetlijem stručku (suprotno od vrganja koji ima bijelu mrežicu), pore joj stareći postaju prljavoružičaste i meso joj je nejestivo gorko.',
    bozacHint: 'Pogledajte mrežicu: tamne linije i ružičaste pore znak su gorke žučare.',
    relatedMushroomId: 'zucara',
    visualMushroomId: 'zucara',
    visualFocusLabel: 'TAMNA MREŽICA I RUŽIČASTE PORE'
  },
  {
    id: 'q27',
    rank: 3,
    set: 'A',
    question: 'Zavodnica (Omphalotus olearius) otrovna je dvojnica lisičice. Po čemu se ponajprije razlikuju na staništu?',
    options: [
      'Zavodnica raste busenasto na panjevima i korijenju drveća te ima oštre, prave listiće',
      'Lisičica raste isključivo na trulom drvetu, a zavodnica na travi',
      'Zavodnica miriše na svježe marelice',
      'Lisičica ima oštre listiće koji se lako ljušte'
    ],
    correctIndex: 0,
    explanation: 'Zavodnica raste u velikim buketima na panjevima hrasta i masline te ima prave, oštre listiće, dok lisičica raste pojedinačno iz zemlje i ima tupe nabore/žile.',
    bozacHint: "Gljiva koja 'zavodi' raste u grmu na panju drveta i ima oštre listiće.",
    relatedMushroomId: 'zavodnica'
  },
  {
    id: 'q28',
    rank: 3,
    set: 'A',
    question: 'Koja je kobna zamka pri branju malih sunčanica promjera klobuka ispod 10 centimetara?',
    options: [
      'Zato što sadrže previše željeza',
      'Mogu se zamijeniti sa smrtno otrovnim malim štitarkama (Lepiota) koje sadrže amatoksine',
      'Zato što male sunčanice nemaju spore',
      'Male sunčanice privlače krpelje'
    ],
    correctIndex: 1,
    explanation: 'Male vrste iz roda Lepiota (npr. Lepiota brunneoincarnata) izgledom podsjećaju na minijaturne sunčanice, ali sadrže smrtonosne amatoksine koji uništavaju jetru.',
    bozacHint: 'Pravilo šume: sunčanicu ispod 10 cm promjera nikada ne stavljajte u košaru!',
    relatedMushroomId: 'velika-suncanica'
  },
  {
    id: 'q29',
    rank: 3,
    set: 'A',
    question: 'Kako se razlikuje otrovna bljuvara (Russula emetica) od jestivih crvenih krasnica?',
    options: [
      'Bljuvara raste samo pod vodom',
      'Meso bljuvare je izrazito i nepodnošljivo ljuto na vršku jezika',
      'Bljuvara ima crne listiće',
      'Bljuvara uvijek ispušta plavo mlijeko'
    ],
    correctIndex: 1,
    explanation: 'Kod krasnica (Russula) vrijedi pravilo kušanja: komadić sirovog mesa prisloni se na vršak jezika; ako nepodnošljivo peče i ljuti, gljiva je otrovna ili nejestiva (poput bljuvare).',
    bozacHint: 'Mali test na vršku jezika: ako peče poput feferona, ispljunite – to je bljuvara.',
    relatedMushroomId: 'bljuvara'
  },
  {
    id: 'q30',
    rank: 3,
    set: 'A',
    question: 'Po čemu se razlikuje jestiva gnojištarka (Coprinus comatus) u fazi jestivosti od neupotrebljivih primjeraka?',
    options: [
      "Mora biti potpuno bijela i zatvorena; čim rubovi počnu crniti i pretvarati se u 'tintu', nije za jelo",
      'Mora biti potpuno crna',
      'Mora imati široko otvoren klobuk',
      'Mora se brati samo noću'
    ],
    correctIndex: 0,
    explanation: 'Čupava gnojištarka brzo prolazi autolizu: jestiva je samo dok je mlada, čvrsta i potpuno bijelih listića, prije nego što prijeđe u crnu tekućinu.',
    bozacHint: 'Samo snježnobijeli čupavi valjci idu u tavu; čim pocrni, kasno je.',
    relatedMushroomId: 'velika-gnojistarka'
  },
  {
    id: 'q31',
    rank: 3,
    set: 'B',
    question: 'Šumski šampinjon (Agaricus silvicola) i zelena pupavka (Amanita phalloides) dijele bijele varijacije. Koja ih osobina u bazi nepovratno dijeli?',
    options: [
      'Pupavka ima slobodnu kožastu volvu (vrećicu) u dnu i trajno bijele listiće, dok šampinjon nema volvu i listići mu tamne',
      'Šampinjon ima zeleni klobuk, a pupavka žuti',
      'Pupavka ima miris na anis, a šampinjon smrdi na katran',
      'Šampinjon raste isključivo na stijenama'
    ],
    correctIndex: 0,
    explanation: 'Zelena pupavka u bazi ima vrećastu volvu i njezini listići ostaju trajno bijeli, dok šampinjoni nemaju volvu i njihovi listići sazrijevanjem postaju smeđi i crni.',
    bozacHint: 'Otkopajte bazu gljive: vrećica i bijeli listići znače sigurnu smrt.',
    relatedMushroomId: 'zelena-pupavka'
  },
  {
    id: 'q32',
    rank: 3,
    set: 'B',
    question: 'Kako razlikovati smrtno otrovnu rebrastu patuljicu (Galerina marginata) od jestive panjevčice (Kuehneromyces mutabilis)?',
    options: [
      'Panjevčica ispod prstena ima izražene tamne, stršeće ljuskice, dok patuljica ima svilenkast stručak bez ljuskica',
      'Patuljica raste samo na livadi u travi',
      'Panjevčica ima jarkoplave listiće',
      'Rebrasta patuljica uopće nema stručak'
    ],
    correctIndex: 0,
    explanation: 'Panjevčica ima stručak ispod prstena gusto posut tamnim ljuskicama i ugodan miris, dok smrtonosna Galerina ima svilenkasto-vlaknast stručak bez ljusaka i miris po brašnu.',
    bozacHint: 'Pogledajte nogu ispod prstena: ljuske znače panjevčicu, a glatkoća patuljicu.',
    relatedMushroomId: 'rebrasta-patuljica',
    visualMushroomId: 'rebrasta-patuljica',
    visualFocusLabel: 'GLADAK SVILENKASTI STRUČAK BEZ LJUSKICA'
  },
  {
    id: 'q33',
    rank: 3,
    set: 'B',
    question: 'Zašto je proljetni hrčak (Gyromitra esculenta) izuzetno opasna dvojnica pravog smrčka (Morchella)?',
    options: [
      'Hrčak ima vijugav, moždano naboran klobuk bez pravih šupljina i sadrži smrtonosni giromitrin',
      'Hrčak ima listiće poput muhare',
      'Hrčak raste samo u jesen na truloj pšenici',
      'Hrčak je plave boje i nema stručka'
    ],
    correctIndex: 0,
    explanation: 'Smrčci imaju pravilne udubljene jamice poput saća, dok hrčak ima klobuk nalik na ljudski mozak i sadrži giromitrin koji se u tijelu pretvara u monometilhidrazin.',
    bozacHint: 'Saće pripada smrčku, a moždane vijuge otrovnom hrčku.',
    relatedMushroomId: 'proljetni-hrcak'
  },
  {
    id: 'q34',
    rank: 3,
    set: 'B',
    question: 'Ljekovita i jestiva bukovača (Pleurotus ostreatus) ima otrovnu dvojnicu u toplijim krajevima. Kako se zove?',
    options: [
      'Maslinova zavodnica (Omphalotus olearius)',
      'Zelena krasnica',
      'Hrastov vrganj',
      'Livadni šampinjon'
    ],
    correctIndex: 0,
    explanation: 'Zavodnica raste u mediteranskom i priobalnom pojasu na drvu masline i hrasta; klobuk joj je narančasto-smeđ i izaziva teška trovanja.',
    bozacHint: 'Narančasti buket na staroj maslini nije bukovača nego opasna zavodnica.',
    relatedMushroomId: 'zavodnica'
  },
  {
    id: 'q35',
    rank: 3,
    set: 'B',
    question: 'Borov vrganj (Boletus pinophilus) i crni vrganj (Boletus aereus) razlikuju se po klobuku. Kakav je klobuk crnog vrganja?',
    options: [
      'Tamnosmeđ do brončano-crn, baršunast i često s bakrenim tonovima',
      'Snježnobijel i ljepljiv',
      'Jarkocrven s bijelim točkicama',
      'Svijetložut s bodljama'
    ],
    correctIndex: 0,
    explanation: 'Boletus aereus (crni vrganj) ima prepoznatljiv tamnosmeđi, gotovo crni baršunasti klobuk i izuzetno tvrdo bijelo meso.',
    bozacHint: 'Brončano-crni baršun pod hrastovima kralj je jesenske šume.',
    relatedMushroomId: 'crni-vrganj'
  },
  {
    id: 'q36',
    rank: 3,
    set: 'B',
    question: 'Kako ćete prepoznati brezovog djeda (Leccinum scabrum) među drugim vrganjevkama?',
    options: [
      'Stručak mu je izdužen i gusto posut crnkastim hrapavim ljuskicama (poput kore breze)',
      'Klobuk mu svijetli u mraku',
      'Nema cjevčica nego iglice',
      'Meso mu je slano poput mora'
    ],
    correctIndex: 0,
    explanation: 'Rod Leccinum (djedovi i turčini) karakteriziraju izduženi stručci prekriveni tamnim hrapavim ljuskama nalik na koru breze s kojom žive u mikorizi.',
    bozacHint: 'Visoka noga išarana crnim ljuskicama poput debla breze pod kojom raste.',
    relatedMushroomId: 'brezov-djed'
  },
  {
    id: 'q37',
    rank: 4,
    set: 'A',
    question: 'Zašto je trovanje zelenom pupavkom (Amanita phalloides) jedno od najsmrtonosnijih u svijetu?',
    options: [
      'Zbog dugog perioda latencije (6 do 24 sata) bez simptoma, dok amatoksini već nepovratno razaraju jetru',
      'Zato što otrov ubija unutar 30 sekundi',
      'Zato što otrov djeluje isključivo na zube',
      'Zato što se otrov prenosi dodirom ruke'
    ],
    correctIndex: 0,
    explanation: 'Amatoksini imaju dugu latenciju (6-24 h). Dok se pojave prvi proljevi i grčevi, otrov je već uništio sintezu proteina u stanicama jetre.',
    bozacHint: 'Podmuklost leži u miru: satima se osjećate sjajno dok jetra tiho umire.',
    relatedMushroomId: 'zelena-pupavka'
  },
  {
    id: 'q38',
    rank: 4,
    set: 'A',
    question: 'Crvenjača ili orelaninova koprenka (Cortinarius orellanus) ima izuzetno dugu latenciju. Koliko ona može trajati?',
    options: [
      'Od nekoliko dana pa sve do 2 do 3 tjedna prije pojave zatajenja bubrega',
      'Točno 5 minuta',
      'Maksimalno 1 sat nakon jela',
      'Simptomi traju samo dok traje obrok'
    ],
    correctIndex: 0,
    explanation: 'Toksin orelanin djeluje izuzetno sporo; zatajenje bubrega može nastupiti tek 7 do 21 dan nakon konzumacije, kada berač već zaboravi da je jeo gljive.',
    bozacHint: 'Otrov koji čeka i do tri tjedna prije nego što uništi bubrege.',
    relatedMushroomId: 'crvenjaca'
  },
  {
    id: 'q39',
    rank: 4,
    set: 'A',
    question: "Kako se u mikologiji definira i izvodi 'otisak spora' (spore print)?",
    options: [
      'Klobuk se položi himenijem prema dolje na crno-bijeli papir pod čašom radi utvrđivanja boje praha spora',
      'Gljiva se preša u herbariju pod kamenom mjesec dana',
      'Gljiva se zapali da se vidi boja dima',
      'Spore se kuhaju u alkoholu dok ne puste boju'
    ],
    correctIndex: 0,
    explanation: 'Otisak spora omogućuje određivanje točne boje zrelih spora u masi, što je ključan podatak za determinaciju rodova.',
    bozacHint: 'Klobuk pod staklenom čašom na papiru ostavlja svoj jedinstveni prašnjavi potpis.'
  },
  {
    id: 'q40',
    rank: 4,
    set: 'A',
    question: 'Koji je mehanizam trovanja kod konzumacije jajaste gnojištarke (Coprinopsis atramentaria) uz alkohol?',
    options: [
      'Koprin blokira enzim acetaldehid dehidrogenazu, izazivajući trovanje acetaldehidom',
      'Alkohol pojačava šećer u gljivi',
      'Gljiva pretvara alkohol u kiselinu u želucu',
      'Gljiva trenutno paralizira mišiće nogu'
    ],
    correctIndex: 0,
    explanation: 'Koprinski sindrom nastaje jer koprin blokira razgradnju alkohola na razini acetaldehida, stvarajući neugodne i opasne kardiovaskularne smetnje.',
    bozacHint: 'Gljiva koja s alkoholom sklapa pakt protiv vašeg krvotoka.',
    relatedMushroomId: 'jajasta-gnojistarka'
  },
  {
    id: 'q41',
    rank: 4,
    set: 'A',
    question: 'Koja je ključna razlika između sindroma kratke i sindroma duge latencije?',
    options: [
      'Kratka (<6 h) obično označava blaža gastrointestinalna stanja; duga (>6 h) ukazuje na opasna organska oštećenja jetre i bubrega',
      'Kratka latencija uvijek znači smrt',
      'Duga latencija je bezopasna prehlada',
      'Latencija nema veze s otrovnošću'
    ],
    correctIndex: 0,
    explanation: 'Pravilo mikotoksikologije: brzi simptomi rijetko ubijaju; što simptomi kasnije nastupe, otrov je smrtonosniji.',
    bozacHint: 'Ako vam pozli unutar tri sata – preživjet ćete. Ako prođe cijela noć – hitno u bolnicu i zovite Centar za kontrolu otrovanja (IMI)!'
  },
  {
    id: 'q42',
    rank: 4,
    set: 'A',
    question: 'Kakvu boju praha spora (otisak) ostavljaju gljive iz roda krasnica (Russula) i mliječnica (Lactarius)?',
    options: [
      'Bijelu, krem ili svijetložutu (nikada tamnosmeđu)',
      'Čokoladno crnu',
      'Jarkozelenu',
      'Pepeljasto sivu'
    ],
    correctIndex: 0,
    explanation: 'Porodica Russulaceae ima amiloidne spore čiji je otisak u masi svijetao: bijel, krem ili blijedo oker.',
    bozacHint: 'Krasnice ostavljaju svijetao, blijedi prah – crnu boju kod njih nećete naći.'
  },
  {
    id: 'q43',
    rank: 4,
    set: 'B',
    question: "Što je točno 'sindrom hrčka' i koji ga otrov uzrokuje u proljetnom hrčku (Gyromitra esculenta)?",
    options: [
      'Giromitrinski sindrom koji uzrokuje giromitrin, spoj koji hidrolizira u toksični monometilhidrazin',
      'Trovanje mliječnim kiselinama',
      'Gubitak apetita zbog viška škroba',
      'Paraliza uzrokovana muskarinom'
    ],
    correctIndex: 0,
    explanation: 'Giromitrin se u želucu pretvara u monometilhidrazin koji oštećuje jetru i središnji živčani sustav te je dokazano kancerogen.',
    bozacHint: 'Otrov koji se pretvara u kemijsku komponentu raketnog goriva.',
    relatedMushroomId: 'proljetni-hrcak'
  },
  {
    id: 'q44',
    rank: 4,
    set: 'B',
    question: 'Zašto je u bolnicu kod sumnje na trovanje gljivama nužno ponijeti ostatke hrane ili otpatke od čišćenja?',
    options: [
      'Radi mikroskopske analize spora iz ostataka kako bi se odmah odredio točan protulijek i vrsta otrova',
      'Da osoblje bolnice provjeri recept',
      'Da se hrana ponovno podgrije',
      'Zbog plaćanja računa'
    ],
    correctIndex: 0,
    explanation: 'Identifikacija spora pod mikroskopom iz ostataka gljiva ili želuca jedini je način brze potvrde amatoksina prije propadanja jetre.',
    bozacHint: 'Otpadci iz kante za smeće liječnicima govore točno koji vas otrov napada.'
  },
  {
    id: 'q45',
    rank: 4,
    set: 'B',
    question: 'Koji organ primarno napadaju amatoksini iz zelene pupavke i bijelih proljetnih pupavki?',
    options: [
      'Jetru (hepatocite) blokiranjem sinteze proteina, a sekundarno bubrege',
      'Isključivo kosti nogu',
      'Štitnu žlijezdu',
      'Samo rožnicu oka'
    ],
    correctIndex: 0,
    explanation: 'Amatoksini selektivno ulaze u stanice jetre (hepatocite), vežu se za RNK polimerazu II i prekidaju sintezu bjelančevina, vodeći do nekroze jetre.',
    bozacHint: 'Glavna meta zelene pupavke je kemijska tvornica našeg tijela – jetra.',
    relatedMushroomId: 'zelena-pupavka'
  },
  {
    id: 'q46',
    rank: 4,
    set: 'B',
    question: 'Što karakterizira muskarinski sindrom trovanja (npr. kod otrovnih cjepača Inocybe)?',
    options: [
      'Prekomjerno znojenje, slinjenje, suzenje očiju, usporen puls i suženje zjenica unutar 2 sata',
      'Gubitak pamćenja nakon 5 dana',
      'Isušivanje kože i prestanak znojenja',
      'Naglo debljanje'
    ],
    correctIndex: 0,
    explanation: 'Muskarin stimulira parasimpatički živčani sustav izazivajući jaku sekreciju tekućina (znoj, slina, suze), pad tlaka i miozu.',
    bozacHint: 'Kao da ste upali u vodu: znoj, suze i slina cure u potocima.'
  },
  {
    id: 'q47',
    rank: 4,
    set: 'B',
    question: 'Meso kestenjastog vrganja (Imleria badia / Boletus badius) na pritisak i prerezu poprima plavkasto-zelenu boju. Zašto?',
    options: [
      'Zbog oksidacije variegatne kiseline u dodiru sa zrakom; to je bezopasna prirodna reakcija',
      'Zato što je gljiva radioaktivna',
      'Zato što sadrži bakar',
      'Zato što je zaražena plijesni'
    ],
    correctIndex: 0,
    explanation: 'Plavljenje mesa kod mnogih vrganjevki posljedica je oksidacije derivata pulvinske kiseline (poput variegatne ili kserokomične kiseline) i nije znak otrovnosti.',
    bozacHint: 'Plava boja na pritisak samo je kemijski susret zraka i soka gljive – gljiva je izvrsna!',
    relatedMushroomId: 'kestenjasti-vrganj'
  },
  {
    id: 'q48',
    rank: 4,
    set: 'B',
    question: 'Gljive iz roda Cortinarius (koprenke) ispod klobuka u mladosti imaju specifičan ovoj. Kako se zove?',
    options: [
      'Kortina (paučinasti veo)',
      'Tvrdi oklop',
      'Staklasti film',
      'Vapnenački prsten'
    ],
    correctIndex: 0,
    explanation: 'Kortina je paučinasti parcijalni ovoj koji poput fine niti štiti mlade listiće koprenki i ostavlja hrđastosmeđi trag spora na stručku.',
    bozacHint: 'Paučina između klobuka i stručka daje ime čitavom ovom golemom rodu.'
  },
  {
    id: 'q49',
    rank: 5,
    set: 'A',
    question: 'Koliko prema važećem Pravilniku u RH iznosi maksimalni dopušteni dnevni limit sakupljanja gljiva za osobne potrebe?',
    options: [
      'Do 3 kg plodnih tijela dnevno po beraču',
      'Do 10 kg po osobi',
      'Nema ograničenja',
      'Točno 500 grama'
    ],
    correctIndex: 0,
    explanation: 'Zakon u Republici Hrvatskoj dopušta sakupljanje do najviše 3 kilograma nadzemnih gljiva dnevno po osobi za nekomercijalne potrebe.',
    bozacHint: 'Pravilo tri kilograma: šuma traži mjeru i poštovanje zakona.'
  },
  {
    id: 'q50',
    rank: 5,
    set: 'A',
    question: 'Zelena pupavka (Amanita phalloides) sadrži dvije glavne skupine toksina. Koje su to?',
    options: [
      'Faloidini (brzog djelovanja) i amatoksini (sporog djelovanja, blokiraju RNK polimerazu II)',
      'Muskarin i muscimol',
      'Psilocibin i baeocistin',
      'Cijantoksini i orelanin'
    ],
    correctIndex: 0,
    explanation: 'Faloidini djeluju na stanične membrane ali se slabije apsorbiraju u probavi, dok amatoksini prolaze u krv i blokiraju sintezu RNK i proteina.',
    bozacHint: 'Dva smrtonosna brata: brzi faloidin i spori, ubojiti amatoksin.',
    relatedMushroomId: 'zelena-pupavka'
  },
  {
    id: 'q51',
    rank: 5,
    set: 'A',
    question: 'Zašto se gljive nikada ne smiju sakupljati u nepropusne plastične vrećice?',
    options: [
      'Zbog kondenzacije i nedostatka zraka dolazi do autolize bjelančevina i stvaranja otrovnih ptomaina',
      'Zato što plastika ubija micelij u zemlji',
      'Zato što se vrećica zalijepi za klobuk',
      'Zato što šumari lakše vide plastičnu vrećicu'
    ],
    correctIndex: 0,
    explanation: 'Autoliza bjelančevina u toplim i zagušljivim uvjetima plastike stvara opasne raspadne produkte koji izazivaju teška trovanja čak i jestivim vrstama.',
    bozacHint: 'Gljiva u najlonu se guši i trune: košara je jedini zakon šume.'
  },
  {
    id: 'q52',
    rank: 5,
    set: 'A',
    question: 'Koji je mikološki naziv za simbiotski odnos gljive i korijena drveta u kojem gljiva ne ulazi unutar stanica korijena već stvara plašt oko njega?',
    options: [
      'Ektomikoriza',
      'Endomikoriza',
      'Parazitizam',
      'Komenzalizam'
    ],
    correctIndex: 0,
    explanation: 'Ektomikoriza je tipična za šumsko drveće i krupne gljive (vrganji, muhare); hife obavijaju korijen poput plašta (Hartigova mreža) bez prodiranja u same stanice.',
    bozacHint: "Vanjski plašt oko korijenovih dlačica nosi prefiks 'ekto'."
  },
  {
    id: 'q53',
    rank: 5,
    set: 'A',
    question: 'Koja latinska porodica obuhvaća gljive koje na prerezu ispuštaju obilan mliječni sok?',
    options: [
      'Russulaceae (rod Lactarius i Lactifluus)',
      'Boletaceae',
      'Polyporaceae',
      'Amanitaceae'
    ],
    correctIndex: 0,
    explanation: 'Rodovi Lactarius i Lactifluus iz porodice Russulaceae posjeduju mliječne cijevi (lactifere) iz kojih na oštećenjima curi karakteristično mlijeko.',
    bozacHint: 'Mliječne kapljice na prerezu rodno su obilježje mliječnica (Lactarius).',
    relatedMushroomId: 'smrekova-rujnica'
  },
  {
    id: 'q54',
    rank: 5,
    set: 'A',
    question: "Što je to 'rehidracija' suhih gljiva prije kulinarske pripreme?",
    options: [
      'Postupak namakanja suhih gljiva u mlakoj vodi na 20-30 min kako bi povratile volumen, pri čemu se procijeđena tekućina koristi kao temeljac',
      'Prženje suhih gljiva u vrelom ulju',
      'Mljevenje suhih gljiva u brašno',
      'Kuhanje suhih gljiva u octu'
    ],
    correctIndex: 0,
    explanation: 'Suhe gljive namakanjem vraćaju vlagu, a voda u kojoj su se namakale procijedi se kroz gazu i koristi kao vrhunski temelj za rižota i juhe.',
    bozacHint: 'Vratite gljivi vodu koju je izgubila na suncu i dobit ćete najbogatiji temeljac.'
  },
  {
    id: 'q55',
    rank: 5,
    set: 'B',
    question: 'Koja je uloga mikoriznih gljiva u preživljavanju šuma u sušnim razdobljima?',
    options: [
      'Njihov micelij djeluje poput divovske spužve i prenosi vodu s velikih dubina izravno u korijenski sustav drveća',
      'One stvaraju sjenu na tlu',
      'One hlade deblo vjetrom',
      'One tjeraju divlje svinje od stabala'
    ],
    correctIndex: 0,
    explanation: 'Mikorizna mreža stotinama puta povećava upijajuću površinu korijena i stablima omogućuje pristup vodi i hranjivim tvarima u uvjetima teške suše.',
    bozacHint: 'Bez micelija u tlu šuma bi usahla na prvim ljetnim žegama.'
  },
  {
    id: 'q56',
    rank: 5,
    set: 'B',
    question: 'Koji je otrov pronađen u crvenoj muhari (Amanita muscaria) i panterovoj muhari (Amanita pantherina)?',
    options: [
      'Ibotenska kiselina i muscimol (panterinski sindrom)',
      'Amatoksin i faloidin',
      'Orelanin',
      'Koprin'
    ],
    correctIndex: 0,
    explanation: 'Panterinski sindrom uzrokuju ibotenska kiselina i muscimol, koji djeluju na središnji živčani sustav izazivajući delirij, konfuziju i grčeve.',
    bozacHint: 'Spojevi koji napadaju mozak i izazivaju halucinantno ludilo i san.',
    relatedMushroomId: 'crvena-muhara'
  },
  {
    id: 'q57',
    rank: 5,
    set: 'B',
    question: 'Zašto se gomoljače (tartufi, rod Tuber) razvijaju pod zemljom (hipogeično)?',
    options: [
      'To je evolucijska prilagodba na sušu i hladnoću; spore šire šumske životinje privučene jakim aromama',
      'Zato što se boje svjetla',
      'Zato što ih je čovjek tamo posadio',
      'Zato što nemaju micelij'
    ],
    correctIndex: 0,
    explanation: 'Hipogeične gljive štite plodno tijelo pod zemljom, a zrele razvijaju snažne mirise kako bi ih divlje svinje i glodavci otkopali i izmetom raširili spore.',
    bozacHint: 'Život pod zemljom traži jak miris kako bi životinje pronašle i rasijale plod.'
  },
  {
    id: 'q58',
    rank: 5,
    set: 'B',
    question: 'Koja je zakonska obveza berača gljiva u pogledu očuvanja staništa prema Pravilniku?',
    options: [
      'Plodno tijelo odrezati nožem pri dnu ili pažljivo zakrenuti, a rupu zatrpati zemljom i lišćem kako se micelij ne bi isušio',
      'Razgrnuti grabljama sav sloj lišća u krugu 5 metara',
      'Iskopati sav micelij i ponijeti ga kući',
      'Ostaviti plastičnu oznaku na drvetu'
    ],
    correctIndex: 0,
    explanation: 'Bonton i zakon nalažu da se rupa nastala vađenjem gljive odmah zatrpa zemljom kako vjetar i sunce ne bi uništili izloženi micelij.',
    bozacHint: 'Zatrpajte mjesto ulova lišćem: micelij u tlu mora ostati vlažan za iduću godinu.'
  },
  {
    id: 'q59',
    rank: 5,
    set: 'B',
    question: "Što je to 'reostat/sklerocij' kod nekih vrsta gljiva?",
    options: [
      'Tvrda, zbijena podzemna nakupina micelija bogata hranjivim tvarima koja služi za preživljavanje nepovoljnih uvjeta',
      'Kapa s listićima',
      'Posebna vrsta prstena na stručku',
      'Otrov koji se ne može uništiti kuhanjem'
    ],
    correctIndex: 0,
    explanation: 'Sklerocij je trajni vegetativni organ građen od zbijenih hifa koji gljivi omogućuje da preživi dugotrajne suše, požare ili zime.',
    bozacHint: 'Podzemni bunker hranjivih tvari za najteže zime i suše.'
  },
  {
    id: 'q60',
    rank: 5,
    set: 'B',
    question: 'Koji je velikan hrvatske mikologije utemeljio determinaciju gljiva, napisao Enciklopediju gljiva u dva sveska i osnovao Gljivarsko društvo u Zagrebu?',
    options: [
      'Prof. dr. sc. Romano Božac',
      'Ljudevit Gaj',
      'Andrija Štampar',
      'Ivan Vučetić'
    ],
    correctIndex: 0,
    explanation: 'Prof. dr. sc. Romano Božac (1942.–2020.) bio je vodeći hrvatski mikolog, sveučilišni profesor, autor kapitalnih enciklopedija i utemeljitelj modernog gljivarstva u RH.',
    bozacHint: 'Čovjek čije knjige i fotografije već desetljećima čuvaju glave svih berača naših šuma.'
  }
];
