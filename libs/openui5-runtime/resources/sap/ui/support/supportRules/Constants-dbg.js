/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],
	function() {
		"use strict";

		/**
		 * Constants variables used in the Support Assistant
		 * @enum
		 *
		 * @author SAP SE
		 * @namespace
		 *
		 * @alias sap.ui.support.AssistantConstants
		 */
		return {
			TEMP_RULESETS_NAME: "temporary",
			SUPPORT_ASSISTANT_NAME: "Support Assistant",
			LOCAL_STORAGE_TEMP_RULES_KEY: "support-assistant-temprules",
			LOCAL_STORAGE_SELECTED_RULES_KEY: "support-assistant-selected-rules",
			LOCAL_STORAGE_SELECTED_CONTEXT_KEY: "support-assistant-settings-selected-context",
			LOCAL_STORAGE_SELECTED_CONTEXT_COMPONENT_KEY: "support-assistant-settings-selected-context-components",
			COOKIE_NAME: "persistence-cookie"
		};


	}, /* bExport= */ true);
