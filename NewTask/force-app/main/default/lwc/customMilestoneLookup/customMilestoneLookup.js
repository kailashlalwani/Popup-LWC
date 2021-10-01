import { LightningElement, track, wire} from 'lwc';
import getCustomLookupMilestone from '@salesforce/apex/lwcApexController.getCustomLookupMilestone';


export default class CustomMilestoneLookup extends LightningElement
{
    @track milestoneName='';
    @track milestoneList=[];
    @track objectApiName='New_Milestone__c';
    @track milestoneId;
    @track isShow=false;
    @track messageResult=false;
    @track isShowResult = true;
    @track showSearchedValues = false;
    @wire(getCustomLookupMilestone,{mileName:'$milestoneName'})
    retrieveMilestone ({error,data}){
        this.messageResult=false;
        if(data){
            console.log('data## ' + data.length);
            if(data.length>0 && this.isShowResult){
                this.milestoneList =data;
                this.showSearchedValues=true;
                this.messageResult=false;
            }
            else if(data.length == 0){
                this.milestoneList=[];
                this.showSearchedValues=false;
                if(this.milestoneName != ''){
                this.messageResult=true;
                }
            }
            else if(error){
                this.milestoneId='';
                this.milestoneName='';
                this.milestoneList=[];
                this.showSearchedValues=false;
                this.messageResult=true;
            }
    
        }
    }

    searchHandleClick(_event){
        this.isShowResult = true;
        this.messageResult = false;
      }
      
      
      searchHandleKeyChange(event){
        this.messageResult=false;
        this.milestoneName = event.target.value;
      }
      
        parentHandleAction(event){        
          this.showSearchedValues = false;
          this.isShowResult = false;
          this.messageResult=false;
          //Set the parent calendar id
          this.milestoneId =  event.target.dataset.value;
          //Set the parent calendar label
          this.milestoneName =  event.target.dataset.label;      
          console.log('milestoneId::'+this.milestoneId);    
          const selectedEvent = new CustomEvent('selected', { detail: this.milestoneId });
              // Dispatches the event.
          this.dispatchEvent(selectedEvent);    
        }
}