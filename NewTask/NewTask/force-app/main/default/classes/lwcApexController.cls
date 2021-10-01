public with sharing class lwcApexController {
    //custom lookup lwc
    @AuraEnabled(cacheable=true)
    public static List<New_Milestone__c> getCustomLookupMilestone (String mileName){
    List<New_Milestone__c> mileLookupList =  new List<New_Milestone__c>();
    if(mileName != ''){
        String milestoneName = '%' + mileName + '%';
        mileLookupList = [Select id, Milestone_Name__c From New_Milestone__c Where Milestone_Name__c like:milestoneName];
       
    }
    return mileLookupList;
    }   
}
