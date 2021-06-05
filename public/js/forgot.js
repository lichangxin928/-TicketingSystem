window.onload = function () {
    var em = document.getElementById('email');
    var divs = document.getElementsByClassName('tf');
    let codeInput = document.querySelector('#code')
    var bt = document.getElementById('bt');
    em.onblur = function () {
        if (em.value == '') {
            divs[0].innerHTML = "邮箱账号不能为空！"
        }else if (/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(em.value) == false) {
            divs[0].innerHTML = "请输入正确的邮箱格式！";
            return false;
        }
        else {
            divs[0].innerHTML = ""
        }
    }
    bt.onclick = function () {
        let email = em.value;
        let code = codeInput.value;
        if((divs[0].innerHTML=='' || divs[0].innerHTML=='邮箱发送成功')&&codeInput.value!=''){
            $.get("/findPsw?email="+email+'&code='+code,(data,status)=>{
                console.log(data)
                if(data == "yes") document.myform.submit();
                else divs[1].innerHTML = "验证码输入错误，请重新输入"
            })
        }
    }
 
}
function sendEmail() {
    var divs = document.getElementsByClassName('tf');
    var em = document.getElementById('email');
    if (em.value == '') {
        divs[0].innerHTML = "邮箱账号不能为空！"
        em.focus();
        return false;
    }
    else if (/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(em.value) == false) {
        divs[0].innerHTML = "请输入正确的邮箱格式！";
        return false;
    }
    var time = 60;//定义60秒的倒计时
    var email = $('#email').val();//获取输入框的邮箱

    //这里用ajax将邮箱发到后台
    $.get('/email',
        {
            email: email,
        },
        function (data) {
            console.log(data)
            if (data.status == 400) {
                divs[0].innerHTML = "无该用户数据"
            } else {
                divs[0].innerHTML = "邮箱发送成功";
                //设置一个定时，一秒执行一次
                var mytime = setInterval(function () {
                    subs();
                }, 1000)
                function subs() {
                    time--;
                    $('#emialcore').attr("value", "请" + time + "秒后再试");
                    if (time === 0) {
                        clearInterval(mytime);
                        $('#emialcore').attr("value", "发送验证码");
                        $('#emialcore').attr("disabled", false);//按键可用
                    } else {
                        $('#emialcore').attr("disabled", true);//按键不可用
                    }
                }
            }
        }
    )

}

