class Navigation {
  constructor () {
    this.html = document.querySelector('html');
    this.body = document.querySelector('body');
    this.toggleBtns = document.querySelectorAll('[data-toggle="navigation"]');
    this.sidebar = document.querySelector('#sidebar');
    this.mainContent = document.querySelector('#mainContent');
    this.sidebarActiveClass = 'sidebar-active';
    this.mainContentDisabledClass = 'main-content-offset';
    this.scrollDisabledClass = 'scroll-disabled';
    this.backdrop = document.querySelector('.sidebar-backdrop');
    this.isOpen = false;
  }

  togglePageScroll () {
    if (this.isOpen) {
      /**
       * The navigation is getting closed and we should re-enable the scroll.
       * Placed in a setTimeout to wait for the css transition to finish because there are a few specific cases
       * where re-enabling the scroll instantly will result in a quick flashy horizontal scroll bar.
       */
      setTimeout(() => {
        this.html.classList.remove(this.scrollDisabledClass);
        this.body.classList.remove(this.scrollDisabledClass);
      }, 200);
    } else {
      this.html.classList.add(this.scrollDisabledClass);
      this.body.classList.add(this.scrollDisabledClass);
    }
  }

  toggle (e) {
    e.preventDefault();

    // enable/disable page scroll based on the navigation state (open/close)
    this.togglePageScroll();

    // toggle the main content (sliding it in/out)
    this.mainContent.classList.toggle(this.mainContentDisabledClass);

    // toggle the sidebar (sliding the header and the nav containers in/out)
    this.sidebar.classList.toggle(this.sidebarActiveClass);

    this.isOpen = !this.isOpen;
  }

  init () {
    this.toggleBtns.forEach(btn => {
      btn.addEventListener('click', this.toggle.bind(this));
    });
    this.backdrop.addEventListener('click', this.toggle.bind(this));
  }
}

export default Navigation;
