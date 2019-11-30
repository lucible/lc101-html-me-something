"use strict";
function getHiddenPictures() {
    var pre = Array.from(document.getElementsByClassName('minis'));
    var minis = pre.filter(function (value) { return value instanceof HTMLElement; }).map(function (node) { return node; });
    return minis;
}
function getChecklistItems() {
    var pre = Array.from(document.getElementsByClassName('far'));
    var bullets = pre.filter(function (value) { return value instanceof HTMLElement; }).map(function (node) { return node; });
    return bullets;
}
function getFoundItems() {
    var pre = Array.from(document.getElementsByClassName('minis found'));
    var found = pre.filter(function (value) { return value instanceof HTMLElement; }).map(function (node) { return node; });
    return found;
}
function setupFlashlight() {
    var wrapper = document.getElementById('wrapper');
    var circle = document.getElementById('mask');
    var tooltip = document.getElementById('tooltip');
    if (wrapper && circle && tooltip) {
        wrapper.addEventListener('mousemove', function (e) {
            circle.setAttribute('cx', "" + e.clientX);
            circle.setAttribute('cy', "" + e.clientY);
            tooltip.style.left = (e.clientX - (tooltip.clientWidth / 2)) + 'px';
            tooltip.style.top = (e.clientY - tooltip.clientHeight - 20) + 'px';
        });
    }
}
function setupHiddenPictures(minis) {
    var checklist = getChecklistItems();
    var tooltip = document.getElementById('tooltip');
    var pre1 = document.getElementById('checklist');
    var title;
    if (pre1) {
        var pre2 = pre1.firstElementChild;
        if (pre2) {
            title = pre2.firstElementChild;
        }
    }
    minis.forEach(function (item, index) {
        item.addEventListener('click', function () {
            // change image class
            item.className = "minis found";
            // mark image as found in checklist
            checklist[index].className = "far fa-check-square";
            // once all images have been found...
            if (getFoundItems().length === 8 && title && tooltip) {
                // change the checklist title
                title.innerHTML = "Congratulations! You found them all!";
                // make the congrats tooltip visible
                tooltip.style.opacity = "1";
                // hide the congrats tooltip after 3 seconds
                setTimeout(function () { return tooltip.style.opacity = "0"; }, 3000);
            }
        });
    });
}
function setupLightSwitch(minis) {
    var lightSwitch = document.getElementById('lightSwitch');
    var checklist = document.getElementById('checklist');
    var footer = document.getElementsByTagName('footer')[0];
    var curtain = document.getElementById('curtain');
    var state = false;
    if (lightSwitch && checklist && curtain) {
        lightSwitch.addEventListener('click', function () {
            if (state === false) {
                // update state variable
                state = true;
                // update lightswitch html
                lightSwitch.innerHTML = '<i class="fas fa-toggle-on"></i> <i class="far fa-lightbulb"></i>';
                // show checklist element
                checklist.style.display = "grid";
                // update margin on footer
                footer.style.marginTop = "1em";
                // fade in black curtain
                curtain.style.visibility = "visible";
                curtain.style.opacity = "100";
                // fade in hidden pictures
                minis.forEach(function (item) { return item.style.transition = "visibility 0s, opacity 2.5s ease, height 0.5s ease"; });
                minis.forEach(function (item) { return item.style.visibility = "visible"; });
                minis.forEach(function (item) { return item.style.opacity = "100"; });
            }
            else {
                // update state variable
                state = false;
                // update lightswitch html
                lightSwitch.innerHTML = '<i class="fas fa-toggle-off"></i> <i class="far fa-lightbulb"></i>';
                // hide checklist element
                checklist.style.display = "none";
                // update margin on footer
                footer.style.marginTop = "4em";
                // fade out black curtain
                curtain.style.transition = "visibility 0.5s, opacity 0.5s ease";
                curtain.style.visibility = "hidden";
                curtain.style.opacity = "0";
                // fade out hidden pictures
                minis.forEach(function (item) { return item.style.transition = "visibility 0s, opacity 0s ease, height 0.5s ease"; });
                minis.forEach(function (item) { return item.style.visibility = "hidden"; });
                minis.forEach(function (item) { return item.style.opacity = "0"; });
            }
        });
    }
}
function setupEasySwitch(allMinis) {
    var easyMode = document.getElementById('easySwitch');
    var state = false;
    if (easyMode) {
        easyMode.addEventListener('click', function () {
            if (state === false) {
                // update state variable
                state = true;
                // change inner button text
                easyMode.innerHTML = "(Turn off easy mode.)";
                // get all pictures not found
                var minis = allMinis.filter(function (item) { return !item.classList.contains('found'); });
                // update class on not found pictures
                minis.forEach(function (item) { return item.className = "minis easy"; });
            }
            else {
                // update state variable
                state = false;
                // change inner button text
                easyMode.innerHTML = "(Turn on easy mode.)";
                // get all pictures not yet found
                var minis = allMinis.filter(function (item) { return !item.classList.contains('found'); });
                // reset class on not found pictures
                minis.forEach(function (item) { return item.className = "minis"; });
            }
        });
    }
}
function run() {
    var minis = getHiddenPictures();
    setupFlashlight();
    setupHiddenPictures(minis);
    setupLightSwitch(minis);
    setupEasySwitch(minis);
}
window.onload = run;
