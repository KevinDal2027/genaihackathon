# ClearCal AI - Your Intelligent Time Management Companion

## Overview
ClearCal AI is an advanced time management solution that combines artificial intelligence with calendar integration to help users manage their time more effectively while reducing stress. Our platform leverages the latest AI technologies to create personalized, optimized schedules that adapt to your needs and priorities.

## Motivation
In today's fast-paced world, effective time management is crucial for maintaining productivity and mental well-being. As university students, we recognized the common challenges of managing multiple responsibilities while maintaining a healthy work-life balance. ClearCal AI was born from the need to create a more intelligent and adaptive approach to time management that could help individuals:

- Save time through automated task management
- Reduce stress through optimized scheduling
- Maintain focus on priorities
- Stay organized across multiple commitments

## Key Features

### AI-Powered Task Management
- Intelligent task generation and prioritization
- Automated subtask creation and action planning
- Natural language processing for hands-free interaction

### Seamless Integration
- Real-time Google Calendar synchronization
- Automatic event updates and adjustments
- Cross-platform compatibility

### User-Centric Design
- Voice-enabled interaction for hands-free use
- Personalized scheduling based on user preferences
- Stress-aware task distribution

## Technical Implementation

### Architecture
- Frontend: React 18 with Vite
- Build Tool: Vite with React Plugin
- UI Framework: Custom CSS with Framer Motion for animations
- API Integration: Google Calendar API
- Authentication: OAuth2 with Google Calendar
- State Management: React Hooks (useState)

### Core Components
- `App.jsx`: Main application component managing state
- `TasksSurvey`: Task management interface
- `HobbiesSurvey`: Hobby tracking with categorization
- `DayPlanner`: Main planning interface
- `CreateDayPlanner`: Day planning creation interface

### Authentication Flow
- OAuth2 authentication with Google Calendar
- Token persistence using `token.json`
- Credentials management through `credentials.json`

### Data Management
- State management using React's useState
- Categorized hobby tracking (Harmful, Reasonable, Excellent)
- Task management with properties:
  - Task description
  - Due date
  - Stress level
  - Priority level

### Challenges Overcome
- Implementing OAuth2 authentication flow
- Managing state across multiple components
- Creating a responsive and user-friendly interface
- Integrating with Google Calendar API
- Ensuring data privacy and security
- Managing complex state transitions between components

### Technical Dependencies
```json
{
  "dependencies": {
    "axios": "^1.7.9",
    "framer-motion": "^11.18.1",
    "googleapis": "^144.0.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-icons": "^5.4.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "vite": "^6.0.5",
    "vite-plugin-svgr": "^4.3.0"
  }
}
```

## Getting Started

### Prerequisites
- Node.js and npm installed
- Google Calendar account
- Internet connection

### Installation
```bash
git clone https://github.com/KevinDal2027/genaihackathon
cd mentalhealth-ai
npm install
npm run dev
```

## Future Enhancements
- Advanced weekly and monthly scheduling
- User behavior pattern analysis
- Integration with additional calendar platforms
- Enhanced stress pattern analysis
- Expanded AI capabilities

## Learning Outcomes
During the development of ClearCal AI, we gained valuable experience in:
- Advanced prompt engineering
- Team collaboration and project management
- Modern web development practices
- API integration and optimization
- Data handling and processing

## Contributing
We welcome contributions from the community. Please feel free to submit issues and pull requests.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements
- Google Gemini API team
- React community
- Open-source contributors

## Contact
For questions or feedback, please contact us through the GitHub repository issues page.
