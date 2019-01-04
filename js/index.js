window.addEventListener('DOMContentLoaded',function () {
    headerHandl()
    function headerHandl() {
        /*获取所有li*/
        var headerInnerlis=document.querySelectorAll('.nav li');
//获取小箭头
        var arrownode=document.querySelector('.arrows');
//获取所有down
        var downnodes=document.querySelectorAll('.down');
//设置down的默认宽度100%
        downnodes[0].style.width= '100%';
//设置小箭头初始位置
        arrownode.style.left=headerInnerlis[0].getBoundingClientRect().left+headerInnerlis[0].offsetWidth/2-arrownode.offsetWidth/2+'px';
//所有Li添加点击事件
        for (var i = 0; i < headerInnerlis.length; i++) {
            //给所有li添加一个index属性
            headerInnerlis[i].index= i;

            headerInnerlis[i].onclick=function () {
                arrownode.style.left=this.getBoundingClientRect().left+this.offsetWidth/2-arrownode.offsetWidth/2+'px';
                //设置小箭头默认宽度为0
                for (var j = 0; j < downnodes.length; j++) {
                    downnodes[j].style.width='';
                }
                //设置当前小箭头宽度为100%
                downnodes[this.index].style.width= '100%';
                console.log(this.index)
            }
        }
    }


})

