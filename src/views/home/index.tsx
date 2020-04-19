import React, { useState } from 'react';
import JsonView from '../../components/json-view';
import Pop from '../../components/pop';
import wechat from '../../images/icon24_appwx_logo.png';
import wx from '../../images/wechat.jpeg';
import { formatJson } from '../../core/json';
import './index.scss';

export default function JsonToolPage() {
  const [json, setJson] = useState<string>();
  const [pop, setPop] = useState(false);
  const [error, setError] = useState<string>();

  const onInput = (e: any) => {
    setJson(e.target.value);
  };

  const onSourceFormat = (e: any) => {
    const {
      target: {
        dataset: { json: text },
      },
    } = e;
    try {
      setJson(formatJson(text));
      setError(undefined);
    } catch (e) {
      setError(`${e}`);
    }
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
          <div className="page-json-source-operations">
            <span
              className="page-json-source-operations__format"
              data-json={json}
              onClick={onSourceFormat}
            >
              格式化
            </span>
            {error && (
              <span className="page-json-source-operations__error">
                {error}
              </span>
            )}
          </div>
          <textarea
            className="page-json-source__text"
            placeholder="请输入 JSON 字符串"
            value={json}
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
