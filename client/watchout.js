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

var enemiesStorage = [];
for (var i = 1; i < 20; i++) {
  enemiesStorage.push(i);
}

var enemies = gameBoard.selectAll('circle')
              .data(enemiesStorage)
              .enter()
                .append('circle')
                .attr('cx', function(d) {
                  return Math.random() * 800;
                })
                .attr('cy', function(d) {
                  return Math.random() * 800;
                })
                .attr('r', 30)
                .attr('fill', 'green');


//var circle = gameBoard.append('circle').attr('cx', 100).attr('cy', 100).attr('r', 30).attr('fill', 'green');
