var util = require('util');
var path = require('path');
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
    promptUser: function() {
        this.config.save();
        var done = this.async();

        // have Yeoman greet the user
        console.log(this.yeoman);

        var prompts = [{
                name: 'appName',
                message: 'What is your modules name ?'
        }];

        this.prompt(prompts, function (props) {
            this.appName = props.appName;
            done();
        }.bind(this));
    },
    scaffoldFolders: function(){
        //console.log(this.sourceRoot());
        //console.log(this.destinationRoot());

        this.mkdir('modules/' + this.appName);
        // client folders
        this.mkdir('modules/' + this.appName + '/client');
        this.mkdir('modules/' + this.appName + '/client/controllers');
        this.mkdir('modules/' + this.appName + '/client/directives');
        this.mkdir('modules/' + this.appName + '/client/views');
        this.mkdir('modules/' + this.appName + '/client/services');
        // server folders
        this.mkdir('modules/' + this.appName + '/server');
        this.mkdir('modules/' + this.appName + '/server/controllers');
        this.mkdir('modules/' + this.appName + '/server/routes');
        // done();
    },
    copyMainFiles: function(){

        var context = {
            module_name: this.appName
        };

        this.template(
            '__module.client.module.js',
            'modules/' + this.appName + '/client/' + this.appName + '.client.module.js', context);

        this.template(
            '__controller.client.controller.js',
            'modules/' + this.appName + '/client/controllers/' + this.appName + '.client.controller.js', context);

        this.template(
            '__directive.client.directive.js',
            'modules/' + this.appName + '/client/directives/' + this.appName + '.client.directive.js', context);

        this.template(
            '__view.client.view.html',
            'modules/' + this.appName + '/client/views/' + this.appName + '.client.view.html', context);

        this.template(
            '__service.client.service.js',
            'modules/' + this.appName + '/client/services/' + this.appName + '.client.service.js', context);




        this.template(
            '___controller.server.controller.js',
            'modules/' + this.appName + '/server/controllers/' + this.appName + '.server.controller.js', context);

        this.template(
            '___routes.server.routes.js',
            'modules/' + this.appName + '/server/routes/' + this.appName + '.server.routes.js', context);
    },
});

