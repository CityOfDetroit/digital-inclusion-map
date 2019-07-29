import Controller from './components/controller.class';

(function start() {
  
  const controller = new Controller(document.querySelector('.content-section'));
  const delay = 500; // delay between calls
  let throttled = false; // are we currently throttled?

  controller.map.map.on('mousemove', function (e, parent = this) {
    let features = this.queryRenderedFeatures(e.point, {
      layers: ['census-fill']
    });
    if (features.length) {
      // console.log(features[0]);
      controller.map.map.setFilter('census-hover', ['==', 'geoid', features[0].properties.geoid]);
    }else{
      controller.map.map.setFilter('census-hover', ['==', 'geoid', ""]);
    }
    this.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
  });
  controller.map.map.on('click', function (e, parent = this) {
    // console.log(e);
    let features = this.queryRenderedFeatures(e.point, {
      layers: ['census-fill']
    });
    if (features.length) {
      console.log(features[0]);
      controller.updatePanel(features[0], controller);
      controller.map.map.setFilter('census-featured', ['==', 'geoid', '']);
      controller.map.map.setFilter('census-featured', ['==', 'geoid', features[0].properties.geoid]);
      document.querySelector('.data-panel').className = 'data-panel active';
    }else{
      console.log('no featured');
      controller.map.map.setFilter('census-featured', ['==', 'geoid', '']);
      controller.panel.clearPanel();
    }
  });
  // controller.map.geocoder.on('result', function (ev) {
  //   // console.log(ev);
  //   if(controller.geocoderOff){
  //     controller.geocoderOff = false;
  //     controller.geoResults(ev, controller);
  //   }else{
  //     console.log('extra call');
  //   }
  // });
  // document.getElementById('population').value = null;
  document.getElementById('hardest').value = null;
  document.getElementById('low-response').value = null;
  document.getElementById('population').value = null;
  document.getElementById('no-internet').value = null;
  document.getElementById('close-panel-btn').addEventListener('click', function () {
    controller.panel.clearPanel();
    (document.querySelector('.data-panel.active') != null) ?  document.querySelector('.data-panel.active').className = 'data-panel' : 0;
  });
  document.getElementById('close-filters-btn').addEventListener('click', function () {
    document.querySelector('.filters.active').className = 'filters';
  });
  document.getElementById('filters').addEventListener('click', function () {
    document.querySelector('.filters').className = 'filters active';
    document.querySelector('.filters.active').focus();
  });
  const intFilters = document.querySelectorAll('.interactive-filters');
  intFilters.forEach(function (btn) {
    btn.addEventListener('change', function (ev) {
      controller.filterMap(ev, controller);
    });
  });
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function (ev) {
      controller.removeFilter(ev, controller);
    });
  });
  const startingBtns = document.querySelectorAll('#user-type-section button');
  startingBtns.forEach(function (btn) {
    btn.addEventListener('click', function (ev) {
      controller.initialForm(ev.target.attributes[2].nodeValue, controller);
    });
  });
  window.addEventListener('resize',()=>{
    if (!throttled) {
      // actual callback action
      controller.map.map.resize();
      // we're throttled!
      throttled = true;
      // set a timeout to un-throttle
      setTimeout(()=>{
        throttled = false;
      }, delay);
    }  
  })
})(window);
