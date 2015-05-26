import reflectMetadata = require("reflect-metadata");
var dummy = reflectMetadata; //trigger module import

import {Component, View} from 'angular2/angular2';
import {bootstrap} from 'dom/application';

@Component({
  selector: 'my-app'
})
@View({
  template: '<h1>Hello {{ name }}</h1>'
})
class MyAppComponent {
  name: string;

  constructor() {
    this.name = 'Alice';
  }
}

try {
    bootstrap(MyAppComponent);
} catch (e) {
    console.log(e);
}
