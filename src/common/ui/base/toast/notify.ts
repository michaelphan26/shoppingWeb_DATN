/* eslint-disable no-lone-blocks */
import React from 'react';
import {  toast } from "react-toastify";
import { ErrorToast, InfoToast, SuccessToast, WarningToast } from './toastComponent';

export function toastNotify(type:string,msg:string){
    switch (type){
        case "success": {
            toast(SuccessToast(msg))
            break;
        };
        case "error": {
            toast(ErrorToast(msg));
            break;
        };
        case "warning": {
            toast(WarningToast(msg));
            break;
        };
        case "info": {
            toast(InfoToast(msg));
            break;
        };
        default: {
            toast(InfoToast(msg));
            break;
        }
    }
}