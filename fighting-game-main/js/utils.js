// holds what happens when the fighter hitbox collides with one another
// essentially if rectangle1 overlaps rectangle 2, this will get triggered
function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.position.x &&
    rectangle1.attackBox.position.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  )
}

// For the timer to reset the game
// 3000 is 3 seconds (desktop side) if on the web, it will be slightly longer
function resetGame(){
  setTimeout(function(){
    location.reload()
}, 3000);
}

// modifies the html site by adjusting the invisible textbox in the middle of the canvas
function determineWinner({ player, enemy, timerId }) {
  clearTimeout(timerId)
  document.querySelector('#displayText').style.display = 'flex'
  if (player.health === enemy.health) {
    document.querySelector('#displayText').innerHTML = 'Tie'
    player.switchSprite('death')
    enemy.switchSprite('death')
    
    resetGame()
  } else if (player.health > enemy.health) {
    document.querySelector('#displayText').innerHTML = 'Player 1 Wins'
    enemy.switchSprite('death')
    resetGame()
  } else if (player.health < enemy.health) {
    document.querySelector('#displayText').innerHTML = 'Player 2 Wins'
    player.switchSprite('death')
    resetGame()
  }
}

// Actual timer and its connection to the html
let timer = 91
let timerId
function decreaseTimer() {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000)
    timer--
    document.querySelector('#timer').innerHTML = timer
  }

  if (timer === 0) {
    determineWinner({ player, enemy, timerId })
  }
}
