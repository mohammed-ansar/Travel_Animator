import React from 'react';

const ModelsPage = ({ models = [] }) => {
  return (
    <div>
      <h1>Models</h1>
      {models.length > 0 ? (
        <ul>
          {models.map((model) => (
            <li key={model.id}>{model.name}</li>
          ))}
        </ul>
      ) : (
        <p>No models available.</p>
      )}
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const response = await fetch(
      'https://staging.dashboard.lascade.com/travel_animator/v0/models/',
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'X-CSRFTOKEN': process.env.NEXT_PUBLIC_CSRF_TOKEN, // Use an env variable
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching models: ${response.statusText}`);
    }

    const models = await response.json();

    return {
      props: { models },
    };
  } catch (error) {
    console.error('Failed to fetch models:', error);
    return {
      props: { models: [] }, // Return an empty array as a fallback
    };
  }
}

export default ModelsPage;
