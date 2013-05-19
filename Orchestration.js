function Orchestration(){
    this.time;
    this.niveau = 0;
};

Orchestration.prototype.loadVagues = function(){
   if(this.niveau == 0 && this.time ==  5){
       console.log("time =100");
   } else if(this.niveau == 0 && this.time ==  10){
       console.log("time =200");
   }
};