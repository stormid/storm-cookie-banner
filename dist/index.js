var t=window.PointerEvent?["pointerup","keydown"]:["ontouchstart"in window?"touchstart":"click","keydown"],e=[13,32],n=function(t){document.cookie=[t.settings.name+"="+JSON.stringify(t.consent)+";","expires="+new Date((new Date).getTime()+24*t.settings.expiry*60*60*1e3).toGMTString()+";",t.settings.path?"path="+t.settings.path+";":"",t.settings.domain?"domain="+t.settings.domain+";":"",t.settings.secure?"secure;":""].join("")},s=function(t){document.cookie.split("; ").map(function(t){return{name:t.split("=")[0],value:t.split("=")[1],expiry:"Thu, 01 Jan 1970 00:00:01 GMT"}}).map(function(t){return function(e){return document.cookie=[e.name+"="+e.value+";","expires="+e.expiry+";","path="+t.settings.path+";",t.settings.domain?"domain="+t.settings.domain+";":"",t.settings.secure?"secure":""].join("")}}(t))},a=function(t){return function(e,n){return e[n]=e[n]?Object.assign({},e[n],{fns:e[n].fns.concat(t.types[n].fns)}):t.types[n],e}},i=function(){},r=function(t){return/radio|checkbox/i.test(t.type)},c=function(t,e){return!r(e)&&function(t){return null!=t.value&&t.value.length>0}(e)&&(t=e.value),r(e)&&e.checked&&(Array.isArray(t)?t.push(e.value):t=[e.value]),t},o="ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|be|bf|bg|bh|bi|bj|bm|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|cl|cm|cn|co|cr|cu|cv|cw|cx|cz|de|dj|dk|dm|do|dz|ec|ee|eg|es|et|eu|fi|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|im|in|io|iq|ir|is|it|je|jo|jp|kg|ki|km|kn|kp|kr|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|na|nc|ne|nf|ng|nl|no|nr|nu|nz|om|pa|pe|pf|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sx|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|yt".split("|"),l="azurewebsites|com|edu|gov|net|mil|org|nom|sch|caa|res|off|gob|int|tur|ip6|uri|urn|asn|act|nsw|qld|tas|vic|pro|biz|adm|adv|agr|arq|art|ato|bio|bmd|cim|cng|cnt|ecn|eco|emp|eng|esp|etc|eti|far|fnd|fot|fst|g12|ggf|imb|ind|inf|jor|jus|leg|lel|mat|med|mus|not|ntr|odo|ppg|psc|psi|qsl|rec|slg|srv|teo|tmp|trd|vet|zlg|web|ltd|sld|pol|fin|k12|lib|pri|aip|fie|eun|sci|prd|cci|pvt|mod|idv|rel|sex|gen|nic|abr|bas|cal|cam|emr|fvg|laz|lig|lom|mar|mol|pmn|pug|sar|sic|taa|tos|umb|vao|vda|ven|mie|北海道|和歌山|神奈川|鹿児島|ass|rep|tra|per|ngo|soc|grp|plc|its|air|and|bus|can|ddr|jfk|mad|nrw|nyc|ski|spy|tcm|ulm|usa|war|fhs|vgs|dep|eid|fet|fla|flå|gol|hof|hol|sel|vik|cri|iwi|ing|abo|fam|gok|gon|gop|gos|aid|atm|gsm|sos|elk|waw|est|aca|bar|cpa|jur|law|sec|plo|www|bir|cbg|jar|khv|msk|nov|nsk|ptz|rnd|spb|stv|tom|tsk|udm|vrn|cmw|kms|nkz|snz|pub|fhv|red|ens|nat|rns|rnu|bbs|tel|bel|kep|nhs|dni|fed|isa|nsn|gub|e12|tec|орг|обр|упр|alt|nis|jpn|mex|ath|iki|nid|gda|inc".split("|"),u={name:".CookiePreferences",path:"",domain:"localhost"===window.location.hostname?"":"."+function(t){for(var e=(t=t.replace(/^www\./,"")).split(".");e.length>3;)e.shift();return 3===e.length&&-1===l.indexOf(e[1])&&-1===o.indexOf(e[2])&&e.shift(),e.join(".")}(window.location.hostname),secure:!0,expiry:365,types:{},necessary:[],bannerTrigger:!1,policyURL:"/cookie-policy",classNames:{banner:"privacy-banner",acceptBtn:"privacy-banner__accept",submitBtn:"privacy-banner__submit",field:"privacy-banner__field",form:"privacy-banner__form",fieldset:"privacy-banner__fieldset",legend:"privacy-banner__legend",formContainer:"privacy-banner__form-container",formMessage:"privacy-banner__form-msg",title:"privacy-banner__form-title",description:"privacy-banner__form-description"},savedMessage:"Your settings have been saved.",bannerTemplate:function(t){return'<section role="dialog" aria-live="polite" aria-label="You privacy" class="'+t.classNames.banner+'">\n\t\t\t<div class="privacy-content">\n\t\t\t\t<div class="wrap">\n\t\t\t\t\t<div class="row">\n\t\t\t\t\t\t\x3c!--googleoff: all--\x3e\n\t\t\t\t\t\t<div class="privacy-banner__title">Cookies</div>\n\t\t\t\t\t\t<p>We use cookies to improve your experience on our site and show you personalised advertising.</p>\n\t\t\t\t\t\t<p>Find out more from our <a class="privacy-banner__link" rel="noopener noreferrer nofollow" href="/privacy-policy">privacy policy</a> and <a class="privacy-banner__link" rel="noopener noreferrer nofollow" href="'+t.policyURL+'">cookie policy</a>.</p>\n\t\t\t\t\t\t<button class="btn btn--primary '+t.classNames.acceptBtn+'">Accept and close</button>\n\t\t\t\t\t\t<a class="privacy-banner__link" rel="noopener noreferrer nofollow" href="'+t.policyURL+'">Your options</a>\n\t\t\t\t\t\t\x3c!--googleon: all--\x3e\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</section>'},messageTemplate:function(t){return'<div class="'+t.settings.classNames.formMessage+'" aria-role="alert">'+t.settings.savedMessage+"</div>"},formTemplate:function(t){return'<form class="'+t.settings.classNames.form+'" novalidate>\n\t\t\t\t'+Object.keys(t.settings.types).map(function(e){return'<fieldset class="'+t.settings.classNames.fieldset+'">\n\t\t\t\t<legend class="'+t.settings.classNames.legend+'">\n\t\t\t\t\t<span class="'+t.settings.classNames.title+'">'+t.settings.types[e].title+'</span>\n\t\t\t\t\t<span class="'+t.settings.classNames.description+'">'+t.settings.types[e].description+'</span>\n\t\t\t\t</legend>\n\t\t\t\t<div class="form-row">\n\t\t\t\t\t<div class="relative">\n\t\t\t\t\t\t<label class="privacy-banner__label">\n\t\t\t\t\t\t\t<input\n\t\t\t\t\t\t\t\tclass="'+t.settings.classNames.field+'"\n\t\t\t\t\t\t\t\ttype="radio"\n\t\t\t\t\t\t\t\tname="privacy-'+e.split(" ")[0].replace(" ","-")+'"\n\t\t\t\t\t\t\t\tvalue="1"\n\t\t\t\t\t\t\t\t'+(1===t.consent[e]?" checked":"")+'>\n\t\t\t\t\t\t\t<span class="privacy-banner__label-text">I am OK with this</span>\n\t\t\t\t\t\t\t<span class="privacy-banner__label-description">'+t.settings.types[e].labels.yes+'</span>\n\t\t\t\t\t\t</label>    \n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="form-row">\n\t\t\t\t\t<div class="relative">\n\t\t\t\t\t\t<label class="privacy-banner__label">\n\t\t\t\t\t\t\t<input\n\t\t\t\t\t\t\t\tclass="'+t.settings.classNames.field+'"\n\t\t\t\t\t\t\t\ttype="radio"\n\t\t\t\t\t\t\t\tname="privacy-'+e.split(" ")[0].replace(" ","-")+'"\n\t\t\t\t\t\t\t\tvalue="0"\n\t\t\t\t\t\t\t\t'+(0===t.consent[e]?" checked":"")+'>\n\t\t\t\t\t\t\t<span class="privacy-banner__label-text">No thank you</span>\n\t\t\t\t\t\t\t<span class="privacy-banner__label-description">'+t.settings.types[e].labels.no+"</span>\n\t\t\t\t\t\t</label>    \n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</fieldset>"}).join("")+'\n\t\t\t<button class="'+t.settings.classNames.submitBtn+'"'+(0===Object.keys(t.consent).length?" disabled":"")+">Save my settings</button>\n\t\t</form>"}},p=function(t,e){return Object.assign({},t,e)},d=function(t,e){return Object.assign({},t,{consent:Object.assign({},t.consent,e)})},m=function(t,e){return Object.assign({},t,{settings:Object.assign({},t.settings,{types:Object.assign({},t.settings.types,e)})})},g=function(t){return function(e){Object.keys(e.consent).forEach(function(t){!0!==e.settings.types[t].executed&&e.consent[t]&&Boolean(e.consent[t])&&e.settings.types[t].fns.forEach(function(t){return t(e)})}),t.update(m,Object.keys(e.settings.types).reduce(function(t,n){return t[n]=Object.assign({},e.settings.types[n],{executed:e.settings.types[n].executed||e.consent[n]&&Boolean(e.consent[n])}),t},{}))}},f=function(t){t.settings.necessary.forEach(function(e){return e(t)})},b=function(s){return function(a){document.body.firstElementChild.insertAdjacentHTML("beforebegin",a.settings.bannerTemplate(a.settings));var i=document.querySelector("."+a.settings.classNames.banner),r=document.querySelector("."+a.settings.classNames.acceptBtn);t.forEach(function(t){r.addEventListener(t,function(t){(function(t){return!!t.keyCode&&!~e.indexOf(t.keyCode)||t.which&&3===t.which})(t)||s.update(d,Object.keys(a.settings.types).reduce(function(t,e){return t[e]=1,t},{}),[n,g(s),v(i),y(s)])})})}},v=function(t){return function(){return t&&t.parentNode&&t.parentNode.removeChild(t)}},y=function(t){return function(e){var a=document.querySelector("."+e.settings.classNames.formContainer);if(a){a.innerHTML=e.settings.formTemplate(e);var i=document.querySelector("."+e.settings.classNames.form),r=document.querySelector("."+e.settings.classNames.banner),o=document.querySelector("."+e.settings.classNames.submitBtn),l=[].slice.call(document.querySelectorAll("."+e.settings.classNames.field)).reduce(function(t,e){var n=e.getAttribute("name").replace("privacy-","");return t[n]?t[n].push(e):t[n]=[e],t},{}),u=function(){return Object.keys(l).reduce(function(t,e){var n=l[e].reduce(c,"");return n&&(t[e]=parseInt(n)),t},{})},p=function(t){Object.keys(u()).length===Object.keys(l).length&&(o.removeAttribute("disabled"),i.removeEventListener("change",p))};o.hasAttribute("disabled")&&i.addEventListener("change",p),i.addEventListener("submit",function(e){e.preventDefault(),t.update(d,u(),[s,n,g(t),v(r),h(o)])})}}},h=function(t){return function(e){t.insertAdjacentHTML("afterend",e.settings.messageTemplate(e)),t.setAttribute("disabled","disabled"),window.setTimeout(function(){t.parentNode.removeChild(t.nextElementSibling),t.removeAttribute("disabled")},3e3)}};module.exports={init:function(t){return function(t){if(function(){try{document.cookie="cookietest=1";var t=-1!==document.cookie.indexOf("cookietest=");return document.cookie="cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT",t}catch(t){return!1}}()){var e,n=(e={},{update:function(t,n,s){e=t(e,n),s&&s.forEach(function(t){t(e)})},getState:function(){return e}}),s=function(t){var e=document.cookie.split("; ").map(function(t){return{name:t.split("=")[0],value:t.split("=")[1]}}).filter(function(e){return e.name===t.name})[0];return void 0!==e&&e}(t);return n.update(p,{settings:t,consent:s?JSON.parse(s.value):{}},[f,g(n),s?i:b(n),y(n)]),{getState:n.getState}}}(Object.assign({},u,t,{types:Object.keys(t.types).reduce(a(t),u.types)}))}};
//# sourceMappingURL=index.js.map
