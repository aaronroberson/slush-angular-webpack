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
    files = [];

gulp.task('default', function (done) {
  inquirer.prompt([
    {type: 'input', name: 'name', message: 'What should your project be named?', default: 'test'},
    {type: 'input', name: 'pageName', message: 'What should your Statice Resouce and Visualforce page be named?', default: 'testPage'},
    {type: 'input', name: 'username', message: 'Enter your Salesforce username.' },
    {type: 'input', name: 'password', message: 'Enter your Salesforce password.'},
    {type: 'input', name: 'token', message: 'Enter your Salesforce token.'}
  ],
  function (answers) {
    // create visualforce page and placeholder

    console.log(answers.username);
    console.log(answers.password);
    console.log(answers.token);
    console.log(answers.pageName);
    sfSetup.defineUserName('' + answers.username + '');
    sfSetup.definePassword('' + answers.password + '');
    sfSetup.defineToken('' + answers.token + '');
    sfSetup.setupPageAndResource('' + answers.pageName + '');

    // build project directory
    answers.slug = _.slugify(answers.name);
    answers.camel = _.camelize(answers.slug);
    path.resolve(process.cwd(), answers.slug);
    files.push(__dirname + '/templates/**');
    files.push(__dirname + '/templates/*.js');
    files.push(__dirname + '/templates/*.css');
    return gulp.src(files)
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