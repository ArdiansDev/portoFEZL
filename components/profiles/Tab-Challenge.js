import React, { useState } from 'react';
import { AllTab } from './SubTab-All';
import { JourneyTab } from './SubTab-Journey';
import { Weekly } from './SubTab-Weekly';
import { InvitationTab } from './SubTab-Invitation';
import { useAuth } from 'context/AuthContext';
import { useRouter } from 'next/router';
import { locale } from 'utils/locale';

export const ChallengeTab = ({ changeSubTab, SubTab }) => {
  const { tenant, permission } = useAuth();
  const router = useRouter();
  if (!router.isReady) return null;
  const { query } = router || {};
  const Tab = tenant.subdomain.includes('abc') ? 'Invitation' : 'weekly';

  // const [SubTab, setSubTab] = useState(query.subtab || 'weekly');
  const [SelectedChallenge, setSelectedChallenge] = useState('');

  return (
    <div className="my-4">
      {
        <div className="grid grid-rows-1 grid-flow-col gap-16 justify-center my-6 mobile:gap-8 ">
          {permission['view_weekly_challenge'] &&
            permission['view_journey_challenge'] &&
            permission['view_invitation_challenge'] && (
              <h1
                onClick={() => {
                  changeSubTab('all');
                }}
                className={
                  SubTab === 'all'
                    ? 'text-base-800 border-b-2 border-base-800 cursor-pointer'
                    : 'cursor-pointer'
                }
              >
                All
              </h1>
            )}
          {permission['view_weekly_challenge'] && (
            <h1
              onClick={() => {
                changeSubTab('weekly');
              }}
              className={
                SubTab == 'weekly'
                  ? 'text-base-800 border-b-2 border-base-800 cursor-pointer'
                  : 'cursor-pointer'
              }
            >
              {locale('Weekly')}
            </h1>
          )}
          {permission['view_journey_challenge'] && (
            <h1
              onClick={() => {
                changeSubTab('journey');
              }}
              className={
                SubTab === 'journey'
                  ? 'text-base-800 border-b-2 border-base-800 cursor-pointer'
                  : 'cursor-pointer'
              }
            >
              {locale('Journey')}
            </h1>
          )}
          {permission['view_invitation_challenge'] && (
            <h1
              onClick={() => {
                changeSubTab('Invitation');
              }}
              className={
                SubTab === 'Invitation'
                  ? 'text-base-800 border-b-2 border-base-800 cursor-pointer'
                  : 'cursor-pointer'
              }
            >
              {locale('Invitation')}
            </h1>
          )}
        </div>
      }
      <div>
        {SubTab == 'all' ? (
          <AllTab
            setSubTab={changeSubTab}
            setSelectedChallenge={setSelectedChallenge}
          />
        ) : SubTab == 'weekly' ? (
          <Weekly SelectedChallenge={SelectedChallenge} />
        ) : SubTab == 'journey' ? (
          <JourneyTab SelectedChallenge={SelectedChallenge} />
        ) : (
          <InvitationTab />
        )}
      </div>
    </div>
  );
};
