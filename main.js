let cnv = document.getElementById("canvas");
let ctx = cnv.getContext("2d");
cnv.width = 1600;
cnv.height = 900;

class player {
    constructor(position, velocity, color, health_pos, health) {
        this.position = position;
        this.color = color;
        this.velocity = velocity;
        this.grav = 0.3;
        this.speed = 0;
        this.health_pos = health_pos;
        this.delay = 0
        this.delay1 = 0
        this.health = health
        this.frame = 0
        this.image = new Image()
        this.image1 = new Image()
        this.image.src = "king/Idle.png"
        this.stagger_frame = 15
        this.frame_timer = 0
        this.scalex = 200
        this.num_frames = 0
        this.attack1 = false
        
    }
    create() {
        ctx.drawImage(this.image, this.frame * 155, 0, 155, 155, this.position.x, this.position.y, 500, 300);
        this.num_frames = 5
        if (this.frame_timer % this.stagger_frame == 0) {
            if (this.frame < this.num_frames) {
                this.frame++;
            }
            else {
                this.frame = 0
            }
        }
    }
    jump() {
        if (this.position.y == 600) {
            this.position.y -= this.velocity.y;
            this.image.src = 'king/Jump.png'
            this.num_frames = 1
            if (this.frame_timer % this.stagger_frame == 0) {
                if (this.frame < this.num_frames) {
                    this.frame++;
                }
                else {
                    this.frame = 0
                }
            }
        }
    }
    left() {
        if (this.position.x >= 10) {
            this.image.src = 'king/Runleft.png'
            this.position.x -= this.velocity.x;
            this.num_frames = 7
            if (this.frame_timer % this.stagger_frame == 0) {
                if (this.frame < this.num_frames) {
                    this.frame++;
                }
                else {
                    this.frame = 0
                }
            }
        }
    }
    right() {
        if (this.position.x <= 1400) {
            this.image.src = 'king/Run.png'
            this.position.x += this.velocity.x;
            this.num_frames = 7
            if (this.frame_timer % this.stagger_frame == 0) {
                if (this.frame < this.num_frames) {
                    this.frame++;
                }
                else {
                    this.frame = 0
                }
            }
        }
    }
    gravity() {
        if (this.position.y < 600) {
            this.speed += this.grav;
            this.position.y += this.speed;
        }
        if (this.position.y >= 600) {
            this.speed = 0;
            this.position.y = 600
        }
    }
    attack() {
        this.image.src = 'king/Attack_1.png'
        this.num_frames = 7
        this.delay = 90
        if (this.frame_timer % this.stagger_frame == 0) {
            if (this.frame < this.num_frames) {
                this.frame++;
            }
            else {
                this.attack1 = false
            }
        }
    }
    attack_2() {
        ctx.fillStyle = 'white';
        ctx.fillRect(this.position.x - 100, this.position.y, 100, 30)
        this.delay1 = 90
        this.num_frames = 5
        if (this.frame_timer % this.stagger_frame == 0) {
            if (this.frame < this.num_frames) {
                this.frame++;
            }
            else {
                this.attack = false
            }
        }
    }
    health_bar() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.health_pos, 0, this.health, 30);
    }
}

let p1 = new player({ x: 0, y: 700 }, { x: 5, y: 150 }, "red", 0, 800);

let p2 = new player({ x: 1525, y: 700 }, { x: 20, y: 300 }, "blue", 800, 800);

let p1_direction = '';

let p2_direction = '';

let attack = null;

let attack1 = null;

let BackgroundImage = new Image();
BackgroundImage.src = "Back.png";

function animate() {
    ctx.drawImage(BackgroundImage, 0, 0, cnv.width, cnv.height)
    update(p1_direction);
    p2.delay1 += -1;
    p1.delay += -1;
    p1.gravity();
    p2.gravity();
    p1.create();
    p2.create();
    p1.health_bar();
    p2.health_bar();
    p1.frame_timer++
    window.requestAnimationFrame(animate);
}

document.addEventListener('keydown', function (event) {
    if (event.code == 'KeyW') {
        p1_direction = 'jump';
        console.log('1')
    }
    else if (event.code == 'KeyA') {
        p1_direction = 'left';
    }
    else if (event.code == 'KeyD') {
        p1_direction = 'right';
    }
    else {
        p1_direction = ''
    }
    if (event.code == 'ArrowUp') {
        p2_direction = 'jump';
    }
    else if (event.code == 'ArrowLeft') {
        p2_direction = 'left';
    }
    else if (event.code == 'ArrowRight') {
        p2_direction = 'right';
    }
    if (event.code == 'KeyF') {
        p1.attack = true;
    }
    if (event.code == 'Period') {
        attack1 = true;
    }
});

document.addEventListener('keyup', function (event) {
    if (event.code == 'KeyW') {
        p1_direction = '';
    }
    if (event.code == 'KeyA') {
        p1_direction = '';
    }
    if (event.code == 'KeyD') {
        p1_direction = '';
    }
    if (event.code == 'ArrowUp') {
        p2_direction = '';
    }
    if (event.code == 'ArrowLeft') {
        p2_direction = '';
    }
    if (event.code == 'ArrowRight') {
        p2_direction = '';
    }
    if (event.code == 'Period') {
        attack1 = false;
    }
});

function update(p1_direction) {
    if (p1_direction == 'jump') {
        p1.jump();
    }
    if (p1_direction == 'left') {
        p1.left();
    }
    if (p1_direction == 'right') {
        p1.right();
    }
    if (p2_direction == 'jump') {
        p2.jump();
    }
    if (p2_direction == 'left') {
        p2.left();
    }
    if (p2_direction == 'right') {
        p2.right();
    }
    if (p1.frame == 5 && attack == true) {
        attack = false
    }
    if (p1.attack1 == true && p1.delay <= 0) {
        p1.attack();
            if (p1.position.x + 175 >= p2.position.x && p1.position.x + 75 <= p2.position.x) {
                p2.health -= 80
                if (p2.health <= 0) {
                    let dead = new Image()
                    dead.src = 'player2/dead.png'
                    ctx.drawImage(dead, p2.frame * 512, 0, 512, 512, p2.position.x, p2.position.y, 200, 200)
                    alert('player 1 wins')
                }
            }
    }
    if (attack1 == true && p2.delay1 <= 0) {
        p2.attack1();
        if (p2.position.x - 100 <= p1.position.x + 75 && p2.position.x >= p1.position.x + 75) {
            p1.health_pos += 80
            if (p1.health_pos >= 1600) {
                alert("player 2 wins")
            }
        }
    }
}

function reset_game() {

}

animate()

