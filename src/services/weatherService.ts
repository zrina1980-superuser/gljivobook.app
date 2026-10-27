import { RegionId } from '../types/mushroom';

export type ForecastStatus = 'Slabo' | 'Umjereno' | 'Optimalno' | 'Vrhunac';
export type ForecastTrend = 'rast' | 'pad' | 'stabilno';

export interface DailyMushroomForecast {
  date: string;
  dayLabel: string;
  index: number;
  status: ForecastStatus;
  rainMm: number;
  tempMin: number;
  tempMax: number;
}

export interface MushroomForecastResult {
  latitude: number;
  longitude: number;
  locationName: string;
  updatedAt: string;
  sunsetTime: string; // npr. "18:08"
  suitabilityIndex: number; // 0 - 100%
  status: ForecastStatus;
  metrics: {
    rainPast10DaysMm: number;
    soilTempC: number;
    soilMoisturePct: number; // 0 - 100% relative wetness derived from m³/m³
    soilMoistureRaw: number; // m³/m³
    tempShockC: number;
    currentMaxTempC: number;
    currentMinTempC: number;
  };
  interpretation: string;
  recommendation: string;
  trend: ForecastTrend;
  trendDelta: number;
  next5Days: DailyMushroomForecast[];
}

export const REGION_COORDINATES: Record<
  RegionId | 'ALL',
  { lat: number; lon: number; name: string }
> = {
  ALL: { lat: 45.885, lon: 15.955, name: 'Medvednica / Sljeme (Središnja RH)' },
  medvednica_zagorje: { lat: 45.898, lon: 15.948, name: 'Medvednica & Hrvatsko zagorje' },
  gorski_kotar: { lat: 45.398, lon: 14.798, name: 'Gorski kotar & Lika (Delnice)' },
  istra_kvarner: { lat: 45.336, lon: 13.828, name: 'Istra & Kvarner (Motovunska šuma)' },
  slavonija: { lat: 45.476, lon: 17.678, name: 'Slavonija & Papuk' },
  dalmacija: { lat: 43.703, lon: 16.639, name: 'Dalmatinska zagora & Mosor' },
  karlovac: { lat: 45.432, lon: 15.612, name: 'Pokuplje, Kordun & Petrova gora' },
};

const FORECAST_CACHE_KEY = 'gljivobook_weather_forecast_cache_v1';

const CROATIAN_DAYS = ['Ned', 'Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub'];

/**
 * Pure astronomical calculation of local sunset time (HH:MM) for a given latitude, longitude and date.
 * Works 100% offline in the forest without network access.
 */
export function calculateAstronomicalSunset(
  lat = 45.885,
  lon = 15.955,
  date: Date = new Date()
): string {
  const startOfYear = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

  const rad = Math.PI / 180;
  // Fractional year in radians
  const gamma = ((2 * Math.PI) / 365) * (dayOfYear - 1 + 0.5);

  // Equation of time (in minutes)
  const eqTime =
    229.18 *
    (0.000075 +
      0.001868 * Math.cos(gamma) -
      0.032077 * Math.sin(gamma) -
      0.014615 * Math.cos(2 * gamma) -
      0.040849 * Math.sin(2 * gamma));

  // Solar declination angle (in radians)
  const decl =
    0.006918 -
    0.399912 * Math.cos(gamma) +
    0.070257 * Math.sin(gamma) -
    0.006758 * Math.cos(2 * gamma) +
    0.000907 * Math.sin(2 * gamma) -
    0.002697 * Math.cos(3 * gamma) +
    0.00148 * Math.sin(3 * gamma);

  const zenith = 90.833 * rad;
  const latRad = lat * rad;
  const cosHa =
    Math.cos(zenith) / (Math.cos(latRad) * Math.cos(decl)) -
    Math.tan(latRad) * Math.tan(decl);

  const clampedCosHa = Math.max(-1, Math.min(1, cosHa));
  const haDeg = Math.acos(clampedCosHa) / rad;

  // Sunset in UTC minutes from midnight
  const sunsetUtcMinutes = 720 - 4 * (lon - haDeg) - eqTime;

  // Determine local timezone offset in minutes for the given date
  const tzOffsetMinutes = -date.getTimezoneOffset();
  const localSunsetMinutes = Math.round(sunsetUtcMinutes + tzOffsetMinutes);

  const hours = Math.floor(((localSunsetMinutes % 1440) + 1440) % 1440 / 60);
  const minutes = ((localSunsetMinutes % 60) + 60) % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

export function getSeasonalForestHazard(date: Date = new Date()): string {
  const month = date.getMonth(); // 0 - 11
  if (month === 2 || month === 3 || month === 4) {
    return '🕷️ Sezona krpelja (pregledajte se nakon terena)';
  }
  if (month === 5 || month === 6 || month === 7) {
    return '🐍 Oprez na poskoke • 🔥 Zabrana loženja vatre';
  }
  if (month === 8 || month === 9 || month === 10 || month === 11) {
    return '🦺 Lovna sezona (nosite jarke boje, oprez u sumrak)';
  }
  return '❄️ Oprez na zaleđene staze i rani mrak';
}

export function getStatusFromIndex(index: number): ForecastStatus {
  if (index >= 82) return 'Vrhunac';
  if (index >= 62) return 'Optimalno';
  if (index >= 38) return 'Umjereno';
  return 'Slabo';
}

function calculateSingleDayIndex(
  rolling10DayRainMm: number,
  soilTempC: number,
  soilMoistureM3: number,
  tempShockC: number
): number {
  // 1. Accumulated rain in past 10 days (ideal > 35 mm, max 45 pts)
  let rainScore = 0;
  if (rolling10DayRainMm >= 35 && rolling10DayRainMm <= 120) {
    rainScore = 45;
  } else if (rolling10DayRainMm > 120) {
    rainScore = Math.max(30, 45 - (rolling10DayRainMm - 120) * 0.15);
  } else {
    rainScore = Math.min(45, (rolling10DayRainMm / 35) * 45);
  }

  // 2. Soil moisture & soil temperature (max 35 pts: 18 pts moisture + 17 pts temp)
  const normalizedMoisture = Math.max(0, Math.min(1, (soilMoistureM3 - 0.06) / 0.30));
  const moistureScore = normalizedMoisture * 18;

  let tempScore = 0;
  if (soilTempC >= 11 && soilTempC <= 20) {
    tempScore = 17;
  } else if (soilTempC >= 6 && soilTempC < 11) {
    tempScore = 7 + ((soilTempC - 6) / 5) * 10;
  } else if (soilTempC > 20 && soilTempC <= 26) {
    tempScore = 17 - ((soilTempC - 20) / 6) * 11;
  } else if (soilTempC >= 2 && soilTempC < 6) {
    tempScore = ((soilTempC - 2) / 4) * 7;
  } else {
    tempScore = 2;
  }

  // 3. Temperature shock after rain (difference in max temp before vs after rain + diurnal swing, max 20 pts)
  let shockScore = 0;
  if (tempShockC >= 4 && tempShockC <= 12) {
    shockScore = 20;
  } else if (tempShockC > 12) {
    shockScore = 17;
  } else if (tempShockC > 0) {
    shockScore = (tempShockC / 4) * 20;
  } else {
    shockScore = 5;
  }

  // If soil is frozen (< 1.5°C) or bone dry (< 4 mm rain in 10 days), cap the index realistically
  let rawTotal = Math.round(rainScore + moistureScore + tempScore + shockScore);
  if (soilTempC < 1.5) {
    rawTotal = Math.min(rawTotal, 22);
  } else if (rolling10DayRainMm < 3 && soilMoistureM3 < 0.14) {
    rawTotal = Math.min(rawTotal, 28);
  }

  return Math.max(5, Math.min(100, rawTotal));
}

export async function fetchMushroomForecast(
  lat: number,
  lon: number,
  locationName = 'Vaša lokacija'
): Promise<MushroomForecastResult> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat.toFixed(
    4
  )}&longitude=${lon.toFixed(
    4
  )}&daily=precipitation_sum,temperature_2m_max,temperature_2m_min,sunset&past_days=10&forecast_days=5&hourly=soil_temperature_0cm,soil_moisture_0_to_1cm&timezone=auto`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Open-Meteo HTTP ${response.status}`);
    }
    const data = await response.json();

    const dailyTimes: string[] = data?.daily?.time || [];
    const dailyRain: number[] = data?.daily?.precipitation_sum || [];
    const dailyMax: number[] = data?.daily?.temperature_2m_max || [];
    const dailyMin: number[] = data?.daily?.temperature_2m_min || [];
    const dailySunset: string[] = data?.daily?.sunset || [];

    const hourlyTimes: string[] = data?.hourly?.time || [];
    const hourlySoilTemp: number[] = data?.hourly?.soil_temperature_0cm || [];
    const hourlySoilMoist: number[] = data?.hourly?.soil_moisture_0_to_1cm || [];

    // Past 10 days are indices 0..9, index 10 is today, indices 10..14 are the 5 forecast days
    const todayIndex = Math.min(10, Math.max(0, dailyTimes.length - 5));

    // Extract sunset time from Open-Meteo ISO string (e.g. "2026-10-17T18:07") or fallback to astronomical calculation
    const rawSunsetIso = dailySunset[todayIndex];
    const sunsetTime =
      rawSunsetIso && rawSunsetIso.includes('T')
        ? rawSunsetIso.split('T')[1].slice(0, 5)
        : calculateAstronomicalSunset(lat, lon);

    // Sum precipitation over past 10 days (indices 0..todayIndex)
    const past10RainSlice = dailyRain.slice(0, todayIndex + 1);
    const rainPast10DaysMm =
      Math.round(
        past10RainSlice.reduce((acc, v) => acc + (typeof v === 'number' ? v : 0), 0) * 10
      ) / 10;

    // Helper to get average hourly soil temp & moisture for a given date string YYYY-MM-DD
    const getSoilStatsForDate = (dateStr: string) => {
      const temps: number[] = [];
      const moists: number[] = [];
      for (let i = 0; i < hourlyTimes.length; i++) {
        if (hourlyTimes[i]?.startsWith(dateStr)) {
          if (typeof hourlySoilTemp[i] === 'number') temps.push(hourlySoilTemp[i]);
          if (typeof hourlySoilMoist[i] === 'number') moists.push(hourlySoilMoist[i]);
        }
      }
      const avgTemp =
        temps.length > 0
          ? temps.reduce((a, b) => a + b, 0) / temps.length
          : (dailyMax[todayIndex] + dailyMin[todayIndex]) / 2 || 14;
      const avgMoist =
        moists.length > 0 ? moists.reduce((a, b) => a + b, 0) / moists.length : 0.24;

      return {
        soilTempC: Math.round(avgTemp * 10) / 10,
        soilMoistureRaw: Math.round(avgMoist * 1000) / 1000,
      };
    };

    const todayDateStr = dailyTimes[todayIndex] || new Date().toISOString().slice(0, 10);
    const todaySoil = getSoilStatsForDate(todayDateStr);

    // Calculate temperature shock in past 10 days (difference between highest pre-rain max temp and post-rain cooler max temp)
    const pastMaxTemps = dailyMax.slice(0, todayIndex + 1).filter((v) => typeof v === 'number');
    const peakMaxTemp = pastMaxTemps.length > 0 ? Math.max(...pastMaxTemps) : 20;
    const recentCoolestMax =
      pastMaxTemps.length >= 4 ? Math.min(...pastMaxTemps.slice(-5)) : peakMaxTemp - 3;
    const tempShockC = Math.round(Math.max(0, peakMaxTemp - recentCoolestMax) * 10) / 10;

    const suitabilityIndex = calculateSingleDayIndex(
      rainPast10DaysMm,
      todaySoil.soilTempC,
      todaySoil.soilMoistureRaw,
      tempShockC
    );
    const status = getStatusFromIndex(suitabilityIndex);

    // Convert volumetric soil moisture (0.05 - 0.42 m³/m³) to intuitive 0-100% forest substrate wetness
    const soilMoisturePct = Math.round(
      Math.max(8, Math.min(99, (todaySoil.soilMoistureRaw / 0.38) * 100))
    );

    // Build 5-day forecast (indices todayIndex .. todayIndex + 4)
    const next5Days: DailyMushroomForecast[] = [];
    for (let d = todayIndex; d < Math.min(dailyTimes.length, todayIndex + 5); d++) {
      const dateStr = dailyTimes[d];
      const startWindow = Math.max(0, d - 9);
      const rollingRain = dailyRain
        .slice(startWindow, d + 1)
        .reduce((acc, val) => acc + (typeof val === 'number' ? val : 0), 0);

      const daySoil = getSoilStatsForDate(dateStr);
      const windowMaxes = dailyMax.slice(startWindow, d + 1).filter((v) => typeof v === 'number');
      const winPeak = windowMaxes.length > 0 ? Math.max(...windowMaxes) : 18;
      const winCool = windowMaxes.length >= 3 ? Math.min(...windowMaxes.slice(-4)) : winPeak - 3;
      const dayShock = Math.max(0, winPeak - winCool);

      const dayIdx = calculateSingleDayIndex(
        rollingRain,
        daySoil.soilTempC,
        daySoil.soilMoistureRaw,
        dayShock
      );

      const parsedDate = new Date(`${dateStr}T12:00:00`);
      const dayName =
        d === todayIndex
          ? 'Danas'
          : d === todayIndex + 1
          ? 'Sutra'
          : CROATIAN_DAYS[parsedDate.getDay()] || dateStr.slice(5);

      next5Days.push({
        date: dateStr,
        dayLabel: dayName,
        index: dayIdx,
        status: getStatusFromIndex(dayIdx),
        rainMm: Math.round((dailyRain[d] || 0) * 10) / 10,
        tempMin: Math.round(dailyMin[d] ?? 8),
        tempMax: Math.round(dailyMax[d] ?? 18),
      });
    }

    const firstDayIdx = next5Days[0]?.index ?? suitabilityIndex;
    const lastDayIdx = next5Days[next5Days.length - 1]?.index ?? suitabilityIndex;
    const trendDelta = lastDayIdx - firstDayIdx;
    const trend: ForecastTrend =
      trendDelta >= 5 ? 'rast' : trendDelta <= -5 ? 'pad' : 'stabilno';

    // Generate concise Croatian interpretation & recommendation
    let interpretation = '';
    let recommendation = '';

    if (suitabilityIndex >= 82) {
      interpretation = `Vrhunski uvjeti: u proteklih 10 dana palo je ${rainPast10DaysMm} mm kiše uz vlažnost tla ${soilMoisturePct}% i temperaturu supstrata od ${todaySoil.soilTempC}°C (temperaturni impuls Δ${tempShockC}°C).`;
      recommendation =
        'Idealno vrijeme za izlazak u šumu! Očekuje se snažan val vrganja, rujnica, sunčanica i lisičica.';
    } else if (suitabilityIndex >= 62) {
      interpretation = `Vrlo dobri uvjeti: akumulirano ${rainPast10DaysMm} mm oborina uz temperaturu tla ${todaySoil.soilTempC}°C i vlažnost supstrata ${soilMoisturePct}%.`;
      recommendation =
        'Preporučuje se obilazak vlažnijih sjevernih padina, udolina uz potoke i mahovinastih rubova šume.';
    } else if (suitabilityIndex >= 38) {
      interpretation =
        rainPast10DaysMm < 20
          ? `Umjereni uvjeti: u zadnjih 10 dana palo je svega ${rainPast10DaysMm} mm kiše (vlažnost tla ${soilMoisturePct}%, temp. tla ${todaySoil.soilTempC}°C).`
          : `Umjereni uvjeti: dovoljno vlage (${rainPast10DaysMm} mm), ali temperatura tla (${todaySoil.soilTempC}°C) usporava naglo izbijanje micelija.`;
      recommendation =
        'Tražite gljive koje rastu na drvetu i panjevima (bukovače, vrbovače, puze) ili u dubokoj sjeni uz vodotoke.';
    } else {
      interpretation =
        todaySoil.soilTempC < 5
          ? `Hladno tlo (${todaySoil.soilTempC}°C) uz ${rainPast10DaysMm} mm oborina ograničava rast većine nadzemnih vrsta.`
          : `Sušno razdoblje: samo ${rainPast10DaysMm} mm kiše u proteklih 10 dana uz nisku vlažnost površinskog sloja tla (${soilMoisturePct}%).`;
      recommendation =
        todaySoil.soilTempC < 5
          ? 'Fokusirajte se na zimske vrste otporne na mraz (bukovača, baršunasta panjevčica, judino uho).'
          : 'Pričekajte prvu obilniju kišu (>25 mm) i pad temperature prije većeg gljivarskog pohoda.';
    }

    const result: MushroomForecastResult = {
      latitude: lat,
      longitude: lon,
      locationName,
      updatedAt: new Date().toLocaleTimeString('hr-HR', { hour: '2-digit', minute: '2-digit' }),
      sunsetTime,
      suitabilityIndex,
      status,
      metrics: {
        rainPast10DaysMm,
        soilTempC: todaySoil.soilTempC,
        soilMoisturePct,
        soilMoistureRaw: todaySoil.soilMoistureRaw,
        tempShockC,
        currentMaxTempC: Math.round(dailyMax[todayIndex] ?? 18),
        currentMinTempC: Math.round(dailyMin[todayIndex] ?? 8),
      },
      interpretation,
      recommendation,
      trend,
      trendDelta,
      next5Days,
    };

    try {
      localStorage.setItem(
        `${FORECAST_CACHE_KEY}_${lat.toFixed(2)}_${lon.toFixed(2)}`,
        JSON.stringify(result)
      );
    } catch {
      // Ignore storage quota errors
    }

    return result;
  } catch (err) {
    // Offline fallback from cached forecast if available
    try {
      const cached = localStorage.getItem(
        `${FORECAST_CACHE_KEY}_${lat.toFixed(2)}_${lon.toFixed(2)}`
      );
      if (cached) {
        const parsed = JSON.parse(cached) as MushroomForecastResult;
        if (!parsed.sunsetTime) {
          parsed.sunsetTime = calculateAstronomicalSunset(lat, lon);
        }
        return parsed;
      }
    } catch {
      // Ignore cache read error
    }
    throw err;
  }
}
