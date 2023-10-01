import skyImg from './assets/sky.png';
import bombImg from './assets/bomb.png';
import dudeImg from './assets/dude.png';
import platformImg from './assets/platform.png';
import starImg from './assets/star.png';

export default class PossibleSolution extends Phaser.Scene
{
    constructor ()
    {
        super();
        this.plataforms = null;
        this.player = null;
        this.cursors = null;
        this.bombs = null;
        this.stars = null;
        this.score = 0;
        this.scoreText = null;
        this.gameOver = false;
        this.timeInSeconds = 60;
        this.timeText = null;
        this.timerEvent = null;
        this.lifes = 3;
        this.lifesText = null;
        this.bombsCollider = null;
    }

    preload ()
    {
        this.load.image('sky', skyImg);
        this.load.image('ground', platformImg);
        this.load.image('star', starImg);
        this.load.image('bomb', bombImg);
        this.load.spritesheet('dude', dudeImg, { frameWidth: 32, frameHeight: 48 });
    }
      
    create ()
    {
        this.add.image(400, 300, 'sky');

        this.plataforms = this.physics.add.staticGroup();

        this.plataforms.create(400, 568, 'ground').setScale(2).refreshBody();

        this.plataforms.create(600, 400, 'ground');
        this.plataforms.create(50, 250, 'ground');
        this.plataforms.create(750, 220, 'ground');

        this.player = this.physics.add.sprite(100, 450, 'dude');

        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this.player, this.plataforms);

        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        this.stars.children.iterate(function (child) {

            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });

        this.bombs = this.physics.add.group();

        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

        this.physics.add.collider(this.player, this.plataforms);
        this.physics.add.collider(this.stars, this.plataforms);
        this.physics.add.collider(this.bombs, this.plataforms);

        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
        this.bombsCollider = this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);

        this.timeText = this.add.text(300, 16, `Time: ${this.formatTime(this.timeInSeconds)}`, { fontSize: '32px', fill: '#000' });
        // https://newdocs.phaser.io/docs/3.55.2/Phaser.Time.Clock#addEvent
        this.timerEvent = this.time.addEvent({ delay: 1000, callback: this.onClockEvent, callbackScope: this, loop: true });

        this.lifesText = this.add.text(600, 16, `Lifes: ${this.lifes}`, { fontSize: '32px', fill: '#000' });
    }

    update() 
    {
        if (this.gameOver)
        {
            return;
        }

        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-160);

            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(160);

            this.player.anims.play('right', true);
        }
        else
        {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-330);
        }
    }

    collectStar (player, star)
    {
        star.disableBody(true, true);

        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
        if (this.stars.countActive(true) === 0)
        {
            //  A new batch of stars to collect
            this.stars.children.iterate(function (child) {

                child.enableBody(true, child.x, 0, true, true);

            });

            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            var bomb = this.bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;

            this.timeInSeconds += 30;
            this.updateTime()
        }
    }

    endGame () 
    {
        this.physics.pause();

        this.player.setTint(0xff0000);

        this.player.anims.play('turn');

        this.gameOver = true;

        this.timerEvent.remove();
    }

    hitBomb (player, bomb)
    {
        this.lifes--;
        this.lifesText.setText(`Lifes: ${this.lifes}`);
        
        if (this.lifes === 0)
        {
            this.endGame()
        }
        else 
        {
            this.bombsCollider.active = false;
            this.tweens.add({
                targets: player,
                duration: 200,
                repeat: 5,
                alpha: 0,
                yoyo: true,
                onComplete: () => {
                    this.bombsCollider.active = true;
                }
            })
        }
    }

    updateTime ()
    {
        this.timeText.setText(`Time: ${this.formatTime(this.timeInSeconds)}`)
    }

    onClockEvent ()
    {
        this.timeInSeconds--;
        if (this.timeInSeconds === 0)
        {
            this.endGame()
        }
        this.updateTime()
    }

    formatTime(timeInSeconds)
    {
        var minutes = Math.floor(timeInSeconds / 60);
        var seconds = timeInSeconds % 60;

        seconds = seconds.toString().padStart(2, '0');
        minutes = minutes.toString().padStart(2, '0');

        return `${minutes}:${seconds}`;
    }
}

