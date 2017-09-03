define(["snmd-core/js/SVGWidget","snmd-core/js/SVGImpl/Chart","snmd-widgets-nagios/js/Utils","js-logger"],function(t,s,a,e){"use strict";var i=function(e,i,r){this.opts={title:"Interface Packet Rate",axis:[{max:297619.2,scale:"linear"}],desc:r,dpi:.2,cls:t.srClassOpts(r,"Chart"),lcls:["snmd-lcl-Nag","snmd-lcl-NagIf","snmd-lcl-NagIfPr"],mcls:["snmd-mcl-Nag","snmd-mcl-NagIf","snmd-mcl-NagIfPr"],tcls:["snmd-tcl-Nag","snmd-tcl-NagIf","snmd-tcl-NagIfPr"]};var n,l,c=0;for(n=0;n<r.topics.length;n++){var h=new RegExp("Interface (.*Ethernet|POS)").exec(r.topics[n]);if(h&&h[1])switch(h[1]){case"TenGigabitEthernet":c=(l=194100)>c?l:c;break;case"GigabitEthernet":c=(l=19410)>c?l:c;break;case"POS":c=(l=31*97.05)>c?l:c;break;case"FastEthernet":c=(l=1941)>c?l:c;break;case"Ethernet":c=(l=194.1)>c?l:c;break;default:c=(l=this.opts.axis[0].max)>c?l:c}else c+=this.opts.axis[0].max}for(this.opts.axis[0].max=c,void 0!==r.max&&(l=parseFloat(r.max),isNaN(l)||(this.opts.axis[0].max=l)),this.lines=[{name:"inucast",axis:0,unit:"p"},{name:"outucast",axis:0,unit:"p"}],this.desc=r,this.last=[],n=0;n<r.topics.length;n++){this.last[r.topics[n]]=[];var o;for(o=0;o<this.lines.length;o++)this.last[r.topics[n]][o]=[]}this.chart=new s(e,i,this.opts,this.lines,a.qTipConfig(this,this.lines.map(function(t){return t.name})))};return i.prototype.handleUpdate=function(t,s){var i;try{i=JSON.parse(s)}catch(t){return void e.debug("[Nagios/Chart-IfPr] JSON error in performance data: "+t.message)}a.qTipUpdate(t,i,this);var r;for(r=0;r<this.lines.length;r++){this.last[t][r].val=0,this.last[t][r].state=0;try{this.last[t][r].val=i.perf_data[this.lines[r].name].val}catch(t){}try{this.last[t][r].state=i.state}catch(t){e.debug("[Nagios/Chart-IfPr] Error processing state data: "+t.message)}}var n=[],l=0;for(r=0;r<this.lines.length;r++){n[r]=0;var c;for(c in this.last){var h=parseFloat(this.last[c][r].val);isNaN(h)&&(h=0),n[r]+=h,l=Math.max(l,this.last[c][r].state)}}this.chart.update(i._timestamp,n,l)},i});