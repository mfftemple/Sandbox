'use strict';
var viewModel = {};

app.home = kendo.observable({
    onShow: function() {
    },
    afterShow: function() {
    }
});


(function (parent) {

    viewModel = kendo.observable({
        demoData: [{
            id: 1,
            HOTSTAMP: '1234',
			CARDFORMAT: "26 bit wiegand",
			STATUS: "ACTIVE",
            PANELS: [{
                PANELNAME: "MAIN OFFICE", 
                ENABLED: "ENABLED",
                USER_CODE: "1234",
				PROFILE: 1,
				PROFILENAME: "MASTER ACCESS",
            },{
                PANELNAME: "WAREHOUSE",
                ENABLED: "DISABLED",
                USER_CODE: "1234",
				PROFILE: 0,
				PROFILENAME: "",
            }],
       	},{
            id: 2,
            HOTSTAMP: '2222',
			CARDFORMAT: "26 bit wiegand",
			STATUS: "ACTIVE",
            PANELS: [{
                PANELNAME: "MAIN OFFICE",
                ENABLED: "ENABLED",
				USER_NO: "",
                USER_CODE: "2222",
				PROFILE: 99,
				PROFILENAME: "EMPLOYEE"
            },{
				PANELNAME: "WAREHOUSE",
                ENABLED: "ENABLED",
				USER_NO: "",
				USER_CODE: "2222",
				PROFILE: 1,
				PROFILENAME: "MASTER ACCESS"
			}],
        }],
    	change: function(e){
        	alert(e.field);
    	}
   	});

    parent.set('viewModel', viewModel);

})(app.home);
