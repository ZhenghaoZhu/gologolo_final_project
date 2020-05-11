import React from 'react';
import LogoTextBox from './LogoTextBox.js';
import { Rnd } from 'react-rnd';
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";

const ReactGridLayout = WidthProvider(RGL);

export default class testingScreen extends React.PureComponent {
	render() {
		return (
			<ReactGridLayout
				layout={this.state.layout}
				onLayoutChange={this.onLayoutChange}
				{...this.props}
			>
				{this.generateDOM()}
			</ReactGridLayout>
		);
	}
}