import { BlockData, MLModelMetrics, FeatureImportance } from '../types';

export const ALL_BLOCKS: BlockData[] = [
  {
    id: 'block-varanasi-pindra',
    name: 'Pindra Block',
    district: 'Varanasi',
    state: 'Uttar Pradesh',
    centerLat: 25.4850,
    centerLng: 82.8250,
    coarseForecast: {
      temp: 33.5,
      rainfall: 3.2,
      humidity: 71,
      windSpeed: 14,
      source: 'IMD GFS 12.5km Coarse Grid',
    },
    panchayats: [
      {
        id: 'panchayat-pindra-khalispur',
        name: 'Khalispur Gram Panchayat',
        hindiName: 'खालिसपुर ग्राम पंचायत',
        blockId: 'block-varanasi-pindra',
        lat: 25.4920,
        lng: 82.8120,
        elevation: 84,
        landUse: 'River Valley / Canal',
        ndvi: 0.74,
        soilType: 'Alluvial Loam (High Moisture Retention)',
        weather: {
          temp: 31.2,
          tempMin: 24.8,
          tempMax: 32.6,
          rainfall: 18.5,
          rainProbability: 85,
          humidity: 86,
          windSpeed: 9.2,
          windDirection: 'ESE (115°)',
          solarRadiation: 540,
          soilMoisture: 72,
          confidenceScore: 94.8,
          uncertaintyRange: {
            rainfallMin: 15.2,
            rainfallMax: 21.8,
            tempMin: 24.1,
            tempMax: 33.2,
          },
          hourlyForecast: [
            { time: '06:00', temp: 25.2, rainfall: 0.0, humidity: 89, wind: 6 },
            { time: '09:00', temp: 28.4, rainfall: 1.2, humidity: 84, wind: 8 },
            { time: '12:00', temp: 31.8, rainfall: 6.5, humidity: 81, wind: 12 },
            { time: '15:00', temp: 30.1, rainfall: 9.8, humidity: 88, wind: 14 },
            { time: '18:00', temp: 27.6, rainfall: 1.0, humidity: 91, wind: 8 },
            { time: '21:00', temp: 26.0, rainfall: 0.0, humidity: 93, wind: 5 },
          ],
          dailyForecast: [
            { day: 'Today', date: '25 Sep', tempMin: 24.8, tempMax: 32.6, rainfall: 18.5, icon: 'rain', condition: 'Moderate to Heavy Downpour' },
            { day: 'Tomorrow', date: '26 Sep', tempMin: 25.0, tempMax: 31.5, rainfall: 22.0, icon: 'thunder', condition: 'Thunderstorms with Gusty Winds' },
            { day: 'Sat', date: '27 Sep', tempMin: 24.2, tempMax: 33.0, rainfall: 4.5, icon: 'cloud-sun', condition: 'Scattered Showers' },
            { day: 'Sun', date: '28 Sep', tempMin: 23.8, tempMax: 34.2, rainfall: 0.0, icon: 'sun', condition: 'Clear Sky & High Solar Flux' },
            { day: 'Mon', date: '29 Sep', tempMin: 24.0, tempMax: 34.8, rainfall: 0.0, icon: 'sun', condition: 'Sunny & Favorable for Harvest' },
          ],
        },
        coarseBaseline: {
          temp: 33.5,
          rainfall: 3.2,
          humidity: 71,
          windSpeed: 14.0,
          confidence: 68.2,
        },
        advisories: [
          {
            id: 'adv-1',
            crop: 'Paddy (Rice)',
            stage: 'Flowering & Pollination',
            category: 'irrigation',
            title: 'Halt Canal & Tube-well Irrigation for 48 Hours',
            titleHi: 'अगले 48 घंटों तक नहरी व नलकूप सिंचाई पूरी तरह रोकें',
            description: 'AI Downscaling indicates 18.5mm - 22mm rainfall due to low-pressure convective cell forming over Gomti-Varuna basin. Soil moisture is already optimal (72%). Halt additional watering to prevent lodging and fungal root rot.',
            descriptionHi: 'गोमती-वरुणा बेसिन में भारी वर्षा (18.5 - 22 मिमी) का पूर्वानुमान है। खेत में जलभराव रोकने हेतु सिंचाई तुरंत स्थगित करें।',
            priority: 'high',
            actionableWindow: 'Immediate until 27 Sep 12:00 PM',
            impactReason: 'Saves 350 units electricity/diesel & protects against sheath rot.',
          },
          {
            id: 'adv-2',
            crop: 'Vegetables / Tomato',
            stage: 'Vegetative Growth',
            category: 'spraying',
            title: 'Avoid Chemical Spraying - Rain Washout Risk (85%)',
            titleHi: 'कीटनाशक व फफूंदनाशी का छिड़काव न करें - भारी बारिश का जोखिम',
            description: 'Do not spray systemic fungicides or foliar nutrients today. High humidity (>86%) and incoming rain showers at 14:00 will wash off active ingredients.',
            descriptionHi: 'दोपहर 2 बजे के बाद तेज बारिश के कारण दवा धुलने की पूरी संभावना है। छिड़काव रोकें।',
            priority: 'high',
            actionableWindow: 'Postpone to 28 Sep (Safe Window)',
            impactReason: 'Prevents chemical waste and input loss of ~₹1,200/acre.',
          },
          {
            id: 'adv-3',
            crop: 'Paddy (Rice)',
            stage: 'Flowering & Pollination',
            category: 'disease',
            title: 'Bacterial Leaf Blight & Sheath Blight Risk Alert',
            titleHi: 'झुलसा रोग (लीफ ब्लाइट) का खतरा - सतर्कता बरतें',
            description: 'Micro-climate downscaled RH is 86% with temperatures 26-31°C, creating high-risk incubation for Xanthomonas oryzae. Prepare Copper Oxychloride (2.5g/L) for spraying on 28 Sep clear window.',
            descriptionHi: 'आर्द्रता 86% होने से जीवाणु झुलसा रोग फैल सकता है। 28 सितम्बर को धूप निकलने पर कॉपर ऑक्सीक्लोराइड का छिड़काव करें।',
            priority: 'medium',
            actionableWindow: 'Monitor fields daily; spray on 28 Sep morning',
            impactReason: 'Prevents potential 20-30% grain yield reduction.',
          }
        ],
        alerts: [
          {
            id: 'alert-1',
            type: 'heavy_rain',
            severity: 'warning',
            headline: 'Localized Intense Downpour Alert (18-25 mm)',
            headlineHi: 'अति-स्थानीय भारी वर्षा चेतावनी (18-25 मिमी)',
            description: 'Canal-adjacent micro-zone will receive heavy rainfall between 13:00 and 17:30 IST. Ensure field drainage channels are open.',
            affectedPanchayats: ['Khalispur', 'Sindhora', 'Karkhiyan'],
            validUntil: '26 Sep 18:00 IST',
          }
        ]
      },
      {
        id: 'panchayat-pindra-sindhora',
        name: 'Sindhora Gram Panchayat',
        hindiName: 'सिंधोरा ग्राम पंचायत',
        blockId: 'block-varanasi-pindra',
        lat: 25.5340,
        lng: 82.8550,
        elevation: 91,
        landUse: 'Semi-Arid Plain',
        ndvi: 0.58,
        soilType: 'Sandy Loam (Quick Draining)',
        weather: {
          temp: 34.1,
          tempMin: 25.4,
          tempMax: 35.2,
          rainfall: 2.4,
          rainProbability: 25,
          humidity: 62,
          windSpeed: 16.5,
          windDirection: 'E (90°)',
          solarRadiation: 780,
          soilMoisture: 41,
          confidenceScore: 92.4,
          uncertaintyRange: {
            rainfallMin: 0.5,
            rainfallMax: 4.8,
            tempMin: 24.8,
            tempMax: 35.8,
          },
          hourlyForecast: [
            { time: '06:00', temp: 26.1, rainfall: 0.0, humidity: 75, wind: 10 },
            { time: '09:00', temp: 30.8, rainfall: 0.0, humidity: 65, wind: 13 },
            { time: '12:00', temp: 34.6, rainfall: 0.4, humidity: 58, wind: 17 },
            { time: '15:00', temp: 34.0, rainfall: 1.8, humidity: 60, wind: 18 },
            { time: '18:00', temp: 30.5, rainfall: 0.2, humidity: 68, wind: 12 },
            { time: '21:00', temp: 28.0, rainfall: 0.0, humidity: 72, wind: 8 },
          ],
          dailyForecast: [
            { day: 'Today', date: '25 Sep', tempMin: 25.4, tempMax: 35.2, rainfall: 2.4, icon: 'sun-cloud', condition: 'Partly Cloudy with Dry Spells' },
            { day: 'Tomorrow', date: '26 Sep', tempMin: 25.8, tempMax: 35.0, rainfall: 5.0, icon: 'cloud-rain', condition: 'Light Passing Showers' },
            { day: 'Sat', date: '27 Sep', tempMin: 25.0, tempMax: 36.0, rainfall: 0.0, icon: 'sun', condition: 'Bright & Warm' },
            { day: 'Sun', date: '28 Sep', tempMin: 24.6, tempMax: 36.5, rainfall: 0.0, icon: 'sun', condition: 'Clear Skies' },
            { day: 'Mon', date: '29 Sep', tempMin: 25.0, tempMax: 36.2, rainfall: 0.0, icon: 'sun', condition: 'Warm & Dry' },
          ],
        },
        coarseBaseline: {
          temp: 33.5,
          rainfall: 3.2,
          humidity: 71,
          windSpeed: 14.0,
          confidence: 68.2,
        },
        advisories: [
          {
            id: 'adv-s1',
            crop: 'Sugarcane',
            stage: 'Vegetative Growth',
            category: 'irrigation',
            title: 'Schedule Light Drip/Furrow Irrigation',
            titleHi: 'गन्ने की फसल में हल्की सिंचाई तुरंत दें',
            description: 'Unlike neighboring river valley panchayats, Sindhora plateau will receive minimal rainfall (only 2.4mm). Soil moisture dropped to 41%. Irrigate to prevent moisture stress.',
            descriptionHi: 'सिंधोरा क्षेत्र में केवल 2.4 मिमी हल्की वर्षा होगी। नमी 41% रह गई है, अतः गन्ने में हल्की सिंचाई अवश्य करें।',
            priority: 'medium',
            actionableWindow: '25 Sep 05:00 PM - 26 Sep 09:00 AM',
            impactReason: 'Maintains stalk elongation rate during peak vegetative cycle.',
          },
          {
            id: 'adv-s2',
            crop: 'Mustard',
            stage: 'Sowing / Seedling',
            category: 'harvest',
            title: 'Optimal Field Preparation for Early Toria / Mustard Sowing',
            titleHi: 'अगेती तोरिया / सरसों की बुवाई हेतु खेत की तैयारी का उत्तम समय',
            description: 'Dry surface conditions and soil temperature (28°C) are ideal for seedbed tilling. Complete sowing within next 4 days.',
            descriptionHi: 'खेत में जुताई और सरसों की बुवाई के लिए मौसम बिल्कुल अनुकूल है।',
            priority: 'info',
            actionableWindow: '26 Sep to 29 Sep',
            impactReason: 'Ensures 95%+ seed germination rate.',
          }
        ],
        alerts: []
      },
      {
        id: 'panchayat-pindra-karkhiyan',
        name: 'Karkhiyan Industrial & Agro Gram Panchayat',
        hindiName: 'करखियांव ग्राम पंचायत',
        blockId: 'block-varanasi-pindra',
        lat: 25.4620,
        lng: 82.8420,
        elevation: 86,
        landUse: 'Farmland',
        ndvi: 0.69,
        soilType: 'Clay Loam',
        weather: {
          temp: 32.8,
          tempMin: 25.0,
          tempMax: 33.5,
          rainfall: 14.2,
          rainProbability: 78,
          humidity: 79,
          windSpeed: 11.0,
          windDirection: 'ESE (120°)',
          solarRadiation: 610,
          soilMoisture: 65,
          confidenceScore: 95.1,
          uncertaintyRange: {
            rainfallMin: 11.5,
            rainfallMax: 17.0,
            tempMin: 24.5,
            tempMax: 34.0,
          },
          hourlyForecast: [
            { time: '06:00', temp: 25.5, rainfall: 0.0, humidity: 85, wind: 7 },
            { time: '09:00', temp: 29.2, rainfall: 0.8, humidity: 80, wind: 9 },
            { time: '12:00', temp: 32.8, rainfall: 4.2, humidity: 76, wind: 12 },
            { time: '15:00', temp: 31.0, rainfall: 7.8, humidity: 83, wind: 13 },
            { time: '18:00', temp: 28.5, rainfall: 1.4, humidity: 88, wind: 8 },
            { time: '21:00', temp: 26.8, rainfall: 0.0, humidity: 90, wind: 6 },
          ],
          dailyForecast: [
            { day: 'Today', date: '25 Sep', tempMin: 25.0, tempMax: 33.5, rainfall: 14.2, icon: 'rain', condition: 'Moderate Showers' },
            { day: 'Tomorrow', date: '26 Sep', tempMin: 25.2, tempMax: 32.0, rainfall: 16.5, icon: 'rain', condition: 'Rain with Thunder' },
            { day: 'Sat', date: '27 Sep', tempMin: 24.5, tempMax: 34.0, rainfall: 2.0, icon: 'cloud-sun', condition: 'Passing Clouds' },
            { day: 'Sun', date: '28 Sep', tempMin: 24.0, tempMax: 35.0, rainfall: 0.0, icon: 'sun', condition: 'Sunny' },
            { day: 'Mon', date: '29 Sep', tempMin: 24.5, tempMax: 35.5, rainfall: 0.0, icon: 'sun', condition: 'Clear' },
          ],
        },
        coarseBaseline: {
          temp: 33.5,
          rainfall: 3.2,
          humidity: 71,
          windSpeed: 14.0,
          confidence: 68.2,
        },
        advisories: [
          {
            id: 'adv-k1',
            crop: 'Paddy (Rice)',
            stage: 'Flowering & Pollination',
            category: 'soil_nutrient',
            title: 'Defer Urea / Nitrogen Top Dressing',
            titleHi: 'यूरिया व नत्रजन का बुरकाव 2 दिन के लिए टालें',
            description: '14.2mm rain will cause heavy leaching of dissolved nitrogen if applied now. Apply top-dressing on 28 Sep after soil dries slightly.',
            descriptionHi: '14.2 मिमी वर्षा से यूरिया घुलकर बह जाएगी। यूरिया का प्रयोग 28 तारीख के बाद ही करें।',
            priority: 'high',
            actionableWindow: 'Postpone till 28 Sep',
            impactReason: 'Saves ₹800/bag expenditure and prevents groundwater contamination.',
          }
        ],
        alerts: []
      },
      {
        id: 'panchayat-pindra-nehiya',
        name: 'Nehiya Gram Panchayat',
        hindiName: 'नेहिया ग्राम पंचायत',
        blockId: 'block-varanasi-pindra',
        lat: 25.4410,
        lng: 82.8010,
        elevation: 82,
        landUse: 'Wetland',
        ndvi: 0.81,
        soilType: 'Heavy Clay (Waterlogged prone)',
        weather: {
          temp: 30.5,
          tempMin: 24.2,
          tempMax: 31.8,
          rainfall: 24.8,
          rainProbability: 92,
          humidity: 91,
          windSpeed: 12.5,
          windDirection: 'SE (135°)',
          solarRadiation: 480,
          soilMoisture: 88,
          confidenceScore: 96.2,
          uncertaintyRange: {
            rainfallMin: 21.0,
            rainfallMax: 29.5,
            tempMin: 23.5,
            tempMax: 32.2,
          },
          hourlyForecast: [
            { time: '06:00', temp: 24.8, rainfall: 0.2, humidity: 93, wind: 8 },
            { time: '09:00', temp: 27.5, rainfall: 3.0, humidity: 89, wind: 10 },
            { time: '12:00', temp: 30.2, rainfall: 10.5, humidity: 86, wind: 15 },
            { time: '15:00', temp: 29.0, rainfall: 9.6, humidity: 94, wind: 16 },
            { time: '18:00', temp: 26.8, rainfall: 1.5, humidity: 95, wind: 9 },
            { time: '21:00', temp: 25.2, rainfall: 0.0, humidity: 96, wind: 6 },
          ],
          dailyForecast: [
            { day: 'Today', date: '25 Sep', tempMin: 24.2, tempMax: 31.8, rainfall: 24.8, icon: 'rain-heavy', condition: 'Heavy Downpour & Water accumulation' },
            { day: 'Tomorrow', date: '26 Sep', tempMin: 24.5, tempMax: 30.8, rainfall: 28.0, icon: 'rain-heavy', condition: 'Heavy Rain with Waterlogging Risk' },
            { day: 'Sat', date: '27 Sep', tempMin: 24.0, tempMax: 32.5, rainfall: 6.0, icon: 'rain', condition: 'Light Rain' },
            { day: 'Sun', date: '28 Sep', tempMin: 23.5, tempMax: 33.8, rainfall: 0.0, icon: 'cloud-sun', condition: 'Partly Cloudy' },
            { day: 'Mon', date: '29 Sep', tempMin: 24.0, tempMax: 34.5, rainfall: 0.0, icon: 'sun', condition: 'Clear' },
          ],
        },
        coarseBaseline: {
          temp: 33.5,
          rainfall: 3.2,
          humidity: 71,
          windSpeed: 14.0,
          confidence: 68.2,
        },
        advisories: [
          {
            id: 'adv-n1',
            crop: 'Vegetables / Tomato',
            stage: 'Vegetative Growth',
            category: 'harvest',
            title: 'Critical: Clear Drainage Channels to Avoid Root Drowning',
            titleHi: 'अति आवश्यक: जल निकासी की नालियां तुरंत खोलें',
            description: 'Nehiya low-lying terrain will accumulate up to 50mm combined rainfall over 48 hours. Ensure drains are unclogged to avoid vegetable wilting and root suffocation.',
            descriptionHi: 'नेहिया के निचले खेतों में 50 मिमी पानी जमा होने का खतरा है। सब्जी के खेतों से पानी निकालने का तुरंत प्रबंध करें।',
            priority: 'high',
            actionableWindow: 'Within next 4 hours',
            impactReason: 'Prevents 100% crop loss from standing water.',
          }
        ],
        alerts: [
          {
            id: 'alert-n1',
            type: 'flash_flood',
            severity: 'critical',
            headline: 'Localized Field Inundation & Waterlogging Alert',
            headlineHi: 'खेतों में जलभराव की गंभीर चेतावनी',
            description: 'U-Net spatio-temporal downscaling projects intense convective precipitation (24.8mm today + 28mm tomorrow). Low-lying paddy & vegetable plots at risk.',
            affectedPanchayats: ['Nehiya', 'Basni', 'Babatpur South'],
            validUntil: '26 Sep 22:00 IST',
          }
        ]
      }
    ]
  },
  {
    id: 'block-pune-mulshi',
    name: 'Mulshi / Haveli Block',
    district: 'Pune',
    state: 'Maharashtra',
    centerLat: 18.5204,
    centerLng: 73.5120,
    coarseForecast: {
      temp: 29.0,
      rainfall: 12.0,
      humidity: 78,
      windSpeed: 18,
      source: 'IMD Pune 10km Grid',
    },
    panchayats: [
      {
        id: 'panchayat-mulshi-tamhini',
        name: 'Tamhini Ghat Gram Panchayat',
        hindiName: 'ताम्हिणी घाट ग्राम पंचायत',
        blockId: 'block-pune-mulshi',
        lat: 18.4600,
        lng: 73.4200,
        elevation: 640,
        landUse: 'Hilly Forest',
        ndvi: 0.88,
        soilType: 'Laterite High Elevation Soil',
        weather: {
          temp: 23.4,
          tempMin: 19.8,
          tempMax: 24.5,
          rainfall: 68.4,
          rainProbability: 98,
          humidity: 98,
          windSpeed: 28.5,
          windDirection: 'WSW (245°)',
          solarRadiation: 240,
          soilMoisture: 95,
          confidenceScore: 96.5,
          uncertaintyRange: {
            rainfallMin: 58.0,
            rainfallMax: 76.0,
            tempMin: 19.0,
            tempMax: 25.0,
          },
          hourlyForecast: [
            { time: '06:00', temp: 20.2, rainfall: 8.5, humidity: 99, wind: 24 },
            { time: '09:00', temp: 22.0, rainfall: 14.2, humidity: 98, wind: 28 },
            { time: '12:00', temp: 24.1, rainfall: 22.0, humidity: 97, wind: 32 },
            { time: '15:00', temp: 23.5, rainfall: 15.8, humidity: 98, wind: 30 },
            { time: '18:00', temp: 21.6, rainfall: 5.2, humidity: 99, wind: 22 },
            { time: '21:00', temp: 20.5, rainfall: 2.7, humidity: 99, wind: 18 },
          ],
          dailyForecast: [
            { day: 'Today', date: '25 Sep', tempMin: 19.8, tempMax: 24.5, rainfall: 68.4, icon: 'rain-heavy', condition: 'Extremely Heavy Orographic Rain' },
            { day: 'Tomorrow', date: '26 Sep', tempMin: 19.5, tempMax: 24.0, rainfall: 54.0, icon: 'rain-heavy', condition: 'Heavy Ghat Downpours' },
            { day: 'Sat', date: '27 Sep', tempMin: 20.0, tempMax: 25.5, rainfall: 21.0, icon: 'rain', condition: 'Moderate Ghat Showers' },
            { day: 'Sun', date: '28 Sep', tempMin: 20.5, tempMax: 27.0, rainfall: 8.0, icon: 'cloud-rain', condition: 'Light Rains' },
            { day: 'Mon', date: '29 Sep', tempMin: 21.0, tempMax: 28.5, rainfall: 2.0, icon: 'cloud-sun', condition: 'Clearing' },
          ],
        },
        coarseBaseline: {
          temp: 29.0,
          rainfall: 12.0,
          humidity: 78,
          windSpeed: 18.0,
          confidence: 55.4,
        },
        advisories: [
          {
            id: 'adv-tm1',
            crop: 'Paddy (Rice)',
            stage: 'Vegetative Growth',
            category: 'disease',
            title: 'Ghat Elevation Orographic Rain Alert - Terraced Drainage Support',
            titleHi: 'घाट माथ्यावरील मुसळधार पाऊस - शेतीतील पाण्याचा निचरा करा',
            description: 'AI model downscaling accurately captures Western Ghats orographic surge (68.4mm vs coarse 12mm). Secure terrace bunds to prevent soil erosion.',
            descriptionHi: 'घाट परिसरात ६८ मिमी पेक्षा जास्त पाऊस होईल. भात खाचरांमधील अतिरिक्त पाणी वाहून जाण्यासाठी चर तयार ठेवा.',
            priority: 'high',
            actionableWindow: 'Next 24 Hours',
            impactReason: 'Prevents embankment burst and topsoil washout.',
          }
        ],
        alerts: [
          {
            id: 'alert-tm1',
            type: 'flash_flood',
            severity: 'critical',
            headline: 'Ghat Orographic Heavy Precipitation Warning (65-80mm)',
            headlineHi: 'घाट माथ्यावर अतिवृष्टीची पूर्वसूचना',
            description: 'Ghat slope condensation will deliver 5x rainfall compared to plain block average. High runoff expected into streams.',
            affectedPanchayats: ['Tamhini Ghat', 'Kundalika Valley', 'Paud West'],
            validUntil: '26 Sep 20:00 IST',
          }
        ]
      },
      {
        id: 'panchayat-mulshi-paud',
        name: 'Paud Gram Panchayat',
        hindiName: 'पौड ग्राम पंचायत',
        blockId: 'block-pune-mulshi',
        lat: 18.5300,
        lng: 73.6100,
        elevation: 580,
        landUse: 'Farmland',
        ndvi: 0.72,
        soilType: 'Medium Black Soil',
        weather: {
          temp: 28.2,
          tempMin: 22.1,
          tempMax: 29.4,
          rainfall: 16.8,
          rainProbability: 80,
          humidity: 82,
          windSpeed: 16.0,
          windDirection: 'WSW (240°)',
          solarRadiation: 460,
          soilMoisture: 75,
          confidenceScore: 94.2,
          uncertaintyRange: {
            rainfallMin: 13.5,
            rainfallMax: 19.8,
            tempMin: 21.5,
            tempMax: 30.1,
          },
          hourlyForecast: [
            { time: '06:00', temp: 22.5, rainfall: 0.5, humidity: 88, wind: 12 },
            { time: '09:00', temp: 25.8, rainfall: 2.2, humidity: 84, wind: 15 },
            { time: '12:00', temp: 28.6, rainfall: 6.8, humidity: 80, wind: 18 },
            { time: '15:00', temp: 27.5, rainfall: 5.5, humidity: 85, wind: 17 },
            { time: '18:00', temp: 25.0, rainfall: 1.8, humidity: 87, wind: 13 },
            { time: '21:00', temp: 23.8, rainfall: 0.0, humidity: 89, wind: 10 },
          ],
          dailyForecast: [
            { day: 'Today', date: '25 Sep', tempMin: 22.1, tempMax: 29.4, rainfall: 16.8, icon: 'rain', condition: 'Intermittent Showers' },
            { day: 'Tomorrow', date: '26 Sep', tempMin: 22.4, tempMax: 28.8, rainfall: 14.5, icon: 'rain', condition: 'Moderate Rain' },
            { day: 'Sat', date: '27 Sep', tempMin: 22.0, tempMax: 30.2, rainfall: 4.0, icon: 'cloud-sun', condition: 'Passing Showers' },
            { day: 'Sun', date: '28 Sep', tempMin: 21.8, tempMax: 31.5, rainfall: 0.0, icon: 'sun', condition: 'Sunny' },
            { day: 'Mon', date: '29 Sep', tempMin: 22.0, tempMax: 32.0, rainfall: 0.0, icon: 'sun', condition: 'Clear Skies' },
          ],
        },
        coarseBaseline: {
          temp: 29.0,
          rainfall: 12.0,
          humidity: 78,
          windSpeed: 18.0,
          confidence: 55.4,
        },
        advisories: [
          {
            id: 'adv-pd1',
            crop: 'Vegetables / Tomato',
            stage: 'Flowering & Pollination',
            category: 'spraying',
            title: 'Spray Mancozeb / Metalaxyl on 28 Sep for Early Blight',
            titleHi: 'टोमॅटो पिकावर करपा रोगाच्या प्रतिबंधासाठी २८ तारखेला फवारणी करा',
            description: 'Persistent 82% humidity will spur Alternaria solani spores. The optimal dry spraying window opens on Sunday 28 Sep morning.',
            descriptionHi: 'हवेत जास्त आर्द्रता असल्याने करपा रोगाचा प्रादुर्भाव होऊ नये म्हणून रविवार सकाळी फवारणी करा.',
            priority: 'medium',
            actionableWindow: '28 Sep 07:00 AM - 11:00 AM',
            impactReason: 'Protects fruit set and prevents 25% tomato yield loss.',
          }
        ],
        alerts: []
      }
    ]
  },
  {
    id: 'block-ludhiana-dehlon',
    name: 'Dehlon Block',
    district: 'Ludhiana',
    state: 'Punjab',
    centerLat: 30.7500,
    centerLng: 75.8800,
    coarseForecast: {
      temp: 34.0,
      rainfall: 0.0,
      humidity: 52,
      windSpeed: 12,
      source: 'IMD Chandigarh 12km Grid',
    },
    panchayats: [
      {
        id: 'panchayat-ludhiana-sahnewal',
        name: 'Sahnewal Khurd Gram Panchayat',
        hindiName: 'साहनेवाल खुर्द ग्राम पंचायत',
        blockId: 'block-ludhiana-dehlon',
        lat: 30.8200,
        lng: 75.9700,
        elevation: 252,
        landUse: 'Farmland',
        ndvi: 0.79,
        soilType: 'Loamy Sand with High Water Table',
        weather: {
          temp: 33.2,
          tempMin: 23.5,
          tempMax: 34.8,
          rainfall: 0.0,
          rainProbability: 8,
          humidity: 58,
          windSpeed: 9.8,
          windDirection: 'NW (315°)',
          solarRadiation: 820,
          soilMoisture: 52,
          confidenceScore: 97.1,
          uncertaintyRange: {
            rainfallMin: 0.0,
            rainfallMax: 0.4,
            tempMin: 22.8,
            tempMax: 35.5,
          },
          hourlyForecast: [
            { time: '06:00', temp: 24.2, rainfall: 0.0, humidity: 72, wind: 6 },
            { time: '09:00', temp: 29.5, rainfall: 0.0, humidity: 62, wind: 8 },
            { time: '12:00', temp: 33.8, rainfall: 0.0, humidity: 54, wind: 11 },
            { time: '15:00', temp: 34.6, rainfall: 0.0, humidity: 50, wind: 12 },
            { time: '18:00', temp: 31.0, rainfall: 0.0, humidity: 59, wind: 8 },
            { time: '21:00', temp: 27.5, rainfall: 0.0, humidity: 66, wind: 5 },
          ],
          dailyForecast: [
            { day: 'Today', date: '25 Sep', tempMin: 23.5, tempMax: 34.8, rainfall: 0.0, icon: 'sun', condition: 'Sunny & Dry' },
            { day: 'Tomorrow', date: '26 Sep', tempMin: 23.8, tempMax: 35.2, rainfall: 0.0, icon: 'sun', condition: 'Clear Sky' },
            { day: 'Sat', date: '27 Sep', tempMin: 24.0, tempMax: 35.5, rainfall: 0.0, icon: 'sun', condition: 'Clear' },
            { day: 'Sun', date: '28 Sep', tempMin: 23.5, tempMax: 34.5, rainfall: 0.0, icon: 'sun', condition: 'Clear' },
            { day: 'Mon', date: '29 Sep', tempMin: 23.0, tempMax: 34.0, rainfall: 0.0, icon: 'sun', condition: 'Clear' },
          ],
        },
        coarseBaseline: {
          temp: 34.0,
          rainfall: 0.0,
          humidity: 52,
          windSpeed: 12.0,
          confidence: 76.5,
        },
        advisories: [
          {
            id: 'adv-ld1',
            crop: 'Paddy (Rice)',
            stage: 'Maturity / Harvesting',
            category: 'harvest',
            title: 'Ideal Harvesting & Grain Moisture Window (Next 5 Days)',
            titleHi: 'ਝੋਨੇ ਦੀ ਕਟਾਈ ਅਤੇ ਸੰਭਾਲ ਲਈ ਅਨੁਕੂਲ ਮੌਸਮ (ਅਗਲੇ 5 ਦਿਨ)',
            description: 'Zero rainfall projected across the entire panchayat grid with sustained solar radiation (>800 W/m²). Safe to operate combine harvesters without grain spoilage risk.',
            descriptionHi: 'ਲਗਾਤਾਰ 5 ਦਿਨ ਧੁੱਪ ਅਤੇ ਸੁੱਕਾ ਮੌਸਮ ਰਹੇਗਾ। ਕੰਬਾਈਨ ਨਾਲ ਝੋਨੇ ਦੀ ਕਟਾਈ ਬਿਨਾਂ ਝਿਜਕ ਸ਼ੁਰੂ ਕਰੋ।',
            priority: 'info',
            actionableWindow: '25 Sep to 30 Sep',
            impactReason: 'Achieves <14% grain moisture for maximum mandi procurement rate.',
          }
        ],
        alerts: []
      }
    ]
  }
];

export const ML_MODELS_BENCHMARK: MLModelMetrics[] = [
  {
    name: 'Proposed Dark Vyom Multi-Source U-Net + ConvLSTM Fusion',
    type: 'Ensemble Fusion',
    maeRainfall: 1.34,
    rmseRainfall: 1.98,
    r2Score: 0.932,
    f1RainfallEvents: 0.915,
    inferenceLatency: '42 ms / Panchayat',
    memoryFootprint: '148 MB (Quantized INT8)',
    spatialResolution: '1.0 km (Panchayat Scale)',
    highlights: [
      'Fuses DEM 30m terrain, INSAT-3DS IR/Visible, ERA5-Land & IMD Block NWP',
      'Dynamic orographic correction on hill slopes and river valleys',
      'Quantified Bayesian uncertainty intervals for advisory safety'
    ]
  },
  {
    name: 'ConvLSTM Spatio-Temporal Nowcaster',
    type: 'Spatio-Temporal',
    maeRainfall: 1.82,
    rmseRainfall: 2.65,
    r2Score: 0.884,
    f1RainfallEvents: 0.862,
    inferenceLatency: '68 ms / Panchayat',
    memoryFootprint: '210 MB',
    spatialResolution: '2.5 km',
    highlights: [
      'High temporal tracking of convective cloud cells',
      'Effective nowcasting for 1h - 6h rainfall surges'
    ]
  },
  {
    name: 'Spatial CNN / U-Net (DeepSD Architecture)',
    type: 'Deep Learning',
    maeRainfall: 2.15,
    rmseRainfall: 3.10,
    r2Score: 0.845,
    f1RainfallEvents: 0.812,
    inferenceLatency: '35 ms / Panchayat',
    memoryFootprint: '120 MB',
    spatialResolution: '2.0 km',
    highlights: [
      'Super-resolution style spatial upscaling from 12km to 2km grid',
      'Learns static topographic edge influences'
    ]
  },
  {
    name: 'LightGBM / XGBoost Regressor (Baseline ML)',
    type: 'Baseline',
    maeRainfall: 3.45,
    rmseRainfall: 4.88,
    r2Score: 0.732,
    f1RainfallEvents: 0.705,
    inferenceLatency: '12 ms / Panchayat',
    memoryFootprint: '45 MB',
    spatialResolution: 'Point / Tabular',
    highlights: [
      'Fast tabular regression on historical feature vectors',
      'Lacks continuous 2D spatial convolution awareness'
    ]
  },
  {
    name: 'Coarse IMD Block Forecast (No AI Downscaling - Raw Baseline)',
    type: 'Baseline',
    maeRainfall: 6.20,
    rmseRainfall: 8.95,
    r2Score: 0.528,
    f1RainfallEvents: 0.510,
    inferenceLatency: 'N/A (Coarse 12-25 km)',
    memoryFootprint: 'N/A',
    spatialResolution: '12.5 - 25.0 km (Block Level)',
    highlights: [
      'Averages weather across 50-100 villages uniformly',
      'Completely misses micro-topography, river valley humidity & rain shadows'
    ]
  }
];

export const FEATURE_IMPORTANCE_DATA: FeatureImportance[] = [
  {
    feature: 'DEM Elevation & Orographic Slope Gradient',
    importance: 34.5,
    description: 'Calculates adiabatic cooling and cloud barrier accumulation from SRTM 30m DEM.'
  },
  {
    feature: 'INSAT-3DS Brightness Temp & Cloud Optical Depth',
    importance: 26.2,
    description: 'ISRO MOSDAC geostationary satellite thermal infrared channels (TIR-1/TIR-2).'
  },
  {
    feature: 'IMD Coarse Numerical Weather Prediction (NWP)',
    importance: 18.4,
    description: 'Block-scale atmospheric state variables (geopotential height, pressure, vorticity).'
  },
  {
    feature: 'NDVI Vegetation Index & Canopy Cover (Sentinel-2)',
    importance: 11.8,
    description: 'Evapotranspiration flux and surface roughness modifying wind & near-ground humidity.'
  },
  {
    feature: 'Historical Micro-Climate Spatial Bias (ERA5-Land)',
    importance: 9.1,
    description: 'Multi-year climatological corrections for local rain shadow / canal valley anomalies.'
  }
];

export const DATASET_SOURCES = [
  {
    name: 'IMD Block Agromet NWP',
    provider: 'India Meteorological Department (MoES)',
    type: 'Numerical Weather Prediction (12.5 km grid)',
    status: 'Connected (Live API)',
    frequency: 'Every 6 Hours',
    coverage: 'All India Blocks'
  },
  {
    name: 'INSAT-3D / 3DS Satellite Products',
    provider: 'ISRO MOSDAC (Space Applications Centre)',
    type: 'Geostationary Thermal & Water Vapor Imagery',
    status: 'Connected (Live Stream)',
    frequency: 'Every 15 Minutes',
    coverage: 'Indian Subcontinent & Ocean'
  },
  {
    name: 'ERA5-Land & AgERA5 Reanalysis',
    provider: 'ECMWF Copernicus Climate Change Service',
    type: 'Historical Gridded Agrometeorology (9 km)',
    status: 'Calibrated & Ingested',
    frequency: 'Daily Update',
    coverage: 'Global / Indian Landmass'
  },
  {
    name: 'SRTM High-Resolution DEM (30m)',
    provider: 'NASA / USGS / ISRO Bhuvan',
    type: 'Digital Elevation Model & Slope Vectors',
    status: 'Static Raster Cache Active',
    frequency: 'Static 30m Resolution',
    coverage: 'Panchayat Micro-topography'
  },
  {
    name: 'GSMaP / IMD Gridded Rainfall',
    provider: 'JAXA / ISRO GSMaP_ISRO Portal',
    type: 'Satellite-Gauge Merged Hourly Precipitation',
    status: 'Active (Validation Feed)',
    frequency: 'Hourly',
    coverage: '0.1° Gridded'
  }
];
