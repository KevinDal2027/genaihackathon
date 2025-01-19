import axios from "axios";
export const getPlannerData = async (tasks, hobbies) => {
  console.log({tasks: tasks}, {filteredHobbies: hobbies});
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
THE OBJECT SHOULD BE CALLED dailyPlan
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
  tasks.forEach(task => {
    prompt += `1)Task name: ${task.task}\n2)Priority level: ${task.priority}\n3)Stress level: ${task.stress}\n4)Due date: ${task.dueDate}\n\n`;
    index++;
  });
  console.log(prompt);
  return prompt;
}


const getHobbyPromptString = (hobbies) => {
  
  let prompt = "";
  let index = 1;
  hobbies.hobbies.forEach(hobby => {
    prompt += `${index}) ${hobby.hobbyName}\n`
    index++;
  });
  console.log(prompt);
  return prompt;
}


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
