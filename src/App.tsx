import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./Layout/Layout"
import Dashboard from "./EducationDigitalTwin/Dashboard/Dashboard"
import Finance from "./EducationDigitalTwin/Finance/Finance"
import PhysicalTwin from "./EducationDigitalTwin/PhysicalTwin/PhysicalTwin"
import AgenticAI from "./EducationDigitalTwin/AgenticAI/AgenticAI"
import LogMonitor from "./EducationDigitalTwin/LogMonitor/LogMonitor"
import Students from "./EducationDigitalTwin/Students/Students"
import CoursesClasses from "./EducationDigitalTwin/CoursesClasses/CoursesClasses"
import FacultyStaff from "./EducationDigitalTwin/FacultyStaff/FacultyStaff"
import AIAnalytics from "./EducationDigitalTwin/AIAnalytics/AIAnalytics"
import Academics from "./EducationDigitalTwin/Academics/Academics"
import Operations from "./EducationDigitalTwin/Operations/Operations"
import PersonalTutor from "./EducationDigitalTwin/PersonalTutor/PersonalTutor"
import AIContentStudio from "./EducationDigitalTwin/AIContentStudio/AIContentStudio"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/agentic-ai" element={<AgenticAI />} />
            <Route path="/log-monitor" element={<LogMonitor />} />
            <Route path="/ai-analytics" element={<AIAnalytics />} />
            <Route path="/personal-tutor" element={<PersonalTutor />} />
            <Route path="/ai-content-studio" element={<AIContentStudio />} />
            {/* <Route path="/profile" element={<Profile />} /> */}
             <Route path="/students" element={<Students />} />
            <Route path="/courses-classes" element={<CoursesClasses />} />
             <Route path="/faculty-staff" element={<FacultyStaff />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/operations" element={<Operations />} />
            <Route path="/physical-twin" element={<PhysicalTwin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
