import 'reflect-metadata';
import {
    Component,
    View,
    Ancestor,
    Inject,
    Injectable,
    Binding,
    forwardRef,
} from 'angular2/angular2';
import {bootstrap} from 'dom/application';

@Component({
  selector: 'info'
})
@View({
  template: 'MESSAGE: {{ message }}'
})
class InfoComponent {
  message: string;

  constructor(@Inject(forwardRef(() => MyAppComponent)) app: MyAppComponent) {
    console.log('InfoComponent constructor');
    this.message = 'App name: ' + app.name;
  }
}

@Component({
  selector: 'app'
})
@View({
  template: '<info message="App name: {{name}}"></info>',
  directives: [InfoComponent]
})
@Injectable()
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
        console.log('app component: ', appRef.hostComponent.name);
    });
    console.log('done');
} catch (e) {
    console.log(e.message, e.stack);
}
