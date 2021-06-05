window.onload=function(){
    var btn=document.getElementById('bt');
    var em=document.getElementById('email');
    var psw=document.getElementById('password');
    var divs=document.getElementsByClassName('tf');
    em.onblur=function(){

        if(em.value==''){
            divs[0].innerHTML='邮箱账号不能为空！';
        }
        else divs[0].innerHTML='';
    }
    psw.onblur=function(){
        if(psw.value==''){
            divs[1].innerHTML='密码不能为空！';
            
        }
        else divs[1].innerHTML='';
    }
    btn.onclick=function(){
        if(em.value==''||psw.value==''){
            if(em.value==''){
                divs[0].innerHTML='邮箱账号不能为空！';
                em.focus();
            }
            if(psw.value==''){
                divs[1].innerHTML='密码不能为空！';
            }
            return false;
        }
        else if(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(em.value)==false){
            divs[0].innerHTML="请输入正确的邮箱格式！";
            return false;
        }
        document.myform.submit();
            $.get('/formTest?user='+em.value+'&psw='+psw.value,function(data,status){
                if(data=='yes') document.myform.submit();
                else divs[1].innerHTML='密码错误，请重新输入';
            })
        
    }
}