'use strict';

var util = require('util');
var filename = require('./utils/filename');
var path = require('path');
var generators = require('yeoman-generator');

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = generators.Base.extend({
    promptUser: function() {
        this.config.save();
        var done = this.async();

        // have Yeoman greet the user
        console.log(this.yeoman);

        var prompts = [{
            name: 'moduleName',
            message: 'What is your modules name?'
        }];

        this.prompt(prompts, function(props) {
            // set the basic options
            this.moduleName = props.moduleName;
            console.log('done');
            done();
        }.bind(this));
    },
    scaffoldFolders: function() {

        var folderModuleName = filename( this.moduleName ).toLowerCase();

        this.mkdir('app/' + folderModuleName);
        this.mkdir('app/' + folderModuleName + '/components');
        this.mkdir('app/' + folderModuleName + '/components/' + folderModuleName );
        this.mkdir('app/' + folderModuleName + '/controllers');
        this.mkdir('app/' + folderModuleName + '/img');
        this.mkdir('app/' + folderModuleName + '/routes');
        this.mkdir('app/' + folderModuleName + '/sass');
        this.mkdir('app/' + folderModuleName + '/views');

        // done();
    },
    copyMainFiles: function() {

        var module_name_folder = filename( this.moduleName ).toLowerCase();
        var module_name_js = this.moduleName.replace(/[^a-z0-9]/gi, '');
        var module_name_react = capitalizeFirstLetter( this.moduleName ).replace(/[^a-z0-9]/gi, '');

        var context = {
            module_name: this.moduleName,
            module_name_folder: module_name_folder,
            module_name_js: module_name_js,
            module_name_react: module_name_react
        };

        //// component
        // index
        this.template(
            '_index.component.js',
            'app/' + module_name_folder + '/components/index.js',
            context
        );
        // class
        this.template(
            '_class.component.js',
            'app/' + module_name_folder + '/components/' + module_name_folder + '/' + module_name_folder + '.js',
            context
        );

        //// controllers
        this.template(
            '_controllers.js',
            'app/' + module_name_folder + '/controllers/' + module_name_folder + '.server.controller.js',
            context
        );

        //// routes
        this.template(
            '_routes.js',
            'app/' + module_name_folder + '/routes/' + module_name_folder + '.server.routes.js',
            context
        );

        //// sass
        this.template(
            '_sass.sass',
            'app/' + module_name_folder + '/sass/' + module_name_folder + '.sass',
            context
        );

        //// views
        this.template(
            '_view.html',
            'app/' + module_name_folder + '/views/' + module_name_folder + '.server.view.html',
            context
        );

    },
});
