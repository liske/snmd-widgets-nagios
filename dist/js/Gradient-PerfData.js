define(["snmd-core/js/SVGWidget","snmd-core/js/MQTT","snmd-core/js/SVGImpl/Gradient","js-logger"],function(t,s,a,e){"use strict";var i=function(e,i,r){this.opts={cls:t.srClassOpts(r,"Gradient"),range:r.range,hoffset:r.hoffset,hscale:r.hscale,coords:r.coords},this.opts.keys="undefined"==typeof r.keys?[r.key]:r.keys,this.last=[],this.states=[],this.tmap=[];var o;for(o in r.stops){this.last[o]={};var h;for(h=0;h<r.stops[o].length;h++){var p=r.stops[o][h];"undefined"==typeof this.tmap[p]&&(this.tmap[p]=[]),-1===this.tmap[p].indexOf(o)&&this.tmap[p].push(o),this.last[o][p]=void 0}}this.opts.stops=Object.keys(this.last),this.grad=new a(e,i,this.opts),Object.keys(this.tmap).forEach(function(t){s.srRegisterTopic(t,this)},this)};return i.prototype.handleUpdate=function(t,s){var a;try{a=JSON.parse(s)}catch(i){return void e.debug("[Nagios/Gradient-PerfData] JSON error in performance data: "+i.message)}var r;for(r=0;r<this.tmap[t].length;r++)this.last[this.tmap[t][r]][t]=void 0;var o=0,h=!1;try{this.states[t]=a.state;for(r in this.opts.keys)if("undefined"!=typeof a.perf_data[this.opts.keys[r]]){o=parseFloat(a.perf_data[this.opts.keys[r]].val);break}for(r=0;r<this.tmap[t].length;r++)this.last[this.tmap[t][r]][t]!==o&&(this.last[this.tmap[t][r]][t]=o,h=!0)}catch(p){e.debug("[Nagios/Gradient-PerfData] Error processing performance data ["+t+"]: "+p.message)}if(h!==!1){var n,f=0,d=[];for(n in this.last){o=0;var c,g=!0;for(c in this.last[n]){var l=parseFloat(this.last[n][c]);isNaN(l)&&(l=0,g=!1),o+=l,f=Math.max(f,this.states[c])}o/=Object.keys(this.last[n]).length,o<this.opts.range[0]&&(o=this.opts.range[0]),o>this.opts.range[1]&&(o=this.opts.range[1]),d[n]=g?(this.opts.hoffset+(o-this.opts.range[0])*this.opts.hscale/(this.opts.range[1]-this.opts.range[0]))%360:void 0}this.grad.update(d,f)}},i});
//# sourceMappingURL=dist/js/Gradient-PerfData.map