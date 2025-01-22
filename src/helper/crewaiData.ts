import axios from "axios";

export const getData = async ({
  city,
  timing,
}: {
  city: string;
  timing: string;
}) => {
  const response = await axios.post("https://signerfinder.live/api/ai", {
    city,
    timing,
  });
  return response.data;
};
