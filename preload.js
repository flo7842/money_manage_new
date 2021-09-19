window.addEventListener('DOMContentLoaded', () => {
    // function for inject text
    const replaceText = (selector, text) => {
        const el = document.getElementById(selector)
        if(el) {
            el.innerHTML = text
        }
    }
    for(const type of ['chrome', 'node', 'electron']){
        replaceText(`${type}-version`, process.versions[type])
    }
})