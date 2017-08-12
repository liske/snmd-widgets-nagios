define(["snmd-core/js/SVGWidget","snmd-core/js/SVGImpl/Chart","snmd-widgets-nagios/js/Utils","js-logger"],function(s,t,i,a){"use strict";var l=function(a,l,e){this.opts={axis:[{max:100,scale:"linear"}],fill:"white",desc:e,dpi:.2,cls:s.srClassOpts(e,"Chart"),lcls:["snmd-lcl-Nag","snmd-lcl-NagDisk","snmd-lcl-NagDiskUtil"],mcls:["snmd-mcl-Nag","snmd-mcl-NagDisk","snmd-mcl-NagDiskUtil"],tcls:["snmd-tcl-Nag","snmd-tcl-NagDisk","snmd-tcl-NagDiskUtil"]},this.lines=[{name:"disk_utilization",axis:0,unit:"%"}],this.desc=e,this.last=[];var n;for(n=0;n<e.topics.length;n++){this.last[e.topics[n]]=[];var r;for(r=0;r<this.lines.length;r++)this.last[e.topics[n]][r]=[]}this.chart=new t(a,l,this.opts,this.lines,i.qTipConfig("Disk Utilization",this))};return l.prototype.handleUpdate=function(s,t){var l;try{l=JSON.parse(t)}catch(e){return void a.debug("[Nagios/Chart-DiskUtil] JSON error in performance data: "+e.message)}i.qTipUpdate(l,this);var n;for(n=0;n<this.lines.length;n++){this.last[s][n].val=0,this.last[s][n].state=0;try{this.last[s][n].val=l.perf_data[this.lines[n].name].val,this.last[s][n].state=l.state}catch(r){a.debug("[Nagios/Chart-DiskUtil] Error processing performance data of "+this.lines[n].name+": "+r.message)}}var h=[],c=0;for(n=0;n<this.lines.length;n++){h[n]=0;var o;for(o in this.last){var d=parseFloat(this.last[o][n].val);isNaN(d)&&(d=0),h[n]+=100*d,c=Math.max(c,this.last[o][n].state)}}this.chart.update(l._timestamp,h,c)},l});
//# sourceMappingURL=dist/js/Chart-DiskUtil.map