const BASE_URL = process.env.REACT_APP_AI_EXTRACT;

if (!BASE_URL) {
  console.error("REACT_APP_AI_EXTRACT is not defined");
}

export const getExtractedDocuments = async () => {
  const response = await fetch(
    `${BASE_URL}/api/get_extracted_documents`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch extracted documents");
  }

  return response.json();
};
