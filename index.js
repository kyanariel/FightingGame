const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 560
canvas.height = 450

c.fillRect(0,0, canvas.width, canvas.height)

const gravity = 0.7

class Sprite {
    constructor({position, velocity, colour = 'rgba(135,206,235,0.5)', offset}){
        this.position = position
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.hitBox = {
            position:{
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100,
            height: 50,
        }
        this.colour = colour
        this.isAttacking
        this.health = 10
    }
    draw(){
        c.fillStyle = this.colour
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
        // hitbox
        if (this.isAttacking) {
            c.fillStyle = 'green'
            c.fillRect(this.hitBox.position.x, this.hitBox.position.y, this.hitBox.width, this.hitBox.height)   
        }
    }
    update(){
        this.draw()
        this.hitBox.position.x = this.position.x - this.hitBox.offset.x
        this.hitBox.position.y = this.position.y
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0
        } else this.velocity.y += gravity

        if (player.position.x < 0) {
            player.position.x = 0;
          }
          if (player.position.x + player.width > canvas.width) {
            player.position.x = canvas.width - player.width;
          }

          
          if (enemy.position.x < 0) {
            enemy.position.x = 0;
          }
          if (enemy.position.x + enemy.width > canvas.width) {
            enemy.position.x = canvas.width - enemy.width;
          }

    }
    attack(){
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
    }

    
}
const player = new Sprite({
    position:{
    x:0,
    y:0
    },
    velocity:{
        x:0,
        y:0
    },
    offset:{
        x:0,
        y:0
    }
})
const enemy = new Sprite({
    position:{
    x:400,
    y:0
    },
    velocity:{
        x:0,
        y:0
    },
    offset:{
        x: 50,
        y:0
    }
})

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

  function decrementTimer(){
    setTimeout(decrementTimer, 1000)
   if (timer>0){
    timer--
    document.querySelector('#timer').innerHTML = timer
    if (timer === 0) {
        if (player.health === enemy.health) {
            document.querySelector('#displayText').innerHTML = 'Tie'
            document.querySelector('#displayText').style.display = 'flex'
           }
           if (player.health > enemy.health) {
            document.querySelector('#displayText').innerHTML = 'Player 1 Wins'
            document.querySelector('#displayText').style.display = 'flex'
           }
           if (player.health < enemy.health) {
            document.querySelector('#displayText').innerHTML = 'Player 2 Wins'
            document.querySelector('#displayText').style.display = 'flex'
           }
           
           document.getElementById("myButton").disabled = false;
       }
   }}

  decrementTimer()
function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = '#87CEEB'
    c.fillRect(0,0, canvas.width, canvas.height)
    player.update()
    enemy.update()  
    player.velocity.x = 0
    enemy.velocity.x = 0

    if (keys.a.pressed && player.lastKey === 'a'){
        player.velocity.x = -4
    } else if (keys.d.pressed && player.lastKey === 'd'){
        player.velocity.x = 4
    }
    
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft'){
        enemy.velocity.x = -4
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight'){
        enemy.velocity.x = 4
    }

    if (player.hitBox.position.x + player.hitBox.width >= enemy.position.x && 
        player.hitBox.position.x <= enemy.position.x + enemy.width &&
        player.hitBox.position.y + player.hitBox.height >= enemy.position.y &&
        player.hitBox.position.y <= enemy.position.y + enemy.height &&
        player.isAttacking){
        enemy.position.x += 2
        console.log("SDD IS A GREAT SUBJECT")
        enemy.health -= 1
        document.querySelector('#enemyHealth').style.width = enemy.health + '1%'
        player.isAttacking = false
    }
    if (enemy.hitBox.position.x + enemy.hitBox.width >= player.position.x && 
        enemy.hitBox.position.x <= player.position.x + player.width &&
        enemy.hitBox.position.y + enemy.hitBox.height >= player.position.y &&
        enemy.hitBox.position.y <= player.position.y + player.height &&
        enemy.isAttacking){
        player.position.x -= 2
        console.log("SDD IS A GREAT SUBJECT")
        player.health -= 1
        document.querySelector('#playerHealth').style.width = player.health + '1%'
        enemy.isAttacking = false
    }

    if (player.position.x + player.width >= enemy.position.x && 
        player.position.x <= enemy.position.x + enemy.width &&
        player.position.y + player.height >= enemy.position.y &&
        player.position.y <= enemy.position.y + enemy.height){
        enemy.position.x += 3
        player.velocity.x = -1
        console.log("SDD IS A GREAT SUBJECT")
    }
    if (enemy.position.x + enemy.width >= player.position.x && 
        enemy.position.x <= player.position.x + player.width &&
        enemy.position.y + enemy.height >= player.position.y &&
        enemy.position.y <= player.position.y + player.height){
        player.position.x -= 3
        enemy.velocity.x = -1
        console.log("SDD IS A GREAT SUBJECT")
    }
    if (enemy.health === 0) {
        document.querySelector('#displayText').innerHTML = 'Player 1 Wins'
        document.querySelector('#displayText').style.display = 'flex'
        enemy.velocity.x = 0
        enemy.position.y = canvas.height + 10
        timer = 0
        document.getElementById("myButton").disabled = false;
    }
    if (player.health === 0) {
        document.querySelector('#displayText').innerHTML = 'Player 2 Wins'
        document.querySelector('#displayText').style.display = 'flex'
        player.velocity.x = 0
        timer = 0
        player.position.y = canvas.height + 10
        document.getElementById("myButton").disabled = false;
    }
    if (player.health === 0 && enemy.health === 0) {
        document.querySelector('#displayText').innerHTML = 'Tie'
        document.querySelector('#displayText').style.display = 'flex'
        player.velocity.x = 0
        enemy.velocity.x = 0
        enemy.position.y = canvas.height
        player.position.y = canvas.height
        timer = 0
        document.getElementById("myButton").disabled = false;
    }
}

animate()

window.addEventListener('keydown', (event) =>{
    switch (event.key){
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break
        // case 'w':
        //     if (player.position.y > canvas.height - player.height){
        //         player.velocity.y = -5
        //     }
            // break
            case 's':
                player.attack()
                break 

            case 'ArrowRight':
                keys.ArrowRight.pressed = true
                enemy.lastKey = 'ArrowRight'
                break
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = true
                enemy.lastKey = 'ArrowLeft'
                break
            // case 'ArrowUp':
            //     if (enemy.position.y > canvas.height - enemy.height){
            //         enemy.velocity.y = -5
            //     }
            //     break
                case 'ArrowDown':
                    enemy.attack()
                    break
    }
})

window.addEventListener('keyup', (event) =>{
    switch (event.key){
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
    }
})
window.addEventListener('keyup', (event)=>{
    switch(event.key){
        case 'ArrowRight':
             keys.ArrowRight.pressed = false
             break
        case 'ArrowLeft':
             keys.ArrowLeft.pressed = false
             break
    }
})
    console.log(keys)
    const button = document.getElementById('myButton');
button.addEventListener('click', function() {

  player.colour = 'red'
  enemy.position.x = canvas.width
  player.position.x = 0
  player.position.y = canvas.height - player.height
 enemy.position.y = canvas.height - enemy.height
  enemy.colour = 'yellow'
    timer = 90
    enemy.health = 10
    player.health = 10
    document.querySelector('#playerHealth').style.width = '100%'
    document.querySelector('#enemyHealth').style.width = '100%'
    document.querySelector('#timer').innerHTML = timer
    document.querySelector('#displayText').innerHTML = ' '
  document.getElementById("myButton").disabled = true;
  console.log('Button clicked!');
});
