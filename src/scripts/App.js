import Navigation from './Navigation';
import ScrollableComponents from './ScrollableComponents';

class App {
  static init () {
    const nav = new Navigation();
    const scrollableComponents = new ScrollableComponents();

    nav.init();
    scrollableComponents.init();
  }
}

export default App;
