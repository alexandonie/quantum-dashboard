'use strict';

(function () {
  var Navigation = (function () {
    var config = {
      htmlBody: $('html, body'),
      toggleBtn: $('[data-toggle="navigation"]'),
      sidebar: $('#sidebar'),
      mainContent: $('#mainContent'),
      sidebarActiveClass: 'sidebar-active',
      mainContentDisabledClass: 'main-content-offset',
      scrollDisabledClass: 'scroll-disabled',
      backdrop: $('.sidebar-backdrop'),
      isOpen: false
    };

    var toggle = function (e) {
      // prevent the default behaviour
      e.preventDefault();
      // toggle the window scroll
      if (config.isOpen) {
        /*
          nav is getting closed and we should re-enable the scroll.
          placed in a setTimeout to wait for the css transition to finish because there are a few specific cases
          where re-enabling the scroll instantly will result in a quick flashy horizontal scroll bar.
        */
        setTimeout(function () {
          config.htmlBody.removeClass(config.scrollDisabledClass);
        }, 200);
      } else {
        // nav is about to get open so we should disable the window scroll
        config.htmlBody.addClass(config.scrollDisabledClass);
      }
      // toggle the main content (sliding it in/out)
      config.mainContent.toggleClass(config.mainContentDisabledClass);
      // toggle the sidebar (sliding the header and the nav containers in/out)
      config.sidebar.toggleClass(config.sidebarActiveClass);
      // update isOpen flag (used to toggle the scroll)
      config.isOpen = !config.isOpen;
    };

    return {
      init: function () {
        config.toggleBtn.on('click', toggle);
        config.backdrop.on('click', toggle);
      }
    };
  })();

  var ScrollableComponents = (function () {
    return {
      init: function () {
        var scrollableElements = $('[data-scrollable="true"]');
        scrollableElements.each(function (i) {
          var elem = $(this),
              elemOptions = elem.data(),
              elemHasOptions = Object.keys(elemOptions).length > 1,
              options = {};

          if (elemHasOptions) {
            delete elemOptions.scrollable;
            options = elemOptions;
          }

          new PerfectScrollbar(scrollableElements[i], options);
        });
      }
    };
  })();

  ScrollableComponents.init();
  Navigation.init();
})();
