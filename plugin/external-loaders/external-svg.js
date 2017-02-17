(function(){

  function insertSVG() {
    var images = $("img[data-svg]");
    var image;
    for( var i = 0, len = images.length; i < len; i++ ) {
      image = images[i];
      if( image.getAttribute( 'data-svg' ).length ) {
        parent = $(image).parent();
        file = $(image).attr("data-svg");

        var fragmentIds = [];
        if ($(image).attr("fragment-ids").length) {
          fragmentIds = $(image).attr("fragment-ids").split(",");
        }

        // fetch the svg
        filePath = "slides/" + window.presentation + "/" + file;
        $.get(filePath, function(data) {
          console.log($(data).find("svg"));
          $(parent).html($(data).find("svg"));
          // set fragments
          for (var j = 0; j < fragmentIds.length; j++) {
            fragId = "#" + fragmentIds[j].trim();
            $(parent).find(fragId).addClass("fragment");
            $(parent).find(fragId).attr("data-fragment-index", j);
          }
        });

      }
    }
  }

  insertSVG();

})();
