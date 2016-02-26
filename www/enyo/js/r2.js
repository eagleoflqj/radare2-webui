function asyncLoop(a,b,c){var d=0,e=!1,f={next:function(){e||(a>d?(d++,b(f)):(e=!0,c()))},iteration:function(){return d-1},"break":function(){e=!0,c()}};return f.next(),f}function dump(a){var b="";for(var c in a)b+=c+"\n";alert(b)}function objtostr(a){var b="";for(var c in a)b+=c+": "+a[c]+",\n";return b}function Ajax(a,b,c,d){if("undefined"==typeof XMLHttpRequest)return!1;var e=new XMLHttpRequest;return e?(e.open(a,b,!1),e.setRequestHeader("Accept","text/plain"),e.setRequestHeader("Accept","text/html"),e.setRequestHeader("Content-Type","application/x-ww-form-urlencoded; charset=UTF-8"),e.onreadystatechange=function(a){200==e.status?d&&d(e.responseText):console.error("ajax "+e.status)},e.send(c),!0):!1}function _internal_cmd(a,b){if("undefined"!=typeof r2cmd&&(hascmd=r2cmd),hascmd){if("undefined"==typeof r2plugin)return hascmd(a,b);b(r2cmd(a))}else Ajax("GET",r2.root+"/cmd/"+encodeURI(a),"",function(a){b&&b(a)})}var r2={},backward=!1,next_curoff=0,next_lastoff=0,prev_curoff=0,prev_lastoff=0,hascmd=!1;"undefined"!=typeof module&&(module.exports=function(a){return hascmd="function"==typeof a?a:a.cmd,r2}),r2.project_name="",r2.plugin=function(){console.error("r2.plugin is not available in this environment")};try{r2plugin&&(r2.plugin=r2plugin)}catch(e){}r2.root="",r2.analAll=function(){r2.cmd("aa",function(){})},r2.analOp=function(a,b){r2.cmd("aoj 1 @ "+a,function(a){try{b(JSON.parse(a)[0])}catch(c){console.error(c),b(a)}})},r2.varMap=[],r2.argMap=[],r2.assemble=function(a,b,c){var d=a?"@"+a:"";r2.cmd('"pa '+b+'"'+d,c)},r2.disassemble=function(a,b,c){var d=a?"@"+a:"",e="pi @b:"+b+d;r2.cmd(e,c)},r2.get_hexdump=function(a,b,c){r2.cmd("px "+b+"@"+a,c)},r2.get_disasm=function(a,b,c){r2.cmd("pD "+b+"@"+a,c)},r2.get_disasm_before=function(a,b,c){var d=[];r2.cmd("pdj -"+b+"@"+a,function(a){d=JSON.parse(a)}),c(d)},r2.get_disasm_after=function(a,b,c){var d=[];r2.cmd("pdj "+b+"@"+a,function(a){d=JSON.parse(a)}),c(d)},r2.get_disasm_before_after=function(a,b,c,d){var e=[],f=[];r2.cmd("pdj "+b+" @"+a,function(a){e=JSON.parse(a)}),r2.cmd("pdj "+c+"@"+a,function(a){f=JSON.parse(a)});var g=e.concat(f);d(g)},r2.Config=function(a,b,c){return"function"!=typeof b&&b?r2.cmd("e "+a+"="+b,c):r2.cmd("e "+a,c||b),r2},r2.sections={},r2.load_mmap=function(){r2.cmdj("iSj",function(a){void 0!==a&&null!==a&&(r2.sections=a)})},r2.get_address_type=function(a){var b=parseInt(a,16);for(var c in r2.sections)if(b>=r2.sections[c].addr&&b<r2.sections[c].addr+r2.sections[c].size)return r2.sections[c].flags.indexOf("x")>-1?"instruction":"memory";return""},r2.settings={},r2.load_settings=function(){r2.cmd("e asm.arch",function(a){r2.settings["asm.arch"]=a.trim()}),r2.cmd("e asm.bits",function(a){r2.settings["asm.bits"]=a.trim()}),r2.cmd("e asm.bytes",function(a){r2.settings["asm.bytes"]=toBoolean(a.trim())}),r2.cmd("e asm.flags",function(a){r2.settings["asm.flags"]=toBoolean(a.trim())}),r2.cmd("e asm.offset",function(a){r2.settings["asm.offset"]=toBoolean(a.trim())}),r2.cmd("e asm.lines",function(a){r2.settings["asm.lines"]=toBoolean(a.trim())}),r2.cmd("e asm.xrefs",function(a){r2.settings["asm.xrefs"]=toBoolean(a.trim())}),r2.cmd("e asm.cmtright",function(a){r2.settings["asm.cmtright"]=toBoolean(a.trim())}),r2.cmd("e asm.pseudo",function(a){r2.settings["asm.pseudo"]=toBoolean(a.trim())})},r2.flags={},r2.update_flags=function(){r2.cmd("fs *;fj",function(a){var b=JSON.parse(a);if(void 0!==b&&null!==b){r2.flags={};for(var c in b){var d="0x"+b[c].offset.toString(16);if(d=address_canonicalize(d),d in r2.flags){var e=r2.flags[d];e[e.length]={name:b[c].name,size:b[c].size},r2.flags[d]=e}else r2.flags[d]=[{name:b[c].name,size:b[c].size}]}}})},r2.get_flag_address=function(a){for(var b in r2.flags)for(var c in r2.flags[b])if(a==r2.flags[b][c].name)return b;return null},r2.get_flag_names=function(a){var b=[];for(var c in r2.flags[a])b[b.length]=r2.flags[a][c].name;return b},r2.set_flag_space=function(a,b){r2.cmd("fs "+a,b)},r2.get_flags=function(a){r2.cmd("fj",function(b){a(b?JSON.parse(b):[])})},r2.get_opcodes=function(a,b,c){r2.cmd("pdj @"+a+"!"+b,function(a){c(JSON.parse(a))})},r2.get_bytes=function(a,b,c){r2.cmd("pcj @"+a+"!"+b,function(a){c(JSON.parse(a))})},r2.asm_config={},r2.store_asm_config=function(){config={},r2.cmd("e",function(a){conf=a.split("\n");for(var b in conf){var c=conf[b].split(" ");3==c.length&&0==c[0].trim().indexOf("asm.")&&(config[c[0].trim()]=c[2].trim())}r2.asm_config=config})},r2.restore_asm_config=function(){cmd="";for(var a in r2.asm_config)cmd+="e "+a+"="+r2.asm_config[a]+";";r2.cmd(cmd,function(a){})},r2.get_info=function(a){r2.cmd("ij",function(b){a(JSON.parse(b))})},r2.bin_relocs=function(a){r2.cmd("irj",function(b){a(JSON.parse(b))})},r2.bin_imports=function(a){r2.cmd("iij",function(b){a(JSON.parse(b))})},r2.bin_symbols=function(a){r2.cmd("isj",function(b){a(JSON.parse(b))})},r2.bin_sections=function(a){r2.cmd("iSj",function(b){a(JSON.parse(b))})},r2.cmds=function(a,b){function c(){void 0!=d&&0!=a.length&&(d=a[0],a=a.splice(1),r2.cmd(d,c),b&&b())}if(0!=a.length){var d=a[0];a=a.splice(1),r2.cmd(d,c)}},r2.cmd=function(a,b){if(Array.isArray(a)){var c=[],d=0;asyncLoop(a.length,function(b){_internal_cmd(a[d],function(a){d=b.iteration(),c[d]=a.replace(/\n$/,""),d++,b.next()})},function(){b(c)})}else _internal_cmd(a,b)},r2.cmdj=function(a,b){r2.cmd(a,function(a){try{b(JSON.parse(a))}catch(c){b(null)}})},r2.alive=function(a){r2.cmd("b",function(b){var c=!1;b&&b.length()>0&&(c=!0),a&&a(b)})},r2.getTextLogger=function(a){return"object"!=typeof a&&(a={}),a.last=0,a.events={},a.interval=null,r2.cmd("Tl",function(b){a.last=+b}),a.load=function(b){r2.cmd("Tj "+(a.last+1),function(a){b&&b(JSON.parse(a))})},a.clear=function(a){r2.cmd("T-",a)},a.send=function(a,b){r2.cmd("T "+a,b)},a.refresh=function(b){a.load(function(c){for(var d=0;d<c.length;d++){var e=c[d];a.events.message({id:e[0],text:e[1]}),e[0]>a.last&&(a.last=e[0])}b&&b()})},a.autorefresh=function(b){function c(){return a.refresh(function(){}),"Logs"===r2ui.selected_panel?setTimeout(c,1e3*b):console.log("Not in logs :("),!0}return b?void(a.interval=setTimeout(c,1e3*b)):void(a.interval&&a.interval.stop())},a.on=function(b,c){return a.events[b]=c,a},a},r2.filter_asm=function(a,b){function c(a){return"p"==a[0]&&"d"==a[1]?!0:-1!=a.indexOf(";pd")}var d=backward?prev_curoff:next_curoff,e=backward?prev_lastoff:next_lastoff,f=a.split(/\n/g);r2.cmd("s",function(a){d=a});for(var g=f.length-1;g>0;g--){var h=f[g].match(/0x([a-fA-F0-9]+)/);if(h&&h.length>0){e=h[0].replace(/:/g,"");break}}if("afl"==b){for(var i="",g=0;g<f.length;g++){var j=f[g].replace(/\ +/g," ").split(/ /g);i+=j[0]+"  "+j[3]+"\n"}a=i}else if("f"==b[0]){if("s"==b[1]){for(var i="",g=0;g<f.length;g++){var j=f[g].replace(/\ +/g," ").split(/ /g),k="*"==j[1]?"*":" ",l=j[2]?j[2]:j[1];l&&(i+=j[0]+" "+k+" <a href=\"javascript:runcmd('fs "+l+"')\">"+l+"</a>\n")}a=i}}else if("i"==b[0]&&b[1]){for(var i="",g=0;g<f.length;g++){for(var m=f[g].split(/ /g),n="",o="",p=0;p<m.length;p++){var q=m[p].split(/=/);"addr"==q[0]&&(o=q[1]),"name"==q[0]&&(n=q[1]),"string"==q[0]&&(n=q[1])}i+=o+"  "+n+"\n"}a=i}return c(b)&&(a=a.replace(/function:/g,"<span style=color:green>function:</span>"),a=a.replace(/;(\s+)/g,";"),a=a.replace(/;(.*)/g,"// <span style='color:#209020'>$1</span>"),a=a.replace(/(bl|goto|call)/g,"<b style='color:green'>call</b>"),a=a.replace(/(jmp|bne|beq|js|jnz|jae|jge|jbe|jg|je|jl|jz|jb|ja|jne)/g,"<b style='color:green'>$1</b>"),a=a.replace(/(dword|qword|word|byte|movzx|movsxd|cmovz|mov\ |lea\ )/g,"<b style='color:#1070d0'>$1</b>"),a=a.replace(/(hlt|leave|iretd|retn|ret)/g,"<b style='color:red'>$1</b>"),a=a.replace(/(add|sbb|sub|mul|div|shl|shr|and|not|xor|inc|dec|sar|sal)/g,"<b style='color:#d06010'>$1</b>"),a=a.replace(/(push|pop)/g,"<b style='color:#40a010'>$1</b>"),a=a.replace(/(test|cmp)/g,"<b style='color:#c04080'>$1</b>"),a=a.replace(/(outsd|out|string|invalid|int |int3|trap|main|in)/g,"<b style='color:red'>$1</b>"),a=a.replace(/nop/g,"<b style='color:blue'>nop</b>"),a=a.replace(/(sym|fcn|str|imp|loc)\.([^:<(\\\/ \|)\->]+)/g,"<a href='javascript:r2ui.seek(\"$1.$2\")'>$1.$2</a>")),a=a.replace(/0x([a-zA-Z0-9]+)/g,"<a href='javascript:r2ui.seek(\"0x$1\")'>0x$1</a>"),backward?(prev_curoff=d,prev_lastoff=e):(next_curoff=d,next_lastoff=e,prev_curoff||(prev_curoff=next_curoff)),a};