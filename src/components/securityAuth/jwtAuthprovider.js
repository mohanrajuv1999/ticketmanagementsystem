import axios from 'axios';
import React, { Component } from 'react';

export const apiCall=axios.create(
    {
        baseURL:'http://localhost:8080'
    }
     )
export const jwtAuthprovider =( username,password)=>apiCall.post('/acess/login',{username,password})
