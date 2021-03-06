// import React, { useState, useEffect } from 'react'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// import { getIssues, getRepoDetails, IssuesResult } from 'api/githubAPI'
// import { getIssues, IssuesResult } from 'api/githubAPI'

import { fetchIssuesCount } from 'features/repoSearch/repoDetailsSlice'
import { RootState } from 'app/rootReducer'

import { IssuesPageHeader } from './IssuesPageHeader'
import { IssuesList } from './IssuesList'
import { IssuePagination, OnPageChangeCallback } from './IssuePagination'
import { fetchIssues } from './issuesSlice'

interface ILProps {
  org: string
  repo: string
  page: number
  setJumpToPage: (page: number) => void
  showIssueComments: (issueId: number) => void
}
export const IssuesListPage = ({
  org,
  repo,
  page = 1,
  setJumpToPage,
  showIssueComments
}: ILProps) => {
  const dispatch = useDispatch()

  // const [issuesResult, setIssues] = useState<IssuesResult>({
  //   pageLinks: null,
  //   pageCount: 1,
  //   issues: []
  // })
  // const [numIssues, setNumIssues] = useState<number>(-1)
  // const [isLoading, setIsLoading] = useState<boolean>(false)
  // const [issuesError, setIssuesError] = useState<Error | null>(null)
  const {
    currentPageIssues,
    isLoading,
    error: issuesError,
    issuesByNumber,
    pageCount
  } = useSelector((state: RootState) => state.issues)

  const openIssueCount = useSelector(
    (state: RootState) => state.repoDetails.openIssuesCount
  )

  // const { issues, pageCount } = issuesResult
  const issues = currentPageIssues.map(
    issueNumber => issuesByNumber[issueNumber]
  )

  useEffect(() => {
    // const fetchEverything = async () => {
    //   const fetchIssues = async () => {
    //     const issuesResult = await getIssues(org, repo, page)
    //     setIssues(issuesResult)
    //   }
    // async function fetchIssueCount() {
    //   const repoDetails = await getRepoDetails(org, repo)
    //   setNumIssues(repoDetails.open_issues_count)
    // }
    // try {
    // await Promise.all([fetchIssues(), fetchIssueCount()])
    //     await Promise.all([
    //       fetchIssues(),
    //       dispatch(fetchIssuesCount(org, repo))
    //     ])
    //     setIssuesError(null)
    //   } catch (err) {
    //     console.error(err)
    //     setIssuesError(err)
    //   } finally {
    //     setIsLoading(false)
    //   }
    // }
    // setIsLoading(true)
    // fetchEverything()
    // }, [org, repo, page])
    dispatch(fetchIssues(org, repo, page))
    dispatch(fetchIssuesCount(org, repo))
  }, [org, repo, page, dispatch])

  if (issuesError) {
    return (
      <div>
        <h1>Something went wrong...</h1>
        <div>{issuesError.toString()}</div>
      </div>
    )
  }
  const currentPage = Math.min(pageCount, Math.max(page, 1)) - 1
  let renderedList = isLoading ? (
    <h3>Loading...</h3>
  ) : (
    <IssuesList issues={issues} showIssueComments={showIssueComments} />
  )
  const onPageChanged: OnPageChangeCallback = selectedItem => {
    const newPage = selectedItem.selected + 1
    setJumpToPage(newPage)
  }

  return (
    <div id="issue-list-page">
      {/* <IssuesPageHeader openIssuesCount={numIssues} org={org} repo={repo} /> */}
      <IssuesPageHeader
        openIssuesCount={openIssueCount}
        org={org}
        repo={repo}
      />
      {renderedList}
      <IssuePagination
        currentPage={currentPage}
        pageCount={pageCount}
        onPageChange={onPageChanged}
      />
    </div>
  )
}
