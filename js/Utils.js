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
    window
*/

define(["snmd-core/js/Notify", "jquery"], function (Notify, $) {
    'use strict';

    var instance = null;

    var Utils = function () {
        if (instance !== null) {
            throw new Error("Cannot instantiate more than one instance, use getInstance()!");
        }
    };

    Utils.getInstance = function () {
        if (instance === null) {
            instance = new Utils();
        }

        return instance;
    };

    Utils.prototype.qTipConfig = function (that, legends) {
        that.qtip_services = {};

        var t = [$("<span></span>").text(that.opts.title)];
        if (Array.isArray(legends)) {
            var s = $("<span></span>").addClass('snmd-qt-legend');
            t.push(s);
            $.each(legends, function (i, l) {
                var classes = 'snmd-qt-nocls';
                if (Array.isArray(that.opts.lcls)) {
                    classes = that.opts.lcls.map(function (c) {
                        return c + "-" + l + " " + c + "-" + i;
                    }).join(' ');
                }

                s.append(
                    $("<span></span>").text(l).addClass(classes)
                );
            });
        }

        return {
            content: {
                title: t,
                text: Utils.qTipContentCb.bind(that)
            },
            position: {
                viewport: $(window)
            }
        };
    };

    Utils.qTipContentCb = function () {
        var els = [];

        if (Object.keys(this.qtip_services).length === 0) {
            return $("<i></i>").text('No data, yet...');
        }
        
        $.each(this.qtip_services, function (hostname, services) {
            var h = $("<p></p>").addClass('snmd-qt-NagHost');
            h.text(hostname);
            els.push(h);

            $.each(services, function (service, status) {
                var s = $("<p></p>").addClass('snmd-qt-NagService');
                s.text(service);
                els.push(s);

                els.push(
                    $("<p></p>").addClass('snmd-qt-NagOutput snmd-bcl-bgcolor snmd-scl-' + status.state).append(
                        $("<code></code>").text(status.output)
                    )
                );
            });
        });
        
        return els;
    };

    Utils.qTipShowCb = function () {
        return this.qtip_services.length > 0;
    };

    Utils.prototype.qTipUpdate = function (topic, json, that) {
        if (typeof that.qtip_services[json.hostname] === "undefined") {
            that.qtip_services[json.hostname] = {};
        }
        that.qtip_services[json.hostname][json.service_description] = {
            state: json.state,
            output: json.output
        };

        Notify.notify("snmd-widgets-nagios", topic, json.state, that.opts.title, json.hostname + "\n" + json.service_description + "\n" + json.output);
    };
    
    return Utils.getInstance();
});
