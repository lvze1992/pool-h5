import React from 'react';
import { useParams } from 'react-router-dom';
import { CustomNav } from 'src/components';
import * as historyPages from './pages';
import './History.scss';

export default function History() {
  let { pageType } = useParams();
  const { Comp, title } = historyPages[pageType] || {};
  return (
    <div className="history-page">
      <CustomNav title={title} />
      {Comp ? <Comp /> : null}
    </div>
  );
}
