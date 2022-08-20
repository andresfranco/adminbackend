import Swal from "sweetalert2"
import Rails from "@rails/ujs";
import {getAjaxErrorMessage} from "../utils/errorHandler"

export class CustomAlerts {

  getAlertMessage(status,statusText,alertTitle,alertType,errorMessage,hasTimer,time,refreshWindow,refresWindowTime){
    if(alertType ==='error') errorMessage = errorMessage+': '+getAjaxErrorMessage(status,statusText)
    hasTimer ?setTimeout(function(){Swal.fire(alertTitle,errorMessage,alertType)}, time):Swal.fire(alertTitle,errorMessage,alertType)
    if(refreshWindow) this.refreshScreenTimer(refresWindowTime,refreshWindow)
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
             _this.getAlertMessage(alertParams.successStatusCode,alertParams.successStatusText
                  ,alertParams.successTitle,alertParams.successAlertType
                  ,alertParams.successMessage,alertParams.sucessAlertTimer,alertParams.successAlertTime
                  ,alertParams.successAlertRefreshWindow,alertParams.successAlertRefreshWindowTime)
           },
           error:(response,statusText,xhr)=>{ 
            _this.getAlertMessage(xhr.status,xhr.statusText,alertParams.errorTitle
                 ,alertParams.errorAlertType,alertParams.errorMessage,alertParams.errorAlertTimer
                 ,alertParams.errorAlertTime,alertParams.errorAlertRefreshWindow,alertParams.errorAlertRefreshWindowTime)
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
                  response.ok ? this.getAlertMessage(alertParams.successStatusCode,alertParams.successStatusText
                    ,alertParams.successTitle,alertParams.successAlertType
                    ,alertParams.successMessage,alertParams.sucessAlertTimer,alertParams.successAlertTime
                    ,alertParams.successAlertRefreshWindow,alertParams.successAlertRefreshWindowTime)
                  :this.getAlertMessage(response.status,response.statusText,alertParams.errorTitle
                    ,alertParams.errorAlertType,alertParams.errorMessage,alertParams.errorAlertTimer
                    ,alertParams.errorAlertTime,alertParams.errorAlertRefreshWindow,alertParams.errorAlertRefreshWindowTime)
              })
              .catch(error => {
                this.getAlertMessage('',error,alertParams.errorTitle
                ,alertParams.errorAlertType,alertParams.errorMessage,alertParams.errorAlertTimer
                ,alertParams.errorAlertTime,alertParams.errorAlertRefreshWindow,alertParams.errorAlertRefreshWindowTime)
              })
           
          }
        })
     }
}