const request = require('request');

async function generateImage(prompt) {
  try {
    // Get Azure Image Generation service settings
    const apiBase = process.env.REACT_APP_OPENAI_ENDPOINT;
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    const apiVersion = '2023-06-30-preview';

    // Make the API call to generate the image
    const url = `${apiBase}openai/images/generations:submit?api-version=${apiVersion}`;
    const headers = { "Ocp-Apim-Subscription-Key": apiKey, "Content-Type": "application/json" };
    const body = {
        prompt: prompt,
        size: "512x512",
        n: 1
    };
    const response = await new Promise((resolve, reject) => {
      request.post({ url: url, headers: headers, json: body }, (error, response, body) => {
        if (error) {
          reject(error);
        } else if (response.statusCode !== 202) {
          reject(`Failed to submit job: ${response.statusCode} ${response.statusMessage}`);
        } else {
          resolve(response);
        }
      });
    });

    // Get the operation-location URL for the callback
    const operationLocation = response.headers['operation-location'];

    // Poll the callback URL until the job has succeeded
    let status = "";
    while (status !== "succeeded") {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const response = await new Promise((resolve, reject) => {
        request.get({ url: operationLocation, headers: headers, json: true }, (error, response, body) => {
          if (error) {
            reject(error);
          } else if (response.statusCode !== 200) {
            reject(`Failed to poll job status: ${response.statusCode} ${response.statusMessage}`);
          } else {
            resolve(response);
          }
        });
      });
      status = response.body.status;
    }

    // Get the URL of the generated image
    const imageUrl = response.body.result.data[0].url;

    return imageUrl;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default generateImage;