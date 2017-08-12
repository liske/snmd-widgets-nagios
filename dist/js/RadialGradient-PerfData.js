define(["snmd-core/js/SVGWidget","snmd-core/js/MQTT","snmd-core/js/SVGImpl/RadialGradient","snmd-widgets-nagios/js/Utils","js-logger"],function(t,s,a,e,i){"use strict";var r=function(i,r,h){this.opts={cls:t.srClassOpts(h,"RadialGradient"),range:h.range,hoffset:h.hoffset,hscale:h.hscale};var o;if("undefined"!=typeof h.clrsty)for(o=0;o<h.clrsty.length;o++)r.style[h.clrsty[o]]="";this.opts.keys="undefined"==typeof h.keys?[h.key]:h.keys,this.last=[],this.states=[],this.tmap=[];var n;for(n in h.stops){this.last[n]={};var p;for(p=0;p<h.stops[n].length;p++){var f=h.stops[n][p];"undefined"==typeof this.tmap[f]&&(this.tmap[f]=[]),-1===this.tmap[f].indexOf(n)&&this.tmap[f].push(n),this.last[n][f]=void 0}}this.opts.stops=Object.keys(this.last),this.grad=new a(i,r,this.opts,e.qTipConfig("Performance Data",this)),Object.keys(this.tmap).forEach(function(t){s.srRegisterTopic(t,this)},this)};return r.prototype.handleUpdate=function(t,s){var a;try{a=JSON.parse(s)}catch(r){return void i.debug("[Nagios/Gradient-PerfData] JSON error in performance data: "+r.message)}e.qTipUpdate(a,this);var h;for(h=0;h<this.tmap[t].length;h++)this.last[this.tmap[t][h]][t]=void 0;var o=0,n=!1;try{this.states[t]=a.state;for(h in this.opts.keys)if("undefined"!=typeof a.perf_data[this.opts.keys[h]]){o=parseFloat(a.perf_data[this.opts.keys[h]].val);break}for(h=0;h<this.tmap[t].length;h++)this.last[this.tmap[t][h]][t]!==o&&(this.last[this.tmap[t][h]][t]=o,n=!0)}catch(p){i.debug("[Nagios/Gradient-PerfData] Error processing performance data ["+t+"]: "+p.message)}if(n!==!1){var f,d=0,l=[];for(f in this.last){o=0;var g,c=!0;for(g in this.last[f]){var m=parseFloat(this.last[f][g]);isNaN(m)&&(m=0,c=!1),o+=m,d=Math.max(d,this.states[g])}o/=Object.keys(this.last[f]).length,isNaN(o)&&(c=!1),o<this.opts.range[0]&&(o=this.opts.range[0]),o>this.opts.range[1]&&(o=this.opts.range[1]),l[f]=c?(this.opts.hoffset+(o-this.opts.range[0])*this.opts.hscale/(this.opts.range[1]-this.opts.range[0]))%360:void 0}this.grad.update(l,d)}},r});
//# sourceMappingURL=dist/js/RadialGradient-PerfData.map