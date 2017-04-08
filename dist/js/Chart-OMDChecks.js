define(["snmd-core/js/SVGWidget","snmd-core/js/SVGImpl/Chart","js-logger"],function(s,t,a){"use strict";var e=function(a,e,i){if(this.opts={axis:[{max:200,scale:"linear"}],desc:i,dpi:.2,cls:s.srClassOpts(i,"Chart"),lcls:["snmd-lcl-Nag","snmd-lcl-NagOMD","snmd-lcl-NagOMDChecks"],mcls:["snmd-mcl-Nag","snmd-mcl-NagOMD","snmd-mcl-NagOMDChecks"],tcls:["snmd-tcl-Nag","snmd-tcl-NagOMD","snmd-tcl-NagOMDChecks"]},"undefined"!=typeof i.max){var l=parseFloat(i.max);isNaN(l)||(this.opts.axis[0].max=l)}this.lines=[{name:"host_checks",axis:0,unit:"H"},{name:"service_checks",axis:0,unit:"S"}],this.desc=i,this.last=[];var r;for(r=0;r<i.topics.length;r++){this.last[i.topics[r]]=[];var h;for(h=0;h<this.lines.length;h++)this.last[i.topics[r]][h]=[]}this.chart=new t(a,e,this.opts,this.lines)};return e.prototype.handleUpdate=function(s,t){var e;try{e=JSON.parse(t)}catch(i){return void a.debug("[Nagios/Chart-OMDChecks] JSON error in performance data: "+i.message)}var l;for(l=0;l<this.lines.length;l++){this.last[s][l].val=0,this.last[s][l].state=0;var r=parseFloat(e.perf_data[this.lines[l].name].val);isNaN(r)||(this.last[s][l].val=r);try{this.last[s][l].state=e.state}catch(h){a.debug("[Nagios/Chart-OMDChecks] Error processing state data: "+h.message)}}var n=[],c=0;for(l=0;l<this.lines.length;l++){n[l]=0;var o;for(o in this.last){var m=parseFloat(this.last[o][l].val);isNaN(m)&&(m=0),n[l]+=m,c=Math.max(c,this.last[o][l].state)}}this.chart.update(e._timestamp,n,c)},e});
//# sourceMappingURL=dist/js/Chart-OMDChecks.map