'use strict';

app.home = kendo.observable({
    onShow: function() {},
    afterShow: function() {}
});

// START_CUSTOM_CODE_home
'use strict';
var viewModel = {};
var profilesViewModel = {};
var cardFormatsViewModel = {};
var cardFormatsDataSourceOptions = {};
var cardFormatsDataSource = {};
var panelsViewModel = {};
var panelsDataSource = {};

app.home = kendo.observable({
    onShow: function() {},
    afterShow: function() {}
});

function pushIt() {

    viewModel.demoData.push({
        id: 3,
        HOTSTAMP: '',
        CARDFORMAT: "",
        STATUS: "",
        PANELS: [{
            PANELID: 1,
            PANELNAME: "MAIN OFFICE",
            ENABLED: "DISABLED",
            USER_NO: "",
            USER_CODE: "",
            PROFILE: 0,
            //PROFILENAME: "EMPLOYEE"
        }, {
            PANELID: 2,
            PANELNAME: "WAREHOUSE",
            ENABLED: "DISABLED",
            USER_NO: "",
            USER_CODE: "",
            PROFILE: 0,
            //PROFILENAME: "MASTER ACCESS"
        }]
    });
    //alert(viewModel.demoData[2].HOTSTAMP);
}

(function(parent) {

    //This is a demo datasource for Card Formats
    //This datasource will be bound to the view model card format select dropdown
    //This shows that you can bind a data source to a view model
    cardFormatsDataSourceOptions = {
        transport: {
            read: function(options) {
                var data = [];
                data.push({
                    name: "26 Bit Wiegand - FC11"
                });
                data.push({
                    name: "37 Bit HID"
                });
                data.push({
                    name: "HID Corporate 1000"
                });
                options.success(data);
            }
        },
        schema: {
            model: {
                fields: {
                    'name': {
                        field: 'name',
                        defaultValue: ''
                    },
                }
            }
        }
    };

    //Create the datasource with options
    cardFormatsDataSource = new kendo.data.DataSource(cardFormatsDataSourceOptions);

    //Use the cardFormatsDataSource as the data source for the view model
    cardFormatsViewModel = kendo.observable({
        dataSource: cardFormatsDataSource,
    });
    //Bind the view model to the html
    parent.set('cardFormatsViewModel', cardFormatsViewModel);

    cardFormatsDataSource.read().then(function() {
        //alert(JSON.stringify(cardFormatsViewModel.dataSource));
    });

    //This is a viewmodel that uses a complex data structure with dummy data
    //You will create this data structure from the retrieved datasources
    //Where there is no user code, You'll create an empty row that looks like credential 1, panel 2
    viewModel = kendo.observable({
        demoData: [{
            id: 1,
            HOTSTAMP: '1234',
            CARDFORMAT: "26 Bit Wiegand - FC11",
            STATUS: "ACTIVE",
            PANELS: [{
                PANELID: 1,
                PANELNAME: "MAIN OFFICE",
                ENABLED: "ENABLED",
                USER_CODE: "1234",
                PROFILE: 1,
                //PROFILENAME: "MASTER ACCESS",
            }, {
                PANELID: 2,
                PANELNAME: "WAREHOUSE",
                ENABLED: "DISABLED",
                USER_CODE: "1234",
                PROFILE: 0,
                //PROFILENAME: "",
            }],
        }, {
            id: 2,
            HOTSTAMP: '2222',
            CARDFORMAT: "37 Bit HID",
            STATUS: "ACTIVE",
            PANELS: [{
                PANELID: 1,
                PANELNAME: "MAIN OFFICE",
                ENABLED: "ENABLED",
                USER_NO: "",
                USER_CODE: "2222",
                PROFILE: 99,
                //PROFILENAME: "EMPLOYEE"
            }, {
                PANELID: 2,
                PANELNAME: "WAREHOUSE",
                ENABLED: "ENABLED",
                USER_NO: "",
                USER_CODE: "2222",
                PROFILE: 1,
                //PROFILENAME: "MASTER ACCESS"
            }],
        }],
        change: function(e) {
            //alert(e.field);
        }
    });

    parent.set('viewModel', viewModel);

    //This view model is bound to the Profiles select list.
    //Notice this viewmodel does not use a datasource
    //Notice that in the binding (view.html) that the 
    //display value is name, while the selected value is id
    profilesViewModel = kendo.observable({
        profiles: [{
            id: 1,
            name: "MASTER ACCESS"
        }, {
            id: 2,
            name: "EMPLOYEE"
        }, {
            id: 99,
            name: "POLICE"
        }]
    });

    parent.set('profilesViewModel', profilesViewModel);

    /* These are not used since I couldn't find a good way to perform a loogup on "id"
       So for now, the panelname is being stored on the combined data model so it displays 
       with each row
    */
    panelsDataSource = new kendo.data.DataSource({
        data: [{
            id: 1,
            name: "MAIN OFFICE"
        }, {
            id: 2,
            name: "WAREHOUSE"
        }],
        schema: {
            model: {
                id: "id",
                name: "name"
            }
        }
    });

    panelsViewModel = kendo.observable({
        dataSource: panelsDataSource
    });

    parent.set('panelsViewModel', panelsViewModel);

})(app.home);
// END_CUSTOM_CODE_home
(function(parent) {
    var provider = app.data.test2,
        mode = 'signin',
        registerRedirect = 'home',
        signinRedirect = 'home',
        init = function(error) {
            if (error) {
                if (error.message) {
                    alert(error.message);
                }
                return false;
            }

            var activeView = mode === 'signin' ? '.signin-view' : '.signup-view';

            if (provider.setup && provider.setup.offlineStorage && !app.isOnline()) {
                $('.offline').show().siblings().hide();
            } else {
                $(activeView).show().siblings().hide();
            }

        },
        successHandler = function(data) {
            var redirect = mode === 'signin' ? signinRedirect : registerRedirect,
                model = parent.homeModel || {},
                logout = model.logout;

            if (logout) {
                model.set('logout', null);
            }
            if (data && data.result) {
                if (logout) {
                    provider.Users.logout(init, init);
                    return;
                }
                app.user = data.result;

                setTimeout(function() {
                    app.mobileApp.navigate('components/' + redirect + '/view.html');
                }, 0);
            } else {
                init();
            }
        },
        homeModel = kendo.observable({
            displayName: '',
            email: '',
            password: '',
            validateData: function(data) {
                if (!data.email) {
                    alert('Missing email');
                    return false;
                }

                if (!data.password) {
                    alert('Missing password');
                    return false;
                }

                return true;
            },
            signin: function() {
                var model = homeModel,
                    email = model.email.toLowerCase(),
                    password = model.password;

                if (!model.validateData(model)) {
                    return false;
                }
                provider.Users.login(email, password, successHandler, init);
            },
            register: function() {
                var model = homeModel,
                    email = model.email.toLowerCase(),
                    password = model.password,
                    displayName = model.displayName,
                    attrs = {
                        Email: email,
                        DisplayName: displayName
                    };

                if (!model.validateData(model)) {
                    return false;
                }

                provider.Users.register(email, password, attrs, successHandler, init);
            },
            toggleView: function() {
                mode = mode === 'signin' ? 'register' : 'signin';
                init();
            }
        });

    parent.set('homeModel', homeModel);
    parent.set('afterShow', function(e) {
        if (e && e.view && e.view.params && e.view.params.logout) {
            homeModel.set('logout', true);
        }
        provider.Users.currentUser().then(successHandler, init);
    });
})(app.home);

// START_CUSTOM_CODE_homeModel
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_homeModel