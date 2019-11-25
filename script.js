function init () {
    let minis = Array.from(document.getElementsByClassName('minis'))
    let bullets = Array.from(document.getElementsByClassName('far'))
    let checked = []

    minis.map((item, index) => {
        item.addEventListener('click', () => {
            console.log(item.id)
            console.log(index)
            console.log(bullets[index])
            bullets[index].className = "far fa-check-square"
            checked = Array.from(document.getElementsByClassName('fa-check-square'))
            if (checked.length === 8) {
                document.getElementById('checklist').childNodes[1].childNodes[1].innerHTML = "Congratulations! You found them all!"
            }
        })
    })

    let curtain = document.getElementById('curtain')
    let lightSwitch = document.getElementById('lightSwitch')
    let checklist = document.getElementById('checklist')
    let toggle = false

    lightSwitch.addEventListener('click', () => {
        if (toggle === false) {
            toggle = true
            lightSwitch.innerHTML = 'Lights ON'

            checklist.style.display = "grid"

            // black curtain fade in-out styling
            curtain.style.visibility = "visible"
            curtain.style.opacity = "100"

            // hidden pictures fade in-out styling
            minis.map((item) => item.style.transition = "visibility 0s, opacity 2.5s ease")
            minis.map((item) => item.style.visibility = "visible")
            minis.map((item) => item.style.opacity = "100")
        } else {
            toggle = false
            lightSwitch.innerHTML = 'Lights OFF'

            checklist.style.display = "none"

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