import Rails from "@rails/ujs";
import {getAjaxErrorMessage,showErrorAlertMessage} from "../utils/errorHandler" 
export class RailsAjaxMethods{
    
    deleteAjax(methodType,url){
        
        Rails.ajax({
            type:methodType,
            url:url ,
            error:function(response,statusText,xhr){
                var errorMessage =getAjaxErrorMessage(xhr.status,xhr.statusText)
                showErrorAlertMessage(errorMessage)
            }
          })
    }

        

}