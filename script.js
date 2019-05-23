//var surname = prompt('Greetings friend, may I enquire as to your surname?');
//var numPeople = prompt('May I ask how many people are in your circle?');
var numPeople = 14.0;
var survive = 0;
var killed = 2;
var started = false;

var c = numPeople;
var cx = [];
var cy = [];
var ca = [];
var circleAlive = [];
var n = 180;
var next = 0;
var death = 0;
var forward = true;
var inc = 1;
var attack = 1;

function setup() {
   var canvas = createCanvas(640, 480);
   canvas.parent('sketch');
  background(200);
  noLoop();
}

function draw() {
  background(200);

  if(started){
    for(i = 0; i < numPeople; i++){
      if(circleAlive[i]){
        ellipse(cx[i], cy[i], 40, 40);
        text(i+1, cx[i]-5, cy[i]+5);
      }
    }
    if ( dist(cx[next], cy[next], cx[attack], cy[attack]) <= 15
      && forward){
      circleAlive[attack] = false;
      forward = false;
      death++;
    }else if (forward){
      cx[next] = Math.cos(n* Math.PI / 180)*200 + 320;
      cy[next] = Math.sin(n* Math.PI / 180)*200 + 240;
      n++;
    }else if (forward == false) {
      cx[next] = Math.cos(n* Math.PI / 180)*200 + 320;
      cy[next] = Math.sin(n* Math.PI / 180)*200 + 240;
      n--;
      if(n <= ca[next]+1 && n >= ca[next]-1){
        if(death == numPeople-1){
          started = false;
          noLoop();
        }
        forward = true;
        next += Math.pow(2,inc);

        var i = next + 1;
        while(true){
          if(circleAlive[i]){
            attack = i;
            break;
          }
          i++;
          if(i >= numPeople){
            i = 0;
          }
        }

        n += (360.0/numPeople)*Math.pow(2,inc);
      }
    }

    if(next >= numPeople){
      for(i = 0; i < numPeople; i++){
        if(circleAlive[i]){
          next = i;
          n = ca[i];
          break;
        }
      }
      for(i = next+1; i < numPeople; i++){
        if(circleAlive[i]){
          attack = i;
          break;
        }
      }
      inc++;
    }
    //text(n, 10, 10);
    //text(ca[next], 10, 30);
  }
}

function josephus(n, k){
  if (n == 1){
    return 1;
  }
  return (josephus(n - 1, k) + k-1) % n + 1;
}

function clickButton(){
  cx.length = 0;
  cy.length = 0;
  ca.length = 0;
  circleAlive.length = 0;
  n = 270;
  next = 0;
  death = 0;
  inc = 1;
  attack = 1;

  numPeople = document.getElementById("people").value;
  c = numPeople;
  survive = josephus(numPeople,2);

  while (c > 0) {
    cx.push(Math.cos(n* Math.PI / 180)*200 + 320);
    cy.push(Math.sin(n* Math.PI / 180)*200 + 240);
    ca.push(n);
    circleAlive.push(true);

    n += (360.0/numPeople);
    counter = n;
    c--;
  }
  n = 270;

  started = true;
  loop();

  document.getElementById("result").innerHTML = "number " + survive + " will survive in a group of "+ numPeople;
}



/*
function drawCicles(numPeople){
  var c = numPeople;
  var cx = 0.0;
  var cy = 0.0;
  var n = 90.0;

  while (c > 0) {
    cx = Math.cos(n* Math.PI / 180)*200 + 320;
    cy = Math.sin(n* Math.PI / 180)*200 + 240;
    ellipse(cx, cy, 50, 50);
    n += (360.0/numPeople);
    c--;
  }

}


document.write("<h2>Hello</h2>");
document.write("<p>there are " + numPeople + " people in your group</p>");
document.write("<p>number " + survive + " survived in your group</p>");
*/
