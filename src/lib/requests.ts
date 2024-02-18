import { awsUrl } from "@/utils/constants";

export const fetchStructureText = async (
  text: string,
  lng: string,
  apiKey: string
) => {
  const response = await fetch(`${awsUrl}/structurer/text/?language=${lng}`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: text,
      patient_id: "123",
      api_key: apiKey,
    }),
  });
  if (!response.ok) {
    throw new Error("Error with APE API");
  }
  const data = await response.json();
  return data;
};
