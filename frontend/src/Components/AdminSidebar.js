import { Sidebar,Menu,MenuItem,useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import TeachingWorkload from "../ADMIN/Tables/teachingWorkload";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import AssessmentIcon from '@mui/icons-material/Assessment';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import BookIcon from '@mui/icons-material/Book';
import SchoolIcon from '@mui/icons-material/School';
import FeedbackIcon from '@mui/icons-material/Feedback';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import AltRouteIcon from '@mui/icons-material/AltRoute'; 
import InfoIcon from '@mui/icons-material/Info';
import PublicIcon from '@mui/icons-material/Public';
import Groups3Icon from '@mui/icons-material/Groups3';
import BusinessIcon from '@mui/icons-material/Business';
import ComputerIcon from '@mui/icons-material/Computer'; 
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import RuleIcon from '@mui/icons-material/Rule';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PersonalDetails from "../ADMIN/Tables/personal_details";
import PersonalDetailsShow from "../CONTEXT/PersonalDetailsShow"

const AdminSidebar = () => {
      const {collapseSidebar}=useProSidebar();
      const navigate=useNavigate();
      useEffect(() => {
            if (JSON.parse(localStorage.getItem("showProfile")) === false) {
                  navigate("/admin_log/")
            }
      }, [])

      const [personal_details,setPersonalDetails]=useState(false);

      return ( 
            <div style={{height:"100%"}}>
                  
                  <Sidebar className="side_container">
                        <Menu>
                              <MenuItem
                                    icon={<MenuOutlinedIcon />}
                                    onClick={()=>{
                                          collapseSidebar();
                                    }}
                                    style={{textAlign:"center"}}
                              >
                                    {/* <h2>Admin</h2> */}
                              </MenuItem>
                              
                              <MenuItem icon={<DashboardIcon />} onClick={() => navigate("/admin/adminDashboard")}>Dashboard</MenuItem>
                              <MenuItem icon={<HowToRegIcon  />} onClick={()=>navigate("/admin/registration_signUp_approval/")}>Approval Section</MenuItem>
                              <MenuItem icon={<NoteAltIcon/>} onClick={()=>navigate("/admin/assessmentSet/")}>Assessment Questions</MenuItem>
                              <MenuItem icon={<RuleIcon />} onClick={() => navigate("/admin/assessment/validation/")}>Assessment Validation</MenuItem>
                              <MenuItem icon={<BookIcon/>} onClick={() => { navigate("/admin/teaching_workload/")}}>Teaching Workload</MenuItem>
                              <MenuItem icon= {<SchoolIcon />} onClick={() => { navigate("/admin/teaching_learning_practices/")}}>Teaching Learning <br/>Practices</MenuItem>
                              <MenuItem icon={<FeedbackIcon/>} onClick={()=>{navigate("/admin/feedback/")}}>Student Feedback</MenuItem>
                              <MenuItem icon={<LocalLibraryIcon/>} onClick={()=>{navigate("/admin/selfLearning/")}}>Self Learning</MenuItem>
                              <MenuItem icon={<AltRouteIcon/>} onClick={()=>{navigate("/admin/projectGuidance/")}}>Project Guidance</MenuItem>
                              <MenuItem icon={<InfoIcon/>} onClick={()=>{setPersonalDetails(true)}}>User Details</MenuItem>
                              <MenuItem icon={<PublicIcon />} onClick={() => { navigate('/admin/paperInJournals/') }}>Paper Publications in <br /> Journals </MenuItem>
                              <MenuItem icon={<Groups3Icon />} onClick={() => { navigate("/admin/paperInConference/") }}>Paper Publications in <br /> Conferences</MenuItem>
                              <MenuItem icon={<BusinessIcon />} onClick={() => { navigate("/admin/contributionInstitution/") }}>Contribution to <br /> Institutions</MenuItem>
                              <MenuItem icon={<ComputerIcon />} onClick={() => { navigate("/admin/contributionDepartment/") }}>Contribution to <br /> Department</MenuItem>
                              <MenuItem icon={<EmojiEventsIcon/>} onClick={()=>{navigate("/admin/awards/")}}>Awards</MenuItem>
                              <MenuItem icon={<CheckCircleOutlineIcon />} onClick={() => { navigate("/admin/academic_results/") }}>Results</MenuItem>
                              <MenuItem icon={<LogoutIcon />} onClick={()=>{
                                    localStorage.setItem('showProfile', false);
                                    alert("THANK YOU")
                                    localStorage.setItem("name","");
                                    localStorage.setItem("academic_year","");
                                    navigate("/");
                              }}>Logout</MenuItem>

                              
                        </Menu>
                  </Sidebar>


                  

                  <PersonalDetailsShow.Provider value={{personal_details,setPersonalDetails}}>
                        {
                              personal_details && <PersonalDetails />
                        }
                  </PersonalDetailsShow.Provider>
            </div>
       );
}

export default AdminSidebar;