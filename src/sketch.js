export default function sketch (p) {
  let rotation = 0;
  let size = 0;
  let dim = 0;
  let h = 0;
  let increasing = false;
  let FPS = 15;

  p.setup = function () {
    p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
    p.dim = p.width/2;
    p.colorMode(p.HSB, 360, 100, 100);
    p.noStroke();
    p.ellipseMode(p.RADIUS);
    p.frameRate(FPS);
  };

  p.draw = function () {
    if(h == 360) {
      increasing = false;
    } else if (h == 0){
      increasing = true;
    }
    p.background(255,255,255,0);
    p.fill(h, 60, 60);
    p.ellipse(0,0, (window.innerWidth/4), (window.innerWidth/4));
    if(increasing) {
      h++;
    } else {
      h--;
    }
  };
};
