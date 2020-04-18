import React, { useState } from 'react';
import JsonView from '../../components/json-view';
import Pop from '../../components/pop';
import wechat from '../../images/icon24_appwx_logo.png';
import wx from '../../images/wechat.jpeg';
import './index.scss';

export default function JsonToolPage() {
  const [json, setJson] = useState('');
  const [pop, setPop] = useState(false);

  const onInput = (e: any) => {
    setJson(e.target.value);
  };

  return (
    <div className="page">
      <header className="page-header">
        <span className="page-header__name">Felix</span>
        <img
          className="page-header__wechat"
          alt="hsidarx"
          src={wechat}
          onClick={() => setPop(true)}
        />
      </header>
      <div className="page-json">
        <div className="page-json-source">
          <textarea
            className="page-json-source__text"
            placeholder="请输入 JSON 字符串"
            onChange={onInput}
          />
        </div>
        <div className="page-json-render">
          <JsonView json={json} />
        </div>
      </div>
      {pop && (
        <Pop onDismiss={() => setPop(false)}>
          <img src={wx} alt="微信：hsidarx"></img>
        </Pop>
      )}
      {/* <footer className="page-footer">GitHub：</footer> */}
    </div>
  );
}
