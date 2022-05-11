var ls = ["Home", "Desktop", "Downloads", "Music"];
var pl = document.getElementById("dv");
var help = [
  "ls     to get all the files",
  "cd   to change the directory",
  "mkdir    to make a folder",
];
var inp = document.getElementById("cli");
inp.addEventListener("change", () => {
  if (inp.value == "ls") {
    while (pl.firstChild) pl.firstChild.remove();
    for (let i = 0; i < ls.length; i++) {
      var li = document.createElement("li");
      li.innerHTML = `${ls[i]}`;
      pl.appendChild(li);
    }
  }
  if (inp.value == "help") {
    while (pl.firstChild) pl.firstChild.remove();
    for (let i = 0; i < help.length; i++) {
      var li = document.createElement("li");
      li.innerHTML = `${help[i]}`;
      pl.appendChild(li);
    }
  }
});
