(function (factory, window) {

    // define an AMD module that relies on 'leaflet'
    if (typeof define === 'function' && define.amd) {
        define(['leaflet'], factory);

        // define a Common JS module that relies on 'leaflet'
    } else if (typeof exports === 'object') {
        module.exports = factory(require('leaflet'));
    }

    // attach your plugin to the global 'L' variable
    if (typeof window !== 'undefined' && window.L) {
        window.L.ZoomPanel = factory(L);
    }
}(function (L) {
    L.Control.ZoomPanel = L.Control.extend({
        options: {
            position: 'bottomright',
            labels: [
                {
                    zoom: 2,
                    label: 'X2'
                },
                {
                    zoom: 4,
                    label: 'X4'
                },
                {
                    zoom: 6,
                    label: 'X6'
                },
                {
                    zoom: 8,
                    label: 'X8'
                },
                {
                    zoom: 10,
                    label: 'X10'
                }
            ],
            showZoomBtn: false
        },
        onAdd: function (map) {
            let zoomPanelTag = 'div';
            let zoomPanelClass = 'leaflet-zoompanel-control';
            let zoomPanel = L.DomUtil.create(zoomPanelTag, zoomPanelClass);
            this._createMainDiv('', 'leaflet-control-zoompanel-toggle', zoomPanel, this)
            this._createZoomBtn(zoomPanel, map)

            return zoomPanel;
        },
        _createMainDiv (html, className, container, context) {
            let div = L.DomUtil.create('div', className, container);
            div.innerHTML = html;
            div.style.width = '30px';
            div.style.height = '30px';
            L.DomEvent.disableScrollPropagation(div);
            L.DomEvent.disableClickPropagation(div);
            L.DomEvent.on(div, 'click', () => {
                this.options.showZoomBtn = !this.options.showZoomBtn
                this._toggleZoomBtn()
            }, context)
            return div;
        },
        _createZoomBtn (container, map) {
            let labels = this.options.labels.reverse()

            // Continue implementing the control here.
            let radius = 50;
            //每一个BOX对应的角度;
            let avd = 360 / labels.length;
            //每一个BOX对应的弧度;
            let ahd = avd * Math.PI / 180;

            for (let i = 0; i < labels.length; i++) {
                let btn = L.DomUtil.create('div', 'leaflet-control-zoom-btn', container)
                btn.innerHTML = labels[i].label
                btn.style.height = '25px'
                btn.style.width = '25px'
                btn.style.background = 'white'
                btn.style.position = 'absolute'
                btn.style['text-align'] = 'center'
                btn.style['line-height'] = '25px'
                if (!this.options.showZoomBtn) {
                    btn.style.visibility = 'hidden'
                }
                btn.style.left = `${Math.sin((ahd * i)) * radius + 62.5}px`
                btn.style.top = `${Math.cos((ahd * i)) * radius + 62.5}px`
                L.DomEvent.disableScrollPropagation(btn);
                L.DomEvent.disableClickPropagation(btn);
                L.DomEvent.on(btn, 'click', () => {
                    map.setZoom(labels[i].zoom)
                }, this)
            }
        },
        _toggleZoomBtn () {
            if (this.options.showZoomBtn) {
                for (let item of document.querySelectorAll('.leaflet-control-zoom-btn')) {
                    item.style.visibility = 'visible'
                }
            } else {
                for (let item of document.querySelectorAll('.leaflet-control-zoom-btn')) {
                    item.style.visibility = 'hidden'
                }
            }
        }
    });
    // implement your plugin

    // return your plugin when you are done
    L.zoompanel = function (options) {
        return new L.Control.ZoomPanel(options);
    };
}, window));
