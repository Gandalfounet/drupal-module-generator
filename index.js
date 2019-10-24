const fs = require('fs');

const config = require('./config.json');

//Create file here

var mkdirp = require('mkdirp');

if(config.controllers.length > 0) {
	mkdirp("./" + config.name + "/src/Controller");
}
if(config.forms.length > 0) {
	mkdirp("./" + config.name + "/src/Form");
}
if(config.blocks.length > 0) {
	mkdirp("./" + config.name + "/src/Plugin");
  mkdirp("./" + config.name + "/src/Plugin/Block");
}
if(config.themes.length > 0) {
	mkdirp("./" + config.name + "/templates");
}
mkdirp("./" + config.name + "/js");


setTimeout(function() {
	Info();
	Libraries();
	Controllers();
  Forms();
	Blocks();
	Services();
}, 3000)

/**
* Generate info.yml
*/
function Info () {
	let content = fs.readFileSync('./template/default.info.yml', 'utf8');

	content = content.replace(/{{public_name}}/g, config.public_name);
	content = content.replace(/{{type}}/g, config.type);
	content = content.replace(/{{description}}/g, config.description);
	content = content.replace(/{{package}}/g, config.package);

	let dependencies = "";
	if (config.dependencies.length > 0) {
		dependencies = "dependencies:\r\n";
		for (let key in config.dependencies) {
			dependencies += "  - " + config.dependencies[key] + "\r\n";
		}
	}
	content = content.replace(/{{dependencies}}/g, dependencies);

	fs.appendFile("./" + config.name + "/" + config.name + ".info.yml", content, function (err) {
	  if (err) throw err;
	  console.log('Saved!');
	});
}

function Db () {

}

function Libraries () {
	if (config.libraries.length > 0) {
		const defaultLib = fs.readFileSync('./template/default.libraries.yml', 'utf8');
		let contentFile = "";

		for (let key in config.libraries) {
			const library = config.libraries[key];

			let contentYml = defaultLib;

			contentYml = contentYml.replace(/{{name}}/g, library.name.toLowerCase());
			contentYml = contentYml.replace(/{{version}}/g, library.version);
			let css = "";
			if (library.css && library.css.theme && library.css.theme.length > 0) {
				css += "	css:\r\n";
				css += "		theme:\r\n";
				for (let key in library.css.theme) {
					css += "			" + library.css.theme[key].path + ":" + JSON.stringify(library.css.theme[key].params);
				}
			}
			let js = "";
			if (library.js && library.js.length > 0) {
				js += "	js:\r\n";
				for (let key in library.js) {
					js += "		" + library.js[key].path + ":" + JSON.stringify(library.js[key].params);
				}
			}
			let dependencies = "";
			if (library.dependencies.length > 0) {
				dependencies = "dependencies:\r\n";
				for (let key in library.dependencies) {
					dependencies += "  - " + library.dependencies[key] + "\r\n";
				}
			}
			contentYml = contentYml.replace(/{{css}}/g, css);
			contentYml = contentYml.replace(/{{js}}/g, js);
			contentYml = contentYml.replace(/{{dependencies}}/g, dependencies);


			contentFile += contentYml + "\r\n";

		}

		fs.appendFile("./" + config.name + "/" + config.name + ".libraries.yml", contentFile, function (err) {
		  if (err) throw err;
		  console.log('Saved!');
		});
	}
}

function MenuLinks () {

}

function Themes () {

}

function Routing () {

}

function Controllers () {
	if (config.controllers.length > 0) {
		const content = fs.readFileSync('./template/src/Controller/controller.default', 'utf8');
		for (let key in config.controllers) {
			const controller = config.controllers[key];
			let newContent = content;

			newContent = newContent.replace(/{{module_name}}/g, config.name.toLowerCase());
			newContent = newContent.replace(/{{formated_name}}/g, ModuleNameFormated());
			newContent = newContent.replace(/{{name}}/g, controller.name);
			newContent = newContent.replace(/{{theme}}/g, controller.theme);
			let libs = "";
			for (let key in controller.libs) {
				libs += "          \"" + controller.libs[key] + "\"" + ",";
				if (key < controller.libs.length - 1) {
					libs += "\n\r";
				}
			}
			newContent = newContent.replace(/{{libs}}/g, libs);

			fs.appendFile("./" + config.name + "/src/Controller/" + ModuleNameFormated() + capitalize(controller.name) + "Controller.php", newContent, function (err) {
			  if (err) throw err;
			  console.log('Saved!');
			});
		}
	}
}

function Forms () {
	if (config.forms.length > 0) {
		const content = fs.readFileSync('./template/src/Form/form.default', 'utf8');
		for (let key in config.forms) {
			const form = config.forms[key];
			let newContent = content;

			newContent = newContent.replace(/{{module_name}}/g, config.name.toLowerCase());
			newContent = newContent.replace(/{{formated_name}}/g, ModuleNameFormated());
			newContent = newContent.replace(/{{name}}/g, form.name);
			newContent = newContent.replace(/{{form_id}}/g, form.id);


			fs.appendFile("./" + config.name + "/src/Form/" + ModuleNameFormated() + capitalize(form.name) + "Form.php", newContent, function (err) {
			  if (err) throw err;
			  console.log('Saved!');
			});
		}
	}
}

function Blocks () {
	if (config.blocks.length > 0) {
		const content = fs.readFileSync('./template/src/Plugin/Block/block.default', 'utf8');
		for (let key in config.blocks) {
			const block = config.blocks[key];
			let newContent = content;

			newContent = newContent.replace(/{{module_name}}/g, config.name.toLowerCase());
			newContent = newContent.replace(/{{formated_name}}/g, ModuleNameFormated());
			newContent = newContent.replace(/{{id}}/g, block.id);
			newContent = newContent.replace(/{{visible_name}}/g, block.visible_name);
			newContent = newContent.replace(/{{name}}/g, block.name);
			newContent = newContent.replace(/{{theme}}/g, block.theme);
			let libs = "";
			for (let key in block.libs) {
				libs += "          \"" + block.libs[key] + "\"" + ",";
				if (key < block.libs.length - 1) {
					libs += "\n\r";
				}
			}
			newContent = newContent.replace(/{{libs}}/g, libs);

			fs.appendFile("./" + config.name + "/src/Plugin/Block/" + ModuleNameFormated() + capitalize(block.name) + "Block.php", newContent, function (err) {
			  if (err) throw err;
			  console.log('Saved!');
			});
		}
	}
}

/**
* Generate services files (services.yml + servicesClass.php)
*/
function Services () {
	if (config.services.length > 0) {
		const serviceYmlDefault = fs.readFileSync('./template/default.services.yml', 'utf8');
		const serviceClassDefault = fs.readFileSync('./template/src/Services/service.default', 'utf8');
		let serviceYml = "services:\r\n";


		for (let key in config.services) {
			const service = config.services[key];

			let contentYml = serviceYmlDefault;
			contentYml = contentYml.replace(/{{module_name}}/g, config.name.toLowerCase());
			contentYml = contentYml.replace(/{{service_name}}/g, capitalize(service.name));
			contentYml = contentYml.replace(/{{service_id}}/g, service.id);
			serviceYml += contentYml + "\r\n";

			let contentClass = serviceClassDefault;
			contentClass = contentClass.replace(/{{module_name}}/g, config.name.toLowerCase());
			contentClass = contentClass.replace(/{{service_name}}/g, capitalize(service.name));

			fs.appendFile("./" + config.name + "/src/" + capitalize(service.name) + "Service.php", contentClass, function (err) {
			  if (err) throw err;
			  console.log('Saved!');
			});
		}

		fs.appendFile("./" + config.name + "/" + config.name + ".services.yml", serviceYml, function (err) {
		  if (err) throw err;
		  console.log('Saved!');
		});
	}
}

function Js () {

}

function ModuleNameFormated () {
	let formatName = "";
	const splitName = config.name.split("_");
	for (let key in splitName) {
		formatName += capitalize(splitName[key]);
	}
	return formatName;
}

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}
