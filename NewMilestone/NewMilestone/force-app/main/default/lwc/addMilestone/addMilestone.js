import { LightningElement, track } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import New_Milestone__c from '@salesforce/schema/New_Milestone__c';
import Milestone_Name__c from '@salesforce/schema/New_Milestone__c.Milestone_Name__c';
import Notified_to_When_Complete__c from '@salesforce/schema/New_Milestone__c.Notified_to_When_Complete__c'
import Description__c from '@salesforce/schema/New_Milestone__c.Description__c';

export default class AddMilestone extends LightningElement 
{

    milestoneName = '';
    notifyName = '';
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
    

    mileChangeVal(event){
        console.log(event.target.label);
        console.log(event.target.value);        
        if(event.target.label=='Milestone_Name__c'){
            this.milestoneName = event.target.value;
        }
        if(event.target.label=='Notified_to_When_Complete__c'){
            this.notifyName = event.target.value;
        }  
                  
    }

    insertMilestoneAction(){
        console.log(this.selectedMilestoneId);
        const fields = {};
        fields[Milestone_Name__c.fieldApiName] = this.milestoneName;
        fields[Notified_to_When_Complete__c.fieldApiName] = this.notifyName;
        fields[Description__c.fieldApiName] = this.descName;

        const recordInput = { apiName: New_Milestone__c.objectApiName, fields };
        createRecord(recordInput)
        .then(milestoneobj =>{
            this.mileId = milestoneobj.id;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'New MileStone record has been created',
                    variant: 'success',
                }),
            );
        })

        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating record',
                    message: error.body.message,
                    variant: 'error',
                }),
            );
        });
    }
    
    handleCancel(event){
        var url = window.location.href; 


        var value = url.substr(0,url.lastIndexOf('/') + 1);


        this.isModalOpen = false;


        return false;


    }
    
}