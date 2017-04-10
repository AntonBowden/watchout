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
  highScore: 0,
  collisions: 0
};


var gameBoard = d3.select('body')
                  .append('svg')
                  .attr({width: options.width, height: options.height})
                  .style('background-color', options.background);


//Enemies
var enemiesStorage = [];
for (var i = 0; i < options.numberOfEnemies; i++) {
  enemiesStorage.push(i);
}

var randomCoord = function() {
  return Math.random() * options.width;
};


var enemies = gameBoard.selectAll('enemy')
              .data(enemiesStorage)
              .enter()
                .append('circle')
                .attr({cx: randomCoord, cy: randomCoord, r: 30, fill: 'green'})
                .classed('enemies', true);




var move = function() {
  enemies
    .transition()
    .duration(2000)
    .attr('cx', randomCoord)
    .attr('cy', randomCoord)
    .tween('collision', collisionDetection)
    .each('end', move);
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
            .attr({cx: options.width / 2, cy: options.height / 2, r: 20, fill: 'orange'})
            .classed('player', true);



var dragOn = function() {  // set position based on mouse position
  d3.select('.player')
    .attr('cx', d3.event.x)
    .attr('cy', d3.event.y);
};


d3.behavior.drag()  // capture mouse drag event
    .on('drag', dragOn)
    .call(d3.select('.player'));


//Collisions
var collision = function(thisCircle, otherCircle) {
  console.log('Collision at: ' + thisCircle.attr('cx') + ',' + thisCircle.attr('cy'));
};

var collisionDetection = function() {
  return function() {
    var thisCircle = d3.select('.player');
    enemies.each(function() {
      var otherCircle = d3.select(this);

      dx = thisCircle.attr('cx') - otherCircle.attr('cx'),
      dy = thisCircle.attr('cy') - otherCircle.attr('cy'),
      distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

      if (distance < +thisCircle.attr('r') + +otherCircle.attr('r')) {
        //stats.collisions++;
        collision(thisCircle, otherCircle);
        setTimeout(function() {
          stats.collisions++;
        }, 1000);

        if (stats.score > stats.highScore) {
          stats.highScore = stats.score;
          d3.select('.highscore span')
            .text(stats.score);

          stats.score = 0;
          d3.select('.current span')
            .text(0);


        }
        //return true;
      }
    });
  };
};




// Updating Score
//if there is a collision and current score is greater than the high score
//then we set the high score to current, and current to zero.
// var updateHighScore = function() {
//   if (collisionDetection && stats.current > stats.bestScore) {
//     stats.bestScore = stats.current;
//     stats.current = 0;
//   }

// };


setInterval(function() {
  stats.score++;
}, 50);

var updateStats = function() {

  d3.select('.current span')
    .text(stats.score);

  d3.select('.collisions span')
    .text(stats.collisions);
};

setInterval(function() {
  updateStats();
}, 1000);

