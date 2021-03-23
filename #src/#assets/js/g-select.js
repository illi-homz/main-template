'use strict';

gz.gSelect = {
    open($select)
        {
            $select.children('._options').first().slideDown(300)
            $select.toggleClass('opened')
        },
    close($select)
        {
            $select.children('._options').first().slideUp(300)
            $select.toggleClass('opened')
        },
    toggle(instance)
        {
            let $select = $(instance).parents('._select')
            if (!$select.hasClass('opened'))
                this.open($select);
            else
                this.close($select);
        },
    setName($select,name)
        {
            $select.find('._selected-text').html(name);
        },
    setInputValue($select, value)
    {
        $select.find('._select-input').val(value).trigger('change');
    },
    selectItem(instance)
    {
        const $inst = $(instance)
        const $select = $inst.parents('._select');
            $select.removeClass('error');
            $select.find('._option').removeClass('active');


            $inst.addClass('active');
            const name = $inst.text()
            const selectedValue = $inst.data('value');

            this.setName($select,name);
            this.setInputValue($select,selectedValue);
            this.close($select);
    },
}
