test('test of a unit test', () => {
  expect( (function(){
    return 5;
  })()).toBe(5)
});