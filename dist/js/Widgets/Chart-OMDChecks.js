define(["snmd-core/js/SVGWidget","snmd-core/js/SVGImpl/Chart","snmd-widgets-nagios/js/Utils","js-logger"],function(s,t,a,i){"use strict";var e=function(i,e,l){if(this.opts={title:"OMD Check Rate",axis:[{max:200,scale:"linear"}],desc:l,dpi:.2,cls:s.srClassOpts(l,"Chart"),lcls:["snmd-lcl-Nag","snmd-lcl-NagOMD","snmd-lcl-NagOMDChecks"],mcls:["snmd-mcl-Nag","snmd-mcl-NagOMD","snmd-mcl-NagOMDChecks"],tcls:["snmd-tcl-Nag","snmd-tcl-NagOMD","snmd-tcl-NagOMDChecks"]},void 0!==l.max){var r=parseFloat(l.max);isNaN(r)||(this.opts.axis[0].max=r)}this.lines=[{name:"host_checks",axis:0,unit:"H"},{name:"service_checks",axis:0,unit:"S"}],this.desc=l,this.last=[];var n;for(n=0;n<l.topics.length;n++){this.last[l.topics[n]]=[];var h;for(h=0;h<this.lines.length;h++)this.last[l.topics[n]][h]=[]}this.chart=new t(i,e,this.opts,this.lines,a.qTipConfig(this,this.lines.map(function(s){return s.name})))};return e.prototype.handleUpdate=function(s,t){var e;try{e=JSON.parse(t)}catch(s){return void i.debug("[Nagios/Chart-OMDChecks] JSON error in performance data: "+s.message)}a.qTipUpdate(s,e,this);var l;for(l=0;l<this.lines.length;l++){this.last[s][l].val=0,this.last[s][l].state=0;var r=parseFloat(e.perf_data[this.lines[l].name].val);isNaN(r)||(this.last[s][l].val=r);try{this.last[s][l].state=e.state}catch(s){i.debug("[Nagios/Chart-OMDChecks] Error processing state data: "+s.message)}}var n=[],h=0;for(l=0;l<this.lines.length;l++){n[l]=0;var c;for(c in this.last){var o=parseFloat(this.last[c][l].val);isNaN(o)&&(o=0),n[l]+=o,h=Math.max(h,this.last[c][l].state)}}this.chart.update(e._timestamp,n,h)},e});