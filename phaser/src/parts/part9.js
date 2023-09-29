import skyImg from '../assets/sky.png';
import bombImg from '../assets/bomb.png';
import dudeImg from '../assets/dude.png';
import platformImg from '../assets/platform.png';
import starImg from '../assets/star.png';

export default class Part9 extends Phaser.Scene
{
    constructor ()
    {
        super();
        this.plataforms = null;
        this.player = null;
        this.cursors = null;
        this.stars = null;
        this.score = 0;
        this.scoreText = null;
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

        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        this.physics.add.collider(this.player, this.plataforms);
        this.physics.add.collider(this.stars, this.plataforms);

        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
    }

    update() 
    {
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
    }
}
