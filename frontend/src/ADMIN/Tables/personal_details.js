import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import PersonalDetailsShow from "../../CONTEXT/PersonalDetailsShow"
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import avatar from "../../Components/images/avatar.jpg"


const Accordion = styled((props) => (
      <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
      border: `1px solid ${theme.palette.divider}`,
      '&:not(:last-child)': {
            borderBottom: 0,
      },
      '&:before': {
            display: 'none',
      },
}));

const AccordionSummary = styled((props) => (
      <MuiAccordionSummary
            expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
            {...props}
      />
))(({ theme }) => ({
      backgroundColor:
            theme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, .05)'
                  : 'rgba(0, 0, 0, .03)',
      flexDirection: 'row-reverse',
      '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(90deg)',
      },
      '& .MuiAccordionSummary-content': {
            marginLeft: theme.spacing(1),
      },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
      padding: theme.spacing(2),
      borderTop: '1px solid rgba(0, 0, 0, .125)',
}));



const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
});


const PersonalDetails = () => {
      const [expanded, setExpanded] = React.useState('panel0');

      const handleChange = (panel) => (event, newExpanded) => {
            setExpanded(newExpanded ? panel : false);
      };

      const {setPersonalDetails} = React.useContext(PersonalDetailsShow)
      const [open, setOpen] = React.useState(true);
      const [tableData,setTableData]=React.useState()


      const handleClose = () => {
            setPersonalDetails(false)
            setOpen(false);

      };

      const handleFetchMarksData = async () => {
            const response = await fetch("http://localhost:4000/api/user/collectionData/personal_details");
            const data = await response.json();
            setTableData(data);
      }
      React.useEffect(() => {
            handleFetchMarksData();
      }, [])



      return ( 
            <>
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
                                                USER DETAILS
                                          </Typography>
                                          <Button autoFocus color="inherit" onClick={handleClose}>
                                                CLOSE
                                          </Button>
                                    </Toolbar>
                              </AppBar>
                              <List>
                                    <div style={{padding:"20px"}}>
                                          {
                                                (tableData) && (tableData).map((item,index)=>(
                                                      <Accordion expanded={expanded === 'panel' + index} onChange={handleChange('panel' + index)}>
                                                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                                                  <Typography>{(index+1)+"."+item.name}</Typography>
                                                            </AccordionSummary>
                                                            <AccordionDetails>
                                                                  <Typography>
                                                                        <center>
                                                                              
                                                                              {
                                                                                    (item.image !== undefined)?
                                                                                    <img src={item.image} alt="" width={100} height={100} style={{ borderRadius: "50%" }} />:
                                                                                    <img src={avatar} alt="" width={100} height={100} style={{ borderRadius: "50%" }} />
                                                                              }

                                                                              
                                                                        </center>
                                                                        <br/>
                                                                        <table className='table table-bordered table-striped' style={{width:"50%",margin:"0px auto"}}>
                                                                              <tbody>
                                                                                    {
                                                                                          (Object.keys(item)).map(i => (
                                                                                                <>
                                                                                                      {
                                                                                                            
                                                                                                            (i!=="image" && i!=="_id") && (
                                                                                                                  <tr>
                                                                                                                        <td>{i + " : "}</td>
                                                                                                                        <td>{item[i]}</td>
                                                                                                                  </tr>
                                                                                                            )
                                                                                                            
                                                                                                      }
                                                                                                </>
                                                                                          ))
                                                                                    }
                                                                              </tbody>
                                                                        </table>
                                                                  </Typography>
                                                            </AccordionDetails>
                                                      </Accordion>
                                                ))
                                          }
                                          
                                    </div>
                              </List>
                        </Dialog>
                  </div>
            </>
       );
}
 
export default PersonalDetails;