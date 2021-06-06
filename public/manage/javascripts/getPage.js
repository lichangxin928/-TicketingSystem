window.onload = () => {
    let page = ['/zhu_ye', '/user_list', '/user_change', '/more',
        '/total', 'shang_jia', '/403', '/404', '/500', '/503']
    let a = document.querySelectorAll('.a');
    let form = document.querySelector('#form');
    for(let i = 0;i<10;i++){
        a[i].onclick = () => {
            form.setAttribute('action',page[i]);
            document.getPage.submit();
        }
    }
    
}