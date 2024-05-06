setTimeout(() => {

    const randomInt = (max, min) => Math.floor(Math.random() * (max - min) + min)
    const n_stars = 200

    let stars = []

    var colors = ['#176ab6', '#fb9b39']
    for (let i = 0; i < n_stars; i++) {
        colors.push('#fff')
    }

    class Star {
        constructor(x, y, radius, color) {
            this.x = x || randomInt(0, canvas.width)
            this.y = y || randomInt(0, canvas.height)
            this.radius = radius || Math.random() * 1.1
            this.color = color || colors[randomInt(0, colors.length)]
            this.dy = -Math.random() * .3
        }
        draw() {
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
            ctx.shadowBlur = randomInt(3, 15)
            ctx.shadowColor = this.color
            ctx.strokeStyle = this.color
            ctx.fillStyle = 'rgba( 255, 255, 255, .5)'
            ctx.fill()
            ctx.stroke()
            ctx.closePath()
        }
        update(arrayStars = []) {
            if (this.y - this.radius < 0) this.createNewStar(arrayStars)

            this.y += this.dy
            this.draw()
        }
        createNewStar(arrayStars = []) {
            let i = arrayStars.indexOf(this)
            arrayStars.splice(i, 1)
            arrayStars.push(new Star(false, canvas.height + 5))
        }
    }

    function findDeep(parent, selectors, depth = null) {
        let currentDepth = 0
        let result = null
        const recursiveSeek = _parent => {
            currentDepth++
            
            // check for selectors in lightdom
            result = _parent.querySelector(selectors)
            if (result) {
                return result
            }

            // check for selectors in shadowRoot
            if (_parent.shadowRoot) {
                result = _parent.shadowRoot.querySelector(selectors)
                if (result)
                    return result
                }
                // look for nested components with shadowRoots
                let children = _parent.querySelectorAll('*')
                let childrenWithShadowRoot = [...children].filter(i => i.shadowRoot)
                for (let child of childrenWithShadowRoot) {
                    if (depth === null || currentDepth < depth) {
                        result = recursiveSeek(child.shadowRoot)
                        if (result) {
                            return result
                        }
                    }
                }
                currentDepth--
                return null
            };
            return recursiveSeek(parent)
    }

    function init() {
        for (let i = 0; i < n_stars; i++) {
            stars.push(new Star())
        }
    }

    function animate() {
        requestAnimationFrame(animate)
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = bg
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        stars.forEach(s => s.update(stars))
    }

    const view = findDeep(document, '#view', 100)
    view.style.position = 'relative'

    const canvas = document.createElement('canvas')
    canvas.width = window.outerWidth
    canvas.height = window.outerHeight
    canvas.style.position = 'fixed'
    canvas.style.inset = 0
    canvas.style.zIndex = 0
    canvas.style.maxWidth = 'initial'

    view.insertBefore(canvas, view.firstChild)

    addEventListener('resize', () => {
        canvas.width = window.outerWidth
        canvas.height = window.outerHeight
        stars = []
        init()
    })

    let ctx = canvas.getContext('2d')
    let bg = 'transparent'

    init()
    animate()

}, 1000)
