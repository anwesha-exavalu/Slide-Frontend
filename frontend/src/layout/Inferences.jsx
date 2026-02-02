import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Inferences({ id }) {
  const [inferences, setInferences] = useState(null); // null for no data initially
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Define the async function to make the API call
    const fetchData = async () => {
      try {
        // Make the API request
        const response = await axios.get(`https://underwriting-assessment.onrender.com/api/v1/inferences?submission_id=${id}`);

        if (response.status === 200) {
          setInferences(response.data); // Assuming data is a JSON object
        } else {
          setErrorMessage("No Inferences available at this moment.");
        }
      } catch (err) {
        setErrorMessage("Unable to fetch Inferences: " + err.message);
      }
    };
    // Call the function to fetch data
    fetchData();
  }, [id]);

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-screen-lg mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Inferences</h2>
      {errorMessage && (
        <p className="text-red-600 font-medium mb-4">{errorMessage}</p>
      )}
      {inferences ? (
        <div className="bg-white p-4 rounded-md shadow">
          <ol className="space-y-2">
            {
              inferences.mismatches.filter((inference) => inference.priority.toLowerCase() === 'high').map((inference, index) => (
                <li key={index} className='font-bold list-decimal p-2 mx-6'>{inference.risk}</li>
              ))
            }
          </ol>
        </div>
      ) : (
        <p className="text-gray-600">No Inferences available.</p>
      )}
    </div>
  );
}

export default Inferences;
