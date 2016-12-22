define(["snmd-core/SVGWidget","snmd-core/SVGImpl/Chart"],function(t,s){"use strict";var r=function(r,e,a){this.opts={axis:[{max:100,scale:"linear"}],desc:a,dpi:.2,cls:t.srClassOpts(a,"Chart")},this.lines=[{name:"util",axis:0,unit:"%",style:{stroke:"Orchid",strokeLineCap:"round",strokeLineJoin:"round",strokeWidth:1.5,fill:"Orchid"}}],this.desc=a,this.last=[];var i;for(i=0;i<a.topics.length;i++)this.last[a.topics[i]]=[0,0];this.chart=new s(r,e,this.opts,this.lines)};return r.prototype.handleUpdate=function(t,s){var r;try{r=JSON.parse(s)}catch(t){return void console.error("JSON error in performance data: "+t.message)}var e;for(e=0;e<this.lines.length;e++){this.last[t][e]=0;try{this.last[t][e]=r.perf_data[this.lines[e].name].val}catch(s){console.warn("Error to process performance data of "+t+"["+e+"]: "+s.message)}}var a=[];for(e=0;e<this.lines.length;e++){a[e]=0;var i,n=0;for(i in this.last)a[e]+=parseFloat(this.last[i][e]),n+=1;a[e]=a[e]/n}this.chart.update(r._timestamp,a)},r});
//# sourceMappingURL=dist/Chart-CpuUtil.map