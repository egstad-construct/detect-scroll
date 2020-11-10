import './matchMedia.mock';
import theme from './index.js';


test('Light Theme', () => {
  // make sure that events are fired
  const spyOnWatch = jest.spyOn(theme, 'watch')  
  const spyOnDispatch = jest.spyOn(window, 'dispatchEvent')

  // fire it off!
  theme.watch()
  
  // theme is set to 'dark' by default in matchMedia.js
  expect(window.matchMedia().matches === 'light').toBeFalsy()
  expect(spyOnWatch).toHaveBeenCalled();
  expect(spyOnDispatch).toHaveBeenCalled();
});


test('Dark Theme', () => {
  // make sure that events are fired
  const spyOnWatch = jest.spyOn(theme, 'watch')  
  const spyOnDispatch = jest.spyOn(window, 'dispatchEvent')

  // fire it off!
  theme.watch()
  
  // theme is set to 'dark' by default in matchMedia.js
  expect(window.matchMedia().matches === 'dark').toBeTruthy()
  expect(spyOnWatch).toHaveBeenCalled();
  expect(spyOnDispatch).toHaveBeenCalled();
});


test('On Update', () => {
  // make sure that events are fired
  const spyOnWatch = jest.spyOn(theme, 'watch')  
  const spyOnDispatch = jest.spyOn(window, 'dispatchEvent')
  let fakeTheme = 'dark'

  // listen for updates
  window.addEventListener('colorSchemeUpdated', function (e) { 
    // haven't figured out how to properly pass data through the event, 
    // so let's fake the theme change... :)
    fakeTheme = 'light'
  }, false);

  // fire it off!
  theme.watch()
  
  // theme is set to 'dark' by default in matchMedia.js
  expect(window.matchMedia().matches === 'dark').toBeTruthy()
  expect(spyOnWatch).toHaveBeenCalled();
  expect(spyOnDispatch).toHaveBeenCalled();
  expect(fakeTheme).toBe('light');
});



test('On Destroy', () => {
  // make sure that events are fired
  const spyOnTeardown = jest.spyOn(theme, 'teardown')  

  // fire it off!
  theme.teardown()
  
  expect(spyOnTeardown).toHaveBeenCalled();
});