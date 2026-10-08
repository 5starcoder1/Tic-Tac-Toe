(function () {
  var WINS = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

  var boardEl = document.getElementById('board');
  var turnEl = document.getElementById('turn');
  var statusEl = document.getElementById('status');
  var winEl = document.getElementById('win');
  var resultEl = document.getElementById('result');
  var laughEl = document.getElementById('laugh');
  var restartBtn = document.getElementById('restart');

  var cells = [];
  var grid, current, over;

  // build the 9 cells once
  for (var i = 0; i < 9; i++) {
    var c = document.createElement('div');
    c.className = 'cell';
    c.dataset.index = i;
    c.addEventListener('click', onCellClick);
    boardEl.appendChild(c);
    cells.push(c);
  }

  function onCellClick(e) {
    var i = Number(e.currentTarget.dataset.index);
    if (over || grid[i]) return;
    grid[i] = current;
    var cell = cells[i];
    cell.className = 'cell ' + current.toLowerCase();
    cell.innerHTML = '<span>' + current + '</span>';

    var winner = getWinner();
    if (winner) return finish(winner);
    if (grid.every(Boolean)) return finish(null);

    current = current === 'O' ? 'X' : 'O';
    turnEl.textContent = current;
  }

  function getWinner() {
    for (var k = 0; k < WINS.length; k++) {
      var w = WINS[k];
      if (grid[w[0]] && grid[w[0]] === grid[w[1]] && grid[w[1]] === grid[w[2]]) {
        return grid[w[0]];
      }
    }
    return null;
  }

  function finish(winner) {
    over = true;
    statusEl.style.visibility = 'hidden';
    resultEl.textContent = winner ? 'Player ' + winner + ' Wins!' : "It's a Draw!";
    laughEl.classList.toggle('hidden', !winner);
    if (winner) laughEl.src = './laughing.gif'; // restart the GIF animation
    winEl.classList.remove('hidden');
  }

  function restart() {
    grid = new Array(9).fill(null);
    current = 'O';
    over = false;
    cells.forEach(function (c) { c.className = 'cell'; c.innerHTML = ''; });
    turnEl.textContent = current;
    statusEl.style.visibility = 'visible';
    winEl.classList.add('hidden');
  }

  restartBtn.addEventListener('click', restart);
  restart();
})();
