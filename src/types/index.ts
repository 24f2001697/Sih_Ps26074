export type UserRole = 'farmer' | 'extension_officer' | 'panchayat_admin' | 'ml_scientist';

export type Language = 'en' | 'hi' | 'mr' | 'pa' | 'te' | 'bn';

export interface PanchayatData {
  id: string;
  name: string;
  hindiName: string;
  blockId: string;
  lat: number;
  lng: number;
  elevation: number; // meters above sea level
  landUse: 'Farmland' | 'Hilly Forest' | 'River Valley / Canal' | 'Semi-Arid Plain' | 'Wetland';
  ndvi: number; // 0 to 1
  soilType: string;
  
  // Downscaled Weather Prediction
  weather: {
    temp: number; // °C
    tempMin: number;
    tempMax: number;
    rainfall: number; // mm
    rainProbability: number; // %
    humidity: number; // %
    windSpeed: number; // km/h
    windDirection: string;
    solarRadiation: number; // W/m²
    soilMoisture: number; // %
    confidenceScore: number; // % e.g. 94%
    uncertaintyRange: {
      rainfallMin: number;
      rainfallMax: number;
      tempMin: number;
      tempMax: number;
    };
    hourlyForecast: Array<{
      time: string;
      temp: number;
      rainfall: number;
      humidity: number;
      wind: number;
    }>;
    dailyForecast: Array<{
      day: string;
      date: string;
      tempMin: number;
      tempMax: number;
      rainfall: number;
      icon: string;
      condition: string;
    }>;
  };

  // Coarse Block Baseline (for direct comparison)
  coarseBaseline: {
    temp: number;
    rainfall: number;
    humidity: number;
    windSpeed: number;
    confidence: number;
  };

  // Agro Advisories for this specific Panchayat
  advisories: AgroAdvisory[];
  alerts: WeatherAlert[];
}

export interface AgroAdvisory {
  id: string;
  crop: 'Paddy (Rice)' | 'Wheat' | 'Cotton' | 'Mustard' | 'Sugarcane' | 'Vegetables / Tomato' | 'Maize';
  stage: 'Sowing / Seedling' | 'Vegetative Growth' | 'Flowering & Pollination' | 'Maturity / Harvesting';
  category: 'irrigation' | 'spraying' | 'disease' | 'harvest' | 'soil_nutrient';
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  priority: 'high' | 'medium' | 'info';
  actionableWindow: string;
  impactReason: string;
}

export interface WeatherAlert {
  id: string;
  type: 'flash_flood' | 'heavy_rain' | 'heatwave' | 'frost' | 'pest_outbreak' | 'high_wind';
  severity: 'warning' | 'critical' | 'advisory';
  headline: string;
  headlineHi: string;
  description: string;
  affectedPanchayats: string[];
  validUntil: string;
}

export interface BlockData {
  id: string;
  name: string;
  district: string;
  state: string;
  centerLat: number;
  centerLng: number;
  coarseForecast: {
    temp: number;
    rainfall: number;
    humidity: number;
    windSpeed: number;
    source: string; // e.g. 'IMD 12km NWP Grid'
  };
  panchayats: PanchayatData[];
}

export interface MLModelMetrics {
  name: string;
  type: 'Baseline' | 'Deep Learning' | 'Spatio-Temporal' | 'Ensemble Fusion';
  maeRainfall: number; // mm
  rmseRainfall: number; // mm
  r2Score: number;
  f1RainfallEvents: number;
  inferenceLatency: string; // ms
  memoryFootprint: string; // MB
  spatialResolution: string; // e.g. "1.2 km"
  highlights: string[];
}

export interface FeatureImportance {
  feature: string;
  importance: number;
  description: string;
}
