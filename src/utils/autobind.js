function boundMethod(target, key, descriptor) {
  let fn = descriptor.value;
  let definingProperty = false;

  return {
    configurable: true,
    get() {
      /* eslint-disable no-prototype-builtins */
      if (
        definingProperty ||
        this === target.prototype ||
        this.hasOwnProperty(key) ||
        typeof fn !== 'function'
      ) {
        /* eslint-enable no-prototype-builtins */
        return fn;
      }

      const boundFn = fn.bind(this);
      definingProperty = true;
      Object.defineProperty(this, key, {
        configurable: true,
        get() {
          return boundFn;
        },
        set(value) {
          fn = value;
          delete this[key];
        },
      });
      definingProperty = false;
      return boundFn;
    },
    set(value) {
      fn = value;
    },
  };
}

export default function autobind(...args) {
  if (args.length === 3) {
    return boundMethod(...args);
  }
  if (Array.isArray(args[0])) {
    return target => {
      args[0].forEach(key => {
        if (typeof key === 'string') {
          const descriptor = Object.getOwnPropertyDescriptor(
            target.prototype,
            key
          );
          const fn = descriptor.value;
          if (typeof fn === 'function') {
            Object.defineProperty(
              target.prototype,
              key,
              boundMethod(target, key, descriptor)
            );
          } else {
            throw new Error('必须传入类的方法名！');
          }
        }
      });
      return target;
    };
  }
  if (Array.isArray(args[1])) {
    const ctx = args[0];
    const methodKeys = args[1];
    methodKeys.forEach(key => {
      const fn = ctx[key];
      if (typeof fn === 'function') {
        ctx[key] = fn.bind(ctx);
      }
    });
    // eslint-disable-next-line consistent-return
    return;
  }
  throw new Error('autobind 参数错误');
}

// @autobind(['sayName'])
// class C {
//   name = 'c'
//   sayName() { }
// }

// class C {
//   name = 'c'
//   @autobind
//   sayName() { }
// }

// class C {
//   name = 'c'
//   constructor() {
//     autobind(this, ['sayName'])
//   }
//   sayName() { }
// }
