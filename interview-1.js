var blocks = [
  {
    gym: false,
    school: true,
    store: false,
  },
  {
    gym: true,
    school: false,
    store: false,
  },
  {
    gym: true,
    school: true,
    store: false,
  },
  {
    gym: false,
    school: true,
    store: false,
  },
  {
    gym: false,
    school: true,
    store: true,
  },
];

var reqs = ["gym", "school", "store"];

// -----------------------------------------

var BLOCKS_SIZE = blocks.length;
var REQS_SIZE = reqs.length;

var results = [];

/*

Target execution plan

Position 0 : 0 1 2 3 4 = i / i+1 / i+2 / i+3 / i+4
Position 1 : 1 2 0 3 4 = i / i+1 / i-1 / i+2 / i+3
Position 2 : 2 3 1 4 0 = i / i+1 / i-1 / i+2 / i-2
Position 3 : 3 4 2 1 0 = i / i+1 / i-1 / i-2 / i-3
Position 4 : 4 3 2 1 0 = i / i-1 / i-2 / i-3 / i-4

*/

for (var i = 0; i < BLOCKS_SIZE; i++) {
  var currentValue = {};

  var block = blocks[i];

  console.log("Starting plan for position " + i);

  for (var j = 0; j < BLOCKS_SIZE; j++) {
    // current or forward
    if (i + j < BLOCKS_SIZE) {
      var block = blocks[i + j];
      console.log("Looking index i+" + j);

      addToCurrentValueIfNeeded(currentValue, block, j);
    }

    // backward
    if (j != 0 && i - j >= 0) {
      var block = blocks[i - j];
      console.log("Looking index i-" + j);

      addToCurrentValueIfNeeded(currentValue, block, j);
    }
  }

  results.push(currentValue);

  if (i == BLOCKS_SIZE - 1) {
    console.log("----- End ! -----");
  } else {
    console.log("----- Next line -----");
  }
}

function addToCurrentValueIfNeeded(currentValue, block, distance) {
  for (var i = 0; i < REQS_SIZE; i++) {
    var key = reqs[i];
    if (currentValue[key] == null || currentValue[key] == -1) {
      currentValue[key] = block[key] ? distance : -1;
    }
  }
}

console.log("results: ", results);

var maxDistance = BLOCKS_SIZE;
var bestPosition;

for (var i = 0; i < BLOCKS_SIZE; i++) {
  var currentMaxDistance = -1;
  for (var j = 0; j < REQS_SIZE; j++) {
    var key = reqs[j];
    if (results[i][key] > currentMaxDistance) {
      currentMaxDistance = results[i][key];
    }
  }

  if (currentMaxDistance < maxDistance) {
    maxDistance = currentMaxDistance;
    bestPosition = i;
  }
}

console.log(
  "Best position is n° ",
  bestPosition,
  " with a max distance of ",
  maxDistance
);
