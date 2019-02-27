import C3D from './lib/css3d'
import JT from './lib/jstween'

//创建场景
const s = new C3D.Stage();
s.size("100%", "100%").material({
  color: "#eee"
}).update();
document.body.appendChild(s.el);

//创建一个三维容器（创建以方便分组使用）
const sp = new C3D.Sprite();
sp.position(0, 0, -500).update();
s.addChild(sp);

//创建20个平面放入容器
const plans = [];
for (let i = 0; i < 20; i++) {
  const p = new C3D.Plane();

  p.size(100, 400, 0)
    .position(0, 0, 0)
    .origin(50, 200, 250)
    .material({ color: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, .5)` })
    .update();
  plans.push(p);
  sp.addChild(p);
  i > 0 && setTimeout(function () {
    JT.to(p, 2, {
      rotationY: i * 18,
      onUpdate() {
        p.updateT()
      }
    })
  }, 2000 - i * 100)
}

//创建4个立方体放入容器
function float (item) {
  JT.to(item, 1, {
    y: item.y + 50,
    onUpdate() {
      item.updateT()
    },
    onEnd() {
      JT.to(item, 1, {
        y: item.y - 50,
        onUpdate() {
          item.updateT()
        },
        onEnd() {
          float(item)
        }
      })
    }
  })
}
for (let i = 0; i < 4; i++) {
  var p = new C3D.Box();
  p.size(100, 100, 100)
    .position(Math.random() * 500 - 250, Math.random() * 500 - 250, Math.random() * 500 - 250)
    .rotation(Math.random() * 300 - 150, Math.random() * 300 - 150, Math.random() * 300 - 150)
    .material({
      color: C3D.getRandomColor()
    })
    .buttonMode(true)
    .update();
  sp.addChild(p);
  float(p)
}

// 视口旋转
let touchstart = { x: 0, y: 0 };
const SPRotate = {x: 0, y: 0}
const YBlock = 45

window.addEventListener('touchstart', function (e) {
  // e.preventDefault()
  const { clientX, clientY } = e.touches[ 0 ]
  touchstart = {x: clientX, y: clientY}
})

// 这里触摸事件的x轴偏移要控制y轴旋转量，y轴偏移要控制x轴旋转量
window.addEventListener('touchmove', function (e) {
  // e.preventDefault()
  const {x, y} = touchstart;
  const { clientX, clientY } = e.touches[ 0 ]
  const dx = clientX - x
  const dy = clientY - y
  let rx = SPRotate.x + dy / 3
  const ry = SPRotate.y + -dx / 3

  rx = rx > YBlock ? YBlock : (rx < -YBlock ? -YBlock : rx)
  sp.rotation(rx, ry, 0).updateT()
  const _ry = (ry % 360);
  plans.forEach(p => {
    const distance = p.rotationY + (_ry < 0 ? _ry : - (360 - _ry));
    if (distance < 18 && distance > -18) {
      p.scaleY = 1.3
    } else {
      p.scaleY = 1
    }
    p.updateT()
  })
})

window.addEventListener('touchend', function (e) {
  // e.preventDefault()
  SPRotate.x = sp.rotationX;
  SPRotate.y = sp.rotationY
})

//响应屏幕调整尺寸
function resize () {
  s.size(window.innerWidth, window.innerHeight).update();
}
window.onresize = resize;
resize();

//刷新场景
requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame ||
  function (callback) {
    setTimeout(callback, 1000 / 60);
  };

function go () {
  requestAnimationFrame(go);
}
go()

JT.to(s.camera, 2, {
  z: -500,
  onUpdate() {
    s.camera.updateT()
  }
})
