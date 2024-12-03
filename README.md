# pixUtil
這一個 repo 裡面是我在自己的**痞客邦**部落格 (pixnet blog) 裡使用的貼文 CSS 及外掛 JS.

## 檔案用途說明
* **adjStyle.js**: 這個 JS 包含了我自己對 pixnet blog 行動版的修正:
  * 我自己的 pixnet blog 行動版的 CSS
  * 調整 pixnet blog 行動版的 CSS (沖突/錯誤的部份)
  * 摭蓋行動版的廣告
  * 試作**移除**行動版的廣告
* **JS_CSS_NO_AD.js**: 這個是簡易版, 用來摭蓋 pixnet blog 行動版的廣告.
* **mergeHTML.js**: highlight.js v11 用的插件 plugin. 可以在要著色的程式區塊裡繼續使用 HTML tag (如: &lt;i>, &lt;b>, &span class='...'>).
* **myKbd.css**: CSS 用於 HTML tag &lt;kbd>.
* **myLegend.css**: CSS 用於如下的 HTML 片段.
  ```html
  <div class='fieldset'>
  <h3 class='legend'>有框框的區段標題</h3>
  <p>類似 &lt;fieldset> + &lt;legend> 的排版風格
  </div>
  ```
* **myPrism.css**: CSS 用於微調 prism.js (另一套程式區段**著色**用的 JS) 的 prism-line-number 及 copy-to-clipboard 等二個插件的外觀.
* **其他**: 實驗/測試 用的 CSS/JS.

## 如何使用

### `JS_CSS_NO_AD.js`

將下一行 HTML 貼在你的 pixnet blog 文章的最後一行. 即可
```html
<script src="https://cdn.jsdelivr.net/gh/MagicJack/pixUtil@latest/JS_CSS_NO_AD.js"></script>
```

### `mergeHTML.js`

在 blog 貼文的後面貼上如下的 HTML 及 JS 片段.
```html
<!-- load your favor theme of hljs -->
<link href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/styles/an-old-hope.min.css" rel="stylesheet" />

<!-- load hljs 及 plugin mergeHTML.js -->
<script src="//cdn.jsdelivr.net/gh/MagicJack/pixUtil@latest/mergeHTML.js"></script>
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

### `myPrism.css`

使用時不要載入 prism-line-number 及 copy-to-clipboard 這二個插件對應的 CSS.

```html
<link  href="//cdn.jsdelivr.net/gh/MagicJack/pixUtil@latest/myPrism.css" rel="stylesheet" />

<!-- load theme for prism.js -->
<link href="//cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-okaidia.min.css" rel="stylesheet" />

<!-- load prism.js -->
<script src="//cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js"></script>

<!--link href="//cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/line-numbers/prism-line-numbers.min.css" rel="stylesheet" /-->
<script src="//cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/line-numbers/prism-line-numbers.min.js"></script>

<!--link href="//cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/toolbar/prism-toolbar.min.css" rel="stylesheet" /-->
<script src="//cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/toolbar/prism-toolbar.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js"></script>
```
