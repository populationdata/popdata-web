import React from 'react'
import withClientOnly from './ClientOnly'
import Datamaps from 'datamaps/dist/datamaps.all.hires.min.js'
import { geo, scale } from 'd3'

const CUSTOM_SCOPES_PROJECTION = {
  africa: {
    center: [23, -3],
    projection: 'equirectangular',
    rotate: [4.4, 0],
    scale: 250,
  },
  america: {
    center: [-85, 0],
    projection: 'equirectangular',
    rotate: [0, 0],
    scale: 150,
  },
  asia: {
    center: [85, 25],
    projection: 'equirectangular',
    rotate: [0, 0],
    scale: 280,
  },
  europa: {
    center: [50, 50],
    projection: 'mercator',
    rotate: [0, 0],
    scale: 250,
  },
  oceania: {
    center: [150, -25],
    projection: 'equirectangular',
    rotate: [0, 0],
    scale: 280,
  },
}

class DataMap extends React.Component {
  constructor(props) {
    super(props)
    this.containerRef = React.createRef()
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize)
    this.drawMap()
  }

  componentDidUpdate() {
    this.clear()
    this.drawMap()
  }

  componentWillUnmount() {
    this.clear()
    window.removeEventListener('resize', this.resize)
  }

  resize = () => {
    if (this.map) {
      this.map.resize()
    }
  }

  clear = () => {
    if (this.containerRef) {
      const container = this.containerRef.current
      console.log(container.childNodes)

      for (const child of Array.from(container.childNodes)) {
        container.removeChild(child)
      }
    }

    delete this.map
  }

  drawMap = () => {
    const { data, valueFormatter, ...dataMapsProps } = this.props
    if (CUSTOM_SCOPES_PROJECTION[dataMapsProps.scope]) {
      const customScopeParameters =
        CUSTOM_SCOPES_PROJECTION[dataMapsProps.scope]
      dataMapsProps.setProjection = element => {
        let projection = geo[customScopeParameters.projection]()
          .center(customScopeParameters.center)
          .rotate(customScopeParameters.rotate)
          .scale(customScopeParameters.scale)
          .translate([element.offsetWidth / 2, element.offsetHeight / 2])
        let path = geo.path().projection(projection)

        return { path: path, projection: projection }
      }
      dataMapsProps.scope = 'world'
    }

    const values = data.map(x => x.value)
    const paletteScale = scale
      .linear()
      .domain([Math.min(...values), Math.max(...values)])
      .range(['#EFEFFF', '#02386F'])

    const cloropeth = data.reduce((acc, cur) => {
      acc[cur.iso3] = {
        value: valueFormatter ? valueFormatter(cur.value) : cur.value,
        fillColor: paletteScale(cur.value),
        title: cur.title,
      }
      return acc
    }, {})

    let map = new Datamaps({
      data: cloropeth,
      element: this.containerRef.current,
      fills: { defaultFill: '#F5F5F5' },
      projection: 'mercator',
      responsive: true,
      geographyConfig: {
        borderColor: '#DEDEDE',
        highlightBorderWidth: 2,
        highlightFillColor: element => {
          return element.fillColor || '#F5F5F5'
        },
        highlightBorderColor: '#B7B7B7',
        popupTemplate: (_, data) => {
          if (!data) {
            return
          }
          return `<div class="hoverinfo"><strong>${
            data.title
          }</strong><br><strong>${data.value}</strong></div>`
        },
      },
      ...dataMapsProps,
    })

    this.map = map
  }

  render() {
    return <div ref={this.containerRef} />
  }
}

export default withClientOnly(DataMap)
