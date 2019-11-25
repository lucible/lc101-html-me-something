function init () {
    let minis = Array.from(document.getElementsByClassName('minis'))

    minis.map((item) => {
        item.addEventListener('click', () => {
            console.log(item.id)
        }, true)
    })

    let curtain = document.getElementById('curtain')
    let lightSwitch = document.getElementById('lightSwitch')
    let toggle = false

    lightSwitch.addEventListener('click', () => {
        if (toggle === false) {
            toggle = true
            lightSwitch.innerHTML = 'Turn the<br>lights on!'

            // black curtain fade in-out styling
            curtain.style.visibility = "visible"
            curtain.style.opacity = "100"

            // hidden pictures fade in-out styling
            minis.map((item) => item.style.transition = "visibility 0s, opacity 2.5s ease")
            minis.map((item) => item.style.visibility = "visible")
            minis.map((item) => item.style.opacity = "100")
        } else {
            toggle = false
            lightSwitch.innerHTML = 'Turn the<br>lights off...'

            // black curtain fade in-out styling
            curtain.style.transition = "visibility 0.5s, opacity 0.5s ease"
            curtain.style.visibility = "hidden"
            curtain.style.opacity = "0"

            // hidden pictures fade in-out styling
            minis.map((item) => item.style.transition = "visibility 0s, opacity 0s ease")
            minis.map((item) => item.style.visibility = "hidden")
            minis.map((item) => item.style.opacity = "0")
        }
    })

    let circle = document.getElementById('mask')

    wrapper.addEventListener('mousemove', (e) => {
        circle.setAttribute('cx', e.clientX)
        circle.setAttribute('cy', e.clientY)
    })
}

window.onload = init;