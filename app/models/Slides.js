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
            "Slides": [
                {
                    "title": "My first cute Impressive presentation"
                }
            ]
        },

        constructor: function() {
            JSONModel.apply(this, arguments);

            this.setData(this._data);
        },

        addSlide: function(iAfterIndex) {
            this._data.Slides.splice(iAfterIndex+1, 0, {"title": ""});
            this.refresh();
        },

        deleteSlide: function(iAfterIndex) {
            this._data.Slides.splice(iAfterIndex, 1);
            this.refresh();
        }
    });
});