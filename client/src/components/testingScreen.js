import React from "react";
//import ResizePanel from "react-resize-panel";
import ResizePanel from "react-resize-panel";
import style from './../../src/testing/testing.css';
import classNames from 'classnames/bind';
import DisplayLogo from './DisplayLogo.js';
import Draggable from 'react-draggable';

let cx = classNames.bind(style);

export default () => (
  <div className={cx('container')}>
    <ResizePanel direction="s">
      <div className={cx('header', 'panel')}>
        <span>
        <DisplayLogo id = "editScreenLogo"logo = {{
                            display: "inline-block",
                            color: "#FF0000",
                            fontSize: 12,
                            backgroundColor: "#FF00FF", 
                            borderRadius: 12, 
                            borderColor: "#FF0000",
                            borderWidth: 12,
                            padding: 12,
                            margin: 12,
                            borderStyle: "solid",
                            position: "center",
                          }} logoText = "Text"/>
        </span>
        <span>
        <DisplayLogo id = "editScreenLogo"logo = {{
                            display: "inline-block",
                            color: "#FF0000",
                            fontSize: 12,
                            backgroundColor: "#FF00FF", 
                            borderRadius: 12, 
                            borderColor: "#FF0000",
                            borderWidth: 12,
                            padding: 12,
                            margin: 12,
                            borderStyle: "solid",
                            position: "center",
                          }} logoText = "Text"/>
        </span>
      </div>
    </ResizePanel>
    <div className={cx('body')}>

      <ResizePanel direction="e" style={{ flexGrow: '1' }} >
        <div className={cx('sidebar', 'withMargin', 'panel')}>
            <span>
        <DisplayLogo id = "editScreenLogo"logo = {{
                            display: "inline-block",
                            color: "#FF0000",
                            fontSize: 12,
                            backgroundColor: "#FF00FF", 
                            borderRadius: 12, 
                            borderColor: "#FF0000",
                            borderWidth: 12,
                            padding: 12,
                            margin: 12,
                            borderStyle: "solid",
                            position: "center",
                          }} logoText = "Text"/>
        </span></div>
      </ResizePanel>
      <div className={cx('content', 'panel')}>content</div>
      <ResizePanel direction="w" style={{ width: '400px' }} handleClass={style.customHandle} borderClass={style.customResizeBorder}>
        <div className={cx('sidebar', 'panel')}>right panel<br /> with custom handle<br /> default 400px</div>
      </ResizePanel>

    </div>

    <ResizePanel direction="n" style={{height: '200px'}}>
      <div className={cx('footer', 'panel')}>
        <div className={cx('footerArea')}>
          <div className={cx('footerAreaContent')}>
            <span>footer area, min height: 100px</span>
          </div>
        </div>
        <div className={cx('footerBottomBar')}>
          bottom bar
        </div>
      </div>
    </ResizePanel>
  </div>
);