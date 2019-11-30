function getHiddenPictures() {
    const pre = Array.from(document.getElementsByClassName('minis'))
    const minis = pre.filter((value) => value instanceof HTMLElement).map((node) => node as HTMLElement)
    return minis
}

function getChecklistItems() {
    const pre = Array.from(document.getElementsByClassName('far'))
    const bullets = pre.filter((value) => value instanceof HTMLElement).map((node) => node as HTMLElement)
    return bullets
}

function getFoundItems() {
    const pre = Array.from(document.getElementsByClassName('minis found'))
    const found = pre.filter((value) => value instanceof HTMLElement).map((node) => node as HTMLElement)
    return found
}

function setupFlashlight() {
    const wrapper = document.getElementById('wrapper')
    const circle = document.getElementById('mask')
    const tooltip = document.getElementById('tooltip')

    if (wrapper && circle && tooltip) {
        wrapper.addEventListener('mousemove', (e) => {
            circle.setAttribute('cx', `${e.clientX}`)
            circle.setAttribute('cy', `${e.clientY}`)
            tooltip.style.left = (e.clientX - (tooltip.clientWidth / 2)) + 'px'
            tooltip.style.top = (e.clientY - tooltip.clientHeight - 20) + 'px'
        })
    }
}

function setupHiddenPictures(minis : HTMLElement[]) {
    const checklist = getChecklistItems()
    const tooltip = document.getElementById('tooltip')
    const pre1 = document.getElementById('checklist')
    let title : HTMLElement

    if (pre1) {
        const pre2 = pre1.firstElementChild
        if (pre2) {
            title = pre2.firstElementChild as HTMLElement
        }
    }

    minis.forEach((item, index) => {
        item.addEventListener('click', () => {
            // change image class
            item.className = "minis found"

            // mark image as found in checklist
            checklist[index].className = "far fa-check-square"

            // once all images have been found...
            if (getFoundItems().length === 8 && title && tooltip) {

                // change the checklist title
                title.innerHTML = "Congratulations! You found them all!"

                // make the congrats tooltip visible
                tooltip.style.opacity = "1"

                // hide the congrats tooltip after 3 seconds
                setTimeout(() => tooltip.style.opacity = "0", 3000)
            }

        })
    })
}

function setupLightSwitch(minis : HTMLElement[]) {
    const lightSwitch = document.getElementById('lightSwitch')
    const checklist = document.getElementById('checklist')
    const footer = document.getElementsByTagName('footer')[0]
    const curtain = document.getElementById('curtain')
    let state = false

    if (lightSwitch && checklist && curtain) {
        lightSwitch.addEventListener('click', () => {
            if (state === false) {
                // update state variable
                state = true
    
                // update lightswitch html
                lightSwitch.innerHTML = '<i class="fas fa-toggle-on"></i> <i class="far fa-lightbulb"></i>'
    
                // show checklist element
                checklist.style.display = "grid"
    
                // update margin on footer
                footer.style.marginTop = "1em"
    
                // fade in black curtain
                curtain.style.visibility = "visible"
                curtain.style.opacity = "100"
    
                // fade in hidden pictures
                minis.forEach((item) => item.style.transition = "visibility 0s, opacity 2.5s ease, height 0.5s ease")
                minis.forEach((item) => item.style.visibility = "visible")
                minis.forEach((item) => item.style.opacity = "100")
            } else {
                // update state variable
                state = false
    
                // update lightswitch html
                lightSwitch.innerHTML = '<i class="fas fa-toggle-off"></i> <i class="far fa-lightbulb"></i>'
    
                // hide checklist element
                checklist.style.display = "none"
    
                // update margin on footer
                footer.style.marginTop = "4em"
    
                // fade out black curtain
                curtain.style.transition = "visibility 0.5s, opacity 0.5s ease"
                curtain.style.visibility = "hidden"
                curtain.style.opacity = "0"
    
                // fade out hidden pictures
                minis.forEach((item) => item.style.transition = "visibility 0s, opacity 0s ease, height 0.5s ease")
                minis.forEach((item) => item.style.visibility = "hidden")
                minis.forEach((item) => item.style.opacity = "0")
            }
        })
    }
}

// TO DO: make the easy switch //NOT// overwrite border on already found pictures
function setupEasySwitch(allMinis : HTMLElement[]) {
    const easyMode = document.getElementById('easySwitch')
    const minis = allMinis
    let state = false

    if (easyMode) {
        easyMode.addEventListener('click', () => {
            if (state === false) {
                state = true
                // let minis = allMinis.filter((item) => getFoundItems().includes(item))
                minis.forEach((item) => item.className = "minis easy")
            } else {
                state = false
                // let minis = allMinis.filter((item) => getFoundItems().includes(item))
                minis.forEach((item) => item.className = "minis")
            }
        })
    }
}

function run() {
    let minis = getHiddenPictures()

    setupFlashlight()
    setupHiddenPictures(minis)
    setupLightSwitch(minis)
    setupEasySwitch(minis)
}

window.onload = run;