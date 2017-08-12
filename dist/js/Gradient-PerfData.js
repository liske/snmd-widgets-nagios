define(["snmd-core/js/SVGWidget","snmd-core/js/MQTT","snmd-core/js/SVGImpl/Gradient","snmd-widgets-nagios/js/Utils","js-logger"],function(t,s,a,e,i){"use strict";var r=function(i,r,o){this.opts={cls:t.srClassOpts(o,"Gradient"),range:o.range,hoffset:o.hoffset,hscale:o.hscale,coords:o.coords},this.opts.keys="undefined"==typeof o.keys?[o.key]:o.keys,this.last=[],this.states=[],this.tmap=[];var h;for(h in o.stops){this.last[h]={};var p;for(p=0;p<o.stops[h].length;p++){var n=o.stops[h][p];"undefined"==typeof this.tmap[n]&&(this.tmap[n]=[]),-1===this.tmap[n].indexOf(h)&&this.tmap[n].push(h),this.last[h][n]=void 0}}this.opts.stops=Object.keys(this.last),this.grad=new a(i,r,this.opts,e.qTipConfig("Performance Data",this)),Object.keys(this.tmap).forEach(function(t){s.srRegisterTopic(t,this)},this)};return r.prototype.handleUpdate=function(t,s){var a;try{a=JSON.parse(s)}catch(r){return void i.debug("[Nagios/Gradient-PerfData] JSON error in performance data: "+r.message)}e.qTipUpdate(a,this);var o;for(o=0;o<this.tmap[t].length;o++)this.last[this.tmap[t][o]][t]=void 0;var h=0,p=!1;try{this.states[t]=a.state;for(o in this.opts.keys)if("undefined"!=typeof a.perf_data[this.opts.keys[o]]){h=parseFloat(a.perf_data[this.opts.keys[o]].val);break}for(o=0;o<this.tmap[t].length;o++)this.last[this.tmap[t][o]][t]!==h&&(this.last[this.tmap[t][o]][t]=h,p=!0)}catch(n){i.debug("[Nagios/Gradient-PerfData] Error processing performance data ["+t+"]: "+n.message)}if(p!==!1){var d,f=0,g=[];for(d in this.last){h=0;var c,l=!0;for(c in this.last[d]){var m=parseFloat(this.last[d][c]);isNaN(m)&&(m=0,l=!1),h+=m,f=Math.max(f,this.states[c])}h/=Object.keys(this.last[d]).length,isNaN(h)&&(l=!1),h<this.opts.range[0]&&(h=this.opts.range[0]),h>this.opts.range[1]&&(h=this.opts.range[1]),g[d]=l?(this.opts.hoffset+(h-this.opts.range[0])*this.opts.hscale/(this.opts.range[1]-this.opts.range[0]))%360:void 0}this.grad.update(g,f)}},r});
//# sourceMappingURL=dist/js/Gradient-PerfData.map