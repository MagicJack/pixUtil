# pixUtil
這一個 repo 裡面是我在自己的**痞客邦**部落格 (pixnet blog) 裡使用的貼文 CSS 及外掛 JS.

## 檔案用途說明
* **JS_CSS_NO_AD.js**: 這個是簡易版, 用來摭蓋行動版的廣告.
* **adjStyle.js**: 這個 JS 包含了我自己對 pixnet blog 行動版的修正:
  * 我自己的 pixnet blog 行動版的 CSS
  * 調整 pixnet blog 行動版的 CSS (沖突/錯誤的部份)
  * 摭蓋行動版的廣告
  * 試作**移除**行動版的廣告
* **mergeHTML.js**: highlight.js 擴充 plugin. 可以程式區塊中繼續使用 HTML tag.
* **myKbd.css**: HTML &lt;kbd> tag 用的 CSS.
* **myLegend.css**: CSS 用於以下 HTML 片段
  ```html
  <div class='fieldset'>
  <h3 class='legend'>有框框的區段標題</h3>
  <p>...
  </div>
  ```
* **myPrism.css**: CSS 用於微調 prism.js (另一套程式區段**著色**用的 JS) 的外觀.
* **其他**: 實驗/測試 用的 CSS/JS.

## 如何使用
* **JS_CSS_NO_AD.js**:
將下一行 HTML 貼在你的 pixnet blog 文章的最後一行. 即可
```html
<script src="https://cdn.jsdelivr.net/gh/MagicJack/pixUtil@main/JS_CSS_NO_AD.js"></script>
```
* **mergeHTML**:
```html
<!-- load your favor theme of hljs -->
<link href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/styles/an-old-hope.min.css" rel="stylesheet" />

<!-- load hljs 及 plugin mergeHTML.js -->
<script src="//cdn.jsdelivr.net/gh/MagicJack/pixUtil@main/mergeHTML.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/highlight.min.js"></script>

<script>
if (typeof(hljs) !== 'undefined') {
	// register plugin
	hljs.addPlugin(mergeHTMLPlugin)
	// set flag to ignore warning messages on browser's console
	hljs.configure({ignoreUnescapedHTML: true})
	// run hljs
	hljs.highlightAll()
}
</script>
```
