import { LightningElement, api , track } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
//import saveFile from '@salesforce/apex/testcontroller.saveFile';
import New_Milestone__c from '@salesforce/schema/New_Milestone__c';
import Milestone_Name__c from '@salesforce/schema/New_Milestone__c.Milestone_Name__c';
import Notified_to_When_Complete__c from '@salesforce/schema/New_Milestone__c.Notified_to_When_Complete__c'
import Description__c from '@salesforce/schema/New_Milestone__c.Description__c';

export default class AddMilestone extends LightningElement 
{
    allowedFormats =  ['font', 'size', 'bold', 'italic', 'underline', 'strike',
    'list', 'indent', 'align', 'link', 'image', 'clean', 'table', 'header', 'color',
    'background','code','code-block'];

    objectApiName = New_Milestone__c;
    fields = [Milestone_Name__c, Notified_to_When_Complete__c, Description__c];

    @api myRecordId;
    @track isModalOpen = false;
    
    openModal() {
        // to open modal set isModalOpen tarck value as true
        this.isModalOpen = true;
    }
    closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
    }
    handleClick(event) {
        this.clickedButtonLabel = event.target.label;
        this.template.querySelector('lightning-record-edit-form').submit(this.fields);
        this.isModalOpen = false;
    }
    handleSuccess(event) {
        const toastEvent = new ShowToastEvent({
            title: "New Milestone Created",
            message: "Record ID: " + event.detail.id,
            variant: "Success"
        });
        this.dispatchEvent(toastEvent);
    }
    saveAndNewClick() {
        this.template.querySelector('lightning-record-edit-form').submit(this.fields);
        const inputFields = this.template.querySelectorAll(
            'lightning-input-field'
        );
        if (inputFields) {
            inputFields.forEach(fields => {
                fields.reset();
            });
        }
       
       
    }
    
    handleCancel(event){
        var url = window.location.href; 


        var value = url.substr(0,url.lastIndexOf('/') + 1);


        this.isModalOpen = false;


        return false;


    }
    
}