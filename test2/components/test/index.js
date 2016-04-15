'use strict';
// START_CUSTOM_CODE_test
var DMP_GetUserCodes_DataSource_Options = {};
var DMP_GetUserCodes_DataSource = {};
var DMP_GetUserCodes_ViewModel = {};

var DMP_GetUserCodes_DataSource_Options2 = {};
var DMP_GetUserCodes_DataSource2 = {};
var DMP_GetUserCodes_ViewModel2 = {};

var test = [];

app.home = kendo.observable({
    onShow: function() {
        DMP_GetUserCodes_DataSource2.read();
        DMP_GetUserCodes_DataSource.read();
        //alert(DMP_GetUserCodes_DataSource2.view()[0].CREDENTIAL);
        
        /*
        var templateContent2 = $("#myTemplate").html();
        var template = kendo.template(templateContent2);

        //Create some dummy data
        var data = [
            { name: "John", isAdmin: false },
            { name: "Alex", isAdmin: true }
        ];
        var result = kendo.render(template, data); //render the template
        $("#users").html(result); //append the result to the page
        */
        
        /*
        var templateContent3 = $("#product-template").html();
        alert(templateContent3);
        var template3 = kendo.template(templateContent3);
        var data5 = DMP_GetUserCodes_DataSource2.data();
        var result2 = kendo.render(template3, data5); //render the template
        $("template#1").html(result2); //append the result to the page
        
        
        var templateContent4 = $("#product-template").html();
        alert(templateContent4);
        var template4 = kendo.template(templateContent3);

        //Create some dummy data
        //var data5 = [];
        //data5[0] = DMP_GetUserCodes_DataSource2.data()[0]
        //alert(JSON.stringify(data5));
        var data6 = DMP_GetUserCodes_DataSource2.data();
        alert(JSON.stringify(data6));
        var result3 = kendo.render(template4, data6); //render the template
        $("template#" + DMP_GetUserCodes_DataSource.view()[1].PANEL).html(result3); //append the result to the page
        */
    },
    afterShow: function() {
    }
});


(function (parent) {
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

    //This datasource performs a GET request to the everlive cloud function S2_GetCardFormats
    DMP_GetUserCodes_DataSource_Options = {
        transport: {
            read: function (options) {
                //var syncSettings = JSON.stringify(options.data);
                var data = [];
                var i = 0;
                for (i = 0; i < 2; i++) {
                	data.push({
                    	PANEL: "PANEL" + i,
                        IDS: i,
                    });
          		}
                options.success(data);
            }
        },
        change: function (e) {
        },
        error: function (err) {
        },
        schema: {
            model: {
                fields: {
                    'PANEL': {
                        field: 'PANEL',
                        defaultValue: ''
                    },
                    'IDS': {
                        field: 'IDS',
                        defaultValue: ''
                    },
                }
            }
        }
    };

    //Create the datasource with options
    DMP_GetUserCodes_DataSource = new kendo.data.DataSource(DMP_GetUserCodes_DataSource_Options);

    //This datasource performs a GET request to the everlive cloud function S2_GetCardFormats
    DMP_GetUserCodes_DataSource_Options2 = {
        transport: {
            read: function (options) {
                //var syncSettings = JSON.stringify(options.data);
                var data = [];
                var i = 0;
                for (i = 0; i < 1; i++) {
                	data.push({
                    	CREDENTIAL: "CREDENTIAL" + i,
                    });
          		}
                options.success(data);
            }
        },
        change: function (e) {
        },
        error: function (err) {
        },
        schema: {
            model: {
                fields: {
                    'CREDENTIAL': {
                        field: 'CREDENTIAL',
                        defaultValue: ''
                    },
                }
            }
        }
    };

    //Create the datasource with options
    DMP_GetUserCodes_DataSource2 = new kendo.data.DataSource(DMP_GetUserCodes_DataSource_Options2);
    
    
    DMP_GetUserCodes_ViewModel = kendo.observable({
        dataSource: DMP_GetUserCodes_DataSource
    });

    
    DMP_GetUserCodes_ViewModel2 = kendo.observable({
        dataSource: DMP_GetUserCodes_DataSource2
    });

    parent.set('DMP_GetUserCodes_ViewModel', DMP_GetUserCodes_ViewModel);
    parent.set('DMP_GetUserCodes_ViewModel2', DMP_GetUserCodes_ViewModel2);

})(app.home);

// END_CUSTOM_CODE_test