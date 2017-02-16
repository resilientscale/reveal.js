// Custom reveal.js integration
(function(){
  function processSlides() {
		var sections = document.querySelectorAll( '[data-slide-layout]'), section;

		for( var i = 0, len = sections.length; i < len; i++ ) {
			section = sections[i];
			if (section.getAttribute('data-slide-layout').length) {
        slideType = section.getAttribute('data-slide-layout');
        if (slideType == 'build-in-quotes') {
          buildInQuotes(section);
        } else if (slideType == 'title') {
          title(section);
        } else if (slideType == 'three-column') {
          threeColumn(section);
        } else if (slideType == 'quote') {
          quote(section);
        } else if (slideType = 'buildInHeaders') {
          buildInHeaders(section);
        }
			}
		}
	}

  function title(section) {
    $(section).children("h1").addClass("main-title");
    $(section).children("h2").addClass("sub-title");
  }

  function quote(section) {
    $(section).addClass("quote");
    $(section).children("p:not(:contains('source:'))").addClass("quote-attribution");
    $(section).children("p:contains('source:')" ).addClass( "quote-source" );
  }

  function buildInQuotes(section) {
    quote(section);
    $(section).addClass("build-in-quotes");
    $(section).children("ul").children("li").addClass("fragment");
  }

  function threeColumn(section) {
    $(section).children("ul").addClass("three-column");
  }

  function buildInHeaders(section) {
    $(section).addClass("build-in-headers");
    $(section).children("h1").addClass("fragment");
    $(section).children("h2").addClass("fragment");
    $(section).children("h3").addClass("fragment");
    $(section).children("h4").addClass("fragment");
    $(section).children("h5").addClass("fragment");
    $(section).children("h6").addClass("fragment");
    $(section).children().first().removeClass("fragment");
  }


  processSlides();

})();
