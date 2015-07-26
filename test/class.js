describe('Class', function() {
  it('Instantiates correctly', function() {

  });

  it('Can create child classes', function() {
    var Foo = Class.extend({
        baz: true,
        name: {},
        bar: function() {
          console.log(this.baz);
        }
      }),
      foo = new Foo(),
      _foo = new Foo({
        baz: false
      });

    expect(foo.baz).to.equal(true);
    expect(_foo.baz).to.equal(false);
  });
});