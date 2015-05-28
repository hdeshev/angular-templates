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
  querySelector(el, selector: string) { throw _abstract(); }
  querySelectorAll(el, selector: string): List<any> { throw _abstract(); }
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
      return "div";
  }
  nodeValue(node): string { throw _abstract(); }
  type(node): string { throw _abstract(); }
  content(node): any { throw _abstract(); }
  firstChild(el): any {
      //throw _abstract();
      return null;
  }
  nextSibling(el): any { throw _abstract(); }
  parentElement(el): any { throw _abstract(); }
  childNodes(el): List<any> {
      //throw _abstract();
      return [];
  }
  childNodesAsList(el): List<any> { throw _abstract(); }
  clearNodes(el) { throw _abstract(); }
  appendChild(el, node) { throw _abstract(); }
  removeChild(el, node) { throw _abstract(); }
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
  createTemplate(html): any { throw _abstract(); }
  createElement(tagName, doc = null): any {
      //throw _abstract();
      return {};
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
  getElementsByClassName(element, name: string): List<any> { throw _abstract(); }
  getElementsByTagName(element, name: string): List<any> { throw _abstract(); }
  classList(element): List<any> {
      //throw _abstract();
      return [];
  }
  addClass(element, classname: string) { throw _abstract(); }
  removeClass(element, classname: string) { throw _abstract(); }
  hasClass(element, classname: string) {
      //throw _abstract();
      return false;
  }
  setStyle(element, stylename: string, stylevalue: string) { throw _abstract(); }
  removeStyle(element, stylename: string) { throw _abstract(); }
  getStyle(element, stylename: string) { throw _abstract(); }
  tagName(element): string {
      //throw _abstract();
      return "div";
  }
  attributeMap(element): Map<string, string> {
      //throw _abstract();
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
  createHtmlDocument() { return new Document({}); }
  defaultDoc(): any { return new Document({}); }
  getBoundingClientRect(el) { throw _abstract(); }
  getTitle(): string { throw _abstract(); }
  setTitle(newTitle: string) { throw _abstract(); }
  elementMatches(n, selector: string): boolean { throw _abstract(); }
  isTemplateElement(el: any): boolean {
      //throw _abstract();
      return false;
  }
  isTextNode(node): boolean { throw _abstract(); }
  isCommentNode(node): boolean { throw _abstract(); }
  isElementNode(node): boolean { throw _abstract(); }
  hasShadowRoot(node): boolean { throw _abstract(); }
  isShadowRoot(node): boolean { throw _abstract(); }
  importIntoDoc(node) { throw _abstract(); }
  isPageRule(rule): boolean { throw _abstract(); }
  isStyleRule(rule): boolean { throw _abstract(); }
  isMediaRule(rule): boolean { throw _abstract(); }
  isKeyframesRule(rule): boolean { throw _abstract(); }
  getHref(element): string {
      //throw _abstract();
      return element.href;
  }
  getEventKey(event): string { throw _abstract(); }
  resolveAndSetHref(element, baseUrl: string, href: string) {
      //throw _abstract();
      element.href = href;
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
