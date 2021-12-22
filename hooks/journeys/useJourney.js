import { useQuery, useMutation } from 'react-query';
import { client } from 'utils/client';
import useUser from 'hooks/auth/useUser';

const fetchJourney = async ({ query = {}, journey_id }) => {
  return client(`/journeys/${journey_id}`, { params: query }).then(
    (data) => data?.data
  );
};

const useJourney = ({ query, journey_id, options }) => {
  return useQuery(
    ['journey', journey_id],
    () => fetchJourney({ query, journey_id }),
    {
      ...options,
    }
  );
};

const fetchBadge = async ({ query = {} }) => {
  return client(`/badges?disable_pagination=true`, { params: query });
};

const useBadge = ({ query, options } = {}) => {
  return useQuery('badges', () => fetchBadge({ query }), {
    keepPreviousData: true,
    ...options,
  });
};

const fetchGetPresign = async ({ query = {} }) => {
  return client(`/uploads/presign`, { params: query });
};

const useGetPresign = ({ query, options } = {}) => {
  return useQuery('presignUrl', () => fetchGetPresign({ query }), {
    ...options,
  });
};

const reshapeItem = (item, index) => {
  return {
    orderPerItem: index + 1,
    objectId: item.id,
    objectType: item.itemType,
  };
};

const reshapeSection = (section, index) => {
  return {
    orderPerItem: index + 1,
    moduleName: section.title,
    objectType: section.objectType,
    sectionItems:
      section?.children?.map((child, index) => reshapeItem(child, index)) ?? [],
  };
};

const submitJourney = (payload) => {
  let newData = {};
  if (payload) {
    let newItems = [];
    payload.items.map((data, index) => {
      if (data.isSection) {
        let newSection = reshapeSection(data, index);
        newItems.push(newSection);
      } else {
        let newItem = reshapeItem(data, index);
        newItems.push(newItem);
      }
    });

    newData = {
      title: payload.title,
      description: payload.description,
      imageUrl: payload.imageUrl,
      rewardCoin: payload.rewardCoin,
      rewardScore: payload.rewardScore,
      rewardStamp: payload.rewardStamp,
      rewardGem: payload.rewardGem,
      items: newItems,
      stampId: payload?.stamp?.id,
    };
  }
  return useMutation(() =>
    client('/journeys', {
      method: 'POST',
      data: newData,
    })
  );
};

const editJourneyData = (payload) => {
  let newData = {};
  if (payload) {
    let newItems = [];
    payload.items.map((data, index) => {
      if (data.isSection) {
        let newSection = reshapeSection(data, index);
        newItems.push(newSection);
      } else {
        let newItem = reshapeItem(data, index);
        newItems.push(newItem);
      }
    });

    newData = {
      title: payload.title,
      description: payload.description,
      imageUrl: payload.imageUrl,
      rewardCoin: payload.rewardCoin,
      rewardScore: payload.rewardScore,
      rewardStamp: payload.rewardStamp,
      rewardGem: payload.rewardGem,
      items: newItems,
      stampId: payload?.stamp?.id,
    };
  }
  return useMutation((journeyId) =>
    client(`/journeys/${journeyId}`, {
      method: 'PUT',
      data: newData,
    })
  );
};

export {
  useJourney,
  fetchJourney,
  useBadge,
  useGetPresign,
  submitJourney,
  editJourneyData,
};
