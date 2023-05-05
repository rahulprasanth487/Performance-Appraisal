import './admin.css';
import './user.css'
import LandingPage from './LANDING PAGE/LandingPage';
import { BrowserRouter, Routes, Route } from "react-router-dom"
//admin files
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
import RegistrationSignUpApproval from './ADMIN/Approval/registration_signup_approval';
import AcademicResults from './ADMIN/Tables/results';

//user files
import UserLogin from './USER/UserLogin';
import UserDashboard from './USER/UserDashboard';
import UserTeachingWorkload from './USER/TABLES/userTeachingWorkload';
import UserTeachingLearningPractices from './USER/TABLES/userTeachingLearningPractices';
import UserStudentFeedback from './USER/TABLES/userStudentFeedback';
import UserSelfLearning from './USER/TABLES/userSelfLearning';
import UserProjectGuidance from './USER/TABLES/userProjectGuidance';
import UserPaperInJournals from './USER/TABLES/userPaperInJournals';
import UserPaperInConferences from './USER/TABLES/userPaperInConferences';
import UserContributionInstitution from './USER/TABLES/userContributionInstitution';
import UserContributionDepartment from './USER/TABLES/userContributionDepartment';
import UserAwards from './USER/TABLES/userAwards';
import UserResults from './USER/TABLES/userResults';
//Assessment
import AssessmentQuestions from './Assessment/assessmentQuestions';
import UserAssessment from './Assessment/userAssessment';
import AssessmentWindow from './Assessment/assessmentWindow';
import AdminAssessValidation from './Assessment/adminAssessValidation';
import AssessmentResults from './Assessment/assessmentResults';

//REGISTRATION
import NewRegisterForm from './REGISTER/newRegisterForm';


function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />

          {/* //admin ROUTES */}
          {/* <AdminLoginStatus.Provider value={{ adminStatus,setadminStatus }}> */}
            <Route path='/admin_log' element={<AdminMain />} />
          {/* </AdminLoginStatus.Provider> */}
          <Route path="/admin/adminDashboard" element={<AdminDashboard />} />
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
          <Route path="/admin/assessment/validation/" element={<AdminAssessValidation />} />
          <Route path="/admin/registration_signUp_approval/" element={<RegistrationSignUpApproval />}/>
          <Route path="/admin/academic_results/" element={<AcademicResults />} />
          {/* //USER ROUTES */}
          <Route path='/user/' element={<UserLogin />} />
          <Route path='/user/teachingWorkLoad/' element={<UserTeachingWorkload />} />
          <Route path='/user/teachingLearningPractices/' element={<UserTeachingLearningPractices />} />
          <Route path='/user/studentFeedback/' element={<UserStudentFeedback />} />
          <Route path='/user/selfLearning/' element={<UserSelfLearning />} />
          <Route path='/user/projectGuidance/' element={<UserProjectGuidance />} />
          <Route path='/user/paperInJournals/' element={<UserPaperInJournals />} />
          <Route path='/user/paperInConferences/' element={<UserPaperInConferences />} />
          <Route path='/user/contributionInstitution/' element={<UserContributionInstitution />} />
          <Route path='/user/contributionDepartment/' element={<UserContributionDepartment />} />
          <Route path='/user/awards/' element={<UserAwards />} />
          <Route path='/user/results/' element={<UserResults />} />

          {/* ASSESSMENT */}
          <Route path='/user/assessment/' element={<UserAssessment />} />
          <Route path="/user/assessmentWindow/" element={<AssessmentWindow />} />
          <Route path="/user/assessmentResults/" element={<AssessmentResults />} />

          {/* REGISTRATION */}
          <Route path='/register/' element={<NewRegisterForm />} />

          

          

        </Routes>
      </BrowserRouter>
    </div>
    
    
  );
}

export default App;