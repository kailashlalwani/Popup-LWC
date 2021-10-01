import { LightningElement , track, api} from 'lwc';

import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { createRecord } from "lightning/uiRecordApi"

import New_Task__c from '@salesforce/schema/New_Task__c';
import Task_Name__c from '@salesforce/schema/New_Task__c.Task_Name__c';
import Notified_to_When_Complete__c from '@salesforce/schema/New_Task__c.Notified_to_When_Complete__c';
import End_Date__c from '@salesforce/schema/New_Task__c.End_Date__c';
import Predessor_Task__c from '@salesforce/schema/New_Task__c.Predessor_Task__c';
import Milestone__c from '@salesforce/schema/New_Task__c.Milestone__c';
import Priority__c from '@salesforce/schema/New_Task__c.Priority__c';
import Assign_to__c from '@salesforce/schema/New_Task__c.Assign_to__c';
import Description__c from '@salesforce/schema/New_Task__c.Description__c';


export default class NewTask extends LightningElement {

    @api recordId;
    @track selectedMilestoneId;
    @track selectedTaskId;
    
    taskName = '';
    notifyName = '';
    notifyDate = '';
    predessorName = '';
    milestoneName = '';
    priorityName = '';
    assignName = '';
    descName = '';


    allowedFormats =  ['font', 'size', 'bold', 'italic', 'underline', 'strike',
    'list', 'indent', 'align', 'link', 'image', 'clean', 'table', 'header', 'color',
    'background','code','code-block'];

    @track isModalOpen = false;
    openModal() {
        // to open modal set isModalOpen tarck value as true
        this.isModalOpen = true;
    }
    closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
    }


    taskChangeval(event){
        console.log(event.target.label);
        console.log(event.target.value);
        if(event.target.label=='Task_Name__c'){
            this.taskName = event.target.value;
        }
        if(event.target.label=='Notified_to_When_Complete__c'){
            this.notifyName = event.target.value;
        }
        if(event.target.label=='End_Date__c'){
            this.notifyDate = event.target.value;
        }
        
        if(event.target.label=='Predessor_Task__c'){
            this.predessorName = event.target.value;
        }
        if(event.target.label=='Milestone__c'){
           this.milestoneName = event.target.value;
        }
        if(event.target.label=='Priority__c'){
            this.priorityName = event.target.value;
        }
        if(event.target.label=='Assign_to__c'){
            this.assignName = event.target.value;
        }
        if(event.target.label == 'Description__c'){
            this.descName = event.target.value; 
        }
    } 

    insertTaskaction(){
        
        console.log(this.selectedMilestoneId);
        const fields = {};
        fields[Task_Name__c.fieldApiName] = this.taskName;
        fields[Notified_to_When_Complete__c.fieldApiName] = this.notifyName;
        fields[End_Date__c.fieldApiName] = this.notifyDate;
        fields[Predessor_Task__c.fieldApiName] = this.predessorName;
        fields[Milestone__c.fieldApiName] = this.milestoneName;
        fields[Priority__c.fieldApiName] = this.priorityName;
        fields[Assign_to__c.fieldApiName] = this.assignName;
        fields[Description__c.fieldApiName] = this.descName;
        
        
        const recordInput = { apiName: New_Task__c.objectApiName, fields };
        createRecord(recordInput)
        .then(taskobj =>{
            this.taskId = taskobj.id;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'New Task record has been created',
                    variant: 'success',
                }),
            );
        })

        .catch(error => {
            console.log(JSON.stringify(error));
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error ',
                    message: error.body.message,
                    variant: 'error',
                }),
            );
        });
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: taskobj.id,
                objectApiName: 'New_Task__c', 
                actionName: 'view'
            },
        });
    }
    
    
    handleCancel(event){
        var url = window.location.href; 
        var value = url.substr(0,url.lastIndexOf('/') + 1);
        this.isModalOpen = false;
        return false;
    }
    

    myLookupHandle(event){
        this.selectedMilestoneId = event.detail;
        console.log(this.selectedMilestoneId);
    }
}