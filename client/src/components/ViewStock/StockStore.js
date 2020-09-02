import React from "react";
import "./styling.css";
import axios from "axios";
import { useHistory } from "react-router-dom";



const StockStore = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem('auth-token');
    const history = useHistory();
    const headers = {
        'Authorization': token
    };
    axios.get(
        `${API_URL}/viewStoreSOH`, { headers }
    ).then(response => {
        
        if (response.data.success) {
            const frozen = response.data.SOH.frozen
            const dairy = response.data.SOH.dairy
            const meat = response.data.SOH.meat
            const produce = response.data.SOH.produce
            const ambient = response.data.SOH.ambient
        }
    }).catch(error => {
        if (error.response.status === 406) {
            //Display "Please refresh your session" here
            //return history.push("/refresh");
        } if (error.response.status === 403) {
            //Display "Please login" here
            history.push("/");
        }
    });

    

    return (
        <div className="stockStore">
            <h1>stockStore</h1>
        </div>
    )
};
export default StockStore
