# pixUtil
這個 repo 裡放的都是我在自己的**痞客邦**部落格 (pixnet blog) 裡使用的 CSS 及外掛 JS.

由於 pixnet blog 將**桌面版**及**行動版**分開維護, 而且行動版無法客製 CSS, 因此這個 repo 裡的 CSS/JS 主要都是針行動版.

想要在自己的 pixnet blog 引用這些功能的朋友可以直接透過 jsdelivr.net 抓取檔案:

```html
<!-- 引用 JS 檔 -->
<script src="https://cdn.jsdelivr.net/gh/MagicJack/pixUtil@latest/xxxx.js"></script>

<!-- 引用 CSS 檔 -->
<link href="https://cdn.jsdelivr.net/gh/MagicJack/pixUtil@latest/yyyy.css" rel="stylesheet" />
```

## 檔案用途及使用說明
### adjStyle.js

這個 JS 包含了我自己對 pixnet blog 行動版的修正:
  * 我自己的 pixnet blog 行動版的 CSS
  * 調整 pixnet blog 行動版的 CSS (沖突/錯誤的部份)
  * 摭蓋行動版的廣告
  * 試作**移除**行動版的廣告

這個 JS 不建議大家引用, 除非你想要複製我的 blog 風格. 即使如此, 我還是在此分享引用的方法:
```html
<script src="https://cdn.jsdelivr.net/gh/MagicJack/pixUtil@latest/adjStyle.js"></script>
```

### JS_CSS_NO_AD.js

這個是 adjStyle.js 的簡化版, 用來摭蓋 pixnet blog 行動版的廣告. 歡迎大家引用.

將以下二行 HTML 貼在你的 pixnet blog 文章的最後一行. 即可
```html
<p id="CSS_NO_AD"></p>
<script src="https://cdn.jsdelivr.net/gh/MagicJack/pixUtil@latest/JS_CSS_NO_AD.js"></script>
```

### mergeHTML.js

這個是 highlight.js v11 用的插件 plugin. 功能是可以在要著色的程式區塊裡繼續使用 HTML tag (如: &lt;i>, &lt;b>, &lt;span class='...'>).

在 blog 貼文的後面貼上如下的 HTML 及 JS 片段.
```html
<!-- load your favor theme of hljs -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/styles/an-old-hope.min.css" rel="stylesheet" />

<!-- load hljs and it's plugin mergeHTML.js -->
<script src="https://cdn.jsdelivr.net/gh/MagicJack/pixUtil@latest/mergeHTML.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/highlight.min.js"></script>

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

### myKbd.css

用於 HTML tag &lt;kbd> 的 CSS 檔.

```html
<link href="https://cdn.jsdelivr.net/gh/MagicJack/pixUtil@latest/myKbd.css" rel="stylesheet" />
```

### myLegend.css

CSS 用於如下的 HTML 片段.
  ```html
  <div class='fieldset'>
  <h3 class='legend'>位於在區段框框上標題</h3>
  <p>類似 <fieldset> + <legend> 的排版風格</p>
  </div>
  ```
使用方法:

```html
<link href="https://cdn.jsdelivr.net/gh/MagicJack/pixUtil@latest/myLegend.css" rel="stylesheet" />
```

### myPrism.css

CSS 用於微調 prism.js 的二個插件 (prism-line-number 和 copy-to-clipboard) 的外觀.

prism.js 的功能和 highlight.js 一樣都是給程式區段**著色**用的 JS.

使用時不要載入 prism-line-number 及 prism-toolbar (copy-to-clipboard 的相依插件) 這二個插件對應的 CSS.

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

### 其他檔案

實驗/測試 用的 CSS/JS.
