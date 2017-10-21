var canvas = document.getElementById('canv');
var title = document.getElementById('title');
var audio = document.getElementById('audio');
var ctx = canvas.getContext("2d");
var mute = document.getElementById('mute');

canvas.height = document.getElementById('stars').clientHeight;
canvas.width = document.getElementById('stars').clientWidth;

star_pos = [];
num_stars = 130 + Math.random() * 20;
count = 0;

function generate_stars()
{
  star_pos = [];
  console.log("new stars");
  for(i = 0; i < num_stars; ++i)
  {
    star_pos.push({x: Math.random() * canvas.width, y: Math.random() * canvas.height, intensity: 0.0});
  }
}

function stars_twinkle()
{
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  var rand_factor;
  var alpha;

  for(i = 0; i < num_stars; ++i)
  {
    rand_factor = Math.random();
    var alpha = star_pos[i].intensity * (0.9 + 0.2 * rand_factor);
    ctx.fillStyle =  "rgba(255, 255, 230, " + alpha + ")";
    ctx.fillRect(star_pos[i].x, star_pos[i].y, 2.5 * (0.9 + 0.2 * rand_factor), 2.5 * (0.9 + 0.2 * rand_factor));
    /*
    ctx.beginPath();
    ctx.arc(star_pos[i].x, star_pos[i].y, 2 * (0.9 + 0.2 * rand_factor), 0, 2 * Math.PI);
    ctx.fill();
    */
  }
}

canvas.onmousemove = function change_intensity(ev)
{
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  var alpha;
  for(i = 0; i < num_stars; ++i)
  {
    alpha = 0.1 + 0.9*Math.exp((- Math.pow((star_pos[i].x - ev.clientX)/canvas.width, 2) - Math.pow((star_pos[i].y - ev.clientY)/canvas.height, 2))/ 0.05);
    star_pos[i].intensity = alpha;

    ctx.fillStyle =  "rgba(255, 255, 230, " + alpha + ")";
    ctx.fillRect(star_pos[i].x, star_pos[i].y, 2.5, 2.5);

    /*
    ctx.beginPath();
    ctx.arc(star_pos[i].x, star_pos[i].y, 2, 0, 2 * Math.PI);
    ctx.fill();
    */
  }

  //play audio with increasing volume
  if(audio.volume <= (1.0/1.03))
  {
    audio.volume = audio.volume * 1.03;
  };

};

canvas.ondblclick = function() {
                                  ctx.clearRect(0, 0, canvas.width, canvas.height);
                                  generate_stars();
                               };


generate_stars();

//initially muted audio
audio.play();
audio.muted = true;

setInterval(stars_twinkle, 400);

// keep decreasing volume and title text
setInterval(function() { if (audio.volume >= 0.07) {audio.volume = audio.volume * 0.99;} }, 40);

// initially opacity will not be computed
if(title.style.opacity == "")
{
  title.style.opacity = 1.0;
}

var timer = null;
title.onmouseover = function increase(){
                                clearInterval(timer);
                                timer = setInterval(function()
                                {
                                  if(title.style.opacity <= 1.0/1.08)
                                  {
                                    title.style.opacity = title.style.opacity * 1.08  ;
                                  }
                                  console.log(title.style.opacity);
                                }, 40);
                              };

title.onmouseout = function decrease(){
                                clearInterval(timer);
                                timer = setInterval(function()
                                {
                                  if (title.style.opacity >= 0.05)
                                  {
                                      title.style.opacity = title.style.opacity * 0.95;
                                  }
                                  console.log(title.style.opacity);
                                }, 40);
                              };

// the mute function
mute.onclick = function() {
                            audio.muted = !(audio.muted);
                            if(audio.muted == true) {
                              console.log("muted");
                              mute.src = "./images/muted.png";
                            } else {
                              console.log("unmuted");
                              mute.src = "./images/unmuted.png";
                            }
                          };
