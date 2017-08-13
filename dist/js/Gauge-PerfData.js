define(["snmd-core/js/SVGWidget","snmd-core/js/SVGImpl/Gauge","snmd-widgets-nagios/js/Utils","js-logger"],function(t,s,e,a){"use strict";var i=function(a,i,o){this.opts={axis:[{max:50,scale:"linear"}],stroke:"yellow",fill:"white",desc:o,dpi:.2,cls:t.srClassOpts(o,"Gauge")},this.desc=o,this.opts.uom="undefined"==typeof this.desc.uom?"":this.desc.uom,this.opts.keys="undefined"==typeof o.keys?[o.key]:o.keys,this.opts.factor="undefined"!=typeof o.factor?o.factor:1,this.last=[];var r;for(r=0;r<o.topics.length;r++)this.last[o.topics[r]]=[];this.max="undefined"==typeof o.max?100:o.max,this.chart=new s(a,i,this.opts,e.qTipConfig(this,"Performance Data",this.opts.keys))};return i.prototype.handleUpdate=function(t,s){var i;try{i=JSON.parse(s)}catch(o){return void a.debug("[Nagios/Gauge-PerfData] JSON error in performance data: "+o.message)}e.qTipUpdate(i,this),this.last[t].val=0,this.last[t].state=0;try{var r;for(r=0;r<this.opts.keys.length;r++)"undefined"!=typeof i.perf_data[this.opts.keys[r]]&&(this.last[t].val+=parseFloat(i.perf_data[this.opts.keys[r]].val));this.last[t].state=i.state}catch(h){a.debug("[Nagios/Gauge-PerfData] Error processing performance data: "+h.message)}var n,p=0,d=0;for(n in this.last){var f=parseFloat(this.last[n].val);isNaN(f)&&(f=0),p+=f,d=Math.max(d,this.last[n].state)}this.chart.update(p*this.opts.factor,this.max,d)},i});
//# sourceMappingURL=dist/js/Gauge-PerfData.map