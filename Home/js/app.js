$(document).ready(function () {
  var $grid = $('.image-container').imagesLoaded( function()
  {
    console.log("images loaded");
    // init Masonry after all images have loaded
    $grid.masonry({
      columnWidth: '.grid-sizer',
      // do not use .grid-sizer in layout
      itemSelector: '.image-item',
      percentPosition: true
    });
  });
});
