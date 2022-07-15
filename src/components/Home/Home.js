import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Home.css';
import axios from "axios";
import Loading from "../Loading/Loading";

const Home=()=>{
    const [billsData,setBillsData]=useState([]);
    const [newdata,setNewData]=useState([]);
    const [page,setPage]=useState(0);
    const [length,setLength]=useState(0);
    const [order,setorder]=useState(false);
    const months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
    function handleClick(e,id){
        window.history.pushState(null,null,window.location.pathname);
        window.location.replace(`/bill/${id}`);
    }
    
        
    
    function sort(){
        if(!order)
        {
            setorder(true)
            billsData.sort((a, b) => {
                return a.billAmount - b.billAmount;
            });
        }
        
        
        else {
            setorder(false)
            billsData.sort((a, b) => {
                return b.billAmount - a.billAmount;
            });
        }
        
        billsData.forEach((e)=>{
            newdata.push(e);
        })
        setBillsData(newdata);
        setNewData(null)
    }
    useEffect(()=>{
        axios.get('https://billserver.herokuapp.com/').then((res)=>{
            
            res.data.map((bill)=>{
                bill.billDate=(new Date(bill.billDate).getDate()).toString()+"/"+(new Date(bill.billDate).getMonth()).toString()+"/"+(new Date(bill.billDate).getFullYear()).toString();
                bill.paidDate=(new Date(bill.paidDate).getDate()).toString()+"/"+(new Date(bill.paidDate).getMonth()).toString()+"/"+(new Date(bill.paidDate).getFullYear()).toString();
            setBillsData(res.data);
        }
        )
    }).catch((err)=>{
        console.log(err);
    }
    );
    if(billsData.length>1)
    {
        var a=(billsData.length)/9;
        if(parseInt(a)===a)setLength(a);
        else setLength(parseInt(a+1))
    }
    },[billsData.length,length]);

    if(billsData && billsData.length>0)
    {
        return(
            <div className="main-container">
                <h1>Electricity Bills</h1> 
                
                <table className="homeTable">
                <Link to="/addBill" className="add"><i className="fa-solid fa-plus"></i>Add Bill</Link>
                <button onClick={sort}>{order?<span>Sort by Amount(High-Low)<i class="fa-solid fa-down-long"></i></span>:<span>Sort by Amount(Low-High)<i className="fa-solid fa-up-long"></i></span>}</button>
                    <thead >
                        <tr className="tableRow">     
                            <th >Sr.No</th>
                            <th>Bill Date</th>
                            
                            <th>Units</th>
                            <th>Bill Amount in Rs</th>
                            <th>Status</th>
                            <th>Paid Date</th>

                        </tr>
                    </thead>
                    <tbody>
                        {billsData.map((bill,index)=>{
                            const billingDate=bill.billDate.split("/");
                            billingDate[0]=billingDate[0].length===1? "0"+billingDate[0]:billingDate[0];
                            
                            const payDate=bill.paidDate.split("/");
                            console.log(billsData.length)
                            payDate[0]=payDate[0].length===1? "0"+payDate[0]:payDate[0];
                            if(index<(page+1)*9 && index>=page*9)
                            {
                                return(
                            
                                    <tr key={bill._id} className="tableRow1" onClick={(e)=>{handleClick(e,bill._id)}}>
                                       
                                        <td>{index+1}</td>
                                        <td>{billingDate[0]+"  "+months[parseInt(billingDate[1])]+"  "+billingDate[2]}</td>
                                        
                                        <td>{bill.units+" Un."}</td>
                                        <td className="lastCol">{bill.billAmount+"/-   "}</td>
                                        <td className={`${bill.paid?"status":"nostatus"}`}>{bill.paid?<i className="fa-solid fa-circle-check"></i> :<i class="fa-solid fa-circle-xmark"></i>}</td>
                                        <td>{bill.paid?payDate[0]+"  "+months[parseInt(payDate[1])]+"  "+payDate[2]:"------"}</td>
                                       
                                    </tr>
                                
                                
                                )
                            }
                            else{
                                return null;
                            }
                            
                        }
                        )}
                    </tbody>
                </table>
                <table className="paginationTable">
                    <tbody>
                        <tr className="pagination" >
                            {
                                
                                Array.from(Array(length), (e, i) => {
                                    return <td className={`page ${page===i?"active":""}`} key={i} onClick={(e)=>{setPage(i); console.log(page)}}>{i+1}</td>
                                  })
                            }
                        </tr>
                    </tbody>
                </table>
            </div>

        )
    }
    else{
        return(
            <div className="main-container">
                <Loading/>
            </div>
        )
    }
}
export default Home;