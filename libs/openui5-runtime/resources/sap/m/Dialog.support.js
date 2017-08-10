/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/support/library"],function(q,S){"use strict";var C=S.Categories,a=S.Severity,A=S.Audiences;var r=[];function c(R){r.push(R);}c({id:"dialogarialabelledby",audiences:[A.Control],categories:[C.Accessibility],enabled:true,minversion:"1.28",title:"Dialog accessibility",description:"Dialogs with content should have ariaLabelledBy association set",resolution:"Use ariaLabelledBy association so that dialog content is read out",resolutionurls:[{text:"Set ariaLabelledBy",href:"https://uacp2.hana.ondemand.com/viewer/DRAFT/SAPUI5_Internal/5709e73d51f2401a9a5a89d8f5479132.html"}],check:function(i,o,s){s.getElementsByClassName("sap.m.Dialog").forEach(function(e){var b=e.getAssociation("ariaLabelledBy"),d,E=e.getTitle(),f=e.getId(),g=e.getMetadata().getElementName();if((e.getContent()&&e.getContent().length>0)&&(!b||b.length==0)){if(E){d="'"+E+"' "+g+" ("+f+") has content but ariaLabelledBy association is not set. Set the association so that dialog's content is read out.";}else{d=g+" ("+f+") has content but ariaLabelledBy association is not set. Set the association so that dialog's content is read out.";}i.addIssue({severity:a.Medium,details:d,context:{id:e.getId()}});}});}});return{addRulesToRuleset:function(R){q.each(r,function(i,o){R.addRule(o);});}};},true);