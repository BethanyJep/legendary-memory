// import openai
// import OpenAIAPI from "react-openai-api";

const openai = require('openai');
openai.apiType = 'azure';
openai.apiBase = process.env.REACT_APP_OPENAI_ENDPOINT;
openai.apiVersion = '2023-06-01-preview';
openai.apiKey = process.env.REACT_APP_API_KEY;

async function generateImage(prompt) {
  try {
    const response = await openai.CreateImageRequestSizeEnum({
      prompt: prompt,
      size: '1024x1024',
      n: 1,
    });

    const imageUrl = response.data.data[0].url;
    return imageUrl;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default generateImage;
// const prompt = 'a kitten sitting on grass';
// const imageUrl = await generateImage(prompt);
// console.log(imageUrl);
