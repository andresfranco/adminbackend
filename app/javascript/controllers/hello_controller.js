import { Controller } from "@hotwired/stimulus"
import Swal from "sweetalert2"
export default class extends Controller {
  connect() {
 
  }

  showAlert(){
    Swal.fire('Any fool can use a computer')
  }
}
