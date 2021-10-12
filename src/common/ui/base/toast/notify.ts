/* eslint-disable no-lone-blocks */
import React from 'react';
import {  toast } from "react-toastify";
import { NotifyType } from '../../../util/enum';
import { ErrorToast, InfoToast, SuccessToast, WarningToast } from './toastComponent';

export function toastNotify(type:string,msg:string){
    switch (type){
        case NotifyType.success: {
            toast(SuccessToast(msg))
            break;
        };
        case NotifyType.error: {
            toast(ErrorToast(msg));
            break;
        };
        case NotifyType.warning: {
            toast(WarningToast(msg));
            break;
        };
        case NotifyType.info: {
            toast(InfoToast(msg));
            break;
        };
        default: {
            toast(InfoToast(msg));
            break;
        }
    }
}