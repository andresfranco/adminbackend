import { Controller } from "@hotwired/stimulus"
import Swal from "sweetalert2"
import Rails from "@rails/ujs";
// Connects to data-controller="knowledge-areas"
export default class extends Controller {

  connect() {
  }

  showDeleteAlert(event){
    
    event.preventDefault()
    const taskURL = event.target.getAttribute('href')
      Swal.fire({
        title: 'Are you sure you want to delete this record?',
        showCancelButton: true,
        confirmButtonText: 'Yes'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Rails.ajax({
            type:"Delete",
            url:taskURL 

          })
          window.location.reload()
        }
      })
    
  
   
  }


  
}
