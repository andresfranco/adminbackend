import {Controller} from "@hotwired/stimulus"
import { CustomAlerts } from "../utils/customAlerts"
// Connects to data-controller="knowledge-areas"
export default class extends Controller {

  connect() {}

  showDeleteAlert(event) {
    const customAlerts = new CustomAlerts()
    const taskURL = event.target.getAttribute('href')
    var alertParams ={
      title:'Are you sure you want to delete this record?',
      showCancelButton : true,
      confirmButtonText :'Yes',
      reloadWindow:true,
      taskURL:taskURL,
      errorStatusCode:'',
      errorStatusText:'',
      errorMessage:'Error:Deletion of this Knowlege base failed',
      errorTitle:'Error',
      errorAlertType:'error',
      errorAlertTimer:false,
      errorAlertTime:0,
      errorAlertRefreshWindow:false,
      errorAlertRefreshWindowTime:0,
      successStatusCode:200,
      successStatusText:'',
      successTitle:'Success',
      successMessage:'The Knowledge area has been deleted',
      successAlertType:'success',
      sucessAlertTimer:false,
      successAlertTime:0,
      successAlertRefreshWindow:true,
      successAlertRefreshWindowTime:2000,
      customDeleteUrl:'knowledge_areas/delete_fetch/',
      customUrlMainPath:'knowledge_areas/'

    }
    customAlerts.getDeleteAlert(event,alertParams,'fetch')
  
  }
  

}