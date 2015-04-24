module.exports = function (ngModule) {
    if( ON_TEST ) {require('./navBar.test')(ngModule)} //ON_TEST IS A Node process varible that is set on build.
    ngModule.directive('navBar', function () {
        return {
            restrict: 'E',
            scope: {},
            template: require('./navBar.html'),
            controllerAs: 'vm',
            replace: true,
            controller: function () {

                var vm = this; 
                
                vm.one = 1;

             }   
        };

    });
};
