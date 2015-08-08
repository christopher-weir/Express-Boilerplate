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
                name: 'moduleName',
                message: 'What is your modules name ?'
        }];

        this.prompt(prompts, function (props) {
            this.moduleName = props.moduleName;
            done();
        }.bind(this));
    },
    scaffoldFolders: function(){
        //console.log(this.sourceRoot());
        //console.log(this.destinationRoot());

        this.mkdir('modules/' + this.moduleName);
        // client folders
        this.mkdir('modules/' + this.moduleName + '/client');
        this.mkdir('modules/' + this.moduleName + '/client/controllers');
        this.mkdir('modules/' + this.moduleName + '/client/directives');
        this.mkdir('modules/' + this.moduleName + '/client/views');
        this.mkdir('modules/' + this.moduleName + '/client/services');
        // server folders
        this.mkdir('modules/' + this.moduleName + '/server');
        this.mkdir('modules/' + this.moduleName + '/server/controllers');
        this.mkdir('modules/' + this.moduleName + '/server/routes');
        // done();
    },
    copyMainFiles: function(){

        var context = {
            module_name: this.moduleName
        };

        this.template(
            '__module.client.module.js',
            'modules/' + this.moduleName + '/client/' + this.moduleName + '.client.module.js', context);

        this.template(
            '__controller.client.controller.js',
            'modules/' + this.moduleName + '/client/controllers/' + this.moduleName + '.client.controller.js', context);

        this.template(
            '__directive.client.directive.js',
            'modules/' + this.moduleName + '/client/directives/' + this.moduleName + '.client.directive.js', context);

        this.template(
            '__view.client.view.html',
            'modules/' + this.moduleName + '/client/views/' + this.moduleName + '.client.view.html', context);

        this.template(
            '__service.client.service.js',
            'modules/' + this.moduleName + '/client/services/' + this.moduleName + '.client.service.js', context);




        this.template(
            '___controller.server.controller.js',
            'modules/' + this.moduleName + '/server/controllers/' + this.moduleName + '.server.controller.js', context);

        this.template(
            '___routes.server.routes.js',
            'modules/' + this.moduleName + '/server/routes/' + this.moduleName + '.server.routes.js', context);

        this.template(
            '___view.server.view.html',
            'modules/' + this.moduleName + '/server/views/' + this.moduleName + '.server.view.html', context);
    },
});

