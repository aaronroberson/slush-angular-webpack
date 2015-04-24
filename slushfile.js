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
    files = [],
    mPageName = '';

    var jsForceConfig;
    try{ jsForceConfig = require( path.resolve(process.cwd(), 'jsforce.config.js'))}catch(e){}
    
    console.log(path.resolve(process.cwd(), 'jsforce.config.js'));
    console.log(typeof jsForceConfig);

gulp.task('default', function (done) {
    inquirer.prompt([
        {type: 'input', name: 'name', message: 'What would you like to name your project?', default: 'mainApp'},
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
        if(typeof answers.pageName === 'undefined' && mPageName === '' ){

            answers.pageName = 'none';
        }

        mPageName = answers.pageName;

        // build project directory
        answers.slug = _.slugify(answers.name);
        answers.camel = _.camelize(answers.slug);
        path.resolve(process.cwd(), answers.slug);
        files.push(__dirname + '/templates/');
        files.push(__dirname + '/templates/webpack.config.js');
        files.push(__dirname + '/templates/webpack.salesforce.js');
        files.push(__dirname + '/templates/package.json');
        files.push(__dirname + '/templates/karma.conf.js');
        files.push(__dirname + '/templates/app/index.html');
        files.push(__dirname + '/templates/app/index.js');
        files.push(__dirname + '/templates/app/controllers/*');
        files.push(__dirname + '/templates/app/components/form/*');
        files.push(__dirname + '/templates/app/components/navBar/*');
        files.push(__dirname + '/templates/app/components/simpleTest/*');
        return gulp.src(files,{base:__dirname + '/templates' })
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