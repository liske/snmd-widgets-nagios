/*
scotty-rev - Scotty REVOLUTION Network Management Dashboard

Authors:
  Thomas Liske <liske@ibh.de>

Copyright Holder:
  2012 - 2013 (C) Thomas Liske [https://fiasko-nw.net/~thomas/tag/scotty]
  2014 - 2016 (C) IBH IT-Service GmbH [http://www.ibh.de/OSS/Scotty]

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
    devel: true
*/

if (typeof Scotty === "undefined") {
    Scotty = {};
}
if (typeof Scotty.SVGImpl === "undefined") {
    Scotty.SVGImpl = {};
}
if (typeof Scotty.SVGImpl.String === "undefined") {
    Scotty.SVGImpl.String = {};
}

(function ($) {
    "use strict";
    
    var String = function (root, svg, opts, qtip) {
        /* Meta data */
        this.opts = opts;

        /* SVG container */
        this.root = root;

        /* SVG text element */
        this.txt = svg;

        /* Set qtip if available */
        if (typeof qtip !== "undefined") {
            this.txt.qtip(qtip);
        }
    };
    
    String.prototype.update = function (val, state) {
        var stroke = Scotty.Core.srNagStateColor(state);

        if (this.last_val === val && stroke === this.last_stroke) {
            return;
        }
        
        /* Update text elements */
        this.txt.textContent = val;
        this.txt.style.fill = stroke;
        if (state > 0) {
            this.txt.classList.add('ani-pulse');
        } else {
            this.txt.classList.remove('ani-pulse');
        }

        this.last_val = val;
        this.last_stroke = stroke;

        if (state !== this.last_state) {
            this.last_state = state;

            Scotty.GUI.srStateChanged(this.root._svg.parentElement.id, this.txt.id, state);
        }
    };

    Scotty.SVGWidget.srRegisterImpl(
        "String",
        String
    );
}).call(Scotty.SVGImpl.String, jQuery);
