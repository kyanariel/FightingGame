// The main class that holds the fighters as well as the game map.
// if you wish you can also make random items from the sprite class because it has the ability to hold an image
// to initialise a sprite simply do 'const variable = new Sprite({...})'
class Sprite {
  constructor({
    position,
    imageSrc,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 }
  }) {
    this.position = position
    this.width = 50
    this.height = 150
    this.image = new Image()
    this.image.src = imageSrc
    this.scale = scale
    this.framesMax = framesMax
    this.framesCurrent = 0
    this.framesElapsed = 0
    this.framesHold = 5
    this.offset = offset
  }

  // draw holds the actual map
  // The map goes from left to right top to bottom.
  // this means if you initialise a sprite at 0,0 it will be top

  draw() {
    c.drawImage(
      this.image,
      this.framesCurrent * (this.image.width / this.framesMax),
      0,
      this.image.width / this.framesMax,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.framesMax) * this.scale,
      this.image.height * this.scale
    )
  }

  animateFrames() {
    this.framesElapsed++

    if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.framesMax - 1) {
        this.framesCurrent++
      } else {
        this.framesCurrent = 0
      }
    }
  }

  update() {
    this.draw()
    this.animateFrames()
  }
}

//  Fighter class derived from the Sprite class. This holds the properties such as hitbox and size.
class Fighter extends Sprite {
  constructor({
    position,
    velocity,
    color = 'red',
    imageSrc,
    scale = 1,
    framesMax = 1,
    // This offset is for sprite animations
    // when importing sprite frames, make sure you adjust the offset in index.js
    // without adjusting the offset, your character will simply float as well as alter the hitbox
    offset = { x: 0, y: 0 },
    sprites,
    attackBox = { offset: {}, width: undefined, height: undefined }
  }) {
    super({
      position,
      imageSrc,
      scale,
      framesMax,
      offset
    })

    this.velocity = velocity
    this.width = 50
    this.height = 150
    this.lastKey
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y
      },
      offset: attackBox.offset,
      width: attackBox.width,
      height: attackBox.height
    }
    this.color = color
    this.isAttacking
    this.health = 100
    this.framesCurrent = 0
    this.framesElapsed = 0
    this.framesHold = 5
    this.sprites = sprites
    this.dead = false

    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image()
      sprites[sprite].image.src = sprites[sprite].imageSrc
    }
  }

  update() {
    this.draw()
    if (!this.dead) this.animateFrames()

    // attack boxes
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    // gravity function
    if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
      this.velocity.y = 0
      this.position.y = 330
    } else this.velocity.y += gravity

    if (player.position.x -100 < 0) {
      player.position.x = 100;
    }
    if (player.position.x > canvas.width) {
      player.position.x = canvas.width;
    }

    
    if (enemy.position.x < 0) {
      enemy.position.x = 0;
    }
    if (enemy.position.x + enemy.width > canvas.width) {
      enemy.position.x = canvas.width - enemy.width;
    }
  }

  attack() {
    this.switchSprite('attack1')
    this.isAttacking = true
  }
  attackTurn(){
    this.switchSprite('attackTurn')
    this.isAttacking = true
  }

  takeHit() {
    this.health -= 20

    if (this.health <= 0) {
      this.switchSprite('death')
    } else this.switchSprite('takeHit')
  }

  switchSprite(sprite) {
    if (this.image === this.sprites.death.image) {
      if (this.framesCurrent === this.sprites.death.framesMax - 1)
        this.dead = true
      return
    }

    // overriding all other animations with the attack animation
    if (
      this.image === this.sprites.attack1.image &&
      this.framesCurrent < this.sprites.attack1.framesMax - 1
    )
      return
      if (
        this.image === this.sprites.attackTurn.image &&
        this.framesCurrent < this.sprites.attackTurn.framesMax - 1
      )
        return

    // override when fighter gets hit
    if (
      this.image === this.sprites.takeHit.image &&
      this.framesCurrent < this.sprites.takeHit.framesMax - 1
    )
      return

      // this section holds what to do for each action
      // make sure when you implement a new move in index.js that you also assign the animation frames for it here
    switch (sprite) {
      case 'idle':
        if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image
          this.framesMax = this.sprites.idle.framesMax
          this.framesCurrent = 0
        }
        break
      case 'run':
        if (this.image !== this.sprites.run.image) {
          this.image = this.sprites.run.image
          this.framesMax = this.sprites.run.framesMax
          this.framesCurrent = 0
        }
        break
      case 'jump':
        if (this.image !== this.sprites.jump.image) {
          this.image = this.sprites.jump.image
          this.framesMax = this.sprites.jump.framesMax
          this.framesCurrent = 0
        }
        break

      case 'fall':
        if (this.image !== this.sprites.fall.image) {
          this.image = this.sprites.fall.image
          this.framesMax = this.sprites.fall.framesMax
          this.framesCurrent = 0
        }
        break
        case 'fallTurn':
        if (this.image !== this.sprites.fallTurn.image) {
          this.image = this.sprites.fallTurn.image
          this.framesMax = this.sprites.fallTurn.framesMax
          this.framesCurrent = 0
        }
        break
        case 'jumpTurn':
        if (this.image !== this.sprites.jumpTurn.image) {
          this.image = this.sprites.jumpTurn.image
          this.framesMax = this.sprites.jumpTurn.framesMax
          this.framesCurrent = 0
        }
        break

      case 'attack1':
        if (this.image !== this.sprites.attack1.image) {
          this.image = this.sprites.attack1.image
          this.framesMax = this.sprites.attack1.framesMax
          this.framesCurrent = 0
        }
        break

        case 'attackTurn':
        if (this.image !== this.sprites.attackTurn.image) {
          this.image = this.sprites.attackTurn.image
          this.framesMax = this.sprites.attackTurn.framesMax
          this.framesCurrent = 0
        }
        break

      case 'takeHit':
        if (this.image !== this.sprites.takeHit.image) {
          this.image = this.sprites.takeHit.image
          this.framesMax = this.sprites.takeHit.framesMax
          this.framesCurrent = 0
        }
        break

      case 'death':
        if (this.image !== this.sprites.death.image) {
          this.image = this.sprites.death.image
          this.framesMax = this.sprites.death.framesMax
          this.framesCurrent = 0
        }
        break
        case 'runTurn':
        if (this.image !== this.sprites.runTurn.image) {
          this.image = this.sprites.runTurn.image
          this.framesMax = this.sprites.runTurn.framesMax
          this.framesCurrent = 0
        }
        break
        case 'Turn':
          if (this.image !== this.sprites.Turn.image) {
            this.image = this.sprites.Turn.image
            this.framesMax = this.sprites.Turn.framesMax
            this.framesCurrent = 0
          }
          break
          case 'runTurn1':
        if (this.image !== this.sprites.runTurn1.image) {
          this.image = this.sprites.runTurn1.image
          this.framesMax = this.sprites.runTurn1.framesMax
          this.framesCurrent = 0
        }
        break
        case 'Turn1':
          if (this.image !== this.sprites.Turn1.image) {
            this.image = this.sprites.Turn1.image
            this.framesMax = this.sprites.Turn1.framesMax
            this.framesCurrent = 0
          }
          break
          
    }
  }
}
