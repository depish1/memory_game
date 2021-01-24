export class Panel {
    constructor() {
        this.panelTime = document.querySelector(".panel__time");
        this.panelMoves = document.querySelector(".panel__moves");
        this.panelMoves.textContent = 0;
        this.panelTime.textContent = '00:00:00';
        this.moves = 0;
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
    }

    runTimer() {
        this.timerIndex = setInterval(() => {
            this.seconds++;
            if(this.seconds == 60) {
                this.seconds = 0;
                this.minutes++;
                if(this.minutes == 60) {
                    this.minutes = 0;
                    this.hours++;
                }
            }
            this.showTime(this.concatTime())  
        }, 1000);
    }

    concatTime() {
        let s = this.seconds < 10 ? '0' + this.seconds : this.seconds;
        let m = this.minutes < 10 ? '0' + this.minutes : this.minutes;
        let h = this.hours < 10 ? '0' + this.hours : this.hours;

        return `${h}:${m}:${s}`
    }

    showTime(time) {
        this.panelTime.textContent = time
    }

    incraseMoves() {
        this.panelMoves.textContent = ++this.moves;
    }
}