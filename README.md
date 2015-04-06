angular webpack
==============

[![Join the chat at https://gitter.im/CodeScience/slush-angular-webpack](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/CodeScience/slush-angular-webpack?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

![](http://thevelourfog.github.io/src/content/svg/shield.svg)
![](https://avatars3.githubusercontent.com/u/2105791?v=3&s=200)

Slush generator for a starter Angular Formly Webpack. 

A very early start to an Angular Formly Scaffold with a focus on deployment within a Salesforce enviroment.

## Installation

Install `slush-angular-webpack` globally (must have slush installed globally):

```bash
npm install -g slush-angular-webpack
```

## Usage

From within your new project directory** run:

```bash
slush angular-webpack
```

** For Salesforce run from within your existing project on the same level as the default src directory.

## Development


From within your new project directory run:

```bash
webpack
```

Then run:

```bash
webpack-dev-server --progress --colors
```

### Build/Deploy

Coming soon with a Salesforce and non-Salesforce Config option...

## Structure
- pack***/
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
		- controllers/
			- index.js 
			- MainController.js 

*** pack/ is used instead of src/ to prevent a conflict with the default Salesforce folder structure.

#### CSS Preprocessors

- LESS is currently the only default option.

- The recommended pattern is to use one LESS file per component.

- Simply apply a namespace for each component to isolate the component's style.

#### JS Supersets

Coming Soon. TypeScript... 

### Test

Not ready.

### Production

Not ready.

## License

MIT