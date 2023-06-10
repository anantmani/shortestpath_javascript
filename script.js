function mark(x) {
  let cur = des_ind;
  t = vertex[cur].pre;
  while (t != src_ver) {
    
    cur = t;
     t = vertex[cur].pre;

    let path = document.getElementById("g" + cur);
    setTimeout(path1, x * 10, path);
  }
  let sou_grid = document.getElementById("g" + src_ver);
  sou_grid.className = "grid_source";
  let des_grid = document.getElementById("g" + des_ind);
  des_grid.className = "grid_des";
}
function grid(id) {
  if (id != src_ver && id != des_ind)
    document.getElementById("g" + id).className = "grid_visit";
}
function path1(path) {
  if (path != "g" + des_ind && path != "g" + src_ver)
    path.className = "grid_path";
}
class Qelement {
  constructor(ele, w) {
    this.ele = ele;
    this.w = w;
  }
}
class priorityQueue {
  constructor() {
    this.item = [];
  }
  enqueue(ele, w) {
    
    let q = new Qelement(ele, w);
    let flag = false;
    for (let i = 0; i < this.item.length; i++)
    {
      if (this.item[i].w > q.w)
      {
        this.item.splice(i, 0, q);
        flag = true;
        break;
        }
    }
    if (!flag)
      this.item.push(q);
    
  }
  isempty() {
    return this.item.length == 0;
  }
  dequeue() {
    if (this.isempty())
      return "underflow";
    return this.item.shift();
  }
  front() {
    if (this.isempty()) return "no";
    return this.item[0];
  }
  rear() {
    if (this.isempty()) return "no";
    return this.item[this.item.length - 1];
  }
  print() {
    let str = ""
    for (let i = 0; i < this.item.length; i++) str += this.item[i].ele;
    return str;

  }
  present(element) {
    
    for (let i = 0; i < this.item.length; i++) {
     
          if (element == this.item[i].ele) {
        
        return true;
      }
    }
    return false;
  }
  remove(element) {
    let ind = -1;
    for (let i = 0; i < this.item.length; i++) {
      if (element == this.item[i].ele) ind = i;
    }
    if (ind > -1) {
      let temp = this.item[ind];
      this.item.splice(ind, 1);

      return temp;
    }
  }
}
for (i = 0; i < 800; i++) {
  const div1 = document.createElement("div");
  div1.className = "grid";
  div1.id = "g" + i;
  document.getElementById("container").appendChild(div1);
 // div1.innerHTML = i;
}
ele = document.querySelectorAll(".grid")
ele.forEach(element => {
  element.addEventListener("click", function(){block(element.id)})
});
//anomynous function above
blocked = new Set();
function block(id)
{
 
  if (id != "g"+src_ver && id != "g"+des_ind)
    document.getElementById(id).className = "grid_block";
  blocked.add(id);
}
let vertex = [];
let src_ver = 414;
for (i = 0; i < 800; i++) {
  if (i == 0) {
    vertex[i] = { weight: 10000, pre: "nil", adj: [1, 40] };
  } else if (i == 760) {
    vertex[i] = { weight: 10000, pre: "nil", adj: [761, 720] };
  } else if (i == 39) {
    vertex[i] = { weight: 10000, pre: "nil", adj: [38, 79] };
  } else if (i == 799) {
    vertex[i] = { weight: 10000, pre: "nil", adj: [798, 759] };
  } else if (i >= 1 && i <= 38)
    vertex[i] = { weight: 10000, pre: "nil", adj: [i + 1, i - 1, i + 40] };
  else if (i >= 761 && i <= 798)
    vertex[i] = { weight: 10000, pre: "nil", adj: [i + 1, i - 1, i - 40] };
  else if (i >= 40 && i <= 720 && i % 40 == 0)
    vertex[i] = { weight: 10000, pre: "nil", adj: [i + 1, i - 40, i + 40] };
  else if (39 >= 1 && i <= 759 && (i + 1) % 40 == 0)
    vertex[i] = { weight: 10000, pre: "nil", adj: [i - 1, i - 40, i + 40] };
  else
    vertex[i] = {
      weight: 10000,
      pre: "nil",
      adj: [i + 1, i - 1, i - 40, i + 40],
    };
}
let result = [];
vertex[src_ver].weight = 0;



let des_ind = 0;
let des = vertex[des_ind];



 
 
function algo() {
 

  let x = 0;
  let pr = new priorityQueue();
  for (let i = 0; i < 800; i++) {
    if (!blocked.has("g" + i)) {
      y = vertex[i].weight;
      pr.enqueue(i, y);
    }
  }
 
  while (!pr.isempty()) {
    x++;
    
    let temp = pr.dequeue();
   
    if (temp.w == 10000)
      break;
    result.push(temp);
    let id = temp.ele;
    
    setTimeout(grid, x * 10, id);

    vertex[temp.ele].adj.forEach((element) => {
     
      if (pr.present(element)) {
        
        let temp1 = pr.remove(element);
    
        if (vertex[temp.ele].pre == "nil" || vertex[temp.ele].pre - temp.ele == temp.ele - temp1.ele) {
          if (temp.w + 1 < temp1.w) {
            vertex[temp1.ele].weight = temp.w + 1;
            temp1.w = temp.w + 1;
            vertex[temp1.ele].pre = temp.ele;
          }
        }
        else {
          if (temp.w + 2 < temp1.w) {
            vertex[temp1.ele].weight = temp.w + 2;
            temp1.w = temp.w + 2;
            vertex[temp1.ele].pre = temp.ele;
          }
        }
         
        pr.enqueue(temp1.ele, temp1.w);
      }

    });
    
    if (temp.ele == des_ind) {
     mark(x);
      break;
    }
  }
  for (let i = 0; i < result.length; i++)
  {
    console.log(result[i].ele, vertex[result[i].ele].pre);
  }
}

