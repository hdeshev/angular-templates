import {
    isPresent,
    isBlank,
    assertionsEnabled,
    Type,
} from 'angular2/src/facade/lang';
import {List, ListWrapper} from 'angular2/src/facade/collection';
import {NgZone} from 'angular2/src/core/zone/ng_zone';
import {Promise, PromiseWrapper} from 'angular2/src/facade/async';
import {ApplicationRef} from 'angular2/src/core/application';
import {Injector, bind, OpaqueToken, Binding} from 'angular2/di';
import {TestDomAdapter} from 'dom/dom_adapter';
import {DOM} from 'angular2/src/dom/dom_adapter';
import {TestDomCompiler} from 'compiler/compiler';

import {Compiler, CompilerCache} from 'angular2/src/core/compiler/compiler';
import {ProtoViewFactory} from 'angular2/src/core/compiler/proto_view_factory';
import {ComponentUrlMapper} from 'angular2/src/core/compiler/component_url_mapper';
import {AppViewManager} from 'angular2/src/core/compiler/view_manager';
import {AppViewManagerUtils} from 'angular2/src/core/compiler/view_manager_utils';

import {DomRenderer, DOCUMENT_TOKEN} from 'angular2/src/render/dom/dom_renderer';
import {Renderer, RenderCompiler} from 'angular2/src/render/api';

import {DefaultDomCompiler} from 'angular2/src/render/dom/compiler/compiler';
import {resolveInternalDomView} from 'angular2/src/render/dom/view/view';
import {EventManager} from 'angular2/src/render/dom/events/event_manager';
import {ShadowDomStrategy} from 'angular2/src/render/dom/shadow_dom/shadow_dom_strategy';
import {EmulatedUnscopedShadowDomStrategy} from 'angular2/src/render/dom/shadow_dom/emulated_unscoped_shadow_dom_strategy';
import {AppViewPool, APP_VIEW_POOL_CAPACITY} from 'angular2/src/core/compiler/view_pool';
import {XHR} from 'angular2/src/services/xhr';
import {XHRImpl} from 'angular2/src/services/xhr_impl';
import {StyleInliner} from 'angular2/src/render/dom/shadow_dom/style_inliner';

import {Reflector, reflector} from 'angular2/src/reflection/reflection';
import {
  Parser,
  Lexer,
  ChangeDetection,
  DynamicChangeDetection,
  PipeRegistry,
  defaultPipeRegistry
} from 'angular2/change_detection';
import {
  ComponentRef,
  DynamicComponentLoader
} from 'angular2/src/core/compiler/dynamic_component_loader';
import {ExceptionHandler} from 'angular2/src/core/exception_handler';
import {UrlResolver} from 'angular2/src/services/url_resolver';
import {StyleUrlResolver} from 'angular2/src/render/dom/shadow_dom/style_url_resolver';
import {DirectiveResolver} from 'angular2/src/core/compiler/directive_resolver';
import {TemplateLoader} from 'angular2/src/render/dom/compiler/template_loader';
import {TemplateResolver} from 'angular2/src/core/compiler/template_resolver';
import {LifeCycle} from 'angular2/src/core/life_cycle/life_cycle';
import {appComponentRefToken, appComponentTypeToken} from 'angular2/src/core/application_tokens';
import {internalView} from 'angular2/src/core/compiler/view_ref';
import {TestabilityRegistry, Testability} from 'angular2/src/core/testability/testability';

function _createNgZone(givenReporter: Function): NgZone {
  var defaultErrorReporter = (exception, stackTrace) => {
    var longStackTrace = ListWrapper.join(stackTrace, "\n\n-----async gap-----\n");
    DOM.logError(`${exception}\n\n${longStackTrace}`);
    throw exception;
  };

  var reporter = isPresent(givenReporter) ? givenReporter : defaultErrorReporter;

  var zone = new NgZone({enableLongStackTrace: assertionsEnabled()});
  zone.initCallbacks({onErrorHandler: reporter});
  return zone;
}

function _injectorBindings(appComponentType): List<Type | Binding | List<any>> {
  console.log(appComponentRefToken);
  return [
    bind(DOCUMENT_TOKEN)
        .toValue(DOM.defaultDoc()),
    bind(appComponentTypeToken).toValue(appComponentType),
    bind(appComponentRefToken)
        .toAsyncFactory((dynamicComponentLoader, injector, testability, registry) =>
                        {
                            console.log('app component loading');
                          // TODO(rado): investigate whether to support bindings on root component.
                          debugger;
                          return dynamicComponentLoader.loadAsRoot(appComponentType, null, injector)
                              .then((componentRef) => {
                                console.log('app component loaded')
                                var domView = resolveInternalDomView(componentRef.hostView.render);
                                // We need to do this here to ensure that we create Testability and
                                // it's ready on the window for users.
                                registry.registerApplication(domView.boundElements[0], testability);

                                return componentRef;
                              });
                        },
                        [DynamicComponentLoader, Injector, Testability, TestabilityRegistry]),

    bind(appComponentType).toFactory((ref) => ref.instance, [appComponentRefToken]),
    bind(LifeCycle)
        .toFactory((exceptionHandler) => new LifeCycle(exceptionHandler, null, assertionsEnabled()),
                   [ExceptionHandler]),
    bind(EventManager)
        .toFactory(
            (ngZone) =>
            {
                var plugins = [
                    //new HammerGesturesPlugin(),
                    //new KeyEventsPlugin(),
                    //new DomEventsPlugin()
                ];
                return new EventManager(plugins, ngZone);
            },
            [NgZone]),
    bind(ShadowDomStrategy)
        .toFactory(
            (styleUrlResolver, doc) => {
                console.log('strategy doc', doc);
                return new EmulatedUnscopedShadowDomStrategy(styleUrlResolver, doc.head)
            },
            [StyleUrlResolver, DOCUMENT_TOKEN]
        ),
    // TODO(tbosch): We need an explicit factory here, as
    // we are getting errors in dart2js with mirrors...
    bind(DomRenderer)
        .toFactory(
            (eventManager, shadowDomStrategy, doc) => {
                console.log('renderer doc', doc);
                return new DomRenderer(eventManager, shadowDomStrategy, doc)
            },
            [EventManager, ShadowDomStrategy, DOCUMENT_TOKEN]
        ),
    bind(Renderer).toAlias(DomRenderer),
    //TestDomCompiler,
    //bind(RenderCompiler).toAlias(TestDomCompiler),
    bind(DefaultDomCompiler).toFactory(
        (parser, shadowDomStrategy, templateLoader) => {
            return new DefaultDomCompiler(parser, shadowDomStrategy, templateLoader)
        },
        [Parser, ShadowDomStrategy, TemplateLoader]
    ),
    bind(RenderCompiler).toAlias(DefaultDomCompiler),
    //// // TODO(tbosch): We need an explicit factory here, as
    //// // we are getting errors in dart2js with mirrors...
    bind(AppViewPool).toFactory((capacity) => new AppViewPool(capacity), [APP_VIEW_POOL_CAPACITY]),
    bind(APP_VIEW_POOL_CAPACITY).toValue(10000),
    DirectiveResolver,
    bind(AppViewManagerUtils).toFactory(
        (directiveResolver) => new AppViewManagerUtils(directiveResolver),
        [DirectiveResolver]
    ),
    bind(AppViewManager).toFactory(
        (viewPool, utils, renderer) => new AppViewManager(viewPool, utils, renderer),
        [AppViewPool, AppViewManagerUtils, Renderer]
    ),
    bind(Compiler).toFactory(
        (reader, cache, templateResolver,
         componentUrlMapper, urlResolver,
         render, protoViewFactory) => {
            return new Compiler(reader, cache, templateResolver,
                componentUrlMapper, urlResolver,
                render, protoViewFactory)
         },
         [DirectiveResolver, CompilerCache, TemplateResolver,
          ComponentUrlMapper, UrlResolver,
          RenderCompiler, ProtoViewFactory]
    ),
    CompilerCache,
    TemplateResolver,
    bind(PipeRegistry).toValue(defaultPipeRegistry),
    bind(ChangeDetection).toFactory(
        pipeRegistry => new DynamicChangeDetection(pipeRegistry),
        [PipeRegistry]
    ),
    bind(ProtoViewFactory).toFactory(
        changeDetection => new ProtoViewFactory(changeDetection),
        [ChangeDetection]
    ),
    bind(TemplateLoader).toFactory(
        (xhr, urlResolver) => new TemplateLoader(xhr, urlResolver),
        [XHR, UrlResolver]
    ),
    Lexer,
    bind(Parser).toFactory(
        (lexer, reflector) => new Parser(lexer, reflector),
        [Lexer, Reflector]
    ),
    ExceptionHandler,
    bind(XHR).toValue(new XHRImpl()),
    ComponentUrlMapper,
    UrlResolver,
    bind(StyleUrlResolver).toFactory((urlResolver) => new StyleUrlResolver(urlResolver), [UrlResolver]),
    bind(StyleInliner).toFactory(
        (xhr, styleUrlResolver, urlResolver) => new StyleInliner(xhr, styleUrlResolver, urlResolver),
        [XHR, StyleUrlResolver, UrlResolver]
    ),
    bind(DynamicComponentLoader).toFactory(
        (compiler, appViewManager) => {
            return new DynamicComponentLoader(compiler, appViewManager)
        },
        [Compiler, AppViewManager]
    ),
    Testability
  ];
}

var _rootInjector: Injector;
var _rootBindings = [
    bind(Reflector).toValue(reflector),
    TestabilityRegistry,
];

function _createAppInjector(appComponentType: Type, bindings: List<Type | Binding | List<any>>,
                            zone: NgZone): Injector {
  if (isBlank(_rootInjector)) _rootInjector = Injector.resolveAndCreate(_rootBindings);
  var mergedBindings = isPresent(bindings) ?
                           ListWrapper.concat(_injectorBindings(appComponentType), bindings) :
                           _injectorBindings(appComponentType);
  ListWrapper.push(mergedBindings, bind(NgZone).toValue(zone));
  return _rootInjector.resolveAndCreateChild(mergedBindings);
}

export function bootstrap(appComponentType: Type,
                          componentInjectableBindings: List<Type | Binding | List<any>> = null,
                          errorReporter: Function = null): Promise<ApplicationRef> {
  TestDomAdapter.makeCurrent();
  var bootstrapProcess = PromiseWrapper.completer();

  var zone = _createNgZone(errorReporter);
  zone.run(() => {
    // TODO(rado): prepopulate template cache, so applications with only
    // index.html and main.js are possible.

    var appInjector = _createAppInjector(appComponentType, componentInjectableBindings, zone);

    //TODO: get rid of the test bindings
    var renderer = appInjector.get(Renderer);
    var loader = appInjector.get(TemplateLoader);
    var inliner = appInjector.get(StyleInliner);
    //var loader = appInjector.get(DynamicComponentLoader);
    console.log(loader);

    PromiseWrapper.then(
        appInjector.asyncGet(appComponentRefToken),
        (componentRef) =>
        {
            var appChangeDetector = internalView(componentRef.hostView).changeDetector;
            // retrieve life cycle: may have already been created if injected in root component
            var lc = appInjector.get(LifeCycle);
            lc.registerWith(zone, appChangeDetector);
            lc.tick();  // the first tick that will bootstrap the app

            bootstrapProcess.resolve(new ApplicationRef(componentRef, appComponentType, appInjector));
        },

        (err, stackTrace) => {bootstrapProcess.reject(err, stackTrace)}
    );
  });

  return bootstrapProcess.promise;
}
