import Navbar from "../../Components/Navbar"
import { useState, useContext, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ProSidebarProvider } from "react-pro-sidebar"
import { useNavigate } from "react-router-dom";
import UserSidebar from "../userSidebar";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandCircleDownTwoToneIcon from '@mui/icons-material/ExpandCircleDownTwoTone';
import warning from "../../Components/images/warning-66.png"


const UserResults = () => {
      const navigate=useNavigate();
      const [tableData,setTableData]=useState();

      useEffect(() => {
            if ((JSON.parse(localStorage.getItem("UserLoginStatus")) === "false") || (JSON.parse(localStorage.getItem("UserLoginStatus")) === null)) {

                  navigate("/user")
            }
      }, [])

      const handleFetchMarksData=async ()=>{
            const response=await fetch("http://localhost:4000/api/user/collectionData/marks");
            const data=await response.json();
            setTableData(data);
      }
      useEffect(() => {
            handleFetchMarksData();
      }, [])

      return ( 
            <>
                  <Navbar />

                  <div style={{ display: "flex" }}>
                        <div className="Cont1">
                              <ProSidebarProvider>
                                    <UserSidebar />
                              </ProSidebarProvider>
                        </div>
                        <Container>
                              <hr />
                              <center><h1>RESULTS</h1></center>
                              <hr />
                        
                              <div>
                                    
                                    {
                                          tableData && tableData.map((item,index)=>(
                                                (item.email == localStorage.getItem("email")) && 
                                                <Accordion sx={{mb:4}} key={index}>
                                                      <AccordionSummary
                                                            expandIcon={<ExpandCircleDownTwoToneIcon style={{color:"white",fontSize:30}}/>}
                                                            aria-controls="panel1a-content"
                                                            id="panel1a-header"
                                                            style={{ backgroundColor:"black",borderRadius:"10px",color:"white"}}
                                                      >
                                                            <Typography>{item.academic_year}</Typography>
                                                      </AccordionSummary>
                                                      <AccordionDetails>
                                                            <Typography>

                                                                  {
                                                                        (item.published=="true")?
                                                                        (
                                                                              <>
                                                                                    <table className="table table-responsive">
                                                                                          <thead>
                                                                                                <tr>
                                                                                                      <th>TABLE</th>
                                                                                                      <th>MARKS</th>
                                                                                                </tr>
                                                                                          </thead>
                                                                                          <tbody>
                                                                                                {
                                                                                                      item && (Object.keys(item)).map(i => (
                                                                                                            !(i == "name" || i == "name" || i == "email" || i == "totMarks" || i == "academic_year" || i == "_id" || i == "published" || i == "grade") && (
                                                                                                                  <tr>
                                                                                                                        <td>{i}</td>
                                                                                                                        <td>{item[i]}</td>
                                                                                                                  </tr>
                                                                                                            )
                                                                                                      ))
                                                                                                }
                                                                                          </tbody>
                                                                                    </table>
                                                                                    <center>
                                                                                          <h4>TOTAL MARKS = '{item.totMarks}'</h4>
                                                                                    </center>
                                                                                    <center>
                                                                                          {/* <h4>GRADE= '{(Object.values(totMarks).length != 0) && totMarks.item["email"].grade}'</h4> */}
                                                                                          <h4>GRADE = '{item.grade}'</h4>
                                                                                    </center>
                                                                                    <br />
                                                                              </>
                                                                        ):
                                                                        (
                                                                              <>
                                                                                    <center>
                                                                                                <img src={warning} alt="NOT FOUND" width={"100vw"} height={"100vw"} />
                                                                                                <h4><i>RESULTS ARE NOT ANNOUNCED YET</i></h4>
                                                                                    </center>
                                                                              </>
                                                                        )
                                                                  }
                                                                  

                                                            </Typography>
                                                      </AccordionDetails>
                                                </Accordion>


                                          ))
                                    }

                                    <br/><br/>
                              </div>
                              
                        </Container>
                  </div>
            </>
       );
}
 
export default UserResults;