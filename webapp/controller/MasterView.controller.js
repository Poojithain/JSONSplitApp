sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter"

], (Controller,JSONModel,Filter) => {
    "use strict";

    return Controller.extend("app.splitapp.controller.MasterView", {
        onInit() {
         
        },

        onDetailView:function(){
            let oRouter=this.getOwnerComponent().getRouter()
            oRouter.navTo("RouteDetailView")
        },
		onCreatePress:function(){
			let oRouter1=this.getOwnerComponent().getRouter()
			oRouter1.navTo("RouteFormView")
		},

        onSort:function(){
			if(!this.bDescending){
			this.bDescending=false;   //Variable is being used as a flag(true/false) to determine howt he list should be sorted
			}
			
			var oSorter=new sap.ui.model.Sorter("toolsName",this.bDescending);
			var oList=this.getView().byId("idListCtrl");
			var oBinding=oList.getBinding("items");
			oBinding.sort(oSorter);
			this.bDescending=!this.bDescending;
			
		},

        onsearch:function(oEvent){
        	var searchString=oEvent.getParameter("query")||oEvent.getParameter("newValue");
        	var oName=new Filter("toolsName",sap.ui.model.FilterOperator.Contains,searchString);
        	var oAvail=new Filter("availability",sap.ui.model.FilterOperator.Contains,searchString);
        
        	var aFilter=[oName,oAvail];
        		var mainFilter = new Filter({
        			filters:aFilter,
        			and:false
        			
        		});
        	var oList=this.getView().byId("idListCtrl");
        	var oBinding=oList.getBinding("items");
        	oBinding.filter(mainFilter);
        	
        },

        onItemSelect:function(oEvent){

            var oList=oEvent.getParameter("listItem");
            let sPath=oList.getBindingContextPath();
            let aItems=sPath.split("")
            let id=aItems[aItems.length-1]
            let oRouter=this.getOwnerComponent().getRouter()
            oRouter.navTo("RouteDetailView",{
                index:id
            })
        	
        	// var oList=oEvent.getParameter("listItem");    	
        	// // secondly get the binding context path
        	// var sPath=oList.getBindingContextPath();
        	// var completePath="ToolModel>"+sPath;
        	// console.log(completePath);
        	
        	// //get the object of detail view from the parent view
        	// var oApp=this.getView().getParent();
        	// var oDetail=oApp.mAggregations.pages[1];
        	// //Bind the page with path
        	
        	// oDetail.bindElement(completePath);
        	// 	this.onDetailView();
        }

    });
});