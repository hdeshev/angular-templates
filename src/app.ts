import reflectMetadata = require("reflect-metadata");
var dummy = reflectMetadata; //trigger module import

import {Component, View, bootstrap} from 'angular2/angular2';

// Annotation section
@Component({
  selector: 'my-app'
})
@View({
  template: '<h1>Hello {{ name }}</h1>'
})
// Component controller
class MyAppComponent {
  name: string;

  constructor() {
    this.name = 'Alice';
  }
}

bootstrap(MyAppComponent);
