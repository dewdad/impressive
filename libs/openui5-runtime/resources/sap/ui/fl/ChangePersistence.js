/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/Change","sap/ui/fl/Utils","jquery.sap.global","sap/ui/fl/LrepConnector","sap/ui/fl/Cache","sap/ui/fl/context/ContextManager","sap/ui/fl/registry/Settings"],function(C,U,$,L,a,b,S){"use strict";var c=function(o){this._oComponent=o;this._mChanges={mChanges:{},mDependencies:{},mDependentChangesOnMe:{}};if(!this._oComponent||!this._oComponent.name){U.log.error("The Control does not belong to an SAPUI5 component. Personalization and changes for this control might not work as expected.");throw new Error("Missing component name.");}this._oConnector=this._createLrepConnector();this._aDirtyChanges=[];};c.NOTAG="<NoTag>";c.prototype.getComponentName=function(){return this._oComponent.name;};c.prototype._createLrepConnector=function(){return L.createConnector();};c.prototype.getCacheKey=function(){return a.getChangesFillingCache(this._oConnector,this._oComponent).then(function(w){if(w&&w.etag){return w.etag;}return c.NOTAG;});};c.prototype._preconditionsFulfilled=function(A,i,o){function _(){return(o.fileType==="change")||(o.fileType==="variant"&&i);}function d(){if(!o.selector){return false;}if(!i){if(!o.selector.id){return false;}}else{if((o.fileType==="variant")||(o.changeType==="defaultVariant")){return!!o.selector.persistencyKey;}if((o.fileType==="change")&&(o.changeType!=="defaultVariant")){return!!o.selector.id;}}return true;}function e(){return b.doesContextMatch(o,A);}if(_()&&d()&&e()){return true;}return false;};c.prototype.getChangesForComponent=function(p){return a.getChangesFillingCache(this._oConnector,this._oComponent,p).then(function(w){this._bHasLoadedChangesFromBackEnd=true;if(w.changes&&w.changes.settings){S._storeInstance(w.changes.settings);}if(!w.changes||!w.changes.changes){return[];}var e=w.changes.changes;var s=p&&p.currentLayer;if(s){var f=[];e.forEach(function(o){if(o.layer===s){f.push(o);}});e=f;}else if(U.isLayerFilteringRequired()&&!(p&&p.ignoreMaxLayerParameter)){var F=[];e.forEach(function(o){if(!U.isOverMaxLayer(o.layer)){F.push(o);}});e=F;}var i=p&&p.includeVariants;var g=w.changes.contexts||[];return new Promise(function(r){b.getActiveContexts(g).then(function(A){r(e.filter(this._preconditionsFulfilled.bind(this,A,i)).map(d));}.bind(this));}.bind(this));}.bind(this));function d(o){return new C(o);}};c.prototype._addChangeIntoMap=function(o,d){var s=d.getSelector();if(s&&s.id){var e=s.id;if(s.idIsLocal){e=o.createId(e);}this._addMapEntry(e,d);if(s.idIsLocal===undefined&&e.indexOf("---")!=-1){var f=e.split("---")[0];if(f!==o.getId()){e=e.split("---")[1];e=o.createId(e);this._addMapEntry(e,d);}}}return this._mChanges;};c.prototype._addMapEntry=function(s,o){if(!this._mChanges.mChanges[s]){this._mChanges.mChanges[s]=[];}this._mChanges.mChanges[s].push(o);};c.prototype._addDependency=function(d,o){if(!this._mChanges.mDependencies[d.getKey()]){this._mChanges.mDependencies[d.getKey()]={changeObject:d,dependencies:[]};}this._mChanges.mDependencies[d.getKey()].dependencies.push(o.getKey());if(!this._mChanges.mDependentChangesOnMe[o.getKey()]){this._mChanges.mDependentChangesOnMe[o.getKey()]=[];}this._mChanges.mDependentChangesOnMe[o.getKey()].push(d.getKey());};c.prototype.loadChangesMapForComponent=function(o,p){var t=this;var A=U.getAppComponentForControl(o);return this.getChangesForComponent(p).then(d);function d(e){t._mChanges={mChanges:{},mDependencies:{},mDependentChangesOnMe:{}};e.forEach(function(f,I,g){t._addChangeIntoMap(o,f);var D=f.getDependentIdList(A);var P;var h;var k;var F;for(var i=I-1;i>=0;i--){P=g[i];h=g[i].getDependentIdList(A);F=false;for(var j=0;j<D.length&&!F;j++){k=h.indexOf(D[j]);if(k>-1){t._addDependency(f,P);F=true;}}}});return t.getChangesMapForComponent.bind(t);}};c.prototype.getChangesMapForComponent=function(){return this._mChanges;};c.prototype.getChangesForView=function(v,p){var t=this;return this.getChangesForComponent(p).then(function(e){return e.filter(d.bind(t));});function d(o){var s=o.getSelector().id;if(!s||!p){return false;}var e=s.slice(0,s.lastIndexOf("--"));var v;if(o.getSelector().idIsLocal){var A=p.appComponent;if(A){v=A.getLocalId(p.viewId);}}else{v=p.viewId;}return e===v;}};c.prototype.addChange=function(v,o){var n;if(v instanceof C){n=v;}else{n=new C(v);}this._aDirtyChanges.push(n);this._addChangeIntoMap(o,n);return n;};c.prototype.saveDirtyChanges=function(){var d=this._aDirtyChanges.slice(0);var D=this._aDirtyChanges;var r=this._getRequests(d);var p=this._getPendingActions(d);if(p.length===1&&r.length===1&&p[0]==="NEW"){var R=r[0];var P=this._prepareDirtyChanges(D);return this._oConnector.create(P,R).then(this._massUpdateCacheAndDirtyState(D,d));}else{return d.reduce(function(s,o){var e=s.then(this._performSingleSaveAction(o).bind(this));e.then(this._updateCacheAndDirtyState(D,o));return e;}.bind(this),Promise.resolve());}};c.prototype._performSingleSaveAction=function(d){return function(){if(d.getPendingAction()==="NEW"){return this._oConnector.create(d.getDefinition(),d.getRequest());}if(d.getPendingAction()==="DELETE"){return this._oConnector.deleteChange({sChangeName:d.getId(),sLayer:d.getLayer(),sNamespace:d.getNamespace(),sChangelist:d.getRequest()});}};};c.prototype._updateCacheAndDirtyState=function(d,D){var t=this;return function(){if(D.getPendingAction()==="NEW"){a.addChange(t._oComponent,D.getDefinition());}if(D.getPendingAction()==="DELETE"){a.deleteChange(t._oComponent,D.getDefinition());}var i=d.indexOf(D);if(i>-1){d.splice(i,1);}};};c.prototype._massUpdateCacheAndDirtyState=function(d,D){var t=this;jQuery.each(D,function(i,o){t._updateCacheAndDirtyState(d,o)();});};c.prototype._getRequests=function(d){var r=[];jQuery.each(d,function(i,o){var R=o.getRequest();if(r.indexOf(R)===-1){r.push(R);}});return r;};c.prototype._getPendingActions=function(d){var p=[];jQuery.each(d,function(i,o){var P=o.getPendingAction();if(p.indexOf(P)===-1){p.push(P);}});return p;};c.prototype._prepareDirtyChanges=function(d){var e=[];jQuery.each(d,function(i,o){e.push(o.getDefinition());});return e;};c.prototype.getDirtyChanges=function(){return this._aDirtyChanges;};c.prototype.deleteChange=function(o){var n=this._aDirtyChanges.indexOf(o);if(n>-1){if(o.getPendingAction()==="DELETE"){return;}this._aDirtyChanges.splice(n,1);this._deleteChangeInMap(o);return;}o.markForDeletion();this._aDirtyChanges.push(o);this._deleteChangeInMap(o);};c.prototype._deleteChangeInMap=function(o){var t=this;Object.keys(this._mChanges.mChanges).some(function(k){var d=t._mChanges.mChanges[k];var n=d.indexOf(o);if(n!==-1){d.splice(n,1);return true;}});};return c;},true);