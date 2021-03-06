var date = '08_05_2016';
var currentDate = new Date();
(function (app) {
    app.directive('toggleClass', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.bind('click', function () {
                    element.toggleClass(attrs.toggleClass);
                });
            }
        };
    });

    // =========================================================================
    // CALENDAR WIDGET
    // =========================================================================

    app.directive('fullCalendar', function(){
        return {
            restrict: 'A',
            link: function(scope, element) {
                element.fullCalendar({
                    contentHeight: 'auto',
                    theme: true,
                    header: {
                        right: '',
                        center: 'prev, title, next',
                        left: ''
                    },
                    defaultDate: currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1 < 9 ? '0' + (currentDate.getMonth() + 1) : (currentDate.getMonth() + 1)) + '-' + (currentDate.getDate() + 1 < 9 ? '0' + (currentDate.getDate() + 1) : (currentDate.getDate() + 1)),
                    editable: true,
                    events: [
                        {
                            title: 'All Day',
                            start: '2016-06-01',
                            className: 'bgm-cyan'
                        },
                        {
                            title: 'Long Event',
                            start: '2016-06-07',
                            end: '2016-06-10',
                            className: 'bgm-orange'
                        },
                        {
                            id: 999,
                            title: 'Repeat',
                            start: '2016-06-09',
                            className: 'bgm-lightgreen'
                        },
                        {
                            id: 999,
                            title: 'Repeat',
                            start: '2016-06-16',
                            className: 'bgm-blue'
                        },
                        {
                            title: 'Meet',
                            start: '2016-06-12',
                            end: '2016-06-12',
                            className: 'bgm-teal'
                        },
                        {
                            title: 'Lunch',
                            start: '2016-06-12',
                            className: 'bgm-gray'
                        },
                        {
                            title: 'Birthday',
                            start: '2016-06-13',
                            className: 'bgm-pink'
                        },
                        {
                            title: 'Google',
                            url: 'http://google.com/',
                            start: '2016-06-28',
                            className: 'bgm-bluegray'
                        }
                    ]
                });
            }
        }
    });
})(app || {});


