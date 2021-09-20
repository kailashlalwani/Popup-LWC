import { LightningElement , track, api} from 'lwc';
//import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
//import { createRecord } from "lightning/uiRecordApi"
import New_Task__c from '@salesforce/schema/New_Task__c';
//import saveTask from '@salesforce/apex/CreateTask.createNeweTask';

import Task_Name_Field from '@salesforce/schema/New_Task__c.Task_Name__c';
import Notified_Field from '@salesforce/schema/New_Task__c.Notified_to_When_Complete__c';
import End_Date_Field from '@salesforce/schema/New_Task__c.End_Date__c';
import Predessor_Filed from '@salesforce/schema/New_Task__c.Predessor_Task__c';
import Milestone_Field from '@salesforce/schema/New_Task__c.Milestone__c';
import Priority_Field from '@salesforce/schema/New_Task__c.Priority__c';
import Assign_Field from '@salesforce/schema/New_Task__c.Assign_to__c';
import Description_Field from '@salesforce/schema/New_Task__c.Description__c';


export default class NewTask extends LightningElement {
    allowedFormats =  ['font', 'size', 'bold', 'italic', 'underline', 'strike',
    'list', 'indent', 'align', 'link', 'image', 'clean', 'table', 'header', 'color',
    'background','code','code-block'];

    @track name = Task_Name_Field;
    @track notified = Notified_Field;
    @track endDate = End_Date_Field;
    @track predessor = Predessor_Filed;
    @track milestone = Milestone_Field;
    @track priority = Priority_Field;
    @track assign = Assign_Field;
    @track description = Description_Field;

    objectApiName = New_Task__c;
    @api recordId;
    @track isModalOpen = false;
    
    openModal() {
        // to open modal set isModalOpen tarck value as true
        this.isModalOpen = true;
    }
    closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
    }

    NewTaskName(event){
        this.taskName = event.detail.value;
    }

    Notified(event){
        this.notified = event.detail.value;
    }

    handleDateChange(event){
        this.endDate = event.detail.value;
    }

    handlePredessor(event){
        this.predessor = event.detail.value;
    }

    handleMilestone(event){
        this.milestone = event.detail.value;
    }

    handlePriority(event){
        this.priority = event.detail.value;
    }

    handleAssignto(event){
        this.assign = event.detail.value;
    }

    saveRecord() {
        let taskObj = { 'sobjectType': 'New_Task__c' };
        taskObj.Task_Name__c = this.taskName;
        taskObj.Notified_to_When_Complete__c = this.notified;
        taskObj.End_Date__c = this.endDate;
        taskObj.Predessor_Task__c = this.predessor;
        taskObj.Milestone__c = this.milestone;
        taskObj.Priority__c = this.priority;
        taskObj.Assign_to__c = this.assign;
        taskObj.Description__c = this.description;

        const value = true;
        const valueChangeEvent = new valueChangeEvent("valuechange", {
        detail: { value }
        });


    }

    handleClick(event) {
        this.clickedButtonLabel = event.target.label;
        this.template.querySelector('lightning-record-edit-form').submit(this.fields);
        this.isModalOpen = false;
        console.log('Task Name : ',event.detail.value);
        console.log('Milestone Name : ',event.detail.value);
    }

    handleSuccess() {
        const toastEvent = new ShowToastEvent({
            title: "New Task Created",
            message: "Record ID",
            variant: "Success"
        });
        this.dispatchEvent(toastEvent);
    }

    saveAndNewClick(event) {
        this.template.querySelector('lightning-record-edit-form').submit(this.fields);
        const inputFields = this.template.querySelectorAll(
            'lightning-input-field'
        );
        if (inputFields) {
            inputFields.forEach(field => {
                field.reset();
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