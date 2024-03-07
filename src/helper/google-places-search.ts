// node --version # Should be >= 18
// npm install @google/generative-ai

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY!;

export async function getPlace(props: any) {
  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const string = `Give me the same for ${props?.place} in ${props.city}`;

    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [
        {
          role: "user",
          parts: [
            {
              text: "I want to collect signatures from the busiest places in a city. I want the data to be presented in a JSON format which will have the following data:name, description, time_for_visit: [{from, to}], google_id, latitude, longitude. Give me the best time for visit such that I can go for 3-4 hours and collect signatures. City Squares in Arizona",
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: '``` \n{\n "city_squares": [\n  {\n   "name": "Historic Courthouse Plaza",\n   "description": "A historic plaza in the heart of downtown Tucson, surrounded by historic buildings and shops.",\n   "time_for_visit": [\n    {\n     "from": "10:00 AM",\n     "to": "12:00 PM"\n    },\n    {\n     "from": "2:00 PM",\n     "to": "4:00 PM"\n    }\n   ],\n   "google_id": "ChIJ6xAYG98HY4cR_JydPn99Z-U",\n   "latitude": 32.222817,\n   "longitude": -110.967437\n  },\n  {\n   "name": "University of Arizona Mall",\n   "description": "A pedestrian mall on the campus of the University of Arizona, lined with trees, shops, and restaurants.",\n   "time_for_visit": [\n    {\n     "from": "11:00 AM",\n     "to": "1:00 PM"\n    },\n    {\n     "from": "3:00 PM",\n     "to": "5:00 PM"\n    }\n   ],\n   "google_id": "ChIJZT4-9IYHY4cR7jjQ4TCQ_wM",\n   "latitude": 32.233271,\n   "longitude": -110.950071\n  },\n  {\n   "name": "Heritage Square",\n   "description": "A historic park in downtown Phoenix, home to the Rosson House Museum and the Arizona Science Center.",\n   "time_for_visit": [\n    {\n     "from": "9:00 AM",\n     "to": "11:00 AM"\n    },\n    {\n     "from": "1:00 PM",\n     "to": "3:00 PM"\n    }\n   ],\n   "google_id": "ChIJ5c-YJ1_dy4cRd50g4d47dQA",\n   "latitude": 33.446856,\n   "longitude": -112.075458\n  },\n  {\n   "name": "Civic Space Park",\n   "description": "A public park in downtown Scottsdale, featuring a large lawn,噴水, and art installations.",\n   "time_for_visit": [\n    {\n     "from": "10:00 AM",\n     "to": "12:00 PM"\n    },\n    {\n     "from": "2:00 PM",\n     "to": "4:00 PM"\n    }\n   ],\n   "google_id": "ChIJv6R9MO2fLI8R21y74P3V-2s",\n   "latitude": 33.494942,\n   "longitude": -111.926322\n  }\n ]\n}\n```',
            },
          ],
        },
        {
          role: "user",
          parts: [{ text: "Public Parks in canada" }],
        },
        {
          role: "model",
          parts: [
            {
              text: '```\n{\n "public_parks": [\n  {\n   "name": "Stanley Park",\n   "description": "A large urban park in Vancouver, British Columbia, with stunning views of the city skyline and the ocean.",\n   "time_for_visit": [\n    {\n     "from": "9:00 AM",\n     "to": "11:00 AM"\n    },\n    {\n     "from": "2:00 PM",\n     "to": "4:00 PM"\n    }\n   ],\n   "google_id": "ChIJy8AAA0BV1FQRBG4994pibNI",\n   "latitude": 49.283225,\n   "longitude": -123.115185\n  },\n  {\n   "name": "High Park",\n   "description": "A large park in Toronto, Ontario, with a zoo, a lake, and a variety of gardens.",\n   "time_for_visit": [\n    {\n     "from": "10:00 AM",\n     "to": "12:00 PM"\n    },\n    {\n     "from": "2:00 PM",\n     "to": "4:00 PM"\n    }\n   ],\n   "google_id": "ChIJ24200S8Pi4gR2_0xrfcGnMQ",\n   "latitude": 43.663116,\n   "longitude": -79.458234\n  },\n  {\n   "name": "Mont-Royal Park",\n   "description": "A large park in Montreal, Quebec, with a summit that offers panoramic views of the city.",\n   "time_for_visit": [\n    {\n     "from": "9:00 AM",\n     "to": "11:00 AM"\n    },\n    {\n     "from": "2:00 PM",\n     "to": "4:00 PM"\n    }\n   ],\n   "google_id": "ChIJ7e9p9XYPi4gR1a02il57Duo",\n   "latitude": 45.508639,\n   "longitude": -73.588242\n  },\n  {\n   "name": "Assiniboine Park",\n   "description": "A large park in Winnipeg, Manitoba, with a zoo, a conservatory, and a variety of gardens.",\n   "time_for_visit": [\n    {\n     "from": "10:00 AM",\n     "to": "12:00 PM"\n    },\n    {\n     "from": "2:00 PM",\n     "to": "4:00 PM"\n    }\n   ],\n   "google_id": "ChIJ7-zohr2K1VMR8g4jLBrS_qg",\n   "latitude": 49.888325,\n   "longitude": -97.163761\n  }\n ]\n}\n```',
            },
          ],
        },
      ],
    });

    const result = await chat.sendMessage(string);
    const response = result.response;
    return JSON.parse(response.text().replaceAll("```", ""));
  } catch (err) {
    console.log(err);
  }
}
