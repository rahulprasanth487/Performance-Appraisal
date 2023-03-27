import Navbar from "../Components/Navbar"
import LoggedInUser from "../CONTEXT/LoggedInUser";
import { useState, useContext, useEffect } from "react";
import { Container,Row,Col } from "react-bootstrap";
import { ProSidebarProvider } from "react-pro-sidebar"
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UserSidebar from "./userSidebar";
import {Typography,AppBar,Toolbar,TextField,Button,Box,Dialog,ListItemText,ListItem,List,Divider,IconButton,Slide} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from '@mui/icons-material/Close';
import * as React from 'react';


const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
});



const UserTeachingWorkload = (props) => {
      useEffect(() => {
            if ((JSON.parse(sessionStorage.getItem("UserLoginStatus")) === "false") || (JSON.parse(sessionStorage.getItem("UserLoginStatus")) === null)) {

                  navigate("/user")
            }
      }, [])

      const [name, setName] = useState()
      const navigate = useNavigate()
      const loggedUser = useContext(LoggedInUser);
      const [temp1, setTemp1] = useState(1)
      const [temp2, setTemp2] = useState(1)
      const [data, setData] = useState()
      const [dataEntryStatus, setDataEntryStatus] = useState()
      const [buttonStatus, setButtonStatus] = useState("false")
      const [year,setYear]=useState()

      //FOR MUI
      const [open, setOpen] = React.useState(false);
      const handleClickOpen = () => {
            setOpen(true);
      };

      const handleClose = () => {
            setOpen(false);
      };


      


       //FETCHING THE CONTENTS FROM THE DATA STATUS TABLE
      


      const fetchData = async () => {
            const response = await fetch("http://localhost:4000/api/stafflist/")
            const tempoData = await response.json()
            setData(tempoData.filter((item) => item.email === sessionStorage.getItem("email")))
            // console.log(data)
            setTemp2(Math.random())
      }

      useEffect(() => {
            fetchData();
      }, [temp1])


      const fetchAcademicYearStatus = async () => {
            const response = await fetch("http://localhost:4000/api/user/collectionData/data_entry_status");
            const tempData = await response.json();
            setDataEntryStatus(tempData);
            // console.log(tempData)
      }
      useEffect(() => { fetchAcademicYearStatus() }, [temp1])

     

      
      //fetching the data from the teaching workload table
      const [teachingData, setTeachingData] = useState()
      const fetchTeachingWorkloadData = async (yr) => {
            // console.log("fetching teaching workload data")
            setYear(yr)
            const obj={}
            obj.name=data[0].name;
            obj.year=yr;
            console.log(obj)
            // const response = await fetch("http://localhost:4000/api/teachingWorkload/" + data[0].name);
            const response = await fetch("http://localhost:4000/api/user/teachingData/",{
            //POST request to send the object in the request body
            method:"POST",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify(obj)
            })
            const tempData = await response.json();
            setTeachingData(tempData);
            // console.log(teachingData)
      }

      // useEffect(() => {fetchTeachingWorkloadData() }, [temp2])

      
      
      //FILTER THE CONTENT FOR ACADEMIC YEAR
      const [yearFiltered,setYearFiltered]=useState();

      // const handleFilter=()=>{
      //       setYearFiltered(teachingData.filter((item) => item.academic_year ===year))
      //       console.log(yearFiltered)
      // // }

      return (
            <>
                  <Navbar />
                  {
                        data && <>
                              <div style={{ display: "flex" }}>
                                    <div className="Cont1">
                                          <ProSidebarProvider>
                                                <UserSidebar />
                                          </ProSidebarProvider>
                                    </div>
                                    <Container>
                                          <center><h1>TEACHING WORKLOAD</h1></center>
                                          <>
                                                {/* SELETING THE ACADEMIC YEAR */}
                                                <Row style={{ width: "50%" }}>
                                                      <Col lg={6}><label>ACADEMIC YEAR : </label></Col>
                                                      <Col lg={6} >
                                                            <select style={{ width: "100%", padding: 5 }} onInput={(e) => { 
                                                                  setButtonStatus(e.target.value);
                                                                  setYear(e.target.options[e.target.selectedIndex].text);
                                                                  
                                                                  fetchTeachingWorkloadData(e.target.options[e.target.selectedIndex].text)
                                                                  
                                                            }
                                                                  
                                                            }>
                                                                  <option></option>
                                                                  {
                                                                        dataEntryStatus && dataEntryStatus.map((item) => {
                                                                              return <option value={item.add_button}>{item.academicYear}</option>
                                                                        })
                                                                  }
                                                            </select>
                                                      </Col>
                                                </Row>
                                                <br/><br/>
                                                
                                                {/* {console.log(teachingData)} */}

                                                <div className="table-responsive-md">
                                                      <table className="table table-bordered table-striped">
                                                            <thead className="thead-dark">
                                                                  <tr>
                                                                        <th scope="col">Academic year</th>
                                                                        <th scope="col">Year</th>
                                                                        <th scope="col">Semester</th>
                                                                        <th scope="col">Branch</th>
                                                                        <th scope="col">Subjects</th>
                                                                        <th scope="col">Total_students</th>
                                                                        <th scope="col">credits</th>
                                                                  </tr>
                                                            </thead>
                                                            <tbody>
                                                                  {

                                                                        teachingData && (teachingData).map((m,index) => (
                                                                              <tr>

                                                                                    <td>{m.academic_year}</td>
                                                                                    <td>{m.year}</td>
                                                                                    <td>{m.semester}</td>
                                                                                    <td>{m.branch}</td>
                                                                                    <td>{m.subject}</td>
                                                                                    <td>{m.total_students}</td>
                                                                                    <td>{m.credits}</td>

                                                                              </tr>)
                                                                        )
                                                                  }
                                                            </tbody>
                                                      </table>
                                                </div>
                                                {(buttonStatus==="true")  && <div style={{paddingRight:"10%" }}>
                                                      <button className="btn btn-success float-end" onClick={handleClickOpen}>ADD RECORD</button>
                                                </div>}
                                          </>



                                          {/* ADD FORM */}
                                          <div className="add_form">

                                                {/* POP UP FORM */}
                                                <div>

                                                      <Dialog
                                                            fullScreen
                                                            open={open}
                                                            onClose={handleClose}
                                                            TransitionComponent={Transition}
                                                      >
                                                            <AppBar sx={{ position: 'relative' }}>
                                                                  <Toolbar>
                                                                        <IconButton
                                                                              edge="start"
                                                                              color="inherit"
                                                                              onClick={handleClose}
                                                                              aria-label="close"
                                                                        >
                                                                              <CloseIcon />
                                                                        </IconButton>
                                                                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                                                              ADD THE DATA
                                                                        </Typography>
                                                                        <Button autoFocus color="inherit" onClick={handleClose} style={{ background:"rgb(0, 146, 250)",cursor:"pointer"}}>
                                                                              ADD
                                                                        </Button>
                                                                  </Toolbar>
                                                            </AppBar>
                                                            <List>
                                                                  <center>
                                                                        <toolbar>
                                                                              <h1>ADD DATA </h1>
                                                                        </toolbar>
                                                                        <Typography variant="h5">(Note:Enter the data carefully)</Typography>
                                                                  </center>

                                                                  <form>
                                                                        <TextField
                                                                              style={{ width: "100%", margin: "5px" }}
                                                                              type="text"
                                                                              label="setgoal"
                                                                              variant="outlined"
                                                                        />
                                                                        <br />
                                                                        <TextField
                                                                              style={{ width: "100%", margin: "5px" }}
                                                                              type="text"
                                                                              label="goal description"
                                                                              variant="outlined"
                                                                        />
                                                                        <br />
                                                                        <TextField
                                                                              style={{ width: "100%", margin: "5px" }}
                                                                              type="text"
                                                                              label="Diversity catagory"
                                                                              variant="outlined"
                                                                        />
                                                                        <br />
                                                                        <TextField
                                                                              style={{ width: "100%", margin: "5px" }}
                                                                              type="text"
                                                                              label="Attribute"
                                                                              variant="outlined"
                                                                        />
                                                                        <br />
                                                                        <TextField
                                                                              style={{ width: "100%", margin: "5px" }}
                                                                              type="text"
                                                                              label="goal stage"
                                                                              variant="outlined"
                                                                        />
                                                                        <br />
                                                                        <TextField
                                                                              style={{ width: "100%", margin: "5px" }}
                                                                              type="number"
                                                                              label="job id"
                                                                              variant="outlined"
                                                                        />
                                                                        <br />
                                                                        <TextField
                                                                              style={{ width: "100%", margin: "5px" }}
                                                                              type="text"
                                                                              label="job region"
                                                                              variant="outlined"
                                                                        />
                                                                        <br />
                                                                  </form>
                                                            </List>
                                                      </Dialog>
                                                </div>
                                          </div>

                                    </Container>
                              </div>
                        </>
                  }


            </>
      );
}



export default UserTeachingWorkload;