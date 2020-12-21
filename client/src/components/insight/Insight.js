import React, { useEffect, useState } from 'react'
// import Chart from "react-apexcharts";
import ApexCharts from 'apexcharts';
import moment from 'moment'
import './Insight.css'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core';
import { useFetch } from '../../hooks/useFetch';
import config from '../../config/config'


const useStyles = makeStyles(theme => ({
    inputRoot: {
      color: "purple",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "var(--color-green)"
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "var(--color-green)"
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "var(--color-green)"
      }
    }
  }));


export const Insight = () => {

    const classes = useStyles();
    const [currentUser, setcurrentUser] = useState()
    const [total, settotal] = useState('0')
    const [data, setdata] = useState(
        [
            {
              x: 'Analysis',
              y: [
                new Date('2019-02-27').getTime(),
                new Date('2019-03-04').getTime()
              ],
              fillColor: '#008FFB'
            },
            {
              x: 'Design',
              y: [
                new Date('2019-03-04').getTime(),
                new Date('2019-03-08').getTime()
              ],
              fillColor: '#00E396'
            },
            {
              x: 'Coding',
              y: [
                new Date('2019-03-07').getTime(),
                new Date('2019-03-10').getTime()
              ],
              fillColor: '#775DD0'
            },
            {
              x: 'Testing',
              y: [
                new Date('2019-03-08').getTime(),
                new Date('2019-03-12').getTime()
              ],
              fillColor: '#FEB019'
            },
            {
              x: 'Deployment',
              y: [
                new Date('2019-03-12').getTime(),
                new Date('2019-03-17').getTime()
              ],
              fillColor: '#FF4560'
            }

          ]
    )
    const {response,error}=useFetch('/users')
    const handleSelect=(e,v,r)=>{
     if(r=='select-option'){

      setcurrentUser(v)

     }
    }


useEffect(() => {
    const fetchData=async()=>{

       
        try {
          const res = await fetch(
            config.baseUrl+'/gates/data/'+currentUser._id,{
                method:'GET',
                    headers:{
                        'Content-Type': 'application/json',
                        'x-auth-token': localStorage.getItem('token')
                    }   
                   }
          )    
          const datar=await res.json()  
          console.log('----range----')
          console.log(datar)
          console.log('----------------')
       
        
           
            
            settotal(datar.total)
           
            //==========format data=============
            //  {
            //   x: 'Deployment',
            //   y: [
            //     new Date('2019-03-12').getTime(),
            //     new Date('2019-03-17').getTime()
            //   ],
            //   fillColor: '#FF4560'
            // }
            // var fdata= await datar.range.map(range=>{

            //     return {
            //        x:currentUser._id,
            //        y:[new Date(range[0]).getTime(),new Date(range[1]).getTime()]
            //        ,fillColor: 'var(--color-green)'
            //     }
            // })
          
            // setdata(
            //     datar.range.map(range=>{

            //         return {
            //            x:currentUser._id,
            //            y:[new Date(range[0]).getTime(),new Date(range[1]).getTime()]
            //            ,fillColor: 'var(--color-green)'
            //         }
            //     })
            // )
            setoptions({

                ...options,
                series: [
                    {
                      data:datar.fdata
                    }]
            })
           
            //==================================
          

        } catch (err) {
            
          console.log(err)
        }

      }


      fetchData()
}, [,currentUser])



//     const useStyles = makeStyles({
//         root: 
//         `
//     background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
//     border-radius: 3px;
//     font-size: 16px;
//     border: 0;
//     color: white;
//     height: 48px;
//     padding: 0 30px;
//     box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
//   `, // a style rule
       
//       });
//       const classes = useStyles();
      





    const Aoptions = response.map((option) => {
        const firstLetter = option.lastName[0].toUpperCase();
        return {
          firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
          ...option,
        };
      });
    





    const [options, setoptions] = useState(
        {
            series: [
            {
              data:data
            }
          ],
            chart: {
                id:'chart1',
              
                height: 450,
                type: 'rangeBar',

          
                toolbar: {
                  show: true,
                  offsetX: 0,
                  offsetY: 0,
                  tools: {
                    download: true,
                    selection: true,
                    zoom: true,
                    zoomin: true,
                    zoomout: true,
                    pan: false,
                    reset: true | '<img src="/static/icons/reset.png" width="20">',
                    customIcons: []
                  },
                  export: {
                    csv: {
                      filename: undefined,
                      columnDelimiter: ',',
                      headerCategory: 'category',
                      headerValue: 'value',
                      dateFormatter(timestamp) {
                        return new Date(timestamp).toDateString()
                      }
                    }
                  },
                  autoSelected: 'zoom' 
                },
           
            
            




          },
          plotOptions: {
            bar: {
              horizontal: true,
              distributed: true,
              dataLabels: {
                hideOverflowingLabels: false
              }
            }
          },
          dataLabels: {
            enabled: true,
            formatter: function(val, opts) {
            //   var label = opts.w.globals.labels[opts.dataPointIndex]
              var a = moment(val[0])
              var b = moment(val[1])
              var diff = b.diff(a, 'minutes')
              return  diff+' min' //+ (diff > 1 ? ' minutes' : ' munute')
            },
            style: {
              colors: ['#f3f4f5', '#fff']
            }
          },
          xaxis: {
            type: 'datetime',
            labels: {
                show: true,
                style: {
                    colors: ['white'],
                    fontSize: '12px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 400,
                    cssClass: 'apexcharts-xaxis-label',
                } ,datetimeFormatter: {
                    year: 'yyyy',
                    month: "MMM 'yy",
                    day: 'dd MMM',
                    hour: 'HH:mm ',
                },
            },
 
          },
          yaxis: {
            show: false
          },
 
          grid: {
            row: {
              colors: ['var(--color-gray-dark)', 'var(--color-gray)'],//'#f3f4f5', '#fff'
              opacity: 1
            }
          },tooltip: {
          
            custom: function({series, seriesIndex, dataPointIndex, w}) {
               
               var d=options.series
               console.log(d);
              return '<div class="arrow_box">' +
                '<span>'+moment(series[seriesIndex][dataPointIndex]).subtract(3.5, 'hours').format('lll')+'</span>' +
                '</div>'
            }
          }
          }
    )

    





// ============================================================
// var options2 = {
//     chart: {
//       id: "chart1",
//       height: 130,
//       type: "rangeBar",
//       foreColor: "#ccc",
//       brush: {
//         target: "chart2",
//         enabled: true
//       },
//       selection: {
//         enabled: true,
//         fill: {
//           color: "#fff",
//           opacity: 0.4
//         },
//         xaxis: {
//         //   min: new Date("27 Jul 2017 10:00:00").getTime(),
//         //   max: new Date("14 Aug 2017 10:00:00").getTime()
//         },    yaxis: {
//             show:false
//             //   min: new Date("27 Jul 2017 10:00:00").getTime(),
//             //   max: new Date("14 Aug 2017 10:00:00").getTime()
//             }
//       }
//     },
//     colors: ["#FF0080"],
//     series: [
//       {
//         data: series.series.data
//       }
//     ],
//     stroke: {
//       width: 2
//     },
//     grid: {
//       borderColor: "#444"
//     },
//     markers: {
//       size: 0
//     },
//     xaxis: {
//       type: "datetime",
//       tooltip: {
//         enabled: false
//       }
//     },
//     yaxis: {
//       tickAmount: 2
//     }
//   };
  
//   var chart2 = new ApexCharts(document.querySelector("#chart-bar"), options2);
// ============================================================

















    useEffect(() => {
        document.querySelector("#chart").innerHTML=""
        var chart1 = new ApexCharts(document.querySelector("#chart"), options);
        chart1.render();
        // var chart2 = new ApexCharts(document.querySelector("#chart-bar"), options2);
        // chart2.render();
        console.log(options);
    }, [options])
    return (
        <div className="insight">
            <div  className="chart-container">
                <div className="user-selection-bar">
                <Autocomplete
                    id="grouped-demo"
                    className="grouped-demo"
                    classes={classes}
                    options={Aoptions.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                    groupBy={(option) => option.firstLetter}
                    getOptionLabel={(option) => option.lastName+' '+option.firstName}
                    onChange={(e,v,r)=>handleSelect(e,v,r)}
                    renderInput={(params) => <TextField {...params} label="Select User" variant="outlined" />}
                    />
                    <p>total : {moment.duration(total, "milliseconds").humanize()}</p>
                </div>
               <div id="chart"></div>
               <div id="chart-bar"></div>
            </div>
        </div>
    )
}
