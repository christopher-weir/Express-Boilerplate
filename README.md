# Express-Boilerplate
An express boilerplate with Yeoman generated AngularJs modules

---
### Before you start
Make sure you have the following installed
<br />
#####gulp:

    $ npm install -g gulp

#####yeoman:

    $ npm install -g yo
<br />

### Steps for installation
Follow these steps for your initial setup.
<br />
#####- Clone the repo onto your computer.

    $ git clone https://github.com/christopher-weir/Express-Boilerplate.git
<br />
#####- Install the npm modules

    $ npm install
<br />
#####- Link the yeoman module builder
cd into the 'generator-module' folder

    $ cd ./generator-module
<br/>
npm link the module

    $ npm link
<br/>
cd back to the project

    $ cd ../
<br/>
#####- Build the project with gulp

    $ gulp build
<br/>
#####- Now run the project

    $ gulp

___
### Creating a new module
To creat a new module just 'yo module' from the root of the project and follow the instructions

    $ yo module
