/*
 * ! UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides control sap.m.P13nPanel.
sap.ui.define([
	'jquery.sap.global', './library', 'sap/ui/core/Control'
], function(jQuery, library, Control) {
	"use strict";

	/**
	 * Constructor for a new P13nPanel.
	 *
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] initial settings for the new control
	 * @class Base type for <code>panels</code> aggregation in <code>P13nDialog</code> control.
	 * @extends sap.ui.core.Control
	 * @version 1.48.5
	 * @constructor
	 * @public
	 * @since 1.26.0
	 * @alias sap.m.P13nPanel
	 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
	 */
	var P13nPanel = Control.extend("sap.m.P13nPanel", /** @lends sap.m.P13nPanel.prototype */
	{
		metadata: {
			library: "sap.m",
			properties: {
				/**
				 * Title text appears in the panel.
				 */
				title: {
					type: "string",
					group: "Appearance",
					defaultValue: null
				},

				/**
				 * Large title text appears e.g. in dialog header in case that only one panel is shown.
				 *
				 * @since 1.30.0
				 */
				titleLarge: {
					type: "string",
					group: "Appearance",
					defaultValue: null
				},

				/**
				 * Panel type for generic use. Due to extensibility reason the type of <code>type</code> property should be <code>string</code>.
				 * So it is feasible to add a custom panel without expanding the type.
				 */
				type: {
					type: "string",
					group: "Misc",
					defaultValue: null
				},

				/**
				 * Enables the vertical Scrolling on the <code>P13nDialog</code> when the panel is shown.
				 */
				verticalScrolling: {
					type: "boolean",
					group: "Misc",
					defaultValue: true
				},
				/**
				 * Callback method which is called in order to validate end user entry.
				 */
				validationExecutor: {
					type: "object",
					group: "Misc",
					defaultValue: null
				},
				/**
				 * Callback method which is called in order to register for validation result.
				 */
				validationListener: {
					type: "object",
					group: "Misc",
					defaultValue: null
				},
				/**
				 * Callback which notifies a change on this panel.
				 */
				changeNotifier: {
					type: "object",
					group: "Misc",
					defaultValue: null
				}
			},
			defaultAggregation: "items",
			aggregations: {

				/**
				 * Defines personalization items (e.g. columns in the <code>P13nColumnsPanel</code>).
				 */
				items: {
					type: "sap.m.P13nItem",
					multiple: true,
					singularName: "item",
					bindable: "bindable"
				}
			},
			events: {
				/**
				 * Due to performance the data of the panel can be requested in lazy mode e.g. when the panel is displayed
				 *
				 * @since 1.28.0
				 */
				beforeNavigationTo: {}
			}
		},
		renderer: function(oRm, oControl) {
			// write the HTML into the render manager
			oRm.write("<span");
			oRm.writeControlData(oControl);
			oRm.addClass("sapMP13nPanel");
			oRm.writeClasses();
			oRm.write(">"); // span element
			oRm.write("</span>");
		}
	});

	/**
	 * This method can be overwritten by subclass in order to return a payload for Ok action
	 *
	 * @returns {object} Object which describes the state after Ok has been pressed
	 * @public
	 * @since 1.26.7
	 */
	P13nPanel.prototype.getOkPayload = function() {
		return {};
	};

	/**
	 * This method can be overwritten by subclass in order to return a payload for Reset action
	 *
	 * @public
	 * @since 1.28.0
	 */
	P13nPanel.prototype.getResetPayload = function() {
		return {};
	};

	/**
	 * This method defines the point in time before the panel becomes active.
	 *
	 * @public
	 * @since 1.28.0
	 */
	P13nPanel.prototype.beforeNavigationTo = function() {
		this.fireBeforeNavigationTo();
	};

	/**
	 * This method can be overwritten by subclass in order to prevent navigation to another panel. This could be the case if some content on the panel
	 * is considered 'invalid'.
	 *
	 * @returns {boolean} true if it is allowed to navigate away from this panel, false if it is not allowed
	 * @public
	 * @since 1.28.0
	 */
	P13nPanel.prototype.onBeforeNavigationFrom = function() {
		return true;
	};

	/**
	 * This method can be overwritten by subclass in order to cleanup after navigation, e.g. to remove invalid content on the panel.
	 *
	 * @public
	 * @since 1.28.0
	 */
	P13nPanel.prototype.onAfterNavigationFrom = function() {
	};

	return P13nPanel;

}, /* bExport= */true);
