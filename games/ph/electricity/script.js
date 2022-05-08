class electricity {
  constructor(selector) {
    this.svg = document.querySelector(selector);
    this.run();
  }

  render() {
    let d = this.calculatePoints(0, 0, 500, 80);
    this.svg.querySelectorAll("path")[0].setAttribute("d", d);
    this.svg.querySelectorAll("path")[1].setAttribute("d", d);
  }

  calculatePoints(x, y, width, height) {
    let points = [[x, height / 2]];
    let maxPoints = 10;
    let chunkRange = width / maxPoints;
    for (let i = 0; i < maxPoints; i++) {
      let cx = chunkRange * i + Math.cos(i) * chunkRange;
      let cy = Math.random() * height;
      points.push([cx, cy]);
    }

    points.push([width, height / 2]);

    let d = points.map((point) => point.join(","));
    return "M" + d.join(",");
  }

  run() {
    let fps = 25,
      now,
      delta,
      then = Date.now(),
      interval = 1000 / fps,
      iteration = 0,
      loop = () => {
        requestAnimationFrame(loop);

        now = Date.now();
        delta = now - then;
        if (delta > interval) {
          then = now - (delta % interval);

          // update stuff
          this.render(iteration++);
        }
      };
    loop();
  }
}

new electricity("svg");
