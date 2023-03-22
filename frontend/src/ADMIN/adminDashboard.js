import { useEffect,useState } from "react";
import {useNavigate} from "react-router-dom"
import Navbar from "../Components/Navbar"
import AdminSidebar from "../Components/AdminSidebar"
import {ProSidebarProvider} from "react-pro-sidebar"
const AdminDashboard = () => {
      const navigate = useNavigate()
      const [status, setStatus] = useState(() => {
            return JSON.parse(sessionStorage.getItem("showProfile"));
      })

      useEffect(() => {
            if (JSON.parse(sessionStorage.getItem("showProfile")) === false) {
                  navigate("/admin_log/")
            }
      }, [status])
      return ( 

            <div>
                  <Navbar />
                  <ProSidebarProvider>
                        <AdminSidebar />
                  </ProSidebarProvider>
            </div>
       );
}
 
export default AdminDashboard;