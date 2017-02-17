(function(){

  function resolveImages() {
    resolveBackgrounds();
    resolveSlideImages();
  }

  function resolveBackgrounds() {
    var sections = document.querySelectorAll( '[data-background-image]'), section;

		for( var i = 0, len = sections.length; i < len; i++ ) {
			section = sections[i];
			if (section.getAttribute('data-background-image').length) {
        var image = $(section).attr('data-background-image');
        if ( image.startsWith("images/") ) {
          $(section).attr('data-background-image', 'slides/' + window.presentation + "/" + image);
        }
			}
		}
	}

  function resolveSlideImages() {
    var images = $("img[src^='images/']");
    for( var i = 0, len = images.length; i < len; i++ ) {
      image = images[i];
      src = $(image).attr("src");
      $(image).attr("src", "slides/" + window.presentation + "/" + src);
    }
  }

  resolveImages();

})();
