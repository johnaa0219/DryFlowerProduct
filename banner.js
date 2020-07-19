var currentId = 3; //從第三個開始
var left = document.querySelector('#left');
var right = document.querySelector('#right');
var imgContainer = document.querySelector('.showimg');
var bannerNum = (imgContainer.childElementCount-1)/2;
var distance = -80;

imgContainer.style.transform = "translateX(" + -80 +"%)";
function moveleft(){
    imgContainer.classList.add('transition');
    left.removeEventListener('click',moveleft);
    right.removeEventListener('click',moveright);
    distance+=52;
    imgContainer.style.transform = "translateX(" + distance +"%)"; //圖片左移
    currentId--;
    if(currentId === 2){
        //等左移動畫結束才執行(setTimeout 350)
        //取消動畫時間 直接2跳2+n圖
        //移動currentId  2跳2+n圖完才加回動畫時間
        setTimeout(moveBack =>{ 
            imgContainer.classList.remove('transition'); 
            //問題:跑完動畫瞬間觸發下一次點擊，2跳5圖，transition還沒回來，就左移
            //縮短2跳5圖結束 到 加回transition 之時間(但不能小於2跳5圖的時間)
            distance=distance-(52*bannerNum);
            imgContainer.style.transform = "translateX(" + distance +"%)";
            setTimeout(addTrans => {
                imgContainer.classList.add('transition');
            },25);
            currentId+=bannerNum;
        },350); 
    }
    setTimeout(addListen =>{  //從2跳圖到5 與 重新監聽事件 之間隔 要大於左移動畫時間
        left.addEventListener('click',moveleft);
        right.addEventListener('click',moveright);
    },400);
}

function moveright(){
    imgContainer.classList.add('transition');
    right.removeEventListener('click',moveright);
    left.removeEventListener('click',moveleft);
    distance-=52;
    imgContainer.style.transform = "translateX(" + distance +"%)";
    currentId++;
    if(currentId === bannerNum*2){
        setTimeout(moveBack =>{
            imgContainer.classList.remove('transition');
            distance+=(52*bannerNum);
            imgContainer.style.transform = "translateX(" + distance +"%)";
            setTimeout(addTrans => {
                imgContainer.classList.add('transition');
            },25);
            currentId-=bannerNum;
        },350);
    }
    setTimeout(addListen =>{ //從6跳圖到3 與 重新監聽事件 之間隔 要大於右移動畫時間
        right.addEventListener('click',moveright);
        left.addEventListener('click',moveleft);
    },400);
}
left.addEventListener('click',moveleft);
    /*點擊後container往左
    if(第二個){
        移除transition
        移到第2+n個
        加回transition
    }
    */
    /*問題!
        當currentId=2，圖片要跳到第5個，在圖片未左移到定點時，再次按下left會使currentId持續減
        因此無法觸發條件式
    1.在未到定點取消事件監聽
    */
right.addEventListener('click',moveright);
    /*點擊後container往右
    //總共2n+1個
    if(第2n個){
        右移後
        移除transition
        移到第n個
        加回transition
    }
    */