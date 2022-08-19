

export function getAjaxErrorMessage(status, statusText){
    var errorMessage =""
    if (status === 0) {
        errorMessage = 'Not connected.\nPlease verify your network connection.'
    } else if (status == 404) {
        errorMessage = 'The requested page not found. [404]'
    } else if (status == 500) {
        errorMessage = 'Internal Server Error [500].'
    } else{
       errorMessage = 'Server Response Error \n' + statusText
    }
    return errorMessage
}

export function showErrorAlertMessage (errorMessage){
    alert(errorMessage)  
}