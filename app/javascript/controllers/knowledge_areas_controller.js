import {Controller} from "@hotwired/stimulus"
import { CustomAlerts } from "../utils/customAlerts"
// Connects to data-controller="knowledge-areas"
export default class extends Controller {

  connect() {}

  showDeleteAlert(event) {
    const customAlerts = new CustomAlerts()
    var alertParams ={
      title:'Are you sure you want to delete this record?',
      showCancelButton : true,
      confirmButtonText :'Yes',
      reloadWindow:true
    }
    customAlerts.confirmDeleteAlertRailsAjax(event,alertParams)
  }
  

}