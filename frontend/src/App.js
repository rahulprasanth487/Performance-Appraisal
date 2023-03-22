import './App.css';
import './admin.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AdminDashboard from './ADMIN/adminDashboard';
import AdminMain from './ADMIN/AdminMain';
import TeachingWorkload from './ADMIN/Tables/teachingWorkload';
import TeachingLearningPractices from './ADMIN/Tables/teachingLearningPractices';
import SelfLearning from './ADMIN/Tables/selfLearning';
import ProjectGuidance from './ADMIN/Tables/projectGuidance';
import PaperInJournals from './ADMIN/Tables/paperPublicationsJournal';
import PaperInConferences from './ADMIN/Tables/paperPublicationsConference';
import ContributionInstitution from './ADMIN/Tables/contributionInstitution';
import ContributionDepartment from './ADMIN/Tables/contributionDepartment';
import Awards from './ADMIN/Tables/awards';
import StudentsFeedback from './ADMIN/Tables/studentFeedback';
import AssessmentQuestions from './Assessment/assessmentQuestions';
import RegistrationSignUpApproval from './ADMIN/Approval/registration_signup_approval';

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <AdminLoginStatus.Provider value={{ adminStatus,setadminStatus }}> */}
            <Route path='/admin_log' element={<AdminMain />} />
          {/* </AdminLoginStatus.Provider> */}
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/admin/teaching_workload/" element={<TeachingWorkload />} />
          <Route path="/admin/teaching_learning_practices/" element={<TeachingLearningPractices />}/>
          <Route path="/admin/selfLearning/" element={<SelfLearning />}/>
          <Route path="/admin/projectGuidance/" element={<ProjectGuidance />}/>
          <Route path='/admin/paperInJournals/' element={<PaperInJournals />}/>
          <Route path="/admin/paperInConference/" element={<PaperInConferences />}/>
          <Route path="/admin/contributionInstitution/" element={<ContributionInstitution />}/>
          <Route path="/admin/contributionDepartment/" element={<ContributionDepartment/>}/>
          <Route path="/admin/awards/" element={<Awards />}/>
          <Route path="/admin/feedback/" element={<StudentsFeedback />} />
          <Route path="/admin/assessmentSet/" element={<AssessmentQuestions />}/>
          <Route path="/admin/registration_signUp_approval/" element={<RegistrationSignUpApproval />}/>

        </Routes>
      </BrowserRouter>
    </div>
    
    
  );
}

export default App;