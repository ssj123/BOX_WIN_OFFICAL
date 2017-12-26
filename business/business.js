

var _coreCode={
    user:null,

    pay:{
        payWays:[
            {text:"支付宝",value:"alipay"},
            {text:"微信",value:"wchat"},
            {text:"GCS",value:"gcs"},
            {text:"ETH",value:"eth"}            
        ],
        init:function(){
            $(".payWays .payItem_c").click(function(){
                $(".payWays .payItem_c").removeClass("active");
                $(this).addClass("active");
            })

            $("#payBtn").click(function(){
                $('#QRCode_Modal').modal({
                    keyboard : false,
                    show     : true
                })

                var div_QR_Code_img = document.getElementById("div_QR_Code_img");
                div_QR_Code_img.innerHTML = "";
                var qrcode = new QRCode(div_QR_Code_img, {
                    width: 180,//设置宽高
                    height: 180
                });
                qrcode.makeCode("http://www.baidu.com");
            })
        }
    },

    buy:{
        productPrice:399,
        buy_amount:1,
        init:function(){

            $("#btn_buy").click(function(){
                if(_coreCode.user){
                    window.location.href="/BOX_WIN_OFFICAL/pages/pay.html";
                }else{
                    _coreCode.goLoginUrl();
                }
            })

            var _this=this;
            $("#buy_amount").change(function(){
                _this.buy_amount=$(this).val();
                $(".totalPrice").text((_this.buy_amount*_this.productPrice).toFixed(2))
            })

            if(_coreCode.user)
            $("#mobile").val(_coreCode.user.username);
        }
    },

    goLoginUrl:function(){
        window.location.href="/BOX_WIN_OFFICAL/pages/login.html";
    },

    login:{
        init:function(){
            new Vue({
                el:".div_login",
                data:{
                    mobile:"",
                    verifyCode:"",
                    verifyCode_ok:false,
                    verifyCodeUrl:""
                },
                created:function(){
                    this.refreshVerifyCode();
                },
                computed:{
                    getMobileCodeActive:function(){
                        return /\d{11}/.test(this.mobile)&&this.verifyCode_ok;
                    }
                },
                watch:{
                    verifyCode:function(v){
                        this.verifyCode_ok=v.length==4;
                    }
                },
                methods:{
                    refreshVerifyCode:function(){
                        this.verifyCodeUrl="http://verify.red.xunlei.com/imgcode/refresh.php?v="+new Date().getTime();
                    },
                    login:function(){
                        var userData={
                            username:"18328472729",
                            token:"110"
                        }
                        sessionStorage.setItem("userData",JSON.stringify(userData));
                        //window.location.href="user/index.html"
                        window.history.go(-1);
                    }
                }
            })
        }
    },
    init:function(){
        this.checkLogin();
        this.bindHandler();
    },
    bindHandler:function(){
        $("#a_loginout").click(function(){
            sessionStorage.setItem("userData","");
            window.location.href="/BOX_WIN_OFFICAL/index.html";
        });
    },
    checkLogin:function(){
        var _user=sessionStorage.getItem("userData");
        if(_user){
            _user=JSON.parse(_user);
            _coreCode.user=_user;
            $(".no_login").remove();
        }else{
            $(".logined").remove();            
        }
        $("#username").text(_user?("***"+_user.username.substr(-4)):""); 
    }
}



$(function(){
    _coreCode.init();    

    var page=_coreCode[$("body>.page").attr("id")];
    page&&page.init();
})