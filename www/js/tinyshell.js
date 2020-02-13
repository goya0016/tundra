"use strict"; function _defineProperty(obj, key, value) { return key in obj ? Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }) : obj[key] = value, obj } class tinyshell { constructor(elem) { _defineProperty(this, "addEventListener", function (ev, callback) { this.Events[ev].detail.callback = callback, this.Params.listeners.has(this.Events[ev]) || this.element.addEventListener(ev, callback), this.Params.listeners.add(this.Events[ev]), this.Params.pageWidth = document.body.clientWidth, this.Params.twenty = .2 * document.body.clientWidth, this.Params.maxDrag = .8 * this.Params.pageWidth, this.Params.minDrag = .2 * this.Params.maxDrag, 1 === this.Params.listeners.size && (this.element.addEventListener("touchstart", this), this.element.addEventListener("touchend", this), this.element.addEventListener("touchmove", this), this.element.addEventListener("touchcancel", this)) }), _defineProperty(this, "removeEventListener", function (ev, callback) { this.Params.listeners.delete(this.Events[ev]), 0 === this.Params.listeners.size && (this.element.removeEventListener("touchstart", this), this.element.removeEventListener("touchend", this), this.element.removeEventListener("touchmove", this), this.element.removeEventListener("touchcancel", this)) }), _defineProperty(this, "handleEvent", function (ev) { switch (ev.type) { case "touchstart": this.start(ev); break; case "touchmove": this.move(ev); break; case "touchend": this.end(ev); break; case "touchcancel": this.cancel(ev) }ev.stopImmediatePropagation() }), _defineProperty(this, "cancel", function (ev) { console.log("cancel", ev.type) }), _defineProperty(this, "move", function (ev) { if (this.Events.revealleft.detail.callback || this.Events.revealright.detail.callback) { let touches = ev.changedTouches; if (1 == touches.length) { this.performance.mark("move"), this.performance.measure("moving", "start", "move"); this.performance.getEntriesByName("moving", "measure")[0].duration; let deltaX = Math.max(this.Params.startX, touches[0].pageX) - Math.min(this.Params.startX, touches[0].pageX), dir = (Math.max(touches[0].pageY, this.Params.startY), Math.min(touches[0].pageY, this.Params.startY), ""); if (dir = Math.max(this.Params.startX, touches[0].pageX) == this.Params.startX ? "left" : "right", this.Events.revealleft.detail.callback && "left" === dir || this.Events.revealright.detail.callback && "right" === dir) { let move = 0; move = "right" === dir && (this.element.classList.contains("has-reveal-left") || this.element.classList.contains("has-reveal-both")) ? Math.min(deltaX + -1 * this.Params.twenty, 0) : 0, ("left" === dir && this.element.classList.contains("has-reveal-right") || this.element.classList.contains("has-reveal-both")) && (move = this.element.classList.contains("has-reveal-left") || this.element.classList.contains("has-reveal-both") ? -1 * Math.min(this.Params.twenty, deltaX) - this.Params.twenty : -1 * Math.max(deltaX, this.Params.twenty)), this.element.style.transform = `translateX(${move}px)` } this.performance.clearMarks("move") } } }), _defineProperty(this, "start", function (ev) { console.log("start", ev.type); let touches = ev.changedTouches; this.Params.startX = touches[0].pageX, this.Params.startY = touches[0].pageY, this.performance.mark("start") }), _defineProperty(this, "end", function (ev) { console.log("end", ev.type); let touches = ev.changedTouches; if (1 == touches.length) { this.performance.mark("end"), this.performance.measure("touching", "start", "end"); let duration = this.performance.getEntriesByName("touching", "measure")[0].duration, deltaX = Math.max(this.Params.startX, touches[0].pageX) - Math.min(this.Params.startX, touches[0].pageX), deltaY = Math.max(touches[0].pageY, this.Params.startY) - Math.min(touches[0].pageY, this.Params.startY), dir = ""; if (dir = Math.max(this.Params.startX, touches[0].pageX) == this.Params.startX ? "left" : "right", null !== this.Events.tap.detail.callback && "function" == typeof this.Events.tap.detail.callback && deltaX < this.Params.maxDistance && deltaY < this.Params.maxDistance) return ev.currentTarget.dispatchEvent(this.Events.tap), this.performance.clearMarks("start"), this.performance.clearMarks("move"), void this.performance.clearMarks("end"); if ("left" == dir && null !== this.Events.swipeleft.detail.callback && "function" == typeof this.Events.swipeleft.detail.callback) return deltaX > this.Params.minDistance && duration < this.Params.maxSwipeTime && deltaX > deltaY ? ev.currentTarget.dispatchEvent(this.Events.swipeleft) : console.log("Invalid swipeleft", deltaX, duration), this.performance.clearMarks("start"), this.performance.clearMarks("move"), void this.performance.clearMarks("end"); if ("right" == dir && null !== this.Events.swiperight.detail.callback && "function" == typeof this.Events.swiperight.detail.callback) return deltaX > this.Params.minDistance && duration < this.Params.maxSwipeTime && deltaX > deltaY ? ev.currentTarget.dispatchEvent(this.Events.swiperight) : console.log("Invalid swiperight", deltaX, duration), this.performance.clearMarks("start"), this.performance.clearMarks("move"), void this.performance.clearMarks("end"); this.Events.revealleft.detail.callback && "left" == dir && "function" == typeof this.Events.swiperight.detail.callback && (Math.abs(deltaX) < this.Params.minDrag ? this.element.classList.contains("has-reveal-left") || this.element.classList.contains("has-reveal-both") ? this.element.style.transform = `translateX(${-1 * this.Params.twenty}px)` : this.element.style.transform = "translateX(0px)" : Math.abs(deltaX) > this.Params.maxDrag ? this.element.classList.contains("has-reveal-left") || this.element.classList.contains("has-reveal-both") ? this.element.style.transform = `translateX(${-2 * this.Params.twenty}px)` : this.element.style.transform = `translateX(${-1 * this.Params.twenty}px)` : this.element.classList.contains("has-reveal-left") || this.element.classList.contains("has-reveal-both") ? this.element.style.transform = `translateX(${-1 * this.Params.twenty}px)` : this.element.style.transform = "translateX(0px)", ev.currentTarget.dispatchEvent(this.Events.revealleft), this.performance.clearMarks("start"), this.performance.clearMarks("move"), this.performance.clearMarks("end")), this.Events.revealright.detail.callback && "right" == dir && (Math.abs(deltaX) <= this.Params.minDrag ? this.element.classList.contains("has-reveal-left") || this.element.classList.contains("has-reveal-both") ? this.element.style.transform = `translateX(${-1 * this.Params.twenty}px)` : this.element.style.transform = "translateX(0px)" : Math.abs(deltaX) > this.Params.maxDrag ? (this.element.classList.contains("has-reveal-left") || this.element.classList.contains("has-reveal-both"), this.element.style.transform = "translateX(0px)") : this.element.classList.contains("has-reveal-left") || this.element.classList.contains("has-reveal-both") ? this.element.style.transform = `translateX(${-1 * this.Params.twenty}px)` : this.element.style.transform = "translateX(0px)", ev.currentTarget.dispatchEvent(this.Events.revealright), this.performance.clearMarks("start"), this.performance.clearMarks("move"), this.performance.clearMarks("end")), deltaX < this.Params.minDrag && (this.Events.revealright.detail.callback || this.Events.revealleft.detail.callback) && (this.element.classList.contains("has-reveal-left") || this.element.classList.contains("has-reveal-both") ? this.element.style.transform = `translateX(${-1 * this.Params.twenty}px)` : this.element.style.transform = "translateX(0px)") } }), this.element = elem, this.performance = Object.create(null), this.performance.now = window.performance.now, this.performance.mark && this.performance.measure || (window.tinymarks = new Map, window.tinymeasures = new Map, this.performance.mark = function (_name) { let t = performance.now(); window.tinymarks.set(_name, t) }, this.performance.measure = function (_name, _mark1, _mark2) { let m1 = window.tinymarks.get(_mark1), m2 = window.tinymarks.get(_mark2); if (m1 && m2) { let diff = m2 - m1; return window.tinymeasures.set(_name, diff), diff } return window.tinymeasures.set(_name, 0), 0 }, this.performance.clearMarks = function (_name) { window.tinymarks.delete(_name) }, this.performance.getEntriesByName = function (_name, _type = "measure") { if ("measure" == _type) { return [{ name: _name, duration: window.tinymeasures.get(_name) }] } return [{ name: _name, time: window.tinymarks.get(_name) }] }), this.Params = { startX: 0, startY: 0, moved: !1, duration: 0, maxSwipeTime: 400, minDistance: 25, maxDistance: 20, maxDrag: 0, minDrag: 10, listeners: new Set, pageWidth: 0, twenty: 0 }, this.EventTypes = { SWIPELEFT: "swipeleft", SWIPERIGHT: "swiperight", REVEALLEFT: "revealleft", REVEALRIGHT: "revealright", TAP: "tap" }, this.Events = { swipeleft: new CustomEvent("swipeleft", { detail: { dir: "left", callback: null } }), revealleft: new CustomEvent("revealleft", { detail: { dir: "left", callback: null } }), swiperight: new CustomEvent("swiperight", { detail: { dir: "right", callback: null } }), revealright: new CustomEvent("revealright", { detail: { dir: "right", callback: null } }), tap: new CustomEvent("tap", { detail: { callback: null } }) } } }