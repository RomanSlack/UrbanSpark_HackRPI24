import axios from 'axios';



const API_KEY = process.env.REACT_APP_API_KEY;


export default async function Query(userdata) {
  console.log("this is the user data")


  try {

    

    const prompt = `Generate a list of 1 query for each category of Google search queries, please find 1 query for each in these categories
    1. Search queries for finding educational opportunities for the person, 2. Search queries for finding work / internship / co-op opportunities for the person. 3. Search queries for
    finding volunteering opprtunities for the person. 4. Search queries for   fidning healthy food opportunities and food banks for the person. put them in JSON format based on the provided user data. 
The queries should focus on activities and experiences within the user's city that match their interests and age. 
Ensure each query is specific to the city mentioned. use the user data to create the queries


this is data from the user: 
${JSON.stringify(userdata)}

Only return JSON without any introductory text or explanation.
This is the return format for the queries generate data in exactly this format: 
Return format:
{ queries:
  [
    "query1",
    "query2",
    ...
  ]
}
`;
//console.log(prompt);
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
      console.log(response.data.choices[0].message.content.trim())
      return response.data.choices[0].message.content.trim();
    } else {
      throw new Error('Unexpected response structure');
    }
  } catch (error) {

    console.error('Error generating response:', error);
    return 'Error generating your response.';
  }
}