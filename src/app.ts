import 'reflect-metadata';
import {Component, View} from 'angular2/angular2';
import {bootstrap} from 'dom/application';

@Component({
  selector: 'app'
})
@View({
  template: '<div>Hello {{ name }}</div>'
})
class MyAppComponent {
  name: string;

  constructor() {
    console.log('MyAppComponent constructor');
    this.name = 'default name';
  }
}

try {
    let appPromise = bootstrap(MyAppComponent);
    appPromise.then(appRef => {
        console.log('appRef', appRef.hostComponent.name);
    });
    console.log('done');
} catch (e) {
    console.log(e);
}
