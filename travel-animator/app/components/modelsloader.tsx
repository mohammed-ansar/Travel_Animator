// // "use client";

// // import React, { useState, useEffect } from "react";

// // interface Model {
// //   name: string;
// //   url: string;
// // }

// // const ModelsLoader: React.FC = () => {
// //   const [models, setModels] = useState<Model[]>([]);
// //   const [loading, setLoading] = useState<boolean>(true);
// //   const [error, setError] = useState<string | null>(null);

// //   useEffect(() => {
// //     const fetchModels = async () => {
// //       try {
// //         const response = await fetch(
// //           "https://dashboard.lascade.com/travel_animator/v0/models/"
// //         );

// //         if (!response.ok) {
// //           throw new Error(`Failed to fetch models: ${response.status}`);
// //         }

// //         const data = await response.json();

// //         // Assuming the response contains a list of models
// //         if (Array.isArray(data.models)) {
// //           setModels(data.models);
// //         } else {
// //           setError("Invalid data format received from API");
// //         }
// //       } catch (err: any) {
// //         setError(err.message || "An unexpected error occurred");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchModels();
// //   }, []);

// //   if (loading) return <p>Loading models...</p>;
// //   if (error) return <p>Error: {error}</p>;

// //   return (
// //     <div>
// //       <h1>Available Models</h1>
// //       <ul>
// //         {models.map((model, index) => (
// //           <li key={index}>
// //             <a href={model.url} target="_blank" rel="noopener noreferrer">
// //               {model.name}
// //             </a>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default ModelsLoader;

// // "use client"

// // import { useEffect, useState } from 'react';

// // export default function FetchModels() {
// //   const [models, setModels] = useState([]);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     async function fetchData() {
// //       try {
// //         const response = await fetch('https://staging.dashboard.lascade.com/travel_animator/v0/models/'); // Replace with your API endpoint
// //         if (!response.ok) {
// //           throw new Error(`HTTP error! status: ${response.status}`);
// //         }
// //         const data = await response.json();
// //         setModels(data.results);
// //       } catch (err) {
// //         console.error('Failed to fetch data:', err);
// //         setError(err.message);
// //       }
// //     }
// //     fetchData();
// //   }, []);

// //   if (error) {
// //     return <div>Error: {error}</div>;
// //   }

// //   return (
// //     <div>
// //       {models.map((model) => (
// //         <div key={model.name}>
// //           <h3>{model.name}</h3>
// //           <img src={model.texture_set[0]?.thumbnail} alt={model.name} />
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }
// "use client"
// import React from 'react';

// const ModelsPage = ({ models }) => {
//   return (
//     <div>
//       <h1>Models</h1>
//       <ul>
//         {models.map((model) => (
//           <li key={model.id}>{model.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export async function getServerSideProps() {
//   try {
//     const response = await fetch(
//       'https://dashboard.lascade.com/travel_animator/v0/models/',
//       {
//         method: 'GET',
//         headers: {
//           'accept': 'application/json',
//           'X-CSRFTOKEN': process.env.NEXT_PUBLIC_CSRF_TOKEN, // Use an env variable
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`Error fetching models: ${response.statusText}`);
//     }

//     const models = await response.json();

//     return {
//       props: { models },
//     };
//   } catch (error) {
//     console.error('Failed to fetch models:', error);
//     return {
//       props: { models: [] }, // Return an empty array as a fallback
//     };
//   }
// }

// export default ModelsPage;

