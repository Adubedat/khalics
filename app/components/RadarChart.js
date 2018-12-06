/* eslint-disable */

import React, { Component } from 'react';
import { Text as ReactText } from 'react-native';
import Svg, {
  G, Path, Line, Text,
} from 'react-native-svg';
import _ from 'lodash';

const Radar = require('paths-js/radar');

const identity = (key) => { return function (x) { return x[key] }}

const styleSvg = (style = {}, sourceProps) => {
    if (sourceProps === undefined) return style

    if (sourceProps.fill) {
        style.fill = _.isString(sourceProps.fill) ? sourceProps.fill : sourceProps.fill.color
        style.fillOpacity = sourceProps.fill.alpha ? sourceProps.fill.alpha/100 : 1
    }
    if (sourceProps.stroke) {
        style.stroke = _.isString(sourceProps.stroke) ? sourceProps.stroke : sourceProps.stroke.color
        style.strokeOpacity = sourceProps.stroke.alpha ? sourceProps.stroke.alpha/100 : 1
    }
    if (sourceProps.strokeWidth)
        style.strokeWidth = sourceProps.strokeWidth
    return style
}

const fontAdapt = (fontProps) => {

    const fill = fontProps.color ? (_.isString(fontProps.color) ? fontProps.color : fontProps.color.color ) : fontProps.fill

    return {
        fontFamily: fontProps.fontFamily,
        fontSize: fontProps.fontSize,
        rotate: fontProps.rotate || 0,
        fontWeight: fontProps.fontWeight ? 'bold' : 'normal',
        fontStyle: fontProps.fontStyle ? 'italic' : 'normal' ,
        fill: fill,
        onLabelPress: fontProps.onLabelPress
    }
}

class Options {

    constructor(props) {
      this.props = props
      this.options =  props.options || {}
      this.chartWidth = props.width || this.options.width || 400
      this.chartHeight = props.height || this.options.height || 400
      this.width = this.chartWidth + (this.margin.right || 0) +  (this.margin.left || 0)
      this.height = this.chartHeight + (this.margin.top || 0) + (this.margin.bottom || 0)
      this.min = props.min || this.options.min
      this.max = props.max || this.options.max
    }
    get legendPosition(){ return this.props.legendPosition || (this.props.options && this.props.options.legendPosition) || 'topLeft'}
    get axisX() {return this.props.axisX || (this.props.options && this.props.options.axisX) || {}}
    get axisY() {return this.props.axisY || (this.props.options && this.props.options.axisY) || {}}
    get margin(){return this.props.margin || (this.props.options && this.props.options.margin) || {}}
    get stroke(){return this.props.stroke || (this.props.options && this.props.options.stroke)}
    get fill(){return this.props.fill || (this.props.options && this.props.options.fill)}
    get r(){return this.props.r || (this.props.options && this.props.options.r)}
    get R(){return this.props.R || (this.props.options && this.props.options.R)}
    get label(){return this.props.label || (this.props.options && this.props.options.label) || {}}
    get animate() {return this.props.animate || (this.props.options && this.props.options.animate) || {}}
}

function accessKeys(keys) {
  const a = {};
  for (const i in keys) {
    const key = keys[i];
    a[key] = identity(key);
  }
  return a;
}

export default class RadarChart extends Component {
  static defaultProps = {
    options: {
      width: 600,
      height: 600,
      margin: {
        top: 0, left: 0, right: 0, bottom: 0,
      },
      r: 300,
      max: 150,
      rings: 3,
      fill: '#2980B9',
      stroke: '#2980B9',
      animate: {
        type: 'oneByOne',
        duration: 200,
        fillTransition: 3,
      },
      label: {
        fontSize: 14,
        bold: true,
        color: '#34495E',
      },
    },
  }

  render() {
    const noDataMsg = this.props.noDataMessage || 'No data available';
    if (this.props.data === undefined) return (<ReactText>{noDataMsg}</ReactText>);

    const options = new Options(this.props);

    const x = options.chartWidth / 2;
    const y = options.chartHeight / 2;
    const radius = Math.min(x, y);

    const center = this.props.center || [x, y];

    const keys = Object.keys(this.props.data[0]);
    const keys_value = this.props.data[0];
    const chart = Radar({
      center: this.props.center || [x, y],
      r: this.props.options.r || radius,
      data: this.props.data,
      accessor: this.props.accessor || accessKeys(keys),
      max: this.props.options.max,
      rings: this.props.options.rings,
    });
    const self = this;
    const colors = styleSvg({}, self.props.options);
    const colorsFill = self.props.options.fill;
    const curves = chart.curves.map((c, i) => {
      const color = colorsFill instanceof Array ? colorsFill[i] : colorsFill;
      return (<Path key={i} d={c.polygon.path.print()} fill={color} fillOpacity={0.6} />);
    });

    const length = chart.rings.length;
    const rings = chart.rings.map((r, i) => {
      if (i !== length) {
        return (<Path key={`rings${i}`} d={r.path.print()} stroke={colors.stroke} strokeOpacity={colors.strokeOpacity} fill="none" />);
      }
    });

    const textStyle = fontAdapt(options.label);

    const labels = chart.rings[length - 1].path.points().map((p, i) => {
      function onLabelPress() {
        textStyle.onLabelPress(keys[i], keys_value[`${keys[i]}`]);
      }
      return (
        <G key={`label${i}`}>
          <Line x1={p[0]} y1={p[1]} x2={center[0]} y2={center[1]} stroke={colors.stroke} strokeOpacity={colors.strokeOpacity} />
          <Text
            fontFamily={textStyle.fontFamily}
            fontSize={textStyle.fontSize}
            fontWeight={textStyle.fontWeight}
            fontStyle={textStyle.fontStyle}
            fill={textStyle.fill}
            onPress={onLabelPress}
            textAnchor="middle"
            x={Math.floor(p[0] + ((p[0] - center[0]) / 2))}
            y={Math.floor((p[1] + 4) + ((p[1] - center[1]) / 4))}
          >
            {keys[i]}
          </Text>
        </G>
      );
    });

    return (
      <Svg width={options.width} height={options.height}>
        <G x={options.margin.left} y={options.margin.top}>
          {labels}
          <G x={options.margin.left * -1} y={options.margin.top * -1}>
            {rings}
            {curves}
          </G>
        </G>
      </Svg>
    );
  }
}
