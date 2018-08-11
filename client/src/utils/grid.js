import $ from 'jquery'

export function gridFunction(){
  var $cell = $('.card');

  //open and close card when clicked on card
  $cell.find('.js-expander').click(function() {
  
    var $thisCell = $(this).closest('.card');
  
    if ($thisCell.hasClass('is-collapsed')) {
      $cell.not($thisCell).removeClass('is-expanded').addClass('is-collapsed').addClass('is-inactive');
      $thisCell.removeClass('is-collapsed').addClass('is-expanded');
      setTimeout(function(){ $('.card__expander').removeClass('expand_animation'); }, 200);
      
      
      if ($cell.not($thisCell).hasClass('is-inactive')) {

      } else {
        $cell.not($thisCell).addClass('is-inactive');
      }
  
    } else {
      $thisCell.removeClass('is-expanded').addClass('is-collapsed');
      $cell.not($thisCell).removeClass('is-inactive');
      $('.card__expander').addClass('expand_animation');
    }

    if($thisCell.hasClass('is-inactive')){
      $thisCell.removeClass('is-inactive');
    }
  });
}

