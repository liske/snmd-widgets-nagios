define(["snmd-core/js/SVGWidget","snmd-core/js/SVGImpl/Chart","js-logger"],function(s,t,e){"use strict";var a=function(e,a,i){var r;for(this.opts={axis:[{max:50,scale:"linear"}],desc:i,dpi:.2,cls:s.srClassOpts(i,"Chart")},this.lines=[{name:"out_load",axis:0,unit:"%",style:{stroke:"Orchid",strokeLineCap:"round",strokeLineJoin:"round",strokeWidth:1.5,fill:"Orchid"}}],this.desc=i,this.last=[],r=0;r<i.topics.length;r+=1)this.last[i.topics[r]]=[0];this.chart=new t(e,a,this.opts,this.lines)};return a.prototype.handleUpdate=function(s,t){var a,i,r,o=[];try{r=JSON.parse(t)}catch(n){return void e.debug("[Nagios/Chart-UpsLoad] JSON error in performance data: "+n.message)}for(i=0;i<this.lines.length;i+=1){this.last[s][i]=0;try{this.last[s][i]=r.perf_data[this.lines[i].name].val}catch(h){e.debug("[Nagios/Chart-UpsLoad] Error processing performance data of ["+s+"].line["+i+"]: "+h.message)}}for(i=0;i<this.lines.length;i+=1){o[i]=0,a=0;var l;for(l in this.last)o[i]+=parseFloat(this.last[l][i]),a+=1;o[i]=o[i]/a}this.chart.update(r._timestamp,o)},a});
//# sourceMappingURL=dist/js/Chart-UpsLoad.map