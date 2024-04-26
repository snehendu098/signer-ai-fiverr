import { getPlace } from "@/helper/google-places-search";
import axios from "axios";
import { eventList, places } from "@/helper/constants";

const getEvent = async ({ event, city }: any) => {
  const options = {
    method: "GET",
    url: "https://real-time-events-search.p.rapidapi.com/search-events",
    params: {
      query: `${event} in ${city}`,
      start: "0",
      date: "today",
      is_virtual: false
    },
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY!,
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
    console.log(events)

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
      if (m) {
        allPlaces[Object.keys(m)[0]] = Object.values(m)[0];
      }
      console.log(allPlaces)
    }

    return allPlaces;
  } catch (err: any) {
    console.log(err);
  }
};

export async function getAllData({city}:any) {
    try {
  
      const events = await getEventObj(city);
      const places = await getPlacesObj(city);
  
      return { data: {events, places} }
    } catch (err: any) {
      console.log(err);
      return {data: "Error Occurred"}
    }
  }