import "../assets/stylesheets/SliderV.scss";
import React from "react";
import Slider from "rc-slider";

class SliderV extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0.1,
    };
  }

  onSliderChange = (value) => {
    this.setState({
      value,
    });
  };

  render() {
    return (
      <Slider
        value={this.state.value}
        onChange={this.onSliderChange}
        onAfterChange={this.onAfterChange}
      />
    );
  }
}
export default SliderV;
