import axios from 'axios';



const API_KEY = process.env.REACT_APP_API_KEY;


export default async function Query2() {
  try {


    const userdata = "City: New York City Bio: I like to paint and computers Age: 12";
  
    const activityData = `
    Painting classes for kids in New York City
 Query: Painting classes for kids in New York City
 Title: Kids at Art - The Best Children's Art Classes in NYC - Kids at Art
 Link: https://www.kidsatartnyc.com/
 Description: Kids at Art offers art classes for kids ages 2 - 11, plus art classes for teens and adults too! Painting, drawing, sculpture, fashion design, ...
 
 
 Query: Art exhibitions for children in New York City
 Title: Children's Museum of the Arts
 Link: https://www.cmany.org/
 Description: CMA organizes free public art events that enable children to create, curate and exhibit their own artwork on an equal footing with their grown-up counterparts.
 
 
 Query: Computer workshops for kids in New York City
 Title: New York Coding Classes for Kids: Free Programs
 Link: https://www.create-learn.us/blog/new-york-coding-classes-for-kids/
 Description: We've curated a selection of top-tier New York City coding classes for kids, ranging from Cobble Hill, Tribeca, and Brooklyn to Manhattan, and beyond.
 
 
 Query: Coding classes for kids in New York City
 Title: Coding Classes for Kids in New York City | CodeWizardsHQ
 Link: https://www.codewizardshq.com/coding-classes-near-me/coding-classes-new-york-city/
 Description: No description available
 
 
 Query: Tech museums in New York City
 Title: Mercer Labs
 Link: https://mercerlabs.com/
 Description: Mercer Labs where culture and innovation converge with intention and art humanizes technology. The museum fosters this exchange among artists through ...
 
 
 Query: Art supplies stores in New York City
 Title: 6th Ave Art Store | New York City, NY
 Link: https://www.dickblick.com/stores/new-york/new-york-city-6th-ave/?srsltid=AfmBOooOr4JUZGvEXJ5BW-w-wRQ1O-kq1H5y8zon4qgJ54Abptn4PQkZ
 Description: Visit the New York BLICK store located in Midtown on 6th Ave and 20th St. Shop a wide assortment of art supplies, craft supplies, and unique gift items.
 
 
 Query: Kids friendly art galleries in New York City
 Title: Museums, Galleries & Exhibits for NYC Kids
 Link: https://mommypoppins.com/family/best-museums-and-exhibits-for-kids-in-nyc
 Description: The ultimate guide to the best museums, galleries and exhibits in NYC for kids - plus how to make your family visit run smoothly, and how to get in free.
 
 
 Query: Educational computer games events in New York City
 Title: NYC Summer of Games - MOME
 Link: https://www.nyc.gov/site/mome/industries/nyc-summer-of-games.page
 Description: NYC Summer of Games 2024 celebrates New York City's booming digital games community featuring marquee events, expos, tournaments, exhibits, workshops, and ...
 
 
 Query: Interactive tech exhibits for kids in New York City
 Title: Interactive Experiences - Kid On The Town
 Link: https://www.kidonthetown.com/pop-ups/
 Description: No description available
 
 
 Query: DIY painting activity in New York City
 Title: New York Shot of Art Studio - Painting Events, Location ...
 Link: https://www.shotofart.com/city/new-york
 Description: Unleash your artistic passion today with Shot of Art studio in New York City. Explore our unique art events, painting classes, adult & kids parties, prices, ...
 
 
 `;
 
 
    const prompt = `
    Generate an output in a JSON format using data from the user and the activities they are taking.  You are to rank the different links you find based on how likely the user is to take them. Use the user data given below to rank the different queries based on userdata and sort them into four categories 1. finding educational opportunities 2. work/internship / co-op opportunities 3 volunteering opportunities. 4. finding healthy food opportunities and food banks put them in JSON format based on the provided user data. sort this data and parse the output using the return format given below
    do not yap only give me the output in the return format listed
    
User Data: ${userdata}
Input data: ${activityData}

Return format:
{
  “Catagory 1” : [Name1,Description1,Link1]
  “Catagory 2” : [Name2,Description2,Link2],
  
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