var cv = new Canvas(512, 512)
var circle = makeCircle()
var num_inside = 0
var num_point = 0

init()

function init() {
    initializeCanvas()
    animate()
}

function setTransform() {
    var min_border = (cv.Center.x > cv.Center.y) ? cv.Center.y : cv.Center.x
    min_border *= 0.8

    cv.context.translate(cv.Center.x, cv.Center.y)
    cv.context.scale(min_border, min_border)
}

function initializeCanvas() {
    cv.context.save()
    setTransform()

    cv.context.fillStyle = circle.fill
    cv.context.strokeStyle = circle.stroke
    cv.context.lineWidth = circle.lineWidth
    cv.context.beginPath()
    cv.context.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, false)
    cv.context.fill()

    cv.context.strokeRect(-1, -1, 2, 2)

    cv.context.restore()
}

function animate() {
    updateCanvas()
    requestAnimationFrame(animate)
}

function updateCanvas() {
    for (let i = 0; i < 64; ++i) {
        drawPoint()
    }
    drawTexts()
}

function drawPoint() {
    var rand = () =>2 * (Math.random() - 0.5)//Math.random() + Math.random() - 1
    var point = new Vec2(rand(), rand())

    cv.context.save()
    setTransform()

    cv.context.fillStyle = circle.fill
    cv.context.strokeStyle = circle.stroke
    cv.context.lineWidth = circle.lineWidth
    cv.context.beginPath()
    cv.context.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, false)
    cv.context.stroke()

    cv.context.fillStyle = U.randomColorCode()
    cv.drawPoint(point, 0.001)

    cv.context.restore()

    if (isInside(point)) {
        ++num_inside
    }
    ++num_point
}

function drawTexts() {
    cv.context.fillStyle = "#ffffff"
    cv.context.fillRect(0, 0, cv.width, 48)

    var pi = 4 * num_inside / num_point
    cv.context.fillStyle = "#000000"
    cv.context.font = "12px serif"
    cv.context.fillText(`points: ${num_point}`, 0, 12)
    cv.context.fillText(`pi: ${pi}`, 0, 24)
}

function isInside(point) {
    var center = new Vec2(circle.x, circle.y)
    if (point.sub(center).length < circle.radius) {
        return true
    }
    return false
}

function makeCircle() {
    return {
        x: 0,
        y: 0,
        radius: 1,
        fill: "#000000",
        stroke: "#444444",
        lineWidth: 0.001,
    }
}