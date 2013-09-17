/* Custom Javascript for this PhoneGap APP */

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady()
{
    console.log("phonegap is ready");
    Zepto(function($) {
        $(document.body).transition('options', {defaultPageTransition: 'fade', domCache: true});
        
        $("#search").on("pagebeforeload",function(event){
            alert("haha");
            
        });
        window.doctorz_app = {};
        (doctorz_app.init = function($) {
            doctorz_app.site_url = "http://localhost/doctorz/index.php/";
            doctorz_app.permanentStorage = window.localStorage;
            doctorz_app.tempStorage = window.sessionStorage;


            $.call(getInit("doctors"));
            $.call(getInit("specialities", function() {
                console.log("#loader");
                $("#loader").replaceWith('<a transition="flip" href="#search" class="go_next" title="Go Next">Go Next <img src="img/arrows.png" alt="" /></a>');
            }));



        })($);

        function getInit(model, callback) {
            $.ajax({
                type: "post",
                url: doctorz_app.site_url + "data_api/get_" + model,
                dataType: "text/plain",
                success: function(data, text, xhr) {
                    console.clear();
                    //console.log(data,text,xhr);
                    console.log(doctorz_app.permanentStorage.setItem(model, data));
                    // console.log(doctorz_app.permanentStorage.getItem("doctors"));
                }
            });
            if ((typeof callback) == "function") {
                callback();
            }
        }

//  $(".category").flickable({segments:4});
//  $(".show_next").on("click","a",function(e){console.log($(this));$('.category').flickable('scrollNext');})
    });
}

 