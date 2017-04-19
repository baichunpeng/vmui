!
function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = factory(global)
    } else if (typeof define === "function") {
        define(factory())
    } else {
        window.VMUI_CITYS = factory()
    }
}(typeof window !== "undefined" ? window : this, function(window) {
    var citys = []

    return citys
})