define(["snmd-core/js/SVGWidget","snmd-core/js/SVGImpl/Chart","snmd-widgets-nagios/js/Utils","js-logger"],function(t,s,a,e){"use strict";var i=function(e,i,r){this.opts={title:"Interface QoS Class",axis:[{max:2e8,scale:"linear"}],desc:r,dpi:.2,cls:t.srClassOpts(r,"Chart"),lcls:["snmd-lcl-Nag","snmd-lcl-NagIf","snmd-lcl-NagIfQoS"],mcls:["snmd-mcl-Nag","snmd-mcl-NagIf","snmd-mcl-NagIfQoS"],tcls:["snmd-tcl-Nag","snmd-tcl-NagIf","snmd-tcl-NagIfQoS"]};var n,l,h=0;for(l=0;l<r.topics.length;l++){var c=new RegExp("Interface (.*Ethernet|POS)").exec(r.topics[l]);if(c&&c[1])switch(c[1]){case"TenGigabitEthernet":h=(n=2e9)>h?n:h;break;case"GigabitEthernet":h=(n=2e8)>h?n:h;break;case"POS":h=(n=31e6)>h?n:h;break;case"FastEthernet":h=(n=2e7)>h?n:h;break;case"Ethernet":h=(n=2e6)>h?n:h;break;default:h=(n=this.opts.axis[0].max)>h?n:h}else h+=this.opts.axis[0].max}for(this.opts.axis[0].max=h,void 0!==r.max&&(n=parseFloat(r.max),isNaN(n)||(this.opts.axis[0].max=n)),this.lines=[{name:"post",axis:0,unit:"b"},{name:"drop",axis:0,unit:"b"}],this.desc=r,this.last=[],l=0;l<r.topics.length;l++){this.last[r.topics[l]]=[];var o;for(o=0;o<this.lines.length;o++)this.last[r.topics[l]][o]=[]}this.chart=new s(e,i,this.opts,this.lines,a.qTipConfig(this,this.lines.map(function(t){return t.name})))};return i.prototype.handleUpdate=function(t,s){var i;try{i=JSON.parse(s)}catch(t){return void e.debug("[Nagios/Chart-IfQoS] JSON error in performance data: "+t.message)}a.qTipUpdate(t,i,this);var r;for(r=0;r<this.lines.length;r++){this.last[t][r].val=0,this.last[t][r].state=0;try{this.last[t][r].val=8*i.perf_data[this.lines[r].name].val}catch(t){}try{this.last[t][r].state=i.state}catch(t){e.debug("[Nagios/Chart-IfQoS] Error processing state data: "+t.message)}}var n=[],l=0;for(r=0;r<this.lines.length;r++){n[r]=0;var h;for(h in this.last){var c=parseFloat(this.last[h][r].val);isNaN(c)&&(c=0),n[r]+=c,l=Math.max(l,this.last[h][r].state)}}this.chart.update(i._timestamp,n,l)},i});