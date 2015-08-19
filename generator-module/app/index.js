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
                message: 'What is your modules name?'
        },
        {
          type: 'list',
          name: 'moduleType',
          message: 'What type of module did you want to create?',
          choices: [
            {name: 'Client', value: 'client'},
            {name: 'Server', value: 'server'},
            {name: 'Client And Server', value: 'both'}
          ],
          default: 'both'
        },
        {
          when: function (response) {
            var moduleType = response.moduleType;
            if( moduleType === 'server' || moduleType === 'both' ){
                return true;
            }
            return false;
          },
          type: 'list',
          name: 'serverType',
          message: 'What type of server module did you want to create?',
          choices: [
            {name: 'API', value: 'api'},
            {name: 'Route', value: 'route'},
            {name: 'API And Route', value: 'both'}
          ],
          default: 'both'
        }];

        this.prompt(prompts, function (props) {
            // set the basic options
            this.moduleName = props.moduleName;
            this.moduleType = props.moduleType;

            // set the server type
            if( props.serverType ){
                this.serverType = props.serverType;
            }else{
                this.serverType = false;
            }

            done();
        }.bind(this));
    },
    scaffoldFolders: function(){
        //console.log(this.sourceRoot());
        //console.log(this.destinationRoot());

        this.mkdir('modules/' + this.moduleName);

        // client folders
        if( this.moduleType === 'client' || this.moduleType === 'both' ){
            this.mkdir('modules/' + this.moduleName + '/client');
            this.mkdir('modules/' + this.moduleName + '/client/controllers');
            this.mkdir('modules/' + this.moduleName + '/client/directives');
            this.mkdir('modules/' + this.moduleName + '/client/views');
            this.mkdir('modules/' + this.moduleName + '/client/services');
        }

        // server folders
        if( this.moduleType === 'server' || this.moduleType === 'both' ){
            this.mkdir('modules/' + this.moduleName + '/server');
            this.mkdir('modules/' + this.moduleName + '/server/controllers');
            this.mkdir('modules/' + this.moduleName + '/server/routes');
        }
        // done();
    },
    copyMainFiles: function(){

        var context = {
            module_name: this.moduleName,
            server_type: this.serverType
        };
        // create client files
        if( this.moduleType === 'client' || this.moduleType === 'both' ){
            this.template(
                'client/_module.client.module.js',
                'modules/' + this.moduleName + '/client/' + this.moduleName + '.client.module.js', context);

            this.template(
                'client/_controller.client.controller.js',
                'modules/' + this.moduleName + '/client/controllers/' + this.moduleName + '.client.controller.js', context);

            this.template(
                'client/_directive.client.directive.js',
                'modules/' + this.moduleName + '/client/directives/' + this.moduleName + '.client.directive.js', context);

            this.template(
                'client/_view.client.view.html',
                'modules/' + this.moduleName + '/client/views/' + this.moduleName + '.client.view.html', context);

            this.template(
                'client/_service.client.service.js',
                'modules/' + this.moduleName + '/client/services/' + this.moduleName + '.client.service.js', context);

            this.template(
                'client/_less.client.style.less',
                'modules/' + this.moduleName + '/client/less/' + this.moduleName + '.client.style.less', context);
        }



        if( this.moduleType === 'server' || this.moduleType === 'both' ){


            if( this.serverType === 'api' || this.serverType === 'both' ){
                // if api
                this.template(
                    'server/_controller.server.controller.js',
                    'modules/' + this.moduleName + '/server/controllers/' + this.moduleName + '-api.server.controller.js', {
                        module_name: this.moduleName,
                        server_type: 'api'
                    });
            }


            if( this.serverType === 'route' || this.serverType === 'both' ){

                // if api
                this.template(
                    'server/_controller.server.controller.js',
                    'modules/' + this.moduleName + '/server/controllers/' + this.moduleName + '-route.server.controller.js', {
                        module_name: this.moduleName,
                        server_type: 'route'
                    });

                this.template(
                    'server/_view.server.view.html',
                    'modules/' + this.moduleName + '/server/views/' + this.moduleName + '.server.view.html', context);
            }

            // if route
            this.template(
                'server/_routes.server.routes.js',
                'modules/' + this.moduleName + '/server/routes/' + this.moduleName + '.server.routes.js', context);
        }
    },
});

