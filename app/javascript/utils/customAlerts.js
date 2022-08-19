import Swal from "sweetalert2"
import Rails from "@rails/ujs";
import {getAjaxErrorMessage} from "../utils/errorHandler"

export function getErrorAlert(status,statusText){
  var errorMessage = getAjaxErrorMessage(status,statusText)
  Swal.fire('',errorMessage,'error')
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
          success:function(){ if(alertParams.reloadWindow){window.location.reload()}},
          error:function(response,statusText,xhr){
            getErrorAlert(xhr.status,xhr.statusText)
          }
        })
        //}
      }
    })
    }
     
    ///This alert only works if the value: "skip_before_action :verify_authenticity_token" is assigned to the method in the Rails controller 
    // call in view:  <%= link_to "delete fetch", knowledge_area, data: { turbo_method: :delete, action:'click->knowledge-areas#showFetchAlert' } %>
    //Call in javascript method: customAlerts.confirmDeleteAlertFetch(event,alertParams)
    confirmDeleteAlertFetch(event,alertParams){
        
        event.preventDefault()
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
                    'Content-Type': deleteAlertValues.contentType
                  }
            })
            .then(response => {
                if(response.ok){
                  if(alertParams.reloadWindow){window.location.reload()}
                }
                else{
                  getErrorAlert(response.status,response.statusText)
                  
                }
            })
            .catch(error => {
              var errorMessage = deleteAlertValues.errorMessage+error.errorMessage
              getErrorAlert(null,errorMessage )
            })
           
        }
      })
      }

}