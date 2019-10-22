const fs = require('fs');

const config = require('./config.json');

//Create file here

var mkdirp = require('mkdirp');

mkdirp("./" + config.name + "/src/Controller");
mkdirp("./" + config.name + "/src/Form");
mkdirp("./" + config.name + "/src/Plugin");
mkdirp("./" + config.name + "/src/Plugin/Block");
mkdirp("./" + config.name + "/js");
mkdirp("./" + config.name + "/templates");

setTimeout(function() {
	Info();
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
		for (var key in config.dependencies) {
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

}

function MenuLinks () {

}

function Themes () {

}

function Routing () {

}

function Controllers () {

}

function Forms () {

}

function Blocks () {
	if (config.blocks.length > 0) {
		const content = fs.readFileSync('./template/src/Plugin/Block/block.default', 'utf8');
		for (let key in config.blocks) {
			const block = config.blocks[key];
			let contentBlock = content;

			contentBlock = contentBlock.replace(/{{module_name}}/g, config.name.toLowerCase());
			contentBlock = contentBlock.replace(/{{id}}/g, block.id);
			contentBlock = contentBlock.replace(/{{visible_name}}/g, block.visible_name);
			contentBlock = contentBlock.replace(/{{name}}/g, block.name);
			contentBlock = contentBlock.replace(/{{theme}}/g, block.theme);
			let libs = "";
			for (let key in block.libs) {
				libs += "          \"" + block.libs[key] + "\"" + ",";
				if (key < block.libs.length - 1) {
					libs += "\n\r";
				}
			}
			contentBlock = contentBlock.replace(/{{libs}}/g, libs);

			fs.appendFile("./" + config.name + "/src/Plugin/Block/" + capitalize(block.name) + "Block.php", contentBlock, function (err) {
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
	for (var key in splitName) {
		formatName += capitalize(splitName[key]);
	}
	return formatName;
}

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}