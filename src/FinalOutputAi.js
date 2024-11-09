import axios from 'axios';


const API_KEY = process.env.REACT_API_KEY

export default async function Query() {
  try {
    const userdata = `
    City: New York City
    Bio: I like to paint and computers
    Age: 12
    `;

    const prompt = `You are a model that will generate a list of keywords to search in google according to the user data. The user data will include things the users are interested in the city they are in and their age. Your job is to query a search query in google to find relevant experiences they are interested in in order to find activities. The activities must be within the city they are in .


    ${userdata}
    `;

    // Call the GPT API with the prompt
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 4000, // Adjust based on the reduced data size
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    // Extract and return the response
    if (response.data.choices && response.data.choices.length > 0) {
      return response.data.choices[0].message.content.trim();
    } else {
      throw new Error('Unexpected response structure');
    }
  } catch (error) {

    console.error('Error generating response:', error);
    return 'Error generating your response.';
  }
}