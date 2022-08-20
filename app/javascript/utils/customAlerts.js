import Swal from "sweetalert2"
import Rails from "@rails/ujs";
import {getAjaxErrorMessage} from "../utils/errorHandler"

export class CustomAlerts {

     getAlertMessage(alertType,alertParams){
    
    if(alertType ==='error') {
      var errorMessage = alertParams.errorMessage+': '+ getAjaxErrorMessage(alertParams.errorStatusCode,alertParams.errorStatusText)
      alertParams.errorAlertTimer ?alertParams.errorAlertTime:alertParams.errorAlertTime=0
      setTimeout(function(){Swal.fire(alertParams.errorTitle,errorMessage,alertParams.errorAlertType)},alertParams.errorAlertTime)
      if(alertParams.errorAlertRefreshWindow) this.refreshScreenTimer(alertParams.errorAlertRefreshWindowTime,alertParams.errorAlertRefreshWindow)
        
    }
    if (alertType ==='success'){
      alertParams.sucessAlertTimer ?alertParams.successAlertTime:alertParams.successAlertTime=0
      setTimeout(function(){Swal.fire(alertParams.successTitle,alertParams.successMessage,alertParams.successAlertType)},alertParams.successAlertTime)
      if(alertParams.successAlertRefreshWindow) this.refreshScreenTimer(alertParams.successAlertRefreshWindowTime,alertParams.successAlertRefreshWindow)
    }
    
   
   
  }

  refreshScreenTimer(time,refreshWindow){
    setTimeout(function(){
      if(refreshWindow) window.location.reload()
    },time)
  }

  getCustomDeleteUrl(taskUrl,pathToReplace,replacementValue){
      return taskUrl.replace(pathToReplace,replacementValue)
  }

  getCRFToken(){
    var crfToken = document.getElementsByName("csrf-token")[0].content
     return crfToken != null?crfToken:""
  }
    
    setDeleteAlertValues(alertType,alertParams){
        var deleteAlertValues={}
        if(alertType ==='delete'){
          deleteAlertValues=
          { 
            methodType:'Delete',
            taskURL:alertParams.taskURL,
            contentType:'application/json'
          } 
        }
        return deleteAlertValues
        
    }
     
     getDeleteAlert(event,alertParams,alertType){
      switch (alertType) {
        case 'ajax':
          this.confirmDeleteAlertRailsAjax(event,alertParams)
        case 'fetch':
          this.confirmDeleteAlertFetch(event,alertParams)
          break;
        default:
          this.confirmDeleteAlertFetch(event,alertParams)
      }
     }     

    confirmDeleteAlertRailsAjax(event,alertParams){
      event.preventDefault()
      const _this =this
      const deleteAlertValues = this.setDeleteAlertValues('delete',alertParams)
      Swal.fire({
      title:alertParams.title,
      showCancelButton:alertParams.showCancelButton ,
      confirmButtonText: alertParams.confirmButtonText })
      .then((result) => {
      if (result.isConfirmed) {
          Rails.ajax({
           type:deleteAlertValues.methodType,
           url:deleteAlertValues.taskURL,
           success:()=>{
              _this.getAlertMessage('success',alertParams)
           },
           error:(response,statusText,xhr)=>{ 
              alertParams.errorStatusCode = xhr.status
              alertParams.errorStatusText = xhr.statusText
              _this.getAlertMessage('error',alertParams)

           }
        })
        
      }
    })
    }
     
    confirmDeleteAlertFetch(event,alertParams){
        event.preventDefault()
        const csrfToken = this.getCRFToken()
        const deleteAlertValues = this.setDeleteAlertValues('delete',alertParams)
        const taskURL =this.getCustomDeleteUrl(deleteAlertValues.taskURL,alertParams.customUrlMainPath,alertParams.customDeleteUrl)
        Swal.fire({
          title:alertParams.title,
          showCancelButton:alertParams.showCancelButton ,
          confirmButtonText: alertParams.confirmButtonText 
        })
        .then((result) => {
          if (result.isConfirmed) {
              return fetch(taskURL ,{
                  method:deleteAlertValues.methodType,
                  headers: {
                  'X-CSRF-Token': csrfToken,
                  'Content-Type': deleteAlertValues.contentType
                  }
              })
              .then(response => {
                  response.ok? this.getAlertMessage('success',alertParams) 
                               :(alertParams.errorStatusCode = response.status
                                ,alertParams.errorStatusText = response.statusText
                                ,this.getAlertMessage('error',alertParams))
              })
              .catch(error => {
                  alertParams.errorStatusCode =''
                  alertParams.errorStatusText = error 
                  this.getAlertMessage('error',alertParams) 
               
              })  
          }
        })
     }
}