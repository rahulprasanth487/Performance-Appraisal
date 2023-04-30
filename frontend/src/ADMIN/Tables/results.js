import { useState,useEffect } from "react";
import Navbar from "../../Components/Navbar"
import AdminSidebar from "../../Components/AdminSidebar";
import { ProSidebarProvider } from "react-pro-sidebar"
import { Container,Row,Col } from "react-bootstrap";
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const AcademicResults = () => {

      const [academicYears,setAcademicYears]=useState([]);
      const [selectedYear,setSelectedYear]=useState();
      const [staffDetails,setStaffDetails]=useState([]);

      const [expanded, setExpanded] = React.useState(false);
      const [totMarks,setTotMarks]=useState({});

      const [open, setOpen] = React.useState(false);

      const navigate = useNavigate()
      const [status, setStatus] = useState(() => {
            return JSON.parse(localStorage.getItem("showProfile"));
      })

      useEffect(() => {
            if (JSON.parse(localStorage.getItem("showProfile")) === false || JSON.parse(localStorage.getItem("showProfile")) == null) {
                  navigate("/admin_log/")
            }
      }, [status])

      const handleClose = (event, reason) => {
            if (reason === 'clickaway') {
                  return;
            }

            setOpen(false);
      };

      const handleChangeShowData = (panel,item) => (event, isExpanded) => {
            setExpanded(isExpanded ? panel : false);
            let temp=0,grade="";
            
            (Object.keys(item)).map(i=>(
                  !(i=="name" || i=="name" || i=="email" || i=="totMarks" || i=="academic_year" || i=="_id" || i=="published" || i=="grade") && (
                        temp = temp +parseInt(item[i])
                  )
            ))

            //GRADING
            if(temp>=81)
            {
                  grade="A";
            }
            else if (temp >= 61 && temp <=80) {
                  grade = "B";
            }
            else if (temp >= 51 && temp <= 60) {
                  grade = "C";
            }
            else{
                  grade="Not Satisfactory";
            }

            totMarks[item["email"]]={"marks":temp,"grade":grade};
            
            
      };


      const FetchInitialDetails=async ()=>{

            const response2 = await fetch("http://localhost:4000/api/user/collectionData/data_entry_status");
            const data2 = await response2.json();
            setAcademicYears(data2)
      }

      useEffect(() => { FetchInitialDetails()},[])

      const handleStaffFetch=async (e)=>{
            e.preventDefault();
            const response = await fetch("http://localhost:4000/api/admin/results/details/"+selectedYear);
            const data=await response.json();
            setStaffDetails(data);
      }


      const handlePublish=async (email)=>{
            console.log(email)
            if(window.confirm("Do you want to PUBLISH?"))
            {
                  const response = await fetch("http://localhost:4000/api/admin/results/publish/" + selectedYear, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                              "published": "true",
                              "grade": totMarks[email].grade,
                              "totMarks": totMarks[email].marks,
                              "email": email
                        })
                  });
                  const data = await response.json();
                  setOpen(true);
                  handleStaffFetch();
                  
            }

      }

      return ( 
            <>
                  <Navbar />
                  <div className="teach_workload">

                        <div className="Cont1">
                              <ProSidebarProvider>
                                    <AdminSidebar />
                              </ProSidebarProvider>
                        </div>

                        <Container>
                              <div className="Cont2">
                                    <h1 style={{ textAlign: "center" }}>ACADEMIC RESULTS</h1>
                                    <form onSubmit={handleStaffFetch}>
                                          <br/>
                                          <div>
                                                <Box sx={{ minWidth: 120 }}>
                                                      
                                                      <label><i>(Note:**Only locked academic years are displayed)</i></label>
                                                      <FormControl fullWidth sx={{marginTop:"10px",marginBottom:2}}>
                                                            <InputLabel id="demo-simple-select-label">ACADEMIC YEAR</InputLabel>
                                                            <Select
                                                                  labelId="demo-simple-select-label"
                                                                  id="demo-simple-select"
                                                                  label="ACADEMIC YEAR"
                                                                  required
                                                                  onChange={(e)=>{setSelectedYear(e.target.value)}}
                                                            >
                                                                  {
                                                                        (academicYears) && (academicYears).map((item) => (
                                                                              (item.add_button=="true") && <MenuItem value={item.academicYear}>{item.academicYear}</MenuItem>
                                                                        ))
                                                                  }
                                                            </Select>
                                                      </FormControl>
                                                </Box>

                                          </div>

                                          <center>
                                                <button type="submit" className="btn btn-primary">FETCH</button>
                                          </center>
                                    </form>


                                    <br/><br/>
                                    {/*  ------------ACCORDION----------------------------- */}
                                    <div>
                                          

                                          {
                                                (staffDetails) && (staffDetails).map(item => (
                                                      <Accordion sx={{ marginBottom: 2 }} expanded={expanded === 'panel'+item.email} onChange={handleChangeShowData('panel'+item.email,item)}>
                                                            <AccordionSummary
                                                                  expandIcon={<ExpandMoreIcon />}
                                                                  aria-controls="panel1bh-content"
                                                                  id="panel1bh-header"
                                                            >
                                                                  <Typography sx={{ width: '40%', flexShrink: 0 }}>
                                                                        {item.name}
                                                                  </Typography>
                                                                  <Typography >
                                                                        {item.email}
                                                                  </Typography>
                                                                  {/* {console.log(totMarks)} */}
                                                            </AccordionSummary>
                                                            <AccordionDetails>
                                                                  <Typography>
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
                                                                                                     !(i=="name" || i=="name" || i=="email" || i=="totMarks" || i=="academic_year" || i=="_id" || i=="published" || i=="grade") && (
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
                                                                              <h4>TOTAL MARKS = '{
                                                                                    (totMarks[item.email] !==undefined ) ? (totMarks[item.email].marks) : <></>
                                                                              }'</h4>
                                                                        </center>

                                                                        <center>
                                                                              {/* <h4>GRADE= '{(Object.values(totMarks).length != 0) && totMarks.item["email"].grade}'</h4> */}
                                                                              <h4>GRADE = '{
                                                                                    (totMarks[item.email] !== undefined) ? (totMarks[item.email].grade) : <></>
                                                                              }'</h4>
                                                                        </center>
                                                                        <br/>
                                                                        <center>
                                                                              {
                                                                                    (item.published === undefined || item.published === "false") ?
                                                                                          <button onClick={()=>{handlePublish(item.email)}} className="btn btn-outline-primary">PUBLISH</button> :
                                                                                          <button onClick={()=>{handlePublish(item.email)}} className="btn btn-outline-danger">REPUBLISH</button>
                                                                              }
                                                                        </center>
                                                                  </Typography>
                                                            </AccordionDetails>
                                                      </Accordion>
                                                ))
                                          }

                                    </div>
                                    {/* -------------------------------------------- */}
                              </div>
                        </Container>

                  </div>

                  <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                              Results Published Successfully
                        </Alert>
                  </Snackbar>
            </>
       );
}
 
export default AcademicResults;