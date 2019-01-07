    window.addEventListener('DOMContentLoaded',function () {
    /*获取所有li*/
    var headerInnerlis = document.querySelectorAll('.nav li');
    //获取小箭头
    var arrowNode = document.querySelector('.arrows');
    var arrowWidthNode = arrowNode.offsetWidth/2;
    //获取所有down
    var downNodes = document.querySelectorAll('.down');
    //获取content
    var contentNode = document.querySelector('.content');
    //获取ul
    var contentInnerNode = document.querySelector('.content-inner');
    //获取内容区右侧小圆点
    var contentRightDotNodes = document.querySelectorAll('.content .content-dot li');
    //获取第五屏ul
    var teamListsNodes = document.querySelectorAll('.team-inner .team-lists li');
    var teamListsNode = document.querySelector('.team-inner .team-lists');


    //获取contentNode高度
    var contentH = contentNode.offsetHeight;
    //定义时间接受变量
    var timer= 0;
    //定义一个计数器
    var num = 0;

        //头部部分
    headerHandle();
    function headerHandle() {
        var img = new Image();
        img.src = './img/home.png';
        img.onload = function () {
            //设置down的默认宽度100%
            downNodes[0].style.width = '100%';
            //设置小箭头初始位置
            arrowNode.style.left = headerInnerlis[0].getBoundingClientRect().left + headerInnerlis[0].offsetWidth/2 - arrowWidthNode + 'px';
        }
       //
       // console.log(arrowNode.style.left)
       //  console.log(headerInnerlis[0].getBoundingClientRect().left)

        //所有Li添加点击事件
        for (var i = 0; i < headerInnerlis.length; i++) {
            //给所有li添加一个index属性
            headerInnerlis[i].index = i;
            contentRightDotNodes[i].index = i;
            headerInnerlis[i].onclick = function () {
                //清除上次的样式
                contentRightDotNodes[num].className = '';
                downNodes[num].style.width = '';
                num = this.index;
                move(num)
                // console.log(num)
                // console.log(arrowWidthNode)
            }
            //内容区右侧小圆点移动
            contentRightDotNodes[i].onclick = function () {
                //清除上次的样式
                contentRightDotNodes[num].className = '';
                downNodes[num].style.width = '';
                num = this.index;
                move(num)
            }
        }
    }

    // 公共区域move
    function move(num) {
        //设置当前小箭头宽度为100%
        downNodes[num].style.width = '100%';
        // console.log(this.index)
        //小箭头移动
        arrowNode.style.left = headerInnerlis[num].getBoundingClientRect().left +headerInnerlis[num].offsetWidth/2 - arrowWidthNode +'px';
        //内容区移动
        contentInnerNode.style.top = num * -contentH + 'px';
        //内容区右侧小圆点移动
        rightDot();
    }

    //内容区小圆点
    function rightDot() {
        for (var i = 0 ; i < contentRightDotNodes.length ; i++) {
            // num = i;
            // num = this.index;
            contentRightDotNodes[i].className = '';console.log(num)

        }
        contentRightDotNodes[num].className = 'active';console.log(num)
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
                   clearTimeout(timer)
                   //清除上次的样式
                   rightDot();
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
                                   // console.log(num)
                               }
                               break;
                       }
                   },150);

               //禁止默认行为
               event.preventDefault && event.preventDefault();
               return false;
           }
    }

    //解决打开控制台导致浏览器大小问题
    window.onresize = function () {
        //解决打开控制台小箭头位置

        arrowNode.style.left = headerInnerlis[num].getBoundingClientRect().left + headerInnerlis[num].offsetWidth/2 - arrowWidthNode+'px';
        //解决打开控制台内容区位置
        // console.log(arrowNode.offsetLeft)
        contentInnerNode.style.top = num * -contentH+'px';

    }


    //  第一屏部分
    firstScreenHandle();
    function firstScreenHandle() {
        //  获取元素
        var firstCarouselNodes = document.querySelectorAll('.homme-carousel li');
        //  获取小圆点
        var firstDotNodes = document.querySelectorAll('.homme-dot li');
        //  获取home
        var hommeNode = document.querySelector('.homme');
        var lastIndex = 0;
        var nowIndex = 0;
        var lastTimer = 0;
        var timer = null;
        for (var i = 0; i < firstDotNodes.length; i++) {
            firstDotNodes[i].index = i;
            firstDotNodes[i].onclick = function () {
                nowIndex = this.index;
                //设置轮
            var nowTimer = Date.now();
            if(nowTimer - lastTimer <= 2000) return;
                lastTimer = nowTimer;
            if(nowIndex === lastIndex) return;

            //    向右操作
            if(nowIndex > lastIndex){
                firstCarouselNodes[nowIndex].className = 'commonTitle rightShow';
                firstCarouselNodes[lastIndex].className = 'commonTitle leftHide';
            }else {
                firstCarouselNodes[lastIndex].className = 'commonTitle rightHide';
                firstCarouselNodes[nowIndex].className = 'commonTitle leftShow';
            }

                //清除上次小圆点的背景
                firstDotNodes[lastIndex].className = '';
                // console.log(firstDotNodes[num])
                //改变当前小圆点显示背景颜色
                this.className='active';
                lastIndex = nowIndex;

            }
        }

        //homme鼠标移入
        hommeNode.onmouseenter = function () {
            clearInterval(timer);
        }

        //homme鼠标移出
        hommeNode.onmouseleave = autoPlay;
        autoPlay();
        function autoPlay() {
            timer = setInterval(function () {
                nowIndex++;
                if(nowIndex >= 4){
                    nowIndex = 0;
                }
                firstCarouselNodes[nowIndex].className = 'commonTitle rightShow';
                firstCarouselNodes[lastIndex].className = 'commonTitle leftHide';
                //清除上次小圆点的背景
                firstDotNodes[lastIndex].className = '';
                // console.log(firstDotNodes[num])
                //改变当前小圆点显示背景颜色
                firstDotNodes[nowIndex].className='active';
                //同步
                lastIndex = nowIndex;
            },2500)
        }

    }


    //第五屏
    fiveScreenHandle();
    function fiveScreenHandle() {
        var width = teamListsNodes[0].offsetWidth;
        var height = teamListsNodes[0].offsetHeight;
        var canvas = null;
        var timer1 = null;
        var timer2 = null;
        //downDon鼠标移入移出
        fiveClick()
        function fiveClick() {
            for (var i = 0; i < teamListsNodes.length; i++) {
              teamListsNodes[i].index = i;
                teamListsNodes[i].onmouseenter = function () {
                    for (var j = 0; j < teamListsNodes.length; j++) {
                        teamListsNodes[j].className = 'active'
                    }
                  //气泡效果
                  if(!canvas){
                    //  创建画布
                    canvas = document.createElement('canvas');
                    //
                    canvas.width = width;
                    canvas.height = height;
                    canvas.className = 'canvas';
                    //创建圆
                    bubble(canvas);
                    teamListsNode.appendChild(canvas)
                  }
                    this.className = '';
                  //画布移动位置
                  canvas.style.left = this.index * width + 'px';

                }
                // 鼠标移出
                teamListsNode.onmouseleave = function () {
                    for (var j = 0; j < teamListsNodes.length; j++) {
                        teamListsNodes[j].className = ''
                    }
                  //  清除画布
                  canvas.remove();
                  canvas = null;
                  //清除定时器
                  clearInterval(timer1);
                  clearInterval(timer2);
                }
            }
        }

        //气泡
        function bubble(canvas) {
            //如果有这个属性就执行
            if(canvas.getContext){
              var ctx = canvas.getContext('2d');
              var width = canvas.width;
              var height = canvas.height;
              var arr = [];

            //生成圆
           timer1 = setInterval(function () {
              var r = Math.round(Math.random() * 255);
              var g = Math.round(Math.random() * 255);
              var b = Math.round(Math.random() * 255);
              var c_r = Math.round(Math.random() * 8 +2);
              var x = Math.round(Math.random() * width);
              var y = height + c_r;
              var s = Math.round(Math.random() * 50 + 20);

              //压入数组
              arr.push({
                r : r,
                g : g,
                b : b,
                x : x,
                y : y,
                s : s,
                c_r : c_r,
                deg : 0
              },50)
            })
              //创建圆
             timer2 = setInterval(function () {
               //清除画布山上次的元素
               ctx.clearRect(0,0,width,height);
               //遍历数组
               for (var i = 0; i < arr.length; i++) {
                 var itms = arr[i];
                  itms.deg += 6;
                  //求弧度
                  var rad = itms.deg * Math.PI / 180;

                 var x = itms.x + Math.sin(rad) * itms.s;
                 var y = itms.y - rad * itms.s;

                  if( i <= -itms.c_r){
                    arr.splice(i,1);
                    continue;
                  }
                  //设置样式
                  ctx.fillStyle = 'rgb('+ itms.r +','+ itms.g +','+ itms.b +')';
                  //开始画
                  ctx.beginPath();
                  //画圆
                  ctx.arc(x,y,itms.c_r,0,2 * Math.PI);
                  //填充圆
                  ctx.fill();
                }

              },1000/60)

            }
        }
    }


    })

