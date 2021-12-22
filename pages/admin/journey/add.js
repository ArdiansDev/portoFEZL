import React, { useEffect, useState } from 'react';
import { useStep } from 'react-hooks-helper';
import { useRouter } from 'next/router';

import { submitJourney } from 'hooks/journeys/useJourney';
import JourneyForm from 'components/Journey/journey-form';
import JourneySection from 'components/Journey/journey-section';
import { useBadge } from 'hooks/journeys/useJourney';

export default function JourneyFormAdd() {
  const router = useRouter();
  if (!router.isReady) return null;
  const steps = [{ id: 'journey' }, { id: 'journeyItem' }];

  const defaultData = {
    title: '',
    description: '',
    imageUrl: '',
    rewardCoin: 0,
    rewardScore: 0,
    rewardStamp:1,
    rewardGems: 0,
    items: [],
  };

  const { data: badges } = useBadge();

  const [formData, setForm] = useState(defaultData);
  const { step, navigation } = useStep({ initialStep: 0, steps });
  const { id } = step;

  const props = { formData, setForm, navigation };

  switch (id) {
    case 'journey':
      return <JourneyForm {...props} badges={badges}/>;
    case 'journeyItem':
      return <JourneySection {...props} />;

    default:
      return null;
  }
}
