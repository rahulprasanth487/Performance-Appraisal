import Navbar from "../Components/Navbar"
import DownArrow from './downarrow.js';
import { Grid } from "@mui/material";
import imge1 from '../Components/images/img11.jpg'
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';
import "../App.css"
import {Container,Row,Col} from "react-bootstrap";
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import { useNavigate } from "react-router-dom";
import StatusCheck from "../REGISTER/statusCheck";
import SignUpForm from "../REGISTER/signUpForm";
import { useState } from "react";
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';



const LandingPage=()=>{

      const navigate = useNavigate();
      const [temp, setTemp] = useState(false)
      const [temp2, setTemp2] = useState(false)
      const [open1, setOpen1] = React.useState(false);
      const [state, setState] = React.useState({
            top: false,
      });


      const handleClose1 = () => {
            setOpen1(false);
      };

      const [open2, setOpen2] = React.useState(false);

      const handleClose2 = () => {
            setOpen2(false);
      };

      const toggleDrawer = (anchor, open) => (event) => {
            if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
                  return;
            }

            setState({ ...state, [anchor]: open });
      };

      

      //CIRCULAR DETAILS
      const [circular, setCircular] = useState();

      const handleCircular = async (e) => {
            const response = await fetch("http://localhost:4000/api/user/collectionData/circulars");
            const data = await response.json();
            setCircular(data);
      }

      React.useEffect(() => {
            handleCircular();
      }, [])
      
      const list = (anchor) => (
            <Box
                  sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
                  role="presentation"
                  onClick={toggleDrawer(anchor, false)}
                  onKeyDown={toggleDrawer(anchor, false)}
            >

                  <br/>
                  <center>
                        <h1>CIRCULARS</h1>
                  </center>
                  
                  <Divider />
                  <List>
                        <Container>
                              <table className="table table-borderless table-hover">
                                    <tbody>
                                          {circular && circular.map((text) => (
                                                <tr style={{textAlign:"center"}}>
                                                      <td style={{ padding: "5px", fontSize: "18px" }}><i>
                                                            {
                                                                  (text.fileName !== "")?
                                                                        <a href={require("../uploads/" + text.fileName)} rel="noreferrer" target="_blank" style={{ textDecoration: "none" }}>
                                                                              {text.linkText}
                                                                              <b style={{ color: "red" }}>{"\t"}(Date : {text.date})</b>
                                                                        </a>
                                                                        :
                                                                        <td>
                                                                              <a rel="noreferrer" target="_blank" style={{ textDecoration: "none" }}>
                                                                                    {text.linkText}
                                                                                    <b style={{ color: "red" }}>{"\t"}(Date : {text.date})</b>
                                                                              </a>
                                                                        </td>
                                                            }
                                                            
                                                      </i></td>
                                                </tr>
                                          ))}
                                    </tbody>
                              </table>
                        </Container>

                  </List>
                  
            </Box>
      );




      return (
            <div className="App">
                  
                  <Navbar></Navbar>
                  <div className="header" >
                        <div className="heading" >
                              <h1>Welcome to performance appraisal</h1>
                              <h2>We evaluates the performance of working people.</h2>
                              <a href="#about" class="btn-get-started">Get Started</a>
                        </div>
                  </div>
                  <DownArrow></DownArrow>
                  <section>
                        <div className="container aos-init aos-animate" data-aos="fade-up" id="about">
                              <Grid container justifyContent="center" alignItems="center" direction='row-reverse'>
                                    <Grid item xs={6}>
                                          <div className="row about-container">
                                                <h2 className='title'>WHAT IS PERFORMANCE APPRAISAL ?</h2>
                                                <p className='ans'>Performance appraisal is the process of assessing and evaluating an employee's job performance over a given period of time, providing feedback on their strengths and areas for improvement, and using this information to make decisions about promotions, salary increases, and training and development opportunities. It can take various forms and criteria for evaluation may include job-specific goals, core competencies, and behavioral factors.</p>
                                          </div>
                                    </Grid>
                                    <Grid item xs={6}>
                                          <div className="sideimg">
                                                <img src={imge1} style={{ width: "70%", height: "40%", }} alt="" srcset="" />
                                          </div>
                                    </Grid>
                              </Grid>
                        </div>
                  </section>
                  <div className="options">


                        <br/> 
                        <Container>
                              <Row className="justify-content-center">

                                    <Col className="iconContainers" xs="6" md="6    " lg="2" onClick={toggleDrawer('top', true)}>
                                          <p className='texts'>
                                                <CampaignOutlinedIcon className='icons'></CampaignOutlinedIcon>
                                                <br />Announcements
                                          </p>
                                    </Col>


                                    <Col className="iconContainers" xs="6" md="6    " lg="2" onClick={()=>{
                                          setTemp(true)
                                          setTemp2(false)
                                    }}>
                                          <p className='texts'>
                                                <CampaignOutlinedIcon className='icons'></CampaignOutlinedIcon>
                                                <br />Check Status
                                          </p>
                                    </Col>
                                    <Col className="iconContainers" xs="6" md="6    " lg="2" onClick={()=>{
                                          navigate('/register/')
                                    }}>
                                          
                                          <p className='texts'>
                                                <Groups2OutlinedIcon className='icons'></Groups2OutlinedIcon>
                                                <br />New Register
                                          </p>
                                    </Col>
                                    <Col className="iconContainers" xs="6" md="6    " lg="2" onClick={()=>{
                                          navigate('/user/')
                                    }}>
                                          
                                          <p className='texts'>
                                                <ContactPageOutlinedIcon className='icons'></ContactPageOutlinedIcon>
                                                <br />Candidates Section
                                          </p>
                                    </Col>
                              </Row>

                              <Row className="justify-content-center">
                                    <Col className="iconContainers" xs="6" md="6    " lg="2" onClick={()=>{
                                          setOpen2(true);
                                    }}>
                                          <p className='texts'>
                                                <CampaignOutlinedIcon className='icons'></CampaignOutlinedIcon>
                                                <br />Check Results
                                          </p>
                                    </Col>


                                    <Col className="iconContainers" xs="6" md="6    " lg="2" onClick={()=>{
                                          setOpen1(true);
                                    }}>
                                          <p className='texts'>
                                                <AnalyticsOutlinedIcon className='icons'></AnalyticsOutlinedIcon>
                                                <br />Assessment Section
                                          </p>
                                    </Col>
                                    <Col className="iconContainers" xs="6" md="6    " lg="2" onClick={()=>{
                                          setTemp2(true)
                                          setTemp(false)
                                    }}>
                                          <p className='texts'>
                                                <PersonAddAltOutlinedIcon className='icons'></PersonAddAltOutlinedIcon>
                                                <br />Sign up
                                          </p>
                                    </Col>
                                    <Col className="iconContainers" xs="6" md="6    " lg="2" onClick={()=>{
                                          navigate('/admin_log/')
                                    }}>
                                          <p className='texts'>

                                                <NoteAltOutlinedIcon className='icons'></NoteAltOutlinedIcon>
                                                <br/>Admin Section
                                          </p>
                                    </Col>
                              </Row>
                        </Container>
                  </div>


                  {temp && <StatusCheck />}
                  {temp2 && <SignUpForm />}


                  <Dialog open={open1} onClose={handleClose1}>
                        <DialogTitle>EMAIL</DialogTitle>
                        <form onSubmit={(e)=>{
                              navigate("/user/assessmentWindow/");
                        }}>
                              <DialogContent>
                                    <DialogContentText>
                                          Enter the email which you have used during the registration to get into the assessment section.
                                    </DialogContentText>
                                    <TextField
                                          autoFocus
                                          margin="dense"
                                          id="name"
                                          label="Email Address"
                                          type="email"
                                          fullWidth
                                          variant="standard"
                                          required
                                          onChange={(e) => {
                                                localStorage.setItem("email", e.target.value);
                                          }
                                          }
                                    />
                              </DialogContent>
                              <DialogActions>
                                    <Button onClick={() => {
                                          handleClose1();
                                          window.location.reload();
                                    }}>Cancel</Button>
                                    <Button type="submit">NEXT</Button>
                              </DialogActions>
                        </form>
                  </Dialog>



                  <Dialog open={open2} onClose={handleClose2}>
                        <DialogTitle>EMAIL</DialogTitle>
                        <form onSubmit={() => {
                              navigate("/user/assessmentResults/");
                        }}>
                              <DialogContent>
                                    <DialogContentText>
                                          Enter the email which you have used during the registration tp view the results
                                    </DialogContentText>
                                    <TextField
                                          autoFocus
                                          margin="dense"
                                          id="name"
                                          label="Email Address"
                                          type="email"
                                          fullWidth
                                          variant="standard"
                                          required
                                          onChange={(e) => {
                                                localStorage.setItem("email", e.target.value);
                                          }
                                          }
                                    />
                              </DialogContent>
                              <DialogActions>
                                    <Button onClick={() => {
                                          handleClose2();
                                          window.location.reload();
                                    }}>Cancel</Button>
                                    <Button type="submit">NEXT</Button>
                              </DialogActions>
                        </form>
                  </Dialog>


                  {/* NOTIFICATION PANEL */}
                  <div>
                        {['top'].map((anchor) => (
                              <React.Fragment key={anchor}>
                                    <Drawer
                                          anchor={anchor}
                                          open={state[anchor]}
                                          onClose={toggleDrawer(anchor, false)}
                                    >
                                          {list(anchor)}
                                    </Drawer>
                              </React.Fragment>
                        ))}
                  </div>

            </div>
      );
}

export default LandingPage;
