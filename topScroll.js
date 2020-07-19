const List = document.querySelector('.list');
const empty = document.querySelector('.secList');
var lastScrollY = 0;
var emptyY = empty.clientHeight;

window.addEventListener('scroll', function(){
  var st = this.scrollY;
  // 判斷是向上捲動，而且捲軸超過 200px
    
  if( st < lastScrollY) {
    List.classList.remove('hideList');
  }else if(st>emptyY){
    List.classList.add('hideList');
  }
  lastScrollY = st;
});


