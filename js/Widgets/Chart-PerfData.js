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
    define,
    Map
*/

define(["snmd-core/js/SVGWidget", "snmd-core/js/SVGImpl/Chart", "snmd-widgets-nagios/js/Utils", "js-logger"], function (SVGWidget, SVGImplChart, Utils, Logger) {
    'use strict';

    var ChartPerfData = function (root, svg, desc) {
        this.opts = {
            desc: desc,
            dpi: 60 / 5 / 60,
            cls: SVGWidget.srClassOpts(desc, "Chart"),               /* rect classes    */
            lcls: ['snmd-lcl-Nag', 'snmd-lcl-NagPerf', 'snmd-lcl-NagPerfData'],     /* line classes    */
            mcls: ['snmd-mcl-Nag', 'snmd-mcl-NagPerf', 'snmd-mcl-NagPerfData'],     /* maxline classes */
            tcls: ['snmd-tcl-Nag', 'snmd-tcl-NagPerf', 'snmd-tcl-NagPerfData']      /* text classes    */
        };

        if(typeof desc.title === "string") {
            this.opts.title = desc.title;
        }
        else {
            this.opts.title = "Performance Data";
        }

        if(typeof desc.axis === "object") {
            this.opts.axis = desc.axis.map(function (d) {
                var a = {};

                if(typeof d.max === "number") {
                    a.max = d.max;
                }
                else {
                    a.max = 100;
                }

                if(typeof d.scale === "string") {
                    a.scale = d.scale;
                }
                else {
                    a.scale = "linear";
                }

                return a;
            });
        }
        else {
            this.opts.axis = [
                {
                    max: 100,
                    scale: 'linear'
                }
            ];
        }


        this.graphs = desc.graphs.map(function (g, i) {
          if(typeof g.name !== "string") {
            g.name = "noname" + i;
          }

          if(typeof g.axis !== "number") {
            g.axis = 0;
          }

          if(typeof g.unit !== "string") {
            g.unit = "";
          }

          var keys = g.keys;
          g.keys = new Map();

          if(typeof g.factors !== "undefined") {
            keys.map(function (k, j) {
              if(typeof g.factors[j] !== "undefined") {
                g.keys.set(k, parseFloat(g.factors[j]));
              }
              else {
              g.keys.set(k, 1.0);
              }
            });
          }
          else {
            keys.forEach(function (k) {
              g.keys.set(k, 1.0);
            });
          }

          return g;
        });
        
        this.desc = desc;
        this.last = [];
        var t;
        for (t = 0; t < desc.topics.length; t++) {
            this.last[desc.topics[t]] = [];
            var i;
            for (i = 0; i < this.graphs.length; i++) {
                this.last[desc.topics[t]][i] = [];
            }
        }

        this.chart = new SVGImplChart(root, svg, this.opts, this.graphs, Utils.qTipConfig(this, this.graphs.map(function (g) {
            return g.name;
        })));
    };
    
    ChartPerfData.prototype.handleUpdate = function (topic, msg) {
        var json;
        try {
            json = JSON.parse(msg);
        } catch (err_parse) {
            Logger.debug('[Nagios/Chart-PerfData] JSON error in performance data: ' + err_parse.message);
            return;
        }

        Utils.qTipUpdate(topic, json, this);

        var i;
        var v;
        var fKeySum = function (f, k) {
          var w = parseInt(json.perf_data[k].val, 10);
          if (!isNaN(w)) {
              v += w * f;
          }
        };
        for (i = 0; i < this.graphs.length; i++) {
            this.last[topic][i].val = 0;
            this.last[topic][i].state = 0;
            try {
                v = 0;
                this.graphs[i].keys.forEach(fKeySum);

                this.last[topic][i].val = v;
            } catch (err_perf) {
                Logger.debug("[Nagios/Chart-PerfData] Error processing performance data of " + topic + "[" + i + "]: " + err_perf.message);
            }
            try {
                this.last[topic][i].state = json.state;
            } catch (err_state) {
                Logger.debug("[Nagios/Chart-PerfData] Error processing state data: " + err_state.message);
            }
        }
        
        var vals = [];
        var state = 0;
        for (i = 0; i < this.graphs.length; i++) {
            vals[i] = 0;

            var t;
            for (t in this.last) {
                vals[i] += this.last[t][i].val;
                state = Math.max(state, this.last[t][i].state);
            }
        }
        
        this.chart.update(json._timestamp, vals, state);
    };

    return ChartPerfData;
});
