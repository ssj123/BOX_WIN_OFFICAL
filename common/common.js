loadRem();

$(function(){
    $(".footer-menu-list").click(function(){
        $(this).toggleClass("on");
    })
})

function loadRem(){
     var setHtmlFS=() => {
        var fontSizeValue=window.innerWidth/19.2;//以iPhone6s为参照
        // fontSizeValue=fontSizeValue<100?fontSizeValue:100;
        fontSizeValue=fontSizeValue>50?fontSizeValue:50; 
        document.documentElement.style.fontSize = fontSizeValue+ 'px';
      }
       setHtmlFS();
       window.addEventListener("resize",setHtmlFS,false);
}


