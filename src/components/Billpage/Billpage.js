import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Link } from "react-router-dom";
import axios from "axios";
import './Billpage.css';
const Billpage=()=>{
    const months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
    const aid=useParams().id;
    const [message,setMessage]=useState("");
    const [billData,setBillData]=useState({});
    useEffect(()=>{
        axios.get(`https://billserver.herokuapp.com/bill/${aid}`).then((res)=>{
           
            
            setBillData(res.data);
           
        }).catch((err)=>{
            console.log(err);
        }
        );
    },[aid]);
    function handleDelete(e){
        e.preventDefault();
        axios.delete(`https://billserver.herokuapp.com/delete/${aid}`).then((res)=>{
            setMessage(res.data.message);
            window.location.replace("/");
        }
        ).catch((err)=>{
            console.log(err);
        }
        );
    }

    return(
        <div className="main-container">
            <h1>Bill Summary</h1>
            
            <div className="billdetails">
            <div className="crudContainer">
                <Link className="editbutton" to={`/${billData._id}/edit`}><i className="fa-solid fa-pen"></i>Edit</Link>
                <button className="deletebutton" onClick={(e)=>{handleDelete(e)}}><i className="fa-solid fa-trash-can"></i>Delete</button>
            </div>
                <div className="row">
                <h4>Bill ID : </h4> 
                <p>{billData._id}</p>
                </div>
                <div className="row">
                <h4>Bill Date : </h4> 
                <p>{(new Date(billData.billDate).getDate()).toString()+"/"+months[parseInt((new Date(billData.billDate).getMonth()).toString())]+"/"+(new Date(billData.billDate).getFullYear()).toString()}</p>
                </div>
                <div className="row">
                <h4>Paid Date: </h4> 
                <p>{billData.paid?(new Date(billData.paidDate).getDate()).toString()+"/"+months[parseInt((new Date(billData.paidDate).getMonth()).toString())]+"/"+(new Date(billData.paidDate).getFullYear()).toString():"-----"}</p>
                </div>
                <div className="row">
                <h4>Bill Amount : </h4> 
                <p>Rs.{billData.billAmount} /-</p>
                </div>
                <div className="row">
                <h4>Units Consumed : </h4> 
                <p>{billData.units}</p>
                </div>
            </div>
            
             <button onClick={()=>{window.location.replace('/')}} className="cancel">Go Home</button>
        </div>
    )
}
export default Billpage;
