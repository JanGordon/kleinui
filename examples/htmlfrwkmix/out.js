(()=>{function E(n){return typeof n=="string"?new N(n):n}function v(n){n.changes=[],n.htmlNode.style.cssText=n.styles.join(`
`),n.updateDimensions(),n.htmlNode.className=n.classes.join(" ");for(let e of n.styleGroups)n.htmlNode.classList.add(e.className);y(n.styleGroups);for(let e of n.children)e.htmlNode||e.textNode?e.rerender():e.render(n.htmlNode)}function r(n,e){n.updateDimensionsBlindly(),n.htmlNode=e,n.htmlNode.style.cssText=n.styles.join(`
`);for(let t of n.changes)t();n.changes=[];for(let t of n.onMountQueue)t();n.onMountQueue=[]}var h=class{constructor(...e){this.onMountQueue=[];this.nodeType=0;this.styles=[];this.styleGroups=[];this.flag=new Map([]);this.classes=[];this.changes=[];this.children=[];this.width=-1;this.height=-1;for(let t of e){let i=E(t);i.parent=this,this.changes.push(()=>{i.render(this.htmlNode)}),this.children.push(i)}}setFlag(e,t){return this.flag.set(e,t),this}addClass(e){return this.changes.push(()=>{this.htmlNode.classList.add(e)}),this.classes.indexOf(e)==-1&&this.classes.push(e),this}hasClass(e){return this.htmlNode?this.htmlNode.classList.contains(e):!1}toggleClass(e){this.changes.push(()=>{this.htmlNode.classList.toggle(e)});let t=this.classes.indexOf(e);return t==-1?this.classes.push(e):this.classes.splice(t),this}removeClass(e){this.changes.push(()=>{this.htmlNode.classList.remove(e)});let t=this.classes.indexOf(e);return t!=-1&&this.classes.splice(t),this}addStyle(e){return this.styles.push(e),this.changes.push(()=>{this.htmlNode.style.cssText+=e}),this}addToStyleGroup(e){return this.changes.push(()=>{this.htmlNode.classList.add(e.className),y([e])}),this.styleGroups.push(e),e.members.push(this),this}addEventListener(e,t){return this.htmlNode?this.htmlNode.addEventListener(e,i=>t(this,i)):this.onMountQueue.push(()=>{this.htmlNode.addEventListener(e,i=>t(this,i))}),this}addChildren(...e){for(let t of e){let i=E(t);i.parent=this,this.children.push(i),this.changes.push(()=>{i.render(this.htmlNode)})}}removeAllChildren(){this.children=[],this.changes.push(()=>{this.htmlNode.innerHTML=""})}removeChild(e){this.children.splice(this.children.indexOf(e)),this.changes.push(()=>{this.htmlNode.removeChild(e.htmlNode)})}render(e){let t=document.createElement("div");r(this,t),e.appendChild(t)}rerender(){v(this)}updateDimensions(){a(this,!0),this.updateDimensionsBlindly()}updateDimensionsBlindly(){let e=()=>{this.width>0&&(this.htmlNode.style.width=this.width+"px"),this.height>0&&(this.htmlNode.style.height=this.height+"px")};this.htmlNode?e():this.onMountQueue.push(e);for(let t of this.children)t.updateDimensionsBlindly()}setWidth(e,t){return this.widthExpression=e,this}getWidth(){return this.width}setHeight(e){return this.heightExpression=e,this}getHeight(){return this.height}lightRerender(){if(this.updateDimensions(),this.htmlNode){for(let e of this.changes)e();this.changes=[]}else console.error("I haven't been rendered yet");for(let e of this.children)e.nodeType==1?e.textNode||(e.render(this.htmlNode),e.changes=[]):e.htmlNode?e.lightRerender():(e.render(this.htmlNode),e.changes=[])}applyLastChange(){this.changes.length>0&&this.changes[this.changes.length-1](),this.changes.pop()}};function a(n,e){let t=[],i=0,c=0,p=[],g=0,f=0,x=[];for(let s of n.children)if(s.nodeType==0){s=s;var o=!1;if(s.widthExpression!=null){let l=s.widthExpression(s);l.lengthOfShared==0?(s.width=l.length,c+=l.length):(o=!0,t.push(s),i+=l.lengthOfShared)}if(s.heightExpression!=null){let l=s.heightExpression(s);l.lengthOfShared==0?(s.height=l.length,f+=l.length):(o=!0,p.push(s),g+=l.lengthOfShared)}o?x.push(s):e&&a(s,!0)}let T=(n.width-c)/i;for(let s of t)s.width=s.widthExpression(s).lengthOfShared*T;let C=(n.height-f)/g;for(let s of p)s.height=s.heightExpression(s).lengthOfShared*C;if(e)for(let s of x)a(s,!0)}var N=class extends h{constructor(e){super();this.nodeType=1;this.content=e}render(e){let t=document.createTextNode(this.content);this.textNode=t,e.appendChild(t)}rerender(){this.textNode.data=this.content}},d=[];function y(n){for(let t of n){var e=!1;for(let i=0;i<d.length;i++)t==d[i]&&(t.checksum!=d[i].checksum&&(document.head.querySelector(`#${t.className}`).innerHTML=t.getCss()),e=!0);if(!e){let i=document.createElement("style");i.id=t.className,i.innerHTML=t.getCss(),document.head.appendChild(i),d.push(t)}}}function L(n,e){n.addStyle("width: 100%; overflow: hidden;"),n.updateDimensions(),e.style.overflow="hidden",n.render(e)}var m=class extends h{constructor(){super(...arguments);this.name="container"}render(e){let t=document.createElement("div");r(this,t),e.appendChild(t)}};var u=class extends h{constructor(){super(...arguments);this.name="textInput"}render(e){let t=document.createElement("input");t.type="text",r(this,t),e.appendChild(t)}setValue(e){return this.changes.push(()=>{this.htmlNode.value=e}),this}};var H=new m(new u().addEventListener("click",n=>{n.setValue("ey up there").applyLastChange()})).addStyle("width: 100%; height: 100%;");L(H,document.getElementById("calendar"));})();