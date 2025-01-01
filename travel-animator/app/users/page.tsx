"use client";
import React, { useState, useEffect } from 'react';
import ModelsPage from '../models/model';

const UsersPage = () => {
  const [models, setModels] = useState<any[]>([]); // Change the type according to your data structure
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch('https://dashboard.lascade.com/travel_animator/v0/models/');
        if (!response.ok) {
          throw new Error('Failed to fetch models');
        }
        const data = await response.json();
        console.log('Fetched models:', data);

        if (Array.isArray(data.results)) {
          setModels(data.results); // Set the results array as the models
        } else {
          console.error('Expected an array of models, but got:', data);
          setModels([]); // Set an empty array if the response format is incorrect
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, []);

  return (
    <div>
      {loading && <p>Loading models...</p>}
      {error && <p>Error: {error}</p>}
      <ModelsPage models={models} /> {/* Pass models as prop to ModelsPage */}
    </div>
  );
};

export default UsersPage;
