// OpenAI
const { Configuration, OpenAIApi } = require('openai');

// configure
const configuration = new Configuration({
  apiKey: process.env.API_KEY
});

// api client instance
const openai = new OpenAIApi(configuration);

// generate img from text
const generateImg = async (req, res) => {
  try {
    const data = req.body;

    console.log(data);

    // size can be 256x256, 512x512, or 1024x1024
    let size = '1024x1024';

    if( data.size == 1 ) {
      size = '256x256';
    } else if( data.size == 2 ) {
      size = '512x512';
    }

    const image = await openai.createImage({
      prompt: data.prompt,
      n: 1, // number of generated images
      size: size,
    });

    const url = image.data.data[0].url; // get img url

    res.status(200).json({
      success: true,
      data: url
    });

  } catch (err) {
    console.log('Error: ', err);

    res.status(400).json({
      success: false,
      data: err
    });
  }
}

// general chat with text-davinci-003 model
const chatMsg = async(req, res) => {
  try {
    const data = req.body;

    console.log(data);

    const prompt = "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\n" + data.prompt;

    console.log('prompt', prompt)

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.6,
      n: 1, // number of completions
      stop: [" Human:", " AI:"],
    });

    console.log(response.data);

    const message = response.data.choices[0].text.trim();

    res.status(200).json({
      success: true,
      data: message
    });

  } catch (err) {
    console.log('Error: ', err);

    res.status(400).json({
      success: false,
      data: err
    });
  }
}

module.exports.chatMsg = chatMsg;
module.exports.generateImg = generateImg;