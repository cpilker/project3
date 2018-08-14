// import $ from 'jquery'

// export function gridFunction(){
//   var $cell = $('.card');

//   //open and close card when clicked on card
//   $cell.find('.js-expander').click(function() {
  
//     var $thisCell = $(this).closest('.card');
  
//     if ($thisCell.hasClass('is-collapsed')) {
//       $cell.not($thisCell).removeClass('is-expanded').addClass('is-collapsed').addClass('is-inactive');
//       $thisCell.removeClass('is-collapsed').addClass('is-expanded');
//       setTimeout(function(){ $('.card__expander').removeClass('expand_animation'); }, 200);
      
      
//       if ($cell.not($thisCell).hasClass('is-inactive')) {

//       } else {
//         $cell.not($thisCell).addClass('is-inactive');
//       }
  
//     } else {
//       $thisCell.removeClass('is-expanded').addClass('is-collapsed');
//       $cell.not($thisCell).removeClass('is-inactive');
//       $('.card__expander').addClass('expand_animation');
//     }

//     if($thisCell.hasClass('is-inactive')){
//       $thisCell.removeClass('is-inactive');
//     }
//   });
// }

export function gridFunction() {
  let cell = document.querySelectorAll('.card');
  let cardexpander = document.querySelectorAll('.card__expander');
  let expanders = [];

  // Open and close card when clicked
  for(let i=0;i<cell.length;i++){
    let expandersTemp = cell[i].querySelectorAll('.js-expander');
    expandersTemp = Array.prototype.slice.call(expandersTemp);
    expanders = expanders.concat(expandersTemp);
  }
  expanders.forEach(function(expander){
    expander.addEventListener('click', function(){
      let thisCell = this.closest('.card');
  
      if(thisCell.classList.contains('is-collapsed')){

        // Close and deactivate other cells
        cell.forEach(function(each){
          if(each !== thisCell){
            each.classList.remove('is-expanded');
            each.classList.add('is-collapsed');
            each.classList.add('is-inactive');
          }
        })
  
        // Activate clicked cell
        thisCell.classList.remove('is-collapsed');
        thisCell.classList.add('is-expanded');
  
        // Animation delay fix
        setTimeout(function(){
          cardexpander.forEach(function(expander){
            expander.classList.remove('expand_animation');
          })
        }, 200);
  
        // Add is-inactive class to other cells
        cell.forEach(function(each){
          if(each !== thisCell && !each.classList.contains('is-inactive')){
            each.classList.add('is-inactive');
          }
        })

      } else {
        // Handle closing functionality
        cardexpander.forEach(function(expander){
          expander.classList.add('expand_animation');
        })
        thisCell.classList.remove('is-expanded');
        thisCell.classList.add('is-collapsed');
        cell.forEach(function(each){
          if(each !== thisCell){
            each.classList.remove('is-inactive');
          }
        })
      }
  
      // Activate clicked cell
      if(thisCell.classList.contains('is-inactive')) {
        thisCell.classList.remove('is-inactive');
      }
    })
  });
}

