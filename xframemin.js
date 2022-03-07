customElements.define("x-frame-bypass",class extends HTMLIFrameElement{constructor(){super()}connectedCallback(){this.load(this.src),this.src="",this.sandbox=""+this.sandbox||"allow-forms allow-modals allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation"}load(t,e){if(!t||!t.startsWith("http"))throw new Error(`X-Frame-Bypass src ${t} does not start with http(s)://`);console.log("X-Frame-Bypass loading:",t),this.srcdoc='<html>\n<head>\n\t<style>\n\t.loader {\n\t\tposition: absolute;\n\t\ttop: calc(50% - 25px);\n\t\tleft: calc(50% - 25px);\n\t\twidth: 50px;\n\t\theight: 50px;\n\t\tbackground-color: #333;\n\t\tborder-radius: 50%;  \n\t\tanimation: loader 1s infinite ease-in-out;\n\t}\n\t@keyframes loader {\n\t\t0% {\n\t\ttransform: scale(0);\n\t\t}\n\t\t100% {\n\t\ttransform: scale(1);\n\t\topacity: 0;\n\t\t}\n\t}\n\t</style>\n</head>\n<body>\n\t<div class="loader"></div>\n</body>\n</html>',this.fetchProxy(t,e,0).then((t=>t.text())).then((e=>{e&&(this.srcdoc=e.replace(/<head([^>]*)>/i,`<head$1>\n\t<base href="${t}">\n\t<script>\n\t// X-Frame-Bypass navigation event handlers\n\tdocument.addEventListener('click', e => {\n\t\tif (frameElement && document.activeElement && document.activeElement.href) {\n\t\t\te.preventDefault()\n\t\t\tframeElement.load(document.activeElement.href)\n\t\t}\n\t})\n\tdocument.addEventListener('submit', e => {\n\t\tif (frameElement && document.activeElement && document.activeElement.form && document.activeElement.form.action) {\n\t\t\te.preventDefault()\n\t\t\tif (document.activeElement.form.method === 'post')\n\t\t\t\tframeElement.load(document.activeElement.form.action, {method: 'post', body: new FormData(document.activeElement.form)})\n\t\t\telse\n\t\t\t\tframeElement.load(document.activeElement.form.action + '?' + new URLSearchParams(new FormData(document.activeElement.form)))\n\t\t}\n\t})\n\t<\/script>`))})).catch((t=>console.error("Cannot load X-Frame-Bypass:",t)))}fetchProxy(t,e,n){const o=["https://cors.io/?","https://jsonp.afeld.me/?url=","https://cors-anywhere.herokuapp.com/"];return fetch(o[n]+t,e).then((t=>{if(!t.ok)throw new Error(`${t.status} ${t.statusText}`);return t})).catch((a=>{if(n===o.length-1)throw a;return this.fetchProxy(t,e,n+1)}))}},{extends:"iframe"});
