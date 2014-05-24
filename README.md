# myLightbox for Touch Device

## how to use

1. viewport

```
    <!--header-->
    <meta name="viewport" content="width=device-width, initial-scale=1 user-scalable=no">
    <!--/header-->
```

2. css

```
    <link rel="stylesheet" href="/path/to/your/stylesheet.css">
    <link rel="stylesheet" href="/path/to/your/cssDir/jquery.myLightbox.css">
```

3. jQuery, js

```
    <script src="https://code.jquery.com/jquery-x.x.x.min.js"></script>
    <script src="/path/to/your/jsDir/jquery.myLightbox.js"></script>
    <script>
    (function($, window, document) {
      $(function() {
        // mylightbox
        $('.myLightbox').myLightbox();
      });
    }(window.jQuery, window, document));
    </script>
```

## demo

[demo](http://kanali.digi2.jp/myLightbox/)



