(function(){
    "use strict";
    let count=0;
    document.querySelector('.edit-button').addEventListener('click',()=>{
        count +=1;
        if(count%2){
            return document.querySelector('.edit').style.display = "block";
        }
        else return document.querySelector('.edit').style.display = "none"
    });

})();