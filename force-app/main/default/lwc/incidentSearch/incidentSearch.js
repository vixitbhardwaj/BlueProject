import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { fireEvent } from 'c/pubsub';
import STATUS_FIELD from '@salesforce/schema/Incident__c.Status__c';
import APPLIES_TO_FIELD from '@salesforce/schema/Incident__c.Applies_To__c';

export default class IncidentSearch extends LightningElement {
    incNum;
    statusValue = "";
    appliesToValue = "";

    @wire(getPicklistValues, { recordTypeId: '012000000000000AAA', fieldApiName: STATUS_FIELD })
    statusValues;

    @wire(getPicklistValues, { recordTypeId: '012000000000000AAA', fieldApiName: APPLIES_TO_FIELD })
    appliesToValues;

    @wire(CurrentPageReference) pageRef;

    
    handleIncNum(event){
        this.incNum = event.target.value;
    }
    handleChange(event){
        if(event.target.name === 'status'){
            this.statusValue = event.target.value;
        }
        if(event.target.name === 'appliesTo'){
            this.appliesToValue = event.target.value;
        }
    }
    handleSearch(event){
        let eventData = {
            "incNo" : this.incNum,
            "statusValue" : this.statusValue,
            "appliesToValue" : this.appliesToValue
        };

        fireEvent(this.pageRef, 'searchKey', eventData);
    }
}