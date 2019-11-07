(function ($) {
    $.fn.customTree = function (options) {
        var config = $.extend({}, {
            lineColor: 'black',
            lineThickness: 1
        }, options);



        return this.each(function () {
            function getChildren(parent) {
                let children = $(parent).siblings('ul').children('li').children('span');
                if ($(children).length) {
                    $(children).addClass('custom-tree-connection-children');
                    getChildren(children);
                }
            }

            function setOpen(elem) {
                let firstElem = $(elem);

                let lastElem = $(firstElem).children('ul').children('li').last().children('.custom-tree-connection-children');
                let openTree = $(firstElem).children('.jsOpenTree');
                if ($(lastElem).length) {
                    let customTreeConnectionParentTop = $(firstElem).offset();
                    let customTreeConnectionChildren = $(lastElem).offset();
                    let customTreeConnectionLine = customTreeConnectionChildren.top - customTreeConnectionParentTop.top - (spanHeight / 2) + 1;
                    $(openTree).siblings('.custom-tree-line-vertical').last().css({'height': customTreeConnectionLine});
                }

                let currentChild = $(elem).parent('ul').parent('li');
                if($(currentChild).length) {
                    setOpen(currentChild);
                }
            }

            function setClose(elem) {
                $(elem).children('.jsSwitchPlusMinus').removeClass('jsSwitchPlusMinusFlag').html('+');
                $(elem).siblings('ul').fadeOut(1, 'linear', function () {
                    let firstElem = $(elem).parent('li');
                    let lastElem = $(firstElem).children('ul').children('li').last().children('.custom-tree-connection-children');
                    let openTree = $(firstElem).children('.jsOpenTree');

                    if ($(lastElem).length) {
                        let customTreeConnectionParentTop = $(firstElem).offset();
                        let customTreeConnectionChildren = $(lastElem).offset();
                        let customTreeConnectionLine = customTreeConnectionChildren.top - customTreeConnectionParentTop.top - (spanHeight / 2) + 1;
                        $(openTree).siblings('.custom-tree-line-vertical').last().css({'height': customTreeConnectionLine});
                    }

                    let currentParent = $(elem).siblings('ul').children('li').children('.jsOpenTree');
                    if($(currentParent).length) {
                        setClose(currentParent);
                    }
                });
            }


            let main = $(this);
            $(main).css({'display': 'block'});
            $(main).find('ul').addClass('custom-tree');
            $(main).addClass('custom-tree');
            $(main).find('li').addClass('custom-tree-connection-parent');
            let headerSpan = $(main).children('li').children('span');
            getChildren(headerSpan);
            $(main).find('span').first().addClass('jsHeight');
            let spanHeight = $('.jsHeight').outerHeight();
            $('.custom-tree-connection-parent').append('<span class="custom-tree-line-vertical"></span>');
            $('.custom-tree-connection-children').append('<span class="custom-tree-line-horizon"></span>');
            $('.custom-tree-line-vertical').css({
                'background-color': options.lineColor,
                'width': options.lineThickness
            });
            $('.custom-tree-line-horizon').css({
                'background-color': options.lineColor,
                'height': options.lineThickness
            });
            let customTreeConnectionParent = $(".custom-tree-connection-parent");

            for (let i = 0; i < customTreeConnectionParent.length; i++) {
                if ($(customTreeConnectionParent[i]).children('ul').length > 0) {
                    let customTreeConnectionNesting = $(customTreeConnectionParent[i]).children('span').first();
                    customTreeConnectionNesting.addClass('jsOpenTree');
                    customTreeConnectionNesting.append('<span class="custom-tree-connection-nesting jsSwitchPlusMinus">+</span>')
                }
            }



            $('.jsOpenTree').click(function () {
                let _this = $(this);
                if ($(_this).children('.jsSwitchPlusMinus').hasClass('jsSwitchPlusMinusFlag')) {
                    $(_this).children('.jsSwitchPlusMinus').removeClass('jsSwitchPlusMinusFlag').html('+');
                    setClose($(_this));
                } else {
                    $(_this).children('.jsSwitchPlusMinus').addClass('jsSwitchPlusMinusFlag').html('-');
                    $(_this).siblings('ul').fadeIn(1, 'linear', function () {
                        setOpen($(this).parent('li'));
                    });
                }


            });
        });
    };
})(jQuery);