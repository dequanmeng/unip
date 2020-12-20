import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import './GateDetail.css'
import ArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import CheckIcon from '@material-ui/icons/Check';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import moment from 'moment'
import { Button } from '@material-ui/core';
import { SearchBar } from '../../util/searchbar/SearchBar';
import { UserItem } from './useritem/UserItem';
import { useTime} from '../../../hooks/useTime'
import config from './../../../config/config'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import useSocket from './../../../hooks/useSocket'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export const GateDetail = () => {
    let { gate } = useParams();
    const time=useTime()
    const location = useLocation();
    const [open, setOpen] = useState(false);
    // const [gatedata, setgatedata] = useState()
    const [active, setactive] = useState(0)
    const [data, setdata] = useState([])
    const [filtercon, setfiltercon] = useState()
    const [error, setError] = useState({errors:''})
    const [url, seturl] = useState('/gates/data/today/'+gate+'/0')
    // const [filterstatus, setfilterstatus] = useState()
    const { temp, isConnected } = useSocket(`ws://localhost:4000/${location.state.topic}`, {
             query: {
                 apiKey: location.state.apiKey
               }
              },'msg');
    const handleFilterClick =(current)=>{
             setactive(current)
             seturl('/gates/data/today/'+gate+'/'+current)
            //  filterbtn(current)
    }

    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };





    const filter=(e)=>{
    //  console.log(filtercon.data);
     //+' '+item.firstName+' '+item.status+' '+item.time
     var temp=[]
   
      filtercon?.map(
                 item => {
                   var c=item.status?'inside':'outside';
                   var d=item.firstName+' '+item.lastName+' '+c+' '+moment(item.time).format('LTS')
                   console.log(e.target.value);
                   console.log(d.toLowerCase());
                   console.log(d.toLowerCase().includes(e.target.value.toLowerCase()) );
                   if(d.toLowerCase().includes(e.target.value.toLowerCase()) ){
                     temp.push(item)
                     console.log(item);
                   }else{

                   }

                  return
                  
                  }
             )
         
           
            
             setdata(temp)
            
             
   }

  //  const filterbtn=(con)=>{
  //    var temp=[]
  //         if(con==2){
  //           filtercon?.map(
  //             item => {
  //               if(item.status ){
  //                 temp.push(item)
  //                 console.log(item);
  //               }

  //              return
               
  //              }
  //         )
  //         }else if(con==1){

  //           filtercon?.map(
  //             item => {
  //               if(!item.status ){
  //                 temp.push(item)
  //                 console.log(item);
  //               }

  //              return
               
  //              }
  //         )
 
  //         }
  //         setdata(temp)
        

  //  }

 useEffect(() => {
     handleClick()
 }, [temp.data])




    useEffect(() => {
      const fetchData=async()=>{

       
        try {
          const res = await fetch(
            config.baseUrl+url,{
                method:'GET',
                    headers:{
                        'Content-Type': 'application/json',
                        'x-auth-token': localStorage.getItem('token')
                    }   
                   }
          )    
          const data=await res.json()  
          console.log('----useFetch----')
          console.log(data)
          console.log('----------------')
       
          if (!data?.data?.length)
             setError(data)




            setdata(data.data);
            setfiltercon(data.data)
            
        
          // }else{
          
          //   setdata(data);
          // }
  

        } catch (err) {
            
          setError(err);
        }

      }


      fetchData()
    }, [,url,temp.data])


    // useEffect(() => {
    //   setdata(filtercon)
  
      
    // }, [filtercon])




    return (
        <div  className="gate_detail">
            <div className="gate_detail_container">
            <div className="gate_detail_header">
                <div className="gate_name">
                <p  >{gate}</p>
                </div>
                <div className="gate_detail_date">
                    <AccessTimeIcon/>
                  {/* {moment().format('MMM Do , h:mm a')} */}
                  <p>{time}</p>
                </div>
                <SearchBar filter={filter}/>
                <div className="gate_detail_counter">
                   <div>
                        <Button className={`gate_header_btn ${active==0&&'bordergreen'}` } onClick={()=>{handleFilterClick(0)}}>
                           
                            <p style={{color:active==0?
                                   'white':active==1?
                                   'red':active==2?
                                   'green':'yellow'}}> {data?.length?data?.length:0}</p>
                        </Button>
                   </div>
                   <div>
                        <Button className={`gate_header_btn ${active==2&&'bordergreen'}` } onClick={()=>{handleFilterClick(2)}} >
                            <ArrowDownIcon style={{color:"green"}}/>
                          
                        </Button>
                    </div>
                    <div>
                        <Button className={`gate_header_btn ${active==1&&'bordergreen'}` } onClick={()=>{handleFilterClick(1)}}>
                            <ArrowUpIcon style={{color:"red"}} /> 
                            
                        </Button>
                   </div>

                    <div>
                        <Button className={`gate_header_btn ${active==3&&'bordergreen'}` } onClick={()=>{handleFilterClick(3)}} >
                            <ArrowRightIcon style={{color:"yellow"}}/>
                            
                        </Button>
                    </div>

                    {/* <div>
                        <Button className={`gate_header_btn ${active==4&&'bordergreen'}` } onClick={()=>{handleFilterClick(4)}} >
                            <CheckIcon style={{color:"var(--color-green)"}}/>
                            <p>0</p>
                        </Button>
                    </div> */}
                </div>

            </div>
             <div className="gate_detail_main" >
                  {data?.map(item=>{

                       return <UserItem status={item.status} user={{id:item.user,lastName:item.lastName,firstName:item.firstName}} time={item.time} active={active}/>
                  })}
                   
                 { !data && <p  style={{marginTop:'2rem',color:"rgba(255,255,255,0.7)"}}>{error.errors}</p>}
                
                    

             </div>
  {  temp?.data&&(<Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={temp?.data?.isInside?'success':'error'}>
                  {temp?.data?.firstName+ ' '+temp?.data?.lastName +' '}{temp?.data?.isInside?'entered':'left'}
                </Alert>
                </Snackbar>)}

            </div>
        </div>
    )
}
