$(function(){

  var size = window.getComputedStyle(document.body,':after').getPropertyValue('content');
  var cityImg = $("body").data("bg");
  if (size == "desktop") {
    $("#city").css("background-image", "url(" + cityImg + ")");
  }
  
  var windowH = window.innerHeight;
  $("#city").height(windowH);
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var W = canvas.width;
  var H = canvas.height;

  var particles = [];
  for (var i = 0; i < 280; i++) {
    particles.push(new Particle(false));
  }

  function Particle(shooting) {
    this.x = Math.random()*W;
    this.y = Math.random()*H;
    this.vx = Math.random()*70-10;
    this.vy = Math.random()*70-10;
    this.size = Math.random()*2;
    this.blue = Math.floor(Math.random()*8);
    this.yellow = Math.floor(Math.random()*6);
    this.vx = Math.random()*120-110;
    this.vy = Math.random()*130-120;
    this.shooting = shooting;
    this.opacity = Math.random()*1;
  }

  function shoot() {
    var go = Math.floor(Math.random()*2);
    var count = Math.floor(Math.random()*2);
    if (go === 1) {
      for (var c = 0; c < count; c++) {
        particles.push(new Particle(true));
      }
    }
  }

  var x = 100; var y = 100;

  function satelite() {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(x, y, 2, Math.PI*2, false);
    ctx.fill();
    x+=3;
    y+=3;
  }

  function draw() {
    ctx.fillStyle = "#121212";
    ctx.fillRect(0, 0, W, H);
    
    for (var t = 0; t < particles.length; t++) {
      var p = particles[t];
      ctx.beginPath();
      if (p.blue === 1) {
        ctx.fillStyle = "#5bdeff";
      } else if (p.yellow === 1) {
        ctx.fillStyle = "#fffea9";
      } else if (p.shooting === true) {
        ctx.fillStyle = "white";
      } else {
        ctx.fillStyle = "rgba(255,255,255," + p.opacity + ")";
      }
      ctx.arc(p.x, p.y, p.size, Math.PI*2, false);
      ctx.fill();

      if (p.shooting === true) {
        p.x += p.vx;
        p.y += 10;
      }
    }
  }

  setInterval(draw, 20);
  setInterval(shoot, 200);
  setInterval(satelite, 10);
})