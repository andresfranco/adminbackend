export function getAjaxErrorMessage(xhr){
    var errorMessage =""
    if (xhr.status === 0) {
        errorMessage = 'Not connected.\nPlease verify your network connection.'
    } else if (xhr.status == 404) {
        errorMessage = 'The requested page not found. [404]'
    } else if (xhr.status == 500) {
        errorMessage = 'Internal Server Error [500].'
    } else{
        errorMessage = 'Server Response Error \n' + xhr.responseText
    }
    return errorMessage
}

export function showErrorAlertMessage (errorMessage){
    alert(errorMessage)  
}