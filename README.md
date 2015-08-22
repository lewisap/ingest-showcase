# ingest-showcase

run bower install to grab all of the javascript dependencies
  - they get installed into src/main/resources/static/bower_components

The web application itself is located in in:  src/main/resources/static

Application properties (port, etc) are stored in the gradle.properties and
a gradle task (springConfigure) generates the appropriate application.properties file
in the correct location for you
