# Pin npm packages by running ./bin/importmap

pin "application", preload: true
pin "@hotwired/turbo-rails", to: "turbo.min.js", preload: true
pin "@hotwired/stimulus", to: "stimulus.min.js", preload: true
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js", preload: true
pin_all_from "app/javascript/controllers", under: "controllers"
pin "sweetalert2" # @11.4.26
pin "@rails/ujs", to: "@rails--ujs.js" # @7.0.3
pin "RailsAjaxMethods" , to: "utils/railsAjaxMethods.js",preload:true
pin "CustomAlerts" , to: "utils/customAlerts.js",preload:true
pin "ErrorHandler", to: "utils/errorHandler.js",preload:true