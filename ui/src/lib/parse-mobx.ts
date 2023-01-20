// Import from mobx
import { action, configure, extendObservable, runInAction } from 'mobx';

// Configure mobx strictMode. so any changes to observable must be in actions.
configure({ enforceActions: 'observed' });

/**
 * Main Class
 */
export class ParseMobx {
  private readonly attributes: any;
  private readonly _parseObj: any;

  /**
   *
   * @param key
   * @param value
   * @private
   */
  private checkDefined(key: string | number, initValue: any) {
    if (typeof this.attributes[key] === 'undefined') {
      const objToExtend: any = {};

      objToExtend[key] = initValue;
      extendObservable(this.attributes, objToExtend);
    }
  }

  /**
   *
   * @param key
   * @param type
   * @private
   */
  private checkType(key: string, type: string) {
    return this.attributes[key].constructor.name === type;
  }

  private id: string;

  /**
   * Convert a ParseObject or array of ParseObjects to ParseMobx object or array of ParseMobx objects.
   * @static
   * @param param
   * @returns {ParseMobx|<ParseMobx>|null}
   */
  static toParseMobx(param: any): any {
    return typeof param === 'function'
      ? (obj: any) => param(new ParseMobx(obj))
      : Array.isArray(param)
      ? param.map((obj) => new ParseMobx(obj))
      : param
      ? new ParseMobx(param)
      : null;
  }

  /**
   *
   * @param list
   * @param item
   * @param key
   */
  static deleteListItem(list: any, item: any, key = 'id') {
    list.splice(
      list.findIndex((obj: { [x: string]: any }) => obj[key] === item[key]),
      1,
    );
  }

  /**
   *
   * @param list
   * @param item
   * @param key
   */
  static updateListItem(list: any[], item: { [x: string]: any }, key = 'id') {
    list[list.findIndex((obj) => obj[key] === item[key])] = item;
  }

  /**
   *
   * @param {ParseObject} obj The parse object.
   */
  constructor(obj: any) {
    // make sure objects are saved.
    if (obj.isNew()) {
      throw new Error(`Only Saved Parse objects can be converted to ParseMobx objects.
            not saved object: ${obj.className}`);
    }

    // keep a ref of parse object.
    this._parseObj = obj;

    // copy id
    this.id = obj.id;
    this.attributes = { createdAt: obj.get('createdAt') };

    // store props to be observed.
    const observableObject: any = {};

    for (let key in obj.attributes) {
      const attribute = obj.attributes[key];

      if (attribute.constructor.name === 'ParseObjectSubclass') {
        this.attributes[key] = new ParseMobx(attribute);
      } else if (Array.isArray(attribute)) {
        observableObject[key] = attribute.map((el) =>
          el.constructor.name === 'ParseObjectSubclass'
            ? new ParseMobx(el)
            : el.constructor.name !== 'ParseRelation' &&
              el.constructor.name !== 'ParseACL'
            ? el
            : null,
        );
      } else if (
        attribute.constructor.name !== 'ParseRelation' &&
        attribute.constructor.name !== 'ParseACL' &&
        key !== 'createdAt'
      ) {
        observableObject[key] = attribute;
      }
    }

    extendObservable(this.attributes, observableObject);
  }

  /**
   * todo: update Model
   * Atomically add an object to the end of the array associated with a given key.
   * @param attr
   * @param item
   * @returns {ParseMobx}
   */
  add(attr: any, item: any) {
    this._parseObj.add(attr, item);
    return this;
  }

  /**
   * todo: update Model
   * Atomically add the objects to the end of the array associated with a given key.
   * @param attr
   * @param item
   * @returns {ParseMobx}
   */
  addAll(attr: any, item: any) {
    this._parseObj.addAll(attr, item);
    return this;
  }

  /**
   * Atomically add the objects to the array associated with a given key,
   * only if it is not already present in the array. The position of the insert is not guaranteed.
   * @param attr
   * @param items
   * @returns {ParseMobx}
   */
  @action
  addAllUnique(attr: string, items: any[]) {
    this.checkDefined(attr, []);
    if (this.checkType(attr, 'Array')) {
      items.forEach((item) => {
        if (this.attributes[attr].indexOf(item) === -1) {
          item.constructor.name === 'ParseObjectSubclass'
            ? this.attributes[attr].push(new ParseMobx(item))
            : this.attributes[attr].push(item);
        }
      });
    }
    this._parseObj.addAllUnique(attr, items);
    return this;
  }

  /**
   * Atomically add an object to the array associated with a given key,
   * only if it is not already present in the array. The position of the insert is not guaranteed.
   * @param key
   * @param value
   * @returns {ParseMobx}
   */
  @action
  addUnique(key: string, value: { constructor: { name: string } }) {
    this.checkDefined(key, []);
    if (this.checkType(key, 'Array')) {
      if (this.attributes[key].indexOf(value) === -1) {
        value.constructor.name === 'ParseObjectSubclass'
          ? this.attributes[key].push(new ParseMobx(value))
          : this.attributes[key].push(value);
      }
    }
    this._parseObj.addUnique(key, value);
    return this;
  }

  /**
   *
   */
  clear() {
    return this._parseObj.clear();
  }

  /**
   *
   */
  clone() {
    return this._parseObj.clone();
  }

  /**
   *
   * @returns {Promise<*>}
   */
  destroy(options: any) {
    this._parseObj.destroy(options);
  }

  /**
   *
   * @param attr
   * @returns {*|Boolean}
   */
  dirty(attr: any) {
    return this._parseObj.dirty(attr);
  }

  /**
   *
   * @returns {*|String[]}
   */
  dirtyKeys() {
    return this._parseObj.dirtyKeys();
  }

  /**
   *
   * @param other
   * @returns {*}
   */
  equals(other: any) {
    return this._parseObj.equals(other);
  }

  /**
   *
   * @param attr
   * @returns {*|string|void}
   */
  escape(attr: any) {
    return this._parseObj.escape(attr);
  }

  /**
   *
   * @returns {*|Boolean}
   */
  existed() {
    return this._parseObj.existed();
  }

  /**
   *
   * @param options
   * @returns {Promise<ParseMobx>}
   */
  fetch(options: any) {
    return new Promise((resolve, reject) => {
      this._parseObj
        .fetch(options)
        .then((newParseObj: any) => new ParseMobx(newParseObj))
        .catch(reject);
    });
  }

  /**
   *
   * @param keys
   * @param options
   * @returns {Promise<ParseMobx>}
   */
  fetchWithInclude(keys: any, options: any) {
    return new Promise((resolve, reject) => {
      this._parseObj
        .fetchWithInclude(keys, options)
        .then((newParseObj: any) => new ParseMobx(newParseObj))
        .catch(reject);
    });
  }

  /**
   * return the attribute
   * @param key
   */
  get(key: string) {
    return this.attributes[key];
  }

  getId() {
    return this.id;
  }

  /**
   *
   * @returns {ParseMobx}
   */
  getACL() {
    this._parseObj.getACL(arguments);
    return this;
  }

  /**
   *
   * @param attr
   * @returns {*}
   */
  has(attr: any) {
    return this._parseObj.has(attr);
  }

  /**
   *
   * @param attr
   * @param amount
   */
  @action
  increment(attr: string, amount = 1) {
    // set 0 to attr if undefined.
    this.checkDefined(attr, 0);

    if (this.checkType(attr, 'Number')) {
      this.attributes[attr] += amount;
    }
    this._parseObj.increment(attr, amount);
  }

  /**
   *
   * @returns {boolean}
   */
  isNew() {
    return false;
  }

  /**
   *
   * @returns {*|Boolean|boolean}
   */
  isValid() {
    return this._parseObj.isValid();
  }

  /**
   *
   * @returns {*|Parse.Object}
   */
  newInstance() {
    return this._parseObj.newInstance();
  }

  /**
   *
   * @param attr
   * @returns {*|Parse.Op}
   */
  op(attr: any) {
    return this._parseObj.op(attr);
  }

  /**
   *
   * @returns {*|Parse.Relation}
   */
  relation(attr: any) {
    return this._parseObj.relation(attr);
  }

  /**
   *
   * @param key
   * @param value
   * @returns {ParseMobx}
   */
  @action
  remove(key: string, value: any) {
    this.checkDefined(key, []);

    if (this.checkType(key, 'Array')) {
      if (this.attributes[key].indexOf(value) !== -1) {
        this.attributes[key].splice(this.attributes[key].indexOf(value), 1);
      }
    }
    this._parseObj.remove(key, value);
    return this;
  }

  /**
   *
   * @param attr
   * @param items
   * @returns {ParseMobx}
   */
  @action
  removeAll(attr: string, items: any[]) {
    this.checkDefined(attr, []);

    if (this.checkType(attr, 'Array')) {
      items.forEach((item) => {
        if (this.attributes[attr].indexOf(item) !== -1) {
          this.attributes[attr].splice(this.attributes[attr].indexOf(item), 1);
        }
      });
    }
    this._parseObj.removeAll(attr, items);
    return this;
  }

  /**
   *
   * @returns {ParseMobx}
   */
  @action
  revert() {
    this._parseObj.revert();
    return new ParseMobx(this._parseObj);
  }

  /**
   *
   * @returns {Promise<void>}
   */
  @action
  save(options?: any) {
    return new Promise((resolve, reject) => {
      this._parseObj
        .save(options)
        .then(() => {
          runInAction(() =>
            this.set('updatedAt', new Date().toISOString(), undefined),
          );
          resolve(this);
        })
        .catch(reject);
    });
  }

  @action
  saveEventually(options: any) {
    return new Promise((resolve, reject) => {
      this._parseObj
        .saveEventually(options)
        .then(() => {
          runInAction(() =>
            this.set('updatedAt', new Date().toISOString(), undefined),
          );
          resolve(this);
        })
        .catch(reject);
    });
  }

  /**
   *
   * @param key
   * @param value
   * @param options
   */
  @action
  set(key: string, value: string | number | boolean | object, options?: any) {
    if (value.constructor.name === 'ParseRelation') {
      throw new Error('You can not add relations with set');
    }
    if (value.constructor.name === 'ParseACL') {
      throw new Error('Please use setACL() instead');
    }
    if (typeof this.attributes[key] !== 'undefined') {
      // if it is parse subclass, create parse object.
      if (value.constructor.name === 'ParseObjectSubclass') {
        this.attributes[key] = new ParseMobx(value);
      } else {
        this.attributes[key] = value;
      }
    } else {
      const objToExtend: any = {};

      objToExtend[key] = value;
      extendObservable(this.attributes, objToExtend);
    }
    this._parseObj.set(key, value, options);
    return this;
  }

  /**
   *
   * @returns {ParseMobx}
   */
  setACL(acl: any, options?: any) {
    this._parseObj.setACL(acl, options);
    return this;
  }

  /**
   *
   * @returns {*}
   */
  toJSON() {
    return this._parseObj.toJSON();
  }

  /**
   *
   * @returns {ParseMobx}
   */
  toPointer() {
    return this;
  }

  /**
   * todo: update model?
   * @param attr
   */
  unset(attr: any) {
    this._parseObj.unset(attr);
    return new ParseMobx(this._parseObj);
  }

  /**
   *
   * @param attrs
   * @returns {*|boolean|_ParseError.default|void|string|ActiveX.IXMLDOMParseError}
   */
  validate(attrs: any) {
    return this._parseObj.validate(attrs);
  }

  /**
   *
   * @returns {ParseObject}
   */
  getParseObject() {
    return this._parseObj;
  }
}
