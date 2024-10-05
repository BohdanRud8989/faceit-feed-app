/*import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
// import { useMockDispatch } from '@testing-library/react-hooks';
import {setTimeout} from "timers";
import LiveData from './LiveData';
import { store } from '../../../data';

jest.mock('./addNewPostAction', () => ({
  addNewPostAction: jest.fn(),
}));

describe("LiveData component", () => {
  it('LiveData component dispatches addNewPostAction at specified interval', async () => {
  render(
      <Provider store={store}>
        <LiveData updateInterval={100} />
      </Provider>
  );

  // const dispatch = useMockDispatch();

  // Simulate a small delay to allow the interval to start
  await new Promise((resolve) => setTimeout(resolve, 150));

  // Assert that addNewPostAction was dispatched at least once
  expect(addNewPostAction).toHaveBeenCalledTimes(1);

  // Simulate a longer delay to allow more dispatches
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Assert that addNewPostAction was dispatched multiple times
  expect(addNewPostAction).toHaveBeenCalledTimes(2); // Adjust the expected number of calls as needed
});
});
*/
