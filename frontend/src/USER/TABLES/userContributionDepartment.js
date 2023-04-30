import Navbar from "../../Components/Navbar"
import LoggedInUser from "../../CONTEXT/LoggedInUser";
import { useState, useContext, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ProSidebarProvider } from "react-pro-sidebar"
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UserSidebar from "../userSidebar";
import { Typography, AppBar, Toolbar, TextField, Button, Stack, Snackbar, Box, Dialog, ListItemText, ListItem, List, Divider, IconButton, Slide } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from '@mui/icons-material/Close';
import * as React from 'react';
import { red } from "@mui/material/colors";
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
});

const Alert = React.forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const UserContributionDepartment = (props) => {
      useEffect(() => {
            if ((JSON.parse(localStorage.getItem("UserLoginStatus")) === "false") || (JSON.parse(localStorage.getItem("UserLoginStatus")) === null)) {

                  navigate("/user")
            }
      }, [])

      const [total_marks, setTotalMarks] = useState(0);
      const [name, setName] = useState()
      const navigate = useNavigate()
      const loggedUser = useContext(LoggedInUser);
      const [temp1, setTemp1] = useState(1)
      const [temp2, setTemp2] = useState(1)
      const [data, setData] = useState()
      const [dataEntryStatus, setDataEntryStatus] = useState()
      const [buttonStatus, setButtonStatus] = useState("false")
      const [year, setYear] = useState()

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
            await fetch("http://localhost:4000/api/stafflist/")
                  // const tempoData = await response.json()
                  .then(res => {
                        if (!res.ok) { throw Error("Error in the code"); }
                        return res.json()
                  })
                  .then(data2 => { setData(data2.filter((item) => item.email === localStorage.getItem("email"))) })
            // setData(data.filter((item) => item.email === localStorage.getItem("email")))
            setName(data[0].name)
            setTemp2(Math.random())
      }

      useEffect(() => {
            fetchData();
      }, [temp1])


      const fetchAcademicYearStatus = async () => {
            await fetch("http://localhost:4000/api/user/collectionData/data_entry_status")
                  // const tempData = await response.json();
                  .then(res => {
                        if (!res.ok) { throw Error("Error in the code"); };
                        return res.json()
                  })
                  .then(data => { setDataEntryStatus(data) })
            // setDataEntryStatus(tempData);
      }
      useEffect(() => { fetchAcademicYearStatus() }, [temp1])




      //fetching the data from the table with filters as name and year
      const [TableData, setTableData] = useState()
      const [tempoFetch, setTempoFetch] = useState(1)
      const fetchDataWithFilter = async (yr) => {
            setYear(yr)
            const obj = {}
            obj.name = data[0].name;
            obj.year = yr;
            fetch("http://localhost:4000/api/user/data/contribution_to_departments", {
                  //POST request to send the object in the request body
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify(obj)
            })
                  // const tempData = await response.json();
                  .then(res => {
                        if (!res.ok) { throw Error("Error in the code"); };
                        return res.json()
                  })
                  .then(data => { setTableData(data) })
            //setTableData(tempData);
            TableData.year = yr;
            // console.log(TableData)
      }

      useEffect(() => { fetchDataWithFilter(year) }, [tempoFetch])




      //CALCULATING THE TOTAL MARKS
      var marks = TableData && ((TableData).reduce((total, currItem) => total = total + parseInt(currItem.marks), 0));

      //FORM CONTENT
      const [formContent, setFormContent] = useState(
            {
                  "academic_year": "",
                  "name": "",
                  "details": "",
                  "dept_clg_univ": "",
                  "type": "",
                  "period": "",
                  "marks": ""
            }
      )


      const [open2, setOpen2] = React.useState(false);

      const handleClick2 = () => {
            setOpen2(true);
      };

      const handleClose2 = (event, reason) => {
            if (reason === 'clickaway') {
                  return;
            }

            setOpen2(false);
      };

      const [open3, setOpen3] = React.useState(false);

      const handleClick3 = () => {
            setOpen3(true);
      };

      const handleClose3 = (event, reason) => {
            if (reason === 'clickaway') {
                  return;
            }

            setOpen3(false);
      };



      //PUSH THE DATA
      const handleAdd = async (e) => {
            if (formContent.details == "" || formContent.dept_clg_univ == "" || formContent.type == "" || formContent.period == "") {
                  // alert("ENTER ALL THE DETAILS")
                  handleClick2()
            }
            else {
                  marks_details.name = data[0].name;
                  marks_details.email = data[0].email;
                  marks_details.academic_year = year
                  formContent.academic_year = year
                  formContent.name = data[0].name
                  if (window.confirm("CHECK THE DETAILS:\nOK to submit\nCANCEL to edit")) {
                        setOpen(false);

                        formContent.marks = "1";

                        await fetch("http://localhost:4000/api/user/pushData/contribution_to_departments", {
                              method: "POST",
                              headers: {
                                    "Content-Type": "application/json",
                              },
                              body: JSON.stringify(formContent)
                        })
                              .then(res => {

                                    if (!res.ok) { throw Error("Error in the code"); }
                                    else {
                                          handleMarkDetails();
                                          setTempoFetch(Math.random())
                                          handleClick3()
                                    }
                                    return res.json()
                              })

                  }
            }
            setTempoFetch(Math.random())
      }


      //HANDLING MARKS
      //MARK DETAILS UPLOAD
      const [marks_details, setMarksDetails] = useState(
            {
                  "academic_year": "",
                  "name": "",
                  "email": "",
                  "table_name": "contribution_to_departments",
                  "max_marks": "15"
            }
      )

      const handleMarkDetails = async () => {
            marks_details.name = data[0].name;
            marks_details.email = data[0].email;
            marks_details.academic_year = year
            formContent.academic_year = year
            formContent.name = data[0].name


            await fetch("http://localhost:4000/api/user/pushData/marks_details/", {
                  method: "PATCH",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify(marks_details)
            })
      }




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
                                          <hr/>
                                          <center><h1>CONTRIBUTION TO DEPARTMENT</h1></center>
                                          {/* <h2>CREDITS : {marks} </h2> */}
                                          <hr />
                                          <>
                                                {/* SELETING THE ACADEMIC YEAR */}
                                                <Row style={{ width: "50%" }}>
                                                      <Col lg={6}><label>ACADEMIC YEAR : </label></Col>
                                                      <Col lg={6} >
                                                            <select style={{ width: "100%", padding: 5 }} onInput={(e) => {
                                                                  setButtonStatus(e.target.value);
                                                                  setYear(e.target.options[e.target.selectedIndex].text);

                                                                  fetchDataWithFilter(e.target.options[e.target.selectedIndex].text)

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
                                                <br /><br />

                                                {/* {console.log(TableData)} */}

                                                <div className="table-responsive-md">
                                                      <table className="table table-bordered table-striped">
                                                            <thead className="thead-dark">
                                                                  <tr>
                                                                        <th scope="col">Academic year</th>
                                                                        <th scope="col">Details of the activity</th>
                                                                        <th scope="col">Type of the activity</th>
                                                                        <th scope="col">Period</th>
                                                                        <th scope="col">Dept/College/Univ Level</th>
                                                                  </tr>
                                                            </thead>
                                                            <tbody>

                                                                  {
                                                                        TableData && (TableData).map((m, index) => (

                                                                              <tr>
                                                                                    <td>{m.academic_year}</td>
                                                                                    <td>{m.details}</td>
                                                                                    <td>{m.type}</td>
                                                                                    <td>{m.period}</td>
                                                                                    <td>{m.dept_clg_univ}</td>
                                                                              </tr>

                                                                        )
                                                                        )
                                                                  }
                                                            </tbody>
                                                      </table>
                                                </div>
                                                {(buttonStatus === "true") && <div style={{ paddingRight: "7%" }}>
                                                      <button className="btn btn-success float-end" onClick={handleClickOpen}>ADD RECORD</button>
                                                </div>}
                                                <br />
                                                <br />
                                                {/* {(buttonStatus === "true") && <div style={{ paddingRight: "7%" }}>
                                                      <button className="btn btn-danger float-end" >LOCK</button>
                                                </div>} */}
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
                                                                        <Button autoFocus color="inherit" onClick={() => { handleAdd() }} style={{ background: "rgb(0, 146, 250)", cursor: "pointer" }}>
                                                                              ADD
                                                                        </Button>
                                                                  </Toolbar>
                                                            </AppBar>
                                                            <List>
                                                                  <center>
                                                                        <toolbar>
                                                                              <h1>ADD DATA </h1>
                                                                        </toolbar>
                                                                        <Typography variant="h5">(Note:In previous semester only)</Typography>
                                                                  </center>
                                                                  <form>

                                                                        <TextField
                                                                              style={{ width: "100%", margin: "5px" }}
                                                                              type="text"
                                                                              label="ACADEMIC YEAR"
                                                                              variant="outlined"
                                                                              defaultValue={year}
                                                                              disabled
                                                                        />
                                                                        <br />
                                                                        <TextField
                                                                              style={{ width: "100%", margin: "5px" }}
                                                                              type="text"
                                                                              label="NAME"
                                                                              variant="outlined"
                                                                              defaultValue={data[0].name}
                                                                              disabled
                                                                        />
                                                                        <br />
                                                                        <TextField
                                                                              style={{ width: "100%", margin: "5px" }}
                                                                              type="text"
                                                                              label="DETAILS OF THE ACTIVITY"
                                                                              variant="outlined"
                                                                              onInput={(e) => { formContent.details = e.target.value }}
                                                                        />
                                                                        <br />
                                                                        <TextField
                                                                              style={{ width: "100%", margin: "5px" }}
                                                                              type="text"
                                                                              label="DEPT/CLG/UNIV LEVEL"
                                                                              variant="outlined"
                                                                              onInput={(e) => { formContent.dept_clg_univ = e.target.value }}
                                                                        />
                                                                        <br />
                                                                        <TextField
                                                                              style={{ width: "100%", margin: "5px" }}
                                                                              type="text"
                                                                              label="TYPE OF THE ACTIVITY (NAAC/NBA/NIRF/...)"
                                                                              variant="outlined"
                                                                              onInput={(e) => { formContent.type = e.target.value }}
                                                                        />
                                                                        <br />
                                                                        <TextField
                                                                              style={{ width: "100%", margin: "5px" }}
                                                                              type="text"
                                                                              label="PERIOD"
                                                                              variant="outlined"
                                                                              onInput={(e) => { formContent.period = e.target.value }}
                                                                        />
                                                                        <br />
                                                                  </form>
                                                            </List>
                                                      </Dialog>

                                                      <Snackbar open={open2} autoHideDuration={3000} onClose={handleClose2}>
                                                            <Alert onClose={handleClose2} severity="error" sx={{ width: '100%' }}>
                                                                  Enter all the details
                                                            </Alert>
                                                      </Snackbar>

                                                      <Snackbar open={open3} autoHideDuration={1000} onClose={handleClose3}>
                                                            <Alert onClose={handleClose3} severity="success" sx={{ width: '100%' }}>
                                                                  Added Successfully!!
                                                            </Alert>
                                                      </Snackbar>
                                                </div>
                                          </div>

                                    </Container>
                              </div>
                        </>
                  }


            </>
      );
}



export default UserContributionDepartment;