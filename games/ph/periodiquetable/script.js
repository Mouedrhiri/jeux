(function () {
  new Vue({
    el: "#App",
    data: {
      electrons: 0,
      electronsSlide: 1,
      diagram: [],
      sequence: {},
      notation: [],
      showFullNotation: false,
      layers: [],
      search: "H",
      elements: [
        "",
        "H",
        "He",
        "Li",
        "Be",
        "B",
        "C",
        "N",
        "O",
        "F",
        "Ne",
        "Na",
        "Mg",
        "Al",
        "Si",
        "P",
        "S",
        "Cl",
        "Ar",
        "K",
        "Ca",
        "Sc",
        "Ti",
        "V",
        "Cr",
        "Mn",
        "Fe",
        "Co",
        "Ni",
        "Cu",
        "Zn",
        "Ga",
        "Ge",
        "As",
        "Se",
        "Br",
        "Kr",
        "Rb",
        "Sr",
        "Y",
        "Zr",
        "Nb",
        "Mo",
        "Tc",
        "Ru",
        "Rh",
        "Pd",
        "Ag",
        "Cd",
        "In",
        "Sn",
        "Sb",
        "Te",
        "I",
        "Xe",
        "Cs",
        "Ba",
        "La",
        "Ce",
        "Pr",
        "Nd",
        "Pm",
        "Sm",
        "Eu",
        "Gd",
        "Tb",
        "Dy",
        "Ho",
        "Er",
        "Tm",
        "Yb",
        "Lu",
        "Hf",
        "Ta",
        "W",
        "Re",
        "Os",
        "Ir",
        "Pt",
        "Au",
        "Hg",
        "Tl",
        "Pb",
        "Bi",
        "Po",
        "At",
        "Rn",
        "Fr",
        "Ra",
        "Ac",
        "Th",
        "Pa",
        "U",
        "Np",
        "Pu",
        "Am",
        "Cm",
        "Bk",
        "Cf",
        "Es",
        "Fm",
        "Md",
        "No",
        "Lr",
        "Rf",
        "Db",
        "Sg",
        "Bh",
        "Hs",
        "Mt",
        "Ds",
        "Rg",
        "Cn",
        "Nh",
        "Fl",
        "Mc",
        "Lv",
        "Ts",
        "Og",
      ],
      infoDialog: false,
      help: [
        "You can select any element through the slider by its atomic number, or by clicking on the nucleus and typing its initials.",
        "written below the slider there is the simple notation of the distribution of the electrons, clicking on it expands the complete notation.",
        "the magnifying glass button does a google search for more information of the selected element, if you have any input error it will be disabled.",
      ],
    },
    methods: {
      buildDiagram: function () {
        var i, j, length, results;
        results = [];
        for (i = j = 0; j <= 6; i = ++j) {
          length = -Math.abs(i - 3.5) + 4.5;
          results.push(this.diagram.push(Array(length).fill(0)));
        }
        return results;
      },
      generateSequence: function () {
        var a, b, j, l, posX, posY, x;
        [posX, posY] = [[], []];
        for (x = j = 0; j <= 30; x = ++j) {
          a = 3 - (x % 4);
          b = x - 3 * Math.round(x / 4);
          l = x / 6.7;
          if (a <= l) {
            posX.push(a);
          }
          if (b >= l) {
            posY.push(b);
          }
        }
        return (this.sequence = { posX, posY });
      },
      distributeElectrons: function () {
        var _, count, i, j, len, posX, posY, ref, results, x, y;
        count = this.electrons >= 0 ? this.electrons : 0;
        ref = this.sequence.posX;
        results = [];
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          _ = ref[i];
          ({ posX, posY } = this.sequence);
          [x, y] = [posX[i], posY[i]];
          results.push(
            (count -= this.diagram[y][x] =
              count < 2 + 4 * x ? count : 2 + 4 * x)
          );
        }
        return results;
      },
      writeNotation: function () {
        var _, i, j, len, posX, posY, ref, sublayers, x, y;
        sublayers = ["s", "p", "d", "f"];
        this.notation.length = 0;
        ref = this.sequence.posX;
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          _ = ref[i];
          ({ posX, posY } = this.sequence);
          [x, y] = [posX[i], posY[i]];
          if (this.diagram[y][x]) {
            this.notation.push({
              location: y + 1 + sublayers[x],
              electrons: this.diagram[y][x],
            });
          }
        }
        if (this.notation.length > 5) {
          return this.notation.splice(2, 0, "...");
        }
      },
      getLayersElectrons: function () {
        var j, layer, len, ref, results;
        this.layers.length = 0;
        ref = this.diagram;
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          layer = ref[j];
          results.push(
            this.layers.push(
              layer.reduce((a, b) => {
                return a + b;
              })
            )
          );
        }
        return results;
      },
      increment: function (value) {
        if (
          (this.electrons > 1 && value < 0) ||
          (this.electrons < 118 && value > 0)
        ) {
          return (this.electrons += value);
        }
      },
      updateElectrons: function () {
        return (this.electrons = this.electronsSlide);
      },
      updateElementName: function () {
        return (this.search = this.elements[this.electrons]);
      },
      reversedArr: function (arr) {
        var i, j, ref, results;
        results = [];
        for (i = j = ref = arr.length - 1; j >= 0; i = j += -1) {
          results.push(arr[i]);
        }
        return results;
      },
      googleSearchElement: function () {
        var name;
        name = this.elements[this.electrons];
        return window.open(
          `https://www.google.com.br/search?q=element+${name}+${this.electrons}+periodic+table`
        );
      },
    },
    watch: {
      electrons: function () {
        this.distributeElectrons();
        this.writeNotation();
        this.getLayersElectrons();
        if (this.electrons > 0) {
          return (this.electronsSlide = this.electrons);
        }
      },
      search: function () {
        return (this.electrons = this.elements.indexOf(this.search));
      },
    },
    filters: {
      electronsIndicator: function (val) {
        if (val > 0) {
          return val;
        } else {
          return "?";
        }
      },
    },
    beforeMount: function () {
      this.buildDiagram();
      return this.generateSequence();
    },
    mounted: function () {
      return (this.electrons = 1);
    },
  });
}.call(this));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFBQSxJQUFJLEdBQUosQ0FDRTtJQUFBLEVBQUEsRUFBSSxNQUFKO0lBRUEsSUFBQSxFQUNFO01BQUEsU0FBQSxFQUFXLENBQVg7TUFDQSxjQUFBLEVBQWdCLENBRGhCO01BRUEsT0FBQSxFQUFTLEVBRlQ7TUFHQSxRQUFBLEVBQVUsQ0FBQSxDQUhWO01BSUEsUUFBQSxFQUFVLEVBSlY7TUFLQSxnQkFBQSxFQUFrQixLQUxsQjtNQU1BLE1BQUEsRUFBUSxFQU5SO01BT0EsTUFBQSxFQUFRLEdBUFI7TUFRQSxRQUFBLEVBQVUsQ0FBQyxFQUFELEVBQUssR0FBTCxFQUFVLElBQVYsRUFBZ0IsSUFBaEIsRUFBc0IsSUFBdEIsRUFBNEIsR0FBNUIsRUFBaUMsR0FBakMsRUFBc0MsR0FBdEMsRUFBMkMsR0FBM0MsRUFBZ0QsR0FBaEQsRUFBcUQsSUFBckQsRUFBMkQsSUFBM0QsRUFBaUUsSUFBakUsRUFBdUUsSUFBdkUsRUFBNkUsSUFBN0UsRUFBbUYsR0FBbkYsRUFBd0YsR0FBeEYsRUFBNkYsSUFBN0YsRUFBbUcsSUFBbkcsRUFBeUcsR0FBekcsRUFBOEcsSUFBOUcsRUFBb0gsSUFBcEgsRUFBMEgsSUFBMUgsRUFBZ0ksR0FBaEksRUFBcUksSUFBckksRUFBMkksSUFBM0ksRUFBaUosSUFBakosRUFBdUosSUFBdkosRUFBNkosSUFBN0osRUFBbUssSUFBbkssRUFBeUssSUFBekssRUFBK0ssSUFBL0ssRUFBcUwsSUFBckwsRUFBMkwsSUFBM0wsRUFBaU0sSUFBak0sRUFBdU0sSUFBdk0sRUFBNk0sSUFBN00sRUFBbU4sSUFBbk4sRUFBeU4sSUFBek4sRUFBK04sR0FBL04sRUFBb08sSUFBcE8sRUFBME8sSUFBMU8sRUFBZ1AsSUFBaFAsRUFBc1AsSUFBdFAsRUFBNFAsSUFBNVAsRUFBa1EsSUFBbFEsRUFBd1EsSUFBeFEsRUFBOFEsSUFB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QUFBLEdBQU0sQ0FBVDtpQkFBZ0IsSUFBaEI7U0FBQSxNQUFBO2lCQUF5QixJQUF6Qjs7TUFEa0I7SUFBcEIsQ0F4R0Y7SUE0R0EsV0FBQSxFQUFhLFFBQUEsQ0FBQSxDQUFBO01BQ1gsSUFBQyxDQUFBLFlBQUQsQ0FBQTthQUNBLElBQUMsQ0FBQSxnQkFBRCxDQUFBO0lBRlcsQ0E1R2I7SUFpSEEsT0FBQSxFQUFTLFFBQUEsQ0FBQSxDQUFBO2FBQ1AsSUFBQyxDQUFBLFNBQUQsR0FBYTtJQUROO0VBakhULENBREY7QUFBQSIsInNvdXJjZXNDb250ZW50IjpbIm5ldyBWdWVcbiAgZWw6ICcjQXBwJ1xuICBcbiAgZGF0YTpcbiAgICBlbGVjdHJvbnM6IDBcbiAgICBlbGVjdHJvbnNTbGlkZTogMVxuICAgIGRpYWdyYW06IFtdXG4gICAgc2VxdWVuY2U6IHt9XG4gICAgbm90YXRpb246IFtdXG4gICAgc2hvd0Z1bGxOb3RhdGlvbjogZmFsc2VcbiAgICBsYXllcnM6IFtdXG4gICAgc2VhcmNoOiAnSCdcbiAgICBlbGVtZW50czogWycnLCAnSCcsICdIZScsICdMaScsICdCZScsICdCJywgJ0MnLCAnTicsICdPJywgJ0YnLCAnTmUnLCAnTmEnLCAnTWcnLCAnQWwnLCAnU2knLCAnUCcsICdTJywgJ0NsJywgJ0FyJywgJ0snLCAnQ2EnLCAnU2MnLCAnVGknLCAnVicsICdDcicsICdNbicsICdGZScsICdDbycsICdOaScsICdDdScsICdabicsICdHYScsICdHZScsICdBcycsICdTZScsICdCcicsICdLcicsICdSYicsICdTcicsICdZJywgJ1pyJywgJ05iJywgJ01vJywgJ1RjJywgJ1J1JywgJ1JoJywgJ1BkJywgJ0FnJywgJ0NkJywgJ0luJywgJ1NuJywgJ1NiJywgJ1RlJywgJ0knLCAnWGUnLCAnQ3MnLCAnQmEnLCAnTGEnLCAnQ2UnLCAnUHInLCAnTmQnLCAnUG0nLCAnU20nLCAnRXUnLCAnR2QnLCAnVGInLCAnRHknLCAnSG8nLCAnRXInLCAnVG0nLCAnWWInLCAnTHUnLCAnSGYnLCAnVGEnLCAnVycsICdSZScsICdPcycsICdJcicsICdQdCcsICdBdScsICdIZycsICdUbCcsICdQYicsICdCaScsICdQbycsICdBdCcsICdSbicsICdGcicsICdSYScsICdBYycsICdUaCcsICdQYScsICdVJywgJ05wJywgJ1B1JywgJ0FtJywgJ0NtJywgJ0JrJywgJ0NmJywgJ0VzJywgJ0ZtJywgJ01kJywgJ05vJywgJ0xyJywgJ1JmJywgJ0RiJywgJ1NnJywgJ0JoJywgJ0hzJywgJ010JywgJ0RzJywgJ1JnJywgJ0NuJywgJ05oJywgJ0ZsJywgJ01jJywgJ0x2JywgJ1RzJywgJ09nJ11cblxuICAgIGluZm9EaWFsb2c6IGZhbHNlXG4gICAgaGVscDogW1xuICAgICAgJ1lvdSBjYW4gc2VsZWN0IGFueSBlbGVtZW50IHRocm91Z2ggdGhlIHNsaWRlciBieSBpdHMgYXRvbWljIG51bWJlciwgb3IgYnkgY2xpY2tpbmcgb24gdGhlIG51Y2xldXMgYW5kIHR5cGluZyBpdHMgaW5pdGlhbHMuJ1xuICAgICAgJ3dyaXR0ZW4gYmVsb3cgdGhlIHNsaWRlciB0aGVyZSBpcyB0aGUgc2ltcGxlIG5vdGF0aW9uIG9mIHRoZSBkaXN0cmlidXRpb24gb2YgdGhlIGVsZWN0cm9ucywgY2xpY2tpbmcgb24gaXQgZXhwYW5kcyB0aGUgY29tcGxldGUgbm90YXRpb24uJ1xuICAgICAgJ3RoZSBtYWduaWZ5aW5nIGdsYXNzIGJ1dHRvbiBkb2VzIGEgZ29vZ2xlIHNlYXJjaCBmb3IgbW9yZSBpbmZvcm1hdGlvbiBvZiB0aGUgc2VsZWN0ZWQgZWxlbWVudCwgaWYgeW91IGhhdmUgYW55IGlucHV0IGVycm9yIGl0IHdpbGwgYmUgZGlzYWJsZWQuJ1xuICAgIF1cbiAgXG4gIFxuICBtZXRob2RzOlxuICAgIGJ1aWxkRGlhZ3JhbTogLT5cbiAgICAgIGZvciBpIGluIFswLi42XVxuICAgICAgICBsZW5ndGggPSAtIE1hdGguYWJzKGkgLSAzLjUpICsgNC41XG4gICAgICAgIEBkaWFncmFtLnB1c2ggQXJyYXkobGVuZ3RoKS5maWxsIDBcbiAgXG4gIFxuICAgIGdlbmVyYXRlU2VxdWVuY2U6IC0+XG4gICAgICBbcG9zWCwgcG9zWV0gPSBbW10sIFtdXVxuXG4gICAgICBmb3IgeCBpbiBbMC4uMzBdXG4gICAgICAgIGEgPSAzIC0geCAlIDRcbiAgICAgICAgYiA9IHggLSAzICogTWF0aC5yb3VuZCB4IC8gNFxuICAgICAgICBsID0geCAvIDYuN1xuXG4gICAgICAgIGlmIGEgPD0gbCB0aGVuIHBvc1gucHVzaCBhXG4gICAgICAgIGlmIGIgPj0gbCB0aGVuIHBvc1kucHVzaCBiXG4gICAgICBAc2VxdWVuY2UgPSB7IHBvc1gsIHBvc1kgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBcbiAgICBkaXN0cmlidXRlRWxlY3Ryb25zOiAtPlxuICAgICAgY291bnQgPSBpZiBAZWxlY3Ryb25zID49IDAgdGhlbiBAZWxlY3Ryb25zIGVsc2UgMFxuICAgICAgICBcbiAgICAgIGZvciBfLCBpIGluIEBzZXF1ZW5jZS5wb3NYXG4gICAgICAgIHsgcG9zWCwgcG9zWSB9ID0gQHNlcXVlbmNlXG4gICAgICAgIFsgeCwgeSBdID0gWyBwb3NYW2ldLCBwb3NZW2ldIF1cbiAgICAgICAgY291bnQgLT0gQGRpYWdyYW1beV1beF0gPSBpZiBjb3VudCA8IDIgKyA0ICogeCB0aGVuIGNvdW50IGVsc2UgMiArIDQgKiB4XG4gICAgICAgIFxuICAgICAgICBcbiAgICB3cml0ZU5vdGF0aW9uOiAtPlxuICAgICAgc3VibGF5ZXJzID0gWydzJywgJ3AnLCAnZCcsICdmJ11cbiAgICAgIEBub3RhdGlvbi5sZW5ndGggPSAwXG4gICAgICBcbiAgICAgIGZvciBfLCBpIGluIEBzZXF1ZW5jZS5wb3NYXG4gICAgICAgIHsgcG9zWCwgcG9zWSB9ID0gQHNlcXVlbmNlXG4gICAgICAgIFsgeCwgeSBdID0gWyBwb3NYW2ldLCBwb3NZW2ldIF1cbiAgICAgICAgXG4gICAgICAgIGlmIEBkaWFncmFtW3ldW3hdIHRoZW4gQG5vdGF0aW9uLnB1c2hcbiAgICAgICAgICBsb2NhdGlvbjogKHkgKyAxKSArIHN1YmxheWVyc1t4XVxuICAgICAgICAgIGVsZWN0cm9uczogQGRpYWdyYW1beV1beF1cbiAgICAgICAgICBcbiAgICAgIGlmIEBub3RhdGlvbi5sZW5ndGggPiA1IHRoZW4gQG5vdGF0aW9uLnNwbGljZSAyLCAwLCAnLi4uJ1xuICAgICAgICAgIFxuICAgICAgICAgIFxuICAgIGdldExheWVyc0VsZWN0cm9uczogLT5cbiAgICAgIEBsYXllcnMubGVuZ3RoID0gMFxuICAgICAgZm9yIGxheWVyIGluIEBkaWFncmFtIHRoZW4gQGxheWVycy5wdXNoIGxheWVyLnJlZHVjZSAoYSwgYikgPT4gYSArIGJcbiAgICAgIFxuICAgIFxuICAgIGluY3JlbWVudDogKHZhbHVlKSAtPlxuICAgICAgaWYgQGVsZWN0cm9ucyA+IDEgYW5kIHZhbHVlIDwgMCBvciBAZWxlY3Ryb25zIDwgMTE4IGFuZCB2YWx1ZSA+IDBcbiAgICAgICAgQGVsZWN0cm9ucyArPSB2YWx1ZVxuICAgICAgICBcbiAgICAgICAgXG4gICAgdXBkYXRlRWxlY3Ryb25zOiAtPlxuICAgICAgQGVsZWN0cm9ucyA9IEBlbGVjdHJvbnNTbGlkZVxuICAgICAgICBcbiAgICAgICAgXG4gICAgdXBkYXRlRWxlbWVudE5hbWU6IC0+XG4gICAgICBAc2VhcmNoID0gQGVsZW1lbnRzW0BlbGVjdHJvbnNdXG4gICAgXG4gICAgXG4gICAgcmV2ZXJzZWRBcnI6IChhcnIpIC0+XG4gICAgICBmb3IgaSBpbiBbYXJyLmxlbmd0aCAtIDEuLjBdIGJ5IC0xIHRoZW4gYXJyW2ldXG4gICAgICBcbiAgICBcbiAgICBnb29nbGVTZWFyY2hFbGVtZW50OiAtPlxuICAgICAgbmFtZSA9IEBlbGVtZW50c1tAZWxlY3Ryb25zXVxuICAgICAgd2luZG93Lm9wZW4gXCJodHRwczovL3d3dy5nb29nbGUuY29tLmJyL3NlYXJjaD9xPWVsZW1lbnQrI3tuYW1lfSsje0BlbGVjdHJvbnN9K3BlcmlvZGljK3RhYmxlXCJcblxuICAgICAgXG4gIHdhdGNoOlxuICAgIGVsZWN0cm9uczogLT5cbiAgICAgIEBkaXN0cmlidXRlRWxlY3Ryb25zKClcbiAgICAgIEB3cml0ZU5vdGF0aW9uKClcbiAgICAgIEBnZXRMYXllcnNFbGVjdHJvbnMoKVxuICAgICAgaWYgQGVsZWN0cm9ucyA+IDAgdGhlbiBAZWxlY3Ryb25zU2xpZGUgPSBAZWxlY3Ryb25zXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgIHNlYXJjaDogLT5cbiAgICAgIEBlbGVjdHJvbnMgPSBAZWxlbWVudHMuaW5kZXhPZihAc2VhcmNoKVxuICAgICAgXG4gIFxuICBmaWx0ZXJzOlxuICAgIGVsZWN0cm9uc0luZGljYXRvcjogKHZhbCkgLT5cbiAgICAgIGlmIHZhbCA+IDAgdGhlbiB2YWwgZWxzZSAnPydcbiAgICAgICAgXG4gICAgICAgIFxuICBiZWZvcmVNb3VudDogLT5cbiAgICBAYnVpbGREaWFncmFtKClcbiAgICBAZ2VuZXJhdGVTZXF1ZW5jZSgpXG4gICAgXG4gICAgXG4gIG1vdW50ZWQ6IC0+XG4gICAgQGVsZWN0cm9ucyA9IDFcbiJdfQ==
//# sourceURL=coffeescript
