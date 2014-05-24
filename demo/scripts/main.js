/*
 * Flickrapp
 *
 * Copyright (c) 2014 hkanali
 */
(function($, window, document) {
  $(function() {

    // 初期化
    photosSearch('', 1, 'flickr.interestingness.getList', '');
    orientation();

    // ホームボタン
    $('.btn-home').on('click, touchend', function() {
      $('.form-control').val('');
      photosSearch('', 1, 'flickr.interestingness.getList', '');
    });

    // Recent photos
    $('.btn-recent').on('click, touchend', function() {
      $('.form-control').val('');
      photosSearch('', 1, 'flickr.photos.getRecent', '');
    });

    // ownerPageに飛ぶ
    $('body').on('click, touchend', '.ownerPage', function() {
      var userId = $(this).attr('owner');
      photosSearch('', 1, 'flickr.people.getPhotos', userId);
    });

    // 検索ボタンを押すと検索
    $('.btn-search').on('click, touchend', function() {
      var inputValue = encodeURI($('.form-control').val());
      if (inputValue === '') return;
      photosSearch(inputValue, 1, 'flickr.photos.search', '');
    });

    // 検索フィールドでエンターキーで検索
    $('.searchfield').keypress(function(e) {
      var inputValue = encodeURI($('.form-control').val());
      if (e.keyCode == 13 && (inputValue != '')) {
        photosSearch(inputValue, 1, 'flickr.photos.search', '');
      }
    });

    // ページ遷移
    $('.pagination').on('click, touchend', 'a', function() {
      // 遷移するページ番号
      var page = $(this).attr('value');
      // apiメソッド
      var method = $(this).parents('.pagination').attr('method');
      var userId = $(this).parents('.pagination').attr('userId');
      var inputValue = encodeURI($('.form-control').val());
      photosSearch(inputValue, page, method, userId);
    });

    // orientation対応
    $(window).on('resize', function() {
      orientation();
    });

  });

  /**
   * filckr api 検索
   */
  function photosSearch(inputValue, page, method, userId) {
    if (method === 'flickr.photos.search' && inputValue === '') {
      method = 'flickr.interestingness.getList';
    }
    var options = {};
    options.url = 'https://api.flickr.com/services/rest/';
    options.method = 'GET';
    options.params = {
      method: method, //'flickr.photos.search',
      user_id: userId,
      per_page: 24,
      page: page,
      text: decodeURI(inputValue),
      api_key: '649971b7fe9c3a4d4ec601f40a2b9b4e',
      format: 'json',
      nojsoncallback: 1
    };
    requestSearch(options);
  }

  /**
   * apiをたたく
   */
  function requestSearch(options) {
    $.ajax({
      type: options.method,
      url: options.url,
      data: options.params
    })
    .done(function(data) {
      // 画像表示
      showPhotos(data, options.params.method, options.params.userId);

    })
    .fail(function() {
      console.log("失敗");
    });
  }

  /**
   * 画像を表示
   */
  function showPhotos(data, method, userId) {
    if (data.photos.total === "0") {
      $('.nohit')
        .fadeIn(1000)
        .fadeOut(1000, function() {
          $('.form-control').val('');
          photosSearch('', 1, 'flickr.photos.search', '');
        });
    }
    clearScreen();
    var tag = "";
    $(data.photos.photo).each(function(index) {
      var image_s = "http://farm" + this.farm + ".static.flickr.com/" + this.server + "/" + this.id + "_" + this.secret + "_" + "s" +".jpg";
      var image = "http://farm" + this.farm + ".static.flickr.com/" + this.server + "/" + this.id + "_" + this.secret + ".jpg";

      var $win = $(window);
      var xsNumber = 4;
      if ($win.width() > $win.height()) {
        xsNumber = 3;
      }

      tag += '<div class="col-xs-' + xsNumber + ' text-center">' +
             '  <a href="' + image + '" title="' + this.title + '" owner="' + this.owner + '">' +
             '    <img src="' + image_s + '" alt="">' +
             '  </a>' +
             '</div>';

    });

    $('.imgGallary').append(tag);

    //ページャー表示
    showPages(data, method, userId);

    // mylightbox
    $('.myLightbox').myLightbox();
  }

  /**
   * 画面を一掃
   */
  function clearScreen() {
    $('.imgGallary').text('');
  }

  /**
   * ページャーを表示します
   */
  function showPages(data, method, userId) {
    clearPager();
    var startPage = data.photos.page;
    var pages = data.photos.pages;

    var tag = '';
    if (startPage !== 1) {
      tag = '<li><a href="#" value="' + 1 + '">&laquo;</a></li>';
    }
    for (var i = startPage - 2; i <= startPage + 2; i++) {
      if (0 < i && i <= pages) {
        if (i === startPage) {
          tag += '<li class="active"><a href="#" value="' + i + ' ">' + i + '</a></li>';
        } else {
          tag += '<li><a href="#" value="' + i + '">' + i + '</a></li>';
        }
      }
    }
    if (startPage < pages) {
      tag += '<li><a href="#" value="' + pages + '">&raquo;</a></li>';
    }

    // アペンド
    $('.pagination').append(tag);

    // apiメッソド
    $('.pagination').attr('method', method);

    // userID
    $('.pagination').attr('userId', userId);
  }
  /**
   * ページャーを一掃
   */
  function clearPager() {
    $('.pagination').text('');
  }

  /**
   * オリエンテーションによって表示を変える
   */
  function orientation() {
    var $win = $(window);
    if ($win.width() > $win.height()) {
      $('.imgGallary div').removeClass('col-xs-4');
      $('.imgGallary div').addClass('col-xs-3'); // ３列並び
    } else {
      $('.imgGallary div').removeClass('col-xs-3');
      $('.imgGallary div').addClass('col-xs-4'); // ４列並び
    }
  }


}(window.jQuery, window, document));
