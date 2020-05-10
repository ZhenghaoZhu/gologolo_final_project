import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import LogoTextBox from './LogoTextBox.js';
import { Button } from '@material-ui/core';

const ReactGridLayout = WidthProvider(RGL);

export default class LogoCanvas extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    items: 5,
    cols: 12,
    rowHeight: 30,
    onLayoutChange: function() {},
  };

  constructor(props) {
    super(props);

    const layout = this.generateLayout();
    this.state = { 
        layout,
        itemCount: 0,
        textBoxList : [] 
    };
  }

  generateDOM = () => {
    const currentStyle = {
        text: "Text",
        color: "#FF0000",
        fontSize: "24pt",
        backgroundColor: "#00FF00",
        borderColor: "#0000FF",
        borderRadius: "20pt",
        borderStyle: "solid",
        borderWidth: "15pt",
        padding: "11pt",
        margin: "16pt",
    };
    console.log(this)
    return _.map(_.range(this.state.itemCount), function(i) {
      return (
        <div key={i}>
          <LogoTextBox 
                style = {currentStyle} 
                text = {currentStyle.text}
                h = "3"
                w = "3"
          />
        </div>  
      );
    });
  }

  generateLayout() {
    const p = this.props;
    console.log(p.items)
    return _.map(new Array(p.items), function(item, i) {
      const y = _.result(p, "y") || Math.ceil(Math.random() * 4) + 1;
      return {
        x: 1,
        y: 1,
        w: 2,
        h: 2,
        i: i.toString()
      };
    });
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
  }

  addTextBoxButtonOnClick = () => {
      const currentItemCount = this.state.itemCount;
      this.setState({
          itemCount: currentItemCount + 1,
      });
  }

  render() {
    return (
        <div>
        <Button variant = "outlined" onClick = {this.addTextBoxButtonOnClick}>Add Text Box</Button>
        <ReactGridLayout
            layout={this.state.layout}
            onLayoutChange={this.onLayoutChange}
            breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
            cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
            {...this.props}
        >
            {this.generateDOM()}
        </ReactGridLayout>
        </div>
    );
  }
}
