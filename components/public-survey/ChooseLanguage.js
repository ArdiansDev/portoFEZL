  import React, { useEffect } from "react";
  import { useLocalStorageState } from "hooks/utils/useLocalStorageState";
  import { useQuery, useQueryClient } from 'react-query'

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
  export default function ChooseLanguage({languages, surveyId, invalidateQuery}) {
    
    const [language, setLanguage] = useLocalStorageState(`survey-${surveyId}-language`, languages[0]);
    
    const onChange = (currentLanguage) => {
      setLanguage(currentLanguage);
    }
    const queryClient = useQueryClient()
    useEffect(()=> {
      queryClient.invalidateQueries(['public-survey-questions', surveyId])
    }, [language])

    return (
      <div>
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          <select
            id="tabs"
            name="tabs"
            className="block width-150 pl-3 pr-10 py-2 bg-base-500 text-white text-sm border-white focus:outline-none focus:ring-gray-300 focus:border-gray-300 sm:text-sm rounded-md"
            defaultValue={language.name}
          >
            {languages?.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <div>
            <nav className="-mb-px flex space-x-8 px-12 justify-center items-center flex-wrap cursor-pointer" aria-label="Tabs">
              {languages?.map((tab) => (
                <a
                  key={tab.name}
                  href={tab.href}
                  className={classNames(
                    language.name === tab.name
                      ? 'border-white text-white'
                      : 'border-transparent text-gray-200 hover:text-gray-400 hover:border-gray-500',
                    'whitespace-nowrap py-4 px-1 border-b-2 sm:reg-14 reg-12'
                  )}
                  aria-current={language.name === tab.name ? 'page' : undefined}
                  onClick={() => onChange(tab)}
                >
                  {tab.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    )
  }