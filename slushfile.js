var gulp = require('gulp'),
    conflict = require('gulp-conflict'),
    install = require('gulp-install'),
    rename = require('gulp-rename'),
    template = require('gulp-template'),
    spawn = require('child_process').spawn,
    inquirer = require('inquirer'),
    path = require('path'),
    _ = require('underscore.string'),
    sfSetup = require('sf-placeholder'),
    data = require('gulp-data');
    files = [];

    var jsForceConfig;
    try{ jsForceConfig = require( path.resolve(process.cwd(), 'jsforce.config.js'))}catch(e){}
    
    console.log(path.resolve(process.cwd(), 'jsforce.config.js'));
    console.log(typeof jsForceConfig);

gulp.task('default', function (done) {
    inquirer.prompt([
        {type: 'input', name: 'name', message: 'What should your project be named?', default: 'mainApp'},
        {type: 'confirm', name: 'salesforce', message: 'Is this a Salesforce project?'}, 
        { when: function (response) {
             return response.salesforce;
            },
            type: 'input', 
            name: 'pageName', 
            message: 'What should your Static Resource and Visualforce page be named?', 
            default: 'mainPage'
        },
        { when: function (response) {
             return response.salesforce && typeof jsForceConfig === 'undefined';
            },
            type: 'input', 
            name: 'username', 
            message: 'Enter your Salesforce username.' 
        },
        { when: function (response) {
             return response.salesforce && typeof jsForceConfig === 'undefined';
            },
            type: 'input', 
            name: 'password', 
            message: 'Enter your Salesforce password.'
        },
        { when: function (response) {
             return response.salesforce && typeof jsForceConfig === 'undefined';
            },
            type: 'input', 
            name: 'token', 
            message: 'Enter your Salesforce token.'
        }
    ],
    function (answers) {
    
        // create visualforce page and placeholder
        if(answers.salesforce !== false){
            console.log(answers.username);
            console.log(answers.password);
            console.log(answers.token);
            console.log(answers.pageName);
        }
        sfSetup.defineUserName((typeof jsForceConfig === 'undefined') ? '' + answers.username + '' : '' + jsForceConfig.username + '' );
        sfSetup.definePassword((typeof jsForceConfig === 'undefined') ? '' + answers.password + '' : '' + jsForceConfig.password + '');
        sfSetup.defineToken((typeof jsForceConfig === 'undefined') ? '' + answers.token + '' : '' + jsForceConfig.token + '');
        if(answers.salesforce !== false){
            sfSetup.setupPageAndResource('' + answers.pageName + '');
        }

        // set the page name to none if it is a non salesforce project
        if(typeof answers.pageName === 'undefined' ){

            answers.pageName = 'none';
        }

        // build project directory
        answers.slug = _.slugify(answers.name);
        answers.camel = _.camelize(answers.slug);
        path.resolve(process.cwd(), answers.slug);
        files.push(__dirname + '/templates/**');
        files.push(__dirname + '/templates/*');
        files.push(__dirname + '/templates/*.js');
        files.push(__dirname + '/templates/*.css');

        return gulp.src(files)
        .pipe(data(function (answers) {
            return { pageName: answers.pageName };
        }))
        .pipe(template(answers))
        .pipe(rename(function (file) { if (file.basename[0] === '_') { file.basename = '.' + file.basename.slice(1); }}))
        .pipe(conflict(path.join(process.cwd(), answers.slug)))
        .pipe(gulp.dest(path.join(process.cwd(), answers.slug)))
        .pipe(install())
        .on('finish', function () {
            done();
        });
    });
});