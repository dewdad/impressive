/**
 * Application model.
 *
 * @Author: Thomas Bonk
 * @Email:  thomas@meandmymac.de
 * @Filename: Slides.js
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
    "sap/ui/model/json/JSONModel"
], function (JSONModel) {

    "use strict";

    return JSONModel.extend("de.meandmymac.impressive.app.models.Slides", {

        _data: {
            "Title": "Untitled.impr",
            "Slides": [
                {
                    "heading": "My first cute Impressive presentation"
                }
            ]
        },
        
        _hasChanges: false,

        MODEL_STATE_CHANGED: function() {
            return "model-state-changed";
        },

        constructor: function() {
            JSONModel.apply(this, arguments);

            this.attachPropertyChange(this._modelChanged);
            this.setData(this._data);
        },

        hasChanges: function() {
            return this.hasChanges;
        },

        addSlide: function(iAfterIndex) {
            this._data.Slides.splice(iAfterIndex+1, 0, {"heading": ""});
            this._setDirty(true);
            this.refresh();
        },

        deleteSlide: function(iAfterIndex) {
            this._data.Slides.splice(iAfterIndex, 1);
            this._setDirty(true);
            this.refresh();
        },

        save: function(sFilepath) {
            this._hasChanges = false;
        },

        _setDirty: function(bIsDirty) {
            this._hasChanges = true;
            this.fireEvent(this.MODEL_STATE_CHANGED(), { 
                model: this
            });
        },

        _modelChanged: function(oEvent) {
            this._setDirty(true);
        }
    });
});