sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],(Controller,JSONmodel)=>{
    "use strict";
    return Controller.extend("app.splitapp.controller.BaseController",{
        onInit(){

        },
        getModel:function(model){
            return this.getView().getModel(model)
        }

    })

})