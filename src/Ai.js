import axios from 'axios';



const API_KEY = process.env.REACT_APP_API_KEY;
console.log('API Key:', API_KEY);

export default async function Query(userdata) {

  userdata = userdata
  try {
     
    const userdata = `
    City: New York City
    Address: 919 3rd Ave, New York, NY 10022
    Bio: I like to paint and computers
    Age: 12
    `;
    

    const prompt = `Generate a list of say 2 for each category of Google search queries, please find 10 for each in these categories
    1. Search queries for finding educational opportunities for the person, 2. Search queries for finding wokr / internship / co-op opportunities for the person. 3. Search queries for
    finding volunteering opprtunities for the person. 4. Search queries for fidning healthy food opportunities and food banks for the person. put them in JSON format based on the provided user data. 
The queries should focus on activities and experiences within the user's city that match their interests and age. 
Ensure each query is specific to the city mentioned.

User Data: ${userdata}
Return format:
{
  "queries": [
    "query1",
    "query2",
    ...
  ]
}`;

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