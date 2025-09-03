// 👇 YOUR WORK STARTS ON LINE 19
import React from 'react'
import { render, waitFor, screen, fireEvent, getByText, queryByText, findByText } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import server from '../../../backend/mock-server'
import App from '../App'

describe('Stranger Things App', () => {
  let user
  afterEach(() => { server.resetHandlers() })
  beforeAll(() => { server.listen() })
  afterAll(() => { server.close() })
  beforeEach(() => {
    render(<App />)
    user = userEvent.setup()
  })
  test('App mounts without crashing', () => {
    const image = screen.getByRole('img')
    const button = screen.getByRole('button')
    expect(image).toBeInTheDocument()
    expect(button).toHaveTextContent(/Press to Get Show Data/i)
    // 👉 TASK: print the simulated DOM using screen.debug
  })
  test('App renders the correct texts', async () => {
    // 👉 TASK: click on the button that displays "Press to Get Show Data"
    const button = screen.getByText('Press to Get Show Data')
    fireEvent.click(button)
   
    // 👉 TASK: create a waitFor and await for the following to be true:
    await waitFor(() => {
       //    - The text "Press to Get Show Data" is no longer in the DOM
      expect(button).not.toBeInTheDocument()
      const strangerHEading = screen.queryByText("Stranger Things")
      //    - The text "Stranger Things" exists in the DOM
      expect(strangerHEading).toBeInTheDocument()

      //    - The text "A love letter to the '80s classics that captivated a generation" exists in the DOM
      // ❗ You will need { exact: false } to select the longer text
      const aloveLetterText = screen.getByText("80s classics that captivated a generation", { exact:false })
      expect(aloveLetterText).toBeInTheDocument()
      //    - The text "Select A Season" exists in the DOM
      const selectSeasonText = screen.getByText("Select A Season")
      expect(selectSeasonText).toBeInTheDocument()
     })

     await waitFor(()=> {
       // 👉 TASK: select Season 2 from the dropdown
       // ❗ Don't forget user actions need the await keyword
       // ❗ Use the selectOptions user action
       // ❗ Grab the select element using querySelector
       const dropdown = document.querySelector('#seasons')
       
      userEvent.click(dropdown)
      userEvent.selectOptions(dropdown, '1')
      screen.debug()

      // 👉 TASK: create the following assertions:
      //    - The text "Season 2, Episode 1" exists in the DOM
      const season2Ep1Txt = screen.getByText('Season 2, Episode 1')
      expect(season2Ep1Txt).toBeInTheDocument()
      //    - The text "Chapter One: MADMAX" exists in the DOM
      const madMaxText = screen.getByText('Chapter One: MADMAX')
      expect(madMaxText).toBeInTheDocument()
      //    - The text "One year after the events with the Upside Down and the Demogorgon" exists in the DOM
      // ❗ You will need { exact: false } to select the longer text
      const oneYearAfterText = screen.getByText("One year after the events with the Upside Down and the Demogorgon", { exact: false })
      expect(oneYearAfterText).toBeInTheDocument()
    })
    

  })
})
