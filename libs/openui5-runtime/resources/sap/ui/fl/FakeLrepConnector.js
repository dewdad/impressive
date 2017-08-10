/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/thirdparty/URI","sap/ui/fl/Utils","sap/ui/fl/LrepConnector","sap/ui/fl/Cache","sap/ui/fl/ChangePersistenceFactory"],function(q,u,F,L,C,a){"use strict";var l=Object.create(L.prototype);b._oBackendInstances={};function b(i){this.sInitialComponentJsonPath=i;}for(var p in l){if(typeof l[p]==='function'){b.prototype[p]=(function(p){return function(){throw new Error('Method '+p+'() is not implemented in FakeLrepConnector.');};}(p));}}b.prototype.loadChanges=function(s){var i=this.sInitialComponentJsonPath;return new Promise(function(r,d){q.getJSON(i).done(function(R){var e={changes:R,componentClassName:s};r(e);}).fail(function(e){d(e);});});};b.prototype.create=function(d,e,i){if(!i){return Promise.resolve();}if(!d.creation){d.creation=new Date().toISOString();}return Promise.resolve({response:d,status:'success'});};b.prototype.update=function(d,e,f,i){if(!i){return Promise.resolve();}return Promise.resolve({response:d,status:'success'});};b.prototype.deleteChange=function(d,i){if(!i){return Promise.resolve();}return Promise.resolve({response:undefined,status:'nocontent'});};b.prototype.send=function(U,m,d,o){return new Promise(function(r,e){c(U,m,d,o,r,e);h(U,m,d,o,r,e);});};function h(U,m,d,o,r){if(U.match(/^\/sap\/bc\/lrep\/actions\/make_changes_transportable\//)&&m==='POST'){r();}}function c(U,m,d,o,r,e){if(U.match(/^\/sap\/bc\/lrep\/actions\/gettransports\//)){r({response:{"transports":[{"transportId":"U31K008488","description":"The Ultimate Transport","owner":"Fantasy Owner","locked":false}],"localonly":false,"errorCode":""}});}}b.enableFakeConnector=function(i,A,s){if(A&&s){var o=a.getChangePersistenceForComponent(A,s);if(!(o._oConnector instanceof b)){C.clearEntry(A,s);if(!b._oBackendInstances[A]){b._oBackendInstances[A]={};}b._oBackendInstances[A][s]=o._oConnector;o._oConnector=new b(i);}return;}C.clearEntries();if(b.enableFakeConnector.original){return;}b.enableFakeConnector.original=L.createConnector;L.createConnector=function(){if(!b._oFakeInstance){b._oFakeInstance=new b(i);}return b._oFakeInstance;};};b.disableFakeConnector=function(A,s){if(A&&s){var o=a.getChangePersistenceForComponent(A,s);if(!(o._oConnector instanceof L)){C.clearEntry(A,s);if(b._oBackendInstances[A]&&b._oBackendInstances[A][s]){o._oConnector=b._oBackendInstances[A][s];b._oBackendInstances[A][s]=undefined;}}return;}C.clearEntries();if(b.enableFakeConnector.original){L.createConnector=b.enableFakeConnector.original;b.enableFakeConnector.original=undefined;b._oFakeInstance=undefined;}};return b;},true);
