import React from 'react';

type Model = {
  name: string;
  model_glb: string;
  image?: string; 
};

type ModelsPageProps = {
  models: Model[];
};

const ModelsPage: React.FC<ModelsPageProps> = ({ models }) => {
  if (!models || models.length === 0) {
    return <p className="text-center">No models available.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Available Models</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {models.map((model, index) => (
          <li
            key={index}
            className="border rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200"
          >
            {/* Display model image */}
            <img
              src={model.image || 'https://via.placeholder.com/150'} // Placeholder if no image URL
              alt={model.name}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <p className="font-semibold text-lg mb-2">{model.name}</p>
            <a
              href={model.model_glb}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline hover:text-blue-700"
            >
              Download Model
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ModelsPage;
