function KeyboardInputManager() {
  this.events = {};

  this.listen();
}

KeyboardInputManager.prototype.on = function (event, callback) {
  if (!this.events[event]) {
    this.events[event] = [];
  }
  this.events[event].push(callback);
};

KeyboardInputManager.prototype.emit = function (event, data) {
  var callbacks = this.events[event];
  if (callbacks) {
    callbacks.forEach(function (callback) {
      callback(data);
    });
  }
};

KeyboardInputManager.prototype.listen = function () {
  var self = this;

  var map = {
    49: [0, 0],
    50: [1, 0],
    51: [2, 0],
    52: [3, 0],
    81: [0, 1],
    87: [1, 1],
    69: [2, 1],
    82: [3, 1],
    65: [0, 2],
    83: [1, 2],
    68: [2, 2],
    70: [3, 2],
    90: [0, 3],
    88: [1, 3],
    67: [2, 3],
    86: [3, 3],
    192: "random"
  };

  document.addEventListener("keydown", function (event) {
    var modifiers = event.altKey || event.ctrlKey || event.metaKey ||
                    event.shiftKey;
    var mapped    = map[event.which];

    if (!modifiers) {
      if (mapped !== undefined) {
        event.preventDefault();
        self.emit("drop", mapped);
      }

      if (event.which === 32) self.restart.bind(self)(event);
    }
  });

  function agc(c, x, y) {
    document.querySelector(c).addEventListener("click", function () {
      self.emit("drop", [x, y]);
    });
  };
  agc(".gc00", 0, 0);
  agc(".gc10", 1, 0);
  agc(".gc20", 2, 0);
  agc(".gc30", 3, 0);
  agc(".gc01", 0, 1);
  agc(".gc11", 1, 1);
  agc(".gc21", 2, 1);
  agc(".gc31", 3, 1);
  agc(".gc02", 0, 2);
  agc(".gc12", 1, 2);
  agc(".gc22", 2, 2);
  agc(".gc32", 3, 2);
  agc(".gc03", 0, 3);
  agc(".gc13", 1, 3);
  agc(".gc23", 2, 3);
  agc(".gc33", 3, 3);

  var retry = document.querySelector(".retry-button");
  retry.addEventListener("click", this.restart.bind(this));
  retry.addEventListener("touchend", this.restart.bind(this));

  var keepPlaying = document.querySelector(".keep-playing-button");
  keepPlaying.addEventListener("click", this.keepPlaying.bind(this));
  keepPlaying.addEventListener("touchend", this.keepPlaying.bind(this));
};

KeyboardInputManager.prototype.restart = function (event) {
  event.preventDefault();
  this.emit("restart");
};

KeyboardInputManager.prototype.keepPlaying = function (event) {
  event.preventDefault();
  this.emit("keepPlaying");
};
