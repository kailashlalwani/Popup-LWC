public with sharing class CreateTask {
    @AuraEnabled
    public static New_Task__c createNeweTask(New_Task__c newRecord) {
        insert newRecord;
        return null;
     }
 }

