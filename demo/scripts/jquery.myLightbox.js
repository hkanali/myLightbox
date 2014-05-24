(function($, window, document) {
  // Collection method.
  // ファイル名と合わせる(fn)
  $.fn.myLightbox = function(options) {
    var opts = $.extend({}, $.fn.myLightbox.defaults, options); // 引数：親オブジェクト, デフォルト値, 引数

      // 遷移させない
      $('.myLightbox a').on('click touchend', function(e) {
        e.preventDefault();
      });

      return this.each(function() {
        var self = $(this);
        $(self).find('a').on('click touchend', function(e) {
          var image = this;

          var $body = $('body');

          // オーバーレイ
          $('<div class="mlb-overlay"></div>').appendTo($body);
          var $mlbOverlay = $('.mlb-overlay');

          // 画像表示
          showImage(this);

          var startX;
          var endX;
          $('.mlb-overlay').on('touchstart', 'img', function(e) {
            startX = e.originalEvent.changedTouches[0].pageX;
          });
          $('.mlb-overlay').on('touchend', 'img', function(e) {
            endX = e.originalEvent.changedTouches[0].pageX;
            if (startX - endX > 10) {
              // 右
              image = $(image).parent().next().children();
              if ($(image).length) showImage(image);

            } else if (startX - endX < -10) {
              // 左
              image = $(image).parent().prev().children();
              if ($(image).length) showImage(image);
            }
          });

        });

        $('body').on('click touchend', '.mlb-overlay', function() {
          $('.mlb-overlay').remove();
        });

        function showImage(selector) {
          var image = new Image();
          var imgURL = $(selector).attr('href');
          var title = $(selector).attr('title');
          var owner = $(selector).attr('owner');
          image.src = imgURL;
          image.title = title;

          // Screenサイズに合わせる
          var $win = $(window);

          if ($win.width() > $win.height()) {
            $(image).css({
              height: '80%',
            });
          } else {
            $(image).css({
              width: '90%',
            });
          }

          // 既存の画像を削除
          $('.mlb-overlay *').remove();

          // 表示
          $(image).appendTo($('.mlb-overlay'))
            .hide()
            .fadeIn();
            //.slideDown();
          $('<p><a href="#" class="title ownerPage" owner="' + owner + '">' + title + '</a></p>').appendTo($('.mlb-overlay'));

        }
    });
  }

  $.fn.myLightbox.defaults = {
      // ここにデフォルトのオプション値を定義する
  }
})(window.jQuery, window, document);
