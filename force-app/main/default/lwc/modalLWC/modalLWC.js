import { LightningElement, track, api } from 'lwc';

export default class ModalLWC extends LightningElement {
    @track bShowModal = false;
    @api showDetails = false;
    @api strName;
    @api empName;
    @api empDepartment;
    @api empLocation;
    @api empAge;
    @api empGender;

    /* javaScipt functions start */
    openModal() {
        // to open modal window set 'bShowModal' tarck value as true
        this.bShowModal = true;
    }

    closeModal() {
        // to close modal window set 'bShowModal' tarck value as false
        this.bShowModal = false;
    }
    /* javaScipt functions end */
}