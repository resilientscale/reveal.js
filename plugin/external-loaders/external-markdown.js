(function(){

  function setSlides() {
    $("section.markdown-slides").attr("data-markdown", "slides/" + getQueryParamValue('pres') + "/slides.md");
    window.presentation = getQueryParamValue('pres');
  }

  function getQueryParamValue(paramName) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
      var pair = vars[i].split("=");
      if(pair[0] == paramName) {
        return pair[1];
      }
    }
    return "";
  }

  setSlides();

})();
