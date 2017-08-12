define(["snmd-core/js/SVGWidget","snmd-core/js/SVGImpl/Transform","snmd-widgets-nagios/js/Utils","js-logger"],function(t,s,a,e){"use strict";var r=function(e,r,o){this.opts={desc:o,cls:t.srClassOpts(o,"Transform")},this.desc=o,this.opts.transform="undefined"==typeof this.desc.transform?"scale(%)":this.desc.transform,this.opts.keys="undefined"==typeof o.keys?[o.key]:o.keys,this.opts.factors="undefined"==typeof o.factors?[]:o.factors,"undefined"!=typeof o.factor?(this.opts.factor=parseFloat(o.factor),isNaN(this.opts.factor)&&(this.opts.factor=1)):this.opts.factor=1,"undefined"!=typeof o.max?(this.opts.max=parseFloat(o.max),isNaN(this.opts.max)&&(this.opts.max=100)):this.opts.max=100,this.last=[],this.factors=[];var i;for(i=0;i<o.topics.length;i++)this.last[o.topics[i]]=[],this.factors[o.topics[i]]="undefined"==typeof this.opts.factors[i]?this.opts.factor:this.opts.factors[i];this.chart=new s(e,r,this.opts,a.qTipConfig("Performance Data",this))};return r.prototype.handleUpdate=function(t,s){var r;try{r=JSON.parse(s)}catch(o){return void e.debug("[Nagios/Transform-PerfData] JSON error in performance data: "+o.message)}a.qTipUpdate(r,this),this.last[t].val=0;try{var i;for(i=0;i<this.opts.keys.length;i++)"undefined"!=typeof r.perf_data[this.opts.keys[i]]&&(this.last[t].val+=parseFloat(r.perf_data[this.opts.keys[i]].val)*this.factors[t])}catch(f){e.debug("[Nagios/Transform-PerfData] Error processing performance data ["+t+"]: "+f.message)}try{this.last[t].state=r.state}catch(p){e.debug("[Nagios/Transform-PerfData] Error processing state data ["+t+"]: "+p.message)}var n,h=0,c=0;for(n in this.last){var d=parseFloat(this.last[n].val);isNaN(d)&&(d=0),h+=d,c=Math.max(c,this.last[n].state)}this.chart.update(h,c)},r});
//# sourceMappingURL=dist/js/Transform-PerfData.map