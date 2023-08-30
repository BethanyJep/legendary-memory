const request = require('request');

async function generateImage(prompt) {
  try {
    // Get Azure Image Generation service settings
    const apiBase = process.env.REACT_APP_OPENAI_ENDPOINT;
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    const apiVersion = process.env.REACT_APP_OPENAI_API_VERSION;

    // Define the prompt for the image generation
    const url = `${apiBase}openai/images/generations:submit?api-version=${apiVersion}`;
    const headers = { "api-key": apiKey, "Content-Type": "application/json" };
    const body = {
      "prompt": prompt,
      "size": "1024x1024",
      "n": 1
    };
    const submission = await new Promise((resolve, reject) => {
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

    // Call the API to generate the image and retrieve the response
    let operationLocation = submission.headers['operation-location'];
    let data = {};
    let response;
    let status = "";
    while (status !== "succeeded") {
      response = await fetch(operationLocation, {
        method: 'GET',
        headers: headers
      });
      data = await response.json();
      status = data.status;
    }

    // Get the URL of the generated image
    const imageUrl = data.result.data;
    console.log(`imageUrl = ${imageUrl}`);

    return {"prompt": prompt, "URL": imageUrl[0].url};

  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default generateImage;