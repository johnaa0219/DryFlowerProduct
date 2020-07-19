/*
1.購物車
-fetch商品資料 -> 加入DOM (V)
-可點擊加入購物車
    -> div增加id(V) -> 點擊後頁面最下方出現選取數量 +　頁面其他部分變暗 (V)
    -> 點擊後用id搜尋資料庫(V)
    -> 得到價格 品名 -> 選取數量 (V)
    -> 統整後{品名,價格,數量}存進資料庫 (V)
    -> 購物車總計畫面使用
-計算品項、總金額

*/
var items = document.querySelector('.items');
var checkout = document.querySelector('.checkout');
var checkNum = document.querySelector('.checknum');
var checkoutBack = document.querySelector('.checkoutback');
var checkButton = document.querySelector('.checkbutton');
var final = [{"name" : "" , "src" : "" , "price" : 0 , "num" : 0}];
LoadCommodity();
async function LoadCommodity(){
    await fetch('commodity.json')
    .then(function(response){
        return response.json();
    })
    .then(function(myJson){
        for(var i=0; i<myJson.length; i++){
            var node = document.createElement("div");
            node.classList.add('item');
            node.setAttribute('id',i); //div增加id
             //第一個參數event 第二個傳入自訂參數
            /*
             點擊後用id搜尋資料庫 問題?-> id固定在最後一個 
             -> node.getAttribute('id') node停在最後一個
             ->改成this.getAttribute('id')
            */
            node.addEventListener('click',addcart);
            var IMG = document.createElement("img");
            IMG.setAttribute("src", myJson[i].src);
            var PRICE = document.createElement("p");
            var NAME = document.createElement("p");
            PRICE.innerHTML = "$" + myJson[i].price; //node p要用innnerHTML
            NAME.innerHTML = myJson[i].name;
            node.appendChild(IMG);
            node.appendChild(PRICE);
            node.appendChild(NAME);
            items.appendChild(node); //加入DOM
        }
        function addcart(e){
            var ID = e.currentTarget.getAttribute("id");
            //e.currentTarget為事件監聽者
            //e.target為事件發出者
            var children = checkout.childNodes;
            var checknumchildren = checkNum.childNodes;
            var num = 1;
            children[0].setAttribute("src",myJson[ID].src);
            final[0].src = myJson[ID].src;
            children[1].innerHTML = myJson[ID].name;
            final[0].name = myJson[ID].name;
            children[2].innerHTML = "$" + myJson[ID].price;
            final[0].price = myJson[ID].price;
            checknumchildren[2].innerHTML = num;
            final[0].num = num;
            checknumchildren[1].addEventListener('click',function(){
                if(num>=2){
                    num--;
                    checknumchildren[2].innerHTML = num;
                    final[0].num = num;
                }
            })
            checknumchildren[3].addEventListener('click',function(){
                num++;
                checknumchildren[2].innerHTML = num;
                final[0].num = num;
            })
            checkButton.addEventListener('click',confirm);
            $(checkoutBack).show();
            checkout.style.bottom = "0";
        }
    })
} 

checkoutBack.addEventListener('click',function(){
    $(checkoutBack).hide();
    checkout.style.bottom = "-100px";
    checkButton.removeEventListener('click',confirm);
    //無法取消綁定 因為num不同了 所以改為使用全域變數
})

function confirm(){
    var Cart = localStorage.getItem('Cart');
    if(Cart == null){
        localStorage.setItem('Cart',JSON.stringify(final));
    }
    else{
        var cart = JSON.parse(Cart);
        var index = $.map(cart, function(item, index) {
            return item.name;
          }).indexOf(final[0].name);
          console.log(index);
        if(index==-1){
            cart.push(final[0]);
            localStorage.setItem('Cart',JSON.stringify(cart));
        }
        else{
            cart[index].num = cart[index].num+final[0].num;
            localStorage.setItem('Cart',JSON.stringify(cart));
        }
        
    }
    $(checkoutBack).hide();
    checkout.style.bottom = "-100px";
}