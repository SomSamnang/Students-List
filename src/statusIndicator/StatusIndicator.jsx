/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
const StatusIndicator = ({ status }) =>{
    let statusClass;
    let statusText;
    
    switch (status) {
        case 'ACT':
            statusClass = 'badge bg-success';
            statusText = 'Active';
            break;
        case 'INT':
            statusClass = 'badge bg-secondary';
            statusText = 'Inactive';
            break;
        case 'DEL':
                statusClass = 'badge bg-danger';
                statusText = 'Deleted';
                break;
    
        default:
            statusClass = 'badge bg-warning text-dark';
            statusText = 'Unknown'
            break;
    }
    return(
        <span className={statusClass}>
        {statusText}
        </span>
    );
};

export default StatusIndicator;