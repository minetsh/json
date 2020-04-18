import React, { PropsWithChildren } from 'react';
import './index.scss';

type Props = PropsWithChildren<{
  onDismiss?: () => void;
}>;

export default function Pop(props: Props) {
  const { onDismiss } = props;
  return (
    <div className="pop" onClick={onDismiss && onDismiss}>
      <div className="pop-content">{props.children}</div>
    </div>
  );
}
