import React, { useState } from 'react';
import analyzeImage from './azure-image-analysis';

function DisplayResults({ imageUrl, analysisResult }) {
  // const {captionResult} = analysisResult;
  
  return (
    <div>
      <h2>Results for </h2>
      <img src={imageUrl} alt="Analyzed" width="20%" />
      <h3>Image Caption</h3>
      <pre>{JSON.stringify(analysisResult, null, 2)}</pre>
    </div>
  );
}

function App() {
  const [imageUrl, setImageUrl] = useState('');
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleImageAnalysis = async () => {
    setIsLoading(true);
    try {
      const result = await analyzeImage(imageUrl);
      setAnalysisResult(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageGeneration = () => {
    // Code to trigger image generation
  };


  return (
    <div>
      <h1>Image Analysis and Generation</h1>
      <label>
        Image URL:
        <input type="text" value={imageUrl} onChange={handleImageUrlChange} />
      </label>
      <br />
      <label>
        Prompt:
        <input type="text" value={prompt} onChange={handlePromptChange} />
      </label>
      <br />
      <button onClick={handleImageAnalysis}>Analyze Image</button>
      <button onClick={handleImageGeneration}>Generate Image</button>
      {isLoading && <p>Processing...</p>}
      {analysisResult && (
        <DisplayResults imageUrl={imageUrl} analysisResult={analysisResult} />
      )}
    </div>
  );
}

export default App;