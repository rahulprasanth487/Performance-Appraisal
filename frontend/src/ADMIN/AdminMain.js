import { useState, useEffect } from "react";
import AdminDashboard from "./adminDashboard";
import AdminHomeLogin from "./AdminHomeLogin";
import AdminLoginStatus from "../CONTEXT/AdminLoginStatus";

const AdminMain = () => {

      console.log("Value on local storage = ",JSON.parse(localStorage.getItem("showProfile")));
      const [showProfile,setShowProfile]=useState(()=>{
            const user = localStorage.getItem("showProfile");
            console.log("Page")
            return JSON.parse(user) || null;
      })


      return ( 
            <div className="Admin_container">
                  {console.log(showProfile)}
                  <AdminLoginStatus.Provider value={{ showProfile, setShowProfile }}>
                        {showProfile ? <AdminDashboard /> : <AdminHomeLogin /> }
                 </AdminLoginStatus.Provider>
            </div>
       );
}
 
export default AdminMain;