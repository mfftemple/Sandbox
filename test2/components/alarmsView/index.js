'use strict';

app.alarmsView = kendo.observable({
    onShow: function() {},
    afterShow: function() {}
});

// START_CUSTOM_CODE_alarmsView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_alarmsView
(function(parent) {
    var dataProvider = app.data.test2,
        fetchFilteredData = function(paramFilter, searchFilter) {
            var model = parent.get('alarmsViewModel'),
                dataSource = model.get('dataSource');

            if (paramFilter) {
                model.set('paramFilter', paramFilter);
            } else {
                model.set('paramFilter', undefined);
            }

            if (paramFilter && searchFilter) {
                dataSource.filter({
                    logic: 'and',
                    filters: [paramFilter, searchFilter]
                });
            } else if (paramFilter || searchFilter) {
                dataSource.filter(paramFilter || searchFilter);
            } else {
                dataSource.filter({});
            }
        },
        flattenLocationProperties = function(dataItem) {
            var propName, propValue,
                isLocation = function(value) {
                    return propValue && typeof propValue === 'object' &&
                        propValue.longitude && propValue.latitude;
                };

            for (propName in dataItem) {
                if (dataItem.hasOwnProperty(propName)) {
                    propValue = dataItem[propName];
                    if (isLocation(propValue)) {
                        dataItem[propName] =
                            kendo.format('Latitude: {0}, Longitude: {1}',
                                propValue.latitude, propValue.longitude);
                    }
                }
            }
        },
        dataSourceOptions = {
            type: 'everlive',
            transport: {
                typeName: 'Alarms',
                dataProvider: dataProvider
            },
            change: function(e) {

            },
            error: function(e) {
                if (e.xhr) {
                    alert('error: ' + JSON.stringify(e.xhr));
                }
            },
            schema: {
                model: {
                    fields: {
                        'alarmType': {
                            field: 'alarmType',
                            defaultValue: ''
                        },
                        'alarmDate': {
                            field: 'alarmDate',
                            defaultValue: '',
                        },
                        'alarmTime': {
                            field: 'alarmTime',
                            defaultValue: ''
                        }
                    },
                    icon: function() {
                        var i = 'globe';
                        return kendo.format('km-icon km-{0}', i);
                    }
                }
            },
            serverFiltering: true,
        },
        dataSource = new kendo.data.DataSource(dataSourceOptions),
        alarmsViewModel = kendo.observable({
            dataSource: dataSource,
            itemClick: function(e) {

                app.mobileApp.navigate('#components/alarmsView/details.html?uid=' + e.dataItem.uid);

            },
            detailsShow: function(e) {
                var item = e.view.params.uid,
                    dataSource = alarmsViewModel.get('dataSource'),
                    itemModel = dataSource.getByUid(item);

                if (!itemModel.alarmType) {
                    itemModel.alarmType = String.fromCharCode(160);
                }

                alarmsViewModel.set('currentItem', null);
                alarmsViewModel.set('currentItem', itemModel);
            },
            currentItem: null
        });

    if (typeof dataProvider.sbProviderReady === 'function') {
        dataProvider.sbProviderReady(function dl_sbProviderReady() {
            parent.set('alarmsViewModel', alarmsViewModel);
        });
    } else {
        parent.set('alarmsViewModel', alarmsViewModel);
    }

    parent.set('onShow', function(e) {
        var param = e.view.params.filter ? JSON.parse(e.view.params.filter) : null;

        fetchFilteredData(param);
    });
})(app.alarmsView);

// START_CUSTOM_CODE_alarmsViewModel
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_alarmsViewModel