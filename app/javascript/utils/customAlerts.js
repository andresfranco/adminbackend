import Swal from "sweetalert2"
import {RailsAjaxMethods} from "../utils/railsAjaxMethods"

export class CustomAlerts {
     constructor(){

     }
    setDeleteAlertValues(event){
        const deleteAlertValues ={ 
            methodType:"Delete",
            taskURL:event.target.getAttribute('href'),
            contentType:'application/json',
            errorMessage:'Request failed:'
        } 
        return deleteAlertValues
        
    }
     
    confirmDeleteAlertRailsAjax(event,alertParams){
      event.preventDefault()
      const deleteAlertValues = this.setDeleteAlertValues(event)
      const railsAjaxMethods = new RailsAjaxMethods() 
      Swal.fire({
      title:alertParams.title,
      showCancelButton:alertParams.showCancelButton ,
      confirmButtonText: alertParams.confirmButtonText 
    }).then((result) => {
      if (result.isConfirmed) {
         
        railsAjaxMethods.deleteAjax(deleteAlertValues.methodType ,deleteAlertValues.taskURL)
        if(alertParams.reloadWindow){window.location.reload()}
      }
    })
    }
     
    ///This alert only works if the value: "skip_before_action :verify_authenticity_token" is set in the controller 
    // call in view:  <%= link_to "delete fetch", knowledge_area, data: { turbo_method: :delete, action:'click->knowledge-areas#showFetchAlert' } %>
    //Call in javascript method: customAlerts.confirmDeleteAlertFetch(event,alertParams)
    confirmDeleteAlertFetch(event,alertParams){
        event.preventDefault()
        const deleteAlertValues = this.setDeleteAlertValues(event)
        this.setDeleteAlertValues(event)
        Swal.fire({
        title:alertParams.title,
        showCancelButton:alertParams.showCancelButton ,
        confirmButtonText: alertParams.confirmButtonText 
      }).then((result) => {
        if (result.isConfirmed) {
            return fetch(deleteAlertValues.taskURL,{
                method:deleteAlertValues.methodType,
                headers: {
                    'Content-Type': deleteAlertValues.contentType
                  }
            })
            .then(response => {
                if(response.ok){
                  if(alertParams.reloadWindow){window.location.reload()}
                }
            })
            .catch(error => {
              Swal.showValidationMessage(
                deleteAlertValues.errorMessage+error.errorMessage
              )
            })
           
        }
      })
      }

}