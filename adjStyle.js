var tmoid=null, multi = 0;
! function doStuff() {
	let done = 0;
	function doRemove() {
		document.querySelectorAll('iframe:not(.cp_embed_iframe )')
			.forEach(ifm => { ifm.remove(); done++ });
		document.querySelectorAll('ins.adsbygoogle, ins.adsbyfalcon, #MediaCrazy-AD2, #ats-insert_video-0-wrapper')
			.forEach(ifm => { ifm.remove(); done++ });
		document.querySelectorAll('script[src^="//falcon-asset.pixfs.net/js"]')
			.forEach(ifm => { ifm.remove(); done++ });
		console.log(`Middle ${multi} Done count: ${done}`)
	}

	doRemove()
	if (done != 0) {
		tmoid = setTimeout(doStuff, 500);
		mulit = 0;
	} else if (multi < 30) {
		multi++;
		tmoid = setTimeout(doStuff, 100);
	} else {
		done = 0;
		tmoid && clearTimeout(tmoid);
		let sTxt=[
			'#recommend-topic',
			'.pix-nerd-article',
			'[class^="avividai_you_like"]',
			'[class^="AD2M-Crazy"]',
			'vmfive-ad-box'
		].join(', ')
		document.querySelectorAll(sTxt).forEach(t => { t.remove(); done++});
		console.log('Last Done count:'+done)
	}
}();

function SearchSels(sheetName, sels) {
	if (sheetName.length == 0) {
		var cmpFunc = function(i, sheetName) {
			return !document.styleSheets[i].href;
		};
	} else {
		var cmpFunc = function(i, sheetName) {
			return ( document.styleSheets[i].href && 
					document.styleSheets[i].href.indexOf(sheetName)>=0 );
		}
	}
	let ret = [];
//	var rexN = new RegExp("\\.new-layout ("+sels.sel+")\\s*,\\s*\\.new-layout "+sels.sel+"\\s\\*");
	var rexS = new RegExp(sels.sel, "g");
	var rexT = /\.article\-body p\:not\(\[class\]\)/;
	var rexR = new RegExp("("+sels.prop+"\\s*:\\s*.*?)\\s*"+sels.txt2rm+"\\s*;?\\s*", "g");
	// Search in reverse order
	for (var i = document.styleSheets.length-1; i>=0; i--) {
		if (!cmpFunc(i, sheetName)) continue;

		var rules = document.styleSheets[i].cssRules;
		for (var j = rules.length-1; j>=0; j--) {
			// Remove sels.txt2rm in sels.prop, ie. remove "!important" 
			if (rules[j].selectorText && rules[j].selectorText.match(rexS)) {
				var obj = {};
				obj.ridx = j;
//				if (rules[j].selectorText.match(rexN))
//					obj.sel = rules[j].selectorText.replace(rexN, "$1");
//				else
					obj.sel = rules[j].selectorText;
				obj.oldCSS = rules[j].cssText.replace(/^.*\{\s*(.*)\s*\}/, "$1");
				obj.newCSS = obj.oldCSS.replace(rexR, "$1");
				obj.sheet = rules[j].parentStyleSheet;
				ret.push( obj );
			}
			// Clear CSS of '.article-body p:not([class])'
			if (rules[j].selectorText && rules[j].selectorText.match(rexT)) {
				var obj = {};
				obj.ridx = j;
				obj.sel = rules[j].selectorText;
				obj.oldCSS = rules[j].cssText.replace(/^.*\{\s*(.*)\s*\}/, "$1");
				obj.newCSS = "";
				obj.sheet = rules[j].parentStyleSheet;
				ret.push( obj );
			}
		}
	}
	return ret;
}

var adjStyleRule = function(sheetname, selAry) {
	// Is browser too old?
	if (!document.styleSheets) return [];
	if (!Array.isArray(selAry)) selAry = [selAry];

	var cRules = selAry.map( sels => SearchSels(sheetname, sels) ).flat();

	var xRules = [
	{sel:'*', css:'-webkit-box-sizing:border-box; -moz-box-sizing:border-box; box-sizing:border-box'},
	{sel:'body', css:'font-family:"Microsoft JhengHei", "Heiti TC", "PMingLiU", "MingLiU", "DFKai-SB", "BiauKai", sans-serif'},
	{sel:'.article-content-inner .hljs', css:'line-height:1.25em; padding:.25em'},
	{sel:'.article-content-inner .hljs span', css:'white-space:unset !important'},	// Override default CSS of pixnet mobile
	{sel:'.article-content-inner',   css:'margin: 5px; font-size:16px; line-height:140%; letter-spacing:0.05em; color:#444'},
	{sel:'.article-content-inner *', css:'font-size:inherit'},
	{sel:'.article-content-inner >*:first-child', css:'margin-top:0'}, // Remove top margin of 1st element
	{sel:'.article-content-inner .url', css:'word-break:break-all'},   // Break a long url
	{sel:'.article-content-inner p',    css:'margin-top:0.8em'},
	{sel:'.article-content-inner p.ind-2', css:'text-indent:-2em; padding-left: 2em'},
	{sel:
`.article-content-inner h1,
.article-content-inner h2,
.article-content-inner h3:not([class])`, css:'font-weight:bold; margin:1.2em 0 0; line-height:1.4'},
	{sel:'.article-content-inner h1', css:'font-size:135%; color:#0BA'},
	{sel:'.article-content-inner h2', css:'font-size:125%; color:#0C9'},
	{sel:'.article-content-inner h3', css:'font-size:110%; color:#0D8'},
/*
	{sel:'.article-content-inner ol,' +
		 '.article-content-inner ul', css:'position:relative; padding:0; margin-left:2em; margin-top:0'},
	{sel:'.article-content-inner li', css:'position:relative; padding:0; margin-left:0'},
	{sel:'.article-content-inner ol > li',       css:'list-style:decimal'},
*/
	{sel:'.article-content-inner ol,' +
		 '.article-content-inner ul', css:'margin-top: 0; margin-bottom: 0; padding-left:2em'},
	{sel:'.article-content-inner ul>li',       css:'list-style:square'},
	{sel:'.article-content-inner ul ul>li',    css:'list-style:disc'},
	{sel:'.article-content-inner ul ul ul>li', css:'list-style:circle'},
	{sel:'.article-content-inner ol[type="A"]>li', css:'list-style:upper-alpha'},

	{sel:'.article-content-inner div:has(>table:not(.hljs-ln))', css:'margin:0.8em auto'},
	{sel:'.article-content-inner table', css:'border-collapse:collapse'},
	{sel:'.article-content-inner table caption', css:'white-space:nowrap; font-weight: bold; font-size:135%; line-height:120%'},
	{sel:'.article-content-inner table:not(.hljs-ln)', css:'border:2px solid black; margin: auto; overflow:auto; font-size:75%; line-height:125%'},
	{sel:'.article-content-inner table:not(.hljs-ln) caption', css:'text-align:left; white-space:nowrap; font-weight: bold; font-size:135%; line-height:120%'},
	{sel:'.article-content-inner table:not(.hljs-ln) tr:nth-child(2n)', css:'background-color:#F0F0F0'},
	{sel:'.article-content-inner th', css:'border:1px solid black; padding: 2px; font-weight:bold; text-align:center; color:white; background-color:gray'},
	{sel:'.article-content-inner td', css:'border:1px solid gray; padding: 3px'},
	{sel:'.article-content-inner td.code', css:'white-space:pre'},
	{sel:'.article-content-inner td.cntr', css:'text-align:center'},

	{sel:'.article-content-inner sub,' +
		 '.article-content-inner sup', css:'font-size:70%; line-height: 0'},

	{sel:'.article-content-inner div.code',  css:'font-size:90%; background-color:#F0F0F0; overflow:auto; padding:4px; tab-size:4'},

	{sel:'.article-content-inner',  css:'overflow-wrap:normal'},
	{sel:'.article-content-inner p,' +
		 '.article-content-inner li',  css:'overflow-wrap:break-word'},
//	{sel:'.article-content-inner div.code pre',   css:'white-space:pre; overflow:scroll'},
//	{sel:'.article-content-inner div.code code',  css:'white-space:pre'},
//	{sel:'.article-content-inner div.code span',  css:'word-break:inherit; word-wrap:initial'},

	{sel:'div.quote,' +
		 'div.notes', css:'margin:0.8em 0.75em 0 0; padding:8px; overflow-x:auto'},
	{sel:'div.quote', css:'border:2px solid gray; padding:0 0.5em' },
	{sel:'div.notes', css:'border:1px solid gray; padding:0 0.3em; font-size:82.5%; line-height:150%' },
	{sel:'div.notes > ol,' +
		 'div.notes > ul', css:'margin-left:2.5em'},
	{sel:'div.notes > p:not([class])', css:'padding-left:3.25em'},
	{sel:'div.quote > p:not([class])', css:'text-indent:2em'},
	{sel:'div.notes > p[id]', css:'text-indent:-2.75em; padding-left:3.25em'},
	{sel:'div.quote > p,'+
		 'div.notes > p',  css:'margin: 0.4em 0' },

	{sel:'.article-content-inner .code,'+
		 '.article-content-inner var,' +
		 '.article-content-inner code', css:'font-weight:bold; font-style: normal; font-family: "Ubuntu Mono", Consolas, "Courier New", monospace'},
	{sel:'.article-content-inner td.pre,' +
		 '.article-content-inner var', css:'border: 1px solid #E0E0E0; background-color:#F8F8F8; padding: 1px 4px'},
	{sel:'.article-content-inner a',   css:'color:#369; font-weight:bold'},
	{sel:'.article-content-inner a:hover',   css:'font-weight:bold'},
	{sel:'.article-content-inner hr.segm',   css:'margin:0.8em auto'},
	{sel:'.article-content-inner hr.sect',   css:'line-height:5px; margin:2px auto'},
	{sel:'.article-content-inner hr.sect+p', css:'margin-top:0.4em'},
	{sel:'.article-content-inner hr.db_top', css:'margin:0.8em 0 2px'},
	{sel:'.article-content-inner hr.db_btm', css:'margin:2px 0 0.8em'},
	{sel:'kbd, var', css:'position:relative;'},
	{sel:'del', css:'z-index:10'},
	{sel:'del kbd, del var', css:'z-index:-10'},

	{sel:'.article-content-inner .add', css:'color:navy'},
	{sel:'.article-content-inner .blue', css:'color:blue'},
	{sel:'.article-content-inner .emp, .article-content-inner .red,' +
		 '.article-content-inner .err', css:'color:red'},
	{sel:'.article-content-inner del', css:'padding:0; margin:0; position: relative; top:calc(0.75em + 1px); left: 0; text-decoration:none; display: inline; border-top:calc(0.25em - 1px) double red'},
	{sel:'.article-content-inner del > span.del', css:'padding:0; margin:0; position: relative; top:calc(-0.75em - 1px); left: 0'},

	{sel:'html', css:'scroll-behavior: smooth; scroll-padding-top: 25vh'},
	{sel:'body', css:'counter-reset: fig_cnt'},
	{sel:'.img_row', css:'display:flex; align-content: space-evenly'},
	{sel:'.img_tag', css:'width:100%; margin:0; border:0 solid gray; display:blcok'},	// fix bug of small image does not align center (left instead)
	{sel:'p.img_dsc::before', css:'counter-increment: fig_cnt; content: "圖 " counter(fig_cnt) ". "'},
	{sel:'p.img_dsc', css:'margin:0.2em 0 0.6em 0 !important; font-size:75%; font-weight: bold; line-height:140%; text-align:center'},
	{sel:'p.img_dsc > *', css:'font-size:inherit;'},
	{sel:'p.img_dsc > sub,' +
		 'p.img_dsc > sup', css:'font-size:70%;'},
	{sel:'.img_cel input[type=checkbox]', css:'display: none;'},
	{sel:'input[type=checkbox] + .img_tag, .img_tag:has(input[type=checkbox])', css:'transition: transform 0.25s ease-in-out;'},
	// Zoom in Effect
	{sel:
`input[type=checkbox]:checked + .img_tag[class*=left],
input[type=checkbox]:checked + .img_tag[class*=center],
input[type=checkbox]:checked + .img_tag[class*=right]`, css:'position: relative; z-index:20; transform: scale(2)'},
	{sel:'.whiteborder', css:'padding:8px; border-radius:5px; box-shadow: rgba(100, 100, 111, 0.2) 0px 4px 4px 4px; background-color:#FFF'},

	// Override pixnet's default mobile CSS for img
	{sel:'.article-content-inner img:not(.in-read-ad img)', css:'margin:auto!important; width:unset!important; max-width:98%!important;'},
	// RWD adjust
	{sel:'@media screen and (max-width:990px)', css:'.img_row { flex-wrap: wrap; } .img_cel { flex-basis: 100%; width:96%; margin:auto!important; }'},
	// Load Font Ubuntu Mono
	{sel:'@font-face', css:'font-family: "Ubuntu Mono"; src: url("https://fonts.googleapis.com/css2?family=Ubuntu+Mono&display=swap");'},

	{sel:'.adsbyfalcon.pixnet-ad,' +		// 頁首廣告
		 '#trialsquad-post,' +				// 主文標題下方的橘紅色廣告
		 '#main .header-fixed-area,' +		// 文章前頭影音區
		 '.trv-player-container,' +			// 廣告影片輪播
		 'div[id^="div-gpt-ad"],' +			// 內文廣告
		 '.tag-container.global-keyword,' +	// 全站熱搜
		 'div[class^="article-footer article-ad"],' +
		 '.in-read-ad.product-recommend,' +	// 推薦熱銷商品
		 '#recommend-topic,' +				// 你可能感興趣的話題
		 '.pix-nerd-article,' +				// 乎你看更多 手機版
		 '.web_to_app__container,' +		// 文章末尾廣告
		 'div[id^="dablewidget_"],' +		// 你可能有興趣的文章 dable
		 '.anchor-ad-container.anchor-ad-container__show,' +
		 '.pix-related-post-2023,' +		// 大家都在看
		 '#article-hot-wrapper,' +			// 兒少不宜
		 '.discover-stream,' +				// 兒少不宜
		 '.AD2M-CrazyWrap,' +				// 蓋版影音廣告
		 '.AD2M-CrazyClose,' +				//   上項的關閉按鈕
		 '#onead-layout0,' +				// 蓋版影音廣告
		 'vmfive-ad-unit,' +				// 蓋版影音廣告 (回上頁)
		 '#avividai_you_like_container,' +	// 蓋版廣告 (回上頁)
		 'div[id^="appier_preview"],'+
		 'div[id^="vmfive-ad-practical"],'+
		 '.adsbygoogle', css:'display:none!important; height:0!important'},
	{sel:'.article-author', css:'margin-top:50px; padding-top:12px'}
	];

	function myAppendCss(rules, sht) {
		for (var i=0; i<rules.length; i++)
			sht.insertRule(rules[i].sel + ' { ' + rules[i].css + ' }', sht.cssRules.length);
	}

	function myReplaceCss(rules) {
		// The ridx was in reverse order
		var i = 0;	// for reuse i in 2nd for-loop
		for ( ; i<rules.length; i++)
			rules[i].sheet.deleteRule(rules[i].ridx);
		for (i--; i>=0; i--)
			rules[i].sheet.insertRule(rules[i].sel + ' { ' + rules[i].newCSS + ' }', rules[i].ridx);
	}

	if (cRules.length && cRules.length > 0) {
		myReplaceCss(cRules);
		myAppendCss(xRules, cRules[0].sheet);
		let elm = document.querySelectorAll("ins.adsbygoogle")
		elm.forEach( (elm, idx, ary) => {
			elm.style.display = 'none'
		})
	}

}("", [
	{sel:"\\.article-content-inner \\* \*", prop:"font-size", txt2rm:"!important" }
//	{sel:"\\.article\\-body p\\:not\\(\\[class\\]\\)", prop:"\.*", txt2rm:"\.*" }
] );
