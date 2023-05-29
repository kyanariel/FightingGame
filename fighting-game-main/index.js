// This initialises the canvas for the game
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

// Dimensions of the map
canvas.width = 680
canvas.height = 500

c.fillRect(0, 0, canvas.width, canvas.height)


// the higher the value, the greater the fall speed
const gravity = 2.7

// The background of the canvas is an object of Sprite in order to alter the map background
const background = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: './img/background.png'
})

// player 1 object derived from Fighter class, and further derived from Sprite class
const player = new Fighter({
  position: {
    x: -1000,
    y: 300
  },
  velocity: {
    x: 0,
    y: 0
  },
  offset: {
    x: 0,
    y: 0
  },
  imageSrc: './img/samuraiMack/Idle.png',
  framesMax: 8,
  scale: 2.5,
  offset: {
    x: 215,
    y: 51
  },
  sprites: {
    idle: {
      imageSrc: './img/samuraiMack/Idle.png',
      framesMax: 10,
    },
    run: {
      imageSrc: './img/samuraiMack/Run.png',
      framesMax: 8
    },
    jump: {
      imageSrc: './img/samuraiMack/Jump.png',
      framesMax: 3
    },
    fall: {
      imageSrc: './img/samuraiMack/Fall.png',
      framesMax: 3
    },
    attack1: {
      imageSrc: './img/samuraiMack/Attack1.png',
      framesMax: 7
    },
    attackTurn:{
      imageSrc: './img/samuraiMack/AttackTurn.png',
      framesMax: 7
    },
    takeHit: {
      imageSrc: './img/samuraiMack/Take Hit - white silhouette.png',
      framesMax: 3
    },
    death: {
      imageSrc: './img/samuraiMack/Death.png',
      framesMax: 11
    },
    runTurn: {
      imageSrc: './img/samuraiMack/runTurn.png',
      framesMax: 8
    },
    Turn: {
      imageSrc: './img/samuraiMack/Turn.png',
      framesMax: 10
    },
    jumpTurn: {
      imageSrc: './img/samuraiMack/jumpTurn.png',
      framesMax: 3
    },
    fallTurn: {
      imageSrc: './img/samuraiMack/fallTurn.png',
      framesMax: 3
    },
  },
  attackBox: {
    offset: {
      x: -200,
      y: 50
    },
    width: 280,
    height: 50
  }
})

// Enemy/ player 2 object derived from Fighter class, and further derived from Sprite class
const enemy = new Fighter({
  position: {
    x: 1000,
    y: 300
  },
  velocity: {
    x: 0,
    y: 0
  },
  color: 'blue',
  offset: {
    x: -50,
    y: 0
  },
  imageSrc: './img/kenji/Idle.png',
  framesMax: 4,
  scale: 2.5,
  offset: {
    x: 215,
    y: 167
  },
  sprites: {
    idle: {
      imageSrc: './img/kenji/Idle.png',
      framesMax: 4
    },
    Turn: {
      imageSrc: './img/kenji/Turn.png',
      framesMax: 4
    },
    run: {
      imageSrc: './img/kenji/Run.png',
      framesMax: 8
    },
    runTurn: {
      imageSrc: './img/kenji/runTurn.png',
      framesMax: 8
    },
    jump: {
      imageSrc: './img/kenji/Jump.png',
      framesMax: 2
    },
    jumpTurn: {
      imageSrc: './img/kenji/jumpTurn.png',
      framesMax: 2
    },
    fall: {
      imageSrc: './img/kenji/Fall.png',
      framesMax: 2
    },
    fallTurn: {
      imageSrc: './img/kenji/fallTurn.png',
      framesMax: 2
    },
    attack1: {
      imageSrc: './img/kenji/Attack1.png',
      framesMax: 4
    },
    attackTurn:{
      imageSrc: './img/kenji/attackTurn.png',
      framesMax: 4
    },
    takeHit: {
      imageSrc: './img/kenji/Take hit.png',
      framesMax: 3
    },
    hitTurn: {
      imageSrc: './img/kenji/hitTurn.png',
      framesMax: 3
    },
    death: {
      imageSrc: './img/kenji/Death.png',
      framesMax: 7
    }
  },
  attackBox: {
    offset: {
      x: -100,
      y: 50
    },
    width: 400,
    height: 50
  }
})

// avoids double key press errors
const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  },
  ArrowLeft: {
    pressed: false
  }
}

decreaseTimer()

// Game loop
function animate() {
  // for the canvas itself
  window.requestAnimationFrame(animate)
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)
  background.update()
  c.fillStyle = 'rgba(255, 255, 255, 0.15)'
  c.fillRect(0, 0, canvas.width, canvas.height)

  // spawn the sprite fighters
  player.update();
  enemy.update();

  // sprite fighter locations
  player.velocity.x = 0
  enemy.velocity.x = 0

  // player movement
  if (keys.a.pressed && player.lastKey === 'a') {
    player.velocity.x = -5
    player.switchSprite('runTurn')
  } else if (keys.d.pressed && player.lastKey === 'd') {
    player.velocity.x = 5
    player.switchSprite('run')
  } else if (player.position.x > enemy.position.x + 100){
    player.switchSprite('Turn')
  } else {
    player.switchSprite('idle')
  }

  // sprite jumping.
  if (player.position.x > enemy.position.x + 100){
    if (player.velocity.y < 0) {
      player.switchSprite('jumpTurn')
    } else if (player.velocity.y > 0) {
      player.switchSprite('fallTurn')
    }
  } else{
    if (player.velocity.y < 0) {
      player.switchSprite('jump')
    } else if (player.velocity.y > 0) {
      player.switchSprite('fall')
    }
  }
   

  // Enemy movement
  if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
    enemy.velocity.x = -5
    enemy.switchSprite('run')
  } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
    enemy.velocity.x = 5
    enemy.switchSprite('runTurn')
  } else if (player.position.x > enemy.position.x + 100){
    enemy.switchSprite('Turn')
  } else {
    enemy.switchSprite('idle')
  }

  // jumping
  if (enemy.position.x < player.position.x + 100) {
    if (enemy.velocity.y < 0) {
      enemy.switchSprite('jumpTurn');
    } else if (enemy.velocity.y > 0) {
      enemy.switchSprite('fallTurn');
    }
  } else {
    if (enemy.velocity.y < 0) {
      enemy.switchSprite('jump');
    } else if (enemy.velocity.y > 0) {
      enemy.switchSprite('fall');
    }
  }
  

  // detect for collision & enemy gets hit
  if (
    rectangularCollision({
      rectangle1: player,
      rectangle2: enemy
    }) &&
    player.isAttacking &&
    player.framesCurrent === 4
  ) {
    enemy.takeHit()
    player.isAttacking = false

    gsap.to('#enemyHealth', {
      width: enemy.health + '%'
    })

    // Play the hit sound
    const hitSound = document.getElementById('hitSound');
    hitSound.currentTime = 0; // Reset the sound to the beginning
    hitSound.play();
  }

  // if player misses
  if (player.isAttacking && player.framesCurrent === 4) {
    player.isAttacking = false
  }

  // this is where our player gets hit
  if (
    rectangularCollision({
      rectangle1: enemy,
      rectangle2: player
    }) &&
    enemy.isAttacking &&
    enemy.framesCurrent === 2
  ) {
    player.takeHit()
    enemy.isAttacking = false

    gsap.to('#playerHealth', {
      width: player.health + '%'
    })
  // Play the hit sound
    const hitSound = document.getElementById('1hitSound');
    hitSound.currentTime = 0; // Reset the sound to the beginning
    hitSound.play();
  }

  // if player 2 misses
  if (enemy.isAttacking && enemy.framesCurrent === 2) {
    enemy.isAttacking = false
  }

  // end game based on health. This section is linked to utils.js
  if (enemy.health <= 0 || player.health <= 0) {
    determineWinner({ player, enemy, timerId })
  }
}

animate()

// casewhere statement of all the keypress controls of the player sprite
window.addEventListener('keydown', (event) => {
  if (!player.dead) {
    switch (event.key) {
      case 'd':
        keys.d.pressed = true
        player.lastKey = 'd'
        break
      case 'a':
        keys.a.pressed = true
        player.lastKey = 'a'
        break
      case 'w':
        if (player.position.y > canvas.height - 300){
          player.velocity.y = -40
        }
        break
      case 's':
        if (player.position.x > enemy.position.x + 100) {
          player.attackTurn()
        } else {
          player.attack()
        }
        break
    }
  }

  // casewhere statement of enemy sprite controls
  if (!enemy.dead) {
    switch (event.key) {
      case 'ArrowRight':
        keys.ArrowRight.pressed = true
        enemy.lastKey = 'ArrowRight'
        break
      case 'ArrowLeft':
        keys.ArrowLeft.pressed = true
        enemy.lastKey = 'ArrowLeft'
        break
      case 'ArrowUp':
        if (enemy.position.y > canvas.height - 300){
          enemy.velocity.y = -40
        }
        break
      case 'ArrowDown':
        if (enemy.position.x > player.position.x -100){
          enemy.attack()
        } else{
          enemy.attackTurn()
        }

        break
    }
  }
})

// keyup is when it is not pressed, avoiding all double press errors
window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break
  }

  // enemy keys
  switch (event.key) {
    case 'ArrowRight':
      keys.ArrowRight.pressed = false
      break
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false
      break
  }
})

