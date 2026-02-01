document.getElementById("CSS_NO_AD").outerHTML=[
 '<style type="text/css">'
,'.adsbyfalcon.pixnet-ad,'        // 頁首廣告
,'#trialsquad-post,'              // 文章前頭 AD
,'#main .header-fixed-area,'      // 文章前頭影音區
,'div[id^="div-gpt-ad"],'         // 內文廣告
,'.tag-container.global-keyword,' // 全站熱搜
,'div[class^="article-footer article-ad"],'
,'.in-read-ad.product-recommend,' // 推薦熱銷商品
,'#recommend-topic,'              // 你可能感興趣的話題
,'.pix-nerd-article,'             // 乎你看更多 手機版
,'.web_to_app__container,'        // 文章末尾廣告
,'div[id^="dablewidget_"],'       // 你可能有興趣的文章 dable
,'.anchor-ad-container.anchor-ad-container__show,'
,'.pix-related-post-2023,'        // 大家都在看
,'#article-hot-wrapper,'          // 兒少不宜
,'.discover-stream,'              // 兒少不宜
,'.AD2M-CrazyWrap,'               // 蓋版影音廣告
,'.AD2M-CrazyClose,'              //   上項的關閉按鈕
,'#onead-layout0,'                // 蓋版影音廣告
,'vmfive-ad-unit,'                // 蓋版影音廣告 (後段)
,'#avividai_you_like_container,'  // 蓋版廣告 (後段)
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

var adRules = [
 '#pixnet_pc_article_bottom_1',
 '#pixnet-ad-content-left-right-wrapper'
];
adRules.forEach( (adRule, idx, ary) => {
	let elm = document.querySelectorAll(adRule)
		elm.forEach( (elm, idx, ary) => {
		elm.style.display = 'none'
	})
})
