import { LightningElement, track} from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import New_Milestone__c from '@salesforce/schema/New_Milestone__c';

import Name from '@salesforce/schema/New_Milestone__c.Name';
import Notified_to_When_Complete__c from '@salesforce/schema/New_Milestone__c.Notified_to_When_Complete__c'
import Description__c from '@salesforce/schema/New_Milestone__c.Description__c';

export default class AddMilestone extends LightningElement 
{
    mileId;
    milestoneName = '';
    notifyName = '';
    descName = '';

    formats = ["font", "size", "bold", "italic", "underline", "strike", "list", "indent", "align",
                 "link", "image", "clean",  "table",  "header",  "emoji"];
          

    @track check=true;
    @track isModalOpen = false;
    openModal() {
        // to open modal set isModalOpen tarck value as true
        this.isModalOpen = true;
    }
    closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
        this.handleReset();
    }
    connectedCallback(){
        this.isModalOpen = true;
    }
    

    // Description handler
    MileName(event)
    {
        this.milestoneName = event.target.value;
        console.log(this.milestoneName);
    }
    NotName(event)
    {
        this.notifyName = event.target.value;
        console.log(this.notifyName);
    }
    DesName(event){
        this.descName = event.target.value;
        console.log(this.descName)
    }

    insertMilestoneAction()
    {
        console.log(this.selectedMilestoneId);
        const fields = {};
        fields[Name.fieldApiName] = this.milestoneName;
        fields[Notified_to_When_Complete__c.fieldApiName] = this.notifyName;
        fields[Description__c.fieldApiName] = this.descName;

        const recordInput = { apiName: New_Milestone__c.objectApiName, fields };
        createRecord(recordInput)
        .then(milestoneobj =>{
            this.mileId = milestoneobj.id;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'New MileStone record has been created' ,
                    variant: 'success',
                }),
            )
            
                //this.isModalOpen = false;
                //location.reload(true);
                this.handleReset();
                if(this.check){ 
                    // pop closes when record saved.
                    location.reload(true);
                    this.isModalOpen=false
                    }
            
        })
        .catch(error => 
            { 
                console.log(JSON.stringify(error));
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    }), 
                );
                
            }
        );
        
    }
    
    // method to check the vailidity of field
    checkError() {
        var valid = true;
        var inputs = this.template.querySelectorAll(".requiredfield");
        inputs.forEach((input) => {
        if (!input.checkValidity()) {
            input.reportValidity();
            valid = false;
        }
        });
        return valid;
    }
    
    handleReset(event){
        const inputfields=this.template.querySelectorAll('.resetfields');
        if(inputfields){
          inputfields.forEach(field=>{
            field.value='';
            
            this.milestoneName = null;
            this.notifyName = null;
            this.descName = null;
            
          });
            
        }
    }
    

    //Save and New Buuton
    saveAndNewClick(event) {
        if (this.checkError()) { 
            this.insertMilestoneAction();
            this.check=false;
        }   
       
    }
    
   
    
    handleCancel(event){
        var url = window.location.href; 
        var value = url.substr(0,url.lastIndexOf('/') + 1);
        this.isModalOpen = false;
        return false;   
    }

    
    
}
