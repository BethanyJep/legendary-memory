// const request = require('request');


async function generateImage(prompt){
    // Get Azure Image Generation service settings
    const apiBase = process.env.REACT_APP_OPENAI_ENDPOINT;
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    const apiVersion = '2023-06-30-preview';

    // Make the API call to generate the image
    const url = `${apiBase}/openai/images/generations:submit?api-version=${apiVersion}`;
    const headers = { "Ocp-Apim-Subscription-Key": apiKey, "Content-Type": "application/json" };
    const body = {
        prompt: prompt,
        size: "512x512",
        n: 1
    };

    const response = await fetch(
      url,
      {
        method: 'POST',
        headers: headers,
        body: body,
      }
    );
  
    if (!response.ok) {
      throw new Error('Failed to generate image');
    }


    // Get the URL of the generated image
    const imageUrl = response.body.result.data[0].url;

    return imageUrl;
  }

export default generateImage;