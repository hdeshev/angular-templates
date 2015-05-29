import {BaseException} from 'angular2/src/facade/lang';
import {DomAdapter, setRootDomAdapter} from 'angular2/src/dom/dom_adapter';

function _abstract() {
  debugger;
  return new BaseException('This method is abstract');
}

export {setRootDomAdapter} from 'angular2/src/dom/dom_adapter';

export class Document {
    constructor(public head: any) {
    }
}

var parsedDoc = {
    name: 'app',
    classes: [],
    attrs: new Map<string, string>([['name', 'Jim']]),
    children: [
        {
            name: 'label',
            text: 'label1',
            attrs: new Map<string, string>(),
            classes: [],
            children: []
        },
        {
            name: 'button',
            text: 'button1',
            attrs: new Map<string, string>(),
            classes: [],
            children: []
        }
    ]
}

/**
 * Provides DOM operations in an environment-agnostic way.
 */
export class TestDomAdapter extends DomAdapter {
  static makeCurrent() { setRootDomAdapter(new TestDomAdapter()); }

  logError(error) { throw _abstract(); }

  /**
   * Maps attribute names to their corresponding property names for cases
   * where attribute name doesn't match property name.
   */
  get attrToPropMap(): StringMap<string, string> { throw _abstract(); }

  parse(templateHtml: string) { throw _abstract(); }
  query(selector: string): any { throw _abstract(); }
  querySelector(el, selector: string) {
      //throw _abstract();
      return parsedDoc;
  }
  querySelectorAll(el, selector: string): List<any> {
      //throw _abstract();
      return parsedDoc.children;
  }
  on(el, evt, listener) { throw _abstract(); }
  onAndCancel(el, evt, listener): Function { throw _abstract(); }
  dispatchEvent(el, evt) { throw _abstract(); }
  createMouseEvent(eventType): any { throw _abstract(); }
  createEvent(eventType: string): any { throw _abstract(); }
  preventDefault(evt) { throw _abstract(); }
  getInnerHTML(el): string { throw _abstract(); }
  getOuterHTML(el): string { throw _abstract(); }
  nodeName(node): string {
      //throw _abstract();
      return node.name;
  }
  nodeValue(node): string {
      //throw _abstract();
      if (node.text)
          return node.text;
      else
          return null;
  }
  type(node): string { throw _abstract(); }
  content(node): any { throw _abstract(); }
  firstChild(el): any {
      if (el.children)
          return el.children[0];
      else
          return null;
  }
  nextSibling(el): any {
      //throw _abstract();
      if (el === parsedDoc.children[0])
          return parsedDoc.children[1]
      else
          return null;
  }
  parentElement(el): any { throw _abstract(); }
  childNodes(el): List<any> {
      return el.children || [];
  }
  childNodesAsList(el): List<any> {
      //throw _abstract();
      return this.childNodes(el);
  }
  clearNodes(el) { throw _abstract(); }
  appendChild(el, node) {
      //throw _abstract();
      console.log('appendChild', el, node);
  }
  removeChild(el, node) {
      //throw _abstract();
      console.log('removeChild', el, node);
  }
  replaceChild(el, newNode, oldNode) { throw _abstract(); }
  remove(el) { throw _abstract(); }
  insertBefore(el, node) { throw _abstract(); }
  insertAllBefore(el, nodes) { throw _abstract(); }
  insertAfter(el, node) { throw _abstract(); }
  setInnerHTML(el, value) { throw _abstract(); }
  getText(el): any { throw _abstract(); }
  setText(el, value: string) { throw _abstract(); }
  getValue(el): any { throw _abstract(); }
  setValue(el, value: string) { throw _abstract(); }
  getChecked(el): any { throw _abstract(); }
  setChecked(el, value: boolean) { throw _abstract(); }
  createTemplate(html): any {
      //throw _abstract();
      console.log('createTemplate', html);
      debugger;
      return parsedDoc;
  }
  createElement(tagName, doc = null): any {
      //throw _abstract();
      debugger;
      return {
          name: tagName,
          attrs: new Map<string, string>(),
          classes: [],
          children: []
      };
  }
  createTextNode(text: string, doc = null): any { throw _abstract(); }
  createScriptTag(attrName: string, attrValue: string, doc = null): any { throw _abstract(); }
  createStyleElement(css: string, doc = null): any { throw _abstract(); }
  createShadowRoot(el): any { throw _abstract(); }
  getShadowRoot(el): any { throw _abstract(); }
  getHost(el): any { throw _abstract(); }
  getDistributedNodes(el): List<any> { throw _abstract(); }
  clone(node): any { throw _abstract(); }
  hasProperty(element, name: string): boolean { throw _abstract(); }
  getElementsByClassName(element, name: string): List<any> {
      //throw _abstract();
      return [parsedDoc];
  }
  getElementsByTagName(element, name: string): List<any> { throw _abstract(); }
  classList(element): List<any> {
      //throw _abstract();
      return element.classes || []
  }
  addClass(element, classname: string) {
      //throw _abstract();
      element.classes.push(classname);
  }
  removeClass(element, classname: string) { throw _abstract(); }
  hasClass(element, classname: string) {
      return this.classList(element).indexOf(classname) != -1;
  }
  setStyle(element, stylename: string, stylevalue: string) { throw _abstract(); }
  removeStyle(element, stylename: string) { throw _abstract(); }
  getStyle(element, stylename: string) { throw _abstract(); }
  tagName(element): string {
      return element.name;
  }
  attributeMap(element): Map<string, string> {
      if (element.attrs && element.attrs.size > 0)
          return element.attrs
      else
          return new Map<string, string>();
  }
  hasAttribute(element, attribute: string): boolean { throw _abstract(); }
  getAttribute(element, attribute: string): string { throw _abstract(); }
  setAttribute(element, name: string, value: string) { throw _abstract(); }
  removeAttribute(element, attribute: string) { throw _abstract(); }
  templateAwareRoot(el) {
      //throw _abstract();
      return el;
  }
  createHtmlDocument() {
      debugger;
      return parsedDoc;
  }
  defaultDoc(): any {
      debugger;
      return parsedDoc;
  }
  getBoundingClientRect(el) { throw _abstract(); }
  getTitle(): string { throw _abstract(); }
  setTitle(newTitle: string) { throw _abstract(); }
  elementMatches(n, selector: string): boolean { throw _abstract(); }
  isTemplateElement(el: any): boolean {
      //throw _abstract();
      return el.name.toLowerCase() == 'template';
  }
  isTextNode(node): boolean {
      //throw _abstract();
      return node.text != null;
  }
  isCommentNode(node): boolean { throw _abstract(); }
  isElementNode(node): boolean {
      //throw _abstract();
      let hasText = !!node.text;
      return !hasText;
  }
  hasShadowRoot(node): boolean { throw _abstract(); }
  isShadowRoot(node): boolean { throw _abstract(); }
  importIntoDoc(node) {
      //throw _abstract();
      return node;
  }
  isPageRule(rule): boolean { throw _abstract(); }
  isStyleRule(rule): boolean { throw _abstract(); }
  isMediaRule(rule): boolean { throw _abstract(); }
  isKeyframesRule(rule): boolean { throw _abstract(); }
  getHref(element): string {
      //throw _abstract();
      return element.attrs.href;
  }
  getEventKey(event): string { throw _abstract(); }
  resolveAndSetHref(element, baseUrl: string, href: string) {
      //throw _abstract();
      element.attrs.href = href;
  }
  cssToRules(css: string): List<any> { throw _abstract(); }
  supportsDOMEvents(): boolean { throw _abstract(); }
  supportsNativeShadowDOM(): boolean { throw _abstract(); }
  getGlobalEventTarget(target: string) { throw _abstract(); }
  getHistory() { throw _abstract(); }
  getLocation() { throw _abstract(); }
  getBaseHref() { throw _abstract(); }
  getUserAgent() { throw _abstract(); }
}

if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(searchString, position) {
    position = position || 0;
    return this.lastIndexOf(searchString, position) === position;
  };
}

if (!Array.prototype.fill) {
  Array.prototype.fill = function(value) {

    // Steps 1-2.
    if (this == null) {
      throw new TypeError('this is null or not defined');
    }

    var O = Object(this);

    // Steps 3-5.
    var len = O.length >>> 0;

    // Steps 6-7.
    var start = arguments[1];
    var relativeStart = start >> 0;

    // Step 8.
    var k = relativeStart < 0 ?
      Math.max(len + relativeStart, 0) :
      Math.min(relativeStart, len);

    // Steps 9-10.
    var end = arguments[2];
    var relativeEnd = end === undefined ?
      len : end >> 0;

    // Step 11.
    var final = relativeEnd < 0 ?
      Math.max(len + relativeEnd, 0) :
      Math.min(relativeEnd, len);

    // Step 12.
    while (k < final) {
      O[k] = value;
      k++;
    }

    // Step 13.
    return O;
  };
}
