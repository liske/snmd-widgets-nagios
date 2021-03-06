/*
SNMD - Simple Network Monitoring Dashboard
  https://github.com/DE-IBH/snmd-widgets-nagios/

Authors:
  Thomas Liske <liske@ibh.de>

Copyright Holder:
  2012 - 2013 (C) Thomas Liske [https://fiasko-nw.net/~thomas/]
  2014 - 2017 (C) IBH IT-Service GmbH [https://www.ibh.de/]

License:
  This program is free software; you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation; either version 2 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this package; if not, write to the Free Software
  Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301 USA
*/

/*jslint
    devel: true,
    plusplus: true,
    vars: true
*/

/*global
    define
*/

define(["snmd-core/js/SVGWidget", "snmd-core/js/SVGImpl/Class", "snmd-widgets-nagios/js/Utils", "jquery", "js-logger"], function (SVGWidget, SVGImplClass, Utils, $, Logger) {
    'use strict';

    var ClassTextState = function (root, svg, desc) {
        this.opts = {
            title: "Service State",
            cls: SVGWidget.srClassOpts(desc, "Class")
        };
        
        this.last = [];
        var i;
        for (i = 0; i < desc.topics.length; i++) {
            this.last[desc.topics[i]] = [3];
        }

        if (typeof desc.clrsty !== "undefined") {
            for (i = 0; i < desc.clrsty.length; i++) {
                svg.style[desc.clrsty[i]] = '';
                $(svg).children('tspan').each(function (i, c) {
                    c.style[desc.clrsty[i]] = '';
                });
            }
        }

        this.el = new SVGImplClass(root, svg, this.opts, Utils.qTipConfig(this));
    };
    
    ClassTextState.prototype.handleUpdate = function (topic, msg) {
        var json;
        try {
            json = JSON.parse(msg);
        } catch (err_parse) {
            Logger.debug('[Nagios/Class-TextState] JSON error in performance data: ' + err_parse.message);
            return;
        }

        Utils.qTipUpdate(topic, json, this);

        this.last[topic] = undefined;
        try {
            this.last[topic] = json.state;
        } catch (err_state) {
            Logger.debug("[Nagios/Class-TextState] Error processing state data [" + topic + "]: " + err_state.message);
        }
        
        var state = 0;
        var t;
        for (t in this.last) {
            state = Math.max(state, this.last[t]);
        }
        
        this.el.update(state);
    };

    return ClassTextState;
});
