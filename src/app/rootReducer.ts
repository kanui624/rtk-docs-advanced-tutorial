import { combineReducers } from '@reduxjs/toolkit'

// const rootReducer = combineReducers({})
import issuesDisplayReducer from 'features/issuesDisplay/issuesDisplaySlice'
import repoDetailsReducer from 'features/repoSearch/repoDetailsSlice'
import issuesReducer from 'features/issuesList/issuesSlice'
import commentsReducer from 'features/issueDetails/commentsSlice'

const rootReducer = combineReducers({
  issuesDisplay: issuesDisplayReducer,
  // repoDetails: repoDetailsReducer
  repoDetails: repoDetailsReducer,
  issues: issuesReducer,
  comments: commentsReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
