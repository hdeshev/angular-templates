import 'reflect-metadata';
import {Component, View} from 'angular2/angular2';
import {bootstrap} from 'dom/application';

@Component({
  selector: 'my-app'
})
@View({
  template: '<div>Hello {{ name }}</div>'
})
class MyAppComponent {
  name: string;

  constructor() {
    this.name = 'Alice';
  }
}

try {
    let appPromise = bootstrap(MyAppComponent);
    appPromise.then(appRef => {
        console.log('appRef', appRef);
    });
    console.log('done');
} catch (e) {
    console.log(e);
}
