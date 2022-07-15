import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import './Editpage.css'
const Editpage = () =>{
    const aid=useParams().id;
    const [billData,setBillData]=useState(null);
    const [message,setMessage]=useState("");
    useEffect(()=>{
        axios.get(`http://localhost:8081/bill/${aid}`).then((res)=>{
            res.data.billDate= res.data.billDate.substring(0,10);
            if(res.data.paidDate)res.data.paidDate=res.data.paidDate.substring(0,10);
            
            setBillData(res.data);
        }).catch((err)=>{
            console.log(err);
        });

    },[]);
    function handleSubmit(e)
    {
        e.preventDefault();
        axios.put(`http://localhost:8081/${billData._id}/edit`,billData).then((res)=>{
            if(res.status===200)
            {
                setMessage(res.data.message);
                window.location.replace("/");
            }
        }).catch((err)=>{
            console.log(err);
            setMessage(err.message);
        })
    }
    
    
    

    function handleChange(evt)
    {
        console.log(evt.target.name+" "+evt.target.value)
        if(evt.target.name==="paid")
        {
            setBillData({
            
                ...billData,
                [evt.target.name]:evt.target.value==="true"
            });
        }
        else
        {
            setBillData({
            
                ...billData,
                [evt.target.name]:evt.target.value
            });
        }
        
    }
    if( billData)
    {
        return(
            <div className="main-container">
                <h1>Bill Details</h1>
                <div>
                     <h3>Bill ID : {billData._id}</h3>
                </div>
                <form className="form-container" onSubmit={handleSubmit}>
                    <div className="row">
                        <label>Bill Date : </label>
                        <input type="date" name="billDate" value={billData.billDate} onChange={handleChange} />
                    </div>
                    <div className="row">
                        <label>Bill Amount : </label>
                        <input type="number" name="billAmount" value={billData.billAmount} onChange={handleChange} />
                    </div>
                    <div className="row">
                        <label>Status : </label>
                        <select name="paid" value={billData.paid} onChange={handleChange} >
                            <option value="true">Paid</option>
                            <option value="false">Unpaid</option>
                        </select>
                    </div>
                    {billData.paid &&
                    <div className="row">
                    <label>Paid Date</label>
                    <input type="date" name="paidDate" value={billData.paid?billData.paidDate:""} onChange={handleChange} min={billData.billDate} max={new Date().toISOString().slice(0, 10)}/>
                </div>}
                    <div className="row" >
                        <label>Units Consumed : </label>
                        <input type="text" name="units" value={billData.units} onChange={handleChange}  />
                    </div>
                   
             <div className="row1">
             <button type="submit" >Submit</button>
             <button onClick={()=>{window.location.replace('/')}} className="cancel">Cancel</button>
             </div>
                    {message && <p>{message}</p>}
                    
                </form>
                
            </div>
        )
    }
    
}
export default Editpage;