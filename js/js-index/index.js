/**
 * Created by pangmutian on 2017/7/7.
 */
var menu_btn=false;
var this_li=0;
var bgTurnHeight;
//导航点击
function pageTurn(index){
    this_li=index;
    var winHeight=0;
    for(var i=0;i<index;i++){
        winHeight+=$(".content_box .under_box").eq(i).height();
    }
    var speed=500;//滑动的速度
    $('body,html').animate({ scrollTop: winHeight }, speed);
    if($(window).width()<800){
        $(".header_center ul").animate({height:0},600);
    }
    remove_click();
    menu_btn=false;
    return false;
}
//点击窄屏的下拉按钮
function add_click(){
    $(".menu_box .menu_first").addClass("menu_first_click");
    $(".menu_box .menu_second").addClass("menu_second_click");
    $(".menu_box .menu_third").addClass("menu_third_click");
}
//收起窄屏下拉按钮
function remove_click(){
    $(".menu_box .menu_first").removeClass("menu_first_click");
    $(".menu_box .menu_second").removeClass("menu_second_click");
    $(".menu_box .menu_third").removeClass("menu_third_click");
}
//存储关于背景改变的高度
function savesize(){
	bgTurnHeight=$(".content_box .under_box").eq(0).height();
}

$(function(){
	savesize();
    $(".bg_demo").height($(window).height());
    var box_height=new Array();
    for(var i=0;i<5;i++){
        box_height[i]=$(".under_box").eq(i).offset().top;
    }
    //alert(box_height);
    $(window).resize(function(){

		savesize();
        for(var i=0;i<5;i++){
            box_height[i]=$(".under_box").eq(i).offset().top;
        }
        //alert(box_height);
        $(".bg_demo").height($(window).height());
        if($(window).width()>800){
            if(menu_btn==true){
                $(".header_center ul").css({height:0});
                remove_click();
                menu_btn=false;
            }
        }
    });
    $(document).click(function(){
        if($(window).width()<800){
            $(".header_center ul").animate({height:0},700);
        }
        remove_click();
        menu_btn=false;
        //return false;
    })
    $(".menu_box").click(function(){
        if(menu_btn==false){
            $(".header_center ul").animate({height:58*6},600);
            add_click();
            menu_btn=true;
            return false;
        }
        else{
            $(".header_center ul").animate({height:0},600);
            remove_click();
            menu_btn=false;
            return false;
        }

    })
    
    var now_scrollTop=1;
    var now_scroll_move;
    
    $(window).scroll(function(){
        clearTimeout(now_scroll_move);
        now_scroll_move=setTimeout(function(){
            now_scrollTop=$(document).scrollTop();
            now_scrollTop++;
            for(var i=0;i<4;i++){
                if(now_scrollTop>=box_height[i]&&now_scrollTop<box_height[(i+1)]){
                    $(".header_box li a").removeClass("this_li");
                    $(".header_box li a").eq(i).addClass("this_li");
                }
            }
        },10);



        //滚屏至1/3第一部分的高度时
        if($(document).scrollTop()>(bgTurnHeight/3)){
            //两个背景图片切换
            $(".bg_1").css({"opacity":"0","zIndex":"1"});
            $(".bg_2").css({"opacity":".7","zIndex":"2"});
            for(var j=0;j<$(".skill_demo_box .skill_demo2").length;j++){
                doTimeOUT(j);
            }
        }
 
        if($(document).scrollTop()<($(".content_box .under_box").eq(0).height())){
            $(".bg_1").css({"opacity":".7","zIndex":"2"});
            $(".bg_2").css({"opacity":"0","zIndex":"1"});
        }
    });
    function doTimeOUT(i){
        setTimeout(function(){
            $(".skill_demo_box .skill_demo2").eq(i).show().addClass("animated fadeInLeft");
            $(".skill_demo_box .skill_demo2").eq(i).css("opacity","1");
        },i*300)

    }


    $(".box_3d").mouseenter(function() {
        var thisPX = $(this).offset().left;
        var thisPY = $(this).offset().top;
        var boxWidth = $(this).outerWidth();
        var boxHeight = $(this).outerHeight();
        $(".box_3d").addClass("for_in_3d");
        setTimeout(function(){
            $(".box_3d").removeClass("for_in_3d");
        },300);
        $(this).addClass("threeD2");
        $(".threeD2").mousemove(function(event) {
            var mouseX = event.pageX - thisPX;
            var mouseY = event.pageY - thisPY;
            var X;
            var Y;
            if (mouseX > boxWidth / 2) {
                X = mouseX - boxWidth/2;
            } else {
                X = mouseX - boxWidth/2;
            }
            if (mouseY > boxHeight / 2) {
                Y = boxHeight/2 - mouseY;
            } else {
                Y = boxHeight/2 - mouseY;
            }
            $(".threeD2").css({
                "transform": "rotateY(" + X / 60 + "deg) rotateX(" + Y / 20 + "deg)"
               // "-webkit-transform": "rotateY(" + X / 60 + "deg) " + "rotateX(" + Y / 20 + "deg)",
               //"-moz-transform": "rotateY(" + X / 60 + "deg) rotateX(" + Y / 20 + "deg)"
            });

        });
    });
    $(".box_3d").mouseleave(function() {
        $(this).removeClass("threeD2");
        $(".box_3d").addClass("for_in_3d");
        setTimeout(function(){
            $(".box_3d").removeClass("for_in_3d");
        },300);
        $(this).css({
            "transform": "rotateY(0deg) rotateX(0deg)",
            "-webkit-transform": "rotateY(0deg) rotateX(0deg)",
            "-moz-transform": "rotateY(0deg) rotateX(0deg)"
        });
    });


    $(".address_box p>img").hover(function(){
        $(".address_box p img").css({transform:"scale(1.2)"});
    },function(){
        $(".address_box p img").css({transform:"scale(1)"});
    });

})