import { getPlace } from "@/helper/google-places-search";
import axios from "axios";
import { NextResponse, NextRequest } from "next/server";
import { eventList, places } from "@/helper/constants";

const getEvent = async ({ event, city }: any) => {
  const options = {
    method: "GET",
    url: "https://real-time-events-search.p.rapidapi.com/search-events",
    params: {
      query: `${event} in ${city}`,
      start: "0",
      date: "today",
    },
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY!,
      "X-RapidAPI-Host": "real-time-events-search.p.rapidapi.com",
    },
  };

  try {
    const res = await axios.request(options);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getEventObj = async (city: any) => {
  try {
    const events: any = {};

    for (let i = 0; i < eventList.length; i++) {
      const e = eventList[i];
      const event = await getEvent({ event: e, city });
      events[e] = event;
    }

    return events;
  } catch (err) {
    console.log(err);
  }
};

const getPlacesObj = async (city: string) => {
  try {
    const allPlaces: any = {};

    for (let i = 0; i < places.length; i++) {
      const place = places[i];
      const m: any = await getPlace({ place, city });
      allPlaces[Object.keys(m)[0]] = Object.values(m)[0];
    }
    return allPlaces;
  } catch (err: any) {
    console.log(err);
  }
};

export async function POST(request: NextRequest) {
  try {
    const { city } = await request.json();

    const events = await getEventObj(city);
    const places = await getPlacesObj(city);

    return NextResponse.json({ events, places });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
