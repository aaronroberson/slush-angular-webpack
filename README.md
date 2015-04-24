angular webpack
==============

[![Join the chat at https://gitter.im/CodeScience/slush-angular-webpack](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/CodeScience/slush-angular-webpack?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

![](http://thevelourfog.github.io/src/content/svg/shield.svg)
![](https://avatars3.githubusercontent.com/u/2105791?v=3&s=200)


An Angular Webpack Scaffold with a focus on deployment within a Salesforce environment. The default template contains a basic hello world example of Angular Formly in a nested directive. Future versions will have a more generic template with forms being a selectable option.

## Installation

Install `slush-angular-webpack` globally (must have slush installed globally):

```bash
npm install -g slush-angular-webpack
```

## Usage

### The Non-Salesforce path:

From within your new project directory create and navigate to a new source folder:

```bash
mkdir src && cd src
```

Next run:

```bash
slush angular-webpack
```

The generator will then ask you to enter the project or app name. 

```bash
What should your project be named?(mainApp)  myDemoApp
```

Followed by:

```bash
Is this a Salesforce project? (Y/n) n
```

That is all it takes. The generator will build the project inside of a new folder with the name you entered. 

### The Salesforce path:

Using this generator for a Salesforce build makes a few assumptions about the other tools you use in your workflow.

It is recommend that you use Sublime Text 3 with the MavensMate plugin to connect to your Org and pull down the existing project code from the server.  See [Mavens Mate](http://mavensmate.com/) for more info on this process.

Once this is complete and a local version of the project exists, navigate to the project directory. You will notice that there is an existing `src/`  directory in the project containing Salesforce's Visualforce pages, Classes, Triggers and more. 

To avoid a conflict with this `src/` directory create and then navigate to a new `pack/` folder on the same level.

```bash
mkdir pack && cd pack
```
From this point you can either use the generator without having your Salesforce credentials pre-configured or you can create a simple config file in the `pack/` directory and add your credentials. If you proceed without the config file present the generator will ask additional questions and require the entry of your username, password and token for a one time use.

The recommended path is to simply create your config file and add your credentials.

From the `pack/` directory run:

```bash
touch jsforce.config.js
``` 
In the editor of your choice add you credentials in this pattern:

```javascript
module.exports = {

    username: 'USERNAME',
   	password: 'PASSWORD',
    token: 'TOKEN'
	
};
```
Now run:

```bash
slush angular-webpack
```

The generator will then ask you to enter the project or app name. 

```bash
What should your project be named?(mainApp)  myDemoApp
```

Followed by:

```bash
Is this a Salesforce project? (Y/n) y
```
Next you will be asked:

```bash
What should your Static Resource and Visualforce page be named?(mainPage) myDemoPage
```
The generator will then create your new Visualforce page and the corresponding Static Resource on your remote Salesforce Org.
Then it will build the project inside of a new folder with the app name you entered. 

At this point you have new project folder that lives inside of the `pack/` directory and newly created remote assets. 
To bring your local project in sync: (From Sublime Text/Maven's Mate) 

`right-click on project root > MavensMate >Refresh From Server `

This will pull down the new Visualforce page and Static Resource to your local project.

Finally create a resource bundle through MavensMate:

`('command/control' + shift + p)`  to open Sublime's smart search and begin to type: `Create Resource Bundle`

Select this option and then pick the name of your newly created Static Resource by pressing enter.

This will add a `resource-bundles/` folder to your Salesforce project containing the expanded version of your static resource.

See the Salesforce section below for info on how to build and deploy with your resource bundles.

## Development Build/Deploy

### The Non-Salesforce path:

From within your new project directory run:

```bash
webpack
```

Then run:

```bash
webpack-dev-server --progress --colors
```

This will start a server at localhost:8080

### The Salesforce path:

From within your new project directory run:

```bash
webpack --config webpack.salesforce.js
```

This will use Webpack to build your bundle.js file and place it within the expanded static resource fold within the `resource-bundles/` directory.

To deploy to your Salesforce org for testing open your new static resource. You may notice a `placeholder/` folder along with the bundle.js and bundle.js.map. Delete the `placeholder/` folder.

Then using Sublime/MavensMate enter:

`('command/control' + shift + p)`  to open Sublime's smart search and begin to type: `Deploy Resource Bundle`

Select this option and then pick the name of your newly created resource bundle by pressing enter.

MavensMate will then compress the resource bundle and deploy it as your updated static resource.

You can now open your new Visualforce page and see your changes.

## Production Build/Deploy

Coming soon with a Salesforce and non-Salesforce Config option...

## Structure
- pack***/
	- jsforce.config.js****
	- UserDefinedAppName/
		- node_modules/	
		- app/
			- index.html
			- index.js
			- components/
				- form/
					- index.js
					- previewForm.js
					- previewForm.less	
					- previewForm.html

				- navBar/
					- index.js
					- navbar.js
					- navbar.less
					- navbar.html
					- navbar.test.js
				- simpleTest/
					- index.js
					- simpleTest.js
					- simpleTest.less
					- simpleTest.html
					- simpleTest.test.js
			- controllers/
				- index.js 
				- MainController.js 

*** pack/ manually created and used instead of src/ to prevent a conflict with the default Salesforce folder structure.

**** a manually created optional config file to manage your Salesforce credentials.

## CSS Preprocessors

- LESS is currently the only default option.

- The recommended pattern is to use one LESS file per component.

- Simply apply a namespace for each component to isolate the component's style.

## JS Supersets

Coming Soon. TypeScript... 

## Testing

Karma and Jasmine are now available for unit testing. 
The build comes preconfigured for PhantomJS but the Chrome launcher is also preinstalled.

To run all unit tests simply run:

```bash
 NODE_ENV=test karma start karma.conf.js
```
This will make sure Angular-Mocks will only loads in test mode.

## Production

Not ready.

## Docs

- JSDocs Coming Soon..

## JSR mocks

- Coming Soon..

## License

MIT