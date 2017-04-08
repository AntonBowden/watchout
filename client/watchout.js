// start slingin' some d3 here.
var options = {
  width: 800,
  height: 800,
  numberOfEnemies: 10,
  padding: 20,
  background: 'black'
};

var stats = {
  score: 0,
  bestScore: 0,
  collisions: 0
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


var enemies = gameBoard.selectAll('enemy')
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
// var drag = d3.behavior.drag()
//         .on('drag', function(d) {
//           d.x += d3.event.dx;
//           d.y += d3.event.dy;
//           d3.select(this).attr('transform', function(d) {
//             return 'translate(' + [ d.x, d.y ] + ')';
//           });
//         });




var player = gameBoard.selectAll('player')
            .data([1]) //, {'x': Math.random(), 'y': Math.random()}
            .enter()
            .append('circle')
            .attr({cx: options.width / 2, cy: options.height / 2, r: 10, fill: 'orange'})
            // .attr('transform', 'translate(' + 222 + ',' + 222 + ')')
            .classed('player', true);



var dragOn = function() {  // set position based on mouse position
  d3.select('.player')
    .attr('cx', d3.event.x)
    .attr('cy', d3.event.y);
};


d3.behavior.drag()  // capture mouse drag event
    .on('drag', dragOn)
    .call(d3.select('.player'));


// Updating Score

setInterval(function() {
  stats.score++;
}, 50);

var updateStats = function() {

  d3.select('.current span')
    .text(stats.score);

  // d3.select('.collisions span')
  //   .text(stats.collisions);
};

setInterval(function() {
  updateStats();
}, 50);