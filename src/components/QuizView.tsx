import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  ArrowRight,
  Download,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Layers,
  Share2,
  Camera,
  Image as ImageIcon,
  Trash2,
  Eye,
  Shuffle,
} from 'lucide-react';
import { Mushroom } from '../types/mushroom';
import { MushroomImage } from './MushroomImage';
import { fetchMushroomPhoto } from '../services/imageService';
import { idbGet, idbSet } from '../services/storageService';

interface QuizViewProps {
  mushrooms: Mushroom[];
  onSelectMushroom: (mushroom: Mushroom) => void;
}

export type QuizRankLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface RankMetadata {
  level: QuizRankLevel;
  roman: string;
  name: string;
  title: string;
  subtitle: string;
  badgeTier: 'bronze' | 'copper' | 'silver' | 'gold' | 'platinum' | 'diamond';
  badgeLabel: string;
  minPercentage: number;
  primaryColor: string;
  secondaryColor: string;
  borderColor: string;
}

export const QUIZ_RANKS: RankMetadata[] = [
  {
    level: 1,
    roman: 'I',
    name: 'Početnik',
    title: 'Šumski šetač i čuvar staništa',
    subtitle:
      'Bonton šume, pravilni transport gljiva u košari, vađenje cijelog plodišta i sekundarna trovanja',
    badgeTier: 'bronze',
    badgeLabel: 'BRONČANI BEDŽ I. STUPNJA',
    minPercentage: 0,
    primaryColor: '#cd7f32',
    secondaryColor: '#8b5a2b',
    borderColor: '#d97706',
  },
  {
    level: 2,
    roman: 'II',
    name: 'Pripravnik',
    title: 'Poznavatelj osnovne morfologije',
    subtitle:
      'Razlikovanje cjevčica, listića, iglica i letvica te prepoznavanje vjenčića i ovoja (volve) u dnu stručka',
    badgeTier: 'copper',
    badgeLabel: 'BRONČANO-SREBRNI BEDŽ II. STUPNJA',
    minPercentage: 35,
    primaryColor: '#e09f5a',
    secondaryColor: '#9c642d',
    borderColor: '#f59e0b',
  },
  {
    level: 3,
    roman: 'III',
    name: 'Gljivar',
    title: 'Sigurni berač klasičnih vrsta',
    subtitle:
      'Razlučivanje najčešćih jestivih vrsta od dvojnica: biserka vs. panterovka, lisičica vs. zavodnica',
    badgeTier: 'silver',
    badgeLabel: 'SREBRNI BEDŽ III. STUPNJA',
    minPercentage: 52,
    primaryColor: '#cbd5e1',
    secondaryColor: '#64748b',
    borderColor: '#94a3b8',
  },
  {
    level: 4,
    roman: 'IV',
    name: 'Napredni gljivar',
    title: 'Poznavatelj krasnica, mliječnica i vrganjevki',
    subtitle:
      'Mliječni sokovi, okusi, zrnata lomljivost roda Russula (sferociste) i oksidacija mesa na prerezu',
    badgeTier: 'gold',
    badgeLabel: 'ZLATNI BEDŽ IV. STUPNJA',
    minPercentage: 68,
    primaryColor: '#fbbf24',
    secondaryColor: '#b45309',
    borderColor: '#f59e0b',
  },
  {
    level: 5,
    roman: 'V',
    name: 'Znalac',
    title: 'Iskusni terenski poznavatelj dvojnica',
    subtitle:
      'Vitezovke, koprenke, prave panjevčice vs. smrtonosna patuljica (Galerina) te smrčak vs. moždanica',
    badgeTier: 'platinum',
    badgeLabel: 'PLATINASTI BEDŽ V. STUPNJA',
    minPercentage: 82,
    primaryColor: '#34d399',
    secondaryColor: '#059669',
    borderColor: '#10b981',
  },
  {
    level: 6,
    roman: 'VI',
    name: 'Determinator',
    title: 'Certificirani determinator',
    subtitle:
      'Mirisi na anis, karbol i brašno, makrokemijske reakcije (KOH, FeSO4, gvajacol) i orelaninski sindrom',
    badgeTier: 'diamond',
    badgeLabel: 'DIJAMANTNI SMARAGDNI BEDŽ VI. STUPNJA',
    minPercentage: 92,
    primaryColor: '#10b981',
    secondaryColor: '#fbbf24',
    borderColor: '#34d399',
  },
];

interface QuizQuestion {
  id: string;
  rank: QuizRankLevel;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  relatedMushroomId?: string;
  /** If set, renders a visual photo inspection box using MushroomImage before the options */
  visualMushroomId?: string;
  visualFocusLabel?: string;
}

/**
 * 30 stručno balansiranih pitanja (5 po svakom od 6 rangova).
 * Svi ponuđeni odgovori u svakom pitanju ujednačene su duljine i pisani stručnim mikološkim stilom
 * kako bi se spriječilo pogađanje na temelju duljine teksta ("longest answer bias").
 */
const RANKED_QUESTIONS: QuizQuestion[] = [
  // =========================================================================
  // RANG I: POČETNIK (5 pitanja — Bonton šume, transport, vađenje plodišta, ceste)
  // =========================================================================
  {
    id: 'r1-q1',
    rank: 1,
    question:
      'Zašto se ubrane gljive u šumi nikada ne smiju prenositi u zatvorenim plastičnim (najlonskim) vrećicama?',
    options: [
      'Kondenzacija i nedostatak kisika ubrzavaju autolizu proteina te razvoj bakterija koje stvaraju opasne toksine raspadanja',
      'Plastični polimeri u kontaktu s vlažnom kožicom klobuka kemijski vežu aromatične estere i trajno uništavaju probavljivost',
      'U zatvorenoj vrećici spora ne može sazreti pa himenij počinje lučiti gorke seskviterpene koji izazivaju grčeve u želucu',
      'Zbog statičkog elektriciteta najlona dolazi do pucanja staničnih stijenki hifa i trenutne oksidacije jestivih polisaharida',
    ],
    correctIndex: 0,
    explanation:
      'Gljive sadrže lako pokvarljive bjelančevine i visok udio vode. U neprozračnoj plastičnoj vrećici već za 1–2 sata na toplini dolazi do znojenja, bakterijske razgradnje proteina i nastanka ptomaina, što uzrokuje teška sekundarna trovanja čak i jestivim vrganjima.',
    relatedMushroomId: 'jesenski-vrganj',
  },
  {
    id: 'r1-q2',
    rank: 1,
    question:
      'Zašto mikološka pravila strogo zabranjuju branje jestivih gljiva uz prometnice te sakupljanje prestarih i promrzlih plodišta?',
    options: [
      'Micelij intenzivno akumulira teške metale iz tla, dok u prestarim i promrzlim plodištima nastaju toksični produkti razgradnje',
      'Ispušni plinovi potiču sintezu muskarina u listićima, a niske temperature pretvaraju glikogen u neprobavljive celulozne lance',
      'Uz prometnice gljive gube simbiotsku mikorizu s korijenjem drveća pa umjesto hranjivih aminokiselina sintetiziraju oksalnu kiselinu',
      'Ultraljubičasto zračenje uz rubove cesta mijenja strukturu spora i stvara termostabilne spojeve slične giromitrinu u klobuku',
    ],
    correctIndex: 0,
    explanation:
      'Hife micelija djeluju kao spužva za teške metale (olovo, kadmij, živu i arsen) iz kontaminiranog tla. Uz to, statistički najveći broj bolničkih intervencija otpada na sekundarna trovanja prestarim, vodenim ili višestruko promrzlim primjercima inače jestivih vrsta.',
  },
  {
    id: 'r1-q3',
    rank: 1,
    question:
      'Kako se pravilno uzima plodište gljive koju još niste sa stopostotnom sigurnošću determinirali na terenu?',
    options: [
      'Laganim uvrtanjem izvlači se cijelo plodište s bazom stručka kako bi se provjerila prisutnost gomolja ili vrećastog ovoja',
      'Oštrim nožem reže se visoko na gornjoj trećini stručka kako bi podzemna baza ostala netaknuta za kasniju laboratorijsku analizu',
      'Odvaja se isključivo klobuk od stručka jer se svi ključni determinacijski znakovi nalaze na kožici klobuka i rubu listića',
      'Plodište se uzdužno prepolovi dok još stoji u tlu kako bi se očuvala polovina stručka povezana sa šumskim micelijem u humusu',
    ],
    correctIndex: 0,
    explanation:
      'Rezanje stručka iznad zemlje kobna je pogreška kod nepoznatih gljiva jer u mahovini ostaje skriven najvažniji dijagnostički znak smrtonosnih pupavki (Amanita phalloides, A. verna, A. virosa) — vrećasti bijeli ovoj (volva) oko gomoljaste baze.',
    relatedMushroomId: 'zelena-pupavka',
  },
  {
    id: 'r1-q4',
    rank: 1,
    question:
      'Koja od navedenih tvrdnji o tradicionalnim "narodnim testovima" jestivosti gljiva (srebrna žlica, češnjak, puževi) vrijedi u mikologiji?',
    options: [
      'Nijedan narodni test nema znanstvenu vrijednost jer smrtonosni amatoksini ne tamne srebro, a puževi redovito jedu zelenu pupavku',
      'Srebrni pribor pouzdano potamni u prisutnosti sulfhidrilnih skupina faloidina, ali ne reagira na termolabilne toksine vrganjevki',
      'Puževi i šumski glodavci izbjegavaju vrste s amatoksinskim kompleksom pa su nagrizeni klobuci siguran znak odsutnosti pupavki',
      'Kuhanje s lukom i češnjakom izaziva plavoljubičastu promjenu boje isključivo kod vrsta koje sadrže neurotoksični muskarin',
    ],
    correctIndex: 0,
    explanation:
      'Vjerovanje da srebrna žlica ili luk poplave uz otrovnu gljivu ili da su gljive koje jedu puževi neškodljive za čovjeka svake godine dovodi do tragičnih trovanja. Puževi nemaju ljudsku jetru i bez posljedica se hrane zelenom pupavkom.',
    relatedMushroomId: 'zelena-pupavka',
  },
  {
    id: 'r1-q5',
    rank: 1,
    question:
      'Što treba učiniti s rupicom u šumskom tlu nakon što ste ubrali gljivu i zašto se u šumi ne smiju šutati nejestive vrste?',
    options: [
      'Rupicu treba zagrnuti šumskom zemljom i lišćem radi zaštite micelija od isušivanja, a otrovne vrste čuvati jer tvore mikorizu sa stablima',
      'Rupicu treba ostaviti otvorenom kako bi sunčeva svjetlost potaknula stvaranje novih primordija, a stare primjerke zakopati pod korijen',
      'Mjesto branja treba posuti drvenim pepelom ili mahovinom s četinjača kako bi se spriječilo prodiranje parazitskih plijesni u tlo',
      'Nejestive gljive poželjno je ukloniti s micelija jer svojim rastom troše dušik i sprječavaju izbijanje jestivih vrganja i lisičica',
    ],
    correctIndex: 0,
    explanation:
      'Pokrivanje mjesta branja šumskom steljom čuva vlagu osjetljivih hifa micelija. Sve šumske gljive — uključujući muhare i pupavke — ključni su mikorizni partneri drveća koji šumi omogućuju apsorpciju vode i minerala.',
    relatedMushroomId: 'crvena-muhara',
  },

  // =========================================================================
  // RANG II: PRIPRAVNIK (5 pitanja — Himenij, ovoj/volva, vjenčić, mlijeko)
  // =========================================================================
  {
    id: 'r2-q1',
    rank: 2,
    visualMushroomId: 'zelena-pupavka',
    visualFocusLabel: 'MORFOLOGIJA BAZE STRUČKA I PLODNOG SLOJA',
    question:
      'Promotrite fotografiju: koji ključni anatomski detalj u dnu stručka dokazuje da ovo nije šampinjon (Agaricus) nego smrtonosna pupavka?',
    options: [
      'Gomoljasto zadebljano dno stručka obavijeno je slobodnim bijelim vrećastim ovojem (volvom), uz trajno čisto bijele listiće',
      'Stručak je u donjoj polovici šupalj i prekriven crnim čehicama, dok se listići u luku spuštaju duboko niz površinu stručka',
      'Baza stručka je vretenasto ukorijenjena u drvni supstrat i obavijena smeđom paučinastom koprenom (kortinom) sa sporama',
      'Donji dio stručka nosi dvostruki pomični prsten, a meso na prerezu u bazi trenutačno poprima tamnoljubičastu nijansu',
    ],
    correctIndex: 0,
    explanation:
      'Slobodni vrećasti ovoj (volva) u dnu stručka ostatak je univerzalnog ovoja (velum universale) iz kojeg je izraslo plodište. Nijedan šampinjon (Agaricus) nikada nema vrećasti ovoj u bazi stručka niti trajno čisto bijele listiće u zrelosti.',
    relatedMushroomId: 'zelena-pupavka',
  },
  {
    id: 'r2-q2',
    rank: 2,
    question:
      'Kako je građen plodni sloj (himenij) s donje strane klobuka kod pravih vrganja (Boletus), djedova (Leccinum) i maslenki (Suillus)?',
    options: [
      'Sastoji se od vertikalnih cjevčica koje završavaju sitnim rupicama (porama) i kao spužvasti sloj lako se odvajaju od mesa klobuka',
      'Sastoji se od tankih radijalnih listića (lamela) koji su čvrsto srasli s mesom klobuka i ne mogu se odvojiti bez trganja tkiva',
      'Sastoji se od gustih, krhkih bjelkastih ili žućkastih iglica (bodlji) koje vise okomito prema tlu i lome se na najmanji dodir',
      'Sastoji se od račvastih, tupih uzdužnih nabora (letvica) koji postupno prelaze s donje strane klobuka duboko niz stručak',
    ],
    correctIndex: 0,
    explanation:
      'Porodica vrganjevki (Boletaceae) prepoznatljiva je po cjevastom himeniju: s donje strane klobuka nalaze se cjevčice čiji su otvori vidljivi kao sitne rupice (pore), a cijeli spužvasti sloj lako se odvaja od mesa klobuka.',
    relatedMushroomId: 'jesenski-vrganj',
  },
  {
    id: 'r2-q3',
    rank: 2,
    question:
      'Koja od navedenih vrsta ispod klobuka nema ni listiće ni cjevčice, nego krhke iglice (bodlje) koje se na pritisak prstom lako mrve?',
    options: [
      'Prosenjak ili žuti ježek (Hydnum repandum), izvrsna jestiva gljiva čvrstog mesa koja raste u bjelogoričnim i crnogoričnim šumama',
      'Lisičica (Cantharellus cibarius), cijenjena jestiva gljiva koja ispod klobuka razvija debele, žumanjčanožute račvaste letvice',
      'Mrka trubača (Craterellus cornucopioides), aromatična gljiva ljevkasta oblika s gotovo glatkom ili blago naboranom vanjskom stranom',
      'Krašuljica ili grmača (Desarmillaria tabescens), busenasta gljiva koja na panjevima razvija silazne bjelkasto-ružičaste listiće',
    ],
    correctIndex: 0,
    explanation:
      'Prosenjak (Hydnum repandum) i srodni narančasti prosenjak (Hydnum rufescens) imaju igličasti (hidnoidni) himenij. U europskim šumama među gljivama s iglicama koje rastu na tlu i imaju mesnato bijelo/žućkasto plodište nema smrtno otrovnih dvojnica.',
    relatedMushroomId: 'prosenjak',
  },
  {
    id: 'r2-q4',
    rank: 2,
    visualMushroomId: 'velika-suncanica',
    visualFocusLabel: 'STRUKTURA DVOSLOJNOG VJENČIĆA I TIGRASTOG STRUČKA',
    question:
      'Po kojem se svojstvu vjenčića (prstena) i stručka prikazana velika sunčanica (Macrolepiota procera) razlikuje od otrovnih niskih štitarki (Lepiota)?',
    options: [
      'Visoki stručak je tigrasto prošaran smeđim ljuskicama i nosi širok dvostruki vjenčić koji se u zrelosti slobodno pomiče po stručku',
      'Kratki stručak je potpuno gladak i svilenkast, a tanki opnasti vjenčić čvrsto je prirastao uz gornju trećinu i brzo nestaje',
      'Stručak je u dnu obavijen dubokim opnastim ovojem, dok je jednostruki viseći vjenčić s gornje strane izrazito uzdužno narebran',
      'Vjenčić ima oblik smeđe paučinaste koprene koja povezuje rub klobuka sa stručkom i u starosti ostavlja hrđastosmeđu zonu spora',
    ],
    correctIndex: 0,
    explanation:
      'Prava sunčanica (Macrolepiota procera) je visoka gljiva (klobuk >10 cm) s karakterističnim tigrasto-zmijskim crtežom na stručku i debelim dvostrukim prstenom koji klizi niz stručak. Smrtno otrovne male štitarke (npr. Lepiota brunneoincarnata) su sitne (klobuk <6 cm) i nemaju pomični dvostruki prsten.',
    relatedMushroomId: 'velika-suncanica',
  },
  {
    id: 'r2-q5',
    rank: 2,
    question:
      'Koji se gljivarski rod odmah prepoznaje po tome što pri zarezivanju listića ili mesa ispušta kapljice tekućine (mliječnog soka / lateksa)?',
    options: [
      'Rod mliječnica (Lactarius), kod kojeg boja i promjena boje mliječnog soka te njegov okus predstavljaju ključ za determinaciju',
      'Rod krasnica (Russula), kod kojeg zrnato tkivo stručka puca poput krede, ali na prerezu uvijek ispušta vodenasti prozirni sok',
      'Rod vitezovki (Tricholoma), kod kojeg urezani listići pri mehaničkom pritisku izlučuju gustu smolastu tekućinu mirisa na brašno',
      'Rod puževica (Hygrophorus), kod kojeg sluzavi ovoj klobuka pri zarezivanju prelazi u mliječno bijelu emulziju gorkog okusa',
    ],
    correctIndex: 0,
    explanation:
      'Iako i krasnice (Russula) i mliječnice (Lactarius) pripadaju porodici Russulaceae i imaju krhko zrnato meso koje puca poput krede, isključivo mliječnice (Lactarius) posjeduju mliječne cijevi (laticifere) iz kojih na prerezu curi mliječni sok.',
    relatedMushroomId: 'plemenita-rujnica',
  },

  // =========================================================================
  // RANG III: GLJIVAR (5 pitanja — Biserka vs. Panterovka, Lisičica vs. Zavodnica, Pečurke, Blagva)
  // =========================================================================
  {
    id: 'r3-q1',
    rank: 3,
    visualMushroomId: 'biserka',
    visualFocusLabel: 'DETALJ VJENČIĆA (PRSTENA) I PROMJENE BOJE MESA',
    question:
      'Promotrite fotografiju ove vrste iz roda Amanita: koja dva povezana znaka na vjenčiću i prerezu mesa potvrđuju da je riječ o Biserki, a ne o Panterovki?',
    options: [
      'Gornja strana vjenčića je izrazito uzdužno narebrana (isprugana), a meso na prerezu, u bazi stručka i u hodnicima ličinki polako pocrveni',
      'Vjenčić je s obje strane potpuno gladak i kožast, a meso na prerezu ostaje snježnobijelo uz oštro obrubljen gomolj s ovratnikom u bazi',
      'Rub klobuka je duboko češljasto narebran već u mladosti, dok meso u dnu stručka na zraku trenutačno poprima jarku krom-žutu nijansu',
      'Vjenčić se može slobodno pomicati duž tigrasto prošaranog stručka, a meso pri dodiru sa zrakom poplavi pa nakon nekoliko minuta posivi',
    ],
    correctIndex: 0,
    explanation:
      'Za sigurnu determinaciju Biserke (Amanita rubescens) uvijek se provjeravaju oba uvjeta: 1) Vjenčić je s gornje strane vidljivo crtasto narebran (kod Panterovke je gladak!), 2) Meso na oštećenjima i u dnu stručka poprima vinsko-crvenkastu boju (kod Panterovke je meso trajno čisto bijelo!).',
    relatedMushroomId: 'biserka',
  },
  {
    id: 'r3-q2',
    rank: 3,
    visualMushroomId: 'lisicica',
    visualFocusLabel: 'GRAĐA HIMENIJA ISPOD KLOBUKA (LETVICE vs. LISTIĆI)',
    question:
      'Promotrite plodni sloj ispod klobuka na fotografiji: po čemu se prava Lisičica (Cantharellus cibarius) razlikuje od otrovne Zavodnice (Omphalotus olearius)?',
    options: [
      'Lisičica ima debele, tupo račvaste nabore (letvice), bjelkasto meso mirisa na marelice i raste iz tla, dok Zavodnica ima oštre listiće i raste na drvetu',
      'Lisičica ima guste, tanke i oštre listiće koji svijetle u mraku (bioluminiscencija) te raste busenasto na panjevima hrasta, masline i pitomog kestena',
      'Lisičica na prerezu klobuka ispušta mrkvastonarančasti mliječni sok koji na zraku pozeleni, dok Zavodnica ima šupalj stručak ispunjen bijelom srži',
      'Lisičica ima prave listiće prirasle uz stručak sa žutim vjenčićem, dok Zavodnica ispod klobuka ima spužvaste rupice koje na pritisak poplave',
    ],
    correctIndex: 0,
    explanation:
      'Lisičica (Cantharellus cibarius) nema prave listiće nego debele, tupo račvaste žilice (letvice) koje se spuštaju niz stručak, meso joj je iznutra bjelkasto i ugodno miriše na marelice te uvijek raste iz zemlje. Otrovna Zavodnica raste busenasto na drvetu/korijenju i ima guste oštre listiće.',
    relatedMushroomId: 'lisicica',
  },
  {
    id: 'r3-q3',
    rank: 3,
    question:
      'Koja kombinacija morfoloških obilježja sa sigurnošću odvaja jestive pečurke / šampinjone (rod Agaricus) od smrtonosnih bijelih pupavki (Amanita verna, A. virosa)?',
    options: [
      'Listići pečurki u mladosti su bjelkasto-ružičasti pa sazrijevanjem spora postaju čokoladnosmeđi, a dno stručka nikada nema vrećasti ovoj',
      'Listići pečurki ostaju snježnobijeli tijekom cijelog životnog ciklusa, ali se od pupavki razlikuju po odsutnosti vjenčića na stručku',
      'Pečurke imaju gomoljastu bazu obavijenu tankom bijelom volvom, no njihovo meso na prerezu uvijek miriše na svježe mljeveno brašno',
      'Bijele pupavke imaju crnosmeđu otrusinu spora i listiće koji se spuštaju niz stručak, dok pečurke imaju bijelu amiloidnu otrusinu',
    ],
    correctIndex: 0,
    explanation:
      'Kod roda Agaricus otrusina je tamnosmeđa pa listići iz ružičaste prelaze u tamnu čokoladnosmeđu boju, a u dnu stručka nikada nema vrećastog ovoja (volve). Kod bijelih pupavki listići i otrusina su zauvijek čisto bijeli, a baza stručka leži u bijeloj vrećici.',
    relatedMushroomId: 'poljska-pecurka',
  },
  {
    id: 'r3-q4',
    rank: 3,
    question:
      'Kada kiša opere bijele krpice s klobuka Crvene muhare (Amanita muscaria), koji nepogrešivi znak sprječava njezinu zamjenu s vrhunskom Blagvom (Amanita caesarea)?',
    options: [
      'Blagva ima zlatnožute listiće, žut stručak, žut vjenčić i bijeli vrećasti ovoj, dok Crvena muhara ima čisto bijele listiće i bijel stručak',
      'Blagva nema nikakav ovoj u dnu stručka ni vjenčić, dok Crvena muhara ima duboku slobodnu bijelu vrećicu oko baze i žute listiće',
      'Crvena muhara ima narebran žuti vjenčić i meso koje na prerezu pocrveni, dok Blagva ima gladak bijeli vjenčić i bradavičast gomolj',
      'Blagva raste isključivo u planinskim smrekovim šumama iznad 1200 m n.v., dok Crvena muhara raste samo u mediteranskim hrastovim šumama',
    ],
    correctIndex: 0,
    explanation:
      'Zlatno pravilo za Blagvu (Amanita caesarea): „Kraljevska gljiva u zlatu” — listići, stručak i narebrani vjenčić su joj uvijek žumanjčanožute (zlatne) boje, a u dnu ima širok bijeli vrećasti ovoj. Crvena muhara uvijek ima bijele listiće, bijel stručak i gomolj s bradavičastim obručima.',
    relatedMushroomId: 'carska-blagva',
  },
  {
    id: 'r3-q5',
    rank: 3,
    question:
      'Po čemu se nejestiva i gorka Žučara (Tylopilus felleus) već u šumi može prepoznati kako ne bi upropastila cijeli obrok pravih vrganja (Boletus edulis)?',
    options: [
      'Ima izrazitu tamnosmeđu mrežicu na stručku, cjevčice koje u zrelosti postaju prljavoružičaste te meso ekstremno gorkog okusa poput žuči',
      'Ima svijetlu bjelkastu mrežicu u gornjoj trećini stručka, limunskožute pore koje na pritisak poplave i oštar miris na karbol ili tintu',
      'Na stručku umjesto mrežice ima crne stršeće čehice, a bijelo meso na uzdužnom prerezu u roku od minute pocrni poput ugljena',
      'Ima crvene rupice ispod klobuka i svijetlosiv klobuk, dok u dnu stručka na prerezu pokazuje karakterističnu jarkocrvenu zonu',
    ],
    correctIndex: 0,
    explanation:
      'Pravi vrganj (Boletus edulis) ima finu bijelu mrežicu na stručku, a cjevčice mu iz bijele prelaze u žutozelenu/maslinastu boju. Žučara (Tylopilus felleus) ima grubu tamnosmeđu mrežicu, pore joj zbog ružičaste otrusine postaju ružičaste, a već vrh jezika na mesu otkriva neizdrživu gorčinu.',
    relatedMushroomId: 'zucara',
  },

  // =========================================================================
  // RANG IV: NAPREDNI GLJIVAR (5 pitanja — Krasnice, Mliječnice, Vrganjevke, Modrenje)
  // =========================================================================
  {
    id: 'r4-q1',
    rank: 4,
    question:
      'Kako na terenu organoleptičkim i anatomskim pregledom razlikovati jestive vrste iz roda krasnica (Russula) od oštro ljutih i otrovnih krasnica (npr. Russula emetica)?',
    options: [
      'Kod krasnica sa zrnato lomljivim stručkom i bijelo-krem listićima komadić sirovog listića blagog okusa označava jestivost, a papreno ljut nejestivost',
      'Jestive krasnice imaju vlaknast stručak koji se uzdužno lista, dok otrovne krasnice imaju zrnato meso koje pri lomu ispušta gorko bijelo mlijeko',
      'Sve krasnice s crvenim ili ljubičastim klobukom sadrže termostabilne muskarinske toksine, dok su isključivo zelene vrste sigurne za konzumaciju',
      'Otrovne krasnice prepoznaju se po smeđoj otrusini i prstenu na stručku, dok jestive krasnice na prerezu stručka trenutačno poplave',
    ],
    correctIndex: 0,
    explanation:
      'U rodu Russula (prepoznatljivom po zrnatom tkivu od sferocista koje puca poput krede, bez mlijeka, prstena i volve) vrijedi specifično pravilo kušanja malog komadića listića (koji se odmah ispljune): vrste potpuno blagog okusa (npr. golubača, zelena krasnica, modrozelenka) su jestive, a pekuće i ljute nisu.',
    relatedMushroomId: 'zelena-krasnica',
  },
  {
    id: 'r4-q2',
    rank: 4,
    question:
      'Koja od navedenih mliječnica (rod Lactarius) ispušta bijelo mlijeko koje u dodiru sa zrakom za nekoliko sekundi postaje sumpornožuto te je otrovna?',
    options: [
      'Žuta mliječnica ili jamičasta rujnica (Lactarius chrysorrheus), koja raste pod hrastom i ima blago pojasast žućkasto-mesnati klobuk',
      'Krvna rujnica (Lactarius sanguifluus), koja raste pod borovima u Mediteranu i od samog početka na prerezu luči vinsko-crveno mlijeko',
      'Paprena mliječnica (Lactarius piperatus), čije gusto bijelo mlijeko na zraku ostaje bijelo ili kod var. glaucescens polako posivozeleni',
      'Jelova rujnica (Lactarius salmonicolor), koja raste isključivo uz jelu i luči losos-narančasto mlijeko koje ne pozeleni u starosti',
    ],
    correctIndex: 0,
    explanation:
      'Promjena boje mliječnog soka presudan je determinacijski ključ u rodu Lactarius: dok su vrste s izvorno mrkvastonarančastim ili vinsko-crvenim mlijekom (sekcija Dapetes — rujnice) jestive, bijelo mlijeko koje na zraku brzo požuti (npr. Lactarius chrysorrheus, L. scrobiculatus) siguran je znak nejestivih/otrovnih vrsta.',
    relatedMushroomId: 'zuta-mlijecnica',
  },
  {
    id: 'r4-q3',
    rank: 4,
    visualMushroomId: 'ludara',
    visualFocusLabel: 'BOJA KLOBUKA, CRVENE PORE I MREŽICA NA STRUČKU',
    question:
      'Promotrite vrganjevku na fotografiji (svijetli kredasto-sivkasti klobuk, crvene pore, trbušast stručak s mrežicom): kako je razlikovati od uvjetno jestive Zelenjače (Neoboletus luridiformis)?',
    options: [
      'Prikazana Ludara (Rubroboletus satanas) ima svijetli bjelkasto-siv klobuk i mrežicu na stručku, dok Zelenjača ima tamnosmeđ klobuk i sitne crvene točkice bez mrežice',
      'Prikazana Ludara na prerezu uopće ne mijenja boju mesa, dok Zelenjača ima snježnobijele pore i na prerezu pocrveni poput crnog vina',
      'Zelenjača ima grubu crnu mrežicu na bijelom stručku i miris na strvinu, dok Ludara ima žute pore i raste isključivo u brezovim šumama',
      'Ludara ispod klobuka ima sive listiće koji se spuštaju niz stručak, dok Zelenjača ima cjevčice koje ostaju bijele do potpune zrelosti',
    ],
    correctIndex: 0,
    explanation:
      'Ludara (Rubroboletus satanas) je otrovna vrganjevka toplijih vapnenačkih šuma: prepoznaje se po svijetlom (kredasto-sivom) klobuku, crvenim porama, crveno-žutom stručku s mrežicom i neugodnom mirisu u starosti. Zelenjača (Neoboletus luridiformis) ima tamnosmeđi baršunasti klobuk i stručak posut sitnim crvenim zrncima (točkicama) bez mrežice.',
    relatedMushroomId: 'ludara',
  },
  {
    id: 'r4-q4',
    rank: 4,
    visualMushroomId: 'mrezastonogi-vrganj',
    visualFocusLabel: 'PREREZ MESA, NARANČASTOCRVENE PORE I MREŽICA',
    question:
      'Po kojem se znaku na prerezu mesa prikazani Mrežastonogi vrganj (Suillellus luridus) razlikuje od gorkog i nejestivog Lijepog vrganja (Caloboletus calopus)?',
    options: [
      'Suillellus luridus ima narančastocrvene pore i crvenu liniju (Batailleovu crtu) između cjevčica i mesa, dok Caloboletus calopus ima limunskožute pore i gorko meso',
      'Caloboletus calopus ima krvavocrvene pore i ugodan slatkast okus po lješnjacima, dok Suillellus luridus ima bijele pore i ne mijenja boju na prerezu',
      'Suillellus luridus na stručku nikada nema mrežicu nego samo smeđe čehice, dok Caloboletus calopus na prerezu stručka izlučuje bijelo mlijeko',
      'Obje vrste imaju čisto bijele pore i nepromjenjivo bijelo meso, a razlikuju se isključivo po mikroskopskoj reakciji spora u Melzerovom reagensu',
    ],
    correctIndex: 0,
    explanation:
      'Mrežastonogi vrganj (Suillellus luridus) ima narančastocrvene rupice, izduženu mrežicu na stručku i na prerezu brzo modri, a ispod cjevčica često pokazuje crvenkastu tzv. Batailleovu liniju. Lijepi vrganj (Caloboletus calopus) ima crven stručak s mrežicom, ali su mu pore uvijek žute (nikad crvene!), a meso je žučno gorko.',
    relatedMushroomId: 'mrezastonogi-vrganj',
  },
  {
    id: 'r4-q5',
    rank: 4,
    question:
      'Koji je ključni terenski znak za prepoznavanje otrovne Olovaste rudoliske (Entoloma sinuatum) koja u bjelogoričnim šumama često zavara berače?',
    options: [
      'Listići su u mladosti žućkasti poput maslaca pa sazrijevanjem spora postaju losos-ružičasti, uz urezano prirastanje i jak miris na svježe brašno',
      'Listići se duboko spuštaju niz stručak (silazni su) i ostaju čisto bijeli, dok klobuk na dodir ispušta vodenasti sok mirisa na anis',
      'Na stručku nosi širok viseći vjenčić s narebranim rubom, a listići u starosti poprimaju tamnu čokoladnosmeđu boju poput pečurki',
      'Klobuk je prekriven koncentričnim crnim čehicama, a zrnato meso stručka puca poput krede i ima izrazito papreno ljut okus na jeziku',
    ],
    correctIndex: 0,
    explanation:
      'Olovasta rudoliska (Entoloma sinuatum) jedna je od najopasnijih europskih otrovnica: robusnog je rasta s bjelkasto-olovnastosivim klobukom, u mladosti ima žućkaste listiće koji poslije postanu mesnatoružičasti (ružičasta otrusina roda Entoloma!) i intenzivan, varljivo ugodan miris na svježe brašno.',
    relatedMushroomId: 'olovna-rudoliska',
  },

  // =========================================================================
  // RANG V: ZNALAC (5 pitanja — Panjevčice vs. Galerina, Smrčak vs. Moždanica, Vitezovke, Grlašice)
  // =========================================================================
  {
    id: 'r5-q1',
    rank: 5,
    visualMushroomId: 'rebrasta-patuljica',
    visualFocusLabel: 'TEKSTURA STRUČKA ISPOD PRSTENA NA DRVNOM SUPSTRATU',
    question:
      'Promotrite fotografiju: kako prilikom branja na panju sigurno razlučiti smrtno otrovnu Rebrastu / Crnogoričnu patuljicu (Galerina marginata) od jestive Male panjevčice (Kuehneromyces mutabilis)?',
    options: [
      'Galerina marginata ispod prstena ima svilenkasto-vlaknast (srebrnkast) stručak bez čehica i miris na brašno, dok Mala panjevčica ispod prstena ima smeđe čehice (ljuskice)',
      'Galerina marginata ispod prstena ima guste tamnosmeđe stršeće čehice i miris na voće, dok Mala panjevčica ima potpuno gladak bijeli stručak i vrećasti ovoj u dnu',
      'Mala panjevčica ima slobodne bijele listiće i bijelu otrusinu, dok Galerina marginata ispod klobuka ima spužvaste cjevčice koje na pritisak poplave',
      'Galerina marginata raste isključivo pojedinačno na tlu u hrastovim šumama, dok Mala panjevčica raste isključivo na iglicama bora bez dodira s drvetom',
    ],
    correctIndex: 0,
    explanation:
      'Galerina marginata sadrži iste smrtonosne amatoksine kao zelena pupavka i ponekad može rasti na istom panju s malom panjevčicom! Svaki stručak mora se provjeriti: Kuehneromyces mutabilis ispod prstena je hrapavo čehast (ljuskav), dok Galerina marginata ima uzdužno srebrnkasto-vlaknast stručak i brašnast miris.',
    relatedMushroomId: 'rebrasta-patuljica',
  },
  {
    id: 'r5-q2',
    rank: 5,
    visualMushroomId: 'jestivi-smrcak',
    visualFocusLabel: 'GRAĐA KLOBUKA I UZDUŽNI PRESJEK PLODIŠTA',
    question:
      'Promotrite proljetnu gljivu na fotografiji: kako ćete na uzdužnom prerezu nedvojbeno razlikovati Jestivi smrčak (Morchella esculenta) od otrovnog Proljetnog hrčka / Moždanice (Gyromitra esculenta)?',
    options: [
      'Pravi smrčak ima saćaste jamice i na uzdužnom je prerezu potpuno šupalj u jednoj cjelini od vrha do dna, dok moždanica ima mozgovite vijuge i pregrađene komorice',
      'Pravi smrčak je u presjeku ispunjen gustom pamučastom srži s više odvojenih komorica, dok je rana moždanica potpuno šuplja i ima pravilne šesterokutne saće',
      'Pravi smrčak ima slobodan klobuk koji je spojen sa stručkom samo na samom vrhu poput naprstka, dok moždanica ima cjevčice s donje strane klobuka',
      'Obje vrste imaju identičan šuplji uzdužni presjek, ali se smrčak prepoznaje po tome što njegovo meso na zraku u roku od deset sekundi pocrveni',
    ],
    correctIndex: 0,
    explanation:
      'Uzdužni prerez obvezan je korak pri pripremi smrčaka: plodište pravog smrčka (Morchella) potpuno je šuplje od vrha klobuka do baze stručka, dok proljetni hrčak / moždanica (Gyromitra esculenta, koja sadrži hemolitički i hepatotoksični giromitrin) ima nepravilno vijugav klobuk poput mozga s pregrađenim komoricama.',
    relatedMushroomId: 'jestivi-smrcak',
  },
  {
    id: 'r5-q3',
    rank: 5,
    question:
      'Koja mikološka razlika odvaja teško otrovnu Tigrastu vitezovku (Tricholoma pardinum) od jestive Zemljaste vitezovke (Tricholoma terreum) i Crnobijele vitezovke (Tricholoma portentosum)?',
    options: [
      'Tricholoma pardinum ima krupan mesnat klobuk s koncentričnim krupnim ljuskama, debeo stručak i jak miris na brašno, dok je T. terreum sitna, krhka i bez brašnastog mirisa',
      'Tricholoma pardinum ima tanki zvonasti klobuk s radijalnim crnim vlaknima i miris na anis, dok T. terreum ima širok vjenčić na stručku i miris na karbol',
      'Tricholoma portentosum ima narančaste listiće koji se spuštaju niz stručak, dok T. pardinum ispod klobuka ima slobodne ružičaste listiće i volvu u bazi',
      'Sve sive vrste iz roda vitezovki (Tricholoma) sadrže termostabilne nefrotoksine pa se u mikologiji razlikuju isključivo prema vrsti drveća s kojim tvore mikorizu',
    ],
    correctIndex: 0,
    explanation:
      'Tigrasta vitezovka (Tricholoma pardinum) je robusna, debelomesnata gorska gljiva s krupnim crijepasto posloženim čehama na klobuku, urezanim listićima koji znaju suziti kapljice i mirisom na brašno. Zemljasta vitezovka (T. terreum) je sitna, tankomesnata, miševo-siva i nema brašnasti miris.',
    relatedMushroomId: 'tigrasta-vitezovka',
  },
  {
    id: 'r5-q4',
    rank: 5,
    question:
      'Kako na terenu razlikovati jestivu Sivu maglenku (Clitocybe nebularis) ili Brašnastu litičarku (Clitopilus prunulus) od smrtno otrovnih bijelih grlašica (npr. Clitocybe dealbata, C. rivulosa) koje sadrže muskarin?',
    options: [
      'Clitopilus prunulus ima meke silazne listiće koji postaju ružičasti od spora i jak miris na brašno, dok otrovne bijele grlašice imaju trajno bjelkaste listiće i žilavo meso',
      'Otrovne bijele grlašice imaju čokoladnosmeđu otrusinu i slobodne listiće s vjenčićem, dok Clitopilus prunulus ima čisto bijelu otrusinu i drvenast stručak',
      'Clitocybe dealbata naraste do 25 cm širine klobuka u gorskim bukovim šumama, dok je Maglenka sitna livadna vrsta s klobukom užim od 3 centimetra',
      'Sve bijele grlašice na prerezu stručka ispuštaju ljubičasti mliječni sok, dok Brašnasta litičarka ima zrnato meso koje puca poput krede i miriše na češnjak',
    ],
    correctIndex: 0,
    explanation:
      'Brašnasta litičarka (Clitopilus prunulus) često raste u blizini vrganja, ima izrazito mekano lomljivo meso, miris na svježe brašno i listiće koji sazrijevanjem postaju prljavoružičasti. Smrtno opasne bijele grlašice (Clitocybe dealbata/rivulosa) imaju žilavo meso, trajno bjelkaste silazne listiće i ugodan slatkast/kiselkast miris.',
    relatedMushroomId: 'siva-maglenka',
  },
  {
    id: 'r5-q5',
    rank: 5,
    question:
      'Po čemu se otrovna Prava sumporača (Hypholoma fasciculare) na panjevima odmah razlikuje od jestive Sive / Crnogorične panjevčice (Hypholoma capnoides)?',
    options: [
      'Sumporača ima sumpornožuto do zelenkastožuto meso, zelenkaste listiće i izrazito gorak okus, dok Hypholoma capnoides ima bjelkasto meso blagog okusa i dimnosive listiće',
      'Sumporača ima snježnobijelo meso ugodnog okusa po lješnjacima i ljubičaste listiće, dok Hypholoma capnoides ima jarkožuto meso koje na prerezu poplavi',
      'Hypholoma capnoides na stručku ima debeli pomični dvostruki prsten i raste isključivo na panjevima hrasta, dok Sumporača raste pojedinačno iz zemlje',
      'Sumporača ispod klobuka ima sitne žute rupice (pore), dok Hypholoma capnoides ima duboko račvaste letvice koje se spuštaju do same baze stručka',
    ],
    correctIndex: 0,
    explanation:
      'Otrovna Sumporača (Hypholoma fasciculare) ističe se kivi-zelenkastim odsjajem na žutim listićima, sumpornožutim mesom i odbojno gorkim okusom. Jestiva Hypholoma capnoides (raste isključivo na panjevima crnogorice) ima bjelkasto meso blagog okusa i listiće koji iz bjelkaste prelaze u dimnosivo-ljubičastu boju bez traga zelene.',
    relatedMushroomId: 'sumporaca',
  },

  // =========================================================================
  // RANG VI: DETERMINATOR (5 pitanja — Kemijske reakcije KOH/FeSO4, Mirisi, Toksindromi)
  // =========================================================================
  {
    id: 'r6-q1',
    rank: 6,
    visualMushroomId: 'otrovna-pecurka',
    visualFocusLabel: 'KROM-ŽUTA OKSIDACIJA U BAZI STRUČKA I KOH REAKCIJA',
    question:
      'Promotrite pečurku na fotografiji: kako po promjeni boje u bazi stručka, mirisu i reakciji s KOH razlikovati otrovnu Karbolovu pečurku (Agaricus xanthodermus) od jestivih anisovih pečurki (Agaricus silvicola / A. arvensis)?',
    options: [
      'Karbolovka u samom dnu stručka na prerezu trenutačno postaje jarko krom-žuta, miriše na tintu/karbol i daje žutu reakciju s KOH, dok anisove pečurke žute polako izvana i mirišu na anis',
      'Karbolovka na prerezu stručka polako pocrveni i ugodno miriše na gorke bademe, dok anisove pečurke u bazi stručka trenutačno poplave i daju negativnu reakciju s KOH',
      'Obje vrste imaju identičan miris na anis, ali Karbolovka ima trajno bijele listiće i vrećasti ovoj u dnu stručka, dok anisove pečurke imaju čokoladnosmeđe listiće bez ovoja',
      'Karbolovka s otopinom željeznog sulfata (FeSO4) daje trenutačnu smaragdnozelenu reakciju na listićima, dok meso anisovih pečurki pri kuhanju ispušta oštar miris na fenol',
    ],
    correctIndex: 0,
    explanation:
      'Ključna mikološka zamka kod roda Agaricus: više jestivih vrsta (npr. A. arvensis, A. silvicola) blago požuti na dodir klobuka, ali mirišu ugodno na anis ili bademe. Otrovna Karbolova pečurka (A. xanthodermus) kada se zareže samo dno stručka trenutačno bljesne jarko krom-žutom bojom i širi neugodan miris na karbol/tintu.',
    relatedMushroomId: 'otrovna-pecurka',
  },
  {
    id: 'r6-q2',
    rank: 6,
    question:
      'Što karakterizira podmukli orelaninski sindrom kojeg uzrokuju Planinska koprenka (Cortinarius orellanus) i Crvenjača / Šiljata koprenka (Cortinarius rubellus) te kako njihovo meso reagira na KOH?',
    options: [
      'Latencija traje od 2 do čak 14–21 dan bez simptoma prije teškog zatajenja bubrega (nefrotoksičnost), a kap kalijeve lužine (KOH) na mesu i kožici daje crnu reakciju',
      'Latencija iznosi svega 15 do 45 minuta uz jaku salivaciju i suženje zjenica, a otopina kalijeve lužine (KOH) na mesu izaziva jarku limunskožutu reakciju',
      'Simptomi se javljaju isključivo u kombinaciji s konzumacijom alkohola unutar 72 sata, dok željezni sulfat (FeSO4) oboji listiće u grimiznocrvenu boju',
      'Toksin orelanin potpuno se razgrađuje kratkim blanširanjem na 70 °C, a meso na prerezu u dodiru sa zrakom trenutačno poprima modroplavu boju',
    ],
    correctIndex: 0,
    explanation:
      'Orelaninski sindrom podmukao je zbog ekstremno dugog latentnog razdoblja (2 do 21 dan) tijekom kojeg bipiridilni nefrotoksin orelanin tiho razara bubrežne tubule, a termički je potpuno stabilan. Makrokemijski test: kap KOH na klobuku i mesu Cortinarius orellanus trenutačno daje crnoljubičastu do crnu mrlju.',
    relatedMushroomId: 'planinska-koprenka',
  },
  {
    id: 'r6-q3',
    rank: 6,
    question:
      'Kakvu makrokemijsku reakciju daje kristal ili otopina željeznog sulfata (FeSO4) na mesu stručka većine vrsta iz roda krasnica (Russula) te kako se izdvaja skupina Heterophyllae / Virescentinae?',
    options: [
      'Meso stručka većine krasnica s FeSO4 reagira ružičasto-narančasto, dok kod vrsta Russula heterophylla i Golubače (R. virescens) reakcija bude intenzivno losos-narančasta, a kod R. cyanoxantha izostaje ili je sivozelena',
      'Meso svih vrsta iz roda Russula u dodiru s FeSO4 trenutačno pocrni poput tinte, dok samo smrtno otrovne krasnice daju jarku krom-žutu boju na listićima',
      'FeSO4 reagira isključivo sa sporama u mikroskopskom preparatu dajući plavu amiloidnu boju, dok na svježem mesu stručka krasnica nema nikakve vidljive promjene',
      'Krasnice s FeSO4 daju duboku ljubičastu reakciju identičnu reakciji zelene pupavke sa sumpornom kiselinom, čime se potvrđuje prisutnost sferocista u stručku',
    ],
    correctIndex: 0,
    explanation:
      'Željezni sulfat (FeSO4) temeljni je terenski reagens za rod Russula: dok većina krasnica daje blagu ružičasto-hrđastu reakciju, Russula virescens i R. heterophylla reagiraju živo losos-narančasto, a Modrozelenka (Russula cyanoxantha) prepoznaje se po tome što na FeSO4 uopće ne reagira ružičasto (nego negativno ili blijedo sivozeleno).',
    relatedMushroomId: 'golubaca',
  },
  {
    id: 'r6-q4',
    rank: 6,
    question:
      'Koja makrokemijska reakcija s kalijevom lužinom (KOH) na kožici klobuka i mesu pomaže u razlikovanju smrtonosnih bijelih pupavki: Smrdljive pupavke (Amanita virosa) i Proljetne bijele pupavke (Amanita verna)?',
    options: [
      'Kod vrste Amanita virosa kap KOH na klobuku i mesu trenutačno izaziva jarko žutu do narančastožutu boju, dok je kod A. verna reakcija s KOH negativna (ne mijenja boju)',
      'Kod vrste Amanita verna kap KOH trenutačno oboji listiće u tamnoljubičastu boju, dok je kod vrste Amanita virosa reakcija s KOH potpuno negativna',
      'Obje bijele pupavke s KOH daju smaragdnozelenu reakciju na stručku, a razlikuju se isključivo po neamiloidnim sporama u Melzerovom reagensu',
      'Kap KOH otapa vrećasti ovoj (volvu) kod vrste Amanita virosa uz oslobađanje mirisa na bademe, dok kod A. verna izaziva trenutačno modrenje gomolja',
    ],
    correctIndex: 0,
    explanation:
      'U klasičnoj taksonomiji roda Amanita (sekcija Phalloideae), Smrdljiva pupavka (Amanita virosa) s 5–10% otopinom KOH na kožici klobuka i mesu trenutačno daje jarko krom-žutu reakciju (uz čunjast klobuk i čupav stručak), dok Proljetna bijela pupavka (Amanita verna) ima negativnu KOH reakciju.',
    relatedMushroomId: 'smrdljiva-pupavka',
  },
  {
    id: 'r6-q5',
    rank: 6,
    question:
      'Koji mehanizam trovanja izaziva koprinski (antabusni) sindrom kod Jajaste gnojištarke (Coprinopsis atramentaria) i zašto je opasno piti alkohol čak i 2–3 dana nakon obroka?',
    options: [
      'Spoj koprin blokira enzim aldehid-dehidrogenazu u jetri pa se pri unosu alkohola nakuplja toksični acetaldehid uz crvenilo, tahikardiju, pad tlaka i gušenje',
      'Koprin se u želucu izravno spaja s etanolom u muskarinski neurotoksin koji trajno oštećuje mijelinske ovojnice perifernih živaca i bubrežne glomerule',
      'Alkohol ubrzava apsorpciju crne tekućine iz autoliziranih listića gnojištarke u krvotok, što izaziva akutnu hemolizu eritrocita unutar petnaest minuta',
      'Koprinski sindrom javlja se samo ako se gnojištarka konzumira potpuno sirova uz vino, dok kuhanje dulje od deset minuta u potpunosti inaktivira koprin',
    ],
    correctIndex: 0,
    explanation:
      'Jajasta gnojištarka (Coprinopsis atramentaria) sadrži aminokiselinski derivat koprin koji inhibira jetreni enzim acetaldehid-dehidrogenazu. Ako se unutar 24 sata prije ili do 72 sata nakon jela popije alkohol, razgradnja etanola staje na otrovnom acetaldehidu, uzrokujući žestoki disulfiramski (antabusni) šok.',
    relatedMushroomId: 'jajasta-gnojistarka',
  },
];

interface SavedCertificate {
  holderName: string;
  rankLevel: QuizRankLevel;
  score: number;
  total: number;
  percentage: number;
  issuedDate: string;
  serialId: string;
  avatarUrl?: string | null;
}

const CERTIFICATE_STORAGE_KEY = 'gljivobook_v3_certificate';

export function getRankForPercentage(pct: number): RankMetadata {
  const sorted = [...QUIZ_RANKS].sort((a, b) => b.minPercentage - a.minPercentage);
  return sorted.find((r) => pct >= r.minPercentage) || QUIZ_RANKS[0];
}

/**
 * Deterministic or seed-based Fisher-Yates shuffle of question options so every quiz session
 * randomizes option positions (A/B/C/D) while tracking the new index of the correct answer.
 */
function shuffleQuestionOptions(questions: QuizQuestion[]): QuizQuestion[] {
  return questions.map((q) => {
    const indexedOptions = q.options.map((text, idx) => ({
      text,
      isCorrect: idx === q.correctIndex,
    }));

    // Fisher-Yates shuffle
    for (let i = indexedOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = indexedOptions[i];
      indexedOptions[i] = indexedOptions[j];
      indexedOptions[j] = temp;
    }

    const newCorrectIndex = indexedOptions.findIndex((item) => item.isCorrect);
    return {
      ...q,
      options: indexedOptions.map((item) => item.text),
      correctIndex: newCorrectIndex >= 0 ? newCorrectIndex : 0,
    };
  });
}

export const GLJIVOBOOK_QUIZ_PROGRESS = 'gljivobook_quiz_state';

export interface QuizAnswerHistoryEntry {
  questionId: string | number;
  selectedOption: any;
  isCorrect: boolean;
}

export interface PersistedQuizState {
  currentQuestionIndex: number;
  correctAnswersCount: number;
  activeRankIndex: number;
  answersHistory: QuizAnswerHistoryEntry[];
  timestamp: number;
  shuffledQuestions?: QuizQuestion[];
}

const QUIZ_MUSHROOM_ID_ALIASES: Record<string, string> = {
  suncanica: 'velika-suncanica',
  vrganj: 'jesenski-vrganj',
  rujnica: 'plemenita-rujnica',
  blagva: 'carska-blagva',
  'olovasta-rudoliska': 'olovna-rudoliska',
  'crnogoricna-patuljica': 'rebrasta-patuljica',
  smrcak: 'jestivi-smrcak',
  maglenka: 'siva-maglenka',
  'zuckasta-pecurka': 'otrovna-pecurka',
  'narancastocrvena-koprenka': 'planinska-koprenka',
};

function resolveQuizMushroom(mushrooms: Mushroom[], rawId?: string): Mushroom | undefined {
  if (!rawId) return undefined;
  const direct = mushrooms.find((m) => m.id === rawId);
  if (direct) return direct;
  const aliasedId = QUIZ_MUSHROOM_ID_ALIASES[rawId];
  if (aliasedId) {
    return mushrooms.find((m) => m.id === aliasedId);
  }
  return undefined;
}

export const QuizView: React.FC<QuizViewProps> = ({ mushrooms, onSelectMushroom }) => {
  const [selectedRankFilter, setSelectedRankFilter] = useState<'ALL' | QuizRankLevel>('ALL');
  const [shuffleVersion, setShuffleVersion] = useState<number>(1);
  const [restoredQuestions, setRestoredQuestions] = useState<QuizQuestion[] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answersHistory, setAnswersHistory] = useState<QuizAnswerHistoryEntry[]>([]);
  const [resumedBanner, setResumedBanner] = useState<boolean>(false);
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);
  const [finished, setFinished] = useState(false);

  // User name, selfie avatar & certificate state
  const [holderName, setHolderName] = useState('Zrina');
  const [userAvatarUrl, setUserAvatarUrl] = useState<string | null>(null);
  const [loadedAvatarImg, setLoadedAvatarImg] = useState<HTMLImageElement | null>(null);
  const [savedCert, setSavedCert] = useState<SavedCertificate | null>(null);
  const [cardGenerated, setCardGenerated] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Preload all visual photo-question mushrooms in the background when QuizView mounts
  useEffect(() => {
    for (const q of RANKED_QUESTIONS) {
      if (q.visualMushroomId) {
        const m = resolveQuizMushroom(mushrooms, q.visualMushroomId);
        if (m) {
          void fetchMushroomPhoto(m, false);
        }
      }
    }
  }, [mushrooms]);

  // Load previously saved certificate from IndexedDB AND check localStorage for unfinished quiz progress on mount
  useEffect(() => {
    idbGet<SavedCertificate>(CERTIFICATE_STORAGE_KEY).then((cert) => {
      if (cert) {
        setSavedCert(cert);
        if (cert.holderName) setHolderName(cert.holderName);
        if (cert.avatarUrl) setUserAvatarUrl(cert.avatarUrl);
      }
    });

    try {
      const rawProgress = localStorage.getItem(GLJIVOBOOK_QUIZ_PROGRESS);
      if (rawProgress) {
        const parsed = JSON.parse(rawProgress) as PersistedQuizState;
        const hasValidProgress =
          parsed &&
          typeof parsed.currentQuestionIndex === 'number' &&
          typeof parsed.correctAnswersCount === 'number' &&
          Array.isArray(parsed.answersHistory) &&
          (parsed.currentQuestionIndex > 0 || parsed.answersHistory.length > 0);

        if (hasValidProgress) {
          const rankFilterRestored: 'ALL' | QuizRankLevel =
            parsed.activeRankIndex >= 1 && parsed.activeRankIndex <= 6
              ? (parsed.activeRankIndex as QuizRankLevel)
              : 'ALL';

          // Always sync visualMushroomId, visualFocusLabel, and relatedMushroomId with canonical RANKED_QUESTIONS
          const syncedShuffled =
            Array.isArray(parsed.shuffledQuestions) && parsed.shuffledQuestions.length > 0
              ? parsed.shuffledQuestions.map((savedQ) => {
                  const canonical = RANKED_QUESTIONS.find((rq) => rq.id === savedQ.id);
                  if (!canonical) return savedQ;
                  return {
                    ...savedQ,
                    visualMushroomId: canonical.visualMushroomId,
                    visualFocusLabel: canonical.visualFocusLabel,
                    relatedMushroomId: canonical.relatedMushroomId,
                  };
                })
              : null;

          const questionsPool =
            syncedShuffled && syncedShuffled.length > 0
              ? syncedShuffled
              : rankFilterRestored === 'ALL'
              ? RANKED_QUESTIONS
              : RANKED_QUESTIONS.filter((q) => q.rank === rankFilterRestored);

          const safeIdx = Math.min(
            Math.max(0, parsed.currentQuestionIndex),
            Math.max(0, questionsPool.length - 1)
          );

          setSelectedRankFilter(rankFilterRestored);
          if (syncedShuffled && syncedShuffled.length > 0) {
            setRestoredQuestions(syncedShuffled);
          }
          setCurrentIndex(safeIdx);
          setScore(parsed.correctAnswersCount);
          setAnswersHistory(parsed.answersHistory);

          const currentQ = questionsPool[safeIdx];
          const existingAnswerForCurrent = currentQ
            ? parsed.answersHistory.find((a) => a.questionId === currentQ.id)
            : undefined;
          if (
            existingAnswerForCurrent &&
            typeof existingAnswerForCurrent.selectedOption === 'number'
          ) {
            setSelectedOption(existingAnswerForCurrent.selectedOption);
          } else {
            setSelectedOption(null);
          }

          setResumedBanner(true);
        }
      }
    } catch {
      // Ignore invalid localStorage payload
    }
  }, []);

  // Preload userAvatarUrl into an HTMLImageElement for instant synchronous Canvas rendering
  useEffect(() => {
    if (!userAvatarUrl) {
      setLoadedAvatarImg(null);
      return;
    }
    const img = new Image();
    img.onload = () => {
      setLoadedAvatarImg(img);
    };
    img.onerror = () => {
      setLoadedAvatarImg(null);
    };
    img.src = userAvatarUrl;
  }, [userAvatarUrl]);

  // Handle selfie/photo upload with client-side resizing for fast Canvas & IndexedDB storage
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const tempCanvas = document.createElement('canvas');
        const maxDim = 480;
        let w = img.width;
        let h = img.height;
        if (w > maxDim || h > maxDim) {
          if (w > h) {
            h = Math.round((h * maxDim) / w);
            w = maxDim;
          } else {
            w = Math.round((w * maxDim) / h);
            h = maxDim;
          }
        }
        tempCanvas.width = w;
        tempCanvas.height = h;
        tempCanvas.getContext('2d')?.drawImage(img, 0, 0, w, h);
        const compressedDataUrl = tempCanvas.toDataURL('image/jpeg', 0.86);
        setUserAvatarUrl(compressedDataUrl);
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Dynamically filter and shuffle options on every new start/restart (or use restored session questions)
  const activeQuestions = useMemo(() => {
    if (restoredQuestions && restoredQuestions.length > 0) {
      return restoredQuestions;
    }
    const base =
      selectedRankFilter === 'ALL'
        ? RANKED_QUESTIONS
        : RANKED_QUESTIONS.filter((q) => q.rank === selectedRankFilter);
    return shuffleQuestionOptions(base);
    // shuffleVersion triggers a fresh option shuffle on every restart
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRankFilter, shuffleVersion, restoredQuestions]);

  const currentQuestion = activeQuestions[currentIndex] || activeQuestions[0];
  const currentQuestionRank =
    QUIZ_RANKS.find((r) => r.level === currentQuestion?.rank) || QUIZ_RANKS[0];

  const percentage = Math.round((score / Math.max(1, activeQuestions.length)) * 100);
  const achievedRank = getRankForPercentage(percentage);

  const persistProgressToLocalStorage = (
    nextQuestionIndex: number,
    nextCorrectCount: number,
    nextRankFilter: 'ALL' | QuizRankLevel,
    nextHistory: QuizAnswerHistoryEntry[],
    questionsSnapshot: QuizQuestion[]
  ) => {
    try {
      const stateToSave: PersistedQuizState = {
        currentQuestionIndex: nextQuestionIndex,
        correctAnswersCount: nextCorrectCount,
        activeRankIndex: nextRankFilter === 'ALL' ? 0 : nextRankFilter,
        answersHistory: nextHistory,
        timestamp: Date.now(),
        shuffledQuestions: questionsSnapshot,
      };
      localStorage.setItem(GLJIVOBOOK_QUIZ_PROGRESS, JSON.stringify(stateToSave));
    } catch {
      // Ignore storage quota errors
    }
  };

  const clearProgressFromLocalStorage = () => {
    try {
      localStorage.removeItem(GLJIVOBOOK_QUIZ_PROGRESS);
    } catch {
      // Ignore storage errors
    }
  };

  const handleSelectOption = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    const isCorrect = idx === currentQuestion.correctIndex;
    const nextScore = isCorrect ? score + 1 : score;
    if (isCorrect) {
      setScore(nextScore);
    }

    const nextHistory: QuizAnswerHistoryEntry[] = [
      ...answersHistory.filter((a) => a.questionId !== currentQuestion.id),
      {
        questionId: currentQuestion.id,
        selectedOption: idx,
        isCorrect,
      },
    ];
    setAnswersHistory(nextHistory);

    persistProgressToLocalStorage(
      currentIndex,
      nextScore,
      selectedRankFilter,
      nextHistory,
      activeQuestions
    );
  };

  const handleNext = () => {
    if (currentIndex + 1 < activeQuestions.length) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setSelectedOption(null);
      persistProgressToLocalStorage(
        nextIndex,
        score,
        selectedRankFilter,
        answersHistory,
        activeQuestions
      );
    } else {
      clearProgressFromLocalStorage();
      setResumedBanner(false);
      setShowResetConfirm(false);
      setFinished(true);
      setCardGenerated(true);
    }
  };

  const handleRestart = (newFilter: 'ALL' | QuizRankLevel = selectedRankFilter) => {
    clearProgressFromLocalStorage();
    setRestoredQuestions(null);
    setSelectedRankFilter(newFilter);
    setShuffleVersion((v) => v + 1);
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setAnswersHistory([]);
    setResumedBanner(false);
    setShowResetConfirm(false);
    setFinished(false);
  };

  // Draw the 800x500px "Gljivarska iskaznica" on HTML5 Canvas whenever finished, holderName, or loadedAvatarImg changes
  useEffect(() => {
    if (!finished) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const displayPct = percentage;
    const displayScore = score;
    const displayTotal = activeQuestions.length;
    const rank = getRankForPercentage(displayPct);
    const cleanName = (holderName || 'Zrina').trim() || 'Zrina';
    const dateStr = new Date().toLocaleDateString('hr-HR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    const serialId = `GB-V3-${rank.roman}-${String(
      ((cleanName.charCodeAt(0) * 137 + displayPct * 19) % 9000) + 1000
    )}`;

    // Save certificate (including selfie avatar) to IndexedDB when finished
    const certToSave: SavedCertificate = {
      holderName: cleanName,
      rankLevel: rank.level,
      score: displayScore,
      total: displayTotal,
      percentage: displayPct,
      issuedDate: dateStr,
      serialId,
      avatarUrl: userAvatarUrl,
    };
    setSavedCert((prev) => {
      if (
        prev &&
        prev.holderName === certToSave.holderName &&
        prev.rankLevel === certToSave.rankLevel &&
        prev.score === certToSave.score &&
        prev.total === certToSave.total &&
        prev.percentage === certToSave.percentage &&
        prev.avatarUrl === certToSave.avatarUrl
      ) {
        return prev;
      }
      idbSet(CERTIFICATE_STORAGE_KEY, certToSave);
      return certToSave;
    });

    const W = 800;
    const H = 500;
    ctx.clearRect(0, 0, W, H);

    // 1. Deep Forest Gradient Background
    const bgGrad = ctx.createLinearGradient(0, 0, W, H);
    bgGrad.addColorStop(0, '#08100b');
    bgGrad.addColorStop(0.55, '#101e15');
    bgGrad.addColorStop(1, '#09130d');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // Subtle radial glow in top-right and bottom-left
    const glow1 = ctx.createRadialGradient(650, 140, 10, 650, 140, 280);
    glow1.addColorStop(0, `${rank.primaryColor}24`);
    glow1.addColorStop(1, 'transparent');
    ctx.fillStyle = glow1;
    ctx.fillRect(0, 0, W, H);

    const glow2 = ctx.createRadialGradient(130, 320, 10, 130, 320, 240);
    glow2.addColorStop(0, 'rgba(16, 185, 129, 0.12)');
    glow2.addColorStop(1, 'transparent');
    ctx.fillStyle = glow2;
    ctx.fillRect(0, 0, W, H);

    // Subtle topographic grid lines
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.045)';
    ctx.lineWidth = 1;
    for (let x = 40; x < W; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    for (let y = 40; y < H; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }

    // 2. Outer & Inner Frame Borders
    ctx.strokeStyle = '#243b2c';
    ctx.lineWidth = 2;
    ctx.strokeRect(18, 18, W - 36, H - 36);

    ctx.strokeStyle = rank.borderColor;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(26, 26, W - 52, H - 52);

    // Corner accents
    const cornerLen = 18;
    ctx.strokeStyle = rank.primaryColor;
    ctx.lineWidth = 3;
    const corners = [
      [26, 26, 1, 1],
      [W - 26, 26, -1, 1],
      [26, H - 26, 1, -1],
      [W - 26, H - 26, -1, -1],
    ];
    corners.forEach(([cx, cy, dx, dy]) => {
      ctx.beginPath();
      ctx.moveTo(cx, cy + dy * cornerLen);
      ctx.lineTo(cx, cy);
      ctx.lineTo(cx + dx * cornerLen, cy);
      ctx.stroke();
    });

    // 3. Top Header Bar: Gljivobook Logo + Official Card Title + Serial/Date
    ctx.fillStyle = '#13241a';
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(48, 44, 52, 52, 13);
    ctx.fill();
    ctx.stroke();

    // Draw stylized Mushroom Cap + GPS Pin inside emblem box
    ctx.save();
    ctx.translate(50, 46);
    ctx.beginPath();
    ctx.moveTo(8, 22);
    ctx.bezierCurveTo(8, 11, 16, 6, 24, 6);
    ctx.bezierCurveTo(32, 6, 40, 11, 40, 22);
    ctx.closePath();
    ctx.fillStyle = 'rgba(16, 185, 129, 0.32)';
    ctx.fill();
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2.2;
    ctx.stroke();

    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(18, 14, 1.9, 0, Math.PI * 2);
    ctx.arc(29, 13, 1.7, 0, Math.PI * 2);
    ctx.arc(24, 18, 1.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(19, 22);
    ctx.lineTo(19, 30);
    ctx.lineTo(24, 39);
    ctx.lineTo(29, 30);
    ctx.lineTo(29, 22);
    ctx.strokeStyle = '#f2f6f3';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    // Brand Title & Kicker
    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 11px Inter, system-ui, sans-serif';
    ctx.fillText('GLJIVOBOOK PRO v3.2 • SLUŽBENA GLJIVARSKA ISKAZNICA', 114, 64);

    ctx.fillStyle = '#f2f6f3';
    ctx.font = 'bold 25px Georgia, serif';
    ctx.fillText('Gljivobook by Zrina', 114, 91);

    // Serial ID & Date top-right
    ctx.textAlign = 'right';
    ctx.fillStyle = '#889e90';
    ctx.font = '600 12px monospace';
    ctx.fillText(`SERIJSKI BROJ: ${serialId}`, W - 48, 64);
    ctx.fillStyle = '#d6e3da';
    ctx.font = '500 13px monospace';
    ctx.fillText(`DATUM: ${dateStr}`, W - 48, 88);
    ctx.textAlign = 'left';

    // Header Divider line
    ctx.strokeStyle = '#1f3326';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(48, 112);
    ctx.lineTo(W - 48, 112);
    ctx.stroke();

    // =========================================================================
    // 4. LEFT COLUMN: ID PORTRAIT FRAME (120x150px, 3:4 aspect ratio)
    // =========================================================================
    const photoX = 54;
    const photoY = 140;
    const photoW = 120;
    const photoH = 150; // 3:4 ID card portrait ratio (120x150px)

    // Portrait Background & Clipping Area
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(photoX, photoY, photoW, photoH, 12);
    ctx.fillStyle = '#0b150f';
    ctx.fill();
    ctx.clip();

    // Subtle ID biometric grid inside portrait box
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.09)';
    ctx.lineWidth = 1;
    for (let gx = photoX; gx <= photoX + photoW; gx += 15) {
      ctx.beginPath();
      ctx.moveTo(gx, photoY);
      ctx.lineTo(gx, photoY + photoH);
      ctx.stroke();
    }
    for (let gy = photoY; gy <= photoY + photoH; gy += 15) {
      ctx.beginPath();
      ctx.moveTo(photoX, gy);
      ctx.lineTo(photoX + photoW, gy);
      ctx.stroke();
    }

    if (loadedAvatarImg && loadedAvatarImg.width > 0 && loadedAvatarImg.height > 0) {
      // Center-crop ("object-fit: cover") user selfie inside the 120x150px portrait box
      const scale = Math.max(
        photoW / loadedAvatarImg.width,
        photoH / loadedAvatarImg.height
      );
      const drawW = loadedAvatarImg.width * scale;
      const drawH = loadedAvatarImg.height * scale;
      const drawX = photoX + (photoW - drawW) / 2;
      const drawY = photoY + (photoH - drawH) / 2;
      ctx.drawImage(loadedAvatarImg, drawX, drawY, drawW, drawH);

      // Subtle bottom vignette on ID portrait
      const portGrad = ctx.createLinearGradient(
        photoX,
        photoY + photoH - 36,
        photoX,
        photoY + photoH
      );
      portGrad.addColorStop(0, 'transparent');
      portGrad.addColorStop(1, 'rgba(8, 16, 11, 0.75)');
      ctx.fillStyle = portGrad;
      ctx.fillRect(photoX, photoY + photoH - 36, photoW, 36);
    } else {
      // Minimalist Mushroom Forager / Head Silhouette when no selfie is uploaded
      const midX = photoX + photoW / 2;
      ctx.fillStyle = 'rgba(16, 185, 129, 0.18)';
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.55)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(midX, photoY + photoH + 8, 48, Math.PI * 1.15, Math.PI * 1.85);
      ctx.fill();
      ctx.stroke();

      // Head circle
      ctx.beginPath();
      ctx.arc(midX, photoY + 68, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Stylized Mushroom Hunter Hat / Cap above head
      ctx.beginPath();
      ctx.moveTo(midX - 28, photoY + 55);
      ctx.quadraticCurveTo(midX, photoY + 32, midX + 28, photoY + 55);
      ctx.closePath();
      ctx.fillStyle = 'rgba(251, 191, 36, 0.22)';
      ctx.fill();
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 1.8;
      ctx.stroke();

      ctx.textAlign = 'center';
      ctx.fillStyle = '#6e8a78';
      ctx.font = 'bold 9px monospace';
      ctx.fillText('ID PORTRET', midX, photoY + photoH - 12);
      ctx.textAlign = 'left';
    }
    ctx.restore();

    // Emerald ID Portrait Frame Border (#10b981)
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(photoX, photoY, photoW, photoH, 12);
    ctx.stroke();

    // Small ID tag below portrait frame
    ctx.fillStyle = '#13241a';
    ctx.strokeStyle = '#253c2d';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(photoX, photoY + photoH + 10, photoW, 24, 6);
    ctx.fill();
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.fillStyle = '#34d399';
    ctx.font = 'bold 10px monospace';
    ctx.fillText(
      loadedAvatarImg ? 'FOTO VERIFICIRAN' : 'TERENSKI PROFIL',
      photoX + photoW / 2,
      photoY + photoH + 26
    );
    ctx.textAlign = 'left';

    // =========================================================================
    // 5. CENTER COLUMN: HOLDER NAME, ACHIEVED RANK, TITLE & ACCURACY BOXES
    // =========================================================================
    const centerX = 200;

    ctx.fillStyle = '#889e90';
    ctx.font = '600 11px Inter, system-ui, sans-serif';
    ctx.fillText('NOSITELJ ISKAZNICE / GLJIVAR:', centerX, 152);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 34px Georgia, serif';
    ctx.fillText(cleanName.slice(0, 22), centerX, 190);

    // Achieved Rank & Official Title
    ctx.fillStyle = '#889e90';
    ctx.font = '600 11px Inter, system-ui, sans-serif';
    ctx.fillText(`OSTVARENI MIKOLOŠKI RANG (${rank.level} / 6):`, centerX, 232);

    ctx.fillStyle = rank.primaryColor;
    ctx.font = 'bold 26px Georgia, serif';
    ctx.fillText(`RANG ${rank.roman}: ${rank.name.toUpperCase()}`, centerX, 264);

    ctx.fillStyle = '#e2ece5';
    ctx.font = 'italic 17px Georgia, serif';
    ctx.fillText(`„${rank.title}”`, centerX, 291);

    // Lower Metrics Boxes (Accuracy & Badge Tier)
    ctx.fillStyle = '#0c1610';
    ctx.strokeStyle = '#253c2d';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.roundRect(centerX, 316, 168, 76, 12);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#889e90';
    ctx.font = '600 10px Inter, system-ui, sans-serif';
    ctx.fillText('TOČNOST ISPITA', centerX + 14, 338);
    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 24px monospace';
    ctx.fillText(`${displayPct}%`, centerX + 14, 368);
    ctx.fillStyle = '#9bb0a2';
    ctx.font = '600 11px monospace';
    ctx.fillText(`(${displayScore}/${displayTotal} točnih)`, centerX + 82, 368);

    // Box 2: Specialization & Status
    ctx.fillStyle = '#0c1610';
    ctx.strokeStyle = '#253c2d';
    ctx.beginPath();
    ctx.roundRect(centerX + 180, 316, 162, 76, 12);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#889e90';
    ctx.font = '600 10px Inter, system-ui, sans-serif';
    ctx.fillText('STUPANJ DOZVOLE', centerX + 194, 338);
    ctx.fillStyle = rank.primaryColor;
    ctx.font = 'bold 13px Inter, system-ui, sans-serif';
    ctx.fillText(`RANG ${rank.roman} (${rank.level}/6)`, centerX + 194, 360);
    ctx.fillStyle = '#d6e3da';
    ctx.font = '500 11px Inter, system-ui, sans-serif';
    ctx.fillText(rank.name, centerX + 194, 378);

    // =========================================================================
    // 6. RIGHT COLUMN: GRAPHIC RANK MEDALLION / BADGE (Center X = 650, Y = 248)
    // =========================================================================
    const cx = 650;
    const cy = 246;
    const outerR = 82;

    const badgeGrad = ctx.createLinearGradient(
      cx - outerR,
      cy - outerR,
      cx + outerR,
      cy + outerR
    );
    badgeGrad.addColorStop(0, rank.primaryColor);
    badgeGrad.addColorStop(0.5, '#ffffff');
    badgeGrad.addColorStop(1, rank.secondaryColor);

    ctx.beginPath();
    ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
    ctx.fillStyle = '#0c1610';
    ctx.fill();
    ctx.lineWidth = 5.5;
    ctx.strokeStyle = badgeGrad;
    ctx.stroke();

    // Inner dashed ring
    ctx.save();
    ctx.beginPath();
    ctx.setLineDash([6, 4]);
    ctx.arc(cx, cy, outerR - 11, 0, Math.PI * 2);
    ctx.strokeStyle = rank.primaryColor;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();

    // Inner filled circle
    const innerGrad = ctx.createRadialGradient(cx, cy - 18, 10, cx, cy, outerR - 17);
    innerGrad.addColorStop(0, '#182b20');
    innerGrad.addColorStop(1, '#09120d');
    ctx.beginPath();
    ctx.arc(cx, cy, outerR - 17, 0, Math.PI * 2);
    ctx.fillStyle = innerGrad;
    ctx.fill();

    // Medallion Text
    ctx.textAlign = 'center';
    ctx.fillStyle = '#9bb0a2';
    ctx.font = 'bold 10px Inter, system-ui, sans-serif';
    ctx.fillText('GLJIVOBOOK RANG', cx, cy - 32);

    ctx.fillStyle = rank.primaryColor;
    ctx.font = 'bold 40px Georgia, serif';
    ctx.fillText(rank.roman, cx, cy + 12);

    ctx.fillStyle = '#f2f6f3';
    ctx.font = 'bold 11.5px Inter, system-ui, sans-serif';
    ctx.fillText(rank.name.toUpperCase(), cx, cy + 32);

    // Stars indicator for rank level (1 to 6 stars)
    const starsStr = '★'.repeat(rank.level) + '☆'.repeat(6 - rank.level);
    ctx.fillStyle = '#fbbf24';
    ctx.font = '13px sans-serif';
    ctx.fillText(starsStr, cx, cy + 52);

    // Ribbon label under medallion
    ctx.fillStyle = '#13241a';
    ctx.strokeStyle = rank.borderColor;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(cx - 88, cy + 92, 176, 28, 8);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = rank.primaryColor;
    ctx.font = 'bold 10.5px monospace';
    ctx.fillText(`STUPANJ ${rank.level}/6 • VERIFICIRANO`, cx, cy + 110);

    // =========================================================================
    // 7. BOTTOM FOOTER: HUMOROUS FOREST DISCLAIMER (Centered)
    // =========================================================================
    ctx.strokeStyle = '#1f3326';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(48, 424);
    ctx.lineTo(W - 48, 424);
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.fillStyle = '#a8bfb0';
    ctx.font = '500 11.5px Inter, system-ui, sans-serif';
    ctx.fillText(
      '⚠️ Službena terenska iskaznica. Vrijedi isključivo u dubokoj šumi, a priznaje ju samo autor aplikacije (Zrina).',
      W / 2,
      450
    );
    ctx.textAlign = 'left';
  }, [
    finished,
    holderName,
    userAvatarUrl,
    loadedAvatarImg,
    percentage,
    score,
    activeQuestions.length,
  ]);

  const handleDownloadCard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    const cleanSlug =
      (holderName || 'zrina')
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9čćžšđ]+/gi, '-') || 'zrina';
    const link = document.createElement('a');
    link.download = `gljivobook-iskaznica-${cleanSlug}.png`;
    link.href = dataUrl;
    link.click();
  };

  const handleShareCard = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob((b) => resolve(b), 'image/png')
      );
      if (blob && navigator.share) {
        const file = new File([blob], 'gljivobook-iskaznica.png', { type: 'image/png' });
        await navigator.share({
          title: 'Moja Gljivarska Iskaznica — Gljivobook PRO',
          text: `Ostvareni rang u aplikaciji Gljivobook by Zrina: ${achievedRank.name} (${achievedRank.title})!`,
          files: [file],
        });
        return;
      }
    } catch {
      // Fallback to direct download if file share is cancelled or unsupported
    }
    handleDownloadCard();
  };

  const relatedMushroom = resolveQuizMushroom(mushrooms, currentQuestion?.relatedMushroomId);
  const visualMushroom = resolveQuizMushroom(mushrooms, currentQuestion?.visualMushroomId);

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      {/* Top Overview & 6-Rank Progression Selector */}
      <div className="rounded-2xl bg-[#121c16] border border-[#233529] p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-xs font-mono-tabular text-emerald-400 font-semibold flex items-center gap-2">
              <span>GLJIVOBOOK CERTIFIKACIJSKI ISPIT • 30 PITANJA • 6 RANGOVA</span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-950/60 border border-emerald-500/30 text-[10px] text-emerald-300">
                <Shuffle className="w-3 h-3" /> Dinamički redoslijed odgovora
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif-display font-bold text-[#f2f6f3] mt-0.5">
              Rangirani kviz znanja i Gljivarska iskaznica
            </h2>
            <p className="text-xs sm:text-sm text-[#9bb0a2] mt-1">
              Riješite cjeloviti ispit od 30 pitanja kroz svih 6 rangova (5 pitanja po rangu, uz terenska foto-pitanja i mikološke zamke) ili vježbajte pojedini rang.
            </p>
          </div>

          {savedCert && !finished && (
            <button
              type="button"
              onClick={() => {
                if (score === 0 && currentIndex === 0) {
                  setScore(savedCert.score);
                }
                setFinished(true);
                setCardGenerated(true);
              }}
              className="min-h-[42px] px-4 py-2 rounded-xl bg-[#18291f] hover:bg-[#21382a] border border-emerald-500/40 text-xs font-semibold text-emerald-300 inline-flex items-center gap-2 shrink-0 cursor-pointer transition-colors"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>Moja iskaznica ({savedCert.holderName})</span>
            </button>
          )}
        </div>

        {/* 6 Ranks Strip */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => handleRestart('ALL')}
            className={`min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer transition-colors inline-flex items-center gap-1.5 ${
              selectedRankFilter === 'ALL'
                ? 'bg-emerald-600 text-white'
                : 'bg-[#0c140f] text-[#9bb0a2] hover:text-white border border-[#223428]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Svi rangovi ({RANKED_QUESTIONS.length} pitanja)</span>
          </button>

          {QUIZ_RANKS.map((r) => {
            const isActive = selectedRankFilter === r.level;
            const countForRank = RANKED_QUESTIONS.filter((q) => q.rank === r.level).length;
            return (
              <button
                key={r.level}
                type="button"
                onClick={() => handleRestart(r.level)}
                className={`min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                  isActive
                    ? 'bg-amber-500 text-black font-bold'
                    : 'bg-[#0c140f] text-[#9bb0a2] hover:text-white border border-[#223428]'
                }`}
              >
                {r.level}. {r.name} ({countForRank})
              </button>
            );
          })}
        </div>
      </div>

      {/* Discreet Resume Notification Banner if unfinished quiz was restored from localStorage */}
      {resumedBanner && !finished && (
        <div className="rounded-2xl bg-emerald-950/45 border border-emerald-500/45 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs sm:text-sm font-medium text-emerald-200 flex items-center gap-2">
            <span>
              🔄 Nastavljen nedovršeni kviz (Pitanje {currentIndex + 1} od {activeQuestions.length})
            </span>
          </div>
          <button
            type="button"
            onClick={() => handleRestart(selectedRankFilter)}
            className="min-h-[34px] px-3.5 py-1.5 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-400/50 text-xs font-semibold text-white transition-colors cursor-pointer shrink-0"
          >
            Kreni ispočetka
          </button>
        </div>
      )}

      {/* Finished View: Rank Result + HTML5 Canvas Digitalna Gljivarska Iskaznica */}
      {finished ? (
        <div className="rounded-2xl bg-[#121c16] border border-[#25392c] p-5 sm:p-7 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1f3126] pb-5">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 text-xs font-mono-tabular font-bold text-amber-400">
                <Sparkles className="w-4 h-4" />
                <span>{achievedRank.badgeLabel}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif-display font-bold text-[#f2f6f3]">
                Ostvareni rang: {achievedRank.level}. {achievedRank.name}
              </h3>
              <p className="text-sm font-medium text-emerald-300">
                Titula: „{achievedRank.title}” • Točnost: {percentage}% ({score}/{activeQuestions.length})
              </p>
              <p className="text-xs text-[#9bb0a2] max-w-2xl">{achievedRank.subtitle}</p>
            </div>

            <button
              type="button"
              onClick={() => handleRestart(selectedRankFilter)}
              className="min-h-[44px] px-4 py-2.5 rounded-xl bg-[#19281f] hover:bg-[#22362a] border border-[#2c4435] text-xs font-semibold text-[#e2ece5] inline-flex items-center gap-2 self-start cursor-pointer transition-colors shrink-0"
            >
              <RotateCcw className="w-4 h-4 text-emerald-400" />
              Ponovi ispit (novi raspored odgovora)
            </button>
          </div>

          {/* Name Input + Selfie / Photo Upload + Download Controls */}
          <div className="rounded-2xl bg-[#0c140f] border border-[#223529] p-4 sm:p-5 space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
              {/* Name Input */}
              <div className="lg:col-span-5 space-y-1.5">
                <label
                  htmlFor="certificate-holder-name"
                  className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Ime ili nadimak na iskaznici:</span>
                </label>
                <input
                  id="certificate-holder-name"
                  type="text"
                  maxLength={22}
                  value={holderName}
                  onChange={(e) => setHolderName(e.target.value)}
                  placeholder="npr. Zrina"
                  className="w-full min-h-[44px] px-4 py-2 rounded-xl bg-[#121e16] border border-[#2a4233] text-sm font-semibold text-[#f2f6f3] focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Selfie & Gallery Upload Buttons */}
              <div className="lg:col-span-7 flex flex-wrap items-center gap-2">
                <label className="min-h-[44px] px-4 py-2.5 rounded-xl bg-[#18291f] hover:bg-[#223a2c] border border-emerald-500/45 text-xs font-semibold text-emerald-300 inline-flex items-center gap-2 transition-colors cursor-pointer">
                  <Camera className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>📸 Uslikaj selfie za iskaznicu</span>
                  <input
                    type="file"
                    accept="image/*"
                    capture="user"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                </label>

                <label className="min-h-[44px] px-3.5 py-2.5 rounded-xl bg-[#15221a] hover:bg-[#1e3125] border border-[#283f30] text-xs font-medium text-[#d6e3da] inline-flex items-center gap-1.5 transition-colors cursor-pointer">
                  <ImageIcon className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Iz galerije</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                </label>

                {userAvatarUrl && (
                  <button
                    type="button"
                    onClick={() => setUserAvatarUrl(null)}
                    className="min-h-[44px] px-3 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/50 border border-red-800/50 text-xs font-medium text-red-300 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Ukloni selfie sliku i vrati siluetu"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Ukloni sliku</span>
                  </button>
                )}
              </div>
            </div>

            {/* Download & Share Action Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-[#1a2b20]">
              <span className="text-xs text-[#9bb0a2]">
                Slika i ime trenutačno se ažuriraju na vašoj Gljivarskoj iskaznici ispod:
              </span>
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleDownloadCard}
                  className="min-h-[44px] px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs sm:text-sm font-semibold text-white inline-flex items-center gap-2 transition-colors cursor-pointer shadow-lg"
                >
                  <Download className="w-4 h-4" />
                  <span>Preuzmi iskaznicu (.png)</span>
                </button>

                <button
                  type="button"
                  onClick={handleShareCard}
                  className="min-h-[44px] px-4 py-2.5 rounded-xl bg-[#18281e] hover:bg-[#22382a] border border-[#2c4435] text-xs font-semibold text-emerald-300 inline-flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Podijeli</span>
                </button>
              </div>
            </div>

            {/* HTML5 Canvas 800x500 Preview */}
            <div className="w-full overflow-x-auto flex justify-center pt-2">
              <canvas
                ref={canvasRef}
                width={800}
                height={500}
                className="w-full max-w-[800px] h-auto rounded-2xl border border-[#2b4334] shadow-2xl bg-[#09110c]"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#889e90] pt-1">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  Rezolucija iskaznice: 800×500 px (HTML5 Canvas PNG) • Pogodno za spremanje u galeriju telefona
                </span>
              </span>
              {cardGenerated && (
                <span className="font-mono-tabular text-emerald-400">
                  Iskaznica automatski spremljena u vaš profil
                </span>
              )}
            </div>
          </div>

          {/* All 6 Ranks Scale Reference */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#889e90]">
              Ljestvica svih 6 mikoloških rangova u Gljivobooku
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {QUIZ_RANKS.map((r) => {
                const isUnlocked = percentage >= r.minPercentage;
                const isCurrent = achievedRank.level === r.level;
                return (
                  <div
                    key={r.level}
                    className={`p-3.5 rounded-xl border space-y-1 ${
                      isCurrent
                        ? 'bg-emerald-950/40 border-emerald-500/70'
                        : isUnlocked
                        ? 'bg-[#0e1712] border-[#253b2d]'
                        : 'bg-[#0a100c] border-[#18261d] opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono-tabular">
                      <span className="font-bold text-amber-400">
                        RANG {r.roman} • {r.name}
                      </span>
                      <span className="text-[#889e90]">≥{r.minPercentage}%</span>
                    </div>
                    <div className="text-xs font-semibold text-[#f2f6f3]">{r.title}</div>
                    <p className="text-[11px] text-[#889e90] line-clamp-2">{r.subtitle}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* Active Question Card */
        <div className="rounded-2xl bg-[#121c16] border border-[#233529] p-5 sm:p-7 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#889e90] font-mono-tabular">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-1 rounded-lg bg-[#19291f] border border-emerald-500/30 text-emerald-300 font-bold">
                RANG {currentQuestionRank.roman}: {currentQuestionRank.name.toUpperCase()}
              </span>
              {visualMushroom && (
                <span className="px-2.5 py-1 rounded-lg bg-amber-950/50 border border-amber-500/40 text-amber-300 font-bold inline-flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" /> FOTO-PITANJE
                </span>
              )}
              <span>
                Pitanje {currentIndex + 1} / {activeQuestions.length}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span>Točni odgovori: {score}</span>
              <button
                type="button"
                onClick={() => setShowResetConfirm(true)}
                className="px-2.5 py-1 rounded-lg bg-[#16231b] hover:bg-red-950/50 border border-[#253a2d] hover:border-red-700/50 text-[11px] font-sans font-medium text-[#9bb0a2] hover:text-red-200 transition-colors cursor-pointer"
                title="Poništi trenutni napredak i kreni ispočetka"
              >
                🔄 Poništi i kreni ispočetka
              </button>
            </div>
          </div>

          {/* Simple Reset Confirmation Dialog */}
          {showResetConfirm && (
            <div className="p-4 rounded-xl bg-red-950/40 border border-red-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-xs sm:text-sm text-red-100 font-medium">
                Jeste li sigurni da želite poništiti trenutni napredak kviza i krenuti ispočetka?
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowResetConfirm(false)}
                  className="min-h-[36px] px-3.5 py-1.5 rounded-xl bg-[#18241c] hover:bg-[#223328] text-xs font-medium text-[#c5d6cb] cursor-pointer"
                >
                  Odustani
                </button>
                <button
                  type="button"
                  onClick={() => handleRestart(selectedRankFilter)}
                  className="min-h-[36px] px-4 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-xs font-semibold text-white cursor-pointer"
                >
                  Da, poništi i kreni ispočetka
                </button>
              </div>
            </div>
          )}

          <div className="w-full h-1.5 bg-[#1b2a21] rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / Math.max(1, activeQuestions.length)) * 100}%`,
              }}
            />
          </div>

          {/* Visual Photo-Question Card (if question has visualMushroomId) */}
          {visualMushroom && (
            <div className="rounded-2xl overflow-hidden border border-[#2a4233] bg-[#0b130e]">
              <div className="relative h-56 sm:h-64 w-full">
                <MushroomImage
                  key={visualMushroom.id}
                  mushroom={visualMushroom}
                  className="w-full h-full"
                  priority={true}
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-[#09120d]/90 border border-emerald-500/40 text-[11px] font-mono-tabular font-semibold text-emerald-300 flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-amber-400" />
                  <span>
                    VIZUALNA ANALIZA: {currentQuestion.visualFocusLabel || 'MORFOLOŠKI DETALJ'}
                  </span>
                </div>
                {selectedOption !== null && (
                  <div className="absolute bottom-3 left-3 right-3 px-3.5 py-2 rounded-xl bg-[#09120d]/92 border border-[#2b4434] flex items-center justify-between gap-2">
                    <div>
                      <div className="text-xs font-bold text-[#f2f6f3]">
                        {visualMushroom.name}
                      </div>
                      <div className="text-[11px] italic text-emerald-300">
                        {visualMushroom.latin}
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-[#15241b] text-[#d6e3da]">
                      {visualMushroom.statusLabel}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="space-y-1">
            <div className="text-[11px] text-[#889e90]">{currentQuestionRank.subtitle}</div>
            <h3 className="text-lg sm:text-xl font-serif-display font-bold text-[#f2f6f3] leading-snug">
              {currentQuestion.question}
            </h3>
          </div>

          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQuestion.correctIndex;
              const optionLetter = String.fromCharCode(65 + idx);
              let btnStyle =
                'bg-[#0c130f] border-[#223428] text-[#d6e3da] hover:border-[#385441]';

              if (selectedOption !== null) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-100';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'bg-red-950/60 border-red-500 text-red-100';
                } else {
                  btnStyle = 'bg-[#0c130f] border-[#1c2b21] text-[#6e8476] opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={selectedOption !== null}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full min-h-[54px] p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-colors flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-[#16241b] border border-[#2a4032] text-emerald-400 font-mono-tabular text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {optionLetter}
                    </span>
                    <span className="leading-relaxed">{option}</span>
                  </div>
                  {selectedOption !== null && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                  {selectedOption !== null && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {selectedOption !== null && (
            <div className="p-4 rounded-xl bg-[#0d1610] border border-[#284030] space-y-3">
              <div className="text-xs font-semibold text-emerald-400">
                Mikološko objašnjenje i ključna razlika:
              </div>
              <p className="text-xs sm:text-sm text-[#d6e3da] leading-relaxed">
                {currentQuestion.explanation}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                {relatedMushroom ? (
                  <button
                    type="button"
                    onClick={() => onSelectMushroom(relatedMushroom)}
                    className="min-h-[40px] px-3.5 py-1.5 rounded-xl bg-[#19281f] hover:bg-[#23382b] text-xs font-medium text-emerald-300 transition-colors cursor-pointer"
                  >
                    Otvori karticu vrste: {relatedMushroom.name}
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="button"
                  onClick={handleNext}
                  className="min-h-[42px] px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white inline-flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <span>
                    {currentIndex + 1 < activeQuestions.length
                      ? 'Sljedeće pitanje'
                      : 'Završi ispit i kreiraj iskaznicu'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
