import Navbar from "../../Components/Navbar";
import { ProSidebarProvider } from "react-pro-sidebar";
import AdminSidebar from "../../Components/AdminSidebar";
import { Container,Row,Col } from "react-bootstrap";
import { useState,useEffect } from "react";
//MUI Accordion
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


const RegistrationSignUpApproval = () => {

      const [buttonClicked, setButton] = useState(true);
      const [ApprovalData,setApprovalData]=useState();
      const [temp,setTemp]=useState(0)    
      const [newObj,setNewObj]=useState(); 

      // const Fetch_Approval_Data = async () => {
      //       await fetch("http://localhost:4000/api/Approval/")
      //             .then(res => {
      //                   if (!res.ok) { throw Error("Error in the code"); };
      //                   return res.json()
      //             })
      //             .then(data => { setApprovalData(data) })
                  

      //             console.log(ApprovalData)
      // }

      


      const handleDelete=async (id)=>{
            if(window.confirm("Are you sure?")===true)
            {
                  await fetch(`http://localhost:4000/api/Approval/delete/${id}`, { method: "DELETE" })
            }
            setTemp(Math.random())
      }

      const handleApprove=async (data,id) => {
            //console.log(Object.keys(newObj))
            
            // setNewObj(data)
            data && delete data._id
            console.log(id)
            if(window.prompt("Enter 'APPROVE' to approve the user ")==="APPROVE")
            {
                  data.status = "true"
                  await fetch(`http://localhost:4000/api/Approval/approve/${id}`, {
                        method: "PATCH",
                        headers: {
                              "Content-Type": "application/json"
                        },
                        body: JSON.stringify(data)
                  })

                  setTemp(Math.random())
                  alert("Approved")
                  
                  await fetch("http://localhost:4000/api/Approval/approve/",{
                        method:"POST",
                        headers: {
                              "Content-Type": "application/json"
                        },
                        body: JSON.stringify(data)
                  })

                  setTemp(Math.random())
                  
                  
            }

            setTemp(Math.random())
            
      }


      useEffect(() => {
            // Fetch_Approval_Data();
            fetch("http://localhost:4000/api/Approval/")
                  .then(res => {
                        if (!res.ok) { throw Error("Error in the code"); };
                        return res.json()
                  })
                  .then(data => { setApprovalData(data) })
      }, [temp])
      

      return ( 
            <>
                  <Navbar />
                  <div className="teach_workload">
                        <div className="Cont1">
                              <ProSidebarProvider>
                                    <AdminSidebar />
                              </ProSidebarProvider>
                        </div>
                        <br /><br />
                        <div className="Cont2" style={{ width: "100%" }}>
                              <Container>
                                    <br/>
                                    <center><h1>REGISTRATION - SIGN UP APPROVAL</h1></center>

                                    <br />
                                    <Row>
                                          <Col onClick={() => setButton(true)} className={buttonClicked ? "btn btn-primary questionTypeButtons active" : "btn btn-primary questionTypeButtons"}>REGISTRATION APPROVAL</Col>
                                          <Col onClick={() => setButton(false)} className={buttonClicked ? "btn btn-primary questionTypeButtons" : "btn btn-primary questionTypeButtons active"}>SIGN UP APPROVAL</Col>
                                    </Row>
                              </Container>

                              <br/><br/>
                              <Container>
                                    {ApprovalData && ApprovalData.map((data)=>(
                                          <div className="AccordionCont">
                                                {/* REGISTRATION APPROVAL */}
                                                {buttonClicked &&(data.type==="registration")&& 
                                                <div style={{display:"flex",alignItems:"center"}}>
                                                      <div>
                                                                  <button className="deleteButton" onClick={() => handleDelete(data._id)}><DeleteOutlineIcon /></button>
                                                      </div>
                                                      <div style={{ margin:"10px", width:"100%" }}>
                                                            <Accordion>
                                                      
                                                                  <AccordionSummary
                                                                        expandIcon={<ExpandMoreIcon />}
                                                                        aria-controls="panel1a-content"
                                                                        id="panel1a-header"
                                                                        className={data.status === "true" ? "success" : "danger"}
                                                                  >
                                                                        <Typography><strong>{data.name}</strong></Typography>

                                                                  </AccordionSummary>

                                                                  <AccordionDetails>
                                                                        <Typography>
                                                                              <Col style={{ display: "flex"}}><div><b>ABOUT :</b></div><div>{data.about}</div></Col>
                                                                              <br />
                                                                              <Row>
                                                                                    <Col style={{ display: "flex" }}>
                                                                                          <div><b>CONTACT NUMBER : </b></div>
                                                                                          <div>{data.contact_number}</div>
                                                                                    </Col>
                                                                                    <Col style={{ display: "flex" }}>
                                                                                          <div><b>EMAIL : </b></div>
                                                                                          <div>{data.email}</div>
                                                                                    </Col>
                                                                              </Row>
                                                                              <br/>
                                                                              <Row>
                                                                                    <Col style={{ display: "flex" }}>
                                                                                          <div><b>SPECIALIZED DOMAIN : </b></div>
                                                                                          <div>{data.specialized_domain}</div>
                                                                                    </Col>
                                                                                    <Col style={{ display: "flex" }}>
                                                                                          <div><b>DOB : </b></div>
                                                                                          <div>{data.dob}</div>
                                                                                    </Col>
                                                                              </Row>
                                                                              <br />
                                                                              <Row>
                                                                                    <Col style={{ display: "flex" }}>
                                                                                          <div><b>PREVIOUS EXPERIENCE : </b></div>
                                                                                          <div>{data.prev_exp}</div>
                                                                                    </Col>
                                                                                    <Col style={{ display: "flex" }}>
                                                                                          <div><b>EXPERIENCE : </b></div>
                                                                                          <div>{data.experience}</div>
                                                                                    </Col>
                                                                              </Row>
                                                                              <br/>
                                                                              <Col style={{ display: "flex" }}><div><b> PREVIOS EXPERIENCE DETAILS : </b></div><div>{data.prev_det}</div></Col>

                                                                              <br/>

                                                                              {
                                                                                    (data.status === "false") ? <Row style={{ width: "65%", margin: "0px auto" }}>
                                                                                                <Col><button className="btn btn-success questionTypeButtons" onClick={() =>  handleApprove(data,data._id)}>ACCEPT</button></Col>
                                                                                          <Col><button className="btn btn-danger questionTypeButtons" onClick={() => handleDelete(data._id)}>REJECT</button></Col>
                                                                                    </Row> : 
                                                                                    <Row style={{ width: "70%", margin: "0px auto" }}>
                                                                                          <button disabled className="btn btn-success">Successfully Approved</button>
                                                                                    </Row>
                                                                              }

                                                                        </Typography>
                                                                  </AccordionDetails>
                                                            </Accordion>
                                                      </div>
                                                </div>}

                                                {/* SIGN UP APPROVAL */}
                                                {!buttonClicked && (data.type === "signup") && 
                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                      <div>
                                                                  <button className="deleteButton" onClick={()=> handleDelete(data._id)}><DeleteOutlineIcon /></button>
                                                      </div>
                                                      <div style={{ margin: "10px", width: "100%" }}>
                                                            <Accordion>
                                                                  <AccordionSummary
                                                                        expandIcon={<ExpandMoreIcon />}
                                                                        aria-controls="panel1a-content"
                                                                        id="panel1a-header"
                                                                        className={data.status === "true" ? "success" : "danger"}
                                                                  >
                                                                        <Typography><strong>{data.name}</strong></Typography>
                                                                  </AccordionSummary>
                                                                  <AccordionDetails>
                                                                        <Typography>
                                                                              <Col style={{ display: "flex" }}><div><b>ABOUT :</b></div><div>{data.about}</div></Col>
                                                                              <br />
                                                                              <Row>
                                                                                    <Col style={{ display: "flex" }}>
                                                                                          <div><b>CONTACT NUMBER : </b></div>
                                                                                          <div>{data.contact_number}</div>
                                                                                    </Col>
                                                                                    <Col style={{ display: "flex" }}>
                                                                                          <div><b>EMAIL : </b></div>
                                                                                          <div>{data.email}</div>
                                                                                    </Col>
                                                                              </Row>
                                                                              <br />
                                                                              <Row>
                                                                                    <Col style={{ display: "flex" }}>
                                                                                          <div><b>SPECIALIZED DOMAIN : </b></div>
                                                                                          <div>{data.specialized_domain}</div>
                                                                                    </Col>
                                                                                    <Col style={{ display: "flex" }}>
                                                                                          <div><b>DOB : </b></div>
                                                                                          <div>{data.dob}</div>
                                                                                    </Col>
                                                                              </Row>
                                                                              <br />
                                                                              <Row>
                                                                                    <Col style={{ display: "flex" }}>
                                                                                          <div><b>PREVIOUS EXPERIENCE : </b></div>
                                                                                          <div>{data.prev_exp}</div>
                                                                                    </Col>
                                                                                    <Col style={{ display: "flex" }}>
                                                                                          <div><b>EXPERIENCE : </b></div>
                                                                                          <div>{data.experience}</div>
                                                                                    </Col>
                                                                              </Row>
                                                                              <br />
                                                                              <Col style={{ display: "flex" }}><div><b> PREVIOS EXPERIENCE DETAILS : </b></div><div>{data.prev_det}</div></Col>
                                                                              <br />
                                                                              {
                                                                                    (data.status === "false") ? <Row style={{ width: "65%", margin: "0px auto" }}>
                                                                                                <Col><button className="btn btn-success questionTypeButtons" onClick={() => handleApprove(data, data._id)}>ACCEPT</button></Col>
                                                                                                <Col><button className="btn btn-danger questionTypeButtons" onClick={() => handleDelete(data._id)}>REJECT</button></Col>
                                                                                    </Row> :
                                                                                          <Row style={{ width: "70%", margin: "0px auto" }}>
                                                                                                <button disabled className="btn btn-success">Successfully Approved</button>
                                                                                          </Row>
                                                                              }
                                                                        </Typography>
                                                                  </AccordionDetails>
                                                            </Accordion>
                                                      </div>
                                                </div>}
                                          </div>
                                          
                                    ))}
                              </Container>
                        </div>
                  </div>
            </>
       );
}
 
export default RegistrationSignUpApproval;