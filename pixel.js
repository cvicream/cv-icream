!(function(f, b, e, v, n, t, s) {
  if (f.fbq) return; n = f.fbq = function() {
    n.callMethod
      ? n.callMethod.apply(n, arguments)
      : n.queue.push(arguments)
  }
  if (!f._fbq)f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'
  n.queue = []; t = b.createElement(e); t.async = !0
  t.src = v; s = b.getElementsByTagName(e)[0]
  try {
    // s.parentNode.insertBefore(t, s)
  }
  catch {
    console.log('fb error')
  }
}(window, document, 'script',
  'https://connect.facebook.net/en_US/fbevents.js'))
fbq('init', '763048235981810')
fbq('track', 'PageView')
