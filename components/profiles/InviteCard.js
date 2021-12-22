import React from 'react';
import { useSubmitInvite } from 'hooks/challenges/useUserChallange';
import DeclineModal from './DeclineModal';
import { useState } from 'react';
import moment from 'moment';
import { Duration } from 'luxon';
import { locale } from 'utils/locale';

export default function InviteCard({
  title,
  description,
  duration,
  points,
  id,
  gem,
  currency,
  userChallengeId,
}) {
  const payload1 = {
    state: 'accepted',
  };
  const payload2 = {
    state: 'declined',
  };

  const { mutate } = useSubmitInvite({ id: userChallengeId });

  const handleInvite = () => {
    mutate(payload1);
  };
  const handleDeclined = () => {
    mutate(payload2);
    setShow(false);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleAccept = async () => {
    handleInvite(id);
  };

  let durationInFormat = Duration.fromObject({ seconds: duration }).toFormat(
    "mm 'min' ss 'sec'"
  );

  return (
    <div className="border-gray-300 border rounded-lg p-2 w-72 mt-4">
      <h1 className="bg-indigo-100 text-base-600 w-max px-4 py-1 font-bold rounded-lg">
        {locale('Quiz')}
      </h1>
      <div className="flex justify-between mb-5">
        <h1 className="py-2 text-base-600 font-semibold max-h-8 text-left capitalize">
          {title}
        </h1>
      </div>
      <h1 className="text-left text-base-600 font-medium">{description}</h1>
      <div className="text-gray-600 text-sm my-8 font-light">
        <div className="justify-between flex">
          <p>{locale('Duration')}</p>
          <p>{durationInFormat}</p>
        </div>
        <div className="justify-between flex">
          {currency == 'gem' ? (
            <p>{locale('Rewards Gems')}</p>
          ) : (
            <p>{locale('Rewards Coins')}</p>
          )}
          {currency == 'gem' ? <p>{gem ?? 0}</p> : <p>{points ?? 0}</p>}
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => {
            setShow(true);
          }}
          className="border-2 border-base-500 rounded text-base-500 px-2 mr-2"
        >
          Decline
        </button>
        <button
          onClick={handleAccept}
          className="bg-base-600 text-white px-2 border border-base-500 rounded "
        >
          Accept
        </button>
      </div>
      <DeclineModal
        handleDeclined={handleDeclined}
        show={show}
        handleClose={handleClose}
      />
    </div>
  );
}
