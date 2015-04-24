module.exports = function (ngModule) {
    if( ON_TEST ) {require('./simpleTest.test')(ngModule)} //ON_TEST IS A Node process varible that is set on build.
    ngModule.directive('simpleTest', function () {
        return {
            restrict: 'E',
            scope: {},
            template: require('./simpleTest.html'),
            controllerAs: 'vm',
            replace: true,
            controller: function () {

                var vm = this; 
                
                vm.one = 1;

             } 
        };

    });
};