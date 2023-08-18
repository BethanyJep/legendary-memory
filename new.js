
const openai = require('openai');
openai.apiType = 'azure';
openai.apiBase = process.env.REACT_APP_OPENAI_ENDPOINT;
openai.apiVersion = '2023-06-01-preview';
openai.apiKey = process.env.REACT_APP_API_KEY;


const response = await openai.createImage({
    prompt: "a white siamese cat",
    n: 1,
    size: "1024x1024",
  });
  
  image_url = response.data.data[0].url;