define(["snmd-core/SVGWidget","snmd-core/SVGImpl/Chart"],function(t,s){"use strict";var a=function(a,e,i){this.opts={axis:[{max:1e8,scale:"linear"}],fill:"white",desc:i,dpi:.2,cls:t.srClassOpts(i,"Chart"),lcls:["snmd-lcl-Nag","snmd-lcl-NagIO","snmd-lcl-NagIOTp"],mcls:["snmd-mcl-Nag","snmd-mcl-NagIO","snmd-mcl-NagIOTp"],tcls:["snmd-tcl-Nag","snmd-tcl-NagIO","snmd-tcl-NagIOTp"]},this.lines=[{name:"dist_read_throughput",axis:0,unit:"B"},{name:"dist_write_throughput",axis:0,unit:"B"}],this.desc=i,this.last=[];var l;for(l=0;l<i.topics.length;l++){this.last[i.topics[l]]=[];var r;for(r=0;r<this.lines.length;r++)this.last[i.topics[l]][r]=[]}this.chart=new s(a,e,this.opts,this.lines)};return a.prototype.handleUpdate=function(t,s){var a;try{a=JSON.parse(s)}catch(t){return void console.error("JSON error in performance data: "+t.message)}var e;for(e=0;e<this.lines.length;e++){this.last[t][e].val=0,this.last[t][e].state=0;try{this.last[t][e].val=a.perf_data[this.lines[e].name].val,this.last[t][e].state=a.state}catch(t){console.warn("Error to process performance data of "+this.lines[e].name+": "+t.message)}}var i=[],l=0;for(e=0;e<this.lines.length;e++){i[e]=0;var r;for(r in this.last){var n=parseFloat(this.last[r][e].val);isNaN(n)&&(n=0),i[e]+=n,l=Math.max(l,this.last[r][e].state)}}this.chart.update(a._timestamp,i,l)},a});
//# sourceMappingURL=dist/Chart-DiskTp.map