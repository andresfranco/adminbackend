import Swal from "sweetalert2"
import Rails from "@rails/ujs";
import {getAjaxErrorMessage} from "../utils/errorHandler"


export function getAlertMessage(status,statusText,alertTitle,alertType,errorMessage,hasTimer,time,refreshWindow,refresWindowTime){
  if(alertType ==='error'){errorMessage = getAjaxErrorMessage(status,statusText)}
  hasTimer ?setTimeout(function(){Swal.fire(alertTitle,errorMessage,alertType)}, time):Swal.fire(alertTitle,errorMessage,alertType)
  if(refreshWindow){refreshScreenTimer(refresWindowTime,refreshWindow) }
}
  

export function refreshScreenTimer(time,refreshWindow){
  setTimeout(function(){
    if(refreshWindow){window.location.reload()} 
  },time)
}
export class CustomAlerts {
     constructor(){

     }
    setDeleteAlertValues(event){
        const deleteAlertValues ={ 
            methodType:"Delete",
            taskURL:event.target.getAttribute('href'),
            contentType:'application/json',
            errorMessage:'Request Error:'
        } 
        return deleteAlertValues
        
    }
     
     getDeleteAlert(event,alertParams,alertType){
      var customAlert = new CustomAlerts()
      switch (alertType) {
        case 'ajax':
          customAlert.confirmDeleteAlertRailsAjax(event,alertParams)
        case 'fetch':
          customAlert.confirmDeleteAlertFetch(event,alertParams)
          break;
        default:
          customAlert.confirmDeleteAlertFetch(event,alertParams)
      }
     }     

    confirmDeleteAlertRailsAjax(event,alertParams){
      event.preventDefault()
      const deleteAlertValues = this.setDeleteAlertValues(event)
      Swal.fire({
      title:alertParams.title,
      showCancelButton:alertParams.showCancelButton ,
      confirmButtonText: alertParams.confirmButtonText 
    }).then((result) => {
      if (result.isConfirmed) {
        Rails.ajax({
          type:deleteAlertValues.methodType,
          url:deleteAlertValues.taskURL,
          success:function(){
            getAlertMessage(200,'',"Success",'success','The Knowledge area has been deleted',false,0,true,2000)
          },
          error:function(response,statusText,xhr){
            getAlertMessage(xhr.status,xhr.statusText,"Error",'error','Error',false,0,false,0)
          }
        })
        //}
      }
    })
    }
     
    ///"skip_before_action :verify_authenticity_token" is assigned to the method in the Rails controller only if need to skip the use of CSRF token
    // call in view:  <%= link_to "delete fetch", knowledge_area, data: { turbo_method: :delete, action:'click->knowledge-areas#showFetchAlert' } %>
    //Call in javascript method: customAlerts.confirmDeleteAlertFetch(event,alertParams)
    confirmDeleteAlertFetch(event,alertParams){
        
        event.preventDefault()
        const csrfToken = document.getElementsByName("csrf-token")[0].content;
        const deleteAlertValues = this.setDeleteAlertValues(event)
        const taskURL =deleteAlertValues.taskURL.replace("knowledge_areas/","knowledge_areas/delete_fetch/")
        this.setDeleteAlertValues(event)
        Swal.fire({
        title:alertParams.title,
        showCancelButton:alertParams.showCancelButton ,
        confirmButtonText: alertParams.confirmButtonText 
      }).then((result) => {
        if (result.isConfirmed) {
            return fetch(taskURL ,{
                method:deleteAlertValues.methodType,
                headers: {
                  'X-CSRF-Token': csrfToken,
                  'Content-Type': deleteAlertValues.contentType
                  }
            })
            .then(response => {
                  response.ok ? getAlertMessage(response.status,'',"Success",'success','The Knowledge area has been deleted',false,0,true,2000)
                  :getAlertMessage(response.status,response.statusText,"Error",'error','Error',false,0,false,0)
            })
            .catch(error => {
              var errorMessage = deleteAlertValues.errorMessage+error.errorMessage
              getAlertMessage(response.status,response.statusText,"Error",'error',errorMessage,false,0,false,0)
            })
           
        }
      })
      }

}