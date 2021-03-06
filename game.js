var game;
var player;
var platforms;
var badges;
var stars;
var poisons;
var cursors;
var jumpButton;
var scoreText;
var livesText;
var finalMessage;
var won = false;
var gameOver = false;
var currentScore = 0;
var lives = 3;
var winningScore = 100;
var s;
var music

function createStars() {
    stars = game.add.physicsGroup();

    starCreate(425, 100, 'star');
    starCreate(315, 500, 'star');
    starCreate(250, 370, 'star');
    starCreate(300, 200, 'star');
    starCreate(775, 350, 'star');
    starCreate(675, 400, 'star');
    starCreate(500, 500, 'star');
    starCreate(500, 850, 'star');
    starCreate(150, 830, 'star');
}

function createPoisons() {
    poisons = game.add.physicsGroup();

    poisonCreate(675, 275, 'poison');
    poisonCreate(470, 375, 'poison');
    poisonCreate(175, 520, 'poison');
    poisonCreate(655, 720, 'poison');

}


function createPlatforms() {
    platforms = game.add.physicsGroup();

    platforms.create(300, 150, 'platform');
    platforms.create(400, 250, 'platform');
    platforms.create(100, 250, 'platform');
    platforms.create(500, 350, 'platform');
    platforms.create(400, 450, 'platform');
    platforms.create(575, 550, 'platform');
    platforms.create(300, 1100, 'platform');
    platforms.create(400, 1000, 'platform');
    platforms.create(100, 900, 'platform');
    platforms.create(500, 800, 'platform');
    platforms.create(400, 700, 'platform');
    platforms.create(100, 600, 'platform');
    platforms.setAll('body.immovable', true);
}

function starCreate(left, top, starImage) {
    var star = stars.create(left, top, starImage);
    star.animations.add('spin');
    star.animations.play('spin', 8, true);
}

function poisonCreate(left, top, poisonImage) {
    var poison = poisons.create(left, top, poisonImage);
    poison.animations.add('bubble');
    poison.animations.play('bubble', 8, true);
}

function starCollect(player, star) {
    star.kill();
    currentScore = currentScore + 20;
    if (currentScore === winningScore) {
        won = true;
    }
}

function poisonCollect(player, poison) {
    poison.kill();
    lives = lives - 1;
    if (lives === 0) {
        player.kill();
        gameOver = true;
    }
}

window.onload = function () {

    game = new Phaser.Game(800, 1200, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

    function preload() {

        game.load.audio('boden', ['16876_intense_level_180_bpm_proudmusiclibrary.com_vo_preview.mp3']);

        //Load images
        game.load.image('platform', 'platform_2.png');
        game.load.image('brick', 'bricksx64.png');
        //Load spritesheets
        game.load.spritesheet('player', 'mikethefrog.png', 32, 32);
        game.load.spritesheet('coin', 'coin.png', 36, 44);
        game.load.spritesheet('badge', 'badge.png', 42, 54);
        game.load.spritesheet('poison', 'poison.png', 32, 32);
        game.load.spritesheet('star', 'star.png', 32, 32);
    }

    function create() {
        var background = game.add.tileSprite(0, 0, this.game.width, this.game.height, "brick");
        player = game.add.sprite(90, 1200, 'player');
        player.animations.add('walk');
        player.anchor.setTo(0.5, 1);
        music = game.add.audio('boden');
        music.play();

        game.physics.arcade.enable(player);

        player.body.collideWorldBounds = true;
        player.body.gravity.y = 500;

        createStars();
        createPoisons();
        createPlatforms();

        cursors = game.input.keyboard.createCursorKeys();
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        scoreText = game.add.text(16, 16, "SCORE: " + currentScore, { font: "24px Arial", fill: "white" });
        livesText = game.add.text(685, 16, "LIVES: " + lives, { font: "24px Arial", fill: "white" });

        finalMessage = game.add.text(game.world.centerX, 250, "", { font: "48px Arial", fill: "white" });
        finalMessage.anchor.setTo(0.5, 1);
    }

    function update() {
        scoreText.text = "SCORE: " + currentScore;
        livesText.text = "LIVES: " + lives;

        game.physics.arcade.collide(player, platforms);
        game.physics.arcade.overlap(player, stars, starCollect);
        game.physics.arcade.overlap(player, poisons, poisonCollect);

        player.body.velocity.x = 0;

        if (cursors.left.isDown) {
            player.animations.play('walk', 10, true);
            player.body.velocity.x = -350;
            player.scale.x = - 1;
        }
        else if (cursors.right.isDown) {
            player.animations.play('walk', 10, true);
            player.body.velocity.x = 350;
            player.scale.x = 1;
        }
        else {
            player.animations.stop();
        }

        if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down)) {
            player.body.velocity.y = -400;
        }
        if (won) {
            finalMessage.text = "YOU WIN!!!";
            player.kill();
        }
        if (gameOver) {
            finalMessage.text = "GAME OVER!!!";
        }

        if (cursors.up.isDown)
    {
        game.camera.y -= 4;
    }
    else if (cursors.down.isDown)
    {
        game.camera.y += 4;
    }

    if (cursors.left.isDown)
    {
        game.camera.x -= 4;
    }
    else if (cursors.right.isDown)
    {
        game.camera.x += 4;
    }

    }

    function render() {

    }

};
