// To use in a component:
// this.state = {myTimer: new InactivityTimer(3000, this.foo)};
// setInterval(function() {this.state.myTimer.increment(1000)}.bind(this), 1000);
export default function InactivityTimer(maxInactivity, callback) {
    this.maxTime = maxInactivity;
    this.callbackAction = callback;
    this.pending = false;

    // Ends period of inactivity:
    this.reset = function () {
        this.elapsed = 0;
        this.pending = true;
    }

    // Interval callback:
    this.increment = function (amt) {
        this.elapsed += amt;
        if (this.elapsed >= this.maxTime) {
            this.elapsed = 0;
            if (this.pending) {
                this.callbackAction();
                this.pending = false;
            }
        }
    }
}