define(["snmd-core/js/SVGWidget","snmd-core/js/SVGImpl/Gauge","snmd-widgets-nagios/js/Utils","js-logger"],function(t,s,a,e){"use strict";var i=function(e,i,o){this.opts={title:"Performance Data",axis:[{max:50,scale:"linear"}],stroke:"yellow",fill:"white",desc:o,dpi:.2,cls:t.srClassOpts(o,"Gauge")},this.desc=o,void 0===this.desc.uom?this.opts.uom="":this.opts.uom=this.desc.uom,void 0===o.keys?this.opts.keys=[o.key]:this.opts.keys=o.keys,void 0!==o.factor?this.opts.factor=o.factor:this.opts.factor=1,this.last=[];var r;for(r=0;r<o.topics.length;r++)this.last[o.topics[r]]={val:0,state:-1};this.max=void 0===o.max?100:o.max,this.chart=new s(e,i,this.opts,a.qTipConfig(this,this.opts.keys))};return i.prototype.handleUpdate=function(t,s){var i;try{i=JSON.parse(s)}catch(t){return void e.debug("[Nagios/Gauge-PerfData] JSON error in performance data: "+t.message)}a.qTipUpdate(t,i,this),this.last[t].val=0,this.last[t].state=0;try{var o;for(o=0;o<this.opts.keys.length;o++)if(void 0!==i.perf_data[this.opts.keys[o]]){var r=parseFloat(i.perf_data[this.opts.keys[o]].val);isNaN(r)||(this.last[t].val+=r)}this.last[t].state=i.state}catch(t){e.debug("[Nagios/Gauge-PerfData] Error processing performance data: "+t.message)}var h,p=0,l=0;for(h in this.last)p+=this.last[h].val,l=Math.max(l,this.last[h].state);this.chart.update(p*this.opts.factor,this.max,l)},i});