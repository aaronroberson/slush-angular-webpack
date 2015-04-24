module.exports = function(ngModule){
    require("!style!css!less!./simpleTest.less");
    require('./simpleTest')(ngModule);
};