import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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


const UserSidebar = () => {
      const { collapseSidebar } = useProSidebar();
      const navigate = useNavigate();
      // useEffect(() => {
      //       if (JSON.parse(sessionStorage.getItem("showProfile")) === false) {
      //             navigate("/admin_log/")
      //       }
      // }, [])


      return (
            <div style={{ height: "100%" }}>

                  <Sidebar className="side_container">
                        <Menu>
                              <MenuItem
                                    icon={<MenuOutlinedIcon />}
                                    onClick={() => {
                                          collapseSidebar();
                                    }}
                                    style={{ textAlign: "center" }}
                              >
                                    {/* <h2>Admin</h2> */}
                              </MenuItem>

                              <MenuItem onClick={()=>{navigate("/user")}} icon={<DashboardIcon />}>Dashboard</MenuItem>
                              <MenuItem icon={<NoteAltIcon />}>Assessment</MenuItem>
                              <MenuItem onClick={() => { navigate("/user/teachingWorkLoad/")}} icon={<BookIcon />} >Teaching Workload</MenuItem>
                              <MenuItem icon={<SchoolIcon />} >Teaching Learning <br />Practices</MenuItem>
                              <MenuItem icon={<FeedbackIcon />}>Student Feedback</MenuItem>
                              <MenuItem icon={<LocalLibraryIcon />} >Self Learning</MenuItem>
                              <MenuItem icon={<AltRouteIcon />}>Project Guidance</MenuItem>
                              <MenuItem icon={<InfoIcon />}>Personal Details</MenuItem>
                              <MenuItem icon={<PublicIcon />}>Paper Publications in <br /> Journals </MenuItem>
                              <MenuItem icon={<Groups3Icon />}>Paper Publications in <br /> Conferences</MenuItem>
                              <MenuItem icon={<BusinessIcon />}>Contribution to <br /> Institutions</MenuItem>
                              <MenuItem icon={<ComputerIcon />} >Contribution to <br /> Department</MenuItem>
                              <MenuItem icon={<EmojiEventsIcon />}>Awards</MenuItem>
                              <MenuItem icon={<LogoutIcon />} onClick={() => {
                                    sessionStorage.setItem('UserLoginStatus', false);
                                    sessionStorage.setItem('email', "");
                                    alert("Bye")
                                    window.location.reload();
                              }}>Logout</MenuItem>


                        </Menu>
                  </Sidebar>
            </div>
      );
}

export default UserSidebar;