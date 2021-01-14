function TrafficLight() {
    this.timer = null
    this.second = 0
    this.dom
    this.begin = function () {
        this.dom = document.querySelector('#traffic-light')
        if (!this.timer) {
            this.timer = setInterval(() => {
                this.second++
                this.second = this.second % 17
                if (this.second >= 0 && this.second < 10) {
                    this.dom.style.backgroundColor = 'green'
                } else if (this.second < 12) {
                    this.dom.style.backgroundColor = 'yello'
                } else {
                    this.dom.style.backgroundColor = 'red'
                }
            }, 1000)
        }
    }
}

