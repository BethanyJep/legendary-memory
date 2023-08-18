import React, { useState } from 'react';
import analyzeImage from './azure-image-analysis';
import generateImage from './azure-image-generation';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';

function DisplayResults({ imageUrl, analysisResult, generatedImageUrl }) {
  const { captionResult } = analysisResult;

  return (
    <Container>
      <Row>
        <Col>
          <h2>Results for {imageUrl}</h2>
          <img src={imageUrl} alt="Analyzed" className="img-thumbnail" />
        </Col>
        <Col>
          <h3>Image Caption</h3>
          <pre>{JSON.stringify(captionResult, null, 2)}</pre>
          {generatedImageUrl && (
            <div>
              <h3>Generated Image</h3>
              <img src={generatedImageUrl} alt="Generated" className="img-thumbnail" />
              <p>Generated Image URL: {generatedImageUrl}</p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

function App() {
  const [url, setUrl] = useState('');
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState(null);

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleImageAnalysis = async () => {
    setIsLoading(true);
    try {
      const result = await analyzeImage(url);
      setAnalysisResult(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageGeneration = async () => {
    setIsLoading(true);
    try {
      const result = await generateImage(prompt);
      setGeneratedImageUrl(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <h1 className="mt-3 mb-5">Image Analysis and Generation</h1>
      <Form>
        <Form.Group controlId="imageUrl">
          <Form.Label>Image URL:</Form.Label>
          <Form.Control type="text" value={url} onChange={handleUrlChange} />
        </Form.Group>
        <Form.Group controlId="prompt">
          <Form.Label>Prompt:</Form.Label>
          <Form.Control type="text" value={prompt} onChange={handlePromptChange} />
        </Form.Group>
        <Button variant="primary" onClick={handleImageAnalysis} disabled={isLoading}>
          Analyze Image
        </Button>{' '}
        <Button variant="primary" onClick={handleImageGeneration} disabled={isLoading}>
          Generate Image
        </Button>
        {isLoading && <Spinner animation="border" className="ml-3" />}
      </Form>
      {analysisResult && (
        <DisplayResults
          imageUrl={url}
          analysisResult={analysisResult}
          generatedImageUrl={generatedImageUrl}
        />
      )}
    </Container>
  );
}

export default App;