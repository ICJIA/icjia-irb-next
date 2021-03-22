if (isIE(window.navigator.userAgent)) {
  window.location.href = '/ie11/index.html'
}

function isIE(ua) {
  const isIE10orLess = ua.includes('MSIE')
  const isIE11 = ua.includes('Trident/')
  return isIE10orLess || isIE11
}
