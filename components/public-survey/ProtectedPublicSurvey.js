import useCodeAccessSurvey from "hooks/public_survey/useCodeAccessSurvey";

export default function ProtectedPublicSurvey({children, surveyId, accessType}) {
    if(accessType === "unlimited_access" || !surveyId || !accessType) return <>{children}</>
    const {isLoading} =  useCodeAccessSurvey({surveyId: surveyId, accessType, redirectTo: `/survey/public/${surveyId}`})
    if(isLoading) return null;
    return (
        <>{children}</>
    );
  }