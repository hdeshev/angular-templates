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
//import {bootstrap} from 'dom/bootstrap_application';

@Component({
  selector: 'info',
  properties: {message: 'message'}
})
@View({
  template: 'MESSAGE: {{ message }}'
})
class InfoComponent {
  message: string;

  constructor(@Inject(forwardRef(() => MyAppComponent)) app: MyAppComponent) {
    console.log('InfoComponent constructor');
    console.log('App name: ', app.name);

    setTimeout(() => {
        console.log('info.message', this.message);
    }, 200);
  }
}

@Component({
  selector: 'app',
  properties: {name: 'name'}
})
@View({
  template: '<info message="Not working - fix DOM.createTemplate {{name}}"></info>',
  directives: [InfoComponent]
})
@Injectable()
class MyAppComponent {
  name: string;

  constructor() {
    console.log('MyAppComponent constructor');
    this.name = 'default name';

    setTimeout(() => {
        console.log('app.name', this.name);
    }, 200);
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
