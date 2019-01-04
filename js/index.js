window.addEventListener('DOMContentLoaded',function () {
    /*获取所有li*/
    var headerInnerlis = document.querySelectorAll('.nav li');
    //获取小箭头
    var arrowNode = document.querySelector('.arrows');
    var arrowWidthNode=arrowNode.offsetWidth/2;
    //获取所有down
    var downNodes = document.querySelectorAll('.down');
    //获取content
    var contentNode = document.querySelector('.content');
    //获取ul
    var contentInnerNode = document.querySelector('.content-inner');
    //获取contentNode高度
    var contentH = contentNode.offsetHeight;
    //定义时间接受变量
    var timer= 0;
    //定义一个计数器
    var num = 0;



    //头部部分
    headerHandl()
    function headerHandl() {
        //设置down的默认宽度100%
        downNodes[0].style.width = '100%';
        //设置小箭头初始位置
        arrowNode.style.left=headerInnerlis[0].getBoundingClientRect().left+headerInnerlis[0].offsetWidth/2-arrowWidthNode+'px';
        //所有Li添加点击事件
        for (var i = 0; i < headerInnerlis.length; i++) {
            //给所有li添加一个index属性
            headerInnerlis[i].index = i;
            headerInnerlis[i].onclick = function () {
                //清除上次的样式
                downNodes[num].style.width = '';
                num = this.index;
                move(num)
                console.log(num)
            }
        }
    }

    // 公共区域move
    function move(num) {
        //设置当前小箭头宽度为100%
        downNodes[num].style.width = '100%';
        // console.log(this.index)
        //小箭头移动
        arrowNode.style.left = headerInnerlis[num].getBoundingClientRect().left+headerInnerlis[num].offsetWidth/2 - arrowWidthNode+'px';
        //内容区移动
        contentInnerNode.style.top = num * -contentH+'px';

    }

    //内容区
    contentHandle();
    function contentHandle() {
           //滚轮事件
           document.onmousewheel = wheel;
           document.addEventListener('DOMMousescroll',wheel);
           //创建wheel函数
           function wheel(event) {
               event = event||window.event;
               //清除上次定时器
               clearTimeout(timer)；
               //清除上次的样式
               downNodes[num].style.width = '';
               timer = setTimeout(function () {
               var flag='';
               //ie/chrome
               if(event.wheelDelta){
                   if(event.wheelDelta>0){
                       flag = 'up';
                       console.log('up')
                   }else {
                       flag = 'down';
                       console.log('down')
                   }
                   //    firefox
               }else if(event.detail){
                   if(event.detail<0){
                       if(event.detail<0){
                           flag = 'up';
                       }else {
                           flag = 'down';
                       }
                   }
               }
               //判断flag
               switch (flag){
                   case 'up':
                       if(num > 0){
                           num--;
                           move(num);
                           console.log(num)
                       }
                       break;
                   case 'down':
                       if(num < headerInnerlis.length-1){
                           num++;
                           move(num);
                           console.log(num)
                       }
                       break;
               }

               return false;
               },150);
           }

        //禁止默认行为
        event.preventDefault && event.preventDefault();
    }

    //解决打开控制台导致浏览器大小问题
    window.onresize = function () {
        //解决打开控制台小箭头位置
        arrowNode.style.left=headerInnerlis[num].getBoundingClientRect().left+headerInnerlis[num].offsetWidth/2-arrowWidthNode+'px';
        //解决打开控制台内容区位置
        contentInnerNode.style.top = num * -contentH+'px';
    }

})

