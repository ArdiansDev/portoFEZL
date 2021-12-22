import React, { useEffect, useState } from 'react';
import { useStep } from 'react-hooks-helper';
import { useRouter } from 'next/router';

import { useJourney } from 'hooks/journeys/useJourney';
import JourneyForm from 'components/Journey/journey-form';
import JourneySection from 'components/Journey/journey-section';
import { useBadge } from 'hooks/journeys/useJourney';

export default function JourneyEditForm() {
  const router = useRouter();
  if (!router.isReady) return null;
  const { journey_id } = router.query;

  const steps = [{ id: 'journey' }, { id: 'journeyItem' }];

  const defaultData = {
    title: '',
    description: '',
    imageUrl: '',
    rewardCoin: 0,
    rewardScore: 0,
    rewardStamp: 1,
    rewardGem: 0,
    items: [],
  };

  const { data: badges } = useBadge();

  const [formData, setForm] = useState(defaultData);
  const { step, navigation } = useStep({ initialStep: 0, steps });
  const { id } = step;

  const { data: journey_details } = useJourney({
    query: {},
    journey_id,
    options: {
      enabled: !!badges
    }
  });

  const reshapeItem = (item, index) => {
    return {
      title: item.title || item.name,
      id: item.objectId,
      itemType: item.objectType,
      isSection: false
    };
  };
  
  const reshapeSection = (section, index) => {
    return {
      isSection: true,
      title: section.title,
      objectType: 'journey_section',
      children: section?.sectionItems?.map((child, index) => reshapeItem(child, index)) ?? [],
    };
  };

  const reshapeItemsJourney = (items) => {
    const newItems = items.map(item => {
      if(item.itemType === 'section'){
        return reshapeSection(item);
      } else {
        return reshapeItem(item);
      }
    })
    return newItems
  }

  useEffect(() => {
    if (journey_details) {
      const newData = {
        title: journey_details.title,
        description: journey_details.description,
        imageUrl: journey_details.imageSecureUrl,
        rewardCoin: journey_details.rewardCoin,
        rewardScore: journey_details.rewardScore,
        rewardStamp: journey_details.rewardStamp,
        rewardGem: journey_details.rewardGem,
        items: reshapeItemsJourney(journey_details.items),
        stampId: journey_details.stampId,
        stamp: badges?.data?.find(stamp => stamp.id === journey_details.stampId),
        totalUser: journey_details.totalUsers
      };
      setForm(JSON.parse(JSON.stringify(newData)));
    }
  }, [journey_details]);

  const props = { formData, setForm, navigation };

  if(!formData?.title) return null
  switch (id) {
    case 'journey':
      return <JourneyForm {...props} badges={badges}/>;
    case 'journeyItem':
      return <JourneySection {...props} journeyId={journey_id} badges={badges}/>;

    default:
      return null;
  }
}
