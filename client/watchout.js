// start slingin' some d3 here.
var options = {
  width: 800,
  height: 800,
  numberOfEnemies: 10,
  padding: 20,
  background: 'darkgrey'
};

var stats = {
  score: 0,
  bestScore: 0
};


var gameBoard = d3.select('body')
                  .append('svg')
                  .attr({width: options.width, height: options.height})
                  .style('background-color', options.background);

//Enemies
var enemiesStorage = [];
for (var i = 0; i < 5; i++) {
  enemiesStorage.push(i);
}

var randomCoord = function() {
  return Math.random() * options.width;
};


var enemies = gameBoard.selectAll('circle')
              .data(enemiesStorage)
              .enter()
                .append('circle')
                .attr({cx: randomCoord, cy: randomCoord, r: 30, fill: 'green'});




var move = function() {
  enemies
    .transition()
    .duration(2000)
    .attr('cx', randomCoord)
    .attr('cy', randomCoord);
  setTimeout(move, 2000);
};

move();

//End of Enemies

//Player






//var circle = gameBoard.append('circle').attr('cx', 100).attr('cy', 100).attr('r', 30).attr('fill', 'green');
