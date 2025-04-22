sap.ui.define([
    "./BaseController",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter"

], (Controller,Fragment,JSONModel,Filter) => {
    "use strict";

    return Controller.extend("app.splitapp.controller.DetailView", {
        onInit() {
            var oRouter=this.getOwnerComponent().getRouter();
            oRouter.attachRoutePatternMatched(this.onRouteMatched,this)
        },
        onRouteMatched:function(oEvent){
            let index=oEvent.getParameter("arguments").index;
            let sPath="ToolModel>/toolTab/"+index;
            let oView=this.getView()
             oView.bindElement(sPath)

             let oModel=this.getModel("ToolModel")
             let searchString=oModel.getProperty("/toolTab/"+index+"/toolsName")
             let filterName=new sap.ui.model.Filter("toolsName",sap.ui.model.FilterOperator.EQ,searchString)
        //     //  let aFilter=[filterName]
             let oTable=this.getView().byId("idMTable")
             let bindingInfo=oTable.getBinding("items")
             bindingInfo.filter([filterName])
        },

        onListView:function(){
            let oRouter=this.getOwnerComponent().getRouter()
            oRouter.navTo("RouteMaster")
        },

        onFilter:function(){
 
            let aFilter=[]
            let sName=this.getView().byId("idInputSupp").getValue()
            let sCity=this.getView().byId("idInputCity").getValue()
            if(sName){
                let filterName=new Filter("supplierName",sap.ui.model.FilterOperator.Contains,sName)
                aFilter.push(filterName)
            }
            if(sCity){
                let filterCity=new Filter("location",sap.ui.model.FilterOperator.Contains,sCity)
                aFilter.push(filterCity)
            }
            let oTable=this.getView().byId("idMTable")
                 let bindingInfo=oTable.getBinding("items")
                 bindingInfo.filter(aFilter);
           
        },
     
        onConfimSupp:function(oEvent){
            let oSeletedItems=oEvent.getParameter("selectedItem")
            let sValue=oSeletedItems.getProperty("info")
            let oInput=sap.ui.getCore().byId(this.inputFiled)
                oInput.setValue(sValue)
            // confirm the choice
            // we need the value that selected
            // we need to place it exactly at the same input field where the value was selected
            // you are setting the value on that input field
          },
             
          onF4Help:function(oEvent){
            // let myInptFieldwhere the popup actually popped up
             this.inputFiled=oEvent.getSource().getId()
             let oModel=this.getView().getModel("ToolModel")
             let aData=oModel.getProperty("/supplierSet")
             let deepCopy=JSON.parse(JSON.stringify(aData))
             let oModelFrag=new JSONModel({newSuppSet:deepCopy})
           
            if(!this.oDiolog){
              this.oDiolog=Fragment.load({
                fragmentName:"app.splitapp.fragments.popUp",
                controller:this
              }).then((dialog)=>{
                this.oDiolog=dialog
                this.getView().addDependent(this.oDiolog)
                this.getView().setModel(oModelFrag,"FragmentModel")
                this.oDiolog.open()
              })
            }else{
                this.oDiolog.open()
            }
            
          }    


    });
});