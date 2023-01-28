import Head from 'next/head'
import { Inter } from '@next/font/google'
import { useReducer, useCallback } from 'react';
import Select, { SingleValue, MultiValue, ActionMeta, Props as SelectProps } from 'react-select'

const stateOptions = [
  { value: 0, label: 'Texas' },
  { value: 1, label: 'Louisiana' }
]

const metroOptions = [
  [
    { value: 0, label: "Dallas" },
    { value: 1, label: "Houston" }
  ],
  [
    { value: 0, label: "Bossier" },
    { value: 1, label: "Haughton" }
  ]
]

interface Option
{
  value: number,
  label: string
}

interface FilterState
{
  stateOptions: Option[],
  metroOptions?: Option[],
  selectedStateOption?: Option | null,
  selectedMetroOptions?: Option[]
}

interface FilterStateAction
{
  type: FilterStateActionKind,
  payload?: any
}

enum FilterStateActionKind
{
  CHANGE_STATE,
  CHANGE_METRO,
  RESET
}

const getMetroOptions = (stateId?: number) : Option[] => {
  if (!stateId?.toString) {
    return []
  }

  return metroOptions[stateId];  
}

const getInitialState = (): FilterState => ({
  stateOptions: stateOptions,
  metroOptions: getMetroOptions(stateOptions[0].value),
  selectedStateOption: stateOptions[0],
  selectedMetroOptions: []
})

const reducer = (state: FilterState, action: FilterStateAction): FilterState => {
  console.log(action.type)
  switch (action.type) {
    case FilterStateActionKind.CHANGE_STATE:
      return { 
        ...state,
        selectedStateOption: action.payload.stateOption,
        metroOptions: action.payload.metroOptions,
        selectedMetroOptions: []
      }
    case FilterStateActionKind.CHANGE_METRO:
      return { ...state, selectedMetroOptions: action.payload };
    case FilterStateActionKind.RESET:
      return { ...state, selectedStateOption: null, selectedMetroOptions: [], metroOptions: [] }
    default:
      return state;
  }
};

export default function Home() {
  const [state, dispatch] = useReducer(reducer, getInitialState());
 
  const onStateSelectChanged = useCallback(
    (newValue: SingleValue<Option>, _actionMeta: ActionMeta<unknown>): void => {
      const payload = { 
        stateOption: newValue,
        metroOptions: getMetroOptions(newValue?.value)
      }

      dispatch({ type: FilterStateActionKind.CHANGE_STATE, payload })
    }, []
  );

  const onMetroSelectChanged = useCallback(
    (newValue: MultiValue<Option>, _actionMeta: ActionMeta<unknown>): void =>
      dispatch({ type: FilterStateActionKind.CHANGE_METRO, payload: newValue })
    , []
  );

  const onResetButtonClicked = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>): void => {
      dispatch({ type: FilterStateActionKind.RESET })
    }, []
  )

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Select
          value={state.selectedStateOption}
          options={stateOptions}
          onChange={onStateSelectChanged}
          />
        <Select
          value={state.selectedMetroOptions}
          options={state.metroOptions}
          onChange={onMetroSelectChanged}
          isDisabled={!state.metroOptions?.length}
          isMulti
          isClearable
          />
        <button onClick={onResetButtonClicked}>Reset</button>
      </main>
    </>
  )
}
