import axios from "axios";

export const getData = async ({
  city,
  timing,
}: {
  city: string;
  timing: string;
}) => {
  const response = await axios.post("https://52.23.245.23/api/ai", {
    city,
    timing,
  });
  return response.data;
};
