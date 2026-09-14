/* Project index: cursor-following preview image */
(function () {
  var preview = document.querySelector('.pindex__preview');
  var rows = document.querySelectorAll('.pindex__row[data-preview]');
  if (!preview || !rows.length) return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  var imgs = {};
  rows.forEach(function (row) {
    var src = row.getAttribute('data-preview');
    if (imgs[src]) return;
    var img = document.createElement('img');
    img.src = src;
    img.alt = '';
    preview.appendChild(img);
    imgs[src] = img;
  });

  var target = { x: 0, y: 0 }, pos = { x: 0, y: 0 }, active = false, raf = null;

  function tick() {
    pos.x += (target.x - pos.x) * 0.18;
    pos.y += (target.y - pos.y) * 0.18;
    preview.style.left = pos.x + 'px';
    preview.style.top = pos.y + 'px';
    if (active || Math.abs(target.x - pos.x) > 0.5 || Math.abs(target.y - pos.y) > 0.5) {
      raf = requestAnimationFrame(tick);
    } else {
      raf = null;
    }
  }

  function start() { if (!raf) raf = requestAnimationFrame(tick); }

  rows.forEach(function (row) {
    row.addEventListener('mouseenter', function (e) {
      var src = row.getAttribute('data-preview');
      Object.keys(imgs).forEach(function (k) { imgs[k].classList.toggle('is-active', k === src); });
      target.x = e.clientX; target.y = e.clientY;
      if (!active) { pos.x = e.clientX; pos.y = e.clientY; }
      active = true;
      preview.classList.add('is-visible');
      start();
    });
    row.addEventListener('mousemove', function (e) {
      target.x = e.clientX; target.y = e.clientY;
      start();
    });
    row.addEventListener('mouseleave', function () {
      active = false;
      preview.classList.remove('is-visible');
    });
  });
})();
