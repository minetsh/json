import React, { Fragment, useState, useEffect } from 'react';
import { renderJson } from '../../core/json';
import './index.scss';

type Props = {
  json?: string;
};

export default function JsonView(props: Props) {
  const [value, setValue] = useState<any>();

  useEffect(() => {
    setValue(renderJson(props.json));
  }, [props.json]);

  return (
    <div className="json-view">
      <Fragment>{value && value.render()}</Fragment>
    </div>
  );
}
