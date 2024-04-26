import axios from "axios";

export const getData = async ({
  city,
  timing,
}: {
  city: string;
  timing: string;
}) => {
  const response = await axios.post("http://localhost:8000/api/ai", {
    city,
    timing,
  });
  return response.data;
};
