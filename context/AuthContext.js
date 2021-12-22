import React, { createContext, useContext, useState, useEffect } from 'react';
const AuthContext = createContext();
import { useLocale } from 'hooks/locale/useLocale';
import Router from 'next/router';
import useUser from 'hooks/auth/useUser';
import Head from 'next/head';
import colorsGenerator from 'colorsGenerator';
import { toSnakeCase } from 'utils/caseConverter';
import ModalCoachmark from '../components/coachmark/ModalCoachmark';

function AuthProvider({ children, protectedRoute, isAdmin }) {
  let pathname = location.pathname;

  if (location?.pathname?.includes('logout')) {
    localStorage.removeItem('token');
  }

  const [redirectToHome, setRedirectToHome] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [redirectToSurvey, setRedirectToSurvey] = useState(false);

  let inProfiling = pathname?.includes('profiling');

  const {
    data: localeData,
    isLoading: isLoadingLocale,
    refetch: refetchLocale,
  } = useLocale();
  const tenant = localeData;
  const locale = localeData?.localeProperties;
  let permission = localeData?.configs;
  let banners = {};

  if (localeData) {
    banners.banner_rewards_desktop = {
      image: localeData?.bannerRewardsImageDesktop,
    };
    banners.banner_leaderboard_desktop = {
      image: localeData?.bannerLeaderboardImageDesktop,
    };
    banners.banner_journey_desktop = {
      image: localeData?.bannerJourneyImageDesktop,
    };
    banners.banner_invitation_challenges_desktop = {
      image: localeData?.bannerInvitationChallengesImageDesktop,
    };
    banners.banner_weekly_challenges_desktop = {
      image: localeData?.bannerWeeklyChallengesImageDesktop,
    };
    banners.banner_resources_desktop = {
      image: localeData?.bannerResourcesImageDesktop,
    };
    banners.banner_rewards_mobile = {
      image: localeData?.bannerRewardsImageMobile,
    };
    banners.banner_leaderboard_mobile = {
      image: localeData?.bannerLeaderboardImageMobile,
    };
    banners.banner_journey_mobile = {
      image: localeData?.bannerJourneyImageMobile,
    };
    banners.banner_invitation_challenges_mobile = {
      image: localeData?.bannerInvitationChallengesImageMobile,
    };
    banners.banner_weekly_challenges_mobile = {
      image: localeData?.bannerWeeklyChallengesImageMobile,
    };
    banners.banner_resources_mobile = {
      image: localeData?.bannerResourcesImageMobile,
    };
    banners.banner_charity_desktop = {
      image: localeData?.bannerCharityImageDekstop,
    };
    banners.banner_charity_mobile = {
      image: localeData?.bannerCharityImageMobile,
    };
  }

  if (permission) {
    permission = toSnakeCase(permission);
  }

  const {
    user,
    data: auth,
    isLoading: isLoadingAuth,
    refetch: refetchAuth,
  } = useUser({
    onSuccess: (data) => {
      if (data?.user?.role !== 'owner' && isAdmin) {
        setRedirectToHome(true);
      } else if (data?.user?.surveyId && !inProfiling && permission['view_profiling']) {
        setRedirectToSurvey(true);
      } else if (!protectedRoute) {
        setRedirectToHome(true);
      }
    },
    onError: () => {
      if (protectedRoute) setRedirectToLogin(true);
    },
  });

  useEffect(() => {
    refetchAuth();
    refetchLocale();
  }, [pathname]);

  if (locale) localStorage.setItem('locale', JSON.stringify(locale));
  !isLoadingLocale && colorsGenerator(tenant?.themeColor || '#4F46E5');
  document.documentElement.style.setProperty(
    `--secondary-color`,
    tenant?.secondaryColor ?? tenant?.themeColor
  );

  // effect redirect to login
  useEffect(() => {
    if (redirectToHome || redirectToLogin || redirectToSurvey) {
      let url = '/login';

      if (redirectToHome) url = tenant?.homepageRoute;
      if (redirectToSurvey) url = `/profiling/${user?.surveyId}/page/1`;
      Router.push(url);

      setTimeout(() => {
        setRedirectToLogin(false);
        setRedirectToSurvey(false);
        setRedirectToHome(false);
      }, 2000);
    }
  }, [redirectToHome, redirectToLogin, redirectToSurvey]);
  console.log(tenant);
  if (
    redirectToHome ||
    redirectToLogin ||
    redirectToSurvey ||
    isLoadingAuth ||
    isLoadingLocale ||
    (protectedRoute && !auth) ||
    (!protectedRoute && !!auth)
  ) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading . . .
      </div>
    );
  } else {
    return (
      <AuthContext.Provider
        value={{
          tenant,
          auth,
          user,
          permission,
          banners,
        }}
      >
        <Head>
          <title>{tenant?.name}</title>
          <link rel="icon" href={tenant?.faviconUrl} />
        </Head>

        {children}
        {user?.firstLogin && !isAdmin && permission['view_coachmark'] && (
          <ModalCoachmark />
        )}
      </AuthContext.Provider>
    );
  }
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
