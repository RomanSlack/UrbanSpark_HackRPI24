import axios from 'axios';



const API_KEY = process.env.REACT_APP_API_KEY;


export default async function Query2(userdata,activityData) {
  try {


 
    const prompt = `
    Generate an output in a JSON format using data from the user and the activities they are taking.  You are to rank the different links you find based on how likely the user is to take them. Use the user data given below to rank the different queries based on userdata and sort them into four categories 1. finding educational opportunities 2. work/internship / co-op opportunities 3 volunteering opportunities. 4. finding healthy food opportunities and food banks put them in JSON format based on the provided user data. sort this data and parse the output using the return format given below
    do not yap only give me the output in the return format listed
    
User Data: ${userdata}
Input data: ${activityData}

Return format where you would replace Catagory with the four different catagories I have provided 
:
{
  “finding educational opportunities” : [[Name1,Description1,Link1], [Name2,Description2,Link2]]
  “ work/internship / co-op opportunities” : [[Name1,Description1,Link1], [Name2,Description2,Link2]]
  “volunteering opportunities” : [[Name1,Description1,Link1], [Name2,Description2,Link2]]
  “finding healthy food opportunities” : [[Name1,Description1,Link1], [Name2,Description2,Link2]]
  

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