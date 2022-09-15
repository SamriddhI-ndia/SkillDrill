import React from "react";
import Avatar from 'react-avatar'

const Client=({username})=>{
    return(
        <div>
            <Avatar name={username} size={40} round='14px'/>
            <span className="username">{username}</span>
        </div>
    );
};

export default Client;