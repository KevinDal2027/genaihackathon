import axios from "axios";
import calendarData from '../assets/googlecalendar.json';

export const getTasksFromGemini = async (text) => {
  try {
    const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${
        import.meta.env.VITE_API_KEY
      }`,
      {
        contents: [
          {
            parts: [
              {
                text: `You are a productivity and wellness assistant. Your goal is to help users reduce stress by creating a daily action plan that balances their priorities and includes stress-reducing activities. 

                      The user has provided the following information about their tasks for the day:

                      ${text}

                      This is the current date and time, make sure to build the schedule around it: ${new Date().toLocaleString()}

                      I also have this on my google calendar for the day:

                      ${JSON.stringify(calendarData, null, 2)}

                      Generate a daily action plan with:  
                      - A prioritized task list including suggested times to work on each task, with breaks and stress-relief activities.  

                      Return your response in a JSON object with the following format:
                      {
                        "tasks": [
                          {
                            {
                              "task_name": "Hackathon web application",
                              "priority": "High",
                              "stress": "5",
                              "time": "9:00 AM - 12:00 PM"
                              "type": "Work"
                            },
                            {
                              "task_name": "Play the Guitar",
                              "priority": "None",
                              "stress": "0",
                              "time": "1:00 PM - 2:00 PM"
                              "type": "Relax"
                            }
                          }
                        ]
                      }
                      `,
              },
            ],
          },
        ],
      }
    );
    const raw_response = res.data.candidates[0].content.parts[0].text;
    const cleaned_response = raw_response
      .replace("```json", "")
      .replace("```", "")
      .trim();
    const result = JSON.parse(cleaned_response);
    console.log(result);
    
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const getActionPlan = async (task) => {
  try {
    const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${
        import.meta.env.VITE_API_KEY
      }`,
      {
        contents: [
          {
            parts: [
              {
                text: `
                      You are an AI assistant specializing in productivity and stress management. 
                      Your goal is to create a detailed and actionable plan to help the user complete a task efficiently while minimizing stress.
                      Here is the task provided by the user:
                      - Task Name: ${task.task_name}
                      - Priority: ${task.priority}
                      - Stress Level: ${task.stress} (on a scale of 1 to 5)
                      - Time: ${task.time}

                      Format the response as follows:
                      {
                        "task_name": "Hackathon web application",
                        "steps": [
                          { "step": 1, "description": "Review the project requirements and set clear goals", "estimated_time": "30m" },
                          { "step": 2, "description": "Create a basic wireframe or design outline for the application", "estimated_time": "45m" },
                          { "step": 3, "description": "Start coding the main functionality of the application", "estimated_time": "90m" }
                        ],
                        "resources/tools": [
                          "Figma for wireframing",
                          "VS Code for development"
                        ]
                      }
                      `,
              },
            ],
          },
        ],
      }
    );
    const raw_response = res.data.candidates[0].content.parts[0].text;
    const cleaned_response = raw_response
      .replace("```json", "")
      .replace("```", "")
      .trim();
    const result = JSON.parse(cleaned_response);
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }

}

let timeNow = Date.now();

export const getPlannerData = async (tasks, hobbies) => {
  console.log({ tasks: tasks }, { filteredHobbies: hobbies });
  try {
    const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${
        import.meta.env.VITE_API_KEY
      }`,
      {
        contents: [
          {
            parts: [
              {
                text: `
I am working on a stress-management day-planner app that uses generative AI to help university students. Upon opening the app, the app will ask what tasks are stressing the person out. The task will be in this format:

1) Task name
2) Task priority
3) Is it a long term or short term task
4) Stress level (1 - 5) the task causes

Users can add multiple tasks. Then the app will ask for activities that help the user de-stress.
All of these responses will be fed to a generative AI. The AI will come up with a day-plan that the user can follow.
The response will contain the planner in a JSON format like this:
THE OBJECT SHOULD BE CALLED dailyPlan. Also time at this moment is ${timeNow}
{
    {
        "activityName": "",
        "startTime": ...,
        "endTime": ...
    },
    {
        "activityName": "",
        "startTime": ...,
        "endTime": ...
    }
}
If something is a long-term task, the response will contain a planner that has that task for about 20-30 minutes a day.
Throughout the day, the user can cross off tasks as "done". Or if they're feeling really stressed, they can let the app know, and it can re-structure the day-plan so that they can de-stress with a de-stress activity before they continue working. The re-structured day-plan will also be generated by AI.
You are the AI that will help with the day-planning. You need to provide a schedule so that tasks indicated with high stress levels are followed up by relaxation periods and tasks indicated with high priority or closer due dates are prioritized first.
Do not add hobbies or tasks of your own! Do not include the date in the schedule, only time.
You will be given to-do tasks in this format:
Tasks:
1) Activity Name
2) Priority Level (1 - 5) (1 being the lowest and 5 being the highest)
3) Stress level (1 - 5) (1 being the lowest and 5 being the highest)
4) If it is a short term task, you will be given a due date. If it is a long term task, you will be given an expected date

Then, you will be given the hobbies in this format:
Hobbies:
1) Hobby name
You should also make sure that the hobbies aren't harmful (like smoking, drinking etc) You can provide alternate activities based on other non-harmful activities provided.

IMPORTANT: Your responses should ONLY contain JSON objects. DO NOT INCLUDE ANY OTHER TEXT IN YOUR RESPONSE.

Here's a sample response you might get:

Tasks:
${getPromptString(tasks)}


Hobbies:
${getHobbyPromptString(hobbies)}
`,
              },
            ],
          },
        ],
      }
    );
    const raw_response = res.data.candidates[0].content.parts[0].text;
    const cleaned_response = raw_response
      .replace("```json", "")
      .replace("```", "")
      .trim();
    const result = JSON.parse(cleaned_response);
    return result;
  } catch (error) {
    console.error(error);
  }
};

const getPromptString = (tasks) => {
  let prompt = "";
  let index = 1;
  tasks.forEach((task) => {
    prompt += `1)Task name: ${task.task}\n2)Priority level: ${task.priority}\n3)Stress level: ${task.stress}\n4)Due date: ${task.dueDate}\n\n`;
    index++;
  });
  console.log(prompt);
  return prompt;
};

const getHobbyPromptString = (hobbies) => {
  let prompt = "";
  let index = 1;
  hobbies.hobbies.forEach((hobby) => {
    prompt += `${index}) ${hobby.hobbyName}\n`;
    index++;
  });
  console.log(prompt);
  return prompt;
};

export const getHobbiesData = (hobbies, setFilteredHobbies) => {
  if (hobbies.length === 0) {
    alert("Please add at least one hobby before submitting.");
    return;
  }

  const hobbyNames = hobbies.map((h) => h.name).join("\n");

  axios
    .post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${
        import.meta.env.VITE_API_KEY
      }`,
      {
        contents: [
          {
            parts: [
              {
                text: `I will give you a list of hobbies in this format:

Hobbies:

1) Hobby 1

2) Hobby 2

3) Hobby 3

etc...


Your task is to return an array object in the form:


{
  [
    {

        "hobbyName":"..."

    }

    {

        "hobbyName":"..."

    }

    {

        "hobbyName":"..."

    }
        
    ...
  ]

}


If there are any harmful activities the user inputs, you should replace them with non-harmful activities in your response that are maybe related to the other non-harmful activities the user provided.


IMPORTANT: Your response should ONLY contain a JSON object. DO NOT INCLUDE ANY OTHER TEXT IN YOUR RESPONSE


Here's the hobbies:

${hobbyNames}
`,
              },
            ],
          },
        ],
      }
    )
    .then((res) => {
      console.log("API Response:", res.data);
      const raw_response = res.data.candidates[0].content.parts[0].text;
      const cleaned_response = raw_response
        .replace("```json", "")
        .replace("```", "")
        .trim();
      const result = JSON.parse(cleaned_response);
      setFilteredHobbies(result);
    })
    .catch((err) => {
      console.error("Error categorizing hobbies:", err);
      alert(
        "There was an error processing your request. Please try again later."
      );
    });
};
