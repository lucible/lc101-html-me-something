function init () {
    // let wrapper = document.getElementById('wrapper')
    // let lightSwitch = Array.from(document.getElementsByClassName('lightSwitch'))

    let curtain = document.getElementById('curtain')
    let lightSwitch = document.getElementById('lightSwitch')
    let toggle = false

    lightSwitch.addEventListener('click', () => {
        if (toggle === false) {
            toggle = true
            lightSwitch.innerHTML = 'Turn the<br>lights on!'
            curtain.style.visibility = "visible"
            curtain.style.opacity = "100"
        } else {
            toggle = false
            lightSwitch.innerHTML = 'Turn the<br>lights off...'
            curtain.style.opacity = "0"
            curtain.style.transition = "visibility 0.5s, opacity 0.5s ease"
            curtain.style.visibility = "hidden"
        }
    })

    let cover = document.getElementById('cover')
    let circle = document.getElementById('mask')

    cover.addEventListener('mousemove', (e) => {
        circle.setAttribute('cx', e.clientX)
        circle.setAttribute('cy', e.clientY)
    }, false)
}

window.onload = init;