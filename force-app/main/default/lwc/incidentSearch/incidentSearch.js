import { LightningElement, wire } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';

export default class IncidentSearch extends LightningElement {
    insNum;
    statusValue = "";
    appliesToValue = "";

    @wire(getPicklistValues, { recordTypeId: '012000000000000AAA', fieldApiName: INDUSTRY_FIELD })
    statusValues;

    @wire(getPicklistValues, { recordTypeId: '012000000000000AAA', fieldApiName: INDUSTRY_FIELD })
    appliesToValues;
    
    handleIncNum(event){
        this.insNum = event.target.value;
    }
    handleChange(event){
        if(event.target.name === 'status'){
            this.statusValue = event.target.value;
        }
        if(event.target.name === 'appliesTo'){
            this.appliesToValue = event.target.value;
        }
    }
    handleSearch(){

    }
}