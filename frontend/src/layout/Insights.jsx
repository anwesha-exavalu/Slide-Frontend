import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Insights({ id }) {
  const [insights, setInsights] = useState(null); // null for no data initially
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Define the async function to make the API call
    const fetchData = async () => {
      try {
        // Make the API request
        const response = await axios.get(`https://underwriting-assessment.onrender.com/api/v1/insights?submission_id=${id}`);

        if (response.status === 200) {
          setInsights(response.data); // Assuming data is a JSON object
        } else {
          setErrorMessage("No insights available at this moment.");
        }
      } catch (err) {
        setErrorMessage("Unable to fetch insights: " + err.message);
      }
    };
    // Call the function to fetch data
    fetchData();
  }, [id]);

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-screen-lg mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Insights</h2>
      {errorMessage && (
        <p className="text-red-600 font-medium mb-4">{errorMessage}</p>
      )}
      {insights ? (
        <div className="bg-white p-4 rounded-md shadow">
          <ol className="space-y-2">
            {
              insights.map((insight, index) => (
                // Mapping over key_insights inside each insight
                insight.key_insights
                  .filter((keyInsight) => keyInsight.priority.toLowerCase() === 'high')
                  .map((keyInsight, keyIndex) => (
                    <li key={`${index}-${keyIndex}`} className="list-decimal font-bold p-2 mx-8">
                      {keyInsight.insight}
                    </li>
                  ))
              ))
            }
          </ol>
        </div>
      ) : (
        <p className="text-gray-600">No insights available.</p>
      )}
    </div>
  );
}

export default Insights;
