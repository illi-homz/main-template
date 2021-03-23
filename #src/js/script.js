'use strict';

@@include('../#assets/js/webp.js');
@@include('../#assets/js/jquery.min.js');
@@include('../#assets/js/slick.min.js');
@@include('../#assets/js/validator.js');
@@include('../#assets/js/maskedinput.min.js');
@@include('../#assets/js/air-datepicker.js');


const gz = {
    goToBlock(target, event, isMobile=false)
    {
        if (event) event.preventDefault();
        if (isMobile) this.header.toggleMenu()

        $('html,body').animate({
        scrollTop: typeof(target) === 'string'
            ? target
            : $(target.hash).offset().top
        });
    },
}

@@include('../#assets/js/g-select.js')


gz.init = function() {
    $("._input-phone").mask("+7(999)999-99-99");
    this.store.init()
    this.gPopup.init()
}

$(document).ready(() => {
    gz.init()
})
