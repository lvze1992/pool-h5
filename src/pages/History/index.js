import React from 'react';
import _ from 'lodash';
import { useParams } from 'react-router-dom';
import { CustomNav } from 'src/components';
import * as historyPages from './pages';
import './History.scss';

export default function History(props) {
  let { pageType } = useParams();
  const poolId = _.get(props, 'match.params.id');

  const { Comp, title } = historyPages[pageType] || {};
  return (
    <div className="history-page">
      <CustomNav title={title} />
      {Comp ? <Comp poolId={poolId} /> : null}
    </div>
  );
}
