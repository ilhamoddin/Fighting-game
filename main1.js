let cnv = document.getElementById("canvas");
let ctx = cnv.getContext("2d");
cnv.width = 1600;
cnv.height = 900;


class Player {
    constructor(position, image, numframe, size, naturaly) {
        this.position = position;
        this.grav = 0.3;
        this.speedy = 0;
        this.frame = 0;
        this.image = new Image();
        this.image.src = image;
        this.idle = new Image();
        this.idle.src = image;
        this.scalex = 150;
        this.num_frames = numframe;
        this.frame_rate = 20;
        this.frame_timer = 0;
        this.attack_delay = 30;
        this.attack_timer = 0;
        this.speedy = 0;
        this.speedx = 0;
        this.naturaly = naturaly;
        this.size = size;
        this.health = 800
        this.rect = { x: this.position.x, y: this.position.y, width: this.scalex, height: this.scalex };
    }

    update() {
        this.gravity();
        this.create();
        this.attack_timer++;
        this.frame_timer++;
        this.position.x += this.speedx;
        this.position.y += this.speedy;
    }

    create() {
        ctx.drawImage(this.image, this.frame * this.size, 0, this.size, this.size, this.position.x, this.position.y, this.scalex, this.scalex);
        if (this.frame_timer % this.frame_rate === 0) {
            if (this.frame < this.num_frames) {
                this.frame++;
            } else {
                this.frame = 0;
            }
        }
    }

    jump() {
        if (this.position.y >= 600) {
            this.speedy = -300;
        }
    }

    left() {
        if (this.position.x >= 10) {
            this.speedx = -5;
        }
    }

    right() {
        if (this.position.x <= 1400) {
            this.speedx = 5;
        }
    }

    gravity() {
        if (this.position.y < this.naturaly) {
            this.speedy += this.grav;
            this.position.y += this.speed;
        } else {
            this.position.y = this.naturaly;
        }
    }

    attack() {
        if (this.attack_timer >= this.attack_delay) {
            this.rect = { x: this.position.x - 100, y: this.position.y, width: 100, height: 30 };
            this.attack_timer = 0;
        }
    }

    // checkCollision(otherPlayer) {
    //     if (this.rect.x < otherPlayer.rect.x + otherPlayer.rect.width &&
    //         this.rect.x + this.rect.width > otherPlayer.rect.x &&
    //         this.rect.y < otherPlayer.rect.y + otherPlayer.rect.height &&
    //         this.rect.height + this.rect.y > otherPlayer.rect.y) {
    //         console.log("collision detected");
    //     }
    // }
}

//Initialize players


let player1 = new Player({ x: 50, y: 600 }, 'king/Idle.png', 5, 155, 715);
let player2 = new Player({ x: 1300, y: 600 }, 'warrior/Idle.png', 9, 162, 670);

player2.scalex = 250


let isjump1 = false;
let isright1 = false;
let isleft1 = false;
let isattack1 = false;

let isjump2 = false;
let isright2 = false;
let isleft2 = false;
let isattack2 = false

document.addEventListener('keydown', function (event) {
    if (event.code == 'KeyA') {
        player1.num_frames = 7;
        player1.frame = 0;
        isleft1 = true;
        player1.image.src = 'king/Runleft.png';
    }
    if (event.code == 'KeyD') {
        player1.num_frames = 7;
        player1.frame = 0;
        isright1 = true;
        player1.image.src = 'king/Run.png'
    }
    if (event.code == 'KeyW') {
        player1.num_frames = 1;
        player1.frame = 0;
        isjump1 = true;
        player1.image.src = 'king/Jump.png'
    }
    if (event.code == 'KeyF') {
        player1.num_frames = 5;
        player1.frame = 0;
        isattack1 = true;
        player1.image.src = 'king/Attack_1.png'
    }
    if (event.code == 'ArrowLeft') {
        player2.num_frames = 7;
        player2.frame = 0;
        isleft2 = true;
        player2.image.src = 'warrior/Runleft.png';
    }
    if (event.code == 'ArrowRight') {
        player2.num_frames = 7;
        player2.frame = 0;
        isright2 = true;
        player2.image.src = 'warrior/Run.png'
    }
    if (event.code == 'ArrowUp') {
        player2.num_frames = 2;
        player2.frame = 0;
        isjump2 = true;
        player2.image.src = 'warrior/Jump.png'
    }
    if (event.code == 'KeyM') {
        player2.num_frames = 6;
        player2.frame = 0;
        isattack2 = true;
        player2.image.src = 'warrior/Attack1.png'
    }

})



document.addEventListener('keyup', function (event) {
    if (event.code == 'KeyA') {
        player1.num_frames = 5;
        player1.frame = 0;
        isleft1 = false;
        player1.image.src = 'king/Idle.png'
    }
    if (event.code == 'KeyD') {
        player1.num_frames = 5;
        player1.frame = 0;
        isright1 = false;
        player1.image.src = 'king/Idle.png'
    }
    if (event.code == 'KeyW') {
        player1.num_frames = 5;
        player1.frame = 0;
        isjump1 = false;
        player1.image.src = 'king/Idle.png'
    }
    if (event.code == 'KeyF') {
        player1.num_frames = 5;
        player1.frame = 0;
        isattack1 = false;
        player1.image.src = 'king/Idle.png'
    }
    if (event.code == 'ArrowLeft') {
        player2.num_frames = 9;
        player2.frame = 0;
        isleft2 = false;
        player2.image.src = 'warrior/Idle.png'
    }
    if (event.code == 'ArrowRight') {
        player2.num_frames = 9;
        player2.frame = 0;
        isright2 = false;
        player2.image.src = 'warrior/Idle.png'
    }
    if (event.code == 'ArrowUp') {
        player2.num_frames = 9;
        player2.frame = 0;
        isjump2 = false;
        player2.image.src = 'warrior/Idle.png'
    }
    if (event.code == 'KeyM') {
        player2.num_frames = 9;
        player2.frame = 0;
        isattack2 = false;
        player2.image.src = 'warrior/Idle.png'
    }
})



function movement2() {
    if (isright2) {
        player2.right()
    }
    if (isleft2) {
        player2.left()
    }
    if (isjump2) {
        player2.jump()
    }
    if (isattack2) {
        player2.attack()
    }
    if (isleft2 == false && isright2 == false) {
        player2.speedx = 0
    }
    if (isjump2 == false) {
        player2.speedy = 0;
    }
}


function movement1() {
    if (isright1) {
        player1.right()
    }
    if (isleft1) {
        player1.left()
    }
    if (isjump1) {
        player1.jump()
    }
    if (isattack1) {
        player1.attack()
    }
    if (isleft1 == false && isright1 == false) {
        player1.speedx = 0
    }
    if (isjump1 == false) {
        player1.speedy = 0;
    }
}

function reset_game() {
    player1.position.x = 50
    player1.position.y = 600
    player2.position.x = 1300
    player2.position.y = 600
    player1.health = 800
    player2.health = 800
}

function health_checker() {
    if (player1.health <= 0) {
        alert("player2 wins")
        reset_game()
    }
    if (player2.health <= 0) {
        alert("player1 wins")
        reset_game()
    }
}

function attack_checker() {
    if (isattack1 = true) {
        if (player1.position.x + 400 >= player2.position.x) {
            player2.health -= 800;
            console.log('go')
        }
    }
    if (isattack2 = true) {
        if (player2.position.x - 200 <= player1.position.x) {
            player1.health -= 80
            console.log('go')
        }
    }
}

function collision() {
    if (player1.position.x >= player2.position.x || player2.position.x <= player1.position.x) {
        if (player1.speedx > 0) {
            player1.speedx = 0
        }
        if (player2.speedx < 0) {
            player2.speedx = 0
        }
    }
    if (player1.position.x <= -50) {
        player1.position.x = -50
    }
    if (player2.position.x >= 1450) {
        player2.position.x = 1450;
    }
}

function health_bar() {
    ctx.fillstyle = 'red'
    ctx.fillRect(0, 0, player1.health, 30)
    ctx.fillstyle = 'blue'
    ctx.fillRect(player2.health, 0, 1600, 30)
}

let BackgroundImage = new Image();
BackgroundImage.src = "Back.png";
//Game loop
function loop() {
    ctx.drawImage(BackgroundImage, 0, 0, cnv.width, cnv.height)
    player1.update();
    player2.update();
    // player1.checkCollision(player2);
    // player2.checkCollision(player1);
    movement1()
    movement2()
    collision()
    health_checker()
    attack_checker()
    health_bar()
    requestAnimationFrame(loop)
}

requestAnimationFrame(loop);
