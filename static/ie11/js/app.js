/* eslint-disable no-var */
/* eslint-disable no-undef */

$.fn.renderContent = function (
  title,
  route,
  target,
  matchType,
  sortKey,
  sortType
) {
  $.getJSON('/irb/api.json', function (data) {
    // TODO: Lodash sort by date here if necessary
    var arr = []
    $.map(data, function (obj) {
      if (matchType === 'exact') {
        if (obj.route === route) {
          arr.push(obj)
        }
      } else if (obj.route.includes(route)) {
        arr.push(obj)
      }
    })

    var content = '<div>'
    $.each(arr, function (key, value) {
      content =
        content +
        '<div class="meeting" style="padding-bottom: 30px; margin-bottom: 50px; border-bottom: 1px solid #333">'
      content = content + '<h2 id=' + key + '>' + value.title + '</h2>'
      content = content + value.html
      content = content + '</div>'
    })
    content = content + '</div>'

    if (title) {
      $(document).prop('title', 'ICJIA IRB | ' + title)
    } else {
      $(document).prop('title', 'ICJIA IRB')
    }

    $(target).html(content)

    // Fix headings entities to have unique IDs
    $('h2, h3, h4, h5').each(function () {
      if (this.id) {
        this.id = this.id + Math.floor(Math.random() * 2000) + 1
      }
    })

    // Fix links to point to correct destination
    // TODO: Check to make sure pdf links are local
    $('a').each(function () {
      const oldHref = $(this).attr('href')
      if (oldHref.includes('pdf')) {
        const newHref = '/irb/' + oldHref
        $(this).attr('href', newHref)
      }
    })
    // Add Bootstrap table class
    $('table').each(function () {
      $(this).addClass('table')
      $(this).addClass('table-striped')
    })
    $('#loader').hide()
  })
}

$.fn.renderNavbar = function () {
  // TODO: Need to do this programmatically.
  $('#navbar').load('/irb/ie11/includes/navbar.html')
}

$.fn.renderSkipLinks = function () {
  // TODO: Need to do this programmatically.
  $('#skipLinks').load('/irb/ie11/includes/skipLinks.html')
}

$.fn.renderPageTitle = function () {
  // TODO: Need to do this programmatically.
  $('#pageTitle').load('/irb/ie11/includes/pageTitle.html')
}

$.fn.renderPageLoader = function () {
  // TODO: Need to do this programmatically.
  $('#loader').load('/irb/ie11/includes/loader.html')
}

$.fn.renderFooter = function () {
  // TODO: Need to do this programmatically.
  $('#footer').load('/irb/ie11/includes/footer.html')
  $('#footer').show()
}

window.pageInit = function (title, route, target, matchType) {
  $(this).renderPageLoader()
  $(this).renderSkipLinks()
  $(this).renderNavbar()
  $(this).renderPageTitle()
  $(this).renderContent(title, route, target, matchType)
  $(this).renderFooter()
}
