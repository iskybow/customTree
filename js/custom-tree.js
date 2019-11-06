(function($) {
    $.fn.customTree = function(options) {
        var config = $.extend({}, {
            lineColor: 'black',
            lineThickness: 1
        }, options);

        return this.each(function() {
            $(this).children().show();
            $('.jsCustomTree').find('span').first().addClass('jsHeight');
            let spanHeight = $('.jsHeight').outerHeight();
            $('.custom-tree-connection-parent').append('<span class="custom-tree-line-vertical"></span>');
            $('.custom-tree-connection-children').append('<span class="custom-tree-line-horizon"></span>');
            $('.custom-tree-line-vertical').css({'background-color': options.lineColor, 'width': options.lineThickness});
            $('.custom-tree-line-horizon').css({'background-color': options.lineColor, 'height': options.lineThickness});
            let customTreeConnectionParent = $(".custom-tree-connection-parent");

            for(let i = 0; i < customTreeConnectionParent.length; i++) {
                if($(customTreeConnectionParent[i]).children('ul').length > 0) {
                    let customTreeConnectionNesting = $(customTreeConnectionParent[i]).children('span').first();
                    customTreeConnectionNesting.addClass('jsOpenTree');
                    customTreeConnectionNesting.append('<span class="custom-tree-connection-nesting jsSwitchPlusMinus">+</span>')
                }
            }

            $('.jsOpenTree').click(function () {
                $(this).siblings('ul').fadeToggle(1,'linear', function () {
                    for(let j = 0; j < customTreeConnectionParent.length; j++) {
                        let customTreeConnectionParentTop = $(customTreeConnectionParent[j]).offset();
                        let customTreeConnectionChildren = $(customTreeConnectionParent[j]).children('ul').children('li').last().children('.custom-tree-connection-children ').offset();
                        let customTreeConnectionLine = customTreeConnectionChildren.top - customTreeConnectionParentTop.top - (spanHeight / 2) + 1;
                        $(customTreeConnectionParent[j]).find('.custom-tree-line-vertical').last().css({'height': customTreeConnectionLine});
                    }
                });
                if($(this).children('.jsSwitchPlusMinus').hasClass('jsSwitchPlusMinusFlag')) {
                    $(this).children('.jsSwitchPlusMinus').removeClass('jsSwitchPlusMinusFlag').html('+');
                } else {
                    $(this).children('.jsSwitchPlusMinus').addClass('jsSwitchPlusMinusFlag').html('-');
                }
            });

        });
    };
})(jQuery);