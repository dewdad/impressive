/**
 * Application view controller.
 *
 * @Author: Thomas Bonk
 * @Email:  thomas@meandmymac.de
 * @Filename: MainView.controller.js
 * 
 * Copyright (C) Thomas Bonk.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

sap.ui.define([
    "jquery.sap.global",
    "sap/ui/core/mvc/Controller",
    "de/meandmymac/impressive/app/models/Slides"
], function (jQuery, Controller, Slides) {

    "use strict";

    return Controller.extend("de.meandmymac.impressive.app.controllers.MainView", {

        constructor: function (sName) {
            Controller.apply(this, arguments);
        },

        onInit: function (oEvent) {
            var view = this.getView();

            this.model = new Slides();
            view.setModel(this.model);
        },

        onAfterRendering: function() {
            this._bindBrowserEvent("click", this.handleClick);
            this.model.attachEvent(this.model.MODEL_STATE_CHANGED(), this.modelStateChanged, this);
        },

        onBeforeRendering: function() {
            this._unbindBrowserEvent("click", this.handleClick);
            this.model.detachEvent(this.model.MODEL_STATE_CHANGED(), this.modelStateChanged, this);
        },

        onExit: function() {
            this._unbindBrowserEvent("click", this.handleClick);
            this.model.detachEvent(this.model.MODEL_STATE_CHANGED(), this.modelStateChanged, this);
        },

        handleClick: function(oEvent) {
            console.log(oEvent);
        },

        onAddSlide: function (oEvent) {
            var iSelectedItemIndex = this._getIndexOfItemForEvent(oEvent);

            this.model.addSlide(iSelectedItemIndex);
        },

        onDeleteSlide: function (oEvent) {
            var iSelectedItemIndex = this._getIndexOfItemForEvent(oEvent);

            this.model.deleteSlide(iSelectedItemIndex);
        },

        modelStateChanged: function(oEvent) {
            console.log(oEvent);
        },

        _getIndexOfItemForEvent: function(oEvent) {
            // The actual Item
            var oItem = oEvent.getSource();
            // The model that is bound to the item
            // the name of your model should be a parameter in getBindingContext
            var oContext = oItem.getBindingContext();
            var sPath = oContext.getPath();
            var iSelectedItemIndex = parseInt(sPath.substring(sPath.lastIndexOf('/') + 1));

            return iSelectedItemIndex;
        },

        _bindBrowserEvent: function(sEventId, mMethod) {
            jQuery.sap.byId(this.getId).bind(sEventId, jQuery.proxy(mMethod, this));
        },

        _unbindBrowserEvent: function(sEventId, mMethod) {
            jQuery.sap.byId(this.getId).unbind(sEventId, jQuery.proxy(mMethod, this));
        }
    });
});