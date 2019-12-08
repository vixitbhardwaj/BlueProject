import { LightningElement, wire } from 'lwc';
import getAllAccounts from '@salesforce/apex/AccountManager.getAccounts'

export default class AccountManager extends LightningElement {
    @wire(getAllAccounts)
    accounts;

    get responseAccounts() {
        if (this.accounts) {
            return true;
        }
        return false;
    }

}