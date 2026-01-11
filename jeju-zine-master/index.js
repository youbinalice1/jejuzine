() => {
    //old fn
    [...document.getElementsByClassName("zine")]
        .map(i => i.onclick = event => {
            const src = event
                .srcElement
                .getAttribute("src")
            const prev = parseInt(src.match(/\d/)[0])
            let next
            if (prev == 9) next = 1
            else next = prev + 1
            event.srcElement.setAttribute("src", src.replace(prev, next))
        })
}

class Gallery {
    constructor(id) {

        this.id = id

        this.img = this.el("img")
        this.arrows = [this.el(".left"), this.el(".right")]
        this.circles = this.el(".circles")

        this.arrows.forEach(i => {
            i.onclick = () => {
                if (i.classList.contains("inactive"))
                    return null
                if (i.classList.contains("right"))
                    this.page = this.page + 1
                else
                    this.page = this.page - 1
            }
        });

        [...this.circles.children].forEach((circle, index) => {
            circle.onclick = () => {
                this.page = index + 1
            }
        })

        this.page = 1
    }

    el(child) {
        return document.querySelector(`#${this.id} ${child}`.trim())
    }

    get page() {
        return parseInt(this.img.getAttribute("src").match(/\d/)[0])
    }

    set page(newNo) {
        this.img.setAttribute("src", this.img.getAttribute("src").replace(/\d/, newNo));
        [...this.circles.children].map((circle, index) => {
            if (newNo - 1 == index)
                circle.classList.add("active")
            else circle.classList.remove("active")
        })
        if ((newNo - 1) > 0)
            this.arrows[0].classList.remove("inactive")
        else
            this.arrows[0].classList.add("inactive")
        if (newNo == 9) //HARDCODED for youbin.uk
            this.arrows[1].classList.add("inactive")
        else
            this.arrows[1].classList.remove("inactive")
    }

}

onload = () => {
    const en = new Gallery("en")
    const ko = new Gallery("ko")
}