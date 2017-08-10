/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control'],function(q,l,C){"use strict";var F=C.extend("sap.ui.commons.FormattedTextView",{metadata:{library:"sap.ui.commons",properties:{accessibleRole:{type:"sap.ui.core.AccessibleRole",group:"Accessibility",defaultValue:sap.ui.core.AccessibleRole.Document},htmlText:{type:"string",group:"Misc",defaultValue:""}},aggregations:{controls:{type:"sap.ui.core.Control",multiple:true,singularName:"control"}}}});F.prototype.init=function(){this._renderingRules={};this._renderingRules.ATTRIBS={'span::class':1,'div::class':1,'div::id':1,'span::id':1,'embed::data-index':1};this._renderingRules.ELEMENTS={'abbr':1,'acronym':1,'address':1,'blockquote':1,'br':1,'cite':1,'code':1,'dfn':1,'div':1,'em':1,'h1':1,'h2':1,'h3':1,'h4':1,'h5':1,'h6':1,'kbd':1,'p':1,'pre':1,'q':1,'samp':1,'strong':1,'span':1,'var':1,'dl':1,'dt':1,'dd':1,'ol':1,'ul':1,'li':1,'embed':1};};F.prototype.exit=function(){delete this._renderingRules;};F.prototype.hasControls=function(){var c=this.getAggregation("controls");return!!(c&&c.length>0);};var s=function(t,a){var b=/^[0-9]*$/;for(var i=0;i<a.length;i+=2){var A=t+"::"+a[i];if(this._renderingRules.ATTRIBS[A]){if(t==="embed"&&!(a[i+1].match(b))){return null;}}else{var w='<'+t+'> with attribute ['+a[i]+'="'+a[i+1]+'"] is not allowed and cut';q.sap.log.warning(w,this);a[i+1]=null;}}return a;};var p=function(t,a){if(this._renderingRules.ELEMENTS[t]){var b=q.proxy(s,this);return b(t,a);}else{var w='<'+t+'> is not allowed';q.sap.log.warning(w,this);}};F.prototype.setHtmlText=function(t){var a="";var P=q.proxy(p,this);a=q.sap._sanitizeHTML(t,{tagPolicy:P});this.setProperty("htmlText",a);};var S=function(c){if(this.hasControls()){this.removeAllAggregation("controls");}var I=q.isArray(c);if(I&&c.length>0){for(var i=0;i<c.length;i++){this.addAggregation("controls",c[i],true);}this.invalidate();}};F.prototype.setContent=function(h,c){this.setHtmlText(h);S.call(this,c);};return F;},true);
