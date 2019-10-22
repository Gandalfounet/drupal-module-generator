# Generate drupal module using Node JS

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

```
Node.js
NPM
```

### Installing

#### Https :

```
git clone https://github.com/Gandalfounet/drupal-module-generator.git
```

#### SSH :

```
git clone git@github.com:Gandalfounet/drupal-module-generator.git
```

#### Install dependencies 

```
cd drupal-module-generator
npm install
```

### Config 

Your module will be generated using the config.json file. Make sure to correctly fill the json to generate the files.

Doc incoming.

```json
{ 
   "name":"module_name",
   "public_name" : "Module Name",
   "type":"module",
   "description" : "Description",
   "package" : "Custom Module",
   "dependencies" : [
   	"block"
   ],
   "db":[ 
      { 
         "name":"db_name",
         "description":"db_description",
         "fields":[ 
            { 
               "name":"pid",
               "type":"serial",
               "not_null":true,
               "description":"Primary key"
            },
            { 
               "name":"poi_type",
               "type":"text",
               "description":"Type of the POI"
            }
         ],
         "default_values":[ 
            { 
               "poi_type":"plage"
            },
            { 
               "poi_type":"ville"
            },
            { 
               "poi_type":"station_ski"
            }
         ]
      }
   ],
   "libraries":[ 
      { 
         "name":"lib_1",
         "version":"1.x",
         "css":{ 
            "theme":[ 
               { 
                  "path":"dist/style.css",
                  "params":{ 

                  }
               }
            ]
         },
         "js":[ 
            { 
               "path":"js/src/index-1.js",
               "params":{ 
               }
            }
         ],
         "dependencies":[ 
            "mf_tools_common_theme_public/chartjs",
            "mf_tools_common_theme_public/vue-dragscroll"
         ]
      },
      { 
         "name":"lib_2",
         "version":"1.x",
         "css":{ 
            "theme":[ 
               { 
                  "path":"dist/style.css",
                  "params":{ 

                  }
               }
            ]
         },
         "js":[ 
            { 
               "path":"js/src/index-2.js",
               "params":{ 

               }
            }
         ],
         "dependencies":[ 

         ]
      }
   ],
   "themes":[ 
      { 
         "name":"theme1",
         "template_name":"theme1",
         "variables":[ 
            { 
               "variable":"notifications",
               "default_value":null
            }
         ]
      },
      { 
         "name":"theme2",
         "template_name":"theme2",
         "variables":[ 

         ]
      }
   ],
   "controllers":[ 
      { 
         "name":"Admin",
         "theme":"theme2",
         "libs":[ 
            "mf_tools_common/mf_tools_common",
            "mf_tools_common/mf_tools_common.vue",
            "module_name/lib2"
         ]
      }
   ],
   "services":[ 
      { 
         "name":"ServiceName",
         "id":"main"
      },
      { 
         "name":"ServiceNameTwo",
         "id":"second"
      }
   ],
   "forms":[ 
      { 
         "name":"UpdateSettings",
         "id":"adminsettings"
      }
   ],
   "blocks":[ 
      { 
         "name":"Block1",
         "visible_name" : "Block 1",
         "id" : "block_1",
         "theme":"theme1",
         "libs":[ 
            "mf_tools_common/mf_tools_common",
            "mf_tools_common/mf_tools_common.vue",
            "module_name/lib1"
         ]
      }
   ],
   "routes":[ 
      { 
         "name":"admin",
         "path":"/admin/config/module_name/admin",
         "controller":"Admin",
         "method":"content",
         "title":"Admin BO",
         "requirements":"access administration pages",
         "admin_route":true
      },
      { 
         "name":"getSettings",
         "path":"/module_name/getSettings",
         "controller":"Admin",
         "method":"getSettings",
         "title":"getSettings",
         "requirements":"access content",
         "admin_route":false
      }
   ],
   "BO_menu_links":[ 
      { 
         "name":"admin",
         "title":"Module Name Admin",
         "route":"module_name.admin",
         "description":"fu",
         "parent":"system.admin",
         "weight":99
      }
   ],
   "vuejs_godtier":true
}
```

### Run 

```
node index
```
