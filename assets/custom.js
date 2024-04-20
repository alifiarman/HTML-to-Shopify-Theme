$(document).ready(function(){
    $('.tp-product-details-variation-list input').on('change', function(){
        var optionName = '';
        $('input:radio.input_class:checked').each(function(e){
            optionName += e != 0 ? '-' : '';
            optionName += $(this).val();
           
        })
        $('#productSelector option').each(function(){
            var txt = $.trim($(this).text());
            if (txt == optionName){

                // getting data 
                $(this).parent().val($(this).val());
                var pId = $(this).val();
                var src = $(this).data('image')
                var compare = $(this).data('compare')
                compare = (compare * 0.01).toFixed(2)
                var available = $(this).data('available')
                var price = $(this).data('price')
                price = (price * 0.01).toFixed(2)

                // Updating content 
                $('.show.active .product_feature_img').attr('src', src);
                $('.new-price').text( currency + price)
                $('.old-price').text( currency + compare)
                $('#product_id').val(pId);
                if ( available != true ){ 
                    $('.available_status').addClass('sould_out').text('Out of Stock')
                    $('.add-to-cart-btn').addClass('stock-out').text('Out of Stock')
                    $('.tp-product-details-buy-now-btn').addClass('stock-out').val('Out of Stock')
                }
                else{
                    $('.available_status').removeClass('sould_out').text('In Stock ')
                    $('.add-to-cart-btn').removeClass('stock-out').text('Add to Cart ')
                    $('.tp-product-details-buy-now-btn').removeClass('stock-out').val('Buy Now!')
                }
               

                // Active mark on thumb img 

                $('.nav-link').each(function(){
                    var thumb_img = $(this).children().attr('src');

                    if( src == thumb_img){
                        $(this).addClass('active').siblings().removeClass('active')
                    }
                })
               
            }
        })
    })
    // $('.tp-cart-plus').on('click', function(){
    //     var qty = $('.tp-cart-input').val();
    //     $('#product_qty').val(qty);
    //     console.log('working')
    // })
    // $('.tp-cart-minus').on('click', function(){
    //     var qty = $('.tp-cart-input').val();
    //     $('#product_qty').val(qty);
    // })

    // Quentty Input Plus and Minus
    //////////////////////////////////////

    $('.tp-cart-minus').on('click', function () {
        var $input = $('#product_qty')
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
        return false;
        
    });

    $('.tp-cart-plus').on('click', function () {
        var $input = $('#product_qty')
        $input.val(parseInt($input.val()) + 1);
        $input.change();
        return false;
        
    });

    // AJAX part
    
    function removeLoading(){
        $('#add_to_cart_btn').removeClass('loading')
    }
    $('#add_to_cart_btn').on( 'click', function(e){
        e.preventDefault();
        $(this).addClass('loading')

        $.ajax({
            type: 'POST',
            url: '/cart/add.js',
            data: $('#product_form_cart').serialize(),
            dataType: 'json',
            success: function(data){
               get_cart_data()
               removeLoading()
            },
            error: function(){
                console.log('error')
                removeLoading()
            }
        })
    })
    function get_cart_data(){
        $.getJSON('/cart.js', function(cart){
            
            var itemCount = cart.item_count
            $('.cart_item').text(itemCount)
            $('.cartmini__area').addClass('cartmini-opened')
            $('.body-overlay').addClass('opened')

            // Fatch Data 
            cart_mini_fatch()
            cart_main_fatch()
        })
    }

    // --------------------------------------- collections filters ----------------------------
    // sort filters
    $('.nice-select li').on('click', function(){
        // e.preventDefault()
        var option_id = $(this).data('value')
        var max_price = $('.max__price').val()
        var min_price = $('.min__price').val()
        var stock_status = $('input:radio.stock_status:checked').val()
        var coll_name = $('input:radio.collection__filter:checked').val()


    
        location.href = "/collections/" + coll_name + "?filter.v.availability="
        + stock_status + "?filter.v.price.gte=" + min_price + "&filter.v.price.lte=" + max_price
        + "&sort_by=" + option_id;

        
        // replacing URL
        //     window.history.pushState(null , null, url)

        //  // featch call data
        //  collection__filtering()
    });

    // status filters
    $('.stock_status').on('change', function(){
        // e.preventDefault()
        var option_id = $('.nice-select .selected').data('value')
        var max_price = $('.max__price').val()
        var min_price = $('.min__price').val()
        var stock_status = $(this).val()
        var coll_name = $('input:radio.collection__filter:checked').val()

        location.href = "/collections/" + coll_name + "?filter.v.availability="
         + stock_status + "&filter.v.price.gte=" + min_price + "&filter.v.price.lte=" + max_price
         + "&sort_by=" + option_id;
        // replacing URL
        //     window.history.pushState(null , null, url)

        //  // featch call data
        //  collection__filtering()
    });

    // cetagories filters
    $('.collection__filter').on('change', function(){
        // e.preventDefault()
        var option_id = $('.nice-select .selected').data('value')
        var max_price = $('.max__price').val()
        var min_price = $('.min__price').val()
        var stock_status = $('input:radio.stock_status:checked').val()
        var coll_name = $(this).val()

        // handle
        
        location.href = "/collections/" + coll_name + "?filter.v.availability="
         + stock_status + "&filter.v.price.gte=" + min_price + "&filter.v.price.lte=" + max_price
         + "&sort_by=" + option_id;

        

        //  // replacing URL
        //     window.history.pushState(null , null, url)
            
        //  // featch call data
        //  collection__filtering()
    });

    // Price filters min
    $('#price__filter_min').on('change', function(){
        // e.preventDefault()
        var option_id = $('.nice-select .selected').data('value')
        var max_price = $('.max__price').val()
        var min_price = $('.min__price').val()
        var stock_status = $('input:radio.stock_status:checked').val()
        var coll_name = $('input:radio.collection__filter:checked').val()

        // handle
        
        location.href = "/collections/" + coll_name + "?filter.v.availability="
         + stock_status + "&filter.v.price.gte=" + min_price + "&filter.v.price.lte=" + max_price
         + "&sort_by=" + option_id;

        //  // replacing URL
        //     window.history.pushState(null , null, url)
            
        //  // featch call data
        //  collection__filtering()
    });

    // Price filters max
    $('#price__filter_max').on('change', function(){
        // e.preventDefault()
        var option_id = $('.nice-select .selected').data('value')
        var max_price = $('.max__price').val()
        var min_price = $('.min__price').val()
        var stock_status = $('input:radio.stock_status:checked').val()
        var coll_name = $('input:radio.collection__filter:checked').val()

        // handle
        
        location.href = "/collections/" + coll_name + "?filter.v.availability="
         + stock_status + "&filter.v.price.gte=" + min_price + "&filter.v.price.lte=" + max_price
         + "&sort_by=" + option_id;

        //  // replacing URL
        //     window.history.pushState(null , null, url)
            
        //  // featch call data
        //  collection__filtering()
    });



    // Pricing filter default select value changing
    var parms = new window.URLSearchParams(window.location.href);
    var min_price = parms.get('filter.v.price.gte');
    var mx_price = parms.get('filter.v.price.lte');
    if(min_price != null ){
        $('.min__price').val(min_price)
    }
    if(min_price != null ){
        $('.max__price').val(mx_price)
    }


    // collection filter default select value changing

    if(window.location.href.indexOf("filter.v.availability=1") > -1){
        $("#in_stock").attr('checked', 'checked')
    }
    else if(window.location.href.indexOf("filter.v.availability=0") >-1){
        $("#out_stock").attr('checked', 'checked')
    }
    else{
        $("#all_pro").attr('checked', 'checked')
    }

});

function removeItem(e , el){
   var id = $(el).data('id')

   $.ajax({
    type: 'POST',
    url: '/cart/change.js',
    data: {
        id: id,
        quantity: 0
    },
    dataType:'json',
    success: function(data){

        // Fatch Data 
        cart_mini_fatch()
        cart_main_fatch()
    },
    error: function(err){
        console.log('error')
    }

   })
   
}

// Fatch Data function

function cart_mini_fatch(){
    fetch('/?section_id=cart-mini')
    .then(reponse => reponse.text()) 
    .then(cartData => {
        var cartText = $(cartData)
        var cartItem = $('.cartmini__widget', cartText)
        var cartTotal = $('.cartmini__checkout-title', cartText)
        var cartProgress = $('.cartmini__shipping', cartText)
        $('.cartmini__widget').replaceWith(cartItem)
        $('.cartmini__checkout-title').replaceWith(cartTotal)
        $('.cartmini__shipping').replaceWith(cartProgress)
    })

    $.getJSON('/cart.js', function(cart){
            
        var itemCount = cart.item_count
        $('.cart_item').text(itemCount)
    })
}

// Fetch Collection section for Collection filtering

function collection__filtering(){
    fetch('/?section_id=collection-main')
    .then(reponse => reponse.text()) 
    .then(calltData => {
        var callText = $(calltData)
        var callWrapper = $('.collection__main_wrapper', callText)
        
        $('.collection__main_wrapper').replaceWith(callWrapper)
    })
};


// Cart page Quanity Incress button 
    
    
function itemPlus(e , el){
    var id = $(el).data('id')
    var qty = $(el).prev().val()
    qty = parseInt(qty) + 1;

    $.ajax({
        type: "POST",
        url: "/cart/change.js",
        data:{
            id: parseFloat(id),
            quantity: qty
        },
        dataType:'json',
        success: function(data){
            cart_main_fatch()
            cart_mini_fatch()
        },
        error: function(err){
            console.log('error')
        }
    })
}

// Cart page Quanity Decress button 

function itemMinus(e , el){
    var id = $(el).data('id')
    var qty = $(el).next().val()
    qty = parseInt(qty) - 1;


    $.ajax({
        type: "POST",
        url: "/cart/change.js",
        data:{
            id: parseFloat(id),
            quantity: qty
        },
        dataType:'json',
        success: function(data){
            cart_main_fatch()
            cart_mini_fatch()

        },
        error: function(err){
            console.log('error')
        }
    })
}

// Cart page Quanity Remove button

function itemRemove(e , el){
    var id = $(el).data('id')

    $.ajax({
        type: "POST",
        url: "/cart/change.js",
        data:{
            id: parseFloat(id),
            quantity: 0
        },
        dataType:'json',
        success: function(data){
            cart_main_fatch()
            cart_mini_fatch()

        },
        error: function(err){
            console.log('error')
        }
    })
}

// Fatch Data function for Cart Page

function cart_main_fatch(){
    fetch('/?section_id=cart-main')
    .then(reponse => reponse.text()) 
    .then(cartData => {
        var cartText = $(cartData)
        var cartItem = $('.cartmain__widget_wrapper', cartText)
        $('.cartmain__widget_wrapper').replaceWith(cartItem)
    })

    $.getJSON('/cart.js', function(cart){
            
        var itemCount = cart.item_count
        $('.cart_item').text(itemCount)
    })
}

// $(".available-input input").on('change', function () {
//     var availability = $(this).val();
//     collection = $('input[name="collection_name"]:checked').val();
//     min_price = $('#min_price').val();
//     max_price = $('#max_price').val();

//     fetch('/?section_id=products_wrap')
//     .then(response => response.text())
//     .then(infoData => {
//         var products = $(infoData);
//         var items = $('.collection-products' , products);
//         if(availability !=''){
//           location.href ="/collections/"+ collection +"?filter.v.availability=" +
//           availability +
//           "&filter.v.price.gte=" +
//           min_price +
//           "&filter.v.price.lte=" +
//           max_price + "";
//         }else {
//           if(max_price > 0) {
//             location.href ="/collections/"+ collection +
//             "?filter.v.price.gte=" + min_price + 
//             "&filter.v.price.lte=" + max_price + "";
//           } else {
//             location.href ="/collections/"+ collection +"";
//           }
        
//         }
//         console.log('Items '  + items);
//         $('.collection-products').replaceWith(items);
//         // console.log('test' + cart_progress);
//     });