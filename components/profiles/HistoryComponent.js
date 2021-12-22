import { useAuth } from 'context/AuthContext';
import React, { useEffect, useState } from 'react';
import HistoryChallenge from './HistoryChallenge';

import HistoryRewards from './HistoryRewards';

export default function HistoryComponent({ active, setGameId, SubTab }) {

  const { permission } = useAuth();
  if (active === 'challenge') {
    if (SubTab === 'Invitation') {
      return permission['view_challenge_history'] ?  <HistoryChallenge setGameId={setGameId} /> : <div></div>;
    } else {
      return <div></div>;
    }
  } else if (active === 'teams') {
    return <div></div>;
  } else if (active === 'profile') {
    return <div></div>;
  } else if (active === 'rewards') {
    return <HistoryRewards />;
  }
}
