import { LightningElement, wire, track } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import findIncidents from '@salesforce/apex/incidentmanagement.findIncidents';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
const columns = [
    {
        label: 'Incident #', fieldName: 'incidentURL', type: 'url',
        typeAttributes: { label: { fieldName: 'incidentId' }, target: '_blank' }
    },
    { label: 'Applies To', fieldName: 'appliesTo', type: 'string' },
    { label: 'Status', fieldName: 'status', type: 'string' },
    { label: 'Summary', fieldName: 'summary', type: 'string' },
];

export default class SearchResult extends LightningElement {
    @track page = 1; //this is initialize for 1st page
    @track items = []; //it contains all the records.
    @track data = []; //data to be display in the table
    @track columns; //holds column info.
    @track startingRecord = 1; //start record position per page
    @track endingRecord = 0; //end record position per page
    @track pageSize = 5; //default value we are assigning
    @track totalRecountCount = 0; //total record count received from all retrieved records
    @track totalPage = 0; //total number of page is needed to display all records

    @track columns = columns;
    //@track incidents;
    @track error;

    incNoVal;
    statusValue;
    appliesToValue;

    @wire(CurrentPageReference) pageRef;

    //@wire(findIncidents, { incNum: '$incNoVal', statusValue: '$statusValue', appliesToValue: '$appliesToValue' }) incidents;



    @wire(findIncidents, { incNum: '$incNoVal', statusValue: '$statusValue', appliesToValue: '$appliesToValue' })
    incidents({ error, data }) {
        if (data) {
            this.items = data;
            this.totalRecountCount = data.length;
            this.totalPage = Math.ceil(this.totalRecountCount / this.pageSize);
            this.data = this.items.slice(0, this.pageSize);
            this.endingRecord = this.pageSize;
            this.columns = columns;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.data = undefined;
        }
    }



    connectedCallback() {
        // subscribe to searchKeyChange event
        registerListener('searchKey', this.handleSearchKeyChange, this);
    }

    disconnectedCallback() {
        // unsubscribe from searchKeyChange event
        unregisterAllListeners(this);
    }

    //clicking on previous button this method will be called
    previousHandler() {
        if (this.page > 1) {
            this.page = this.page - 1; //decrease page by 1
            this.displayRecordPerPage(this.page);
        }
    }

    //clicking on next button this method will be called
    nextHandler() {
        if ((this.page < this.totalPage) && this.page !== this.totalPage) {
            this.page = this.page + 1; //increase page by 1
            this.displayRecordPerPage(this.page);
        }
    }

    //this method displays records page by page
    displayRecordPerPage(page) {
        this.startingRecord = ((page - 1) * this.pageSize);
        this.endingRecord = (this.pageSize * page);
        this.endingRecord = (this.endingRecord > this.totalRecountCount)
            ? this.totalRecountCount : this.endingRecord;
        this.data = this.items.slice(this.startingRecord, this.endingRecord);
        this.startingRecord = this.startingRecord + 1;
    }

    handleSearchKeyChange(searchKey) {
        this.incNoVal = searchKey.incNo;
        this.statusValue = searchKey.statusValue;
        this.appliesToValue = searchKey.appliesToValue;
    }
}