(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{II4a:function(e,t,a){"use strict";a.d(t,"a",(function(){return c}));var n=a("q1tI"),r=a.n(n),l=a("pD7v");function c(e){var t=e.posts;return r.a.createElement(r.a.Fragment,null,r.a.createElement("section",null,r.a.createElement(l.a,{data:t,tags:!0})))}},L6NH:function(e,t,a){"use strict";function n(e,t){return void 0===t&&(t={}),e.map((function(e){return Object.assign({id:e.node.id,date:e.node.frontmatter.date,slug:e.node.fields.slug,tags:e.node.frontmatter.tags,title:e.node.frontmatter.title},t.thumbnails&&{thumbnail:e.node.frontmatter.thumbnail.childImageSharp.fixed})}))}function r(e){return e&&e.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g).map((function(e){return e.toLowerCase()})).join("-")}a.d(t,"a",(function(){return n})),a.d(t,"b",(function(){return r}))},pD7v:function(e,t,a){"use strict";a.d(t,"a",(function(){return u}));var n=a("q1tI"),r=a.n(n),l=a("Wbzz"),c=a("L6NH");function u(e){var t=e.data,a=e.tags;return r.a.createElement("div",{className:a?"posts with-tags":"grid posts"},t.map((function(e){return r.a.createElement(l.Link,{to:e.slug,className:"row",key:e.id},r.a.createElement("div",{className:"cell"},r.a.createElement("time",null,e.date)),r.a.createElement("div",{className:"cell"},e.title),a&&r.a.createElement("div",{className:"cell tags"},e.tags&&e.tags.map((function(e){return r.a.createElement(l.Link,{key:e,to:"/tags/"+Object(c.b)(e),className:"tag-"+e},e)}))))})))}},vx99:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return m}));var n=a("q1tI"),r=a.n(n),l=a("qhky"),c=a("7oih"),u=a("II4a"),i=a("EYWl"),s=a("L6NH"),o=a("Aeqt");function m(e){var t=e.data.allMarkdownRemark.edges,a=Object(n.useMemo)((function(){return Object(s.a)(t)}),[t]);return r.a.createElement(c.a,null,r.a.createElement(l.a,null,r.a.createElement("html",{lang:"de"}),r.a.createElement("title",null,"Blog | ",o.a.siteTitle)),r.a.createElement(i.a,null),r.a.createElement("section",null,r.a.createElement("h1",null,"Blog"),r.a.createElement("p",{className:"subtitle"},"Artikel, Tutorials, Schnipsel, Überlegungen und alles andere."),r.a.createElement(u.a,{posts:a})))}}}]);
//# sourceMappingURL=component---src-pages-blog-js-a6149436b1330e16c422.js.map