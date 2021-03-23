'use strict';

@@include('@@webRoot/#assets/js/webp.js');
@@include('@@webRoot/#assets/js/jquery.min.js');
@@include('@@webRoot/#assets/js/slick.min.js');
@@include('@@webRoot/#assets/js/validator.js');
@@include('@@webRoot/#assets/js/maskedinput.min.js');

// blocks
@@include('@@webRoot/#assets/blocks/air-datepicker/air-datepicker.js');


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

@@include('@@webRoot/#assets/blocks/select/select.js')


gz.init = function() {
    $("._input-phone").mask("+7(999)999-99-99");
    this.store.init()
    this.gPopup.init()
}

$(document).ready(() => {
    gz.init()
})
