document.getElementById("CSS_NO_AD").outerHTML=[
 '<style type="text/css">'
,'#pixnet-ad-before_header,'
,'.pix-anchor-slot,'
,'#pixnet_pc_article_inread_1,'
,'#pixnet_pc_article_inread_2,'
,'#pixnet_pc_article_inread_3,'
,'#pixnet_pc_article_inread_4,'
,'#pixnet_pc_article_inread_5,'
,'#pixnet_pc_article_inread_6,'
,'#pixnet_pc_article_inread_7,'
,'#pixnet_pc_article_inread_8,'
,'#pixnet_pc_article_bottom_1,'
,'#pixnet-ad-content-left-right-wrapper,'
,'.adsbygoogle { display:none!important; height:0!important; }'
,'.article-author {margin-top:50px; padding-top:12px }'
,'</style>'].join('');

var tmoid=null, multi = 10;
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
	} else if (multi > 0) {
		multi--;
		tmoid = setTimeout(doStuff, 100);
	} else {
		done = 0;
		tmoid && clearTimeout(tmoid);
		let sTxt=[
		 '#pixnet_pc_article_bottom_1',
		 '#pixnet-ad-content-left-right-wrapper'
		].join(', ')
		document.querySelectorAll(sTxt).forEach( (elm, idx, ary) => {
			elm.style.display = ''
			elm.setAttribute('style', 'display: none !important;')
			done++
		})
		console.log('Last Done count:'+done)
	}
}();
