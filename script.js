kaboom({
    width:1050,
    height:400,
    font:"arial",
    canvas: document.querySelector('#mycanvas')
})

loadSprite("t-rex","sprites/t-rex.png")

//loadSpriteAtlas("sprites/dino-u-nizu.png"{
//     "t-rex":{
//         "x":0,
//         "y":0,
//         "width":225,
//         "height":60,
//         "sliceX":4,
//          "anims":{
//             "run":{
//                 //"from":0,
//                 //"to":3,
//                 "speed":10,
//                 "loop":true
//             }
//         }
//     }
// })
loadSprite("background","sprites/background.png")
loadSprite("cactus","sprites/cactus.png")

loadSounds("jump","sounds/jump.mp3")
loadSounds("hit","sounds/hit.mp3")

FLOOR_HEIGHT = 10
JUMP_FORCE = 800
SPEED = 480

scene("game",() =>{
    gravity(2400)
    add([
        rect(width(),FLOOR_HEIGHT),
        pos(0,height(-FLOOR_HEIGHT)),
        area(),
        solid()
    ])
    add([
        sprite("background",{
            width:width(),
            height:height()
        })
    ])
    trex=add([
        sprite("t-rex"),
        pos(80,40),
        area(),
        body()
    ])
    onKeyPress("space",jump)
    function jump(){
        if(trex.isGrounded()){
            play("jump")
            trex.jump(JUMP_FORCE)
        }

    }
    spawnCactus()
    function spawnCactus(){
        add([
            sprite("cactus"),
            area(),
            pos(width(),height()-FLOOR_HEIGHT),
            origin("botleft"),
            move(LEFT,SPEED),
            "tree"
        ])
        wait(rand(0.5,1.5),spawnCactus)
    }

    trex.onCollide("tree", ()=>{
        go("lose",score)
        play("hit")
    })
    score = 0
    scoreLabel =add([
        text(score,{size:40}),
        pos(24,24)
    ])
    onnUpdate(() =>{
        score++
        scoreLabel.text = score
    })
})

scene("lose", (score) => {
    add([
        rect(width(),height()),
        color(0,0,0)
    ])
    add([
        text("Rezultat je:" + score, {size:60}),
        pos(10,10)
    ])
    onKeyPress(space, () =>  go("game"))
})

go("game")