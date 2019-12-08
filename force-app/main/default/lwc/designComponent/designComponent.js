import { LightningElement, api } from 'lwc';

export default class DesignComponent extends LightningElement {
    // tracking attributes values
    @api showDetails = false;
    @api strName;
    @api empName;
    @api empDepartment;
    @api empLocation;
    @api empAge;
    @api empGender;
}