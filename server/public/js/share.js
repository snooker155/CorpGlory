var purl = document.URL;
var ptitle = document.title;
var pimg = purl + '/public/img/logoBlack.png';
var text = 'New generation of business games is coming';

Share = {
  vkontakte: function() {
    url  = 'http://vkontakte.ru/share.php?';
  	url += 'url='          + encodeURIComponent(purl);
  	url += '&title='       + encodeURIComponent(ptitle);
  	url += '&description=' + encodeURIComponent(text);
  	url += '&image='       + encodeURIComponent(pimg);
  	url += '&noparse=true';
  	Share.popup(url);
  },
  facebook: function() {
  	url  = 'http://www.facebook.com/sharer.php?s=100';
  	url += '&p[title]='     + encodeURIComponent(ptitle);
  	url += '&p[summary]='   + encodeURIComponent(text);
  	url += '&p[url]='       + encodeURIComponent(purl);
  	url += '&p[images][0]=' + encodeURIComponent(pimg);
  	Share.popup(url);
  },
  twitter: function() {
  	url  = 'http://twitter.com/share?';
  	url += 'text='      + encodeURIComponent(ptitle);
  	url += '&url='      + encodeURIComponent(purl);
  	url += '&counturl=' + encodeURIComponent(purl);
  	Share.popup(url);
  },
  linkedin: function() {
  	url  = 'https://www.linkedin.com/shareArticle?mini=true';
  	url += '&url='      + encodeURIComponent(purl);
  	url += '&title='       + encodeURIComponent(ptitle);  
  	Share.popup(url);
  },
  popup: function(url) {
  	window.open(url,'','toolbar=0,status=0,width=626,height=436');
  }
};