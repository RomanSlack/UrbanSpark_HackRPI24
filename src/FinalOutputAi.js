import axios from 'axios';



const API_KEY = process.env.REACT_APP_API_KEY;


export default async function Query() {

  //userdata = userdata
    const userdata = `City: Washington
    Address: 1002 fairmont st nw
    Bio: I like computer science and the gym
    Age: 19
    `;
  try {
    const activityData = `{
      "Educational Programs": [
        {
          "title": "Washington Computer Science Education Initiative",
          "description": "Explore various computer science courses for students and professionals in Washington.",
          "link": "https://dummy-website.com/cs-education-washington"
        },
        {
          "title": "Youth Fitness Training for Beginners",
          "description": "A fitness program designed for 19-year-olds looking to improve their physical health.",
          "link": "https://dummy-website.com/youth-fitness-washington"
        },
        {
          "title": "Intro to Computer Science Workshop Series",
          "description": "A series of workshops for individuals looking to start a career in computer science.",
          "link": "https://dummy-website.com/cs-workshops-washington"
        },
        {
          "title": "Healthy Cooking Classes in Washington",
          "description": "Classes focused on teaching the basics of healthy cooking with locally sourced ingredients.",
          "link": "https://dummy-website.com/healthy-cooking-classes"
        }
      ],
      "Internships": [
        {
          "title": "Washington Tech Computer Science Internships",
          "description": "Various internships in the computer science field tailored for students and recent graduates.",
          "link": "https://dummy-website.com/cs-internships-washington"
        },
        {
          "title": "Fitness Instructor Internship for Youth",
          "description": "A gym internship opportunity aimed at aspiring fitness instructors in Washington.",
          "link": "https://dummy-website.com/fitness-internship-youth"
        },
        {
          "title": "Health and Fitness Summer Internship",
          "description": "A summer internship opportunity at a gym for young adults passionate about fitness.",
          "link": "https://dummy-website.com/summer-fitness-internship"
        },
        {
          "title": "Tech Innovators Computer Science Internship",
          "description": "An internship program offering real-world experience in computer science for young tech enthusiasts.",
          "link": "https://dummy-website.com/tech-innovators-cs-internship"
        }
      ],
      "Volunteering Opportunities": [
        {
          "title": "Washington CS Volunteer Network",
          "description": "Join local computer science professionals in various community-oriented volunteer projects.",
          "link": "https://dummy-website.com/cs-volunteer-washington"
        },
        {
          "title": "Community Health and Fitness Volunteering",
          "description": "Assist in local fitness centers and help the community with health and wellness initiatives.",
          "link": "https://dummy-website.com/fitness-volunteer-washington"
        },
        {
          "title": "Food Banks Volunteer Network",
          "description": "Volunteer at Washington food banks and support those in need with your time and service.",
          "link": "https://dummy-website.com/food-bank-volunteer"
        },
        {
          "title": "Washington Tech for Good Volunteering",
          "description": "Volunteer in tech events and help organize computer science workshops across Washington.",
          "link": "https://dummy-website.com/tech-volunteer-washington"
        }
      ],
      "Co-op Opportunities": [
        {
          "title": "Washington CS Student Co-ops",
          "description": "A range of co-op opportunities for computer science students in tech companies across Washington.",
          "link": "https://dummy-website.com/cs-coop-washington"
        },
        {
          "title": "Youth Gym Instructor Co-op Program",
          "description": "A co-op program for young individuals passionate about becoming gym instructors.",
          "link": "https://dummy-website.com/gym-coop-washington"
        },
        {
          "title": "Health and Wellness Co-ops in Washington",
          "description": "Participate in co-op programs focused on health and fitness in community centers.",
          "link": "https://dummy-website.com/health-coop-washington"
        },
        {
          "title": "Tech Innovators Co-op for CS Students",
          "description": "A co-op program offering hands-on experience in computer science for university students.",
          "link": "https://dummy-website.com/tech-coop-cs-students"
        }
      ]
    }
    
    
    `;
     

    const prompt = `
    Generate an output in a JSON format using data from the user and the activities they are taking.  You are to rank the different links you find based on how likely the user is to take them. Use the user data given below to rank the different queries based on userdata and sort them into four categories 1. finding educational opportunities 2. work/internship / co-op opportunities 3 volunteering opportunities. 4. finding healthy food opportunities and food banks put them in JSON format based on the provided user data. sort this data and parse the output using the return format given below
    do not yap only give me the output in the return format listed
    
User Data: ${userdata}
Input data: ${activityData}

Return format:
{
  “Catagory 1” : {Link1:Description1,Link2 Description 2 },
  “Catagory 2” : {Link1:Description1,Link2 Description 2 },
  
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