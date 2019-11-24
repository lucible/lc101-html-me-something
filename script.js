function init () {
    let wrapper = document.getElementById('wrapper')
    let curtain = document.getElementById('curtain')
    let hiddenSwitch = document.getElementById('hiddenSwitch')
    let lightSwitch = Array.from(document.getElementsByClassName('lightSwitch'))
    let toggle = false
    console.log(lightSwitch)

    wrapper.addEventListener('click', (e) => {
        if (e.target && e.target.matches('p.lightSwitch')) {
            if (toggle === false) {
                toggle = true
                lightSwitch.map((item) => item.innerHTML = 'Turn the<br>lights on!')
                curtain.style.visibility = "visible"
                curtain.style.opacity = "100"
                curtain.style.transition = "visibility 0s, opacity 0.5s ease"
            } else {
                toggle = false
                lightSwitch.map((item) => item.innerHTML = 'Turn the<br>lights off...')
                curtain.style.opacity = "0"
                curtain.style.transition = "visibility 0.5s, opacity 0.5s ease"
                curtain.style.visibility = "hidden"
            }

        }
    })

    let img = document.getElementById('cover')
    let imgPos = img.getBoundingClientRect()
    let imgX = imgPos.left
    let imgY = imgPos.top
    let circle = document.getElementById('mask')
    let circleRadius = circle.getAttribute('r') / 2
    img.addEventListener('mousemove', (e) => {
        circle.setAttribute('cx', e.clientX - imgX)
        circle.setAttribute('cy', e.clientY - imgY)
    }, false)
}

window.onload = init;