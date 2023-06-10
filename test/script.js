for (i = 0; i < 800; i++) {
  const div1 = document.createElement("div");
  div1.className = "grid";
  div1.id = "g" + i;
  
  document.getElementById("container").appendChild(div1);
  //div1.innerHTML = i;
}
//****** !!!!!!https://codepen.io/bradtraversy/pen/odmVgN!!!!!********  drag and drop
var src = "g206";
var ele = document.getElementById(src);
ele.draggable="true"
ele.className = "grid_Change";
ele.addEventListener("dragstart", dragStart);
ele.addEventListener("dragend", dragend);
var des = "g799";
var ele1 = document.getElementById(des);
ele1.draggable = "true";
ele1.className = "grid_Change";
ele1.addEventListener("dragstart", dragStart);
ele1.addEventListener("dragend", dragend);
 var eleli = document.querySelectorAll(".grid");
 eleli.forEach((element) => {
   element.addEventListener("dragover", dragover);
   element.addEventListener("dragleave", dragleave);
   
   element.addEventListener("dragenter", dragEnter);
   element.addEventListener("drop", dragDrop);
 });
function dragStart()
{
  this.className = "grid";
  
 
}
function dragend()
{
  this.className="grid_Change"
}
function dragover(e)
{
  e.preventDefault();
}
function dragEnter(e) {
  e.preventDefault();
  this.className = "grid_Change";
}
function dragleave()
{
  this.className = "grid";
 
}
function dragDrop()
{
  this.className = "grid_Change";
  src = this.id;
  this.draggable = "true";
  console.log(src);
}
//dropable item inside div