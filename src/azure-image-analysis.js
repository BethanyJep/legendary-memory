async function analyzeImage(imageUrl) {
    const subscriptionKey = process.env.REACT_APP_SUBSCRIPTION_KEY;
    const endpoint = process.env.REACT_APP_ENDPOINT;

    console.log(`key = ${subscriptionKey}`)
    console.log(`endpoint = ${endpoint}`)
  
    // const visualFeatures = {
    //   features: 'caption',
    //   details: "",
    //   language: 'en',
    // };
  
    const response = await fetch(
      `${endpoint}/computervision/imageanalysis:analyze?features=caption,read&model-version=latest&language=en&api-version=2023-02-01-preview`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': subscriptionKey,
        },
        body: JSON.stringify({ url: imageUrl }),
      }
    );
  
    if (!response.ok) {
      throw new Error('Failed to analyze image');
    }
  
    const data = await response.json();
    return data;
  }
  
export default analyzeImage;