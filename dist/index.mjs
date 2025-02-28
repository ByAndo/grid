import P, { useRef as Le, useEffect as de, useState as De, useReducer as Je } from "react";
var ne = { exports: {} }, Z = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Se;
function qe() {
  if (Se) return Z;
  Se = 1;
  var e = Symbol.for("react.transitional.element"), r = Symbol.for("react.fragment");
  function l(n, a, u) {
    var d = null;
    if (u !== void 0 && (d = "" + u), a.key !== void 0 && (d = "" + a.key), "key" in a) {
      u = {};
      for (var o in a)
        o !== "key" && (u[o] = a[o]);
    } else u = a;
    return a = u.ref, {
      $$typeof: e,
      type: n,
      key: d,
      ref: a !== void 0 ? a : null,
      props: u
    };
  }
  return Z.Fragment = r, Z.jsx = l, Z.jsxs = l, Z;
}
var Q = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Re;
function Xe() {
  return Re || (Re = 1, process.env.NODE_ENV !== "production" && function() {
    function e(t) {
      if (t == null) return null;
      if (typeof t == "function")
        return t.$$typeof === We ? null : t.displayName || t.name || null;
      if (typeof t == "string") return t;
      switch (t) {
        case R:
          return "Fragment";
        case ee:
          return "Portal";
        case j:
          return "Profiler";
        case f:
          return "StrictMode";
        case $:
          return "Suspense";
        case F:
          return "SuspenseList";
      }
      if (typeof t == "object")
        switch (typeof t.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), t.$$typeof) {
          case B:
            return (t.displayName || "Context") + ".Provider";
          case A:
            return (t._context.displayName || "Context") + ".Consumer";
          case I:
            var i = t.render;
            return t = t.displayName, t || (t = i.displayName || i.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
          case U:
            return i = t.displayName || null, i !== null ? i : e(t.type) || "Memo";
          case K:
            i = t._payload, t = t._init;
            try {
              return e(t(i));
            } catch {
            }
        }
      return null;
    }
    function r(t) {
      return "" + t;
    }
    function l(t) {
      try {
        r(t);
        var i = !1;
      } catch {
        i = !0;
      }
      if (i) {
        i = console;
        var c = i.error, v = typeof Symbol == "function" && Symbol.toStringTag && t[Symbol.toStringTag] || t.constructor.name || "Object";
        return c.call(
          i,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          v
        ), r(t);
      }
    }
    function n() {
    }
    function a() {
      if (q === 0) {
        pe = console.log, he = console.info, ve = console.warn, je = console.error, ye = console.group, me = console.groupCollapsed, Ee = console.groupEnd;
        var t = {
          configurable: !0,
          enumerable: !0,
          value: n,
          writable: !0
        };
        Object.defineProperties(console, {
          info: t,
          log: t,
          warn: t,
          error: t,
          group: t,
          groupCollapsed: t,
          groupEnd: t
        });
      }
      q++;
    }
    function u() {
      if (q--, q === 0) {
        var t = { configurable: !0, enumerable: !0, writable: !0 };
        Object.defineProperties(console, {
          log: H({}, t, { value: pe }),
          info: H({}, t, { value: he }),
          warn: H({}, t, { value: ve }),
          error: H({}, t, { value: je }),
          group: H({}, t, { value: ye }),
          groupCollapsed: H({}, t, { value: me }),
          groupEnd: H({}, t, { value: Ee })
        });
      }
      0 > q && console.error(
        "disabledDepth fell below zero. This is a bug in React. Please file an issue."
      );
    }
    function d(t) {
      if (oe === void 0)
        try {
          throw Error();
        } catch (c) {
          var i = c.stack.trim().match(/\n( *(at )?)/);
          oe = i && i[1] || "", xe = -1 < c.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < c.stack.indexOf("@") ? "@unknown:0:0" : "";
        }
      return `
` + oe + t + xe;
    }
    function o(t, i) {
      if (!t || ie) return "";
      var c = ce.get(t);
      if (c !== void 0) return c;
      ie = !0, c = Error.prepareStackTrace, Error.prepareStackTrace = void 0;
      var v = null;
      v = Y.H, Y.H = null, a();
      try {
        var k = {
          DetermineComponentFrameRoot: function() {
            try {
              if (i) {
                var M = function() {
                  throw Error();
                };
                if (Object.defineProperty(M.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                }), typeof Reflect == "object" && Reflect.construct) {
                  try {
                    Reflect.construct(M, []);
                  } catch (G) {
                    var te = G;
                  }
                  Reflect.construct(t, [], M);
                } else {
                  try {
                    M.call();
                  } catch (G) {
                    te = G;
                  }
                  t.call(M.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (G) {
                  te = G;
                }
                (M = t()) && typeof M.catch == "function" && M.catch(function() {
                });
              }
            } catch (G) {
              if (G && te && typeof G.stack == "string")
                return [G.stack, te.stack];
            }
            return [null, null];
          }
        };
        k.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
        var w = Object.getOwnPropertyDescriptor(
          k.DetermineComponentFrameRoot,
          "name"
        );
        w && w.configurable && Object.defineProperty(
          k.DetermineComponentFrameRoot,
          "name",
          { value: "DetermineComponentFrameRoot" }
        );
        var b = k.DetermineComponentFrameRoot(), D = b[0], J = b[1];
        if (D && J) {
          var N = D.split(`
`), V = J.split(`
`);
          for (b = w = 0; w < N.length && !N[w].includes(
            "DetermineComponentFrameRoot"
          ); )
            w++;
          for (; b < V.length && !V[b].includes(
            "DetermineComponentFrameRoot"
          ); )
            b++;
          if (w === N.length || b === V.length)
            for (w = N.length - 1, b = V.length - 1; 1 <= w && 0 <= b && N[w] !== V[b]; )
              b--;
          for (; 1 <= w && 0 <= b; w--, b--)
            if (N[w] !== V[b]) {
              if (w !== 1 || b !== 1)
                do
                  if (w--, b--, 0 > b || N[w] !== V[b]) {
                    var X = `
` + N[w].replace(
                      " at new ",
                      " at "
                    );
                    return t.displayName && X.includes("<anonymous>") && (X = X.replace("<anonymous>", t.displayName)), typeof t == "function" && ce.set(t, X), X;
                  }
                while (1 <= w && 0 <= b);
              break;
            }
        }
      } finally {
        ie = !1, Y.H = v, u(), Error.prepareStackTrace = c;
      }
      return N = (N = t ? t.displayName || t.name : "") ? d(N) : "", typeof t == "function" && ce.set(t, N), N;
    }
    function h(t) {
      if (t == null) return "";
      if (typeof t == "function") {
        var i = t.prototype;
        return o(
          t,
          !(!i || !i.isReactComponent)
        );
      }
      if (typeof t == "string") return d(t);
      switch (t) {
        case $:
          return d("Suspense");
        case F:
          return d("SuspenseList");
      }
      if (typeof t == "object")
        switch (t.$$typeof) {
          case I:
            return t = o(t.render, !1), t;
          case U:
            return h(t.type);
          case K:
            i = t._payload, t = t._init;
            try {
              return h(t(i));
            } catch {
            }
        }
      return "";
    }
    function x() {
      var t = Y.A;
      return t === null ? null : t.getOwner();
    }
    function y(t) {
      if (be.call(t, "key")) {
        var i = Object.getOwnPropertyDescriptor(t, "key").get;
        if (i && i.isReactWarning) return !1;
      }
      return t.key !== void 0;
    }
    function O(t, i) {
      function c() {
        Oe || (Oe = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          i
        ));
      }
      c.isReactWarning = !0, Object.defineProperty(t, "key", {
        get: c,
        configurable: !0
      });
    }
    function E() {
      var t = e(this.type);
      return we[t] || (we[t] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), t = this.props.ref, t !== void 0 ? t : null;
    }
    function C(t, i, c, v, k, w) {
      return c = w.ref, t = {
        $$typeof: W,
        type: t,
        key: i,
        props: w,
        _owner: k
      }, (c !== void 0 ? c : null) !== null ? Object.defineProperty(t, "ref", {
        enumerable: !1,
        get: E
      }) : Object.defineProperty(t, "ref", { enumerable: !1, value: null }), t._store = {}, Object.defineProperty(t._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(t, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.freeze && (Object.freeze(t.props), Object.freeze(t)), t;
    }
    function p(t, i, c, v, k, w) {
      if (typeof t == "string" || typeof t == "function" || t === R || t === j || t === f || t === $ || t === F || t === Ve || typeof t == "object" && t !== null && (t.$$typeof === K || t.$$typeof === U || t.$$typeof === B || t.$$typeof === A || t.$$typeof === I || t.$$typeof === Be || t.getModuleId !== void 0)) {
        var b = i.children;
        if (b !== void 0)
          if (v)
            if (se(b)) {
              for (v = 0; v < b.length; v++)
                g(b[v], t);
              Object.freeze && Object.freeze(b);
            } else
              console.error(
                "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
              );
          else g(b, t);
      } else
        b = "", (t === void 0 || typeof t == "object" && t !== null && Object.keys(t).length === 0) && (b += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), t === null ? v = "null" : se(t) ? v = "array" : t !== void 0 && t.$$typeof === W ? (v = "<" + (e(t.type) || "Unknown") + " />", b = " Did you accidentally export a JSX literal instead of a component?") : v = typeof t, console.error(
          "React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",
          v,
          b
        );
      if (be.call(i, "key")) {
        b = e(t);
        var D = Object.keys(i).filter(function(N) {
          return N !== "key";
        });
        v = 0 < D.length ? "{key: someKey, " + D.join(": ..., ") + ": ...}" : "{key: someKey}", Ce[b + v] || (D = 0 < D.length ? "{" + D.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          v,
          b,
          D,
          b
        ), Ce[b + v] = !0);
      }
      if (b = null, c !== void 0 && (l(c), b = "" + c), y(i) && (l(i.key), b = "" + i.key), "key" in i) {
        c = {};
        for (var J in i)
          J !== "key" && (c[J] = i[J]);
      } else c = i;
      return b && O(
        c,
        typeof t == "function" ? t.displayName || t.name || "Unknown" : t
      ), C(t, b, w, k, x(), c);
    }
    function g(t, i) {
      if (typeof t == "object" && t && t.$$typeof !== Ue) {
        if (se(t))
          for (var c = 0; c < t.length; c++) {
            var v = t[c];
            m(v) && T(v, i);
          }
        else if (m(t))
          t._store && (t._store.validated = 1);
        else if (t === null || typeof t != "object" ? c = null : (c = fe && t[fe] || t["@@iterator"], c = typeof c == "function" ? c : null), typeof c == "function" && c !== t.entries && (c = c.call(t), c !== t))
          for (; !(t = c.next()).done; )
            m(t.value) && T(t.value, i);
      }
    }
    function m(t) {
      return typeof t == "object" && t !== null && t.$$typeof === W;
    }
    function T(t, i) {
      if (t._store && !t._store.validated && t.key == null && (t._store.validated = 1, i = S(i), !_e[i])) {
        _e[i] = !0;
        var c = "";
        t && t._owner != null && t._owner !== x() && (c = null, typeof t._owner.tag == "number" ? c = e(t._owner.type) : typeof t._owner.name == "string" && (c = t._owner.name), c = " It was passed a child from " + c + ".");
        var v = Y.getCurrentStack;
        Y.getCurrentStack = function() {
          var k = h(t.type);
          return v && (k += v() || ""), k;
        }, console.error(
          'Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',
          i,
          c
        ), Y.getCurrentStack = v;
      }
    }
    function S(t) {
      var i = "", c = x();
      return c && (c = e(c.type)) && (i = `

Check the render method of \`` + c + "`."), i || (t = e(t)) && (i = `

Check the top-level render call using <` + t + ">."), i;
    }
    var _ = P, W = Symbol.for("react.transitional.element"), ee = Symbol.for("react.portal"), R = Symbol.for("react.fragment"), f = Symbol.for("react.strict_mode"), j = Symbol.for("react.profiler"), A = Symbol.for("react.consumer"), B = Symbol.for("react.context"), I = Symbol.for("react.forward_ref"), $ = Symbol.for("react.suspense"), F = Symbol.for("react.suspense_list"), U = Symbol.for("react.memo"), K = Symbol.for("react.lazy"), Ve = Symbol.for("react.offscreen"), fe = Symbol.iterator, We = Symbol.for("react.client.reference"), Y = _.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, be = Object.prototype.hasOwnProperty, H = Object.assign, Be = Symbol.for("react.client.reference"), se = Array.isArray, q = 0, pe, he, ve, je, ye, me, Ee;
    n.__reactDisabledLog = !0;
    var oe, xe, ie = !1, ce = new (typeof WeakMap == "function" ? WeakMap : Map)(), Ue = Symbol.for("react.client.reference"), Oe, we = {}, Ce = {}, _e = {};
    Q.Fragment = R, Q.jsx = function(t, i, c, v, k) {
      return p(t, i, c, !1, v, k);
    }, Q.jsxs = function(t, i, c, v, k) {
      return p(t, i, c, !0, v, k);
    };
  }()), Q;
}
var Te;
function Ze() {
  return Te || (Te = 1, process.env.NODE_ENV === "production" ? ne.exports = qe() : ne.exports = Xe()), ne.exports;
}
var s = Ze(), Ge = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
}, ke = P.createContext && /* @__PURE__ */ P.createContext(Ge), Qe = ["attr", "size", "title"];
function et(e, r) {
  if (e == null) return {};
  var l = tt(e, r), n, a;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (a = 0; a < u.length; a++)
      n = u[a], !(r.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (l[n] = e[n]);
  }
  return l;
}
function tt(e, r) {
  if (e == null) return {};
  var l = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (r.indexOf(n) >= 0) continue;
      l[n] = e[n];
    }
  return l;
}
function re() {
  return re = Object.assign ? Object.assign.bind() : function(e) {
    for (var r = 1; r < arguments.length; r++) {
      var l = arguments[r];
      for (var n in l)
        Object.prototype.hasOwnProperty.call(l, n) && (e[n] = l[n]);
    }
    return e;
  }, re.apply(this, arguments);
}
function Ne(e, r) {
  var l = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    r && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), l.push.apply(l, n);
  }
  return l;
}
function le(e) {
  for (var r = 1; r < arguments.length; r++) {
    var l = arguments[r] != null ? arguments[r] : {};
    r % 2 ? Ne(Object(l), !0).forEach(function(n) {
      nt(e, n, l[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(l)) : Ne(Object(l)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(l, n));
    });
  }
  return e;
}
function nt(e, r, l) {
  return r = rt(r), r in e ? Object.defineProperty(e, r, { value: l, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = l, e;
}
function rt(e) {
  var r = lt(e, "string");
  return typeof r == "symbol" ? r : r + "";
}
function lt(e, r) {
  if (typeof e != "object" || !e) return e;
  var l = e[Symbol.toPrimitive];
  if (l !== void 0) {
    var n = l.call(e, r);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (r === "string" ? String : Number)(e);
}
function ze(e) {
  return e && e.map((r, l) => /* @__PURE__ */ P.createElement(r.tag, le({
    key: l
  }, r.attr), ze(r.child)));
}
function L(e) {
  return (r) => /* @__PURE__ */ P.createElement(at, re({
    attr: le({}, e.attr)
  }, r), ze(e.child));
}
function at(e) {
  var r = (l) => {
    var {
      attr: n,
      size: a,
      title: u
    } = e, d = et(e, Qe), o = a || l.size || "1em", h;
    return l.className && (h = l.className), e.className && (h = (h ? h + " " : "") + e.className), /* @__PURE__ */ P.createElement("svg", re({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, l.attr, n, d, {
      className: h,
      style: le(le({
        color: e.color || l.color
      }, l.style), e.style),
      height: o,
      width: o,
      xmlns: "http://www.w3.org/2000/svg"
    }), u && /* @__PURE__ */ P.createElement("title", null, u), e.children);
  };
  return ke !== void 0 ? /* @__PURE__ */ P.createElement(ke.Consumer, null, (l) => r(l)) : r(Ge);
}
function Pe(e) {
  return L({ attr: { viewBox: "0 0 512 512" }, child: [{ tag: "path", attr: { d: "M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" }, child: [] }] })(e);
}
function st(e) {
  return L({ attr: { viewBox: "0 0 448 512" }, child: [{ tag: "path", attr: { d: "M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" }, child: [] }] })(e);
}
function ot(e) {
  return L({ attr: { viewBox: "0 0 320 512" }, child: [{ tag: "path", attr: { d: "M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z" }, child: [] }] })(e);
}
function Me(e) {
  return L({ attr: { viewBox: "0 0 320 512" }, child: [{ tag: "path", attr: { d: "M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" }, child: [] }] })(e);
}
function Ie(e) {
  return L({ attr: { viewBox: "0 0 512 512" }, child: [{ tag: "path", attr: { d: "M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z" }, child: [] }] })(e);
}
function $e(e) {
  return L({ attr: { viewBox: "0 0 512 512" }, child: [{ tag: "path", attr: { d: "M12.41 148.02l232.94 105.67c6.8 3.09 14.49 3.09 21.29 0l232.94-105.67c16.55-7.51 16.55-32.52 0-40.03L266.65 2.31a25.607 25.607 0 0 0-21.29 0L12.41 107.98c-16.55 7.51-16.55 32.53 0 40.04zm487.18 88.28l-58.09-26.33-161.64 73.27c-7.56 3.43-15.59 5.17-23.86 5.17s-16.29-1.74-23.86-5.17L70.51 209.97l-58.1 26.33c-16.55 7.5-16.55 32.5 0 40l232.94 105.59c6.8 3.08 14.49 3.08 21.29 0L499.59 276.3c16.55-7.5 16.55-32.5 0-40zm0 127.8l-57.87-26.23-161.86 73.37c-7.56 3.43-15.59 5.17-23.86 5.17s-16.29-1.74-23.86-5.17L70.29 337.87 12.41 364.1c-16.55 7.5-16.55 32.5 0 40l232.94 105.59c6.8 3.08 14.49 3.08 21.29 0L499.59 404.1c16.55-7.5 16.55-32.5 0-40z" }, child: [] }] })(e);
}
function Fe(e) {
  return L({ attr: { viewBox: "0 0 512 512" }, child: [{ tag: "path", attr: { d: "M304 416h-64a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm-128-64h-48V48a16 16 0 0 0-16-16H80a16 16 0 0 0-16 16v304H16c-14.19 0-21.37 17.24-11.29 27.31l80 96a16 16 0 0 0 22.62 0l80-96C197.35 369.26 190.22 352 176 352zm256-192H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h192a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm-64 128H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zM496 32H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h256a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z" }, child: [] }] })(e);
}
function Ke(e) {
  return L({ attr: { viewBox: "0 0 512 512" }, child: [{ tag: "path", attr: { d: "M304 416h-64a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zM16 160h48v304a16 16 0 0 0 16 16h32a16 16 0 0 0 16-16V160h48c14.21 0 21.38-17.24 11.31-27.31l-80-96a16 16 0 0 0-22.62 0l-80 96C-5.35 142.74 1.77 160 16 160zm416 0H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h192a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm-64 128H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zM496 32H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h256a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z" }, child: [] }] })(e);
}
function ue(e) {
  return L({ attr: { viewBox: "0 0 352 512" }, child: [{ tag: "path", attr: { d: "M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" }, child: [] }] })(e);
}
function Ye(e) {
  return L({ attr: { viewBox: "0 0 512 512" }, child: [{ tag: "path", attr: { d: "M212.333 224.333H12c-6.627 0-12-5.373-12-12V12C0 5.373 5.373 0 12 0h48c6.627 0 12 5.373 12 12v78.112C117.773 39.279 184.26 7.47 258.175 8.007c136.906.994 246.448 111.623 246.157 248.532C504.041 393.258 393.12 504 256.333 504c-64.089 0-122.496-24.313-166.51-64.215-5.099-4.622-5.334-12.554-.467-17.42l33.967-33.967c4.474-4.474 11.662-4.717 16.401-.525C170.76 415.336 211.58 432 256.333 432c97.268 0 176-78.716 176-176 0-97.267-78.716-176-176-176-58.496 0-110.28 28.476-142.274 72.333h98.274c6.627 0 12 5.373 12 12v48c0 6.627-5.373 12-12 12z" }, child: [] }] })(e);
}
const it = ({ menuPosition: e, options: r, onClose: l, reducer: n }) => {
  var a, u, d, o, h, x, y;
  const O = Le(null);
  if (de(() => {
    const C = (p) => {
      O.current && !O.current.contains(p.target) && l();
    };
    return document.addEventListener("mousedown", C), () => document.removeEventListener("mousedown", C);
  }, [l]), !e || !r)
    return null;
  const E = [
    r.sortable && e.column.sortable && {
      label: ((a = r.contextMenuLabels) === null || a === void 0 ? void 0 : a.sortAsc) || "오름차순 정렬",
      icon: s.jsx(Ke, { style: { color: "#2563EB", fontSize: "14px" } }),
      // ✅ text-blue-600
      onClick: () => n == null ? void 0 : n.setSort(e.column.key, "asc")
    },
    r.sortable && e.column.sortable && {
      label: ((u = r.contextMenuLabels) === null || u === void 0 ? void 0 : u.sortDesc) || "내림차순 정렬",
      icon: s.jsx(Fe, { style: { color: "#2563EB", fontSize: "14px" } }),
      // ✅ text-blue-600
      onClick: () => n == null ? void 0 : n.setSort(e.column.key, "desc")
    },
    r.sortable && e.column.sortable && {
      label: ((d = r.contextMenuLabels) === null || d === void 0 ? void 0 : d.clearSort) || "정렬 해제",
      icon: s.jsx(ue, { style: { color: "#DC2626", fontSize: "14px" } }),
      // ✅ text-red-600
      onClick: () => n == null ? void 0 : n.setSort(e.column.key, null)
    },
    r.sortable && e.column.sortable && (r.grouping || r.filterable) && { divider: !0 },
    r.grouping && {
      label: ((o = r.contextMenuLabels) === null || o === void 0 ? void 0 : o.group) || "그룹화",
      icon: s.jsx($e, { style: { color: "#16A34A", fontSize: "14px" } }),
      // ✅ text-green-600
      onClick: () => n == null ? void 0 : n.setGroup(e.column.key)
    },
    r.grouping && {
      label: ((h = r.contextMenuLabels) === null || h === void 0 ? void 0 : h.ungroup) || "그룹 해제",
      icon: s.jsx(ue, { style: { color: "#DC2626", fontSize: "14px" } }),
      // ✅ text-red-600
      onClick: () => n == null ? void 0 : n.removeGroup(e.column.key)
    },
    (r.grouping || r.sortable) && r.filterable && e.column.filterable && { divider: !0 },
    r.filterable && e.column.filterable && {
      label: ((x = r.contextMenuLabels) === null || x === void 0 ? void 0 : x.filter) || "필터",
      icon: s.jsx(Ie, { style: { color: "#D97706", fontSize: "14px" } }),
      // ✅ text-amber-500
      onClick: () => n == null ? void 0 : n.setFilter({ [e.column.key]: "" })
    },
    r.filterable && e.column.filterable && {
      label: ((y = r.contextMenuLabels) === null || y === void 0 ? void 0 : y.clearFilter) || "필터 해제",
      icon: s.jsx(ue, { style: { color: "#DC2626", fontSize: "14px" } }),
      // ✅ text-red-600
      onClick: () => n == null ? void 0 : n.clearFilter(e.column.key)
    }
  ].filter(Boolean);
  return s.jsx("div", { ref: O, className: "nh-context-menu", style: {
    top: `${e.y}px`,
    left: `${e.x}px`
  }, children: s.jsx("ul", { className: "nh-context-menu-list", children: E.map((C, p) => C.divider ? s.jsx("hr", { className: "nh-context-divider" }, `divider-${p}`) : s.jsxs("li", { className: `nh-context-item ${C.disabled ? "nh-context-disabled" : ""}`, onClick: () => {
    !C.disabled && C.onClick && C.onClick(), l();
  }, children: [C.icon && s.jsx("span", { className: "nh-context-icon", children: C.icon }), s.jsx("span", { children: C.label })] }, p)) }) });
}, ct = ({ columns: e, showRowNumCol: r, showRowCheckboxCol: l, options: n, reducer: a, editedRows: u, style: d }) => {
  const [o, h] = De(null), { filters: x, sortedColumn: y, sortDirection: O, group: E } = a.state, C = (g, m) => {
    g.preventDefault(), n && h({ x: g.clientX, y: g.clientY, column: m });
  }, p = () => h(null);
  return console.log(u), s.jsxs("thead", { className: "nh-grid-header", children: [s.jsxs("tr", { className: "nh-grid-header-row", children: [u && Object.keys(u).length > 0 && s.jsx("th", { className: "nh-grid-header-cell nh-action-header", style: Object.assign({}, d), children: s.jsxs("div", { style: { display: "flex", gap: "1px", justifyContent: "center" }, children: [s.jsx("button", { className: "nh-btn nh-btn-apply", onClick: a.applyAllChanges, children: s.jsx(Pe, {}) }), s.jsx("button", { className: "nh-btn nh-btn-reset", onClick: a.resetAllChanges, children: s.jsx(Ye, {}) })] }) }), l && s.jsx("th", { className: "nh-grid-header-cell", style: Object.assign({}, d), children: "✔" }), r && s.jsx("th", { className: "nh-grid-header-cell", style: Object.assign({}, d), children: "No." }), e.map((g) => {
    var m;
    return s.jsx("th", { className: `nh-grid-header-cell ${g.sticky === "left" ? "sticky-left" : ""} ${g.sticky === "right" ? "sticky-right" : ""}`, style: Object.assign({ width: g.width ? `${g.width}px` : "auto", textAlign: g.align || "left" }, d), title: g.tooltip, onContextMenu: (T) => C(T, g), children: s.jsxs("div", { className: "nh-grid-header-content", children: [s.jsx("span", { children: g.label }), g.sortable && y === g.key && O !== null && (O === "asc" ? s.jsx(Ke, { style: { color: "#2563EB", fontSize: "14px" } }) : s.jsx(Fe, { style: { color: "#2563EB", fontSize: "14px" } })), ((m = E.column) === null || m === void 0 ? void 0 : m.includes(g.key)) && s.jsx($e, { style: { color: "#16A34A", fontSize: "14px" } }), (n == null ? void 0 : n.filterable) && x[g.key] !== void 0 && s.jsx(Ie, { style: { color: "#D97706", fontSize: "14px" } })] }) }, g.key);
  })] }), e.some((g) => (n == null ? void 0 : n.filterable) && x[g.key] !== void 0) ? s.jsxs("tr", { className: "nh-grid-filter-row", children: [r ? s.jsx("td", { style: { padding: "8px" }, children: " " }) : null, l ? s.jsx("td", { style: { padding: "8px" }, children: " " }) : null, e.map((g) => s.jsx("td", { style: { padding: "8px" }, children: g.filterable && x[g.key] !== void 0 && s.jsx("input", { type: "text", value: x[g.key] || "", onChange: (m) => a.setFilter(Object.assign(Object.assign({}, x), { [g.key]: m.target.value })), className: "nh-grid-filter-input", placeholder: "필터 입력..." }) }, g.key))] }) : null, n && s.jsx(it, { menuPosition: o, options: n, onClose: p, reducer: a })] });
}, Ae = (e) => e.__group === !0, He = (e, r, l) => l ? [...e].sort((n, a) => {
  const u = n[r], d = a[r];
  if (u == null || d == null)
    return 0;
  if (typeof u == "number" && typeof d == "number")
    return l === "asc" ? u - d : d - u;
  const o = String(u).toLowerCase(), h = String(d).toLowerCase();
  return l === "asc" ? o.localeCompare(h) : h.localeCompare(o);
}) : [...e], ut = (e, r, l) => [...e].sort((n, a) => {
  var u, d;
  let o = 0;
  for (let h = 0; h < r.length; h++) {
    const x = r[h], y = l, O = (u = n[x]) !== null && u !== void 0 ? u : "", E = (d = a[x]) !== null && d !== void 0 ? d : "";
    if (typeof O == "number" && typeof E == "number" ? o = O - E : o = String(O).localeCompare(String(E)), y === "desc" && (o = -o), o !== 0)
      return o;
  }
  return o;
}), ae = (e, r, l = /* @__PURE__ */ new Set(), n = 0) => {
  if (r.length === n)
    return e;
  const a = r[n], u = [], d = /* @__PURE__ */ new Map();
  return e.forEach((o) => {
    const h = String(o[a]);
    d.has(h) || d.set(h, {
      __group: !0,
      __groupKey: h,
      __children: [],
      __groupLevel: n
    }), d.get(h).__children.push(o);
  }), d.forEach((o) => {
    o.__children = ae(o.__children, r, l, n + 1), u.push(o), l.has(o.__groupKey) && !u.includes(o) && u.push(...o.__children);
  }), u;
}, dt = (e, r) => e.filter((l) => Object.entries(r).every(([n, a]) => a ? String(l[n]).toLowerCase().includes(a.toLowerCase()) : !0)), ge = (e, r, l, n) => {
  const a = (r - 1) * l, u = a + l;
  let d = [...e];
  return (n == null ? void 0 : n.group) !== void 0 && (d = ut(d, n == null ? void 0 : n.group.column, (n == null ? void 0 : n.sortDirection) === void 0 ? "asc" : n == null ? void 0 : n.sortDirection)), d.slice(a, u);
}, z = (e) => {
  let r = [...e.originalData];
  return Object.keys(e.filters).length > 0 && (r = dt(r, e.filters)), e.sortedColumn && e.sortDirection && (r = He(r, e.sortedColumn, e.sortDirection)), r = ge(r, e.pagenate.currentPage, e.pagenate.pageSize, e), e.group.column.length > 0 && (r = ae(r, e.group.column, e.group.expanded)), Object.assign(Object.assign({}, e), { data: r });
}, gt = (e) => e.map((r, l) => {
  var n;
  return Object.assign(Object.assign({}, r), { rowKey: (n = r.id) !== null && n !== void 0 ? n : `row-${Date.now()}-${Math.random()}-${l}` });
}), ft = ({ columns: e, showRowNumCol: r = !1, showRowCheckboxCol: l = !1, selectedRows: n, isCellEditable: a = !1, onToggleRow: u, onToggleGroupExpand: d, reducer: o, style: h }) => {
  const x = (p, g, m) => {
    o.setEditingCell(p, g, m);
  }, y = (p) => {
    if (!o.state.editingCell)
      return;
    const { rowKey: g, colKey: m } = o.state.editingCell;
    o.setEditingCell(g, m, p);
    const T = o.state.originalData.find((_) => _.rowKey === g);
    (T ? T[m] : void 0) !== p ? o.editCell(g, m, p) : o.removeEditedCell(g, m);
  }, O = (p, g) => {
    if (!o.state.editingCell)
      return;
    const { rowKey: m, colKey: T } = o.state.editingCell, S = e.findIndex((_) => _.key === T);
    if (p.key === "Enter" && o.clearEditingCell(), p.key === "Tab") {
      p.preventDefault();
      for (let _ = S + 1; _ < e.length; _++)
        if (e[_].editable !== !1) {
          o.clearEditingCell(), o.setEditingCell(m, e[_].key, g[e[_].key]);
          return;
        }
      o.clearEditingCell();
    }
  }, E = (p, g) => {
    const m = p.__groupKey, T = o.state.group.expanded.has(m);
    let S = 0;
    return s.jsxs(P.Fragment, { children: [s.jsx("tr", { style: {
      backgroundColor: "var(--color-second-hover)",
      cursor: "pointer",
      borderBottom: "2px solid var(--color-second)"
    }, onClick: () => d(m), children: s.jsx("td", { className: "nh-table-cell", colSpan: e.length + (r ? 1 : 0) + (l ? 1 : 0), children: s.jsx("div", { style: {
      display: "grid",
      gridTemplateColumns: `${r ? "50px" : ""}${l ? "50px" : ""}min-content ${e.slice(1).map((_) => _.width ? `${_.width}px` : "auto").join("")}`,
      whiteSpace: "nowrap",
      fontWeight: "bold",
      alignItems: "center"
    }, children: s.jsxs("div", { style: { display: "flex", alignItems: "center", paddingLeft: `${g * 16}px` }, children: [s.jsx("span", { style: { marginRight: "4px" }, children: T ? s.jsx(st, {}) : s.jsx(Me, {}) }), s.jsxs("span", { children: [m, " (", p.__children.length, ")"] })] }) }) }) }), T && p.__children.map(
      (_) => Ae(_) ? E(_, g + 1) : C(_, g + 1, ++S)
      // ✅ 그룹 내부 Row Num 증가
    )] }, `group-${m}`);
  }, C = (p, g, m) => {
    var T;
    const S = (T = p.id) !== null && T !== void 0 ? T : JSON.stringify(p), _ = (R) => {
      var f, j;
      return ((f = o.state.editingCell) === null || f === void 0 ? void 0 : f.rowKey) === S && ((j = o.state.editingCell) === null || j === void 0 ? void 0 : j.colKey) === R;
    }, W = o.state.editedRows[S] !== void 0, ee = a && Object.keys(o.state.editedRows).length > 0;
    return s.jsxs("tr", { style: { borderBottom: "1px solid var(--color-second-hover)" }, children: [ee && s.jsx("td", { className: "nh-table-cell nh-action-cell", children: W && s.jsxs(s.Fragment, { children: [s.jsx("button", { className: "nh-btn nh-btn-apply", onClick: () => o.applyRowChanges(S), children: s.jsx(Pe, {}) }), s.jsx("button", { className: "nh-btn nh-btn-reset", onClick: () => o.resetRowChanges(S), children: s.jsx(Ye, {}) })] }) }), l ? s.jsx("td", { className: "nh-table-cell text-center", children: s.jsx("input", { type: "checkbox", checked: n.has(p), onChange: () => u(p) }) }) : null, r ? s.jsx("td", { className: "nh-table-cell text-center", children: m }) : null, e.map((R) => {
      var f, j, A, B, I, $, F;
      `${S}${R.key}`;
      const U = _(R.key) ? (f = o.state.editingCell) === null || f === void 0 ? void 0 : f.value : (A = (j = o.state.editedRows[S]) === null || j === void 0 ? void 0 : j[R.key]) !== null && A !== void 0 ? A : R.renderCell ? R.renderCell(p) : p[R.key];
      return s.jsx("td", { className: "nh-table-cell", style: {
        paddingLeft: `${g * 16}px`,
        fontWeight: ((B = o.state.editedRows[S]) === null || B === void 0 ? void 0 : B[R.key]) !== void 0 ? "bold" : "normal",
        color: ((I = o.state.editedRows[S]) === null || I === void 0 ? void 0 : I[R.key]) !== void 0 ? "red" : "inherit"
      }, onDoubleClick: () => a && x(S, R.key, U), children: _(R.key) ? s.jsx("input", { type: "text", value: (F = ($ = o.state.editingCell) === null || $ === void 0 ? void 0 : $.value) !== null && F !== void 0 ? F : "", onChange: (K) => y(K.target.value), onKeyDown: (K) => O(K, p), className: "nh-edit-input" }) : U }, R.key);
    })] }, S);
  };
  return s.jsx(s.Fragment, { children: s.jsx("tbody", { style: h, children: o.state.data.map((p, g) => Ae(p) ? E(p, 0) : C(p, 0, g + 1)) }) });
}, bt = (e, r, l) => ({
  originalData: [...e],
  data: r ? ge(e, 1, l) : e,
  // ✅ 페이징 시 빈 Set 사용
  sortedColumn: null,
  sortDirection: null,
  filters: {},
  group: {
    column: [],
    expanded: /* @__PURE__ */ new Set()
    // ✅ 초기 확장 상태 저장
  },
  selectedRows: /* @__PURE__ */ new Set(),
  pagenate: {
    pageSize: l,
    currentPage: 1
  },
  editedRows: {},
  editingCell: null
});
function pt(e, r) {
  switch (r.type) {
    /** 🔹 컬럼 정렬 변경 */
    case "SET_SORT":
      return Object.assign(Object.assign({}, e), { sortedColumn: r.column, sortDirection: r.direction, data: r.direction === null ? [...e.originalData] : He(e.originalData, r.column, r.direction) });
    /** 🔹 특정 컬럼에 필터 적용 */
    case "SET_FILTER": {
      const l = Object.assign(
        Object.assign({}, e.filters),
        r.filters
        // 새로운 필터 추가 or 업데이트
      );
      return Object.assign(Object.assign({}, e), { filters: l });
    }
    /** 🔹 특정 컬럼의 필터 제거 */
    case "CLEAR_FILTER":
      return Object.assign(Object.assign({}, e), { filters: Object.fromEntries(Object.entries(e.filters).filter(([l]) => l !== r.column)) });
    /** 🔹 컬럼을 그룹핑 */
    case "SET_GROUP": {
      const l = [...e.group.column, r.column];
      return Object.assign(Object.assign({}, e), { group: Object.assign(Object.assign({}, e.group), { column: l, expanded: new Set(e.group.expanded) }), data: ae(e.originalData, l) });
    }
    /** 🔹 컬럼 그룹핑 해제 */
    case "REMOVE_GROUP": {
      const l = e.group.column.filter((a) => a !== r.column), n = new Set(e.group.expanded);
      return n.delete(r.column), Object.assign(Object.assign({}, e), { group: {
        column: l,
        // ✅ 그룹 컬럼에서 제거
        expanded: n
        // ✅ 확장 목록에서도 제거
      }, data: l.length > 0 ? ae(e.originalData, l, n) : [...e.originalData] });
    }
    /** 🔹 특정 Row 선택/해제 */
    case "TOGGLE_ROW": {
      const { row: l } = r, n = new Set(e.selectedRows);
      return n.has(l) ? n.delete(l) : n.add(l), Object.assign(Object.assign({}, e), { selectedRows: n });
    }
    /** 🔹 특정 Group Expand선택/해제 */
    case "TOGGLE_GROUP_EXPAND": {
      const l = new Set(e.group.expanded);
      return l.has(r.column) ? l.delete(r.column) : l.add(r.column), Object.assign(Object.assign({}, e), { group: Object.assign(Object.assign({}, e.group), { expanded: l }) });
    }
    /** 🔹 페이지 변경 */
    case "SET_PAGE":
      return Object.assign(Object.assign({}, e), { pagenate: Object.assign(Object.assign({}, e.pagenate), { currentPage: r.page }) });
    /** 🔹 페이지 변경 */
    case "SET_PAGE_SIZE":
      return Object.assign(Object.assign({}, e), { pagenate: Object.assign(Object.assign({}, e.pagenate), { pageSize: r.pageSize }) });
    case "SET_EDITING_CELL":
      return Object.assign(Object.assign({}, e), { editingCell: {
        rowKey: r.payload.rowKey,
        colKey: r.payload.colKey,
        value: r.payload.value
      } });
    case "CLEAR_EDITING_CELL":
      return Object.assign(Object.assign({}, e), { editingCell: null });
    case "EDIT_CELL": {
      const { rowKey: l, colKey: n, newValue: a } = r.payload;
      return Object.assign(Object.assign({}, e), { editedRows: Object.assign(Object.assign({}, e.editedRows), { [l]: Object.assign(Object.assign({}, e.editedRows[l]), { [n]: a }) }) });
    }
    case "REMOVE_EDITED_CELL": {
      const { rowKey: l, colKey: n } = r.payload, a = Object.assign({}, e.editedRows[l]);
      if (delete a[n], Object.keys(a).length === 0) {
        const u = Object.assign({}, e.editedRows);
        return delete u[l], Object.assign(Object.assign({}, e), { editedRows: u });
      }
      return Object.assign(Object.assign({}, e), { editedRows: Object.assign(Object.assign({}, e.editedRows), { [l]: a }) });
    }
    case "APPLY_ROW_CHANGES": {
      const { rowKey: l } = r.payload, n = e.editedRows[l];
      if (!n)
        return e;
      const a = e.data.map((o) => o.rowKey === l ? Object.assign(Object.assign({}, o), n) : o), u = e.originalData.map((o) => o.rowKey === l ? Object.assign(Object.assign({}, o), n) : o), d = Object.assign({}, e.editedRows);
      return delete d[l], Object.assign(Object.assign({}, e), { data: a, originalData: u, editedRows: d, editingCell: null });
    }
    case "RESET_ROW_CHANGES": {
      const { rowKey: l } = r.payload, n = e.originalData.find((d) => d.rowKey === l);
      if (!n)
        return e;
      const a = e.data.map((d) => d.rowKey === l ? n : d), u = Object.assign({}, e.editedRows);
      return delete u[l], Object.assign(Object.assign({}, e), { data: a, editedRows: u, editingCell: null });
    }
    case "APPLY_ALL_CHANGES": {
      const l = e.originalData.map((n) => e.editedRows[n.rowKey] ? Object.assign(Object.assign({}, n), e.editedRows[n.rowKey]) : n);
      return Object.assign(Object.assign({}, e), { originalData: l, data: ge(l, e.pagenate.currentPage, e.pagenate.pageSize, e), editedRows: {}, editingCell: null });
    }
    case "RESET_ALL_CHANGES":
      return Object.assign(Object.assign({}, e), { editedRows: {}, editingCell: null });
    /** 🔹 Grid 상태 변경 */
    case "SET_GRID_STATE":
      return Object.assign(Object.assign({}, e), r.state);
    // ✅ 새로운 상태 적용
    default:
      return e;
  }
}
function ht(e, r = !1, l = 10) {
  const [n, a] = Je(pt, bt(e, r, l));
  return {
    state: n,
    updateGridState: () => {
      a({
        type: "SET_GRID_STATE",
        state: z(n)
      });
    },
    setSort: (f, j) => {
      a({
        type: "SET_GRID_STATE",
        state: z(Object.assign(Object.assign({}, n), { sortedColumn: f, sortDirection: j }))
      });
    },
    setFilter: (f) => {
      const j = Object.assign(Object.assign({}, n.filters), f);
      a({
        type: "SET_GRID_STATE",
        state: z(Object.assign(Object.assign({}, n), { filters: j }))
      });
    },
    clearFilter: (f) => {
      const j = Object.assign({}, n.filters);
      delete j[f], a({
        type: "SET_GRID_STATE",
        state: z(Object.assign(Object.assign({}, n), { filters: j }))
      });
    },
    setGroup: (f) => {
      a({
        type: "SET_GRID_STATE",
        state: z(Object.assign(Object.assign({}, n), { group: Object.assign(Object.assign({}, n.group), { column: [...n.group.column, f] }) }))
      });
    },
    removeGroup: (f) => {
      a({
        type: "SET_GRID_STATE",
        state: z(Object.assign(Object.assign({}, n), { group: Object.assign(Object.assign({}, n.group), { column: n.group.column.filter((j) => j !== f) }) }))
      });
    },
    expandGroup: (f) => {
      const j = new Set(n.group.expanded);
      j.has(f) ? j.delete(f) : j.add(f), a({
        type: "SET_GRID_STATE",
        state: z(Object.assign(Object.assign({}, n), { group: Object.assign(Object.assign({}, n.group), { expanded: j }) }))
      });
    },
    toggleRow: (f) => {
      a({ type: "TOGGLE_ROW", row: f });
    },
    setPage: (f) => {
      a({
        type: "SET_GRID_STATE",
        state: z(Object.assign(Object.assign({}, n), { pagenate: Object.assign(Object.assign({}, n.pagenate), { currentPage: f }) }))
      });
    },
    setPageSize: (f) => {
      a({
        type: "SET_GRID_STATE",
        state: z(Object.assign(Object.assign({}, n), { pagenate: Object.assign(Object.assign({}, n.pagenate), { pageSize: f }) }))
      });
    },
    editCell: (f, j, A) => {
      a({ type: "EDIT_CELL", payload: { rowKey: f, colKey: j, newValue: A } });
    },
    setEditingCell: (f, j, A) => {
      a({ type: "SET_EDITING_CELL", payload: { rowKey: f, colKey: j, value: A } });
    },
    clearEditingCell: () => {
      a({ type: "CLEAR_EDITING_CELL" });
    },
    applyAllChanges: () => {
      a({ type: "APPLY_ALL_CHANGES" });
    },
    resetAllChanges: () => {
      a({ type: "RESET_ALL_CHANGES" });
    },
    removeEditedCell: (f, j) => {
      a({ type: "REMOVE_EDITED_CELL", payload: { rowKey: f, colKey: j } });
    },
    applyRowChanges: (f) => {
      a({ type: "APPLY_ROW_CHANGES", payload: { rowKey: f } });
    },
    resetRowChanges: (f) => {
      a({ type: "RESET_ROW_CHANGES", payload: { rowKey: f } });
    }
  };
}
const vt = ({ currentPage: e, totalPages: r, totalDataCount: l, pageSize: n, onPageChange: a, onPageSizeChange: u }) => {
  const d = [10, 20, 30, 50, 100], [o, h] = De(!1), x = Le(null);
  return de(() => {
    const y = (O) => {
      x.current && !x.current.contains(O.target) && h(!1);
    };
    return o && window.addEventListener("click", y), () => {
      window.removeEventListener("click", y);
    };
  }, [o]), s.jsxs("div", { style: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px 16px",
    borderTop: "1px solid var(--color-font)",
    backgroundColor: "var(--color-second)"
  }, children: [s.jsxs("span", { style: { fontSize: "14px", color: "var(--color-font)" }, children: ["Total ", s.jsx("b", { children: l }), " page | Page ", e, " / ", r] }), s.jsxs("div", { className: "nh-dropdown-container", children: [s.jsx("span", { className: "nh-dropdown-label", children: "Page Size:" }), s.jsxs("div", { className: "nh-dropdown-wrapper", ref: x, children: [s.jsx("button", { onClick: (y) => {
    y.stopPropagation(), h(!o);
  }, className: "nh-dropdown-button", children: n }), o && s.jsx("div", { className: "nh-dropdown-menu", children: d.map((y, O) => s.jsx("div", { onClick: () => {
    u(y), h(!1);
  }, className: "nh-dropdown-item", children: y }, O)) })] })] }), s.jsxs("div", { style: { display: "flex", gap: "4px" }, children: [s.jsx("button", { className: "nh-button", onClick: () => e > 1 && a(e - 1), disabled: e === 1, children: s.jsx(ot, { size: 14 }) }), Array.from({ length: r }, (y, O) => O + 1).map((y) => s.jsx("button", { className: `nh-button ${y === e ? "nh-button-active" : ""}`, onClick: () => a(y), children: y }, y)), s.jsx("button", { className: "nh-button", onClick: () => e < r && a(e + 1), disabled: e === r, children: s.jsx(Me, { size: 14 }) })] })] });
}, yt = ({ columns: e, data: r, options: l, showRowNumCol: n = !0, showRowCheckboxCol: a = !1, pagingable: u = !1, pagination: d, isCellEditable: o = !1, style: h, headerStyle: x, bodyStyle: y, onSelectionChange: O }) => {
  const E = ht(gt(r), u, d == null ? void 0 : d.pageSize), { pagenate: C } = E.state, p = r.length, g = Math.ceil(p / C.pageSize);
  return console.log("Grid.tsx - editedRows:", E.state.editedRows), de(() => {
    a && O && O(E.state.selectedRows);
  }, [a, E.state.selectedRows, O]), s.jsxs("div", { className: "nh-grid-container", style: h, children: [s.jsxs("table", { className: "nh-grid-table", children: [s.jsx(ct, { columns: e, showRowNumCol: n, showRowCheckboxCol: a, options: l, reducer: E, editedRows: E.state.editedRows, style: x }), s.jsx(ft, { reducer: E, columns: e, isCellEditable: o, showRowNumCol: n, showRowCheckboxCol: a, selectedRows: E.state.selectedRows, onToggleRow: E.toggleRow, onToggleGroupExpand: E.expandGroup, style: y })] }), u && s.jsx(vt, { currentPage: C.currentPage, totalPages: g, onPageChange: E.setPage, totalDataCount: r.length, pageSize: E.state.pagenate.pageSize, onPageSizeChange: E.setPageSize })] });
};
export {
  yt as Grid
};
