
import { useState } from "react";
import axios from "axios";
import './Addpage.css'
const Addpage = () =>{
    
    const [billData,setBillData]=useState({
        billDate:"",
        paidDate:"",
        paid:false,
        billAmount:"",
        units:""
    });
    const [message,setMessage]=useState("");
    
    function handleSubmit(e)
    {
        e.preventDefault();
        axios.post(`http://localhost:8081/`,billData).then((res)=>{
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

        return(
            <div className="main-container">
                <h1>Add Bill Details</h1>
                
                <form className="form-container" onSubmit={handleSubmit}>
                    <div className="row">
                        <label>Bill Date : </label>
                        <input type="date" name="billDate"  onChange={handleChange} max={new Date().toISOString().slice(0, 10)}/>
                    </div>
                    <div className="row">
                        <label>Bill Amount : </label>
                        <input type="number" name="billAmount"  onChange={handleChange} />
                    </div>
                    <div className="row">
                        <label>Status : </label>
                        <select name="paid" defaultValue="false" onChange={handleChange} >
                            <option value="true">Paid</option>
                            <option value="false">Unpaid</option>
                        </select>
                    </div>
                    {billData.paid &&
                    <div className="row">
                    <label>Paid Date</label>
                    <input type="date" name="paidDate"  onChange={handleChange} min={billData.billDate} max={new Date().toISOString().slice(0, 10)}/>
                </div>}
                    <div className="row" >
                        <label>Units Consumed : </label>
                        <input type="text" name="units"  onChange={handleChange}  />
                    </div>
            <div>
            <button type="submit" >Submit</button>
            <button className="cancel" type="button" onClick={()=>{window.location.replace("/")}}>Cancel</button>
            </div>
             
                   
                    {message && <p>{message}</p>}
                </form>
            </div>
        )
    
}
export default Addpage;