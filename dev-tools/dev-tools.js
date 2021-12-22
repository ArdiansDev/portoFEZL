/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx, Global} from '@emotion/core'

import '@reach/tabs/styles.css'
import '@reach/tooltip/styles.css'

import * as React from 'react'
import {FaTools} from 'react-icons/fa'
import {Tooltip} from '@reach/tooltip'
import {Tabs, TabList, TabPanels, TabPanel, Tab} from '@reach/tabs'
// pulling the development thing directly because I'm not worried about
// bundle size since this won't be loaded in prod unless the query string/localStorage key is set
import * as colors from 'styles/colors'
import {ReactQueryDevtoolsPanel} from 'react-query/dist/react-query-devtools.development'
import { mockRoutes } from './mockRoutes'

export function DevTools({callback}) {

    const rootRef = React.useRef()
    const [hovering, setHovering] = React.useState(false)
    const [persist, setPersist] = useLocalStorageState(
      '__ac_devtools_persist__',
      false,
    )
    const [tabIndex, setTabIndex] = useLocalStorageState(
      '__ac_devtools_tab_index__',
      0,
    )

    const show = hovering || persist
    const toggleShow = () => setPersist(v => !v)
    React.useEffect(() => {
      function updateHoverState(event) {
        setHovering(rootRef.current?.contains(event.target) ?? false)
      }
      document.body.addEventListener('mousemove', updateHoverState)
      return () =>
        document.body.removeEventListener('mousemove', updateHoverState)
    }, [])

    return (
      <div
        css={{
          position: 'fixed',
          bottom: -60,
          left: 0,
          right: 0,
          zIndex: 50,
          label: {
            margin: 0,
            color: 'rgb(216, 221, 227)',
          },
          'input, select': {
            background: 'rgb(20, 36, 55)',
            border: '2px solid rgb(28, 46, 68)',
            borderRadius: 5,
            color: 'white',
            fontWeight: '600',
            padding: '5px',
            '::placeholder': {
              color: 'rgba(255,255,255,0.3)',
            },
            ':focus': {
              outlineColor: colors.base,
              borderColor: colors.base,
              outline: '1px',
            },
          },
          'button:not([data-reach-tab])': {
            borderRadius: 5,
            background: colors.base,
            ':hover': {
              background: colors.baseDarken10,
            },
            border: 0,
            color: colors.gray,
          },
          '[data-reach-tab]': {
            border: 0,
            ':focus': {
              outline: 'none',
            },
          },
          '[data-reach-tab][data-selected]': {
            background: 'rgb(11, 21, 33)',
            borderBottom: '3px solid white',
            marginBottom: -3,
          },
        }}
      >
        <div
          ref={rootRef}
          css={[
            {
              background: 'rgb(11, 21, 33)',
              opacity: '1',
              color: 'white',
              boxSizing: 'content-box',
              height: '60px',
              width: '100%',
              transition: 'all 0.3s',
              overflow: 'scroll',
            },
            {
              height: show ? '55vh' : '6vh',
              width: '100%',
              opacity: '1',
            }
          ]}
        >
          <Tooltip label="Toggle Persist DevTools">
            <button
              css={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '1.2rem',
                border: 'none',
                padding: '10px 20px',
                background: 'none',
                marginTop: -40,
                marginLeft: 20,
                position: 'absolute',
                backgroundColor: 'rgb(11,21,33) !important',
                overflow: 'hidden',
                svg: {
                  width: 20,
                  marginRight: 8,
                  color: persist ? 'white' : 'rgba(255,255,255,0.7)',
                },
                '::before': {
                  content: '""',
                  position: 'absolute',
                  height: 4,
                  width: '100%',
                  left: 0,
                  top: 0,
                  background: persist ? colors.yellow : 'transparent',
                },
              }}
              onClick={toggleShow}
            >
              <FaTools />
              AC DevTools
            </button>
          </Tooltip>
            <Tabs
              css={{padding: 20}}
              index={tabIndex}
              onChange={i => setTabIndex(i)}
            >
              <TabList css={{marginBottom: 20}}>
                <Tab>Mock API List</Tab>
                <Tab>React Query</Tab>
                <Tab>Theme Color</Tab>
              </TabList>
              <div
                css={{
                  border: '1px solid rgb(28,46,68)',
                  margin: '0px -20px 20px -20px',
                }}
              />
              <TabPanels css={{height: '100%'}}>
                <TabPanel>
                  <RequestFailUI />
                </TabPanel>
                <TabPanel>
                  <ReactQueryDevtoolsPanel />
                </TabPanel>
                <TabPanel>
                  <ThemeColor callback={callback}/>
                </TabPanel>
              </TabPanels>
            </Tabs>
        </div>
        {show ? (
          <Global
            styles={{
              '#root': {
                marginBottom: '50vh',
              },
            }}
          />
        ) : null}
      </div>
    )
  }


function ThemeColor({callback}) {
    const [themeColor, setThemeColor] = useLocalStorageState(
        '__ac_theme_color__',
        "4F46E5",
    )
    const [customColor, setCustomColor] = useLocalStorageState(
        '__ac_custom_color__',
        "",
    )

    React.useEffect(() => {
        callback()
    }, [themeColor])
    
    React.useEffect(() => {
        setThemeColor(customColor)
    }, [customColor])

    return (
        <>
        <p css={{paddingBottom: "10px", marginLeft: "20px"}}>Reload the page after change color</p>
        <div css={{display: "flex", gap: "60px" }}>
            <div css={{ display: "flex", gap: "40px", flexDirection: "column", marginLeft: "20px"}} >
                <div css={{ display: "flex", gap: "40px"}} >
                    <div css={{width: "150px", height: "150px", cursor: "pointer"}} className={`${themeColor === "D97706" ? "border-2 border-white" : "" } bg-amber-600`} onClick={() => setThemeColor("D97706")} />
                    <div css={{width: "150px", height: "150px", cursor: "pointer"}} className={`${themeColor === "EA580C" ? "border-2 border-white" : "" } bg-orange-600`} onClick={() => setThemeColor("EA580C")} />
                    <div css={{width: "150px", height: "150px", cursor: "pointer"}} className={`${themeColor === "65A30D" ? "border-2 border-white" : "" } bg-lime-600`} onClick={() => setThemeColor("65A30D")} />
                    <div css={{width: "150px", height: "150px", cursor: "pointer"}} className={`${themeColor === "059669" ? "border-2 border-white" : "" } bg-emerald-600`} onClick={() => setThemeColor("059669")} />
                    <div css={{width: "150px", height: "150px", cursor: "pointer"}} className={`${themeColor === "0D9488" ? "border-2 border-white" : "" } bg-teal-600`} onClick={() => setThemeColor("0D9488")} />
                    <div css={{width: "150px", height: "150px", cursor: "pointer"}} className={`${themeColor === "0891B2" ? "border-2 border-white" : "" } bg-cyan-600`} onClick={() => setThemeColor("0891B2")} />
                </div>

                <div css={{ display: "flex", gap: "40px"}} >
                    <div css={{width: "150px", height: "150px", cursor: "pointer"}} className={`${themeColor === "0284C7" ? "border-2 border-white" : "" } bg-sky-600`} onClick={() => setThemeColor("0284C7")} />
                    <div css={{width: "150px", height: "150px", cursor: "pointer"}} className={`${themeColor === "4F46E5" ? "border-2 border-white" : "" } bg-indigo-600`} onClick={() => setThemeColor("4F46E5")} />
                    <div css={{width: "150px", height: "150px", cursor: "pointer"}} className={`${themeColor === "7C3AED" ? "border-2 border-white" : "" } bg-violet-600`} onClick={() => setThemeColor("7C3AED")} />
                    <div css={{width: "150px", height: "150px", cursor: "pointer"}} className={`${themeColor === "E11D48" ? "border-2 border-white" : "" } bg-rose-600`} onClick={() => setThemeColor("E11D48")} />
                    <div css={{width: "150px", height: "150px", cursor: "pointer"}} className={`${themeColor === "C026D3" ? "border-2 border-white" : "" } bg-fuchsia-600`} onClick={() => setThemeColor("C026D3")} />
                    <div css={{width: "150px", height: "150px", cursor: "pointer"}} className={`${themeColor === "DB2777" ? "border-2 border-white" : "" } bg-pink-600`} onClick={() => setThemeColor("DB2777")} />
                </div>
            </div>
            
            <div className="flex flex-col gap-2 self-center">
                <p>Custom Color</p>
                <input type="color" id="head" name="head" css={{...(customColor === themeColor ? {borderColor: "white !important"} : {border: "0px !important"}), width: "160px", height: "160px", padding:"0px !important", backgroundColor: `${customColor} !important`}} value={customColor} onChange={(e) => setCustomColor(e.target.value)} />
            </div>
        </div>
        </>
    )
}

function ClearLocalStorage() {
  function clear() {
    global.window.localStorage.clear()
    global.window.location.assign(global.window.location)
  }
  return <button css={{padding: "10px"}} onClick={clear}>Purge Database</button>
}

function RequestFailUI() {
  const [failConfig, setFailConfig] = useLocalStorageState(
    '__ac_request_fail_config__',
    mockRoutes,
  )

  function handleRemoveClick(index) {
    setFailConfig(c => [...c.slice(0, index), ...c.slice(index + 1)])
  }

  function handleSubmit(event) {
     
    event.preventDefault()
    const {method, route} = event.target.elements
    setFailConfig(c => [
      ...c,
      {method: method.value, route: route.value},
    ])
    method.value = ''
    route.value = ''
  }

  return (
    <div css={{display: "flex", gap: "10px", flexDirection: "column"}}>
        <ClearLocalStorage />
        <div
            css={{
                display: 'flex',
                width: '100%',
            }}
        >
            <form
                onSubmit={handleSubmit}
                css={{
                display: 'grid',
                gridTemplateRows: 'repeat(auto-fill, minmax(50px, 60px) )',
                maxWidth: 300,
                width: '100%',
                marginRight: '1rem',
                gridGap: 10,
                }}
            >
                <div
                css={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
                >
                <label htmlFor="method">Method:</label>
                <select id="method" required>
                    <option value="">Select</option>
                    <option value="ALL">ALL</option>
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                </select>
                </div>
                <div css={{width: '100%'}}>
                <label css={{display: 'block'}} htmlFor="route">
                    URL Match:
                </label>
                <input
                    autoComplete="off"
                    css={{width: '100%', marginTop: 4}}
                    id="route"
                    required
                    placeholder="/journeys"
                />
                </div>
                <div>
                <button css={{padding: '6px 16px'}} type="submit">
                    + Add
                </button>
                </div>
            </form>
            <ul
                css={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                width: '100%',
                paddingBottom: '2rem',
                }}
            >
                {failConfig?.map(({method, route}, index) => (
                <li
                    key={index}
                    css={{
                    padding: '6px 10px',
                    borderRadius: 5,
                    margin: '5px 0',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'rgb(20,36,55)',
                    }}
                >
                    <div css={{display: 'flex', flexWrap: 'wrap'}}>
                    <strong css={{minWidth: 70}}>{method}:</strong>
                    <span css={{marginLeft: 10, whiteSpace: 'pre'}}>{route}</span>
                    </div>
                    <button
                    css={{
                        opacity: 0.6,
                        ':hover': {opacity: 1},
                        fontSize: 13,
                        background: 'rgb(11, 20, 33) !important',
                    }}
                    onClick={() => handleRemoveClick(index)}
                    >
                    Remove
                    </button>
                </li>
                ))}
            </ul>
        </div>
    </div>
  )
}

/**
 *
 * @param {String} key The key to set in localStorage for this value
 * @param {Object} defaultValue The value to use if it is not already in localStorage
 * @param {{serialize: Function, deserialize: Function}} options The serialize and deserialize functions to use (defaults to JSON.stringify and JSON.parse respectively)
 */
function useLocalStorageState(
  key,
  defaultValue = '',
  {serialize = JSON.stringify, deserialize = JSON.parse} = {},
) {
  const [state, setState] = React.useState(() => {
    const valueInLocalStorage = global.window.localStorage.getItem(key)
    if (valueInLocalStorage) {
      return deserialize(valueInLocalStorage)
    }
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue
  })

  React.useDebugValue(`${key}: ${serialize(state)}`)

  const prevKeyRef = React.useRef(key)

  React.useEffect(() => {
    const prevKey = prevKeyRef.current
    if (prevKey !== key) {
      global.window.localStorage.removeItem(prevKey)
    }
    prevKeyRef.current = key
  }, [key])

  React.useEffect(() => {
    global.window.localStorage.setItem(key, serialize(state))
  }, [key, state, serialize])

  return [state, setState]
}

/*
eslint
  no-unused-expressions: "off",
*/
