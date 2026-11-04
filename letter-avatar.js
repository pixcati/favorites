/* LetterAvatar fallback for the trial site.
 * Idea borrowed from Mengkun's LetterAvatar post (mkblog.cn/1886, original
 * daolavi/LetterAvatar, based on leecrossley gist): draw the first letter on
 * a canvas, colour picked deterministically from a 20-colour palette, and
 * return a data URI. Pure frontend, no server cache, no extra request.
 * Adaptation for this site: site titles are usually Chinese and have no
 * spaces, so the initial is simply the first character of the title.
 * The colour index uses the first character's code point, so the same site
 * always gets the same colour.
 */
(function (w, d) {
  var colours = [
    "#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e",
    "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50",
    "#f1c40f", "#e67e22", "#e74c3c", "#00bcd4", "#95a5a6",
    "#f39c12", "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d"
  ];
  function letterAvatar(name, size) {
    name = name || "";
    size = size || 80;
    var initials = name ? name.charAt(0) : "?";
    if (w.devicePixelRatio) size = size * w.devicePixelRatio;
    var charIndex = initials === "?" ? 72 : initials.charCodeAt(0);
    var colourIndex = ((charIndex % 20) + 20) % 20;
    var canvas = d.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = colours[colourIndex];
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = Math.round(canvas.width / 2) + "px 'Microsoft Yahei', sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#FFF";
    ctx.fillText(initials, size / 2, size / 2 + size * 0.04);
    var uri = canvas.toDataURL();
    canvas = null;
    return uri;
  }
  w.__letterAvatar = letterAvatar;
})(window, document);
