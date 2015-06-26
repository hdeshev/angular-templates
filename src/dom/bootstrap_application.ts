import angular2 = require('angular2/angular2');
import {
    Type,
} from 'angular2/src/facade/lang';
import {Binding} from 'angular2/di';
import {ApplicationRef} from 'angular2/src/core/application';
import {TestDomAdapter} from 'dom/dom_adapter';

export function bootstrap(appComponentType: Type,
                          componentInjectableBindings: List<Type | Binding | List<any>> = null,
                          errorReporter: Function = null): Promise<ApplicationRef> {
    TestDomAdapter.makeCurrent();
    return angular2.bootstrap(appComponentType, componentInjectableBindings, errorReporter)
}
